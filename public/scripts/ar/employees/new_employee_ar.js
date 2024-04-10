    //#region  save function
    document.querySelector('#btn_save').addEventListener('click',async function () {
        try {
          // event.preventDefault(); // if <a>
      
          // استعداد البيانات
          const employee_name_input = document.querySelector('#employee_name_input').value.trim();
          const employee_job_input = document.querySelector('#employee_job_input').value.trim();
          const employee_beta2a_input = document.querySelector('#employee_beta2a_input').value.trim();
          const employee_adress_input = document.querySelector('#employee_adress_input').value.trim();
          const employee_phone_input = document.querySelector('#employee_phone_input').value.trim();
          const employee_emergency_phone_input = document.querySelector('#employee_emergency_phone_input').value.trim();
          const employee_start_date_input = document.querySelector('#employee_start_date_input').value.trim();
          const employee_leave_date_input = document.querySelector('#employee_leave_date_input').value.trim();
          const today = new Date().toISOString().split('T')[0]; // date in format (yyyy-mm-dd)
          // البيانات الأخرى...
      
          // التحقق من صحة البيانات هنا
      
          if (!employee_name_input) {
            return; // يجب إعادة التنفيذ بمجرد إظهار الخطأ أو إتخاذ إجراء آخر
          };
      
          // تأكيد المستخدم
          if (!confirm(`Please Confirm.. Do you want to save data ?`)) {
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
          };
      
          // إرسال البيانات إلى الخادم
          const response = await fetch('/addNewEmployee', {
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
            } else {
              showAlert('fail', data.message);
            };
        } catch (error) {
          console.error('Error adding employee:', error.message);
          // يمكنك هنا إظهار رسالة خطأ أو اتخاذ إجراء آخر في حالة حدوث أي خطأ آخر
        }
      });
      

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
    document.querySelector(field).value = null;
});
      };
          //#endregion End save Function
      
      
      
      