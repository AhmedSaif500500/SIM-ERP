setActiveSidebar('general_settings_ar');
 pagePermission("view","transaction_permission");

const obj_settings_tax_view = JSON.parse(sessionStorage.getItem('obj_settings_tax_view'));
sessionStorage.removeItem(`obj_settings_tax_view`)

if (!obj_settings_tax_view){
    redirection("settings_taxes_view_ar","fail","حدث خطأ اثناء معالجة البيانات سيتم تحويل الى صفحه الرمز الضريبية الرئيسية")
}

const obj_settings_tax_update = {pageName : 'settings_taxes_update_ar'}

const encodedData = encodeURIComponent(JSON.stringify(obj_settings_tax_update));
back_href.href = `settings_taxes_view_ar?data=${encodedData}`




const inactive_select = document.querySelector(`#inactive_select`);
const btn_newRow = document.querySelector(`#btn_newRow`);
const lbl_tax_name_input = document.querySelector(`#lbl_tax_name_input`);
const tax_name_input = document.querySelector(`#tax_name_input`);
const table = document.querySelector(`#myTable`);
let tableBody = table.querySelector(`tbody`);
const btn_update = document.querySelector(`#btn_update`);
const btn_delete = document.querySelector(`#btn_delete`);






let data = [];
let array1 = [];
let slice_Array1 = [];


