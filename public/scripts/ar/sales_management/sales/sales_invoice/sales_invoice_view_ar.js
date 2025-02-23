setActiveSidebar("salesMain_view_ar");  


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

let current_pageName = 'sales_invoice_view_ar';
let viewArray = 'sales_invoice_viewArray';
let updateArray = 'sales_order_update_data';


const newBtn = document.querySelector('#newBtn');
newBtn.onclick = function (){
    sessionStorage.removeItem(updateArray)
    window.location.href = "/sales_invoice_add_ar";
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

//! datex
let f0_div = filter_div.querySelector(`#f0_div`);
let f0_checkbox_div = filter_div.querySelector(`#f0_checkbox_div`);
let f0_checkbox = filter_div.querySelector(`#f0_checkbox`);
let f0_select = filter_div.querySelector(`#f0_select`);
let f0_input_start_date1 = filter_div.querySelector(`#f0_input_start_date1`); f0_input_start_date1.value = firstDayOfYear;
let f0_input_end_date1 = filter_div.querySelector(`#f0_input_end_date1`); f0_input_end_date1.value = lastDayOfYear;

//! datex
let f100_div = filter_div.querySelector(`#f100_div`);
let f100_checkbox_div = filter_div.querySelector(`#f100_checkbox_div`);
let f100_checkbox = filter_div.querySelector(`#f100_checkbox`);
let f100_select = filter_div.querySelector(`#f100_select`);
let f100_input_start_date1 = filter_div.querySelector(`#f100_input_start_date1`); f100_input_start_date1.value = firstDayOfYear;
let f100_input_end_date1 = filter_div.querySelector(`#f100_input_end_date1`); f100_input_end_date1.value = lastDayOfYear;


//! reference
let f1_div = filter_div.querySelector(`#f1_div`);
let f1_checkbox = filter_div.querySelector(`#f1_checkbox`);
let f1_selectAndInput_div = filter_div.querySelector(`#f1_selectAndInput_div`);
let f1_select = filter_div.querySelector(`#f1_select`);
let f1_input = filter_div.querySelector(`#f1_input`);

//! salesman
let f2_div = filter_div.querySelector(`#f2_div`);
let f2_checkbox = filter_div.querySelector(`#f2_checkbox`);
let f2_selectAndInput_div = filter_div.querySelector(`#f2_selectAndInput_div`);
let f2_select = filter_div.querySelector(`#f2_select`);
let f2_input = filter_div.querySelector(`#f2_input`);

//! accountName
let f3_div = filter_div.querySelector(`#f3_div`);
let f3_checkbox = filter_div.querySelector(`#f3_checkbox`);
let f3_selectAndInput_div = filter_div.querySelector(`#f3_selectAndInput_div`);
let f3_select = filter_div.querySelector(`#f3_select`);
let f3_input = filter_div.querySelector(`#f3_input`);

//! note
let f4_div = filter_div.querySelector(`#f4_div`);
let f4_checkbox = filter_div.querySelector(`#f4_checkbox`);
let f4_selectAndInput_div = filter_div.querySelector(`#f4_selectAndInput_div`);
let f4_select = filter_div.querySelector(`#f4_select`);
let f4_input = filter_div.querySelector(`#f4_input`);

//! total_value
let f5_div = filter_div.querySelector(`#f5_div`);
let f5_checkbox = filter_div.querySelector(`#f5_checkbox`);
let f5_selectAndInput_div = filter_div.querySelector(`#f5_selectAndInput_div`);
let f5_select = filter_div.querySelector(`#f5_select`);
let f5_input = filter_div.querySelector(`#f5_input`);

//! payment_status
let f6_div = filter_div.querySelector(`#f6_div`);
let f6_checkbox = filter_div.querySelector(`#f6_checkbox`);
let f6_selectAndInput_div = filter_div.querySelector(`#f6_selectAndInput_div`);
let f6_select = filter_div.querySelector(`#f6_select`);
let f6_input = filter_div.querySelector(`#f6_input`);

//! sales order reference
let f7_div = filter_div.querySelector(`#f7_div`);
let f7_checkbox = filter_div.querySelector(`#f7_checkbox`);
let f7_selectAndInput_div = filter_div.querySelector(`#f7_selectAndInput_div`);
let f7_select = filter_div.querySelector(`#f7_select`);
let f7_input = filter_div.querySelector(`#f7_input`);

//! sales qutation reference
let f8_div = filter_div.querySelector(`#f8_div`);
let f8_checkbox = filter_div.querySelector(`#f8_checkbox`);
let f8_selectAndInput_div = filter_div.querySelector(`#f8_selectAndInput_div`);
let f8_select = filter_div.querySelector(`#f8_select`);
let f8_input = filter_div.querySelector(`#f8_input`);


//! remaining_balance
let f9_div = filter_div.querySelector(`#f9_div`);
let f9_checkbox = filter_div.querySelector(`#f9_checkbox`);
let f9_selectAndInput_div = filter_div.querySelector(`#f9_selectAndInput_div`);
let f9_select = filter_div.querySelector(`#f9_select`);
let f9_input = filter_div.querySelector(`#f9_input`);


const btn_do = filter_div.querySelector(`#btn_do`);
const indices = [0, 100, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // ضع هنا الأرقام التي تريد تضمينها


back_href.onclick = async function (event) {
    event.preventDefault();
    await back_href_fn1(getData_fn, `sales_invoice_viewArray`, `sales_invoice_view_ar`, `salesMain_view_ar`)
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
    call_default_checkbox('f0',true,true,true) // datex
    call_default_checkbox('f100',true,false,true) // due date
    call_default_checkbox('f1',true,true,false) // reference
    call_default_checkbox('f2',true,false,false) // salesman
    call_default_checkbox('f3',true,true,false) // accountName
    call_default_checkbox('f4',true,true,false) // note
    call_default_checkbox('f5',true,true,false) // total_value
    call_default_checkbox('f6',true,true,false) // payment_status
    call_default_checkbox('f7',true,false,false) // sales order Reference
    call_default_checkbox('f8',true,false,false) // sales Qutation Reference
    call_default_checkbox('f9',true,true,false) // remaining_balance

}


async function filter_icon_cancel_fn() {
    try {

        if(is_filter){

            await showDialog("","هل تريد الغاء التصفية والرجوع الى الحالة الافتراضية ؟","");
            if (!dialogAnswer) {
                return;
            }
    
            deafult_checkbox();
            sub_h2_header.textContent = `من ${reverseDateFormatting(f0_input_start_date1.value)}   الى   ${reverseDateFormatting(f0_input_end_date1.value)}`;
            
            await getData_fn();
            closeDialog();
            sessionStorage.removeItem('sales_invoice_viewArray');
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
            "/get_sales_invoice_Data_view",
            {start_date, end_date},
            "sales_invoice_permission","view",
            60,
            false,'',
            false,
            false,false,
            false,false,'',
            false,'',
            false,'salesMain_view_ar',
            'حدث خطأ اثناء معالجة البيانات'
        )

               // h2_text_div.textContent = `كشف حساب / ${d.account_name}`
               sub_h2_header.textContent = `من ${reverseDateFormatting(start_date)}   الى   ${reverseDateFormatting(end_date)}`;
               back_href.title = back_href_page;
               back_href.href = back_title_page;

        showFirst50RowAtTheBegening();
    } catch (error) {
      catch_error(error)
    }
}


function is_datexChanged() {
    if (
        f0_input_start_date1.value !== startDate ||
        f0_input_end_date1.value !== endDate
    ) {

        return true;
    } else {
        return false;
    }
}


async function Execution() {
    try {
        showLoadingIcon(content_space);
        is_filter = true
        searchInput.value = "";

        permissionName = 'sales_invoice_permission'
        start_date = f0_input_start_date1.value
        end_date = f0_input_end_date1.value
        Qkey = null
        back_href_page = 'sales_invoice_view_ar'
        back_title_page = 'فواتير المبيعات'

        const datechange = is_datexChanged()
        if (datechange){
            await getData_fn();
        }else{
            showFirst50RowAtTheBegening();
        }

        backUp_page1(`sales_invoice_viewArray`, Qkey, permissionName, start_date, end_date, back_href_page, back_title_page)

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

            const isdatexMatch = 
            filterData_date_column_with_two_inputs_and_showAndHiddenCheckbox(
                f0_checkbox,
                f0_select,
                f0_input_start_date1,
                f0_input_end_date1,
                "datex",
                row
            );

            const isDueDateMatch = 
            filterData_date_column_with_two_inputs_and_showAndHiddenCheckbox(
                f100_checkbox,
                f100_select,
                f100_input_start_date1,
                f100_input_end_date1,
                "due_date",
                row
            );

            const isReferenceMatch =
            filterData_number_column_with_showAndHiddenCheckbox(
                f1_checkbox,
                f1_select,
                f1_input,
                "referenceconcat",
                row
            );


            const isSalesmanMatch =
                filterData_string_column_with_showAndHiddenCheckbox(
                    f2_checkbox,
                    f2_select,
                    f2_input,
                    "salesman_name",
                    row
                );

                const isSAccountNameMatch =
                filterData_string_column_with_showAndHiddenCheckbox(
                    f3_checkbox,
                    f3_select,
                    f3_input,
                    "customer_name",
                    row
                );                

            const isNoteMatch =
                filterData_string_column_with_showAndHiddenCheckbox(
                    f4_checkbox,
                    f4_select,
                    f4_input,
                    "general_note",
                    row
                );

            const isBalanceMatch =
                filterData_number_column_with_showAndHiddenCheckbox(
                    f5_checkbox,
                    f5_select,
                    f5_input,
                    "total_value",
                    row
                );

            const isPaymentstatusstatus = 
                filterData_string_column_with_showAndHiddenCheckbox(
                    f6_checkbox,
                    f6_select,
                    f4_input,
                    'payment_status',
                    row
                );

                const isOrderReference =
                filterData_number_column_with_showAndHiddenCheckbox(
                    f7_checkbox,
                    f7_select,
                    f7_input,
                    "qutation_reference",
                    row
                );

                const isQutationReference =
                filterData_number_column_with_showAndHiddenCheckbox(
                    f8_checkbox,
                    f8_select,
                    f8_input,
                    "order_reference",
                    row
                );

                const isRemaining_balanceeMatch =
                filterData_number_column_with_showAndHiddenCheckbox(
                    f9_checkbox,
                    f9_select,
                    f9_input,
                    "remaining_balance",
                    row
                );

            return (

                isdatexMatch &&
                isDueDateMatch &&
                isReferenceMatch &&
                isSalesmanMatch &&
                isSAccountNameMatch &&
                isNoteMatch &&
                isBalanceMatch &&
                isPaymentstatusstatus &&
                isQutationReference &&
                isOrderReference &&
                isRemaining_balanceeMatch
            ); // && otherCondition;
        });

        // QKey = null;

        array1 = filteredData_Array.slice();

        slice_array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
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

        let style_button = `width: auto; white-space: nowrap; text-align: center;`;
        let style_id = `display: none;`;
        let style_datex = `display: table-cell; width: auto; white-space: nowrap; text-align: start`;
        let style_due_date = `display:${f100_checkbox.checked ? "table-cell" : "none"}; width: auto; white-space: nowrap; text-align: start`;
        let style_reference = `display: none;`; 
        let style_referenceCONCAT = `display: table-cell; width: auto; white-space: nowrap; text-align: start`;
        let style_order_reference = `display:${f7_checkbox.checked ? "table-cell" : "none"}; width: auto; white-space: nowrap; text-align: start`;
        let style_qutation_reference = `display:${f8_checkbox.checked ? "table-cell" : "none"}; width: auto; white-space: nowrap; text-align: start`;
        let style_salesman = `display:${f2_checkbox.checked ? "table-cell" : "none"}; width: auto; white-space: nowrap; text-align: start;`;
        let style_accountName = `display:${f3_checkbox.checked ? "table-cell" : "none"}; width: ${f4_checkbox.checked ? 'auto' : '100%'}; white-space: nowrap; text-align: start;`;
        let style_note = `display:${f4_checkbox.checked ? "table-cell" : "none"}; min-width: 15rem; width: 100%; white-space: wrap; text-align: start;`;
        let style_total_value = `display:${f5_checkbox.checked ? "table-cell" : "none" }; width: auto; white-space: nowrap; text-align: start`;
        let style_payment_status = `display:${f6_checkbox.checked ? "table-cell" : "none" }; width: auto; white-space: nowrap; text-align: start`;
        let style_remaining_balance = `display:${f9_checkbox.checked ? "table-cell" : "none" }; width: auto; white-space: nowrap; text-align: start`;

        total_column1.value = 0;
        total_column2.value = 0;
        let fn = `onclick = "table_update_btn_fn(this)"`;

        // إعداد رأس الجدول
        // هنا بناء الجدول بدون صف الأزرار
        let tableHTML = `<table id="review_table" class="review_table">
                        <thead>
                            <tr>
                                <th style="${style_button}"></th>
                                <th style="${style_id}">ID</th>
                                <th style="${style_datex}">التاريخ</th>
                                <th style="${style_due_date}">تاريخ الاستحقاق</th>
                                <th style="${style_reference}">#</th>
                                <th style="${style_referenceCONCAT}">#</th>
                                 <th style="${style_id}">id</th>
                                 <th style="${style_accountName}">العميل</th>
                                 <th style="${style_id}">id</th>
                                <th style="${style_salesman}">البائع</th>
                                <th style="${style_id}">order_id</th>
                                <th style="${style_order_reference}">امر بيع</th>
                                <th style="${style_id}">qutation_id</th>
                                <th style="${style_qutation_reference}">عرض السعر</th>
                                <th style="${style_note}">البيان</th>
                                <th style="${style_total_value}">قيمة</th>
                                <th style="${style_remaining_balance}">المستحق</th>
                                <th style="${style_payment_status}">الحاله</th>
                            </tr>
                        </thead>
                        <tbody>`;

        slice_array1.forEach((row) => {
                

            // let referenceCONCAT = `${getYear(row.datex)}-${formatToFiveDigits(row.reference)}`
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

            tableHTML +=
                     `<tr>
                        <td style="${style_button}"><button class="table_view_btn" onclick="table_update_btn_fn(this)">عرض</button></td>
                        <td style="${style_id}" class="td_id">${row.id}</td>
                        <td style="${style_datex}" class="td_datex">${row.datex}</td>
                        <td style="${style_due_date}" class="td_due_date">${row.due_date}</td>
                        <td style="${style_reference}" class="td_reference">${row.reference}</td>
                        <td style="${style_referenceCONCAT}" class="td_referenceconcat">${row.referenceconcat}</td>
                        <td style="${style_id}" class="td_customer_id">${row.customer_id}</td>
                        <td style="${style_accountName}" class="td_customer_name">${row.customer_name}</td>
                        <td style="${style_id}" class="td_salesman_id">${row.salesman_id}</td>
                        <td style="${style_salesman}" class="td_salesman_name">${row.salesman_name}</td>
                        <td style="${style_id}" class="td_order_id">${row.order_id}</td>
                        <td style="${style_order_reference}" class="td_order_reference">${row.order_reference}</td>
                        <td style="${style_id}" class="td_qutation_id">${row.qutation_id}</td>
                        <td style="${style_qutation_reference}" class="td_qutation_reference">${row.qutation_reference}</td>
                        <td style="${style_note}" class="td_general_note">${row.general_note}</td>
                        ${tdNumber(true,false,true,row.total_value,style_total_value,total_column1,fn,'td_total_value')}
                        ${tdNumber(false,false,true,row.remaining_balance,style_remaining_balance,total_column2,fn,'td_remaining_balance')}
                        <td style="${style_payment_status}"><span class="${payment_status_class} td_payment_status">${row.payment_status}</span></td>               
                      </tr>`;
        });

        tableHTML += `
                    <tr class="table_totals_row">
                        <td id="footer_style_button" style="${style_button}"></td>
                        <td id="footer_style_id1" style="${style_id}"></td>
                        <td id="footer_style_datex" style="${style_datex}"></td>
                        <td id="footer_style_due_date" style="${style_due_date}"></td>
                        <td id="footer_style_reference" style="${style_reference}"></td>
                        <td id="footer_style_referenceCONCAT" style="${style_referenceCONCAT}"></td>
                        <td id="footer_style_accountid" style="${style_id}"></td>
                        <td id="footer_style_accountName" style="${style_accountName}"></td>
                        <td id="footer_style_salesmanid" style="${style_id}"></td>
                        <td id="footer_style_salesman" style="${style_salesman}"></td>
                        <td id="footer_style_order_id" style="${style_id}"></td>
                        <td id="footer_style_order_reference" style="${style_order_reference}"></td>
                        <td id="footer_style_qutation_id" style="${style_id}"></td>
                        <td id="footer_style_qutation_reference" style="${style_qutation_reference}"></td>
                        <td id="footer_style_note" style="${style_note}"></td>
                        <td id="footer_style_total_value" style="${style_total_value}"></td>
                        <td id="footer_style_remaining_balance" style="${style_remaining_balance}"></td>
                        <td id="footer_style_payment_status" style="${style_payment_status}"></td>
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
        setupColumnSorting("review_table");
        hideLoadingIcon(content_space);
        page_content.style.display = "flex";
        //  عمليات صف الاجمالى
        // جمع القيم في العمود رقم 6

        // document.getElementById("tFooter6").textContent = totalColumn_Valuu;
        tableContainer.querySelector(`#footer_style_button`).textContent = slice_array1.length; //  عدد الصفوف

        tableContainer.querySelector(`#footer_style_total_value`).textContent = floatToString(true,total_column1.value);
        tableContainer.querySelector(`#footer_style_remaining_balance`).textContent = floatToString(true,total_column2.value);

        if (array1.length > 0 && array1.length <= 50) {
            document.querySelector("#table_footer_showRows_div").style.display ="none";
        }

        startDate = f0_input_start_date1.value;
        endDate = f0_input_end_date1.value;
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
            const datexInfoMatch = performSearch_Row(f0_checkbox,"datex",searchValue,row);
            const dueDateMatch = performSearch_Row(f100_checkbox,"due_date",searchValue,row);
            const reference_Match = performSearch_Row(f1_checkbox,"referenceconcat",searchValue,row);
            const salesman_Match = performSearch_Row(f2_checkbox,"salesman_name",searchValue,row);
            const AccountName_Match = performSearch_Row(f3_checkbox,"customer_name",searchValue,row);
            const noteMatch = performSearch_Row(f4_checkbox,"general_note",searchValue,row);
            const balanceMatch = performSearch_Row(f5_checkbox,"total_value",searchValue,row);
            const orderReference = performSearch_Row(f7_checkbox,"order_reference",searchValue,row);
            const qutationReference = performSearch_Row(f8_checkbox,"qutation_reference",searchValue,row);
            const remaining_balance = performSearch_Row(f9_checkbox,"remaining_balance",searchValue,row);
            const payment_status = performSearch_Row(f6_checkbox,"payment_status",searchValue,row);

            // استخدام || بدلاً من && لضمان أن البحث يتم في كلا الحقلين
            return (
                datexInfoMatch ||
                dueDateMatch ||
                reference_Match ||
                salesman_Match ||
                AccountName_Match ||
                noteMatch ||
                balanceMatch ||
                orderReference ||
                qutationReference ||
                remaining_balance ||
                payment_status
            );
        });

        slice_array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
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

