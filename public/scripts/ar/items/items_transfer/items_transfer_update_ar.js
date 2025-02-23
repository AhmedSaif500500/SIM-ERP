setActiveSidebar('itemsMain_view_ar');
pagePermission("view","items_transfer_permission");


const items_transfer_update_data = JSON.parse(sessionStorage.getItem('items_transfer_update_data'));
// sessionStorage.removeItem(`purshases_invoice_update_data`)

if (!items_transfer_update_data){
    redirection("items_transfer_view_data","fail","حدث خطأ اثناء معالجة البيانات سيتم تحويل الى صفحه الاهلاكات الرئيسية")
}

let href_pageName = 'itemsMain_view_ar'
let href_pageTitle = 'إدارة المخزون'

if (items_transfer_update_data && items_transfer_update_data.href_pageName){
  href_pageName = items_transfer_update_data.href_pageName
  href_pageTitle = items_transfer_update_data.href_pageTitle
}

back_href.href = href_pageName
back_href.title = href_pageTitle


 date1.value = today
// const is_RowNote_checkBox = document.querySelector(`#is_RowNote_checkBox`); //!  already in sales_qutation_multi_pages
// const is_RowDiscount_checkBox = document.querySelector(`#is_RowDiscount_checkBox`); //!  already in sales_qutation_multi_pages
const btn_update = document.querySelector(`#btn_update`);
const btn_delete = document.querySelector(`#btn_delete`);
const table = document.querySelector(`#myTable`);

date1.value = today


btn_update.onclick = async function(){
  try {
    const x = haderDataArray.id
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

    const posted_Obj = {x, datex, location_from, location_to, note, posted_array}

        const post = await new_fetchData_postAndGet(
          "/api/items_transfer_update",
          posted_Obj,
          'items_transfer_permission', 'update',
          60,
          true,"هل تريد تعديل  بيانات تحويلات المخزون ؟",
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


btn_delete.onclick = async function () {
  try {
    const datex = date1.value
    const x = haderDataArray.id
    const post = await new_fetchData_postAndGet(
      "/api/items_transfer_delete",
      {x, datex},
      'items_transfer_permission', 'delete',
      60,
      true,"هل تريد حذف  بيانات تحويل المخزون؟",
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




document.addEventListener('DOMContentLoaded', async function () {
  try {

  showLoadingIcon(content_space)

  const x = items_transfer_update_data.x

  Data =  await get_items_transfer_data_for_update(x)
  
  if (!Data || !Data.itemsLocationsArray || !Data.itemsArray || !Data.haderDataArray || !Data.bodyDataArray){
    redirection('items_transfer_view_ar', 'fail', 'حدث خطأ اثناء معالجة البيانات : سيتم تحويلك الى صفحة الاهلاكات الرئيسية')
    return;
  }

  itemsLocationsArray = Data.itemsLocationsArray;
  itemsArray = Data.itemsArray;
  haderDataArray = Data.haderDataArray;
  bodyDataArray = Data.bodyDataArray;

  
  create_drop_down_with_External_DataArray(`dropdown_div1`,itemsLocationsArray); selectedRow_dropdownDiv(`dropdown_div1`,itemsLocationsArray,haderDataArray.location_from);
  create_drop_down_with_External_DataArray(`dropdown_div2`,itemsLocationsArray); selectedRow_dropdownDiv(`dropdown_div2`,itemsLocationsArray,haderDataArray.location_to);

  date1.value = haderDataArray.datex;
  reference_input.value = haderDataArray.referenceconcat;
  note_inpute.value = haderDataArray.general_note;

  build_table()
  fillTable(itemsArray)
  
  viewMode(true,'items_transfer_permission','view')
  handle_fn_options()
  //makeTableRowsDraggable('myTable'); // make sure that the table already loaded
  hideLoadingIcon(content_space)
} catch (error) {
  hideLoadingIcon(content_space)
  catch_error(error)
}
})


function handle_fn_options(){  
  const newDivs = `
    <div id="fn_option_update_btn" onclick="viewMode(false,'items_transfer_permission','update')">وضع التعديل</div>
    <div id="fn_option_view_btn" onclick="viewMode(true,'items_transfer_permission','view')" style="display: none;">وضع العرض</div>
  `;
  fn_options_div.insertAdjacentHTML('afterbegin', newDivs);
}
