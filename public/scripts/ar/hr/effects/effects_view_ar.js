setActiveSidebar("hr_ar");

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
    //sessionStorage.removeItem()
    window.location.href = "/effects_add_ar";
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
let f0_input_end_date1 = filter_div.querySelector(`#f0_input_end_date1`); f0_input_end_date1.value = today;

//! reference
let f1_div = filter_div.querySelector(`#f1_div`);
let f1_checkbox = filter_div.querySelector(`#f1_checkbox`);
let f1_selectAndInput_div = filter_div.querySelector(`#f1_selectAndInput_div`);
let f1_select = filter_div.querySelector(`#f1_select`);
let f1_input = filter_div.querySelector(`#f1_input`);

//! department
let f2_div = filter_div.querySelector(`#f2_div`);
let f2_checkbox = filter_div.querySelector(`#f2_checkbox`);
let f2_selectAndInput_div = filter_div.querySelector(`#f2_selectAndInput_div`);
let f2_select = filter_div.querySelector(`#f2_select`);
let f2_input = filter_div.querySelector(`#f2_input`);

//! acc no
let f3_div = filter_div.querySelector(`#f3_div`);
let f3_checkbox = filter_div.querySelector(`#f3_checkbox`);
let f3_selectAndInput_div = filter_div.querySelector(`#f3_selectAndInput_div`);
let f3_select = filter_div.querySelector(`#f3_select`);
let f3_input = filter_div.querySelector(`#f3_input`);

//! account_name
let f4_div = filter_div.querySelector(`#f4_div`);
let f4_checkbox = filter_div.querySelector(`#f4_checkbox`);
let f4_selectAndInput_div = filter_div.querySelector(`#f4_selectAndInput_div`);
let f4_select = filter_div.querySelector(`#f4_select`);
let f4_input = filter_div.querySelector(`#f4_input`);

//! note
let f5_div = filter_div.querySelector(`#f5_div`);
let f5_checkbox = filter_div.querySelector(`#f5_checkbox`);
let f5_selectAndInput_div = filter_div.querySelector(`#f5_selectAndInput_div`);
let f5_select = filter_div.querySelector(`#f5_select`);
let f5_input = filter_div.querySelector(`#f5_input`);

//! days
let f6_div = filter_div.querySelector(`#f6_div`);
let f6_checkbox = filter_div.querySelector(`#f6_checkbox`);
let f6_selectAndInput_div = filter_div.querySelector(`#f6_selectAndInput_div`);
let f6_select = filter_div.querySelector(`#f6_select`);
let f6_input = filter_div.querySelector(`#f6_input`);

//! hours
let f7_div = filter_div.querySelector(`#f7_div`);
let f7_checkbox = filter_div.querySelector(`#f7_checkbox`);
let f7_selectAndInput_div = filter_div.querySelector(`#f7_selectAndInput_div`);
let f7_select = filter_div.querySelector(`#f7_select`);
let f7_input = filter_div.querySelector(`#f7_input`);

//! values
let f8_div = filter_div.querySelector(`#f8_div`);
let f8_checkbox = filter_div.querySelector(`#f8_checkbox`);
let f8_selectAndInput_div = filter_div.querySelector(`#f8_selectAndInput_div`);
let f8_select = filter_div.querySelector(`#f8_select`);
let f8_input = filter_div.querySelector(`#f8_input`);


//! active
let f9_div = filter_div.querySelector(`#f9_div`);
let f9_checkbox = filter_div.querySelector(`#f9_checkbox`);
let f9_selectAndInput_div = filter_div.querySelector(`#f9_selectAndInput_div`);
let f9_select = filter_div.querySelector(`#f9_select`);
let f9_input = filter_div.querySelector(`#f9_input`);


const btn_do = filter_div.querySelector(`#btn_do`);
const indices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // ضع هنا الأرقام التي تريد تضمينها


