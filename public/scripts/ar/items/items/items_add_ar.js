setActiveSidebar('itemsMain_view_ar');
pagePermission("add", "items_permission");

const sub_h2_header = document.querySelector(`#sub_h2_header`)
const tree_add_account = document.querySelector(`#tree_add_account`)
const tree_group_div = document.querySelector(`#tree_group_div`)
const input_account_name_input_tree_group_div = tree_group_div.querySelector(`#input_account_name_input_tree_group_div`)
const revenue_account_select = tree_add_account.querySelector(`#revenue_account_select`)
const item_unite_inputx = tree_add_account.querySelector(`#item_unite_input`)
const account_name_input = tree_add_account.querySelector(`#account_name_input`)
const account_no_input = tree_add_account.querySelector(`#account_no_input`)
const sales_pricex = tree_add_account.querySelector(`#sales_price`)
const purchase_pricex = tree_add_account.querySelector(`#purchase_price`)
const reorder_pointx = tree_add_account.querySelector(`#reorder_point`)


const items_add_data = JSON.parse(sessionStorage.getItem('items_add_data'));

if (!items_add_data){
    redirection("items_view_ar","fail","حدث خطأ اثناء معالجة البيانات سيتم تحويل الى صفحه أصناف المخزون الرئيسية")
}

let href_pageName = 'items_view_ar'
let href_pageTitle = 'أصناف المخزون'

if (items_add_data && items_add_data.href_pageName){
  href_pageName = items_add_data.href_pageName
  href_pageTitle = items_add_data.href_pageTitle
}


back_href.href = href_pageName
back_href.title = href_pageTitle


let items_account_add_data = false;
let items_group_add_data = false;
if (items_add_data.item_type === 'item'){
    items_account_add_data = items_add_data;
} else if (items_add_data.item_type === 'item_group'){
    items_group_add_data = items_add_data;
}


    //#region create group
if (items_group_add_data){
  
    sub_h2_header.textContent = 'مجموعة جديده'
    create_drop_down_with_External_DataArray(`dropdown_div1`,items_group_add_data.itemsArray); selectedRow_dropdownDiv(`dropdown_div1`,items_group_add_data.itemsArray,items_group_add_data.nodeId);
  
    tree_group_div.style.display = 'flex'
}




