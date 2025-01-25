
setActiveSidebar('accounts_view_ar');
// alertify.alert('هذه رسالة تنبيه.');
//#region variables
const tree_add_account = document.querySelector(`#tree_add_account`);
const account_no_input = document.querySelector(`#account_no_input`);
const lbl_acc_name = document.querySelector(`#lbl_acc_name`);
const account_name_input = document.querySelector(`#account_name_input`);
const account_id_hidden = document.querySelector(`#account_id_hidden`);
const statment_type_span = document.querySelector(`#statment_type_span`);
const statment_type_span_tree_group_div = document.querySelector(`#statment_type_span_tree_group_div`);
const cash_flow_statement = document.querySelector(`#cash_flow_statement`);
const statment_type_span_hidden_value = document.querySelector(`#statment_type_span_hidden_value`);
const parents_group_select = document.querySelector(`#parents_group_select`);
const select_parent_gruop_name_tree_goup_div = document.querySelector(`#select_parent_gruop_name_tree_goup_div`);
const h2_header = document.querySelector(`#h2_header`);
const btn_save = document.querySelector(`#btn_save`);
const btn_update = document.querySelector(`#btn_update`);
const btn_delete = document.querySelector(`#btn_delete`);
const accounts_view_tree_btn = document.querySelector(`#accounts_view_tree_btn`);
const dialogOverlay_input = document.querySelector(`#dialogOverlay_input`);
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
const accounts_view_table_btn = document.querySelector(`#accounts_view_table_btn`);



accounts_view_table_btn.onclick = function (){
    showAlert('info', 'جارى العمل على هذا الجزىء')
    return;
}

