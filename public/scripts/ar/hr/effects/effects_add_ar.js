setActiveSidebar('hr_ar');

  const dropdown_div = document.querySelector(`#dropdown_div`)

  document.addEventListener('DOMContentLoaded', async function() {
    showLoadingIcon(content_space)
    await create_drop_down(`dropdown_div`,'/getEmployeesData1','effects_permission','view')
   hideLoadingIcon(content_space)
  });
  
  
 


const date_input = document.querySelector('#date_input');
const id_hidden_input = dropdown_div.querySelector(`#dropdown_div_hidden_input`);
const dropdown_select_input = dropdown_div.querySelector(`#dropdown_div_select_input`);

const days_input = document.querySelector('#days_input');
const hours_input = document.querySelector('#hours_input');
const values_input = document.querySelector('#values_input');
const note_input = document.querySelector('#note_input');


date_input.value = today;


function values_color(){
  try {
    const array = []
  } catch (error) {
    catch_error(error)
  }
}


function clear_inputs() {
  dropdown_div.querySelector(`#dropdown_div_select_input`).value = ''
  note_input.value = ''
  date_input.value = today
    days_input.value = 0
    hours_input.value = 0
    values_input.value = 0

  colors()
};
//#endregion End save Function


async function save(A_or_B) {

  const date_input_val = date_input.value;
  const id_hidden_input_val = dropdown_div.querySelector(`#dropdown_div_hidden_input`).value;
  const dropdown_select_input_val = dropdown_div.querySelector(`#dropdown_div_select_input`).value;
  const days_input_val = +days_input.value == 0 ? null : days_input.value
  const hours_input_val = +hours_input.value == 0 ? null : hours_input.value
  const values_input_val = +values_input.value == 0 ? null : values_input.value
  const note_input_val = document.querySelector('#note_input').value.trim();


  if (!id_hidden_input_val) {
    showAlert('warning', 'من فضلك اختر احد الموظفين من القائمه')
    return; // يجب إعادة التنفيذ بمجرد إظهار الخطأ أو إتخاذ إجراء آخر
  };

  if (days_input === "0" && hours_input === "0" && values_input === "0") {
    showAlert('warning', 'ادخل قيمه واحده على الاقل من القيم الثلاثه')
    return; // يجب إعادة التنفيذ بمجرد إظهار الخطأ أو إتخاذ إجراء آخر
  };

  posted_items = {date_input_val, id_hidden_input_val, days_input_val, hours_input_val, values_input_val, note_input_val}

  if (A_or_B == 'A'){

    const post1 = await new_fetchData_postAndGet(
      '/effects_add',
      posted_items,
      'effects_permission','add',
      15,
      true,'هل تريد حفظ البيانات ؟',
      false,
      false,'',
      false,false,'',
      true,'effects_view_ar',
      false,'',
      'حدث خطأ اثناء معالجة البيانات'
    )

  } else if(A_or_B == 'B'){



    const post1 = await new_fetchData_postAndGet(
      '/effects_add',
      posted_items,
      'effects_permission','add',
      15,
      true,'هل تريد حفظ البيانات ؟',
      false,'',
      false,false,'',
      false,'',
      false,'',
      'حدث خطأ اثناء معالجة البيانات'
    )


    if (post1) {
      clear_inputs()
    }
  }
}


function colors() {
  const inputs = [days_input, hours_input, values_input]
  for (const input of inputs){
    if (+input.value < 0){
      input.classList.add(`td_negative_number`)
    }else {
      input.classList.remove(`td_negative_number`)
    }
  }
}

days_input.oninput = () =>{
colors()
}

hours_input.oninput = () =>{
colors()
}

values_input.oninput = () =>{
colors()
}


