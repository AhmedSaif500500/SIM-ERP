function build_table(){


    table.querySelector('thead').innerHTML  = `
                  <tr>
                    <th style="width: auto;"></th>
                    <th style="width: auto;">النوع</th>
                    <th style="width: auto;">الحساب</th>
                    <th style="width: 100%;">البيان</th>
                    <th style="width: auto; text-align: center;">مدين</th>
                    <th style="width: auto; text-align: center;">دائن</th>
                    <th style="width: auto;"></th>
                  </tr>
                
                `;
                
  
  table.querySelector('tfoot').innerHTML  = ` 
  <tr class="table_total_row">
      <td id="lengthColumn1"></td>
      <td id="sumColumn1"></td>
      <td id="sumColumn2" style="padding-inline-start: 2.5rem; font-weight: bold; opacity: 0.8;"></td>
      <td id="sumColumn3" style="padding-inline-start: 2.5rem; font-weight: bold; opacity: 0.8;"></td>
      <td id="totalDebit" style="text-align: center">0</td>
      <td id="totalCredit" style="text-align: center">0</td>
      <td id="sumColumn6"></td>
      <td id="sumColumn7"></td>
  </tr>
  
  <tr>
    <td colspan="4" class="">
      <div class="row x_start y_center w_full h_full" style="gap: 0.5rem; ">
        <button id="btn_newRow" class="btn_new" onclick="addRow()">سطر جديد</button>
        <select id="columnSelect" class="select m_0" style="width: fit-content; height: 3.5rem;">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
    </td>
  
    <td id="difference_debet_cerdit" colspan="2" class=""
      style="text-align: center; opacity: 0.5; color: var(--Font_Color); transition: var(--transition);">0
    </td>
  
    <td></td>
    <td></td>
  
  </tr>
  
  `;
  
  }
  
  
  
  
  function addRow() {
    
    var numRows = parseInt(document.getElementById("columnSelect").value);
  
    // إضافة صف جديد فارغ في نهاية الجدول
    for (var i = 0; i < numRows; i++) {
      var emptyRow = document.createElement("tr");
      emptyRow.innerHTML = `
                  <td style="width: auto;" class="">
                    <div class="dragbutton_table">
                      <button class="drag-handle">
                        <i class="fa-solid fa-arrows-up-down" style=" pointer-events: none;"></i>
                      </button>
                    </div>
                  </td>
  
                    <td>
                      <select name="" id="" class="account_type select h_full" onchange="change_select_account_type(this)">${get_accounts_type_array}</select>
                    </td>
                  <!-- dropdown -->
                  <td style="width: auto; height: var(--input_height);">
                    <div class="dropdown_container_input_table" id="">
                      <div class="row h_full">
                        <span class="input_span_start account_type_name T">حساب عام</span>
                        <div class="dropdown_select_input_table" id="" onclick="toggleDropdown(this)">
                        <div id="" class="dropdown_select_input T hover"></div>
                        <i class="fa-solid fa-caret-down left_icon"></i>
                        <input type="hidden" class="id_hidden_input x1 T" id="" readonly>
                        </div>
                        <!-- items -->
                         <div class="row items_div" style="gap:0.2rem; display:none">
                            <div class="row">
                              <span class="input_span_start">الكمية</span>
                              <div class="div_input_sm hover scroll Xitem_amount T" contenteditable="true" oninput="check_parse(this,'number')" onkeydown="td_EnterkeypressEvent1(event)"></div>
                            </div>
                            <div class="row">
                              <span class="input_span_start">موقع المخزون</span>
                              <select name="" id="" class="select h_full items_locations_select">${get_items_locations_array}</select>
                            </div>
                         </div>
                    </div>
                      <div class="dropdown_menue hover scroll" id="" style="display: none;">
                        <div class="dropdown_search">
                          <input type="search" class="dropdown_search_input hover" id="" placeholder="ابحث هنا..."
                            oninput="performSearch_accounts_table(this)" autocomplete="off">
                        </div>
                        <div class="inputTable_dropdown_tableContainer" id="">
                          <!-- قائمة الخيارات تظهر هنا -->
    
                        </div>
                      </div>
                    </div>
                  </td>
  
                  <td style="width: 100%;" class="inputTable_noteTd hover" contenteditable="true" onkeydown="td_EnterkeypressEvent1(event)"></td>
                  <td style="width: auto;" class="inputTable_NumberTd sum hover" contenteditable="true" oninput="handle_input_event(this)" onkeydown="td_EnterkeypressEvent1(event)"></td>
                  <td style="width: auto;" class="inputTable_NumberTd sum hover" contenteditable="true" oninput="handle_input_event(this)" onkeydown="td_EnterkeypressEvent1(event)"></td>
  
  
                  <td style="width: auto;" class="">
                    <div class="table_buttons_div">
                      <button onclick="deleteRow(this)" title="حذف الصف"><i class="fa-solid fa-xmark"></i></button>
                      <button onclick="copyRow(this)" title="نسخ الصف"><i class="fa-regular fa-copy"></i></button>
                    </div>
                  </td>
  `;
      table.querySelector('tbody').appendChild(emptyRow);
  
    }
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
    updateFooter()
  }
  
  function copyRow(btn) {
    // الحصول على الصف الذي يحتوي على الزرار الذي تم النقر عليه
    const row = btn.closest("tr");
  
    // استنساخ الصف
    const newRow = row.cloneNode(true);
  
    // إدراج الصف المستنسخ بعد الصف الحالي
    row.parentNode.insertBefore(newRow, row.nextSibling);
    updateFooter()
  }

  


