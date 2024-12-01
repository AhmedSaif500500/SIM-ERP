let is_multiTaxes = false
function build_table(){
    table.querySelector('thead').innerHTML  = `
              <tr>
                <th style="width: auto;"></th>
                <th style="width: auto;">البيان</th>
                <th style="width: auto;">المعدل</th>
                <th style="width: auto;">النوع</th>
                <th style="width: auto; text-align: center;">الحساب</th>
                <th style="display: ${is_multiTaxes? 'table-cell' : 'none'}; width: auto;" class="hiddenCell"></th>
              </tr>
                
                `;
  
  }
  
  
  


  function td_EnterkeypressEvent1(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // يمنع السطر الجديد
    }
}
  



// إظهار/إخفاء القائمة

async function toggleDropdown(dropdown) {
  
  const tr = dropdown.closest('tr')
  const td = dropdown.closest("td");
  const dropdown_menue = td.querySelector(`.dropdown_menue`);
  if (dropdown_menue.style.display === "none") {
    array_accounts = data_accounts

    
    measureDistanceToBottom(td, dropdown_menue);

    await showDropdown(td, dropdown_menue);

  } else {
    measureDistanceToBottom(td, dropdown_menue);
    hideDropdown();
  }
 
  // إضافة مستمعين للأحداث مع تمرير المعاملات الصحيحة
  window.addEventListener('scroll', handleResizeOrScroll(td, dropdown_menue));
  window.addEventListener('resize', handleResizeOrScroll(td, dropdown_menue));
}


// إظهار القائمة
async function showDropdown(td, dropdown_menue) {
  hideDropdown()

  await showFirst50RowAtTheBegening_accounts_table(td);

  const dropdown_search_input = td.querySelector('.dropdown_search_input')
  dropdown_search_input.value = ""
  dropdown_menue.style.display = "block";

  handle_dropdown_row_selection(td)
}

// إخفاء القائمة
function hideDropdown() {
  try {
    const All_dropdown_menue = document.querySelectorAll(`.dropdown_menue`);
    All_dropdown_menue.forEach(dropdown_menue => {
      dropdown_menue.style.display = "none";
      const icon = dropdown_menue.closest(`td`).querySelector(`i`)
      icon.classList.add('fa-caret-down');
      icon.classList.remove('fa-caret-up');
    })
  } catch (error) {
    catch_error(error);
  }
}

let keydownHandler = null;

function handle_dropdown_row_selection(td) {
  try {
    const dropdown_search_input = td.querySelector('.dropdown_search_input');
    dropdown_search_input.focus();

    const rows = td.querySelectorAll(`.inputTable_dropdown_tableContainer table > tbody > tr`);
    if (rows.length > 0) {
      let currentIndex = 0;

      rows[currentIndex].classList.add('custom_tr_hover');

      function updateHighlight(newIndex) {
        if (newIndex >= 0 && newIndex < rows.length) {
          rows.forEach(row => row.classList.remove('custom_tr_hover'));
          currentIndex = newIndex;
          rows[currentIndex].classList.add('custom_tr_hover');
        }
      }

      // تعريف مستمع الحدث الجديد
      const newKeydownHandler = (event) => {
        switch (event.key) {
          case 'ArrowDown':
            updateHighlight(currentIndex + 1);
            event.preventDefault(); // Prevent the input cursor from moving
            break;
          case 'ArrowUp':
            updateHighlight(currentIndex - 1);
            event.preventDefault(); // Prevent the input cursor from moving
            break;
          case 'Enter':            
            if (slice_Array_accounts.length > 0) {
              const currentRow = rows[currentIndex];
              td.querySelector('.id_hidden_input').value = currentRow.cells[0].textContent;
              td.querySelector('.dropdown_select_input').textContent = currentRow.cells[1].textContent;
              hideDropdown();
            }
            break;
        }
      };

      // إزالة المستمع القديم إذا كان موجودًا
      if (keydownHandler) {
        dropdown_search_input.removeEventListener('keydown', keydownHandler);
      }

      // إضافة المستمع الجديد
      dropdown_search_input.addEventListener('keydown', newKeydownHandler);

      // تحديث المتغير لمستمع الحدث
      keydownHandler = newKeydownHandler;
    }
  } catch (error) {
    catch_error(error);
  }
}



