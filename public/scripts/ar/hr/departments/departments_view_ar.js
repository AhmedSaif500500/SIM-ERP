
setActiveSidebar('hr_ar');
pagePermission('departments_permission','view');



const tableContainer = document.querySelector(`#tableContainer`);
const searchBtn = document.querySelector(`#searchBtn`);
const searchInput = document.querySelector(`#searchInput`);


let checkbox_account_no = filter_div.querySelector(`#checkbox_account_no`) ; let select_account_no = filter_div.querySelector(`#select_account_no`); let input_account_no = filter_div.querySelector(`#input_account_no`);
let select_account_name = filter_div.querySelector(`#select_account_name`) ; let input_account_name = filter_div.querySelector(`#input_account_name`);
let checkbox_another_info = filter_div.querySelector(`#checkbox_another_info`) ; let select_another_info = filter_div.querySelector(`#select_another_info`); let input_another_info = filter_div.querySelector(`#input_another_info`);
let check_balance = filter_div.querySelector(`#check_balance`) ; let select_balance = filter_div.querySelector(`#select_balance`); let input_balance = filter_div.querySelector(`#input_balance`);

const btn_do = filter_div.querySelector(`#btn_do`)




filter_icon.onclick = () =>{
    try {
        show_filter_div()
    } catch (error) {
        catch_error
    }
}



filter_icon_cancel.onclick = async () =>{
    try {
        checkbox_account_no.checked = false;
        checkbox_another_info.checked = false;
        check_balance.checked = true;

        hidden_filter_div()
        searchInput.value = ''

        select_active.value = 0
        showFirst50RowAtTheBegening()
    } catch (error) {
        catch_error
    }
}



let data = [];
let array1 = [];
let slice_array1 = [];
let filteredData_Array = [];


async function getData_fn() {
    try {
    data = await fetchData_postAndGet(
        'get_All_human_resources_department_Data',
        {},
        'departments_permission','view',
        15,
        false,'',
        false,
        true,content_space,
        false,'',
        'حدث خطأ اثناء معالجة البيانات'
    )


    showFirst50RowAtTheBegening()
} catch (error) {
    catch_error(error)
}
}

async function Execution(){
    try {
        showLoadingIcon(btn_do)
        searchInput.value = ""
        await showFirst50RowAtTheBegening()
        hideLoadingIcon(btn_do) 
    } catch (error) {
        hideLoadingIcon(btn_do) 
        catch_error(error)
    }
}


const inside_input_search_array = filter_div.querySelectorAll(`[name="inside_input_search"]`);

for (const input of inside_input_search_array) {
    try {
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                Execution();
            }
        });
    } catch (error) {
        catch_error(error)
    }

}


btn_do.onclick = async () => {
    Execution()
}



async function showFirst50RowAtTheBegening() {

    try {
    page_content.style.display = 'none';

    filteredData_Array = data.filter(row => {
        const isAccountNofoMatch = filterData_string_column_with_showAndHiddenCheckbox(checkbox_account_no, select_account_no, input_account_no,'acc_no',row);
        const isNameMatch = filterData_string_column_without_showAndHiddenCheckbox(select_account_name,input_account_name,'department_name',row);
        const isAnotherInfoMatch = filterData_string_column_with_showAndHiddenCheckbox(checkbox_another_info,select_another_info,input_another_info,'legal_info',row);
        const isBalanceMatch = filterData_number_column_with_showAndHiddenCheckbox(check_balance, select_balance, input_balance, 'employees_count', row);
      
        return isAccountNofoMatch && isNameMatch && isAnotherInfoMatch && isBalanceMatch; // && otherCondition;
    });

    array1 = filteredData_Array.slice();

   

    slice_array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    
    await fillTable()
} catch (error) {
    catch_error
}
}


