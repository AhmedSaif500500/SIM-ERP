
    //#region  save function
    setActiveSidebar('fixedAssestsMain_view_ar');
    pagePermission('update', 'fixed_assests_permissions');

    const fixed_assests_update_data = JSON.parse(sessionStorage.getItem('fixed_assests_update_data'));
// sessionStorage.removeItem(`sales_invoice_update_data`)

if (!fixed_assests_update_data){
    redirection("fixed_assests_view_ar","fail","حدث خطأ اثناء معالجة البيانات سيتم تحويل الى صفحه الاصول الثابتة الرئيسية")
}

    const h2_text_div = document.querySelector(`#h2_text_div`)
    const sub_h2_header = document.querySelector(`#sub_h2_header`)

    const fixed_ssests_input = document.querySelector(`#fixed_ssests_input`);
    const fixed_ssests_name_input = document.querySelector(`#fixed_ssests_name_input`);
    const purshase_date_input = document.querySelector(`#purshase_date_input`); purshase_date_input.value = today;
    const started_accumulated_depeciation_date_input = document.querySelector(`#started_accumulated_depeciation_date_input`); started_accumulated_depeciation_date_input.value = today;
    const rate_input = document.querySelector(`#rate_input`);
    const un_depericated_value_input = document.querySelector(`#un_depericated_value_input`);
    const fixed_ssests_group_name_input = document.querySelector(`#fixed_ssests_group_name_input`);
    const asset_info_input = document.querySelector(`#asset_info_input`);
    const btn_update = document.querySelector(`#btn_update`);
    const btn_delete = document.querySelector(`#btn_delete`);
    
    
  let data = []
  async function showData(){
    
    const x = fixed_assests_update_data.x
    if(!x){
      redirection("fixed_assests_view_ar","fail","حدث خطأ اثناء معالجة البيانات سيتم تحويل الى صفحه الاصول الثابتة الرئيسية")
    }

    data = await new_fetchData_postAndGet(
      'get_fixed_assests_data_for_update_page',
      {x},
      "fixed_assests_permission", "view", 15,
      false,"",
      true,
      false,false,
      false,false,false,
      false,false,
      true,'fexed_assests_view_ar','حدث خطأ اثناء معالجه البيانات'
   ) 

   const headerData = data.asset_data
   fixed_ssests_input.value = headerData.account_no || ''
   fixed_ssests_name_input.value = headerData.account_name
   purshase_date_input.value = headerData.purshases_date
   started_accumulated_depeciation_date_input.value = headerData.started_depreciation_date
   rate_input.value = headerData.rate_value
   un_depericated_value_input.value = headerData.un_depericated_value
   fixed_ssests_group_name_input.value = headerData.fixed_ssests_group_name
   asset_info_input.value = headerData.asset_info


    create_drop_down_with_External_DataArray(`dropdown_div`,data.expensesAccountsArray); selectedRow_dropdownDiv(`dropdown_div`,data.expensesAccountsArray,+headerData.item_expense_account);
  }



  btn_update.onclick = async function () {
    try {
      const x = data.asset_data.id
      const fixed_ssests_input_value = fixed_ssests_input.value.trim()
      const fixed_ssests_name_input_value = fixed_ssests_name_input.value.trim()
      const purshase_date_input_value = purshase_date_input.value
      const started_accumulated_depeciation_date_input_value = started_accumulated_depeciation_date_input.value
      const rate_input_value = rate_input.value.trim()
      const un_depericated_value_input_value = un_depericated_value_input.value
      const fixed_ssests_group_name_input_value = fixed_ssests_group_name_input.value.trim()
      const asset_info_input_value = asset_info_input.value
      const dropdown_div_hidden_input_value = document.querySelector(`#dropdown_div_hidden_input`).value


      if (!fixed_ssests_name_input_value){
        showAlert('warning','برجاء ادخال اسم الاصل ')
        return
      }

      if (!rate_input_value){
        showAlert('warning','برجاء ادخال معدل الاهلاك السنوى ')
        return
      }
      const posted_elements = {
        x,
        fixed_ssests_input_value,
        fixed_ssests_name_input_value,
        purshase_date_input_value,
        started_accumulated_depeciation_date_input_value,
        rate_input_value,
        un_depericated_value_input_value,
        fixed_ssests_group_name_input_value,
        asset_info_input_value,
        dropdown_div_hidden_input_value
      }

      const post = await new_fetchData_postAndGet(
        '/fixed_assests_update',
        posted_elements,
        'fixed_assests_permission','update',
        15,
        true,'هل تريد تعديل  بيانات الاصل الثابت ؟',
        true,
        false,"",
        false,false,false,
        true,'fixed_assests_view_ar',
        false,false,
        "حدث حطأ اثناء معالجة البيانات"
      )      

    } catch (error) {
      catch_error(error)
    }
  }


  btn_delete.onclick = async function () {
try {
  const x = data.asset_data.id

  const posted_elements = {
    x
  }
  
  const post = await new_fetchData_postAndGet(
    '/fixed_assests_delete',
    posted_elements,
    'fixed_assests_permission','delete',
    15,
    true,'هل تريد حذف  بيانات الاصل الثابت ؟',
    true,
    false,"",
    false,false,false,
    true,'fixed_assests_view_ar',
    false,false,
    "حدث حطأ اثناء معالجة البيانات"
  )      


} catch (error) {
  catch_error(error)
}
  }


function handle_fn_options(){
  const newDivs = `
    <div id="fn_option_update_btn" onclick="viewMode(false,'fixed_assests_permission','update')">وضع التعديل</div>
    <div id="fn_option_view_btn" onclick="viewMode(true,'fixed_assests_permission','view')" style="display: none;">وضع العرض</div>
  `;
  fn_options_div.insertAdjacentHTML('afterbegin', newDivs);
}

      
    document.addEventListener('DOMContentLoaded', async () =>{
      try {
        showLoadingIcon(content_space);
        await showData()
        viewMode(true,'fixed_assests_permission','view')
        handle_fn_options()
        hideLoadingIcon(content_space);
      } catch (error) {
        catch_error(error)
      }
    })
