

let Authentication = true;
//#region  Authentication
const production_data = JSON.parse(sessionStorage.getItem('production_edite_data'));
sessionStorage.removeItem('production_edite_data');
if (!production_data) {
  Authentication = false;
  redirection('production_view_ar','fail','من فضلك اختر يوم الانتاج اولا للتعديل , سيتم توجيهك الى صفحه الانتاج والجرد')
};

document.querySelector(`#hidden_id_input`).value = production_data.id_value;
document.querySelector(`#date1`).value = production_data.date_value;
document.querySelector(`#note1_input`).value = production_data.note_value;
document.querySelector(`#production_amount_input`).value = production_data.procution_value;
document.querySelector(`#sales_amount_input`).value = production_data.sales_value;


const today = new Date().toISOString().split('T')[0]; // date in format (yyyy-mm-dd)

    //#region  save function
    document.querySelector('#btn_edit').addEventListener('click',async function () {
        try {

            if (inputErrors) {
                showAlert('fail','رجاء اصلح  حقول الادخال التى تحتوى على اخطاء')
                return;
            }
          // event.preventDefault(); // if <a>
      
          // استعداد البيانات
          const id_input = document.querySelector('#hidden_id_input').value;
          const production_amount_input = document.querySelector('#production_amount_input').value.trim();
          const sales_amount_input = document.querySelector('#sales_amount_input').value.trim();
          const note1_input = document.querySelector('#note1_input').value.trim();
          const date1 = document.querySelector('#date1').value.trim();
          

          const posted_elements = {
            id_input,
            production_amount_input,
            sales_amount_input,
            note1_input,
            date1,
            today,
          };
          
           await showDialog('','هل تريد تعديل البيانات ؟','')
          if (!dialogAnswer){
            return
          }

          // إرسال البيانات إلى الخادم
          const response = await fetch('/production_edit_ar', {
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
      

      async function delete_production() {
        try {

            
            if (inputErrors) {
                showAlert('fail','رجاء اصلح  حقول الادخال التى تحتوى على اخطاء')
                return;
            }
            
         const permission = await btn_permission('production_permission','delete');
      
         if(!permission) {
          return;
         };
      
         await showDialog('','هل تريد حذف البيانات ؟','')
         if (!dialogAnswer){
            return;
         }
         
         id = production_data.id_value
          // تحضير البيانات التى سيتم ارسالها للخادم
          const posted_elements = {
            id
          };
        
              // إرسال البيانات إلى الخادم
              const response = await fetch('/delete_production', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(posted_elements)
              });
              // استلام الرد من الخادم
              const data = await response.json();
                if (data.success) {
                    closeDialog();
                  showAlert('success', data.message);
                  clear();
                } else {
                    closeDialog()
                  showAlert('fail', data.message);
                };
        } catch (error) {
          console.error('Error Deleting employee',error.message)
        }
      };

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
redirection('production_view_ar','warning','من  سيتم توجيهك الى صفحه الانتاج والجرد') 
     };
          //#endregion End save Function

          document.querySelector('#btn_delete').addEventListener('click', function () {
            delete_production();
          });    
      
      
      
      