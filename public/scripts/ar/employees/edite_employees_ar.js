let Authentication = true;
//#region  Authentication
const employee_id = sessionStorage.getItem('employee_id');
sessionStorage.removeItem('employee_id');
if (!employee_id) {
  Authentication = false;
  showAlert('fail', 'من فضلك اختر الموظف اولا للتعديل , سيتم توجيهك الى صفحه الموظفين');
 document.querySelector('#body_content').style.pointerEvents = 'none';

  // الكود الى جوا الدالة دى هينتظر مده 3 ثوانى 3000 حتى يتم تنفيذه
  setTimeout(() => {
      window.location.href = '/employees_ar';
  }, 3000);
};



//#endregion end-Authentication








async function get_employee_data_fn() {
    try {
            //!2: send id to server then receive data from server response
            // تجهيز البيانات للإرسال إلى الخادم
            const posted_elements = {
              employee_id,
            };
     
            // إرسال البيانات إلى الخادم
            const response = await fetch('/editEmployee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(posted_elements)
            });

              const data = await  response.json();
           
                    if (data.success) {
                        array1 = data.rows[0]; /* اول صف فقط فى الروز الى فيه البيانات */
                        show_data();
                    } else {
                        console.log("Error adding employee:", data.message); 
                    };

    } catch (error) {
        console.error('Error getting employee data:', error.message);
    };
};


function show_data() {
    try {
document.querySelector(`#employee_name_input`).value = array1.employee_name;
document.querySelector('#employee_job_input').value = array1.emp_job;
document.querySelector('#employee_beta2a_input').value = array1.emp_beta2a; 
document.querySelector('#employee_adress_input').value =  array1.emp_adress;
document.querySelector('#employee_phone_input').value = array1.emp_personal_phone;
document.querySelector('#employee_emergency_phone_input').value = array1.emp_emergency_phone
document.querySelector('#employee_start_date_input').value = array1.emp_start_date;
document.querySelector('#employee_leave_date_input').value = array1.emp_end_date;
    } catch (error) {
        console.error('error in show_data',error.message)
    };
};


async function update_employee_data() {
  try {
    // event.preventDefault(); // if <a>

    // تحضير البيانات
    const employee_name_input = document.querySelector('#employee_name_input').value.trim();
    const employee_job_input = document.querySelector('#employee_job_input').value.trim();
    const employee_beta2a_input = document.querySelector('#employee_beta2a_input').value.trim();
    const employee_adress_input = document.querySelector('#employee_adress_input').value.trim();
    const employee_phone_input = document.querySelector('#employee_phone_input').value.trim();
    const employee_emergency_phone_input = document.querySelector('#employee_emergency_phone_input').value.trim();
    const employee_start_date_input = document.querySelector('#employee_start_date_input').value.trim();
    const employee_leave_date_input = document.querySelector('#employee_leave_date_input').value.trim();
    const today = new Date().toISOString().split('T')[0]; // date in format (yyyy-mm-dd)
  

    // التحقق من صحة البيانات هنا

    if (!employee_name_input) {
      showAlert('fail','برجاء ادخل اسم الموظف الجديد للتعديل')
      return; // يجب إعادة التنفيذ بمجرد إظهار الخطأ أو إتخاذ إجراء آخر
    };

    // تأكيد المستخدم
    if (!confirm(`Please Confirm.. Do you want to update data ?`)) {
      return;
    }

    // تجهيز البيانات للإرسال إلى الخادم
    const posted_elements = {
      employee_name_input,
      employee_job_input,
      employee_beta2a_input,
      employee_adress_input,
      employee_phone_input,
      employee_emergency_phone_input,
      employee_start_date_input,
      employee_leave_date_input,
      today,
      employee_id
    };

    // إرسال البيانات إلى الخادم
    const response = await fetch('/edit_employee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(posted_elements)
    });
    // استلام الرد من الخادم
    const data = await response.json();
      if (data.success) {
        showAlert('success', data.message);
        clear();
        setTimeout(() => {
          window.location.href = '/employees_ar';
      }, 3000);
      } else {
        showAlert('fail', data.message);
      };
  } catch (error) {
    console.error('Error editing employee:', error.message);
    // يمكنك هنا إظهار رسالة خطأ أو اتخاذ إجراء آخر في حالة حدوث أي خطأ آخر
  }
};



async function delete_employee_fn() {
  try {
   const permission = await btn_permission('employees_permission','delete');

   if(!permission) {
    return;
   };

   if (!confirm(`Please Confirm.. Do you want to delete data ?`)) {
    return;
  }

    // تحضير البيانات التى سيتم ارسالها للخادم
    const posted_elements = {
      employee_id
    };
  
        // إرسال البيانات إلى الخادم
        const response = await fetch('/delete_employee', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(posted_elements)
        });
        // استلام الرد من الخادم
        const data = await response.json();
          if (data.success) {
            showAlert('success', data.message);
            clear();
            setTimeout(() => {
              window.location.href = '/employees_ar';
          }, 3000);
          } else {
            showAlert('fail', data.message);
          };
  } catch (error) {
    console.error('Error Deleting employee',error.message)
  }
};


function clear() {
const fieldsToClear = [
'#employee_name_input',
'#employee_job_input',
'#employee_beta2a_input',
'#employee_adress_input',
'#employee_phone_input',
'#employee_emergency_phone_input',
'#employee_start_date_input',
'#employee_leave_date_input'
];
fieldsToClear.forEach(field => {
document.querySelector(field).value = '';
});
};


//#endregion End- Functions




document.addEventListener('DOMContentLoaded', function () {
    get_employee_data_fn();
});



    document.querySelector('#btn_edit').addEventListener('click', function () {
      update_employee_data();
    });

    document.querySelector('#btn_delete').addEventListener('click', function () {
      delete_employee_fn();
    });    
    





