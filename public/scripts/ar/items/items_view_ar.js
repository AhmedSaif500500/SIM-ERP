
setActiveSidebar('items_view_ar');
// alertify.alert('هذه رسالة تنبيه.');

const table_div = document.querySelector(`.table_div`);
const dialogOverlay_input = document.querySelector(`#dialogOverlay_input`);
const accounts_view_tree_btn = document.querySelector(`#accounts_view_tree_btn`);
const accounts_view_table_btn = document.querySelector(`#accounts_view_table_btn`);



//#region tree



accounts_view_tree_btn.addEventListener('click', async function () {
    try {
        showLoadingIcon(this)
        await fetchTreeData();
        table_div.style.display = 'none'
        tree_2div_container.style.display = 'flex'
        hideLoadingIcon(this)
    } catch (error) {
        hideLoadingIcon(this)
        catch_error(error)
        table_div.style.display = 'none'
        tree_2div_container.style.display = 'none'
    }
})

const tree_add_account = document.querySelector(`#tree_add_account`);
const account_no_input = document.querySelector(`#account_no_input`);
const lbl_acc_name = document.querySelector(`#lbl_acc_name`);
const account_name_input = document.querySelector(`#account_name_input`);
const account_id_hidden = document.querySelector(`#account_id_hidden`);
const statment_type_span = document.querySelector(`#statment_type_span`);
const statment_type_span_tree_group_div = document.querySelector(`#statment_type_span_tree_group_div`);
const revenue_account_select = document.querySelector(`#revenue_account_select`);
const statment_type_span_hidden_value = document.querySelector(`#statment_type_span_hidden_value`);
const parents_group_select = document.querySelector(`#parents_group_select`);
const parent_gruop_name_tree_goup_div = document.querySelector(`#parent_gruop_name_tree_goup_div`);
const h2_header = document.querySelector(`#h2_header`);
const btn_save = document.querySelector(`#btn_save`);
const btn_update = document.querySelector(`#btn_update`);
const btn_delete = document.querySelector(`#btn_delete`);
const noButtons = document.querySelectorAll(`.noButton`);
const collapse_tree = document.querySelector(`#collapse_tree`);
const tree_2div_container = document.querySelector(`#tree_2div_container`);
const tree_rename_div = document.querySelector(`#tree_rename_div`);
const tree_group_div = document.querySelector(`#tree_group_div`);
const account_name_input_tree_group_div = document.querySelector(`#account_name_input_tree_group_div`);
const btn_save_tree_group_div = document.querySelector(`#btn_save_tree_group_div`);
const account_id_hidden_tree_group_div = document.querySelector(`#account_id_hidden_tree_group_div`);
const btn_update_tree_group_div = document.querySelector(`#btn_update_tree_group_div`);
const btn_delete_tree_group_div = document.querySelector(`#btn_delete_tree_group_div`);

const item_unite_input = document.querySelector(`#item_unite_input`);
const sales_price = document.querySelector(`#sales_price`);
const purchase_price = document.querySelector(`#purchase_price`);
const reorder_point = document.querySelector(`#reorder_point`);


const is_forbidden_deletion = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 8, 19, 20, 21, 22, 23];
const is_forbidden_adding_branches = [];
const is_main_account = [12];
const is_accumulated_account = [];





let filterd_revenue_options_array = [];
async function get_revenue_accounts_fn() {
    try {
        const data = await fetchData_postAndGet(
            "/api/get_revenue_accounts",
            {},
            'pass', 'pass',
            20,
            false,
            '',
            false,
            false,'',
            false,'',
            'حدث خطأ اثناء معالجة البيانات'
        )




        for (const row of data) {
            const option = `<option value="${row.account_id}" ${row.global_id === 19 ? 'selected' : ''}>${row.account_name}</option>`;
            filterd_revenue_options_array.push(option);
        }

        revenue_account_select.innerHTML = filterd_revenue_options_array
    } catch (error) {
        catch_error(error)
    }
}




