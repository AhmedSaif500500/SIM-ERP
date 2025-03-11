const account_no_input = document.querySelector(`#account_no_input`)
const form_name_input = document.querySelector(`#form_name_input`);
const amount_input = document.querySelector(`#amount_input`);
const unite_spane = document.querySelector(`#unite_spane`);
const date1 = document.querySelector(`#date1`); date1.value = today
const load_form_btn = document.querySelector(`#load_form_btn`)
const table = document.querySelector(`#myTable`);
let tableBody = table.querySelector(`tbody`);
let tableTfoot = table.querySelector(`tfoot`);



let account_type_array = []
let accounts_data_array = []
let bodyData_array = []
let forms_array = []
let headerData_array = []
let location_accounts_array = []

let style_account = `display: table-cell; min-width: 33rem; width: auto; white-space: nowrap; text-align: start`;
let style_roduction_value = `display: none; width: auto; white-space: nowrap; text-align: start`;


function build_table(){

    table.querySelector('thead').innerHTML  = `
                  <tr>
                    <th style="width: auto;" class="notViewTd"></th>
                    <th style="width: auto;">#</th>
                    <th style="width: auto;">النوع</th>
                    <th style="${style_account};">الحساب</th>
                    <th style="${style_roduction_value}" class="style_roduction_value">التكلفة</th>
                    <th style="width: auto;" class="notViewTd"></th>
                    <th style="width: 100%;"></th>
                  </tr>
                
                `;
                
  
  table.querySelector('tfoot').innerHTML  = ` 
  <tr class="table_total_row">
      <td id="lengthColumn1" class="notViewTd"></td>
      <td id="sumColumn1"></td>
      <td id="footer_total_recount"></td>
      <td id="sumColumn2" style="${style_account};"></td>
      <td id="footer_style_roduction_value" style="${style_roduction_value}; font-weight: bold;" class="style_roduction_value span_Total_In_Table"></td>
      <td id="sumColumn6" class="notViewTd"></td>
      <td style="width: 100%;"></td>
  </tr>
  
  <tr>
    <td class="notViewTd"></td>
    <td colspan="3" class="">
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
  
    <td class="style_roduction_value"></td>
    <td class="notViewTd"></td>
    <td style="width: 100%;"></td>
  
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

                  <td style="${style_account};" class="td_account">
                    <div class="dropdown_container_input_table" id="">
                      <div class="row h_full">
                        <span class="span_start account_type_name T">صنف مخزون</span>

                        <div class="dropdown_select_input_table" id="" onclick="fill_filtered_data_accounts_Array(event)" style="min-width: 10rem;">
                          <div id="" class="dropdown_select_input T hover"></div>
                          <i class="fa-solid left_icon fa-caret-down"></i>
                          <i class="fa-solid fa-xmark clear_icon" style="display: none;" onclick="clear_icon_on_table_td(event),reset_row_unit(event)"></i>
                          <input type="hidden" class="id_hidden_input x1 T" id="" readonly="">
                          <input type="hidden" class="is_accumulated_depreciation x1 T" id="" readonly="">
                        </div>
                        <!-- items -->
                         <div class="row items_div" style="gap: 0.2rem; display: flex;">
                            <div class="row">
                              <span class="span_start class_unite">الكمية</span>
                                <div class="div_input_sm hover scroll Xitem_amount T" contenteditable="true" oninput="check_parse(this,'number')" onkeydown="td_EnterkeypressEvent1(event)"></div>
                            </div>
                         </div>
                    </div>
                      <div class="dropdown_menue hover scroll dropdown_menue_Open_bottom" id="" style="display: none;">
                        <div class="dropdown_search">
                          <input type="search" class="dropdown_search_input hover" id="" placeholder="ابحث هنا..." oninput="tableDropdownList_performSearch(this)" autocomplete="off">
                        </div>
                        <div class="inputTable_dropdown_tableContainer scroll" id=""><p class="no_data" style="line-height: 3.2rem; padding-inline-start: 0.6rem;">لا توجد بيانات..</p></div>
                      </div>
                    </div>
                  </td>
                  <td style="${style_roduction_value}" class="style_roduction_value span_Total_In_Table td_production_value"></td>
                  <td style="width: auto;" class="td_lastTd notViewTd">
                    <div class="table_buttons_div">
                      <button onclick="deleteRow(this)" title="حذف الصف"><i class="fa-solid fa-xmark"></i></button>
                      <button onclick="copyRow(this)" title="نسخ الصف"><i class="fa-regular fa-copy"></i></button>
                    </div>
                  </td>
                  <td style="width: 100%;"></td>
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
    if (rows_length <= 1) {
      showAlert('info', 'لايمكن حذف هذا الصف ,يمكنك حذف العمليه بالكامل بدلا من ذلك')
      return;
    }
    const row = btn.closest("tr");
    row.remove();
    reset_rowcount_in_table(`myTable`)
    // updateFooter()
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
    // updateFooter()
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
   // updateFooter(); // تحديث المجموع في الفوتر
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
  const unite = tr.querySelector(`.td_account .class_unite`)
  const val = parseInt(select.value)
  
  if (val === 1) {
    span.textContent = "حساب عام"
    unite.textContent = "المبلغ"
  } else if (val === 5) {
    span.textContent = "صنف مخزون"
    unite.textContent = "الكمية"
  }
}



/*
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
*/



//#region accounts Data in dropdown select
let data_accounts = [];
let data_filterd = []
let array_accounts = [];
let slice_Array_accounts = [];
let get_accounts_type_array = [];


async function getAccounsData_fn(x) {

  const d = await new_fetchData_postAndGet(
    "/production_orders_AccountsData1",
    {x},
    'cash_transaction_permission', 'view',
    60,
    false,false,
    true,
    false,false,
    false,false,
    false,false,false,
    true,"cash_pv_view_ar",
    "An error occurred (Code: TAA1). Please check your internet connection and try again; if the issue persists, contact the administrators."
  )
  if (!d || !d.account_type_array){
    redirection('production_forms_view_ar', 'fail', 'حدث خطأ اثناء معالجة الحسابات : Fpfmp01')
    return
  }

  if (!d.location_accounts_array){
    redirection('production_forms_view_ar', 'fail', 'برجاء انشاء مواقع مخزون اولا')
    return
  }

const types_array = d.account_type_array


  for (const row of types_array) {
    
    const option = `<option value="${row.id}" ${+row.id === 5 ? 'selected' : ''}>${row.account_type_name}</option>`;
    get_accounts_type_array.push(option);
  }
  const accounts_types_array = document.querySelectorAll(`.account_type_id`)
  for (const item of accounts_types_array) {
    item.innerHTML = get_accounts_type_array;
  }

  const items_array = d.accounts_data_array.filter(item => +item.account_type_id === 5) || [];
  if (items_array.length === 0){
    redirection('production_forms_view_ar', 'fail', 'برجاء انشاء اصناف مخزون اولا')
    return
  }

  
  create_drop_down_with_External_DataArray(`dropdown_div1`,items_array); if (x) {selectedRow_dropdownDiv(`dropdown_div1`, items_array, +d.headerData_array.production_item_id)};
  create_drop_down_with_External_DataArray(`dropdown_div2`,d.location_accounts_array); if (x) {selectedRow_dropdownDiv(`dropdown_div2`,d.location_accounts_array, +d.headerData_array.location_from)};
  create_drop_down_with_External_DataArray(`dropdown_div3`,d.forms_array); //if (x) {selectedRow_dropdownDiv(`dropdown_div2`,d.location_accounts_array, +d.headerData_array.location_from)};

  return d
};




function fill_filtered_data_accounts_Array(event) {
  try {
    event.stopPropagation(); // منع انتقال الحدث إلى العنصر الأب
    const clickedIcon = event.target;
    const mainRow = clickedIcon.closest(`.mainTr`);
    const select_value = mainRow.querySelector(`.td_account_type .account_type`).value;
    
    filtered_data_accounts_Array = accounts_data_array.filter(item => +item.account_type_id === +select_value);

    const DropDown_accounts_tableColumnsName = ['id', 'account_name', 'item_unite', 'account_type_id'];

    // استدعاء tableDropdownList بعد التحديث
    tableDropdownList(
      clickedIcon.closest('.dropdown_select_input_table'),
      encodeURIComponent(JSON.stringify(filtered_data_accounts_Array || [])),
      encodeURIComponent(JSON.stringify(DropDown_accounts_tableColumnsName)),
      'account_type',
      'production_forms'
    );
  } catch (error) {
    catch_error(error);
  }
}


function fillBodyTable() {
  try {

  //  @@ هاااااام جدا
  // el properties beta3 kol 3amod ytm wad3ha fe el <thead></thead> And <tbody></tbody> And <tfoor></tfoor> kol wa7ed lewa7do
  // el properties hya :
  // 1 : style="display: none;" > fe 7alt enak ardt e5fa2 el 3amod -- display: ; hatspha fadya fe7alt enak ardt tezhr el 3amod style="display: ;"
  // 2 : white-space: nowrap;  fe 7alt enak ardt en el text maylfsh ta7t ba3do  -- white-space: wrap; fe 7alt enak ardt en el tezt ylf
  // 3 : width: auto;  fe 7alt enak ardt en ykon 3ard el 3amod 3ala ad el mo7tawa -- width: 100%; fe 7alt enak ardt en el 3amod ya5od ba2y el mesa7a el fadla
  // 4 : text-align: center / left / right / justify   da 3ashan tet7km fe el text ymen wala shemal wala fe ele nos

  // إعداد رأس الجدول
  tableBody.innerHTML = ""; // تأكد من تفريغ محتوى tbody قبل إضافة الصفوف

  // إضافة صفوف الجدول بناءً على البيانات
  // slice_Array1 = ""; // تفريغ المصفوفه
  
  bodyData_array.forEach((row) => {
    
    const newTr =
     `
      <tr class="mainTr">
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

                <td style="${style_account};" class="td_account">
                  <div class="dropdown_container_input_table" id="">
                    <div class="row h_full">
                      <span class="span_start account_type_name T">صنف مخزون</span>

                      <div class="dropdown_select_input_table" id="" onclick="fill_filtered_data_accounts_Array(event)" style="min-width: 10rem;">
                        <div id="" class="dropdown_select_input T hover"></div>
                        <i class="fa-solid left_icon fa-caret-down"></i>
                        <i class="fa-solid fa-xmark clear_icon" style="display: none;" onclick="clear_icon_on_table_td(event),reset_row_unit(event)"></i>
                        <input type="hidden" class="id_hidden_input x1 T" id="" readonly="">
                        <input type="hidden" class="is_accumulated_depreciation x1 T" id="" readonly="">
                      </div>
                      <!-- items -->
                       <div class="row items_div" style="gap: 0.2rem; display: flex;">
                          <div class="row">
                            <span class="span_start class_unite">الكمية</span>
                              <div class="div_input_sm hover scroll Xitem_amount T" contenteditable="true" oninput="check_parse(this,'number')" onkeydown="td_EnterkeypressEvent1(event)"></div>
                          </div>
                       </div>
                  </div>
                    <div class="dropdown_menue hover scroll dropdown_menue_Open_bottom" id="" style="display: none;">
                      <div class="dropdown_search">
                        <input type="search" class="dropdown_search_input hover" id="" placeholder="ابحث هنا..." oninput="tableDropdownList_performSearch(this)" autocomplete="off">
                      </div>
                      <div class="inputTable_dropdown_tableContainer scroll" id=""><p class="no_data" style="line-height: 3.2rem; padding-inline-start: 0.6rem;">لا توجد بيانات..</p></div>
                    </div>
                  </div>
                </td>
                  <td style="${style_roduction_value}" class="style_roduction_value span_Total_In_Table td_production_value">${row.production_value}</td>

                <td style="width: auto;" class="td_lastTd notViewTd">
                  <div class="table_buttons_div">
                    <button onclick="deleteRow(this)" title="حذف الصف"><i class="fa-solid fa-xmark"></i></button>
                    <button onclick="copyRow(this)" title="نسخ الصف"><i class="fa-regular fa-copy"></i></button>
                  </div>
                </td>
                <td style="width: 100%;"></td>
      </tr>`;

      tableBody.insertAdjacentHTML('beforeend', newTr);
      const tr = tableBody.querySelector(`tr:last-child`)
      handleCurrentTr(row,tr)
  });

  reset_rowcount_in_table(`myTable`)
} catch (error) {
  catch_error(error)
} 
}

function handleCurrentTr(row,tr){
      tr.querySelector(`.td_account_type .account_type`).value = row.account_type_id;
      tr.querySelector(`.td_account .id_hidden_input`).value = row.account_id;
      tr.querySelector(`.td_account .dropdown_select_input`).textContent = row.account_name;
      tr.querySelector(`.td_account .Xitem_amount`).textContent = row.value ? row.value : "";
      tr.querySelector(`.td_account .class_unite`).textContent = row.item_unite;
      
      

  const span = tr.querySelector(`.td_account .account_type_name`);

  const val = parseInt(tr.querySelector(`.td_account_type .account_type`).value)
  if (val === 1) {
    span.textContent = "حساب عام"
  } else if (val === 5) {
    span.textContent = "صنف مخزون"
  } 
}



//#region dialog
const dialogOverlay_input = document.querySelector(`#dialogOverlay_input`);
const report_name_input = document.querySelector(`#report_name_input`);
const end_date_input = document.querySelector(`#end_date_input`);
const checked_hide_zero_balabce = document.querySelector(`#checked_hide_zero_balabce`);
// const checked_show_account_no = document.querySelector(`#checked_show_account_no`);
const view_report_btn = document.querySelector(`#view_report_btn`);
const cancel_report_btn = document.querySelector(`#cancel_report_btn`);
const report_setting_icon = document.querySelector(`#report_setting_icon`);



view_report_btn.onclick = async function () {
    try {
        showLoadingIcon(view_report_btn)

        const x = document.querySelector(`#dropdown_div3_hidden_input`).value
        const xamount_input = document.querySelector(`#xamount_input`).value

        if(!x){
            showAlert('warning', 'برجاء اختيار النموذج من القائمة')
            hideLoadingIcon(view_report_btn);
            return;
        }
        

        if(!xamount_input || isNaN(xamount_input)){
          showAlert('warning', 'برجاء ادخال كمية الانتاج بشكل صحيح')
          hideLoadingIcon(view_report_btn);
          return;
      }
      
        const d = await new_fetchData_postAndGet(
          "/calculate_production_order_data",
          {x,xamount_input},
          'production_permission', 'add',
          60,
          false,false,
          true,
          false,false,
          false,false,
          false,false,false,
          true,"production_orders_view_ar",
          "An error occurred (Code: TAA1). Please check your internet connection and try again; if the issue persists, contact the administrators."
        )

        
        headerData_array = d.calc_header
        bodyData_array = d.bodyData_array 

        if (!headerData_array, !bodyData_array){
          showAlert(`fail`,'حدث خطأ اثناء معالجة البيانات')
          hideLoadingIcon(view_report_btn)
          close_dialogx()
          return
        }


        form_name_input.value = headerData_array.form_name
        unite_spane.textContent = headerData_array.item_unite
        amount_input.value = headerData_array.value || ''
        document.querySelector(`#dropdown_div1_hidden_input`).value = headerData_array.production_item_id
        document.querySelector(`#dropdown_div1_select_input`).value = headerData_array.account_name
        document.querySelector(`#dropdown_div2_hidden_input`).value = headerData_array.location_from
        document.querySelector(`#dropdown_div2_select_input`).value = headerData_array.location_name

        clear_tbody('myTable');

        fillBodyTable()
        // h2_text_div.textContent = report_name_input.value ? report_name_input.value : `كشف حساب / ${account_name}` 
        // sub_h2_header.textContent = `من ${reverseDateFormatting(start_date_input.value)}   الى   ${reverseDateFormatting(end_date_input.value)}`;
            
        showAlert('info', 'تم استيراد بيانات النموذج بنجاح، مع حساب الكميات المستهلكة بدقة بناءً على الكمية المدخلة لعملية التصنيع.')


        hideLoadingIcon(view_report_btn)
        close_dialogx()
    } catch (error) {
        hideLoadingIcon(view_report_btn)
        catch_error(error)
    }
}

function show_dialogx(){
    // start_date_input.value = firstDayOfYear
    // end_date_input.value = today
    // checked_hide_zero_balabce.checked = true
    // checked_show_account_no.checked = false
    dialogOverlay_input.style.display = 'flex' // show dialog
}


load_form_btn.onclick = function(){
    show_dialogx()
}


cancel_report_btn.onclick = function(){
    close_dialogx()
}

function close_dialogx(){
    try {
        if (!sub_h2_header.textContent){
            window.location.href = `report_map_ar`;
        }
        cancel_dialogOverlay_input(dialogOverlay_input)
    } catch (error) {
        catch_error(error)
    }
}
//#endregion end dialog



//#endregion