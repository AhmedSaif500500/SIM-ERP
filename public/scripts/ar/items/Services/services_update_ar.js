setActiveSidebar('itemsMain_view_ar');
pagePermission("add","services_permission");

const account_no_input = document.querySelector(`#account_no_input`);
const service_name_input = document.querySelector(`#service_name_input`);
const unite_name_input = document.querySelector(`#unite_name_input`);
const sales_price_input = document.querySelector(`#sales_price`);
const purshase_price_input = document.querySelector(`#purshase_price`);
const inactive_select = document.querySelector(`#inactive_select`);
const btn_update = document.querySelector(`#btn_update`);
const btn_delete = document.querySelector(`#btn_delete`);


const sales_invoice_update_data = JSON.parse(sessionStorage.getItem('services_update_data'));


let data;

async function getServicesDataForUpdate() {
  try {
    const x = sales_invoice_update_data.x
      data = await new_fetchData_postAndGet(
          "get_data_for_services_update",
          {x},
          "items_permission","view",
          15,
          false,"",
          true,
          false,false,
          false,false,false,
          false,false,false,false,"حدث خطأ اثناء معالجة البيانات"
      )
      
      if (!data){
        await redirection('services_view_ar','fail','حدث خطأ اثناء معالجة البيانات : سيتم تحويلك الى صفحه الخدمات الرئيسية')
      }
    
      account_no_input.value = data.serviceDataArray.account_no;
      service_name_input.value = data.serviceDataArray.account_name;
      unite_name_input.value = data.serviceDataArray.item_unite;
      unite_name_input.value = data.serviceDataArray.item_unite;
      sales_price.value = data.serviceDataArray.item_sales_price;
      purshase_price.value = data.serviceDataArray.item_purshas_price;
      
      inactive_select.value = data.serviceDataArray.is_inactive ? 1 : 0 ;   active_color(inactive_select)


      create_drop_down_with_External_DataArray(`dropdown_div1`,data.revenueAccountsArray); selectedRow_dropdownDiv(`dropdown_div1`,data.revenueAccountsArray,data.serviceDataArray.item_revenue_account);
      create_drop_down_with_External_DataArray(`dropdown_div2`,data.expensesAccountsArray); selectedRow_dropdownDiv(`dropdown_div2`,data.expensesAccountsArray,data.serviceDataArray.item_expense_account);
      
  } catch (error) {
    catch_error(error)
  }
}


document.addEventListener('DOMContentLoaded', async function () {
  try {

  showLoadingIcon(content_space)
  await getServicesDataForUpdate()

  viewMode(true,'services_permission','view')
  handle_fn_options()

  hideLoadingIcon(content_space)
  
} catch (error) {
  hideLoadingIcon(content_space)
  catch_error(error)
}
})



btn_update.onclick = async function () {
    try {
        
        const x = data.serviceDataArray.id
        const accountNo = account_no_input.value;
        const account_name = service_name_input.value.trim();
        const unite_name = unite_name_input.value.trim();        
        const revenueAccount = document.querySelector(`#dropdown_div1_hidden_input`).value;
        const expenseAccount = document.querySelector(`#dropdown_div2_hidden_input`).value;
        const sales_price = sales_price_input.value;
        const purshase_price = purshase_price_input.value;
        const inactive_select_value = inactive_select.value
      
        
        if (!account_name || account_name === '' || !unite_name || unite_name === '' || !revenueAccount || isNaN(+revenueAccount) || !expenseAccount || isNaN(+expenseAccount)){
          showAlert('warning','برجاء ادخال البيانات المطلوبه بشكل صحيح')
          return
        }        

        const post = await new_fetchData_postAndGet(
            "/services_update",
            {x,accountNo,account_name,unite_name,revenueAccount,expenseAccount,sales_price,purshase_price,inactive_select_value},
            'services_permission', 'update',
            15,
            true,"هل تريد تعديل بيانات الخدمة ؟",
            true,
            false,false,false,false,false,
            true,"services_view_ar",
            false,false,
             "An error occurred (Code: TAA2). Please check your internet connection and try again; if the issue persists, contact the administrators."
          )

    } catch (error) {
        catch_error(error)
    }
}

btn_delete.onclick = async function () {
    try {
        const x = data.serviceDataArray.id
        const post = await new_fetchData_postAndGet(
            "/services_delete",
            {x},
            'services_permission', 'delete',
            15,
            true,"هل تريد حذف بيانات الخدمة ؟",
            true,
            false,false,false,false,false,
            true,"services_view_ar",
            false,false,
             "An error occurred (Code: TAA2). Please check your internet connection and try again; if the issue persists, contact the administrators."
          )


    } catch (error) {
        catch_error(error)
    }
}

async function save(A_OR_B) {



  const posted_Obj = {accountNo, account_name, unite_name, revenueAccount, expenseAccount, inactive_select_value, sales_price, purshase_price}

  if (A_OR_B == 'B'){


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


function handle_fn_options(){
    const newDivs = `
      <div id="fn_option_update_btn" onclick="viewMode(false,'services_permission','update')">وضع التعديل</div>
      <div id="fn_option_view_btn" onclick="viewMode(true,'services_permission','view')" style="display: none;">وضع العرض</div>
    `;
    fn_options_div.insertAdjacentHTML('afterbegin', newDivs);
  }
  