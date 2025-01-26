


setActiveSidebar('hr_ar');
pagePermission('view', 'effects_permission');

page_content.style.display = 'none';
showLoadingIcon(content_space) 

const back_href = document.querySelector(`#back_href`)
const h2_text_div = document.querySelector(`#h2_text_div`)
const sub_h2_header = document.querySelector(`#sub_h2_header`)

const date_input = document.querySelector('#date_input');
const days_input = document.querySelector('#days_input');
const hours_input = document.querySelector('#hours_input');
const values_input = document.querySelector('#values_input');
const note_input = document.querySelector('#note_input');
const x_input = document.querySelector('#x_input');
const btn_update = document.querySelector('#btn_update');
const btn_delete = document.querySelector('#btn_delete');
const dropdown_div = document.querySelector(`#dropdown_div`)

let effects_update_data = {}
let is_coming_from_effects_view = false
let urlData = getURLData('data','effects_view_ar','رابط غير صالح : سيتم اعادة توجيهك الى صفحة المؤثرات')
let effects_data = urlData.effects_update_data
function CheckUrlParams (){
  try {
      if (effects_data && effects_data !== 'noParams'){
        effects_update_data = {pageName : 'effects_update_ar',}
            const encodedData = encodeURIComponent(JSON.stringify(effects_update_data));
            back_href.href = `effects_view_ar?data=${encodedData}`
            is_coming_from_effects_view = true
            return true
      }else if(effects_data && effects_data === 'noParams'){
            return true
      }else{
          return false
      }
              
  } catch (error) {
      catch_error(error)
      return false
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



async function showData(){
  try {
    sub_h2_header.textContent = `تعديل /  ${effects_data.acc_name}`
    x_input.value = effects_data.x;
    date_input.value = effects_data.datex;
    reference_input.value = effects_data.referenceCONCAT;
    dropdown_div.querySelector(`#dropdown_div_hidden_input`).value = effects_data.emp_x;
    dropdown_div.querySelector(`#dropdown_div_select_input`).value = effects_data.acc_name;
    days_input.value = !effects_data.days || effects_data.days === ''? 0 : effects_data.days; 
    hours_input.value = !effects_data.hours || effects_data.hours === ''? 0 : effects_data.hours; 
    values_input.value = !effects_data.values || effects_data.values === ''? 0 : effects_data.values; 
    note_input.value = effects_data.note

  } catch (error) {
    catch_error(error)
  }
}



async function update(){

try {
  

  const id = effects_data.x
  const date_val = date_input.value
  const emp_id = dropdown_div.querySelector(`#dropdown_div_hidden_input`).value
  const emp_name = dropdown_div.querySelector(`#dropdown_div_select_input`).value.trim()
  const days_val = !days_input.value || days_input.value == 0 || days_input.value == '' || isNaN(days_input.value) ? null : days_input.value;
  const hours_val = !hours_input.value || hours_input.value == 0 || hours_input.value == '' || isNaN(hours_input.value) ? null : hours_input.value;
  const values_val = !values_input.value || values_input.value == 0 || values_input.value == '' || isNaN(values_input.value) ? null : values_input.value;
  const note_val = note_input.value.trim()
  const reference = effects_data.reference;

  if (!id || isNaN(id) || emp_name == ''){
    showAlert(`warining`,'اختر الموظف للتعديل')
    return
  }


    const gpt = await new_fetchData_postAndGet(
      '/effects_update',
      {id,
        date_val,
        emp_name,
        emp_id,
        days_val,
        hours_val,
        values_val,
        note_val,
        reference
      },
      'effects_permission','update',15,
      true,'هل تريد تعديل  البيانات ؟',
      true,
      false,'',
      true,effects_update_data,'effects_view_ar',
      false,'',
      false,'',
      'حدث خطأ اثناء معالجة البيانات'
    )

  } catch (error) {
    catch_error(error)
  }
  }

btn_update.onclick = function() {
  update()
}

btn_delete.onclick = async function(){
  try {
    
  const id = effects_data.x;
  const datex = effects_data.datex;
  const reference = effects_data.reference;
  

  const post = await new_fetchData_postAndGet(
    '/effects_delete',
    {id,datex,reference},
    'effects_permission','delete',
    15,
    true,'هل تريد حذف بيانات المؤثؤات ؟',
    false,
    false,'',
    true,effects_update_data,'effects_view_ar',
    false,'',
    true,'effects_view_ar',
    'حدث خطأ اثناء معالجة البيانات'
  )


} catch (error) {
  catch_error
}
}


document.addEventListener('DOMContentLoaded', async () =>{
  try {
    showLoadingIcon(content_space)
    await create_drop_down(`dropdown_div`,'/getEmployeesData1','effects_permission','view')
    const result = CheckUrlParams(); if (!result) {return}
    await showData()
    colors()
    viewMode(true,'effects_permission','view')
    handle_fn_options()
    hideLoadingIcon(content_space)
    page_content.style.display = 'flex';
  } catch (error) {
    hideLoadingIcon(content_space)
    catch_error(error)
  }
  
 
})


function handle_fn_options(){  
  const newDivs = `
    <div id="fn_option_update_btn" onclick="viewMode(false,'effects_permission','update')">وضع التعديل</div>
    <div id="fn_option_view_btn" onclick="viewMode(true,'effects_permission','view')" style="display: none;">وضع العرض</div>
  `;
  fn_options_div.insertAdjacentHTML('afterbegin', newDivs);
}
