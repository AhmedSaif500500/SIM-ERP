setActiveSidebar('itemsMain_view_ar');
pagePermission("update", "items_permission");


const sub_h2_header = document.querySelector(`#sub_h2_header`)
const tree_add_account = document.querySelector(`#tree_add_account`)
const tree_group_div = document.querySelector(`#tree_group_div`)
// const select_parent_gruop_name_tree_goup_div = tree_group_div.querySelector(`#select_parent_gruop_name_tree_goup_div`)
const input_account_name_input_tree_group_div = tree_group_div.querySelector(`#input_account_name_input_tree_group_div`)
const btn_delete_group = tree_group_div.querySelector(`#btn_delete_group`)
const btn_update_group = tree_group_div.querySelector(`#btn_update_group`)
const item_unite_inputx = tree_add_account.querySelector(`#item_unite_input`)
const account_name_input = tree_add_account.querySelector(`#account_name_input`)
const account_no_input = tree_add_account.querySelector(`#account_no_input`)
const sales_pricex = tree_add_account.querySelector(`#sales_price`)
const purchase_pricex = tree_add_account.querySelector(`#purchase_price`)
const reorder_pointx = tree_add_account.querySelector(`#reorder_point`)
const btn_update_account = tree_add_account.querySelector(`#btn_update_account`)
const btn_delete_account = tree_add_account.querySelector(`#btn_delete_account`)

const is_forbidden_deletion = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 8, 19, 20, 21, 22, 23, 24];
const is_forbidden_adding_branches = [];
const is_main_account = [12];
const is_accumulated_account = [];

const items_update_data = JSON.parse(sessionStorage.getItem('items_update_data'));



if (!items_update_data){
    redirection("items_view_ar","fail","حدث خطأ اثناء معالجة البيانات سيتم تحويل الى صفحه أصناف المخزون الرئيسية")
}

let href_pageName = 'items_view_ar'
let href_pageTitle = 'أصناف المخزون'

if (items_update_data && items_update_data.href_pageName){
  href_pageName = items_update_data.href_pageName
  href_pageTitle = items_update_data.href_pageTitle
}

back_href.href = href_pageName
back_href.title = href_pageTitle


let items_account_update_data = false;
let items_group_update_data = false;
if (items_update_data.item_type === 'item'){
    items_account_update_data = items_update_data;
} else if (items_update_data.item_type === 'item_group'){
    items_group_update_data = items_update_data;
}



function showData(){

    if (items_group_update_data){
                
        sub_h2_header.textContent = `تعديل مجموعة : ${items_group_update_data.h2_header}`
        input_account_name_input_tree_group_div.value = items_group_update_data.input_account_name_input_tree_group_div

        create_drop_down_with_External_DataArray(`dropdown_div1`,items_group_update_data.items_options); selectedRow_dropdownDiv(`dropdown_div1`,items_group_update_data.items_options,items_group_update_data.parentNode);
        // select_parent_gruop_name_tree_goup_div.innerHTML = items_group_update_data.items_options;
        // select_parent_gruop_name_tree_goup_div.value = items_group_update_data.parentNode
        
        tree_group_div.style.display = 'flex'
    }
    

    if (items_account_update_data){
        
        sub_h2_header.textContent = `تعديل صنف : ${items_account_update_data.h2_header}`;
        account_no_input.value = items_account_update_data.account_no_input;
        account_name_input.value = items_account_update_data.account_name_input;
        account_id_hidden.value = items_account_update_data.account_id_hidden;
        item_unite_input.value = items_account_update_data.item_unite_input;
        sales_price.value = items_account_update_data.sales_price;
        purchase_price.value = items_account_update_data.purchase_price;
        reorder_point.value = items_account_update_data.reorder_point;
        
        create_drop_down_with_External_DataArray(`dropdown_div2`,items_account_update_data.items_options); selectedRow_dropdownDiv(`dropdown_div2`,items_account_update_data.items_options,items_account_update_data.parentNode);
        create_drop_down_with_External_DataArray(`dropdown_div3`,items_account_update_data.revenue_accounts_options); selectedRow_dropdownDiv(`dropdown_div3`,items_account_update_data.revenue_accounts_options,items_account_update_data.item_revenue_account_id);

        tree_add_account.style.display = 'flex'
    }
    
}

