

//#region check permissions

const is_owner = sessionStorage.getItem('owner')
const add_company_users_btns_div = document.querySelector(`#add_company_users_btns_div`);
if (is_owner && is_owner === 'true') {
  add_company_users_btns_div.style.display = 'flex';
} else {
  add_company_users_btns_div.style.display = 'none';
}
//#endregion

//#region Companies_ar Page itself
// إعلان المتغير على مستوى الـ script  
const tableContainer = document.getElementById('tableContainer');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

const add_new_bussnies = document.querySelector(`#add_new_bussnies`);
const users_btn = document.querySelector(`#users_btn`);

let data = [];
let array1 = [];
let slice_Array1 = [];

async function getViewTableData() {
try {
  
  data = await fetchData_postAndGet(
    "/get_companies_data",
    {},
    "","",
    15,
    false,"",
    false,
    true,
    content_space,
    false,"",
    "حدث خطأ اثناء معالجة البيانات"
);


  // تحديث array1 بنتيجة الـ slice
  array1 = data.slice();

} catch (error) {
  catch_error(error)
}
}




async function showFirst50RowAtTheBegening() {
  await getViewTableData()
  slice_Array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  fillViewTable()
}

 function fillViewTable() {
  //  @@ هاااااام جدا 
  // el properties beta3 kol 3amod ytm wad3ha fe el <thead></thead> And <tbody></tbody> And <tfoor></tfoor> kol wa7ed lewa7do
  // el properties hya :
  // 1 : display: none; > fe 7alt enak ardt e5fa2 el 3amod -- display: ; hatspha fadya fe7alt enak ardt tezhr el 3amod
  // 2 : white-space: nowrap;  fe 7alt enak ardt en el text maylfsh ta7t ba3do  -- white-space: wrap; fe 7alt enak ardt en el tezt ylf
  // 3 : width: auto;  fe 7alt enak ardt en ykon 3ard el 3amod 3ala ad el mo7tawa -- width: 100%; fe 7alt enak ardt en el 3amod ya5od ba2y el mesa7a el fadla
  // 4 : text-align: center / left / right / justify   da 3ashan tet7km fe el text ymen wala shemal wala fe ele nos

  //* Prepare GLOBAL variables Befor sum functions
  // total_column1.value = 0
  // total_column2.value = 0
  // إعداد رأس الجدول
  let tableHTML = `<table id="companies_table" class="review_table">
        <thead>
          <tr style="height: 3.7rem;">
            <th style="display: none;">الكود</th>
            <th style="width: 100%;" class="ps_05"> اسم الشركه </th>
            <th style="width: auto;"></th>

          </tr>
        </thead>
        <tbody>`;
  // إضافة صفوف الجدول بناءً على البيانات
  // slice_Array1 = ""; // تفريغ المصفوفه
  slice_Array1.forEach(row => {
    tableHTML += `<tr style="height: 3.7rem;">
            <td style="display: none;">${row.company_id}</td>
            <td style="width: 100%;" class="ps_05">${row.company_name}</td>
            <td style="width: auto;"><button class="btn_save" onclick="company_login_btn(this)">دخول</button></td>
          </tr>`;
  });
  tableHTML += `</tbody>
        <tfoot>
            <tr class="table_totals_row" style="height: 3.7rem;">
                <td id="tfooter1" colspan="3" class="ps_05"></td>
            </tr>
                        <tr id="table_fotter_buttons_row" style="height: 3.7rem;">
                            <td colspan="3">   <!-- da awel 3amod fe ele sad tr han7othan5elh han3mel merge lkol el columns fe column wa7ed 3ashan n7ot el 2 buttons hat3mel colspan le3add el 3awamed kolaha -->
                                <div class="flex_H">
                                 <button class="table_footer_show_data"  id="" onclick="ShowAllDataIneffectsTable()">All</button>
                                 <button class="table_footer_show_data"  id="" onclick="showFirst50RowIneffectsTable()">50</button>
                                </div>
                            </td>
                        </tr>
                    </tfoot>`;
  // إغلاق الجدول
  tableHTML += '</table>';
  // تحديث محتوى الصفحة بناءً على البيانات
  tableContainer.innerHTML = tableHTML;
  document.getElementById("tfooter1").textContent = slice_Array1.length; // عدد الصفوف
  // document.getElementById("tfooter7").textContent = total_column1.value;
  // document.getElementById("tfooter8").textContent = total_column2.value;

  if (array1.length > 0 && array1.length <= 50) {
    document.querySelector('#table_fotter_buttons_row').style.display = "none";
  } else if (array1.length < 1) {
    document.querySelector('#table_fotter_buttons_row').innerHTML = `<td colspan='7' class="td_no_result">لا نتائج</td>`;
  };

  page_content.style.display = `flex`
};

