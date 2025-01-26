
    //#region  save function
    setActiveSidebar('fixedAssestsMain_view_ar');
    pagePermission('add', 'fixed_assests_permissions');


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
    
    

  async function showData(){
    
   const data1 = await new_fetchData_postAndGet(
      'get_expenses_accounts',
      {},
      "fixed_assests_permission", "add", 15,
      false,"",
      true,
      false,false,
      false,false,false,
      false,false,
      true,'fexed_assests_view_ar','حدث خطأ اثناء معالجه البيانات'
   ) 

    create_drop_down_with_External_DataArray(`dropdown_div`,data1.expensesAccountsArray); selectedRow_dropdownDiv(`dropdown_div`,data1.expensesAccountsArray,data1.deafultDepreciationExpensesAccount.id);
  }


    async function save(A_or_B) {
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


      const redirection_page = A_or_B === 'A' ? 'fixed_assests_view_ar' : 'fixed_assests_add_ar';


        const post = await new_fetchData_postAndGet(
          '/fixed_assests_add',
          posted_elements,
          'fixed_assests_permission','add',
          50,
          true,'هل تريد حفظ بيانات الاصل الجديد ؟',
          true,
          false,"",
          false,false,false,
          true,redirection_page,
          false,false,
          "حدث حطأ اثناء معالجة البيانات"
        )

    }



          //#endregion End save Function
      
      
      
      
    document.addEventListener('DOMContentLoaded', async () =>{
      try {
        showLoadingIcon(content_space);
        await showData()
        hideLoadingIcon(content_space);
      } catch (error) {
        catch_error(error)
      }
    })
