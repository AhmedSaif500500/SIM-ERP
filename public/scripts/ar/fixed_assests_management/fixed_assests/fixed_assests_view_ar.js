setActiveSidebar("fixedAssestsMain_view_ar");  
//pagePermission("view", "fixed_assests_permission");  // معلق

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
    sessionStorage.removeItem('fixed_assests_update_data')
    window.location.href = "/fixed_assests_add_ar";
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

//! تاريخ الشراء
let f0_div = filter_div.querySelector(`#f0_div`);
let f0_checkbox_div = filter_div.querySelector(`#f0_checkbox_div`);
let f0_checkbox = filter_div.querySelector(`#f0_checkbox`);
let f0_select = filter_div.querySelector(`#f0_select`);
let f0_input_start_date1 = filter_div.querySelector(`#f0_input_start_date1`); f0_input_start_date1.value = firstDayOfYear;
let f0_input_end_date1 = filter_div.querySelector(`#f0_input_end_date1`); f0_input_end_date1.value = lastDayOfYear;

//! تاريخ اول اهلاك
let f100_div = filter_div.querySelector(`#f100_div`);
let f100_checkbox_div = filter_div.querySelector(`#f100_checkbox_div`);
let f100_checkbox = filter_div.querySelector(`#f100_checkbox`);
let f100_select = filter_div.querySelector(`#f100_select`);
let f100_input_start_date1 = filter_div.querySelector(`#f100_input_start_date1`); f100_input_start_date1.value = firstDayOfYear;
let f100_input_end_date1 = filter_div.querySelector(`#f100_input_end_date1`); f100_input_end_date1.value = lastDayOfYear;


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

//! account group desc
let f3_div = filter_div.querySelector(`#f3_div`);
let f3_checkbox = filter_div.querySelector(`#f3_checkbox`);
let f3_selectAndInput_div = filter_div.querySelector(`#f3_selectAndInput_div`);
let f3_select = filter_div.querySelector(`#f3_select`);
let f3_input = filter_div.querySelector(`#f3_input`);

//! account desc
let f4_div = filter_div.querySelector(`#f4_div`);
let f4_checkbox = filter_div.querySelector(`#f4_checkbox`);
let f4_selectAndInput_div = filter_div.querySelector(`#f4_selectAndInput_div`);
let f4_select = filter_div.querySelector(`#f4_select`);
let f4_input = filter_div.querySelector(`#f4_input`);

//! und depre value
let f5_div = filter_div.querySelector(`#f5_div`);
let f5_checkbox = filter_div.querySelector(`#f5_checkbox`);
let f5_selectAndInput_div = filter_div.querySelector(`#f5_selectAndInput_div`);
let f5_select = filter_div.querySelector(`#f5_select`);
let f5_input = filter_div.querySelector(`#f5_input`);

//! depr rate
let f6_div = filter_div.querySelector(`#f6_div`);
let f6_checkbox = filter_div.querySelector(`#f6_checkbox`);
let f6_selectAndInput_div = filter_div.querySelector(`#f6_selectAndInput_div`);
let f6_select = filter_div.querySelector(`#f6_select`);
let f6_input = filter_div.querySelector(`#f6_input`);

//! purshases value
let f7_div = filter_div.querySelector(`#f7_div`);
let f7_checkbox = filter_div.querySelector(`#f7_checkbox`);
let f7_selectAndInput_div = filter_div.querySelector(`#f7_selectAndInput_div`);
let f7_select = filter_div.querySelector(`#f7_select`);
let f7_input = filter_div.querySelector(`#f7_input`);

//! ما تم اهلاكه
let f8_div = filter_div.querySelector(`#f8_div`);
let f8_checkbox = filter_div.querySelector(`#f8_checkbox`);
let f8_selectAndInput_div = filter_div.querySelector(`#f8_selectAndInput_div`);
let f8_select = filter_div.querySelector(`#f8_select`);
let f8_input = filter_div.querySelector(`#f8_input`);


//! book_value
let f9_div = filter_div.querySelector(`#f9_div`);
let f9_checkbox = filter_div.querySelector(`#f9_checkbox`);
let f9_selectAndInput_div = filter_div.querySelector(`#f9_selectAndInput_div`);
let f9_select = filter_div.querySelector(`#f9_select`);
let f9_input = filter_div.querySelector(`#f9_input`);

