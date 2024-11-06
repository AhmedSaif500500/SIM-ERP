setActiveSidebar('bread_view_ar');
pagePermission("transaction_permission", "add");


const date1 = document.querySelector('#date1');
const note_inpute = document.querySelector(`#note_inpute`);
const btn_newRow = document.querySelector(`#btn_newRow`);
const table = document.querySelector(`#myTable`);

date1.value = today


async function save(A_OR_B) {

  const difference_debet_cerdit = parseFloat(document.querySelector(`#myTable > tfoot #difference_debet_cerdit`).textContent)
  if (difference_debet_cerdit !== 0) {
    showAlert(`warning`, 'القيد غير متوازن');
    return
  }

  const datex = date1.value;
  
  const total = parseFloat(document.querySelector(`#myTable > tfoot .table_total_row #totalDebit`).textContent)


  const general_note = note_inpute.value

  //preparing bread_body Data
  const tableRows = document.querySelectorAll('#myTable > tbody > tr');

  const posted_array = []; // انشاء مصفوفه جديده اضع فيها بيانات كل صف
  if (tableRows.length > 0) { // التأكد من وجود بيانات داخل المصفوفه اولا


    for (const row of tableRows) {
      const account_typeId = parseInt(row.children[1].querySelector('.account_type').value);
      const account_id = parseInt(row.children[2].querySelector('.id_hidden_input').value);

      if (isNaN(account_id)) {
        showAlert(`warning`, 'توجد صفوف لا تحتوى على حساب')
        return;
      }

      const note_row = row.children[3].textContent; // الوصول لمحتوى الخليه فى العاممود رقم 3 داخل الصف
      const debt = parseFloat(row.children[4].textContent || 0); // لو ملقاش قيمه يعتبرها صفر
      const credit = parseFloat(row.children[5].textContent || 0); // لو ملقاش قيمه يعتبرها صفر
      const item_amount = parseFloat(row.children[2].querySelector('.Xitem_amount').textContent || 0)
      const items_locations_select = row.children[2].querySelector('.items_locations_select').value

      if (debt < 0 || credit < 0) {
        showAlert(`warning`, `لا يمكن ادخل قيمه بالسالب فى القيد`);
        return;
      }
      // انشاء اوبجيكت لوضع بيانات الخلايا فيه  ثم اضافة الاوبجيكت الى عناصر المصفوفه الفارغه
      const rowData = {
        account_typeId :account_typeId,
        account_id: account_id,
        note_row: note_row,
        debt: debt,
        credit: credit,
        item_amount: item_amount,
        items_location_id: items_locations_select,
      };
      posted_array.push(rowData); // اضافة الاوبجيكت الى عناصر المصفوفه
    }

    if (A_OR_B == 'B'){
      const post = await new_fetchData_postAndGet(
        "/api/transaction_add",
        { total, datex, general_note, posted_array },
        'transaction_permission', 'add',
        15,
        true,"هل تريد حفظ البيانات ؟",
        true,
        false,false,false,false,false,
        true,"transaction_add_ar",
        false,false,
         "An error occurred (Code: TAA2). Please check your internet connection and try again; if the issue persists, contact the administrators."
      )

    if (post){
      sessionStorage.removeItem('transactionViewArray')
    }
    
    }else{

    const post = await new_fetchData_postAndGet(
      "/api/transaction_add",
      { total, datex, general_note, posted_array },
      'transaction_permission', 'add',
      15,
      true,"هل تريد حفظ البيانات ؟",
      true,
      false,false,false,false,false,
      true,"transaction_view_ar",
      false,false,
       "An error occurred (Code: TAA2). Please check your internet connection and try again; if the issue persists, contact the administrators."
    )

    if (post){
      sessionStorage.removeItem('transactionViewArray')
    }
    
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
  await get_accounts_type()
  await get_items_locations()
  build_table()
  addRow()
  addRow()
  makeTableRowsDraggable('myTable'); // make sure that the table already loaded
  hideLoadingIcon(content_space)
} catch (error) {
  hideLoadingIcon(content_space)
  catch_error(error)
}
})
