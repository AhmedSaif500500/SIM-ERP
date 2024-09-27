
setActiveSidebar('effects_view_ar');

//check permissions
// pagePermission('effects_permission','view');

//#region table

// إعلان المتغير على مستوى الـ script  
const tableContainer = document.querySelector('#tableContainer');
const tableAdress = document.querySelector('#tableAdress');
const table_main_container = document.querySelector('#table_main_container');
const searchBtn = document.querySelector('#searchBtn');
const searchInput = document.querySelector('#searchInput');
const select_report = document.querySelector('#select_report');
const dropdown_container = document.querySelector('#dropdown_container');
const id_hidden_input = document.querySelector('#id_hidden_input');
const dropdown_select_input = document.querySelector('#dropdown_select_input');
const select_month = document.querySelector('#select_month');
const select_year = document.querySelector('#select_year');


// اختيار الشهر الحالى والسنه الحالية 
const date = new Date();
const currentMonth = date.getMonth() + 1; // يضيف 1 لأن يناير هو 0 |
const currentYear = date.getFullYear();

changeSelect('select_month',currentMonth);
changeSelect('select_year',currentYear);







// for start_custom_search_btn
let current_month;
let current_year;
let current_dropDown_text;
let current_dropDown_hidden_id;


// تحديد التقرير
select_report.addEventListener('change', async function () {

    if (parseInt(select_report.value) === 2) {
        id_hidden_input.value = 'all'
        dropdown_select_input.value = 'كل الموظفين'
        dropdown_container.style.pointerEvents = 'none';
    } else {
        id_hidden_input.value = null
        dropdown_select_input.value = null
        dropdown_container.style.pointerEvents = 'auto';
    }
})


//#region  ( baynat el employees mn el database )
// get data from db and store it in array1
let data = [];
let array1 = [];
let slice_Array1 = [];


async function getEmployeesData_fn() {


    try {

        //! 1: prepare data to send
        let report_type = parseInt(select_report.value);
        let employee_id = id_hidden_input.value;
        let month = parseInt(select_month.value);
        let year = parseInt(select_year.value);


        //!2: send id to server then receive data from server response
        // تجهيز البيانات للإرسال إلى الخادم
        const posted_elements = {
            report_type,
            employee_id,
            month,
            year,
        };

        // إرسال البيانات إلى الخادم
        const response = await fetch('/report_effects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(posted_elements)
        });

        // التأكد من وجود بيانات فى  ارد وتقلها الى اررااى1
        data = await response.json();
        if (data && Array.isArray(data)) { // تأكد من أن البيانات موجودة وأنها مصفوفة
            array1 = data.slice();
        } else {
            showAlert('info', 'لا توجد بيانات فى الفتره المحدده')
            array1 = []; //  اعطاء الجدول بيانات فارغه
        };


    } catch (error) {
        catch_error('Error getting employee data:', error.message)
    };

}

async function showFirst50RowAtTheBegening() {
    await getEmployeesData_fn()
    slice_Array1 = await array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    await filleffectstable()
}


async function start_custom_search_btn_fn(){
    let report_type = parseInt(select_report.value);
    if (report_type === 1 && !dropdown_select_input.value) { // فى حاله كل الموظفين
    showAlert('fail','من فضلك اختر الموظف اولا');
    return;
    }

    document.querySelector('#search_in_table_div').style.display = 'flex'
    // استدعاء الدالة عندما تكتمل تحميل الصفحة
    await showFirst50RowAtTheBegening();
}

document.querySelector('#custom_search_btn').addEventListener("click", async function () {
    if(select_month.value){current_month = select_month.value};   
    if(select_year.value){current_year = select_year.value};
    // if(id_hidden_input.value){current_dropDown_hidden_id = id_hidden_input.value};
    // if(dropdown_select_input.value){current_dropDown_text = dropdown_select_input.value};
    
   await start_custom_search_btn_fn()
});

