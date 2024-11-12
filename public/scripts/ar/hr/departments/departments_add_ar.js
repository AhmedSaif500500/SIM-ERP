
setActiveSidebar('hr_ar');
//check permissions
pagePermission('add', 'departments_permission');


const department_name_input = document.querySelector(`#department_name_input`)
const department_info_input = document.querySelector(`#department_info_input`)
const btn_save = document.querySelector(`#btn_save`)




async function save(A_or_B){
try {
    const name = department_name_input.value.trim();
    const info = department_info_input.value.trim();

    if (!name){
        showAlert('warning','ادخل اسم القسم اولا ')
        return
      }

      if (A_or_B == 'A'){
        const postData = await fetchData_postAndGet(
            '/addNewDepartment',
            {name,info},
            'departments_permission','add',
            15,
            true,'هل تريد حفظ بيانات القسم الجديد ؟',
            true,
            false,'',
            true,'departments_view_ar',
            'حدث خطأ اثناء معالجة البيانات'
        )

      } else if(A_or_B == 'B'){

        const postData = await fetchData_postAndGet(
            '/addNewDepartment',
            {name,info},
            'departments_permission','add',
            15,
            true,'هل تريد حفظ بيانات القسم الجديد ؟',
            true,
            false,'',
            false,'',
            'حدث خطأ اثناء معالجة البيانات'
        )

        if (postData) {
            clear_inputs()
          }
      }

} catch (error) {
    catch_error(error)
}
}


function clear_inputs(){
    try {
        const inputs = document.querySelectorAll(`input, textarea`);
        for ( const input of inputs){
            input.value = ''
        }

    } catch (error) {
        catch_error(error)
    }
}

