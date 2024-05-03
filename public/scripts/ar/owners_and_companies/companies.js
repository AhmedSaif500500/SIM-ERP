
//check permissions
// pagePermission('bread_permission','view');


// إعلان المتغير على مستوى الـ script  
const tableContainer = document.getElementById('table-container');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');


const add_new_bussnies = document.querySelector(`#add_new_bussnies`);


//#region  ( baynat el employees mn el database )

let array1 = [];
let slice_Array1 = [];


async function geteProductionData_fn() {
    const response = await fetch('/get_companies_data');
     data = await response.json();

    // تحديث array1 بنتيجة الـ slice
    array1 = data.slice();
    
}

async function showFirst50RowAtTheBegening() {
    await geteProductionData_fn()
    slice_Array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    fillAttendancetable()
}





async function fillAttendancetable() {
    //  @@ هاااااام جدا 
    // el properties beta3 kol 3amod ytm wad3ha fe el <thead></thead> And <tbody></tbody> And <tfoor></tfoor> kol wa7ed lewa7do
    // el properties hya :
    // 1 : display: none; > fe 7alt enak ardt e5fa2 el 3amod -- display: ; hatspha fadya fe7alt enak ardt tezhr el 3amod
    // 2 : white-space: nowrap;  fe 7alt enak ardt en el text maylfsh ta7t ba3do  -- white-space: wrap; fe 7alt enak ardt en el tezt ylf
    // 3 : width: auto;  fe 7alt enak ardt en ykon 3ard el 3amod 3ala ad el mo7tawa -- width: 100%; fe 7alt enak ardt en el 3amod ya5od ba2y el mesa7a el fadla
    // 4 : text-align: center / left / right / justify   da 3ashan tet7km fe el text ymen wala shemal wala fe ele nos

    //* Prepare GLOBAL variables Befor sum functions
    // total_column1.value = 0
    // total_column2.value = 0
        // إعداد رأس الجدول
        let tableHTML = `<table id="companies_table" class="review_table" style="height: auto;">
        <thead>
          <tr style="height: 5rem;">
            <th style="display: none;">الكود</th>
            <th style="display: none;"></th>
            <th style="display: none;"></th>
            <th style="display: width: 100%;" class="ps_05"> اسم الشركه </th>
            <th style="display: none;"></th>
            <th style="display: none;"></th>
            <th style="display: none;"></th>
            <th style="display: none;"></th>
            <th style="display: none;"></th>
            <th style="display: none;"></th>
            <th style="display: none;"></th>
            <th style="display: none;"></th>
          </tr>
        </thead>
        <tbody>`;

        // إضافة صفوف الجدول بناءً على البيانات
        // slice_Array1 = ""; // تفريغ المصفوفه
        slice_Array1.forEach(row => {
            tableHTML += `<tr style="height: 5rem;">
            <td style="display: none;">${row.user_id}</td>
            <td style="display: none;">${row.user_name}</td>
            <td style="display: none;">${row.company_id}</td>
            <td style="display: width: 100%;" class="ps_05">${row.company_name}</td>
            <td style="display: none;">${row.is_active}</td>
            <td style="display: none;">${row.general_permission}</td>
            <td style="display: none;">${row.employees_permission}</td>
            <td style="display: none;">${row.attendance_permission}</td>
            <td style="display: none;">${row.users_permission}</td>
            <td style="display: none;">${row.production_permission}</td>
            <td style="display: none;">${row.bread_permission}</td>
            <td style="display: none;">${row.acounts_permission}</td>
          </tr>`;
        });

        tableHTML += `</tbody>
        <tfoot>
            <tr class="table_totals_row" style="height: 5rem;">
                <td id="tfooter1" colspan="12" class="ps_05"></td>
            </tr>
                        <tr id="table_fotter_buttons_row" style="height: 5rem;">
                            <td colspan="12">   <!-- da awel 3amod fe ele sad tr han7othan5elh han3mel merge lkol el columns fe column wa7ed 3ashan n7ot el 2 buttons hat3mel colspan le3add el 3awamed kolaha -->
                                <div class="flex_H">
                                 <button class="table_footer_btn"  id="" onclick="ShowAllDataInAttendanceTable()">All</button>
                                 <button class="table_footer_btn"  id="" onclick="showFirst50RowInAttendanceTable()">50</button>
                                </div>
                            </td>
                        </tr>
                    </tfoot>`;

        // إغلاق الجدول
        tableHTML += '</table>';

        // تحديث محتوى الصفحة بناءً على البيانات
        tableContainer.innerHTML = await tableHTML;


document.getElementById("tfooter1").textContent = slice_Array1.length; // عدد الصفوف
// document.getElementById("tfooter7").textContent = total_column1.value;
// document.getElementById("tfooter8").textContent = total_column2.value;



        //#endregion End totalst Functions

        // document.getElementById("tFooter6").textContent = totalColumn_Valuu;
// document.getElementById("tfooter1").textContent = slice_Array1.length; //  عدد الصفوف

if (array1.length > 0 && array1.length <= 50) {
    document.querySelector('#table_fotter_buttons_row').style.display = "none";
} else if (array1.length < 1) {
    document.querySelector('#table_fotter_buttons_row').innerHTML = `<td colspan='7' class="td_no_result">لا نتائج</td>`;
};


};


