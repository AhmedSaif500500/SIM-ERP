
setActiveSidebar('itemsMain_view_ar');
pagePermission('update', 'itemsLocations_permission');

const itemsLocations_update_data = JSON.parse(sessionStorage.getItem('itemsLocations_update_data'));

if (!itemsLocations_update_data){
    redirection("itemsLocations_view_ar","fail","حدث خطأ اثناء معالجة البيانات سيتم تحويل الى صفحه مواقع المخزون الرئيسية")
}

let href_pageName = 'itemsMain_view_ar'
let href_pageTitle = 'إدارةالمخزون'

if (itemsLocations_update_data && itemsLocations_update_data.href_pageName){
  href_pageName = itemsLocations_update_data.href_pageName
  href_pageTitle = itemsLocations_update_data.href_pageTitle
}

back_href.href = href_pageName
back_href.title = href_pageTitle


const btn_update = document.querySelector(`#btn_update`);
const btn_delete = document.querySelector(`#btn_delete`);
const account_name_input = document.querySelector(`#account_name_input`);
const account_id_hidden = document.querySelector(`#account_id_hidden`);




function showData(){
    sub_h2_header.textContent = ` تعديل موقع مخزون : ${itemsLocations_update_data.account_name_input}`
    account_name_input.value = itemsLocations_update_data.account_name_input;

}


btn_update.onclick = async function () {
    try {
        
        const account_id_hidden_value = itemsLocations_update_data.x;
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
            60,
            true,'هل تريد تعديل بيانات موقع المخزون ؟',
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
   
        const account_id_hidden_value = itemsLocations_update_data.x;

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
            viewMode(true,'itemsLocations_permission','view')
            handle_fn_options()
        hideLoadingIcon(content_space)
    } catch (error) {
        hideLoadingIcon(content_space)
        catch_error(error)
    }
});
  

function handle_fn_options(){  
    const newDivs = `
      <div id="fn_option_update_btn" onclick="viewMode(false,'itemsLocations_permission','update')">وضع التعديل</div>
      <div id="fn_option_view_btn" onclick="viewMode(true,'itemsLocations_permission','view')" style="display: none;">وضع العرض</div>
    `;
    fn_options_div.insertAdjacentHTML('afterbegin', newDivs);
  }
  
  