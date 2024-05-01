
// alertify.alert('هذه رسالة تنبيه.');
//#region variables
const tree_info = document.querySelector(`#tree_info`);
const acc_no_div = document.querySelector(`#acc_no_div`);
const account_no_input = document.querySelector(`#account_no_input`);
const lbl_acc_name = document.querySelector(`#lbl_acc_name`);
const account_name_input = document.querySelector(`#account_name_input`);
const account_id_hidden = document.querySelector(`#account_id_hidden`);
const is_main_acc_input_hidden = document.querySelector(`#is_main_acc_input_hidden`);
const final_account_hidden = document.querySelector(`#final_account_hidden`);
const statment_type_span = document.querySelector(`#statment_type_span`);
const account_parent_name_span = document.querySelector(`#account_parent_name_span`);
const cash_flow_statement = document.querySelector(`#cash_flow_statement`);
const starting_balance_type_select = document.querySelector(`#starting_balance_type_select`);
const starting_balance_value_input = document.querySelector(`#starting_balance_value_input`);
const statment_type_span_hidden_value = document.querySelector(`#statment_type_span_hidden_value`);
const account_parent_name_span_hidden_id = document.querySelector(`#account_parent_name_span_hidden_id`);
const final_account_information_div = document.querySelector(`#final_account_information_div`);
const h2_header = document.querySelector(`#h2_header`);
const btn_save = document.querySelector(`#btn_save`);
const btn_update = document.querySelector(`#btn_update`);
const btn_delete = document.querySelector(`#btn_delete`);


//#region validation
// let inputErrors = false; // المتغير العالمي لتتبع وجود الأخطاء في الإدخال
//#endregion end- validation


