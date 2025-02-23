setActiveSidebar('purshasesMain_view_ar');
pagePermission("view","purshases_invoice_permission");


const purshases_invoice_update_data = JSON.parse(sessionStorage.getItem('purshases_invoice_update_data'));
// sessionStorage.removeItem(`purshases_invoice_update_data`)

if (!purshases_invoice_update_data){
    redirection("purshases_invoice_view_ar","fail","حدث خطأ اثناء معالجة البيانات سيتم تحويل الى صفحه فواتير المشتريات الرئيسية")
}
let href_pageName = 'purshasesMain_view_ar'
let href_pageTitle = 'إدارة المشتريات'

if (purshases_invoice_update_data && purshases_invoice_update_data.href_pageName){
  href_pageName = purshases_invoice_update_data.href_pageName
  href_pageTitle = purshases_invoice_update_data.href_pageTitle
}

back_href.href = href_pageName
back_href.title = href_pageTitle


const date1 = document.querySelector('#date1');
const note_inpute = document.querySelector(`#note_inpute`);
const reference_status = document.querySelector(`#reference_status`);
// const is_RowNote_checkBox = document.querySelector(`#is_RowNote_checkBox`); //!  already in purshases_order_multi_pages
// const is_RowDiscount_checkBox = document.querySelector(`#is_RowDiscount_checkBox`); //!  already in purshases_order_multi_pages
const btn_newRow = document.querySelector(`#btn_newRow`);
const table = document.querySelector(`#myTable`);


date1.value = today


document.querySelector(`#btn_update`).onclick = async function () {
  
  try {

    const permission = await btn_permission('purshases_invoice_permission', 'update') // معلق
    if (!permission){
      showAlert('warning','عفواً لا تملك الصلاحيه للتحديث')
      return
    }

    const x = purshases_invoice_update_data.x;
    const datex = date1.value;
    const dueDate = dueDate_input.value
    
    const vendorId = document.querySelector(`#dropdown_div3_hidden_input`).value
    if (!vendorId || isNaN(+vendorId)) {
      showAlert(`warning`, `يرجى تحديد المورد `)
      return;
    }
  
    // const purshasesmanId = document.querySelector(`#dropdown_div_hidden_input`).value
    // if (!purshasesmanId || isNaN(+purshasesmanId)) {
    //   showAlert(`warning`, `يرجى تحديد البائع `)
    //   return;
    // }
    
  
    const itemLocationId = document.querySelector(`#dropdown_div2_hidden_input`).value
    if (!itemLocationId || isNaN(+itemLocationId)) {
      showAlert(`warning`, `يرجى تحديد موقع المخزون `)
      return;
    }
  
    const orderReferenceId = document.querySelector(`#dropdown_div4_hidden_input`).value
    const qutationReferenceId = document.querySelector(`#dropdown_div5_hidden_input`).value
  
  
  
    const general_note = note_inpute.value.trim()
    const location_name = document.querySelector(`#dropdown_div2_select_input`).value
  
  let total = 0
  if (!totalTaxValue || isNaN(totalTaxValue) || totalTaxValue === 0){
    total = totalVal_beforTax
  }else{
    total = totalAfterTax
  }
  
  
  const is_RowDiscount = is_RowDiscount_checkBox.checked
  const is_RowNote  = is_RowNote_checkBox.checked
  const is_RowTax  = is_RowTax_checkBox.checked

  
    const tableRows = document.querySelectorAll('#myTable > tbody > .mainTr');
  
  
  
    const posted_array = []; // انشاء مصفوفه جديده اضع فيها بيانات كل صف
    if (tableRows.length > 0) { // التأكد من وجود بيانات داخل المصفوفه اولا
  
      let currentIndex = 1;
      for (const row of tableRows) {
        
        const item_typeId = parseInt(row.querySelector('.td-item_type .account_type').value);
        const item_id = parseInt(row.querySelector('.td-itemId .id_hidden_input').value);
        const item_name = row.querySelector('.td-itemId .dropdown_select_input').textContent;
  
  
        if (isNaN(item_id)) {
          showAlert(`warning`, `يرجى تحديد الصنف فى السطر رقم ${currentIndex}`)
          return;
        }
  
  
        const row_note = row.querySelector(`.td-inputTable_noteTd`).textContent.trim();
  
        const row_amount = +row.querySelector(`.td-amount .Xitem_amount`).textContent;
        if (!row_amount || isNaN(row_amount)){
          showAlert(`warning`, ` يرجى تحديد الكميه فى السطر رقم ${currentIndex}`)
          return;
        }
  
        const row_unitPrice = +row.querySelector(`.td-unitePrice`).textContent;
        if (!row_unitPrice || isNaN(row_unitPrice)){
          showAlert(`warning`, ` يرجى تحديد السعر فى السطر رقم ${currentIndex}`)
          return;
        }
  
        const row_discountTypeId = +row.querySelector(`.td-dsicount .tbody_discountType`).value;
        const row_discountValue = +row.querySelector(`.td-dsicount .tbody_discountValue`).textContent;
  
        
  
        const row_taxHeaderId = +row.querySelector('.td-taxHeader .id_hidden_input').value || "";
  
       
  
        // انشاء اوبجيكت لوضع بيانات الخلايا فيه  ثم اضافة الاوبجيكت الى عناصر المصفوفه الفارغه
        const rowData = {
          item_typeId :item_typeId,
          item_id: item_id,
          item_name: item_name,
          row_note: row_note,
          row_amount: row_amount,
          row_unitPrice: row_unitPrice,
          row_discountTypeId: row_discountTypeId,
          row_discountValue: row_discountValue,
          row_taxHeaderId: row_taxHeaderId,
        };
        posted_array.push(rowData); // اضافة الاوبجيكت الى عناصر المصفوفه
        currentIndex++; // زيادة العدّاد بعد كل تكرار
      }
  
      const posted_Obj = {x, vendorId, total, datex, dueDate, orderReferenceId, qutationReferenceId, itemLocationId, is_RowNote, is_RowDiscount, is_RowTax, general_note, location_name, posted_array}
  
        const post = await new_fetchData_postAndGet(
          "/api/purshases_invoice_update",
          posted_Obj,
          'purshases_invoice_permission', 'update',
          50,
          true,"هل تريد حفظ بيانات فاتورة المشتريات ؟",
          true,
          false,false,false,false,false,
          true,href_pageName,
          true,href_pageName,
           "An error occurred (Code: TAA2). Please check your internet connection and try again; if the issue persists, contact the administrators."
        )
        
        
    // if (post){
    //   sessionStorage.removeItem('purshases_invoice_update_data')
    //   sessionStorage.removeItem('purshases_invoice_ViewArray')
    // }

    } else {
      showAlert('fail', 'لا توجد بيانات')
      return
    }
} catch (error) {
  catch_error(error)
}
}


