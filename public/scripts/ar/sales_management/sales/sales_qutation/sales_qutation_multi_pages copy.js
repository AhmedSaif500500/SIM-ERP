
let is_column_Note_show = 'none'
let is_column_discount_show = 'none'

const is_RowNote_checkBox = document.querySelector(`#is_RowNote_checkBox`)
const is_RowDiscount_checkBox = document.querySelector(`#is_RowDiscount_checkBox`)

is_RowNote_checkBox.onchange = function(){
  const x = is_RowNote_checkBox.checked
    tableColumn_hidden_and_show(x,'myTable','Xnote')
    is_column_Note_show = x
}

is_RowDiscount_checkBox.onchange = function(){
  const x = is_RowDiscount_checkBox.checked
    tableColumn_hidden_and_show(x,'myTable','Xdsicount')
    is_column_discount_show = x
}

function build_table(){

    table.querySelector('thead').innerHTML  = `
                  <tr>
                    <th style="width: auto;"></th>
                    <th style="width: auto;">#</th>
                    <th style="width: auto;">النوع</th>
                    <th style="width: 100%;">الصنف</th>
                    <th style="display: ${is_column_Note_show}; width: auto;" class="Xnote">البيان</th>
                    <th style="width: auto;">الكميه</th>
                    <th style="width: auto;">السعر</th>
                    <th style="display: ${is_column_discount_show}; width: auto;" class="Xdsicount">الخصم</th>
                    <th style="width: auto;">الاجمالى</th>
                    <th style="width: auto;">الضريبة</th>
                    <th style="width: auto;">مبلغ الضريبه</th>
                    <th style="width: auto; text-align: center;">الاجمالى</th>
                    <th style="width: auto;"></th>
                  </tr>
                
                `;
                
  table.querySelector('tfoot').innerHTML  = ` 

  <tr>
      <td id="lengthColumn1"></td>
      <td id=""></td>
      <td id=""></td>
      <td id=""style="width:100%; padding-inline-start: 2.5rem; font-weight: bold; opacity: 0.8;"></td>
      <td id=""style="display: ${is_column_Note_show}; padding-inline-start: 2.5rem; font-weight: bold; opacity: 0.8;" class="Xnote"></td>
      <td id="" style="text-align: center"></td>
      <td id=""></td>
      <td id="" style="display: ${is_column_discount_show};" class="Xdsicount"></td>

      <td id="" colspan="3">
        <div class="tfoot_totalDiv_note">
             <!-- يتم ملء أسماء الضرائب هنا ديناميكيًا -->
        </div>
      </td>
      <td id="">
        <div class="tfoot_totalDiv_Values">
           <!-- يتم ملء أسماء الضرائب هنا ديناميكيًا -->
        </div>
      </td>
      <td id=""></td>
  </tr>

  <tr>
    <td colspan="13" class="">
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
  
    <td id="difference_debet_cerdit" colspan="2" class="" style="text-align: center; opacity: 0.5; color: var(--Font_Color); transition: var(--transition);"></td>
  
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
      emptyRow.classList.add(`mainTr`)
      emptyRow.innerHTML = `
                  <td style="width: auto;" class="">
                    <div class="dragbutton_table">
                      <button class="drag-handle">
                        <i class="fa-solid fa-arrows-up-down" style=" pointer-events: none;"></i>
                      </button>
                    </div>
                  </td>

                  <td class="span_Total_In_Table rowCount" style="min-width:fit-content"></td>
                  <td>
                      <select name="" id="" class="account_type select h_full" onchange="change_select_account_type(this)">
                         <option value="5">صنف</option>
                         <option value="8">خدمة</option>
                      </select>
                  </td>
                    
                  <!-- dropdown -->
                  <td style="width: 100%; height: var(--input_height);">
                    <div class="dropdown_container_input_table" id="">
                      <div class="row h_full">
                        <span class="input_span_start account_type_name T">صنف</span>
                        <div class="dropdown_select_input_table" id="" onclick="toggleDropdown(this)" style="min-width: 10rem;">
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
  
                  
                  <td style="display: ${is_column_Note_show}; width: auto;" class="inputTable_noteTd hover Xnote" contenteditable="true" onkeydown="td_EnterkeypressEvent1(event)"></td>
                  
                  <td style="width: auto;">
                        <div class="row h_full">
                          <span class="input_span_start tbody_itemUniteName">الكمية</span>
                          <div class="div_input_sm  hover scroll Xitem_amount T" contenteditable="true" oninput="check_parse(this,'number'),update_table('myTable')" onkeydown="td_EnterkeypressEvent1(event)"></div>
                        </div>
                  </td>

                  <td style="width: auto;" class="div_input_sm UnitePrice hover" oninput="check_parse(this,'number'),update_table('myTable')" contenteditable="true"></td>
                  
                  <td style="display: ${is_column_discount_show}; width: auto;" class="Xdsicount">
                        <div class="row h_full">
                        <select class="span_Total_In_Table tbody_discountType">
                          <option value="1">نسبه %</option>
                          <option value="2">مبلغ</option>
                        </select>
                          <div class="div_input_sm  hover scroll tbody_discountValue Xrow_discount_value T" contenteditable="true" oninput="check_parse(this,'number'),update_table('myTable')" onkeydown="td_EnterkeypressEvent1(event)"></div>
                        </div>
                  </td>
                  
                  <td style="width: auto; margin: 0" class="span_Total_In_Table tbody_totalBeforTax"></td>
                  
                  <td style="width: auto;">
                      <!-- Tax -->
                        <div class="row h_full">
                          <select class="select tbody_taxType" style="min-width: 1rem; height: 100%" onchange="update_table('myTable')">
                            ${taxHeaderArray}
                          </select>
                        </div>
                  </td>

                  <td style="width: auto; margin: 0" class="span_Total_In_Table tbody_taxValue"></td>

                  <td style="width: auto; margin: 0" class="span_Total_In_Table totalAfterTax"></td>
  
  
                  <td style="width: auto;" class="">
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
    try {
    const rows_length = parseInt(btn.closest("tbody").rows.length) || 0;
    if (rows_length <= 1) {
      showAlert('info', 'لايمكن حذف هذا الصف ,يمكنك حذف العمليه بالكامل بدلا من ذلك')
      return;
    }
    const row = btn.closest("tr");
    row.remove();
    reset_rowcount_in_table(`myTable`)
    update_table('myTable')
    

    } catch (error) {
      catch_error
    }
  }
  
  function copyRow(btn) {
    try {

    const row = btn.closest("tr");
    const newRow = row.cloneNode(true);

    const tbody_taxType_select_value = row.querySelector(`.tbody_taxType`).value
    newRow.querySelector(`.tbody_taxType`).value = tbody_taxType_select_value

    row.parentNode.insertBefore(newRow, row.nextSibling);
    
 
    
    reset_rowcount_in_table(`myTable`)
    update_table('myTable')
          
  } catch (error) {
    catch_error
  }
  }

  

 function tableColumn_hidden_and_show(is_hide_or_show,str_tableId,str_className){
  const cells = document.querySelectorAll(`#${str_tableId} .${str_className}`)
  if (is_hide_or_show){
    for (const cell of cells){
      cell.style.display = 'table-cell'
    }
  }else{
    for (const cell of cells){
    cell.style.display = 'none'
  }
  }
 }