async function save_group(A_or_B) {
    try {

        const accountname = input_account_name_input_tree_group_div.value.trim();
        const accountParent = document.querySelector(`#dropdown_div1_hidden_input`).value;
        if (!accountname || accountname == "" || !accountParent || isNaN(+accountParent)){
            showAlert('warning','برجاء ادخال البيانات بشكل صحيح')
            return
        }
    if (A_or_B === 'A'){
        const post = await new_fetchData_postAndGet(
            '/api/addGroup-item',
            { accountname, accountParent },
            'items_permission', 'add',
            50,
            true,"هل تريد حفظ مجموعة الاصناف الجديده ؟",
            true,
            false,false,
            false,false,false,
            true,"items_view_ar",
            false,"",
            "حدث خطأ اثناء معالجة البيانات"
        )
    }else if(A_or_B === 'B'){

        const post = await new_fetchData_postAndGet(
            '/api/addGroup-item',
            { accountname, accountParent },
            'items_permission', 'add',
            50,
            true,"هل تريد حفظ مجموعة الاصناف الجديده ؟",
            true,
            false,false,
            false,false,false,
            false,"",
            false,"",
            "حدث خطأ اثناء معالجة البيانات"
        )
        clear()
    }
    } catch (error) {
        catch_error(error)
    }

}
    //#endregion end create group



    //#region create account
    if (items_account_add_data){
        sub_h2_header.textContent = 'صنف جديد'
        create_drop_down_with_External_DataArray(`dropdown_div2`,items_account_add_data.items_options); selectedRow_dropdownDiv(`dropdown_div2`,items_account_add_data.items_options,items_account_add_data.nodeId);
                    
        const revenue_id_row = items_account_add_data.revenue_accounts_options.find(item => +item.global_id === 19) // 19 = global sales revenue        
        create_drop_down_with_External_DataArray(`dropdown_div3`,items_account_add_data.revenue_accounts_options); selectedRow_dropdownDiv(`dropdown_div3`,items_account_add_data.revenue_accounts_options,revenue_id_row.id);    
        


        tree_add_account.style.display = 'flex'
    }
    

    async function save_account(A_or_B) {
        try {
    

            const item_unite_input = item_unite_inputx.value.trim();
            const account_name = account_name_input.value.trim();
            const account_parent_name_id = parseInt(document.querySelector(`#dropdown_div2_hidden_input`).value);


            if (!item_unite_input || !account_name || !account_parent_name_id || isNaN(+account_parent_name_id)) {
                showAlert('warning', 'رجاء الدخال البيانات فى الحقول المطلوبه بشكل صحيح');
                return;
            }
            const account_no = account_no_input.value.trim();
            const revenue_account_select_value = parseInt(document.querySelector(`#dropdown_div3_hidden_input`).value);
            const sales_price = sales_pricex.value;
            const purchase_price = purchase_pricex.value;
            const reorder_point = reorder_pointx.value;
    
    

        if (A_or_B === 'A'){
            const post = await new_fetchData_postAndGet(
                '/api/add_item',
                {
                    account_no,
                    account_name,
                    item_unite_input,
                    account_parent_name_id,
                    revenue_account_select_value,
                    sales_price,
                    purchase_price,
                    reorder_point
                },
                'items_permission', 'add',
                50,
                true,"هل تريد حفظ بيانات الصنف ؟",
                true,
                false,false,
                false,false,false,
                true,"items_view_ar",
                false,"",
                "حدث خطأ اثناء معالجة البيانات"
            )
        }else if(A_or_B === 'B'){
    
            const post = await new_fetchData_postAndGet(
                '/api/add_item',
                {
                    account_no,
                    account_name,
                    item_unite_input,
                    account_parent_name_id,
                    revenue_account_select_value,
                    sales_price,
                    purchase_price,
                    reorder_point
                },
                'items_permission', 'add',
                50,
                true,"هل تريد حفظ بيانات الصنف ؟",
                true,
                false,false,
                false,false,false,
                false,"",
                false,"",
                "حدث خطأ اثناء معالجة البيانات"
            )
            clear()
        }
        } catch (error) {
            catch_error(error)
        }
    
    }
        //#endregion end create account
    
function clear(){
    input_account_name_input_tree_group_div.value = ""
    item_unite_input.value = ""
    account_name_input.value = ""
    account_no_input.value = ""
    sales_price.value = ""
    purchase_price.value = ""
    reorder_point.value = ""
    
}


document.addEventListener('DOMContentLoaded', async function () {
    try {
      showLoadingIcon(content_space)

      handle_fn_options()
      hideLoadingIcon(content_space)         
    } catch (error) {
        hideLoadingIcon(content_space)
        catch_error(error)
    }
    })
    

    async function importData(){
        const permission = await btn_permission('items_permission', 'update');

        if (!permission) {
            showAlert(`warning`, `⚠️ عذرا لا تملك الصلاحية لاستيراد البيانات`)
          return;
        };
    
        window.location.href = 'import_data_items';

    }

    function handle_fn_options(){  
        const newDivs = `
          <div id="fn_importData_btn" onclick="importData()">استيراد بيانات</div>
        `;
        fn_options_div.insertAdjacentHTML('afterbegin', newDivs);
      }
      /*
    function handle_fn_options(){  
        const newDivs = `
          <div id="fn_option_update_btn" onclick="fn_option_update_btn()">وضع التعديل</div>
          <div id="fn_option_view_btn" onclick="viewMode(true,'production_orders_permission','view')" style="display: none;">وضع العرض</div>
        `;
        fn_options_div.insertAdjacentHTML('afterbegin', newDivs);
      }
      */
      