async function fillTable() {
    try {
    //  @@ هاااااام جدا 
    // el properties beta3 kol 3amod ytm wad3ha fe el <thead></thead> And <tbody></tbody> And <tfoor></tfoor> kol wa7ed lewa7do
    // el properties hya :
    // 1 : display: none; > fe 7alt enak ardt e5fa2 el 3amod -- display: ; hatspha fadya fe7alt enak ardt tezhr el 3amod
    // 2 : white-space: nowrap;  fe 7alt enak ardt en el text maylfsh ta7t ba3do  -- white-space: wrap; fe 7alt enak ardt en el tezt ylf
    // 3 : width: auto;  fe 7alt enak ardt en ykon 3ard el 3amod 3ala ad el mo7tawa -- width: 100%; fe 7alt enak ardt en el 3amod ya5od ba2y el mesa7a el fadla
    // 4 : text-align: center / left / right / justify   da 3ashan tet7km fe el text ymen wala shemal wala fe ele nos
   

    page_content.style.display = 'none';
    showLoadingIcon(content_space)

    let style_button = `width: auto; white-space: nowrap; text-align: center`
    let style_id = `display: none;`
    let style_account_no = `display:${checkbox_account_no.checked ? 'table-cell' : 'none'};  width: auto; white-space: nowrap; text-align: start`
    let style_name = `width: ${checkbox_another_info.checked ? 'auto' : '100%'}; white-space: nowrap; text-align: start`
    let style_another_info = `display:${checkbox_another_info.checked ? 'table-cell' : 'none'}; width: 100%; min-width: 2rem; white-space: wrap; text-align: start;`
    let style_balance = `display:${check_balance.checked ? 'table-cell' : 'none'}; width: auto; white-space: nowrap; text-align: start`


    total_column1.value = 0

        // إعداد رأس الجدول
        let tableHTML = `<table id="review_table" class="review_table">
                        <thead>
                            <tr>
                                <th style="${style_button}"></th>
                                <th style="${style_id}">ID</th>
                                <th style="${style_account_no}">المعرف</th>
                                <th style="${style_name}">القسم</th>
                                <th style="${style_another_info}">معلومات اخرى</th>
                                <th style="${style_balance}">الموظفين</th>
                            </tr>
                            </thead>
                            <tbody>`;

        // إضافة صفوف الجدول بناءً على البيانات
        // slice_array1 = ""; // تفريغ المصفوفه
        
        slice_array1.forEach(row => {
            tableHTML += `<tr>
                            <td style="${style_button}"> <button class="tabble_update_btn" onclick="tabble_update_btn_fn(this)">تحرير</button> </td>
                            <td style="${style_id}">${row.id}</td>
                            <td style="${style_account_no}">${row.acc_no}</td>
                            <td style="${style_name}">${row.department_name}</td>
                            <td style="${style_another_info}">${row.legal_info}</td>
                            ${tdNumber(true,false,true,row.employees_count,style_balance,total_column1,`onclick = "tabble_info_btn_fn(this)"`)}
                          </tr>`;
        });

        tableHTML += `</tbody>
        <tfoot>
            <tr class="table_totals_row";>
                <td id="tfooter0" style="${style_button}"></td>
                <td id="tfooter1" style="${style_id}"></td>
                <td id="tfooter2" style="${style_account_no}"></td>
                <td id="tfooter3" style="${style_name}"></td>
                <td id="tfooter4" style="${style_another_info}"></td>
                <td id="tfooter5" style="${style_balance}"></td>
            </tr>
        </tfoot>
    </table>`;

// هنا إضافة صف الأزرار بعد إغلاق الجدول
tableHTML += `<div id="table_fotter_buttons_row" class="table_fotter_buttons_row_div">
                <div id="table_footer_showRows_div" class='flex_H'>
                    <button class="table_footer_show_data" id="" onclick="ShowAllDataIneffectsTable()">الكل</button>
                    <button class="table_footer_show_data" id="" onclick="showFirst50RowIneffectsTable()">50</button>
                </div>    
                <div id="table_footer_showRows_div" class='flex_H'>
                    <button class="table_footer_show_data" id="copy" onclick="copyTableToClipboard(this,'review_table')">نسخ الى الحافظة</button>
                </div>
             </div>`;


        // تحديث محتوى الصفحة بناءً على البيانات
        tableContainer.innerHTML = await tableHTML;
        setupColumnSorting('review_table');
        hideLoadingIcon(content_space)
        page_content.style.display = 'flex';
          //  عمليات صف الاجمالى 
          // جمع القيم في العمود رقم 6



tableContainer.querySelector(`#tfooter0`).textContent = slice_array1.length; //  عدد الصفوف
tableContainer.querySelector(`#tfooter5`).textContent = floatToString(false,total_column1.value);

if (array1.length > 0 && array1.length <= 50) {
    document.querySelector('#table_footer_showRows_div').style.display = "none";
}

} catch (error) {
    hideLoadingIcon(content_space)
    catch_error(error)
}
};

