setActiveSidebar('production_view_ar');

const today = new Date().toISOString().split('T')[0]; // date in format (yyyy-mm-dd)
    document.querySelector(`#date1`).value = today
    //#region  save function
    document.querySelector('#btn_save').addEventListener('click',async function () {
        try {

            if (inputErrors) {
                showAlert('fail','رجاء اصلح  حقول الادخال التى تحتوى على اخطاء')
                return;
            }
          // event.preventDefault(); // if <a>
      
          // استعداد البيانات
          const production_amount_input = parseFloat(document.querySelector('#production_amount_input').value.trim()) || 0;
          const sales_amount_input = parseFloat(document.querySelector('#sales_amount_input').value.trim()) || 0;
          const note1_input = document.querySelector('#note1_input').value.trim();
          const date1 = document.querySelector('#date1').value.trim();
          
          // البيانات الأخرى...
      
          // التحقق من صحة البيانات هنا
      
        //   if (!production_amount_input) {
        //     return; // يجب إعادة التنفيذ بمجرد إظهار الخطأ أو إتخاذ إجراء آخر
        //   };
      

      
          // تجهيز البيانات للإرسال إلى الخادم
          const posted_elements = {
            production_amount_input,
            sales_amount_input,
            note1_input,
            date1,
            today,
          };
          
           await showDialog('','هل تريد حفظ البيانات ؟','')
          if (!dialogAnswer){
            return
          }

          // إرسال البيانات إلى الخادم
          const response = await fetch('/production_add_ar', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(posted_elements)
          });
          // استلام الرد من الخادم
          const data = await response.json();
            if (data.success) {
                closeDialog()
              showAlert('success', data.message);
              clear();
            } else {
                closeDialog()
              showAlert('fail', data.message);
            };
        } catch (error) {
            catch_error(`error production_add_ar : `,error)
          // يمكنك هنا إظهار رسالة خطأ أو اتخاذ إجراء آخر في حالة حدوث أي خطأ آخر
        }
      });
      

      function clear() {
const fieldsToClear = [
'#production_amount_input',
'#sales_amount_input',
'#note1_input',
];
fieldsToClear.forEach(field => {
    document.querySelector(field).value = null;
});

date1.value = today;
      };
          //#endregion End save Function
      
      
      
      
