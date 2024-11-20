setActiveSidebar("general_settings_ar");
// pagePermission("view", "customers_permission");

const h2_text_div = document.querySelector(`#h2_text_div`);
const sub_h2_header = document.querySelector(`#sub_h2_header`);
let is_filter = false;
const back_href = document.querySelector(`#back_href`);


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

//! tax_name
let f2_div = filter_div.querySelector(`#f2_div`);
let f2_checkbox = filter_div.querySelector(`#f2_checkbox`);
let f2_selectAndInput_div = filter_div.querySelector(`#f2_selectAndInput_div`);
let f2_select = filter_div.querySelector(`#f2_select`);
let f2_input = filter_div.querySelector(`#f2_input`);


//! tax_short_name
let f3_div = filter_div.querySelector(`#f3_div`);
let f3_checkbox = filter_div.querySelector(`#f3_checkbox`);
let f3_selectAndInput_div = filter_div.querySelector(`#f3_selectAndInput_div`);
let f3_select = filter_div.querySelector(`#f3_select`);
let f3_input = filter_div.querySelector(`#f3_input`);

//! tax_rate
let f4_div = filter_div.querySelector(`#f4_div`);
let f4_checkbox = filter_div.querySelector(`#f4_checkbox`);
let f4_selectAndInput_div = filter_div.querySelector(`#f4_selectAndInput_div`);
let f4_select = filter_div.querySelector(`#f4_select`);
let f4_input = filter_div.querySelector(`#f4_input`);


//! is_tax_reverse
let f5_div = filter_div.querySelector(`#f5_div`);
let f5_checkbox = filter_div.querySelector(`#f5_checkbox`);
let f5_selectAndInput_div = filter_div.querySelector(`#f5_selectAndInput_div`);
let f5_select = filter_div.querySelector(`#f5_select`); f5_select.value = 0
let f5_input = filter_div.querySelector(`#f5_input`);


//! account_name
let f6_div = filter_div.querySelector(`#f6_div`);
let f6_checkbox = filter_div.querySelector(`#f6_checkbox`);
let f6_selectAndInput_div = filter_div.querySelector(`#f6_selectAndInput_div`);
let f6_select = filter_div.querySelector(`#f6_select`);
let f6_input = filter_div.querySelector(`#f6_input`);

//! active
let f7_div = filter_div.querySelector(`#f7_div`);
let f7_checkbox = filter_div.querySelector(`#f7_checkbox`);
let f7_selectAndInput_div = filter_div.querySelector(`#f7_selectAndInput_div`);
let f7_select = filter_div.querySelector(`#f7_select`); f7_select.value = 0
let f7_input = filter_div.querySelector(`#f7_input`);



const btn_do = filter_div.querySelector(`#btn_do`);