// إظهار/إخفاء القائمة

// dropdown_select.addEventListener("click", toggleDropdown);

// إخفاء القائمة عند فقدان التركيز
document.addEventListener("click", (event) => {
  // console.log('Clicked element:', event.target);
  const classesToCheck = ['dropdown_select_input_table', 'dropdown_menue', 'dropdown_search_input'];

  const clickedInside = classesToCheck.some(className => {
    return event.target.classList.contains(className) || event.target.closest(`.${className}`);
  });

  if (!clickedInside) {
    hideDropdown();
  }
});


// إخفاء القائمة عند الضغط على مفتاح الهروب
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideDropdown();
  }
});


//#region  جعل القائمه تفتح الى اعلى او لاسفل حسب الافضل
function measureDistanceToBottom(td, dropdown_menue) {
  const dropdown_container = td.querySelector('.dropdown_container_input_table'); // el main container
  
  const icon = dropdown_container.querySelector('i'); // تعديل هذا السطر للتأكد من العثور على العنصر الصحيح

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

  if (distanceToBottomRem < 21) { // 5aleh nafs rl hight beta3 el drop_menue + 1
    icon.classList.remove('fa-caret-down');
    icon.classList.add('fa-caret-up');
    dropdown_menue.classList.add("dropdown_menue_Open_top");
    dropdown_menue.classList.remove("dropdown_menue_Open_bottom");
  } else {
    icon.classList.add('fa-caret-down');
    icon.classList.remove('fa-caret-up');
    dropdown_menue.classList.add("dropdown_menue_Open_bottom");
    dropdown_menue.classList.remove("dropdown_menue_Open_top");
  }
}

// دالة مغلفة لتمرير المعاملات الصحيحة عند حدوث التمرير أو تغيير حجم الشاشة
function handleResizeOrScroll(td, dropdown_menue) {
  return function () {
    measureDistanceToBottom(td, dropdown_menue);
  };
}


//#region accounts Data in dropdown select
let data_accounts = [];
let data_filterd = []
let array_accounts = [];
let slice_Array_accounts = [];


// تحضير البيانات من السيرفر
async function getAccounsData_fn() {

  data_accounts = await new_fetchData_postAndGet(
    "/getAccountsDataForTaxesAdd",
    {},
    'pass', 'pass',
    15,
    false,false,
    true,
    false,false,
    false,false,
    false,false,false,
    true,"transaction_view_ar",
    "An error occurred (Code: TAA1). Please check your internet connection and try again; if the issue persists, contact the administrators."
  )


};




async function showFirst50RowAtTheBegening_accounts_table(td) {
  slice_Array_accounts = array_accounts.slice(0, 50);
  fillAccountstable(td)
}



