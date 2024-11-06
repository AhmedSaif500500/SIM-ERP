setActiveSidebar('items_view_ar');
pagePermission("items_permission", "add");


const sub_h2_header = document.querySelector(`#sub_h2_header`)
const tree_add_account = document.querySelector(`#tree_add_account`)
const tree_group_div = document.querySelector(`#tree_group_div`)
const select_parent_gruop_name_tree_goup_div = tree_group_div.querySelector(`#select_parent_gruop_name_tree_goup_div`)
const input_account_name_input_tree_group_div = tree_group_div.querySelector(`#input_account_name_input_tree_group_div`)
const select_parents_group_select = tree_add_account.querySelector(`#select_parents_group_select`)
const revenue_account_select = tree_add_account.querySelector(`#revenue_account_select`)
const item_unite_inputx = tree_add_account.querySelector(`#item_unite_input`)
const account_name_input = tree_add_account.querySelector(`#account_name_input`)
const account_no_input = tree_add_account.querySelector(`#account_no_input`)
const sales_pricex = tree_add_account.querySelector(`#sales_price`)
const purchase_pricex = tree_add_account.querySelector(`#purchase_price`)
const reorder_pointx = tree_add_account.querySelector(`#reorder_point`)

const obj_items_create_group = JSON.parse(sessionStorage.getItem('obj_items_create_group'));
const obj_items_create_account = JSON.parse(sessionStorage.getItem('obj_items_create_account'));

    //#region create group
if (obj_items_create_group){



    sub_h2_header.textContent = 'مجموعة جديده'
    
    select_parent_gruop_name_tree_goup_div.innerHTML = obj_items_create_group.itemsArray;
    select_parent_gruop_name_tree_goup_div.value = obj_items_create_group.nodeId
    
    tree_group_div.style.display = 'flex'
}

async function save_group(A_or_B) {
    try {

        const accountname = input_account_name_input_tree_group_div.value.trim();
        const accountParent = select_parent_gruop_name_tree_goup_div.value;
        if (!accountname || accountname == ""){
            showAlert('warning','برجاء ادخال اسم المجموعة بشكل صحيح')
            return
        }
    if (A_or_B === 'A'){
        const post = await new_fetchData_postAndGet(
            '/api/addGroup-item',
            { accountname, accountParent },
            'items_permission', 'add',
            15,
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
            15,
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
    if (obj_items_create_account){
        sub_h2_header.textContent = 'صنف جديد'
                
        select_parents_group_select.innerHTML = obj_items_create_account.items_options;
        select_parents_group_select.value = obj_items_create_account.nodeId
        revenue_account_select.innerHTML = obj_items_create_account.revenue_accounts_options;


        tree_add_account.style.display = 'flex'
    }
    

    async function save_account(A_or_B) {
        try {
    

            const item_unite_input = item_unite_inputx.value.trim();
            const account_name = account_name_input.value.trim();

            if (!item_unite_input || !account_name) {
                showAlert('warning', 'تأكد من ادخال قيمه فى الحقول المطلوبه');
                return;
            }
            const account_no = account_no_input.value.trim();
            const account_parent_name_id = parseInt(select_parents_group_select.value);
            const revenue_account_select_value = parseInt(revenue_account_select.value);
            const sales_price = sales_pricex.value;
            const purchase_price = purchase_pricex.value;
            const reorder_point = reorder_pointx.value;
    
    

        if (A_or_B === 'A'){
            const post = await new_fetchData_postAndGet(
                '/api/add-item',
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
                15,
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
                '/api/add-item',
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
                15,
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

      
      hideLoadingIcon(content_space)         
    } catch (error) {
        hideLoadingIcon(content_space)
        catch_error(error)
    }
    })
    