let get_accounts_type_array = [];
async function get_accounts_type() {
  try {
    const data = await fetchData_postAndGet(
      '/api/transaction_accounts_types',
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

    const accounts_types_array = document.querySelectorAll(`.account_type`)
    for (const item of accounts_types_array) {
      item.innerHTML = get_accounts_type_array;
    }

  } catch (error) {
    catch_error(error)
  }
}


let get_items_locations_array = [];
let items_locations_array
async function get_items_locations() {
  try {
    const data = await fetchData_postAndGet(
      '/api/transaction_items_locations',
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
      const option = `<option value="${row.id}">${row.account_name}</option>`;
      get_items_locations_array.push(option);
    }

    // const items_locations_array = document.querySelectorAll(`.items_locations_select`)
    // for (const item of items_locations_array) {
    //   item.innerHTML = get_items_locations_array;
    // }

  } catch (error) {
    catch_error(error)
  }
}


function update_input_table_total(input) {
    const column_index = input.closest("td").cellIndex
  }
  

function handle_input_event(input) {
    const currentRow = input.closest("tr");
    const cellIndex = input.closest("td").cellIndex;
    if (cellIndex === 4) {          
      currentRow.cells[5].textContent = "";
    } else if (cellIndex === 5) {
      currentRow.cells[4].textContent = "";
    }
    check_parse(input, 'number');
    updateFooter()
  }
  
  
// تحديد الخيار المختار وإخفاء القائمة
function selectedRow(row) {
  const td = row.closest("td")
  td.querySelector('.id_hidden_input').value = row.cells[0].textContent; // row.id
  td.querySelector('.dropdown_select_input').textContent = row.cells[1].textContent; // row.employee_name
  hideDropdown();
};


function change_select_account_type(select) {
  const tr = select.closest("tr");

  const inputes = tr.querySelectorAll('.T');
  for (const input of inputes) {
    input.textContent = "";
  }

  tr.querySelector(`.items_div`).style.display = 'none'
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
  } else if (val === 5) {
    span.textContent = "صنف مخزون"
    tr.querySelector(`.items_div`).style.display = 'flex'
  } else if (val === 6) {
    span.textContent = "اصل ثابت"
  }
}




// إظهار/إخفاء القائمة