async function table_update_btn_fn(updateBtn) {
    try {
    showLoadingIcon(updateBtn)
    const permission = await btn_permission("sales_invoice_permission", "view");

    if (!permission) {
        // if false
        return;
    }

    const row = updateBtn.closest("tr");
    const sales_invoice_update_data = {
        x: row.querySelector(`.td_id`).textContent,
        href_pageName : `sales_invoice_view_ar`,
        href_pageTitle : 'القيود اليومية',
        qutation_id: row.querySelector(`.td_qutation_id`).textContent,
        order_id: row.querySelector(`.td_order_id`).textContent,
    };


    sessionStorage.removeItem('sales_invoice_update_data')
    sessionStorage.setItem('sales_invoice_update_data', JSON.stringify(sales_invoice_update_data));                            
    window.location.href = `sales_invoice_update_ar`;
} catch (error) {
    catch_error(error)
} finally{
    hideLoadingIcon(updateBtn)
}
}


document.addEventListener("DOMContentLoaded", async function () {
    try {
        showLoadingIcon(content_space)
        showRedirectionReason();
        let conditionsArray = JSON.parse(sessionStorage.getItem("sales_invoice_viewArray")) || [];


        if (conditionsArray.length === 0){
        
            permissionName = 'sales_invoice_permission'
            start_date = firstDayOfYear
            end_date = lastDayOfYear
            Qkey = null
            back_href_page = 'salesMain_view_ar'
            back_title_page = 'إدارة المبيعات'
    
            pagePermission("view", permissionName);  // معلق
            sessionStorage.removeItem('sales_invoice_viewArray');
            backUp_page1(`sales_invoice_viewArray`, Qkey, permissionName, start_date, end_date, back_href_page, back_title_page)
            await restore_page1(getData_fn, `sales_invoice_viewArray`)
        } else {
            await restore_page1(getData_fn, `sales_invoice_viewArray`)
        }
    
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
