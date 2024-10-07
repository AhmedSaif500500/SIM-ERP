const closingDate_input = document.querySelector(`#closingDate_input`);
const prevent_futureDate_checkbox = document.querySelector(`#prevent_futureDate_checkbox`);
const prevent_futureDate_input = document.querySelector(`#prevent_futureDate_checkbox`);

let data = []

async function getData(){

    data = await new_fetchData_postAndGet(
        "general_settings_view",
        {},
        '','',
        15,
        false,'',
        true,
        true,content_space,
        false,'','',
        false,'',
        true,'notes_ar',
        'حدث خطأ اثناء معالجة البيانات'
    )
    console.table(data);
    
}


function show_data(){
    if (!data){
        redirection('notes_ar','fail','حدث خطأ اثناء معالجة البيانات',)
    }

    const closingDate = data.find(item => item.setting_type_id === 1)?.datex1 || '';
    const prevent_futureDate = data.find(item => item.setting_type_id === 2)?.boolean1 || false;

    console.log(closingDate);
    console.log(prevent_futureDate);
    
    closingDate_input.value = closingDate;
    if (prevent_futureDate === true){
        prevent_futureDate_checkbox.checked = true;
        prevent_futureDate_input.placeholder = 'الخاصية قيد التفعيل'
    }else{
        prevent_futureDate_checkbox.checked = false;
        prevent_futureDate_input.placeholder = 'الخاصية معطّلة'
    }
    prevent_futureDate_checkbox.checked = prevent_futureDate === true;

}

document.addEventListener("DOMContentLoaded", async function () {
    await getData()
    show_data()
})