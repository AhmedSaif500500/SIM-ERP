

setActiveSidebar("cashMain_view_ar");  
pagePermission("view", "cash_accounts_permission");  

const newBtn = document.querySelector('#newBtn');
newBtn.onclick = function (){
    sessionStorage.removeItem('cash_accounts_update_data')
    window.location.href = "/cash_accounts_add_ar";
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

//! balance desc
let f4_div = filter_div.querySelector(`#f4_div`);
let f4_checkbox = filter_div.querySelector(`#f4_checkbox`);
let f4_selectAndInput_div = filter_div.querySelector(`#f4_selectAndInput_div`);
let f4_select = filter_div.querySelector(`#f4_select`);
let f4_input = filter_div.querySelector(`#f4_input`);


const btn_do = filter_div.querySelector(`#btn_do`);
const indices = [1, 2, 3, 4]; // ضع هنا الأرقام التي تريد تضمينها

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
        sub_h2_header: sub_h2_header.textContent,
        back_href: back_href.href,
        back_title: back_href.title
    });

    // استرجاع المصفوفة المحفوظة من sessionStorage
    const conditionsArray = JSON.parse(sessionStorage.getItem('cash_accounts_ViewArray')) || [];

    // إضافة الكائن الجديد إلى المصفوفة
    conditionsArray.push(conditions);

    // حفظ المصفوفة المحدثة في sessionStorage
    sessionStorage.setItem('cash_accounts_ViewArray', JSON.stringify(conditionsArray));
}


back_href.onclick = async function (event) {
    event.preventDefault();
   
    const array = JSON.parse(sessionStorage.getItem(`cash_accounts_ViewArray`)) || [];

    if (!array || array.length <= 1) {
    
            window.location.href = `cashMain_view_ar`;
       
    }else{

        restore_filter_div_conditions(2)
        await getData_fn();

    }
};

