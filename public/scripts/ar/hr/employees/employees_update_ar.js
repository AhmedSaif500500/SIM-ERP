setActiveSidebar('hr_ar');
pagePermission('update', 'employees_permission','salesman_permissions');


let isUrlParams_salesman = false
let urlData = getURLData('data','notes_ar','رابط غير صالح : سيتم اعادة توجيهك الى صفحة الرئيسية')

function CheckUrlParams (){
  try {
      if (urlData && urlData !== 'noParams'){
        if (urlData.pageName === "employees_view_ar"){
          return true
        }
        if (urlData.pageName === "salesman_view_ar"){
          back_href.href = 'salesman_view_ar';  back_href.title = 'البائعين'
          // is_salesman.checked = true
          isUrlParams_salesman = true
          // is_salesman_div.style.pointerEvents = "none";
          // is_salesman_div.title = "هذه الخاصية لا يمكن تعطيلها عند إنشاء بائع جديد."
          setActiveSidebar('salesMain_view_ar');
          showAlert("info","يرجى ملاحظة أن البائعين هم جزء من طاقم الموظفين، إلا أن لديهم ميزة إضافية تمكنهم من القيام بمهام البيع")
          return true
        }    

      }else if(urlData && urlData === 'noParams'){
            return true
      }else{
          return false
      }
              
  } catch (error) {
      catch_error(error)
      return false
  }
}



document.addEventListener('DOMContentLoaded', async () =>{
  const result = CheckUrlParams(); if (!result) {return}
  await loadDeapartmentsOptions()
  show_data()
})


const id = urlData.id;


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
const h2_header = document.querySelector(`#h2_header`)



async function loadDeapartmentsOptions(){

  const data = await new_fetchData_postAndGet(
    '/get_All_human_resources_department_Data',
    {},
    'employees_permission','update',
    15,
    false,"",
    true,
    true,content_space,
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
      sub_h2_header.textContent = `  تعديل موظف : ${urlData.account_name}`
      account_no_input.value = urlData.account_no
      employee_name_input.value = urlData.account_name
      employee_job_input.value = urlData.job
      email_input.value = urlData.email
      other_info_input.value = urlData.another_info
      employee_start_date_input.value = urlData.start_date
      employee_leave_date_input.value = urlData.end_date
      select_department.value = urlData.department_id
      is_salesman.checked = urlData.is_salesman  
      inactive_select.value = urlData.is_inactive
      
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


    const id_value = urlData.id;
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

    
    const post = await new_fetchData_postAndGet(
      '/update_employee',
      {id_value,employee_name_value,account_no_value,employee_job_value,select_department_value,email_value,other_info_value,employee_start_date_value,employee_leave_date_value,is_salesman_value,inactive_select_value,isUrlParams_salesman},
      isUrlParams_salesman ? 'salesman_permission' : 'employees_permission','update',
      15,
      true,'هل تريد تعديل بيانات الموظف ؟',
      true,
      false,"",
      false,false,false,
      true,isUrlParams_salesman ? "salesman_view_ar" : "employees_view_ar",
      false,false,
      'حدث خطأ اثناء معالجة البيانات'


    )

  } catch (error) {
    console.error('Error updating employee:', error.message);
    // يمكنك هنا إظهار رسالة خطأ أو اتخاذ إجراء آخر في حالة حدوث أي خطأ آخر
  }
};

btn_delete.onclick = async function () {
  try {

    const id_value = urlData.id;


    const deleteData = await fetchData_postAndGet(
      '/delete_employee',
      {id_value,isUrlParams_salesman},
      isUrlParams_salesman ? 'salesman_permission' : 'employees_permission','delete',
      15,
      true,'هل تريد حذف بيانات الموظف ؟',
      false,false,'',
      true,'employees_view_ar',
      'حدث خطأ اثناء معالجة البيانات'
    )

  } catch (error) {
    console.error('Error updating employee:', error.message);
    // يمكنك هنا إظهار رسالة خطأ أو اتخاذ إجراء آخر في حالة حدوث أي خطأ آخر
  }
}

