

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
let other_obj = {};
let account_name;



const h2_text_div = document.querySelector(`#h2_text_div`);
const sub_h2_header = document.querySelector(`#sub_h2_header`);
let is_filter = false;
const back_href = document.querySelector(`#back_href`);
const account_type_select = document.querySelector(`#account_type_select`);

start_date = firstDayOfYear;
start_date = lastDayOfYear;
let is_recieved_params_from_effects_update = false;
let is_recieved_params_from_department_view = false;



const tableContainer = document.querySelector("#tableContainer");
const searchBtn = document.querySelector("#searchBtn");
const searchInput = document.querySelector("#searchInput");


//! department name
let f1_div = filter_div.querySelector(`#f1_div`);
let f1_checkbox = filter_div.querySelector(`#f1_checkbox`);
let f1_selectAndInput_div = filter_div.querySelector(`#f1_selectAndInput_div`);
let f1_select = filter_div.querySelector(`#f1_select`);
let f1_input = filter_div.querySelector(`#f1_input`);

//! account_name
let f2_div = filter_div.querySelector(`#f2_div`);
let f2_checkbox = filter_div.querySelector(`#f2_checkbox`);
let f2_selectAndInput_div = filter_div.querySelector(`#f2_selectAndInput_div`);
let f2_select = filter_div.querySelector(`#f2_select`);
let f2_input = filter_div.querySelector(`#f2_input`);

//! days
let f3_div = filter_div.querySelector(`#f3_div`);
let f3_checkbox = filter_div.querySelector(`#f3_checkbox`);
let f3_selectAndInput_div = filter_div.querySelector(`#f3_selectAndInput_div`);
let f3_select = filter_div.querySelector(`#f3_select`);
let f3_input = filter_div.querySelector(`#f3_input`);

//! hours
let f4_div = filter_div.querySelector(`#f4_div`);
let f4_checkbox = filter_div.querySelector(`#f4_checkbox`);
let f4_selectAndInput_div = filter_div.querySelector(`#f4_selectAndInput_div`);
let f4_select = filter_div.querySelector(`#f4_select`);
let f4_input = filter_div.querySelector(`#f4_input`);

//! values
let f5_div = filter_div.querySelector(`#f5_div`);
let f5_checkbox = filter_div.querySelector(`#f5_checkbox`);
let f5_selectAndInput_div = filter_div.querySelector(`#f5_selectAndInput_div`);
let f5_select = filter_div.querySelector(`#f5_select`);
let f5_input = filter_div.querySelector(`#f5_input`);

//! active
let f6_div = filter_div.querySelector(`#f6_div`);
let f6_checkbox = filter_div.querySelector(`#f6_checkbox`);
let f6_selectAndInput_div = filter_div.querySelector(`#f6_selectAndInput_div`);
let f6_select = filter_div.querySelector(`#f6_select`);
let f6_input = filter_div.querySelector(`#f6_input`);




const btn_do = filter_div.querySelector(`#btn_do`);
const indices = [1,2,3,4,5,6]; // ضع هنا الأرقام التي تريد تضمينها




back_href.onclick = async function (event) {
    event.preventDefault();
   await back_href_fn1(getData_fn, `aggregated_effects_viewArray`, 'aggregated_effects_view_ar', `report_map_ar`)
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
            datex_input_end_date1.value = today
    
        }
    
        }
}

function deafult_checkbox() {
    call_default_checkbox('f1',true,false,false) 
    call_default_checkbox('f2',true,true,false) 
    call_default_checkbox('f3',true,true,false) 
    call_default_checkbox('f4',true,true,false) 
    call_default_checkbox('f5',true,true,false) 
    call_default_checkbox('f6',true,true,false) 
}