let data = [];
let filterd_statement_options_array = [];
async function fetchTreeData() {
    try {
        const response = await fetch('/api/tree/items');
        data = await response.json();
        const tree = document.getElementById('tree');

        // تحويل البيانات التي تم جلبها إلى التنسيق المناسب لـ jstree
        const treeData = data.map(row => ({
            id: row.account_id, // تعيين المعرف الخاص بكل عقدة في الشجرة
            parent: row.parent_id === null ? '#' : row.parent_id, // تحديد هوية والد العقدة، واستخدام '#' إذا لم يكن هناك والد
            text: row.account_name, // النص المرئي للعقدة في الشجرة
            // icon: row.is_final_account ? 'fa fa-lock' : null, // تغيير الأيقونة فقط إذا كانت is_final_account تساوي true
            icon: row.is_final_account ? 'fa-duotone fa-clipboard' : null, // تغيير الأيقونة فقط إذا كانت is_final_account تساوي true
            data: { // البيانات الإضافية المخصصة للعقدة
                final_account: row.is_final_account,
                account_no: row.account_no,
                global_id: row.global_id,
                item_revenue_account: row.item_revenue_account,
                item_expense_account: row.item_expense_account,
                item_sales_price: row.item_sales_price,
                item_purshas_price: row.item_purshas_price,
                item_amount_reorder_point: row.item_amount_reorder_point,
                item_unite: row.item_unite,


                // يمكنك إضافة المزيد من البيانات هنا
            }
        }));

        // تهيئة شجرة jstree على عنصر HTML المحدد
        $(tree).jstree({
            'core': {
                'data': treeData, // تحديد بيانات الشجرة لـ jstree
                'themes': {
                    'name': 'default', // اختيار السمة الافتراضية
                    'responsive': false, // يجعل السمة تستجيب بشكل جيد مع أحجام الشاشات المختلفة لكن بيغير شكل الايقونات خالص
                    'icons': true, // عرض الأيقونات مع العناصر
                    'dots': false, // عرض النقاط قبل كل عنصر (للعقد التي تحتوي على أبناء)
                    'variant': 'large', // يمكن أن تكون هذه 'large' أو 'small' حسب تفضيلاتك
                    // يمكنك تخصيص المزيد من خيارات السمة هنا
                },
                'check_callback': true, // يسمح بالتحقق من الإجراءات (مثل السحب والإفلات)

            },
            'plugins': ['contextmenu', 'dnd', 'types'], // تمكين ملحق contextmenu للسماح بالقوائم السياقية (انقر بزر الماوس الأيمن) و dnd للسماح بالسحب والإفلات
            'contextmenu': {
                'items': function (node) {
                    // تعريف العناصر المتاحة في القائمة السياقية (انقر بزر الماوس الأيمن) على العقدة
                    return {
                        'view': {
                            'label': ' عرض المعلومات', // إضافة أيقونة Font Awesome بجانب 
                            'icon': 'fa-duotone fa-question',
                            'action': async function () {

                                clear_inputs(`dialogOverlay_input`)
                                if (is_main_account.includes(node.data.global_id)) {
                                    showAlert('warning', 'لا يمكن عرض معلومات عن الحساب المحدد')
                                    return
                                }

                                const parentNode = $(tree).jstree().get_node(node.parent); //! << get ParentNode


                                if (node.data.final_account) {

                                    get_revenue_accounts_fn()
                                    changeSelect('revenue_account_select', node.data.item_revenue_account)

                                    h2_header.textContent = node.text;
                                    account_no_input.value = node.data.account_no ?? '';
                                    account_name_input.value = node.text;
                                    account_id_hidden.value = node.id;
                                    get_items_groups_options_fn(parents_group_select, node.id, false,'tree','');
                                    changeSelect('parents_group_select', node.parent)
                                    // parents_group_select.value = parentNode.id;
                                    item_unite_input.value = node.data.item_unite;
                                    sales_price.value = node.data.item_sales_price;
                                    purchase_price.value = node.data.item_purshas_price;
                                    reorder_point.value = node.data.item_amount_reorder_point;


                                    btn_save.style.display = 'none'
                                    btn_update.style.display = 'flex'
                                    btn_delete.style.display = 'flex'
                                    tree_group_div.style.display = 'none'
                                    tree_rename_div.style.display = 'none'
                                    tree_add_account.style.display = 'flex'
                                    dialogOverlay_input.style.display = 'flex'

                                } else {

                                    h2_header.textContent = node.text;
                                    // lbl_acc_name.textContent = 'اسم المجموعه';
                                    account_name_input_tree_group_div.value = node.text;
                                    account_id_hidden_tree_group_div.value = node.id;

                                    get_items_groups_options_fn(parent_gruop_name_tree_goup_div, node.id, false,'tree','');
                                    changeSelect('parent_gruop_name_tree_goup_div', node.parent)


                                    btn_save_tree_group_div.style.display = 'none';
                                    btn_update_tree_group_div.style.display = 'flex';
                                    btn_delete_tree_group_div.style.display = 'flex';
                                    tree_rename_div.style.display = 'none';
                                    tree_add_account.style.display = 'none';
                                    tree_group_div.style.display = 'flex'
                                    dialogOverlay_input.style.display = 'flex';
                                }
                            }
                        },
                        'create_group': {
                            'label': 'إضافة مجموعه فرعيه',
                            'icon': 'fa-duotone fa-folder-open',
                            'action': async function () {


                                clear_inputs(`dialogOverlay_input`)
                                if (node.data.final_account || is_forbidden_adding_branches.includes(node.data.global_id)) {
                                    showAlert(`warning`, `لا يمكن اضافة مجموعه فرعيه ضمن المجموعة المجددة`)
                                    return;
                                }
                                account_name_input_tree_group_div.value = ''
                                get_items_groups_options_fn(parent_gruop_name_tree_goup_div, node.id, true,'tree','');

                                changeSelect('parent_gruop_name_tree_goup_div', node.id)

                                // h2
                                h2_header.textContent = `اضافه مجموعه فرعيه داخل : ${node.text}`;
                                lbl_acc_name.textContent = 'اسم المجموعه';


                                btn_save_tree_group_div.style.display = 'flex';
                                btn_update_tree_group_div.style.display = 'none';
                                btn_delete_tree_group_div.style.display = 'none';
                                tree_rename_div.style.display = 'none';
                                tree_add_account.style.display = 'none';
                                tree_group_div.style.display = 'flex'
                                dialogOverlay_input.style.display = 'flex';


                                //---------------------------------------------
                            }
                        },
                        'create': {
                            'label': 'إضافة حساب فرعي',
                            'icon': 'fa-duotone fa-clipboard',
                            'action': async function () {

                                clear_inputs(`dialogOverlay_input`)
                                if (node.data.final_account || is_forbidden_adding_branches.includes(node.data.global_id)) {
                                    showAlert(`warning`, `لا يمكن اضافة حساب فرعى ضمن الحساب المحدد`)
                                    return;
                                }

                                get_revenue_accounts_fn()

                                get_items_groups_options_fn(parents_group_select, node.id, true,'tree','');
                                changeSelect('parents_group_select', node.id)


                                // h2
                                h2_header.textContent = `اضافه حساب فرعى داخل  ${node.text}`;


                                // buttons
                                btn_save.style.display = 'flex'
                                btn_update.style.display = 'none'
                                btn_delete.style.display = 'none'
                                tree_group_div.style.display = 'none'
                                tree_rename_div.style.display = 'none'
                                tree_add_account.style.display = 'flex'
                                dialogOverlay_input.style.display = 'flex'

                                //---------------------------------------------
                            }
                        },
                        'rename': {
                            'label': 'إعادة تسمية',
                            'icon': 'fa-duotone fa-pen-to-square',
                            'action': async function () {
                                try {


                                    if (is_forbidden_deletion.includes(node.data.global_id)) {
                                        showAlert('warning', 'لا يمكن اعادة تمسية الحساب المحدد لانه من الحسابات الافتراضية')
                                        return;
                                    }


                                    h2_header.textContent = `إعادة تسمية : ${node.text}`;
                                    tree_add_account.style.display = 'none';
                                    tree_group_div.style.display = 'none'
                                    tree_rename_div.style.display = 'flex';
                                    dialogOverlay_input.style.display = 'flex';

                                    document.querySelector(`#btn_update_rename`).onclick = async function () {
                                        const account_rename_input = document.querySelector(`#account_rename_input`).value.trim();
                                        if (account_rename_input === "") {
                                            showAlert('warning', 'رجاء ادخال اسم بطريقة صحيحة');
                                            return
                                        }
                                        const account_id = parseInt(node.id);
                                        await fetchData_post1(
                                            '/api/rename-account',
                                            {
                                                account_id,
                                                account_rename_input
                                            },
                                            'items_permission', 'update',
                                            'هل تريد تحديث اسم الحساب المحدد ؟',
                                            15,
                                            'items_view_ar',
                                            'حدث خطأ اثناء معالجة البيانات'
                                        )
                                    }

                                    // const newName = prompt('أدخل الاسم الجديد:');
                                } catch (error) {
                                    catch_error(error)
                                }
                            }
                        },
                        'delete': {
                            'label': 'حذف',
                            'icon': 'fa-duotone fa-trash-xmark',
                            'action': async function () {
                                try {
                                    if (is_forbidden_deletion.includes(node.data.global_id)) {
                                        showAlert('warning', 'لا يمكن حذف الصنف المحدد لانه من الاصناف الافتراضية')
                                        return;
                                    }

                                    const account_id = parseInt(node.id);
                                    await fetchData_post1(
                                        '/api/delete-item',
                                        { account_id },
                                        'items_permission', 'delete',
                                        'هل تريد حذف الحساب الصنف من دليل الاصناف ؟',
                                        15,
                                        'items_view_ar',
                                        'حدث خطأ اثناء حذف الصنف المحدد'
                                    )


                                } catch (error) {
                                    closeDialog();
                                    console.error('Error deleting account:', error);
                                }
                            }
                        }
                    };
                }
            },
            'dnd': {
                'is_draggable': function (node) {
                    // يمكنك تخصيص هذه الدالة للتحكم في أي العناصر يمكن سحبها
                    return true;
                },
                'copy': false, // إذا كنت تريد التمكين من نسخ العناصر عند السحب والإفلات، قم بتعيينها إلى true
                'move_to_children_only': true, // يسمح بتحريك العقد فقط إلى الأبناء، لتجنب وضعها في غير محلها
                'always_copy': false,
                'copy_only': false,
                'drag_selection': false,
                'check_while_dragging': true
            }
        });

    } catch (error) {
        console.error('Error fetching tree data:', error);
    }
}


