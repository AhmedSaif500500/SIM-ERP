1//#region  Helps and shourcut

//#region Comments Color
// ! #region app-Started
/*
// ! #region Start-Database
?  Start-Database
&  Start-Database
^  Start-Database
*  Start-Database
TODO #region Start-Database
~  Start-Database
// removed code
*/
//#endregion  End / Comments Color

//#region shourcuts
/*
1 : collapse ( Fold ) Current region : CTRL + Shift + {
2 : extended ( Unfold ) Current region : CTRL + Shift + }
3 : collapse ( Fold ) All region : CTRL + K , CTRL + Zero  in top of keyboard
3 : extended ( Unfold ) All region : CTRL + K , CTRL + j 
*/

//#endregion End / shourcut

//#endregion End / Helps and shourcut

//#region Guid
//===================

/*
open Terminal vscode 
 npm init -y
 npm install express pg-promise body-parser dotenv express-session node-cron ws
 use this command always to resolve the problems : 
 create a file named (.env) in root put in it any variables to secure it like pass  for example put this in .env file ( pass="123" ) then call it here like ( password : env.pass)
 this page is name server.js put it in root file
 index.html put it in root file
 make folder named views put it in root file you should put all html files expept index.html file  in it
 make folder named public put it in root file you should make folders in it for  css and scripts
*/

//#endregion End-Guid

// ! #region app-Started
//=======================
const express = require("express");
const path = require("path"); // استدعاء مكتبة path
const bodyParser = require("body-parser");
const app = express();
const cron = require('node-cron');
const WebSocket = require('ws');
const port = 3000;
const bcrypt = require("bcryptjs"); // مكتبه تشفير الباسورد المرسل الى قاعده البيانات
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static("public")); // تحميل جميع الملفات في مجلد 'public' > لملفات الـ CSS والجافا سكريبت
app.set("views", path.join(__dirname, "views")); // تعيين المجلد 'views' كمجلد للقوالب

app.set("view engine", "ejs"); // تعيين محرك العرض لـ EJS
// app.set("view engine", "html"); // تعيين نوع المحرك لقوالب الـ HTML
// app.engine("html", require("ejs").renderFile);

//! lazem el code t7oto apl malf el routs
// const helmet = require('helmet');
// app.use(helmet({
//   contentSecurityPolicy: {
//     directives: {
//       scriptSrc: ["'self'"]
//     }
//   }
// }));

//! Database
const pgp = require("pg-promise")();
const dotenv = require("dotenv");
const { log } = require("console");
dotenv.config();

// قراءة قيمة DB_SSL من ملف .env وتحويلها إلى قيمة بوليانية
const sslEnabled = process.env.DB_SSL === "true";

const connection = {
  connectionString: process.env.DB_CONNECTION_STRING,
  ssl: sslEnabled
    ? {
      rejectUnauthorized: true, // تأكيد صحة شهادة SSL
    }
    : false, // تعطيل تقنية SSL
};

const db = pgp(connection);

// تحقق من الاتصال بقاعدة البيانات
db.connect()
  .then((obj) => {
    console.log("Connected to the database"); // في حالة النجاح
    obj.done();
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error.message); // في حالة الفشل
    process.exit();
  });


// ! Lazem el code da yt7t Befor routes definition
const session = require("express-session");
app.use(
  session({
    secret: "Allahis14ever.500@4Ever#",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    httpOnly: true, // يمنع الوصول إلى ملف تعريف الارتباط من جافا سكريبت
    secure: true, // يجب أن يكون true إذا كنت تعمل على HTTPS
    sameSite: 'lax', // أو 'strict' لضمان إرسال ملف تعريف الارتباط فقط عبر الطلبات من نفس الأصل
    cookie: { maxAge: 1000 * 60 * 5 }, // مدة صلاحية الجلسة (10 دقائق)
  })
);



//#endregion End / App-Started

//! lazem el code da to7to ba3d tahy2t el session
const routes = require("./routes/routes");
app.use("/", routes);

//=======================================


//========================================================================
//#endregion End-Database

//#region Page : index.html

//#endregion

// #region Page : index2.html

//#endregion

/****************************************************** */

/****************************************** */

//#region cron to make schedule to check user sessions  if is not active  will go to database and make is_active = flase in users table


//#region Cron Functions
async function check_last_activity_fn() {
  // احسب الوقت الحالي
  const now = new Date();

  // احسب وقت الحد الفاصل (5 دقائق)
  const sessionTime = new Date(now.getTime() - 1000 * 60 * 5);

  try {
    // قم بتنفيذ استعلام SQL باستخدام `db.none`
    await db.none(`
      UPDATE users
      SET is_active = false
      WHERE last_activity < $1;
  `, [sessionTime]);
    console.log(`Users updated based on last_activity older than ${sessionTime}`);
  } catch (error) {
    console.error("Error cron check_last_activity_fn:", error.message);
  }
}



//#endregion End Cron Functions

//#region cron schedule
// جدول المهمة لتعمل كل 5 دقائق
cron.schedule("*/5 * * * *", async () => { //الكود دا يعنى ان الكود سيتم تنفيذه اذا كانت القيمه تقبل القسمه على خمسه بغض النظر اذ كان شهر يوم ساعه  دقيقه
  check_last_activity_fn()
});
//#endregionEnd - cron schedule


//#endregion end-cron


