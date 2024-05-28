setActiveSidebar('accounts_view_ar');

$.get('/api/tree', function (data) {
    // قم بتحويل البيانات إلى تنسيق مناسب لـ jstree
    const treeData = data.map(item => ({
        id: item.account_id,
        parent: item.parent_id === null ? '#' : item.parent_id,
        text: item.account_name,
    }));

    // قم بإنشاء شجرة jstree
    $('#tree').jstree({
        'core': {
            'data': treeData,
            'themes': {
                'name': 'default',
                'responsive': false,
                'icons': true,
                'dots': true,
                'variant': 'large'
            },
        },
        'plugins': ['contextmenu'],
        'contextmenu': {
            'items': function (node) {
                const items = {
                    'create': {
                        'label': 'إضافة حساب فرعي',
                        'action': function (data) {
                            // التحقق من نوع العقدة
                            if (node.original && node.original.type === 'leaf') {
                                alert('لا يمكن إضافة عناصر تحت عقدة نهائية.');
                                return;
                            }

                            // عند اختيار خيار إضافة حساب فرعي
                            const newAccountName = prompt('أدخل اسم الحساب الجديد:');
                            if (newAccountName) {
                                // قم بإرسال طلب POST إلى الخادم لإضافة الحساب الفرعي
                                $.post('/api/add-account', {
                                    parent_id: node.id,
                                    account_name: newAccountName
                                }, function (response) {
                                    // قم بتحديث الشجرة بعد إضافة الحساب الجديد
                                    $('#tree').jstree('refresh');
                                });
                            }
                        }
                    }
                };
                return items;
            }
        }
    });
});
