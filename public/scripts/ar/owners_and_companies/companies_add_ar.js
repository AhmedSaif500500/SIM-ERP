const company_name_input = document.querySelector(`#company_name_input`)
const btn_add_company = document.querySelector(`#btn_add_company`)


async function add_newCompany_fn() {
    
    const company_name_input_value = company_name_input.value.trim()
    if (!company_name_input_value || company_name_input_value == ""){
        showAlert('warning','ادخل اسم صحيح للعمل التجارى')
        return
    }

    const add = await new_fetchData_postAndGet(
        "/api/add_new_company",
        {company_name_input_value},
        '','',
        60,
        true,'هل تريد تكوين الشكره الجديده ؟',
        true,
        false,'',
        false,'','',
        true,'companies_ar',
        true,'companies_ar',
        'حدث خطأ اثناء معالجة البيانات'
    )
}


btn_add_company.onclick = async function () {
    await add_newCompany_fn()
}

document.addEventListener("DOMContentLoaded", async function () {
    page_content.style.display = 'flex';
})