async function toggleDropdown(dropdown) {
  const tr = dropdown.closest('tr')
  const td = dropdown.closest("td");
  const dropdown_menue = td.querySelector(`.dropdown_menue`);
  if (dropdown_menue.style.display === "none") {
    const account_type = parseInt(tr.querySelector(`.account_type`).value)    
    data_filterd = await data_accounts.filter(item => item.account_type === account_type);
    array_accounts = data_filterd
    measureDistanceToBottom(td, dropdown_menue);
    await showDropdown(td, dropdown_menue);
  } else {
    measureDistanceToBottom(td, dropdown_menue);
    hideDropdown();
  }
  // إضافة مستمعين للأحداث مع تمرير المعاملات الصحيحة
  window.addEventListener('scroll', handleResizeOrScroll(td, dropdown_menue));
  window.addEventListener('resize', handleResizeOrScroll(td, dropdown_menue));
}


// إظهار القائمة
async function showDropdown(td, dropdown_menue) {
  hideDropdown()
  await showFirst50RowAtTheBegening_accounts_table(td);
  const dropdown_search_input = td.querySelector('.dropdown_search_input')
  dropdown_search_input.value = ""
  dropdown_menue.style.display = "block";
  handle_dropdown_row_selection(td)
}

// إخفاء القائمة
function hideDropdown() {
  try {
    const All_dropdown_menue = document.querySelectorAll(`.dropdown_menue`);
    All_dropdown_menue.forEach(dropdown_menue => {
      dropdown_menue.style.display = "none";
      const icon = dropdown_menue.closest(`td`).querySelector(`i`)
      icon.classList.add('fa-caret-down');
      icon.classList.remove('fa-caret-up');
    })
  } catch (error) {
    catch_error(error);
  }
}

let keydownHandler = null;

function handle_dropdown_row_selection(td) {
  try {
    const dropdown_search_input = td.querySelector('.dropdown_search_input');
    dropdown_search_input.focus();

    const rows = td.querySelectorAll(`.inputTable_dropdown_tableContainer table > tbody > tr`);
    if (rows.length > 0) {
      let currentIndex = 0;

      rows[currentIndex].classList.add('custom_tr_hover');

      function updateHighlight(newIndex) {
        if (newIndex >= 0 && newIndex < rows.length) {
          rows.forEach(row => row.classList.remove('custom_tr_hover'));
          currentIndex = newIndex;
          rows[currentIndex].classList.add('custom_tr_hover');
        }
      }

      // تعريف مستمع الحدث الجديد
      const newKeydownHandler = (event) => {
        switch (event.key) {
          case 'ArrowDown':
            updateHighlight(currentIndex + 1);
            event.preventDefault(); // Prevent the input cursor from moving
            break;
          case 'ArrowUp':
            updateHighlight(currentIndex - 1);
            event.preventDefault(); // Prevent the input cursor from moving
            break;
          case 'Enter':            
            if (slice_Array_accounts.length > 0) {
              const currentRow = rows[currentIndex];
              td.querySelector('.id_hidden_input').value = currentRow.cells[0].textContent;
              td.querySelector('.dropdown_select_input').textContent = currentRow.cells[1].textContent;
              hideDropdown();
            }
            break;
        }
      };

      // إزالة المستمع القديم إذا كان موجودًا
      if (keydownHandler) {
        dropdown_search_input.removeEventListener('keydown', keydownHandler);
      }

      // إضافة المستمع الجديد
      dropdown_search_input.addEventListener('keydown', newKeydownHandler);

      // تحديث المتغير لمستمع الحدث
      keydownHandler = newKeydownHandler;
    }
  } catch (error) {
    catch_error(error);
  }
}



// إظهار/إخفاء القائمة

// dropdown_select.addEventListener("click", toggleDropdown);

// إخفاء القائمة عند فقدان التركيز
document.addEventListener("click", (event) => {
  // console.log('Clicked element:', event.target);
  const classesToCheck = ['dropdown_select_input_table', 'dropdown_menue', 'dropdown_search_input'];

  const clickedInside = classesToCheck.some(className => {
    return event.target.classList.contains(className) || event.target.closest(`.${className}`);
  });

  if (!clickedInside) {
    hideDropdown();
  }
});


// إخفاء القائمة عند الضغط على مفتاح الهروب
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideDropdown();
  }
});


