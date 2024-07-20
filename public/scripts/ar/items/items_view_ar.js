
setActiveSidebar('items_view_ar');
// alertify.alert('هذه رسالة تنبيه.');
//#region variables
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
const accounts_view_tree_btn = document.querySelector(`#accounts_view_tree_btn`);
const dialogOverlay_input = document.querySelector(`#dialogOverlay_input`);
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


const is_forbidden_deletion = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 8, 19, 20, 21, 22, 23];
const is_forbidden_adding_branches = [];
const is_main_account = [12];
const is_accumulated_account = [];

let filterd_revenue_options_array = [];
async function get_revenue_accounts_fn(){
    try {
        const data = await fetchData_postAndGet(
            "/api/get_revenue_accounts",
            {},
            'pass', 'pass',
            20,
            false,
            '',
            'حدث خطأ اثناء معالجة البيانات',
            false
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
                              
                                    h2_header.textContent = node.text;
                                    account_no_input.value = node.data.account_no ?? '';
                                    account_name_input.value = node.text;
                                    account_id_hidden.value = node.id;
                                    get_items_groups_options_fn(parents_group_select, node.id, false);
                                    changeSelect('parents_group_select', node.parent)
                                    // parents_group_select.value = parentNode.id;


                                    btn_save.style.display = 'none'
                                    btn_update.style.display = 'flex'
                                    btn_delete.style.display = 'flex'
                                    tree_group_div.style.display = 'none'
                                    tree_rename_div.style.display = 'none'
                                    tree_add_account.style.display = 'flex'
                                    dialogOverlay_input.style.display = 'flex'

                                } else {
                           
                                    h2_header.textContent = node.text;
                                    lbl_acc_name.textContent = 'اسم المجموعه';
                                    account_name_input_tree_group_div.value = node.text;
                                    account_id_hidden_tree_group_div.value = node.id;

                                    get_items_groups_options_fn(parent_gruop_name_tree_goup_div, node.id, false);
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


                              
                                if (node.data.final_account || is_forbidden_adding_branches.includes(node.data.global_id)) {
                                    showAlert(`warning`, `لا يمكن اضافة مجموعه فرعيه ضمن المجموعة المجددة`)
                                    return;
                                }
                                account_name_input_tree_group_div.value = ''
                                get_items_groups_options_fn(parent_gruop_name_tree_goup_div, node.id, true);

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


                                if (node.data.final_account || is_forbidden_adding_branches.includes(node.data.global_id)) {
                                    showAlert(`warning`, `لا يمكن اضافة حساب فرعى ضمن الحساب المحدد`)
                                    return;
                                }

                                get_revenue_accounts_fn()
                                
                                get_items_groups_options_fn(parents_group_select, node.id,true);
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



function get_items_groups_options_fn(selectVariableName, accountId, is_AllowToshowTheSameAccountInOptions) {
    try {

        const statement_options_array = data.filter(item =>
            (is_AllowToshowTheSameAccountInOptions ? true : item.account_id !== accountId) &&
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


//#region add new node


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
           showAlert('warning','تأكد من ادخال قيمه فى الحقول المطلوبه');
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
            'accounts_permission', 'add',
            'هل تريد حفظ البيانات ؟',
            20,
            'accounts_view_ar',
            'حدث خطأ اثناء اضافه البيانات'
        )

    } catch (error) {
        catch_error(error)
    }
}



async function updateGroup() {
    try {

        let is_group = true
        // prepare data
        const account_id = parseInt(account_id_hidden_tree_group_div.value);
        const account_name = account_name_input_tree_group_div.value.trim();
        const parent_id = parseInt(parent_gruop_name_tree_goup_div.value);

        await fetchData_post1(
            '/api/update-account',
            {
                account_id,
                account_name,
                parent_id,
                is_group,
            },
            'accounts_permission', 'update',
            'هل تريد تعديل بيانات المجموعة ؟',
            15,
            'accounts_view_ar',
            'حدث خطأ اثناء تعديل البيانات'
        );

    } catch (error) {
        catch_error(error)
    }

}


async function updateAccount() {
    try {
        let is_group = false
        // prepare data
        const account_id = parseInt(account_id_hidden.value);
        const account_no = account_no_input.value.trim();
        const account_name = account_name_input.value.trim();
        const statment_type_value = parseInt(statment_type_span_hidden_value.value);
        const cash_flow_statement_value = parseInt(cash_flow_statement.value);
        const parent_id = parseInt(parents_group_select.value);

        await fetchData_post1(
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
            'هل تريد تعديل بيانات الحساب ؟',
            15,
            'accounts_view_ar',
            'حدث خطأ اثناء تعديل البيانات'
        );

    } catch (error) {
        catch_error(error)
    }

}


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
        !is_forbidden_adding_branches.includes(item.global_id)
    );
    return filteredParentAccountsArray;
}

// تغيير قاعده البيانات بعد السحب والافلات
$(tree).on('move_node.jstree', async function (e, data) {

    try {
        if (!data || !data.node || !data.node.id || !data.parent) {
            return; // التأكد من وجود بيانات صالحة
        }
        // بيانات العقدة التي تم نقلها (العقدة الأصلية)

        const nodeData = data.node.data;
        const currentAccountId = data.node.id
   

        // بيانات العقدة الجديدة التي تمت إضافتها (العقدة الوجهة)
        const newParentNodeId = data.parent;
        const newParentNodeData = $(tree).jstree().get_node(newParentNodeId);
        const newParentId = newParentNodeData.id

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
    await deleteNode();
})

btn_delete_tree_group_div.addEventListener('click', async function () {
    await deleteNode();
})
collapse_tree.addEventListener('click', async function () {
    $(tree).jstree('close_all')
})

//#endregion End - events