document.querySelector(`#btn_delete`).onclick = async function () {
  try {
    const permission = await btn_permission('purshases_invoice_permission', 'delete');
    if (!permission){
      showAlert('warning','عفواً لا تملك الصلاحيه للتحديث')
      return
    }

const x = headerDataArray.id
const datex = date1.value;


const post = await new_fetchData_postAndGet(
  "/api/purshases_invoice_delete",
  {x,datex},
  'purshases_invoice_permission', 'delete',
  15,
  true,"هل تريد حذف بيانات فاتورة المشتريات ؟",
  true,
  false,false,false,false,false,
  true,href_pageName,
  href_pageName,href_pageName,
   "An error occurred (Code: TAA2). Please check your internet connection and try again; if the issue persists, contact the administrators."
)

// if (post){
// sessionStorage.removeItem('purshases_order_ViewArray')
// }


  } catch (error) {
    catch_error(error)
  }
}


document.addEventListener('DOMContentLoaded', async function () {
  try {
  showLoadingIcon(content_space)
  
    const x = purshases_invoice_update_data.x;
    const qutation_id = purshases_invoice_update_data.qutation_id;
    const order_id = purshases_invoice_update_data.order_id;
        
   await showpurshasesInvoiceData(x, qutation_id, order_id, false)
    
   
    //! here

  viewMode(true,'purshases_invoice_permission','view')
  handle_fn_options()
  makeTableRowsDraggable('myTable'); // make sure that the table already loaded
  hideLoadingIcon(content_space)
} catch (error) {
  hideLoadingIcon(content_space)
  catch_error(error)
}
})


async function createpurshasesReturns(){
  try {

    const permission = await btn_permission('purshases_returns_permission', 'add') // معلق
    if (!permission){
      showAlert('warning','عفواً لا تملك الصلاحيه')
      return
    }

    await showDialog('', `سيتم تحويلك الى صفحة انشاء مرتجع المشتريات , هل تريد المتابعه؟`, '');        
    if (!dialogAnswer) {
      return false;
    }

    
    const purshases_returns_update_data = {
      x: headerDataArray.id,
      href_pageName : `purshases_invoice_update_ar`,
      href_pageTitle : 'تحديث فاتورة المشتريات',
      vendor_id: headerDataArray.account_id,
      invoiceToReturns: true
    };
    sessionStorage.removeItem('purshases_returns_update_data')
    sessionStorage.setItem('purshases_returns_update_data', JSON.stringify(purshases_returns_update_data));                            
    window.location.href = `purshases_returns_add_ar`;
  } catch (error) {
    catch_error(error)
  }
}


function handle_fn_options(){
  const newDivs = `
    <div id="fn_option_update_btn" onclick="viewMode(false,'purshases_invoice_permission','update')">وضع التعديل</div>
    <div id="fn_option_view_btn" onclick="viewMode(true,'purshases_invoice_permission','view')" style="display: none;">وضع العرض</div>
     <div id="" onclick="createpurshasesReturns()">انشاء مرتجع مشتريات</div>
  `;
  fn_options_div.insertAdjacentHTML('afterbegin', newDivs);
}