// get all nodes into the node
function getSubChildIds_By_JsTree(tree, nodeId) {
    const childIds = [];
    const node = $(tree).jstree(true).get_node(nodeId);

    if (!node) {
        return childIds;
    }

    // دالة استرجاعية لتجميع المعرفات
    function collectIds(node) {
        if (!node.data.final_account) {
            childIds.push(node.id);
            node.children.forEach(childId => {
                const childNode = $(tree).jstree(true).get_node(childId);
                collectIds(childNode);
            });
        }
    }

    collectIds(node);

    // إزالة nodeId من childIds
    const filteredChildIds = childIds.filter(id => id !== nodeId);

    return filteredChildIds;
    // كيفية الاستخدام
// const allChildIds = getSubChildIds_By_JsTree(tree, account_id); // ستكون هذه مصفوفة
}



function getSubChildIds_By_array(accountId, dataArray) {
    const subGroups = [];

    function findSubGroups(parentId) {
        const children = dataArray.filter(item => item.parent_id === parentId && item.is_final_account !== true);
        for (const child of children) {
            subGroups.push(child);
            findSubGroups(child.account_id); // البحث في الأعماق
        }
    }

    findSubGroups(accountId);
    return subGroups;

    // مثال للاستخدام:
//const accountId = 12; // المعرف الذي ترغب بالبحث عنه
//const subGroups = getSubChildIds_By_array(accountId, data);
}