async function filter_icon_cancel_fn() {
    try {

        if(is_filter){

            await showDialog("","هل تريد الغاء التصفية والرجوع الى الحالة الافتراضية ؟","");
            if (!dialogAnswer) {
                return;
            }
    
            deafult_checkbox();
            sub_h2_header.textContent = `من ${reverseDateFormatting(start_date)}   الى   ${reverseDateFormatting(end_date)}`;
            
            await getData_fn();
            closeDialog();
            sessionStorage.removeItem('aggregated_effects_viewArray');
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



async function getData_fn(permissionName, x, start_date, end_date) {
    try {       

        const d = await new_fetchData_postAndGet(
            "/report_aggregated_effects_view_ar",
            {x, start_date, end_date, other_obj},
            permissionName,"view",
            60,
            false,'',
            false,
            false,false,
            false,false,'',
            false,'',
            true,back_href_page,
            'حدث خطأ اثناء معالجة البيانات'
        )        
        

        data = d.account_statement
       // account_name = d.account_name
       // h2_text_div.textContent = `المؤثرات / ${account_name}`
       h2_text_div.textContent = `تقرير مؤثرات مُجمع `
        sub_h2_header.textContent = `من ${reverseDateFormatting(start_date)}   الى   ${reverseDateFormatting(end_date)}`;
        
        showFirst50RowAtTheBegening();
        back_href.title = back_href_page;
        back_href.href = back_title_page;
        
        //return d

    } catch (error) {
      catch_error(error)
    }
}


async function Execution() {
    try {
        showLoadingIcon(content_space);
        is_filter = true
        searchInput.value = "";

        back_href_page = 'aggregated_effects_view_ar'
        back_title_page = 'تقرير مؤثرات مُجمع'

        sub_h2_header.textContent = `من ${reverseDateFormatting(start_date)}   الى   ${reverseDateFormatting(end_date)}`;
            showFirst50RowAtTheBegening(); 
            backUp_page1(`aggregated_effects_viewArray`, Qkey, permissionName, start_date, end_date, back_href_page, back_title_page)

    } catch (error) {
        catch_error(error);
    } finally{
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
    await Execution();
};



function showFirst50RowAtTheBegening() {
    try {

        page_content.style.display = "none";

        filteredData_Array = data.filter((row) => {

            const f1 =
            filterData_string_column_with_showAndHiddenCheckbox(
                f1_checkbox,
                f1_select,
                f1_input,
                "department_name",
                row
            );

            const f2 =
            filterData_string_column_with_showAndHiddenCheckbox(
                f2_checkbox,
                f2_select,
                f2_input,
                "employee_name",
                row
            );            
               
            const f3 =
                filterData_number_column_with_showAndHiddenCheckbox(
                    f3_checkbox,
                    f3_select,
                    f3_input,
                    "days",
                    row
                );

                const f4 =
                filterData_number_column_with_showAndHiddenCheckbox(
                    f4_checkbox,
                    f4_select,
                    f4_input,
                    "hours",
                    row
                );
                
                const f5 =
                filterData_number_column_with_showAndHiddenCheckbox(
                    f5_checkbox,
                    f5_select,
                    f5_input,
                    "values",
                    row
                );

                const f6 =
                filterData_string_column_with_showAndHiddenCheckbox_with_only_select(
                    f6_checkbox,
                    f6_select,
                    //f5_input,
                    "is_inactive",
                    row
                );                   

                return (
                  f1 &&
                  f2 &&
                  f3 &&
                  f4 &&
                  f5 &&
                  f6
              ); // && otherCondition;
        });

        // QKey = null;

        array1 = filteredData_Array.slice();

       // slice_array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
       slice_array1 = array1
        fillTable();

    } catch (error) {
        catch_error(error);
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

        showLoadingIcon(content_space);

        let style_id = `display: none;`;
        let style_department_name = `display:${f1_checkbox.checked ? "table-cell" : "none"}; auto; white-space: nowrap; text-align: start;`;
        let style_account_name = `display: table-cell; min-width: 25rem; width: 100%; white-space: wrap; text-align: start;`;
        let style_balance1 = `display:${f3_checkbox.checked ? "table-cell" : "none"}; width: auto; white-space: nowrap; text-align: start`;
        let style_balance2 = `display:${f4_checkbox.checked ? "table-cell" : "none"}; width: auto; white-space: nowrap; text-align: start`;
        let style_balance3 = `display:${f5_checkbox.checked ? "table-cell" : "none"}; width: auto; white-space: nowrap; text-align: start`;
        let style_active = `display:${f6_checkbox.checked ? "table-cell" : "none"};  width: auto; white-space: nowrap; text-align: start;`;

        total_column1.value = 0;
        total_column2.value = 0;
        total_column3.value = 0;
        let fn1 = `onclick = "statment_table_balance1_btn_fn(this)"`;

        // إعداد رأس الجدول
        // هنا بناء الجدول بدون صف الأزرار
        let tableHTML = `<table id="review_table" class="review_table">
                        <thead>
                            <tr>
                                <th style="${style_department_name}">القسم</th>        
                                <th style="${style_id}">#</th>
                                <th style="${style_account_name}">الموظف</th>
                                <th style="${style_balance1}">يوم</th>
                                <th style="${style_balance2}">ساعة</th>
                                <th style="${style_balance3}">قيمة</th>
                                <th style="${style_active}">الحالة</th>
                            </tr>
                        </thead>
                        <tbody>`;

                        
        slice_array1.forEach((row) => {

 /*
            let payment_status_class;
            if(row.payment_status.includes('مدفوع بالكامل')){
                payment_status_class = 'table_green_condition'
            }else if(row.payment_status.includes('مدفوع مقدماً')){
                payment_status_class = 'table_blue_condition'
            }else if(row.payment_status.includes('مستحق اليوم')){
                payment_status_class = 'table_blue_condition'
            }else if(row.payment_status.includes('مستحق منذ')){
                payment_status_class = 'table_red_condition'
            }else if(row.payment_status.includes('يستحق بعد')){
                payment_status_class = 'table_orange_condition'
            }
*/

        let activeClass =
        row.is_inactive == "غير نشط"? "table_red_condition": "table_green_condition";


            tableHTML +=
                     `<tr>
                        <td style="${style_department_name}" class="td_department_name">${row.department_name}</td>
                        <td style="${style_id}" class="td_employee_x">${row.employee_x}</td>
                        <td style="${style_account_name}" class="td_employee_name">${row.employee_name}</td>
                        ${tdNumber(true,false,false,row.days,style_balance1,total_column1,fn1,'td_days')}
                        ${tdNumber(true,false,false,row.hours,style_balance2,total_column2,fn1,'td_hours')}
                        ${tdNumber(true,false,false,row.values,style_balance3,total_column3,fn1,'td_values')}
                        <td style="${style_active}"><span class="${activeClass}">${row.is_inactive}</span></td>
                      </tr>`;
        });

        tableHTML += `
                    <tr class="table_totals_row">
                        <td id="footer_style_department_name" style="${style_department_name}"></td>
                        <td id="footer_style_id1" style="${style_id}"></td>
                        <td id="footer_style_account_name" style="${style_account_name}"></td>
                        <td id="footer_style_balance1" style="${style_balance1}"></td>
                        <td id="footer_style_balance2" style="${style_balance2}"></td>
                        <td id="footer_style_balance3" style="${style_balance3}"></td>
                        <td id="footer_style_active" style="${style_active}"></td>
                    </tr>
                </tbody>
            </table>`;

        // هنا إضافة صف الأزرار بعد إغلاق الجدول
        tableHTML += `<div id="table_fotter_buttons_row" class="table_fotter_buttons_row_div">
                    <div id="table_footer_showRows_div" class='flex_H'>
                        <button class="table_footer_show_data" id="copy" onclick="copyTableToClipboard(this,'review_table')">نسخ الى الحافظة</button>
                    </div>
                 </div>`;

        // تحديث محتوى الصفحة بناءً على البيانات
        tableContainer.innerHTML = tableHTML;
        // setupColumnSorting("review_table");
        //  عمليات صف الاجمالى
        // جمع القيم في العمود رقم 6
//500500
tableContainer.querySelector(`#footer_style_account_name`).textContent = slice_array1.length; //  عدد الصفوف
tableContainer.querySelector(`#footer_style_balance1`).textContent = floatToString(true,total_column1.value);  aloow_to_add_negative_color(tableContainer.querySelector(`#footer_style_debit`), total_column1.value);
tableContainer.querySelector(`#footer_style_balance2`).textContent = floatToString(true,total_column2.value); aloow_to_add_negative_color(tableContainer.querySelector(`#footer_style_credit`), total_column2.value);
tableContainer.querySelector(`#footer_style_balance3`).textContent = floatToString(true,total_column3.value); aloow_to_add_negative_color(tableContainer.querySelector(`#footer_style_credit`), total_column3.value);
        // tableContainer.querySelector(`#footer_style_balance`).textContent = floatToString(true,total_column3.value); aloow_to_add_negative_color(tableContainer.querySelector(`#footer_style_balance`), total_column3.value)

        // if (array1.length > 0 && array1.length <= 50) {
        //     document.querySelector("#table_footer_showRows_div").style.display ="none";
        // }

    } catch (error) {
        catch_error(error);
    } finally {
      hideLoadingIcon(content_space);
    }
}

function performSearch() {
    try {
        // الحصول على قيمة البحث
        const searchValue = searchInput.value.trim().toLowerCase();

        // فلترة البيانات بناءً على قيمة البحث

        array1 = filteredData_Array.filter((row) => {
            const s1 = performSearch_Row(f1_checkbox,"department_name",searchValue,row);
            const s2 = performSearch_Row(f2_checkbox,"employee_name",searchValue,row);
            const s3 = performSearch_Row(f3_checkbox,"days",searchValue,row);
            const s4 = performSearch_Row(f4_checkbox,"hours",searchValue,row);
            const s5 = performSearch_Row(f5_checkbox,"values",searchValue,row);
            const s6 = performSearch_Row(f6_checkbox,"is_inactive",searchValue,row);


            return (
              s1 ||
              s2 ||
              s3 ||
              s4 ||
              s5 ||
              s6
          );
        });

     //   slice_array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
        slice_array1 = array1; // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
        fillTable();
    } catch (error) {
        catch_error;
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
    slice_array1 = array1//.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    fillTable();
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



async function statment_table_balance1_btn_fn(balanceBtn1) {
    try {
    // const permission = await btn_permission('customers_permission','view');

    // if (!permission){ // if false
    //     return;
    // };

    const row  = balanceBtn1.closest("tr")
     
    const effects_update_data = {
      x: row.querySelector(`.td_id`).textContent,
      href_pageName : `aggregated_effects_view_ar`,
      href_pageTitle : 'تقرير المؤثرات الفردى لكل مزظف',
      acc_name: account_name,
      datex: row.querySelector(`.td_datex`).textContent,
      referenceCONCAT: row.querySelector(`.td_referenceconcat`).textContent,
      emp_x: row.querySelector(`.td_employee_x`).textContent,
      days: row.querySelector(`.td_days`).textContent,
      hours: row.querySelector(`.td_hours`).textContent,
      values: row.querySelector(`.td_values`).textContent,
      note: row.querySelector(`.td_note`).textContent,

  };


  sessionStorage.removeItem('effects_update_data')
  sessionStorage.setItem('effects_update_data', JSON.stringify(effects_update_data));                            
  window.location.href = `effects_update_ar`;


} catch (error) {
    catch_error(error)
}
};


//#region dialog
const dialogOverlay_input = document.querySelector(`#dialogOverlay_input`);
const report_name_input = document.querySelector(`#report_name_input`);
const end_date_input = document.querySelector(`#end_date_input`);
const checked_hide_zero_balabce = document.querySelector(`#checked_hide_zero_balabce`);
// const checked_show_account_no = document.querySelector(`#checked_show_account_no`);
const view_report_btn = document.querySelector(`#view_report_btn`);
const cancel_report_btn = document.querySelector(`#cancel_report_btn`);
const report_setting_icon = document.querySelector(`#report_setting_icon`);






view_report_btn.onclick = async function () {
    try {
        showLoadingIcon(view_report_btn)
        Qkey = false
/*
        Qkey = document.querySelector(`#dropdown_div1_hidden_input`).value
        if(!Qkey){
            showAlert('warning', 'برجاء تحديد الموظف بشكل صحيح')
            return;
        }
*/
        start_date = start_date_input.value;
        end_date = end_date_input.value;
        permissionName = `effects_permissions`
        back_href_page = 'report_map_ar'
        back_title_page = 'التقارير'

        // is_hiding_zero_balances = checked_hide_zero_balabce.checked
        // is_show_account_no = false

        const obj_aggregated_effects = {
            x: false,
            permissionName : permissionName,
            start_date : start_date,
            end_date : end_date,
            back_href_page : back_href_page,
            back_title_page : back_title_page
        }
        sessionStorage.setItem('obj_aggregated_effects', JSON.stringify(obj_aggregated_effects)); 

        
        backUp_page1(`aggregated_effects_viewArray`, Qkey, permissionName, start_date, end_date, back_href_page, back_title_page)
        await restore_page1(getData_fn, `aggregated_effects_viewArray`)

      
        close_dialogx()
    } catch (error) {
        catch_error(error)
    } finally{
        hideLoadingIcon(view_report_btn)

    }
}

function show_dialogx(){
    start_date_input.value = firstDayOfYear
    end_date_input.value = today
    // checked_hide_zero_balabce.checked = true
    // checked_show_account_no.checked = false
    dialogOverlay_input.style.display = 'flex' // show dialog
}


report_setting_icon.onclick = function(){
    show_dialogx()
}


cancel_report_btn.onclick = function(){
    close_dialogx()
}

function close_dialogx(){
    try {
        if (!sub_h2_header.textContent){
            window.location.href = `report_map_ar`;
        }
        cancel_dialogOverlay_input(dialogOverlay_input)
    } catch (error) {
        catch_error(error)
    }
}
//#endregion end dialog




let orignal_accounts_array = [];
let filtered_accounts_array = [];
let get_accounts_type_array = [];

/*
function select_change(){
    const type = account_type_select.value
    filtered_accounts_array = orignal_accounts_array.filter(item => +item.account_type_id === +type)
    create_drop_down_with_External_DataArray(`dropdown_div1`,filtered_accounts_array); //selectedRow_dropdownDiv(`dropdown_div3`,vendorsDataArray,headerDataArray.account_id);
}
*/
/*
account_type_select.onchange = async function () {
    select_change()
}
*/
/*
async function load_accounts_data() {
  try {

    
    data = await new_fetchData_postAndGet(
        '/get_effects_data_for_report_effects_statement',
        {},
        '', '',
        60,
        false,'',
        true,
        false, false,
        false, false,
        'حدث خطأ اثناء معالجه البيانات'
      )


    for (const row of data.accounts_types) {
      const option = `<option value="${row.id}" ${row.id === 1 ? 'selected' : ''}>${row.account_type_name}</option>`;
      get_accounts_type_array.push(option);
    }
        account_type_select.innerHTML = get_accounts_type_array;
        orignal_accounts_array = data.accounts
        select_change()

        show_dialogx()
  } catch (error) {
    catch_error(error)
  }
}
*/

document.addEventListener("DOMContentLoaded", async function () {
try {  
    showLoadingIcon(content_space)

const obj_aggregated_effects = JSON.parse(sessionStorage.getItem('obj_aggregated_effects'));



if (obj_aggregated_effects){
    report_setting_icon.style.display = 'none'

    permissionName = obj_aggregated_effects.permissionName
    start_date = obj_aggregated_effects.start_date;
    end_date = obj_aggregated_effects.end_date;
    Qkey = obj_aggregated_effects.x
    back_href_page = obj_aggregated_effects.back_href_page;
    back_title_page = obj_aggregated_effects.back_title_page;
    other_obj = obj_aggregated_effects.other_obj;

    

    pagePermission("view", obj_aggregated_effects.permissionName);  // معلق
    sessionStorage.removeItem('aggregated_effects_viewArray');
    backUp_page1(`aggregated_effects_viewArray`, Qkey, permissionName, start_date, end_date, back_href_page, back_title_page)
    await restore_page1(getData_fn, `aggregated_effects_viewArray`)
    
}else{
    pagePermission("view", 'effects_permission');  // معلق

    //await load_accounts_data()
    show_dialogx()
}
    showRedirectionReason();
} catch (error) {
    catch_error(error)
} finally{
    hideLoadingIcon(content_space)
}
});

window.addEventListener("beforeprint", function () {
    beforeprint_reviewTable("review_table", 0, 1); // هذا سيخفي العمود الأول والثاني
});

/*--------------------------------------------------------------------------------*/
