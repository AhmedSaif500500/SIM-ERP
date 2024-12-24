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

const is_forbidden_deletion = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 8, 19, 20, 21, 22, 23];
const is_forbidden_adding_branches = [];
const is_main_account = [12];
const is_accumulated_account = [];



const obj_items_update_account = JSON.parse(sessionStorage.getItem('obj_items_update_account'));

const obj_items_update_group = JSON.parse(sessionStorage.getItem('obj_items_update_group'));


function showData(){

    if (obj_items_update_group){
                
        sub_h2_header.textContent = `تعديل مجموعة : ${obj_items_update_group.h2_header}`
        input_account_name_input_tree_group_div.value = obj_items_update_group.input_account_name_input_tree_group_div

        create_drop_down_with_External_DataArray(`dropdown_div1`,obj_items_update_group.items_options); selectedRow_dropdownDiv(`dropdown_div1`,obj_items_update_group.items_options,obj_items_update_group.parentNode);
        // select_parent_gruop_name_tree_goup_div.innerHTML = obj_items_update_group.items_options;
        // select_parent_gruop_name_tree_goup_div.value = obj_items_update_group.parentNode
        
        tree_group_div.style.display = 'flex'
    }
    

    if (obj_items_update_account){
        
        sub_h2_header.textContent = `تعديل صنف : ${obj_items_update_account.h2_header}`;
        account_no_input.value = obj_items_update_account.account_no_input;
        account_name_input.value = obj_items_update_account.account_name_input;
        account_id_hidden.value = obj_items_update_account.account_id_hidden;
        item_unite_input.value = obj_items_update_account.item_unite_input;
        sales_price.value = obj_items_update_account.sales_price;
        purchase_price.value = obj_items_update_account.purchase_price;
        reorder_point.value = obj_items_update_account.reorder_point;
        
        create_drop_down_with_External_DataArray(`dropdown_div2`,obj_items_update_account.items_options); selectedRow_dropdownDiv(`dropdown_div2`,obj_items_update_account.items_options,obj_items_update_account.parentNode);
        create_drop_down_with_External_DataArray(`dropdown_div3`,obj_items_update_account.revenue_accounts_options); selectedRow_dropdownDiv(`dropdown_div3`,obj_items_update_account.revenue_accounts_options,obj_items_update_account.item_revenue_account_id);

        tree_add_account.style.display = 'flex'
    }
    
}

//500500
btn_update_group.onclick = async function () {
    try {
        // prepare data
        const account_name = input_account_name_input_tree_group_div.value.trim();
        const account_id = parseInt(obj_items_update_group.account_id_hidden_tree_group_div)


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
            15,
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
        const item_id = parseInt(obj_items_update_account.account_id_hidden)


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
            15,
            true,"هل تريد تعديل بيانات الصنف ؟ ",
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

async function deleteNode(type) {

    try {

        let account_id;
        if (type === 'group') {
            account_id = parseInt(obj_items_update_group.account_id_hidden_tree_group_div);
        } else if (type === 'item') {
            account_id = parseInt(obj_items_update_account.account_id_hidden);
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
            15,
            true,"هل تريد حذف البيانات من دليل الاصناف ؟",
            true,
            false,false,
            false,false,false,
            true,"items_view_ar",
            false,"",
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
      
      hideLoadingIcon(content_space)         
    } catch (error) {
        hideLoadingIcon(content_space)
        catch_error(error)
    }
    })
    
