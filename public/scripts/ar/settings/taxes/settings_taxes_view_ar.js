setActiveSidebar("general_settings_ar");
// pagePermission("view", "customers_permission");



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

const h2_text_div = document.querySelector(`#h2_text_div`);
const sub_h2_header = document.querySelector(`#sub_h2_header`);
let is_filter = false;
const back_href = document.querySelector(`#back_href`);


let is_recieved_params_from_effects_update = false;
let is_recieved_params_from_department_view = false;

const tableContainer = document.querySelector("#tableContainer");
const searchBtn = document.querySelector("#searchBtn");
const searchInput = document.querySelector("#searchInput");


//! tax_name
let f1_div = filter_div.querySelector(`#f1_div`);
let f1_checkbox = filter_div.querySelector(`#f1_checkbox`);
let f1_selectAndInput_div = filter_div.querySelector(`#f1_selectAndInput_div`);
let f1_select = filter_div.querySelector(`#f1_select`);
let f1_input = filter_div.querySelector(`#f1_input`);


//! active
let f2_div = filter_div.querySelector(`#f2_div`);
let f2_checkbox = filter_div.querySelector(`#f2_checkbox`);
let f2_selectAndInput_div = filter_div.querySelector(`#f2_selectAndInput_div`);
let f2_select = filter_div.querySelector(`#f2_select`); f2_select.value = 0
let f2_input = filter_div.querySelector(`#f2_input`);



const btn_do = filter_div.querySelector(`#btn_do`);

const indices = [1]; // ضع هنا الأرقام التي تريد تضمينها


back_href.onclick = async function (event) {
    event.preventDefault();
    await back_href_fn1(getData_fn, `settings_taxes_viewArray`, `settings_taxes_view_ar`, `general_settings_ar`)
};


filter_icon.onclick = () => {
    try {
        show_filter_div();
    } catch (error) {
        catch_error;
    }
};


function call_default_checkbox(str_f, is_showDiv, is_checkBox, int_select_value) {
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
        selectElement.value = int_select_value;
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
}


function deafult_checkbox() {
    call_default_checkbox('f1',true,true,0)
    call_default_checkbox('f2',true,true,1)


}

