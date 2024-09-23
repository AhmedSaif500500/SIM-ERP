setActiveSidebar('bread_view_ar');

const date1 = document.querySelector('#date1');

const note_inpute = document.querySelector(`#note_inpute`);

date1.value = today

function update_input_table_total(input) {
  const column_index = input.closest("td").cellIndex
}




function addRows() {
  var table = document.getElementById("myTable");
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
                  <select name="" id="" class="account_type select">${get_accounts_type_array}</select>
                </td>

                <!-- dropdown -->
                <td style="width: auto; height: var(--input_height);">
                  <div class="dropdown_container_input_table" id="">
                    <div class="dropdown_select_input_table" id="" onclick="toggleDropdown(this)">
                      <div id="" class="dropdown_select_input hover"></div>
                      <i class="fa-solid fa-caret-down left_icon"></i>
                      <input type="hidden" class="id_hidden_input" id="" readonly>
                    </div>
                    <div class="dropdown_menue hover scroll" id="" style="display: none;">
                      <div class="dropdown_search">
                        <input type="search" class="dropdown_search_input hover" id="" placeholder="ابحث هنا..."
                          oninput="performSearch(this)" autocomplete="off">
                      </div>
                      <div class="inputTable_dropdown_tableContainer" id="">
                        <!-- قائمة الخيارات تظهر هنا -->
  
                      </div>
                    </div>
                  </div>
                </td>

                <td style="width: 100%;" class="inputTable_noteTd hover" contenteditable="true" ></td>
                <td style="width: auto;" class="inputTable_NumberTd sum hover" contenteditable="true" oninput="handle_input_event(this)"></td>
                <td style="width: auto;" class="inputTable_NumberTd sum hover" contenteditable="true" oninput="handle_input_event(this)"></td>


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


function deleteRow(btn) {
  //فى حالة اذا كان صف واحد فقط
  const rows_length = parseInt(btn.closest("tbody").rows.length) || 0;
  if (rows_length <= 2 ){
    showAlert('info','لايمكن حذف هذا الصف ,يمكنك حذف العمليه بالكامل بدلا من ذلك')
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



function handle_input_event(input){
  const currentRow = input.closest("tr");
  const cellIndex = input.closest("td").cellIndex;
  if (cellIndex === 3) {
    currentRow.children[4].textContent = "";
  } else if (cellIndex === 4) {
    currentRow.children[3].textContent = "";
  }
  
  check_parse(input,'number');
  updateFooter()
}


  // استدعاء الدالة وتمرير اسم الجدول كمعلمة
  makeTableRowsDraggable('myTable');

async function add_new_transaction() {


const difference_debet_cerdit = parseFloat(document.querySelector(`#myTable > tfoot #difference_debet_cerdit`).textContent)
if (difference_debet_cerdit !==0 ){
  showAlert(`warning`,'القيد غير متوازن');
  return
}
  
// preparing bread_header data

const datex = date1.value;
const is_refrence = refrence_input_checkbox.checked
let refrenc_value = 0
if (!is_refrence){
  refrenc_value = refrence_input.value
}else{
  refrenc_value = 0
}


const total = parseFloat(document.querySelector(`#myTable > tfoot .table_total_row #sumColumn3`).textContent)


const general_note = note_inpute.value

  //preparing bread_body Data
  const tableRows = document.querySelectorAll('#myTable > tbody > tr');
 
  const posted_array = []; // انشاء مصفوفه جديده اضع فيها بيانات كل صف
if (tableRows.length > 0){ // التأكد من وجود بيانات داخل المصفوفه اولا


  for ( const row of tableRows){
    const account_id = parseInt(row.children[1].querySelector('.id_hidden_input').value);
        
    if (isNaN(account_id)) {
      showAlert(`warning`,'توجد صفوف لا تحتوى على حساب')
      return;
    }

    const note_row = row.children[2].textContent; // الوصول لمحتوى الخليه فى العاممود رقم 3 داخل الصف
    const debt = parseFloat(row.children[3].textContent || 0); // لو ملقاش قيمه يعتبرها صفر
    const credit = parseFloat(row.children[4].textContent || 0); // لو ملقاش قيمه يعتبرها صفر

    if (debt < 0 || credit< 0){
      showAlert(`warning`,`لا يمكن ادخل قيمه بالسالب فى القيد`);
      return;
    }
    // انشاء اوبجيكت لوضع بيانات الخلايا فيه  ثم اضافة الاوبجيكت الى عناصر المصفوفه الفارغه
    const rowData = {  
      account_id: account_id,
      note_row: note_row,
      debt: debt,
      credit: credit,
    };
    posted_array.push(rowData); // اضافة الاوبجيكت الى عناصر المصفوفه
  }


await fetchData_post1(
  "/api/transaction_add",
  {total,datex,is_refrence,refrenc_value,general_note,posted_array},
  'transaction_permission','add',
  'هل تريد حفظ البيانات ؟',
  15,
  'transaction_add_ar',
  'حدث خطأ اثناء حفظ البيانات'
)
}else{
  showAlert('fail','لا توجد بيانات')
  return
}
}


let get_accounts_type_array = [];
async function get_accounts_type(){
try {
  const data = await fetchData_postAndGet(
  '/api/transaction_accounts_types',
  {},
  '','',
  15,
  false,
  '',
  true,
  false,'',
  false,'',
  'حدث خطأ اثناء معالجه البيانات'
  )

  for (const row of data) {
    const option = `<option value="${row.id}" ${row.id === 1 ? 'selected' : ''}>${row.account_type_name}</option>`;
    get_accounts_type_array.push(option);
  }

  document.querySelector(`.account_type`).innerHTML = get_accounts_type_array
} catch (error) {
  catch_error(error)
}
}


document.querySelector('#btn_save').addEventListener('click', async function (){
  await add_new_transaction();
})


document.addEventListener('DOMContentLoaded', async function(){
  makeTableRowsDraggable('myTable'); // make sure that the table already loaded
   is_checked_refrence_fn()
  await get_accounts_type()
 })
 



//!------------------------------------------------------------------------
let data = [];
let array1 = [];
let slice_Array1 = [];


// تحضير البيانات من السيرفر
async function getEmployeesData_fn() {


    data = await fetchData_postAndGet(
      "/getAccountsData1",
      {},
      'transaction_permission','view',
      15,
      false,'',
      true,
      false,'',
      false,'',
      'حدث خطأ اثناء معالجة البيانات'
    )

  array1 = data.slice();
};

async function showFirst50RowAtTheBegening(td) {
  await getEmployeesData_fn()
  slice_Array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  filleffectstable(td)
}



async function filleffectstable(td) {
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
  // slice_Array1 = ""; // تفريغ المصفوفه
  slice_Array1.forEach(row => {
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
                      <button class="table_footer_show_data"  id="w1" onclick="ShowAllDataIneffectsTable(this)">All</button>
                      <button class="table_footer_show_data"  id="w2" onclick="showFirst50RowIneffectsTable(this)">50</button>
                  </div>
              </td>
          </tr>

      </tfoot>`;

  // إغلاق الجدول
  tableHTML += '</table>';

  // تحديث محتوى الصفحة بناءً على البيانات
  td.querySelector('.inputTable_dropdown_tableContainer').innerHTML = await tableHTML;

  


  //! get width of
  //  عمليات صف الاجمالى 
  // جمع القيم في العمود رقم 6


  // document.getElementById("tFooter6").textContent = totalColumn_Valuu;
  // document.getElementById("tfooter1").textContent = slice_Array1.length; //  عدد الصفوف

  // hide footer btn if rows < 50
  if (array1.length > 0 && array1.length <= 50) {
    td.querySelector('#table_fotter_buttons_row').style.display = "none";
  } else if (array1.length < 1) {
    td.querySelector('#table_fotter_buttons_row').innerHTML = `<td colspan='2' class="td_no_result">لا نتائج</td>`;
  };


};

// search in effectsTable
async function performSearch(input) {

  const td = input.closest("td")
  // الحصول على قيمة البحث
  // const searchValue = document.querySelector('#dropdown_search_input').value.trim().toLowerCase();
  const searchValue = td.querySelector('.dropdown_search_input').value.trim().toLowerCase();


  // فلترة البيانات بناءً على قيمة البحث
  array1 = data.filter(row => {

    // التحقق من أن employee.id و employee.name ليستان فارغتين
    // const idMatch = row.id && row.id.toString().toLowerCase().includes(searchValue);
    const nameMatch = row.account_name && row.account_name.toString().toLowerCase().includes(searchValue);
    return nameMatch // || nameMatch;
  });

  slice_Array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  filleffectstable(td)
}

async function ShowAllDataIneffectsTable(button) {
  const td = button.closest("td");
  showAlert('info', 'ان ظهار كامل البيانات فى القائمة المنسدله لا يؤثر على عمليه البحث فى البيانات')
  slice_Array1 = array1.slice(); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  await filleffectstable(td)

};

async function showFirst50RowIneffectsTable(button) {
  const td = button.closest("td")
  slice_Array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  await filleffectstable(td)
};


// تحديد الخيار المختار وإخفاء القائمة
function selectedRow(row) {
  const td = row.closest("td")
  td.querySelector('.id_hidden_input').value = row.cells[0].textContent; // row.id
  td.querySelector('.dropdown_select_input').textContent = row.cells[1].textContent; // row.employee_name
  hideDropdown_in_inputTable();
};




//!--------------------------------------------------------------


// إظهار/إخفاء القائمة

async function toggleDropdown(dropdown) {
  const td = dropdown.closest("td");
  const dropdown_menue = td.querySelector(`.dropdown_menue`);
  if (dropdown_menue.style.display === "none") {
      measureDistanceToBottom(td, dropdown_menue);
      await showDropdown(td, dropdown_menue);
  } else {
      measureDistanceToBottom(td, dropdown_menue);
      hideDropdown_in_inputTable();
  }

  // إضافة مستمعين للأحداث مع تمرير المعاملات الصحيحة
  window.addEventListener('scroll', handleResizeOrScroll(td, dropdown_menue));
  window.addEventListener('resize', handleResizeOrScroll(td, dropdown_menue));
}
// إظهار القائمة
async function showDropdown(td,dropdown_menue) {
  await showFirst50RowAtTheBegening(td);
  
  td.querySelector('.dropdown_search_input').value = ""
  dropdown_menue.style.display = "block";
}

// إخفاء القائمة
function hideDropdown_in_inputTable() {
  try {
    const All_dropdown_menue = document.querySelectorAll(`.dropdown_menue`);
    if (All_dropdown_menue) {
      All_dropdown_menue.forEach(dropdown_menue => {
        dropdown_menue.style.display = "none";
        const icon = dropdown_menue.closest(`td`).querySelector(`i`)
        icon.classList.add('fa-caret-down');
        icon.classList.remove('fa-caret-up');
      })
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
    hideDropdown_in_inputTable();
  }
});


// إخفاء القائمة عند الضغط على مفتاح الهروب
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideDropdown_in_inputTable();
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
    if (cellIndex === 3) {
      sum1 += cellValue;
      document.getElementById("sumColumn3").textContent = sum1;
    } else if (cellIndex === 4) {
      sum2 += cellValue;
      document.getElementById("sumColumn4").textContent = sum2;
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
  return function() {
      measureDistanceToBottom(td, dropdown_menue);
  };
}


//!--------------------------------------------------------------------

