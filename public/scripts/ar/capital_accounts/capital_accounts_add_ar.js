
    //#region  save function
    setActiveSidebar('capital_accounts_view_ar');
    pagePermission('add', 'accounts_permissions');


    const h2_text_div = document.querySelector(`#h2_text_div`)
    const sub_h2_header = document.querySelector(`#sub_h2_header`)

    const cash_accounts_input = document.querySelector(`#cash_accounts_input`);
    const cash_accounts_name_input = document.querySelector(`#cash_accounts_name_input`);
  
        



    async function save(A_or_B) {
      const cash_accounts_input_value = cash_accounts_input.value.trim()
      const cash_accounts_name_input_value = cash_accounts_name_input.value.trim()


      if (!cash_accounts_name_input_value){
        showAlert('warning','برجاء ادخال اسم حساب رأس المال ')
        return
      }


      const posted_elements = {
        cash_accounts_input_value,
        cash_accounts_name_input_value
      }


      const redirection_page = A_or_B === 'A' ? 'capital_accounts_view_ar' : 'capital_accounts_add_ar';


        const post = await new_fetchData_postAndGet(
          '/capital_accounts_add',
          posted_elements,
          'accounts_permission','add',
          50,
          true,'هل تريد حفظ بيانات حساب رأس المال الجديد ؟',
          true,
          false,"",
          false,false,false,
          true,redirection_page,
          false,false,
          "حدث حطأ اثناء معالجة البيانات"
        )

    }      
      
     
    document.addEventListener('DOMContentLoaded', async () =>{
      try {
        showLoadingIcon(content_space);
        // await showData()
        hideLoadingIcon(content_space);
      } catch (error) {
        catch_error(error)
      }
    })
