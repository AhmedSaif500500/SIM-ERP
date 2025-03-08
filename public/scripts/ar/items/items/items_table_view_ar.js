setActiveSidebar("itemsMain_view_ar");  
//pagePermission("view", "items_permission");  // معلق

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
let item_location;


async function getItemsGroupData(){
    
    const d1 = await new_fetchData_postAndGet(
        "getItemsGroupDataForItemsTableView",
        {},
        "items_permission","view",
        60,
        false,"",
        true,
        false,false,
        false,false,false,
        false,false,false,false,"حدث خطأ اثناء معالجة البيانات"
    )
    return d1
}

async function getIRevenueAccountsData(){
    
    const d2 = await new_fetchData_postAndGet(
        "getRevenueAccountsDataForItemsTableView",
        {},
        "items_permission","view",
        60,
        false,"",
        true,
        false,false,
        false,false,false,
        false,false,false,false,"حدث خطأ اثناء معالجة البيانات"
    )
    return d2
}

const newBtn = document.querySelector('#newBtn');
newBtn.onclick = async function (){
    try {
        showLoadingIcon(newBtn)


    const itemsGroup = await getItemsGroupData();
    const revenueAccouns = await getIRevenueAccountsData();

    const items_add_data = {
        items_options: itemsGroup,
        item_type : 'item',
        href_pageName : `items_table_view_ar`,
        href_pageTitle : 'أصناف المخزون',
        revenue_accounts_options: revenueAccouns,
        nodeId: null,
    };


    if (!itemsGroup || !revenueAccouns){
        await redirection("items_table_view_ar","fail","حدث خطأ اثناء معالجة البيانات : سيتم اعاده تحميل الصفحه")
    }
    sessionStorage.removeItem('items_add_data')
    sessionStorage.setItem("items_add_data", JSON.stringify(items_add_data));
    window.location.href = "items_add_ar";
} catch (error) {
    catch_error(error)
} finally {
    hideLoadingIcon(newBtn)
}
}

const newBtn_group = document.querySelector(`#newBtn_group`)
newBtn_group.onclick = async function () {  
    try {
        showLoadingIcon(newBtn_group)

        const itemsGroup = await getItemsGroupData();

        if (!itemsGroup){
            await redirection("items_table_view_ar","fail","حدث خطأ اثناء معالجة البيانات : سيتم اعاده تحميل الصفحه")
        }

        const items_add_data = {
            itemsArray: itemsGroup,
            item_type : 'item_group',
            href_pageName : `items_table_view_ar`,
            href_pageTitle : 'أصناف المخزون',
        }

        sessionStorage.removeItem('items_add_data')
        sessionStorage.setItem("items_add_data", JSON.stringify(items_add_data));
        window.location.href = "items_add_ar";
    } catch (error) {
        catch_error(error)
    } finally {
        hideLoadingIcon(newBtn_group)
    }
    }

const h2_text_div = document.querySelector(`#h2_text_div`);
const sub_h2_header = document.querySelector(`#sub_h2_header`);
let is_filter = false;
const back_href = document.querySelector(`#back_href`);

// let startDate = firstDayOfYear;
// let endDate = lastDayOfYear;
let is_recieved_params_from_effects_update = false;
let is_recieved_params_from_department_view = false;

const tableContainer = document.querySelector("#tableContainer");
const searchBtn = document.querySelector("#searchBtn");
const searchInput = document.querySelector("#searchInput");

//! reference
let f1_div = filter_div.querySelector(`#f1_div`);
let f1_checkbox = filter_div.querySelector(`#f1_checkbox`);
let f1_selectAndInput_div = filter_div.querySelector(`#f1_selectAndInput_div`);
let f1_select = filter_div.querySelector(`#f1_select`);
let f1_input = filter_div.querySelector(`#f1_input`);

//! accountName
let f2_div = filter_div.querySelector(`#f2_div`);
let f2_checkbox = filter_div.querySelector(`#f2_checkbox`);
let f2_selectAndInput_div = filter_div.querySelector(`#f2_selectAndInput_div`);
let f2_select = filter_div.querySelector(`#f2_select`);
let f2_input = filter_div.querySelector(`#f2_input`);

