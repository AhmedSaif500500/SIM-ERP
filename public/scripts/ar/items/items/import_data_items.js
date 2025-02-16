setActiveSidebar('itemsMain_view_ar');
pagePermission("add", "items_permission");


const btn1 = document.querySelector(`#btn1`)
const btn_save_account = document.querySelector(`#btn_save_account`)

btn1.onclick = function (params) {
    copyHeadersWithExample(
        ['مثال:', 'صنف', '51454', 'صنف 1', 'كيلو', 'المخزون الحالى', 'ايرادات مبيعات - المخزون', '5000', '4000', '100'], // صف المثال
        'صنف / مجموعة', 'معرف الصنف ( اختيارى )', 'اسم الصنف ( مطلوب )', 'وحدة القياس ( مطلوب )', 'المجموعة ( مطلوب )' , 'حساب الدخل ( مطلوب )', 'سعر البيع الافتراضى ( اختياري )', 'سعر الشراء الافتراضى ( اختياري )', 'نقطة إعادة الطلب ( اختيارى )'// رؤوس الأعمدة
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
            '/api/add_imported_items',
            {posted_array},
            'items_permission','add',
            120,
            true,'هل تريد تاكيد المعالجة والحفظ ؟',
            true,
            false,false,
            false,false,false,
            true,'items_table_view_ar',
            true,'items_table_view_ar',
            `❌ حدث خطأ اثناء معالجة البيانات`
        )
    } catch (error) {
        catch_error(error);
    } finally {
        hideLoadingIcon(btn_save_account);
    }
}