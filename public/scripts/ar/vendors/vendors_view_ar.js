setActiveSidebar("vendors_view_ar");
//pagePermission("view", "users_permission");

const h2_text_div = document.querySelector(`#h2_text_div`);
const sub_h2_header = document.querySelector(`#sub_h2_header`);
let is_filter = false;
const back_href = document.querySelector(`#back_href`);

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

//! credit limit
let f3_div = filter_div.querySelector(`#f3_div`);
let f3_checkbox = filter_div.querySelector(`#f3_checkbox`);
let f3_selectAndInput_div = filter_div.querySelector(`#f3_selectAndInput_div`);
let f3_select = filter_div.querySelector(`#f3_select`);
let f3_input = filter_div.querySelector(`#f3_input`);

//! email
let f4_div = filter_div.querySelector(`#f4_div`);
let f4_checkbox = filter_div.querySelector(`#f4_checkbox`);
let f4_selectAndInput_div = filter_div.querySelector(`#f4_selectAndInput_div`);
let f4_select = filter_div.querySelector(`#f4_select`);
let f4_input = filter_div.querySelector(`#f4_input`);

//! tasgel darepy
let f5_div = filter_div.querySelector(`#f5_div`);
let f5_checkbox = filter_div.querySelector(`#f5_checkbox`);
let f5_selectAndInput_div = filter_div.querySelector(`#f5_selectAndInput_div`);
let f5_select = filter_div.querySelector(`#f5_select`);
let f5_input = filter_div.querySelector(`#f5_input`);

//! legal_info
let f6_div = filter_div.querySelector(`#f6_div`);
let f6_checkbox = filter_div.querySelector(`#f6_checkbox`);
let f6_selectAndInput_div = filter_div.querySelector(`#f6_selectAndInput_div`);
let f6_select = filter_div.querySelector(`#f6_select`);
let f6_input = filter_div.querySelector(`#f6_input`);

//! contact_info
let f7_div = filter_div.querySelector(`#f7_div`);
let f7_checkbox = filter_div.querySelector(`#f7_checkbox`);
let f7_selectAndInput_div = filter_div.querySelector(`#f7_selectAndInput_div`);
let f7_select = filter_div.querySelector(`#f7_select`);
let f7_input = filter_div.querySelector(`#f7_input`);


//! delivery_adress
let f8_div = filter_div.querySelector(`#f8_div`);
let f8_checkbox = filter_div.querySelector(`#f8_checkbox`);
let f8_selectAndInput_div = filter_div.querySelector(`#f8_selectAndInput_div`);
let f8_select = filter_div.querySelector(`#f8_select`);
let f8_input = filter_div.querySelector(`#f8_input`);


//! banking_info
let f9_div = filter_div.querySelector(`#f9_div`);
let f9_checkbox = filter_div.querySelector(`#f9_checkbox`);
let f9_selectAndInput_div = filter_div.querySelector(`#f9_selectAndInput_div`);
let f9_select = filter_div.querySelector(`#f9_select`);
let f9_input = filter_div.querySelector(`#f9_input`);


//! balance
let f10_div = filter_div.querySelector(`#f10_div`);
let f10_checkbox = filter_div.querySelector(`#f10_checkbox`);
let f10_selectAndInput_div = filter_div.querySelector(`#f10_selectAndInput_div`);
let f10_select = filter_div.querySelector(`#f10_select`);
let f10_input = filter_div.querySelector(`#f10_input`);


const btn_do = filter_div.querySelector(`#btn_do`);
const indices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // ضع هنا الأرقام التي تريد تضمينها

back_href.onclick = async function (event) {
    event.preventDefault();
    await back_href_fn1(getData_fn, `vendors_viewArray`, `vendors_view_ar`, `notes_ar`)
};



filter_icon.onclick = () => {
    try {
        show_filter_div();
    } catch (error) {
        catch_error;
    }
};


function call_default_checkbox(str_f, is_showDiv, is_checkBox) {
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
}


