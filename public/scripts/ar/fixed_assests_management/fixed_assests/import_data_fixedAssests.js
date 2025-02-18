setActiveSidebar('fixedAssestsMain_view_ar');
pagePermission("add", "fixed_assests_permission");


const btn1 = document.querySelector(`#btn1`)
const btn_save_account = document.querySelector(`#btn_save_account`)

btn1.onclick = function (params) {
    copyHeadersWithExample(
        ['مثال:', '51454', 'أصل ثابت 1', firstDayOfYear , firstDayOfYear, '10', '1000', ' سيارات', 'نوع الأصل او مواصفاته..', 'مصاريف اهلاك اصول ثابته'], // صف المثال
        'معرف الأصل الثابت ( اختيارى )', 'اسم الأصل الثابت ( مطلوب )', 'تاريخ شراء الأصل ( مطلوب )', ' تاريخ بداية الإاهلاك ( مطلوب )' , 'معدل الإهلاك % ( مطلوب )', 'القيمة التى لا يمكن إهلاكها ( اختياري )', 'وصف المجموعه التى ينتمى إاليها الأصل ( اختياري )', 'معلومات اخرى عن الأصل ( اختياري )', 'حساب مصروف إهلاك الأصل ( مطلوب )'// رؤوس الأعمدة
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
            '/api/add_imported_fixed_assests',
            {posted_array},
            'fixed_assests_permission','add',
            160,
            true,'هل تريد تاكيد المعالجة والحفظ ؟',
            true,
            false,false,
            false,false,false,
            true,'fixed_assests_view_ar',
            true,'fixed_assests_view_ar',
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
            
           // viewMode(true,'vendors_permission','view')
           // handle_fn_options()
        hideLoadingIcon(content_space)
    } catch (error) {
        hideLoadingIcon(content_space)
        catch_error(error)
    }
});