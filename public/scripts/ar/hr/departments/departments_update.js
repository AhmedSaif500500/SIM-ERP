
setActiveSidebar('hr_ar');
//check permissions
pagePermission('view', 'departments_permission');

const departments_update_data = JSON.parse(sessionStorage.getItem('departments_update_data'));
// sessionStorage.removeItem(`sales_invoice_update_data`)

if (!departments_update_data){
    redirection("departments_view_ar","fail","حدث خطأ اثناء معالجة البيانات سيتم تحويل الى صفحه الأقسام الإدارية الرئيسية")
}
let href_pageName = 'hr_ar'
let href_pageTitle = 'إدارة الموراد البشرية'

if (departments_update_data && departments_update_data.href_pageName){
  href_pageName = departments_update_data.href_pageName
  href_pageTitle = departments_update_data.href_pageTitle
}

back_href.href = href_pageName
back_href.title = href_pageTitle






const department_name_input = document.querySelector(`#department_name_input`)
const department_info_input = document.querySelector(`#department_info_input`)
const btn_update_department = document.querySelector(`#btn_update_department`)
const btn_delete_department = document.querySelector(`#btn_delete_department`)



function showData(){
    try {
            department_name_input.value = departments_update_data.department_name            
            department_info_input.value = departments_update_data.legal_info
            page_content.style.display = 'flex'
    } catch (error) {
        catch_error(error)
    }

}



btn_update_department.onclick = async () => {
    try {
        const id = department_data.id
        const name = department_name_input.value.trim();
        const info = department_info_input.value.trim();


        if (!name || !id){
            showAlert('warning','ادخل اسم القسم اولا ')
            return
          }

        const postData = await new_fetchData_postAndGet(
            '/updateDepartment',
            {id,name,info},
            'departments_permission','update',
            60,
            true,'هل تريد تعديل بيانات القسم ؟',
            true,
            false,false,
            false,false,false,
            true,href_pageName,
            true,href_pageName,
            'حدث خطأ اثناء معالجة البيانات'
        )

    } catch (error) {
        catch_error(error)
    }
}

btn_delete_department.onclick = async () => {
    try {
        const id = department_data.id

        if (!id){
            redirection('departments_view_ar','حدث خطأ اثناء معالجة البيانات : سيتم اعادة توجيك الى صفحة الاقام')
            return
          }


        const postData = await new_fetchData_postAndGet(
            '/deleteDepartment',
            {id},
            'departments_permission','delete',
            60,
            true,'هل تريد حذف بيانات القسم ؟',
            true,
            false,false,
            false,false,false,
            true,href_pageName,
            true,href_pageName,
            'حدث خطأ اثناء معالجة البيانات'
        )

    } catch (error) {
        catch_error(error)
    }
}

document.addEventListener('DOMContentLoaded', function() {
    try {
        showLoadingIcon(content_space)
            showData();
            viewMode(true,'departments_permission','view')
            handle_fn_options()
        hideLoadingIcon(content_space)
    } catch (error) {
        hideLoadingIcon(content_space)
        catch_error(error)
    }
});
  

function handle_fn_options(){  
    const newDivs = `
      <div id="fn_option_update_btn" onclick="viewMode(false,'departments_permission','update')">وضع التعديل</div>
      <div id="fn_option_view_btn" onclick="viewMode(true,'departments_permission','view')" style="display: none;">وضع العرض</div>
    `;
    fn_options_div.insertAdjacentHTML('afterbegin', newDivs);
  }
  