function get_items_groups_options_fn(selectVariableName, accountId, is_Allow_To_show_The_Same_Account_In_Options,tree_or_array,Varuable_dataArray_if_it_is_array_only) {
    try {

        let allChildIds
        if (tree_or_array === 'tree') {
            allChildIds = getSubChildIds_By_JsTree(tree, accountId);    
        }else if (tree_or_array === 'array') {
            allChildIds =   getSubChildIds_By_array(accountId, Varuable_dataArray_if_it_is_array_only)
        }
        
        const statement_options_array = data.filter(item =>
            (is_Allow_To_show_The_Same_Account_In_Options ? true : item.account_id !== accountId) &&
            !allChildIds.includes(item.account_id) &&
            item.is_final_account !== true
        );

        filterd_statement_options_array = statement_options_array.map(item => `
        <option value="${item.account_id}">${item.account_name}</option>
    `).join('');
        selectVariableName.innerHTML = filterd_statement_options_array
    } catch (error) {
        catch_error(error)
    }

}


function clear_inputs(divID) {
    // الحصول على كل العناصر input داخل div المحدد
    const inputs = document.querySelector(`#${divID}`).querySelectorAll('input');


    for (const input of inputs) {
        input.value = ""
    }
}



async function addnewaccountGroup() {
    try {
        const accountname = account_name_input_tree_group_div.value.trim();
        const accountParent = parent_gruop_name_tree_goup_div.value;

        await fetchData_post1(
            '/api/addGroup-item',
            { accountname, accountParent },
            'items_permission', 'add',
            'هل تريد حفظ البيانات ؟',
            15,
            'items_view_ar',
            'حدث خطأ اثناء معالجة البيانات'
        )
    } catch (error) {
        catch_error(error)
    }


}



async function addNewAccount() {
    try {

        // prepare data
        const item_unite_input = document.querySelector(`#item_unite_input`).value.trim();
        const account_name = account_name_input.value.trim();

        if (!item_unite_input || !account_name) {
            showAlert('warning', 'تأكد من ادخال قيمه فى الحقول المطلوبه');
            return;
        }


        const account_no = account_no_input.value.trim();

        const account_parent_name_id = parseInt(parents_group_select.value);
        const revenue_account_select_value = parseInt(revenue_account_select.value);
        const sales_price = document.querySelector(`#sales_price`).value;
        const purchase_price = document.querySelector(`#purchase_price`).value;
        const reorder_point = document.querySelector(`#reorder_point`).value;

        await fetchData_post1(
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
            'هل تريد حفظ البيانات ؟',
            20,
            'items_view_ar',
            'حدث خطأ اثناء اضافه البيانات'
        )

    } catch (error) {
        catch_error(error)
    }
}



async function updateGroup() {
    try {


        // prepare data
        const account_id = parseInt(account_id_hidden_tree_group_div.value);
        const account_name = account_name_input_tree_group_div.value.trim();
        const parent_id = parseInt(parent_gruop_name_tree_goup_div.value);

        await fetchData_post1(
            '/api/update-group_items',
            {
                account_id,
                account_name,
                parent_id
            },
            'items_permission', 'update',
            'هل تريد تعديل بيانات المجموعة ؟',
            15,
            'items_view_ar',
            'حدث خطأ اثناء تعديل البيانات'
        );

    } catch (error) {
        catch_error(error)
    }

}


