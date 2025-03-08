
setActiveSidebar('hr_ar');
//pagePermission('view', 'employees_permission');


let data = [];
let array1 = [];
let slice_array1 = [];
let filteredData_Array = [];

let permissionName;
let start_date;
let end_date;
let Qkey;
let back_href_page;
let back_title_page;

const newBtn = document.querySelector('#newBtn');
newBtn.onclick = function (){
    sessionStorage.removeItem('employees_update_data')
    window.location.href = "/employees_add_ar";
  }

  const h2_text_div = document.querySelector(`#h2_text_div`);
  const sub_h2_header = document.querySelector(`#sub_h2_header`);
  let is_filter = false;
  const back_href = document.querySelector(`#back_href`);
  
  let is_recieved_params_from_effects_update = false;
  let is_recieved_params_from_department_view = false;


  const tableContainer = document.querySelector("#tableContainer");
  const searchBtn = document.querySelector("#searchBtn");
  const searchInput = document.querySelector("#searchInput");
  
//! account no
let f1_div = filter_div.querySelector(`#f1_div`);
let f1_checkbox = filter_div.querySelector(`#f1_checkbox`);
let f1_selectAndInput_div = filter_div.querySelector(`#f1_selectAndInput_div`);
let f1_select = filter_div.querySelector(`#f1_select`);
let f1_input = filter_div.querySelector(`#f1_input`);

//! account name
let f2_div = filter_div.querySelector(`#f2_div`);
let f2_checkbox = filter_div.querySelector(`#f2_checkbox`);
let f2_selectAndInput_div = filter_div.querySelector(`#f2_selectAndInput_div`);
let f2_select = filter_div.querySelector(`#f2_select`);
let f2_input = filter_div.querySelector(`#f2_input`);

//! job
let f3_div = filter_div.querySelector(`#f3_div`);
let f3_checkbox = filter_div.querySelector(`#f3_checkbox`);
let f3_selectAndInput_div = filter_div.querySelector(`#f3_selectAndInput_div`);
let f3_select = filter_div.querySelector(`#f3_select`);
let f3_input = filter_div.querySelector(`#f3_input`);

//! department name
let f4_div = filter_div.querySelector(`#f4_div`);
let f4_checkbox = filter_div.querySelector(`#f4_checkbox`);
let f4_selectAndInput_div = filter_div.querySelector(`#f4_selectAndInput_div`);
let f4_select = filter_div.querySelector(`#f4_select`);
let f4_input = filter_div.querySelector(`#f4_input`);

//! email
let f5_div = filter_div.querySelector(`#f5_div`);
let f5_checkbox = filter_div.querySelector(`#f5_checkbox`);
let f5_selectAndInput_div = filter_div.querySelector(`#f5_selectAndInput_div`);
let f5_select = filter_div.querySelector(`#f5_select`);
let f5_input = filter_div.querySelector(`#f5_input`);

//! another info
let f6_div = filter_div.querySelector(`#f6_div`);
let f6_checkbox = filter_div.querySelector(`#f6_checkbox`);
let f6_selectAndInput_div = filter_div.querySelector(`#f6_selectAndInput_div`);
let f6_select = filter_div.querySelector(`#f6_select`);
let f6_input = filter_div.querySelector(`#f6_input`);

//! start datex
let f0_div = filter_div.querySelector(`#f0_div`);
let f0_checkbox_div = filter_div.querySelector(`#f0_checkbox_div`);
let f0_checkbox = filter_div.querySelector(`#f0_checkbox`);
let f0_select = filter_div.querySelector(`#f0_select`);
let f0_input_start_date1 = filter_div.querySelector(`#f0_input_start_date1`); f0_input_start_date1.value = firstDayOfYear;
let f0_input_end_date1 = filter_div.querySelector(`#f0_input_end_date1`); f0_input_end_date1.value = lastDayOfYear;

//! end datex
let f100_div = filter_div.querySelector(`#f100_div`);
let f100_checkbox_div = filter_div.querySelector(`#f100_checkbox_div`);
let f100_checkbox = filter_div.querySelector(`#f100_checkbox`);
let f100_select = filter_div.querySelector(`#f100_select`);
let f100_input_start_date1 = filter_div.querySelector(`#f100_input_start_date1`); f100_input_start_date1.value = firstDayOfYear;
let f100_input_end_date1 = filter_div.querySelector(`#f100_input_end_date1`); f100_input_end_date1.value = lastDayOfYear;

