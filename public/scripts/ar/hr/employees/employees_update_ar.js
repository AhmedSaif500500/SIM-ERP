setActiveSidebar('hr_ar');
pagePermission('view', 'employees_permission');

const employees_update_data = JSON.parse(sessionStorage.getItem('employees_update_data'));
// sessionStorage.removeItem(`sales_invoice_update_data`)

if (!employees_update_data){
    redirection("capital_accounts_view_ar","fail","حدث خطأ اثناء معالجة البيانات سيتم تحويل الى صفحه حسابات الموظفين الرئيسية")
}
let href_pageName = 'hr_ar'
let href_pageTitle = 'إدارة الموراد البشريه'

if (employees_update_data && employees_update_data.href_pageName){
  href_pageName = employees_update_data.href_pageName
  href_pageTitle = employees_update_data.href_pageTitle
}

back_href.href = href_pageName
back_href.title = href_pageTitle



const h2_text_div = document.querySelector(`#h2_text_div`)
const sub_h2_header = document.querySelector(`#sub_h2_header`)

const account_no_input = document.querySelector(`#account_no_input`)
const employee_name_input = document.querySelector(`#employee_name_input`)
const employee_job_input = document.querySelector(`#employee_job_input`)
const select_department = document.querySelector(`#select_department`)
const email_input = document.querySelector(`#email_input`)
const other_info_input = document.querySelector(`#other_info_input`)
const employee_start_date_input = document.querySelector(`#employee_start_date_input`)
const employee_leave_date_input = document.querySelector(`#employee_leave_date_input`)
const inactive_select = document.querySelector(`#inactive_select`)
const btn_update = document.querySelector(`#btn_update`)
const btn_delete = document.querySelector(`#btn_delete`)
const h2_header = document.querySelector(`#h2_header`);
const is_allow_to_buy_and_sell_checkbox = document.querySelector(`#is_allow_to_buy_and_sell`);




async function loadDeapartmentsOptions(){

  const data = await new_fetchData_postAndGet(
    '/get_All_human_resources_department_Data',
    {},
    'employees_permission','update',
    60,
    false,"",
    true,
    false,false,
    false,false,false,
    false,"",
    false,"",
    "حدث خطأ اثناء معالجة البيانات"
  )

  const optionsArray = []
  for (const row of data) {
    const option = `<option value="${row.id}"}>${row.department_name}</option>`;
    optionsArray.push(option);
  }

  select_department.innerHTML = optionsArray
  page_content.style.display = 'flex'
}


function active_color(select_variable) {
  try {
              if (select_variable.value == 1){
                  select_variable.classList.add(`inactive_color`);
              }else{
                  select_variable.classList.remove(`inactive_color`);
              }
  } catch (error) {
      catch_error(error)
  }
}


inactive_select.onchange = function (){
  active_color(inactive_select)
}



function show_data() {
    try {
      sub_h2_header.textContent = `  تعديل موظف : ${employees_update_data.account_name}`
      account_no_input.value = employees_update_data.account_no
      employee_name_input.value = employees_update_data.account_name
      employee_job_input.value = employees_update_data.job
      email_input.value = employees_update_data.email
      other_info_input.value = employees_update_data.another_info
      employee_start_date_input.value = employees_update_data.start_date
      employee_leave_date_input.value = employees_update_data.end_date
      select_department.value = employees_update_data.department_id
      is_salesman.checked = employees_update_data.is_salesman  
      inactive_select.value = employees_update_data.is_inactive;
      is_allow_to_buy_and_sell_checkbox.checked = employees_update_data.is_allow_to_buy_and_sell === 'true' ? true : false;

      
      active_color(inactive_select)
      
    } catch (error) {
        console.error('error in show_data',error.message)
    };
};


btn_update.onclick = async function update_employee_data() {
  try {

    if (!employee_name_input) {
      showAlert('fail','برجاء ادخل اسم الموظف الجديد للتعديل')
      return; // يجب إعادة التنفيذ بمجرد إظهار الخطأ أو إتخاذ إجراء آخر
    };


    const id_value = employees_update_data.x;
    const employee_name_value = employee_name_input.value.trim();
    const account_no_value = account_no_input.value.trim();
    const employee_job_value = employee_job_input.value.trim();
    const select_department_value = select_department.value;
    const email_value = email_input.value.trim();
    const other_info_value = other_info_input.value.trim();
    const employee_start_date_value = employee_start_date_input.value;
    const employee_leave_date_value = employee_leave_date_input.value;
    const is_salesman_value = is_salesman.checked;
    const inactive_select_value = inactive_select.value;
    const is_allow_to_buy_and_sell = is_allow_to_buy_and_sell_checkbox.checked;


    
    const post = await new_fetchData_postAndGet(
      '/update_employee',
      {id_value,employee_name_value,account_no_value,employee_job_value,select_department_value,email_value,other_info_value,employee_start_date_value,employee_leave_date_value,is_salesman_value,inactive_select_value, is_allow_to_buy_and_sell},
      'employees_permission','update',
      60,
      true,'هل تريد تعديل بيانات الموظف ؟',
      true,
      false,false,
      false,false,false,
      true,href_pageName,
      true,href_pageName,
      'حدث خطأ اثناء معالجة البيانات'
    )

  } catch (error) {
    console.error('Error updating employee:', error.message);
    // يمكنك هنا إظهار رسالة خطأ أو اتخاذ إجراء آخر في حالة حدوث أي خطأ آخر
  }
};

btn_delete.onclick = async function () {
  try {

    const id_value = employees_update_data.x;


    const deleteData = await new_fetchData_postAndGet(
      '/delete_employee',
      {id_value},
      'employees_permission','delete',
      60,
      true,'هل تريد حذف بيانات الموظف ؟',
      true,
      false,false,
      false,false,false,
      true,href_pageName,
      true,href_pageName,
      'حدث خطأ اثناء معالجة البيانات'
    )

  } catch (error) {
    console.error('Error updating employee:', error.message);
    // يمكنك هنا إظهار رسالة خطأ أو اتخاذ إجراء آخر في حالة حدوث أي خطأ آخر
  }
}




 
document.addEventListener('DOMContentLoaded', async function() {
  try {
      showLoadingIcon(content_space)
      await loadDeapartmentsOptions()
      show_data()
          viewMode(true,'employees_permission','view')
          handle_fn_options()
      hideLoadingIcon(content_space)
  } catch (error) {
      hideLoadingIcon(content_space)
      catch_error(error)
  }
});


function handle_fn_options(){  
  const newDivs = `
    <div id="fn_option_update_btn" onclick="viewMode(false,'employees_permission','update')">وضع التعديل</div>
    <div id="fn_option_view_btn" onclick="viewMode(true,'employees_permission','view')" style="display: none;">وضع العرض</div>
  `;
  fn_options_div.insertAdjacentHTML('afterbegin', newDivs);
}