async function updateAccount() {
    try {
        // prepare data
        const item_unite_input = document.querySelector(`#item_unite_input`).value.trim();
        const account_name = account_name_input.value.trim();
        const item_id = parseInt(account_id_hidden.value)


        if (!item_unite_input || !account_name || !item_id || isNaN(item_id)) {
            showAlert('warning', 'تأكد من ادخال قيمه فى الحقول المطلوبه');
            return;
        }


        const account_no = account_no_input.value.trim();

        const account_parent_id = parseInt(parents_group_select.value);
        const revenue_account_select_value = parseInt(revenue_account_select.value);
        const sales_price = document.querySelector(`#sales_price`).value;
        const purchase_price = document.querySelector(`#purchase_price`).value;
        const reorder_point = document.querySelector(`#reorder_point`).value;

        await fetchData_post1(
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
            'هل تريد تعديل بيانات الحساب ؟',
            15,
            'items_view_ar',
            'حدث خطأ اثناء تعديل البيانات'
        );

    } catch (error) {
        catch_error(error)
    }

}


async function deleteNode(type) {

    try {

        let account_id;
        if (type === 'group') {
            account_id = parseInt(account_id_hidden_tree_group_div.value);
        } else if (type === 'item') {
            account_id = parseInt(account_id_hidden.value);
        }

        if (is_forbidden_deletion.includes(account_id)) {
            showAlert('warning', 'لا يمكن حذف المجموعه المحدده لانها من المجموعات الافتراضية')
            return;
        }
        //preparing data

        await fetchData_post1(
            '/api/delete-item',
            { account_id },
            'items_permission', 'delete',
            'هل تريد حذف الصنف الحالى من دليل الاصنفاف ؟',
            15,
            'items_view_ar',
            'حدث خطأ اثناء حذف الصنف المحدد'
        )


    } catch (error) {
        catch_error(error)
    }

}

async function getParentNodesForDragAndDrop(currentNodeId) {
    const filteredParentAccountsArray = data.filter(item =>
        item.account_id !== currentNodeId &&
        item.is_final_account !== true &&
        !is_forbidden_adding_branches.includes(item.global_id)
    );
    return filteredParentAccountsArray;
}

// تغيير قاعده البيانات بعد السحب والافلات
$(tree).on('move_node.jstree', async function (e, data) {

    try {
        if (!data || !data.node || !data.node.id || !data.parent) {
            $(tree).jstree(true).refresh();
            return; // التأكد من وجود بيانات صالحة
        }
        // بيانات العقدة التي تم نقلها (العقدة الأصلية)

        const nodeData = data.node.data;
        const currentAccountId = data.node.id


        // بيانات العقدة الجديدة التي تمت إضافتها (العقدة الوجهة)
        const newParentNodeId = data.parent;
        const newParentNodeData = $(tree).jstree().get_node(newParentNodeId);
        const newParentId = newParentNodeData.id





        const array1 = await getParentNodesForDragAndDrop(currentAccountId);

        const allChildIds = getSubChildIds_By_JsTree(tree, currentAccountId);

        if (allChildIds.includes(newParentId)) {
            showAlert('warning', 'لا يمكن نقل الحساب الى المجموعه المحدده')
            $(tree).jstree(true).refresh();
            return
        }




        const isNewParentInArray = array1.some(item => item.account_id === newParentId); // ta2ked en el newparentId mawgod damn el array


        if (isNewParentInArray) {
            const permission = await btn_permission('items_permission', 'update');
            if (!permission) {
                showAlert('warning', 'ليس لديك الصلاحية لاتمام هذه العملة')
                $(tree).jstree(true).refresh();
                return;
            };

            const controller = new AbortController();
            const signal = controller.signal;

            await showDialog('', 'هل تريد حفظ التعديل على دليل الحسابات ؟', '');
            if (!dialogAnswer) {
                $(tree).jstree(true).refresh();
                return;
            }

            const timeout = setTimeout(() => {
                controller.abort();
            }, 15000);



            const posted_elements = {
                currentAccountId,
                newParentId,
            }
            const response = await fetch('/api/items_tree_drag_and_drop', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(posted_elements),
                signal,
            });

            clearTimeout(timeout);
            if (response.ok) {
                const data = await response.json();
                closeDialog();
                if (data.success) {
                    body_content.style.pointerEvents = 'none';
                    redirection('items_view_ar', 'success', data.message_ar);
                } else {
                    $(tree).jstree(true).refresh();
                    body_content.style.pointerEvents = 'auto';
                    showAlert('fail', data.message_ar);

                }
            } else {
                $(tree).jstree(true).refresh();
                closeDialog();
                showAlert('fail', `Request failed with status code: ${response.status}`);
            }



        } else {
            showAlert(`warning`, `لا يمكن اضافة مجموعه فرعيه ضمن الحساب المحدد`)
            $(tree).jstree(true).refresh();

        }


    } catch (error) {
        $(tree).jstree(true).refresh();
        closeDialog();
        showAlert('fail', 'حدث خطأ اثناء معالجة البيانات');
        catch_error(error);
    }
});




