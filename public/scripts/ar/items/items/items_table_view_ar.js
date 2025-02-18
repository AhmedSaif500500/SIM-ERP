setActiveSidebar("itemsMain_view_ar");  
pagePermission("view", "items_permission");  // معلق


async function getItemsGroupData(){
    
    const data = await new_fetchData_postAndGet(
        "getItemsGroupDataForItemsTableView",
        {},
        "items_permission","view",
        15,
        false,"",
        true,
        false,false,
        false,false,false,
        false,false,false,false,"حدث خطأ اثناء معالجة البيانات"
    )
    return data
}



async function getIRevenueAccountsData(){
    
    const data = await new_fetchData_postAndGet(
        "getRevenueAccountsDataForItemsTableView",
        {},
        "items_permission","view",
        15,
        false,"",
        true,
        false,false,
        false,false,false,
        false,false,false,false,"حدث خطأ اثناء معالجة البيانات"
    )
    return data
}

const newBtn = document.querySelector('#newBtn');
newBtn.onclick = async function (){
    try {
        showLoadingIcon(newBtn)
    sessionStorage.removeItem('obj_items_create_group')
    sessionStorage.removeItem('obj_items_create_account')

    const itemsGroup = await getItemsGroupData();
    const revenueAccouns = await getIRevenueAccountsData();

    const obj_items_create_account = {
        items_options: itemsGroup,
        revenue_accounts_options: revenueAccouns,
        nodeId: null,
    };


    if (!itemsGroup || !revenueAccouns){
        await redirection("items_table_view_ar","fail","حدث خطأ اثناء معالجة البيانات : سيتم اعاده تحميل الصفحه")
    }

    sessionStorage.setItem("obj_items_create_account", JSON.stringify(obj_items_create_account));
    window.location.href = "items_add_ar";
    hideLoadingIcon(newBtn)
} catch (error) {
    hideLoadingIcon(newBtn)
    catch_error(error)
}
  }

const newBtn_group = document.querySelector(`#newBtn_group`)
newBtn_group.onclick = async function () {
    try {
        showLoadingIcon(newBtn_group)
        sessionStorage.removeItem('obj_items_create_group')
        sessionStorage.removeItem('obj_items_create_account')

        const itemsGroup = await getItemsGroupData();

        if (!itemsGroup){
            await redirection("items_table_view_ar","fail","حدث خطأ اثناء معالجة البيانات : سيتم اعاده تحميل الصفحه")
        }

        const postedData = {
            itemsArray: itemsGroup
        }
        sessionStorage.setItem("obj_items_create_group", JSON.stringify(postedData));
        
        window.location.href = "items_add_ar";
        hideLoadingIcon(newBtn_group)
    } catch (error) {
        hideLoadingIcon(newBtn_group)
        catch_error(error)
    }
}

const h2_text_div = document.querySelector(`#h2_text_div`);
// const sub_h2_header = document.querySelector(`#sub_h2_header`);
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

function backUp_filter_div_conditions() {
    const conditions = {};

    indices.forEach(index => {
        // بناء الأسماء تلقائيًا باستخدام template literals
        const fDiv = window[`f${index}_div`];
        const fInput = window[`f${index}_input`];
        const fSelectAndInputDiv = window[`f${index}_selectAndInput_div`];
        const fCheckbox = window[`f${index}_checkbox`];
        const fSelect = window[`f${index}_select`];
        const fCheckboxDiv = window[`f${index}_checkbox_div`];
        const fInputStartDate1 = window[`f${index}_input_start_date1`];
        const fInputEndDate1 = window[`f${index}_input_end_date1`];

        // التحقق من وجود كل عنصر قبل تخزين قيمته
        if (fDiv) conditions[`f${index}_div_display`] = window.getComputedStyle(fDiv).display;
        if (fInput) conditions[`f${index}_input_display`] = window.getComputedStyle(fInput).display;
        if (fSelectAndInputDiv) conditions[`f${index}_selectAndInput_div_isHidden`] = fSelectAndInputDiv.classList.contains('hidden_select_and_input_div');
        if (fCheckbox) conditions[`f${index}_checkbox`] = fCheckbox.checked;
        if (fSelect) conditions[`f${index}_select`] = fSelect.value;
        if (fInput) conditions[`f${index}_input`] = fInput.value;
        
        // التحقق من العناصر الإضافية
        if (fCheckboxDiv) conditions[`f${index}_checkbox_div_display`] = window.getComputedStyle(fCheckboxDiv).display;
        if (fInputStartDate1) conditions[`f${index}_input_start_date1`] = fInputStartDate1.value;
        if (fInputEndDate1) conditions[`f${index}_input_end_date1`] = fInputEndDate1.value;
    });

    // الشروط الأخرى
    Object.assign(conditions, {
        is_filter: is_filter,
        is_filter_div_hidden: filter_div.classList.contains('hidden_height'),
        // sub_h2_header: sub_h2_header.textContent,
        back_href: back_href.href,
        back_title: back_href.title
    });

    // استرجاع المصفوفة المحفوظة من sessionStorage
    const conditionsArray = JSON.parse(sessionStorage.getItem('items_table_view_Array')) || [];

    // إضافة الكائن الجديد إلى المصفوفة
    conditionsArray.push(conditions);

    // حفظ المصفوفة المحدثة في sessionStorage
    sessionStorage.setItem('items_table_view_Array', JSON.stringify(conditionsArray));
}


