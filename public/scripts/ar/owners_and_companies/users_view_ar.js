// setActiveSidebar("notes_ar");
pagePermission("view", "users_permission");

const h2_text_div = document.querySelector(`#h2_text_div`);
const sub_h2_header = document.querySelector(`#sub_h2_header`);
const new_user_btn = document.querySelector(`#new_user_btn`);

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

new_user_btn.onclick = function(){
    window.location.href = `users_add_ar`;
}


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



let note_div = filter_div.querySelector(`#note_dive`);
let checkbox_note = filter_div.querySelector(`#checkbox_note`);
let note_selectAndInput_div = filter_div.querySelector(`#note_selectAndInput_div`);
let select_note = filter_div.querySelector(`#select_note`);
let input_note = filter_div.querySelector(`#input_note`);


let active_div = filter_div.querySelector(`#active_div`);
let checkbox_active = filter_div.querySelector(`#checkbox_active`);
let active_selectAndInput_div = filter_div.querySelector(`#active_selectAndInput_div`);
let select_active = filter_div.querySelector(`#select_active`);

const btn_do = filter_div.querySelector(`#btn_do`);

function backUp_filter_div_conditions() {



    const conditions = {
        


        note_div_display: window.getComputedStyle(note_div).display,
        input_note_display: window.getComputedStyle(input_note).display,
        note_selectAndInput_div_isHidden : note_selectAndInput_div.classList.contains(`hidden_select_and_input_div`) ? true : false,
        checkbox_note: checkbox_note.checked,
        select_note: select_note.value,
        input_note: input_note.value,


        active_div_display: window.getComputedStyle(active_div).display,
        /* No input */
        active_selectAndInput_div_isHidden : active_selectAndInput_div.classList.contains(`hidden_select_and_input_div`) ? true : false,
        checkbox_active: checkbox_active.checked,
        select_active: select_active.value,
        is_filter: is_filter,
        is_filter_div_hidden: filter_div.classList.contains(`hidden_height`)
            ? true
            : false,
      
    };


    
    // استرجاع المصفوفة المحفوظة في sessionStorage
    let conditionsArray = JSON.parse(sessionStorage.getItem(`usersViewArray`)) || [];

    
    // إضافة العنصر الجديد إلى المصفوفة
    conditionsArray.push(conditions);

    // حفظ المصفوفة المحدثة في sessionStorage
    sessionStorage.setItem(`usersViewArray`,JSON.stringify(conditionsArray));
   

}

back_href.onclick = async function (event) {
    event.preventDefault();
   

    const array = JSON.parse(sessionStorage.getItem(`usersViewArray`)) || [];

    if (!array || array.length <= 1) {
    
        
            window.location.href = `companies_ar`;
       
    }else{

        restore_filter_div_conditions(2)
        await getData_fn();
        
    }
};