//#region Login
app.post("/Login", async (req, res) => {
  try {
    //1: receive data from frontend html>body
    const posted_elements = req.body;

        //! sql injection check
        const hasBadSymbols = sql_anti_injection([
          posted_elements.username_Input,
          posted_elements.password_Input,
          // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
      ]);
            if (hasBadSymbols) {
                return res.json({ success: false, message: "Invalid input detected due to prohibited characters. Please review your input and try again." });
            };

            //* start --------------------------------------------------

    //2: get Today
    const today = new Date().toISOString().split("T")[0];

    //3: run query to get data from database
    // const rows = await db.any(
    //   "SELECT * FROM users WHERE TRIM(user_name) = $1",
    //   [posted_elements.username_Input]
    // );


    let query = `SELECT * FROM users WHERE TRIM(user_name) = $1`;
    let rows = await db.any(query,[
      posted_elements.username_Input
    ])

    if (rows.length > 0) {

      const password_DB = rows[0].user_password;
      const password_Input = posted_elements.password_Input;
      const isMatch = await bcrypt.compare(password_Input, password_DB);
      const is_active = rows[0].is_active;
      if (is_active) {
        return res.json({
          success: false, // العمليه فشلت
          message: "this user is already active Please try again after minutes",
        });
      }

      if (isMatch) {
        //!4.1.1: Start new session
        req.session.isLoggedIn = true; // active session
        // console.log( req.sessionID);
        req.session.userId = rows[0].id;
        req.session.username = rows[0].user_name; // على سبيل المثال، يمكنك تخزين اسم المستخدم

        req.session.general_permission = rows[0].general_permission
        req.session.employees_permission = rows[0].employees_permission
        req.session.attendance_permission = rows[0].attendance_permission
        req.session.users_permission = rows[0].users_permission

        // تحديث عمود `active` إلى `true` للمستخدم الذي قام بتسجيل الدخول
        // await db.none("UPDATE users SET is_active = true WHERE id = $1", [req.session.userId]);

        let query = `UPDATE users SET is_active = true WHERE id = $1`;
        await db.any(query,[
          req.session.userId
        ]);
        //4.1.2: send response to frontend with some data
        res.json({
          // الرد على ال فرونت انت اند
          success: true, // معناه ان العمليه نجحت لو فشلت هتبقا فالس
          message: `Welcome back, ${req.session.username}!`, // دى الرساله الى هتروح للعميل
          user_id: rows[0].id,
          username: rows[0].user_name,

          general_permission: rows[0].general_permission,
          employees_permission: rows[0].employees_permission,
          attendance_permission: rows[0].attendance_permission,
          users_permission: rows[0].users_permission,
        });

        last_activity(req);


        //4.2: if comparing data is wrong
      } else {
        //4.2.1: send response to front with some data
        res.json({
          success: false, // العمليه فشلت
          message: "Invalid username or password",
        });
      }
    } else {
      res.json({
        success: false,
        message: "Invalid username or password",
      });
    }
  } catch (error) {
    console.error("Login Error:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Login Error"
      });
  }
});


// Endpoint for user logout
app.get("/Logout", async (req, res) => {
  try {

            //! sql injection check
            const hasBadSymbols = sql_anti_injection([
              req.session.userId
              // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
          ]);
                if (hasBadSymbols) {
                    return res.json({ success: false, message: "Invalid input detected due to prohibited characters. Please review your input and try again." });
                };

                //* start-----------------------------------
    // تحقق من وجود userId في الجلسة
    if (!req.session.userId) {
      return res.status(400).json({
        success: false,
        message: "User not logged in"
      });
    }

    let query = `UPDATE users SET is_active = false WHERE id = $1`;
    await db.none(query,[
      req.session.userId
    ]);
    // تحديث is_active إلى false في قاعدة البيانات قبل إنهاء الجلسة
    // await db.none("UPDATE users SET is_active = false WHERE id = $1", [req.session.userId]);

    // إنهاء الجلسة
    req.session.destroy((err) => {
      if (err) {
        console.error("Logout Error:", err.message);
        res.status(500).json({ success: false, message: "Logout Error" });
      } else {
        res.json({ success: true, message: "Logout successful" });

      }
    });
  } catch (error) {
    console.error("Logout Error:", error.message);
    res.status(500).json({ success: false, message: "Logout Error" });
  }
});


//#endregion End-Login

//#region Templets
//! Permission function
async function permissions(req, secendary_permission, perm_type) {
  const permissions = await db.any(`select general_permission, ${secendary_permission} from users where user_name = $1`,
    [req.session.username]
  );
  const X1 = permissions[0].general_permission;
  const X2 = permissions[0][secendary_permission];
  switch (perm_type) {
    case 'view':
      if (X1 > 1 || X2 > 0) {
        return true;
      } else {
        res.json({
          success: false,
          message: "عفوًا لا تملك صلاحية العرض",
        });
        return false;
      }
    case 'add':
      if (X1 > 2 || X2 > 1) {
        return true;
      } else {
        res.json({
          success: false,
          message: "عفوًا لا تملك صلاحية الاضافة",
        });
        return false;
      }
    case 'edit':
      if (X1 > 3 || X2 > 2) {
        return true;
      } else {
        res.json({
          success: false,
          message: "عفوًا لا تملك صلاحية التعديل",
        });
        return false;
      }
    case 'delete':
      if (X1 > 4 || X2 > 3) {
        return true;
      } else {
        res.json({
          success: false,
          message: "عفوًا لا تملك صلاحية الحذف",
        });
        return false;
      }
  }

  if (permissions.length > 0) {
    console.log(`this is general_permission ${X1}`);
    console.log(`this is employees_permission ${X2}`);
  }
};

// get new id ( table foreign Key)
async function newId_fn(tableName) {
  let result;
  const query = await db.any(`SELECT MAX(id) AS id FROM ${tableName}`);

  if (query) {
    result = query[0].id;
    return result + 1
  } else {
    result = 1
    return result
  }
};

// last activity 
async function last_activity(req) {
  await db.none(`
    UPDATE users
    SET last_activity = NOW()
    WHERE id = $1
`, [req.session.userId]);
}

