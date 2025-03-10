setActiveSidebar("report_map_ar");
//pagePermission("view", "sales_invoice_permission");  // معلق

/*
const newBtn = document.querySelector('#newBtn');
newBtn.onclick = function (){
    sessionStorage.removeItem('sales_invoice_update_data')
    window.location.href = "/sales_invoice_add_ar";
  }
*/

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
let is_hiding_zero_balances;
let is_show_account_no;

const h2_text_div = document.querySelector(`#h2_text_div`);
const sub_h2_header = document.querySelector(`#sub_h2_header`);
let is_filter = false;
const back_href = document.querySelector(`#back_href`);


let is_recieved_params_from_effects_update = false;
let is_recieved_params_from_department_view = false;

const tableContainer = document.querySelector("#tableContainer");
const searchBtn = document.querySelector("#searchBtn");
const searchInput = document.querySelector("#searchInput");


//! accountName
let f1_div = filter_div.querySelector(`#f1_div`);
let f1_checkbox = filter_div.querySelector(`#f1_checkbox`);
let f1_selectAndInput_div = filter_div.querySelector(`#f1_selectAndInput_div`);
let f1_select = filter_div.querySelector(`#f1_select`);
let f1_input = filter_div.querySelector(`#f1_input`);


const btn_do = filter_div.querySelector(`#btn_do`);
const indices = [1]; // ضع هنا الأرقام التي تريد تضمينها

back_href.onclick = async function (event) {
    event.preventDefault();
    await back_href_fn1(getData_fn, `trial_balance_viewArray`, `trial_balance_view_ar`, `report_map_ar`)
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
    call_default_checkbox('f1',true,true,false) // accountName
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
            sessionStorage.removeItem('trialBalanace_view_Array');
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
        //  معلق
        data = await new_fetchData_postAndGet(
            "/reports_trialBalance_view",
            {start_date, end_date, is_hiding_zero_balances, is_show_account_no},
            "pass","pass",
            60,
            false,'',
            false,
            false,false,
            false,false,'',
            false,'',
            false,'report_map_ar',
            'حدث خطأ اثناء معالجة البيانات'
        )

        h2_text_div.textContent = report_name_input.value ? report_name_input.value : 'قائمة المركز المالى' 
        h2_text_div.textContent = `ميزان المراجعه`
        sub_h2_header.textContent = `من ${reverseDateFormatting(start_date)}   الى   ${reverseDateFormatting(end_date)}`;
        back_href.title = back_href_page;
        back_href.href = back_title_page; 

        data = data.trial_balance
        
        showFirst50RowAtTheBegening();
    } catch (error) {
      catch_error(error)
    }
}




