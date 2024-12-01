setActiveSidebar('general_settings_ar');
// pagePermission("add","transaction_permission");


const inactive_select = document.querySelector(`#inactive_select`);
const btn_newRow = document.querySelector(`#btn_newRow`);
const taxe_multi_type_select = document.querySelector(`#taxe_multi_type_select`);
const lbl_tax_name_input = document.querySelector(`#lbl_tax_name_input`);
const tax_name_input = document.querySelector(`#tax_name_input`);
const table = document.querySelector(`#myTable`);

table.querySelector('tfoot').innerHTML  = ` 
  
<tr>
<td></td>
  <td colspan="5" class="">
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

</tr>
`


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
                  <div class="div_input_md hover scroll XDesc T" style="max-width: 20rem; min-width: 17rem; width: fit-content" contenteditable="true" oninput="check_parse(this,'string')"></div>
                </td>

                <td>
                  <div class="row h_full">
                    <span class="input_span_start h_full class_unite">%</span>
                    <div class="div_input_sm hover h_full scroll Xrate T" contenteditable="true" oninput="check_parse(this,'number')" onkeydown="td_EnterkeypressEvent1(event)"></div>
                  </div>
                </td>

                <td>
                  <select name="" id="" class="account_type select h_full">
                    <option value="1">إضافة</option>
                    <option value="2">خصم</option>
                  </select>
                </td>

                <!-- dropdown -->
                <td style="min-width: 12rem; width: fit-content; height: var(--input_height);">
                  <div class="dropdown_container_input_table" id="">
                    <div class="row h_full">
                      <div class="dropdown_select_input_table" id="" onclick="toggleDropdown(this)">
                        <div id="" class="dropdown_select_input T hover"></div>
                        <i class="fa-solid fa-caret-down left_icon"></i>
                        <input type="hidden" class="id_hidden_input x1 T" id="" readonly>
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



                <td style="display: ${is_multiTaxes? 'table-cell' : 'none'}; width: auto;" class="hiddenCell">
                  <div class="table_buttons_div">
                    <button onclick="deleteRow(this)" title="حذف الصف"><i class="fa-solid fa-xmark"></i></button>
                    <button onclick="copyRow(this)" title="نسخ الصف"><i class="fa-regular fa-copy"></i></button>
                  </div>
                </td>

`;
    table.querySelector('tbody').appendChild(emptyRow);

  }
  is_multiTaxes = true
}

function deleteRow(btn) {
  //فى حالة اذا كان صف واحد فقط
  const rows_length = parseInt(btn.closest("tbody").rows.length) || 0;
  if (rows_length <= 2){
    taxe_multi_type_select.value = 1
    is_multiTaxes = false
    check_ifMultiRows()
  }
  if (rows_length <= 1) {
    showAlert('info', 'لايمكن حذف هذا الصف ,يمكنك حذف العمليه بالكامل بدلا من ذلك')
    return;
  }
  const row = btn.closest("tr");
  row.remove();
}



function copyRow(btn) {
  is_multiTaxes = true
  // الحصول على الصف الذي يحتوي على الزرار الذي تم النقر عليه
  const row = btn.closest("tr");

  // استنساخ الصف
  const newRow = row.cloneNode(true);

  // إدراج الصف المستنسخ بعد الصف الحالي
  row.parentNode.insertBefore(newRow, row.nextSibling);
}


function clearTbodyRows(tableId) {
  // الحصول على الجدول باستخدام الـ ID
  const tableBody = document.querySelector(`#${tableId} tbody`);

  // حذف جميع الصفوف داخل tbody ماعدا الأول
  while (tableBody.rows.length > 1) {
    tableBody.deleteRow(1); // حذف الصف الثاني باستمرار
  }
}

