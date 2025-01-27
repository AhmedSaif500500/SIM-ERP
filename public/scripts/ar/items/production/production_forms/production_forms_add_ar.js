setActiveSidebar('itemsnMain_view_ar');
pagePermission("add","production_permission");


const btn_newRow = document.querySelector(`#btn_newRow`);
const table = document.querySelector(`#myTable`);


async function save(A_OR_B) {

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

  //preparing bread_body Data
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

    const redirectionPage =  A_OR_B == 'A' ? 'production_forms_view_ar' : 'production_forms_add_ar';

      const post = await new_fetchData_postAndGet(
        "/api/production_forms_add",
        {account_no, form_name, amount, item_account,location_account, posted_array},
        'production_permission', 'add',
        50,
        true,"هل تريد حفظ بيانات نموذج التصنيع؟ ؟",
        true,
        false,false,false,false,false,
        true,redirectionPage,
        false,false,
         "An error occurred (Code: TAA2). Please check your internet connection and try again; if the issue persists, contact the administrators."
      
      )

    if(post){
      sessionStorage.removeItem('production_forms_ViewArray')
    }

  } else {
    showAlert('fail', 'لا توجد بيانات')
    return
  }
}



document.addEventListener('DOMContentLoaded', async function () {
  try {
  showLoadingIcon(content_space)
  data_accounts = await getAccounsData_fn(false) // *
  build_table()
  addRow()
  makeTableRowsDraggable('myTable'); // make sure that the table already loaded
  hideLoadingIcon(content_space)
} catch (error) {
  hideLoadingIcon(content_space)
  catch_error(error)
}
})
