
setActiveSidebar('hr_ar');
pagePermission('employees_permission','view');




const sub_h2_header = document.querySelector(`#sub_h2_header`);
const back_href = document.querySelector(`#back_href`);



const tableContainer = document.querySelector('#tableContainer');
const searchBtn = document.querySelector('#searchBtn');
const searchInput = document.querySelector('#searchInput');

let checkbox_account_no = filter_div.querySelector(`#checkbox_account_no`) ; let select_account_no = filter_div.querySelector(`#select_account_no`); let input_account_no = filter_div.querySelector(`#input_account_no`);
let select_account_name = filter_div.querySelector(`#select_account_name`) ; let input_account_name = filter_div.querySelector(`#input_account_name`);
let checkbox_job = filter_div.querySelector(`#checkbox_job`) ; let select_job = filter_div.querySelector(`#select_job`); let input_job = filter_div.querySelector(`#input_job`);
let checkbox_email = filter_div.querySelector(`#checkbox_email`) ; let select_email = filter_div.querySelector(`#select_email`); let input_email = filter_div.querySelector(`#input_email`);
let checkbox_deparment_name = filter_div.querySelector(`#checkbox_deparment_name`) ; let select_department_name = filter_div.querySelector(`#select_department_name`); let input_department_name = filter_div.querySelector(`#input_department_name`);
let checkbox_another_info = filter_div.querySelector(`#checkbox_another_info`) ; let select_another_info = filter_div.querySelector(`#select_another_info`); let input_another_info = filter_div.querySelector(`#input_another_info`);
let checkbox_start_date = filter_div.querySelector(`#checkbox_start_date`) ; let select_start_date = filter_div.querySelector(`#select_start_date`); let input_start_date1 = filter_div.querySelector(`#input_start_date1`); input_start_date1.value = today; let input_end_date1 = filter_div.querySelector(`#input_end_date1`); input_end_date1.value = today; 
let checkbox_end_date = filter_div.querySelector(`#checkbox_end_date`) ; let select_end_date = filter_div.querySelector(`#select_end_date`); let input_start_date2 = filter_div.querySelector(`#input_start_date2`); input_start_date2.value = today; let input_end_date2 = filter_div.querySelector(`#input_end_date2`); input_end_date2.value = today;
let check_balance = filter_div.querySelector(`#check_balance`) ; let select_balance = filter_div.querySelector(`#select_balance`); let input_balance = filter_div.querySelector(`#input_balance`);
let checkbox_active = filter_div.querySelector(`#checkbox_active`) ; let select_active = filter_div.querySelector(`#select_active`);

const btn_do = filter_div.querySelector(`#btn_do`)




filter_icon.onclick = () =>{
    try {
        show_filter_div()
    } catch (error) {
        catch_error
    }
}


filter_icon_cancel.onclick = async () =>{
    try {
        checkbox_account_no.checked = false;
        checkbox_job.checked = false;
        checkbox_email.checked = false;
        checkbox_deparment_name.checked = false;
        checkbox_another_info.checked = false;
        checkbox_start_date.checked = false;
        checkbox_end_date.checked = false;
        check_balance.checked = true;


        hidden_filter_div()
        searchInput.value = ''

        select_active.value = 0
        showFirst50RowAtTheBegening()
    } catch (error) {
        catch_error
    }
}


let QKey;
let data = [];
let array1 = [];
let slice_array1 = [];
let filteredData_Array = [];


async function getData_fn() {
   try {
        
        data = await fetchData_postAndGet(
        '/get_All_Employees_Data',
        {QKey},
        'employees_permission','view',
        15,
        false,'',
        false,
        true,content_space,
        false,'',
        'حدث خطأ اثناء معالجة البيانات'
    )

    QKey = false

    showFirst50RowAtTheBegening()

   } catch (error) {
    catch_error
   } 

}



async function Execution(){
    try {
        showLoadingIcon(btn_do)
        searchInput.value = ""
        await showFirst50RowAtTheBegening()
        hideLoadingIcon(btn_do) 
    } catch (error) {
        hideLoadingIcon(btn_do) 
        catch_error(error)
    }
}

const inside_input_search_array = filter_div.querySelectorAll(`[name="inside_input_search"]`);

for (const input of inside_input_search_array) {
    try {
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                Execution();
            }
        });
    } catch (error) {
        catch_error(error)
    }

}


btn_do.onclick = async () => {
    Execution()
}



