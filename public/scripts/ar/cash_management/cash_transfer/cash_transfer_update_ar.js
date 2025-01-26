setActiveSidebar('cashMain_view_ar');
pagePermission("view","items_transfer_permission");


const cash_transfer_update_data = JSON.parse(sessionStorage.getItem('cash_transfer_update_data'));
// sessionStorage.removeItem(`purshases_invoice_update_data`)

if (!cash_transfer_update_data){
    redirection("cash_transfer_view_data","fail","حدث خطأ اثناء معالجة البيانات سيتم تحويل الى صفحه التحويلات بين الحسابات النقدية الرئيسية")
}

const obj_cash_transfer_update = {pageName : 'cash_transfer_update_ar'}

const encodedData = encodeURIComponent(JSON.stringify(obj_cash_transfer_update));
back_href.href = `cash_transfer_view_ar?data=${encodedData}`

 date1.value = today
// const is_RowNote_checkBox = document.querySelector(`#is_RowNote_checkBox`); //!  already in sales_qutation_multi_pages
// const is_RowDiscount_checkBox = document.querySelector(`#is_RowDiscount_checkBox`); //!  already in sales_qutation_multi_pages
const btn_update = document.querySelector(`#btn_update`);
const btn_delete = document.querySelector(`#btn_delete`);
const table = document.querySelector(`#myTable`);

date1.value = today


btn_update.onclick = async function(){
  try {
    const x = Data.headerData.id
    const datex = date1.value;
    const note = note_inpute.value.trim()
    const value = value_input.value 
    
    const account_from = document.querySelector(`#dropdown_div1_hidden_input`).value 
    const account_to = document.querySelector(`#dropdown_div2_hidden_input`).value 
    
    if (!account_from || !account_to) {
      showAlert(`warning`, `يرجى تحديد حسابات النقدية بشكل صحيح`)
      return;
    }
  
  
  
      const posted_Obj = {x, datex, value, account_from, account_to, note}
    
        const post = await new_fetchData_postAndGet(
          "/api/cash_transfer_update",
          posted_Obj,
          'cash_transfer_permission', 'update',
          50,
          true,"هل تريد تعديل بيانات التحويل بين الحسابات النقدية ؟",
          true,
          false,false,
          true,cash_transfer_update_data,'cash_transfer_view_ar',
          false,false,
          false,false,
           "An error occurred (Code: TAA2). Please check your internet connection and try again; if the issue persists, contact the administrators."
        )
  
  
  } catch (error) {
    catch_error(error)
  }
}


btn_delete.onclick = async function () {
  try {
    const datex = date1.value
    const x = Data.headerData.id
    const post = await new_fetchData_postAndGet(
      "/api/cash_transfer_delete",
      {x, datex},
      'cash_transfer_permission', 'delete',
      15,
      true,"هل تريد حذف  بيانات التحويل بين الحسابات النقدية ؟",
      true,
      false,false,
      true,cash_transfer_update_data,'cash_transfer_view_ar',
      false,false,
      false,false,
       "An error occurred (Code: TAA2). Please check your internet connection and try again; if the issue persists, contact the administrators."
    )
  } catch (error) {
    catch_error(error)
  }
}


document.addEventListener('DOMContentLoaded', async function () {
  try {

  showLoadingIcon(content_space)

  const x = cash_transfer_update_data.x

  Data =  await get_cash_transfer_data_for_update(x)
  

  if (!Data || !Data.cash_accounts || !Data.headerData){
    redirection('cash_transfer_view_ar', 'fail', 'حدث خطأ اثناء معالجة البيانات : سيتم تحويلك الى صفحة التحويلات بين الحسابات النقدية الرئيسية')
    return;
  }


  create_drop_down_with_External_DataArray(`dropdown_div1`,Data.cash_accounts); selectedRow_dropdownDiv(`dropdown_div1`,Data.cash_accounts,+Data.headerData.account_from_id);
  create_drop_down_with_External_DataArray(`dropdown_div2`,Data.cash_accounts); selectedRow_dropdownDiv(`dropdown_div2`,Data.cash_accounts,Data.headerData.account_to_id);

  date1.value = Data.headerData.datex;
  reference_input.value = Data.headerData.referenceconcat;
  note_inpute.value = Data.headerData.general_note;
  value_input.value = Data.headerData.total_value;

  
  viewMode(true,'cash_transfer_permission','view')
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
    <div id="fn_option_update_btn" onclick="viewMode(false,'cash_transfer_permission','update')">وضع التعديل</div>
    <div id="fn_option_view_btn" onclick="viewMode(true,'cash_transfer_permission','view')" style="display: none;">وضع العرض</div>
  `;
  fn_options_div.insertAdjacentHTML('afterbegin', newDivs);
}