async function filleffectstable() {
    //  @@ هاااااام جدا 
    // el properties beta3 kol 3amod ytm wad3ha fe el <thead></thead> And <tbody></tbody> And <tfoor></tfoor> kol wa7ed lewa7do
    // el properties hya :
    // 1 : display: none; > fe 7alt enak ardt e5fa2 el 3amod -- display: ; hatspha fadya fe7alt enak ardt tezhr el 3amod
    // 2 : white-space: nowrap;  fe 7alt enak ardt en el text maylfsh ta7t ba3do  -- white-space: wrap; fe 7alt enak ardt en el tezt ylf
    // 3 : width: auto;  fe 7alt enak ardt en ykon 3ard el 3amod 3ala ad el mo7tawa -- width: 100%; fe 7alt enak ardt en el 3amod ya5od ba2y el mesa7a el fadla
    // 4 : text-align: center / left / right / justify   da 3ashan tet7km fe el text ymen wala shemal wala fe ele nos

    if (!array1.length || array1.length < 1) {
        return;
    }
        

    let report_type = parseInt(select_report.value);
    if (report_type === 2) { // فى حاله كل الموظفين

               //* Prepare GLOBAL variables Befor sum functions
       total_column1.value = 0
       total_column2.value = 0
       total_column3.value = 0

        // إعداد رأس الجدول
        let tableHTML = `<table id="effects_table" class="review_table">
        <thead>
            <tr>
                <th></th>
                <th style="display: none;">employee_id</th>
                <th style="display: ;width: 100%;">اسم الموظف</th>
                <th style="white-space: nowrap; text-align: center;">الايام</th>
                <th style="white-space: nowrap; text-align: center;">الساعات</th>
                <th style="white-space: nowrap; text-align: center;">المبالغ</th>
            </tr>
            </thead>
            <tbody>`;

        // إضافة صفوف الجدول بناءً على البيانات
        // slice_Array1 = ""; // تفريغ المصفوفه
        slice_Array1.forEach(row => {
            tableHTML += `<tr>
            <td> <button class="tabble_view_btn" onclick="tabble_view_btn_fn(this)">عرض</button> </td>
            <td style="display: none;">${row.employee_id}</td>
            <td style="display: ;width: 100%;">${row.employee_name}</td>
            <td style="width: auto; white-space: nowrap; text-align: center;" class="table_number">${total_column(total_column1,row.total_days)}</td>
            <td style="width: auto; white-space: nowrap; text-align: center;" class="table_number">${total_column(total_column2,row.total_hours)}</td>
            <td style="width: auto; white-space: nowrap; text-align: center;" class="table_number">${total_column(total_column3,row.total_values)}</td>
          </tr>`;
        });

        tableHTML += `</tbody>
<tfoot> 
<tr class="table_totals_row";>
<td id="tfooter1" style="display: ;"></td>
<td id="tfooter2" style="display: none;"></td>
<td id="tfooter3" style="display: ; width: 100%;"></td>
<td id="tfooter4"></td>
<td id="tfooter5"></td>
<td id="tfooter6"></td>
</tr>

<tr id="table_fotter_buttons_row">
<td colspan="7">  <!-- da awel 3amod fe ele sad tr han7othan5elh han3mel merge lkol el columns fe column wa7ed 3ashan n7ot el 2 buttons hat3mel colspan le3add el 3awamed kolaha -->
    <div class='flex_H'>
        <button class="table_footer_show_data"  id="" onclick="ShowAllDataIneffectsTable()">All</button>
        <button class="table_footer_show_data"  id="" onclick="showFirst50RowIneffectsTable()">50</button>
    </div>
</td>
</tr>

</tfoot>`;

        // إغلاق الجدول
        tableHTML += '</table>';

        // تهيئه عنوان الجدول
        // const tableAdress = `<h2 id="tableAdress" class="h2">كل الموظفين</h2>`
        tableAdress.textContent = `كل الموظفين   :   ${select_month.value} - ${select_year.value}`;
         tableAdress.style.display ='block'
        // تحديث محتوى الصفحة بناءً على البيانات
        tableContainer.innerHTML = tableHTML;

        // اظهار الازرار فى الاسفل او اخفاءها حسب حجم البيانات
        if (array1.length > 0 && array1.length <= 50) {
            document.querySelector('#table_fotter_buttons_row').style.display = "none";
        } else if (array1.length < 1) {
            document.querySelector('#table_fotter_buttons_row').innerHTML = `<td colspan='7' class="td_no_result">لا نتائج</td>`;
        };


//------------------------------------------------


// عرض نتائج الجمع
document.getElementById("tfooter1").textContent = slice_Array1.length; // عدد الصفوف
document.getElementById("tfooter4").textContent = total_column1.value;
document.getElementById("tfooter5").textContent = total_column2.value;
document.getElementById("tfooter6").textContent = total_column3.value;






        table_main_container.style.display = 'block'

    } else { //  فى حاله الموظف الفردى
        // إعداد رأس الجدول
        let tableHTML = `<table id="effects_table" class="review_table">
        <thead>
            <tr>
                <th style="display:;"></th>
                <th style="display: none;">id</th>
                <th style="display: none; width: ;">employee_id</th>
                <th style="display: none;">اسم الموظف</th>
                <th style="white-space: nowrap; width: auto;">الايام</th>
                <th style="white-space: nowrap; width: auto;">الساعات</th>
                <th style="white-space: nowrap; width: auto;">المبالغ</th>
                <th style="white-space: wrap; width: 100%;">البيان</th>
                <th style="white-space: nowrap; width: auto;">التاريخ</th>
            </tr>
            </thead>
            <tbody>`;

        // إضافة صفوف الجدول بناءً على البيانات
        // slice_Array1 = ""; // تفريغ المصفوفه
        slice_Array1.forEach(row => {
            tableHTML += `<tr>
            <td> <button class="tabble_update_btn" onclick="table_update_btn_fn(this)">تحرير</button> </td>
            <td style="display: none;">${row.id}</td>
            <td style="display: none;">${row.employee_id}</td>
            <td style="display: none;">${row.employee_name}</td>
            <td style="width: auto; white-space: nowrap;">${row.days}</td>
            <td style="width: auto; white-space: nowrap;">${row.hours}</td>
            <td style="width: auto; white-space: nowrap;">${row.values}</td>
            <td style="width: 100%; white-space: wrap;">${row.note}</td>
            <td style="width: auto; white-space: nowrap;">${row.datex}</td>
          </tr>`;
        });

        tableHTML += `</tbody>
<tfoot> 
<tr class="table_totals_row";>
<td id="tfooter1" style="display: ;"></td>
<td id="tfooter2" style="display: none;"></td>
<td id="tfooter3" style="display: none;"></td>
<td id="tfooter4" style="display: none;"></td>
<td id="tfooter5"></td>
<td id="tfooter6"></td>
<td id="tfooter7"></td>
<td id="tfooter8" style="width:100%"></td>
<td id="tfooter9"></td>
</tr>

<tr id="table_fotter_buttons_row1">
<td colspan="9">  <!-- da awel 3amod fe ele sad tr han7othan5elh han3mel merge lkol el columns fe column wa7ed 3ashan n7ot el 2 buttons hat3mel colspan le3add el 3awamed kolaha -->
    <div class='flex_H'>
        <button class="table_footer_show_data"  id="" onclick="ShowAllDataIneffectsTable()">All</button>
        <button class="table_footer_show_data"  id="" onclick="showFirst50RowIneffectsTable()">50</button>
    </div>
</td>
</tr>

</tfoot>`;

        // إغلاق الجدول
        tableHTML += '</table>';

        
        tableAdress.textContent = `${array1[0].employee_name}  :  ${select_month.value} - ${select_year.value}`;

        // تحديث محتوى الصفحة بناءً على البيانات
        tableContainer.innerHTML = tableHTML;

        // اظهار الازرار فى الاسفل او اخفاءها حسب حجم البيانات

        if (array1.length > 0 && array1.length <= 50) {
            document.querySelector('#table_fotter_buttons_row1').style.display = "none";
        } else if (array1.length < 1) {
            document.querySelector('#table_fotter_buttons_row1').innerHTML = `<td colspan='9' class="td_no_result">لا نتائج</td>`;
        };

        //  عمليات صف الاجمالى 


//#region  loops table for totals and colores
let total_days = 0;
let total_hours = 0;
let total_values = 0;

// الحصول على الجدول

let tableBody = document.getElementById("effects_table").getElementsByTagName("tbody")[0];

// البدء بعملية جمع الأعمدة
for (let i = 0; i < tableBody.rows.length; i++) {
    let row = tableBody.rows[i];
    

    let days_cell = row.cells[4]; let days_Value =  parseFloat(days_cell.textContent);
    let hours_cell = row.cells[5]; let hours_value =  parseFloat(hours_cell.textContent);
    let values_cell = row.cells[6]; let values_value =  parseFloat(values_cell.textContent);


    // التحقق من أن القيم قابلة للتحويل إلى أرقام وجمعها
    if (!isNaN(days_Value)) {
        total_days += days_Value;
        if(days_Value < 0 ){
            days_cell.style.color = "red"
        }else if (days_Value === 0){
            days_cell.innerHTML = "";
        };
    }else{
        days_cell.innerHTML = ""
    };



    if (!isNaN(hours_value)) {
        total_hours += hours_value;
        if(hours_value < 0 ){
            hours_cell.style.color = "red"
        }else if (hours_value === 0){
            hours_cell.innerHTML = "";
        };
    }else{
        hours_cell.innerHTML = ""
    };



    if (!isNaN(values_value)) {
        total_values += values_value;
        if(values_value < 0 ){
            values_cell.style.color = "red"
        }else if (values_value === 0){
            values_cell.innerHTML = "";
        };
    }else{
        values_cell.innerHTML = ""
    };
}

// عرض نتائج الجمع
document.getElementById("tfooter1").textContent = tableBody.rows.length; // عدد الصفوف
document.getElementById("tfooter5").textContent = total_days;
document.getElementById("tfooter6").textContent = total_hours;
document.getElementById("tfooter7").textContent = total_values;

//#endregion end loops table for totals and colores

        table_main_container.style.display = 'block'
    } // end -  if(report_type === 2){ 
};