function restore_filter_div_conditions(NUM_ektp_rakm_el_restore_elyEnta3ayzTerg3oMnel2a5er_maslan_1_ya3nyLastRestore) {
    let conditions;

    // استرجاع المصفوفة المحفوظة في sessionStorage
    let conditionsArray = JSON.parse(sessionStorage.getItem("usersViewArray")) || [];
  
    // التحقق إذا كانت المصفوفة تحتوي على عناصر
    if (conditionsArray.length > 0) {
        // استحضار آخر عنصر وحذفه من المصفوفة
        conditions = conditionsArray[conditionsArray.length - NUM_ektp_rakm_el_restore_elyEnta3ayzTerg3oMnel2a5er_maslan_1_ya3nyLastRestore];

        if (NUM_ektp_rakm_el_restore_elyEnta3ayzTerg3oMnel2a5er_maslan_1_ya3nyLastRestore > 1){

         // حذف العنصر الاخير والقبل الاخير من المصفوفة
        conditionsArray.splice(-`${NUM_ektp_rakm_el_restore_elyEnta3ayzTerg3oMnel2a5er_maslan_1_ya3nyLastRestore-1}`);

        // حفظ المصفوفة المحدثة في sessionStorage بعد الحذف
        sessionStorage.setItem("usersViewArray",JSON.stringify(conditionsArray));
        }
    } else {
        return
    }

    if (conditions) {

        note_div.style.display = conditions.note_div_display;
        input_note.style.display = conditions.input_note_display;
        checkbox_note.checked = conditions.checkbox_note;
        if (conditions.note_selectAndInput_div_isHidden){note_selectAndInput_div.classList.add(`hidden_select_and_input_div`)}else{note_selectAndInput_div.classList.remove(`hidden_select_and_input_div`)}
        select_note.value = conditions.select_note;
        input_note.value = conditions.input_note;

        active_div.style.display = conditions.active_div_display;
        /* NO input */
        if (conditions.active_selectAndInput_div_isHidden){active_selectAndInput_div.classList.add(`hidden_select_and_input_div`)}else{active_selectAndInput_div.classList.remove(`hidden_select_and_input_div`)}
        checkbox_active.checked = conditions.checkbox_active;
        select_active.value = conditions.select_active;
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
    checkbox_note.checked = true;
    select_active.value = 0;
}

async function filter_icon_cancel_fn() {
    try {
        
        if (is_filter){
            await showDialog("","هل تريد الغاء التصفية والرجوع الى الحالة الافتراضية ؟","");
            if (!dialogAnswer) {
                return;
            }

            deafult_checkbox();
            note_div.style.display = "flex";
            closeDialog();
            sessionStorage.removeItem('usersViewArray');
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

        data = await new_fetchData_postAndGet(
            "/get_main_users_Data",
            {},
            "","",
            15,
            false,"",
            true,
            true,content_space,
            false,"","",
            false,"",
            false,"companies_ar","حدث خطأ اثناء معالجة البيانات "
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
            const isUserFullNameMatch = filterData_string_column_with_showAndHiddenCheckbox(checkbox_note,select_note,input_note,"user_full_name",row);
            const isActiveceMatch = filterData_string_column_with_showAndHiddenCheckbox_with_only_select(checkbox_active,select_active,"is_stop",row);
            return (
                isUserFullNameMatch &&
                isActiveceMatch
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
        let style_note = `display:${checkbox_note.checked ? "table-cell" : "none"}; width: 100%; min-width: 2rem; white-space: wrap; text-align: start;`;

        let style_active = `display:${checkbox_active.checked ? "table-cell" : "none"};  width: auto; white-space: nowrap; text-align: center;`;

        // إعداد رأس الجدول
        // هنا بناء الجدول بدون صف الأزرار
        let tableHTML = `<table id="review_table" class="review_table">
                        <thead>
                            <tr>
                                <th style="${style_button}"></th>
                                <th style="${style_id}">ID</th>
                                <th style="${style_note}">الملاحظة</th>
                                <th style="${style_active}">الحالة</th>
                            </tr>
                        </thead>
                        <tbody>`;

        slice_array1.forEach((row) => {

            let is_stop = row.is_stop 
            let isStop_class = is_stop ? "table_delete_btn" : ''
            tableHTML += `<tr>
                        
                        <td style="${style_button}"><button class="table_update_btn" onclick="table_update_btn_fn(this)">تحرير</button></td>
                        <td style="${style_id}">${row.id}</td>
                        <td style="${style_note}">${row.user_full_name}</td>
                        <td style="${style_active}"><span class="${isStop_class}">${row.is_stop}</span></td>             
                      </tr>`;
        });

        tableHTML += `
                    <tr class="table_totals_row">
                        <td id="tfooter_style_button" style="${style_button}"></td>
                        <td id="tfooter_style_id" style="${style_id}"></td>
                        <td id="tfooter_style_note" style="${style_note}"></td>
                        <td id="tfooter_style_active" style="${style_active}"></td>
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
        tableContainer.querySelector(`#tfooter_style_button`).textContent = slice_array1.length; //  عدد الصفوف

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
            const anotherInfoMatch = performSearch_Row(checkbox_note,"user_full_name",searchValue,row);
            const activeeMatch = performSearch_Row(checkbox_active,"is_stop",searchValue,row);
            

            // استخدام || بدلاً من && لضمان أن البحث يتم في كلا الحقلين
            return (
                
                anotherInfoMatch ||
                activeeMatch 
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



async function table_update_btn_fn(updateBtn) {
    const permission = await btn_permission("employees_permission", "update");

    if (!permission) {
        // if false
        return;
    }


    backUp_filter_div_conditions() // ضرورى لانه هيرجع مرتين لازم اخد باك اب هنا
    const row = updateBtn.closest("tr");

    const users_update_data = {
        x: row.cells[1].textContent,
        
    };

    

    const transferedData = { users_update_data };
    const encodedData = encodeURIComponent(JSON.stringify(transferedData));
 

    window.location.href = `users_update_ar?data=${encodedData}`;
}


function CheckUrlParams_users_update_ar() {
    try {
        const urlData = getURLData(
            "data",
            "users_view_ar",
            "رابط غير صالح : سيتم اعادة توجيهك الى صفحة المؤثرات"
        );

        if (!urlData || urlData.pageName !== "users_update_ar") {
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
    clear_sub_sessionStorage()
    const result2 = CheckUrlParams_users_update_ar();
    if (!result2) {
        return;
    }

    showRedirectionReason();
    await getData_fn();
    const conditionsArray = sessionStorage.getItem(`usersViewArray`);

    if (!conditionsArray){
     
        backUp_filter_div_conditions();
    }
    
});

window.addEventListener("beforeprint", function () {
    beforeprint_reviewTable("review_table", 0, 1); // هذا سيخفي العمود الأول والثاني
});

/*--------------------------------------------------------------------------------*/
