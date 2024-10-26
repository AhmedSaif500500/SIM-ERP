


const pass_input_new_pass_inpu = document.querySelector(`#pass_input_new_pass_inpu`)
const user_main_permission_select = document.querySelector(`#user_main_permission_select`)
const user_name_input = document.querySelector(`#user_name_input`)
const user_fullName_input = document.querySelector(`#user_fullName_input`)
const inactive_select = document.querySelector(`#inactive_select`)



let data = [];
let array1 = [];
let slice_Array1 = [];

async function getDataForViewTable() {
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

  showFirst50RowAtTheBegening()

} catch (error) {
  catch_error(error)
}
}




async function showFirst50RowAtTheBegening() {
  
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
            <th >تفعيل</th>
            <th style="width: 100%;" class="ps_05"> اسم الشركه </th>
            

          </tr>
        </thead>
        <tbody>`;
  // إضافة صفوف الجدول بناءً على البيانات
  // slice_Array1 = ""; // تفريغ المصفوفه
  slice_Array1.forEach(row => {
    tableHTML += `<tr>
            <td style="display: none;">${row.company_id}</td>
            <td style="text-align: center"><input type="checkbox" class="company_checkbox"></td>
            <td style="width: 100%;" class="ps_05">${row.company_name}</td>
          </tr>`;
  });
  tableHTML += `</tbody>
        <tfoot>
            <tr class="table_totals_row">
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

// function performSearch() {
//   // الحصول على قيمة البحث
//   const searchValue = searchInput.value.trim().toLowerCase();
//   // فلترة البيانات بناءً على قيمة البحث
//   array1 = data.filter(row => {
//     const company_name = row.company_name && row.company_name.toString().toLowerCase().includes(searchValue);
//     // const vendore_name = row.vendore_name && row.vendore_name.toString().toLowerCase().includes(searchValue);
//     // const total_wazn = row.total_wazn && row.total_wazn.toString().toLowerCase().includes(searchValue);
//     // const total_amount = row.sales_amount && row.total_amount.toString().toLowerCase().includes(searchValue);
//     return company_name; // || vendore_name || total_wazn || total_amount;
//   });

//   slice_Array1 = array1.slice(0, 50);

//   fillViewTable();

// }


async function ShowAllDataIneffectsTable() {
  showAlert('info', 'ان ظهار كامل البيانات فى القائمة المنسدله لا يؤثر على عمليه البحث فى البيانات')
  slice_Array1 = array1.slice(); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  fillViewTable()
}

function showFirst50RowIneffectsTable() {
  slice_Array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  fillViewTable()

}


// عند الضغط على زر البحث
// searchBtn.addEventListener('click', performSearch);

// حدث عن الضغط على زر المسح الخاص ب الانبوت سيرش الى بيظهر لما بنكتب بيانات
// searchInput.addEventListener('search', function () {
//   performSearch();
// });

// عند الضغط على زرار انتر وانت واقف فى مربع البحث
// searchInput.addEventListener('keydown', (event) => {
//   if (event.key === 'Enter') {
//     performSearch();
//   };
// });


function clear(){
  pass_input_new_pass_inpu.value = ""
  user_name_input.value = ""
  user_main_permission_select.value = 0

  check_select_permission_type()
  const checkboxes = tableContainer.querySelectorAll(`.company_checkbox`)
  if(checkboxes && checkboxes.length > 0){
    for (const checkbox of checkboxes){
      checkbox.checked = false
    }
  }
}


function check_select_permission_type(){
  value = user_main_permission_select.value
  if (value == "0"){
    tableContainer.style.display = "none"
  }else{
    tableContainer.style.display = "flex"
  }
}

user_main_permission_select.onchange = function(){
  check_select_permission_type()
}



function active_color(select_variable) {
  try {
              if (select_variable.value == 1){
                  select_variable.classList.add(`inactive_color`);
              }else{
                  select_variable.classList.remove(`inactive_color`);
              }
  } catch (error) {
      catch_error(error)
  }
}


inactive_select.onchange = function (){
  active_color(inactive_select)
}


async function save(saveParam) {

  

 const permission_type = user_main_permission_select.value
 const user_name_value = user_name_input.value
 const pass_value = pass_input_new_pass_inpu.value
 const user_fullName_value = user_fullName_input.value
 const inactive_select_value = inactive_select.value


  if (!user_name_value || user_name_value == "" || !pass_value || pass_value == "" || !user_fullName_value || user_fullName_value == ""){
    showAlert("warning","برجاء إدخال البيانات بشكل صحيح")
    return
  }

  let selectedCompanies = [];

// حلقة لتجميع القيم من كل صف بعد إضافة الجدول
document.querySelectorAll('#companies_table tbody tr').forEach(row => {
  const cells = row.cells; // الحصول على جميع الخلايا في الصف
  const companyId = cells[0].textContent; // استخدام cells[0] للحصول على company_id
  const isChecked = cells[1].querySelector('.company_checkbox').checked; // الحصول على checkbox

  if (isChecked){
  // إضافة الكائن إلى المصفوفة
  selectedCompanies.push({ company_id: companyId, checked: isChecked });
  }

});




if (saveParam == "A"){
  const post = new_fetchData_postAndGet(
    "/api/save_new_user",
    {permission_type,user_name_value,pass_value,user_fullName_value,inactive_select_value,selectedCompanies},
    "users_permissions","add",
    15,
    true,"هل تريد حفظ بيانات المستخدم الجديد ؟",
    true,
    false,false,
    false,false,false,
    true,"users_view_ar",
    false,false,""
  )
}else{
  const post = new_fetchData_postAndGet(
    "/api/save_new_user",
    {permission_type,user_name_value,pass_value,inactive_select_value,selectedCompanies},
    "users_permissions","add",
    15,
    true,"هل تريد حفظ بيانات المستخدم الجديد ؟",
    true,
    false,false,
    false,false,false,
    false,"",
    false,false,""
  )
  clear()
}


}


document.addEventListener("DOMContentLoaded", async function () {
  // update_Permissions_Levels_Text_OnPageLoad();
  clear_sub_sessionStorage()
  await getDataForViewTable()
  page_content.style.display = `flex`
  clear()
});