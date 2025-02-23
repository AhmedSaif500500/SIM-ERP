
setActiveSidebar('customers_view_ar');
pagePermission('view', 'customers_permission');

const obj_customers_view = JSON.parse(sessionStorage.getItem('obj_customers_view'));

if (!obj_customers_view){
    redirection("customers_view_ar","fail","حدث خطأ اثناء معالجة البيانات سيتم تحويل الى صفحه العملاء الرئيسية")
}

let href_pageName = 'notes_ar'
let href_pageTitle = 'الملاحظات'

if (obj_customers_view && obj_customers_view.href_pageName){
  href_pageName = obj_customers_view.href_pageName
  href_pageTitle = obj_customers_view.href_pageTitle
}

back_href.href = href_pageName
back_href.title = href_pageTitle



const btn_new = document.querySelector(`#btn_new`);
const table_div = document.querySelector(`#table_div`);
const new_cutomer_div = document.querySelector(`#new_cutomer_div`);
const back_icon_to_home = document.querySelector(`#back_icon_to_home`);
const back_icon_to_table_view = document.querySelector(`#back_icon_to_table_view`);
const page_adress_h2 = document.querySelector(`#page_adress_h2`);
const save_btn = document.querySelector(`#save_btn`);
const btn_update = document.querySelector(`#btn_update`);
const btn_delete = document.querySelector(`#btn_delete`);
const account_no_input = document.querySelector(`#account_no_input`);
const account_name_input = document.querySelector(`#account_name_input`);
const credit_limit = document.querySelector(`#credit_limit`);
const email_input = document.querySelector(`#email_input`);
const tasgel_darepy_input = document.querySelector(`#tasgel_darepy_input`);
const legal_info_input = document.querySelector(`#legal_info_input`);
const contact_info_input = document.querySelector(`#contact_info_input`);
const banking_info_input = document.querySelector(`#banking_info_input`);
const delivery_adress_input = document.querySelector(`#delivery_adress_input`);
const account_id_hidden = document.querySelector(`#account_id_hidden`);
const is_allow_to_buy_and_sell_checkbox = document.querySelector(`#is_allow_to_buy_and_sell`);


function showData(){
    sub_h2_header.textContent = ` تعديل عميل : ${obj_customers_view.account_name_input}`
    account_no_input.value = obj_customers_view.account_no_input;
    account_name_input.value = obj_customers_view.account_name_input;
    credit_limit.value = obj_customers_view.credit_limit;
    email_input.value = obj_customers_view.email_input;
    tasgel_darepy_input.value = obj_customers_view.tasgel_darepy_input;
    legal_info_input.value = obj_customers_view.legal_info_input;
    contact_info_input.value = obj_customers_view.contact_info_input;
    delivery_adress_input.value = obj_customers_view.delivery_adress_input;
    banking_info_input.value = obj_customers_view.banking_info_input;

    is_allow_to_buy_and_sell_checkbox.checked = obj_customers_view.is_allow_to_buy_and_sell === 'true' ? true : false;

}


btn_update.onclick = async function () {
    try {
        
        const account_id_hidden_value = obj_customers_view.x;
        const acc_no_div_value = account_no_input.value.trim();
        const account_name_input_value = account_name_input.value.trim();
        const credit_limit_value = parseFloat(credit_limit.value);
        const email_input_value = email_input.value.trim();
        const tasgel_darepy_input_value = tasgel_darepy_input.value.trim();
        const legal_info_input_value = legal_info_input.value.trim();
        const contact_info_input_value = contact_info_input.value.trim();
        const banking_info_input_value = banking_info_input.value.trim();
        const delivery_adress_input_value = delivery_adress_input.value.trim();
        const is_allow_to_buy_and_sell = is_allow_to_buy_and_sell_checkbox.checked;

    
        if (!account_id_hidden_value) {
            redirection('customers_view_ar','fail','حدث خطأ اثناء معالجة البيانات : سيم توجيهك لصفحة العملاء')
            return;
        }
        
        if (!account_name_input_value) {
            showAlert('warning','برجاء ادخال اسم العميل');
            return;
        }
      //  true,customers_update_data,"customers_view_ar",


        const post = await new_fetchData_postAndGet(
            "/updateCustomer",   
            {   
                account_id_hidden_value,
                acc_no_div_value,
                account_name_input_value,
                credit_limit_value,
                email_input_value,
                tasgel_darepy_input_value,
                legal_info_input_value,
                contact_info_input_value,
                banking_info_input_value,
                delivery_adress_input_value,
                is_allow_to_buy_and_sell
            },
            'customers_permission','update',
            60,
            true,'هل تريد تعديل البيانات ؟',
            true,
            false,false,
            false,false,false,
            true,href_pageName,
            true,href_pageName,
            "حدث خطأ اثناء معالجة البيانات"
        )

        
    } catch (error) {
        catch_error(error)
    }
}

btn_delete.onclick = async function () {
    try {
   
        const account_id_hidden_value = obj_customers_view.x;

        if (!account_id_hidden_value) {
            redirection('customers_view_ar','fail','حدث خطأ اثناء معالجة البيانات : سيم توجيهك لصفحة العملاء')
            return;
        }

    
        const post = await new_fetchData_postAndGet(
            "/delete_customer",
            {   
                account_id_hidden_value
            },
            'customers_permission','delete',
            60,
            true,'هل تريد حذف البيانات ؟',
            true,
            false,false,
            false,false,false,
            true,href_pageName,
            true,href_pageName,
            "حدث خطأ اثناء معالجة البيانات"
        )
    } catch (error) {
        catch_error(error)
    }
}

 
document.addEventListener('DOMContentLoaded', function() {
    try {
        showLoadingIcon(content_space)
            showData()
            viewMode(true,'customers_permission','view')
            handle_fn_options()
        hideLoadingIcon(content_space)
    } catch (error) {
        hideLoadingIcon(content_space)
        catch_error(error)
    }
});
  

function handle_fn_options(){  
    const newDivs = `
      <div id="fn_option_update_btn" onclick="viewMode(false,'customers_permission','update')">وضع التعديل</div>
      <div id="fn_option_view_btn" onclick="viewMode(true,'customers_permission','view')" style="display: none;">وضع العرض</div>
    `;
    fn_options_div.insertAdjacentHTML('afterbegin', newDivs);
  }
  