//! balance
let f7_div = filter_div.querySelector(`#f7_div`);
let f7_checkbox = filter_div.querySelector(`#f7_checkbox`);
let f7_selectAndInput_div = filter_div.querySelector(`#f7_selectAndInput_div`);
let f7_select = filter_div.querySelector(`#f7_select`);
let f7_input = filter_div.querySelector(`#f7_input`);

//! employees_status
let f8_div = filter_div.querySelector(`#f8_div`);
let f8_checkbox = filter_div.querySelector(`#f8_checkbox`);
let f8_selectAndInput_div = filter_div.querySelector(`#f8_selectAndInput_div`);
let f8_select = filter_div.querySelector(`#f8_select`);
let f8_input = filter_div.querySelector(`#f8_input`);

const btn_do = filter_div.querySelector(`#btn_do`);
const indices = [0, 100, 1, 2, 3, 4, 5, 6, 7, 8]; // ضع هنا الأرقام التي تريد تضمينها


back_href.onclick = async function (event) {
    event.preventDefault();
    await back_href_fn1(getData_fn, `employees_viewArray`, `employees_view_ar`, `hr_ar`)
};


filter_icon.onclick = () => {
    try {
        show_filter_div();
    } catch (error) {
        catch_error;
    }
};

function call_default_checkbox(str_f, is_showDiv, is_checkBox, is_datex) {
    // Check if the elements exist to avoid errors
    const divElement = window[`${str_f}_div`];
    const checkbox = window[`${str_f}_checkbox`];
    const selectElement = window[`${str_f}_select`];
    const inputElement = window[`${str_f}_input`];
    const selectAndInputDiv = window[`${str_f}_selectAndInput_div`];

    
    if (divElement) {
        divElement.style.display = is_showDiv ? 'flex' : 'none';
    }
    
    if (selectElement) {
        selectElement.value = 0;
    }

    if (inputElement) {
        inputElement.value = '';
        inputElement.style.display = 'none';
    }

    if (selectAndInputDiv) {
        if (is_checkBox) {
            selectAndInputDiv.classList.remove('hidden_select_and_input_div');
            checkbox.checked = true
        } else {
            selectAndInputDiv.classList.add('hidden_select_and_input_div');
            checkbox.checked = false
        }
    }

    if (is_datex){
        
        const datex_checkbox_div = window[`${str_f}_checkbox_div`];
        const datex_input_start_date1 = window[`${str_f}_input_start_date1`];
        const datex_input_end_date1 = window[`${str_f}_input_end_date1`];
    
        if(datex_checkbox_div){
            datex_checkbox_div.style.display = 'flex'
        }
    
        if(datex_input_start_date1){
            datex_input_start_date1.value = firstDayOfYear
        }
        if(datex_input_end_date1){
            datex_input_end_date1.value = lastDayOfYear
    
        }
    
        }
}


function deafult_checkbox() {
    call_default_checkbox('f0',true,false,true) // 
    call_default_checkbox('f100',true,false,true) // 
    call_default_checkbox('f1',true,false,false) // 
    call_default_checkbox('f2',true,true,false) // 
    call_default_checkbox('f3',true,false,false) // 
    call_default_checkbox('f4',true,false,false) // 
    call_default_checkbox('f5',true,false,false) // 
    call_default_checkbox('f6',true,false,false) // 
    call_default_checkbox('f7',true,true,false) //
    call_default_checkbox('f8',true,true,false) //
}

async function filter_icon_cancel_fn() {
    try {

        if(is_filter){

            await showDialog("","هل تريد الغاء التصفية والرجوع الى الحالة الافتراضية ؟","");
            if (!dialogAnswer) {
                return;
            }
    
            deafult_checkbox();            
            await getData_fn();
            closeDialog();
            sessionStorage.removeItem('employees_viewArray');
            conditionsArray = []
            
        }

        hidden_filter_div();
        is_filter = false;
    } catch (error) {
        closeDialog();
        catch_error;
    }
}

filter_icon_cancel.onclick = async () => {
    await filter_icon_cancel_fn();
};

async function getData_fn() {
   try {
        
        data = await new_fetchData_postAndGet(
        '/get_All_Employees_Data',
        {end_date},
        'employees_permission','view',
        60,
        false,'',
        false,
        false,false,
        false,false,false,
        false,false,
        true,'hr_ar',
        'حدث خطأ اثناء معالجة البيانات'
    )
    h2_text_div.textContent = `الموظفين`
    sub_h2_header.textContent = ` حتى تاريخ  ${reverseDateFormatting(end_date)}`;
    back_href.title = back_href_page;
    back_href.href = back_title_page;       
        
console.log(data.length);

    showFirst50RowAtTheBegening()
   } catch (error) {
    catch_error
   } 

}


