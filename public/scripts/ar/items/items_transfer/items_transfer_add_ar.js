setActiveSidebar('itemsMain_view_ar');
pagePermission("add","items_transfer_permission");



 date1.value = today
// const is_RowNote_checkBox = document.querySelector(`#is_RowNote_checkBox`); //!  already in sales_qutation_multi_pages
// const is_RowDiscount_checkBox = document.querySelector(`#is_RowDiscount_checkBox`); //!  already in sales_qutation_multi_pages
const btn_newRow = document.querySelector(`#btn_newRow`);
const table = document.querySelector(`#myTable`);


date1.value = today


async function save(A_OR_B) {
try {
  
  const datex = date1.value;
  const note = note_inpute.value.trim()
  const location_from = document.querySelector(`#dropdown_div1_hidden_input`).value 
  const location_to = document.querySelector(`#dropdown_div2_hidden_input`).value 
  
  if (!location_from || !location_to) {
    showAlert(`warning`, `يرجى تحديد مواقع المخزون بشكل صحيح`)
    return;
  }

  const tableRows = document.querySelectorAll('#myTable > tbody > .mainTr');

  const posted_array = []; 
  if (tableRows.length > 0) { 
    let currentIndex = 1;
    for (const row of tableRows) {
      
      const rowAccountId = parseInt(row.querySelector('.id_hidden_input').value);
      const rowNote = row.querySelector('.inputTable_noteTd').textContent.trim();
      const rowAmount = row.querySelector('.Xitem_amount').textContent;
      

      if (!rowAccountId ||isNaN(rowAccountId)) {
        showAlert(`warning`, `يرجى تحديد الاصل فى السطر رقم ${currentIndex}`)
        return;
      }

      if (!rowAmount || isNaN(rowAmount)){
        showAlert(`warning`, ` يرجى تحديد الكمية  فى السطر رقم ${currentIndex}`)
        return;
      }

      // انشاء اوبجيكت لوضع بيانات الخلايا فيه  ثم اضافة الاوبجيكت الى عناصر المصفوفه الفارغه
      const rowData = {
        rowAccountId :rowAccountId,
        rowNote: rowNote,
        rowAmount: rowAmount,
      };
      posted_array.push(rowData); // اضافة الاوبجيكت الى عناصر المصفوفه
      currentIndex++; // زيادة العدّاد بعد كل تكرار
    }

    const posted_Obj = {datex, location_from, location_to, note, posted_array}

    const redierction_page = A_OR_B == 'A' ? 'items_trasfer_add_ar' : 'items_transfer_view_ar'

      const post = await new_fetchData_postAndGet(
        "/api/items_transfer_add",
        posted_Obj,
        'items_transfer_permission', 'add',
        15,
        true,"هل تريد حفظ بيانات تحويل المخزون؟",
        true,
        false,false,false,false,false,
        true,redierction_page,
        false,false,
         "An error occurred (Code: TAA2). Please check your internet connection and try again; if the issue persists, contact the administrators."
      )

    if (post){
      sessionStorage.removeItem('items_transfer_ViewArray') 
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
    Data =  await get_items_transfer_main_data()

    itemsLocationArray =  Data.itemsLocationArray;
    itemsArray =  Data.itemsArray;

    create_drop_down_with_External_DataArray(`dropdown_div1`,itemsLocationArray)
    create_drop_down_with_External_DataArray(`dropdown_div2`,itemsLocationArray)
 
  
      if (!Data || !itemsLocationArray, !itemsArray){
        await redirection('items_transfer_view_ar','fail','حدث خطأ اثتاء معالجه البيانات')
        return
      }

      // await get_items_locations()
      build_table()
      addRow(itemsArray) //! mtnsash te3del el addRow beta3 el zeror ely fe el table fe ele Buld_table() 5od de copy 7otaha henak
                
  //makeTableRowsDraggable('myTable'); // make sure that the table already loaded
  hideLoadingIcon(content_space)
} catch (error) {
  hideLoadingIcon(content_space)
  catch_error(error)
}
})