async function showFirst50RowAtTheBegening() {
try {
        page_content.style.display = 'none';
filteredData_Array = data.filter(row => {
    const isAccountNofoMatch = filterData_string_column_with_showAndHiddenCheckbox(checkbox_account_no, select_account_no, input_account_no,'account_no',row);
    const isNameMatch = filterData_string_column_without_showAndHiddenCheckbox(select_account_name,input_account_name,'account_name',row);
    const isJoboMatch = filterData_string_column_with_showAndHiddenCheckbox(checkbox_job, select_job, input_job, 'job',row);
    const isEmailMatch = filterData_string_column_with_showAndHiddenCheckbox(checkbox_email, select_email, input_email,'email',row);
    const isDepartmentNameMatch = filterData_string_column_with_showAndHiddenCheckbox(checkbox_deparment_name, select_department_name, input_department_name,'department_name',row);
    const isAnotherInfoMatch = filterData_string_column_with_showAndHiddenCheckbox(checkbox_another_info,select_another_info,input_another_info,'another_info',row);
    const isstartDateMatch = filterData_date_column_with_two_inputs_and_showAndHiddenCheckbox(checkbox_start_date, select_start_date, input_start_date1, input_end_date1, 'start_date', row)
    const isEndDateMatch = filterData_date_column_with_two_inputs_and_showAndHiddenCheckbox(checkbox_end_date, select_end_date, input_start_date2, input_end_date2, 'end_date', row)
    const isBalanceMatch = filterData_number_column_with_showAndHiddenCheckbox(check_balance, select_balance, input_balance, 'balance', row);
    const isActiveceMatch = filterData_string_column_with_showAndHiddenCheckbox_with_only_select(checkbox_active, select_active, 'is_inactive', row);
    

    
    return isAccountNofoMatch && isNameMatch && isJoboMatch && isEmailMatch && isDepartmentNameMatch && isAnotherInfoMatch && isstartDateMatch && isEndDateMatch && isBalanceMatch && isActiveceMatch; // && otherCondition;
});

    array1 = filteredData_Array.slice();
    
    slice_array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    await fillTable()

    
} catch (error) {
    catch_error(error)
}
}