async function Execution() {
    try {
        showLoadingIcon(content_space);
        is_filter = true
        searchInput.value = "";

        permissionName = 'employees_permission'
        start_date = false
        end_date = end_date
        Qkey = false
        back_href_page = 'employees_view_ar'
        back_title_page = 'الموظفين'


            showFirst50RowAtTheBegening();
            backUp_page1(`employees_viewArray`, Qkey, permissionName, start_date, end_date, back_href_page, back_title_page)
        } catch (error) {
            catch_error(error);
        } finally {
            hideLoadingIcon(content_space);
        }
    }

const inside_input_search_array = filter_div.querySelectorAll(
    `[name="inside_input_search"]`
);

for (const input of inside_input_search_array) {
    try {
        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                Execution();
            }
        });
    } catch (error) {
        catch_error(error);
    }
}

btn_do.onclick = async () => {
    Execution()
}

async function showFirst50RowAtTheBegening() {
try {

    
        page_content.style.display = 'none';
        filteredData_Array = data.filter((row) => {
    const f1 = filterData_string_column_with_showAndHiddenCheckbox(f1_checkbox, f1_select, f1_input,'account_no',row);
    const f2 = filterData_string_column_with_showAndHiddenCheckbox(f2_checkbox,f2_select, f2_input,'account_name',row);
    const f3 = filterData_string_column_with_showAndHiddenCheckbox(f3_checkbox, f3_select, f3_input, 'job',row);
    const f4 = filterData_string_column_with_showAndHiddenCheckbox(f4_checkbox, f4_select, f4_input,'department_name',row);
    const f5 = filterData_string_column_with_showAndHiddenCheckbox(f5_checkbox, f5_select, f5_input,'email',row);
    const f6 = filterData_string_column_with_showAndHiddenCheckbox(f6_checkbox,f6_select,f6_input,'another_info',row);
    const f0 = filterData_date_column_with_two_inputs_and_showAndHiddenCheckbox(f0_checkbox, f0_select, f0_input_start_date1, f0_input_end_date1, 'start_date', row)
    const f100 = filterData_date_column_with_two_inputs_and_showAndHiddenCheckbox(f100_checkbox, f100_select, f100_input_start_date1, f100_input_end_date1, 'end_date', row)
    const f7 = filterData_number_column_with_showAndHiddenCheckbox(f7_checkbox, f7_select, f7_input, 'balance', row);
    const f8 = filterData_string_column_with_showAndHiddenCheckbox_with_only_select(f8_checkbox, f8_select, 'is_inactive', row);
    
    return (
    f0 &&
    f100 &&
    f1 &&
    f2 &&
    f3 &&
    f4 &&
    f5 &&
    f6 &&
    f7 &&
    f8
    ); // && otherCondition;
});


array1 = filteredData_Array.slice();

slice_array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
fillTable();

    
} catch (error) {
    catch_error(error)
}
}

