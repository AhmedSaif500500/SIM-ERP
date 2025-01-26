setActiveSidebar('accounts_view_ar');
pagePermission("update", "accounts_permission");


const tree_group_div = document.querySelector(`#tree_group_div`);
const input_account_name_input_tree_group_div = tree_group_div.querySelector(`#input_account_name_input_tree_group_div`);
const account_id_hidden_tree_group_div = tree_group_div.querySelector(`#account_id_hidden_tree_group_div`);
const statment_type_span_tree_group_div = tree_group_div.querySelector(`#statment_type_span_tree_group_div`);
const select_parent_gruop_name_tree_goup_div = tree_group_div.querySelector(`#select_parent_gruop_name_tree_goup_div`);
const lbl_acc_name_group = tree_group_div.querySelector(`#lbl_acc_name_group`);
const btn_update_group = tree_group_div.querySelector(`#btn_update_group`);
const btn_delete_group = tree_group_div.querySelector(`#btn_delete_group`);


const tree_add_account = document.querySelector(`#tree_add_account`);
const account_no_input = tree_add_account.querySelector(`#account_no_input`);
const account_name_input = tree_add_account.querySelector(`#account_name_input`);
const account_id_hidden = tree_add_account.querySelector(`#account_id_hidden`);
const statment_type_span = tree_add_account.querySelector(`#statment_type_span`);
const parents_group_select = tree_add_account.querySelector(`#parents_group_select`);
const cash_flow_statement = tree_add_account.querySelector(`#cash_flow_statement`);
const lbl_acc_name_account = tree_add_account.querySelector(`#lbl_acc_name_account`);
const btn_update_accounts = tree_add_account.querySelector(`#btn_update_accounts`);
const btn_delete_accounts = tree_add_account.querySelector(`#btn_delete_accounts`);


const obj_accounts_update_group = JSON.parse(sessionStorage.getItem('obj_accounts_update_group'));
const obj_accounts_update_account = JSON.parse(sessionStorage.getItem('obj_accounts_update_account'));



function showData(){
    if (obj_accounts_update_group){

        sub_h2_header.textContent = obj_accounts_update_group.h2_header
        input_account_name_input_tree_group_div.value = obj_accounts_update_group.input_account_name_input_tree_group_div
        account_id_hidden_tree_group_div.value = obj_accounts_update_group.account_id_hidden_tree_group_div
        select_parent_gruop_name_tree_goup_div.innerHTML = obj_accounts_update_group.statemenet_options;
        select_parent_gruop_name_tree_goup_div.value = obj_accounts_update_group.statemenet_options_selectedValue

        
        tree_group_div.style.display = 'flex'
    }
    
    
    if (obj_accounts_update_account){
    
        sub_h2_header.textContent = obj_accounts_update_account.h2_header;
        account_no_input.value = obj_accounts_update_account.account_no_input
        account_name_input.value = obj_accounts_update_account.account_name_input
        parents_group_select.innerHTML = obj_accounts_update_account.statemenet_options
        parents_group_select.value = obj_accounts_update_account.statemenet_options_selectedValue
        statment_type_span_hidden_value.value = obj_accounts_update_account.statment_type_span_hidden_value
        statment_type_span.textContent = obj_accounts_update_account.statment_type_span_tree_group_div
        cash_flow_statement.value = obj_accounts_update_account.cash_flow_statement_id


        tree_add_account.style.display = 'flex'
    }
    
}


btn_update_group.onclick = async function () {
    try {

        
        let is_group = true
        // prepare data
        const account_id = parseInt(obj_accounts_update_group.account_id_hidden_tree_group_div);
        const account_name = input_account_name_input_tree_group_div.value.trim();
        const parent_id = parseInt(select_parent_gruop_name_tree_goup_div.value);

        
        if (!account_name || account_name === "") {
            showAlert('warning', 'تأكد من ادخال قيمه فى الحقول المطلوبه');
            return;
        }


        const post = await new_fetchData_postAndGet(
            '/api/update-account',
            {
                account_id,
                account_name,
                parent_id,
                is_group,
            },
            'accounts_permission', 'update',
            50,
            true,"هل تريد تعديل البيانات ؟ ",
            true,
            false,false,
            false,false,false,
            true,"accounts_view_ar",
            false,false,
            "حدث خطأ اثناء معالجة البيانات"
        )

    } catch (error) {
        catch_error(error)
    }

}


btn_update_accounts.onclick = async function () {
    try {
        console.log(obj_accounts_update_account);
        let is_group = false
        // prepare data
        const account_id = parseInt(obj_accounts_update_account.account_id_hidden);
        const account_no = account_no_input.value.trim();
        const account_name = account_name_input.value.trim();
        const statment_type_value = parseInt(statment_type_span_hidden_value.value);
        const cash_flow_statement_value = parseInt(cash_flow_statement.value);
        const parent_id = parseInt(parents_group_select.value);


        if (!account_name || account_name === "") {
            showAlert('warning', 'تأكد من ادخال قيمه فى الحقول المطلوبه');
            return;
        }


        const post = await new_fetchData_postAndGet(
            '/api/update-account',
            {
                account_name,
                account_no,
                statment_type_value,
                cash_flow_statement_value,
                account_id,
                parent_id,
                is_group,
            },
            'accounts_permission', 'update',
            50,
            true,"هل تريد تعديل البيانات ؟ ",
            true,
            false,false,
            false,false,false,
            true,"accounts_view_ar",
            false,false,
            "حدث خطأ اثناء معالجة البيانات"
        )

    } catch (error) {
        catch_error(error)
    }

}



async function deleteNode(type) {

    try {

        //!-------------------------
        let account_id;
        if (type === 'group') {

            if (is_forbidden_deletion.includes(obj_accounts_update_group.global_id)) {
                showAlert('warning', 'لا يمكن حذف الحساب المحدد لانه من الحسابات الافتراضية')
                return;
            }
            account_id = parseInt(obj_accounts_update_group.account_id_hidden_tree_group_div);
        } else if (type === 'account') {
            
            if (is_forbidden_deletion.includes(obj_accounts_update_account.global_id)) {
                showAlert('warning', 'لا يمكن حذف الحساب المحدد لانه من الحسابات الافتراضية')
                return;
            }
            account_id = parseInt(obj_accounts_update_account.account_id_hidden);
        }



        const post = await new_fetchData_postAndGet(
            '/api/delete-account',
            { account_id },
            'accounts_permission', 'delete',
            50,
            true,"هل تريد حذف البيانات من دليل الحسابات ؟",
            true,
            false,false,
            false,false,false,
            true,"accounts_view_ar",
            false,"",
            "حدث خطأ اثناء معالجة البيانات"
        )

    } catch (error) {
        catch_error(error)
    }

}


btn_delete_group.onclick = async function(){
    await deleteNode('group')
}


btn_delete_accounts.onclick = async function(){
    await deleteNode('account')
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
    