// sql injection
function sql_anti_injection(values) {
  // تحقق من كل قيمة في المصفوفة
  for (let value of values) {
      // إذا كانت القيمة سلسلة نصية
      if (typeof value === 'string') {
          // قم بإزالة المسافات الزائدة وتعقيمها
          // وتحقق من وجود رموز ضارة
          if (value.trim().match(/['";$%&<>]/)) {
              return true; // عثر على رمز ضار
          }
      }
  }
  return false; // لا يوجد رموز ضارة
}


//#endregion End- Templets


//#region users

// review  users data
app.get("/get_All_users_Data", async (req, res) => {
  try {

    //! check Permission
    permissions(req, 'users_permission', 'view');
    if (!permissions) {
      return;
    };

    let general_permission =parseInt(req.session.general_permission);
    if(!general_permission || general_permission !== 6){
      return res.json({
        success: false,
        message: "Sorry,you  can't use this featue",
      });
    };


    //*----------------------------------------------------------------


    let query = `SELECT id, user_name  FROM users`;
    let rows = await db.any(query);

    // const rows = await db.any("SELECT id, user_name  FROM users");
    const data = rows.map((row) => ({
      id: row.id,
      user_name: row.user_name,
    }));

    res.json(data);
    last_activity(req);
  } catch (err) {
    console.error("Error get_All_users_Data ", err.message);
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء تحضير بيانات المستخدمين ",
    });
  }
});

