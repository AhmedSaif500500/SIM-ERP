const closingDate_input = document.querySelector(`#closingDate_input`);
const prevent_futureDate_checkbox = document.querySelector(`#prevent_futureDate_checkbox`);
const prevent_futureDate_input = document.querySelector(`#prevent_futureDate_checkbox`);
const btn_save = document.querySelector(`#btn_save`);
const btn_tax = document.querySelector(`#btn_tax`);
const btn_accounts_tree = document.querySelector(`#btn_accounts_tree`);
const btn_permissions = document.querySelector(`#btn_permissions`);
const btn_old_features = document.querySelector(`#btn_old_features`);

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
    
}


function show_data(){
    if (!data){
        redirection('notes_ar','fail','حدث خطأ اثناء معالجة البيانات',)
    }

    const closingDate = data.find(item => item.setting_type_id === 1)?.datex1 || '';
    const prevent_futureDate = data.find(item => item.setting_type_id === 2)?.boolean1 || false;

    closingDate_input.value = closingDate;

    prevent_futureDate_checkbox.checked = prevent_futureDate === true;

    if(prevent_futureDate === true){
        prevent_futureDate_checkbox.checked = true;
        prevent_futureDate_input.placeholder = 'الخاصية قيد التفعيل'
    }else{
        prevent_futureDate_checkbox.checked = false;
        prevent_futureDate_input.placeholder = 'الخاصية معطّلة'
    }

    
}


// function change_prevent_futureDate_checkbox(){
//     console.log(`started`);
    
//     if (prevent_futureDate_checkbox.checked === true){
//         prevent_futureDate_checkbox.checked = false;
//         prevent_futureDate_input.placeholder = 'الخاصية معطّلة'
//     }else{
//         prevent_futureDate_checkbox.checked = true;
//         prevent_futureDate_input.placeholder = 'الخاصية قيد التفعيل'
//     }
// }

// prevent_futureDate_checkbox.onchange = function() {
//     change_prevent_futureDate_checkbox();
// };



async function savesettingsChanges(){
    try {
        
    const closingDate = closingDate_input.value || '';
    const is_prevent_futureDate = prevent_futureDate_checkbox.checked;

    const update = await new_fetchData_postAndGet(
        "general_settings_update",
        {closingDate,is_prevent_futureDate},
        '','',
        15,
        true,'هل تريد حفظ الاعدادات الحالية ؟ ',
        true,
        false,'',
        false,'','',
        true,'general_settings_ar',
        false,'',
        'حدث خطأ اثناء معالجة البيانات وتم الغاء العمليه'
    )
} catch (error) {
    catch_error
}
}

btn_save.onclick = async function () {
    await savesettingsChanges()
}

btn_tax.onclick = function(){
    sessionStorage.removeItem(`settings_taxes_viewArray`);
    window.location.href = `settings_taxes_view_ar`;
}


btn_accounts_tree.onclick = function(){
    // sessionStorage.removeItem(`settings_taxes_ViewArray`); معلق
    window.location.href = `accounts_view_ar`;
}


btn_permissions.onclick = function(){
    // sessionStorage.removeItem(`settings_taxes_ViewArray`); معلق
    window.location.href = `permissions_view_ar`;
}

btn_old_features.onclick = function(){
    // sessionStorage.removeItem(`settings_taxes_ViewArray`); معلق
    window.location.href = `old_features_main_ar`;
}


document.addEventListener("DOMContentLoaded", async function () {
    await getData()
    show_data()
})