// search in effectsTable
function performSearch() {
    // الحصول على قيمة البحث
    const searchValue = searchInput.value.trim().toLowerCase();

    // فلترة البيانات بناءً على قيمة البحث
    array1 = data.filter(row => {
        // التحقق من أن employee.id و employee.name ليستان فارغتين
        let report_type = parseInt(select_report.value);
        if (report_type === 2) { // فى حاله كل الموظفين
            const nameMatch = row.employee_name && row.employee_name.toString().toLowerCase().includes(searchValue);
            const daysMatch = row.total_days && row.total_days.toString().toLowerCase().includes(searchValue);
            const hoursMatch = row.total_hours && row.total_hours.toString().toLowerCase().includes(searchValue);
            const valuesMatch = row.total_values && row.total_values.toString().toLowerCase().includes(searchValue);

            return nameMatch || daysMatch || hoursMatch || valuesMatch;
        }else{
            const daysMatch = row.days && row.days.toString().toLowerCase().includes(searchValue);
            const hoursMatch = row.hours && row.hours.toString().toLowerCase().includes(searchValue);
            const valuesMatch = row.values && row.values.toString().toLowerCase().includes(searchValue);
            const noteMatch = row.note && row.note.toString().toLowerCase().includes(searchValue);
            const datexMatch = row.datex && row.datex.toString().toLowerCase().includes(searchValue);

            return daysMatch || hoursMatch || valuesMatch || noteMatch || datexMatch;
        }

    });

    slice_Array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    filleffectstable()
}

