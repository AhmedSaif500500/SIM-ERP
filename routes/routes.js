const { log } = require('console');
const express = require('express');
const router = express.Router();
const path = require('path');


//#region login And home
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views' , 'login.html'));
});


router.get('/home_ar', async (req, res) => {
    if (req.session.isLoggedIn) {  
        res.sendFile(path.join(__dirname, '..', 'views','ar' , 'home_ar.html'));
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

//#region users
router.get('/users_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.general_permission === 6) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'users', 'users_ar.html'));
        }else{
            res.redirect('/home_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});




router.get('/users_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.general_permission === 6) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'users', 'users_add_ar.html'));
        }else{
            res.redirect('/users_ar?reason=1');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});



router.get('/users_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.general_permission === 6) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'users', 'users_update_ar.html'));
        }else{
            res.redirect('/users_ar?reason=2');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});



router.get('/test_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        res.sendFile(path.join(__dirname, '..', 'views', 'ar' ,'test_ar.html'));
    } else {
        res.redirect('/login');
    }
});

//#endregion users

//#region emoloyees
router.get('/employees_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.general_permission > 1 ||  req.session.employees_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'employees' ,'employees_ar.html'));
        }else{
            res.redirect('/home_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


//! Eng
router.get('/employees_en', (req, res) => {
    if (req.session.isLoggedIn) {
        res.sendFile(path.join(__dirname, '..', 'views', 'en' ,'employees_en.html'));
    } else {
        res.redirect('/login');
    }
});


router.get('/new_employee_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.general_permission > 2 ||  req.session.employees_permission > 1) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'employees' ,'new_employee_ar.html'));
        }else{
            res.redirect('/employees_ar?reason=1');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/update_employee_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.general_permission > 3 ||  req.session.employees_permission > 2) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'employees' ,'update_employee_ar.html'));
        }else{
            res.redirect('/employees_ar?reason=2');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});
//#endregion employees

//#region  Attendance
router.get('/attendance_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.general_permission > 1 ||  req.session.attendance_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'attendance' ,'attendance_ar.html'));
        }else{
            res.redirect('/home_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/attendance_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.general_permission > 2 ||  req.session.attendance_permission > 1) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'attendance' ,'attendance_add_ar.html'));
        }else{
            res.redirect('/attendance_ar?reason=1');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});


router.get('/attendance_update_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.general_permission > 3 ||  req.session.attendance_permission > 2) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'attendance' ,'attendance_update_ar.html'));
        }else{
            res.redirect('/attendance_ar?reason=2');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});
//#endregion end Attendance

//#region production

router.get('/production_view_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.general_permission > 1 ||  req.session.production_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'production' ,'production_view_ar.html'));
        }else{
            res.redirect('/home_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});



router.get('/production_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.general_permission > 2 ||  req.session.production_permission > 1) {
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
        if (req.session.general_permission > 3 ||  req.session.production_permission > 2) {
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
        if (req.session.general_permission > 1 ||  req.session.bread_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'bread' ,'bread_view_ar.html'));
        }else{
            res.redirect('/home_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});



router.get('/bread_add_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.general_permission > 2 ||  req.session.bread_permission > 1) {
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
        if (req.session.general_permission > 3 ||  req.session.bread_permission > 2) {
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
router.get('/attendance_report_ar', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.general_permission > 1 ||  req.session.attendance_permission > 0) {
            res.sendFile(path.join(__dirname, '..', 'views', 'ar' , 'reports', 'attendance' ,'attendance_report_ar.html'));
        }else{
            res.redirect('/home_ar?reason=0');
        };
    } else {        
        res.redirect('/login?reason=0');
    }
});

//#endregion reports

//#region accounting

router.get('/accounts_view_ar', async (req, res) => {
    if (req.session.isLoggedIn) {  
        res.sendFile(path.join(__dirname, '..', 'views' , 'ar', 'accounts', 'accounts_view_ar.html'));
    } else {
        res.redirect('/login');
    }
});

//#endregion end - accounting

module.exports = router;
