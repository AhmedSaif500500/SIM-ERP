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
        if (req.session.is_owner || req.session.general_permission === 6) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'settings', 'general_settings_ar.html'));
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
        if (req.session.is_owner || req.session.general_permission > 3 ||  req.session.employees_permission > 2) {
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
        if (req.session.is_owner || req.session.general_permission > 3 ||  req.session.effects_permission > 2) {
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
        if (req.session.is_owner || req.session.general_permission > 3 ||  req.session.departments_permission > 2) {
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
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.salesman_permission > 0 || req.session.sales_permission > 0) {
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
router.get('/sales_qutation_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.sales_permission > 0) {
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
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.sales_permission > 1) {
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
        if (req.session.is_owner || req.session.general_permission > 1 || req.session.sales_permission > 3) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'sales_management', 'sales', 'sales_qutation' ,'sales_qutation_update_ar.html'));
        }else{
            res.redirect('/sales_qutation_view_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});
//#endregion


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
        if (req.session.is_owner || req.session.general_permission > 1 ||  req.session.customers_permission > 2) {
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
        if (req.session.is_owner || req.session.general_permission > 1 ||  req.session.vendors_permission > 2) {
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
        if (req.session.is_owner || req.session.general_permission > 3 ||  req.session.effects_permission > 2) {
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
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'production' ,'production_view_ar.html'));
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
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'production' ,'production_add_ar.html'));
        }else{
            res.redirect('/production_view_ar?reason=1');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/production_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 3 ||  req.session.production_permission > 2) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'production' ,'production_update_ar.html'));
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
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'bread' ,'bread_view_ar.html'));
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
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'bread' ,'bread_add_ar.html'));
        }else{
            res.redirect('/bread_view_ar?reason=1');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/bread_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 3 ||  req.session.bread_permission > 2) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'bread' ,'bread_update_ar.html'));
        }else{
            res.redirect('/bread_view_ar?reason=2');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});
//#endregion end bread

//#region reports 
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

//#region accounting

router.get('/accounts_view_ar', async (req, res) => {
    if (req.session.isLoggedIn || req.session.general_permission > 1 ||  req.session.accounts_permission > 0) {  
        res.sendFile(path.join(__dirname, '..', 'views' , 'ar', 'accounts', 'tree', 'accounts_view_ar.html'));
    } else {
        res.redirect('/login');
    }
});

router.get('/accounts_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 2 ||  req.session.accounts_permission > 1) {
            res.sendFile(path.join(__dirname, '..', 'views' , 'ar', 'accounts', 'tree', 'accounts_add_ar.html'));
        }else{
            res.redirect('/accounts_view_ar?reason=1');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/accounts_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 2 ||  req.session.accounts_permission > 2) {
            res.sendFile(path.join(__dirname, '..', 'views' , 'ar', 'accounts', 'tree', 'accounts_update_ar.html'));
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
        if (req.session.is_owner || req.session.general_permission > 2 ||  req.session.items_permission > 0 || req.session.itemsLocations_permission > 0) {
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
        if (req.session.is_owner || req.session.general_permission > 2 ||  req.session.itemsLocations_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views' , 'ar', 'items', 'itemsLocations', 'itemsLocations_view_ar.html'));
        }else{
            res.redirect('/notes_ar?reason=0');
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
        if (req.session.is_owner || req.session.general_permission > 2 ||  req.session.itemsLocations_permission > 2) {
            res.sendFile(path.join(__dirname, '..', 'views' , 'ar', 'items', 'itemsLocations', 'itemsLocations_update_ar.html'));
        }else{
            res.redirect('/itemsLocations_view_ar?reason=1');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


//#region  end itemslocations
router.get('/items_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.is_owner || req.session.general_permission > 2 ||  req.session.items_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views' , 'ar', 'items', 'items', 'items_view_ar.html'));
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
        if (req.session.is_owner || req.session.general_permission > 2 ||  req.session.items_permission > 2) {
            res.sendFile(path.join(__dirname, '..', 'views' , 'ar', 'items', 'items', 'items_update_ar.html'));
        }else{
            res.redirect('/items_view_ar?reason=1');
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
        if (req.session.is_owner || req.session.general_permission > 3 ||  req.session.transaction_permission > 2) {
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
//#region settings tax
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
        if (req.session.is_owner || req.session.general_permission > 1) {
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

module.exports = router;