// add new user
app.post("/addNewuser", async (req, res) => {
  try {
    const posted_elements = req.body;

    //! Permission
    await permissions(req, 'Users_permission', 'add');
    if (!permissions) { return; };

    let general_permission =parseInt(req.session.general_permission);
    if(!general_permission || general_permission !== 6){
      return res.json({
        success: false,
        message: "Sorry,you  can't use this featue",
      });
    };

               //! sql injection check
               const hasBadSymbols = sql_anti_injection([
                posted_elements.user_name_input,
                posted_elements.pass_input1,
                posted_elements.general_permission_select,
                posted_elements.table_permission_users,
                posted_elements.table_permission_employee,
                posted_elements.table_permission_attendance,
                posted_elements.today
                // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
            ]);
                  if (hasBadSymbols) {
                      return res.json({ success: false, message: "Invalid input detected due to prohibited characters. Please review your input and try again." });
                  };
  

    //* Start--------------------------------------------------------------



    //1: receive data from frontend new_employee_ar.
    

    //2: validation data befor inserting to db
    // const rows = await db.any(
    //   "SELECT TRIM(user_name) FROM users WHERE TRIM(user_name) = $1",
    //   [posted_elements.user_name_input]
    // );

    let query = `SELECT TRIM(user_name) FROM users WHERE TRIM(user_name) = $1`;
    let rows = await db.any(query,[
      posted_elements.user_name_input
    ]);

    
    if (rows.length > 0) {
      // اذا حصل على نتائج
      return res.json({
        success: false,
        message: "اسم المستخدم موجود بالفعل",
      });
    } else {
      //! تشفير كلمة المرور قبل إدخالها في قاعدة البيانات
      const pass_input1 = await bcrypt.hash(posted_elements.pass_input1, 12);

      //3: insert data into db
      const newId = await newId_fn('users');
      // await db.none(
      //   "INSERT into users (id, user_name, user_password, general_permission, users_permission, employees_permission, attendance_permission, datex) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      //   [
      //     newId,
      //     posted_elements.user_name_input,
      //     pass_input1,
      //     posted_elements.general_permission_select,
      //     posted_elements.table_permission_users,
      //     posted_elements.table_permission_employee,
      //     posted_elements.table_permission_attendance,
      //     posted_elements.today,
      //   ]
      // );

      let query = `INSERT into users (id, user_name, user_password, general_permission, users_permission, employees_permission, attendance_permission, datex) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
      await db.none(query,[
        newId,
        posted_elements.user_name_input,
        pass_input1,
        posted_elements.general_permission_select,
        posted_elements.table_permission_users,
        posted_elements.table_permission_employee,
        posted_elements.table_permission_attendance,
        posted_elements.today,
      ]);



      //4: send a response to frontend about success transaction
      res.json({
        success: true,
        message: "تم حفظ المستخدم بنجاح",
      });
      last_activity(req);
    }
  } catch (error) {
    console.error("Error adding employee:", error.message);
    // send a response to frontend about fail transaction
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء اضافة المستخدم",
    });
  }
});


// edit user
app.post("/editUser", async (req, res) => {
  try {
    const posted_elements = req.body;
    //! Permission
    await permissions(req, "Users_permission", "view");
    if (!permissions) {
      return;
    }

    let general_permission =parseInt(req.session.general_permission);
    if(!general_permission || general_permission !== 6){
      return res.json({
        success: false,
        message: "Sorry,you  can't use this featue",
      });
    };


                   //! sql injection check
                   const hasBadSymbols = sql_anti_injection([
                    posted_elements.user_id
                    // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
                ]);
                      if (hasBadSymbols) {
                          return res.json({ success: false, message: "Invalid input detected due to prohibited characters. Please review your input and try again." });
                      };
      
    //* Start--------------------------------------------------------------
    //1: receive data from frontend new_employee_ar.
    

    //2: validation data befor inserting to db
    // const rows = await db.any("SELECT * FROM users WHERE id = $1", [
    //   posted_elements.user_id,
    // ]);



    let query = `SELECT * FROM users WHERE id = $1`;
    let rows = await db.any(query,[
      posted_elements.user_id
    ]);

    if (rows.length > 0) {
      // اذا حصل على نتائج
      return res.json({
        success: true,
        message: "data get success",
        rows: rows,
      });
    } else {
      return res.json({
        success: false,
        message: "Faild to get user data from server",
      });
    }
  } catch (error) {
    console.error("Error get employee data:", error.message);
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء اضافة  الموظف",
    });
  }
});


app.post("/edit_User_from_user_edit_ar", async (req, res) => {
  try {
    const posted_elements = await req.body;

    //! Permission
    await permissions(req, 'Users_permission', 'edit');
    if (!permissions) { return; };

    let general_permission =parseInt(req.session.general_permission);
    if(!general_permission || general_permission !== 6){
      return res.json({
        success: false,
        message: "Sorry,you  can't use this featue",
      });
    };

                       //! sql injection check
                       const hasBadSymbols = sql_anti_injection([
                        posted_elements.user_name_input,
                        posted_elements.pass_input1,
                        posted_elements.user_id,
                        posted_elements.general_permission_select,
                        posted_elements.table_permission_users,
                        posted_elements.table_permission_employee,
                        posted_elements.table_permission_attendance,
                        posted_elements.today
                        // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
                    ]);
                          if (hasBadSymbols) {
                              return res.json({ success: false, message: "Invalid input detected due to prohibited characters. Please review your input and try again." });
                          };

    //* Start--------------------------------------------------------------




    if (parseInt(posted_elements.user_id) === 1) {
      return res.json({
        success: false,
        message: "لا يمكن التعديل على هذا المستخدم",
      });
    };

    //2: validation data befor inserting to db
    // const rows = await db.any("SELECT user_name FROM users WHERE user_name = $1 and id != $2 ", [
    //   posted_elements.user_name_input,
    //   posted_elements.user_id,
    // ]);


    let query = `SELECT user_name FROM users WHERE user_name = $1 and id != $2`;
    let rows = await db.any(query,[
      posted_elements.user_name_input,
      posted_elements.user_id
    ]);


    if (rows.length > 0) {
      // اذا حصل على نتائج
      return res.json({
        success: false,
        message: "اسم المستخدم موجود",
        rows: rows,
      });
    } else {

      // updqte data depending on newPassword_Condition
      if (posted_elements.newPassword_Condition) { // فى حالة تعديل البيانات شامله  كلمة مرور جديده

        //! تشفير كلمة المرور قبل إدخالها في قاعدة البيانات
        const pass_input1 = await bcrypt.hash(posted_elements.pass_input1, 12);

        // const rows = await db.any("Update Users set user_name = $1, user_password = $2, general_permission = $3, users_permission = $4, employees_permission = $5, attendance_permission = $6, datex = $7 WHERE id = $8", [
        //   posted_elements.user_name_input,
        //   pass_input1,
        //   posted_elements.general_permission_select,
        //   posted_elements.table_permission_users,
        //   posted_elements.table_permission_employee,
        //   posted_elements.table_permission_attendance,
        //   posted_elements.today,
        //   posted_elements.user_id,
        // ]);

        let query = `Update Users set user_name = $1, user_password = $2, general_permission = $3, users_permission = $4, employees_permission = $5, attendance_permission = $6, datex = $7 WHERE id = $8`;
        await db.any(query,[
          posted_elements.user_name_input,
          pass_input1,
          posted_elements.general_permission_select,
          posted_elements.table_permission_users,
          posted_elements.table_permission_employee,
          posted_elements.table_permission_attendance,
          posted_elements.today,
          posted_elements.user_id
        ]);


        return res.json({
          success: true,
          message: "تم تعديل بيانات المستخدم بنجاح",
        });
      } else {  // فى حالة تعديل البيانات بدون تعديل كلمة المرور الحالية
        // const rows = await db.any("Update Users set user_name = $1, general_permission = $2, users_permission = $3,  employees_permission = $4, attendance_permission = $5, datex = $6 WHERE id = $7", [
        //   posted_elements.user_name_input,
        //   posted_elements.general_permission_select,
        //   posted_elements.table_permission_users,
        //   posted_elements.table_permission_employee,
        //   posted_elements.table_permission_attendance,
        //   posted_elements.today,
        //   posted_elements.user_id,
        // ]);

        let query = `Update Users set user_name = $1, general_permission = $2, users_permission = $3,  employees_permission = $4, attendance_permission = $5, datex = $6 WHERE id = $7`;
        await db.any(query,[
          posted_elements.user_name_input,
          posted_elements.general_permission_select,
          posted_elements.table_permission_users,
          posted_elements.table_permission_employee,
          posted_elements.table_permission_attendance,
          posted_elements.today,
          posted_elements.user_id,
        ]);
        return res.json({
          success: true,
          message: "تم تعديل بيانات المستخدم بنجاح بدون تعديل كلمة المرور : سيتم توجيهك الى صفحه المستخدمين الرئيسية",
        });
      };
    };
  } catch (error) {
    console.error("Error updating user data:", error.message);
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء تعديل بيانات المستخدم ",
    });
  }
});

// Delete_user
app.post("/delete_User_from_user_edit_ar", async (req, res) => {
  try {
    const posted_elements = req.body;
    
    //! Permission
    await permissions(req, 'Users_permission', 'delete');
    if (!permissions) { return; };

    let general_permission =parseInt(req.session.general_permission);
    if(!general_permission || general_permission !== 6){
      return res.json({
        success: false,
        message: "Sorry,you  can't use this featue",
      });
    };
    
                       //! sql injection check
                       const hasBadSymbols = sql_anti_injection([
                        posted_elements.user_id
                        // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
                    ]);
                          if (hasBadSymbols) {
                              return res.json({ success: false, message: "Invalid input detected due to prohibited characters. Please review your input and try again." });
                          };

    //* Start--------------------------------------------------------------



    //3: insert data into db
    // const rows = await db.none("DELETE FROM users WHERE id = $1", [
    //   posted_elements.user_id,
    // ]);

    let query = `DELETE FROM users WHERE id = $1`;
    await db.none(query,[
      posted_elements.user_id,
    ]);

    return res.json({
      success: true,
      message: "تم حذف بيانات المستخدم بنجاح : سيتم توجيهك الى صفحه المستخدمين الرئيسية",
    });
  } catch (error) {
    console.error("Error Deleting user data:", error.message);
    res.status(500).json({
      success: false,
      message: "توجد عمليات فى التطبيق مرتبطه بهذا المستخدم ولا يمكن حذفه",
    });
  }
});
//#endregion users

//#region Page : employees.html

// Add new employee
app.post("/addNewEmployee", async (req, res) => {
  try {
    const posted_elements = req.body;

    //! Permission
    await permissions(req, 'employees_permission', 'add');
    if (!permissions) { return; };

    
    //! sql injection check
    const hasBadSymbols = sql_anti_injection([
      posted_elements.employee_name_input,
      posted_elements.today,
      posted_elements.employee_job_input,
      posted_elements.employee_beta2a_input,
      posted_elements.employee_adress_input,
      posted_elements.employee_phone_input,
      posted_elements.employee_emergency_phone_input,
      posted_elements.employee_start_date_input,
      posted_elements.employee_leave_date_input
      // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
  ]);
        if (hasBadSymbols) {
            return res.json({ success: false, message: "Invalid input detected due to prohibited characters. Please review your input and try again." });
        };
    //* Start--------------------------------------------------------------
  

    //2: validation data befor inserting to db
    // const rows = await db.any(
    //   "SELECT TRIM(employee_name) FROM employees WHERE TRIM(employee_name) = $1",
    //   [posted_elements.employee_name_input]
    // );

    let X = `SELECT TRIM(employee_name) FROM employees WHERE TRIM(employee_name) = $1`;
    let rows = await db.any(X,[
      posted_elements.employee_name_input
    ]);


    if (rows.length > 0) {
      // اذا حصل على نتائج
      return res.json({ success: false, message: "اسم الموظف موجود بالفعل" });
    }

    //3: insert data into db
    const newId = await newId_fn('employees');


    let query = `
  INSERT INTO employees (id, employee_name, datex, emp_job, emp_beta2a, emp_adress, emp_personal_phone, emp_emergency_phone, emp_start_date, emp_end_date)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
`;
    await db.none(query, [
      newId,
      posted_elements.employee_name_input,
      posted_elements.today,
      posted_elements.employee_job_input,
      posted_elements.employee_beta2a_input,
      posted_elements.employee_adress_input,
      posted_elements.employee_phone_input,
      posted_elements.employee_emergency_phone_input,
      posted_elements.employee_start_date_input,
      posted_elements.employee_leave_date_input
    ]);


    //4: send a response to frontend about success transaction
    res.json({
      success: true,
      message: "تم حفظ الموظف بنجاح",
    });
  } catch (error) {
    console.error("Error adding employee:", error.message);
    // send a response to frontend about fail transaction
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء اضافة الموظف",
    });
  }
});

// edit Employee
app.post("/editEmployee", async (req, res) => {
  try {

    //! Permission
    await permissions(req, 'employees_permission', 'view');
    if (!permissions) { return; };

        const posted_elements = req.body;

        //! sql injection check
        const hasBadSymbols = sql_anti_injection([
          posted_elements.employee_id
          // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
      ]);
            if (hasBadSymbols) {
                return res.json({ success: false, message: "Invalid input detected due to prohibited characters. Please review your input and try again." });
            };

    //* Start--------------------------------------------------------------




    //2: validation data befor inserting to db
    // const rows = await db.any("SELECT * FROM employees WHERE id = $1", [
    //   posted_elements.employee_id,
    // ]);
    let query = `SELECT * FROM employees WHERE id = $1`;
    let rows =  await db.any(query,[
      posted_elements.employee_id,
    ]);

    if (rows.length > 0) {
      // اذا حصل على نتائج
      return res.json({
        success: true,
        message: "data get success",
        rows: rows,
      });
    } else {
      return res.json({
        success: false,
        message: "Faild to get employee data from server",
      });
    }
  } catch (error) {
    console.error("Error get employee data:", error.message);
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء اضافة  الموظف",
    });
  }
});

// edit_Employee
app.post("/edit_employee", async (req, res) => {
  try {
    //! Permission
    await permissions(req, 'employees_permission', 'edit');
    if (!permissions) { return; };

    
    const posted_elements = req.body;

    //! sql injection check
    const hasBadSymbols = sql_anti_injection([
      posted_elements.employee_name_input,
      posted_elements.employee_job_input
      // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
  ]);
        if (hasBadSymbols) {
            return res.json({ success: false, message: "Invalid input detected due to prohibited characters. Please review your input and try again." });
        };
      

    //* Start--------------------------------------------------------------

    //1: receive data from frontend new_employee_ar.

    //2: validation data befor inserting to db
    // const rows = await db.any(
    //   "SELECT TRIM(employee_name) FROM employees WHERE TRIM(employee_name) = $1 AND id != $2",
    //   [posted_elements.employee_name_input, posted_elements.employee_id]
    // );

    let query1 = `SELECT TRIM(employee_name) FROM employees WHERE TRIM(employee_name) = $1 AND id != $2`;
    let rows =  await db.any(query1,[
      posted_elements.employee_name_input, posted_elements.employee_id
    ]);

    
    if (rows.length > 0) {
      // اذا حصل على نتائج
      return res.json({
        success: false,
        message: "اسم الموظف موجود بالفعل",
      });
    } else {
      //3: insert data into db
      // await db.none(
      //   "UPDATE employees SET employee_name = $1, datex = $2, emp_job = $3, emp_beta2a = $4, emp_adress = $5, emp_personal_phone = $6, emp_emergency_phone = $7, emp_start_date = $8, emp_end_date = $9 where id = $10",
      //   [
      //     posted_elements.employee_name_input,
      //     posted_elements.today,
      //     posted_elements.employee_job_input,
      //     posted_elements.employee_beta2a_input,
      //     posted_elements.employee_adress_input,
      //     posted_elements.employee_phone_input,
      //     posted_elements.employee_emergency_phone_input,
      //     posted_elements.employee_start_date_input,
      //     posted_elements.employee_leave_date_input,
      //     posted_elements.employee_id,
      //   ]
      // );

      let query2 = `UPDATE employees SET employee_name = $1, datex = $2, emp_job = $3, emp_beta2a = $4, emp_adress = $5, emp_personal_phone = $6, emp_emergency_phone = $7, emp_start_date = $8, emp_end_date = $9 where id = $10`;
      await db.none(query2,[
        posted_elements.employee_name_input,
        posted_elements.today,
        posted_elements.employee_job_input,
        posted_elements.employee_beta2a_input,
        posted_elements.employee_adress_input,
        posted_elements.employee_phone_input,
        posted_elements.employee_emergency_phone_input,
        posted_elements.employee_start_date_input,
        posted_elements.employee_leave_date_input,
        posted_elements.employee_id,
      ]);
  

      return res.json({
        success: true,
        message: "تم تعديل البيانات : سيتم تحويلك الان الى صفحه الموظفين الرئيسيه",
      });
    }
  } catch (error) {
    console.error("Error get employee data:", error.message);
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء اضافة  الموظف",
    });
  }
});

// Delete_Employee
app.post("/delete_employee", async (req, res) => {
  try {
    //! Permission
    await permissions(req, 'employees_permission', 'delete');
    if (!permissions) { return; };

       
       const posted_elements = req.body;
        //! sql injection check
        const hasBadSymbols = sql_anti_injection([
          posted_elements.employee_id
          // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
      ]);
            if (hasBadSymbols) {
                return res.json({ success: false, message: "Invalid input detected due to prohibited characters. Please review your input and try again." });
            };

    //* Start--------------------------------------------------------------
 

    //3: insert data into db
    // await db.none("DELETE FROM employees WHERE id = $1", [
    //   posted_elements.employee_id,
    // ]);

    let query1 = `DELETE FROM employees WHERE id = $1`;
    await db.none(query1,[
      posted_elements.employee_id
    ]);

    return res.json({
      success: true,
      message: "تم حذف بيانات الموظف : سيتم تحويلك الان الى صفحه الموظفين الرئيسيه",
    });
  } catch (error) {
    console.error("Error get employee data:", error.message);
    res.status(500).json({
      success: false,
      message: "لا يمكن حذف الموظف : قد تكون هناك عمليات مرتبطه بالموظف يجب حذفها اولا",
    });
  }
});

//_______________________________________________

// get all d employees data
app.get("/get_All_Employees_Data", async (req, res) => {
  try {

    //! Permission
    await permissions(req, 'employees_permission', 'view');
    if (!permissions) { return; };

    //* Start--------------------------------------------------------------

    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");

    let query1 = `SELECT e.id, e.employee_name FROM employees e`;
    let rows = await db.any(query1);

    const data = rows.map((row) => ({
      id: row.id,
      name: row.employee_name,
    }));

    res.json(data);
  } catch (err) {
    console.error("Error fetching data:", err.message);
    res.status(500).send("Error: getEmployeesData");
  }
});

//#endregion

//#region attendance

// Add attendance_add
app.post("/attendance_add", async (req, res) => {
  try {
    //! Permission
    await permissions(req, 'attendance_permission', 'add');
    if (!permissions) { return; };

    const posted_elements = req.body;

            //! sql injection check
            const hasBadSymbols = sql_anti_injection([
              posted_elements.id_hidden_input,
              posted_elements.date_input,
              posted_elements.days_input,
              posted_elements.hours_inpu,
              posted_elements.values_input,
              posted_elements.note_inpute
              // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
          ]);
                if (hasBadSymbols) {
                    return res.json({ success: false, message: "Invalid input detected due to prohibited characters. Please review your input and try again." });
                };
    //* Start--------------------------------------------------------------




    //3: insert data into db
    const newId = await newId_fn('attendance')
    // await db.none(
    //   "INSERT INTO attendance (id, employee_id, datex, days, hours, values, note) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    //   [
    //     newId,
    //     posted_elements.id_hidden_input,
    //     posted_elements.date_input,
    //     posted_elements.days_input,
    //     posted_elements.hours_inpu,
    //     posted_elements.values_input,
    //     posted_elements.note_inpute,
    //   ]
    // );

    let query1 = `INSERT INTO attendance (id, employee_id, datex, days, hours, values, note) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    await db.none(query1,[
      newId,
      posted_elements.id_hidden_input,
      posted_elements.date_input,
      posted_elements.days_input,
      posted_elements.hours_inpu,
      posted_elements.values_input,
      posted_elements.note_inpute,
    ]);

    //4: send a response to frontend about success transaction
    res.json({
      success: true,
      message: "تم حفظ البيانات بنجاح",
    });
  } catch (error) {
    console.error("Error adding employee:", error.message);
    // send a response to frontend about fail transaction
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء الاضافه",
    });
  }
});

