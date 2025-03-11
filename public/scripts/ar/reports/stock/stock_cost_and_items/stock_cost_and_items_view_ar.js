

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
let item_location;



const h2_text_div = document.querySelector(`#h2_text_div`);
const sub_h2_header = document.querySelector(`#sub_h2_header`);
let is_filter = false;
const back_href = document.querySelector(`#back_href`);
const account_type_select = document.querySelector(`#account_type_select`);

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
const indices = [0, 1]; // ضع هنا الأرقام التي تريد تضمينها




back_href.onclick = async function (event) {
    event.preventDefault();
   await back_href_fn1(getData_fn, `stock_cost_and_items_viewArray`, 'stock_cost_and_items_view_ar', `report_map_ar`)
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
            sessionStorage.removeItem('stock_cost_and_items_viewArray');
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
            "/report_stock_cost_and_items_view_ar",
            {x, start_date, end_date, other_obj},
            permissionName,"view",
            60,
            false,'',
            false,
            false,false,
            false,false,'',
            false,'',
            false,'report_map_ar',
            'حدث خطأ اثناء معالجة البيانات'
        )        
        
        data = d.account_statement

        h2_text_div.textContent = `حركة صنف / ${d.account_name}`
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

        back_href_page = 'stock_cost_and_items_view_ar'
        back_title_page = 'حركة صنف'

        sub_h2_header.textContent = `من ${reverseDateFormatting(start_date)}   الى   ${reverseDateFormatting(end_date)}`;
            showFirst50RowAtTheBegening(); 
            backUp_page1(`stock_cost_and_items_viewArray`, Qkey, permissionName, start_date, end_date, back_href_page, back_title_page, false, false, item_location)
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

            const isAccountNameMatch =
            filterData_string_column_with_showAndHiddenCheckbox(
                f1_checkbox,
                f1_select,
                f1_input,
                "row_note",
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

        page_content.style.display = "none";
        showLoadingIcon(content_space);

        let style_id = `display: none;`;
        let style_datex = `display: table-cell; width: auto; white-space: nowrap; text-align: start`;
        let style_referenceconcat = `display: table-cell; width: ${f1_checkbox.checked ? 'auto' : '100%'}; white-space: nowrap; text-align: start`;
        let style_row_note = `display: table-cell; width: 100%; white-space: nowrap; text-align: start`;
        let style_amount = `display: table-cell; width: auto; white-space: nowrap; text-align: start`;
        let style_avg = `display: table-cell; width: auto; white-space: nowrap; text-align: start`;
        let style_cost = `display: table-cell; width: auto; white-space: nowrap; text-align: start`;
        let style_total_amount = `display: table-cell; width: auto; white-space: nowrap; text-align: start`;
        let style_total_avg = `display: table-cell; width: auto; white-space: nowrap; text-align: start`;
        let style_total_cost = `display: table-cell; width: auto; white-space: nowrap; text-align: start`;

        total_column1.value = 0;
        total_column2.value = 0;
        total_column3.value = 0;
        let fn = `onclick = "statment_table_balance1_btn_fn(this)"`;

        // إعداد رأس الجدول
        // هنا بناء الجدول بدون صف الأزرار
        let tableHTML = `<table id="review_table" class="review_table">
                        <thead>
                            <tr>
                                <th style="${style_id}">id</th>
                                <th style="${style_id}">type</th>
                                <th style="${style_datex}">التاريخ</th>
                                <th style="${style_referenceconcat}">المرجع</th>
                                <th style="${style_row_note}">البيان</th>
                                <th style="${style_amount}">الكمية</th>
                                <th style="${style_avg}">المتوسط</th>
                                <th style="${style_cost}">التكلفة</th>
                                <th style="${style_total_amount}">اجمالى الكمية</th>
                                <th style="${style_total_avg}">المتوسط</th>
                                <th style="${style_total_cost}">اجمالى التكلفة</th>
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

            tableHTML +=
                     `<tr>
                        <td style="${style_id};" class="td_id">${row.x}</td>
                        <td style="${style_id};" class="td_type">${row.type}</td>
                        <td style="${style_datex};" class="td_datex">${row.datex}</td>
                        <td style="${style_referenceconcat};" class="td_referenceconcat">${row.referenceconcat}</td>
                        <td style="${style_row_note};" class="td_row_note">${row.row_note ? row.row_note : ''}</td>
                        ${tdNumber(true,false,false,+row.amount === 0? '' : +row.amount, style_amount,total_column1,fn,'td_amount')}
                        ${tdNumber(false,false,false,+row.avg === 0? '' : +row.avg, style_avg,total_column2,false,'td_avg')}
                        ${tdNumber(true,false,false,+row.cogs === 0? '' : +row.cogs, style_cost,false,fn,'td_cogs')}
                        ${tdNumber(false,false,false,+row.total_amount === 0? '' : +row.total_amount, style_total_amount,false,false,'td_total_amount')}
                        ${tdNumber(false,false,false,+row.total_avg === 0? '' : +row.total_avg, style_total_avg,false,false,'td_total_avg')}
                        ${tdNumber(false,true,false,+row.total_cogs === 0? '' : +row.total_cogs, style_total_cost,total_column2,false,'td_total_cogs')}
                      </tr>`;
        });

        tableHTML += `
                    <tr class="table_totals_row">
                                <td id="footer_style_id" style="${style_id}"></td>
                                <td id="footer_style_type" style="${style_id}"></td>
                                <td id="footer_style_datex" style="${style_datex}"></td>
                                <td id="footer_style_referenceconcat" style="${style_referenceconcat}"></td>
                                <td id="footer_style_row_note" style="${style_row_note}"></td>
                                <td id="footer_style_amount" style="${style_amount}"></td>
                                <td id="footer_style_avg" style="${style_avg}"></td>
                                <td id="footer_style_cost" style="${style_cost}"></td>
                                <td id="footer_style_total_amount" style="${style_total_amount}"></td>
                                <td id="footer_style_total_avg" style="${style_total_avg}"></td>
                                <td id="footer_style_total_cost" style="${style_total_cost}"></td>
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
        hideLoadingIcon(content_space);
        page_content.style.display = "flex";
        //  عمليات صف الاجمالى
        // جمع القيم في العمود رقم 6
//500500
      tableContainer.querySelector(`#footer_style_datex`).textContent = slice_array1.length; //  عدد الصفوف

        tableContainer.querySelector(`#footer_style_amount`).textContent = floatToString(true,total_column1.value);  aloow_to_add_negative_color(tableContainer.querySelector(`#footer_style_amount`), total_column1.value);
        tableContainer.querySelector(`#footer_style_total_cost`).textContent = floatToString(true,total_column2.value); aloow_to_add_negative_color(tableContainer.querySelector(`#footer_style_total_cost`), total_column2.value);
        // tableContainer.querySelector(`#footer_style_balance`).textContent = floatToString(true,total_column3.value); aloow_to_add_negative_color(tableContainer.querySelector(`#footer_style_balance`), total_column3.value)

        // if (array1.length > 0 && array1.length <= 50) {
        //     document.querySelector("#table_footer_showRows_div").style.display ="none";
        // }

    } catch (error) {
        hideLoadingIcon(content_space);
        catch_error(error);
    }
}