function deafult_checkbox() {
    call_default_checkbox('f1',true,false)
    call_default_checkbox('f2',true,true)
    call_default_checkbox('f3',true,false)
    call_default_checkbox('f4',true,false)
    call_default_checkbox('f5',true,false)
    call_default_checkbox('f6',true,false)
    call_default_checkbox('f7',true,false)
    call_default_checkbox('f8',true,false)
    call_default_checkbox('f9',true,false)
    call_default_checkbox('f10',true,true)
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
            sessionStorage.removeItem('vendorsViewArray');
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
            '/get_All_vendors_Data',
            {},
            'vendors_permission','view',
            60,
            false,"",
            true,
            false,false,
            false,false,false,
            false,false,
            true,`notes_ar`,
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

        permissionName = 'vendors_permission'
        start_date = false
        end_date = false
        Qkey = false
        back_href_page = 'vendors_view_ar'
        back_title_page = 'الموردين'

        showFirst50RowAtTheBegening();
        backUp_page1(`vendors_viewArray`, Qkey, permissionName, start_date, end_date, back_href_page, back_title_page)
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

        let style_button = `width: auto; white-space: nowrap; text-align: center;`;
        let style_id = `display: none;`;
        let account_no = `display:${f1_checkbox.checked ? "table-cell" : "none"}; width: auto; white-space: nowrap; text-align: start;`;
        let account_name = `display: table-cell ; width: 100%; white-space: nowrap; text-align: start;`;
        let credit_limit = `display:${f3_checkbox.checked ? "table-cell" : "none"};; width: auto; white-space: nowrap; text-align: start;`;
        let email = `display:${f4_checkbox.checked ? "table-cell" : "none"};; width: auto; white-space: nowrap; text-align: start;`;
        let tasgel_darepy = `display:${f5_checkbox.checked ? "table-cell" : "none"}; width: auto; white-space: nowrap; text-align: start;`;
        let legal_info = `display:${f6_checkbox.checked ? "table-cell" : "none"};; width: auto; white-space: nowrap; text-align: start;`;
        let contact_info = `display:${f7_checkbox.checked ? "table-cell" : "none"};; width: auto; white-space: nowrap; text-align: start;`;
        let delivery_adress = `display:${f8_checkbox.checked ? "table-cell" : "none"};; width: auto; white-space: nowrap; text-align: start;`;
        let banking_info = `display:${f9_checkbox.checked ? "table-cell" : "none"}; width: auto; white-space: nowrap; text-align: start;`;
        let balance = `display:${f10_checkbox.checked ? "table-cell" : "none"};; width: auto; white-space: nowrap; text-align: start;`;
        let is_allow_to_buy_and_sell = `display: none;`;


        total_column1.value = 0;
       
        let fn = `onclick = "table_balance1_btn_to_statetment_fn1(this, 'td_id', 'vendors_permission', firstDayOfYear, lastDayOfYear, 'vendors_view_ar', 'الموردين')"`;

        const r = lastDayOfYear
        // إعداد رأس الجدول
        // هنا بناء الجدول بدون صف الأزرار
        let tableHTML = `<table id="review_table" class="review_table">
                        <thead>
                            <tr>
                                <th style="${style_button}"></th>
                                <th style="${style_id}">ID</th>
                                <th style="${account_no}">#</th>
                                <th style="${account_name}">الاسم</th>
                                <th style="${credit_limit}">حد الائتمان</th>
                                <th style="${email}">البريد الالكتورةنى</th>
                                <th style="${tasgel_darepy}">رقم التسجيل الضريبى</th>
                                <th style="${legal_info}">بيانات قانونية</th>
                                <th style="${contact_info}">بيانات التواصل</th>
                                <th style="${delivery_adress}">عنوان التسليم</th>
                                <th style="${banking_info}">بيانات بنكية</th>
                                <th style="${balance}">الرصيد</th>
                                <th style="${is_allow_to_buy_and_sell}"></th>
                            </tr>
                        </thead>
                        <tbody>`;

        slice_array1.forEach((row) => {
                


            tableHTML +=
                     `<tr>
                        <td style="${style_button}"><button class="table_view_btn" onclick="table_view_btn_fn(this)">عرض</button></td>
                        <td style="${style_id}" class="td_id">${row.id}</td>
                        <td style="${account_no}">${row.account_no}</td>
                        <td style="${account_name}">${row.account_name}</td>
                        <td style="${credit_limit}">${row.credit_limit}</td>
                        <td style="${email}">${row.email}</td>
                        <td style="${tasgel_darepy}">${row.tasgel_darepy}</td>
                        <td style="${legal_info}">${row.legal_info}</td>
                        <td style="${contact_info}">${row.contact_info}</td>
                        <td style="${delivery_adress}">${row.delivery_adress}</td>
                        <td style="${banking_info}">${row.banking_info}</td>
                        ${tdNumber(true,false,true,row.balance,balance,total_column1,fn, 'td_balance')}
                        <td style="${is_allow_to_buy_and_sell}" class="td_is_allow_to_buy_and_sell">${row.is_allow_to_buy_and_sell}</td>                      
                      </tr>`;
        });

        tableHTML += `
                    <tr class="table_totals_row">
                        <td id="footer_style_button" style="${style_button}"></td>
                        <td id="footer_style_id" style="${style_id}"></td>
                        <td id="footer_style_account_no" style="${account_no}"></td>
                        <td id="footer_style_account_name" style="${account_name}"></td>
                        <td id="footer_style_credit_limit" style="${credit_limit}"></td>
                        <td id="footer_style_email" style="${email}"></td>
                        <td id="footer_style_tasgel_darepy" style="${tasgel_darepy}"></td>
                        <td id="footer_style_legal_info" style="${legal_info}"></td>
                        <td id="footer_style_contact_info" style="${contact_info}"></td>
                        <td id="footer_style_delivery_adress" style="${delivery_adress}"></td>
                        <td id="footer_style_banking_info" style="${banking_info}"></td>
                        <td id="footer_style_balance" style="${balance}"></td>
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
        setupColumnSorting("review_table");
        hideLoadingIcon(content_space);
        page_content.style.display = "flex";
        //  عمليات صف الاجمالى
        // جمع القيم في العمود رقم 6

        // document.getElementById("tFooter6").textContent = totalColumn_Valuu;
        tableContainer.querySelector(`#footer_style_button`).textContent = slice_array1.length; //  عدد الصفوف

        tableContainer.querySelector(`#footer_style_balance`).textContent = floatToString(true,total_column1.value);

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

            const f1_match = filterData_string_column_with_showAndHiddenCheckbox(f1_checkbox,f1_select,f1_input,"account_no",row);
            const f2_match = filterData_string_column_with_showAndHiddenCheckbox(f2_checkbox,f2_select,f2_input,"account_name",row);
            const f3_match = filterData_number_column_with_showAndHiddenCheckbox(f3_checkbox,f3_select,f3_input,"credit_limit",row);
            const f4_match = filterData_string_column_with_showAndHiddenCheckbox(f4_checkbox,f4_select,f4_input,"email",row);
            const f5_match = filterData_string_column_with_showAndHiddenCheckbox(f5_checkbox,f5_select,f5_input,"tasgel_darepy",row);
            const f6_match = filterData_string_column_with_showAndHiddenCheckbox(f6_checkbox,f6_select,f6_input,"legal_info",row);
            const f7_match = filterData_string_column_with_showAndHiddenCheckbox(f7_checkbox,f7_select,f7_input,"contact_info",row);
            const f8_match = filterData_string_column_with_showAndHiddenCheckbox(f8_checkbox,f8_select,f8_input,"delivery_adress",row);
            const f9_match = filterData_string_column_with_showAndHiddenCheckbox(f9_checkbox,f9_select,f9_input,"banking_info",row);
            const f10_match = filterData_number_column_with_showAndHiddenCheckbox(f10_checkbox,f10_select,f10_input,"balance",row);


            return (
                f1_match &&
                f2_match &&
                f3_match &&
                f4_match &&
                f5_match &&
                f6_match &&
                f7_match &&
                f8_match &&
                f9_match &&
                f10_match
            ); // && otherCondition;
        });


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
            const f1Match = performSearch_Row(f1_checkbox,"account_no",searchValue,row);
            const f2Match = performSearch_Row(f2_checkbox,"account_name",searchValue,row);
            const f3Match = performSearch_Row(f3_checkbox,"credit_limit",searchValue,row);
            const f4Match = performSearch_Row(f4_checkbox,"email",searchValue,row);
            const f5Match = performSearch_Row(f5_checkbox,"tasgel_darepy",searchValue,row);
            const f6Match = performSearch_Row(f6_checkbox,"legal_info",searchValue,row);
            const f7Match = performSearch_Row(f7_checkbox,"contact_info",searchValue,row);
            const f8Match = performSearch_Row(f8_checkbox,"delivery_adress",searchValue,row);
            const f9Match = performSearch_Row(f9_checkbox,"banking_info",searchValue,row);
            const f10Match = performSearch_Row(f10_checkbox,"balance",searchValue,row);

            // استخدام || بدلاً من && لضمان أن البحث يتم في كلا الحقلين
            return (
                f1Match ||
                f2Match ||
                f3Match ||
                f4Match ||
                f5Match ||
                f6Match ||
                f7Match ||
                f8Match ||
                f9Match ||
                f10Match
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
    const permission = await btn_permission('vendors_permission','view');

    if (!permission){ // if false
        return;
    };

    const row  = updateBtn.closest("tr")
    
    const vendors_update_data = {
    x: row.cells[1].textContent,
    href_pageName : `vendors_view_ar`,
    href_pageTitle : 'الموردين',
    account_no_input: row.cells[2].textContent,
    account_name_input: row.cells[3].textContent,
    credit_limit: row.cells[4].textContent,
    email_input: row.cells[5].textContent,
    tasgel_darepy_input: row.cells[6].textContent,
    legal_info_input: row.cells[7].textContent,
    contact_info_input: row.cells[8].textContent,
    delivery_adress_input:  row.cells[9].textContent,
    banking_info_input: row.cells[10].textContent,
    is_allow_to_buy_and_sell: row.querySelector(`.td_is_allow_to_buy_and_sell`).textContent,

}

    sessionStorage.removeItem('vendors_update_data')
    sessionStorage.setItem('vendors_update_data', JSON.stringify(vendors_update_data));                            
    window.location.href = `vendors_update_ar`;
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
        let conditionsArray = JSON.parse(sessionStorage.getItem("vendors_viewArray")) || [];
        if (conditionsArray.length === 0){
        
            permissionName = 'vendors_permission'
            start_date = false
            end_date = false
            Qkey = null
            back_href_page = 'notes_ar'
            back_title_page = 'الملاحاظات'
    
            pagePermission("view", permissionName);  // معلق
            sessionStorage.removeItem('vendors_viewArray');
            backUp_page1(`vendors_viewArray`, Qkey, permissionName, start_date, end_date, back_href_page, back_title_page)
            await restore_page1(getData_fn, `vendors_viewArray`)
        } else {
            await restore_page1(getData_fn, `vendors_viewArray`)
        }
    
    } catch (error) {
        catch_error(error)
       } finally{
        hideLoadingIcon(content_space)
       }
});


async function importData(){
    const permission = await btn_permission('vendors_permission', 'add');

    if (!permission) {
        showAlert(`warning`, `⚠️ عذرا لا تملك الصلاحية لاستيراد البيانات`)
      return;
    };

    window.location.href = 'import_data_vendors';
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
