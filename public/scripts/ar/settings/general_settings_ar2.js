

//#region dialog

const dialogOverlay_input = document.querySelector(`#dialogOverlay_input`);
const report_name_input = document.querySelector(`#report_name_input`);
const view_report_btn = document.querySelector(`#view_report_btn`);
const cancel_report_btn = document.querySelector(`#cancel_report_btn`);
const delete_x = document.querySelector(`#delete_x`)
const x1 = document.querySelector(`#delete_name_input`)
const x2 = document.querySelector(`#user_pass_input`)
const x3 = document.querySelector(`#owner_pass_input`)

view_report_btn.onclick = async function () {
    try {
      
        const x1Val = x1.value.trim()
        const x2Val = x2.value.trim()
        const x3Val = x3.value.trim()

        if (!x1Val || !x2Val || !x3Val){
            showAlert('warning','برجاء ادخال البيانات بشكل صحيح')
            return;
        }


        data = await new_fetchData_postAndGet(
            "/delete_company",
            {x1Val, x2Val, x3Val},
            "pass","pass", // معلق
            50,
            true,'هل تريد حذف بيانات العمل التجارى ؟',
            true,
            false,false,
            false,false,'',
            true,'login',
            true,'general_settings_ar',
            'حدث خطأ اثناء معالجة البيانات'
        )


        close_dialogx()
    } catch (error) {
        catch_error(error)
    }
}

function show_dialogx(){
        x1.value = ''
        x2.value = ''
        x3.value = ''
    dialogOverlay_input.style.display = 'flex' // show dialog
}


delete_x.onclick = function(){
    show_dialogx()
}


cancel_report_btn.onclick = function(){
    close_dialogx()
}

function close_dialogx(){
    try {

        cancel_dialogOverlay_input(dialogOverlay_input)
    } catch (error) {
        catch_error(error)
    }
}
//#endregion end dialog

