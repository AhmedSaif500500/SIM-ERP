
function clear_items_sessionsStorage(){
    sessionStorage.removeItem('obj_accounts_add_group');
    sessionStorage.removeItem('obj_accounts_add_account');
    sessionStorage.removeItem('obj_accounts_update_account');
    sessionStorage.removeItem('obj_accounts_update_group');
}


const is_forbidden_deletion = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 8, 19, 20, 21, 22, 23];
const is_forbidden_adding_branches = [1, 2, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 8, 19, 20, 21, 22, 23];
const is_main_account = [1, 2, 3, 4, 5, 6, 7];
const is_accumulated_account = [9, 10, 11, 12, 13, 14, 15, 20];

