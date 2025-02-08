const { log } = require('console');
const express = require('express');
const router = express.Router();
const path = require('path');


//#region login And home

router.get('/', async (req, res) => {
    if (req.session.isLoggedIn) {  
        res.sendFile(path.join(__dirname, '..', 'views','ar' , 'notes_ar.html'));
    } else {
        res.redirect('/login');
    }
});

router.get('/test_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'test_ar.html'));
    } else {
        res.redirect('/login');
    }
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views' , 'login.html'));
});

router.get('/history_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission === 6 || req.session.history_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'history', 'history_view_ar.html'));
        }else{
            res.redirect('/notes_ar?reason=1');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});



router.get('/notes_ar', async (req, res) => {
    if (req.session.isLoggedIn) {  
        res.sendFile(path.join(__dirname, '..', 'views','ar' , 'notes_ar.html'));
    } else {
        res.redirect('/login');
    }
});

// ! النسخه الانجليزيى
router.get('/home_en', (req, res) => {
    if (req.session.isLoggedIn) {
        res.sendFile(path.join(__dirname, '..', 'views','en' , 'home_en.html'));
    } else {
        res.redirect('/login');
    }
});

//#endregion login and home


//#region settings
router.get('/general_settings_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission === 6 || req.session.bread_permission > 0) { //معلق
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'settings', 'general_settings_ar.html'));
        }else{
            res.redirect('/notes_ar?reason=1');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/old_features_main_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission === 6 || req.session.bread_permission > 0) { // معلق
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'settings', 'old_features', 'old_features_main_ar.html'));
        }else{
            res.redirect('/notes_ar?reason=1');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});

//#endregion


//#region users
router.get('/permissions_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission === 6) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'users', 'permissions_view_ar.html'));
        }else{
            res.redirect('/notes_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});






router.get('/users_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {        
        if (req.session.is_owner) {            
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'owners_and_companies', 'users_view_ar.html'));
        }else{            
            res.redirect('/companies_ar?reason=1');
        };
    } else {
        res.redirect('/login?reason=0');
    }
});

router.get('/users_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'owners_and_companies', 'users_add_ar.html'));
        }else{
            res.redirect('/permissions_view_ar?reason=1');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});

router.get('/users_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'owners_and_companies', 'users_update_ar.html'));
        }else{
            res.redirect('/permissions_view_ar?reason=1');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/permissions_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission === 6) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'users', 'permissions_update_ar.html'));
        }else{
            res.redirect('/permissions_view_ar?reason=2');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});





//#endregion users

//#region human_resources

router.get('/hr_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 ||  req.session.employees_permission > 0 || req.session.departments_permission > 0 || req.session.effects_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'hr', 'hr_ar.html'));
        }else{
            res.redirect('/notes_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});

//#region emoloyees
router.get('/employees_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 ||  req.session.employees_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'hr', 'employees' ,'employees_view_ar.html'));
        }else{
            res.redirect('/notes_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});



router.get('/employees_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 2 ||  req.session.employees_permission > 1) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'hr', 'employees' ,'employees_add_ar.html'));
        }else{
            res.redirect('/employees_view_ar?reason=1');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/employees_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 ||  req.session.employees_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'hr', 'employees' ,'employees_update_ar.html'));
        }else{
            res.redirect('/employees_view_ar?reason=2');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});
//#endregion employees

//#region effects
router.get('/effects_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 ||  req.session.effects_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'hr', 'effects' ,'effects_view_ar.html'));
        }else{
            res.redirect('/notes_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});



router.get('/effects_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 2 ||  req.session.effects_permission > 1) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'hr', 'effects' ,'effects_add_ar.html'));
        }else{
            res.redirect('/effects_view_ar?reason=1');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/effects_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 ||  req.session.effects_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'hr', 'effects' ,'effects_update_ar.html'));
        }else{
            res.redirect('/effects_view_ar?reason=2');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});
//#endregion


//#region departments
router.get('/departments_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 ||  req.session.departments_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'hr', 'departments' ,'departments_view_ar.html'));
        }else{
            res.redirect('/notes_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});



router.get('/departments_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 2 ||  req.session.departments_permission > 1) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'hr', 'departments' ,'departments_add_ar.html'));
        }else{
            res.redirect('/departments_view_ar?reason=1');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/departments_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 ||  req.session.departments_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'hr', 'departments' ,'departments_update_ar.html'));
        }else{
            res.redirect('/departments_view_ar?reason=2');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});