// 2:- get data to fill dropdownbox of employees
app.get("/getEmployeesData1", async (req, res) => {
  try {

    //! Permission
    await permissions(req, 'attendance_permission', 'view');
    if (!permissions) { return; };

    //* Start--------------------------------------------------------------
    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");

    let query1 = `SELECT e.id, e.employee_name FROM employees e`;
    let rows = await db.any(query1);

    const data = rows.map((row) => ({
      id: row.id,
      employee_name: row.employee_name,
    }));
    res.json(data);
  } catch (error) {
    console.error("Error while get Employees Data", error.message);
    res.join;
    res
      .status(500)
      .json({ success: false, message: "Error while get Employees Data" });
  }
});

// 3:- get data for review tables
app.get("/get_All_attendance_Data", async (req, res) => {
  try {
    //! Permission
    await permissions(req, 'attendance_permission', 'view');
    if (!permissions) { return; };

    //* Start--------------------------------------------------------------
    // const rows =
    //   await db.any(`SELECT A.id, A.employee_id, E.employee_name, A.note, A.datex, A.last_update
    //     FROM Attendance A
    //     LEFT JOIN  employees E on A.employee_id = E.id
    //     ORDER BY A.datex DESC`);

        let query1 = `SELECT A.id, A.employee_id, E.employee_name, A.note, A.datex, A.last_update
        FROM Attendance A
        LEFT JOIN  employees E on A.employee_id = E.id
        ORDER BY A.datex DESC`;
        let rows =  await db.any(query1);

    const data = rows.map((row) => ({
      id: row.id,
      employee_id: row.employee_id,
      employee_name: row.employee_name,
      note: row.note,
      datex: row.datex,
    }));

    res.json(data);
  } catch (error) {
    console.error("Error getEmployeesData1:", error.message);
    res
      .status(500)
      .json({ success: false, message: "حدث خطأ أثناء عرض البيانات" });
  }
});