async function ShowAllDataIneffectsTable() {
    showAlert('info', 'ان ظهار كامل البيانات فى القائمة المنسدله لا يؤثر على عمليه البحث فى البيانات')
    slice_Array1 = array1.slice(); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    filleffectstable()
}

async function showFirst50RowIneffectsTable() {
    slice_Array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    filleffectstable()
}


// عند الضغط على زر البحث
searchBtn.addEventListener('click', performSearch);

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



async function tabble_view_btn_fn(viewButton) {
    id_hidden_input.value = viewButton.closest("tr").cells[1].textContent;
    dropdown_select_input.value = viewButton.closest("tr").cells[2].textContent;

changeSelect('select_report','1');
changeSelect('select_month',current_month);
changeSelect('select_year',current_year);

    await showFirst50RowAtTheBegening();
}


async function table_update_btn_fn(updateButton) {
    const permission = await btn_permission('effects_permission','update');

    if (!permission){ // if false
        return;
    };

        // عثر على الموظف باستخدام معرف الموظف
        const selectedrow = updateButton.closest("tr").cells[1].textContent;
        if (selectedrow) {
            sessionStorage.setItem('effects_id', selectedrow);
            window.location.href = '/effects_update_ar';
        } else {
            return;
        };
    

    }





//#endregion end - table




//#region get employees data from server to fill dropdown

let data2 = [];
let array2 = [];
let slice_Array2 = [];


// تحضير البيانات من السيرفر
async function getEmployeesData_fn1() {

    // const response = await fetch("/getEmployeesData1");
    // data2 = await response.json();


    data2 = await fetchData_postAndGet(
        '/getEmployeesData1',
        {},
        'effects_permission','view',
        15,
        false,'',
        'حدث خطأ اثناء معالجة البيانات',
        false,
        false,'',
        false,'',
        'حدث خطأ اثناء الدخول الى العمل التجارى المحدد'
      )

    // تحديث array2 بنتيجة الـ slice
    array2 = data2.slice();
};