//#endregion

//#endregion

//#region sales mangement

router.get('/salesMain_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.salesman_permission > 0 || req.session.sales_qutation_permission > 0 || req.session.sales_order_permission > 0 || req.session.sales_invoice_permission > 0) { // 
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'sales_management', 'salesMain_view_ar.html'));
        }else{
            res.redirect('/notes_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/salesman_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.salesman_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'sales_management', 'mnadep', 'salesman_view_ar.html'));
        }else{
            res.redirect('/salesMain_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


//#region sales

//#region sales qutation
router.get('/sales_qutation_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.sales_qutation_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'sales_management', 'sales', 'sales_qutation' ,'sales_qutation_view_ar.html'));
        }else{
            res.redirect('/salesMain_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/sales_qutation_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.sales_qutation_permission > 1) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'sales_management', 'sales', 'sales_qutation' ,'sales_qutation_add_ar.html'));
        }else{
            res.redirect('/sales_qutation_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/sales_qutation_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.sales_qutation_permission > 3) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'sales_management', 'sales', 'sales_qutation' ,'sales_qutation_update_ar.html'));
        }else{
            res.redirect('/sales_qutation_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});
//#endregion sales qutation

    // معلق
//#region sales order
router.get('/sales_order_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.sales_order_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'sales_management', 'sales', 'sales_order' ,'sales_order_view_ar.html'));
        }else{
            res.redirect('/salesMain_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/sales_order_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.sales_order_permission > 1) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'sales_management', 'sales', 'sales_order' ,'sales_order_add_ar.html'));
        }else{
            res.redirect('/sales_order_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/sales_order_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.sales_order_permission > 3) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'sales_management', 'sales', 'sales_order' ,'sales_order_update_ar.html'));
        }else{
            res.redirect('/sales_order_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});
//#endregion sales order

//#endregion

//#region sales invoice
router.get('/sales_invoice_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.sales_invoice_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'sales_management', 'sales', 'sales_invoice' ,'sales_invoice_view_ar.html'));
        }else{
            res.redirect('/salesMain_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/sales_invoice_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.sales_invoice_permission > 1) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'sales_management', 'sales', 'sales_invoice' ,'sales_invoice_add_ar.html'));
        }else{
            res.redirect('/sales_invoice_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/sales_invoice_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.sales_invoice_permission > 3) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'sales_management', 'sales', 'sales_invoice' ,'sales_invoice_update_ar.html'));
        }else{
            res.redirect('/sales_invoice_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});
//#endregion sales invoice


//#endregion



//#region purshases mangement

router.get('/purshasesMain_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.purshases_qutation_permission > 0 || req.session.purshases_order_permission > 0 || req.session.purshases_invoice_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'purshases_management', 'purshasesMain_view_ar.html'));
        }else{
            res.redirect('/notes_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


// router.get('/purshasesman_view_ar', (req, res) => {
//     if (req.session.isLoggedIn) {
//         if (req.session.is_owner || req.session.general_permission > 1 || req.session.purshasesman_permission > 0) {
//             res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'purshases_management', 'mnadep', 'purshasesman_view_ar.html'));
//         }else{
//             res.redirect('/purshasesMain_view_ar?reason=0');
//         };
//     } else {        
//         res.redirect('/login?reason=0');
//     }
// });


//#region purshases

//#region purshases qutation
router.get('/purshases_qutation_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.purshases_qutation_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'purshases_management', 'purshases', 'purshases_qutation' ,'purshases_qutation_view_ar.html'));
        }else{
            res.redirect('/purshasesMain_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/purshases_qutation_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.purshases_qutation_permission > 1) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'purshases_management', 'purshases', 'purshases_qutation' ,'purshases_qutation_add_ar.html'));
        }else{
            res.redirect('/purshases_qutation_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/purshases_qutation_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.purshases_qutation_permission > 3) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'purshases_management', 'purshases', 'purshases_qutation' ,'purshases_qutation_update_ar.html'));
        }else{
            res.redirect('/purshases_qutation_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});
//#endregion purshases qutation

    // معلق
//#region purshases order
router.get('/purshases_order_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.purshases_order_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'purshases_management', 'purshases', 'purshases_order' ,'purshases_order_view_ar.html'));
        }else{
            res.redirect('/purshasesMain_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/purshases_order_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.purshases_order_permission > 1) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'purshases_management', 'purshases', 'purshases_order' ,'purshases_order_add_ar.html'));
        }else{
            res.redirect('/purshases_order_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/purshases_order_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.purshases_order_permission > 3) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'purshases_management', 'purshases', 'purshases_order' ,'purshases_order_update_ar.html'));
        }else{
            res.redirect('/purshases_order_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});
//#endregion purshases order

//#endregion

//#region purshases invoice
router.get('/purshases_invoice_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.purshases_invoice_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'purshases_management', 'purshases', 'purshases_invoice' ,'purshases_invoice_view_ar.html'));
        }else{
            res.redirect('/purshasesMain_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/purshases_invoice_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.purshases_invoice_permission > 1) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'purshases_management', 'purshases', 'purshases_invoice' ,'purshases_invoice_add_ar.html'));
        }else{
            res.redirect('/purshases_invoice_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/purshases_invoice_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.purshases_invoice_permission > 3) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'purshases_management', 'purshases', 'purshases_invoice' ,'purshases_invoice_update_ar.html'));
        }else{
            res.redirect('/purshases_invoice_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});
//#endregion purshases invoice


//#endregion





//#region cutomers 
router.get('/customers_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 ||  req.session.customers_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'customers' ,'customers_view_ar.html'));
        }else{
            res.redirect('/notes_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/customers_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 ||  req.session.customers_permission > 1) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'customers' ,'customers_add_ar.html'));
        }else{
            res.redirect('/customers_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/customers_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 ||  req.session.customers_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'customers' ,'customers_update_ar.html'));
        }else{
            res.redirect('/customers_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});
//#endregion

//#region 
router.get('/vendors_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 ||  req.session.vendors_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'vendors' ,'vendors_view_ar.html'));
        }else{
            res.redirect('/notes_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});

router.get('/vendors_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 ||  req.session.vendors_permission > 1) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'vendors' ,'vendors_add_ar.html'));
        }else{
            res.redirect('/vendors_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});

router.get('/vendors_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 ||  req.session.vendors_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'vendors' ,'vendors_update_ar.html'));
        }else{
            res.redirect('/vendors_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});
//#endregion


//#region  effects
router.get('/effects_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 ||  req.session.effects_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'effects' ,'effects_view_ar.html'));
        }else{
            res.redirect('/notes_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/effects_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 2 ||  req.session.effects_permission > 1) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'effects' ,'effects_add_ar.html'));
        }else{
            res.redirect('/effects_view_ar?reason=1');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/effects_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 ||  req.session.effects_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'effects' ,'effects_update_ar.html'));
        }else{
            res.redirect('/effects_view_ar?reason=2');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});
//#endregion end effects

//#region production

router.get('/production_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 ||  req.session.production_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'settings', 'old_features', 'production' ,'production_view_ar.html'));
        }else{
            res.redirect('/notes_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});



router.get('/production_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 2 ||  req.session.production_permission > 1) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'settings', 'old_features', 'production' ,'production_add_ar.html'));
        }else{
            res.redirect('/production_view_ar?reason=1');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/production_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 ||  req.session.production_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'settings', 'old_features', 'production' ,'production_update_ar.html'));
        }else{
            res.redirect('/production_view_ar?reason=2');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});
//#endregion end production

//#region bread

router.get('/bread_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 ||  req.session.bread_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'settings', 'old_features', 'bread' ,'bread_view_ar.html'));
        }else{
            res.redirect('/notes_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});



router.get('/bread_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 2 ||  req.session.bread_permission > 1) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'settings', 'old_features', 'bread' ,'bread_add_ar.html'));
        }else{
            res.redirect('/bread_view_ar?reason=1');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/bread_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 ||  req.session.bread_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'settings', 'old_features', 'bread' ,'bread_update_ar.html'));
        }else{
            res.redirect('/bread_view_ar?reason=2');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});
//#endregion end bread



//#region accounting

router.get('/accounts_view_ar', async (req, res) => {
    if (req.session.isLoggedIn || req.session.general_permission > 1 ||  req.session.accounts_permission > 0) {  
        res.sendFile(path.join(__dirname, '..', 'views' , 'ar', 'settings', 'tree', 'accounts_view_ar.html'));
    } else {
        res.redirect('/login');
    }
});

router.get('/accounts_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 2 ||  req.session.accounts_permission > 1) {
            res.sendFile(path.join(__dirname, '..', 'views' , 'ar', 'settings', 'tree', 'accounts_add_ar.html'));
        }else{
            res.redirect('/accounts_view_ar?reason=1');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});



router.get('/accounts_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 ||  req.session.accounts_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views' , 'ar', 'settings', 'tree', 'accounts_update_ar.html'));
        }else{
            res.redirect('/accounts_view_ar?reason=1');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


// router.get('/transaction_add_ar', async (req, res) => {
//     if (req.session.isLoggedIn) {  
//         res.sendFile(path.join(__dirname, '..', 'views' , 'ar', 'accounts', 'transactions', 'transaction_add_ar.html'));
//     } else {
//         res.redirect('/login');
//     }
// });
//#endregion end - accounting





//#region items


router.get('/itemsMain_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 ||  req.session.items_permission > 0 || req.session.itemsLocations_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views' , 'ar', 'items', 'itemsMain_view_ar.html'));
        }else{
            res.redirect('/notes_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


//#region itemsLocations
router.get('/itemsLocations_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 ||  req.session.itemsLocations_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views' , 'ar', 'items', 'itemsLocations', 'itemsLocations_view_ar.html'));
        }else{
            res.redirect('/itemsMain_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});

router.get('/itemsLocations_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 2 ||  req.session.itemsLocations_permission > 1) {
            res.sendFile(path.join(__dirname, '..', 'views' , 'ar', 'items', 'itemsLocations', 'itemsLocations_add_ar.html'));
        }else{
            res.redirect('/itemsLocations_view_ar?reason=1');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});

router.get('/itemsLocations_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 ||  req.session.itemsLocations_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views' , 'ar', 'items', 'itemsLocations', 'itemsLocations_update_ar.html'));
        }else{
            res.redirect('/itemsLocations_view_ar?reason=1');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});



//-------------------------------
router.get('/items_transfer_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 2 ||  req.session.items_transfer_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views' , 'ar', 'items', 'items_transfer', 'items_transfer_view_ar.html'));
        }else{
            res.redirect('/itemsMain_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});

router.get('/items_transfer_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 2 ||  req.session.items_transfer_permission > 1) {
            res.sendFile(path.join(__dirname, '..', 'views' , 'ar', 'items', 'items_transfer', 'items_transfer_add_ar.html'));
        }else{
            res.redirect('/items_transfer_view_ar?reason=1');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});

router.get('/items_transfer_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 ||  req.session.items_transfer_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views' , 'ar', 'items', 'items_transfer', 'items_transfer_update_ar.html'));
        }else{
            res.redirect('/items_transfer_view_ar?reason=1');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});
//-------------------------
//#region  end itemslocations
router.get('/items_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 ||  req.session.items_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views' , 'ar', 'items', 'items', 'items_view_ar.html'));
        }else{
            res.redirect('/notes_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/items_table_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 ||  req.session.items_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views' , 'ar', 'items', 'items', 'items_table_view_ar.html'));
        }else{
            res.redirect('/notes_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/items_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 2 ||  req.session.items_permission > 1) {
            res.sendFile(path.join(__dirname, '..', 'views' , 'ar', 'items', 'items', 'items_add_ar.html'));
        }else{
            res.redirect('/items_view_ar?reason=1');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/items_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 ||  req.session.items_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views' , 'ar', 'items', 'items', 'items_update_ar.html'));
        }else{
            res.redirect('/items_view_ar?reason=1');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});




//! productions

router.get('/productionMain_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 ||  req.session.items_permission > 0 || req.session.production_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views' , 'ar', 'items', 'production', 'productionMain_view_ar.html'));
        }else{
            res.redirect('/itemsMain_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});

router.get('/production_forms_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.production_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'items', 'production', 'production_forms', 'production_forms_view_ar.html'));
        }else{
            res.redirect('/productionMain_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});

router.get('/production_forms_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 2 || req.session.production_permission > 1) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'items', 'production', 'production_forms', 'production_forms_add_ar.html'));
        }else{
            res.redirect('/production_forms_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});

router.get('/production_forms_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.production_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'items', 'production', 'production_forms', 'production_forms_update_ar.html'));
        }else{
            res.redirect('/production_forms_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});

//-------------

router.get('/production_orders_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.production_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'items', 'production', 'productions_orders', 'production_orders_view_ar.html'));
        }else{
            res.redirect('/productionMain_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});

router.get('/production_orders_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 2 || req.session.production_permission > 1) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'items', 'production', 'productions_orders', 'production_orders_add_ar.html'));
        }else{
            res.redirect('/production_orders_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});

router.get('/production_orders_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.production_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'items', 'production', 'productions_orders', 'production_orders_update_ar.html'));
        }else{
            res.redirect('/production_orders_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


//#endregion end - items

//#region transaction

router.get('/transaction_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 ||  req.session.transaction_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'accounts', 'transactions' ,'transaction_view_ar.html'));
        }else{
            res.redirect('/notes_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});



router.get('/transaction_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 2 ||  req.session.transaction_permission > 1) {
            res.sendFile(path.join(__dirname, '..', 'views' , 'ar', 'accounts', 'transactions', 'transaction_add_ar.html'));
        }else{
            res.redirect('/transaction_view_ar?reason=1');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/transaction_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 ||  req.session.transaction_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views' , 'ar', 'accounts', 'transactions', 'transaction_update_ar.html'));
        }else{
            res.redirect('/transaction_view_ar?reason=2');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});

//#endregion


//! suspense - need to put right permission for  settings tax 3 pages
//#region settings tax  معلق -- اضافة صلاحيات الضرائب من 
router.get('/settings_taxes_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'settings', 'taxes' ,'settings_taxes_view_ar.html'));
        }else{
            res.redirect('/notes_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});

router.get('/settings_taxes_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 2) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'settings', 'taxes' ,'settings_taxes_add_ar.html'));
        }else{
            res.redirect('/settings_taxes_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});

router.get('/settings_taxes_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'settings', 'taxes' ,'settings_taxes_update_ar.html'));
        }else{
            res.redirect('/settings_taxes_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});

//#endregion
//#region owners_and_companies
router.get('/companies_ar', async (req, res) => {
    if (req.session.isLoggedIn) {  
        res.sendFile(path.join(__dirname, '..', 'views' , 'ar', 'owners_and_companies', 'companies_ar.html'));
    } else {
        res.redirect('/login');
    }
});


router.get('/companies_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner) {
            res.sendFile(path.join(__dirname, '..', 'views' , 'ar', 'owners_and_companies', 'companies_add_ar.html'));
        }else{
            res.redirect('/notes_ar?reason=2');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


//#endregion


//#region services
router.get('/services_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.services_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'items', 'services' ,'services_view_ar.html'));
        }else{
            res.redirect('/notes_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});

router.get('/services_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 2 || req.session.services_permission > 1) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'items', 'services' ,'services_add_ar.html'));
        }else{
            res.redirect('/notes_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});

router.get('/services_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.services_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'items', 'services' ,'services_update_ar.html'));
        }else{
            res.redirect('/notes_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});
//#endregion services


//#region sales returns
router.get('/sales_returns_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.sales_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'sales_management', 'sales', 'sales_returns' ,'sales_returns_view_ar.html'));
        }else{
            res.redirect('/salesMain_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/sales_returns_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.sales_permission > 1) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'sales_management', 'sales', 'sales_returns' ,'sales_returns_add_ar.html'));
        }else{
            res.redirect('/sales_returns_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/sales_returns_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.sales_permission > 3) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'sales_management', 'sales', 'sales_returns' ,'sales_returns_update_ar.html'));
        }else{
            res.redirect('/sales_returns_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});
//#endregion sales returns



//#region purshases returns
router.get('/purshases_returns_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.purshases_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'purshases_management', 'purshases_returns' ,'purshases_returns_view_ar.html'));
        }else{
            res.redirect('/purshasesMain_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/purshases_returns_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.purshases_permission > 1) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'purshases_management', 'purshases_returns' ,'purshases_returns_add_ar.html'));
        }else{
            res.redirect('/purshases_returns_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/purshases_returns_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.purshases_permission > 3) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'purshases_management', 'purshases_returns' ,'purshases_returns_update_ar.html'));
        }else{
            res.redirect('/purshases_returns_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});
//#endregion purshases returns

router.get('/fixedAssestsMain_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.fixed_assests_permission > 0 || req.session.accumulated_depreciation_permission > 0 || req.session.disposed_fixed_asset_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'fixed_assests_management' ,'fixedAssestsMain_view_ar.html'));
        }else{
            res.redirect('/nots_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/fixed_assests_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.fixed_assests_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'fixed_assests_management', 'fixed_assests', 'fixed_assests_view_ar.html'));
        }else{
            res.redirect('/fixedAssestsMain_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/fixed_assests_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.fixed_assests_permission > 1) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'fixed_assests_management', 'fixed_assests', 'fixed_assests_add_ar.html'));
        }else{
            res.redirect('/fixed_assests_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});

router.get('/fixed_assests_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.fixed_assests_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'fixed_assests_management', 'fixed_assests', 'fixed_assests_update_ar.html'));
        }else{
            res.redirect('/fixed_assests_view?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/accumulated_depreciation_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.accumulated_depreciation_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'fixed_assests_management', 'accumulated_depreciation', 'accumulated_depreciation_view_ar.html'));
        }else{
            res.redirect('/fixedAssestsMain_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});

router.get('/accumulated_depreciation_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.accumulated_depreciation_permission > 1) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'fixed_assests_management', 'accumulated_depreciation', 'accumulated_depreciation_add_ar.html'));
        }else{
            res.redirect('/accumulated_depreciation_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});

router.get('/accumulated_depreciation_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.accumulated_depreciation_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'fixed_assests_management', 'accumulated_depreciation', 'accumulated_depreciation_update_ar.html'));
        }else{
            res.redirect('/accumulated_depreciation_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/disposed_fixed_asset_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.disposed_fixed_asset_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'fixed_assests_management', 'disposed_fixed_asset', 'disposed_fixed_asset_view_ar.html'));
        }else{
            res.redirect('/fixedAssestsMain_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});

router.get('/disposed_fixed_asset_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.disposed_fixed_asset_permission > 1) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'fixed_assests_management', 'disposed_fixed_asset', 'disposed_fixed_asset_add_ar.html'));
        }else{
            res.redirect('/disposed_fixed_asset_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});

router.get('/disposed_fixed_asset_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.disposed_fixed_asset_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'fixed_assests_management', 'disposed_fixed_asset', 'disposed_fixed_asset_update_ar.html'));
        }else{
            res.redirect('/disposed_fixed_asset_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});

//#region fixed assests

//#endregionend fixed assets


//#region cash management
router.get('/cashMain_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.fixed_assests_permission > 0 || req.session.cash_accounts_permission > 0 || req.session.cash_accounts_permission_permission > 0) {  //! معلق
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'cash_management' ,'cashMain_view_ar.html'));
        }else{
            res.redirect('/nots_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/cash_accounts_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.cash_accounts_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'cash_management', 'cash_accounts', 'cash_accounts_view_ar.html'));
        }else{
            res.redirect('/cashMain_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/cash_accounts_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.cash_accounts_permission > 1) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'cash_management', 'cash_accounts', 'cash_accounts_add_ar.html'));
        }else{
            res.redirect('/cash_accounts_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});

router.get('/cash_accounts_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.cash_accounts_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'cash_management', 'cash_accounts', 'cash_accounts_update_ar.html'));
        }else{
            res.redirect('/cash_accounts_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/cash_rc_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.cash_transaction_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'cash_management', 'cash_rc', 'cash_rc_view_ar.html'));
        }else{
            res.redirect('/cashMain_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/cash_rc_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.cash_transaction_permission > 1) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'cash_management', 'cash_rc', 'cash_rc_add_ar.html'));
        }else{
            res.redirect('/cash_rc_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});

router.get('/cash_rc_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.cash_transaction_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'cash_management', 'cash_rc', 'cash_rc_update_ar.html'));
        }else{
            res.redirect('/cash_rc_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});




router.get('/cash_pv_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.cash_transaction_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'cash_management', 'cash_pv', 'cash_pv_view_ar.html'));
        }else{
            res.redirect('/cashMain_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/cash_pv_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.cash_transaction_permission > 1) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'cash_management', 'cash_pv', 'cash_pv_add_ar.html'));
        }else{
            res.redirect('/cash_pv_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});

router.get('/cash_pv_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.cash_transaction_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'cash_management', 'cash_pv', 'cash_pv_update_ar.html'));
        }else{
            res.redirect('/cash_pv_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/cash_transfer_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.cash_transaction_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'cash_management', 'cash_transfer', 'cash_transfer_view_ar.html'));
        }else{
            res.redirect('/cashMain_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});

router.get('/cash_transfer_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 2 || req.session.cash_transaction_permission > 1) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'cash_management', 'cash_transfer', 'cash_transfer_add_ar.html'));
        }else{
            res.redirect('/cash_transfer_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});

router.get('/cash_transfer_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.cash_transaction_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'cash_management', 'cash_transfer', 'cash_transfer_update_ar.html'));
        }else{
            res.redirect('/cash_transfer_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


//#endregion




//#region reports 

    //#region statments reports
    router.get('/report_map_ar', (req, res) => {
        if (req.session.isLoggedIn) {
            if (req.session.is_owner || req.session.general_permission > 1) { // معلق  محتاجين نحط الصلاحيه 
                res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'reports', 'report_map_ar.html'));
            }else{
                res.redirect('/notes_ar?reason=0');
            };
        } else {        
            res.redirect('/login?reason=0');
        }
    });

        //#region trial_balance
        router.get('/trial_balance_view_ar', (req, res) => {
            if (req.session.isLoggedIn) {
                if (req.session.is_owner || req.session.general_permission > 1) { // معلق  محتاجين نحط الصلاحيه 
                    res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'reports', 'statements' , 'trial_balance', 'trial_balance_view_ar.html'));
                }else{
                    res.redirect('/report_map_ar?reason=0');
                };
            } else {        
                res.redirect('/login?reason=0');
            }
        });

        router.get('/finance_statement_view_ar', (req, res) => {
            if (req.session.isLoggedIn) {
                if (req.session.is_owner || req.session.general_permission > 1) { // معلق  محتاجين نحط الصلاحيه 
                    res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'reports', 'statements' , 'finance_statement', 'finance_statement_view_ar.html'));
                }else{
                    res.redirect('/report_map_ar?reason=0');
                };
            } else {        
                res.redirect('/login?reason=0');
            }
        });

        router.get('/income_statement_view_ar', (req, res) => {
            if (req.session.isLoggedIn) {
                if (req.session.is_owner || req.session.general_permission > 1) { // معلق  محتاجين نحط الصلاحيه 
                    res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'reports', 'statements' , 'income_statement', 'income_statement_view_ar.html'));
                }else{
                    res.redirect('/report_map_ar?reason=0');
                };
            } else {        
                res.redirect('/login?reason=0');
            }
        });

        router.get('/account_statement_view_ar', (req, res) => {
            if (req.session.isLoggedIn) {
                if (req.session.is_owner || req.session.general_permission > 1) { // معلق  محتاجين نحط الصلاحيه 
                    res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'reports', 'statements' , 'account_statement', 'account_statement_view_ar.html'));
                }else{
                    res.redirect('/report_map_ar?reason=0');
                };
            } else {        
                res.redirect('/login?reason=0');
            }
        });


        router.get('/stock_location_view_ar', (req, res) => {
            if (req.session.isLoggedIn) {
                if (req.session.is_owner || req.session.general_permission > 1) { // معلق  محتاجين نحط الصلاحيه 
                    res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'reports', 'stock' , 'stock_location', 'stock_location_view_ar.html'));
                }else{
                    res.redirect('/report_map_ar?reason=0');
                };
            } else {        
                res.redirect('/login?reason=0');
            }
        });
        //#endregion end trial balance
    //#endregion end statements reports

router.get('/effects_report_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 ||  req.session.effects_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'reports', 'effects' ,'effects_report_ar.html'));
        }else{
            res.redirect('/notes_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});

//#endregion reports

//============================================================================

module.exports = router;
