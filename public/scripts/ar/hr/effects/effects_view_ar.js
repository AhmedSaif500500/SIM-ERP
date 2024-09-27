setActiveSidebar("hr_ar");
pagePermission("effects_permission", "view");

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

let datex_div = filter_div.querySelector(`#datex_div`);
let checkbox_datex_div = filter_div.querySelector(`#checkbox_datex_div`);
let checkbox_datex = filter_div.querySelector(`#checkbox_datex`);
let select_datex = filter_div.querySelector(`#select_datex`);
let input_start_date1 = filter_div.querySelector(`#input_start_date1`);
input_start_date1.value = firstDayOfYear;
let input_end_date1 = filter_div.querySelector(`#input_end_date1`);
input_end_date1.value = lastDayOfYear;

let reference_div = filter_div.querySelector(`#reference_div`);
let check_reference = filter_div.querySelector(`#check_reference`);
let reference_selectAndInput_div = filter_div.querySelector(`#reference_selectAndInput_div`);
let select_reference = filter_div.querySelector(`#select_reference`);
let input_reference = filter_div.querySelector(`#input_reference`);

let depatment_name_div = filter_div.querySelector(`#depatment_name_div`);
let checkbox_deparment_name = filter_div.querySelector(`#checkbox_deparment_name`);
let department_Name_selectAndInput_div = filter_div.querySelector(`#department_Name_selectAndInput_div`);
let select_department_name = filter_div.querySelector(`#select_department_name`);
let input_department_name = filter_div.querySelector(`#input_department_name`);



let account_no_div = filter_div.querySelector(`#account_no_div`);
let checkbox_account_no = filter_div.querySelector(`#checkbox_account_no`);
let accNo_selectAndInput_div = filter_div.querySelector(`#accNo_selectAndInput_div`);
let select_account_no = filter_div.querySelector(`#select_account_no`);
let input_account_no = filter_div.querySelector(`#input_account_no`);

let account_name_div = filter_div.querySelector(`#account_name_div`);
let checkbox_account_name = filter_div.querySelector(`#checkbox_account_name`);
let accountName_selectAndInput_div = filter_div.querySelector(`#accountName_selectAndInput_div`);
let select_account_name = filter_div.querySelector(`#select_account_name`);
let input_account_name = filter_div.querySelector(`#input_account_name`);

let aggregation_div = filter_div.querySelector(`#aggregation_div`)
let checkbox_aggregation = filter_div.querySelector(`#checkbox_aggregation`);

let note_div = filter_div.querySelector(`#note_dive`);
let checkbox_note = filter_div.querySelector(`#checkbox_note`);
let note_selectAndInput_div = filter_div.querySelector(`#note_selectAndInput_div`);
let select_note = filter_div.querySelector(`#select_note`);
let input_note = filter_div.querySelector(`#input_note`);



let balance1_div = filter_div.querySelector(`#balance1_div`);
let check_balance1 = filter_div.querySelector(`#check_balance1`);
let balance1_selectAndInput_div = filter_div.querySelector(`#balance1_selectAndInput_div`);
let select_balance1 = filter_div.querySelector(`#select_balance1`);
let input_balance1 = filter_div.querySelector(`#input_balance1`);


let balance2_div = filter_div.querySelector(`#balance2_div`);
let check_balance2 = filter_div.querySelector(`#check_balance2`);
let balance2_selectAndInput_div = filter_div.querySelector(`#balance2_selectAndInput_div`);
let select_balance2 = filter_div.querySelector(`#select_balance2`);
let input_balance2 = filter_div.querySelector(`#input_balance2`);