back_href.onclick = async function (event) {
    event.preventDefault();
   

    const array = JSON.parse(sessionStorage.getItem(`items_table_view_Array`)) || [];

    if (!array || array.length <= 1) {
    
   
            window.location.href = `itemsMain_view_ar`;
       
    }else{

        restore_filter_div_conditions(2)
        await getData_fn();

    }
};

function restore_filter_div_conditions(NUM_ektp_rakm_el_restore_elyEnta3ayzTerg3oMnel2a5er_maslan_1_ya3nyLastRestore) {
    let conditions;

    // استرجاع المصفوفة المحفوظة من sessionStorage
    let conditionsArray = JSON.parse(sessionStorage.getItem("items_table_view_Array")) || [];
    
    // التحقق إذا كانت المصفوفة تحتوي على عناصر
    if (conditionsArray.length > 0) {
        // استرجاع العنصر المطلوب بناءً على الرقم المحدد
        conditions = conditionsArray[conditionsArray.length - NUM_ektp_rakm_el_restore_elyEnta3ayzTerg3oMnel2a5er_maslan_1_ya3nyLastRestore];

        // حذف العناصر من المصفوفة بناءً على الرقم المحدد
        if (NUM_ektp_rakm_el_restore_elyEnta3ayzTerg3oMnel2a5er_maslan_1_ya3nyLastRestore > 1) {
            conditionsArray.splice(-NUM_ektp_rakm_el_restore_elyEnta3ayzTerg3oMnel2a5er_maslan_1_ya3nyLastRestore + 1);
            sessionStorage.setItem("items_table_view_Array", JSON.stringify(conditionsArray));
        }
    } else {
        return;
    }

    if (conditions) {
        // استرجاع الحالات ديناميكيًا بناءً على الأرقام في المصفوفة
        indices.forEach(index => {
            const fDiv = window[`f${index}_div`];
            const fInput = window[`f${index}_input`];
            const fSelectAndInputDiv = window[`f${index}_selectAndInput_div`];
            const fCheckbox = window[`f${index}_checkbox`];
            const fSelect = window[`f${index}_select`];
            const fCheckboxDiv = window[`f${index}_checkbox_div`];
            const fInputStartDate1 = window[`f${index}_input_start_date1`];
            const fInputEndDate1 = window[`f${index}_input_end_date1`];

            // استرجاع القيم لكل عنصر، بعد التأكد من وجوده
            if (fDiv) fDiv.style.display = conditions[`f${index}_div_display`];
            if (fInput) fInput.style.display = conditions[`f${index}_input_display`];
            if (fCheckbox) fCheckbox.checked = conditions[`f${index}_checkbox`];
            if (fSelect) fSelect.value = conditions[`f${index}_select`];
            if (fInput) fInput.value = conditions[`f${index}_input`];
            if (fCheckboxDiv) fCheckboxDiv.style.display = conditions[`f${index}_checkbox_div_display`];
            if (fInputStartDate1) fInputStartDate1.value = conditions[`f${index}_input_start_date1`];
            if (fInputEndDate1) fInputEndDate1.value = conditions[`f${index}_input_end_date1`];
            if (fSelectAndInputDiv) {
                if (conditions[`f${index}_selectAndInput_div_isHidden`]) {
                    fSelectAndInputDiv.classList.add('hidden_select_and_input_div');
                } else {
                    fSelectAndInputDiv.classList.remove('hidden_select_and_input_div');
                }
            }
        });

        // استرجاع الشروط الأخرى
        // sub_h2_header.textContent = conditions.sub_h2_header;
        is_filter = conditions.is_filter;
        if (conditions.is_filter_div_hidden) {
            hidden_filter_div();
        } else {
            show_filter_div();
        }

        back_href.title = conditions.back_title;
        back_href.href = conditions.back_href;
    }
}


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


