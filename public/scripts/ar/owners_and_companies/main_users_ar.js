setActiveSidebar('users_view_ar');
const tableContainer = document.getElementById("tableContainer");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");


let array1 = [];
let slice_Array1 = [];

async function getUsersData_fn() {
  const response = await fetch("/get_All_users_Data");
  data = await response.json();

  // تحديث array1 بنتيجة الـ slice
  array1 = data.slice();
};

async function showFirst50RowAtTheBegening() {
  await getUsersData_fn();
  slice_Array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  filleffectstable();
}

document.addEventListener("DOMContentLoaded", function () {
  // استدعاء الدالة عندما تكتمل تحميل الصفحة
  showFirst50RowAtTheBegening();
});

async function filleffectstable() {
  //  @@ هاااااام جدا
  // el properties beta3 kol 3amod ytm wad3ha fe el <thead></thead> And <tbody></tbody> And <tfoor></tfoor> kol wa7ed lewa7do
  // el properties hya :
  // 1 : style="display: none;" > fe 7alt enak ardt e5fa2 el 3amod -- display: ; hatspha fadya fe7alt enak ardt tezhr el 3amod style="display: ;"
  // 2 : white-space: nowrap;  fe 7alt enak ardt en el text maylfsh ta7t ba3do  -- white-space: wrap; fe 7alt enak ardt en el tezt ylf
  // 3 : width: auto;  fe 7alt enak ardt en ykon 3ard el 3amod 3ala ad el mo7tawa -- width: 100%; fe 7alt enak ardt en el 3amod ya5od ba2y el mesa7a el fadla
  // 4 : text-align: center / left / right / justify   da 3ashan tet7km fe el text ymen wala shemal wala fe ele nos

  // إعداد رأس الجدول
  let tableHTML = `<table id="users_table" class="review_table">
        <thead>
            <tr>
                <th></th>
                <th style="display: none;">ID</th>
                <th>اسم المستخدم</th>
            </tr>
        </thead>
        <tbody>`;

  // إضافة صفوف الجدول بناءً على البيانات
  // slice_Array1 = ""; // تفريغ المصفوفه
  slice_Array1.forEach((user) => {
    tableHTML += `<tr>
        <td style="width: auto;"> <button class="tabble_update_btn" onclick="table_update_btn_fn(this)">تحرير</button> </td>
        <td style="display: none;">${user.id}</td> <!-- تم إخفاء العمود ID -->
        <td style="width: 100%;">${user.user_name}</td>
      </tr>`;
  });

  tableHTML += `</tbody>
<tfoot>
    <tr class="table_totals_row";>
        <td id="tfooter1"></td>
        <td id="tfooter2" style="display: none;"></td>
        <td id="tfooter3"></td>
    </tr>
    <tr id="table_fotter_buttons_row">
        <td colspan="3">
            <div class='flex_H'>
                <button class="table_footer_show_data" onclick="ShowAllDataIneffectsTable()">All</button>
                <button class="table_footer_show_data" onclick="showFirst50RowIneffectsTable()">50</button>
            </div>
        </td>
    </tr>
</tfoot>`;

  // إغلاق الجدول
  tableHTML += "</table>";

  // تحديث محتوى الصفحة بناءً على البيانات
  tableContainer.innerHTML = tableHTML;
  //  عمليات صف الاجمالى
  // جمع القيم في العمود رقم 6

  // document.getElementById("tFooter6").textContent = totalColumn_Valuu;
  document.getElementById("tfooter1").textContent = slice_Array1.length; //  عدد الصفوف
  
          // اظهار الازرار فى الاسفل او اخفاءها حسب حجم البيانات
          if (array1.length > 0 && array1.length <= 50) {
            document.querySelector('#table_fotter_buttons_row').style.display = "none";
        } else if (array1.length < 1) {
            document.querySelector('#table_fotter_buttons_row').innerHTML = `<td colspan='3' class="td_no_result">لا نتائج</td>`;
        };
}

// search in effectsTable
function performSearch() {
  // الحصول على قيمة البحث
  const searchValue = searchInput.value.trim().toLowerCase();

  // فلترة البيانات بناءً على قيمة البحث
  array1 = data.filter((user) => {
    // التحقق من أن user.id و user.name ليستان فارغتين
    // const idMatch = user.id && user.id.toString().toLowerCase().includes(searchValue);
    const nameMatch = user.user_name && user.user_name.toString().toLowerCase().includes(searchValue);
    // return idMatch || nameMatch;
    return nameMatch;
  });

  slice_Array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  filleffectstable();
}

async function ShowAllDataIneffectsTable() {
  showAlert('info', 'ان ظهار كامل البيانات فى القائمة المنسدله لا يؤثر على عمليه البحث فى البيانات')
  slice_Array1 = array1.slice(); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  filleffectstable();
}

async function showFirst50RowIneffectsTable() {
  slice_Array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  filleffectstable();
}

// عند الضغط على زر البحث
searchBtn.addEventListener("click", performSearch);

// حدث عن الضغط على زر المسح الخاص ب الانبوت سيرش الى بيظهر لما بنكتب بيانات
searchInput.addEventListener("search", function () {
  performSearch();
});

// عند الضغط على زرار انتر وانت واقف فى مربع البحث
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    performSearch();
  }
});

function table_update_btn_fn(updateBtn) {
  // عثر على الموظف باستخدام معرف الموظف
  const selectedUser = updateBtn.closest("tr").cells[1].textContent;
  if (selectedUser) {
    sessionStorage.setItem("user_id", selectedUser);
    window.location.href = "/users_update_ar";
  } else {
    return;
  };
};

//#region
