

const btn_send = document.querySelector(`#btn_send`)

btn_send.onclick = async function () {
 
    const account_name_input = document.querySelector(`#account_name_input`).value.trim();
    const phone_input = document.querySelector(`#phone_input`).value.trim();
    const email_input = document.querySelector(`#email_input`).value.trim();
    const massage_input = document.querySelector(`#massage_input`).value.trim();
    const user_name_input = document.querySelector(`#user_name_input`).value.trim();
    const user_pass_input1 = document.querySelector(`#user_pass_input1`).value.trim();
    const user_pass_input2 = document.querySelector(`#user_pass_input2`).value.trim();

    if (!account_name_input){
        showAlert(`warning`, 'برجاء إدخال اسم المالك بشكل صحيح')
        return
    }

    if (!phone_input){
        showAlert(`warning`, 'برجاء إدخال رقم الهاتف بشكل صحيح')
        return
    }

    if (!email_input){
        showAlert(`warning`, 'برجاء إدخال البريد الالكترونى بشكل صحيح')
        return
    }

    if (!massage_input){
        showAlert(`warning`, 'برجاء إدخال نص الرسالة بشكل صحيح')
        return
    }
    
    if (!user_name_input){
        showAlert(`warning`, 'برجاء إدخال اسم المستخدم بشكل صحيح')
        return
    }

    if (!user_pass_input1 || !user_pass_input2){
        showAlert(`warning`, 'برجاء إدخال كلمة المرور بشكل صحيح')
        return
    }

    if (user_pass_input1 !== user_pass_input2){
        showAlert(`warning`, 'كلمة المرور غير متطابقة')
        return
    }


    const post = await new_fetchData_postAndGet(
        "/register_request",
        {account_name_input,
            phone_input,
            email_input,
            massage_input,
            user_name_input,
            user_pass_input1,
            user_pass_input2,
        },
        'pass','pass', // معلق
        15,
        true,'هل تريد ارسال الطلب الى الدعم الفنى ؟',
        true,
        false,false,
        false,false,false,
        true,"login",
        false,false,
        "حدث خطأ اثناء معالجه البيانات"
    )

}





document.addEventListener("DOMContentLoaded", function () {
    // function clearInputs() {
    //     document.querySelectorAll("input, textarea").forEach(element => {
    //         element.value = "";
    //     });
    // }

    // clearInputs(); // استدعاء الدالة عند تحميل الصفحة
});
