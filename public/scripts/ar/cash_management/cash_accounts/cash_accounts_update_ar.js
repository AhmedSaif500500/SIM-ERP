
    //#region  save function
    setActiveSidebar('cashMain_view_ar');
    pagePermission('view', 'cash_accounts_permissions');

    const cash_accounts_update_data = JSON.parse(sessionStorage.getItem('cash_accounts_update_data'));
    // sessionStorage.removeItem(`sales_invoice_update_data`)
    
    if (!cash_accounts_update_data){
        redirection("cash_accounts_view_ar","fail","حدث خطأ اثناء معالجة البيانات سيتم تحويل الى صفحه الحسابات النقدية الرئيسية")
    }
    

    const obj_items_cash_accounts = {pageName : 'cash_accounts_update_ar'}

const encodedData = encodeURIComponent(JSON.stringify(obj_items_cash_accounts));
back_href.href = `cash_accounts_view_ar?data=${encodedData}`


    const h2_text_div = document.querySelector(`#h2_text_div`)
    const sub_h2_header = document.querySelector(`#sub_h2_header`)
    const btn_update = document.querySelector(`#btn_update`)
    const btn_delete = document.querySelector(`#btn_delete`)

    const cash_accounts_input = document.querySelector(`#cash_accounts_input`);
    const cash_accounts_name_input = document.querySelector(`#cash_accounts_name_input`);
    const cash_accounts_group_name_input = document.querySelector(`#cash_accounts_group_name_input`);
    const cash_info_input = document.querySelector(`#cash_info_input`); 
        
    let data = []
    async function showData(){
      
      const x = cash_accounts_update_data.x
      if(!x){
        redirection("cash_accounts_view_ar","fail","حدث خطأ اثناء معالجة البيانات سيتم تحويل الى صفحه الحسابات النقدية الرئيسية")
      }
  
      data = await new_fetchData_postAndGet(
        'get_cash_accounts_data_for_update_page',
        {x},
        "cash_accounts_permission", "view",
        15,
        false,"",
        true,
        false,false,
        false,false,false,
        false,false,
        true,'cash_accounts_view_ar','حدث خطأ اثناء معالجه البيانات'
     ) 
  
     const headerData = data.accountData
     cash_accounts_input.value = headerData.account_no
     cash_accounts_name_input.value = headerData.account_name
     cash_accounts_group_name_input.value = headerData.group_name
     cash_info_input.value = headerData.account_inf
    }
  
  


    btn_update.onclick = async function() {
      const x = cash_accounts_update_data.x
      const cash_accounts_input_value = cash_accounts_input.value.trim()
      const cash_accounts_name_input_value = cash_accounts_name_input.value.trim()
      const cash_accounts_group_name_input_value = cash_accounts_group_name_input.value
      const cash_info_input_value = cash_info_input.value

      if (!x || !cash_accounts_name_input_value){
        showAlert('warning','برجاء ادخال اسم الاصل ')
        return
      }


      const posted_elements = {
        x,
        cash_accounts_input_value,
        cash_accounts_name_input_value,
        cash_accounts_group_name_input_value,
        cash_info_input_value
      }


        const post = await new_fetchData_postAndGet(
          '/cash_accounts_update',
          posted_elements,
          'cash_accounts_permission','update',
          15,
          true,'هل تعديل  بيانات الحساب النقدى؟',
          true,
          false,"",
          true,obj_items_cash_accounts,'cash_accounts_view_ar',
          false,false,
          false,false,
          "حدث حطأ اثناء معالجة البيانات"
        )

    }


    btn_delete.onclick = async function () {
      try {
        const x = cash_accounts_update_data.x

        const post = await new_fetchData_postAndGet(
          '/cash_accounts_delete',
          {x},
          'cash_accounts_permission','update',
          15,
          true,'هل تعديل  حذف الحساب النقدى؟',
          true,
          false,"",
          true,obj_items_cash_accounts,'cash_accounts_view_ar',
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
    <div id="fn_option_update_btn" onclick="viewMode(false,'cash_accounts_permission','update')">وضع التعديل</div>
    <div id="fn_option_view_btn" onclick="viewMode(true,'cash_accounts_permission','view')" style="display: none;">وضع العرض</div>
  `;
  fn_options_div.insertAdjacentHTML('afterbegin', newDivs);
}

      
     
    document.addEventListener('DOMContentLoaded', async () =>{
      try {
        showLoadingIcon(content_space);
        await showData()
        viewMode(true,'cash_accounts_permission','view')
        handle_fn_options()
        hideLoadingIcon(content_space);
      } catch (error) {
        catch_error(error)
      }
    })