function update_table(str_tableName){
  try {

  const table = document.getElementById(`${str_tableName}`);
  const rows = table.querySelectorAll(`.mainTr`);

  
  let totalsArray = []
  let totalTaxValue = 0

  const tfoot_totalDiv_note = table.querySelector(`.tfoot_totalDiv_note`); tfoot_totalDiv_note.innerHTML = ""
  const tfoot_totalDiv_Values = table.querySelector(`.tfoot_totalDiv_Values`); tfoot_totalDiv_Values.innerHTML = ""

  function update_totalsArray (tax_account_id,str_name,val){
    if (tax_account_id){
      const obj = totalsArray.find(obj => obj.tax_account_id === tax_account_id)
      if (obj){
        obj.val = +obj.val + val;
      }else{
        totalsArray.push({tax_account_id:tax_account_id, name: str_name , val:+val})
      }
    }else{
      const obj = totalsArray.find(obj => obj.name === str_name)
      if (obj){
        obj.val = +obj.val + val;
      }else{
        totalsArray.push({name: str_name , val:+val})
      }
    }
  }



  for (const row of rows){
    
    const amount = +row.querySelector(`.Xitem_amount`).textContent || 0;
    const UnitePrice = +row.querySelector(`.UnitePrice`).textContent || 0;
    const tbody_discountType = +row.querySelector(`.tbody_discountType`).value || 0;
    const discountValueElement = +row.querySelector(`.Xrow_discount_value`).textContent || 0;
    const tbody_totalBeforTax = row.querySelector(`.tbody_totalBeforTax`);
    const tbody_taxValue = row.querySelector(`.tbody_taxValue`);
    const totalAfterTax = row.querySelector(`.totalAfterTax`);


    const Xrow_discount_value =
      tbody_discountType === 1
        ? +((discountValueElement / 100) * (amount * UnitePrice)).toFixed(2)
        : +discountValueElement.toFixed(2);
        const Val_beforTax = +((amount * UnitePrice) - Xrow_discount_value).toFixed(2);
        tbody_totalBeforTax.textContent = Val_beforTax
        
        update_totalsArray(false,'الاجمالى',Val_beforTax)

        let Val_rowTax = 0;
        const taxType = +row.querySelector(`.tbody_taxType`).value || 0;
      
        if (taxType !== 0) {
          for (const taxRow of salesAndLocationsData.taxBodyArray) {
            if (+taxRow.settings_tax_header_id === taxType) {
              const taxAccount_id = +taxRow.tax_account_id;
              // const taxAccount_name = taxRow.account_name.trim();
              const tax_name = taxRow.tax_name.trim();
              const taxRate = +taxRow.tax_rate / 100;
              const taxMultiplier = taxRow.is_tax_reverse ? -1 : 1;
              const taxValue = +(Val_beforTax * taxRate * taxMultiplier).toFixed(2);
              Val_rowTax += taxValue;
              totalTaxValue += taxValue
              update_totalsArray(taxAccount_id,tax_name,taxValue)
            }
          }
          tbody_taxValue.textContent = Val_rowTax
        }
    
        totalAfterTax.textContent =  Val_beforTax + Val_rowTax
  }

  totalsArray.forEach((obj, index) => {

    tfoot_totalDiv_note.innerHTML += `<span style="${index === 0 ? 'font-weight: bold;' : ''}">${obj.name}</span>`
    tfoot_totalDiv_Values.innerHTML += `<span style="${index === 0 ? 'font-weight: bold;' : ''}" class="${obj.val < 0? 'td_negative_number' : ''}">${obj.val}</span>`
  })
  if (totalsArray.length > 1){
    tfoot_totalDiv_note.innerHTML += `<span style="font-weight: bold;font-size:1.6rem;">الاجمالى</span>`
    tfoot_totalDiv_Values.innerHTML += `<span style="font-weight: bold; font-size:1.6rem">${totalsArray[0].val + totalTaxValue}</span>`
  }
    
} catch (error) {
  catch_error(error)
}
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
  const mainRow = td.closest(`tr`)
  
  

  td.querySelector('.id_hidden_input').value = row.cells[0].textContent; // row.id
  td.querySelector('.dropdown_select_input').textContent = row.cells[1].textContent; // row.employee_name
  console.log();
  
  mainRow.querySelector('.tbody_itemUniteName').textContent = row.cells[2].textContent || 'الكمية'; // row.employee_name
  hideDropdown();
};


