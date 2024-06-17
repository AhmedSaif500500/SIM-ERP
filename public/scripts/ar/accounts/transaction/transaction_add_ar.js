setActiveSidebar('bread_view_ar');
const today = new Date().toISOString().split('T')[0]; // date in format (yyyy-mm-dd)

const date1 = document.querySelector('#date1');
const vendore_select = document.querySelector('#vendore_select');


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
                      <div class="inputTable_dropdown_table_container" id="">
                        <!-- قائمة الخيارات تظهر هنا -->
                      </div>
                    </div>
                  </div>
                </td>

                <td style="width: 100%;" class="inputTable_noteTd hover" contenteditable="true"></td>
                <td style="width: auto;" class="inputTable_NumberTd hover" contenteditable="true"></td>
                <td style="width: auto;" class="inputTable_NumberTd hover" contenteditable="true"></td>



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
  const rows_length = parseInt(btn.closest("tbody").rows.length);
  if (rows_length === 1 ){
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

function updateFooter() {
  let sum1 = 0;
  let sum2 = 0;
  const cells = document.querySelectorAll("#myTable tbody tr td div input");
  cells.forEach(function (cell) {
    let cellValue = parseFloat(cell.value);
    if (isNaN(cellValue)) {
      cellValue = 0;
    }
    const cellIndex = cell.closest("td").cellIndex;
    
    if (cellIndex === 1) {
      sum1 += cellValue;
      document.getElementById("sumColumn1").textContent = sum1;
    } else if (cellIndex === 2) {
      sum2 += cellValue;
      document.getElementById("sumColumn2").textContent = sum2;
    }
  });
}

function handle_input_event(input){
  check_parse(input,'number');
  updateFooter()
}


  // استدعاء الدالة وتمرير اسم الجدول كمعلمة
  makeTableRowsDraggable('myTable');

async function add_new_bread() {

// preparing bread_header data
const datex = date1.value;
const vendore_id = vendore_select.value

  //preparing bread_body Data
  const tableRows = document.querySelectorAll('#myTable tbody tr');
  const posted_array = [];
  
  tableRows.forEach(row => {
      const inputs = row.querySelectorAll('input[type="search"]');
      
      if (inputs.length >= 2) { // التحقق من وجود ما لا يقل عن اثنين من العناصر input
          const amount = +inputs[0].value || 0; // في هذا السياق، علامة الجمع + تحول القيمة إلى عدد عائم. إذا كانت القيمة غير رقمية، فستعود إلى القيمة الافتراضية التي هي صفر
          const wazn = +inputs[1].value || 0; // في هذا السياق، علامة الجمع + تحول القيمة إلى عدد عائم. إذا كانت القيمة غير رقمية، فستعود إلى القيمة الافتراضية التي هي صفر
          const rowData = {
              amount: amount,
              wazn: wazn
          };
          posted_array.push(rowData);
      }
  });



  await fetchData_post1(
    "/api/bread_add",
    {vendore_id,datex,posted_array},
    'bread_permission','add',
    'هل تريد حفظ البيانات ؟',
    10,
    'bread_add_ar',
    'حدث خطأ اثناء حفظ البيانات'
  )
}

document.querySelector('#btn_save').addEventListener('click', async function (){
  await add_new_bread();
})


document.addEventListener('DOMContentLoaded', async function(){
  makeTableRowsDraggable('myTable'); // make sure that the table already loaded
 })
 



//!------------------------------------------------------------------------
//let data = [];
let array1 = [];
let slice_Array1 = [];


// تحضير البيانات من السيرفر
async function getEmployeesData_fn() {
    // if(!Authentication){
    //     return;
    // }

  const response = await fetch("/getEmployeesData1");
  data = await response.json();

  // تحديث array1 بنتيجة الـ slice
  array1 = data.slice();
};

async function showFirst50RowAtTheBegening(td) {
  await getEmployeesData_fn()
  slice_Array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  fillAttendancetable(td)
}



async function fillAttendancetable(td) {
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
                          <td style="width: auto;">${row.employee_name}</td>
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
                      <button class="table_footer_btn"  id="w1" onclick="ShowAllDataInAttendanceTable(this)">All</button>
                      <button class="table_footer_btn"  id="w2" onclick="showFirst50RowInAttendanceTable(this)">50</button>
                  </div>
              </td>
          </tr>

      </tfoot>`;

  // إغلاق الجدول
  tableHTML += '</table>';

  // تحديث محتوى الصفحة بناءً على البيانات
  td.querySelector('.inputTable_dropdown_table_container').innerHTML = await tableHTML;

  


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

// search in attendanceTable
async function performSearch(input) {

  const td = input.closest("td")
  // الحصول على قيمة البحث
  // const searchValue = document.querySelector('#dropdown_search_input').value.trim().toLowerCase();
  const searchValue = td.querySelector('.dropdown_search_input').value.trim().toLowerCase();


  // فلترة البيانات بناءً على قيمة البحث
  array1 = data.filter(row => {

    // التحقق من أن employee.id و employee.name ليستان فارغتين
    const idMatch = row.id && row.id.toString().toLowerCase().includes(searchValue);
    const nameMatch = row.employee_name && row.employee_name.toString().toLowerCase().includes(searchValue);
    return idMatch || nameMatch;
  });

  slice_Array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  fillAttendancetable(td)
}

async function ShowAllDataInAttendanceTable(button) {
  const td = button.closest("td");
  showAlert('info', 'ان ظهار كامل البيانات فى القائمة المنسدله لا يؤثر على عمليه البحث فى البيانات')
  slice_Array1 = array1.slice(); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  await fillAttendancetable(td)

};

async function showFirst50RowInAttendanceTable(button) {
  const td = button.closest("td")
  slice_Array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  await fillAttendancetable(td)
};


// تحديد الخيار المختار وإخفاء القائمة
function selectedRow(row) {
  const td = row.closest("td")
  td.querySelector('.id_hidden_input').value = row.cells[0].textContent; // row.id
  td.querySelector('.dropdown_select_input').textContent = row.cells[1].textContent; // row.employee_name
  hideDropdown();
};




//!--------------------------------------------------------------


// إظهار/إخفاء القائمة
async function toggleDropdown(dropdown) {
  const td = dropdown.closest("td");
  const dropdown_menue = td.querySelector(`.dropdown_menue`)
  if (dropdown_menue.style.display === "none") {
    await measureDistanceToBottom(td,dropdown_menue);
    await showDropdown(td,dropdown_menue);

   


  } else {
    await measureDistanceToBottom(td,dropdown_menue);
    hideDropdown();
  }
}

// إظهار القائمة
async function showDropdown(td,dropdown_menue) {
  await showFirst50RowAtTheBegening(td);
  
  td.querySelector('.dropdown_search_input').value = ""
  dropdown_menue.style.display = "block";
}

// إخفاء القائمة
function hideDropdown() {
  
  const All_dropdown_menue = document.querySelectorAll(`.dropdown_menue`);
  All_dropdown_menue.forEach(dropdown_menue => {
    dropdown_menue.style.display = "none";
  })
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

function measureDistanceToBottom(td,dropdown_menue) {
  
  const dropdown_container = td.querySelector('.dropdown_container_input_table'); // el main container


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
 
  if (distanceToBottomRem < 21) {  // 5aleh nafs rl hight beta3 el drop_menue + 1 
    dropdown_menue.classList.add("dropdown_menue_Open_top");
    dropdown_menue.classList.remove("dropdown_menue_Open_bottom");
  } else {
    dropdown_menue.classList.add("dropdown_menue_Open_bottom");
    dropdown_menue.classList.remove("dropdown_menue_Open_top");
  }

  // طباعة المسافة بوحدة REM إلى وحدة تحكم المتصفح

  // يستدعي الدالة عند حدوث التمرير أو تغيير حجم الشاشة
  window.addEventListener('scroll', measureDistanceToBottom);
  window.addEventListener('resize', measureDistanceToBottom);

}

//!--------------------------------------------------------------------