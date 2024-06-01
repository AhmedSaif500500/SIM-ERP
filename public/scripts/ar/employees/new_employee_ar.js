    //#region  save function
    setActiveSidebar('employees_ar');
    document.querySelector('#btn_save').addEventListener('click',async function () {
        try {

          if (inputErrors) {
            showAlert("fail", "رجاء اصلح  حقول الادخال التى تحتوى على اخطاء");
            return;
          }

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

      
          // تجهيز البيانات للإرسال إلى الخادم

      
          // إرسال البيانات إلى الخادم
          await fetchData_post1(
            "/addNewEmployee",
            {employee_name_input,
              employee_job_input,
              employee_beta2a_input,
              employee_adress_input,
              employee_phone_input,
              employee_emergency_phone_input,
              employee_start_date_input,
              employee_leave_date_input,
              today},
            'employees_permission','add',
            'هل تريد حفظ بيانات الموظف الجديد',
            10,
                'new_employee_ar',
                'حدث خطأ اثناء اضافه الموظف وتم الغاء العمليه'
            )
        } catch (error) {
          console.error('Error adding employee:', error.message);
          // يمكنك هنا إظهار رسالة خطأ أو اتخاذ إجراء آخر في حالة حدوث أي خطأ آخر
        }
      });

          //#endregion End save Function
      
      
      
      