// edit attendance
app.post("/editattendance", async (req, res) => {
  try {
    const posted_elements = req.body;

    //! Permission
    await permissions(req, 'attendance_permission', 'view');
    if (!permissions) { return; };

                //! sql injection check
                const hasBadSymbols = sql_anti_injection([
                  posted_elements.attendance_id
                  // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
              ]);
                    if (hasBadSymbols) {
                        return res.json({ success: false, message: "Invalid input detected due to prohibited characters. Please review your input and try again." });
                    };

    //* Start--------------------------------------------------------------





    //2: validation data befor inserting to db
    // const rows = await db.any(`SELECT A.id, A.employee_id, E.employee_name, A.days, A.hours, A.values, A.note, A.datex, A.last_update
    // FROM Attendance A
    // LEFT JOIN  employees E on A.employee_id = E.id
    // where A.id=$1
    // ORDER BY A.datex DESC`, [
    //   posted_elements.attendance_id,
    // ]);

    let query1 = `SELECT A.id, A.employee_id, E.employee_name, A.days, A.hours, A.values, A.note, A.datex, A.last_update
    FROM Attendance A
    LEFT JOIN  employees E on A.employee_id = E.id
    where A.id=$1
    ORDER BY A.datex DESC`;
    let rows = await db.any(query1,[
      posted_elements.attendance_id,
    ]);

    if (rows.length > 0) {
      // اذا حصل على نتائج
      return res.json({
        success: true,
        message: "data get success",
        rows: rows,
      });
    } else {
      return res.json({
        success: false,
        message: "Faild to get data from server",
      });
    }
  } catch (error) {
    console.error("Error editattendance:", error.message);
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء تحميل البيانات",
    });
  }
});