function performSearch() {
    try {
        // الحصول على قيمة البحث
        const searchValue = searchInput.value.trim().toLowerCase();

        // فلترة البيانات بناءً على قيمة البحث

        array1 = filteredData_Array.filter((row) => {
            const accountName_Match = performSearch_Row(f1_checkbox,"row_note",searchValue,row);


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
     
    const type = row.querySelector(`.td_type`).textContent
    const obj = {
    x: row.querySelector(`.td_id`).textContent,
    href_pageName : 'stock_cost_and_items_view_ar',
    href_pageTitle : 'حركة صنف / كمية وقيمة'
    }

    if (!type || !obj.x){
        return;
    }

    if (+type === 2){
        sessionStorage.setItem('transaction_update_data', JSON.stringify(obj));                            
        window.location.href = `transaction_update_ar`;
        return;
    } else if (+type === 3){
        sessionStorage.setItem('sales_invoice_update_data', JSON.stringify(obj));
        window.location.href = `sales_invoice_update_ar`;
        return;
    } else if (+type === 4){
        sessionStorage.setItem('sales_returns_update_data', JSON.stringify(obj));                            
        window.location.href = `sales_returns_update_ar`;
        return;
    } else if (+type === 6){
        sessionStorage.setItem('purshases_invoice_update_data', JSON.stringify(obj));                            
        window.location.href = `purshases_invoice_update_ar`;
        return;
    } else if (+type === 7){
        sessionStorage.setItem('purshases_returns_update_data', JSON.stringify(obj));                            
        window.location.href = `purshases_returns_update_ar`;
        return;
    } else if (+type === 12){
        sessionStorage.setItem('items_transfer_update_data', JSON.stringify(obj));                            
        window.location.href = `items_transfer_update_ar`;
        return;
    } else if (+type === 31){
        sessionStorage.setItem('production_orders_update_data', JSON.stringify(obj));                            
        window.location.href = `production_orders_update_ar`;
        return;
    }

    //sessionStorage.setItem('obj_stock_cost_and_items', JSON.stringify(obj_stock_cost_and_items));
    //window.location.href = `stock_cost_and_items_view_ar`;
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

        Qkey = document.querySelector(`#dropdown_div1_hidden_input`).value
        if(!Qkey){
            showAlert('warning', 'برجاء تحديد الحساب بشكل صحيح')
            return;
        }
        start_date = start_date_input.value;
        end_date = end_date_input.value;
        permissionName = `items_permissions`
        back_href_page = 'report_map_ar'
        back_title_page = 'التقارير'
        //item_location = document.querySelector(`#dropdown_div2_hidden_input`).value || false

        // is_hiding_zero_balances = checked_hide_zero_balabce.checked
        // is_show_account_no = false

        const obj_stock_cost_and_items = {
            x: Qkey,
            permissionName : permissionName,
            start_date : start_date,
            end_date : end_date,
            back_href_page : back_href_page,
            back_title_page : back_title_page,
           // item_location : item_location
        }
        sessionStorage.setItem('obj_stock_cost_and_items', JSON.stringify(obj_stock_cost_and_items)); 

        backUp_page1(`stock_cost_and_items_viewArray`, Qkey, permissionName, start_date, end_date, back_href_page, back_title_page, false, false, item_location)
        await restore_page1(getData_fn, `stock_cost_and_items_viewArray`)

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
let account_name = ''

function select_change(){
    const type = account_type_select.value
    filtered_accounts_array = orignal_accounts_array.filter(item => +item.account_type_id === +type)
    create_drop_down_with_External_DataArray(`dropdown_div1`,filtered_accounts_array); //selectedRow_dropdownDiv(`dropdown_div3`,vendorsDataArray,headerDataArray.account_id);
}

account_type_select.onchange = async function () {
    select_change()
}

async function load_accounts_data() {
  try {

    
    data = await new_fetchData_postAndGet(
        '/get_items_movement_data_for_report',
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

       // create_drop_down_with_External_DataArray(`dropdown_div2`,data.locations);// selectedRow_dropdownDiv(`dropdown_div3`,customersDataArray,headerDataArray.account_id);
        
        show_dialogx()
  } catch (error) {
    catch_error(error)
  }
}


document.addEventListener("DOMContentLoaded", async function () {
try {  
    showLoadingIcon(content_space)

const obj_stock_cost_and_items = JSON.parse(sessionStorage.getItem('obj_stock_cost_and_items'));



if (obj_stock_cost_and_items && obj_stock_cost_and_items.x && obj_stock_cost_and_items.permissionName && obj_stock_cost_and_items.start_date && obj_stock_cost_and_items.end_date && obj_stock_cost_and_items.back_href_page && obj_stock_cost_and_items.back_title_page){
    report_setting_icon.style.display = 'none'

    permissionName = obj_stock_cost_and_items.permissionName
    start_date = obj_stock_cost_and_items.start_date;
    end_date = obj_stock_cost_and_items.end_date;
    Qkey = obj_stock_cost_and_items.x
    back_href_page = obj_stock_cost_and_items.back_href_page;
    back_title_page = obj_stock_cost_and_items.back_title_page;
    other_obj = obj_stock_cost_and_items.other_obj;
    item_location = obj_stock_cost_and_items.item_location;

    

    pagePermission("view", obj_stock_cost_and_items.permissionName);  // معلق
    sessionStorage.removeItem('stock_cost_and_items_viewArray');
    backUp_page1(`stock_cost_and_items_viewArray`, Qkey, permissionName, start_date, end_date, back_href_page, back_title_page, false, false, item_location)
    await restore_page1(getData_fn, `stock_cost_and_items_viewArray`)
    
}else{
    pagePermission("view", 'items_permission');  // معلق

    await load_accounts_data()
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
