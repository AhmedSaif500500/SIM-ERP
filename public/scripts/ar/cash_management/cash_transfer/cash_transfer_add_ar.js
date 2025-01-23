setActiveSidebar('cashMain_view_ar');
pagePermission("add","cash_transfer_permission");



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
  const value = value_input.value 
  
  const account_from = document.querySelector(`#dropdown_div1_hidden_input`).value 
  const account_to = document.querySelector(`#dropdown_div2_hidden_input`).value 
  
  if (!account_from || !account_to) {
    showAlert(`warning`, `يرجى تحديد حسابات النقدية بشكل صحيح`)
    return;
  }



    const posted_Obj = {datex, value, account_from, account_to, note}

    const redierction_page = A_OR_B == 'A' ? 'cash_transfer_view_ar' : 'cash_transfer_add_ar'

      const post = await new_fetchData_postAndGet(
        "/api/cash_transfer_add",
        posted_Obj,
        'cash_transfer_permission', 'add',
        15,
        true,"هل تريد حفظ بيانات التحويل بين الحسابات النقدية؟",
        true,
        false,false,false,false,false,
        true,redierction_page,
        false,false,
         "An error occurred (Code: TAA2). Please check your internet connection and try again; if the issue persists, contact the administrators."
      )

    if (post){
      sessionStorage.removeItem('items_transfer_ViewArray') 
    }
    

} catch (error) {
  catch_error(error)
}
}



document.addEventListener('DOMContentLoaded', async function () {
  try {

  showLoadingIcon(content_space)
    Data =  await getCash()


    if (!Data){
      await redirection('cash_accounts_add_ar','fail','برجاء انشاء حسابات نقدية اولا : سيتم تحويلك الى صفحه الحسابات النقدية')
      return
    }
    create_drop_down_with_External_DataArray(`dropdown_div1`,Data.cash_accounts)
    create_drop_down_with_External_DataArray(`dropdown_div2`,Data.cash_accounts)
 
     
  hideLoadingIcon(content_space)
} catch (error) {
  hideLoadingIcon(content_space)
  catch_error(error)
}
})
