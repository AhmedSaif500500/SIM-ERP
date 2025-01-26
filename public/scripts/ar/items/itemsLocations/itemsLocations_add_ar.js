
setActiveSidebar('customers_view_ar');
pagePermission('add', 'customers_permission');




const account_name_input = document.querySelector(`#account_name_input`);
const account_id_hidden = document.querySelector(`#account_id_hidden`);


async function save(A_B){
    try {
    
        const account_name_input_value = account_name_input.value.trim();

        if (!account_name_input_value) {
            showAlert('warning','برجاء ادخال اسم الموقع');
            return
        }
    
        if (A_B === 'A'){
            const post = await new_fetchData_postAndGet(
                "/itemsLocations_add",
                {account_name_input_value},
                'itemsLocations_permission','add',
                50,
                true,'هل تريد حفظ البيانات ؟',
                true,
                false,false,
                false,false,false,
                true,"itemsLocations_view_ar",
                false,false,
                "حدث خطأ اثناء معالجه البيانات"
            )
        }else if(A_B === 'B'){
            const post = await new_fetchData_postAndGet(
                "/itemsLocations_add",
                {account_name_input_value},
                'itemsLocations_permission','add',
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
  