noButtons.forEach(noButton => {
    noButton.onclick = function () {
        try {
            dialogOverlay_input.style.animation = 'fadeOut 0.3s forwards';
            setTimeout(() => {
                dialogOverlay_input.style.display = 'none'
                closeDialog()
                dialogOverlay_input.style.animation = 'none';
            }, 300);

        } catch (error) {
            dialogOverlay_input.style.display = 'none'
            closeDialog()
            catch_error(error)
            dialogOverlay_input.style.animation = 'none';
        }
    };
});



btn_save.addEventListener('click', async function () {
    await addNewAccount();
})


btn_save_tree_group_div.onclick = async function () {
    await addnewaccountGroup()
}
btn_update_tree_group_div.onclick = async function () {
    await updateGroup()
}
btn_update.addEventListener('click', async function () {
    await updateAccount();
})

btn_delete.addEventListener('click', async function () {
    await deleteNode('item');
})

btn_delete_tree_group_div.addEventListener('click', async function () {
    await deleteNode('group');
})
collapse_tree.addEventListener('click', async function () {
    $(tree).jstree('close_all')
})



//#endregion end tree

//!===========================================================================================================================
//!===========================================================================================================================
//!===========================================================================================================================

//#region table

accounts_view_table_btn.addEventListener('click', async function () {
    try {
        showLoadingIcon(this)
        await showFirst50RowAtTheBegening();
        tree_2div_container.style.display = 'none'
        table_div.style.display = 'flex'
        hideLoadingIcon(this)
    } catch (error) {
        hideLoadingIcon(this)
        catch_error(error)
        table_div.style.display = 'none'
        tree_2div_container.style.display = 'none'
    }
})


const tableContainer = document.getElementById('tableContainer');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');


let data2 = [];
let array1 = [];
let slice_Array1 = [];

async function geteProductionData_fn() {

    data = await fetchData_postAndGet(
        '/get_All_items_Data_for_table',
        {},
        'items_permission','view',
        15,
        false,'',
        false,
        true,content_space,
        false,'',
        'حدث خطأ اثناء معالجة البيانات'
    )
    // const response = await fetch('/get_All_items_Data_for_table');
    // data2 = await response.json();
    array1 = data2.slice();
}

async function showFirst50RowAtTheBegening() {
    await geteProductionData_fn()
    slice_Array1 = await array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    filleffectstable()
}