function fillTable() {
    try {

        
    //  @@ هاااااام جدا 
    // el properties beta3 kol 3amod ytm wad3ha fe el <thead></thead> And <tbody></tbody> And <tfoor></tfoor> kol wa7ed lewa7do
    // el properties hya :
    // 1 : display: none; > fe 7alt enak ardt e5fa2 el 3amod -- display: ; hatspha fadya fe7alt enak ardt tezhr el 3amod
    // 2 : white-space: nowrap;  fe 7alt enak ardt en el text maylfsh ta7t ba3do  -- white-space: wrap; fe 7alt enak ardt en el tezt ylf
    // 3 : width: auto;  fe 7alt enak ardt en ykon 3ard el 3amod 3ala ad el mo7tawa -- width: 100%; fe 7alt enak ardt en el 3amod ya5od ba2y el mesa7a el fadla
    // 4 : text-align: center / start / end / justify   da 3ashan tet7km fe el text ymen wala shemal wala fe ele nos
    
    showLoadingIcon(content_space)

    let style_button = `width: auto; white-space: nowrap; text-align: center`
    let style_id = `display: none;`
    let style_account_no = `display:${f1_checkbox.checked ? 'table-cell' : 'none'};  width: auto; white-space: nowrap; text-align: start`
    let style_name = `width: ${f6_checkbox.checked ? 'auto' : '100%'}; white-space: nowrap; text-align: start`
    let style_job = `display:${f3_checkbox.checked ? 'table-cell' : 'none'};  width: auto; white-space: nowrap; text-align: start`
    let style_department_id = `display: none;`
    let style_department_name = `display:${f4_checkbox.checked ? 'table-cell' : 'none'};  width: auto; white-space: nowrap; text-align: start`
    let style_email = `display:${f5_checkbox.checked ? 'table-cell' : 'none'};  width: auto; white-space: nowrap; text-align: start`
    let style_another_info = `display:${f6_checkbox.checked ? 'table-cell' : 'none'}; width: 100%; min-width: 2rem; white-space: wrap; text-align: start;`
    let style_start_date = `display:${f0_checkbox.checked ? 'table-cell' : 'none'}; width: auto; white-space: nowrap; text-align: start`
    let style_end_date = `display:${f100_checkbox.checked ? 'table-cell' : 'none'}; width: auto; white-space: nowrap; text-align: start`
    let style_balance = `display:${f7_checkbox.checked ? 'table-cell' : 'none'}; width: auto; white-space: nowrap; text-align: start`
    let style_is_salesman = `display: none;`
    let style_active = `display:${f8_checkbox.checked ? 'table-cell' : 'none'};  width: auto; white-space: nowrap; text-align: start;`
    let is_allow_to_buy_and_sell = `display: none;`;

    total_column1.value = 0
    let fn1 = `onclick = "table_balance1_btn_to_statetment_fn1(this, 'td_id', 'employees_permission', firstDayOfYear, end_date, 'employees_view_ar', 'الموظفين', false, 'account_statement_view_ar', 'obj_statement')"`;

    
    

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
                            <th style="${style_is_salesman}">بائع</th>
                            <th style="${style_active}">الحالة</th>
                            <th style="${is_allow_to_buy_and_sell}"></th>

                        </tr>
                    </thead>
                    <tbody>`;

slice_array1.forEach(row => {
    let activeClass = row.is_inactive == 'غير نشط' ? 'table_red_condition' : 'table_green_condition';

    tableHTML += `<tr>
                    <td style="${style_button}"><button class="table_view_btn" onclick="table_view_btn_fn(this)">عرض</button></td>
                    <td style="${style_id}" class="td_id">${row.id}</td>
                    <td style="${style_account_no}">${row.account_no}</td>
                    <td style="${style_name}">${row.account_name}</td>
                    <td style="${style_job}">${row.job}</td>
                    <td style="${style_department_id}">${row.department_id}</td>
                    <td style="${style_department_name}">${row.department_name}</td>
                    <td style="${style_email}">${row.email}</td>
                    <td style="${style_another_info}">${row.another_info}</td>
                    <td style="${style_start_date}">${row.start_date}</td>
                    <td style="${style_end_date}">${row.end_date}</td>
                    ${tdNumber(true, false, true, row.balance, style_balance, total_column1, fn1 , 'total_column1')}
                    <td style="${style_is_salesman}"><input type="checkbox" class="is_salesman" ${row.is_salesman ? 'checked' : ''}></td>
                    <td style="${style_active}"><span class="${activeClass}">${row.is_inactive}</span></td>
                    <td style="${is_allow_to_buy_and_sell}" class="td_is_allow_to_buy_and_sell">${row.is_allow_to_buy_and_sell}</td>
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
                    <td id="footer_style_is_allow_to_buy_and_sell" style="${is_allow_to_buy_and_sell}"></td>
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
        tableContainer.innerHTML = tableHTML;
        setupColumnSorting('review_table');

          //  عمليات صف الاجمالى 
          // جمع القيم في العمود رقم 6
          

// document.getElementById("tFooter6").textContent = totalColumn_Valuu;
tableContainer.querySelector(`#tfooter0`).textContent = slice_array1.length; //  عدد الصفوف
tableContainer.querySelector(`#tfooter11`).textContent = floatToString(true,total_column1.value);


        
if (array1.length > 0 && array1.length <= 50) {
    document.querySelector('#table_footer_showRows_div').style.display = "none";
}

} catch (error) {
    catch_error(error)
} finally {
    hideLoadingIcon(content_space)
}
};