async function showFirst50RowAtTheBegening1() {
    await getEmployeesData_fn1()
    slice_Array2 = array2.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    filleffectstable1()
}



async function filleffectstable1() {
    //  @@ هاااااام جدا 
    // el properties beta3 kol 3amod ytm wad3ha fe el <thead></thead> And <tbody></tbody> And <tfoor></tfoor> kol wa7ed lewa7do
    // el properties hya :
    // 1 : display: none; > fe 7alt enak ardt e5fa2 el 3amod -- display: ; hatspha fadya fe7alt enak ardt tezhr el 3amod
    // 2 : white-space: nowrap;  fe 7alt enak ardt en el text maylfsh ta7t ba3do  -- white-space: wrap; fe 7alt enak ardt en el tezt ylf
    // 3 : width: auto;  fe 7alt enak ardt en ykon 3ard el 3amod 3ala ad el mo7tawa -- width: 100%; fe 7alt enak ardt en el 3amod ya5od ba2y el mesa7a el fadla
    // 4 : text-align: center / left / right / justify   da 3ashan tet7km fe el text ymen wala shemal wala fe ele nos

    // إعداد رأس الجدول
    let tableHTML = `<table id="employees_table" class="review_table">
                        <tbody>`;

    // إضافة صفوف الجدول بناءً على البيانات
    // slice_Array2 = ""; // تفريغ المصفوفه
    slice_Array2.forEach(row => {
        tableHTML += `<tr onclick="selectedRow1(this)">
                          <td style="display: none;" >${row.id}</td>
                          <td style="width: 100%;">${row.employee_name}</td>
                        </tr>`;
    });

    tableHTML += `</tbody>
      <tfoot> 
      <!--
          <tr class="table_totals_row">
              <td id="tfooter1"></td>
              <td id="tfooter2" style="display: none;"></td>
          </tr>
        -->
          <tr id="table_fotter_buttons_row">
              <td colspan="2">  <!-- da awel 3amod fe ele sad tr han7othan5elh han3mel merge lkol el columns fe column wa7ed 3ashan n7ot el 2 buttons hat3mel colspan le3add el 3awamed kolaha -->
                  <div class='flex_H'>
                      <button class="table_footer_show_data"  id="w1" onclick="ShowAllDataIneffectsTable1()">All</button>
                      <button class="table_footer_show_data"  id="w2" onclick="showFirst50RowIneffectsTable()">50</button>
                  </div>
              </td>
          </tr>

      </tfoot>`;

    // إغلاق الجدول
    tableHTML += '</table>';

    // تحديث محتوى الصفحة بناءً على البيانات
    document.querySelector('#dropdownItems').innerHTML = tableHTML;
    //  عمليات صف الاجمالى 
    // جمع القيم في العمود رقم 6


    // document.getElementById("tFooter6").textContent = totalColumn_Valuu;
    // document.getElementById("tfooter1").textContent = slice_Array2.length; //  عدد الصفوف

    // hide footer btn if rows < 50
    if (array2.length > 0 && array2.length <= 50) {
        document.querySelector('#table_fotter_buttons_row').style.display = "none";
    } else if (array2.length < 1) {
        document.querySelector('#table_fotter_buttons_row').innerHTML = `<td colspan='2' class="td_no_result">لا نتائج</td>`;
    };


};

// search in effectsTable
async function performSearch1() {

    // الحصول على قيمة البحث
    const searchValue = document.querySelector('#dropdown_search_input').value.trim().toLowerCase();

    // فلترة البيانات بناءً على قيمة البحث
    array2 = data2.filter(row => {
        // التحقق من أن employee.id و employee.name ليستان فارغتين
        const idMatch = row.id && row.id.toString().toLowerCase().includes(searchValue);
        const nameMatch = row.employee_name && row.employee_name.toString().toLowerCase().includes(searchValue);
        return idMatch || nameMatch;
    });

    slice_Array2 = array2.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    filleffectstable1()
}

async function ShowAllDataIneffectsTable1() {
    showAlert('info', 'ان ظهار كامل البيانات فى القائمة المنسدله لا يؤثر على عمليه البحث فى البيانات')
    slice_Array2 = array2.slice(); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    await filleffectstable1()

};