async function filleffectstable() {
    //  @@ هاااااام جدا 
    // el properties beta3 kol 3amod ytm wad3ha fe el <thead></thead> And <tbody></tbody> And <tfoor></tfoor> kol wa7ed lewa7do
    // el properties hya :
    // 1 : display: none; > fe 7alt enak ardt e5fa2 el 3amod -- display: ; hatspha fadya fe7alt enak ardt tezhr el 3amod
    // 2 : white-space: nowrap;  fe 7alt enak ardt en el text maylfsh ta7t ba3do  -- white-space: wrap; fe 7alt enak ardt en el tezt ylf
    // 3 : width: auto;  fe 7alt enak ardt en ykon 3ard el 3amod 3ala ad el mo7tawa -- min-width: 15rem;width: 100%; fe 7alt enak ardt en el 3amod ya5od ba2y el mesa7a el fadla
    // 4 : text-align: center / left / right / justify   da 3ashan tet7km fe el text ymen wala shemal wala fe ele nos

    //* Prepare GLOBAL variables Befor sum functions

    // إعداد رأس الجدول
    let tableHTML = `<table id="bread_table" class="review_table">
                        <thead>
                            <tr>
                                <th></th>
                                <th style="display: none;">id</th>
                                <th style="display: none;">parentId</th>
                                <th style="display: none; width: auto; white-space: nowrap; text-align: start">المجموعه</th>
                                <th style="min-width: 25rem; max-width: 40rem; width: 100%; white-space: wrap;text-align: start">الصنف</th>
                                <th style="width: auto; white-space: wrap; text-align: start">الوحدة</th>
                                <th style="display: none;">acc_no</th>
                                <th style="display: none;">item_revenue_account</th>
                                <th style="display: none;">item_expense_account</th>
                                <th style="display: none;">item_sales_price</th>
                                <th style="display: none;">item_purshas_price</th>
                                <th style="display: none;">item_amount_reorder_point</th>
                                <th style="width: auto; white-space: nowrap; text-align: center">الكمية</th>
                                <th style="width: auto; white-space: nowrap; text-align: center">متوسط التكلفة</th>
                                <th style="width: auto; white-space: nowrap; text-align: center">اجمالى التكلفة</th>
                            </tr>
                            </thead>
                            <tbody>`;

    // إضافة صفوف الجدول بناءً على البيانات
    // slice_Array1 = ""; // تفريغ المصفوفه
    slice_Array1.forEach(row => {
        tableHTML += `<tr>
                            <td> <button class="table_update_btn" onclick="table_update_btn_fn(this)">تحرير</button> </td>
                            <td style="display: none">${row.account_id}</td>
                            <td style="display: none">${row.parent_id}</td>
                            <td style="display: none; width: auto; white-space: nowrap;text-align: start">${row.parent_name}</td>
                            <td style="min-width: 25rem; max-width: 40rem; width: 100%; white-space: wrap;text-align: start">${row.account_name}</td>
                            <td style="width: auto; white-space: nowrap;text-align: center">${row.item_unite}</td>
                            <td style="display: none; width: auto; white-space: nowrap;text-align: start">${row.account_no}</td>
                            <td style="display: none; width: auto; white-space: nowrap;text-align: start">${row.item_revenue_account}</td>
                            <td style="display: none; width: auto; white-space: nowrap;text-align: start">${row.item_expense_account}</td>
                            <td style="display: none; width: auto; white-space: nowrap;text-align: start">${row.item_sales_price}</td>
                            <td style="display: none; width: auto; white-space: nowrap;text-align: start">${row.item_purshas_price}</td>
                            <td style="display: none; width: auto; white-space: nowrap;text-align: start">${row.item_amount_reorder_point}</td>
                            <td style="width: auto; white-space: nowrap; text-align: center"></td>
                            <td style="width: auto; white-space: nowrap; text-align: center"></td>
                            <td style="width: auto; white-space: nowrap; text-align: center"></td>
                          </tr>`;
    });

    tableHTML += `</tbody>
        <tfoot>
            <tr class="table_totals_row";>
                <td id="tfooter1" ></td>
                <td id="tfooter2" style="display: none;" ></td>
                <td id="tfooter3" style="display: none;"></td>
                <td id="tfooter4" style="display: none;"></td>
                <td id="tfooter5" ></td>
                <td id="tfooter6" ></td>
                <td id="tfooter7" style="display: none;"></td>
                <td id="tfooter8" style="display: none;"></td>
                <td id="tfooter9" style="display: none;"></td>
                <td id="tfooter10" style="display: none;"></td>
                <td id="tfooter11" style="display: none;"></td>
                <td id="tfooter12" style="display: none;"></td>
                <td id="tfooter13" style="width: auto; white-space: nowrap; text-align: center"></td>
                <td id="tfooter14" style="width: auto; white-space: nowrap; text-align: center"></td>
                <td id="tfooter15" style="width: auto; white-space: nowrap; text-align: center"></td>
            </tr>
                        <tr id="table_fotter_buttons_row">
                            <td colspan="15">   <!-- da awel 3amod fe ele sad tr han7othan5elh han3mel merge lkol el columns fe column wa7ed 3ashan n7ot el 2 buttons hat3mel colspan le3add el 3awamed kolaha -->
                                <div class='flex_H'>
                                 <button class="table_footer_show_data"  id="" onclick="ShowAllDataIneffectsTable()">All</button>
                                 <button class="table_footer_show_data"  id="" onclick="showFirst50RowIneffectsTable()">50</button>
                                </div>
                            </td>
                        </tr>
                    </tfoot>`;

    // إغلاق الجدول
    tableHTML += '</table>';

    // تحديث محتوى الصفحة بناءً على البيانات
    tableContainer.innerHTML = tableHTML;
    page_content.style.display = 'flex'


    document.getElementById("tfooter1").textContent = slice_Array1.length; // عدد الصفوف






    // document.getElementById("tFooter6").textContent = totalColumn_Valuu;
    // document.getElementById("tfooter1").textContent = slice_Array1.length; //  عدد الصفوف

    if (array1.length > 0 && array1.length <= 50) {
        document.querySelector('#table_fotter_buttons_row').style.display = "none";
    } else if (array1.length < 1) {
        document.querySelector('#table_fotter_buttons_row').innerHTML = `<td colspan='15' class="td_no_result">لا نتائج</td>`;
    };


};


// search in effectsTable
function performSearch() {
    // الحصول على قيمة البحث
    const searchValue = searchInput.value.trim().toLowerCase();

    // فلترة البيانات بناءً على قيمة البحث
    array1 = data2.filter(row => {
        const account_name = row.account_name && row.account_name.toString().toLowerCase().includes(searchValue);
        const item_unite = row.item_unite && row.item_unite.toString().toLowerCase().includes(searchValue);
        return account_name || item_unite;
    });

    // تحديد جزء البيانات للعرض (أول 50 صف فقط)
    slice_Array1 = array1.slice(0, 50);

    // ملء الجدول بالبيانات
     filleffectstable();
//     /*
               
//         const cumulativeBalanceColumnHeaders = document.querySelectorAll('#bread_table th:nth-child(7), #bread_table td:nth-child(7)');
        
//         if (searchValue) {
//             // إذا كانت قيمة البحث موجودة، أخفِ عمود الجرد
//             cumulativeBalanceColumnHeaders.forEach(element => {
//                 element.style.display = 'none';
//             });
//         } else {
//             // إذا لم تكن هناك قيمة في البحث، اعرض عمود الجرد
//             cumulativeBalanceColumnHeaders.forEach(element => {
//                 element.style.display = 'table-cell';
//             });
//         }
//     */
 }