let balance3_div = filter_div.querySelector(`#balance3_div`);
let check_balance3 = filter_div.querySelector(`#check_balance3`);
let balance3_selectAndInput_div = filter_div.querySelector(`#balance3_selectAndInput_div`);
let select_balance3 = filter_div.querySelector(`#select_balance3`);
let input_balance3 = filter_div.querySelector(`#input_balance3`);



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

        reference_div_display: window.getComputedStyle(reference_div).display,
        input_reference_display: window.getComputedStyle(input_reference).display,
        reference_selectAndInput_div_isHidden : reference_selectAndInput_div.classList.contains(`hidden_select_and_input_div`) ? true : false,
        check_reference: check_reference.checked,
        select_reference: select_reference.value,
        input_reference: input_reference.value,

        depatment_name_div_display: window.getComputedStyle(depatment_name_div).display,
        input_department_display: window.getComputedStyle(input_department_name).display,
        department_Name_selectAndInput_div_isHidden : department_Name_selectAndInput_div.classList.contains(`hidden_select_and_input_div`) ? true : false,
        checkbox_deparment_name: checkbox_deparment_name.checked,
        select_department_name: select_department_name.value,
        input_department_name: input_department_name.value,

        account_no_div_display: window.getComputedStyle(account_no_div).display,
        input_account_no_display: window.getComputedStyle(input_account_no).display,
        accNo_selectAndInput_div_isHidden : accNo_selectAndInput_div.classList.contains(`hidden_select_and_input_div`) ? true : false,
        checkbox_account_no: checkbox_account_no.checked,
        select_account_no: select_account_no.value,
        input_account_no: input_account_no.value,

        account_name_div_display: window.getComputedStyle(account_name_div).display,
        input_account_name_display: window.getComputedStyle(input_account_name).display,
        accountName_selectAndInput_div_isHidden : accountName_selectAndInput_div.classList.contains(`hidden_select_and_input_div`) ? true : false,
        checkbox_account_name: checkbox_account_name.checked,
        select_account_name: select_account_name.value,
        input_account_name: input_account_name.value,

   
        aggregation_div_display: window.getComputedStyle(aggregation_div).display,
        checkbox_aggregation: checkbox_aggregation.checked,

        note_div_display: window.getComputedStyle(note_div).display,
        input_note_display: window.getComputedStyle(input_note).display,
        note_selectAndInput_div_isHidden : note_selectAndInput_div.classList.contains(`hidden_select_and_input_div`) ? true : false,
        checkbox_note: checkbox_note.checked,
        select_note: select_note.value,
        input_note: input_note.value,

        balance1_div_display: window.getComputedStyle(balance1_div).display,
        input_balance1_display: window.getComputedStyle(input_balance1).display,
        balance1_selectAndInput_div_isHidden : balance1_selectAndInput_div.classList.contains(`hidden_select_and_input_div`) ? true : false,
        check_balance1: check_balance1.checked,
        select_balance1: select_balance1.value,
        input_balance1: input_balance1.value,

        balance2_div_display: window.getComputedStyle(balance2_div).display,
        input_balance2_display: window.getComputedStyle(input_balance2).display,
        balance2_selectAndInput_div_isHidden : balance2_selectAndInput_div.classList.contains(`hidden_select_and_input_div`) ? true : false,
        check_balance2: check_balance2.checked,
        select_balance2: select_balance2.value,
        input_balance2: input_balance2.value,

        balance3_div_display: window.getComputedStyle(balance3_div).display,
        input_balance3_display: window.getComputedStyle(input_balance3).display,
        balance3_selectAndInput_div_isHidden : balance3_selectAndInput_div.classList.contains(`hidden_select_and_input_div`) ? true : false,
        check_balance3: check_balance3.checked,
        select_balance3: select_balance3.value,
        input_balance3: input_balance3.value,

        active_div_display: window.getComputedStyle(active_div).display,
        /* No input */
        active_selectAndInput_div_isHidden : active_selectAndInput_div.classList.contains(`hidden_select_and_input_div`) ? true : false,
        checkbox_active: checkbox_active.checked,
        select_active: select_active.value,

        is_filter: is_filter,
        is_filter_div_hidden: filter_div.classList.contains(`hidden_height`)
            ? true
            : false,
        sub_h2_header: sub_h2_header.textContent,
        
        QKey_val: QKey,

        back_href: back_href.herf,
        back_title: back_href.title,
    };


    

    
    // استرجاع المصفوفة المحفوظة في sessionStorage
    let conditionsArray = JSON.parse(sessionStorage.getItem(`effectsViewArray`)) || [];

    
    // إضافة العنصر الجديد إلى المصفوفة
    conditionsArray.push(conditions);

    // حفظ المصفوفة المحدثة في sessionStorage
    sessionStorage.setItem(`effectsViewArray`,JSON.stringify(conditionsArray));
   
}