back_href.onclick = async function (event) {
    event.preventDefault();
    await back_href_fn1(getData_fn, `effects_viewArray`, `effects_view_ar`, `hr_ar`)
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
    call_default_checkbox('f0',true,true,true) // datex
    call_default_checkbox('f1',true,true,false) // reference
    call_default_checkbox('f2',true,false,false) // department
    call_default_checkbox('f3',true,false,false) // acc no
    call_default_checkbox('f4',true,true,false) // account name
    call_default_checkbox('f5',true,false,false) // note
    call_default_checkbox('f6',true,true,false) // day
    call_default_checkbox('f7',true,true,false) // hours
    call_default_checkbox('f8',true,true,false) // values
    call_default_checkbox('f9',true,false,false) // active
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
            sessionStorage.removeItem('effects_viewArray');
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
            "/effects_view",
            {start_date, end_date},
            "employees_permission","view",
            60,
            false,'',
            false,
            false,false,
            false,false,'',
            false,'',
            false,'notes_ar',
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
        f0_input_start_date1.value !== start_date ||
        f0_input_end_date1.value !== today
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

        permissionName = 'effects_permission'
        start_date = f0_input_start_date1.value
        end_date = f0_input_end_date1.value
        Qkey = null
        back_href_page = 'effects_view_ar'
        back_title_page = 'المؤثرات'

        const datechange = is_datexChanged()
        if (datechange){
            await getData_fn();
        }else{
            showFirst50RowAtTheBegening();
        }

        backUp_page1(`effects_viewArray`, Qkey, permissionName, start_date, end_date, back_href_page, back_title_page)

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
                "datex",
                row
            );

            const f1 =
            filterData_number_column_with_showAndHiddenCheckbox(
                f1_checkbox,
                f1_select,
                f1_input,
                "referenceconcat",
                row
            );


            const f2 =
                filterData_string_column_with_showAndHiddenCheckbox(
                    f2_checkbox,
                    f2_select,
                    f2_input,
                    "department_name",
                    row
                );

                const f3 =
                filterData_string_column_with_showAndHiddenCheckbox(
                    f3_checkbox,
                    f3_select,
                    f3_input,
                    "account_no",
                    row
                );                

            const f4 =
                filterData_string_column_with_showAndHiddenCheckbox(
                    f4_checkbox,
                    f4_select,
                    f4_input,
                    "account_name",
                    row
                );

                const f5 =
                filterData_string_column_with_showAndHiddenCheckbox(
                    f5_checkbox,
                    f5_select,
                    f5_input,
                    "note",
                    row
                );

            const f6 =
                filterData_number_column_with_showAndHiddenCheckbox(
                    f6_checkbox,
                    f6_select,
                    f6_input,
                    "days",
                    row
                );

                const f7 =
                filterData_number_column_with_showAndHiddenCheckbox(
                    f7_checkbox,
                    f7_select,
                    f7_input,
                    "hours",
                    row
                );

                const f8 =
                filterData_number_column_with_showAndHiddenCheckbox(
                    f8_checkbox,
                    f8_select,
                    f8_input,
                    "values",
                    row
                );
                
                const f9 =
                filterData_string_column_with_showAndHiddenCheckbox_with_only_select(
                    f9_checkbox,
                    f9_select,
                    //f5_input,
                    "is_inactive",
                    row
                );                


            return (
                f0 &&
                f1 &&
                f2 &&
                f3 &&
                f4 &&
                f5 &&
                f6 &&
                f7 &&
                f8 &&
                f9
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
        let style_datex = `display:${f0_checkbox.checked ? "table-cell" : "none"}; width: ${!f4_checkbox.checked && !f5_checkbox.checked ? `100%` : "auto"}; white-space: nowrap; text-align: start`;
        let style_reference = `display: none;`; 
        let style_referenceCONCAT = `display:${f1_checkbox.checked ? "table-cell" : "none"}; width: auto; white-space: nowrap; text-align: start`;
        let style_department_id = `display: none;`;
        let style_department_name = `display:${f2_checkbox.checked ? "table-cell" : "none"}; width: auto; white-space: nowrap; text-align: start`;
        let style_account_no = `display:${f3_checkbox.checked ? "table-cell" : "none"
            };  width: auto; white-space: nowrap; text-align: start`;
        let style_name = `display:${f4_checkbox.checked ? "table-cell" : "none"}; width: ${f5_checkbox.checked ? "auto" : "100%"}; white-space: nowrap; text-align: start`;
        let style_note = `display:${f5_checkbox.checked ? "table-cell" : "none"}; min-width: 25rem; width: 100%; white-space: wrap; text-align: start;`;
        let style_balance1 = `display:${f6_checkbox.checked ? "table-cell" : "none"}; width: auto; white-space: nowrap; text-align: start`;
        let style_balance2 = `display:${f7_checkbox.checked ? "table-cell" : "none"
            }; width: auto; white-space: nowrap; text-align: start`;
        let style_balance3 = `display:${f8_checkbox.checked ? "table-cell" : "none" }; width: auto; white-space: nowrap; text-align: start`;
        let style_active = `display:${f9_checkbox.checked ? "table-cell" : "none"};  width: auto; white-space: nowrap; text-align: start;`;

        total_column1.value = 0;
        total_column2.value = 0;
        total_column3.value = 0;
        let fn1 = `onclick = "table_view_btn_fn(this)"`;


        // إعداد رأس الجدول
        // هنا بناء الجدول بدون صف الأزرار
        let tableHTML = `<table id="review_table" class="review_table">
                        <thead>
                            <tr>
                                <th style="${style_button}"></th>
                                <th style="${style_id}">ID</th>
                                <th style="${style_datex}">التاريخ</th>
                                <th style="${style_referenceCONCAT}">#</th>
                                <th style="${style_department_id}">dep_id</th>
                                <th style="${style_department_name}">القسم</th>
                                <th style="${style_account_no}">المعرف</th>
                                <th style="${style_id}">account_id</th>
                                <th style="${style_name}">الموظف</th>
                                <th style="${style_balance1}">يوم</th>
                                <th style="${style_balance2}">ساعة</th>
                                <th style="${style_balance3}">قيمة</th>
                                <th style="${style_note}">البيان</th>
                                <th style="${style_active}">الحالة</th>
                            </tr>
                        </thead>
                        <tbody>`;

        slice_array1.forEach((row) => {
            let activeClass =
                row.is_inactive == "غير نشط"? "table_red_condition": "table_green_condition";
                
                
                
            tableHTML +=
                     `<tr>
                        <td style="${style_button}"><button class="table_view_btn" onclick="table_view_btn_fn(this)">عرض</button></td>
                        <td style="${style_id}" class="td_id">${row.id}</td>
                        <td style="${style_datex}" class="td_datex">${row.datex}</td>
                        <td style="${style_referenceCONCAT}" class="td_referenceconcat">${row.referenceconcat}</td>
                        <td style="${style_department_id}" class="td_department_id">${row.department_id}</td>
                        <td style="${style_department_name}" class="td_department_name">${row.department_name}</td>
                        <td style="${style_account_no}" class="td_account_no">${row.account_no}</td>
                        <td style="${style_id}" class="td_employee_x">${row.employee_id}</td>
                        <td style="${style_name}" class="td_account_name">${row.account_name}</td>
                        ${tdNumber(false,false,true,row.days,style_balance1,total_column1,fn1,'td_days')}
                        ${tdNumber(false,false,true,row.hours,style_balance2,total_column2,fn1,'td_hours')}
                        ${tdNumber(false,false,true,row.values,style_balance3,total_column3,fn1,'td_values')}
                        <td style="${style_note}" class="td_note">${row.note}</td>
                        <td style="${style_active}"><span class="${activeClass}">${row.is_inactive}</span></td>                        
                      </tr>`;
        });

        tableHTML += `
                    <tr class="table_totals_row">
                        <td id="footer_style_button" style="${style_button}"></td>
                        <td id="footer_style_id1" style="${style_id}"></td>
                        <td id="footer_style_datex" style="${style_datex}"></td>
                        <td id="footer_style_referenceCONCAT" style="${style_referenceCONCAT}"></td>
                        <td id="footer_style_department_id" style="${style_department_id}"></td>
                        <td id="footer_style_department_name" style="${style_department_name}"></td>
                        <td id="footer_style_account_no" style="${style_account_no}"></td>
                        <td id="footer_style_id2" style="${style_id}"></td>
                        <td id="footer_style_name" style="${style_name}"></td>
                        <td id="footer_style_balance1" style="${style_balance1}"></td>
                        <td id="footer_style_balance2" style="${style_balance2}"></td>
                        <td id="footer_style_balance3" style="${style_balance3}"></td>
                        <td id="footer_style_note" style="${style_note}"></td>
                        <td id="footer_style_active" style="${style_active}"></td>
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
        tableContainer.querySelector(`#footer_style_balance1`).textContent = floatToString(true,total_column1.value);
        tableContainer.querySelector(`#footer_style_balance2`).textContent = floatToString(true,total_column2.value);
        tableContainer.querySelector(`#footer_style_balance3`).textContent = floatToString(true,total_column3.value);

        if (array1.length > 0 && array1.length <= 50) {
            document.querySelector("#table_footer_showRows_div").style.display =
                "none";
        }


    } catch (error) {
        hideLoadingIcon(content_space);
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
            const s0 = performSearch_Row(f0_checkbox,"datex",searchValue,row);
            const s1 = performSearch_Row(f1_checkbox,"referenceconcat",searchValue,row);
            const s2 = performSearch_Row(f2_checkbox,"department_name",searchValue,row);
            const s3 = performSearch_Row(f3_checkbox,"account_no",searchValue,row);
            const s4 = performSearch_Row(f4_checkbox,"account_name",searchValue,row);
            const s5 = performSearch_Row(f5_checkbox,"note",searchValue,row);
            const s6 = performSearch_Row(f6_checkbox,"days",searchValue,row);
            const s7 = performSearch_Row(f7_checkbox,"hours",searchValue,row);
            const s8 = performSearch_Row(f8_checkbox,"values",searchValue,row);
            const s9 = performSearch_Row(f9_checkbox,"is_inactive",searchValue,row);

            // استخدام || بدلاً من && لضمان أن البحث يتم في كلا الحقلين
            return (
                s0 ||
                s1 ||
                s2 ||
                s3 ||
                s4 ||
                s5 ||
                s6 ||
                s7 ||
                s8 ||
                s9
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


async function table_view_btn_fn(updateBtn) {
    try {
    showLoadingIcon(updateBtn)
    const permission = await btn_permission("effects_permission", "view");

    if (!permission) {
        // if false
        return;
    }

    const row = updateBtn.closest("tr");
    const effects_update_data = {
        x: row.querySelector(`.td_id`).textContent,
        href_pageName : `effects_view_ar`,
        href_pageTitle : 'المؤثرات',
        acc_name: row.querySelector(`.td_account_name`).textContent,
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
} finally{
    hideLoadingIcon(updateBtn)
}
}


document.addEventListener("DOMContentLoaded", async function () {
    try {
        showLoadingIcon(content_space)
        showRedirectionReason();
        let conditionsArray = JSON.parse(sessionStorage.getItem("effects_viewArray")) || [];


        if (conditionsArray.length === 0){
        
            permissionName = 'effects_permission'
            start_date = firstDayOfYear
            end_date = today
            Qkey = null
            back_href_page = 'hr_ar'
            back_title_page = 'إدارة الموارد البشرية'
    
            pagePermission("view", permissionName);  // معلق
            sessionStorage.removeItem('effects_viewArray');
            backUp_page1(`effects_viewArray`, Qkey, permissionName, start_date, end_date, back_href_page, back_title_page)
            await restore_page1(getData_fn, `effects_viewArray`)
        } else {
            await restore_page1(getData_fn, `effects_viewArray`)
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