async function getTaxesData_fn() {

  const x =  obj_settings_tax_view.x

  if (!x){
    redirection(`settings_taxes_view_ar`,'fail','حدث خطأ اثناء معالجه البيانات سيتم توجيهك الى صفحه الرموز الضريبيه الرئيسية')
    return
  }

  data = await new_fetchData_postAndGet(
    "/get_settings_update_Data",
    {x},
    'pass','pass',
    15,
    false,"",
    true,
    true,content_space,
    false,false,false,
    false,false,
    // true,"settings_taxes_view_ar",
    false,false,
    "حدث خطأ اثناء معالجة البيانات"
  )

  filleffectstable()    
  };
  
  async function showData(){
    tax_name_input.value = obj_settings_tax_view.taxe_package_name
    inactive_select.value = obj_settings_tax_view.is_inactive === 'نشط' ? 0 : 1;
    active_color(inactive_select)
  
    await getTaxesData_fn()
  }
  

  function filleffectstable() {
    try {

    //  @@ هاااااام جدا
    // el properties beta3 kol 3amod ytm wad3ha fe el <thead></thead> And <tbody></tbody> And <tfoor></tfoor> kol wa7ed lewa7do
    // el properties hya :
    // 1 : style="display: none;" > fe 7alt enak ardt e5fa2 el 3amod -- display: ; hatspha fadya fe7alt enak ardt tezhr el 3amod style="display: ;"
    // 2 : white-space: nowrap;  fe 7alt enak ardt en el text maylfsh ta7t ba3do  -- white-space: wrap; fe 7alt enak ardt en el tezt ylf
    // 3 : width: auto;  fe 7alt enak ardt en ykon 3ard el 3amod 3ala ad el mo7tawa -- width: 100%; fe 7alt enak ardt en el 3amod ya5od ba2y el mesa7a el fadla
    // 4 : text-align: center / left / right / justify   da 3ashan tet7km fe el text ymen wala shemal wala fe ele nos
  
    // إعداد رأس الجدول
    tableBody.innerHTML = ""; // تأكد من تفريغ محتوى tbody قبل إضافة الصفوف

    

    // إضافة صفوف الجدول بناءً على البيانات
    // slice_Array1 = ""; // تفريغ المصفوفه
    data.forEach((row) => {

        
      const newTr =
       `
        <tr class="mainTr">
                <td style="width: auto;" class="">
                  <div class="dragbutton_table">
                    <button class="drag-handle">
                      <i class="fa-solid fa-arrows-up-down" style=" pointer-events: none;"></i>
                    </button>
                  </div>
                </td>

                <td>
                 <input type="hidden" class="rowId x1 T" id="" readonly>
                  <div class="div_input_md hover scroll XDesc T" style="max-width: 20rem; min-width: 17rem; width: fit-content" contenteditable="true" oninput="check_parse(this,'string')"></div>
                </td>

                <td>
                  <div class="td_rate row h_full">
                    <div class="div_input_sm hover h_full scroll Xrate T" contenteditable="true" oninput="check_parse(this,'number')" onkeydown="td_EnterkeypressEvent1(event)"></div>
                    <span class="span_end h_full class_unite">%</span>
                    </div>
                </td>

                <td>
                  <select name="" id="" class="account_type select h_full">
                    <option value="1">إضافة</option>
                    <option value="2">خصم</option>
                  </select>
                </td>

                  <!-- dropdown -->
                  <td style="width: auto; height: var(--input_height);" class="td_account">
                    <div class="dropdown_container_input_table" id="">
                      <div class="row h_full">
                        <div class="dropdown_select_input_table" id=""  onclick="fill_filtered_data_accounts_Array(event)"  style="min-width: 10rem;">
                          <div id="" class="dropdown_select_input T hover"></div>
                          <i class="fa-solid fa-caret-down left_icon"></i>
                          <i class="fa-solid fa-xmark clear_icon" style="display: none;" onclick="clear_icon_on_table_td(event)"></i>
                          <input type="hidden" class="id_hidden_input x1 T" id="" readonly>
                        </div>
                    </div>
                      <div class="dropdown_menue hover scroll" id="" style="display: none;">
                        <div class="dropdown_search">
                          <input type="search" class="dropdown_search_input hover" id="" placeholder="ابحث هنا..."
                            oninput="tableDropdownList_performSearch(this)" autocomplete="off">
                        </div>
                        <div class="inputTable_dropdown_tableContainer scroll" id="">
                          <!-- قائمة الخيارات تظهر هنا -->
                        </div>
                      </div>
                    </div>
                  </td>


                <td style="display: ${is_multiTaxes? 'table-cell' : 'none'}; width: auto;" class="hiddenCell">
                  <div class="table_buttons_div">
                    <button onclick="deleteRow(this)" title="حذف الصف"><i class="fa-solid fa-xmark"></i></button>
                    <button onclick="copyRow(this)" title="نسخ الصف"><i class="fa-regular fa-copy"></i></button>
                  </div>
                </td>

  
        </tr>`;

        tableBody.insertAdjacentHTML('beforeend', newTr);
        const tr = tableBody.querySelector(`tr:last-child`)
        handleCurrentTr(row,tr)
    });
  
          
  } catch (error) {
    catch_error(error)
  } 
  }
  
  function handleCurrentTr(row,tr){
    
    

    const select_accountTpe = tr.querySelector(`.account_type`);
    const XDesc = tr.querySelector(`.XDesc`);
    const id_hidden_input = tr.querySelector(`.id_hidden_input`);
    const dropdown_search_input = tr.querySelector(`.dropdown_select_input`);
    const Xrate = tr.querySelector(`.td_rate .Xrate`);
    const rowId = tr.querySelector(`.rowId`);


    select_accountTpe.value = row.is_tax_reverse? 2 : 1
    Xrate.textContent = row.tax_rate || '' //
    id_hidden_input.value = row.tax_account_id;
    dropdown_search_input.textContent = row.account_name;
    XDesc.textContent = row.tax_name;
    rowId.value = row.id;

  }
  //-------------------------------------------------------

let is_multiTax = true

inactive_select.onchange = function(){
  active_color(inactive_select)
}