//! accountGroup
let f3_div = filter_div.querySelector(`#f3_div`);
let f3_checkbox = filter_div.querySelector(`#f3_checkbox`);
let f3_selectAndInput_div = filter_div.querySelector(`#f3_selectAndInput_div`);
let f3_select = filter_div.querySelector(`#f3_select`);
let f3_input = filter_div.querySelector(`#f3_input`);


const btn_do = filter_div.querySelector(`#btn_do`);
const indices = [1, 2, 3]; // ضع هنا الأرقام التي تريد تضمينها


back_href.onclick = async function (event) {
    event.preventDefault();
    await back_href_fn1(getData_fn, `items_table_viewArray`, `items_table_view_ar`, `itemsMain_view_ar`)
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
    call_default_checkbox('f1',true,false,false)
    call_default_checkbox('f2',true,true,false)
    call_default_checkbox('f3',true,false,false)
}


async function filter_icon_cancel_fn() {
    try {

        if(is_filter){

            await showDialog("","هل تريد الغاء التصفية والرجوع الى الحالة الافتراضية ؟","");
            if (!dialogAnswer) {
                return;
            }
    
            // deafult_checkbox();
            // sub_h2_header.textContent = `من ${reverseDateFormatting(f0_input_start_date1.value)}   الى   ${reverseDateFormatting(f0_input_end_date1.value)}`;
            
            await getData_fn();
            closeDialog();
            sessionStorage.removeItem('items_table_view_Array');
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
            "/get_All_items_Data_for_table",
            {end_date},
            "items_permission","view",
            60,
            false,'',
            false,
            false,false,
            false,false,'',
            false,'',
            false,'itemsMain_view_ar',
            'حدث خطأ اثناء معالجة البيانات'
        )

        h2_text_div.textContent = `أصناف المخزون`
        sub_h2_header.textContent = ` حتى تاريخ  ${reverseDateFormatting(end_date)}`;
        back_href.title = back_href_page;
        back_href.href = back_title_page; 
            
            
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

        permissionName = 'items_permission'
        start_date = false
        end_date = end_date
        Qkey = false
        back_href_page = 'items_table_view_ar'
        back_title_page = 'أصناف المخزون'

        showFirst50RowAtTheBegening();
        backUp_page1(`items_table_viewArray`, Qkey, permissionName, start_date, end_date, back_href_page, back_title_page)
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

            const isAccountNoMatch =
            filterData_number_column_with_showAndHiddenCheckbox(
                f1_checkbox,
                f1_select,
                f1_input,
                "account_no",
                row
            );


            const isSAccountNameMatch =
                filterData_string_column_with_showAndHiddenCheckbox(
                    f2_checkbox,
                    f2_select,
                    f2_input,
                    "account_name",
                    row
                );

                const isSAccountGroupNameMatch =
                filterData_string_column_with_showAndHiddenCheckbox(
                    f3_checkbox,
                    f3_select,
                    f3_input,
                    "parent_account_name",
                    row
                );                



            return (

                isAccountNoMatch &&
                isSAccountNameMatch &&
                isSAccountGroupNameMatch
   
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
        let style_accountgroup = `display:${f3_checkbox.checked ? "table-cell" : "none"}; width: auto; white-space: nowrap; text-align: start;`;
        let style_account_no = `display:${f1_checkbox.checked ? "table-cell" : "none"}; width: auto; white-space: nowrap; text-align: start`;
        let style_accountName = `display:table-cell; width: 100%; white-space: nowrap; text-align: start;`;
        let style_amount = `display:table-cell; width: 100%; white-space: nowrap; text-align: start;`;
        let style_item_unit = `display:table-cell; width: 100%; white-space: nowrap; text-align: start;`;
        let style_avg = `display:table-cell; width: 100%; white-space: nowrap; text-align: start;`;
        let style_value = `display:table-cell; width: 100%; white-space: nowrap; text-align: start;`;
        
        total_column1.value = 0;

        let fn1 = `onclick = "table_balance1_btn_to_statetment_fn1(this, 'td_id', 'items_permission', firstDayOfYear, end_date, 'items_table_view_ar', 'أصناف المخزون', {item_location : false}, 'item_movement_view_ar', 'obj_item_movement')"`;
        let fn2 = `onclick = "table_balance1_btn_to_statetment_fn1(this, 'td_id', 'items_permission', firstDayOfYear, end_date, 'items_table_view_ar', 'أصناف المخزون', {item_location : false}, 'stock_cost_and_items_view_ar', 'obj_stock_cost_and_items')"`;

        // إعداد رأس الجدول
        // هنا بناء الجدول بدون صف الأزرار
        let tableHTML = `<table id="review_table" class="review_table">
                        <thead>
                            <tr>
                                <th style="${style_button}"></th>
                                <th style="${style_id}">ID</th>
                                <th style="${style_id}">IDGroup</th>
                                <th style="${style_accountgroup}">المجموعه</th>
                                <th style="${style_account_no}">المعرف</th>
                                <th style="${style_accountName}">الصنف</th>
                                <th style="${style_amount}">الرصيد</th>
                                <th style="${style_item_unit}">الوحده</th>
                                <th style="${style_avg}">متوسط التكلفه</th>
                                <th style="${style_value}">إجمالى التكلفه</th>
                            </tr>
                        </thead>
                        <tbody>`;

        slice_array1.forEach((row) => {
                

            // let referenceCONCAT = `${getYear(row.datex)}-${formatToFiveDigits(row.reference)}`
            let avg = (+row.value / +row.current_amount).toFixed(2);
            if (!avg || isNaN(avg)){
                avg = 0
            }
            

            tableHTML +=
                     `<tr>
                        <td style="${style_button}"><button class="table_view_btn" onclick="table_view_btn_fn(this)">عرض</button></td>
                        <td style="${style_id}" class="td_id">${row.id}</td>
                        <td style="${style_id}" class="td_parent_id">${row.parent_id}</td>
                        <td style="${style_accountgroup}" class="td_parent_account_name">${row.parent_account_name}</td>
                        <td style="${style_account_no}" class="td_account_no">${row.account_no}</td>
                        <td style="${style_accountName}" class="td_account_name">${row.account_name}</td>
                        ${tdNumber(true,false,true,row.current_amount,style_amount,false,fn1,'td_amount')}
                        <td style="${style_item_unit}" class="td_item_unite">${row.item_unite}</td>
                        ${tdNumber(false,false,true,avg,style_avg,false,false,'td_avg')}
                        ${tdNumber(true,false,true,row.value,style_value,total_column1,fn2,'td_value')}            
                      </tr>`;
        });

        tableHTML += `
                    <tr class="table_totals_row">
                        <td id="footer_style_button" style="${style_button}"></td>
                        <td id="footer_style_id1" style="${style_id}"></td>
                        <td id="footer_td_parent_id" style="${style_id}"></td>
                        <td id="footer_style_accountgroup" style="${style_accountgroup}"></td>
                        <td id="footer_style_style_account_no" style="${style_account_no}"></td>
                        <td id="footer_style_accountName" style="${style_accountName}"></td>
                        <td id="footer_style_style_amount" style="${style_amount}"></td>
                        <td id="footer_style_item_unit" style="${style_item_unit}"></td>
                        <td id="footer_style_avg" style="${style_avg}"></td>
                        <td id="footer_style_value" style="${style_value}"></td>
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

        tableContainer.querySelector(`#footer_style_value`).textContent = floatToString(true,total_column1.value);

        if (array1.length > 0 && array1.length <= 50) {
            document.querySelector("#table_footer_showRows_div").style.display ="none";
        }

        // startDate = f0_input_start_date1.value;
        // endDate = f0_input_end_date1.value;
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
            const accountNo_Match = performSearch_Row(f1_checkbox,"account_no",searchValue,row);
            const accountparent_Match = performSearch_Row(f3_checkbox,"parent_account_name",searchValue,row);
            const AccountName_Match = performSearch_Row(f3_checkbox,"account_name",searchValue,row);

            // استخدام || بدلاً من && لضمان أن البحث يتم في كلا الحقلين
            return (
                accountNo_Match ||
                accountparent_Match ||
                AccountName_Match
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

async function table_view_btn_fn(viewBtn) {
    try {
    showLoadingIcon(viewBtn,true)

    const permission = await btn_permission("items_permission", "view");

    if (!permission) {
        // if false
        return;
    }


    const row = viewBtn.closest("tr");
    const x = row.querySelector(`.td_id`).textContent 
    // const items_table_view_data = {
    //     x: x,
    //     href_pageName : `items_table_view_ar`,
    //     href_pageTitle : 'أصناف المخزون',
    // };

    
//============================================================

const d = await new_fetchData_postAndGet(
    "/get_data_for_items_table_view_btn",
    {x},
    "items_permission","view",
    60,
    false,"",
    true,
    false,false,
    false,false,false,
    false,false,false,false,"حدث خطأ اثناء معالجة البيانات"
)

    if (!d || !d.revenueArray || !d.groupsArray){
        showAlert('fail',)
        redirection('items_table_view_ar','fail','حدث خطأ اثناء معالجة البيانات : Ftvbf01')
        return;
    }
                                    
    const items_update_data = {
        item_type : 'item',
        href_pageName : `items_table_view_ar`,
        href_pageTitle : 'أصناف المخزون',
        h2_header: d.item_data.account_name, // account_name
        account_no_input: d.item_data.account_no ?? '',  // account_no
        account_name_input: d.item_data.account_name, // account_name
        account_id_hidden: d.item_data.id, // account_id
        item_unite_input: d.item_data.item_unite, // item_unite
        sales_price: d.item_data.item_sales_price, // sales_price
        purchase_price: d.item_data.item_purshas_price, // purshases_price
        reorder_point: d.item_data.item_amount_reorder_point, // reorder_point
        revenue_accounts_options: d.revenueArray, // !x
        nodeId: d.item_data.id,  // account_id
        parentNode : d.item_data.parent_id, // parent_id
        items_options: d.groupsArray,  //!x
        item_revenue_account_id: d.item_data.item_revenue_account, // revenue accout
    };

    sessionStorage.removeItem('items_update_data')
    sessionStorage.setItem('items_update_data', JSON.stringify(items_update_data));                            
    window.location.href = `items_update_ar`;
} catch (error) {
    catch_error(error)
} finally {
    hideLoadingIcon(viewBtn)
}
}



document.addEventListener("DOMContentLoaded", async function () {
    try {
        showLoadingIcon(content_space)
        showRedirectionReason();
        let conditionsArray = JSON.parse(sessionStorage.getItem("items_table_viewArray")) || [];
        let statement_obj = JSON.parse(sessionStorage.getItem("statement_obj")) || [];
        
        if (statement_obj.length !== 0){            
            permissionName = statement_obj.permissionName
            start_date = statement_obj.start_date
            end_date = statement_obj.end_date
            Qkey = statement_obj.Qkey
            back_href_page = statement_obj.href_pageName
            back_title_page = statement_obj.href_pageTitle

            
            pagePermission("view", permissionName);  // معلق
            sessionStorage.removeItem('items_table_viewArray');
            backUp_page1(`items_table_viewArray`, Qkey, permissionName, start_date, end_date, back_href_page, back_title_page)
            await restore_page1(getData_fn, `items_table_viewArray`)
            sessionStorage.removeItem('statement_obj');
        } else if (conditionsArray.length === 0){

            permissionName = 'items_permission'
            start_date = false
            end_date = today
            Qkey = null
            back_href_page = 'itemsMain_view_ar'
            back_title_page = 'إدارة المخزون'
    
            pagePermission("view", permissionName);  // معلق
            sessionStorage.removeItem('items_table_viewArray');
            backUp_page1(`items_table_viewArray`, Qkey, permissionName, start_date, end_date, back_href_page, back_title_page)
            await restore_page1(getData_fn, `items_table_viewArray`)
        } else {
            await restore_page1(getData_fn, `items_table_viewArray`)
        }

        
        handle_fn_options()
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



async function importData(){
    const permission = await btn_permission('items_permission', 'add');

    if (!permission) {
        showAlert(`warning`, `⚠️ عذرا لا تملك الصلاحية لاستيراد البيانات`)
      return;
    };

    window.location.href = 'import_data_items';
}

function handle_fn_options(){  
    const newDivs = `
      <div id="fn_importData_btn" onclick="importData()">استيراد بيانات</div>
    `;
    fn_options_div.insertAdjacentHTML('afterbegin', newDivs);
  }