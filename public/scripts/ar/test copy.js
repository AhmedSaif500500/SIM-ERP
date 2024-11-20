document.addEventListener('DOMContentLoaded', function() {

 
});


const id_hidden_input = document.querySelector('#id_hidden_input');
const dropdown_select_input = document.querySelector('#dropdown_select_input');

let data = [];
let array1 = [];
let slice_Array1 = [];


// تحضير البيانات من السيرفر
async function getEmployeesData_fn() {
  data = await fetchData_postAndGet(
    '/getEmployeesData1',
    {},
    'effects_permission','view',
    15,
    false,'',
    false,
    false,'',
    false,'',
    'حدث خطأ اثناء معالجة البيانات'
  )
  array1 = data.slice(data);
};


async function showFirst50RowAtTheBegening() {
  await getEmployeesData_fn()
  slice_Array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  filleffectstable()
}


async function filleffectstable() {
  //  @@ هاااااام جدا 
  // el properties beta3 kol 3amod ytm wad3ha fe el <thead></thead> And <tbody></tbody> And <tfoor></tfoor> kol wa7ed lewa7do
  // el properties hya :
  // 1 : display: none; > fe 7alt enak ardt e5fa2 el 3amod -- display: ; hatspha fadya fe7alt enak ardt tezhr el 3amod
  // 2 : white-space: nowrap;  fe 7alt enak ardt en el text maylfsh ta7t ba3do  -- white-space: wrap; fe 7alt enak ardt en el tezt ylf
  // 3 : width: auto;  fe 7alt enak ardt en ykon 3ard el 3amod 3ala ad el mo7tawa -- width: 100%; fe 7alt enak ardt en el 3amod ya5od ba2y el mesa7a el fadla
  // 4 : text-align: center / left / right / justify   da 3ashan tet7km fe el text ymen wala shemal wala fe ele nos
    showLoadingIcon(page_content)
  // إعداد رأس الجدول
  let tableHTML = `<table id="employees_table" class="review_table">
                        <tbody>`;

  // إضافة صفوف الجدول بناءً على البيانات
  // slice_Array1 = ""; // تفريغ المصفوفه
  slice_Array1.forEach(row => {
    tableHTML += `<tr onclick="selectedRow(this)">
                          <td style="display: none;" >${row.id}</td>
                          <td style="width: 100%;">${row.account_name}</td>
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
                      <button class="table_footer_show_data"  id="w1" onclick="ShowAllDataIneffectsTable()">All</button>
                      <button class="table_footer_show_data"  id="w2" onclick="showFirst50RowIneffectsTable()">50</button>
                  </div>
              </td>
          </tr>

      </tfoot>`;

  // إغلاق الجدول
  tableHTML += '</table>';

  // تحديث محتوى الصفحة بناءً على البيانات
  document.querySelector('#dropdownItems').innerHTML = tableHTML;
  //  عمليات صف الاجمالى 
  // جمع القيم في العمود رقم 6


  // document.getElementById("tFooter6").textContent = totalColumn_Valuu;
  // document.getElementById("tfooter1").textContent = slice_Array1.length; //  عدد الصفوف

  // hide footer btn if rows < 50
  if (array1.length > 0 && array1.length <= 50) {
    document.querySelector('#table_fotter_buttons_row').style.display = "none";
  } else if (array1.length < 1) {
    document.querySelector('#table_fotter_buttons_row').innerHTML = `<td colspan='2' class="td_no_result">لا نتائج</td>`;
  };

hideLoadingIcon(page_content)
};


// search in effectsTable
function performSearch() {

  // الحصول على قيمة البحث
  const searchValue = document.querySelector('#dropdown_search_input').value.trim().toLowerCase();

  // فلترة البيانات بناءً على قيمة البحث
  array1 = data.filter(row => {
    // التحقق من أن employee.id و employee.name ليستان فارغتين
    // const idMatch = row.id && row.id.toString().toLowerCase().includes(searchValue);
    const nameMatch = row.account_name && row.account_name.toString().toLowerCase().includes(searchValue);
    return nameMatch;
  });

  slice_Array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  filleffectstable()
}

async function ShowAllDataIneffectsTable() {
  showAlert('info', 'ان ظهار كامل البيانات فى القائمة المنسدله لا يؤثر على عمليه البحث فى البيانات')
  slice_Array1 = array1.slice(); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  await filleffectstable()

};

async function showFirst50RowIneffectsTable() {
  slice_Array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  await filleffectstable()
};


// تحديد الخيار المختار وإخفاء القائمة
function selectedRow(row) {
  document.querySelector('#id_hidden_input').value = row.cells[0].textContent; // row.id
  document.querySelector('#dropdown_select_input').value = row.cells[1].textContent; // row.employee_name
  hideDropdown();
};




//!--------------------------------------------------------------


// إظهار/إخفاء القائمة
function toggleDropdown() {
  if (dropdown_menue.style.display === "none") {
    measureDistanceToBottom();
    showDropdown();

  } else {
    measureDistanceToBottom();
    hideDropdown();
  }
}

// إظهار القائمة
async function showDropdown() {
  
  await showFirst50RowAtTheBegening();
  dropdown_menue.style.display = "block";
}

// إخفاء القائمة
function hideDropdown() {
  dropdown_menue.style.display = "none";
  document.querySelector('#dropdown_search_input').value = ""
}

// إظهار/إخفاء القائمة

dropdown_select.addEventListener("click", toggleDropdown);

// إخفاء القائمة عند فقدان التركيز
document.addEventListener("click", (event) => {
  if (
    !document.querySelector('#dropdown_select').contains(event.target) &&
    !document.querySelector('#dropdown_menue').contains(event.target) &&
    !event.target.closest('#employees_table') // تحقق مما إذا كانت النقرة ليست داخل الجدول
  ) {
    // alert(`i will hide menue now`);
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

function measureDistanceToBottom() {
  const dropdown_container = document.querySelector('#dropdown_container'); // el main container

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