function performSearch() {
    try {
    // الحصول على قيمة البحث
    const searchValue = searchInput.value.trim().toLowerCase();

    // فلترة البيانات بناءً على قيمة البحث
    array1 = filteredData_Array.filter(row => {
        const s1 = performSearch_Row(f1_checkbox, 'account_no', searchValue, row);
        const s2 = performSearch_Row(f2_checkbox, 'account_name', searchValue, row);
        const s3 = performSearch_Row(f3_checkbox, 'job', searchValue, row);
        const s4 = performSearch_Row(f4_checkbox, 'department_name', searchValue, row);
        const s5 = performSearch_Row(f5_checkbox, 'email', searchValue, row);
        const s6 = performSearch_Row(f6_checkbox, 'another_info', searchValue, row);
        const s0 = performSearch_Row(f0_checkbox, 'start_date', searchValue, row);
        const s100 = performSearch_Row(f100_checkbox, 'end_date', searchValue, row);
        const s7 = performSearch_Row(f7_checkbox, 'balance', searchValue, row);
        const s8 = performSearch_Row(f8_checkbox, 'is_inactive', searchValue, row);
        

        // استخدام || بدلاً من && لضمان أن البحث يتم في كلا الحقلين
        return (
        s0 ||
        s100 ||
        s1 ||
        s2 ||
        s3 ||
        s4 ||
        s5 ||
        s6 ||
        s7 ||
        s8
    );
    });

    slice_array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    fillTable();
} catch (error) {
    catch_error
}
}

function ShowAllDataInTable() {
    showAlert(
        "info",
        "ان ظهار كامل البيانات فى القائمة المنسدله لا يؤثر على عمليه البحث فى البيانات"
    );
    slice_array1 = array1.slice(); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    fillTable();
}


function showFirst50RowInTable() {
    slice_array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    fillTable();
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


async function table_view_btn_fn(updateBtn) {
    try {
        showLoadingIcon(updateBtn)
    const permission = await btn_permission('employees_permission','update');

    if (!permission){ // if false
        return;
    };


    const row  = updateBtn.closest("tr")
    let is_inactive = row.cells[13].querySelector('span').textContent;
    is_inactive =  is_inactive === 'نشط' ? 0 : 1
    
    const employees_update_data = {
        x : row.cells[1].textContent,
        href_pageName : `employees_view_ar`,
        href_pageTitle : 'الموظفين',
        account_no : row.cells[2].textContent,
        account_name : row.cells[3].textContent,
        job : row.cells[4].textContent,
        department_id : row.cells[5].textContent,
        department_name : row.cells[6].textContent,
        email : row.cells[7].textContent,
        another_info : row.cells[8].textContent,
        start_date : row.cells[9].textContent,
        end_date : row.cells[10].textContent,
        is_salesman : row.cells[12].querySelector('.is_salesman').checked,
        is_inactive : is_inactive,
        is_allow_to_buy_and_sell: row.querySelector(`.td_is_allow_to_buy_and_sell`).textContent,
    }
  
    sessionStorage.removeItem('employees_update_data')
    sessionStorage.setItem('employees_update_data', JSON.stringify(employees_update_data));                            
    window.location.href = `employees_update_ar`;
} catch (error) {
    catch_error(error)
} finally {
    hideLoadingIcon(updateBtn)
}
}

document.addEventListener("DOMContentLoaded", async function () {
    try {
        showLoadingIcon(content_space)
        showRedirectionReason();
        let conditionsArray = JSON.parse(sessionStorage.getItem("employees_viewArray")) || [];
        let statement_obj = JSON.parse(sessionStorage.getItem("statement_obj")) || [];

        if (statement_obj.length !== 0){            
            permissionName = statement_obj.permissionName
            start_date = statement_obj.start_date
            end_date = statement_obj.end_date
            Qkey = statement_obj.Qkey
            back_href_page = statement_obj.href_pageName
            back_title_page = statement_obj.href_pageTitle

            
            pagePermission("view", permissionName);  // معلق
            sessionStorage.removeItem('employees_viewArray');
            backUp_page1(`employees_viewArray`, Qkey, permissionName, start_date, end_date, back_href_page, back_title_page)
            await restore_page1(getData_fn, `employees_viewArray`)
            sessionStorage.removeItem('statement_obj');
        } else if (conditionsArray.length === 0){

            permissionName = 'employees_permission'
            start_date = false
            end_date = today
            Qkey = null
            back_href_page = 'hr_ar'
            back_title_page = 'إدارة الموارد البشرية'
    
            pagePermission("view", permissionName);  // معلق
            sessionStorage.removeItem('employees_viewArray');
            backUp_page1(`employees_viewArray`, Qkey, permissionName, start_date, end_date, back_href_page, back_title_page)
            await restore_page1(getData_fn, `employees_viewArray`)
        } else {
            await restore_page1(getData_fn, `employees_viewArray`)
        }
        
        
    } catch (error) {
        catch_error(error)
       } finally{
        hideLoadingIcon(content_space)
       }
});




window.addEventListener('beforeprint', function() {
    beforeprint_reviewTable('review_table', 0, 1); // هذا سيخفي العمود الأول والثاني
});
