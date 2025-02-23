setActiveSidebar('itemsMain_view_ar');
pagePermission("add","production_permission");


const production_forms_update_data = JSON.parse(sessionStorage.getItem('production_forms_update_data'));
// sessionStorage.removeItem(`purshases_invoice_update_data`)

if (!production_forms_update_data){
    redirection("production_forms_view_ar","fail","حدث خطأ اثناء معالجة البيانات سيتم تحويل الى صفحه نماذج التصنيع الرئيسية")
}

let href_pageName = 'productionMain_view_ar'
let href_pageTitle = 'إدارة التصنيع'

if (production_forms_update_data && production_forms_update_data.href_pageName){
  href_pageName = production_forms_update_data.href_pageName
  href_pageTitle = production_forms_update_data.href_pageTitle
}

back_href.href = href_pageName
back_href.title = href_pageTitle


const btn_newRow = document.querySelector(`#btn_newRow`);
const btn_update = document.querySelector('#btn_update');
const btn_delete = document.querySelector('#btn_delete');
const table = document.querySelector(`#myTable`);
let tableBody = table.querySelector(`tbody`);
let tableTfoot = table.querySelector(`tfoot`);


btn_update.onclick = async function() {
try {
  const x = data_accounts.headerData_array.id;
  const account_no = account_no_input.value.trim()
  const form_name = form_name_input.value.trim();
  const amount = amount_input.value;

  const item_account = document.querySelector(`#dropdown_div1_hidden_input`).value
  const location_account = document.querySelector(`#dropdown_div2_hidden_input`).value
 
  if (!form_name || form_name === ''){
    showAlert('warning', 'برجاء ادخال اسم النموذج بشكل صحيح')
    return
  }
  if (!item_account){
    showAlert('warning', 'برجاء اختيار الصنف منتهى التصنيع بشكل صحيح')
    return
  }

  if (!amount || isNaN(amount)){
    showAlert('warning', 'برجاء ادخال الكميه المُصنعة بشكل صحيح')
    return
  }

  if (!location_account || isNaN(location_account)){
    showAlert('warning', 'برجاء اختيار موقع المخزون  بشكل صحيح')
    return
  }

  const tableRows = document.querySelectorAll('#myTable > tbody > tr');

  const posted_array = []; // انشاء مصفوفه جديده اضع فيها بيانات كل صف
  if (tableRows.length > 0) { // التأكد من وجود بيانات داخل المصفوفه اولا

    let index = 1
    for (const row of tableRows) {
      const account_typeId = parseInt(row.querySelector('.td_account_type .account_type').value);
      const account_id = parseInt(row.querySelector('.td_account .id_hidden_input').value);
      
      if (isNaN(account_id)) {
        showAlert(`warning`, `برجاء اختيار الحساب بشكل صحيح فى السطر رقم ${index}`)
        return;
      }

      const amount = parseFloat(row.querySelector(`.Xitem_amount`).textContent || 0); // لو ملقاش قيمه يعتبرها صفر
      if (amount <= 0) {
        showAlert(`warning`, `برجاء ادخال القيمه بشكل صحيح فى السطر رقم ${index}`);
        return;
      }
      // انشاء اوبجيكت لوضع بيانات الخلايا فيه  ثم اضافة الاوبجيكت الى عناصر المصفوفه الفارغه
      const rowData = {
        account_typeId :account_typeId,
        account_id: account_id,
        amount: amount
      };
      posted_array.push(rowData); // اضافة الاوبجيكت الى عناصر المصفوفه
      index++;
    }

      const post = await new_fetchData_postAndGet(
        "/api/production_forms_update",
        {x, account_no, form_name, amount, item_account,location_account, posted_array},
        'production_permission', 'update',
        60,
        true,"هل تريد تحديث بيانات نموذج التصنيع؟ ",
        true,
        false,false,
        false,false,false,
        true,href_pageName,
        true,href_pageName,
         "An error occurred (Code: TAA2). Please check your internet connection and try again; if the issue persists, contact the administrators."
      
      )

  } else {
    showAlert('fail', 'لا توجد بيانات')
    return
  }

} catch (error) {
  catch_error(error)
}
}



btn_delete.onclick = async function() {
  try {
    const x = data_accounts.headerData_array.id;

        const post = await new_fetchData_postAndGet(
          "/api/production_forms_delete",
          {x},
          'production_permission', 'delete',
          60,
          true,"هل تريد حذف بيانات نموذج التصنيع؟ ",
          true,
          false,false,
          false,false,false,
          true,href_pageName,
          true,href_pageName,
           "An error occurred (Code: TAA2). Please check your internet connection and try again; if the issue persists, contact the administrators."
        
        )
  

  
  } catch (error) {
    catch_error(error)
  }
  }
  

//!----------------------------------------------------------------------------


function showHeaderData(header){  
  account_no_input.value = header.account_no;
  form_name_input.value = header.form_name;
  amount_input.value = +header.value === 0 ? '' : +header.value;
}


document.addEventListener('DOMContentLoaded', async function () {
try {
  showLoadingIcon(content_space)
  const x = production_forms_update_data.x
  data_accounts = await getAccounsData_fn(x) // *


  if (!data_accounts || !data_accounts.accounts_data_array || !data_accounts.location_accounts_array || !data_accounts.headerData_array || data_accounts.bodyData_array.length === 0){
    redirection('production_forms_view_ar', `fail`, `حدث خطأ اثناء معالجة البيانات : سيتم تحويلك الى صفحه نماذج التصنيع الرئيسيه`)
  }

  showHeaderData(data_accounts.headerData_array)
  build_table()
  fillBodyTable()

  viewMode(true,'production_forms_permission','view')
  handle_fn_options()
  makeTableRowsDraggable('myTable'); // make sure that the table already loaded
  hideLoadingIcon(content_space)         
} catch (error) {
    hideLoadingIcon(content_space)
    catch_error(error)
}
})


function handle_fn_options(){  
  const newDivs = `
    <div id="fn_option_update_btn" onclick="viewMode(false,'production_forms_permission','update')">وضع التعديل</div>
    <div id="fn_option_view_btn" onclick="viewMode(true,'production_forms_permission','view')" style="display: none;">وضع العرض</div>
  `;
  fn_options_div.insertAdjacentHTML('afterbegin', newDivs);
}