async function fillTable() {
    try {
    //  @@ هاااااام جدا 
    // el properties beta3 kol 3amod ytm wad3ha fe el <thead></thead> And <tbody></tbody> And <tfoor></tfoor> kol wa7ed lewa7do
    // el properties hya :
    // 1 : display: none; > fe 7alt enak ardt e5fa2 el 3amod -- display: ; hatspha fadya fe7alt enak ardt tezhr el 3amod
    // 2 : white-space: nowrap;  fe 7alt enak ardt en el text maylfsh ta7t ba3do  -- white-space: wrap; fe 7alt enak ardt en el tezt ylf
    // 3 : width: auto;  fe 7alt enak ardt en ykon 3ard el 3amod 3ala ad el mo7tawa -- width: 100%; fe 7alt enak ardt en el 3amod ya5od ba2y el mesa7a el fadla
    // 4 : text-align: center / start / end / justify   da 3ashan tet7km fe el text ymen wala shemal wala fe ele nos
    
    page_content.style.display = 'none';
    showLoadingIcon(content_space)

    let style_button = `width: auto; white-space: nowrap; text-align: center`
    let style_id = `display: none;`
    let style_account_no = `display:${checkbox_account_no.checked ? 'table-cell' : 'none'};  width: auto; white-space: nowrap; text-align: start`
    let style_name = `width: ${checkbox_another_info.checked ? 'auto' : '100%'}; white-space: nowrap; text-align: start`
    let style_job = `display:${checkbox_job.checked ? 'table-cell' : 'none'};  width: auto; white-space: nowrap; text-align: start`
    let style_department_id = `display: none;`
    let style_department_name = `display:${checkbox_deparment_name.checked ? 'table-cell' : 'none'};  width: auto; white-space: nowrap; text-align: start`
    let style_email = `display:${checkbox_email.checked ? 'table-cell' : 'none'};  width: auto; white-space: nowrap; text-align: start`
    let style_another_info = `display:${checkbox_another_info.checked ? 'table-cell' : 'none'}; width: 100%; min-width: 2rem; white-space: wrap; text-align: start;`
    let style_start_date = `display:${checkbox_start_date.checked ? 'table-cell' : 'none'}; width: auto; white-space: nowrap; text-align: start`
    let style_end_date = `display:${checkbox_end_date.checked ? 'table-cell' : 'none'}; width: auto; white-space: nowrap; text-align: start`
    let style_balance = `display:${check_balance.checked ? 'table-cell' : 'none'}; width: auto; white-space: nowrap; text-align: start`
    let style_active = `display:${checkbox_active.checked ? 'table-cell' : 'none'};  width: auto; white-space: nowrap; text-align: center;`

    total_column1.value = 0

        // إعداد رأس الجدول
// هنا بناء الجدول بدون صف الأزرار
let tableHTML = `<table id="review_table" class="review_table">
                    <thead>
                        <tr>
                            <th style="${style_button}"></th>
                            <th style="${style_id}">ID</th>
                            <th style="${style_account_no}">معرف الموظف</th>
                            <th style="${style_name}">اسم الموظف</th>
                            <th style="${style_job}">الوظيفة</th>
                            <th style="${style_department_id}">معرف القسم</th>
                            <th style="${style_department_name}">القسم</th>
                            <th style="${style_email}">البريد الالكترونى</th>
                            <th style="${style_another_info}">معلومات اخرى</th>
                            <th style="${style_start_date}">تاريخ البداية</th>
                            <th style="${style_end_date}">تاريخ الانتهاء</th>
                            <th style="${style_balance}">الرصيد</th>
                            <th style="${style_active}">الحالة</th>
                        </tr>
                    </thead>
                    <tbody>`;

slice_array1.forEach(row => {
    let activeClass = row.is_inactive == 'غير نشط' ? 'table_red_condition' : 'table_green_condition';

    tableHTML += `<tr>
                    <td style="${style_button}"><button class="tabble_update_btn" onclick="table_update_btn_fn(this)">تحرير</button></td>
                    <td style="${style_id}">${row.id}</td>
                    <td style="${style_account_no}">${row.account_no}</td>
                    <td style="${style_name}">${row.account_name}</td>
                    <td style="${style_job}">${row.job}</td>
                    <td style="${style_department_id}">${row.department_id}</td>
                    <td style="${style_department_name}">${row.department_name}</td>
                    <td style="${style_email}">${row.email}</td>
                    <td style="${style_another_info}">${row.another_info}</td>
                    <td style="${style_start_date}">${row.start_date}</td>
                    <td style="${style_end_date}">${row.end_date}</td>
                    ${tdNumber(true, false, true, row.balance, style_balance, total_column1, '')}
                    <td style="${style_active}"><span class="${activeClass}">${row.is_inactive}</span></td>
                  </tr>`;
});

tableHTML += `
                <tr class="table_totals_row">
                    <td id="tfooter0" style="${style_button}"></td>
                    <td id="tfooter1" style="${style_id}"></td>
                    <td id="tfooter2" style="${style_account_no}"></td>
                    <td id="tfooter3" style="${style_name}"></td>
                    <td id="tfooter4" style="${style_job}"></td>
                    <td id="tfooter5" style="${style_department_id}"></td>
                    <td id="tfooter6" style="${style_department_name}"></td>
                    <td id="tfooter7" style="${style_email}"></td>
                    <td id="tfooter8" style="${style_another_info}"></td>
                    <td id="tfooter9" style="${style_start_date}"></td>
                    <td id="tfooter10" style="${style_end_date}"></td>
                    <td id="tfooter11" style="${style_balance}"></td>
                    <td id="tfooter12" style="${style_active}"></td>
                </tr>
            </tbody>
        </table>`;

// هنا إضافة صف الأزرار بعد إغلاق الجدول
tableHTML += `<div id="table_fotter_buttons_row" class="table_fotter_buttons_row_div">
                <div id="table_footer_showRows_div" class='flex_H'>
                    <button class="table_footer_show_data" id="" onclick="ShowAllDataInTable()">الكل</button>
                    <button class="table_footer_show_data" id="" onclick="showFirst50RowInTable()">50</button>
                </div>    
                <div id="table_footer_showRows_div" class='flex_H'>
                    <button class="table_footer_show_data" id="copy" onclick="copyTableToClipboard(this,'review_table')">نسخ الى الحافظة</button>
                </div>
             </div>`;


        // تحديث محتوى الصفحة بناءً على البيانات
        tableContainer.innerHTML = await tableHTML;
        setupColumnSorting('review_table');
        hideLoadingIcon(content_space)
        page_content.style.display = 'flex';
          //  عمليات صف الاجمالى 
          // جمع القيم في العمود رقم 6
          

// document.getElementById("tFooter6").textContent = totalColumn_Valuu;
tableContainer.querySelector(`#tfooter0`).textContent = slice_array1.length; //  عدد الصفوف
tableContainer.querySelector(`#tfooter11`).textContent = floatToString(true,total_column1.value);


        
if (array1.length > 0 && array1.length <= 50) {
    document.querySelector('#table_footer_showRows_div').style.display = "none";
}

} catch (error) {
    hideLoadingIcon(content_space)
    catch_error(error)
}
};