async function showFirst50RowIneffectsTable1() {
    slice_Array2 = array2.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    await filleffectstable1()
};


// تحديد الخيار المختار وإخفاء القائمة
function selectedRow1(row) {
    document.querySelector('#id_hidden_input').value = row.cells[0].textContent; // row.id
    document.querySelector('#dropdown_select_input').value = row.cells[1].textContent; // row.employee_name
    hideDropdown1();
};




//!--------------------------------------------------------------


// إظهار/إخفاء القائمة
function toggleDropdown1() {
    if (dropdown_menue.style.display === "none") {
        measureDistanceToBottom1();
        showDropdown1();

    } else {
        measureDistanceToBottom1();
        hideDropdown1();
    }
}

// إظهار القائمة
async function showDropdown1() {
    await showFirst50RowAtTheBegening1();
    dropdown_menue.style.display = "block";
}

// إخفاء القائمة
function hideDropdown1() {
    dropdown_menue.style.display = "none";
    document.querySelector('#dropdown_search_input').value = ""
}

// إظهار/إخفاء القائمة

dropdown_select.addEventListener("click", toggleDropdown1);

// إخفاء القائمة عند فقدان التركيز
document.addEventListener("click", (event) => {
    if (
        !document.querySelector('#dropdown_select').contains(event.target) &&
        !document.querySelector('#dropdown_menue').contains(event.target) &&
        !event.target.closest('#employees_table') // تحقق مما إذا كانت النقرة ليست داخل الجدول
    ) {
        // alert(`i will hide menue now`);
        hideDropdown1();
    }
});

// إخفاء القائمة عند الضغط على مفتاح الهروب
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        hideDropdown1();
    }
});

//#region  جعل القائمه تفتح الى اعلى او لاسفل حسب الافضل

function measureDistanceToBottom1() {
    const dropdown_container = document.querySelector('#dropdown_container'); // el main container
   

    // الحصول على معلومات الحجم والموقع النسبي للعنصر
    const rect = dropdown_container.getBoundingClientRect();

    // الحصول على ارتفاع النافذة الرئيسية للمتصفح
    const windowHeight = window.innerHeight;

    // حساب المسافة بين العنصر والحافة السفلية للشاشة
    const distanceToBottom = windowHeight - rect.bottom;

    // حساب المسافة بوحدة REM
    // الحصول على حجم الخط الأساسي وتحويل المسافة إلى REM
    const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const distanceToBottomRem = distanceToBottom / fontSize;

    if (distanceToBottomRem < 21) {  // 5aleh nafs rl hight beta3 el drop_menue + 1 
        dropdown_menue.classList.add("dropdown_menue_Open_top");
        dropdown_menue.classList.remove("dropdown_menue_Open_bottom");
    } else {
        dropdown_menue.classList.add("dropdown_menue_Open_bottom");
        dropdown_menue.classList.remove("dropdown_menue_Open_top");
    }

    // طباعة المسافة بوحدة REM إلى وحدة تحكم المتصفح

    // يستدعي الدالة عند حدوث التمرير أو تغيير حجم الشاشة
    window.addEventListener('scroll', measureDistanceToBottom1);
    window.addEventListener('resize', measureDistanceToBottom1);

    // استدعاء الدالة لقياس المسافة لأول مرة
    // measureDistanceToBottom1();
    //#endregion end ------

}
//#endregion fill dropdown    





//#region showReason of redirection
//! الكود دا خاص بملف ال روووتس  هو الى من خلاله بجيب القيم بتاع  سويتش كيس
function showReason() {
    let message;
    const urlParams = new URLSearchParams(window.location.search);
    const reason = urlParams.get("reason");

    if (reason) {
        switch (reason) {
            case "0":
                message = "عفوا , انت لا تملك صلاحيه العرض"; // Unauthorized message in Arabic
                break;
            case "1":
                message = "عفوا , انت لا تملك صلاحيه الاضافه"; // Unauthorized message in Arabic
                break;
            case "2":
                message = "عفوا , انت لا تملك صلاحيه التعديل"; // Invalid credentials message in Arabic
                break;
            case "3":
                message = "عفوا , انت لا تملك صلاحيه الحذف"; // Invalid credentials message in Arabic
                break;
            default:
                message = "حدث خطأ غير معروف."; // Default error message
        }
    };

    if (message) {
        showAlert('fail', message);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    showReason();
});

//#endregion End - showReason of redirection