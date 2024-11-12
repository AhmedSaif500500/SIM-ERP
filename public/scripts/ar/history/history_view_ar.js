setActiveSidebar("notes_ar");
pagePermission("view", "history_permission");

const h2_text_div = document.querySelector(`#h2_text_div`);
const sub_h2_header = document.querySelector(`#sub_h2_header`);

let is_filter = false


function disableSearchDiv(){

}

const back_href = document.querySelector(`#back_href`);

let startDate = firstDayOfYear;
let endDate = lastDayOfYear;
let is_recieved_params_from_effects_update = false;
let is_recieved_params_from_department_view = false;

const tableContainer = document.querySelector("#tableContainer");
const searchBtn = document.querySelector("#searchBtn");
const searchInput = document.querySelector("#searchInput");



function switchDisabledSearchDiv(string_enable_or_disabled) {
    switch (string_enable_or_disabled) {
        case 'disabled':
            searchBtn.disabled = true;
            searchInput.disabled = true;
            break;
        case 'enable':
            searchBtn.disabled = false;
            searchInput.disabled = false;
            break;
        default:
            console.error('Invalid argument: Use "disabled" or "enable"');
    }
}



let datex_div = filter_div.querySelector(`#datex_div`);
let checkbox_datex_div = filter_div.querySelector(`#checkbox_datex_div`);
let checkbox_datex = filter_div.querySelector(`#checkbox_datex`);
let select_datex = filter_div.querySelector(`#select_datex`);
let input_start_date1 = filter_div.querySelector(`#input_start_date1`);
input_start_date1.value = firstDayOfYear;
let input_end_date1 = filter_div.querySelector(`#input_end_date1`);
input_end_date1.value = lastDayOfYear;


let note_div = filter_div.querySelector(`#note_dive`);
let checkbox_note = filter_div.querySelector(`#checkbox_note`);
let note_selectAndInput_div = filter_div.querySelector(`#note_selectAndInput_div`);
let select_note = filter_div.querySelector(`#select_note`);
let input_note = filter_div.querySelector(`#input_note`);

let balance1_div = filter_div.querySelector(`#balance1_div`);
let checkbox_balance1 = filter_div.querySelector(`#checkbox_balance1`);
let balance1_selectAndInput_div = filter_div.querySelector(`#balance1_selectAndInput_div`);
let select_balance1 = filter_div.querySelector(`#select_balance1`);
let input_balance1 = filter_div.querySelector(`#input_balance1`);

let referenceCONCAT_div = filter_div.querySelector(`#referenceCONCAT_div`);
let checkbox_referenceCONCAT = filter_div.querySelector(`#checkbox_referenceCONCAT`);
let referenceCONCAT_selectAndInput_div = filter_div.querySelector(`#referenceCONCAT_selectAndInput_div`);
let select_referenceCONCAT = filter_div.querySelector(`#select_referenceCONCAT`);
let input_referenceCONCAT = filter_div.querySelector(`#input_referenceCONCAT`);

let account_name_div = filter_div.querySelector(`#account_name_div`);
let checkbox_account_name = filter_div.querySelector(`#checkbox_account_name`);
let accountName_selectAndInput_div = filter_div.querySelector(`#accountName_selectAndInput_div`);
let select_account_name = filter_div.querySelector(`#select_account_name`);
let input_account_name = filter_div.querySelector(`#input_account_name`);

let active_div = filter_div.querySelector(`#active_div`);
let checkbox_active = filter_div.querySelector(`#checkbox_active`);
let active_selectAndInput_div = filter_div.querySelector(`#active_selectAndInput_div`);
let select_active = filter_div.querySelector(`#select_active`);

const btn_do = filter_div.querySelector(`#btn_do`);