async function performSearch() {
    try {
    // الحصول على قيمة البحث
    const searchValue = searchInput.value.trim().toLowerCase();

    // فلترة البيانات بناءً على قيمة البحث
    array1 = filteredData_Array.filter(row => {
        const accNoMatch = performSearch_Row(checkbox_account_no, 'acc_no', searchValue, row);
        const nameMatch = performSearch_Row('', 'department_name', searchValue, row);
        const anotherInfoMatch = performSearch_Row(checkbox_another_info, 'legal_info', searchValue, row);
        const balanceMatch = performSearch_Row(check_balance, 'employees_count', searchValue, row);
        

        // استخدام || بدلاً من && لضمان أن البحث يتم في كلا الحقلين
        return accNoMatch || nameMatch || anotherInfoMatch || balanceMatch;
    });

    slice_array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    fillTable();
} catch (error) {
    catch_error
}
}

async function ShowAllDataInTable(){
    showAlert('info', 'ان ظهار كامل البيانات فى القائمة المنسدله لا يؤثر على عمليه البحث فى البيانات')
    slice_array1 = array1.slice(); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    fillTable()
}

async function showFirst50RowInTable(){
    slice_array1 = array1.slice(0,50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    fillTable()
}


// عند الضغط على زر البحث
searchBtn.addEventListener('click',  performSearch);

// حدث عن الضغط على زر المسح الخاص ب الانبوت سيرش الى بيظهر لما بنكتب بيانات
searchInput.addEventListener('search', function () {
    performSearch();
});

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        performSearch();
    };
});



async function tabble_update_btn_fn(updateBtn) {
    const permission = await btn_permission('departments_permission','update');

    if (!permission){ // if false
        return;
    };

    const row  = updateBtn.closest("tr")
    
    const department_data = {
        id : row.cells[1].textContent,
        department_name : row.cells[3].textContent,
        legal_info : row.cells[4].textContent,
    }
  
    const encodedData = encodeURIComponent(JSON.stringify(department_data));
        
    // نقل البيانات عبر الـ URL
    window.location.href = `departments_update_ar?data=${encodedData}`;

    // sessionStorage.setItem('department_data',JSON.stringify(department_data))
    // window.location.href = 'departments_update_ar';
};

document.addEventListener('DOMContentLoaded', async function() {
    showRedirectionReason();
    await getData_fn()
  });


  async function tabble_info_btn_fn(details_btn) {
try {
    
    const row  = details_btn.closest("tr")
    
    const department_data = {
        pageName : 'department_view_ar',
        x : row.cells[1].textContent,
        n : row.cells[3].textContent,
    }
  
    const encodedData = encodeURIComponent(JSON.stringify(department_data));
        
    // نقل البيانات عبر الـ URL
    window.location.href = `employees_view_ar?data=${encodedData}`;
} catch (error) {
    catch_error(error)
}
};


window.addEventListener('beforeprint', function() {
    beforeprint_reviewTable('review_table', 0); // هذا سيخفي العمود الأول والثاني
});
