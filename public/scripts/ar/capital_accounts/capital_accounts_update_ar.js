
    //#region  save function
    setActiveSidebar('capital_accounts_view_ar');
    pagePermission('view', 'accounts_permissions');

    const capital_accounts_update_data = JSON.parse(sessionStorage.getItem('capital_accounts_update_data'));
    // sessionStorage.removeItem(`sales_invoice_update_data`)
    
    if (!capital_accounts_update_data){
        redirection("capital_accounts_view_ar","fail","حدث خطأ اثناء معالجة البيانات سيتم تحويل الى صفحه حسابات رأس المال الرئيسية")
    }
    

    const obj_items_cash_accounts = {pageName : 'capital_accounts_update_ar'}

const encodedData = encodeURIComponent(JSON.stringify(obj_items_cash_accounts));
back_href.href = `capital_accounts_view_ar?data=${encodedData}`


    const h2_text_div = document.querySelector(`#h2_text_div`)
    const sub_h2_header = document.querySelector(`#sub_h2_header`)
    const btn_update = document.querySelector(`#btn_update`)
    const btn_delete = document.querySelector(`#btn_delete`)

    const cash_accounts_input = document.querySelector(`#cash_accounts_input`);
    const cash_accounts_name_input = document.querySelector(`#cash_accounts_name_input`);

        
    async function showData(){      
      const x = capital_accounts_update_data.x
      if(!x){
        redirection("capital_accounts_view_ar","fail","حدث خطأ اثناء معالجة البيانات سيتم تحويل الى صفحه الحسابات النقدية الرئيسية")
      }
  

     cash_accounts_input.value = capital_accounts_update_data.account_no
     cash_accounts_name_input.value = capital_accounts_update_data.account_name

    }
  
  


    btn_update.onclick = async function() {
      const x = capital_accounts_update_data.x
      const cash_accounts_input_value = cash_accounts_input.value.trim()
      const cash_accounts_name_input_value = cash_accounts_name_input.value.trim()


      if (!x || !cash_accounts_name_input_value){
        showAlert('warning','برجاء ادخال اسم الحساب ')
        return
      }


      const posted_elements = {
        x,
        cash_accounts_input_value,
        cash_accounts_name_input_value
      }


        const post = await new_fetchData_postAndGet(
          '/capital_accounts_update',
          posted_elements,
          'accounts_permission','update',
          50,
          true,'هل تعديل  بيانات حساب رأس المال',
          true,
          false,"",
          true,obj_items_cash_accounts,'capital_accounts_view_ar',
          false,false,
          false,false,
          "حدث حطأ اثناء معالجة البيانات"
        )

    }


    btn_delete.onclick = async function () {
      try {
        const x = capital_accounts_update_data.x

        const post = await new_fetchData_postAndGet(
          '/capital_accounts_delete',
          {x},
          'accounts_permission','update',
          50,
          true,'هل تعديل  حذف حساب رأس المال؟',
          true,
          false,"",
          true,obj_items_cash_accounts,'capital_accounts_view_ar',
          false,false,
          false,false,
          "حدث حطأ اثناء معالجة البيانات"
        )

      } catch (error) {
        catch_error(error)
      }
    }



function handle_fn_options(){
  const newDivs = `
    <div id="fn_option_update_btn" onclick="viewMode(false,'accounts_permission','update')">وضع التعديل</div>
    <div id="fn_option_view_btn" onclick="viewMode(true,'accounts_permission','view')" style="display: none;">وضع العرض</div>
  `;
  fn_options_div.insertAdjacentHTML('afterbegin', newDivs);
}

      
     
    document.addEventListener('DOMContentLoaded', async () =>{
      try {
        showLoadingIcon(content_space);
        await showData()
        viewMode(true,'accounts_permission','view')
        handle_fn_options()
        hideLoadingIcon(content_space);
      } catch (error) {
        catch_error(error)
      }
    })
