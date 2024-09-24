
setActiveSidebar('vendors_view_ar');
//check permissions
pagePermission('vendors_permission','view');


const btn_new = document.querySelector(`#btn_new`);
const table_div = document.querySelector(`#table_div`);
const new_vendor_div = document.querySelector(`#new_vendor_div`);
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
const account_id_hidden = document.querySelector(`#account_id_hidden`);


// إعلان المتغير على مستوى الـ script  
const tableContainer = document.getElementById('tableContainer');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');



//#region  ( baynat el vendors mn el database )
// get data from db and store it in array1
let data = [];
let array1 = [];
let slice_Array1 = [];


async function getvendorsData_fn() {
    const response = await fetch('/get_All_vendors_Data');
     data = await response.json();

    // تحديث array1 بنتيجة الـ slice
    array1 = data.slice();
    
}

async function showFirst50RowAtTheBegening() {
    await getvendorsData_fn()
    slice_Array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    filleffectstable()
}

document.addEventListener("DOMContentLoaded", function () {
    // استدعاء الدالة عندما تكتمل تحميل الصفحة
    showFirst50RowAtTheBegening();
});

async function filleffectstable() {
    //  @@ هاااااام جدا 
    // el properties beta3 kol 3amod ytm wad3ha fe el <thead></thead> And <tbody></tbody> And <tfoor></tfoor> kol wa7ed lewa7do
    // el properties hya :
    // 1 : display: none; > fe 7alt enak ardt e5fa2 el 3amod -- display: ; hatspha fadya fe7alt enak ardt tezhr el 3amod
    // 2 : white-space: nowrap;  fe 7alt enak ardt en el text maylfsh ta7t ba3do  -- white-space: wrap; fe 7alt enak ardt en el tezt ylf
    // 3 : width: auto;  fe 7alt enak ardt en ykon 3ard el 3amod 3ala ad el mo7tawa -- width: 100%; fe 7alt enak ardt en el 3amod ya5od ba2y el mesa7a el fadla
    // 4 : text-align: center / left / right / justify   da 3ashan tet7km fe el text ymen wala shemal wala fe ele nos
    
        //* Prepare GLOBAL variables Befor sum functions
        total_column1.value = 0
        // إعداد رأس الجدول
        let tableHTML = `<table id="vendors_table" class="review_table">
                        <thead>
                            <tr>
                                <th></th>
                                <th style="display: none" >ID</th>
                                <th>الاسم</th>
                                <th style="display: none">account_no</th>
                                <th style="display: none">credit_limit</th>
                                <th style="display: none">email</th>
                                <th style="display: none">tasgel_darepy</th>
                                <th style="display: none">legal_info</th>
                                <th style="display: none">delivery_adress</th>
                                <th style="display: none">banking_info</th>
                                <th style="width: auto">الرصيد</th>
                            </tr>
                            </thead>
                            <tbody>`;

        // إضافة صفوف الجدول بناءً على البيانات
        // slice_Array1 = ""; // تفريغ المصفوفه
        slice_Array1.forEach(row => {
            tableHTML += `<tr>
                            <td> <button class="tabble_update_btn" onclick="table_update_btn_fn(this)">تحرير</button> </td>
                            <td style="display: none">${row.id}</td>
                            <td style="width: 100%;">${row.account_name}</td>
                            <td style="display: none">${row.account_no}</td>
                            <td style="display: none">${row.credit_limit}</td>
                            <td style="display: none">${row.email}</td>
                            <td style="display: none">${row.tasgel_darepy}</td>
                            <td style="display: none">${row.legal_info}</td>
                            <td style="display: none">${row.contact_info}</td>
                            <td style="display: none">${row.delivery_adress}</td>
                            <td style="display: none">${row.banking_info}</td>
                            <td style="width: auto;" class="table_number">${total_column(total_column1,row.balance)}</td>
                          </tr>`;
        });

        tableHTML += `</tbody>
        <tfoot>
            <tr class="table_totals_row";>
            <td id="tfooter1" ></td>
            <td id="tfooter2" style="display: none" ></td>
            <td id="tfooter3"></td>
            <td id="tfooter4" style="display: none;"></td>
            <td id="tfooter5" style="display: none;"></td>
            <td id="tfooter6" style="display: none;"></td>
            <td id="tfooter7" style="display: none;"></td>
            <td id="tfooter8" style="display: none;"></td>
            <td id="tfooter9" style="display: none;"></td>
            <td id="tfooter10" style="display: none;"></td>
            <td id="tfooter11" style="display: none;"></td>
            <td id="tfooter12" style="width: auto;"></td>
            </tr>
                        <tr id="table_fotter_buttons_row">
                            <td colspan="12">   <!-- da awel 3amod fe ele sad tr han7othan5elh han3mel merge lkol el columns fe column wa7ed 3ashan n7ot el 2 buttons hat3mel colspan le3add el 3awamed kolaha -->
                                <div class='flex_H'>
                                 <button class="table_footer_show_data"  id="" onclick="ShowAllDataIneffectsTable()">All</button>
                                 <button class="table_footer_show_data"  id="" onclick="showFirst50RowIneffectsTable()">50</button>
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
document.getElementById("tfooter12").textContent = floatToString(false,total_column1.value);

if (array1.length > 0 && array1.length <= 50) {
    document.querySelector('#table_fotter_buttons_row').style.display = "none";
} else if (array1.length < 1) {
    document.querySelector('#table_fotter_buttons_row').innerHTML = `<td colspan='12' class="td_no_result">لا نتائج</td>`;
};


};


// search in effectsTable
async function performSearch() {
    // الحصول على قيمة البحث
    const searchValue = searchInput.value.trim().toLowerCase();

    // فلترة البيانات بناءً على قيمة البحث
    array1 = data.filter(row => {
        // التحقق من أن employee.id و employee.name ليستان فارغتين
        // const idMatch = row.id && row.id.toString().toLowerCase().includes(searchValue);
        const nameMatch = row.account_name && row.account_name.toString().toLowerCase().includes(searchValue);
        return nameMatch // || nameMatch;
    });

    slice_Array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    filleffectstable()
}

async function ShowAllDataIneffectsTable(){
    showAlert('info', 'ان ظهار كامل البيانات فى القائمة المنسدله لا يؤثر على عمليه البحث فى البيانات')
    slice_Array1 = array1.slice(); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    filleffectstable()
}

async function showFirst50RowIneffectsTable(){
    slice_Array1 = array1.slice(0,50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    filleffectstable()
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
    page_adress_h2.textContent = 'مورد جديد'
    update_btn.style.display = 'none'
    btn_cancel.style.display = 'none'
    table_div.style.display = 'none'
    new_vendor_div.style.display = 'flex'
    back_icon_to_table_view.style.display = 'flex'
    back_icon_to_home.style.display = 'none'
}

back_icon_to_table_view.onclick = function (){
    try {
    page_adress_h2.textContent = 'الموردين'
    table_div.style.display = 'flex'
    new_vendor_div.style.display = 'none'
    back_icon_to_table_view.style.display = 'none'
    back_icon_to_home.style.display = 'flex'
    clear_inputs();
} catch (error) {
    catch_error(error)
}
}

async function table_update_btn_fn(updateBtn) {
    try {
    const permission = btn_permission('vendors_permission','update');

    if (!permission){ // if false
        return;
    };

    clear_inputs();
    const row  = updateBtn.closest("tr")

    account_id_hidden.value = row.cells[1].textContent;
    account_name_input.value = row.cells[2].textContent;
    account_no_input.value = row.cells[3].textContent;
    credit_limit.value = row.cells[4].textContent;
    email_input.value = row.cells[5].textContent;
    tasgel_darepy_input.value = row.cells[6].textContent;
    legal_info_input.value = row.cells[7].textContent;
    contact_info_input.value = row.cells[8].textContent;
    delivery_adress_input.value = row.cells[9].textContent;
    banking_info_input.value = row.cells[10].textContent;
    
    page_adress_h2.textContent = `تعديل : ${account_name_input.value}`
    save_btn.style.display = 'none'
    update_btn.style.display = 'flex'
    btn_cancel.style.display = 'flex'
    table_div.style.display = 'none'
    new_vendor_div.style.display = 'flex'
    back_icon_to_table_view.style.display = 'flex'
    back_icon_to_home.style.display = 'none'
} catch (error) {
    catch_error(error)
}
};




//#region 
save_btn.onclick = async function (){
try {

    const acc_no_div_value = account_no_input.value.trim();
    const account_name_input_value = account_name_input.value.trim();
    const credit_limit_value = parseFloat(credit_limit.value);
    const email_input_value = email_input.value.trim();
    const tasgel_darepy_input_value = tasgel_darepy_input.value.trim();
    const legal_info_input_value = legal_info_input.value.trim();
    const contact_info_input_value = contact_info_input.value.trim();
    const banking_info_input_value = banking_info_input.value.trim();
    const delivery_adress_input_value = delivery_adress_input.value.trim();


    if (!account_name_input_value) {
        showAlert('warning','برجاء ادخال اسم المورد');
        return
    }

    const post =  await fetchData_postAndGet(
        "/addNewVendor",
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
        'vendors_permission','add',
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


update_btn.onclick = async function () {
    try {

        
        const account_id_hidden_value = account_id_hidden.value;
        const acc_no_div_value = account_no_input.value.trim();
        const account_name_input_value = account_name_input.value.trim();
        const credit_limit_value = parseFloat(credit_limit.value);
        const email_input_value = email_input.value.trim();
        const tasgel_darepy_input_value = tasgel_darepy_input.value.trim();
        const legal_info_input_value = legal_info_input.value.trim();
        const contact_info_input_value = contact_info_input.value.trim();
        const banking_info_input_value = banking_info_input.value.trim();
        const delivery_adress_input_value = delivery_adress_input.value.trim();
    
        if (!account_id_hidden_value) {
            redirection('vendors_view_ar','fail','حدث خطأ اثناء معالجة البيانات : سيم توجيهك لصفحة الموردين')
            return;
        }
        
        if (!account_name_input_value) {
            showAlert('warning','برجاء ادخال اسم الموردين');
            return;
        }

        const post =  await fetchData_postAndGet(
            "/updateVendor",   
            {   
                account_id_hidden_value,
                acc_no_div_value,
                account_name_input_value,
                credit_limit_value,
                email_input_value,
                tasgel_darepy_input_value,
                legal_info_input_value,
                contact_info_input_value,
                banking_info_input_value,
                delivery_adress_input_value
            },
            'vendors_permission','update',
            15,
            true,'هل تريد تعديل بيانات المورد ؟',
            true,
            false,'',
            true,'vendors_view_ar',
            'حدث خطأ اثناء معالجة البيانات'
        )
    
        
    } catch (error) {
        catch_error(error)
    }
}

btn_cancel.onclick = async function () {
    try {
   
        const account_id_hidden_value = account_id_hidden.value;

        if (!account_id_hidden_value) {
            redirection('vendors_view_ar','fail','حدث خطأ اثناء معالجة البيانات : سيم توجيهك لصفحة الموردين')
            return;
        }
        
        const post =  await fetchData_postAndGet(
            "/delete_vendor",
            {   
                account_id_hidden_value
            },
            'vendors_permission','delete',
            15,
            true,'هل تريد حذف البيانات ؟',
            true,
            false,'',
            true,'vendors_view_ar',
            'حدث خطأ اثناء معالجة البيانات'
        )
    
        
    } catch (error) {
        catch_error(error)
    }
}


function clear_inputs (){
    try {
        const inputs = new_vendor_div.querySelectorAll(`input, textarea`)

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