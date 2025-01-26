function build_table(){


    table.querySelector('thead').innerHTML  = `
                  <tr>
                    <th style="width: auto;" class="notViewTd"></th>
                    <th style="width: auto;">#</th>
                    <th style="width: auto;">النوع</th>
                    <th style="width: auto;">الحساب</th>
                    <th style="width: 100%;">البيان</th>
                    <th style="width: auto; text-align: center;">مدين</th>
                    <th style="width: auto;" class="notViewTd"></th>
                  </tr>
                
                `;
                
  
  table.querySelector('tfoot').innerHTML  = ` 
  <tr class="table_total_row">
      <td id="lengthColumn1" class="notViewTd"></td>
      <td id="sumColumn1"></td>
      <td id="footer_total_recount"></td>
      <td id="sumColumn2" style="padding-inline-start: 2.5rem; font-weight: bold; opacity: 0.8;"></td>
      <td id="sumColumn3" style="padding-inline-start: 2.5rem; font-weight: bold; opacity: 0.8;"></td>
      <td id="totalValue" style="text-align: center">0</td>
      <td id="sumColumn6" class="notViewTd"></td>
      
  </tr>
  
  <tr>
    <td class="notViewTd"></td>
    <td colspan="5" class="">
      <div class="row x_start y_center w_full h_full notView" style="gap: 0.5rem;">
        <button id="btn_newRow" class="btn_new" onclick="addRow()">سطر جديد</button>
        <select id="columnSelect" class="select m_0" style="width: fit-content; height: 3.5rem;">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
    </td>
  
  
    <td class="notViewTd"></td>
  
  </tr>
  
  `;
  
  }
  
  
  
  let filtered_data_accounts_Array = [];

  function addRow() {

    var numRows = parseInt(document.getElementById("columnSelect").value);
  
    // إضافة صف جديد فارغ في نهاية الجدول
    for (var i = 0; i < numRows; i++) {
      var emptyRow = document.createElement("tr");
      emptyRow.classList.add(`mainTr`)
      emptyRow.innerHTML = `
                  <td style="width: auto;" class="td_drag_handle notViewTd">
                    <div class="dragbutton_table">
                      <button class="drag-handle">
                        <i class="fa-solid fa-arrows-up-down" style=" pointer-events: none;"></i>
                      </button>
                    </div>
                  </td>
                  <td class="span_Total_In_Table rowCount td-account_type" style="min-width:fit-content"></td>

                    <td class="td_account_type">
                      <select name="" id="" class="account_type select h_full" onchange="change_select_account_type(this)">${get_accounts_type_array}</select>
                    </td>



                  <!-- dropdown -->
                  <td style="width: auto; height: var(--input_height);" class="td_account">
                    <div class="dropdown_container_input_table" id="">
                      <div class="row h_full">
                        <span class="span_start account_type_name T">حساب عام</span>

                        <div class="dropdown_select_input_table" id=""  onclick="fill_filtered_data_accounts_Array(event)"  style="min-width: 10rem;">
                          <div id="" class="dropdown_select_input T hover"></div>
                          <i class="fa-solid fa-caret-down left_icon"></i>
                          <i class="fa-solid fa-xmark clear_icon" style="display: none;" onclick="clear_icon_on_table_td(event)"></i>
                          <input type="hidden" class="id_hidden_input x1 T" id="" readonly>
                        </div>
                    </div>
                      <div class="dropdown_menue hover scroll" id="" style="display: none;">
                        <div class="dropdown_search">
                          <input type="search" class="dropdown_search_input hover" id="" placeholder="ابحث هنا..."
                            oninput="tableDropdownList_performSearch(this)" autocomplete="off">
                        </div>
                        <div class="inputTable_dropdown_tableContainer scroll" id="">
                          <!-- قائمة الخيارات تظهر هنا -->
                        </div>
                      </div>
                    </div>
                  </td>
  



                  <td style="width: 100%;" class="inputTable_noteTd td_row_note hover" contenteditable="true" onkeydown="td_EnterkeypressEvent1(event)"></td>
                  <td style="width: auto;" class="inputTable_NumberTd td_value sum hover" contenteditable="true" oninput="handle_input_event(this)" onkeydown="td_EnterkeypressEvent1(event)"></td>
    
                  <td style="width: auto;" class="td_lastTd notViewTd">
                    <div class="table_buttons_div">
                      <button onclick="deleteRow(this)" title="حذف الصف"><i class="fa-solid fa-xmark"></i></button>
                      <button onclick="copyRow(this)" title="نسخ الصف"><i class="fa-regular fa-copy"></i></button>
                    </div>
                  </td>
  `;
      table.querySelector('tbody').appendChild(emptyRow);
    }
    reset_rowcount_in_table(`myTable`)
  }
  

  function td_EnterkeypressEvent1(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // يمنع السطر الجديد
    }
}
  
  function deleteRow(btn) {
    //فى حالة اذا كان صف واحد فقط
    const rows_length = parseInt(btn.closest("tbody").rows.length) || 0;
    if (rows_length <= 2) {
      showAlert('info', 'لايمكن حذف هذا الصف ,يمكنك حذف العمليه بالكامل بدلا من ذلك')
      return;
    }
    const row = btn.closest("tr");
    row.remove();
    reset_rowcount_in_table(`myTable`)
    updateFooter()
  }
  
  function copyRow(btn) {
    // الحصول على الصف الذي يحتوي على الزرار الذي تم النقر عليه
    const row = btn.closest("tr");
    const select_value = row.querySelector(`.td_account_type .account_type`).value

    // استنساخ الصف
    const newRow = row.cloneNode(true);
    newRow.querySelector(`.td_account_type .account_type`).value = select_value

    // إدراج الصف المستنسخ بعد الصف الحالي
    row.parentNode.insertBefore(newRow, row.nextSibling);
    reset_rowcount_in_table(`myTable`)
    updateFooter()
  }

  