let data = [];
let array1 = [];
let slice_array1 = [];
let filteredData_Array = [];

async function getData_fn() {
    try {

        // start_date = f0_input_start_date1.value;
        // end_date = f0_input_end_date1.value;
       
        //  معلق
        data = await new_fetchData_postAndGet(
            "/get_All_items_Data_for_table",
            {},
            "items_permission","view",
            15,
            false,'',
            false,
            true,content_space,
            false,false,'',
            false,'',
            false,'itemsMain_view_ar',
            'حدث خطأ اثناء معالجة البيانات'
        )
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
        // sub_h2_header.textContent = `من ${reverseDateFormatting(f0_input_start_date1.value)}   الى   ${reverseDateFormatting(f0_input_end_date1.value)}`;
        showFirst50RowAtTheBegening();
        backUp_filter_div_conditions();
        hideLoadingIcon(content_space);

    } catch (error) {
        hideLoadingIcon(content_space);
        catch_error(error);
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

        page_content.style.display = "none";
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

        let fn = `onclick = "table_view_btn_fn(this)"`;

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
                        ${tdNumber(true,false,true,row.current_amount,style_amount,false,false,'td_amount')}
                        <td style="${style_item_unit}" class="td_item_unite">${row.item_unite}</td>
                        ${tdNumber(false,false,true,avg,style_avg,false,false,'td_avg')}
                        ${tdNumber(true,false,true,row.value,style_value,total_column1,false,'td_value')}            
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
        hideLoadingIcon(content_space);
        page_content.style.display = "flex";
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


    backUp_filter_div_conditions() // ضرورى لانه هيرجع مرتين لازم اخد باك اب هنا
    const row = viewBtn.closest("tr");
    const x = row.querySelector(`.td_id`).textContent 
    const items_table_view_data = {
        x: x,
        // qutation_id: row.querySelector(`.td_qutation_id`).textContent,
        // order_id: row.querySelector(`.td_order_id`).textContent,
    };

    
//============================================================

const d = await new_fetchData_postAndGet(
    "/get_data_for_items_table_view_btn",
    {x},
    "items_permission","view",
    50,
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
                                    
    const obj_items_update_account = {
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

    sessionStorage.setItem('obj_items_update_account', JSON.stringify(obj_items_update_account));                            
    window.location.href = `items_update_ar`;


//=======================================================


    hideLoadingIcon(viewBtn,true,'عرض')
} catch (error) {
    hideLoadingIcon(viewBtn,true,'عرض')
    catch_error(error)
}
}

function CheckUrlParams_salesInvoice_update_ar() {
    try {
        const urlData = getURLData(
            "data",
            "itemsMain_view_ar",
            "رابط غير صالح : سيتم اعادة توجيهك الى صفحة القيود اليومية"
        );

        if (!urlData || urlData.pageName !== "sales_invoice_update_ar") { // معلق
            return true;
        }

    
        if (urlData !== "noParams") {

            restore_filter_div_conditions(2)

            return true;
        } else if (urlData === "noParams") {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        catch_error(error);
        return false;
    }
}


document.addEventListener("DOMContentLoaded", async function () {
    showRedirectionReason();

    // sub_h2_header.textContent = `من ${reverseDateFormatting(f0_input_start_date1.value)}   الى   ${reverseDateFormatting(f0_input_end_date1.value)}`;
    
    // const result2 = CheckUrlParams_salesInvoice_update_ar();
    // if (!result2) {
    //     return;
    // }
    handle_fn_options()
    await getData_fn();
    const conditionsArray = sessionStorage.getItem(`items_table_view_Array`);

    if (!conditionsArray){
     
        backUp_filter_div_conditions();
    }

});

window.addEventListener("beforeprint", function () {
    beforeprint_reviewTable("review_table", 0, 1); // هذا سيخفي العمود الأول والثاني
});

/*--------------------------------------------------------------------------------*/


const import_data_btn = document.querySelector(`#import_data_btn`)

import_data_btn.onclick = function (){
    window.location.href = "import_data_items";
}

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