// 4:- Update Attendance data
// edit_Employee
app.post("/attendance_edit", async (req, res) => {
  try {

        const posted_elements = req.body;
    //! Permission
    await permissions(req, 'attendance_permission', 'edit');
    if (!permissions) { return; };

                    //! sql injection check
                    const hasBadSymbols = sql_anti_injection([
                      posted_elements.id_hidden_input,
                      posted_elements.date_input,
                      posted_elements.days_input,
                      posted_elements.hours_inpu,
                      posted_elements.values_input,
                      posted_elements.note_inpute,
                      posted_elements.attendance_id
                      // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
                  ]);
                        if (hasBadSymbols) {
                            return res.json({ success: false, message: "Invalid input detected due to prohibited characters. Please review your input and try again." });
                        };
    
    //* Start--------------------------------------------------------------


    // await db.none(
    //   "UPDATE attendance SET employee_id = $1, datex = $2, days = $3, hours = $4, values = $5, note = $6 where id = $7",
    //   [
    //     posted_elements.id_hidden_input,
    //     posted_elements.date_input,
    //     posted_elements.days_input,
    //     posted_elements.hours_inpu,
    //     posted_elements.values_input,
    //     posted_elements.note_inpute,
    //     posted_elements.attendance_id,
    //   ]
    // );

    let query1 = `UPDATE attendance SET employee_id = $1, datex = $2, days = $3, hours = $4, values = $5, note = $6 where id = $7`;
    await db.none(query1,[
      posted_elements.id_hidden_input,
      posted_elements.date_input,
      posted_elements.days_input,
      posted_elements.hours_inpu,
      posted_elements.values_input,
      posted_elements.note_inpute,
      posted_elements.attendance_id
    ]);

    return res.json({
      success: true,
      message: "تم تعديل البيانات : سيتم تحويلك الان الى صفحه المؤثرات الرئيسيه",
    });
    // }
  } catch (error) {
    console.error("Error get employee data:", error.message);
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء تعديل البيانات",
    });
  }
});


