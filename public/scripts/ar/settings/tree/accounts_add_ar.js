setActiveSidebar('general_settings_ar');
pagePermission("add", "accounts_permission");


const tree_group_div = document.querySelector(`#tree_group_div`);
const input_account_name_input_tree_group_div = tree_group_div.querySelector(`#input_account_name_input_tree_group_div`);
const account_id_hidden_tree_group_div = tree_group_div.querySelector(`#account_id_hidden_tree_group_div`);
const statment_type_span_tree_group_div = tree_group_div.querySelector(`#statment_type_span_tree_group_div`);
const select_parent_gruop_name_tree_goup_div = tree_group_div.querySelector(`#select_parent_gruop_name_tree_goup_div`);
const lbl_acc_name_group = tree_group_div.querySelector(`#lbl_acc_name_group`);


const tree_add_account = document.querySelector(`#tree_add_account`);
const account_no_input = tree_add_account.querySelector(`#account_no_input`);
const account_name_input = tree_add_account.querySelector(`#account_name_input`);
const account_id_hidden = tree_add_account.querySelector(`#account_id_hidden`);
const statment_type_span = tree_add_account.querySelector(`#statment_type_span`);
const parents_group_select = tree_add_account.querySelector(`#parents_group_select`);
const cash_flow_statement = tree_add_account.querySelector(`#cash_flow_statement`);
const lbl_acc_name_account = tree_add_account.querySelector(`#lbl_acc_name_account`);


const obj_accounts_add_group = JSON.parse(sessionStorage.getItem('obj_accounts_add_group'));
const obj_accounts_add_account = JSON.parse(sessionStorage.getItem('obj_accounts_add_account'));

    //#region create group
if (obj_accounts_add_group){

    sub_h2_header.textContent = obj_accounts_add_group.h2_header
    lbl_acc_name_group.textContent = obj_accounts_add_group.lbl_acc_name

    select_parent_gruop_name_tree_goup_div.innerHTML = obj_accounts_add_group.statemenet_options;
    select_parent_gruop_name_tree_goup_div.value = obj_accounts_add_group.statemenet_options_selectedValue
    statment_type_span.textContent = obj_accounts_add_group.statment_type_span_tree_group_div
    
    tree_group_div.style.display = 'flex'
}


if (obj_accounts_add_account){

    sub_h2_header.textContent = obj_accounts_add_account.h2_header
    lbl_acc_name_group.textContent = obj_accounts_add_account.lbl_acc_name

    parents_group_select.innerHTML = obj_accounts_add_account.statemenet_options;
    parents_group_select.value = obj_accounts_add_account.statemenet_options_selectedValue
    statment_type_span.textContent = obj_accounts_add_account.statment_type_span
    tree_add_account.style.display = 'flex'
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
            '/api/addGroup-account',
            { accountname, accountParent },
            'accounts_permission', 'add',
            50,
            true,"هل تريد حفظ البيانات ؟",
            true,
            false,false,
            false,false,false,
            true,"accounts_view_ar",
            false,"",
            "حدث خطأ اثناء معالجة البيانات"
        )
    }else if(A_or_B === 'B'){

        const post = await new_fetchData_postAndGet(
            '/api/addGroup-account',
            { accountname, accountParent },
            'accounts_permission', 'add',
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

async function save_account(A_or_B) {
    try {


        const account_no = account_no_input.value.trim();
        const account_name = account_name_input.value.trim();
        const account_parent_name_id = parseInt(parents_group_select.value);
        const cash_flow_statement_value = parseInt(cash_flow_statement.value);

        if (!account_name || account_name === "") {
            showAlert('warning', 'تأكد من ادخال قيمه فى الحقول المطلوبه');
            return;
        }




    if (A_or_B === 'A'){
        const post = await new_fetchData_postAndGet(
            '/api/add-account',
            {
                account_no,
                account_name,
                account_parent_name_id,
                cash_flow_statement_value,
            },
            'accounts_permission', 'add',
            15,
            true,"هل تريد حفظ البيانات ؟",
            true,
            false,false,
            false,false,false,
            true,"accounts_view_ar",
            false,"",
            "حدث خطأ اثناء معالجة البيانات"
        )
    }else if(A_or_B === 'B'){

        const post = await new_fetchData_postAndGet(
            '/api/add-account',
            {
                account_no,
                account_name,
                account_parent_name_id,
                cash_flow_statement_value,
            },
            'accounts_permission', 'add',
            50,
            true,"هل تريد حفظ البيانات ؟",
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

function clear(){
    input_account_name_input_tree_group_div.value = ""
    account_id_hidden_tree_group_div.value = ""
    account_no_input.value = ""
    account_name_input.value = ""
    account_id_hidden.value = ""
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
    