back_href.onclick = async function (event) {
    event.preventDefault();
   

    const array = JSON.parse(sessionStorage.getItem(`effectsViewArray`)) || [];

    if (!array || array.length <= 1) {
    
   
            window.location.href = `hr_ar`;
       
    }else{

        restore_filter_div_conditions(2)
        await getData_fn();

    }
};

function restore_filter_div_conditions(NUM_ektp_rakm_el_restore_elyEnta3ayzTerg3oMnel2a5er_maslan_1_ya3nyLastRestore) {
    let conditions;

    // استرجاع المصفوفة المحفوظة في sessionStorage
    let conditionsArray = JSON.parse(sessionStorage.getItem("effectsViewArray")) || [];
  
    // التحقق إذا كانت المصفوفة تحتوي على عناصر
    if (conditionsArray.length > 0) {
        // استحضار آخر عنصر وحذفه من المصفوفة
        conditions = conditionsArray[conditionsArray.length - NUM_ektp_rakm_el_restore_elyEnta3ayzTerg3oMnel2a5er_maslan_1_ya3nyLastRestore];

        if (NUM_ektp_rakm_el_restore_elyEnta3ayzTerg3oMnel2a5er_maslan_1_ya3nyLastRestore > 1){

         // حذف العنصر الاخير والقبل الاخير من المصفوفة
        conditionsArray.splice(-`${NUM_ektp_rakm_el_restore_elyEnta3ayzTerg3oMnel2a5er_maslan_1_ya3nyLastRestore-1}`);

        // حفظ المصفوفة المحدثة في sessionStorage بعد الحذف
        sessionStorage.setItem("effectsViewArray",JSON.stringify(conditionsArray));
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


        reference_div.style.display = conditions.reference_div_display;
        input_reference.style.display = conditions.input_reference_display;
        check_reference.checked = conditions.check_reference;
        if (conditions.reference_selectAndInput_div_isHidden){reference_selectAndInput_div.classList.add(`hidden_select_and_input_div`)}else{reference_selectAndInput_div.classList.remove(`hidden_select_and_input_div`)}
        select_reference.value = conditions.select_reference;
        input_reference.value = conditions.input_reference;

        depatment_name_div.style.display = conditions.depatment_name_div_display;
        input_department_name.style.display = conditions.input_department_display;
        checkbox_deparment_name.checked = conditions.checkbox_deparment_name;
        if (conditions.department_Name_selectAndInput_div_isHidden){department_Name_selectAndInput_div.classList.add(`hidden_select_and_input_div`)}else{department_Name_selectAndInput_div.classList.remove(`hidden_select_and_input_div`)}
        select_department_name.value = conditions.select_department_name;
        input_department_name.value = conditions.input_department_name;

        account_no_div.style.display = conditions.account_no_div_display;
        input_account_no.style.display = conditions.input_account_no_display;
        checkbox_account_no.checked = conditions.checkbox_account_no;
        if (conditions.accNo_selectAndInput_div_isHidden){accNo_selectAndInput_div.classList.add(`hidden_select_and_input_div`)}else{accNo_selectAndInput_div.classList.remove(`hidden_select_and_input_div`)}
        select_account_no.value = conditions.select_account_no;
        input_account_no.value = conditions.input_account_no;

        account_name_div.style.display = conditions.account_name_div_display;
        input_account_name.style.display = conditions.input_account_name_display;
        checkbox_account_name.checked = conditions.checkbox_account_name;
        if (conditions.accountName_selectAndInput_div_isHidden){accountName_selectAndInput_div.classList.add(`hidden_select_and_input_div`)}else{accountName_selectAndInput_div.classList.remove(`hidden_select_and_input_div`)}
        select_account_name.value = conditions.select_account_name;
        input_account_name.value = conditions.input_account_name;

        aggregation_div.style.display = conditions.aggregation_div_display;
        checkbox_aggregation.checked = conditions.checkbox_aggregation;

        note_div.style.display = conditions.note_div_display;
        input_note.style.display = conditions.input_note_display;
        checkbox_note.checked = conditions.checkbox_note;
        if (conditions.note_selectAndInput_div_isHidden){note_selectAndInput_div.classList.add(`hidden_select_and_input_div`)}else{note_selectAndInput_div.classList.remove(`hidden_select_and_input_div`)}
        select_note.value = conditions.select_note;
        input_note.value = conditions.input_note;



        balance1_div.style.display = conditions.balance1_div_display;
        input_balance1.style.display = conditions.input_balance1_display;
        if (conditions.balance1_selectAndInput_div_isHidden){balance1_selectAndInput_div.classList.add(`hidden_select_and_input_div`)}else{balance1_selectAndInput_div.classList.remove(`hidden_select_and_input_div`)}
        check_balance1.checked = conditions.check_balance1;
        select_balance1.value = conditions.select_balance1;
        input_balance1.value = conditions.input_balance1;

        balance2_div.style.display = conditions.balance2_div_display;
        input_balance2.style.display = conditions.input_balance2_display;
        if (conditions.balance2_selectAndInput_div_isHidden){balance2_selectAndInput_div.classList.add(`hidden_select_and_input_div`)}else{balance2_selectAndInput_div.classList.remove(`hidden_select_and_input_div`)}
        check_balance2.checked = conditions.check_balance2;
        select_balance2.value = conditions.select_balance2;
        input_balance2.value = conditions.input_balance2;

        balance3_div.style.display = conditions.balance3_div_display;
        input_balance3.style.display = conditions.input_balance3_display;
        if (conditions.balance3_selectAndInput_div_isHidden){balance3_selectAndInput_div.classList.add(`hidden_select_and_input_div`)}else{balance3_selectAndInput_div.classList.remove(`hidden_select_and_input_div`)}
        check_balance3.checked = conditions.check_balance3;
        select_balance3.value = conditions.select_balance3;
        input_balance3.value = conditions.input_balance3;



        active_div.style.display = conditions.active_div_display;
        /* NO input */
        if (conditions.active_selectAndInput_div_isHidden){active_selectAndInput_div.classList.add(`hidden_select_and_input_div`)}else{active_selectAndInput_div.classList.remove(`hidden_select_and_input_div`)}
        checkbox_active.checked = conditions.checkbox_active;
        select_active.value = conditions.select_active;

        sub_h2_header.textContent = conditions.sub_h2_header;
        QKey = conditions.QKey_val;

        is_filter = conditions.is_filter;
        if (conditions.is_filter_div_hidden) {
            hidden_filter_div();
    
        } else {
            show_filter_div();

        }

        back_href.title = conditions.back_title;
        back_href.href = conditions.back_href; // تأكد من صحة الاسم
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
    checkbox_datex.checked = true;
    checkbox_deparment_name.checked = false;
    checkbox_account_no.checked = false;
    checkbox_account_name.checked = true;
    checkbox_note.checked = false;
    check_balance1.checked = true;
    check_balance2.checked = true;
    check_balance3.checked = true;
    check_balance3.reference = true;
    select_active.value = 0;
}

async function filter_icon_cancel_fn() {
    try {

        if(is_filter){

            await showDialog("","هل تريد الغاء التصفية والرجوع الى الحالة الافتراضية ؟","");
            if (!dialogAnswer) {
                return;
            }
    
            deafult_checkbox();
            // QKey = null;
            input_start_date1.value = firstDayOfYear;
            input_end_date1.value = lastDayOfYear;
            checkbox_aggregation.checked = false;
            note_div.style.display = "flex";
            reference_div.style.display = "flex";
            sub_h2_header.textContent = `من ${reverseDateFormatting(input_start_date1.value)}   الى   ${reverseDateFormatting(input_end_date1.value)}`;
            
            await getData_fn();
            closeDialog();
            sessionStorage.removeItem('effectsViewArray');
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

let QKey = null;
let data = [];
let array1 = [];
let slice_array1 = [];
let filteredData_Array = [];

async function getData_fn() {
    try {
        const checkbox_aggregation_val = checkbox_aggregation.checked;

        let start_date;
        let end_date;

        start_date = input_start_date1.value;
        end_date = input_end_date1.value;
       
        
        data = await fetchData_postAndGet(
            "/effects_view",
            { QKey, checkbox_aggregation_val, start_date, end_date },
            "employees_permission",
            "view",
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

        // QKey = null;

        showFirst50RowAtTheBegening();
    } catch (error) {
      catch_error(error)
    }
}


// function is_datexChanged() {
//     if (
//         input_start_date1.value !== startDate ||
//         input_end_date1.value !== endDate
//     ) {


//         return true;
//     } else {
//         return false;
//     }
// }




async function Execution() {
    try {
        showLoadingIcon(content_space);
        is_filter = true
        searchInput.value = "";
        if (QKey && +QKey > 0 ){
            // console.log(`حالة ال Qkey`);
            sub_h2_header.textContent = `الموظف : ${emp_name} من ${reverseDateFormatting(input_start_date1.value)}  الى ${reverseDateFormatting(input_end_date1.value)}`;
            showFirst50RowAtTheBegening();
            backUp_filter_div_conditions();
            hideLoadingIcon(content_space);
            return
            
        } else if (!checkbox_aggregation.checked) {
            // console.log(`الحالة العادة`);
            // note_div.style.display = "flex";
            // datex_div.style.display = "flex";
            // reference_div.style.display = "flex";
            sub_h2_header.textContent = `من ${reverseDateFormatting(input_start_date1.value)}   الى   ${reverseDateFormatting(input_end_date1.value)}`;
        
        } else if (checkbox_aggregation.checked) {
            // console.log(`حالة التجميع `);

            checkbox_datex_div.style.display = `none`;
            checkbox_datex.checked = false
            reference_div.style.display = `none`;
            check_reference.checked = false
            
        
            sub_h2_header.textContent = `تقرير مجمع من   ${reverseDateFormatting(input_start_date1.value)}   الى   ${reverseDateFormatting(input_end_date1.value)}`;
            back_href.title = "المؤثرات";
            

            showAlert(`info`,`تم تجميع البيانات على مستوى الموظف من ${reverseDateFormatting(input_start_date1.value)} الى ${reverseDateFormatting(input_end_date1.value)}`);
        }

        await getData_fn();
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
            const isAccountNofoMatch =
                filterData_string_column_with_showAndHiddenCheckbox(
                    checkbox_account_no,
                    select_account_no,
                    input_account_no,
                    "account_no",
                    row
                );
            const isDepartmentNamefoMatch =
                filterData_string_column_with_showAndHiddenCheckbox(
                    checkbox_deparment_name,
                    select_department_name,
                    input_department_name,
                    "department_name",
                    row
                );
            const isNameMatch = filterData_string_column_with_showAndHiddenCheckbox(
                checkbox_account_name,
                select_account_name,
                input_account_name,
                "account_name",
                row
            );
            const isAnotherInfoMatch =
                filterData_string_column_with_showAndHiddenCheckbox(
                    checkbox_note,
                    select_note,
                    input_note,
                    "note",
                    row
                );
            const isdatexMatch = checkbox_aggregation.checked
                ? true
                : filterData_date_column_with_two_inputs_and_showAndHiddenCheckbox(
                    checkbox_datex,
                    select_datex,
                    input_start_date1,
                    input_end_date1,
                    "datex",
                    row
                );
            const isBalanceMatch1 =
                filterData_number_column_with_showAndHiddenCheckbox(
                    check_balance1,
                    select_balance1,
                    input_balance1,
                    "days",
                    row
                );
            const isBalanceMatch2 =
                filterData_number_column_with_showAndHiddenCheckbox(
                    check_balance2,
                    select_balance2,
                    input_balance2,
                    "hours",
                    row
                );
            const isBalanceMatch3 =
                filterData_number_column_with_showAndHiddenCheckbox(
                    check_balance3,
                    select_balance3,
                    input_balance3,
                    "values",
                    row
                );
            const isReferenceMatch =
                filterData_number_column_with_showAndHiddenCheckbox(
                    check_reference,
                    select_reference,
                    input_reference,
                    "reference",
                    row
                );
            const isActiveceMatch =
                filterData_string_column_with_showAndHiddenCheckbox_with_only_select(
                    checkbox_active,
                    select_active,
                    "is_inactive",
                    row
                );

            const QKey_val = filterData_Qkey(QKey, "employee_id", row);

            return (
                isAccountNofoMatch &&
                isDepartmentNamefoMatch &&
                isNameMatch &&
                isAnotherInfoMatch &&
                isdatexMatch &&
                isBalanceMatch1 &&
                isBalanceMatch2 &&
                isBalanceMatch3 &&
                isReferenceMatch &&
                isActiveceMatch &&
                QKey_val
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
        let style_datex = `display:${checkbox_datex.checked ? "table-cell" : "none"
            }; width: ${!checkbox_account_name.checked && !checkbox_note.checked ? `100%` : "auto"
            }; white-space: nowrap; text-align: start`;
        let style_reference = `display:${check_reference.checked ? "table-cell" : "none"
            }; width: auto; white-space: nowrap; text-align: start`;
        let style_department_id = `display: none;`;
        let style_department_name = `display:${checkbox_deparment_name.checked ? "table-cell" : "none"
            }; width: auto; white-space: nowrap; text-align: start`;
        let style_account_no = `display:${checkbox_account_no.checked ? "table-cell" : "none"
            };  width: auto; white-space: nowrap; text-align: start`;
        let style_name = `display:${checkbox_account_name.checked ? "table-cell" : "none"
            }; width: ${checkbox_note.checked ? "auto" : "100%"
            }; white-space: nowrap; text-align: start`;
        let style_note = `display:${checkbox_note.checked ? "table-cell" : "none"
            }; width: 100%; min-width: 2rem; white-space: wrap; text-align: start;`;
        let style_balance1 = `display:${check_balance1.checked ? "table-cell" : "none"
            }; width: auto; white-space: nowrap; text-align: start`;
        let style_balance2 = `display:${check_balance2.checked ? "table-cell" : "none"
            }; width: auto; white-space: nowrap; text-align: start`;
        let style_balance3 = `display:${check_balance3.checked ? "table-cell" : "none" }; width: auto; white-space: nowrap; text-align: start`;
        let style_active = `display:${checkbox_active.checked ? "table-cell" : "none"
            };  width: auto; white-space: nowrap; text-align: center;`;

        total_column1.value = 0;
        total_column2.value = 0;
        total_column3.value = 0;

        let buttonRow;
        let linkStyle = "false";
        let fn = "";

        if (checkbox_aggregation.checked) {
            fn = `onclick = "aggregation_balance_details(this)"`;
            buttonRow = `<td style="${style_button}"><button class="tabble_view_btn" onclick="aggregation_balance_details(this)">عرض</button></td>`;
            linkStyle = true;
        } else {
            fn = ``;
            buttonRow = `<td style="${style_button}"><button class="tabble_update_btn" onclick="table_update_btn_fn(this)">تحرير</button></td>`;
            linkStyle = false;
        }

        // إعداد رأس الجدول
        // هنا بناء الجدول بدون صف الأزرار
        let tableHTML = `<table id="review_table" class="review_table">
                        <thead>
                            <tr>
                                <th style="${style_button}"></th>
                                <th style="${style_id}">ID</th>
                                <th style="${style_datex}">التاريخ</th>
                                <th style="${style_reference}">#</th>
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
                row.is_inactive == "غير نشط"
                    ? "table_red_condition"
                    : "table_green_condition";

            tableHTML += `<tr>
                        ${buttonRow}
                        <td style="${style_id}">${row.id}</td>
                        <td style="${style_datex}">${row.datex}</td>
                        <td style="${style_reference}">${row.reference}</td>
                        <td style="${style_department_id}">${row.department_id
                }</td>
                        <td style="${style_department_name}">${row.department_name
                }</td>
                        <td style="${style_account_no}">${row.account_no}</td>
                        <td style="${style_id}">${row.employee_id}</td>
                        <td style="${style_name}">${row.account_name}</td>
                        ${tdNumber(linkStyle,false,true,row.days,style_balance1,total_column1,fn)}
                        ${tdNumber(linkStyle,false,true,row.hours,style_balance2,total_column2,fn)}
                        ${tdNumber(linkStyle,false,true,row.values,style_balance3,total_column3,fn)}
                        <td style="${style_note}">${row.note.replace(/\n/g, "<br>")}</td>
                        <td style="${style_active}"><span class="${activeClass}">${row.is_inactive}</span></td>                        
                      </tr>`;
        });

        tableHTML += `
                    <tr class="table_totals_row">
                        <td id="tfooter0" style="${style_button}"></td>
                        <td id="tfooter1" style="${style_id}"></td>
                        <td id="tfooter2" style="${style_datex}"></td>
                        <td id="tfooter3" style="${style_reference}"></td>
                        <td id="tfooter4" style="${style_department_id}"></td>
                        <td id="tfooter5" style="${style_department_name}"></td>
                        <td id="tfooter6" style="${style_account_no}"></td>
                        <td id="tfooter7" style="${style_id}"></td>
                        <td id="tfooter8" style="${style_name}"></td>
                        <td id="tfooter9" style="${style_balance1}"></td>
                        <td id="tfooter10" style="${style_balance2}"></td>
                        <td id="tfooter11" style="${style_balance3}"></td>
                        <td id="tfooter12" style="${style_note}"></td>
                        <td id="tfooter13" style="${style_active}"></td>
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
        tableContainer.querySelector(`#tfooter0`).textContent = slice_array1.length; //  عدد الصفوف
        tableContainer.querySelector(`#tfooter9`).textContent = floatToString(
            true,
            total_column1.value
        );
        tableContainer.querySelector(`#tfooter10`).textContent = floatToString(
            true,
            total_column2.value
        );
        tableContainer.querySelector(`#tfooter11`).textContent = floatToString(
            true,
            total_column3.value
        );

        if (array1.length > 0 && array1.length <= 50) {
            document.querySelector("#table_footer_showRows_div").style.display =
                "none";
        }

        startDate = input_start_date1.value;
        endDate = input_end_date1.value;
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
            const datexInfoMatch = performSearch_Row(checkbox_datex,"datex",searchValue,row);
            const referenceMatch = performSearch_Row(check_reference,"reference",searchValue,row);
            const departmentMatch = performSearch_Row(checkbox_deparment_name,"department_name",searchValue,row);
            const accNoMatch = performSearch_Row(checkbox_account_no,"account_no",searchValue,row);
            const nameMatch = performSearch_Row(checkbox_account_name,"account_name",searchValue,row);
            const anotherInfoMatch = performSearch_Row(checkbox_note,"note",searchValue,row);
            const balanceMatch1 = performSearch_Row(check_balance1,"days",searchValue,row);
            const balanceMatch2 = performSearch_Row(check_balance2,"hours",searchValue,row);
            const balanceMatch3 = performSearch_Row(check_balance3,"values",searchValue,row);
            const activeeMatch = performSearch_Row(checkbox_active,"is_inactive",searchValue,row);

            // استخدام || بدلاً من && لضمان أن البحث يتم في كلا الحقلين
            return (
                datexInfoMatch ||
                referenceMatch ||
                departmentMatch ||
                accNoMatch ||
                nameMatch ||
                anotherInfoMatch ||
                balanceMatch1 ||
                balanceMatch2 ||
                balanceMatch3 ||
                activeeMatch
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
    const permission = await btn_permission("employees_permission", "update");

    if (!permission) {
        // if false
        return;
    }


    backUp_filter_div_conditions() // ضرورى لانه هيرجع مرتين لازم اخد باك اب هنا
    const row = updateBtn.closest("tr");

    const employees_update_data = {
        x: row.cells[1].textContent,
        datex: row.cells[2].textContent,
        reference: row.cells[3].textContent,
        account_no: row.cells[6].textContent,
        emp_x: row.cells[7].textContent,
        acc_name: row.cells[8].textContent,
        days: row.cells[9].textContent,
        hours: row.cells[10].textContent,
        values: row.cells[11].textContent,
        note: row.cells[12].textContent,
        active: row.cells[13].textContent,
    };

    

    const transferedData = { employees_update_data };
    const encodedData = encodeURIComponent(JSON.stringify(transferedData));
 

    window.location.href = `effects_update_ar?data=${encodedData}`;
}

function CheckUrlParams_effects_update_ar() {
    try {
        const urlData = getURLData(
            "data",
            "effect_view_ar",
            "رابط غير صالح : سيتم اعادة توجيهك الى صفحة المؤثرات"
        );

        if (!urlData || urlData.pageName !== "effects_update_ar") {
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

function CheckUrlParams_department_view_ar() {
    try {
        const departmentData = getURLData(
            "data",
            "departments_view_ar",
            "رابط غير صالح : سيتم اعادة توجيهك الى صفحة الاقسام"
        );
        if (!departmentData || departmentData.pageName !== `department_view_ar`) {
            return true;
        }



        if (departmentData !== "noParams") {
            is_recieved_params_from_department_view = true;

            sub_h2_header.textContent = departmentData.n ? departmentData.n : "";
            back_href.href = "departments_view_ar";
            back_href.title = "الاقسام";
            QKey = departmentData.x;


            active_div.style.display = "none";
            return true;
        } else if (departmentData === "noParams") {
            back_href.href = "hr_ar";
            back_href.title = "الموارد البشرية";
            // QKey = null;
   
            active_div.style.display = "flex";
            return true;
        } else {
            return false;
        }
    } catch (error) {
        catch_error(error);
        return false;
    }
}

let emp_name
async function aggregation_balance_details(details_btn) {
    try {
        showLoadingIcon(content_space);
        const row = details_btn.closest("tr");
        QKey = row.cells[7].textContent;
        deafult_checkbox();
        checkbox_aggregation.checked = false;
        note_div.style.display = "flex";
        reference_div.style.display = "flex";
       
        emp_name = row.cells[8].textContent;
        checkbox_account_name.checked = false;
        checkbox_note.checked = true;
        check_reference.checked = true;
        account_name_div.style.display = `none`
        active_div.style.display = `none`
        checkbox_active.checked = false;
        depatment_name_div.style.display = `none`
        account_no_div.style.display = `none`
        datex_div.style.display = `none`
        aggregation_div.style.display = `none`
 
 

        sub_h2_header.textContent = `الموظف : ${emp_name} من ${reverseDateFormatting(input_start_date1.value)}  الى ${reverseDateFormatting(input_end_date1.value)}`;
        hidden_filter_div();

        backUp_filter_div_conditions() // ضرورى لانه هيرجع مرتين لازم اخد باك اب هنا
        const dat1 = input_start_date1.value;
        const dat2 = input_end_date1.value;


        await getData_fn();


        // sub_h2_header.textContent = `الموظف : ${emp_name} من ${reverseDateFormatting(input_start_date1.value)}  الى ${reverseDateFormatting(input_end_date1.value)}`;
        // QKey = null;



        hideLoadingIcon(content_space);
    } catch (error) {
        hideLoadingIcon(content_space);
        catch_error(error);
    }
    //
}

document.addEventListener("DOMContentLoaded", async function () {

    sub_h2_header.textContent = `من ${reverseDateFormatting(input_start_date1.value)}   الى   ${reverseDateFormatting(input_end_date1.value)}`;
    
    const result1 = CheckUrlParams_department_view_ar();
    if (!result1) {
        return;
    }
    const result2 = CheckUrlParams_effects_update_ar();
    if (!result2) {
        return;
    }

    showRedirectionReason();
    await getData_fn();
    const conditionsArray = sessionStorage.getItem(`effectsViewArray`);

    if (!conditionsArray){
     
        backUp_filter_div_conditions();
    }
    
});

window.addEventListener("beforeprint", function () {
    beforeprint_reviewTable("review_table", 0, 1); // هذا سيخفي العمود الأول والثاني
});

/*--------------------------------------------------------------------------------*/