// search in attendanceTable
async function performSearch() {
    // الحصول على قيمة البحث
    const searchValue = searchInput.value.trim().toLowerCase();

    // فلترة البيانات بناءً على قيمة البحث
    array1 = data.filter(row => {
        const company_name = row.company_name && row.company_name.toString().toLowerCase().includes(searchValue);
        // const vendore_name = row.vendore_name && row.vendore_name.toString().toLowerCase().includes(searchValue);
        // const total_wazn = row.total_wazn && row.total_wazn.toString().toLowerCase().includes(searchValue);
        // const total_amount = row.sales_amount && row.total_amount.toString().toLowerCase().includes(searchValue);
        return company_name; // || vendore_name || total_wazn || total_amount;
    });

    // تحديد جزء البيانات للعرض (أول 50 صف فقط)
    slice_Array1 = array1.slice(0, 50);

    // ملء الجدول بالبيانات
    await fillAttendancetable();

}


async function ShowAllDataInAttendanceTable(){
    showAlert('info', 'ان ظهار كامل البيانات فى القائمة المنسدله لا يؤثر على عمليه البحث فى البيانات')
    slice_Array1 = array1.slice(); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    await fillAttendancetable()
}

async function showFirst50RowInAttendanceTable(){
    slice_Array1 = array1.slice(0,50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    await fillAttendancetable()
  
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




// async function tabble_update_btn_fn(updateBtn) {
//   const row  = updateBtn.closest("tr")

//   const production_data = {
//     h_id : row.cells[1].textContent,
//     datex : row.cells[2].textContent,
//      day : row.cells[3].textContent,
//      vendor_id : row.cells[4].textContent,
//      vendore_name : row.cells[5].textContent,
//      total_wazn : row.cells[6].textContent,
//      total_amount : row.cells[6].textContent,
//   }

//   sessionStorage.setItem('bread_update_data',JSON.stringify(production_data))
//   window.location.href = 'bread_update_ar';
// };




//#region 

//#region Add new Company

let dialogNewCompany = false  // global variable
function showDialog_new_company(title, message, icon) {
  return new Promise((resolve) => {

    dialogNewCompany = false;

      // إنشاء عنصر الـ HTML إذا لم يكن موجودًا بالفعل
      let overlay = document.getElementById('dialogOverlay');
      if (!overlay) {
          // إنشاء التراكب (overlay)
          overlay = document.createElement('div');
          overlay.id = 'dialogOverlay';
          overlay.style.display = 'none'; // يجب أن يكون مخفيًا في البداية
          document.body.appendChild(overlay);
          
          // إنشاء نافذة الحوار (dialog)
          const dialog = document.createElement('div');
          dialog.id = 'dialog';
          dialog.className = 'dialog'; // سيتم تطبيق أنماط CSS الخاصة به
          
          // إنشاء الرأس (header)
          const header = document.createElement('div');
          header.className = 'dialog_header';
          const h3 = document.createElement('h3');
          h3.id = 'dialogTitle';
          h3.className = '';
          header.appendChild(h3);
          dialog.appendChild(header);
          
          // إنشاء الجسم (body)
          const body = document.createElement('div');
          body.className = 'dialog_body';
          const input = document.createElement('input');
          input.type = 'text'; // تحديد نوع العنصر إلى نص
          input.classList.add('input_text_md'); // إضافة الفئة المعينة إلى العنصر
          input.classList.add('hover'); // إضافة الفئة المعينة إلى العنصر
          input.id = 'dialogMessage';
          body.appendChild(input);
          const i = document.createElement('i');
          i.id = 'dialogIcon';
          body.appendChild(i);
          dialog.appendChild(body);
          
          // إنشاء القدم (footer)
          const footer = document.createElement('div');
          footer.className = 'dialog_footer';
          const yesButton = document.createElement('button');
          yesButton.id = 'yesButton';
          yesButton.textContent = 'حفظ';
          yesButton.className = 'btn_save';
          const noButton = document.createElement('button');
          noButton.id = 'noButton';
          noButton.textContent = 'إنهاء';
          noButton.className = 'btn_cancel';
          footer.appendChild(yesButton);
          footer.appendChild(noButton);
          dialog.appendChild(footer);
          
          // إضافة نافذة الحوار إلى التراكب
          overlay.appendChild(dialog);
      }

      // إعداد الرأس والجسم
      document.getElementById('dialogTitle').textContent = title;
      document.getElementById('dialogMessage').textContent = message;

      // ضبط الأيقونة
      const dialogIcon = document.getElementById('dialogIcon');
      dialogIcon.className = icon;

      // عرض النافذة
      overlay.style.display = 'flex';

      // التحكم في زر "نعم"
      document.getElementById('yesButton').onclick = function() {
        showLoadingIcon(this)
        dialog.style.pointerEvents = 'none'
          // closeDialog();
          dialogNewCompany = true;
          resolve(true); // إرجاع true عند النقر على زر "نعم"
      };

      // التحكم في زر "لا"
      document.getElementById('noButton').onclick = function() {
          dialogNewCompany = false;
          closeDialog();
          resolve(false); // إرجاع false عند النقر على زر "لا"
      };
  });
}


add_new_bussnies.addEventListener('click', async function(){
    showDialog_new_company('ادخل اسم الشركة الجديده');
});

//#endregion end- add new company




//#region showReason of redirection
//! الكود دا خاص بملف ال روووتس  هو الى من خلاله بجيب القيم بتاع  سويتش كيس


  document.addEventListener('DOMContentLoaded', async function() {
       // استدعاء الدالة عندما تكتمل تحميل الصفحة
       await showFirst50RowAtTheBegening();
  });
  
  //#endregion End - showReason of redirection