function change_select_account_type(select) {
  const tr = select.closest("tr");

  const inputes = tr.querySelectorAll('.T');
  for (const input of inputes) {
    input.textContent = "";
  }

  // tr.querySelector(`.items_div`).style.display = 'none'
  const span = tr.querySelector(`.account_type_name`)
  const val = parseInt(select.value)
  if (val === 5) {
    span.textContent = "صنف"
  } else if (val === 8) {
    span.textContent = "خدمة"
  }
}




// إظهار/إخفاء القائمة

async function toggleDropdown(dropdown) {
  const tr = dropdown.closest('tr')
  const td = dropdown.closest("td");
  const dropdown_menue = td.querySelector(`.dropdown_menue`);
  if (dropdown_menue.style.display === "none") {
    const account_type_id = parseInt(tr.querySelector(`.account_type`).value)    
    data_filterd = await data_accounts.filter(item => item.account_type_id === account_type_id);
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
    const All_dropdown_menue = document.querySelectorAll(`#myTable .dropdown_menue`);
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
  const fontSize = +getComputedStyle(document.documentElement).fontSize;
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
    "/getItemssData1",
    {},
    'sales_permission', 'view',
    15,
    false,false,
    true,
    false,false,
    false,false,
    false,false,false,
    true,"sales_qutation_view_ar",
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
                          <td style="display: none;;">${row.item_unite}</td>
                        </tr>`;
  });

  tableHTML += `</tbody>
      <tfoot> 
      <!--
          <tr class="table_totals_row">
              <td id="tfooter1" style="display: none;"></td>
              <td id="tfooter2" style="display: none;"></td>
              <td id="tfooter3" style="display: none;"></td>
          </tr>
        -->
          <tr id="table_fotter_buttons_row">
              <td colspan="3">  <!-- da awel 3amod fe ele sad tr han7othan5elh han3mel merge lkol el columns fe column wa7ed 3ashan n7ot el 2 buttons hat3mel colspan le3add el 3awamed kolaha -->
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


//#region get salesman and itemsLocations
async function get_salesmanAndItemslocations_fn() {

  data_accounts = await new_fetchData_postAndGet(
    "/get_Data_for_sales_qutation_add_page",
    {},
    'sales_permission', 'view',
    15,
    false,false,
    true,
    false,false,
    false,false,
    false,false,false,
    true,"sales_qutation_view_ar",
    "An error occurred (Code: TAA1). Please check your internet connection and try again; if the issue persists, contact the administrators."
  )
return data_accounts
};
//#endregion


function reset_row_unit(event){
  try {
    event.stopPropagation(); // منع انتقال الحدث إلى العنصر الأب
    const clickedIcon = event.target;
    const mainRow = clickedIcon.closest(`.mainTr`)    
    const unit = mainRow.querySelector(`.td-amount .tbody_itemUniteName`).textContent = 'الكميه' 
  } catch (error) {
    catch_error(error)
  }
}