
    //#region  save function
    setActiveSidebar('hr_ar');




   

    const h2_text_div = document.querySelector(`#h2_text_div`)
    const sub_h2_header = document.querySelector(`#sub_h2_header`)

    const account_no_input = document.querySelector(`#account_no_input`)
    const employee_name_input = document.querySelector(`#employee_name_input`)
    const employee_job_input = document.querySelector(`#employee_job_input`)
    const select_department = document.querySelector(`#select_department`)
    const email_input = document.querySelector(`#email_input`)
    const other_info_input = document.querySelector(`#other_info_input`)
    const employee_start_date_input = document.querySelector(`#employee_start_date_input`) ; employee_start_date_input.value = today 
    const employee_leave_date_input = document.querySelector(`#employee_leave_date_input`) ; employee_leave_date_input.value = today
    const inactive_select = document.querySelector(`#inactive_select`)
    const btn_save = document.querySelector(`#btn_save`)
    const btn_save_and_add_another = document.querySelector(`#btn_save_and_add_another`)



    document.addEventListener('DOMContentLoaded', async () =>{
      await loadDeapartmentsOptions()
    })

    async function loadDeapartmentsOptions(){

      const data = await fetchData_postAndGet(
        '/get_All_human_resources_department_Data',
        {},
        'employees_permission','add',
        15,
        false,'',
        false,
        true,content_space,
        false,'',
        'حدث خطأ اثناء معالجة البيانات'
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
    

    function clear_inputs() {
      const inputs = document.querySelectorAll(`input, textarea`);
      for (const input of inputs){
        input.value = ''
      }
      inactive_select.value = 0
      active_color(inactive_select)
    }


    async function save(A_or_B) {
      const account_no_value = account_no_input.value.trim()
      const employee_name_value = employee_name_input.value.trim()
      const employee_job_value = employee_job_input.value.trim()
      const select_department_value = select_department.value
      const email_input_value = email_input.value.trim()
      const other_info_value = other_info_input.value.trim()
      const employee_start_date_value = employee_start_date_input.value
      const employee_leave_date_value = employee_leave_date_input.value
      const inactive_select_value = inactive_select.value


      if (!employee_name_value){
        showAlert('warning','ادخل اسم الموظف اولا ')
        return
      }


      if (A_or_B == 'A'){

        const post = await fetchData_postAndGet(
          '/employee_add',
          {account_no_value,employee_name_value,employee_job_value,select_department_value,email_input_value,other_info_value,employee_start_date_value,employee_leave_date_value,inactive_select_value},
          'employees_permission','add',
          15,true,'هل تريد حفظ بيانات الموظف الجديد ؟',
          true,false,'',
          true,'employees_view_ar',
          'حدث خطأ اثناء معالجة البيانات : تم الغاء العمليه'
        )

      } else if(A_or_B == 'B'){

        const post = await fetchData_postAndGet(
          '/employee_add',
          {account_no_value,employee_name_value,employee_job_value,select_department_value,email_input_value,other_info_value,employee_start_date_value,employee_leave_date_value,inactive_select_value},
          'employees_permission','add',
          15,true,'هل تريد حفظ بيانات الموظف الجديد ؟',
          true,false,'',
          false,'',
          'حدث خطأ اثناء معالجة البيانات : تم الغاء العمليه'
        )

        if (post) {
          clear_inputs()
        }
      }
    }

    
          //#endregion End save Function
      
      
      
      