let get_accounts_type_array = [];
async function get_accounts_type() {
  try {
    const data = await fetchData_postAndGet(
      '/api/cash_transaction_accounts_types',
      {},
      '', '',
      15,
      false,
      '',
      true,
      false, '',
      false, '',
      'حدث خطأ اثناء معالجه البيانات'
    )

    for (const row of data) {
      const option = `<option value="${row.id}" ${row.id === 1 ? 'selected' : ''}>${row.account_type_name}</option>`;
      get_accounts_type_array.push(option);
    }

    const accounts_types_array = document.querySelectorAll(`.account_type_id`)
    for (const item of accounts_types_array) {
      item.innerHTML = get_accounts_type_array;
    }

  } catch (error) {
    catch_error(error)
  }
}



  function handle_input_event(input) {
    const currentRow = input.closest("tr"); // حدد الصف الحالي
    const td_value = currentRow.querySelector(`.td_value`); // ابحث عن عمود المدين
    const td_credit = currentRow.querySelector(`.td_credit`); // ابحث عن عمود الدائن

    // تحقق إذا كان المستخدم يقوم بالإدخال في td_value أو td_credit
    if (input.classList.contains("td_value") && td_credit) { 
        td_credit.textContent = ""; // امسح محتوى الدائن
    } else if (input.classList.contains("td_credit") && td_value) { 
        td_value.textContent = ""; // امسح محتوى المدين
    }

    check_parse(input, 'number'); // تحقق من القيمة المدخلة
    updateFooter(); // تحديث المجموع في الفوتر
}

  
// تحديد الخيار المختار وإخفاء القائمة
// function selectedRow(row) {
//   const td = row.closest("td")

//   td.querySelector('.id_hidden_input').value = row.cells[0].textContent; // row.id
//   td.querySelector('.dropdown_select_input').textContent = row.cells[1].textContent; // row.employee_name
//   td.querySelector('.class_unite').textContent = row.cells[2].textContent; // row.item_unite
//   hideDropdown();
// };


function change_select_account_type(select) {
  const tr = select.closest("tr");

  const inputes = tr.querySelectorAll('.T');
  for (const input of inputes) {
    input.textContent = "";
  }

  const span = tr.querySelector(`.account_type_name`)
  const val = parseInt(select.value)
  if (val === 1) {
    span.textContent = "حساب عام"
  } else if (val === 2) {
    span.textContent = "عميل"
  } else if (val === 3) {
    span.textContent = "مورد"
  } else if (val === 4) {
    span.textContent = "موظف"
  } else if (val === 10) {
    span.textContent = "حسابات رأس المال"
  }
}




function updateFooter() {
  let sumValue = 0;

  // اختيار جميع خلايا الجدول التي تحتوي على القيم القابلة للجمع
  const cells = document.querySelectorAll(`.inputTable_NumberTd.sum`);

  cells.forEach(function (cell) {
    let cellValue = parseFloat(cell.textContent);
    if (isNaN(cellValue)) {
      cellValue = 0;
    }

    // التحقق من نوع العمود باستخدام classList
    if (cell.classList.contains("td_value")) {
      sumValue += cellValue;
    }
  });

  // تحديث الإجماليات في الفوتر
  document.getElementById("totalValue").textContent = sumValue;
}




//#region accounts Data in dropdown select
let data_accounts = [];
let data_filterd = []
let array_accounts = [];
let slice_Array_accounts = [];


// تحضير البيانات من السيرفر
async function getAccounsData_fn() {

  const x = await new_fetchData_postAndGet(
    "/getCash_rc_AccountsData1",
    {},
    'cash_transaction_permission', 'view',
    15,
    false,false,
    true,
    false,false,
    false,false,
    false,false,false,
    true,"cash_rc_view_ar",
    "An error occurred (Code: TAA1). Please check your internet connection and try again; if the issue persists, contact the administrators."
  )

  if(!x && !x.cash_accounts){
    redirection('cash_accounts_add_ar', 'warning', 'سيتم تحويلك الى صفحة الحسابات النقدية لانشاء حساب نقدى جديد')
  }else{
    create_drop_down_with_External_DataArray(`dropdown_div1`,x.cash_accounts); // selectedRow_dropdownDiv(`dropdown_div3`,customersDataArray,headerDataArray.account_id);
  }

  return x
};




function fill_filtered_data_accounts_Array(event) {
  try {
    event.stopPropagation(); // منع انتقال الحدث إلى العنصر الأب
    const clickedIcon = event.target;
    const mainRow = clickedIcon.closest(`.mainTr`);
    const select_value = mainRow.querySelector(`.td_account_type .account_type`).value;

    filtered_data_accounts_Array = data_accounts.accounts_data.filter(item => +item.account_type_id === +select_value);

    const DropDown_accounts_tableColumnsName = ['id', 'account_name'];

    // استدعاء tableDropdownList بعد التحديث
    tableDropdownList(
      clickedIcon.closest('.dropdown_select_input_table'),
      encodeURIComponent(JSON.stringify(filtered_data_accounts_Array || [])),
      encodeURIComponent(JSON.stringify(DropDown_accounts_tableColumnsName)),
      'account_type',
      'cash_transaction'
    );
  } catch (error) {
    catch_error(error);
  }
}


//#endregion