btn_update.onclick = async function () {
  
  const tax_package_name = tax_name_input.value.trim()
  const inactive_select_val = inactive_select.value
  const header_Id = obj_settings_tax_view.x

  if (!tax_package_name || tax_package_name === '') {
   showAlert(`warning`, 'ادخل اسم الضريبة')
   return;
 }

 //preparing bread_body Data
 const tableRows = document.querySelectorAll('#myTable > tbody > tr');

 const posted_array = []; // انشاء مصفوفه جديده اضع فيها بيانات كل صف
 if (tableRows.length > 0) { // التأكد من وجود بيانات داخل المصفوفه اولا


   for (const row of tableRows) {
     const rowId = row.children[1].querySelector('.rowId').value;
     const Desc = row.children[1].querySelector('.XDesc').textContent.trim();
     const rate = +row.children[2].querySelector('.Xrate').textContent;
     const reverse_type = +row.children[3].querySelector('.account_type').value;
     const account_id = +row.children[4].querySelector('.id_hidden_input').value;

     if (isNaN(account_id)) {
       showAlert(`warning`, 'توجد صفوف لا تحتوى على حساب')
       return;
     }

     // انشاء اوبجيكت لوضع بيانات الخلايا فيه  ثم اضافة الاوبجيكت الى عناصر المصفوفه الفارغه
     const rowData = {
       rowId: rowId,
       Desc :Desc,
       rate: rate,
       reverse_type: reverse_type,
       account_id: account_id,
     };
     posted_array.push(rowData); // اضافة الاوبجيكت الى عناصر المصفوفه
   }

     const post = await new_fetchData_postAndGet(
       "/api/tax_update",
       {header_Id, tax_package_name, inactive_select_val, posted_array },
       'pass', 'pass',
       15,
       true,"هل تريد تعديل البيانات ؟",
       true,
       false,false,false,false,false,
       true,"settings_taxes_view_ar",
       false,false,
        "An error occurred (Code: TAA2). Please check your internet connection and try again; if the issue persists, contact the administrators."
     )

   if (post){
     sessionStorage.removeItem('settings_taxes_ViewArray')
   }



  } else {
    showAlert('fail', 'لا توجد بيانات')
    return
  }
}



btn_delete.onclick = async function () {
  

  const header_Id = obj_settings_tax_view.x

  if (!header_Id || isNaN(header_Id)) {
   redirection('settings_taxes_view_ar','fail','حدث خطأ اثناء معالجه لبيانات')
   return;
 }

 //preparing bread_body Data
 const tableRows = document.querySelectorAll('#myTable > tbody > tr');

 const posted_array = []; // انشاء مصفوفه جديده اضع فيها بيانات كل صف
 if (tableRows.length > 0) { // التأكد من وجود بيانات داخل المصفوفه اولا


   for (const row of tableRows) {
     const rowId = row.children[1].querySelector('.rowId').value;


     if (isNaN(rowId)) {
       showAlert(`warning`, 'توجد صفوف لا تحتوى على حساب')
       redirection(`settings_taxes_view_ar`, 'fail', 'حدث خطأ اثناء معالجة البيانات',)
       return;
     }

     // انشاء اوبجيكت لوضع بيانات الخلايا فيه  ثم اضافة الاوبجيكت الى عناصر المصفوفه الفارغه
     const rowData = {
       rowId: rowId
     };
     posted_array.push(rowData); // اضافة الاوبجيكت الى عناصر المصفوفه
   }

     const post = await new_fetchData_postAndGet(
       "/api/tax_delete",
       {header_Id, posted_array },
       'pass', 'pass',
       15,
       true,"هل تريد حذف البيانات ؟",
       true,
       false,false,false,false,false,
       true,"settings_taxes_view_ar",
       false,false,
        "An error occurred (Code: TAA2). Please check your internet connection and try again; if the issue persists, contact the administrators."
     )

   if (post){
     sessionStorage.removeItem('settings_taxes_ViewArray')
   }



  } else {
    showAlert('fail', 'لا توجد بيانات')
    return
  }
}

document.addEventListener('DOMContentLoaded', async function () {
  try {
  showLoadingIcon(content_space)
  await getAccounsData_fn() // *
  build_table()
  await showData()

  makeTableRowsDraggable('myTable'); // make sure that the table already loaded
  viewMode(true,'transaction_permission','view')
  handle_fn_options()
  hideLoadingIcon(content_space)
} catch (error) {
  hideLoadingIcon(content_space)
  catch_error(error)
}
})

// معلق صلاحيات
function handle_fn_options(){
  const newDivs = `
    <div id="fn_option_update_btn" onclick="viewMode(false,'transaction_permission','update')">وضع التعديل</div>
    <div id="fn_option_view_btn" onclick="viewMode(true,'transaction_permission','view')" style="display: none;">وضع العرض</div>
  `;
  fn_options_div.insertAdjacentHTML('afterbegin', newDivs);
}