async function ShowAllDataIneffectsTable() {
    showAlert('info', 'ان ظهار كامل البيانات فى القائمة المنسدله لا يؤثر على عمليه البحث فى البيانات')
    slice_Array1 = array1.slice(); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    filleffectstable()
}

async function showFirst50RowIneffectsTable() {
    slice_Array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    filleffectstable()
}

async function table_update_btn_fn(updateBtn) {
    try {
        
        showLoadingIcon(updateBtn)
    clear_inputs(`dialogOverlay_input`)
    const row = updateBtn.closest("tr")
    
    get_revenue_accounts_fn()
    changeSelect('revenue_account_select', row.cells[7].textContent)

    const response = await fetch('/api/tree/items');
    data = await response.json();

    get_items_groups_options_fn(parents_group_select, parseInt(row.cells[1].textContent), false,'array',data);
    changeSelect('parents_group_select', row.cells[2].textContent);

        h2_header.textContent = row.cells[4].textContent;
        account_no_input.value = row.cells[6].textContent
        account_name_input.value = row.cells[4].textContent
        account_id_hidden.value = row.cells[1].textContent


        


        item_unite_input.value = row.cells[5].textContent;
        sales_price.value = row.cells[9].textContent;
        purchase_price.value = row.cells[10].textContent;
        reorder_point.value = row.cells[11].textContent


        btn_save.style.display = 'none'
        btn_update.style.display = 'flex'
        btn_delete.style.display = 'flex'
        tree_group_div.style.display = 'none'
        tree_rename_div.style.display = 'none'
        tree_add_account.style.display = 'flex'
        dialogOverlay_input.style.display = 'flex'

        hideLoadingIcon(updateBtn)
    } catch (error) {
        hideLoadingIcon(updateBtn)
        catch_error(error)
    }
};


document.querySelector(`#newItemBtn_table`).onclick = async function () {
    try {

        showLoadingIcon(this)
        clear_inputs(`dialogOverlay_input`)

        get_revenue_accounts_fn()

        const response = await fetch('/api/tree/items');
        data = await response.json();

        const allItemsGroups = data.filter(item =>
            item.is_final_account !== true
        );


        filterd_statement_options_array = allItemsGroups.map(item => `
        <option value="${item.account_id}">${item.account_name}</option>
    `).join('');
        document.querySelector(`#parents_group_select`).innerHTML = filterd_statement_options_array

        // h2
        h2_header.textContent = `صنف جديد`;

        // buttons
        btn_save.style.display = 'flex'
        btn_update.style.display = 'none'
        btn_delete.style.display = 'none'
        tree_group_div.style.display = 'none'
        tree_rename_div.style.display = 'none'
        tree_add_account.style.display = 'flex'
        dialogOverlay_input.style.display = 'flex'

        hideLoadingIcon(this)
    } catch (error) {
        hideLoadingIcon(this)
        catch_error(error)
    }
}


document.querySelector(`#newGroupBtn_table`).onclick = async function () {
    try {
        showLoadingIcon(this)
        clear_inputs(`dialogOverlay_input`)

        // account_name_input_tree_group_div.value = ''

        const response = await fetch('/api/tree/items');
        data = await response.json();

        const allItemsGroups = data.filter(item =>
            item.is_final_account !== true
        );


        console.log(`1`);

        filterd_statement_options_array = allItemsGroups.map(item => `
        <option value="${item.account_id}">${item.account_name}</option>
    `).join('');

        document.querySelector(`#parent_gruop_name_tree_goup_div`).innerHTML = filterd_statement_options_array

        // h2
        h2_header.textContent = ` مجموعه فرعيه جديدة`;
        lbl_acc_name.textContent = 'اسم المجموعه';

        
        btn_save_tree_group_div.style.display = 'flex';
        btn_update_tree_group_div.style.display = 'none';
        btn_delete_tree_group_div.style.display = 'none';
        tree_rename_div.style.display = 'none';
        tree_add_account.style.display = 'none';
        tree_group_div.style.display = 'flex'
        dialogOverlay_input.style.display = 'flex';
        hideLoadingIcon(this)
    } catch (error) {
        hideLoadingIcon(this)
        catch_error(error)
    }
}

// عند الضغط على زر البحث
searchBtn.addEventListener('click', performSearch);

// حدث عن الضغط على زر المسح الخاص ب الانبوت سيرش الى بيظهر لما بنكتب بيانات
searchInput.addEventListener('search', function () {
    performSearch();
});

// عند الضغط على زرار انتر وانت واقف فى مربع البحث
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        performSearch();
    };
});

document.addEventListener('DOMContentLoaded', function () {
    showRedirectionReason();
});


//#endregion end table