function backUp_filter_div_conditions() {


    const conditions = {
        
        datex_div_display: window.getComputedStyle(datex_div).display,
        checkbox_datex_div_display: window.getComputedStyle(checkbox_datex_div).display,
        checkbox_datex: checkbox_datex.checked,
        select_datex: select_datex.value,
        input_start_date1: input_start_date1.value,
        input_end_date1: input_end_date1.value,

        note_div_display: window.getComputedStyle(note_div).display,
        input_note_display: window.getComputedStyle(input_note).display,
        note_selectAndInput_div_isHidden : note_selectAndInput_div.classList.contains(`hidden_select_and_input_div`) ? true : false,
        checkbox_note: checkbox_note.checked,
        select_note: select_note.value,
        input_note: input_note.value,

        balance1_div_display: window.getComputedStyle(balance1_div).display,
        input_balance1_display: window.getComputedStyle(input_balance1).display,
        balance1_selectAndInput_div_isHidden : balance1_selectAndInput_div.classList.contains(`hidden_select_and_input_div`) ? true : false,
        checkbox_balance1: checkbox_balance1.checked,
        select_balance1: select_balance1.value,
        input_balance1: input_balance1.value,

        referenceCONCAT_div_display: window.getComputedStyle(referenceCONCAT_div).display,
        input_referenceCONCAT_display: window.getComputedStyle(input_referenceCONCAT).display,
        referenceCONCAT_selectAndInput_div_isHidden : referenceCONCAT_selectAndInput_div.classList.contains(`hidden_select_and_input_div`) ? true : false,
        checkbox_referenceCONCAT: checkbox_referenceCONCAT.checked,
        select_referenceCONCAT: select_referenceCONCAT.value,
        input_referenceCONCAT: input_referenceCONCAT.value,
      

        account_name_div_display: window.getComputedStyle(account_name_div).display,
        input_account_name_display: window.getComputedStyle(input_account_name).display,
        accountName_selectAndInput_div_isHidden : accountName_selectAndInput_div.classList.contains(`hidden_select_and_input_div`) ? true : false,
        checkbox_account_name: checkbox_account_name.checked,
        select_account_name: select_account_name.value,
        input_account_name: input_account_name.value,


        active_div_display: window.getComputedStyle(active_div).display,
        active_selectAndInput_div_isHidden : active_selectAndInput_div.classList.contains(`hidden_select_and_input_div`) ? true : false,
        checkbox_active: checkbox_active.checked,
        select_active: select_active.value,

        is_filter: is_filter,
        is_filter_div_hidden: filter_div.classList.contains(`hidden_height`) ? true : false,
        sub_h2_header: sub_h2_header.textContent,
    };


    
    // استرجاع المصفوفة المحفوظة في sessionStorage
    let conditionsArray = JSON.parse(sessionStorage.getItem(`historyViewArray`)) || [];

    
    // إضافة العنصر الجديد إلى المصفوفة
    conditionsArray.push(conditions);

    // حفظ المصفوفة المحدثة في sessionStorage
    sessionStorage.setItem(`historyViewArray`,JSON.stringify(conditionsArray));
   

}

back_href.onclick = async function (event) {
    event.preventDefault();
   

    const array = JSON.parse(sessionStorage.getItem(`historyViewArray`)) || [];

        console.log(array.length);
        
    if (!array || array.length <= 1) {
    
      
        
            window.location.href = `notes_ar`;
       
    }else{
        console.log(`here`);
        
        restore_filter_div_conditions(2)
        await getData_fn();
        
    }
};

