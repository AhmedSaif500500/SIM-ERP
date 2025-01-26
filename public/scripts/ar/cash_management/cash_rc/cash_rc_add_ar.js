setActiveSidebar('cashMain_view_ar');
pagePermission("add","cash_transaction_permission");


const date1 = document.querySelector('#date1'); date1.value = today
const note_inpute = document.querySelector(`#note_inpute`);
const btn_newRow = document.querySelector(`#btn_newRow`);
const table = document.querySelector(`#myTable`);

date1.value = today


async function save(A_OR_B) {

  const datex = date1.value;
    
  const total = parseFloat(document.querySelector(`#myTable #totalValue`).textContent)
  const main_account = document.querySelector(`#dropdown_div1_hidden_input`).value
  const general_note = note_inpute.value

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

      const note_row = row.querySelector(`.td_row_note`).textContent; // الوصول لمحتوى الخليه فى العاممود رقم 3 داخل الصف
      const value = parseFloat(row.querySelector(`.td_value`).textContent || 0); // لو ملقاش قيمه يعتبرها صفر
      if (value <= 0) {
        showAlert(`warning`, `برجاء ادخال القيمه بشكل صحيح فى السطر رقم ${index}`);
        return;
      }
      // انشاء اوبجيكت لوضع بيانات الخلايا فيه  ثم اضافة الاوبجيكت الى عناصر المصفوفه الفارغه
      const rowData = {
        account_typeId :account_typeId,
        account_id: account_id,
        note_row: note_row,
        value: value
      };
      posted_array.push(rowData); // اضافة الاوبجيكت الى عناصر المصفوفه
      index++;
    }

    const redirectionPage =  A_OR_B == 'A' ? 'cash_rc_view_ar' : 'cash_rc_add_ar';

      const post = await new_fetchData_postAndGet(
        "/api/cash_rc_add",
        {main_account, total, datex, general_note, posted_array},
        'cash_transaction_permission', 'add',
        50,
        true,"هل تريد حفظ بيانات سند القبض ؟",
        true,
        false,false,false,false,false,
        true,redirectionPage,
        false,false,
         "An error occurred (Code: TAA2). Please check your internet connection and try again; if the issue persists, contact the administrators."
      
      )

    if(post){
      sessionStorage.removeItem('cash_rc_ViewArray')
    }

  } else {
    showAlert('fail', 'لا توجد بيانات')
    return
  }
}



document.addEventListener('DOMContentLoaded', async function () {
  try {
  showLoadingIcon(content_space)
  data_accounts = await getAccounsData_fn() // *
  await get_accounts_type()
  build_table()
  addRow()
  makeTableRowsDraggable('myTable'); // make sure that the table already loaded
  hideLoadingIcon(content_space)
} catch (error) {
  hideLoadingIcon(content_space)
  catch_error(error)
}
})
