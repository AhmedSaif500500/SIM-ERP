setActiveSidebar('salesMain_view_ar');
pagePermission("add","sales_invoice_permission");


 date1.value = today
// const is_RowNote_checkBox = document.querySelector(`#is_RowNote_checkBox`); //!  already in sales_qutation_multi_pages
// const is_RowDiscount_checkBox = document.querySelector(`#is_RowDiscount_checkBox`); //!  already in sales_qutation_multi_pages
const btn_newRow = document.querySelector(`#btn_newRow`);
const table = document.querySelector(`#myTable`);


date1.value = today


async function save(A_OR_B) {
try {
  
  const datex = date1.value;
  const startDate = start_date_input.value;
  const endDate = end_date_input.value;
  const note = note_inpute.value.trim()
  
  const tableRows = document.querySelectorAll('#myTable > tbody > .mainTr');

  const posted_array = []; 
  if (tableRows.length > 0) { 
    let currentIndex = 1;
    for (const row of tableRows) {
      
      const account_id = parseInt(row.querySelector('.id_hidden_input').value);
      const depreciation_value = row.querySelector('.td-value').textContent;
      

      if (!account_id ||isNaN(account_id)) {
        showAlert(`warning`, `يرجى تحديد الاصل فى السطر رقم ${currentIndex}`)
        return;
      }

      if (!depreciation_value || isNaN(depreciation_value)){
        showAlert(`warning`, ` يرجى تحديد فيمة الاهلاك فى السطر رقم ${currentIndex}`)
        return;
      }

      // انشاء اوبجيكت لوضع بيانات الخلايا فيه  ثم اضافة الاوبجيكت الى عناصر المصفوفه الفارغه
      const rowData = {
        account_id :account_id,
        depreciation_value: depreciation_value,
      };
      posted_array.push(rowData); // اضافة الاوبجيكت الى عناصر المصفوفه
      currentIndex++; // زيادة العدّاد بعد كل تكرار
    }

    const posted_Obj = {datex, startDate, endDate, note, posted_array}

    const redierction_page = A_OR_B == 'A' ? 'accumulated_depreciation_view_ar ' : 'accumulated_depreciation_add_ar'

      const post = await new_fetchData_postAndGet(
        "/api/accumulated_depreciation_add",
        posted_Obj,
        'accumulated_depreciation_permission', 'add',
        60,
        true,"هل تريد حفظ بيانات إهلاكات الاصول الثابتة؟",
        true,
        false,false,false,false,false,
        true,redierction_page,
        false,false,
         "An error occurred (Code: TAA2). Please check your internet connection and try again; if the issue persists, contact the administrators."
      )

    if (post){
      sessionStorage.removeItem('accumulated_depreciation_ViewArray') 
    }
    
  } else {
    showAlert('fail', 'لا توجد بيانات')
    return
  }
} catch (error) {
  catch_error(error)
}
}



document.addEventListener('DOMContentLoaded', async function () {
  try {

  showLoadingIcon(content_space)
    Data =  await get_fixed_assests_accumulated_accounts()
    assestsAccountsArray =  Data.fixedAssestsAccounts;
 
  
      if (!Data || !assestsAccountsArray){
        await redirection('accumultated_depreciation_view_ar','fail','حدث خطأ اثتاء معالجه البيانات')
        return
      }

      // await get_items_locations()
      build_table()
      addRow(assestsAccountsArray) //! mtnsash te3del el addRow beta3 el zeror ely fe el table fe ele Buld_table() 5od de copy 7otaha henak
                
  //makeTableRowsDraggable('myTable'); // make sure that the table already loaded
  hideLoadingIcon(content_space)
} catch (error) {
  hideLoadingIcon(content_space)
  catch_error(error)
}
})
