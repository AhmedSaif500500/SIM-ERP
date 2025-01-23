setActiveSidebar("itemsMain_view_ar");  
pagePermission("view", "items_transfer_permission"); 

const newBtn = document.querySelector('#newBtn');
newBtn.onclick = function (){
    sessionStorage.removeItem('items_transfer_update_data')
    sessionStorage.removeItem('itemsTransferViewArray')
    window.location.href = "/items_transfer_add_ar";
  }

const h2_text_div = document.querySelector(`#h2_text_div`);
const sub_h2_header = document.querySelector(`#sub_h2_header`);
let is_filter = false;
const back_href = document.querySelector(`#back_href`);

let startDate = firstDayOfYear;
let endDate = lastDayOfYear;
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



//! reference
let f1_div = filter_div.querySelector(`#f1_div`);
let f1_checkbox = filter_div.querySelector(`#f1_checkbox`);
let f1_selectAndInput_div = filter_div.querySelector(`#f1_selectAndInput_div`);
let f1_select = filter_div.querySelector(`#f1_select`);
let f1_input = filter_div.querySelector(`#f1_input`);

//! from
let f2_div = filter_div.querySelector(`#f2_div`);
let f2_checkbox = filter_div.querySelector(`#f2_checkbox`);
let f2_selectAndInput_div = filter_div.querySelector(`#f2_selectAndInput_div`);
let f2_select = filter_div.querySelector(`#f2_select`);
let f2_input = filter_div.querySelector(`#f2_input`);

//! to
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



const btn_do = filter_div.querySelector(`#btn_do`);
const indices = [0, 1, 2, 3, 4]; // ضع هنا الأرقام التي تريد تضمينها

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
    const conditionsArray = JSON.parse(sessionStorage.getItem('items_transfer_viewArray')) || [];

    // إضافة الكائن الجديد إلى المصفوفة
    conditionsArray.push(conditions);

    // حفظ المصفوفة المحدثة في sessionStorage
    sessionStorage.setItem('items_transfer_viewArray', JSON.stringify(conditionsArray));
}