function updateFooter() {

  let sum1 = 0;
  let sum2 = 0;
  // const cells = document.querySelectorAll("#myTable tbody tr td div input");
  const cells = document.querySelectorAll(`.inputTable_NumberTd.sum`);
  //  console.log(cells.length);

  cells.forEach(function (cell) {
    let cellValue = parseFloat(cell.textContent);
    if (isNaN(cellValue)) {
      cellValue = 0;
    }
    const cellIndex = cell.closest("td").cellIndex;

    // console.log(cellIndex);
    if (cellIndex === 4) {
      sum1 += cellValue;
      document.getElementById("totalDebit").textContent = sum1;
    } else if (cellIndex === 5) {
      sum2 += cellValue;
      document.getElementById("totalCredit").textContent = sum2;
    }
  });

  document.querySelector(`#difference_debet_cerdit`).textContent = sum1 - sum2
  // difference_debet_cerdit
}



//#region  جعل القائمه تفتح الى اعلى او لاسفل حسب الافضل
function measureDistanceToBottom(td, dropdown_menue) {
  const dropdown_container = td.querySelector('.dropdown_container_input_table'); // el main container
  const icon = dropdown_container.querySelector('i'); // تعديل هذا السطر للتأكد من العثور على العنصر الصحيح

  // الحصول على معلومات الحجم والموقع النسبي للعنصر
  const rect = dropdown_container.getBoundingClientRect();

  // الحصول على ارتفاع النافذة الرئيسية للمتصفح
  const windowHeight = window.innerHeight;

  // حساب المسافة بين العنصر والحافة السفلية للشاشة
  const distanceToBottom = windowHeight - rect.bottom;

  // حساب المسافة بوحدة REM
  // الحصول على حجم الخط الأساسي وتحويل المسافة إلى REM
  const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const distanceToBottomRem = distanceToBottom / fontSize;

  if (distanceToBottomRem < 21) { // 5aleh nafs rl hight beta3 el drop_menue + 1
    icon.classList.remove('fa-caret-down');
    icon.classList.add('fa-caret-up');
    dropdown_menue.classList.add("dropdown_menue_Open_top");
    dropdown_menue.classList.remove("dropdown_menue_Open_bottom");
  } else {
    icon.classList.add('fa-caret-down');
    icon.classList.remove('fa-caret-up');
    dropdown_menue.classList.add("dropdown_menue_Open_bottom");
    dropdown_menue.classList.remove("dropdown_menue_Open_top");
  }
}

// دالة مغلفة لتمرير المعاملات الصحيحة عند حدوث التمرير أو تغيير حجم الشاشة
function handleResizeOrScroll(td, dropdown_menue) {
  return function () {
    measureDistanceToBottom(td, dropdown_menue);
  };
}


//#region accounts Data in dropdown select
let data_accounts = [];
let data_filterd = []
let array_accounts = [];
let slice_Array_accounts = [];


// تحضير البيانات من السيرفر
async function getAccounsData_fn() {

  data_accounts = await new_fetchData_postAndGet(
    "/getAccountsData1",
    {},
    'transaction_permission', 'view',
    15,
    false,false,
    true,
    false,false,
    false,false,
    false,false,false,
    true,"transaction_view_ar",
    "An error occurred (Code: TAA1). Please check your internet connection and try again; if the issue persists, contact the administrators."
  )


};




async function showFirst50RowAtTheBegening_accounts_table(td) {
  slice_Array_accounts = array_accounts.slice(0, 50);
  fillAccountstable(td)
}