// attendance_delete
app.post("/attendance_delete", async (req, res) => {
  try {
       
        const posted_elements = req.body;
    //! Permission
    await permissions(req, 'attendance_permission', 'delete');
    if (!permissions) { return; };

                        //! sql injection check
                        const hasBadSymbols = sql_anti_injection([
                          posted_elements.attendance_id
                          // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
                      ]);
                            if (hasBadSymbols) {
                                return res.json({ success: false, message: "Invalid input detected due to prohibited characters. Please review your input and try again." });
                            };
        

    //* Start--------------------------------------------------------------


    //3: insert data into db
    // await db.none("DELETE FROM attendance WHERE id = $1", [
    //   posted_elements.attendance_id,
    // ]);

    let query1 = `DELETE FROM attendance WHERE id = $1`;
    await db.none(query1,[
      posted_elements.attendance_id
    ]);

    return res.json({
      success: true,
      message: "تم حذف البيانات بنجاح : سيتم تحويلك الان الى صفحه المؤثرات الرئيسيه",
    });
  } catch (error) {
    console.error("Error get employee data:", error.message);
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء حذف ",
    });
  }
});



//#endregion ( Attendance page )


//#region  reports

// report attendance
app.post("/report_attendance", async (req, res) => {
  try {
    const posted_elements = req.body;
    //! Permission
    await permissions(req, 'attendance_permission', 'view');
    if (!permissions) { return; };


                            //! sql injection check
                            const hasBadSymbols = sql_anti_injection([
                              posted_elements.report_type,
                              posted_elements.employee_id,
                              posted_elements.month,
                              posted_elements.year
                              // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
                          ]);
                                if (hasBadSymbols) {
                                    return res.json({ success: false, message: "Invalid input detected due to prohibited characters. Please review your input and try again." });
                                };
            

    //* Start--------------------------------------------------------------

    
    if (posted_elements.report_type === 2) {

      // const rows = await db.any(`
      //     SELECT
      //       e.id As employee_id,
      //       e.employee_name,
      //       SUM(a.days) AS total_days,
      //       SUM(a.hours) AS total_hours,
      //       SUM(a.values) AS total_values
      //     FROM attendance a
      //     LEFT JOIN employees e ON e.id = a.employee_id
      //     WHERE 
      //       EXTRACT(MONTH FROM to_date(a.datex, 'YYYY-MM-DD')) = $1
      //       AND EXTRACT(YEAR FROM to_date(a.datex, 'YYYY-MM-DD')) = $2
      //     GROUP BY e.employee_name, e.id
      //     ORDER BY e.employee_name ASC`, [
      //   posted_elements.month,
      //   posted_elements.year,
      // ]);

      let query1 = `SELECT
      e.id As employee_id,
      e.employee_name,
      SUM(a.days) AS total_days,
      SUM(a.hours) AS total_hours,
      SUM(a.values) AS total_values
    FROM attendance a
    LEFT JOIN employees e ON e.id = a.employee_id
    WHERE 
      EXTRACT(MONTH FROM to_date(a.datex, 'YYYY-MM-DD')) = $1
      AND EXTRACT(YEAR FROM to_date(a.datex, 'YYYY-MM-DD')) = $2
    GROUP BY e.employee_name, e.id
    ORDER BY e.employee_name ASC`;
      let rows = await db.any(query1,[
        posted_elements.month,
        posted_elements.year,
      ]);


      if (rows.length > 0) {
        const data = rows.map((row) => ({
          employee_id: row.employee_id,
          employee_name: row.employee_name,
          total_days: row.total_days,
          total_hours: row.total_hours,
          total_values: row.total_values,
        }));

        res.json(data);
      } else {
        return res.json({
          success: false,
          message: "لا نتائج",
        });
      }

    } else { // فى حاله الموظف الفردى عندما يكون نوع التقرير 1 

      // const rows = await db.any(`
      // SELECT
      //   a.id,
      //   e.id As employee_id,
      //   e.employee_name,
      //   a.days,
      //   a.hours,
      //   a.values,
      //   a.note,
      //   a.datex
      // FROM attendance a
      // LEFT JOIN employees e ON e.id = a.employee_id
      // WHERE 
      //   a.employee_id = $1
      //   AND EXTRACT(MONTH FROM to_date(a.datex, 'YYYY-MM-DD')) = $2
      //   AND EXTRACT(YEAR FROM to_date(a.datex, 'YYYY-MM-DD')) = $3
      // ORDER BY e.employee_name ASC`, [
      //   posted_elements.employee_id,
      //   posted_elements.month,
      //   posted_elements.year,
      // ]);


      let query1 = `SELECT
      a.id,
      e.id As employee_id,
      e.employee_name,
      a.days,
      a.hours,
      a.values,
      a.note,
      a.datex
    FROM attendance a
    LEFT JOIN employees e ON e.id = a.employee_id
    WHERE 
      a.employee_id = $1
      AND EXTRACT(MONTH FROM to_date(a.datex, 'YYYY-MM-DD')) = $2
      AND EXTRACT(YEAR FROM to_date(a.datex, 'YYYY-MM-DD')) = $3
    ORDER BY e.employee_name ASC`;
      let rows = await db.any(query1,[
        posted_elements.employee_id,
        posted_elements.month,
        posted_elements.year,
      ]);



      if (rows.length > 0) {
        const data = rows.map((row) => ({
          id: row.id,
          employee_id: row.employee_id,
          employee_name: row.employee_name,
          days: row.days,
          hours: row.hours,
          values: row.values,
          note: row.note,
          datex: row.datex,
        }));

        res.json(data);
      } else {
        return res.json({
          success: false,
          message: "لا نتائج",
        });
      };
    };

  } catch (error) {
    console.error("Error report_attendance:", error.message);
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء تحميل البيانات",
    });
  };
});
// End- reports



//******************************************************************** */

app.listen(port, () => {
  console.log(`server is runing on http://localhost:${port}`);

  //! اوامر تنفذ مبشره بعد تشغيل السيرفر 
    check_last_activity_fn();
});