async function fillAccountstable(td) {

  //  @@ هاااااام جدا 
  // el properties beta3 kol 3amod ytm wad3ha fe el <thead></thead> And <tbody></tbody> And <tfoor></tfoor> kol wa7ed lewa7do
  // el properties hya :
  // 1 : display: none; > fe 7alt enak ardt e5fa2 el 3amod -- display: ; hatspha fadya fe7alt enak ardt tezhr el 3amod
  // 2 : white-space: nowrap;  fe 7alt enak ardt en el text maylfsh ta7t ba3do  -- white-space: wrap; fe 7alt enak ardt en el tezt ylf
  // 3 : width: auto;  fe 7alt enak ardt en ykon 3ard el 3amod 3ala ad el mo7tawa -- width: 100%; fe 7alt enak ardt en el 3amod ya5od ba2y el mesa7a el fadla
  // 4 : text-align: center / left / right / justify   da 3ashan tet7km fe el text ymen wala shemal wala fe ele nos

  // إعداد رأس الجدول
  let tableHTML = `<table id="accounts_table" class="inputTable_dropdown_table">
                        <tbody>`;

  // إضافة صفوف الجدول بناءً على البيانات
  // slice_Array_accounts = ""; // تفريغ المصفوفه
  slice_Array_accounts.forEach(row => {
    tableHTML += `<tr onclick="selectedRow(this)">
                          <td style="display: none;" >${row.id}</td>
                          <td style="width: auto;">${row.account_name}</td>
                        </tr>`;
  });

  tableHTML += `</tbody>
      <tfoot> 
      <!--
          <tr class="table_totals_row">
              <td id="tfooter1" style="display: none;"></td>
              <td id="tfooter2" style="display: none;"></td>
          </tr>
        -->
          <tr id="table_fotter_buttons_row">
              <td colspan="2">  <!-- da awel 3amod fe ele sad tr han7othan5elh han3mel merge lkol el columns fe column wa7ed 3ashan n7ot el 2 buttons hat3mel colspan le3add el 3awamed kolaha -->
                  <div class='flex_H'>
                      <button class="table_footer_show_data"  id="w1" onclick="ShowAllDataInAccountsTable(this)">All</button>
                      <button class="table_footer_show_data"  id="w2" onclick="showFirst50RowInAccountsTable(this)">50</button>
                  </div>
              </td>
          </tr>

      </tfoot>`;


  // إغلاق الجدول
  tableHTML += '</table>';

  // تحديث محتوى الصفحة بناءً على البيانات
  td.querySelector('.inputTable_dropdown_tableContainer').innerHTML = tableHTML;



  //! get width of
  //  عمليات صف الاجمالى 
  // جمع القيم في العمود رقم 6


  // document.getElementById("tFooter6").textContent = totalColumn_Valuu;
  // document.getElementById("tfooter1").textContent = slice_Array_accounts.length; //  عدد الصفوف

  // hide footer btn if rows < 50
  if (array_accounts.length > 0 && array_accounts.length <= 50) {
    td.querySelector('#table_fotter_buttons_row').style.display = "none";
  } else if (array_accounts.length < 1) {
    td.querySelector('#table_fotter_buttons_row').innerHTML = `<td colspan='2' class="td_no_result">لا نتائج</td>`;
  };


};

// search in effectsTable
async function performSearch_accounts_table(input) {

  const td = input.closest("td")
  // الحصول على قيمة البحث
  // const searchValue = document.querySelector('#dropdown_search_input').value.trim().toLowerCase();
  const searchValue = td.querySelector('.dropdown_search_input').value.trim().toLowerCase();


  // فلترة البيانات بناءً على قيمة البحث
  array_accounts = data_filterd.filter(row => {

    // التحقق من أن employee.id و employee.name ليستان فارغتين
    // const idMatch = row.id && row.id.toString().toLowerCase().includes(searchValue);
    const nameMatch = row.account_name && row.account_name.toString().toLowerCase().includes(searchValue);
    return nameMatch // || nameMatch;
  });

  slice_Array_accounts = array_accounts.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  await fillAccountstable(td)
  if (slice_Array_accounts.length > 0) {
    handle_dropdown_row_selection(td);
  }
}



async function ShowAllDataInAccountsTable(button) {
  const td = button.closest("td");
  showAlert('info', 'ان ظهار كامل البيانات فى القائمة المنسدله لا يؤثر على عمليه البحث فى البيانات')
  slice_Array_accounts = array_accounts.slice(); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  await fillAccountstable(td)

};

async function showFirst50RowInAccountsTable(button) {
  const td = button.closest("td")
  slice_Array_accounts = array_accounts.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  await fillAccountstable(td)
};

function selectedRow(row) {
  const td = row.closest("td")

  td.querySelector('.id_hidden_input').value = row.cells[0].textContent; // row.id
  td.querySelector('.dropdown_select_input').textContent = row.cells[1].textContent; // row.employee_name
  hideDropdown();
};

//#endregion