async function Execution() {
    try {
        showLoadingIcon(content_space);
        is_filter = true
        searchInput.value = "";


        permissionName = 'accounts_permission'
        start_date = start_date
        end_date = end_date
        Qkey = null
        back_href_page = 'trial_balance_view_ar'
        back_title_page = 'ميزان المراجعه'

        showFirst50RowAtTheBegening();
        backUp_page1(`trial_balance_viewArray`, Qkey, permissionName, start_date, end_date, back_href_page, back_title_page, is_hiding_zero_balances, is_show_account_no)
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
    await Execution();
};



function showFirst50RowAtTheBegening() {
    try {
        page_content.style.display = "none";

        filteredData_Array = data.filter((row) => {

            const isAccountNameMatch =
            filterData_string_column_with_showAndHiddenCheckbox(
                f1_checkbox,
                f1_select,
                f1_input,
                "account_name",
                row
            );
               
            return (
                isAccountNameMatch
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
        let style_g = `display: none;`;
        let style_f = `display: none;`;
        let style_account_name = `display: table-cell; width: 100%; white-space: nowrap; text-align: start`;
        let style_total_value = `display: table-cell; width: auto; white-space: nowrap; text-align: start`;

        total_column1.value = 0;
        total_column2.value = 0;
        total_column3.value = 0;
        total_column4.value = 0;
        total_column5.value = 0;
        total_column6.value = 0;
        let fn1 = `onclick = "statment_table_balance1_btn_fn(this)"`;

        // إعداد رأس الجدول
        // هنا بناء الجدول بدون صف الأزرار
        let tableHTML = `<table id="review_table" class="review_table">
                        <thead>
                            <tr>
                                <th style="${style_id}">#</th>
                                <th style="${style_g}">#</th>
                                <th style="${style_f}">#</th>
                                <th style="${style_account_name}">الحساب</th>
                                <th style="${style_total_value}">مدين اول</th>
                                <th style="${style_total_value}">دائن اول</th>
                                <th style="${style_total_value}">مدين فتره</th>
                                <th style="${style_total_value}">دائن فتره</th>
                                <th style="${style_total_value}">مدين اخر</th>
                                <th style="${style_total_value}">دائن اخر</th>

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

const current_padding = row.padding + 0.5;
const font_size = (+row.g === 1 || +row.g === 2) ? `2rem` : 'var(--Font_normal)';
const text_decoration = (+row.g === 1 || +row.g === 2) ? 'underline' : 'none';
const font_weight = !row.f ? 'bold;': 'normal';
let font_color = !row.f ? 'orange': `var(--Font_Color)`;

const handle_account_name_style = `padding-inline-start:${current_padding}rem; font-size:${font_size}; font-weight:${font_weight}; text-decoration: ${text_decoration}; color:${font_color}`;

const g = [9,10,12]
let x = false
if (g.includes(+row.g) || row.f === true){
    x = true
}

                
            tableHTML +=
                     `<tr>
                        <td style="${style_id}" class="td_id">${row.id}</td>
                        <td style="${style_g}" class="td_g">${row.g}</td>
                        <td style="${style_f}" class="td_f">${row.f}</td>
                        <td style="${style_account_name};${handle_account_name_style}" class="td_account_name">${row.account_name}</td>
                        ${tdNumber(false,false,false,row.debit_first,style_total_value,total_column1,false,'td_debit_first')}
                        ${tdNumber(false,false,false,row.credit_first,style_total_value,total_column2,false,'td_credit_first')}
                        ${tdNumber(false,false,false,row.debit_current,style_total_value,total_column3,false,'td_debit_current')}
                        ${tdNumber(false,false,false,row.credit_current,style_total_value,total_column4,false,'td_credit_current')}
                        ${tdNumber(x,true,false,row.debit_end,style_total_value,total_column5,fn1,'td_debit_end')}
                        ${tdNumber(x,true,false,row.credit_end,style_total_value,total_column6,fn1,'td_credit_end')}
                      </tr>`;
        });

        tableHTML += `
                    <tr class="table_totals_row">
                        <td id="footer_style_id" style="${style_id}"></td>
                        <td id="footer_style_g" style="${style_g}"></td>
                        <td id="footer_style_f" style="${style_f}"></td>
                        <td id="footer_style_account_name" style="${style_account_name}"></td>
                        <td id="footer_debit_first" style="${style_total_value}"></td>
                        <td id="footer_credit_first" style="${style_total_value}"></td>
                        <td id="footer_debit_current" style="${style_total_value}"></td>
                        <td id="footer_credit_current" style="${style_total_value}"></td>
                        <td id="footer_debit_end" style="${style_total_value}"></td>
                        <td id="footer_credit_end" style="${style_total_value}"></td>
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

        // document.getElementById("tFooter6").textContent = totalColumn_Valuu;
      //  tableContainer.querySelector(`#footer_style_button`).textContent = slice_array1.length; //  عدد الصفوف

        // tableContainer.querySelector(`#footer_style_total_value`).textContent = floatToString(true,total_column1.value);
        tableContainer.querySelector(`#footer_debit_first`).textContent = floatToString(true,total_column1.value);
        tableContainer.querySelector(`#footer_credit_first`).textContent = floatToString(true,total_column2.value);
        tableContainer.querySelector(`#footer_debit_current`).textContent = floatToString(true,total_column3.value);
        tableContainer.querySelector(`#footer_credit_current`).textContent = floatToString(true,total_column4.value);
        tableContainer.querySelector(`#footer_debit_end`).textContent = floatToString(true,total_column5.value);
        tableContainer.querySelector(`#footer_credit_end`).textContent = floatToString(true,total_column6.value);

        // if (array1.length > 0 && array1.length <= 50) {
        //     document.querySelector("#table_footer_showRows_div").style.display ="none";
        // }

    } catch (error) {
        catch_error(error);
    } finally {
        hideLoadingIcon(content_space);
    }
}


async function statment_table_balance1_btn_fn(balanceBtn1) {
    try {
    // const permission = await btn_permission('customers_permission','view');

    // if (!permission){ // if false
    //     return;
    // };

    const row  = balanceBtn1.closest("tr")
     

    const x = row.querySelector(`.td_id`).textContent;
    const g = row.querySelector(`.td_g`).textContent;
    const f = row.querySelector(`.td_f`).textContent;

    const obj = {
    permissionName : 'accounts_permission',
    start_date : start_date,
    end_date : end_date,
    Qkey : x,
    href_pageName : 'trial_balance_view_ar',
    href_pageTitle : 'قائمه المركز المالى',
    }


     if (+g === 9){
        sessionStorage.removeItem('fixed_assests_viewArray');
        sessionStorage.removeItem('statement_obj');
        sessionStorage.setItem('statement_obj', JSON.stringify(obj));                            
        window.location.href = `fixed_assests_view_ar`;
        return;
    } else if (+g === 10){
        sessionStorage.removeItem('fixed_assests_viewArray');
        sessionStorage.removeItem('statement_obj');
        sessionStorage.setItem('statement_obj', JSON.stringify(obj));                            
        window.location.href = `fixed_assests_view_ar`;
        return;
    } else if (+g === 12){
        sessionStorage.removeItem('items_table_viewArray');
        sessionStorage.removeItem('statement_obj');
        sessionStorage.setItem('statement_obj', JSON.stringify(obj));                            
        window.location.href = `items_table_view_ar`;
        return;
    } else if (f === 'true'){
        //const date = new Date(end_date);
        //const first_day = `${date.getFullYear()}-01-01`;

        table_balance1_btn_to_statetment_fn1(balanceBtn1, 'td_id', 'accounts_permission', start_date, end_date, 'trial_balance_view_ar', 'ميزان المراجعه', false, 'account_statement_view_ar', 'obj_statement')
        return;
    } else {
        showAlert('warning', '⚠️ لا يمكن عرض تفاصيل هذا الحساب')
    }
    
    
    //sessionStorage.setItem('obj_statement', JSON.stringify(obj_statement));
    //window.location.href = `account_statement_view_ar`;
} catch (error) {
    catch_error(error)
}
};



function performSearch() {
    try {
        // الحصول على قيمة البحث
        const searchValue = searchInput.value.trim().toLowerCase();

        // فلترة البيانات بناءً على قيمة البحث

        array1 = filteredData_Array.filter((row) => {
            const accountName_Match = performSearch_Row(f1_checkbox,"account_name",searchValue,row);


            // استخدام || بدلاً من && لضمان أن البحث يتم في كلا الحقلين
            return (
                accountName_Match
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
    slice_array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
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


//#region dialog
const dialogOverlay_input = document.querySelector(`#dialogOverlay_input`);
const report_name_input = document.querySelector(`#report_name_input`);
const start_date_input = document.querySelector(`#start_date_input`);
const end_date_input = document.querySelector(`#end_date_input`);
const checked_hide_zero_balabce = document.querySelector(`#checked_hide_zero_balabce`);
// const checked_show_account_no = document.querySelector(`#checked_show_account_no`);
const view_report_btn = document.querySelector(`#view_report_btn`);
const cancel_report_btn = document.querySelector(`#cancel_report_btn`);
const report_setting_icon = document.querySelector(`#report_setting_icon`);


view_report_btn.onclick = async function () {
    try {

        showLoadingIcon(view_report_btn)
        permissionName = 'accounts_permission'
        start_date = start_date_input.value; 
        end_date = end_date_input.value;
        
        Qkey = null
        back_href_page = 'report_map_ar'
        back_title_page = 'التقارير'
        is_hiding_zero_balances = checked_hide_zero_balabce.checked
        is_show_account_no = false

        backUp_page1(`trial_balance_viewArray`, Qkey, permissionName, start_date, end_date, back_href_page, back_title_page, is_hiding_zero_balances, is_show_account_no)
        await restore_page1(getData_fn, `trial_balance_viewArray`)                        

    } catch (error) {
        catch_error(error);
    } finally {
        hideLoadingIcon(view_report_btn);
        close_dialogx()
    }
}

function show_dialogx(){
    start_date_input.value = firstDayOfYear
    end_date_input.value = today
    checked_hide_zero_balabce.checked = true
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


document.addEventListener("DOMContentLoaded", async function () {
    try {
        showLoadingIcon(content_space)
        let conditionsArray = JSON.parse(sessionStorage.getItem("trial_balance_viewArray")) || [];
        if (conditionsArray.length === 0){
            show_dialogx()
        }else {
            await restore_page1(getData_fn, `trial_balance_viewArray`)
        }
        showRedirectionReason();
    } catch (error) {
        catch_error(error)
    } finally {
        hideLoadingIcon(content_space)
    }
});


window.addEventListener("beforeprint", function () {
    beforeprint_reviewTable("review_table", 0, 1); // هذا سيخفي العمود الأول والثاني
});

/*--------------------------------------------------------------------------------*/