async function check_ifMultiRows(){

  const hiddenCells = table.querySelectorAll(`.hiddenCell`)
  const tfoot = table.querySelector(`.tfoot_hiddenCell`)
  
  if (taxe_multi_type_select.value == '1'){
    await showDialog('','سيتم حذف جميع البيانات باستثناء بيانات الصف الأول','')
    if (!dialogAnswer){
      taxe_multi_type_select.value = 2
      return
    }
    lbl_tax_name_input.textContent = 'اسم الضريبة'
    tax_name_input.placeholder = 'ُEXP : VAT 14%'
    tfoot.style.display = 'none'
    for (const Cell of hiddenCells){
      Cell.style.display = 'none'
   }
   clearTbodyRows('myTable')
   closeDialog()
  }else{
    lbl_tax_name_input.textContent = 'اسم الحزمة الضريبية'
    tax_name_input.placeholder = 'ُEXP : VAT 14% WH 1%'
    tfoot.style.display = 'table-footer-group'
    for (const Cell of hiddenCells){
      Cell.style.display = 'table-cell'
  }
  addRow()
  }
}


let is_multiTax = true

inactive_select.onchange = function(){
  active_color(inactive_select)
}

taxe_multi_type_select.onchange = function(){
  check_ifMultiRows()
}



async function save(A_OR_B) {



   const tax_package_name = tax_name_input.value.trim()
   const inactive_select_val = inactive_select.value

   if (!tax_package_name || tax_package_name === '') {
    showAlert(`warning`, 'ادخل اسم الضريبة')
    return;
  }

  //preparing bread_body Data
  const tableRows = document.querySelectorAll('#myTable > tbody > tr');

  const posted_array = []; // انشاء مصفوفه جديده اضع فيها بيانات كل صف
  if (tableRows.length > 0) { // التأكد من وجود بيانات داخل المصفوفه اولا


    for (const row of tableRows) {
      const Desc = row.children[1].querySelector('.XDesc').textContent.trim();
      const rate = +row.children[2].querySelector('.Xrate').textContent;
      const reverse_type = +row.children[3].querySelector('.account_type').value;
      const account_id = +row.children[4].querySelector('.id_hidden_input').value;

      if (isNaN(account_id)) {
        showAlert(`warning`, 'توجد صفوف لا تحتوى على حساب')
        return;
      }

      // انشاء اوبجيكت لوضع بيانات الخلايا فيه  ثم اضافة الاوبجيكت الى عناصر المصفوفه الفارغه
      const rowData = {
        Desc :Desc,
        rate: rate,
        reverse_type: reverse_type,
        account_id: account_id,
      };
      posted_array.push(rowData); // اضافة الاوبجيكت الى عناصر المصفوفه
    }

    if (A_OR_B == 'B'){
      const post = await new_fetchData_postAndGet(
        "/api/tax_add",
        {tax_package_name, inactive_select_val, posted_array },
        'pass', 'pass',
        15,
        true,"هل تريد حفظ البيانات ؟",
        true,
        false,false,false,false,false,
        true,"settings_taxes_add_ar",
        false,false,
         "An error occurred (Code: TAA2). Please check your internet connection and try again; if the issue persists, contact the administrators."
      )

    if (post){
      sessionStorage.removeItem('settings_taxes_ViewArray')
    }
    
    }else{

    const post = await new_fetchData_postAndGet(
      "/api/tax_add",
      { tax_package_name, inactive_select_val, posted_array },
      'pass', 'pass',
      15,
      true,"هل تريد حفظ البيانات ؟",
      true,
      false,false,false,false,false,
      true,"settings_taxes_view_ar",
      false,false,
       "An error occurred (Code: TAA2). Please check your internet connection and try again; if the issue persists, contact the administrators."
    )

    if (post){
      sessionStorage.removeItem('settings_taxes_ViewArray')
    }
    
  }

  } else {
    showAlert('fail', 'لا توجد بيانات')
    return
  }
}



document.addEventListener('DOMContentLoaded', async function () {
  try {
  showLoadingIcon(content_space)
  await getAccounsData_fn() // *
  build_table()
  addRow()
  makeTableRowsDraggable('myTable'); // make sure that the table already loaded
  hideLoadingIcon(content_space)
} catch (error) {
  hideLoadingIcon(content_space)
  catch_error(error)
}
})
