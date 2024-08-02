
setActiveSidebar('cutomers_view_ar');
//check permissions
pagePermission('cutomers_permission','view');


const btn_new = document.querySelector(`#btn_new`);
const table_div = document.querySelector(`#table_div`);
const new_cutomer_div = document.querySelector(`#new_cutomer_div`);
const back_icon_to_home = document.querySelector(`#back_icon_to_home`);
const back_icon_to_table_view = document.querySelector(`#back_icon_to_table_view`);
const page_adress_h2 = document.querySelector(`#page_adress_h2`);
const save_btn = document.querySelector(`#save_btn`);
const update_btn = document.querySelector(`#update_btn`);
const btn_cancel = document.querySelector(`#btn_cancel`);
const account_no_input = document.querySelector(`#account_no_input`);
const account_name_input = document.querySelector(`#account_name_input`);
const credit_limit = document.querySelector(`#credit_limit`);
const email_input = document.querySelector(`#email_input`);
const tasgel_darepy_input = document.querySelector(`#tasgel_darepy_input`);
const legal_info_input = document.querySelector(`#legal_info_input`);
const contact_info_input = document.querySelector(`#contact_info_input`);
const banking_info_input = document.querySelector(`#banking_info_input`);
const delivery_adress_input = document.querySelector(`#delivery_adress_input`);


// إعلان المتغير على مستوى الـ script  
const tableContainer = document.getElementById('table-container');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');



//#region  ( baynat el cutomers mn el database )
// get data from db and store it in array1
let data = [];
let array1 = [];
let slice_Array1 = [];


async function getcutomersData_fn() {
    const response = await fetch('/get_All_customers_Data');
     data = await response.json();

    // تحديث array1 بنتيجة الـ slice
    array1 = data.slice();
    
}

async function showFirst50RowAtTheBegening() {
    await getcutomersData_fn()
    slice_Array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    fillAttendancetable()
}

document.addEventListener("DOMContentLoaded", function () {
    // استدعاء الدالة عندما تكتمل تحميل الصفحة
    showFirst50RowAtTheBegening();
});

async function fillAttendancetable() {
    //  @@ هاااااام جدا 
    // el properties beta3 kol 3amod ytm wad3ha fe el <thead></thead> And <tbody></tbody> And <tfoor></tfoor> kol wa7ed lewa7do
    // el properties hya :
    // 1 : display: none; > fe 7alt enak ardt e5fa2 el 3amod -- display: ; hatspha fadya fe7alt enak ardt tezhr el 3amod
    // 2 : white-space: nowrap;  fe 7alt enak ardt en el text maylfsh ta7t ba3do  -- white-space: wrap; fe 7alt enak ardt en el tezt ylf
    // 3 : width: auto;  fe 7alt enak ardt en ykon 3ard el 3amod 3ala ad el mo7tawa -- width: 100%; fe 7alt enak ardt en el 3amod ya5od ba2y el mesa7a el fadla
    // 4 : text-align: center / left / right / justify   da 3ashan tet7km fe el text ymen wala shemal wala fe ele nos
    
        // إعداد رأس الجدول
        let tableHTML = `<table id="cutomers_table" class="review_table">
                        <thead>
                            <tr>
                                <th></th>
                                <th style="display: none" >ID</th>
                                <th>الاسم</th>
                            </tr>
                            </thead>
                            <tbody>`;

        // إضافة صفوف الجدول بناءً على البيانات
        // slice_Array1 = ""; // تفريغ المصفوفه
        slice_Array1.forEach(row => {
            tableHTML += `<tr>
                            <td> <button class="tabble_update_btn" onclick="tabble_update_btn_fn(this)">تحرير</button> </td>
                            <td style="display: none">${row.id}</td>
                            <td style="width: 100%;">${row.account_name}</td>
                          </tr>`;
        });

        tableHTML += `</tbody>
        <tfoot>
            <tr class="table_totals_row";>
            <td id="tfooter1" ></td>
            <td id="tfooter2" style="display: none" ></td>
            <td id="tfooter3"></td>
            </tr>
                        <tr id="table_fotter_buttons_row">
                            <td colspan="3">   <!-- da awel 3amod fe ele sad tr han7othan5elh han3mel merge lkol el columns fe column wa7ed 3ashan n7ot el 2 buttons hat3mel colspan le3add el 3awamed kolaha -->
                                <div class='flex_H'>
                                 <button class="table_footer_btn"  id="" onclick="ShowAllDataInAttendanceTable()">All</button>
                                 <button class="table_footer_btn"  id="" onclick="showFirst50RowInAttendanceTable()">50</button>
                                </div>
                            </td>
                        </tr>
                    </tfoot>`;

        // إغلاق الجدول
        tableHTML += '</table>';

        // تحديث محتوى الصفحة بناءً على البيانات
        tableContainer.innerHTML = tableHTML;
          //  عمليات صف الاجمالى 
          // جمع القيم في العمود رقم 6
          

// document.getElementById("tFooter6").textContent = totalColumn_Valuu;
document.getElementById("tfooter1").textContent = slice_Array1.length; //  عدد الصفوف

if (array1.length > 0 && array1.length <= 50) {
    document.querySelector('#table_fotter_buttons_row').style.display = "none";
} else if (array1.length < 1) {
    document.querySelector('#table_fotter_buttons_row').innerHTML = `<td colspan='3' class="td_no_result">لا نتائج</td>`;
};


};


