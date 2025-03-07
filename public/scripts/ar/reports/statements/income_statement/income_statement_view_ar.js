setActiveSidebar("report_map_ar"); 
//pagePermission("view", "sales_invoice_permission");  // معلق


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


/*
const newBtn = document.querySelector('#newBtn');
newBtn.onclick = function (){
    sessionStorage.removeItem('sales_invoice_update_data')
    window.location.href = "/sales_invoice_add_ar";
  }
*/

//income_statement_view_ar.js


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
    await back_href_fn1(getData_fn, `income_statement_viewArray`, `income_statement_view_ar`, `report_map_ar`)
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
            sub_h2_header.textContent = `من ${reverseDateFormatting(start_date_input.value)}   الى   ${reverseDateFormatting(end_date_input.value)}`;
            
            await getData_fn();
            closeDialog();
            sessionStorage.removeItem('incomeStatement_view_Array');
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
            "/reports_income_statement_view_ar",
            {start_date, end_date, is_hiding_zero_balances, is_show_account_no},
            "pass","pass",
            60,
            false,'',
            true,
            false,false,
            false,false,'',
            false,'',
            false,'report_map_ar',
            'حدث خطأ اثناء معالجة البيانات'
        )

            h2_text_div.textContent = report_name_input.value ? report_name_input.value : 'قائمة الدخل' 
            h2_text_div.textContent = `قائمة الدخل`
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
        start_date = false
        end_date = false
        Qkey = null
        back_href_page = 'income_statement_view_ar'
        back_title_page = 'قائمة الدخل'

        const datechange = is_datexChanged()
        if (datechange){
            await getData_fn();
        }else{
            showFirst50RowAtTheBegening();
        }

        backUp_page1(`income_statment_viewArray`, Qkey, permissionName, start_date, end_date, back_href_page, back_title_page, is_hiding_zero_balances, is_show_account_no)
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

        page_content.style.display = "none";
        showLoadingIcon(content_space);

        let style_id = `display: none;`;
        let style_account_name = `display: table-cell; width: 100%; white-space: nowrap; text-align: start`;
        let deafult_style_total_value = `display: table-cell; width: auto; white-space: nowrap; text-align: start`; 
        let style_total_value = deafult_style_total_value;

        let diffrence = 0
        total_column1.value = 0;
        let fn1 = `onclick = "table_balance1_btn_to_statetment_fn1(this, 'td_id', 'accounts_permission', start_date, end_date, 'income_statement_view_ar', 'قائمة الدخل', false, 'account_statement_view_ar', 'obj_statement')"`;


        // إعداد رأس الجدول
        // هنا بناء الجدول بدون صف الأزرار
        let tableHTML = `<table id="review_table" class="review_table">
                        <thead>
                            <tr>
                                <td style="${style_id}"></td>
                                <th style="${style_account_name}">الحساب</th>
                                <th style="${style_total_value}">${end_date_input.value}</th>

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
const font_size = (+row.global_id === 6 || +row.global_id === 7) ? `1.7rem` : 'var(--Font_normal)';
const text_decoration = (+row.global_id === 6 || +row.global_id === 7) ? 'underline' : 'none';
const font_weight = !row.is_final_account ? 'bold;': 'normal';
let font_color = !row.is_final_account ? 'darkorange': `var(--Font_Color)`;

const handle_account_name_style = `padding-inline-start:${current_padding}rem; font-size:${font_size}; font-weight:${font_weight}; text-decoration: ${text_decoration}; color:${font_color};`;
const handle_balance_style = `font-size:${font_size}; font-weight:${font_weight}; text-decoration: ${text_decoration};`;

if ((+row.global_id === 6 || +row.global_id === 7)){
    style_total_value =`padding-inline-start:${current_padding}rem;` + handle_balance_style + deafult_style_total_value
}else{
    style_total_value = `padding-inline-start:${current_padding}rem;` + deafult_style_total_value
}


if (+row.global_id === 6){
    diffrence = parseFloat(diffrence.toFixed(2)) + +row.balance || 0
}else if(+row.global_id === 7){
    diffrence = parseFloat(diffrence.toFixed(2)) - +row.balance || 0
}

    


            tableHTML +=
                     `<tr>
                        <td style="${style_id}" class="td_id">${row.id}</td>
                        <td style="${style_account_name};${handle_account_name_style}" class="td_account_name">${row.account_name}</td>
                        ${tdNumber(row.is_final_account? true : false,false,false,row.balance,style_total_value,false,row.is_final_account? fn1 : false,'balance')}
                      </tr>`;
        });

        style_total_value = deafult_style_total_value
        tableHTML += `
                    <tr class="table_totals_row">
                        <td style="${style_id}"></td>
                        <td id="footer_style_account_name" style="${style_account_name}; font-size: 1.7rem;">ارباح / خسائر الفترة</td>
                        <td id="footer_debit_first" style="${style_total_value}; opacity: 0.9; font-size: 1.7rem;" class="${+diffrence < 0 ? 'td_negative_number' : ''}">${floatToString(true, diffrence)}</td>
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

        // document.getElementById("tFooter6").textContent = totalColumn_Valuu;
      //  tableContainer.querySelector(`#footer_style_button`).textContent = slice_array1.length; //  عدد الصفوف

        // tableContainer.querySelector(`#footer_style_total_value`).textContent = floatToString(true,total_column1.value);
        // tableContainer.querySelector(`#footer_debit_first`).textContent = floatToString(true,total_column1.value);

        // if (array1.length > 0 && array1.length <= 50) {
        //     document.querySelector("#table_footer_showRows_div").style.display ="none";
        // }

    } catch (error) {
        catch_error(error);
    } finally{
        hideLoadingIcon(content_space);
        close_dialogx()
    }
}

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

        backUp_page1(`income_statement_viewArray`, Qkey, permissionName, start_date, end_date, back_href_page, back_title_page, is_hiding_zero_balances, is_show_account_no)
        await restore_page1(getData_fn, `income_statement_viewArray`)                        

    } catch (error) {
        catch_error(error);
    } finally {
        hideLoadingIcon(view_report_btn);
    }
}

function show_dialogx(){
    start_date_input.value = firstDayOfYear
    end_date_input.value = lastDayOfYear
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
        let conditionsArray = JSON.parse(sessionStorage.getItem("income_statement_viewArray")) || [];
        if (conditionsArray.length === 0){
            show_dialogx()
        }else {
            await restore_page1(getData_fn, `income_statement_viewArray`)
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