async function fillAccountstable(td) {
  //  @@ هاااااام جدا 
  // el properties beta3 kol 3amod ytm wad3ha fe el <thead></thead> And <tbody></tbody> And <tfoor></tfoor> kol wa7ed lewa7do
  // el properties hya :
  // 1 : display: none; > fe 7alt enak ardt e5fa2 el 3amod -- display: ; hatspha fadya fe7alt enak ardt tezhr el 3amod
  // 2 : white-space: nowrap;  fe 7alt enak ardt en el text maylfsh ta7t ba3do  -- white-space: wrap; fe 7alt enak ardt en el tezt ylf
  // 3 : width: auto;  fe 7alt enak ardt en ykon 3ard el 3amod 3ala ad el mo7tawa -- width: 100%; fe 7alt enak ardt en el 3amod ya5od ba2y el mesa7a el fadla
  // 4 : text-align: center / left / right / justify   da 3ashan tet7km fe el text ymen wala shemal wala fe ele nos

  // إعداد رأس الجدول
  let tableHTML = `<table id="accounts_table" class="inputTable_dropdown_table">
                        <tbody>`;

  // إضافة صفوف الجدول بناءً على البيانات
  // slice_Array_accounts = ""; // تفريغ المصفوفه
  slice_Array_accounts.forEach(row => {
    tableHTML += `<tr onclick="selectedRow(this)">
                          <td style="display: none;" >${row.id}</td>
                          <td style="width: auto;">${row.account_name}</td>
                        </tr>`;
  });

  tableHTML += `</tbody>
      <tfoot> 
      <!--
          <tr class="table_totals_row">
              <td id="tfooter1"></td>
              <td id="tfooter2" style="display: none;"></td>
          </tr>
        -->
          <tr id="table_fotter_buttons_row">
              <td colspan="2">  <!-- da awel 3amod fe ele sad tr han7othan5elh han3mel merge lkol el columns fe column wa7ed 3ashan n7ot el 2 buttons hat3mel colspan le3add el 3awamed kolaha -->
                  <div class='flex_H'>
                      <button class="table_footer_show_data"  id="w1" onclick="ShowAllDataInAccountsTable(this)">All</button>
                      <button class="table_footer_show_data"  id="w2" onclick="showFirst50RowInAccountsTable(this)">50</button>
                  </div>
              </td>
          </tr>

      </tfoot>`;

  // إغلاق الجدول
  tableHTML += '</table>';

  // تحديث محتوى الصفحة بناءً على البيانات
  td.querySelector('.inputTable_dropdown_tableContainer').innerHTML = tableHTML;




  //! get width of
  //  عمليات صف الاجمالى 
  // جمع القيم في العمود رقم 6


  // document.getElementById("tFooter6").textContent = totalColumn_Valuu;
  // document.getElementById("tfooter1").textContent = slice_Array_accounts.length; //  عدد الصفوف

  // hide footer btn if rows < 50
  if (array_accounts.length > 0 && array_accounts.length <= 50) {
    td.querySelector('#table_fotter_buttons_row').style.display = "none";
  } else if (array_accounts.length < 1) {
    td.querySelector('#table_fotter_buttons_row').innerHTML = `<td colspan='2' class="td_no_result">لا نتائج</td>`;
  };


};

// search in effectsTable
async function performSearch_accounts_table(input) {

  const td = input.closest("td")
  // الحصول على قيمة البحث
  // const searchValue = document.querySelector('#dropdown_search_input').value.trim().toLowerCase();
  const searchValue = td.querySelector('.dropdown_search_input').value.trim().toLowerCase();


  // فلترة البيانات بناءً على قيمة البحث
  array_accounts = data_filterd.filter(row => {

    // التحقق من أن employee.id و employee.name ليستان فارغتين
    // const idMatch = row.id && row.id.toString().toLowerCase().includes(searchValue);
    const nameMatch = row.account_name && row.account_name.toString().toLowerCase().includes(searchValue);
    return nameMatch // || nameMatch;
  });

  slice_Array_accounts = array_accounts.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  await fillAccountstable(td)
  if (slice_Array_accounts.length > 0) {
    handle_dropdown_row_selection(td);
  }
}



async function ShowAllDataInAccountsTable(button) {
  const td = button.closest("td");
  showAlert('info', 'ان ظهار كامل البيانات فى القائمة المنسدله لا يؤثر على عمليه البحث فى البيانات')
  slice_Array_accounts = array_accounts.slice(); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  await fillAccountstable(td)

};

async function showFirst50RowInAccountsTable(button) {
  const td = button.closest("td")
  slice_Array_accounts = array_accounts.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  await fillAccountstable(td)
};


//#endregion