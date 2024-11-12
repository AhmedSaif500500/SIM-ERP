setActiveSidebar("itemsMain_view_ar");
pagePermission("view", "itemsLocations_permission");

const h2_text_div = document.querySelector(`#h2_text_div`);
const sub_h2_header = document.querySelector(`#sub_h2_header`);
let is_filter = false;
const back_href = document.querySelector(`#back_href`);


let is_recieved_params_from_itemsLocations_update = false;

const tableContainer = document.querySelector("#tableContainer");
const searchBtn = document.querySelector("#searchBtn");
const searchInput = document.querySelector("#searchInput");

//! account name
let f1_div = filter_div.querySelector(`#f1_div`);
let f1_checkbox = filter_div.querySelector(`#f1_checkbox`);
let f1_selectAndInput_div = filter_div.querySelector(`#f1_selectAndInput_div`);
let f1_select = filter_div.querySelector(`#f1_select`);
let f1_input = filter_div.querySelector(`#f1_input`);


const btn_do = filter_div.querySelector(`#btn_do`);

function backUp_filter_div_conditions() {
    const indices = [1]; // ضع هنا الأرقام التي تريد تضمينها
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
    const conditionsArray = JSON.parse(sessionStorage.getItem('itemsLocationsViewArray')) || [];

    // إضافة الكائن الجديد إلى المصفوفة
    conditionsArray.push(conditions);

    // حفظ المصفوفة المحدثة في sessionStorage
    sessionStorage.setItem('itemsLocationsViewArray', JSON.stringify(conditionsArray));
}

back_href.onclick = async function (event) {
    event.preventDefault();
   

    const array = JSON.parse(sessionStorage.getItem(`itemsLocationsViewArray`)) || [];

    if (!array || array.length <= 1) {
    
   
            window.location.href = `notes_ar`;
       
    }else{

        restore_filter_div_conditions(2)
        await getData_fn();

    }
};

function restore_filter_div_conditions(NUM_ektp_rakm_el_restore_elyEnta3ayzTerg3oMnel2a5er_maslan_1_ya3nyLastRestore) {
    let conditions;

    // استرجاع المصفوفة المحفوظة من sessionStorage
    let conditionsArray = JSON.parse(sessionStorage.getItem("itemsLocationsViewArray")) || [];
    

    // التحقق إذا كانت المصفوفة تحتوي على عناصر
    if (conditionsArray.length > 0) {
        // استرجاع العنصر المطلوب بناءً على الرقم المحدد
        conditions = conditionsArray[conditionsArray.length - NUM_ektp_rakm_el_restore_elyEnta3ayzTerg3oMnel2a5er_maslan_1_ya3nyLastRestore];

        // حذف العناصر من المصفوفة بناءً على الرقم المحدد
        if (NUM_ektp_rakm_el_restore_elyEnta3ayzTerg3oMnel2a5er_maslan_1_ya3nyLastRestore > 1) {
            conditionsArray.splice(-NUM_ektp_rakm_el_restore_elyEnta3ayzTerg3oMnel2a5er_maslan_1_ya3nyLastRestore + 1);
            sessionStorage.setItem("itemsLocationsViewArray", JSON.stringify(conditionsArray));
        }
    } else {
        return;
    }

    if (conditions) {
        const indices = [1]; // الأرقام التي تريد استرجاعها

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
    call_default_checkbox('f1',true,true)
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
            sessionStorage.removeItem('itemsLocationsViewArray');
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
            '/itemsLocations_view',
            {},
            'itemsLocations_permission','view',
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

        let style_button = `width: auto; white-space: nowrap; text-align: center;`;
        let style_id = `display: none;`;
        let location_name = `display: table-cell; width: 100%; white-space: nowrap; text-align: start;`;

        // إعداد رأس الجدول
        // هنا بناء الجدول بدون صف الأزرار
        let tableHTML = `<table id="review_table" class="review_table">
                        <thead>
                            <tr>
                                <th style="${style_button}"></th>
                                <th style="${style_id}"></th>
                                <th style="${location_name}">الموقع</th>
                            </tr>
                        </thead>
                        <tbody>`;

        slice_array1.forEach((row) => {
                

            tableHTML +=
                     `<tr>
                        <td style="${style_button}"><button class="table_update_btn" onclick="table_update_btn_fn(this)">تحرير</button></td>
                        <td style="${style_id}">${row.id}</td>
                        <td style="${location_name}">${row.account_name}</td>                       
                      </tr>`;
        });

        tableHTML += `
                    <tr class="table_totals_row">
                        <td id="footer_style_button" style="${style_button}"></td>
                        <td id="footer_style_id" style="${style_id}"></td>
                        <td id="footer_style_location_name" style="${location_name}"></td>
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

            const f1_match = filterData_string_column_with_showAndHiddenCheckbox(f1_checkbox,f1_select,f1_input,"account_name",row);


            return (
                f1_match 
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
            const f1Match = performSearch_Row(f1_checkbox,"account_name",searchValue,row);


            // استخدام || بدلاً من && لضمان أن البحث يتم في كلا الحقلين
            return (
                f1Match
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
    const permission = await btn_permission('itemsLocations_permission','update');

    if (!permission){ // if false
        return;
    };

    backUp_filter_div_conditions() // ضرورى لانه هيرجع مرتين لازم اخد باك اب هنا
    const row  = updateBtn.closest("tr")
    
    const obj_itemsLocations_view = {
    x: row.cells[1].textContent,
    account_name_input: row.cells[2].textContent,
}

    sessionStorage.setItem('obj_itemsLocations_view', JSON.stringify(obj_itemsLocations_view));                            
    window.location.href = `itemsLocations_update_ar`;
} catch (error) {
    catch_error(error)
}
};



function CheckUrlParams_itemsLocations_update_ar() {
    try {
        const urlData = getURLData(
            "data",
            "itemsLocations_view_ar",
            "رابط غير صالح : سيتم اعادة توجيهك الى صفحة مواقع المخزون"
        );

        
        if (!urlData || urlData.pageName !== "itemsLocations_update_ar") {
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

    
    const result2 = CheckUrlParams_itemsLocations_update_ar();
    if (!result2) {
        return;
    }

    await getData_fn();
    const conditionsArray = sessionStorage.getItem(`itemsLocationsViewArray`);

    if (!conditionsArray){
     
        backUp_filter_div_conditions();
    }

});

window.addEventListener("beforeprint", function () {
    beforeprint_reviewTable("review_table", 0, 1); // هذا سيخفي العمود الأول والثاني
});

/*--------------------------------------------------------------------------------*/