//! assest_status
let f10_div = filter_div.querySelector(`#f10_div`);
let f10_checkbox = filter_div.querySelector(`#f10_checkbox`);
let f10_selectAndInput_div = filter_div.querySelector(`#f10_selectAndInput_div`);
let f10_select = filter_div.querySelector(`#f10_select`);
let f10_input = filter_div.querySelector(`#f10_input`);


const btn_do = filter_div.querySelector(`#btn_do`);
const indices = [0, 100, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // ضع هنا الأرقام التي تريد تضمينها


back_href.onclick = async function (event) {
    event.preventDefault();
    await back_href_fn1(getData_fn, `fixed_assests_viewArray`, `fixed_assests_view_ar`, `fixedAssestsMain_view_ar`)
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
    call_default_checkbox('f1',true,false,false) // account_no
    call_default_checkbox('f2',true,true,false) // account_name
    call_default_checkbox('f3',true,false,false) // account_group
    call_default_checkbox('f4',true,false,false) // account_desc
    call_default_checkbox('f5',true,false,false) // un dep value
    call_default_checkbox('f6',true,true,false) // rate
    call_default_checkbox('f7',true,true,false) // purshases value
    call_default_checkbox('f8',true,true,false) // depeaceated
    call_default_checkbox('f9',true,true,false) // book value

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
            sessionStorage.removeItem('fixed_assests_ViewArray');
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
            "/fixed_assests_view",
            {end_date},
            "fixed_assests_permission","view",
            60,
            false,'',
            false,
            false,false,
            false,false,'',
            false,'',
            false,'fixedAssestsMain_view_ar',
            'حدث خطأ اثناء معالجة البيانات'
        )

        h2_text_div.textContent = `الأصول الثابتة`
        sub_h2_header.textContent = ` حتى تاريخ  ${reverseDateFormatting(end_date)}`;
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

        permissionName = 'fixed_assests_permission'
        start_date = false
        end_date = end_date
        Qkey = false
        back_href_page = 'fixed_assests_view_ar'
        back_title_page = 'الأصول الثابتة'


        const datechange = is_datexChanged()
        if (datechange){
            await getData_fn();
        }else{            
            showFirst50RowAtTheBegening();
        }

            backUp_page1(`fixed_assests_viewArray`, Qkey, permissionName, start_date, end_date, back_href_page, back_title_page)
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

            const f0 = 
            filterData_date_column_with_two_inputs_and_showAndHiddenCheckbox(
                f0_checkbox,
                f0_select,
                f0_input_start_date1,
                f0_input_end_date1,
                "purshases_date",
                row
            );

            const f100 = 
            filterData_date_column_with_two_inputs_and_showAndHiddenCheckbox(
                f100_checkbox,
                f100_select,
                f100_input_start_date1,
                f100_input_end_date1,
                "started_depreciation_date",
                row
            );

            const f1 =
            filterData_string_column_with_showAndHiddenCheckbox(
                f1_checkbox,
                f1_select,
                f1_input,
                "account_no",
                row
            );


            const f2 =
                filterData_string_column_with_showAndHiddenCheckbox(
                    f2_checkbox,
                    f2_select,
                    f2_input,
                    "account_name",
                    row
                );

                const f3 =
                filterData_string_column_with_showAndHiddenCheckbox(
                    f3_checkbox,
                    f3_select,
                    f3_input,
                    "fixed_ssests_group_name",
                    row
                );                

            const f4 =
                filterData_string_column_with_showAndHiddenCheckbox(
                    f4_checkbox,
                    f4_select,
                    f4_input,
                    "asset_info",
                    row
                );

            const f5 =
                filterData_number_column_with_showAndHiddenCheckbox(
                    f5_checkbox,
                    f5_select,
                    f5_input,
                    "un_depericated_value",
                    row
                );

            const f6 = 
                filterData_number_column_with_showAndHiddenCheckbox(
                    f6_checkbox,
                    f6_select,
                    f4_input,
                    'rate_value',
                    row
                );

                const f7 =
                filterData_number_column_with_showAndHiddenCheckbox(
                    f7_checkbox,
                    f7_select,
                    f7_input,
                    "asset_cost",
                    row
                );

                const f8 =
                filterData_number_column_with_showAndHiddenCheckbox(
                    f8_checkbox,
                    f8_select,
                    f8_input,
                    "depreciation_value",
                    row
                );

                const f9 =
                filterData_number_column_with_showAndHiddenCheckbox(
                    f9_checkbox,
                    f9_select,
                    f9_input,
                    "book_value",
                    row
                );

                const f10 = filterData_string_column_with_showAndHiddenCheckbox_with_only_select(f10_checkbox, f10_select, 'assest_status', row);

            return (

                f0 &&
                f100 &&
                f1 &&
                f2 &&
                f4 &&
                f5 &&
                f6 &&
                f7 &&
                f8 &&
                f9 &&
                f8 &&
                f9 &&
                f10
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

        showLoadingIcon(content_space);

        let style_button = `width: auto; white-space: nowrap; text-align: center;`;
        let style_id = `display: none;`;
        let style_account_no = `display:${f1_checkbox.checked ? "table-cell" : "none"}; width: auto; white-space: nowrap; text-align: start`;
        let style_account_name = `display: table-cell; width: 100%; white-space: nowrap; text-align: start`;
        let style_purshases_date = `display:${f0_checkbox.checked ? "table-cell" : "none"}; width: auto; white-space: nowrap; text-align: start`;
        let style_started_depreciation_date = `display:${f100_checkbox.checked ? "table-cell" : "none"}; width: auto; white-space: nowrap; text-align: start`;
        let style_rate_value = `display:${f6_checkbox.checked ? "table-cell" : "none"}; width: auto; white-space: nowrap; text-align: start`;
        let style_un_depericated_value = `display:${f5_checkbox.checked ? "table-cell" : "none"}; width: auto; white-space: nowrap; text-align: start`;
        let style_asset_info = `display:${f4_checkbox.checked ? "table-cell" : "none"}; width: auto; min-width: 10rem; white-space: wrap; text-align: start`;
        let style_fixed_ssests_group_name = `display:${f3_checkbox.checked ? "table-cell" : "none"}; width: auto; min-width: 10rem; white-space: wrap; text-align: start`;
        let style_asset_cost = `display:${f7_checkbox.checked ? "table-cell" : "none"}; width: auto; white-space: nowrap; text-align: start`;
        let style_depreciation_value = `display:${f8_checkbox.checked ? "table-cell" : "none"}; width: auto; white-space: nowrap; text-align: start`;
        let style_book_value = `display:${f9_checkbox.checked ? "table-cell" : "none"}; width: auto; white-space: nowrap; text-align: start`;
        let style_status_value = `display:${f10_checkbox.checked ? "table-cell" : "none"}; width: auto; white-space: nowrap; text-align: start`;


        total_column1.value = 0;
        total_column2.value = 0;
        total_column3.value = 0;
        let fn1 = `onclick = "table_balance1_btn_to_statetment_fn1(this, 'td_id', 'fixed_assests_permission', firstDayOfYear, end_date, 'fixed_assests_view_ar', 'الأصول الثابتة', {fixed_assests : 'fixed_assest_only'}, 'account_statement_view_ar', 'obj_statement')"`;
        let fn2 = `onclick = "table_balance1_btn_to_statetment_fn1(this, 'td_id', 'fixed_assests_permission', firstDayOfYear, end_date, 'fixed_assests_view_ar', 'الأصول الثابتة', {fixed_assests : 'accumulated_depreciation_only'}, 'account_statement_view_ar', 'obj_statement')"`;
        let fn3 = `onclick = "table_balance1_btn_to_statetment_fn1(this, 'td_id', 'fixed_assests_permission', firstDayOfYear, end_date, 'fixed_assests_view_ar', 'الأصول الثابتة', {fixed_assests : 'mixed'}, 'account_statement_view_ar', 'obj_statement')"`;

        // let fn3 = `onclick = "table_update_btn_fn(this)"`;

        // إعداد رأس الجدول
        // هنا بناء الجدول بدون صف الأزرار
        let tableHTML = `<table id="review_table" class="review_table">
                        <thead>
                            <tr>
                                <th style="${style_button}"></th>
                                <th style="${style_id}">ID</th>
                                <th style="${style_account_no}">المعرف</th>
                                <th style="${style_account_name}">الاصل</th>
                                <th style="${style_purshases_date}">تاريخ الشراء</th>
                                <th style="${style_started_depreciation_date}">بداية الاهلاك</th>
                                <th style="${style_asset_info}">بيانات اخرى</th>
                                <th style="${style_fixed_ssests_group_name}">وصف المجموعه</th>
                                <th style="${style_un_depericated_value}">قيمه غير قابلة للاهلاك</th>
                                <th style="${style_rate_value}">المعدل</th>
                                <th style="${style_asset_cost}">التكلفة</th>
                                <th style="${style_depreciation_value}">الاهلاك</th>
                                <th style="${style_book_value}">القيمة الدفترية</th>
                                <th style="${style_status_value}">الحالة</th>
                            </tr>
                        </thead>
                        <tbody>`;

        slice_array1.forEach((row) => {
                
            const rate = row.rate_value ? `${row.rate_value}%` : '';
            
            // let referenceCONCAT = `${getYear(row.datex)}-${formatToFiveDigits(row.reference)}`
            let asset_status_class = 'table_green_condition';
            
            // if(row.payment_status.includes('مدفوع بالكامل')){
            //     payment_status_class = 'table_green_condition'
            // }else if(row.payment_status.includes('مدفوع مقدماً')){
            //     payment_status_class = 'table_blue_condition'
            // }else if(row.payment_status.includes('مستحق اليوم')){
            //     payment_status_class = 'table_blue_condition'
            // }else if(row.payment_status.includes('مستحق منذ')){
            //     payment_status_class = 'table_red_condition'
            // }else if(row.payment_status.includes('يستحق بعد')){
            //     payment_status_class = 'table_orange_condition'
            // }

            tableHTML +=
                     `<tr>
                        <td style="${style_button}"><button class="table_view_btn" onclick="table_update_btn_fn(this)">عرض</button></td>
                        <td style="${style_id}" class="td_id">${row.id}</td>
                        <td style="${style_account_no}" class="td_account_no">${row.account_no}</td>
                        <td style="${style_account_name}" class="td_account_name">${row.account_name}</td>
                        <td style="${style_purshases_date}" class="td_purshases_date">${row.purshases_date}</td>
                        <td style="${style_started_depreciation_date}" class="td_started_depreciation_date">${row.started_depreciation_date}</td>
                        <td style="${style_asset_info}" class="td_asset_info">${row.asset_info}</td>
                        <td style="${style_fixed_ssests_group_name}" class="td_fixed_ssests_group_name">${row.fixed_ssests_group_name}</td>
                        <td style="${style_un_depericated_value}" class="td_un_depericated_value">${row.un_depericated_value}</td>
                        <td style="${style_rate_value}" class="td_rate_value">${rate}</td>
                        ${tdNumber(true,false,true,row.asset_cost,style_asset_cost,total_column1,fn1,'td_asset_cost')}
                        ${tdNumber(true,false,true,row.depreciation_value,style_depreciation_value,total_column2,fn2,'td_depreciation_value')}
                        ${tdNumber(true,true,true,row.book_value,style_book_value,total_column3,fn3,'td_book_value')}
                        <td style="${style_status_value}"><span class="${asset_status_class} td_payment_status">${row.assest_status}</span></td>
                      </tr>`;
        });

        tableHTML += `
                    <tr class="table_totals_row">
                        <td id="footer_style_button" style="${style_button}"></td>
                        <td id="footer_style_id1" style="${style_id}"></td>
                        <td id="footer_style_account_no" style="${style_account_no}"></td>
                        <td id="footer_style_account_name" style="${style_account_name}"></td>
                        <td id="footer_style_purshases_date" style="${style_purshases_date}"></td>
                        <td id="footer_style_started_depreciation_date" style="${style_started_depreciation_date}"></td>
                        <td id="footer_style_asset_info" style="${style_asset_info}"></td>
                        <td id="footer_style_fixed_ssests_group_name" style="${style_fixed_ssests_group_name}"></td>
                        <td id="footer_style_un_depericated_value" style="${style_un_depericated_value}"></td>
                        <td id="footer_style_rate_value" style="${style_rate_value}"></td>
                        <td id="footer_style_asset_cost" style="${style_asset_cost}"></td>
                        <td id="footer_style_depreciation_value" style="${style_depreciation_value}"></td>
                        <td id="footer_style_book_value" style="${style_book_value}"></td>
                        <td id="footer_style_status_value" style="${style_status_value}"></td>
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

        //  عمليات صف الاجمالى
        // جمع القيم في العمود رقم 6

        // document.getElementById("tFooter6").textContent = totalColumn_Valuu;
        tableContainer.querySelector(`#footer_style_button`).textContent = slice_array1.length; //  عدد الصفوف

        tableContainer.querySelector(`#footer_style_asset_cost`).textContent = floatToString(true,total_column1.value);
        tableContainer.querySelector(`#footer_style_depreciation_value`).textContent = floatToString(true,total_column2.value);
        tableContainer.querySelector(`#footer_style_book_value`).textContent = floatToString(true,total_column3.value);

        if (array1.length > 0 && array1.length <= 50) {
            document.querySelector("#table_footer_showRows_div").style.display ="none";
        }

        
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
            const s1 = performSearch_Row(f1_checkbox,"account_no",searchValue,row);
            const s2 = performSearch_Row(f2_checkbox,"account_name",searchValue,row);
            const s0 = performSearch_Row(f0_checkbox,"purshases_date",searchValue,row);
            const s100 = performSearch_Row(f100_checkbox,"started_depreciation_date",searchValue,row);
            const s6 = performSearch_Row(f6_checkbox,"rate_value",searchValue,row);
            const s5 = performSearch_Row(f5_checkbox,"un_depericated_value",searchValue,row);
            const s3 = performSearch_Row(f3_checkbox,"fixed_ssests_group_name",searchValue,row);
            const s4 = performSearch_Row(f4_checkbox,"asset_info",searchValue,row);
            const s7 = performSearch_Row(f7_checkbox,"asset_cost",searchValue,row);
            const s8 = performSearch_Row(f8_checkbox,"depreciation_value",searchValue,row);
            const s9 = performSearch_Row(f9_checkbox,"book_value",searchValue,row);
            const s10 = performSearch_Row(f10_checkbox,"assest_status",searchValue,row);

            // استخدام || بدلاً من && لضمان أن البحث يتم في كلا الحقلين
            return (
                s1 ||
                s2 ||
                s3 ||
                s4 ||
                s5 ||
                s6 ||
                s7 ||
                s8 ||
                s9 ||
                s10 ||
                s0 ||
                s100
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
    const permission = await btn_permission("fixed_assests_permission", "view");

    if (!permission) {
        // if false
        return;
    }

    const row = updateBtn.closest("tr");
    const fixed_assests_update_data = {
        x: row.querySelector(`.td_id`).textContent,
        href_pageName : `fixed_assests_view_ar`,
        href_pageTitle : 'الأصول الثابتة',
    };

    sessionStorage.removeItem('fixed_assests_update_data')
    sessionStorage.setItem('fixed_assests_update_data', JSON.stringify(fixed_assests_update_data));                            
    window.location.href = `fixed_assests_update_ar`;
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
        let conditionsArray = JSON.parse(sessionStorage.getItem("fixed_assests_viewArray")) || [];
        let statement_obj = JSON.parse(sessionStorage.getItem("statement_obj")) || [];

        if (statement_obj.length !== 0){            
            permissionName = statement_obj.permissionName
            start_date = statement_obj.start_date
            end_date = statement_obj.end_date
            Qkey = statement_obj.Qkey
            back_href_page = statement_obj.href_pageName
            back_title_page = statement_obj.href_pageTitle

            
            pagePermission("view", permissionName);  // معلق
            sessionStorage.removeItem('fixed_assests_viewArray');
            backUp_page1(`fixed_assests_viewArray`, Qkey, permissionName, start_date, end_date, back_href_page, back_title_page)
            await restore_page1(getData_fn, `fixed_assests_viewArray`)
            sessionStorage.removeItem('statement_obj');
        } else if (conditionsArray.length === 0){

            permissionName = 'fixed_assests_permission'
            start_date = false
            end_date = today
            Qkey = null
             back_href_page = 'fixedAssestsMain_view_ar'
            back_title_page = 'إدارة الأصل الثابتة'
    
            pagePermission("view", permissionName);  // معلق
            sessionStorage.removeItem('fixed_assests_viewArray');
            backUp_page1(`fixed_assests_viewArray`, Qkey, permissionName, start_date, end_date, back_href_page, back_title_page)
            await restore_page1(getData_fn, `fixed_assests_viewArray`)
        } else {
            await restore_page1(getData_fn, `fixed_assests_viewArray`)
        }


        handle_fn_options()
    } catch (error) {
        catch_error(error)
       } finally{
        hideLoadingIcon(content_space)
       }
});

async function importData(){
    const permission = await btn_permission('fixed_assests_permission', 'add');

    if (!permission) {
        showAlert(`warning`, `⚠️ عذرا لا تملك الصلاحية لاستيراد البيانات`)
      return;
    };

    window.location.href = 'import_data_fixedAssests';
}

function handle_fn_options(){  
    const newDivs = `
      <div id="fn_importData_btn" onclick="importData()">استيراد بيانات</div>
    `;
    fn_options_div.insertAdjacentHTML('afterbegin', newDivs);
  }

window.addEventListener("beforeprint", function () {
    beforeprint_reviewTable("review_table", 0, 1); // هذا سيخفي العمود الأول والثاني
});

/*--------------------------------------------------------------------------------*/
