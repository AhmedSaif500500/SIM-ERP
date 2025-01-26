
setActiveSidebar('vendors_view_ar');
pagePermission('view', 'vendors_permission');




const btn_new = document.querySelector(`#btn_new`);
const table_div = document.querySelector(`#table_div`);
const new_cutomer_div = document.querySelector(`#new_cutomer_div`);
const back_icon_to_home = document.querySelector(`#back_icon_to_home`);
const back_icon_to_table_view = document.querySelector(`#back_icon_to_table_view`);
const page_adress_h2 = document.querySelector(`#page_adress_h2`);
const save_btn = document.querySelector(`#save_btn`);
const update_btn = document.querySelector(`#update_btn`);
const btn_cancel = document.querySelector(`#btn_cancel`);
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


async function save(A_B){
    try {
    
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
    
    
        if (!account_name_input_value) {
            showAlert('warning','برجاء ادخال اسم العميل');
            return
        }
    
        if (A_B === 'A'){
            const post = await new_fetchData_postAndGet(
                "/addNewVendor",
                {acc_no_div_value,
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
                'vendors_permission','add',
                50,
                true,'هل تريد حفظ البيانات ؟',
                true,
                false,false,
                false,false,false,
                true,"vendors_view_ar",
                false,false,
                "حدث خطأ اثناء معالجه البيانات"
            )
        }else if(A_B === 'B'){
            const post = await new_fetchData_postAndGet(
                "/addNewVendor",
                {acc_no_div_value,
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
                'vendors_permission','add',
                50,
                true,'هل تريد حفظ البيانات ؟',
                true,
                false,false,
                false,false,false,
                false,false,
                false,false,
                "حدث خطأ اثناء معالجه البيانات"
            )
            if (post) {
                clear_inputs()    
            }
            
        }


    
    } catch (error) {
        catch_error(error)
    }
    }
    
    
    function clear_inputs (){
        try {
            const inputs = document.querySelectorAll(`input, textarea`)
    
             for ( const input of inputs){
                input.value = '';
             }   
    
        } catch (error) {
            catch_error(error)
        }
    }
    
    
document.addEventListener('DOMContentLoaded', function() {
    try {
        showLoadingIcon(content_space)

        hideLoadingIcon(content_space)
    } catch (error) {
        hideLoadingIcon(content_space)
        catch_error(error)
    }
});
  