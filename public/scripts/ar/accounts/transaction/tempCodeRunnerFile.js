setActiveSidebar("hr_ar");
// pagePermission("view", "transaction_permission");

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
let input_start_date1 = filter_div.querySelector(`#input_start_date1`); input_start_date1.value = firstDayOfYear;
let input_end_date1 = filter_div.querySelector(`#input_end_date1`); input_end_date1.value = lastDayOfYear;

let referenceCONCAT_div = filter_div.querySelector(`#referenceCONCAT_div`);
let checkbox_referenceCONCAT = filter_div.querySelector(`#checkbox_referenceCONCAT`);
let referenceCONCAT_selectAndInput_div = filter_div.querySelector(`#referenceCONCAT_selectAndInput_div`);
let select_referenceCONCAT = filter_div.querySelector(`#select_referenceCONCAT`);
let input_referenceCONCAT = filter_div.querySelector(`#input_referenceCONCAT`);

let note_div = filter_div.querySelector(`#note_dive`);
let checkbox_note = filter_div.querySelector(`#checkbox_note`);
let note_selectAndInput_div = filter_div.querySelector(`#note_selectAndInput_div`);
let select_note = filter_div.querySelector(`#select_note`);
let input_note = filter_div.querySelector(`#input_note`);


let balance3_div = filter_div.querySelector(`#balance3_div`);
let checkbox_balance3 = filter_div.querySelector(`#checkbox_balance3`);
let balance3_selectAndInput_div = filter_div.querySelector(`#balance3_selectAndInput_div`);
let select_balance3 = filter_div.querySelector(`#select_balance3`);
let input_balance3 = filter_div.querySelector(`#input_balance3`);


const btn_do = filter_div.querySelector(`#btn_do`);

function backUp_filter_div_conditions() {

    const conditions = {
        
        datex_div_display: window.getComputedStyle(datex_div).display,
        checkbox_datex_div_display: window.getComputedStyle(checkbox_datex_div).display,
        checkbox_datex: checkbox_datex.checked,
        select_datex: select_datex.value,
        input_start_date1: input_start_date1.value,
        input_end_date1: input_end_date1.value,

        referenceCONCAT_div_display: window.getComputedStyle(referenceCONCAT_div).display,
        input_referenceCONCAT_display: window.getComputedStyle(input_referenceCONCAT).display,
        referenceCONCAT_selectAndInput_div_isHidden : referenceCONCAT_selectAndInput_div.classList.contains(`hidden_select_and_input_div`) ? true : false,
        checkbox_referenceCONCAT: checkbox_referenceCONCAT.checked,
        select_referenceCONCAT: select_referenceCONCAT.value,
        input_referenceCONCAT: input_referenceCONCAT.value,

        note_div_display: window.getComputedStyle(note_div).display,
        input_note_display: window.getComputedStyle(input_note).display,
        note_selectAndInput_div_isHidden : note_selectAndInput_div.classList.contains(`hidden_select_and_input_div`) ? true : false,
        checkbox_note: checkbox_note.checked,
        select_note: select_note.value,
        input_note: input_note.value,

        balance3_div_display: window.getComputedStyle(balance3_div).display,
        input_balance3_display: window.getComputedStyle(input_balance3).display,
        balance3_selectAndInput_div_isHidden : balance3_selectAndInput_div.classList.contains(`hidden_select_and_input_div`) ? true : false,
        checkbox_balance3: checkbox_balance3.checked,
        select_balance3: select_balance3.value,
        input_balance3: input_balance3.value,

        is_filter: is_filter,
        is_filter_div_hidden: filter_div.classList.contains(`hidden_height`) ? true : false,
        sub_h2_header: sub_h2_header.textContent,
        

        back_href: back_href.herf,
        back_title: back_href.title,
    };


    // استرجاع المصفوفة المحفوظة في sessionStorage
    let conditionsArray = JSON.parse(sessionStorage.getItem(`transactionViewArray`)) || [];

    
    // إضافة العنصر الجديد إلى المصفوفة
    conditionsArray.push(conditions);

    // حفظ المصفوفة المحدثة في sessionStorage
    sessionStorage.setItem(`transactionViewArray`,JSON.stringify(conditionsArray));
   
}