// search in attendanceTable
async function performSearch() {
    // الحصول على قيمة البحث
    const searchValue = searchInput.value.trim().toLowerCase();

    // فلترة البيانات بناءً على قيمة البحث
    array1 = data.filter(employee => {
        // التحقق من أن employee.id و employee.name ليستان فارغتين
        const idMatch = employee.id && employee.id.toString().toLowerCase().includes(searchValue);
        const nameMatch = employee.name && employee.name.toString().toLowerCase().includes(searchValue);
        return idMatch || nameMatch;
    });

    slice_Array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    fillAttendancetable()
}

async function ShowAllDataInAttendanceTable(){
    showAlert('info', 'ان ظهار كامل البيانات فى القائمة المنسدله لا يؤثر على عمليه البحث فى البيانات')
    slice_Array1 = array1.slice(); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    fillAttendancetable()
}

async function showFirst50RowInAttendanceTable(){
    slice_Array1 = array1.slice(0,50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    fillAttendancetable()
}


// عند الضغط على زر البحث
searchBtn.addEventListener('click',  performSearch);

// حدث عن الضغط على زر المسح الخاص ب الانبوت سيرش الى بيظهر لما بنكتب بيانات
searchInput.addEventListener('search', function () {
    performSearch();
});

// عند الضغط على زرار انتر وانت واقف فى مربع البحث
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        performSearch();
    };
});


btn_new.onclick = function (){
    page_adress_h2.textContent = 'عميل جديد'
    update_btn.style.display = 'none'
    btn_cancel.style.display = 'none'
    table_div.style.display = 'none'
    new_cutomer_div.style.display = 'flex'
    back_icon_to_table_view.style.display = 'flex'
    back_icon_to_home.style.display = 'none'
}

back_icon_to_table_view.onclick = function (){
    page_adress_h2.textContent = 'العملاء'
    table_div.style.display = 'flex'
    new_cutomer_div.style.display = 'none'
    back_icon_to_table_view.style.display = 'none'
    back_icon_to_home.style.display = 'flex'
}

async function tabble_update_btn_fn(updateBtn) {
    // const permission = await btn_permission('cutomers_permission','update');

    // if (!permission){ // if false
    //     return;
    // };
    // عثر على الموظف باستخدام معرف الموظف

    const row  = updateBtn.closest("tr")

    const cutomers_data = {
        employee_id : row.cells[1].textContent
    }
  
    sessionStorage.setItem('cutomers_data',JSON.stringify(cutomers_data))
    window.location.href = 'update_employee_ar';
};




//#region 
save_btn.onclick = async function (){
try {



    const acc_no_div_value = account_no_input.value.trim();
    const account_name_input_value = account_name_input.value.trim();
    const credit_limit_value = credit_limit.value.trim();
    const email_input_value = email_input.value.trim();
    const tasgel_darepy_input_value = tasgel_darepy_input.value.trim();
    const legal_info_input_value = legal_info_input.value.trim();
    const contact_info_input_value = contact_info_input.value.trim();
    const banking_info_input_value = banking_info_input.value.trim();
    const delivery_adress_input_value = delivery_adress_input.value.trim();


    if (!account_name_input_value) {
        showAlert('warning','برجاء ادخال اسم العميل');
        return
    }

    const post =  await fetchData_postAndGet(
        "/addNewCustomer",
        {acc_no_div_value,
            account_name_input_value,
            credit_limit_value,
            email_input_value,
            tasgel_darepy_input_value,
            legal_info_input_value,
            contact_info_input_value,
            banking_info_input_value,
            delivery_adress_input_value
        },
        'cutomers_permission','add',
        15,
        true,'هل تريد حفظ البيانات ؟',
        true,
        false,'',
        false,'',
        'حدث خطأ اثناء معالجة البيانات'
    )

    if (post) {
        clear_inputs()    
    }
    

} catch (error) {
    catch_error(error)
}
}

function clear_inputs (){
    try {
        const inputs = new_cutomer_div.querySelectorAll(`input, textarea`)

         for ( const input of inputs){
            input.value = '';
         }   

    } catch (error) {
        catch_error(error)
    }
}

//#region new cutsomer



//#endregion



//#region showReason of redirection
//! الكود دا خاص بملف ال روووتس  هو الى من خلاله بجيب القيم بتاع  سويتش كيس

  document.addEventListener('DOMContentLoaded', function() {
    showRedirectionReason();
  });
  
  //#endregion End - showReason of redirection