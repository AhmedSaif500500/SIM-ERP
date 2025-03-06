
const h2_text_div = document.querySelector(`#h2_text_div`);
const sub_h2_header = document.querySelector(`#sub_h2_header`);
let is_filter = false;
const back_href = document.querySelector(`#back_href`);

let is_recieved_params_from_effects_update = false;
let is_recieved_params_from_department_view = false;

const tableContainer = document.querySelector("#tableContainer");
const searchBtn = document.querySelector("#searchBtn");
const searchInput = document.querySelector("#searchInput");



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
let is_show_account_no = false;

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
    await back_href_fn1(getData_fn, `stock_location_viewArray`, `stock_location_view_ar`, `report_map_ar`)
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
            sub_h2_header.textContent = `كما فى ${reverseDateFormatting(end_date_input.value)}}`;
            
            await getData_fn();
            closeDialog();
            sessionStorage.removeItem('financeStatement_view_Array');
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

    data = await new_fetchData_postAndGet(
        "/get_stock_report",
        {checkedAll, end_date, is_hiding_zero_balances, is_show_account_no, locations_array},
        "pass","pass", // معلق
        60,
        false,false,
        true,
        false,false,
        false,false,false,
        false,false,
        true,'report_map_ar',
        'حدث خطأ اثناء معالجة البيانات'
    )
  
    data = data.report
    

                    // h2_text_div.textContent = `كشف حساب / ${d.account_name}`
            //    sub_h2_header.textContent = `من ${reverseDateFormatting(start_date)}   الى   ${reverseDateFormatting(end_date)}`;
            //    back_href.title = back_href_page;
            //    back_href.href = back_title_page;   
         
    showFirst50RowAtTheBegening();
   
}


async function Execution() {
    try {
        showLoadingIcon(content_space);
        is_filter = true
        searchInput.value = "";

        start_date = false;
        end_date = end_date;
        permissionName = `items_permissions`
        back_href_page = 'stock_location_view_ar'
        back_title_page = 'جرد الاصناف حسب المخزون'

        showFirst50RowAtTheBegening();
        backUp_page1(`stock_location_viewArray`, Qkey, permissionName, start_date, end_date, back_href_page, back_title_page)
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
        // page_content.style.display = "none";
        showLoadingIcon(content_space);
        // تعريف أنماط الأعمدة
        let style_id = `display: none;`;
        let style_account_name = `display: table-cell; width: 100%; padding-inline-start: 0.7rem; white-space: nowrap; text-align: start;`;
        let deafult_style_balance = `display: table-cell; width: auto; white-space: nowrap; text-align: start;`;

        let diffrence = 0;
        total_column1.value = 0;
        //let fn1 = `onclick = "handle_fn1(this)"`;
        // let fn1 = `onclick = "table_balance1_btn_to_statetment_fn1(this, 'td_id', 'items_permission', firstDayOfYear, lastDayOfYear, 'items_table_view_ar', 'أصناف المخزون', {item_location : false}, 'item_movement_view_ar', 'obj_item_movement')"`;

        // استخراج أسماء الأعمدة بشكل ديناميكي من أول صف
        let columns = slice_array1.length > 0 ? Object.keys(slice_array1[0]) : [];

        // إعداد رأس الجدول
        let tableHTML = `<table id="review_table" class="review_table">
                            <thead>
                                <tr>`;

        columns.forEach(col => {
            if (col === "item_id") {
                tableHTML += `<th style="${style_id}">#</th>`;
            } else if (col === "account_name") {
                tableHTML += `<th style="${style_account_name}">الصنف</th>`;
            }else if (col === "total_balance"){
                tableHTML += `<th style="${deafult_style_balance}">الرصيد</th>`;
            } else {
                tableHTML += `<th style="${deafult_style_balance}">${col}</th>`;
            }
        });

        tableHTML += `</tr></thead><tbody>`;

        // إنشاء الصفوف بناءً على البيانات
        slice_array1.forEach((row) => {
            tableHTML += `<tr>`;

            columns.forEach(col => {
                if (col === "item_id"){
                    tableHTML += `<td style="${style_id}" class='td_id'>${row[col]}</td>`;
                }else if (col === "account_name"){
                    tableHTML += `<td style="${style_account_name}">${row[col]}</td>`; 
                }else if (col === "total_balance"){
                    let fn1 = `onclick = "table_balance1_btn_to_statetment_fn1(this, 'td_id', 'items_permission', firstDayOfYear, end_date, 'stock_location_view_ar', 'جرد المخزون حسب الموقع', {item_location_name : false}, 'item_movement_view_ar', 'obj_item_movement', false)"`;
                    tableHTML += tdNumber(true,true,true,row[col],deafult_style_balance,false,fn1,false)                
                }else{  
                    let foundItem = data2.find(item => item.account_name === col);       
                    let item_location = foundItem ? foundItem.id : '';
                    let fn1 = `onclick = "table_balance1_btn_to_statetment_fn1(this, 'td_id', 'items_permission', firstDayOfYear, end_date, 'stock_location_view_ar', 'جرد المخزون حسب الموقع', {item_location_name : '${col}'}, 'item_movement_view_ar', 'obj_item_movement', ${item_location})"`;
                    tableHTML += tdNumber(true,false,true,row[col],deafult_style_balance,false,fn1,false)                
                }
            });

            tableHTML += `</tr>`;
        });

        // إضافة صف الإجمالي في التذييل
        tableHTML += `</tbody><tfoot>
                        <tr class="table_totals_row">`;

        columns.forEach(col => {
            if (col === "item_id"){
                tableHTML += `<td style="${style_id}"></td>`;
            }else if (col === "account_name"){
                tableHTML += `<td style="${style_account_name}">${slice_array1.length}</td>`; 
            }else if (col === "total_balance"){
                tableHTML += `<td style="${deafult_style_balance}"></td>`;
            }else{
                tableHTML += `<td style="${deafult_style_balance}"></td>`;
            }

 

            // let value = (col === "account_name") ? "" : (col === "balance") ? diffrence : "";
            // tableHTML += `<td style="${cellStyle}">${value}</td>`;
        });

        tableHTML += `</tr></tfoot></table>`;
        tableHTML += `<div id="table_fotter_buttons_row" class="table_fotter_buttons_row_div">
        <div id="table_footer_showRows_div" class='flex_H'>
            <button class="table_footer_show_data" id="copy" onclick="copyTableToClipboard(this,'review_table')">نسخ الى الحافظة</button>
        </div>
     </div>`;

        // تحديث الصفحة وعرض الجدول
        tableContainer.innerHTML = tableHTML;
        // page_content.style.display = "flex";

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

searchBtn.addEventListener("click", performSearch);

searchInput.addEventListener("search", function () {
    performSearch();
});

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        performSearch();
    }
});



/*--------------------------------------------------------------------------------*/