async function performSearch() {
    try {
    // الحصول على قيمة البحث
    const searchValue = searchInput.value.trim().toLowerCase();

    // فلترة البيانات بناءً على قيمة البحث
    array1 = filteredData_Array.filter(row => {
        const accNoMatch = performSearch_Row(checkbox_account_no, 'account_no', searchValue, row);
        const nameMatch = performSearch_Row('', 'account_name', searchValue, row);
        const jobMatch = performSearch_Row(checkbox_job, 'job', searchValue, row);
        const departmentNameMatch = performSearch_Row(checkbox_deparment_name, 'department_name', searchValue, row);
        const emailMatch = performSearch_Row(checkbox_email, 'email', searchValue, row);
        const anotherInfoMatch = performSearch_Row(checkbox_another_info, 'another_info', searchValue, row);
        const startDateInfoMatch = performSearch_Row(checkbox_start_date, 'start_date', searchValue, row);
        const endDateInfoMatch = performSearch_Row(checkbox_end_date, 'end_date', searchValue, row);
        const balanceMatch = performSearch_Row(check_balance, 'balance', searchValue, row);
        const activeeMatch = performSearch_Row(checkbox_active, 'is_inactive', searchValue, row);
        

        // استخدام || بدلاً من && لضمان أن البحث يتم في كلا الحقلين
        return accNoMatch || nameMatch || jobMatch|| departmentNameMatch || emailMatch || anotherInfoMatch || startDateInfoMatch || endDateInfoMatch || balanceMatch || activeeMatch;
    });

    slice_array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    fillTable();
} catch (error) {
    catch_error
}
}

async function ShowAllDataInTable(){
    showAlert('info', 'ان ظهار كامل البيانات فى القائمة المنسدله لا يؤثر على عمليه البحث فى البيانات')
    slice_array1 = array1.slice(); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    fillTable()
}

async function showFirst50RowInTable(){
    slice_array1 = array1.slice(0,50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    fillTable()
}

// عند الضغط على زر البحث
searchBtn.addEventListener('click',  performSearch);

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


async function table_update_btn_fn(updateBtn) {
    const permission = await btn_permission('employees_permission','update');

    if (!permission){ // if false
        return;
    };


    const row  = updateBtn.closest("tr")

    const employees_update_data = {
        id : row.cells[1].textContent,
        account_no : row.cells[2].textContent,
        account_name : row.cells[3].textContent,
        job : row.cells[4].textContent,
        department_id : row.cells[5].textContent,
        department_name : row.cells[6].textContent,
        email : row.cells[7].textContent,
        another_info : row.cells[8].textContent,
        start_date : row.cells[9].textContent,
        end_date : row.cells[10].textContent,
        is_inactive : row.cells[11].textContent,

    }
  
    const encodedData = encodeURIComponent(JSON.stringify(employees_update_data));
    // نقل البيانات عبر الـ URL
    window.location.href = `employees_update_ar?data=${encodedData}`;

    // sessionStorage.setItem('employees_update_data',JSON.stringify(employees_update_data))
    // window.location.href = 'employees_update_ar';
};


function CheckUrlParams(){
    try {
      const departmentData = getURLData('data','departments_view_ar','رابط غير صالح : سيتم اعادة توجيهك الى صفحة الاقسام')
        if (departmentData && departmentData !== 'noParams'){
            sub_h2_header.textContent = ` قسم : ${departmentData.n}`
            back_href.href = 'departments_view_ar';  back_href.title = 'الاقسام'
            QKey = departmentData.x
            document.querySelector(`#active_div`).style.display = 'none'
            return true
        }else if(departmentData && departmentData === 'noParams'){
              back_href.href = 'hr_ar' ;  back_href.title = 'الموارد البشرية'
              QKey = null
              document.querySelector(`#active_div`).style.display = 'flex'
              return true
        }else{
            return false
        }
                
    } catch (error) {
        catch_error(error)
        return false
    }
}


//! الكود دا خاص بملف ال روووتس  هو الى من خلاله بجيب القيم بتاع  سويتش كيس

  document.addEventListener('DOMContentLoaded', async function() {
        const result = CheckUrlParams(); if (!result) {return}

    showRedirectionReason();
    await getData_fn()
  });
  



window.addEventListener('beforeprint', function() {
    beforeprint_reviewTable('review_table', 0, 1); // هذا سيخفي العمود الأول والثاني
});