// جلب بيانات الشجرة من الخادم باستخدام طلب GET من المسار /api/tree
async function fetchTreeData() {
    try {
        const response = await fetch('/api/tree');
        const data = await response.json();

        // تحديد عنصر HTML الذي سيتم استخدامه لتكوين شجرة jstree
        const tree = document.getElementById('tree');


        // تحويل البيانات التي تم جلبها إلى التنسيق المناسب لـ jstree
        const treeData = data.map(row => ({
            id: row.account_id, // تعيين المعرف الخاص بكل عقدة في الشجرة
            parent: row.parent_id === null ? '#' : row.parent_id, // تحديد هوية والد العقدة، واستخدام '#' إذا لم يكن هناك والد
            text: row.account_name, // النص المرئي للعقدة في الشجرة
            // icon: row.is_final_account ? 'fa fa-lock' : null, // تغيير الأيقونة فقط إذا كانت is_final_account تساوي true
            icon: row.is_final_account ? 'fa-solid fa-clipboard' : null, // تغيير الأيقونة فقط إذا كانت is_final_account تساوي true
            data: { // البيانات الإضافية المخصصة للعقدة
                final_account: row.is_final_account,
                account_no: row.account_no,
                finance_statement: row.finance_statement,
                cashflow_statement: row.cashflow_statement,
                starting_balance_value: row.starting_balance_value,
                starting_balance_type: row.starting_balance_type,
                can_be_deleted: row.can_be_deleted,
                is_main_acc: row.is_main_acc,
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
            'plugins': ['contextmenu', 'dnd', 'types' ], // تمكين ملحق contextmenu للسماح بالقوائم السياقية (انقر بزر الماوس الأيمن) و dnd للسماح بالسحب والإفلات
            'contextmenu': {
                'items': function (node) {
                    // تعريف العناصر المتاحة في القائمة السياقية (انقر بزر الماوس الأيمن) على العقدة
                    return {
                        'view': {
                            'label': ' عرض المعلومات', // إضافة أيقونة Font Awesome بجانب 
                            'icon' : 'fa-regular fa-folder-open',
                            'action': async function () {

                                // cehck if main acc 
                                if (node.data.is_main_acc) {
                                    showAlert('fail','لا يمكن عرض معلومات عن الحساب المحدد');
                                    return;
                                }

                                // check if final account
                                if (node.data.final_account) {
                                  
                                    
                                    h2_header.textContent = node.text;

                                    // account_No
                                    account_no_input.value = node.data.account_no ?? '';

                                    // account_name
                                    account_name_input.value = node.text;
                                    account_id_hidden.value = node.id;

                                    // final statement and parentNode
                                    const parentNode = $(tree).jstree().get_node(node.parent); //! << get ParentNode

                                    account_parent_name_span_hidden_id.value = parentNode.id;
                                    account_parent_name_span.textContent = parentNode.text;

                                    statment_type_span_hidden_value.value = parentNode.data.finance_statement;
                                    statment_type_span.textContent = (function () {
                                        if (parseInt(parentNode.data.finance_statement) === 1) {
                                            return 'قائمة المركز المالي';
                                        } else {
                                            return 'قائمة الدخل';
                                        }
                                    })();

                                    // cash flow
                                    cash_flow_statement
                                    changeSelect('cash_flow_statement', node.data.cashflow_statement);

                                    // starting balance
                                    changeSelect('starting_balance_type_select', node.data.starting_balance_type);
                                    starting_balance_value_input.value = parseFloat(node.data.starting_balance_value) || 0;

                                    // buttons
                                    btn_save.style.display = 'none'
                                    btn_update.style.display = 'flex'
                                    btn_delete.style.display = 'flex'
                                    acc_no_div.style.display = 'flex'
                                    final_account_information_div.style.display = 'flex'
                                    tree_info.style.display = 'flex'

                                } else {

                              
                                    // h2
                                    h2_header.textContent = node.text;

                                    // account_No
                                    account_no_input.value = node.data.account_no ?? '';

                                    // account_name
                                    lbl_acc_name.textContent = 'اسم المجموعه';
                                    account_name_input.value = node.text;
                                    account_id_hidden.value = node.id;

                                                                    // final statement and parentNode
                                const parentNode = $(tree).jstree().get_node(node.parent); //! << get ParentNode

                                account_parent_name_span_hidden_id.value = parentNode.id;
                                account_parent_name_span.textContent = parentNode.text;

                                statment_type_span_hidden_value.value = parentNode.data.finance_statement;
                                statment_type_span.textContent = (function () {
                                    if (parseInt(parentNode.data.finance_statement) === 1) {
                                        return 'قائمة المركز المالي';
                                    } else {
                                        return 'قائمة الدخل';
                                    }
                                })();

                                // buttons
                                btn_save.style.display = 'none'
                                btn_update.style.display = 'flex'
                                btn_delete.style.display = 'flex'
                                acc_no_div.style.display = 'none'
                                final_account_information_div.style.display = 'none'
                                tree_info.style.display = 'flex'
                                };



                            }
                        },
                        'create_group': {
                            'label': 'إضافة مجموعه فرعيه',
                            'action': async function () {

                                // h2
                                h2_header.textContent = `اضافه مجموعه فرعيه داخل : ${node.text}`;
                                lbl_acc_name.textContent = 'اسم المجموعه';


                                //  group or account
                                final_account_hidden.value = false;

                                // final statement
                                statment_type_span_hidden_value.value = node.data.finance_statement
                                statment_type_span.textContent = (function () {
                                    if (parseInt(node.data.finance_statement) === 1) {
                                        return 'قائمة المركز المالي';
                                    } else {
                                        return 'قائمة الدخل';
                                    }
                                })();
                                account_parent_name_span.textContent = node.text;
                                account_parent_name_span_hidden_id.value = node.id;


                                // buttons
                                btn_save.style.display = 'flex'
                                btn_update.style.display = 'none'
                                btn_delete.style.display = 'none'
                                acc_no_div.style.display = 'none'
                                final_account_information_div.style.display = 'none'
                                tree_info.style.display = 'flex'


                                //---------------------------------------------
                            }
                        },
                        'create': {
                            'label': 'إضافة حساب فرعي',
                            'action': async function () {

                                // h2
                                h2_header.textContent = `اضافه حساب فرعى داخل : ${node.text}`;
                                lbl_acc_name.textContent = 'اسم الحساب';

                                //  group or account
                                final_account_hidden.value = true;

                                // final statement
                                statment_type_span_hidden_value.value = node.data.finance_statement
                                statment_type_span.textContent = (function () {
                                    if (parseInt(node.data.finance_statement) === 1) {
                                        return 'قائمة المركز المالي';
                                    } else {
                                        return 'قائمة الدخل';
                                    }
                                })();
                                account_parent_name_span.textContent = node.text;
                                account_parent_name_span_hidden_id.value = node.id;


                                // buttons
                                btn_save.style.display = 'flex'
                                btn_update.style.display = 'none'
                                btn_delete.style.display = 'none'
                                acc_no_div.style.display = 'flex'
                                final_account_information_div.style.display = 'flex'
                                tree_info.style.display = 'flex'


                                //---------------------------------------------
                            }
                        },
                        // إضافة خيارات إضافية إلى القائمة السياقية
                        'rename': {
                            'label': 'إعادة تسمية',
                            'action': async function () {
                                const newName = prompt('أدخل الاسم الجديد:');
                                if (newName) {
                                    try {
                                        const response = await fetch('/api/rename-account', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({
                                                account_id: node.id,
                                                new_name: newName,
                                            }),
                                        });

                                        if (response.ok) {
                                            $(tree).jstree().refresh_node(node);
                                        } else {
                                            console.error('Error renaming account:', await response.text());
                                        }
                                    } catch (error) {
                                        console.error('Error renaming account:', error);
                                    }
                                }
                            }
                        },
                        'delete': {
                            'label': 'حذف',
                            'action': async function () {
                                if (confirm('هل تريد حقًا حذف هذا الحساب؟')) {
                                    try {
                                        const response = await fetch('/api/delete-account', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({
                                                account_id: node.id,
                                            }),
                                        });

                                        const data = await response.json();
                                        if (data.success) {
                                            $(tree).jstree().delete_node(node);
                                            showAlert('success', data.message_ar);
                                        } else {
                                            showAlert('fail', data.message_ar);
                                        };
                                    } catch (error) {
                                        console.error('Error deleting account:', error);
                                    }
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


//#region add new node
async function addNewAccount() {
    try {

        // prepare data

        const account_no = account_no_input.value.trim();
        const account_name = account_name_input.value.trim();
        const statment_type_value = parseInt(statment_type_span_hidden_value.value);
        const account_parent_name_id = parseInt(account_parent_name_span_hidden_id.value);
        const cash_flow_statement_value = parseInt(cash_flow_statement.value);
        const starting_balance_type = parseInt(starting_balance_type_select.value);
        const starting_balance_value = parseFloat(starting_balance_value_input.value) || 0;
        const is_final_account = final_account_hidden.value;

        await fetchData_post1(
            '/api/add-account',
            {
                account_no,
                account_name,
                statment_type_value,
                account_parent_name_id,
                cash_flow_statement_value,
                starting_balance_type,
                starting_balance_value,
                is_final_account,
            },
            'accounts_permission', 'add',
            'هل تريد حفظ البيانات ؟',
            10,
            'accounts_view_ar',
            'حدث خطأ اثناء اضافه البيانات'
        )

    } catch (error) {
        catch_error(error)
    }
}
//#endregion end - add new account

//#region update node
async function updateAccount() {
    try {

        // prepare data
        const account_id = account_id_hidden.value;
        const account_no = account_no_input.value.trim();
        const account_name = account_name_input.value.trim();
        const statment_type_value = statment_type_span_hidden_value.value;

        // const account_parent_name_id = account_parent_name_span_hidden_id.value;
        const cash_flow_statement_value = cash_flow_statement.value;
        const starting_balance_type = starting_balance_type_select.value;
        const starting_balance_value = parseFloat(starting_balance_value_input.value) || 0;
        // const is_final_account = true;
        // const can_be_deleted = true;  

        await fetchData_post1(
            '/api/update-account',
            {
                account_name,
                account_no,
                statment_type_value,
                cash_flow_statement_value,
                starting_balance_value,
                starting_balance_type,
                account_id
            },
            'accounts', 'update',
            'هل تريد تعديل بيانات الحساب ؟',
            10,
            'accounts_view_ar',
            'حدث خطأ اثناء تعديل البيانات'
        );

    } catch (error) {
        catch_error(error)
    }

}



//#endregion end - add new account

//#region delete node
async function deleteNode() {

    try {

        //preparing data
        const account_id = parseInt(account_id_hidden.value);
        await fetchData_post1(
            '/api/delete-account',
            { account_id },
            'accounts_permission', 'delete',
            'هل تريد حذف الحساب الحالى من دليل الحسابات ؟',
            10,
            'accounts_view_ar',
            'حدث خطأ اثناء حذف الحساب المحدد'
        )


    } catch (error) {
        catch_error(error)
    }

}

//#endregion  end delete


// تغيير قاعده البيانات بعد السحب والافلات
$(tree).on('move_node.jstree', async function (e, data) {

try{

    
    const permission = await btn_permission('accounts_permission','update');
     
    if(!permission) {
     return;
    };

    const controller = new AbortController();
    const signal = controller.signal;


    // عرض التأكيد

    await showDialog('','هل تريد حفظ التعديل على دليل الحسابات ؟','');
    if (!dialogAnswer){
                // إلغاء عملية التحريك عن طريق إعادة تحميل الشجرة (refresh) إلى حالتها السابقة
                $(tree).jstree(true).refresh();
                return;
    }
    
            // تعيين حد زمني للطلب
            const timeout = setTimeout(() => {
                controller.abort(); // إلغاء الطلب
            }, 10000); // 10 ثواني
        
            
    // تنفيذ التغييرات إذا وافق المستخدم
    const nodeId = data.node.id;
    const newParentId = data.parent;

            const posted_elements = {
                account_id: nodeId,
                new_parent_id: newParentId,
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
                redirection(redirectionPage, 'success', data.message_ar);
            } else {
              body_content.style.pointerEvents = 'auto';
                showAlert('fail', data.message_ar);
            }
        } else {
            closeDialog();
            showAlert('fail', `Request failed with status code: ${response.status}`);
        }

    } catch (error) {
        closeDialog();
        showAlert('fail',error_message);
        catch_error(error);
    }  
});



// استدعاء دالة fetchTreeData لجلب بيانات الشجرة عندما يتم تحميل الصفحة
document.addEventListener('DOMContentLoaded', function () {
    fetchTreeData();
})

btn_save.addEventListener('click', async function () {
    // console.log(inputErrors);
    // showLoadingIcon(this)


    // showAlert('warning','test new alert  yarap yakerm akrmny')
    // showAlert('success','success')


    await addNewAccount();
})


btn_update.addEventListener('click', async function () {
    await updateAccount();
})

btn_delete.addEventListener('click', async function () {
    await deleteNode();
})

//#endregion End - events