const indices = [1]; // ضع هنا الأرقام التي تريد تضمينها
function backUp_filter_div_conditions() {
    
    const conditions = {};

    indices.forEach(index => {
        // بناء الأسماء تلقائيًا باستخدام template literals
        conditions[`f${index}_div_display`] = window.getComputedStyle(window[`f${index}_div`]).display;
        conditions[`f${index}_input_display`] = window.getComputedStyle(window[`f${index}_input`]).display;
        conditions[`f${index}_selectAndInput_div_isHidden`] = window[`f${index}_selectAndInput_div`].classList.contains('hidden_select_and_input_div');
        conditions[`f${index}_checkbox`] = window[`f${index}_checkbox`].checked;
        conditions[`f${index}_select`] = window[`f${index}_select`].value;
        conditions[`f${index}_input`] = window[`f${index}_input`].value;
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
    const conditionsArray = JSON.parse(sessionStorage.getItem('settings_taxes_ViewArray')) || [];

    // إضافة الكائن الجديد إلى المصفوفة
    conditionsArray.push(conditions);

    // حفظ المصفوفة المحدثة في sessionStorage
    sessionStorage.setItem('settings_taxes_ViewArray', JSON.stringify(conditionsArray));
}

back_href.onclick = async function (event) {
    event.preventDefault();
   

    const array = JSON.parse(sessionStorage.getItem(`settings_taxes_ViewArray`)) || [];

    if (!array || array.length <= 1) {
    
   
            window.location.href = `general_settings_ar`;
       
    }else{

        restore_filter_div_conditions(2)
        await getData_fn();

    }
};

function restore_filter_div_conditions(NUM_ektp_rakm_el_restore_elyEnta3ayzTerg3oMnel2a5er_maslan_1_ya3nyLastRestore) {
    let conditions;

    // استرجاع المصفوفة المحفوظة من sessionStorage
    let conditionsArray = JSON.parse(sessionStorage.getItem("settings_taxes_ViewArray")) || [];
    

    // التحقق إذا كانت المصفوفة تحتوي على عناصر
    if (conditionsArray.length > 0) {
        // استرجاع العنصر المطلوب بناءً على الرقم المحدد
        conditions = conditionsArray[conditionsArray.length - NUM_ektp_rakm_el_restore_elyEnta3ayzTerg3oMnel2a5er_maslan_1_ya3nyLastRestore];

        // حذف العناصر من المصفوفة بناءً على الرقم المحدد
        if (NUM_ektp_rakm_el_restore_elyEnta3ayzTerg3oMnel2a5er_maslan_1_ya3nyLastRestore > 1) {
            conditionsArray.splice(-NUM_ektp_rakm_el_restore_elyEnta3ayzTerg3oMnel2a5er_maslan_1_ya3nyLastRestore + 1);
            sessionStorage.setItem("settings_taxes_ViewArray", JSON.stringify(conditionsArray));
        }
    } else {
        return;
    }

    if (conditions) {

        // استرجاع الحالات ديناميكيًا بناءً على الأرقام في المصفوفة
        indices.forEach(index => {
            window[`f${index}_div`].style.display = conditions[`f${index}_div_display`];
            window[`f${index}_input`].style.display = conditions[`f${index}_input_display`];
            window[`f${index}_checkbox`].checked = conditions[`f${index}_checkbox`];
            if (conditions[`f${index}_selectAndInput_div_isHidden`]) {
                window[`f${index}_selectAndInput_div`].classList.add('hidden_select_and_input_div');
            } else {
                window[`f${index}_selectAndInput_div`].classList.remove('hidden_select_and_input_div');
            }
            window[`f${index}_select`].value = conditions[`f${index}_select`];
            window[`f${index}_input`].value = conditions[`f${index}_input`];
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
    call_default_checkbox('f2',true,true,0)
    call_default_checkbox('f3',true,false,0)
    call_default_checkbox('f4',true,true,0)
    call_default_checkbox('f5',true,true,0)
    call_default_checkbox('f6',true,false,0)
    call_default_checkbox('f7',true,true,0)

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


let data = [];
let array1 = [];
let slice_array1 = [];
let filteredData_Array = [];

async function getData_fn() {
    try {

        data = await new_fetchData_postAndGet(
            '/get_settings_taxes_Data',
            {},
            'pass','pass',
            15,
            false,"",
            true,
            true,content_space,
            false,false,false,
            false,false,
            false,false,
            "حدث خطأ اثناء معالجه البيانات"
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
        let style_tax_reference = `display:${f1_checkbox.checked ? "table-cell" : "none"}; width: auto; white-space: nowrap; text-align: start;`;
        let style_tax_name = `display:${f2_checkbox.checked ? "table-cell" : "none"} ; width: 100%; white-space: nowrap; text-align: start;`;
        let style_tax_short_name = `display:${f3_checkbox.checked ? "table-cell" : "none"} ; width: ${f2_checkbox.checked ? 'auto' : '100%'}; white-space: nowrap; text-align: start;`;
        let style_tax_rate = `display:${f4_checkbox.checked ? "table-cell" : "none"} ; width: auto; white-space: nowrap; text-align: start;`;
        let style_is_tax_reverse = `display:${f5_checkbox.checked ? 'table-cell' : 'none'};  width: auto; white-space: nowrap; text-align: center;`
        let style_tax_account_id = `display: none;`;
        let style_account_name = `display:${f6_checkbox.checked ? "table-cell" : "none"} ; width: auto; white-space: nowrap; text-align: start;`;
        let style_is_inactive = `display:${f7_checkbox.checked ? 'table-cell' : 'none'};  width: auto; white-space: nowrap; text-align: center;`



        // إعداد رأس الجدول
        // هنا بناء الجدول بدون صف الأزرار
        let tableHTML = `<table id="review_table" class="review_table">
                        <thead>
                            <tr>
                                <th style="${style_button}"></th>
                                <th style="${style_id}">ID</th>
                                <th style="${style_tax_reference}">#</th>
                                <th style="${style_tax_name}">اسم الضريبة</th>
                                <th style="${style_tax_short_name}">الاسم المختصر</th>
                                <th style="${style_tax_rate}">المعدل</th>
                                <th style="${style_is_tax_reverse}">النوع</th>
                                <th style="${style_tax_account_id}">accId</th>
                                <th style="${style_account_name}">الحساب</th>
                                <th style="${style_is_inactive}">الحالة</th>
                            </tr>
                        </thead>
                        <tbody>`;

        slice_array1.forEach((row) => {
                
            let activeClass = row.is_inactive == 'غير نشط' ? 'table_red_condition' : 'table_green_condition';

            tableHTML +=
                     `<tr>
                        <td style="${style_button}"><button class="table_update_btn" onclick="table_update_btn_fn(this)">تحرير</button></td>
                        <td style="${style_id}">${row.id}</td>
                        <td style="${style_tax_reference}">${row.tax_reference ? row.tax_reference : ''}</td>
                        <td style="${style_tax_name}">${row.tax_name}</td>
                        <td style="${style_tax_short_name}">${row.tax_short_name ? row.tax_short_name : ''}</td>
                        <td style="${style_tax_rate}">${row.tax_rate}%</td>
                        <td style="${style_is_tax_reverse}">${row.is_tax_reverse}</td>
                        <td style="${style_tax_account_id}">${row.tax_account_id}</td>
                        <td style="${style_account_name}">${row.account_name}</td>
                        <td style="${style_is_inactive}"><span class="${activeClass}">${row.is_inactive}</span></td>
                      </tr>`;
        });

        tableHTML += `
                    <tr class="table_totals_row">
                        <td id="footer_style_button" style="${style_button}"></td>
                        <td id="footer_style_id" style="${style_id}"></td>
                        <td id="footer_style_tax_reference" style="${style_tax_reference}"></td>
                        <td id="footer_style_tax_name" style="${style_tax_name}"></td>
                        <td id="footer_style_tax_short_name" style="${style_tax_short_name}"></td>
                        <td id="footer_style_style_tax_rate" style="${style_tax_rate}"></td>
                        <td id="footer_style_style_is_tax_reverse" style="${style_is_tax_reverse}"></td>
                        <td id="footer_style_style_tax_account_id" style="${style_tax_account_id}"></td>
                        <td id="footer_style_style_account_name" style="${style_account_name}"></td>
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

            
            const f1_match = filterData_string_column_with_showAndHiddenCheckbox(f1_checkbox,f1_select,f1_input,"tax_reference",row);
            const f2_match = filterData_string_column_with_showAndHiddenCheckbox(f2_checkbox,f2_select,f2_input,"tax_name",row);
            const f3_match = filterData_string_column_with_showAndHiddenCheckbox(f3_checkbox,f3_select,f3_input,"tax_short_name",row);
            const f4_match = filterData_number_column_with_showAndHiddenCheckbox(f4_checkbox,f4_select,f4_input,"tax_rate",row);
            const f5_match = filterData_string_column_with_showAndHiddenCheckbox_with_only_select(f5_checkbox,f5_select,"is_tax_reverse",row);
            const f6_match = filterData_string_column_with_showAndHiddenCheckbox(f6_checkbox,f6_select,f6_input,"account_name",row);
            const f7_match = filterData_string_column_with_showAndHiddenCheckbox_with_only_select(f7_checkbox,f7_select, "is_inactive",row);


            return (
                f1_match &&
                f2_match &&
                f3_match &&
                f4_match &&
                f5_match &&
                f6_match &&
                f7_match
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
            const f1Match = performSearch_Row(f1_checkbox,"tax_reference",searchValue,row);
            const f2Match = performSearch_Row(f2_checkbox,"tax_name",searchValue,row);
            const f3Match = performSearch_Row(f3_checkbox,"tax_short_name",searchValue,row);
            const f4Match = performSearch_Row(f4_checkbox,"tax_rate",searchValue,row);
            const f5Match = performSearch_Row(f5_checkbox,"is_tax_reverse",searchValue,row);
            const f6Match = performSearch_Row(f6_checkbox,"account_name",searchValue,row);
            const f7Match = performSearch_Row(f7_checkbox,"is_inactive",searchValue,row);


            // استخدام || بدلاً من && لضمان أن البحث يتم في كلا الحقلين
            return (
                f1Match ||
                f2Match ||
                f3Match ||
                f4Match ||
                f5Match ||
                f6Match ||
                f7Match
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
    const permission = await btn_permission('customers_permission','update');

    if (!permission){ // if false
        return;
    };

    backUp_filter_div_conditions() // ضرورى لانه هيرجع مرتين لازم اخد باك اب هنا
    const row  = updateBtn.closest("tr")
    
    const obj_customers_view = {
    x: row.cells[1].textContent,
    account_no_input: row.cells[2].textContent,
    account_name_input: row.cells[3].textContent,
    credit_limit: row.cells[4].textContent,
    email_input: row.cells[5].textContent,
    tasgel_darepy_input: row.cells[6].textContent,
    legal_info_input: row.cells[7].textContent,
    contact_info_input: row.cells[8].textContent,
    delivery_adress_input:  row.cells[9].textContent,
    banking_info_input: row.cells[10].textContent
}

    sessionStorage.setItem('obj_customers_view', JSON.stringify(obj_customers_view));                            
    window.location.href = `customers_update_ar`;
} catch (error) {
    catch_error(error)
}
};



function CheckUrlParams_customers_update_ar() {
    try {
        const urlData = getURLData(
            "data",
            "transaction_view_ar",
            "رابط غير صالح : سيتم اعادة توجيهك الى صفحة القيود اليومية"
        );

        
        if (!urlData || urlData.pageName !== "customers_update_ar") {
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

    
    const result2 = CheckUrlParams_customers_update_ar();
    if (!result2) {
        return;
    }

    await getData_fn();
    const conditionsArray = sessionStorage.getItem(`settings_taxes_ViewArray`);

    if (!conditionsArray){
     
        backUp_filter_div_conditions();
    }

});

window.addEventListener("beforeprint", function () {
    beforeprint_reviewTable("review_table", 0, 1); // هذا سيخفي العمود الأول والثاني
});

/*--------------------------------------------------------------------------------*/