function restore_filter_div_conditions(NUM_ektp_rakm_el_restore_elyEnta3ayzTerg3oMnel2a5er_maslan_1_ya3nyLastRestore) {
    let conditions;

    // استرجاع المصفوفة المحفوظة في sessionStorage
    let conditionsArray = JSON.parse(sessionStorage.getItem("historyViewArray")) || [];
  
    // التحقق إذا كانت المصفوفة تحتوي على عناصر
    if (conditionsArray.length > 0) {
        // استحضار آخر عنصر وحذفه من المصفوفة
        conditions = conditionsArray[conditionsArray.length - NUM_ektp_rakm_el_restore_elyEnta3ayzTerg3oMnel2a5er_maslan_1_ya3nyLastRestore];

        if (NUM_ektp_rakm_el_restore_elyEnta3ayzTerg3oMnel2a5er_maslan_1_ya3nyLastRestore > 1){

         // حذف العنصر الاخير والقبل الاخير من المصفوفة
        conditionsArray.splice(-`${NUM_ektp_rakm_el_restore_elyEnta3ayzTerg3oMnel2a5er_maslan_1_ya3nyLastRestore-1}`);

        // حفظ المصفوفة المحدثة في sessionStorage بعد الحذف
        sessionStorage.setItem("historyViewArray",JSON.stringify(conditionsArray));
        }
    } else {
        return
    }

    if (conditions) {

        datex_div.style.display = conditions.datex_div_display;
        checkbox_datex_div.style.display = conditions.checkbox_datex_div_display;
        checkbox_datex.checked = conditions.checkbox_datex;
        select_datex.value = conditions.select_datex;
        input_start_date1.value = conditions.input_start_date1;
        input_end_date1.value = conditions.input_end_date1;

        note_div.style.display = conditions.note_div_display;
        input_note.style.display = conditions.input_note_display;
        checkbox_note.checked = conditions.checkbox_note;
        if (conditions.note_selectAndInput_div_isHidden){note_selectAndInput_div.classList.add(`hidden_select_and_input_div`)}else{note_selectAndInput_div.classList.remove(`hidden_select_and_input_div`)}
        select_note.value = conditions.select_note;
        input_note.value = conditions.input_note;

        balance1_div.style.display = conditions.balance1_div_display;
        input_balance1.style.display = conditions.input_balance1_display;
        if (conditions.balance1_selectAndInput_div_isHidden){balance1_selectAndInput_div.classList.add(`hidden_select_and_input_div`)}else{balance1_selectAndInput_div.classList.remove(`hidden_select_and_input_div`)}
        checkbox_balance1.checked = conditions.checkbox_balance1;
        select_balance1.value = conditions.select_balance1;
        input_balance1.value = conditions.input_balance1;

        referenceCONCAT_div.style.display = conditions.referenceCONCAT_div_display;
        input_referenceCONCAT.style.display = conditions.input_referenceCONCAT_display;
        checkbox_referenceCONCAT.checked = conditions.checkbox_referenceCONCAT;
        if (conditions.referenceCONCAT_selectAndInput_div_isHidden){referenceCONCAT_selectAndInput_div.classList.add(`hidden_select_and_input_div`)}else{referenceCONCAT_selectAndInput_div.classList.remove(`hidden_select_and_input_div`)}
        select_referenceCONCAT.value = conditions.select_referenceCONCAT;
        input_referenceCONCAT.value = conditions.input_referenceCONCAT;

        account_name_div.style.display = conditions.account_name_div_display;
        input_account_name.style.display = conditions.input_account_name_display;
        checkbox_account_name.checked = conditions.checkbox_account_name;
        if (conditions.accountName_selectAndInput_div_isHidden){accountName_selectAndInput_div.classList.add(`hidden_select_and_input_div`)}else{accountName_selectAndInput_div.classList.remove(`hidden_select_and_input_div`)}
        select_account_name.value = conditions.select_account_name;
        input_account_name.value = conditions.input_account_name;


        active_div.style.display = conditions.active_div_display;
        /* NO input */
        if (conditions.active_selectAndInput_div_isHidden){active_selectAndInput_div.classList.add(`hidden_select_and_input_div`)}else{active_selectAndInput_div.classList.remove(`hidden_select_and_input_div`)}
        checkbox_active.checked = conditions.checkbox_active;
        select_active.value = conditions.select_active;


        sub_h2_header.textContent = conditions.sub_h2_header;

        is_filter = conditions.is_filter;
        if (conditions.is_filter_div_hidden) {
            hidden_filter_div();
    
        } else {
            show_filter_div();
        }
    }
}

filter_icon.onclick = () => {
    try {
        show_filter_div();
    } catch (error) {
        catch_error;
    }
};

function deafult_checkbox() {
    searchInput.value = "";
    checkbox_balance1.checked = true;

}

