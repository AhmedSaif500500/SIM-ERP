
setActiveSidebar('vendors_view_ar');
pagePermission('view','vendors_permission');

const vendors_update_data = JSON.parse(sessionStorage.getItem('vendors_update_data'));

if (!vendors_update_data){
    redirection("vendors_view_ar","fail","حدث خطأ اثناء معالجة البيانات سيتم تحويل الى صفحه العملاء الرئيسية")
}

let href_pageName = 'notes_ar'
let href_pageTitle = 'الملاحظات'

if (vendors_update_data && vendors_update_data.href_pageName){
  href_pageName = vendors_update_data.href_pageName
  href_pageTitle = vendors_update_data.href_pageTitle
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
    sub_h2_header.textContent = ` تعديل مورد : ${vendors_update_data.account_name_input}`
    account_no_input.value = vendors_update_data.account_no_input;
    account_name_input.value = vendors_update_data.account_name_input;
    credit_limit.value = vendors_update_data.credit_limit;
    email_input.value = vendors_update_data.email_input;
    tasgel_darepy_input.value = vendors_update_data.tasgel_darepy_input;
    legal_info_input.value = vendors_update_data.legal_info_input;
    contact_info_input.value = vendors_update_data.contact_info_input;
    delivery_adress_input.value = vendors_update_data.delivery_adress_input;
    banking_info_input.value = vendors_update_data.banking_info_input;
    is_allow_to_buy_and_sell_checkbox.checked = vendors_update_data.is_allow_to_buy_and_sell === 'true' ? true : false;

}


btn_update.onclick = async function () {
    try {
        
        const account_id_hidden_value = vendors_update_data.x;
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
            redirection('vendors_view_ar','fail','حدث خطأ اثناء معالجة البيانات : سيم توجيهك لصفحة العملاء')
            return;
        }
        
        if (!account_name_input_value) {
            showAlert('warning','برجاء ادخال اسم العميل');
            return;
        }
      //  true,vendors_update_data,"vendors_view_ar",


        const post = await new_fetchData_postAndGet(
            "/updateVendor",   
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
            'vendors_permission','update',
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
   
        const account_id_hidden_value = vendors_update_data.x;

        if (!account_id_hidden_value) {
            redirection('vendors_view_ar','fail','حدث خطأ اثناء معالجة البيانات : سيم توجيهك لصفحة العملاء')
            return;
        }

    
        const post = await new_fetchData_postAndGet(
            "/delete_vendor",
            {   
                account_id_hidden_value
            },
            'vendors_permission','delete',
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
            viewMode(true,'vendors_permission','view')
            handle_fn_options()
        hideLoadingIcon(content_space)
    } catch (error) {
        hideLoadingIcon(content_space)
        catch_error(error)
    }
});
  

function handle_fn_options(){  
    const newDivs = `
      <div id="fn_option_update_btn" onclick="viewMode(false,'vendors_permission','update')">وضع التعديل</div>
      <div id="fn_option_view_btn" onclick="viewMode(true,'vendors_permission','view')" style="display: none;">وضع العرض</div>
    `;
    fn_options_div.insertAdjacentHTML('afterbegin', newDivs);
  }
  