let data = [];
let filterd_statement_options_array = [];
async function fetchTreeData() {
    try {
        const response = await fetch('/api/tree');
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
                finance_statement: row.finance_statement,
                cashflow_statement: row.cashflow_statement,
                global_id: row.global_id,

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

                                if (is_main_account.includes(node.data.global_id)) {
                                    showAlert('warning', 'لا يمكن عرض معلومات عن الحساب المحدد')
                                    return
                                }

                                const parentNode = $(tree).jstree().get_node(node.parent); //! << get ParentNode

                             
                                if (node.data.final_account) {
                              
                                    const statemenet_options = get_statemenet_options_fn(node.id, node.data.finance_statement, false);

                                    const obj_accounts_update_account = {
                                        h2_header :`تعديل حساب : ${node.text}`,
                                        account_no_input : node.data.account_no ?? '',
                                        account_name_input : node.text,
                                        account_id_hidden : node.id,
                                        global_id : node.data.global_id,
                                        statment_type_span_hidden_value : parentNode.data.finance_statement,
                                        statemenet_options : statemenet_options,
                                        statemenet_options_selectedValue : node.parent,
                                        statment_type_span_tree_group_div : parseInt(parentNode.data.finance_statement) === 1 ? 'قائمة المركز المالي' : 'قائمة الدخل',
                                        cash_flow_statement_id : node.data.cashflow_statement
    
                                    };
                                    clear_items_sessionsStorage()
                                    sessionStorage.setItem('obj_accounts_update_account', JSON.stringify(obj_accounts_update_account));                            
                                    window.location.href = `accounts_update_ar`;
                                    hideLoadingIcon(content_space)
                                    //!-----------------------------------



                                } else {
                           
                                    const statemenet_options = get_statemenet_options_fn(node.id, node.data.finance_statement, false);
                                    const obj_accounts_update_group = {
                                        h2_header:`تعديل مجموعة : ${node.text}`,
                                        input_account_name_input_tree_group_div : node.text,
                                        account_id_hidden_tree_group_div : node.id,
                                        global_id : node.data.global_id,
                                        statment_type_span_hidden_value : parentNode.data.finance_statement,
                                        statemenet_options : statemenet_options,
                                        statemenet_options_selectedValue : node.parent,
                                        statment_type_span_tree_group_div : parseInt(parentNode.data.finance_statement) === 1 ? 'قائمة المركز المالي' : 'قائمة الدخل',
    
                                    };
                                    clear_items_sessionsStorage()
                                    sessionStorage.setItem('obj_accounts_update_group', JSON.stringify(obj_accounts_update_group));                            
                                    window.location.href = `accounts_update_ar`;
                                    hideLoadingIcon(content_space)
                                    //!-----------------------------------

                                }
                            }
                        },
                        'create_group': {
                            'label': 'إضافة مجموعه فرعيه',
                            'icon': 'fa-duotone fa-folder-open',
                            'action': async function () {


                                if (node.data.is_final_account || is_forbidden_adding_branches.includes(node.data.global_id)) {
                                    showAlert(`warning`, `لا يمكن اضافة مجموعه فرعيه ضمن الحساب المحدد`)
                                    return;
                                }


                                const statemenet_options =  get_statemenet_options_fn(node.id, node.data.finance_statement, true);
                                
                                const obj_accounts_add_group = {
                                    h2_header: `اضافه مجموعه فرعيه`,
                                    lbl_acc_name : 'اسم المجموعه',
                                    statemenet_options : statemenet_options,
                                    statemenet_options_selectedValue : node.id,
                                    statment_type_span_tree_group_div : parseInt(node.data.finance_statement) === 1 ? 'قائمة المركز المالي' : 'قائمة الدخل',

                                };
                                clear_items_sessionsStorage()
                                sessionStorage.setItem('obj_accounts_add_group', JSON.stringify(obj_accounts_add_group));                            
                                window.location.href = `accounts_add_ar`;
                                hideLoadingIcon(content_space)
                                //!-----------------------------------

                                //---------------------------------------------
                            }
                        },
                        'create': {
                            'label': 'إضافة حساب فرعي',
                            'icon': 'fa-duotone fa-clipboard',
                            'action': async function () {


                                if (node.data.is_final_account || is_forbidden_adding_branches.includes(node.data.global_id)) {
                                    showAlert(`warning`, `لا يمكن اضافة حساب فرعى ضمن الحساب المحدد`)
                                    return;
                                }

                                const statemenet_options =  get_statemenet_options_fn(node.id, node.data.finance_statement, true);
                                const obj_accounts_add_account = {
                                    h2_header: `اضافه حساب فرعي`,
                                    lbl_acc_name : 'اسم الحساب',
                                    statemenet_options : statemenet_options,
                                    statemenet_options_selectedValue : node.id,
                                    statment_type_span_hidden_value : node.data.finance_statement,
                                    statment_type_span : parseInt(node.data.finance_statement) === 1 ? 'قائمة المركز المالي' : 'قائمة الدخل',

                                };
                                clear_items_sessionsStorage()
                                sessionStorage.setItem('obj_accounts_add_account', JSON.stringify(obj_accounts_add_account));                            
                                window.location.href = `accounts_add_ar`;
                                hideLoadingIcon(content_space)
                                //!-----------------------------------


                                // final statement
                                statment_type_span_hidden_value.value = node.data.finance_statement
                                statment_type_span.textContent = (function () {
                                    if (parseInt(node.data.finance_statement) === 1) {
                                        return 'قائمة المركز المالي';
                                    } else {
                                        return 'قائمة الدخل';
                                    }
                                })();


                                //---------------------------------------------
                            }
                        },
                        // إضافة خيارات إضافية إلى القائمة السياقية
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
                                            showAlert('warning', 'رجاء ادخال اسم حساب صحيح');
                                            return
                                        }
                                        const account_id = parseInt(node.id);
                                        await fetchData_post1(
                                            '/api/rename-account',
                                            {
                                                account_id,
                                                account_rename_input
                                            },
                                            'accounts_permission', 'update',
                                            'هل تريد تحديث اسم الحساب المحدد ؟',
                                            15,
                                            'accounts_view_ar',
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
                                        showAlert('warning', 'لا يمكن حذف الحساب المحدد لانه من الحسابات الافتراضية')
                                        return;
                                    }

                                    const account_id = parseInt(node.id);
                                    await fetchData_post1(
                                        '/api/delete-account',
                                        { account_id },
                                        'accounts_permission', 'delete',
                                        'هل تريد حذف الحساب الحالى من دليل الحسابات ؟',
                                        15,
                                        'accounts_view_ar',
                                        'حدث خطأ اثناء حذف الحساب المحدد'
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
function getChildIds(tree, nodeId) {
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
}



function get_statemenet_options_fn(accountId, financeStatmentId, is_AllowToshowTheSameAccountInOptions) {
    try {

        allChildIds = getChildIds(tree, accountId);    
        const statement_options_array = data.filter(item =>
            (is_AllowToshowTheSameAccountInOptions ? true : item.account_id !== accountId) &&
            item.is_final_account !== true &&
            !allChildIds.includes(item.account_id)&&
            item.finance_statement === parseInt(financeStatmentId) &&
            item.is_forbidden_adding_branches !== true &&
            !is_forbidden_adding_branches.includes(item.global_id)    
        );

        filterd_statement_options_array = statement_options_array.map(item => `
        <option value="${item.account_id}">${item.account_name}</option>
    `).join('');
            return filterd_statement_options_array
    } catch (error) {
        catch_error(error)
    }
}


//#region add new node




async function deleteNode() {

    try {
        if (is_forbidden_deletion.includes(node.data.global_id)) {
            showAlert('warning', 'لا يمكن حذف الحساب المحدد لانه من الحسابات الافتراضية')
            return;
        }
        let account_id;
        if (node.data.final_account) {
            account_id = parseInt(account_id_hidden.value);
        } else {
            account_id = parseInt(account_id_hidden_tree_group_div.value);
        }

        //preparing data

        await fetchData_post1(
            '/api/delete-account',
            { account_id },
            'accounts_permission', 'delete',
            'هل تريد حذف الحساب الحالى من دليل الحسابات ؟',
            15,
            'accounts_view_ar',
            'حدث خطأ اثناء حذف الحساب المحدد'
        )
    } catch (error) {
        catch_error(error)
    }
}

async function getParentNodesForDragAndDrop(currentNodeId, currentNodeFinanceStatmentId) {
    const filteredParentAccountsArray = data.filter(item =>
        item.account_id !== currentNodeId &&
        item.is_final_account !== true &&
        item.finance_statement === parseInt(currentNodeFinanceStatmentId) &&
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
        const currentAccountFinanceStatement = data.node.data.finance_statement

        // بيانات العقدة الجديدة التي تمت إضافتها (العقدة الوجهة)
        const newParentNodeId = data.parent;
        const newParentNodeData = $(tree).jstree().get_node(newParentNodeId);
        const newParentId = newParentNodeData.id
        // const newParentGlobalId = newParentNodeData.data.global_id
        // const newParentFinalAccount = newParentNodeData.data.final_account

       const allChildIds = getChildIds(tree, currentAccountId);

       if (allChildIds.includes(newParentId)){
        showAlert('warning','لا يمكن نقل الحساب الى المجموعه المحدده')
        $(tree).jstree(true).refresh();
        return
       }
        

        const array1 = await getParentNodesForDragAndDrop(currentAccountId, currentAccountFinanceStatement);

        const isNewParentInArray = array1.some(item => item.account_id === newParentId); // ta2ked en el newparentId mawgod damn el array
        if (isNewParentInArray) {

            const permission = await btn_permission('accounts_permission', 'update');
            if (!permission) {
                showAlert('warning','ليس لديك الصلاحية لاتمام هذه العملة')
                $(tree).jstree(true).refresh();
                return;
            };

            const controller = new AbortController();
            const signal = controller.signal;

            await showDialog('', 'هل تريد حفظ التعديل على دليل الحسابات ؟', '');
            if (!dialogAnswer) {
                // إلغاء عملية التحريك عن طريق إعادة تحميل الشجرة (refresh) إلى حالتها السابقة
                $(tree).jstree(true).refresh();
                return;
            }

            const timeout = setTimeout(() => {
                controller.abort(); // إلغاء الطلب
            }, 15000);



            const posted_elements = {
                currentAccountId,
                newParentId,
            }
            // إرسال الطلب إلى الخادم
            const response = await fetch('/api/update-account-parent', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(posted_elements),
                signal, // تمرير الإشارة لإلغاء الطلب
            });


            // إلغاء المهلة الزمنية إذا تمت الاستجابة في الوقت المناسب
            clearTimeout(timeout);
            if (response.ok) {
                const data = await response.json();
                closeDialog();
                if (data.success) {
                    body_content.style.pointerEvents = 'none';
                    redirection('accounts_view_ar', 'success', data.message_ar);
                } else {
                    body_content.style.pointerEvents = 'auto';
                    showAlert('fail', data.message_ar);
                }
            } else {
                closeDialog();
                showAlert('fail', `Request failed with status code: ${response.status}`);
            }



        } else {
            showAlert(`warning`, `لا يمكن اضافة مجموعه فرعيه ضمن الحساب المحدد`)
            $(tree).jstree(true).refresh();
            return;
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


accounts_view_tree_btn.addEventListener('click', async function () {
    try {
        showLoadingIcon(this)
        await fetchTreeData();
        tree_2div_container.style.display = 'flex'
        hideLoadingIcon(this)
    } catch (error) {
        hideLoadingIcon(this)
        catch_error(error)
    }
})

// btn_save.addEventListener('click', async function () {
//     await addNewAccount();
// })


// btn_save_tree_group_div.onclick = async function () {
//     await addnewaccountGroup()
// }
// btn_update_tree_group_div.onclick = async function () {
//     await updateGroup()
// }
// btn_update.addEventListener('click', async function () {
//     await updateAccount();
// })

// btn_delete.addEventListener('click', async function () {
//     await deleteNode();
// })

// btn_delete_tree_group_div.addEventListener('click', async function () {
//     await deleteNode();
// })
collapse_tree.addEventListener('click', async function () {
    $(tree).jstree('close_all')
})

//#endregion End - events