//500500
btn_update_group.onclick = async function () {
    try {
        // prepare data
        const account_name = input_account_name_input_tree_group_div.value.trim();
        const account_id = parseInt(items_group_update_data.account_id_hidden_tree_group_div)


        if (!account_name) {
            showAlert('warning', 'تأكد من ادخال قيمه فى الحقول المطلوبه');
            return;
        }

        const parent_id = parseInt(document.querySelector(`#dropdown_div1_hidden_input`).value);

        

        const post = await new_fetchData_postAndGet(
            '/api/update-group_items',
            {
                account_id,
                account_name,
                parent_id
            },
            'items_permission', 'update',
            50,
            true,"هل تريد تعديل بيانات المجموعه ؟ ",
            true,
            false,false,
            false,false,false,
            true,"items_view_ar",
            false,false,
            "حدث خطأ اثناء معالجة البيانات"
        )

    } catch (error) {
        catch_error(error)
    }

}


btn_update_account.onclick = async function () {
    try {
        // prepare data
        const item_unite_input = item_unite_inputx.value.trim();
        const account_name = account_name_input.value.trim();
        const item_id = parseInt(items_account_update_data.account_id_hidden)


        if (!item_unite_input || !account_name || !item_id || isNaN(item_id)) {
            showAlert('warning', 'تأكد من ادخال قيمه فى الحقول المطلوبه');
            return;
        }


        const account_no = account_no_input.value.trim();

        const account_parent_id = parseInt(document.querySelector(`#dropdown_div2_hidden_input`).value);
        const revenue_account_select_value = parseInt(document.querySelector(`#dropdown_div3_hidden_input`).value);
        const sales_price = sales_pricex.value;
        const purchase_price = purchase_pricex.value;
        const reorder_point = reorder_pointx.value;

        

        const post = await new_fetchData_postAndGet(
            '/api/update-item',
            {
                account_no,
                item_id,
                account_name,
                item_unite_input,
                account_parent_id,
                revenue_account_select_value,
                sales_price,
                purchase_price,
                reorder_point
            },
            'items_permission', 'update',
            60,
            true,"هل تريد تعديل بيانات الصنف ؟ ",
            true,
            false,false,
            false,false,false,
            true,href_pageName,
            true,href_pageName,
            "حدث خطأ اثناء معالجة البيانات"
        )

    } catch (error) {
        catch_error(error)
    }

}

async function deleteNode(type) {

    try {

        let account_id;
        if (type === 'group') {
            account_id = parseInt(items_group_update_data.account_id_hidden_tree_group_div);
        } else if (type === 'item') {
            account_id = parseInt(items_account_update_data.account_id_hidden);
        }

        if (is_forbidden_deletion.includes(account_id)) {
            showAlert('warning', 'لا يمكن حذف المجموعه المحدده لانها من المجموعات الافتراضية')
            return;
        }
        //preparing data

        const post = await new_fetchData_postAndGet(
            '/api/delete-item',
            { account_id },
            'items_permission', 'delete',
            60,
            true,"هل تريد حذف البيانات من دليل الاصناف ؟",
            true,
            false,false,
            false,false,false,
            true,href_pageName,
            true,href_pageName,
            "حدث خطأ اثناء معالجة البيانات"
        )

    } catch (error) {
        catch_error(error)
    }

}


btn_delete_group.onclick = async function () {
    await deleteNode('group');
}


btn_delete_account.onclick = async function () {
    await deleteNode('item');
}




document.addEventListener('DOMContentLoaded', async function () {
    try {
      showLoadingIcon(content_space)
        showData()
      
        viewMode(true,'items_permission','view')
        handle_fn_options()
      hideLoadingIcon(content_space)         
    } catch (error) {
        hideLoadingIcon(content_space)
        catch_error(error)
    }
    })
    

    function handle_fn_options(){
        const newDivs = `
          <div id="fn_option_update_btn" onclick="viewMode(false,'items_permission','update')">وضع التعديل</div>
          <div id="fn_option_view_btn" onclick="viewMode(true,'items_permission','view')" style="display: none;">وضع العرض</div>
        `;
        fn_options_div.insertAdjacentHTML('afterbegin', newDivs);
      }
      