async function filter_icon_cancel_fn() {
    try {
        
        if (is_filter){
            await showDialog("","هل تريد الغاء التصفية والرجوع الى الحالة الافتراضية ؟","");
            if (!dialogAnswer) {
                return;
            }

            deafult_checkbox();
            input_start_date1.value = firstDayOfYear;
            input_end_date1.value = lastDayOfYear;
            closeDialog();
            sessionStorage.removeItem('historyViewArray');
            conditionsArray = []
            await getData_fn();
        }


        hidden_filter_div();
        is_filter = false
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
    

        let start_date = input_start_date1.value;
        let end_date = input_end_date1.value;
              
        data = await fetchData_postAndGet(
            "/get_All_history_Data",
            {start_date, end_date},
            "",
            "",
            15,
            false,
            "",
            false,
            true,
            content_space,
            false,
            "",
            "حدث خطأ اثناء معالجة البيانات"
        );
 
        
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
     
        await getData_fn();
        
        backUp_filter_div_conditions();
        
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

            const datex =  filterData_date_column_with_two_inputs_and_showAndHiddenCheckbox(checkbox_datex,select_datex,input_start_date1,input_end_date1,"datex",row);
            const timex = filterData_number_column_with_showAndHiddenCheckbox(checkbox_balance1,select_balance1,input_balance1,"timex",row);
            const referenceCONCAT = filterData_number_column_with_showAndHiddenCheckbox(checkbox_referenceCONCAT,select_referenceCONCAT,input_referenceCONCAT,"referenceCONCAT",row);
            const user_full_name = filterData_string_column_with_showAndHiddenCheckbox(checkbox_account_name,select_account_name,input_account_name,"user_full_name",row);
            const transaction_type_name = filterData_string_column_with_showAndHiddenCheckbox(checkbox_note,select_note,input_note,"transaction_type_name",row);
            const history_type = filterData_string_column_with_showAndHiddenCheckbox_with_only_select(checkbox_active,select_active,"history_type",row);
            return (

                datex &&
                timex &&
                referenceCONCAT &&
                user_full_name &&
                transaction_type_name &&
                history_type
            ); // && otherCondition;
        });


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
        let style_reference = `display: none;`;
        let style_user_id = `display: none;`;
        let style_transaction_id = `display: none;`;
        let style_user_full_name = `display: table-cell; width: auto; white-space: nowrap; text-align: start`;
        let style_datex = `display: table-cell ; width: auto; white-space: nowrap; text-align: start`;
        let style_timex = `display:${checkbox_balance1.checked ? "table-cell" : "none"}; width: auto; white-space: nowrap; text-align: start`;
        let style_transactiontype_id = `display: none;`;
        let style_referenceCONCAT = `display: table-cell; width: auto; white-space: nowrap; text-align: start`;
        let style_note = `display: table-cell; width: 100%; min-width: 2rem; white-space: wrap; text-align: start;`;
        let style_crud = `width: auto; white-space: nowrap; text-align: center;`;


        // إعداد رأس الجدول
        // هنا بناء الجدول بدون صف الأزرار
        let tableHTML = `<table id="review_table" class="review_table">
                        <thead>
                            <tr>

                                <th style="${style_id}"></th>
                                <th style="${style_datex}">التاريخ</th>
                                <th style="${style_timex}">الوقت</th>                                
                                <th style="${style_user_id}"></th>
                                <th style="${style_user_full_name}">المسخدم</th>
                                <th style="${style_transaction_id}"></th>
                                <th style="${style_reference}"></th>
                                <th style="${style_referenceCONCAT}">المرجع</th>
                                <th style="${style_transactiontype_id}">التاريخ</th>
                                <th style="${style_note}">البيان</th>
                                <th style="${style_crud}">الاجراء</th> 
                            </tr>
                        </thead>
                        <tbody>`;

        slice_array1.forEach((row) => {


            
            let history_class;

        
                let history_type = row.history_type
                switch (history_type) {
                    case 'إنشاء':
                    history_class = "table_view_btn"
                        break;
                    case 'تحديث':
                        history_class = "table_save_btn"
                        break;
                    case 'حذف':
                        history_class = "table_delete_btn"
                        break;
                    default:
                        break;
                }
    
            
           let referenceCONCAT = `${getYear(row.datex)}-${formatToFiveDigits(row.reference)}`
            tableHTML += `
                    <tr>
                        <td style="${style_id}">${row.id}</td>
                        <td style="${style_datex}">${row.datex}</td>
                        <td style="${style_timex}">${row.timex}</td>
                        <td style="${style_user_id}">${row.user_id}</td>
                        <td style="${style_user_full_name}">${row.user_full_name}</td>   
                        <td style="${style_transaction_id}">${row.transaction_id}</td>         
                        <td style="${style_reference}">${row.reference}</td>      
                        <td style="${style_referenceCONCAT}">${referenceCONCAT}</td>
                        <td style="${style_transactiontype_id}">${row.transactiontype_id}</td>
                        <td style="${style_note}">${row.transaction_type_name}</td>
                        <td style="${style_crud}"><span class="${history_class}">${row.history_type}</span></td>
                      </tr>`;
        });

        tableHTML += `
                    <tr class="table_totals_row">
                        <td id="tfooter_style_id" style="${style_id}"></td>
                        <td id="tfooter_style_datex" style="${style_datex}"></td>
                        <td id="tfooter_style_timex" style="${style_timex}"></td>
                        <td id="tfooter_style_user_id" style="${style_user_id}"></td>
                        <td id="tfooter_style_user_full_name" style="${style_user_full_name}"></td>
                        <td id="tfooter_style_transaction_id" style="${style_transaction_id}"></td>
                        <td id="tfooter_style_reference" style="${style_reference}"></td>
                        <td id="tfooter_style_referenceCONCAT" style="${style_referenceCONCAT}"></td>
                        <td id="tfooter_style_transactiontype_id" style="${style_transactiontype_id}"></td>
                        <td id="tfooter_style_note" style="${style_note}"></td>
                        <td id="tfooter_style_crud" style="${style_crud}"></td>
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
        tableContainer.querySelector(`#tfooter_style_datex`).textContent = slice_array1.length; //  عدد الصفوف

        if (array1.length > 0 && array1.length <= 50) {
            document.querySelector("#table_footer_showRows_div").style.display = "none";
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
            const datex = performSearch_Row(checkbox_datex,"datex",searchValue,row);
            const transaction_type_name = performSearch_Row(checkbox_note,"transaction_type_name",searchValue,row);
            const timex = performSearch_Row(checkbox_balance1,"timex",searchValue,row);
            const referenceCONCAT = performSearch_Row(checkbox_referenceCONCAT,"referenceCONCAT",searchValue,row);
            const user_full_name = performSearch_Row(checkbox_account_name,"user_full_name",searchValue,row)
            const history_type = performSearch_Row(checkbox_active,"history_type",searchValue,row);


            // استخدام || بدلاً من && لضمان أن البحث يتم في كلا الحقلين
            return (
                datex ||
                history_type ||
                transaction_type_name ||
                timex ||
                referenceCONCAT ||
                user_full_name
            );
        });

        slice_array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
        fillTable();
    } catch (error) {
        catch_error;
    }
}

async function ShowAllDataInTable() {
    showAlert(
        "info",
        "ان ظهار كامل البيانات فى القائمة المنسدله لا يؤثر على عمليه البحث فى البيانات"
    );
    slice_array1 = array1.slice(); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    fillTable();
}

async function showFirst50RowInTable() {
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
    if (event.key === "Enter" || event.key === "Go") {
        performSearch();
    }
});



document.addEventListener("DOMContentLoaded", async function () {

    showRedirectionReason();
    await getData_fn();
    const conditionsArray = sessionStorage.getItem(`historyViewArray`);

    if (!conditionsArray){
     
        backUp_filter_div_conditions();
    }
    
});

window.addEventListener("beforeprint", function () {
    beforeprint_reviewTable("review_table", 0, 1); // هذا سيخفي العمود الأول والثاني
});

/*--------------------------------------------------------------------------------*/