function restore_filter_div_conditions(NUM_ektp_rakm_el_restore_elyEnta3ayzTerg3oMnel2a5er_maslan_1_ya3nyLastRestore) {
    let conditions;

    // استرجاع المصفوفة المحفوظة من sessionStorage
    let conditionsArray = JSON.parse(sessionStorage.getItem("cash_accounts_ViewArray")) || [];
    
    // التحقق إذا كانت المصفوفة تحتوي على عناصر
    if (conditionsArray.length > 0) {
        // استرجاع العنصر المطلوب بناءً على الرقم المحدد
        conditions = conditionsArray[conditionsArray.length - NUM_ektp_rakm_el_restore_elyEnta3ayzTerg3oMnel2a5er_maslan_1_ya3nyLastRestore];

        // حذف العناصر من المصفوفة بناءً على الرقم المحدد
        if (NUM_ektp_rakm_el_restore_elyEnta3ayzTerg3oMnel2a5er_maslan_1_ya3nyLastRestore > 1) {
            conditionsArray.splice(-NUM_ektp_rakm_el_restore_elyEnta3ayzTerg3oMnel2a5er_maslan_1_ya3nyLastRestore + 1);
            sessionStorage.setItem("cash_accounts_ViewArray", JSON.stringify(conditionsArray));
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
        sub_h2_header.textContent = conditions.sub_h2_header;
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
    call_default_checkbox('f1',true,false,false) // account_no
    call_default_checkbox('f2',true,true,false) // account_name
    call_default_checkbox('f3',true,false,false) // account_group
    call_default_checkbox('f4',true,true,false) // balance
}

async function filter_icon_cancel_fn() {
    try {

        if(is_filter){

            await showDialog("","هل تريد الغاء التصفية والرجوع الى الحالة الافتراضية ؟","");
            if (!dialogAnswer) {
                return;
            }
    
            deafult_checkbox();            
            await getData_fn();
            closeDialog();
            sessionStorage.removeItem('cash_accounts_ViewArray');
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
       
        data = await new_fetchData_postAndGet(
            "/cash_accounts_view",
            {},
            "cash_accounts_permission","view",
            15,
            false,'',
            false,
            true,content_space,
            false,false,'',
            false,'',
            false,'cashMain_view_ar',
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
                    "group_name",
                    row
                );                

            const f4 =
                filterData_number_column_with_showAndHiddenCheckbox(
                    f4_checkbox,
                    f4_select,
                    f4_input,
                    "balance",
                    row
                );


            return (

                f1 &&
                f2 &&
                f3 &&
                f4 
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
        let style_account_no = `display:${f1_checkbox.checked ? "table-cell" : "none"}; width: auto; white-space: nowrap; text-align: start`;
        let style_account_name = `display: table-cell; width: 100%; white-space: nowrap; text-align: start`;
        let group_name = `display:${f3_checkbox.checked ? "table-cell" : "none"}; width: auto; min-width: 10rem; white-space: wrap; text-align: start`;
        let balance = `display:${f4_checkbox.checked ? "table-cell" : "none"}; width: auto; white-space: nowrap; text-align: start`;


        total_column1.value = 0;
        let fn1 = `onclick = "console.log('yes')"`;
        // let fn3 = `onclick = "table_update_btn_fn(this)"`;

        // إعداد رأس الجدول
        // هنا بناء الجدول بدون صف الأزرار
        let tableHTML = `<table id="review_table" class="review_table">
                        <thead>
                            <tr>
                                <th style="${style_button}"></th>
                                <th style="${style_id}">ID</th>
                                <th style="${style_account_no}">المعرف</th>
                                <th style="${style_account_name}">الحساب</th>
                                <th style="${group_name}">النوع</th>
                                <th style="${balance}">الرصيد</th>
                            </tr>
                        </thead>
                        <tbody>`;

        slice_array1.forEach((row) => {
                
            // const rate = row.rate_value ? `${row.rate_value}%` : '';
            
            // let referenceCONCAT = `${getYear(row.datex)}-${formatToFiveDigits(row.reference)}`
            // let asset_status_class = 'table_green_condition';
            
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
                        <td style="${group_name}" class="td_purshases_date">${row.purshases_date}</td>
                        ${tdNumber(true,false,true,row.balance,balance,total_column1,fn1,'td_balance')}
                      </tr>`;
        });

        tableHTML += `
                    <tr class="table_totals_row">
                        <td id="footer_style_button" style="${style_button}"></td>
                        <td id="footer_style_id" style="${style_id}"></td>
                        <td id="footer_style_style_account_no" style="${style_account_no}"></td>
                        <td id="footer_style_style_account_name" style="${style_account_name}"></td>
                        <td id="footer_style_group_name" style="${group_name}"></td>
                        <td id="footer_style_balance" style="${balance}"></td>
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

function performSearch() {
    try {
        // الحصول على قيمة البحث
        const searchValue = searchInput.value.trim().toLowerCase();

        // فلترة البيانات بناءً على قيمة البحث

        array1 = filteredData_Array.filter((row) => {
            const s1 = performSearch_Row(f1_checkbox,"account_no",searchValue,row);
            const s2 = performSearch_Row(f2_checkbox,"account_name",searchValue,row);
            const s3 = performSearch_Row(f3_checkbox,"group_name",searchValue,row);
            const s4 = performSearch_Row(f4_checkbox,"balance",searchValue,row);


            // استخدام || بدلاً من && لضمان أن البحث يتم في كلا الحقلين
            return (
                s1 ||
                s2 ||
                s3 ||
                s4
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
    const permission = await btn_permission("cash_accounts_permission", "view");

    if (!permission) {
        // if false
        return;
    }


    backUp_filter_div_conditions() // ضرورى لانه هيرجع مرتين لازم اخد باك اب هنا
    const row = updateBtn.closest("tr");
    const cash_accounts_update_data = {
        x: row.querySelector(`.td_id`).textContent
    };

    
    sessionStorage.setItem('cash_accounts_update_data', JSON.stringify(cash_accounts_update_data));                            
    window.location.href = `cash_accounts_update_ar`;
    hideLoadingIcon(updateBtn)
} catch (error) {
    hideLoadingIcon(updateBtn)
    catch_error(error)
}
}

function CheckUrlParams_cash_accounts_update_ar() {
    try {
        const urlData = getURLData(
            "data",
            "cash_accounts_view_ar",
            "رابط غير صالح : سيتم اعادة توجيهك الى صفحة الاصول الثابتة"
        );

        if (!urlData || urlData.pageName !== "cash_accounts_update_ar") {
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
    try {
        showLoadingIcon(content_space)
        showRedirectionReason();
    
        const result2 = CheckUrlParams_cash_accounts_update_ar();
        if (!result2) {
            return;
        }
    
        await getData_fn();
        const conditionsArray = sessionStorage.getItem(`cash_accounts_ViewArray`);
    
        if (!conditionsArray){
         
            backUp_filter_div_conditions();
        }
        hideLoadingIcon(content_space)
    } catch (error) {
        hideLoadingIcon(content_space)
        catch_error(error)
    }
});

window.addEventListener("beforeprint", function () {
    beforeprint_reviewTable("review_table", 0, 1); // هذا سيخفي العمود الأول والثاني
});

/*--------------------------------------------------------------------------------*/