back_href.onclick = async function (event) {
    event.preventDefault();
   

    const array = JSON.parse(sessionStorage.getItem(`items_transfer_viewArray`)) || [];

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
    let conditionsArray = JSON.parse(sessionStorage.getItem("items_transfer_viewArray")) || [];
    
    // التحقق إذا كانت المصفوفة تحتوي على عناصر
    if (conditionsArray.length > 0) {
        // استرجاع العنصر المطلوب بناءً على الرقم المحدد
        conditions = conditionsArray[conditionsArray.length - NUM_ektp_rakm_el_restore_elyEnta3ayzTerg3oMnel2a5er_maslan_1_ya3nyLastRestore];

        // حذف العناصر من المصفوفة بناءً على الرقم المحدد
        if (NUM_ektp_rakm_el_restore_elyEnta3ayzTerg3oMnel2a5er_maslan_1_ya3nyLastRestore > 1) {
            conditionsArray.splice(-NUM_ektp_rakm_el_restore_elyEnta3ayzTerg3oMnel2a5er_maslan_1_ya3nyLastRestore + 1);
            sessionStorage.setItem("items_transfer_viewArray", JSON.stringify(conditionsArray));
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
    call_default_checkbox('f0',true,true,true) // datex
    call_default_checkbox('f1',true,true,false) // reference
    call_default_checkbox('f2',true,true,false) // from
    call_default_checkbox('f3',true,true,false) // to
    call_default_checkbox('f4',true,true,false) // note
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
            sessionStorage.removeItem('items_transfer_viewArray');
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
        let start_date;
        let end_date;

        start_date = f0_input_start_date1.value;
        end_date = f0_input_end_date1.value;
       
        //  معلق
        data = await new_fetchData_postAndGet(
            "/get_items_transfer_Data_view",
            {start_date, end_date},
            "items_transfer_permission","view",
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
        sub_h2_header.textContent = `من ${reverseDateFormatting(f0_input_start_date1.value)}   الى   ${reverseDateFormatting(f0_input_end_date1.value)}`;
        const datechange = is_datexChanged()
        if (datechange){
            await getData_fn();
        }else{
            showFirst50RowAtTheBegening();
        }

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
                    "location_from",
                    row
                );

        
            const f3 =
                filterData_string_column_with_showAndHiddenCheckbox(
                    f3_checkbox,
                    f3_select,
                    f3_input,
                    "location_to",
                    row
                );


            const f4 =
                filterData_string_column_with_showAndHiddenCheckbox(
                    f4_checkbox,
                    f4_select,
                    f4_input,
                    "general_note",
                    row
                );


            return (

                f0 &&
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
        let style_datex = `display: table-cell; width: auto; white-space: nowrap; text-align: start`;
        let style_referenceCONCAT = `display:${f1_checkbox.checked ? "table-cell" : "none"}; width: auto; white-space: nowrap; text-align: start`;
        let style_note = `display:${f4_checkbox.checked ? "table-cell" : "none"}; min-width: 15rem; width: 100%; white-space: wrap; text-align: start;`;
        let style_location_from = `display:${f2_checkbox.checked ? "table-cell" : "none" }; width: auto; white-space: nowrap; text-align: start`;
        let style_location_to = `display:${f3_checkbox.checked ? "table-cell" : "none" }; width: auto; white-space: nowrap; text-align: start`;

        // total_column1.value = 0;
        let fn = `onclick = "table_view_btn(this)"`;

        // إعداد رأس الجدول
        // هنا بناء الجدول بدون صف الأزرار
        let tableHTML = `<table id="review_table" class="review_table">
                        <thead>
                            <tr>
                                <th style="${style_button}"></th>
                                <th style="${style_id}">ID</th>
                                <th style="${style_datex}">التاريخ</th>
                                <th style="${style_referenceCONCAT}">#</th>
                                <th style="${style_location_from}">من</th>
                                <th style="${style_location_to}">الى</th>
                                <th style="${style_note}">البيان</th>

                            </tr>
                        </thead>
                        <tbody>`;

        slice_array1.forEach((row) => {
                

         
           // let referenceCONCAT = `${getYear(row.datex)}-${formatToFiveDigits(row.reference)}`
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
            tableHTML +=
                     `<tr>
                        <td style="${style_button}"><button class="table_view_btn" onclick="table_view_btn(this)">عرض</button></td>
                        <td style="${style_id}" class="td_id">${row.id}</td>
                        <td style="${style_datex}" class="td_datex">${row.datex}</td>
                        <td style="${style_referenceCONCAT}" class="td_referenceconcat">${row.referenceconcat}</td>
                        <td style="${style_location_from}" class="td_location_from">${row.location_from}</td>
                        <td style="${style_location_to}" class="td_location_to">${row.location_to}</td>
                        <td style="${style_note}" class="td_general_note">${row.general_note}</td>
                                   
                      </tr>`;
        });

        tableHTML += `
                    <tr class="table_totals_row">
                        <td id="footer_style_button" style="${style_button}"></td>
                        <td id="footer_style_id1" style="${style_id}"></td>
                        <td id="footer_style_datex" style="${style_datex}"></td>
                        <td id="footer_style_referenceCONCAT" style="${style_referenceCONCAT}"></td>
                        <td id="footer_style_location_from" style="${style_location_from}"></td>
                        <td id="footer_style_location_to" style="${style_location_to}"></td>
                        <td id="footer_style_note" style="${style_note}"></td>
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

        // tableContainer.querySelector(`#footer_style_total_value`).textContent = floatToString(true,total_column1.value);

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
            const reference_Match = performSearch_Row(f1_checkbox,"referenceconcat",searchValue,row);
            const location_from = performSearch_Row(f2_checkbox,"location_from",searchValue,row);
            const location_to = performSearch_Row(f3_checkbox,"location_to",searchValue,row);
            const noteMatch = performSearch_Row(f4_checkbox,"general_note",searchValue,row);

            // استخدام || بدلاً من && لضمان أن البحث يتم في كلا الحقلين
            return (
                datexInfoMatch ||
                reference_Match ||
                location_from ||
                location_to ||
                noteMatch
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

async function table_view_btn(updateBtn) {
    try {
    showLoadingIcon(updateBtn)
    const permission = await btn_permission("items_transfer_permission", "view");

    if (!permission) {
        // if false
        return;
    }


    backUp_filter_div_conditions() // ضرورى لانه هيرجع مرتين لازم اخد باك اب هنا
    const row = updateBtn.closest("tr");
    const items_transfer_update_data = {
        x: row.querySelector(`.td_id`).textContent,
        //addmore
    };

    
    sessionStorage.setItem('items_transfer_update_data', JSON.stringify(items_transfer_update_data));                            
    window.location.href = `items_transfer_update_ar`;
    hideLoadingIcon(updateBtn)
} catch (error) {
    hideLoadingIcon(updateBtn)
    catch_error(error)
}
}

function CheckUrlParams_items_transfer_update_ar() {
    try {
        const urlData = getURLData(
            "data",
            "items_transfer_view_ar",
            "رابط غير صالح : سيتم اعادة توجيهك الى صفحة الاهلاكات الرئيسية"
        );

        if (!urlData || urlData.pageName !== "items_transfer_update_ar") {
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

    sub_h2_header.textContent = `من ${reverseDateFormatting(f0_input_start_date1.value)}   الى   ${reverseDateFormatting(f0_input_end_date1.value)}`;
    
    const result2 = CheckUrlParams_items_transfer_update_ar();
    if (!result2) {
        return;
    }

    await getData_fn();
    const conditionsArray = sessionStorage.getItem(`items_transfer_viewArray`);

    if (!conditionsArray){
     
        backUp_filter_div_conditions();
    }

});

window.addEventListener("beforeprint", function () {
    beforeprint_reviewTable("review_table", 0, 1); // هذا سيخفي العمود الأول والثاني
});

/*--------------------------------------------------------------------------------*/
