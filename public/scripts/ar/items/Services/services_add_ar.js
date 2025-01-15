setActiveSidebar('itemsMain_view_ar');
pagePermission("add","services_permission");

const inactive_select = document.querySelector(`#inactive_select`)




async function getServicesDataForAdd() {
  try {

      const getData = await new_fetchData_postAndGet(
          "get_data_for_services_add",
          {},
          "items_permission","view",
          15,
          false,"",
          true,
          false,false,
          false,false,false,
          false,false,false,false,"حدث خطأ اثناء معالجة البيانات"
      )

      return getData
      
  } catch (error) {
    catch_error(error)
  }
}



let data;

document.addEventListener('DOMContentLoaded', async function () {
  try {

  showLoadingIcon(content_space)
  data = await getServicesDataForAdd()
  
  if (!data){
    await redirection('services_view_ar','fail','حدث خطأ اثناء معالجة البيانات : سيتم تحويلك الى صفحه الخدمات الرئيسية')
  }

  create_drop_down_with_External_DataArray(`dropdown_div1`,data.revenueAccountsArray); selectedRow_dropdownDiv(`dropdown_div1`,data.revenueAccountsArray,data.revenueDeafulAccount.id);
  create_drop_down_with_External_DataArray(`dropdown_div2`,data.expensesAccountsArray)
            
  hideLoadingIcon(content_space)
  
} catch (error) {
  hideLoadingIcon(content_space)
  catch_error(error)
}
})


async function save(A_OR_B) {

  const accountNo = document.querySelector(`#account_no_input`).value;
  const account_name = document.querySelector(`#service_name_input`).value.trim();
  const unite_name = document.querySelector(`#unite_name_input`).value.trim();
  const revenueAccount = document.querySelector(`#dropdown_div1_hidden_input`).value;
  const expenseAccount = document.querySelector(`#dropdown_div2_hidden_input`).value;
  const sales_price = document.querySelector(`#sales_price`).value;
  const purshase_price = document.querySelector(`#purshase_price`).value;
  const inactive_select_value = inactive_select.value

  
  if (!account_name || account_name === '' ){
    showAlert('warning','برجاء ادخال اسم الخدمة بشكل صحيح')
    return
  }

  if (!unite_name || unite_name === ''){
    showAlert('warning','برجاء وحدة القياس بشكل صحيح')
    return
  }

  if (!revenueAccount || isNaN(+revenueAccount)){
    showAlert('warning','برجاء اختيار الحساب عند البيع بشكل صحيح')
    return
  }

  if (!expenseAccount || isNaN(+expenseAccount)){
    showAlert('warning','برجاء اختيار الحساب عند الشراء بشكل صحيح')
    return
  }


  const posted_Obj = {accountNo, account_name, unite_name, revenueAccount, expenseAccount, inactive_select_value, sales_price, purshase_price}

  if (A_OR_B == 'B'){
    const post = await new_fetchData_postAndGet(
      "/services_add",
      posted_Obj,
      'services_permission', 'add',
      15,
      true,"هل تريد حفظ بيانات الخدمة ؟",
      true,
      false,false,false,false,false,
      true,"services_add_ar",
      false,false,
       "An error occurred (Code: TAA2). Please check your internet connection and try again; if the issue persists, contact the administrators."
    )

  if (post){
    sessionStorage.removeItem('services_Array') 
  }
  
  }else{
  const post = await new_fetchData_postAndGet(
    "/services_add",
    posted_Obj,
    'services_permission', 'add',
    15,
    true,"هل تريد حفظ بيانات الخدمة ؟",
    true,
    false,false,false,false,false,
    true,"services_view_ar",
    false,false,
     "An error occurred (Code: TAA2). Please check your internet connection and try again; if the issue persists, contact the administrators."
  )

  if (post){
    sessionStorage.removeItem('services_Array')
  }
  
}
}


inactive_select.onchange = function (){
  active_color(inactive_select)
}