function performSearch() {
  // الحصول على قيمة البحث
  const searchValue = searchInput.value.trim().toLowerCase();
  // فلترة البيانات بناءً على قيمة البحث
  array1 = data.filter(row => {
    const company_name = row.company_name && row.company_name.toString().toLowerCase().includes(searchValue);
    // const vendore_name = row.vendore_name && row.vendore_name.toString().toLowerCase().includes(searchValue);
    // const total_wazn = row.total_wazn && row.total_wazn.toString().toLowerCase().includes(searchValue);
    // const total_amount = row.sales_amount && row.total_amount.toString().toLowerCase().includes(searchValue);
    return company_name; // || vendore_name || total_wazn || total_amount;
  });

  slice_Array1 = array1.slice(0, 50);

  fillViewTable();

}


async function ShowAllDataIneffectsTable() {
  showAlert('info', 'ان ظهار كامل البيانات فى القائمة المنسدله لا يؤثر على عمليه البحث فى البيانات')
  slice_Array1 = array1.slice(); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  fillViewTable()
}

async function showFirst50RowIneffectsTable() {
  slice_Array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  await fillViewTable()

}


// عند الضغط على زر البحث
searchBtn.addEventListener('click', performSearch);

// حدث عن الضغط على زر المسح الخاص ب الانبوت سيرش الى بيظهر لما بنكتب بيانات
searchInput.addEventListener('search', function () {
  performSearch();
});

// عند الضغط على زرار انتر وانت واقف فى مربع البحث
searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    performSearch();
  };
});

async function company_login_btn(enter_button) {
  try {


    const c_id = parseInt(enter_button.closest("tr").cells[0].textContent);


    showLoadingIcon(enter_button);

    const data = await fetchData_postAndGet(
      "/company_login",
      { c_id },
      'pass', 'pass',
      20,
      false,
      '',
      false,
      false,'',
      false,'',
      'حدث خطأ اثناء الدخول الى العمل التجارى المحدد'
    )

    const dataLength = data.length
    if (!dataLength) {
      hideLoadingIcon(enter_button);
      showAlert('fail', 'حدث خطأ اثناء معالجه البيانات برجاء التواصل مع الدعم الفنى')
      return
    }


   // sessionStorage.setItem('forbidden_deletion_array', JSON.stringify([1,2,3,4,5,6,7,8,8,10,11,12,13,14,15,16,17,8,19,20,21,22,23]));





    // Define an array of permissions
const permissions = [
  "general_permission",
  "accounts_permission",
  "hr_permission",
  "departments_permission",
  "employees_permission",
  "effects_permission",
  "users_permission",
  "production_permission",
  "bread_permission",
  "transaction_permission",
  "items_permission",
  "customers_permission",
  "vendors_permission",
  // Add new permissions here
];

// Save company_id and company_name
sessionStorage.setItem("company_id", data[0].company_id); 
sessionStorage.setItem("company_name", data[0].company_name); 

// Save all permissions dynamically
permissions.forEach(permission => {
  sessionStorage.setItem(permission, data[0][permission]);
});


    hideLoadingIcon(enter_button)
    window.location.href = '/notes_ar';
  } catch (error) {
    hideLoadingIcon(enter_button);
    catch_error(error)
  }
}




add_new_bussnies.onclick = function(){
  window.location.href='companies_add_ar';
}

document.addEventListener('DOMContentLoaded', async function () {
  // استدعاء الدالة عندما تكتمل تحميل الصفحة
  await showFirst50RowAtTheBegening();
});

//#endregion End - showReason of redirection