back_href.onclick = async function (event) {
    event.preventDefault();
   

    const array = JSON.parse(sessionStorage.getItem(`transactionViewArray`)) || [];

    if (!array || array.length <= 1) {
    
   
            window.location.href = `notes_ar`;
       
    }else{

        restore_filter_div_conditions(2)
        await getData_fn();

    }
};

function restore_filter_div_conditions(NUM_ektp_rakm_el_restore_elyEnta3ayzTerg3oMnel2a5er_maslan_1_ya3nyLastRestore) {
    let conditions;

    // استرجاع المصفوفة المحفوظة في sessionStorage
    let conditionsArray = JSON.parse(sessionStorage.getItem("transactionViewArray")) || [];
  
    // التحقق إذا كانت المصفوفة تحتوي على عناصر
    if (conditionsArray.length > 0) {
        // استحضار آخر عنصر وحذفه من المصفوفة
        conditions = conditionsArray[conditionsArray.length - NUM_ektp_rakm_el_restore_elyEnta3ayzTerg3oMnel2a5er_maslan_1_ya3nyLastRestore];

        if (NUM_ektp_rakm_el_restore_elyEnta3ayzTerg3oMnel2a5er_maslan_1_ya3nyLastRestore > 1){

         // حذف العنصر الاخير والقبل الاخير من المصفوفة
        conditionsArray.splice(-`${NUM_ektp_rakm_el_restore_elyEnta3ayzTerg3oMnel2a5er_maslan_1_ya3nyLastRestore-1}`);

        // حفظ المصفوفة المحدثة في sessionStorage بعد الحذف
        sessionStorage.setItem("transactionViewArray",JSON.stringify(conditionsArray));
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


        referenceCONCAT_div.style.display = conditions.referenceCONCAT_div_display;
        input_referenceCONCAT.style.display = conditions.input_referenceCONCAT_display;
        checkbox_referenceCONCAT.checked = conditions.checkbox_referenceCONCAT;
        if (conditions.referenceCONCAT_selectAndInput_div_isHidden){referenceCONCAT_selectAndInput_div.classList.add(`hidden_select_and_input_div`)}else{referenceCONCAT_selectAndInput_div.classList.remove(`hidden_select_and_input_div`)}
        select_referenceCONCAT.value = conditions.select_referenceCONCAT;
        input_referenceCONCAT.value = conditions.input_referenceCONCAT;

        note_div.style.display = conditions.note_div_display;
        input_note.style.display = conditions.input_note_display;
        checkbox_note.checked = conditions.checkbox_note;
        if (conditions.note_selectAndInput_div_isHidden){note_selectAndInput_div.classList.add(`hidden_select_and_input_div`)}else{note_selectAndInput_div.classList.remove(`hidden_select_and_input_div`)}
        select_note.value = conditions.select_note;
        input_note.value = conditions.input_note;

        balance3_div.style.display = conditions.balance3_div_display;
        input_balance3.style.display = conditions.input_balance3_display;
        if (conditions.balance3_selectAndInput_div_isHidden){balance3_selectAndInput_div.classList.add(`hidden_select_and_input_div`)}else{balance3_selectAndInput_div.classList.remove(`hidden_select_and_input_div`)}
        checkbox_balance3.checked = conditions.checkbox_balance3;
        select_balance3.value = conditions.select_balance3;
        input_balance3.value = conditions.input_balance3;

        sub_h2_header.textContent = conditions.sub_h2_header;

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
    checkbox_referenceCONCAT.checked = true
    input_referenceCONCAT.value = ""
    note_div.style.display = `flex`
    checkbox_note.checked = true;
    checkbox_balance3.checked = true;
}

async function filter_icon_cancel_fn() {
    try {

        if(is_filter){

            await showDialog("","هل تريد الغاء التصفية والرجوع الى الحالة الافتراضية ؟","");
            if (!dialogAnswer) {
                return;
            }
    
            deafult_checkbox();
            input_start_date1.value = firstDayOfYear;
            input_end_date1.value = lastDayOfYear;
            note_div.style.display = "flex";
            referenceCONCAT_div.style.display = "flex";
            sub_h2_header.textContent = `من ${reverseDateFormatting(input_start_date1.value)}   الى   ${reverseDateFormatting(input_end_date1.value)}`;
            
            await getData_fn();
            closeDialog();
            sessionStorage.removeItem('transactionViewArray');
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

        start_date = input_start_date1.value;
        end_date = input_end_date1.value;
       
    
        data = await new_fetchData_postAndGet(
            "/get_All_transaction_Data",
            {start_date, end_date},
            "transaction_permission","view",
            15,
            false,'',
            false,
            true,content_space,
            false,false,'',
            false,'',
            false,'notes_ar',
            'حدث خطأ اثناء معالجة البيانات'
        )


        showFirst50RowAtTheBegening();
    } catch (error) {
      catch_error(error)
    }
}


function is_datexChanged() {
    if (
        input_start_date1.value !== startDate ||
        input_end_date1.value !== endDate
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
        sub_h2_header.textContent = `من ${reverseDateFormatting(input_start_date1.value)}   الى   ${reverseDateFormatting(input_end_date1.value)}`;
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

            const isdatexMatch = 
            filterData_date_column_with_two_inputs_and_showAndHiddenCheckbox(
                checkbox_datex,
                select_datex,
                input_start_date1,
                input_end_date1,
                "datex",
                row
            );

            const isReferenceMatch =
            filterData_number_column_with_showAndHiddenCheckbox(
                checkbox_referenceCONCAT,
                select_referenceCONCAT,
                input_referenceCONCAT,
                "reference",
                row
            );


            const isNoteMatch =
                filterData_string_column_with_showAndHiddenCheckbox(
                    checkbox_note,
                    select_note,
                    input_note,
                    "general_note",
                    row
                );


            const isBalanceMatch3 =
                filterData_number_column_with_showAndHiddenCheckbox(
                    checkbox_balance3,
                    select_balance3,
                    input_balance3,
                    "total_value",
                    row
                );


            return (

                isNoteMatch &&
                isdatexMatch &&
                isBalanceMatch3 &&
                isReferenceMatch
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
        let style_reference = `display: none;`; 
        let style_referenceCONCAT = `display: table-cell; width: ${checkbox_note.checked ? "auto" : "100%"}; white-space: nowrap; text-align: start`;
        let style_note = `display:${checkbox_note.checked ? "table-cell" : "none"}; min-width: 25rem; width: 100%; white-space: wrap; text-align: start;`;
        let style_balance3 = `display:${checkbox_balance3.checked ? "table-cell" : "none" }; width: auto; white-space: nowrap; text-align: start`;

        total_column3.value = 0;
        let fn = `onclick = "table_update_btn_fn(this)"`;

        // إعداد رأس الجدول
        // هنا بناء الجدول بدون صف الأزرار
        let tableHTML = `<table id="review_table" class="review_table">
                        <thead>
                            <tr>
                                <th style="${style_button}"></th>
                                <th style="${style_id}">ID</th>
                                <th style="${style_datex}">التاريخ</th>
                                <th style="${style_reference}">#</th>
                                <th style="${style_referenceCONCAT}">#</th>
                                <th style="${style_note}">البيان</th>
                                <th style="${style_balance3}">قيمة</th>
                                
                            </tr>
                        </thead>
                        <tbody>`;

        slice_array1.forEach((row) => {
                
            let referenceCONCAT = `${getYear(row.datex)}-${formatToFiveDigits(row.reference)}`

            tableHTML +=
                     `<tr>
                        <td style="${style_button}"><button class="table_update_btn" onclick="table_update_btn_fn(this)">تحرير</button></td>
                        <td style="${style_id}">${row.id}</td>
                        <td style="${style_datex}">${row.datex}</td>
                        <td style="${style_reference}">${row.reference}</td>
                        <td style="${style_referenceCONCAT}">${referenceCONCAT}</td>
                        <td style="${style_note}">${row.general_note}</td>
                        ${tdNumber(true,false,true,row.total_value,style_balance3,total_column3,fn)}                        
                      </tr>`;
        });

        tableHTML += `
                    <tr class="table_totals_row">
                        <td id="footer_style_button" style="${style_button}"></td>
                        <td id="footer_style_id1" style="${style_id}"></td>
                        <td id="footer_style_datex" style="${style_datex}"></td>
                        <td id="footer_style_reference" style="${style_reference}"></td>
                        <td id="footer_style_referenceCONCAT" style="${style_referenceCONCAT}"></td>
                        <td id="footer_style_note" style="${style_note}"></td>
                        <td id="footer_style_balance3" style="${style_balance3}"></td>
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

        tableContainer.querySelector(`#footer_style_balance3`).textContent = floatToString(true,total_column3.value);

        if (array1.length > 0 && array1.length <= 50) {
            document.querySelector("#table_footer_showRows_div").style.display ="none";
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
            const referenceCONCAT_Match = performSearch_Row(checkbox_referenceCONCAT,"reference",searchValue,row);
            const noteMatch = performSearch_Row(checkbox_note,"general_note",searchValue,row);
            const balanceMatch3 = performSearch_Row(checkbox_balance3,"total_value",searchValue,row);

            // استخدام || بدلاً من && لضمان أن البحث يتم في كلا الحقلين
            return (
                datexInfoMatch ||
                referenceCONCAT_Match ||
                noteMatch ||
                balanceMatch3
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
    const permission = await btn_permission("transaction_permission", "update");

    if (!permission) {
        // if false
        return;
    }


    backUp_filter_div_conditions() // ضرورى لانه هيرجع مرتين لازم اخد باك اب هنا
    const row = updateBtn.closest("tr");

    const transaction_update_data = {
        x: row.cells[1].textContent,
        datex: row.cells[2].textContent,
        reference: row.cells[3].textContent,
        referenceCONCAT: row.cells[4].textContent,
        values: row.cells[6].textContent,
        note: row.cells[5].textContent,        
    };

    

    const transferedData = { transaction_update_data };
    const encodedData = encodeURIComponent(JSON.stringify(transferedData));
 

    window.location.href = `transaction_update_ar?data=${encodedData}`;
}

function CheckUrlParams_transaction_update_ar() {
    try {
        const urlData = getURLData(
            "data",
            "transaction_view_ar",
            "رابط غير صالح : سيتم اعادة توجيهك الى صفحة القيود اليومية"
        );

        if (!urlData || urlData.pageName !== "transaction_update_ar") {
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

    sub_h2_header.textContent = `من ${reverseDateFormatting(input_start_date1.value)}   الى   ${reverseDateFormatting(input_end_date1.value)}`;
    
    const result2 = CheckUrlParams_transaction_update_ar();
    if (!result2) {
        return;
    }

    await getData_fn();
    const conditionsArray = sessionStorage.getItem(`transactionViewArray`);

    if (!conditionsArray){
     
        backUp_filter_div_conditions();
    }

});

window.addEventListener("beforeprint", function () {
    beforeprint_reviewTable("review_table", 0, 1); // هذا سيخفي العمود الأول والثاني
});

/*--------------------------------------------------------------------------------*/
