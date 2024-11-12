
setActiveSidebar('itemsMain_view_ar');
pagePermission('update', 'itemsLocations_permission');

const obj_itemsLocations_view = JSON.parse(sessionStorage.getItem('obj_itemsLocations_view'));

if (!obj_itemsLocations_view){
    redirection("itemsLocations_view_ar","fail","حدث خطأ اثناء معالجة البيانات سيتم تحويل الى صفحه مواقع المخزون الرئيسية")
}

const itemsLocations_update_data = {pageName : 'itemsLocations_update_ar'}

const encodedData = encodeURIComponent(JSON.stringify(itemsLocations_update_data));
back_href.href = `itemsLocations_view_ar?data=${encodedData}`


const btn_update = document.querySelector(`#btn_update`);
const btn_delete = document.querySelector(`#btn_delete`);
const account_name_input = document.querySelector(`#account_name_input`);
const account_id_hidden = document.querySelector(`#account_id_hidden`);




function showData(){
    sub_h2_header.textContent = ` تعديل موقع مخزون : ${obj_itemsLocations_view.account_name_input}`
    account_name_input.value = obj_itemsLocations_view.account_name_input;

}


btn_update.onclick = async function () {
    try {
        
        const account_id_hidden_value = obj_itemsLocations_view.x;
        const account_name_input_value = account_name_input.value.trim();

    
        if (!account_id_hidden_value) {
            redirection('itemsLocations_view_ar','fail','حدث خطأ اثناء معالجة البيانات : سيم توجيهك لصفحة مواقع المخزون')
            return;
        }
        
        if (!account_name_input_value) {
            showAlert('warning','برجاء ادخال اسم موقع المخزون');
            return;
        }
      //  true,itemsLocations_update_data,"itemsLocations_view_ar",


        const post = await new_fetchData_postAndGet(
            "/itemsLocations_update",   
            {   
                account_id_hidden_value,
                account_name_input_value
            },
            'itemsLocations_permission','update',
            15,
            true,'هل تريد تعديل البيانات ؟',
            true,
            false,false,
            true,itemsLocations_update_data,"itemsLocations_view_ar",
            false,false,
            false,false,
            "حدث خطأ اثناء معالجة البيانات"
        )

        
    } catch (error) {
        catch_error(error)
    }
}

btn_delete.onclick = async function () {
    try {
   
        const account_id_hidden_value = obj_itemsLocations_view.x;

        if (!account_id_hidden_value) {
            redirection('itemsLocations_view_ar','fail','حدث خطأ اثناء معالجة البيانات : سيم توجيهك لصفحة العملاء')
            return;
        }

    
        const post = await new_fetchData_postAndGet(
            "/itemsLocations_delete",
            {   
                account_id_hidden_value
            },
            'itemsLocations_permission','delete',
            15,
            true,'هل تريد حذف البيانات ؟',
            true,
            false,false,
            true,itemsLocations_update_data,"itemsLocations_view_ar",
            false,"",
            false,"",
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
        hideLoadingIcon(content_space)
    } catch (error) {
        hideLoadingIcon(content_space)
        catch_error(error)
    }
});
  