async function filter_icon_cancel_fn() {
    try {

        if(is_filter){

            await showDialog("","هل تريد الغاء التصفية والرجوع الى الحالة الافتراضية ؟","");
            if (!dialogAnswer) {
                return;
            }
    
            deafult_checkbox();
            
            showFirst50RowAtTheBegening()
            closeDialog();
            sessionStorage.removeItem('settings_taxes_ViewArray');
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
            '/get_settings_taxes_Data',
            {},
            'pass','pass',
            60,
            false,"",
            true,
            false,false,
            false,false,false,
            false,false,
            false,false,
            "حدث خطأ اثناء معالجه البيانات"
        )
        
                // h2_text_div.textContent = `كشف حساب / ${d.account_name}`
            //    sub_h2_header.textContent = `من ${reverseDateFormatting(start_date)}   الى   ${reverseDateFormatting(end_date)}`;
            //    back_href.title = back_href_page;
            //    back_href.href = back_title_page;    

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

        permissionName = 'pass' // معلق
        start_date = false
        end_date = false
        Qkey = false
        back_href_page = 'settings_taxes_view_ar'
        back_title_page = 'الرموز الضريبية'

        showFirst50RowAtTheBegening();

        backUp_page1(`settings_taxes_viewArray`, Qkey, permissionName, start_date, end_date, back_href_page, back_title_page)
    } catch (error) {
        catch_error(error);
    } finally {
        hideLoadingIcon(content_space);
    }
}
const inside_input_search_array = filter_div.querySelectorAll(`[name="inside_input_search"]`);

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

        let style_button = `width: fit-content; white-space: nowrap; text-align: center;`;
        let style_id = `display: none;`;
        let style_taxe_package_name = `display: table-cell; width: 100%; white-space: nowrap; text-align: start;`;
        let style_is_inactive = `display:${f2_checkbox.checked ? 'table-cell' : 'none'};  width: auto; white-space: nowrap; text-align: center;`



        // إعداد رأس الجدول
        // هنا بناء الجدول بدون صف الأزرار
        let tableHTML = `<table id="review_table" class="review_table">
                        <thead>
                            <tr>
                                <th style="${style_button}"></th>
                                <th style="${style_id}">ID</th>
                                <th style="${style_taxe_package_name}">الاسم</th>
                                <th style="${style_is_inactive}">الحالة</th>
                            </tr>
                        </thead>
                        <tbody>`;

        slice_array1.forEach((row) => {
                
            let activeClass = row.is_inactive == 'غير نشط' ? 'table_red_condition' : 'table_green_condition';

            tableHTML +=
                     `<tr>
                        <td style="${style_button}"><button class="table_view_btn" onclick="table_view_btn_fn(this)">عرض</button></td>
                        <td style="${style_id}">${row.id}</td>
                        <td style="${style_taxe_package_name}">${row.taxe_package_name}</td>
                        <td style="${style_is_inactive}"><span class="${activeClass}">${row.is_inactive}</span></td>
                      </tr>`;
        });

        tableHTML += `
                    <tr class="table_totals_row">
                        <td id="footer_style_button" style="${style_button}"></td>
                        <td id="footer_style_id" style="${style_id}"></td>
                        <td id="footer_style_tax_name" style="${style_taxe_package_name}"></td>
                        <td id="footer_style_style_is_inactive" style="${style_is_inactive}"></td>
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

        if (array1.length > 0 && array1.length <= 50) {
            document.querySelector("#table_footer_showRows_div").style.display ="none";
        }


    } catch (error) {
        hideLoadingIcon(content_space);
        catch_error(error);
    }
}


function showFirst50RowAtTheBegening() {
    try {
        page_content.style.display = "none";


        filteredData_Array = data.filter((row) => {

            
            const f1_match = filterData_string_column_with_showAndHiddenCheckbox(f1_checkbox,f1_select,f1_input,"taxe_package_name",row);
            const f2_match = filterData_string_column_with_showAndHiddenCheckbox_with_only_select(f2_checkbox,f2_select, "is_inactive",row);


            return (
                f1_match &&
                f2_match
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

function performSearch() {
    try {
        // الحصول على قيمة البحث
        const searchValue = searchInput.value.trim().toLowerCase();

        // فلترة البيانات بناءً على قيمة البحث

        array1 = filteredData_Array.filter((row) => {
            const f1Match = performSearch_Row(f1_checkbox,"taxe_package_name",searchValue,row);
            const f2Match = performSearch_Row(f2_checkbox,"is_inactive",searchValue,row);


            // استخدام || بدلاً من && لضمان أن البحث يتم في كلا الحقلين
            return (
                f1Match ||
                f2Match
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
    // const permission = await btn_permission('customers_permission','update');

    // if (!permission){ // if false
    //     return;
    // };

    const row  = updateBtn.closest("tr")
    
    const settings_taxes_update_data = {
        x: row.cells[1].textContent,
        href_pageName : `settings_taxes_view_ar`,
        href_pageTitle : 'الرموز الضريبية',
        taxe_package_name: row.cells[2].textContent,
        is_inactive: row.cells[3].querySelector(`span`).textContent
    }

    sessionStorage.removeItem('settings_taxes_update_data')
    sessionStorage.setItem('settings_taxes_update_data', JSON.stringify(settings_taxes_update_data));                            
    window.location.href = `settings_taxes_update_ar`;
} catch (error) {
    catch_error(error)
}
};


document.addEventListener("DOMContentLoaded", async function () {
    try {
        showLoadingIcon(content_space)
        showRedirectionReason();
        let conditionsArray = JSON.parse(sessionStorage.getItem("settings_taxes_viewArray")) || [];
        if (conditionsArray.length === 0){
        
            permissionName = 'pass' // معلق
            start_date = false
            end_date = false
            Qkey = null
            back_href_page = 'general_settings_ar'
            back_title_page = 'الإعدادات العامة'
    
            pagePermission("view", permissionName);  // معلق
            sessionStorage.removeItem('settings_taxes_viewArray');
            backUp_page1(`settings_taxes_viewArray`, Qkey, permissionName, start_date, end_date, back_href_page, back_title_page)
            await restore_page1(getData_fn, `settings_taxes_viewArray`)
        } else {
            await restore_page1(getData_fn, `settings_taxes_viewArray`)
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
