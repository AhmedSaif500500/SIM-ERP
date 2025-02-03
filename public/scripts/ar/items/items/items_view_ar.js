
setActiveSidebar('itemsMain_view_ar');
pagePermission("view", "items_permission");

const table_div = document.querySelector(`.table_div`);
const dialogOverlay_input = document.querySelector(`#dialogOverlay_input`);
const accounts_view_tree_btn = document.querySelector(`#accounts_view_tree_btn`);
const accounts_view_table_btn = document.querySelector(`#accounts_view_table_btn`);



//#region tree



// accounts_view_tree_btn.addEventListener('click', async function () {
//     try {
//         showLoadingIcon(content_space)
//         await fetchTreeData();
//         table_div.style.display = 'none'
//         tree_2div_container.style.display = 'flex'
//         hideLoadingIcon(content_space)
//     } catch (error) {
//         hideLoadingIcon(content_space)
//         catch_error(error)
//         table_div.style.display = 'none'
//         tree_2div_container.style.display = 'none'
//     }
// })




accounts_view_tree_btn.onclick =  async function () {
    try {
        showLoadingIcon(content_space)
        await fetchTreeData();
        table_div.style.display = 'none'
        tree_2div_container.style.display = 'flex'
        hideLoadingIcon(content_space)
    } catch (error) {
        hideLoadingIcon(content_space)
        catch_error(error)
        table_div.style.display = 'none'
        tree_2div_container.style.display = 'none'
    }
}


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
const select_parent_gruop_name_tree_goup_div = document.querySelector(`#select_parent_gruop_name_tree_goup_div`);
const h2_header = document.querySelector(`#h2_header`);
const btn_save = document.querySelector(`#btn_save`);
const btn_update = document.querySelector(`#btn_update`);
const btn_delete = document.querySelector(`#btn_delete`);
const noButtons = document.querySelectorAll(`.noButton`);
const collapse_tree = document.querySelector(`#collapse_tree`);
const tree_2div_container = document.querySelector(`#tree_2div_container`);
const tree_rename_div = document.querySelector(`#tree_rename_div`);
const tree_group_div = document.querySelector(`#tree_group_div`);
const input_account_name_input_tree_group_div = document.querySelector(`#input_account_name_input_tree_group_div`);
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
            const optionObject = {
                id: row.id,
                account_name: row.account_name,
                global_id : row.global_id 
            };
            filterd_revenue_options_array.push(optionObject);
        }
        
        return filterd_revenue_options_array;
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
                                try {
                                      showLoadingIcon(content_space)  

                                if (is_main_account.includes(node.data.global_id)) {
                                    showAlert('warning', 'لا يمكن عرض معلومات عن الصنف المحدد')
                                    return
                                }

                                const parentNode = $(tree).jstree().get_node(node.parent); //! << get ParentNode


                                if (node.data.final_account) {

                                    const revenue_accounts_options = await get_revenue_accounts_fn()
                                    

                                    const items_options =  get_items_groups_options_fn(node.id, false,'tree','');
                                    const obj_items_update_account = {
                                        h2_header: node.text,
                                        account_no_input: node.data.account_no ?? '',
                                        account_name_input: node.text,
                                        account_id_hidden: node.id,
                                        item_unite_input: node.data.item_unite,
                                        sales_price: node.data.item_sales_price,
                                        purchase_price: node.data.item_purshas_price,
                                        reorder_point: node.data.item_amount_reorder_point,
                                        revenue_accounts_options: revenue_accounts_options,
                                        nodeId: node.id,
                                        parentNode : node.parent,
                                        items_options: items_options,
                                        item_revenue_account_id: node.data.item_revenue_account,
                                        // revenue_accounts_options: revenue_accounts_options,
                                    };
                                    clear_items_sessionsStorage()
                                    sessionStorage.setItem('obj_items_update_account', JSON.stringify(obj_items_update_account));                            
                                    window.location.href = `items_update_ar`;
                                    hideLoadingIcon(content_space)
                                } else {

                                    input_account_name_input_tree_group_div.value = node.text;
                                    account_id_hidden_tree_group_div.value = node.id;

                                    const items_options =  get_items_groups_options_fn(node.id, false,'tree','');

                                    const obj_items_update_group = {
                                        h2_header: node.text,
                                        input_account_name_input_tree_group_div: node.text,
                                        account_id_hidden_tree_group_div: node.id,
                                        nodeId: node.id,
                                        parentNode : node.parent,
                                        items_options: items_options,
                                    };
                                    clear_items_sessionsStorage()
                                    sessionStorage.setItem('obj_items_update_group', JSON.stringify(obj_items_update_group));                            
                                    window.location.href = `items_update_ar`;
                                    hideLoadingIcon(content_space)

                                    hideLoadingIcon(content_space)
                                }
                            } catch (error) {
                                hideLoadingIcon(content_space)
                                catch_error(error)
                            }
                            }
                            
                        },
                        'create_group': {
                            'label': 'إضافة مجموعه فرعيه',
                            'icon': 'fa-duotone fa-folder-open',
                            'action': async function () {


                                if (node.data.final_account || is_forbidden_adding_branches.includes(node.data.global_id)) {
                                    showAlert(`warning`, `لا يمكن اضافة مجموعه فرعيه ضمن المجموعة المجددة`)
                                    return;
                                }

                                const itemsArray =  get_items_groups_options_fn(node.id, true,'tree','');
                                const obj_items_create_group = {
                                    itemsArray: itemsArray,
                                    nodeId: node.id,
                                };
                                clear_items_sessionsStorage()
                                sessionStorage.setItem('obj_items_create_group', JSON.stringify(obj_items_create_group));                            
                                window.location.href = `items_add_ar`;
                            }
                        },
                        'create': {
                            'label': 'إضافة صنف فرعي',
                            'icon': 'fa-duotone fa-clipboard',
                            'action': async function () {

                                if (node.data.final_account || is_forbidden_adding_branches.includes(node.data.global_id)) {
                                    showAlert(`warning`, `لا يمكن اضافة صنف فرعى ضمن الصنف المحدد`)
                                    return;
                                }

                                const revenue_accounts_options = await get_revenue_accounts_fn()
    
                                
                                
                                const items_options =  get_items_groups_options_fn(node.id, true,'tree','');
                                const obj_items_create_account = {
                                    items_options: items_options,
                                    revenue_accounts_options: revenue_accounts_options,
                                    nodeId: node.id,
                                };


                                clear_items_sessionsStorage()
                                sessionStorage.setItem('obj_items_create_account', JSON.stringify(obj_items_create_account));                            
                                window.location.href = `items_add_ar`;

                                //---------------------------------------------
                            }
                        },
                        'rename': {
                            'label': 'إعادة تسمية',
                            'icon': 'fa-duotone fa-pen-to-square',
                            'action': async function () {
                                try {


                                    if (is_forbidden_deletion.includes(node.data.global_id)) {
                                        showAlert('warning', 'لا يمكن اعادة تمسية الصنف المحدد لانه من الصنفات الافتراضية')
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
                                            'هل تريد تحديث اسم الصنف المحدد ؟',
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

                                    const post = await new_fetchData_postAndGet(
                                        '/api/delete-item',
                                        { account_id },
                                        'items_permission', 'delete',
                                        50,
                                        true,"هل تريد حذف البيانات من دليل الاصناف ؟ ",
                                        true,
                                        false,false,
                                        false,false,false,
                                        true,"items_view_ar",
                                        false,"",
                                        "حدث خطأ اثناء معالجة البيانات"


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
        catch_error(error)
        // console.error('Error fetching tree data:', error);
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



function get_items_groups_options_fn(accountId, is_Allow_To_show_The_Same_Account_In_Options,tree_or_array,Varuable_dataArray_if_it_is_array_only) {
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

        filterd_statement_options_array = statement_options_array.map(item => ({
            id: item.account_id,
            account_name: item.account_name
        }));        
        return filterd_statement_options_array
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
            showAlert('warning', 'لا يمكن نقل الصنف الى المجموعه المحدده')
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

            await showDialog('', 'هل تريد حفظ التعديل على دليل الصنفات ؟', '');
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
            showAlert(`warning`, `لا يمكن اضافة مجموعه فرعيه ضمن الصنف المحدد`)
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


collapse_tree.addEventListener('click', async function () {
    $(tree).jstree('close_all')
})



//#endregion end tree


accounts_view_table_btn.addEventListener('click', function () {
    try {
        sessionStorage.removeItem('items_table_view_Array')
        window.location.href = "/items_table_view_ar";
    } catch (error) {
        catch_error(error)
    }
})




document.addEventListener('DOMContentLoaded', function () {
    try {
        showLoadingIcon(content_space)

        showRedirectionReason();
        hideLoadingIcon(content_space)
    } catch (error) {
        hideLoadingIcon(content_space)
        catch_error(error)
    }
   
});


//#endregion end table
