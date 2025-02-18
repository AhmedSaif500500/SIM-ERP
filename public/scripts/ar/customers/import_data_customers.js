setActiveSidebar('customers_view_ar');
pagePermission("add", "customers_permission");


const btn1 = document.querySelector(`#btn1`)
const btn_save_account = document.querySelector(`#btn_save_account`)

btn1.onclick = function (params) {
    copyHeadersWithExample(
        ['مثال:', '51454', 'عميل 1', '20000', 'YourEmail@expm.com', '123456789', 'نص1', 'رقم هاتم1 : 123456789', 'رقم الحساب البنكى : 123456789', 'عنوان1', 'لا'], // صف المثال
        'معرف العميل ( اختيارى )', 'اسم العميل ( مطلوب )', 'الحد الائتمانى ( اختياري )', 'البريد الالكترونى ( اختياري )' , 'رقم التسجيل الضريبيى ( اختياي )', 'بيانات قانونية ( اختياري )', 'بيانات التواصل ( اختياري )', 'بيانات بنكية ( اختيارى )', 'عنوان التسليم ( اختياري )', 'امكانية الشراء من العمليل ؟ ( نعم / لا )'// رؤوس الأعمدة
      );
      
}



btn_save_account.onclick = async function name(params) {

    try {
        const text = document.getElementById('text_area1').value;
        if (!text){
            showAlert(`warning`, `⚠️ برجاء التأكد تطبيق المراحل بشكل صحيح`)
        }
        showLoadingIcon(btn_save_account);

        const rows = text.trim().split('\n'); // تقسيم الأسطر
      
        const posted_array = rows.map(row => row.split('\t')); // تقسيم الأعمدة بناءً على التاب
      
        //console.table(parsedData); // بيانات Excel كصفوف وأعمدة
        // تعبئة النموذج الخاص بك هنا

        hideLoadingIcon(btn_save_account);

        const post = await new_fetchData_postAndGet(
            '/api/add_imported_customers',
            {posted_array},
            'customers_permission','add',
            120,
            true,'هل تريد تاكيد المعالجة والحفظ ؟',
            true,
            false,false,
            false,false,false,
            true,'customers_view_ar',
            true,'customers_view_ar',
            `❌ حدث خطأ اثناء معالجة البيانات`
        )
    } catch (error) {
        catch_error(error);
    } finally {
        hideLoadingIcon(btn_save_account);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    try {
        showLoadingIcon(content_space)
            
           // viewMode(true,'customers_permission','view')
           // handle_fn_options()
        hideLoadingIcon(content_space)
    } catch (error) {
        hideLoadingIcon(content_space)
        catch_error(error)
    }
});