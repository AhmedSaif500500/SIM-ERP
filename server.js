//#region  Helps and shourcut

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
 npm install express pg-promise body-parser dotenv express-session node-cron ws socket.io
 use this command always to resolve the problems : 
 create a file named (.env) in root put in it any variables to secure it like pass  for example put this in .env file ( pass="123" ) then call it here like ( password : env.pass)
 this page is name server.js put it in root file
 index.html put it in root file
 make folder named views put it in root file you should put all html files expept index.html file  in it
 make folder named public put it in root file you should make folders in it for  css and scripts
*/

//#endregion End-Guid

//#region app-Started
const http = require('http');
const express = require("express");
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('New client connected');
  // إضافة منطق معالجة الاتصالات هنا
});


const path = require("path"); // استدعاء مكتبة path
const bodyParser = require("body-parser");
const cron = require("node-cron");
const port = 3000;
const bcrypt = require("bcryptjs"); // مكتبه تشفير الباسورد المرسل الى قاعده البيانات
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static("public")); // تحميل جميع الملفات في مجلد 'public' > لملفات الـ CSS والجافا سكريبت
app.set("views", path.join(__dirname, "views")); // تعيين المجلد 'views' كمجلد للقوالب

app.set("view engine", "ejs"); // تعيين محرك العرض لـ EJS


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
    sameSite: "lax", // أو 'strict' لضمان إرسال ملف تعريف الارتباط فقط عبر الطلبات من نفس الأصل
    cookie: { maxAge: 1000 * 60 * 30 }, // مدة صلاحية الجلسة (60 دقائق)
  })
);

// Middleware للتحقق من صلاحية الجلسة
app.use((req, res, next) => {
  if (!req.session) {
    return next(); // لا يوجد جلسة، انتقل إلى الوسيط التالي
  }

  // التحقق من انتهاء مدة صلاحية الجلسة
  if (req.session.cookie._expires && Date.now() > req.session.cookie._expires) {

    req.session.destroy((err) => {
      if (err) {
        console.error('Failed to destroy session:', err);
      }
      // يمكنك توجيه المستخدم لتسجيل الدخول مرة أخرى أو اتخاذ إجراءات أخرى
      res.redirect('/login'); // على سبيل المثال، إعادة التوجيه إلى صفحة تسجيل الدخول
    });
  } else {
    next(); // الجلسة لا تزال صالحة، انتقل إلى الوسيط التالي
  }
});
// تأكد من أن الخادم يعمل



//! lazem el code da to7to ba3d tahy2t el session
const routes = require("./routes/routes");
app.use("/", routes);

// Start the server


//#endregion End / App-Started

//#region cron

//#region Cron Functions
async function check_last_activity_fn() {
  // احسب الوقت الحالي
  const now = new Date();

  // احسب وقت الحد الفاصل (5 دقائق)
  const sessionTime = new Date(now.getTime() - 1000 * 60 * 30);

  try {
    // قم بتنفيذ استعلام SQL باستخدام `db.none`
    await db.none(
      `
      UPDATE users
      SET is_active = false
      WHERE last_activity < $1;
  `,
      [sessionTime]
    );
    console.log(
      `Users updated based on last_activity older than ${sessionTime}`
    );
  } catch (error) {
    console.error("Error cron check_last_activity_fn:", error.message);
  }
}

//#endregion End Cron Functions

//#region cron schedule
// جدول المهمة لتعمل كل 5 دقائق
cron.schedule("*/5 * * * *", async () => {
  //الكود دا يعنى ان الكود سيتم تنفيذه اذا كانت القيمه تقبل القسمه على خمسه بغض النظر اذ كان شهر يوم ساعه  دقيقه
  check_last_activity_fn();
  io.emit('ozkrAllah', { Alzekr: 'اذكر الله'});
});



//#endregionEnd - cron schedule

//#endregion end cron

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
      return res.json({
        success: false,
        message:
          "Invalid input detected due to prohibited characters. Please review your input and try again.",
      });
    }

    //* start --------------------------------------------------

    //2: get Today
    let today = new Date().toISOString().split("T")[0];

    let query = `SELECT * FROM users WHERE TRIM(user_name) = $1`;
    let rows = await db.any(query, [posted_elements.username_Input]);

    if (rows.length > 0) {
      const password_DB = rows[0].user_password;
      const password_Input = posted_elements.password_Input;
      const isMatch = await bcrypt.compare(password_Input, password_DB);
      const is_active = rows[0].is_active;
      if (is_active) {
        let currentId = parseInt(rows[0].id)
        // io.emit('active_user', { username: posted_elements.username_Input });
        // console.log(`thisi is currentId = ${currentId} typeof ${typeof(currentId)}`);
        await khorogFawry(req,currentId)
        return res.json({
          success: false, // العمليه فشلت
          type : 'khorogFawary',
          message_ar: ` هذا الحساب نشط بالفعل ..رجاء المحاولة بعد قليل `,
          message_en: "this user is already active Please try again after minutes",
        });
      }

      if (isMatch) {
        
        if(rows[0].is_try_hack && rows[0].is_try_hack === true){
          req.session.destroy();
          return res.json({
            success: false, // العمليه فشلت
            message_ar: "هذا الحساب تم تجميده من قبل : برجاء التواصل مع الاداره",
          });
        }

        if(rows[0].is_stop && rows[0].is_stop === true){
          req.session.destroy();
          return res.json({
            success: false, // العمليه فشلت
            message_ar: "هذا الحساب تم ايقافه من قبل مدير النظام : برجاء التواصل مع الاداره",
          });
        }
        //!4.1.1: Start new session
        const forwardedIpsStr = req.headers['x-forwarded-for'];
        let ipAddress;
        if (forwardedIpsStr) {
          // السلسلة يمكن أن تحتوي على عدة عناوين مفصولة بفاصلة، خذ أول عنوان
          const forwardedIps = forwardedIpsStr.split(',');
          ipAddress = forwardedIps[0].trim();
        } else {
          // إذا لم يكن الرأس موجودًا، استخدم العنوان من socket
          ipAddress = req.socket.remoteAddress;
        }
       
        req.session.isLoggedIn = true; // active session
        req.session.ipAddress = ipAddress; // get IP 
        req.session.userId = parseInt(rows[0].id);
        req.session.username = rows[0].user_name; // على سبيل المثال، يمكنك تخزين اسم المستخدم
        req.session.userFullName = rows[0].user_full_name; // على سبيل المثال، يمكنك تخزين اسم المستخدم
        req.session.owner_id = rows[0].owner_id;
        req.session.is_owner = rows[0].is_owner;

        let query = `UPDATE users SET is_active = true WHERE id = $1`;
        await db.any(query, [req.session.userId]);

        res.json({
          // الرد على ال فرونت انت اند
          success: true, // معناه ان العمليه نجحت لو فشلت هتبقا فالس
          message_ar: `Welcome back, ${req.session.username}!`, // دى الرساله الى هتروح للعميل
          user_id: parseInt(rows[0].id),
          username: rows[0].user_name,
          user_full_name: rows[0].user_full_name,
          is_owner: rows[0].is_owner,
        });

        last_activity(req);
      } else {
        //4.2.1: send response to front with some data
        res.json({
          success: false, // العمليه فشلت
          message_ar: "Invalid username or password",
        });
      }
    } else {
      res.json({
        success: false,
        message_ar: "Invalid username or password",
      });
    }
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({
      success: false,
      message_ar: "Login Error",
    });
  }
});

// Endpoint for user logout
app.get("/Logout", async (req, res) => {
  try {
    //! sql injection check
    const hasBadSymbols = sql_anti_injection([
      req.session.userId,
      // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
    ]);
    if (hasBadSymbols) {
      return res.json({
        success: false,
        message:
          "Invalid input detected due to prohibited characters. Please review your input and try again.",
      });
    }

    //* start-----------------------------------
    // // تحقق من وجود userId في الجلسة
    // if (!req.session.userId) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "User not logged in"
    //   });
    // }

    let query = `UPDATE users SET is_active = false WHERE id = $1`;
    await db.none(query, [req.session.userId]);
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
  try {
    const owner = req.session.is_owner;
    if (owner) {
      return true;
    } else {
      const permissions = await db.any(
        `select general_permission, ${secendary_permission} from user_company where user_id = $1 AND company_id = $2`,
        [req.session.userId, req.session.company_id]
      );
      const X1 = permissions[0].general_permission;
      const X2 = permissions[0][secendary_permission];
      switch (perm_type) {
        case "view":
          if (X1 > 1 || X2 > 0) {
            return true;
          } else {
            res.json({
              success: false,
              message: "عفوًا لا تملك صلاحية العرض",
            });
            return false;
          }
        case "add":
          if (X1 > 2 || X2 > 1) {
            return true;
          } else {
            res.json({
              success: false,
              message: "عفوًا لا تملك صلاحية الاضافة",
            });
            return false;
          }
        case "update":
          if (X1 > 3 || X2 > 2) {
            return true;
          } else {
            res.json({
              success: false,
              message: "عفوًا لا تملك صلاحية التعديل",
            });
            return false;
          }
        case "delete":
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
    }
  } catch (err) {
    console.error("Error permission Templet:", err);
    res.status(500).send("Error:");
  }
}

// get new id ( table foreign Key)
async function newId_fn(tableName) {
  // قم بتنفيذ الاستعلام للحصول على الحد الأقصى من القيم الموجودة
  const query = await db.any(`SELECT MAX(id) AS id FROM ${tableName}`);

  // افتراض أن الحد الأقصى للقيمة الأولية هو 1 إذا لم يكن هناك أي سجلات
  let result = 1;

  // تحقق مما إذا كان `query` فارغًا أو إذا لم يكن هناك قيمة في `query[0].id`
  if (query && query.length > 0 && query[0].id !== null) {
    result = parseInt(query[0].id) + 1;
  }

  // ارجع `result`
  return result;
}

// last activity
async function last_activity(req) {
  await db.none(
    `
    UPDATE users
    SET last_activity = NOW(), last_activity_ip = $1
    WHERE id = $2
`,[
  req.session.ipAddress,
  req.session.userId]
  );
}

// sql injection
function sql_anti_injection(values) {
  // تحقق من كل قيمة في المصفوفة
  for (let value of values) {
    // إذا كانت القيمة سلسلة نصية
    if (typeof value === "string") {
      // قم بإزالة المسافات الزائدة وتعقيمها
      // وتحقق من وجود رموز ضارة
      if (value.trim().match(/['";$%&<>]/)) {
        return true; // عثر على رمز ضار
      }
    }
  }
  return false; // لا يوجد رموز ضارة
}


//#region stop_hackers

async function block_user(req, code){
  try {
      //!block user
  let query0 = `update users set is_try_hack = $1 , hack_code_reason = $2, is_active = false WHERE owner_id =$3 AND id = $4`;
  await db.none(query0, [
    true,
    code,
    req.session.owner_id,
    req.session.userId]);

    //! block owner
    let query1 = `update owners set is_try_hack = $1 WHERE id =$2`;
    await db.none(query1, [
      true,
      req.session.owner_id,
      ]);

      await khorogFawry(req,req.session.userId)
      await last_activity(req);

      //! destroy session
      if(req.session){
      req.session.destroy()
      }
  } catch (error) {
    console.error("Error block_user:", error);
  }
}

  //#region codes reason
    /*
    
    */
  //#endregion
//#endregion


//#region khorogFawry

async function khorogFawry(req,userId) {
  let query00 = `UPDATE users SET is_active = false WHERE id = $1`;
  await db.none(query00, [userId]);
  io.emit('khorogFawry', { x1: userId});
  if(req.session){
    req.session.destroy()
    }
}


//#endregion
//#endregion End- Templets

//*-- PAGES ---------------------------------------------

//#region owners_and_companies

//#region 1:- companies view
app.get("/get_companies_data", async (req, res) => {
  try {
    //! Permission
    // await permissions(req, 'bread_permission', 'view');
    // if (!permissions) { return; };

    //* Start--------------------------------------------------------------

    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");
    const owner = req.session.is_owner;
    let query1;
    let rows;

    if (owner) {
      query1 = `select 
      id as company_id,
      company_name as company_name
      from companies uc 
      where owner_id = $1
      order BY company_name asc;
  `;
      rows = await db.any(query1, [req.session.owner_id]);
    } else {
      query1 = `select 
      uc.company_id,
      c.company_name
      from user_company uc 
      left join companies c on uc.company_id  = c.id
      where uc.user_id = $1
      order BY c.company_name asc;
  `;
      rows = await db.any(query1, [req.session.userId]);
    }

    const data = rows.map((row) => ({
      company_id: row.company_id,
      company_name: row.company_name,
    }));

    res.json(data);
  } catch (err) {
    console.error("Error get_All_bread_Data:", err);
    res.status(500).send("Error:");
  }
});
//#endregion End - companies view

//#region 2:- add new company
app.post("/api/add_new_company", async (req, res) => {
  try {
    const posted_elements = req.body;

        //! owner
        if (req.session.is_owner !== true){
          await block_user(req,'auuwc1')
          return res.json({
            success: false,
            xx: true,
            message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
          });
        }


    //! sql injection check
    const hasBadSymbols = sql_anti_injection([
      posted_elements.company_name_input_value,
      // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
    ]);
    if (hasBadSymbols) {
      return res.json({
        success: false,
        message:
          "Invalid input detected due to prohibited characters. Please review your input and try again.",
      });
    }
    //* Start--------------------------------------------------------------

    // check if company name already exist

    let query0 = `
    select company_name from companies c where owner_id =$1 and company_name = $2
  `;
    let rows = await db.any(query0, [
      req.session.owner_id,
      posted_elements.company_name_input_value,
    ]);

    if (rows.length > 0) {
      console.log(`start`);
      res.json({
        success: false,
        message_ar: "اسم الشركه موجود بالفعل",
      });
    } else {
      const newId = await newId_fn("companies");

      let query = `
      INSERT INTO companies (id, owner_id, company_name)
      VALUES ($1, $2, $3)
    `;
      await db.none(query, [
        newId,
        req.session.owner_id,
        posted_elements.company_name_input_value,
      ]);
      //4: send a response to frontend about success transaction
      res.json({
        success: true,
        message_ar: " تم اضافه الشركه الجديده بنجاح : سيتم تحديث الصفحه الان",
      });
    }

    //3: insert data into db
  } catch (error) {
    console.error("Error adding production:", error);
    // send a response to frontend about fail transaction
    res.status(500).json({
      success: false,
      message_ar: "حدث خطأ أثناء اضافة الشركه الجديده وتم الغاء العمليه",
    });
  }
});
//#endregion

//#region 2:- company Login
app.post("/company_login", async (req, res) => {
  try {
    const posted_elements = req.body;
    //! Permission
    // await permissions(req, 'bread_permission', 'view');
    // if (!permissions) { return; };

    //! sql injection check
    const hasBadSymbols = sql_anti_injection([
      posted_elements.c_id,
      // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
    ]);
    if (hasBadSymbols) {
      return res.json({
        success: false,
        message:
          "Invalid input detected due to prohibited characters. Please review your input and try again.",
      });
    }
    //* Start--------------------------------------------------------------

    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");
    let query1;
    let rows;
    const is_owner = req.session.is_owner;
    if (is_owner && is_owner === true) {
      query1 = `select company_name from companies c
      where id = $1 AND owner_id = $2`;
      rows = await db.any(query1, [posted_elements.c_id, req.session.owner_id]);

      if (rows.length > 0) {
        req.session.company_id = parseInt(posted_elements.c_id);

        const data = rows.map((row) => ({
          company_id: posted_elements.c_id,
          company_name: rows[0].company_name,
        }));
        res.json(data);
      } else {
        res.json({
          success: false,
          message: "حدث خطأ اثناء معالجه البيانات ",
        });
      }
    } else {
      query1 = `select 
    c.company_name,
    uc.*

    from user_company uc 
    left join companies c on uc.company_id  = c.id
    where uc.user_id = $1 and uc.company_id = $2
    order BY c.company_name asc;
  `;
      rows = await db.any(query1, [req.session.userId, posted_elements.c_id]);

      if (rows.length > 0) {
        // save user &  company Permissions in session
        req.session.company_id = rows[0].company_id;
        req.session.general_permission = rows[0].general_permission;
        req.session.accounts_permission = rows[0].accounts_permission;
        req.session.employees_permission = rows[0].employees_permission;
        req.session.attendance_permission = rows[0].attendance_permission;
        req.session.users_permission = rows[0].users_permission;
        req.session.production_permission = rows[0].production_permission;
        req.session.bread_permission = rows[0].bread_permission;

        const data = rows.map((row) => ({
          company_id: rows[0].company_id,
          company_name: rows[0].company_name,
          general_permission: rows[0].general_permission,
          employees_permission: rows[0].employees_permission,
          attendance_permission: rows[0].attendance_permission,
          users_permission: rows[0].users_permission,
          production_permission: rows[0].production_permission,
          bread_permission: rows[0].bread_permission,
          accounts_permission: rows[0].accounts_permission,
        }));
        res.json(data);
      } else {
        res.json({
          success: false,
          message: "حدث خطأ اثناء معالجه البيانات ",
        });
      }
    }
  } catch (err) {
    console.error("Error get_All_bread_Data:", err);
    res.status(500).send("Error:");
  }
});
//#endregion

//#region 4:- get companies_data
app.post("/api/get_companies_users", async (req, res) => {
  try {
    const posted_elements = req.body;
    //! Permission
    // await permissions(req, 'bread_permission', 'view');
    // if (!permissions) { return; };

    //! sql injection check
    const hasBadSymbols = sql_anti_injection([
      posted_elements.new_user,
      // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
    ]);
    if (hasBadSymbols) {
      return res.json({
        success: false,
        message_ar:
          "Invalid input detected due to prohibited characters. Please review your input and try again.",
      });
    }
    //* Start--------------------------------------------------------------

    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");
    let query1;
    let rows;
    const is_owner = req.session.is_owner;
    if (is_owner && is_owner === true) {
      query1 = `select id, company_name from companies c
      where owner_id = $1`;
      rows = await db.any(query1, [req.session.owner_id]);

      const data = rows.map((row) => ({
        wazn: row.wazn,
        amount: row.amount,
      }));

      if (rows.length > 0) {
        const data = rows.map((row) => ({
          company_id: row.id,
          company_name: row.company_name,
        }));
        res.json(data);
      } else {
        res.json({
          success_ar: false,
          message: "حدث خطأ اثناء معالجه البيانات ",
        });
      }
    }
  } catch (err) {
    console.error("Error get_All_bread_Data:", err);
    res.status(500).send("Error:");
  }
});
//#endregion

//#region 5:- save new user
app.post("/api/save_new_user", async (req, res) => {
  try {
    const posted_elements = req.body;

        //! owner
        if (req.session.is_owner !== true){
          await block_user(req,'auuwc1')
          return res.json({
            success: false,
            xx: true,
            message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
          });
        }


    //! Permission
    // await permissions(req, 'bread_permission', 'view');
    // if (!permissions) { return; };
    //! sql injection check
    let hasBadSymbols = sql_anti_injection([
      ...posted_elements.dataArray.map((obj) => obj.N1 + obj.N2), // تحويل كل عنصر في dataArray إلى سلسلة نصية ودمجها معاً
      posted_elements.user_name_input,
      posted_elements.pass_input1,
      posted_elements.user_fullName_input,
      posted_elements.x,
      // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
    ]);
    if (hasBadSymbols) {
      return res.json({
        success: false,
        message_ar:
          "Invalid input detected due to prohibited characters. Please review your input and try again.",
      });
    }

        //! Security hacking 
        let query01 = `SELECT id from companies where owner_id = $1`;
        let rows01 = await db.any(query01, [
          req.session.owner_id
        ]);
    
        const deafult_companies_array = rows01.map((row) => parseInt(row.id));
        const dataArray = posted_elements.dataArray.map((item) => parseInt(item.N1));
        const defrenceArray = dataArray.filter((companyId) => !deafult_companies_array.includes(companyId));
        
        if (defrenceArray.length > 0){
          await block_user(req,'auuwc')
          return res.json({
            success: false,
            xx: true,
            message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
          });
        }
    //* Start--------------------------------------------------------------

    //* if no company selected
    if (
      posted_elements.x !== true &&
      parseInt(posted_elements.dataArray.length) < 1
    ) {
      return res.json({
        success: false,
        message_ar: "من فضلك برجاء تحديد الاعمال التجاره المخصصه للمستخدم",
      });
    }

    let query = `SELECT TRIM(user_name) FROM users WHERE owner_id =$1 AND TRIM(user_name) = $2`;
    let rows = await db.any(query, [
      req.session.owner_id,
      posted_elements.user_name_input,
      posted_elements.user_fullName_input,
    ]);

    if (rows.length > 0) {
      // اذا حصل على نتائج
      return res.json({
        success: false,
        message_ar: "اسم المستخدم موجود بالفعل",
      });
    } else {
      await db.tx(async (tx) => {
        //! تشفير كلمة المرور قبل إدخالها في قاعدة البيانات
        const pass_input1 = await bcrypt.hash(posted_elements.pass_input1, 12);
        //3: insert data into db
        const newUserId = await newId_fn("users");
        let query = `INSERT into users (id, user_name, user_password, user_full_name, is_active, owner_id, is_owner, datex) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
        await tx.none(query, [
          newUserId,
          posted_elements.user_name_input,
          pass_input1,
          posted_elements.user_fullName_input,
          false,
          req.session.owner_id,
          posted_elements.x,
          posted_elements.today,
        ]);

        if (
          posted_elements.x !== true &&
          parseInt(posted_elements.dataArray.length) > 0
        ) {
          for (const element of posted_elements.dataArray) {
            let query2 = `INSERT INTO user_company
                                (user_id, company_id)
                                VALUES($1, $2);`;

            await tx.none(query2, [newUserId, element.N1]);
          }
        }
      });
      //4: send a response to frontend about success transaction
      res.json({
        success: true,
        message_ar: " تم حفظ المستخدم بنجاح - سيتم تنشيط الصفحه",
      });
      last_activity(req);
    }
    // تنفيذ معاملة قاعدة البيانات
  } catch (error) {
    console.error("Error adding user:", error);

    // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
    return res.json({
      success: false,
      message_ar: "حدث خطأ أثناء معالجة البيانات وتم إلغاء العملية",
    });
  }
});

//#endregion

//#region 6:- update user
app.post("/api/update_user_with_companies", async (req, res) => {
  try {

    //! owner
    if (req.session.is_owner !== true){
      await block_user(req,'auuwc1')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }
    const posted_elements = req.body;
    //! Permission
    // await permissions(req, 'bread_permission', 'view');
    // if (!permissions) { return; };
    //! sql injection check
    let hasBadSymbols = sql_anti_injection([
      ...posted_elements.dataArray.map((obj) => obj.N1 + obj.N2), // تحويل كل عنصر في dataArray إلى سلسلة نصية ودمجها معاً
      posted_elements.selectedUser,
      posted_elements.stop_user_status,
      posted_elements.user_name_input,
      posted_elements.is_chang_pass,
      posted_elements.pass_input1,
      posted_elements.user_fullName_input,
      posted_elements.x,
      // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
    ]);
    if (hasBadSymbols) {
      return res.json({
        success: false,
        message_ar:
          "Invalid input detected due to prohibited characters. Please review your input and try again.",
      });
    }
    //* Start--------------------------------------------------------------

    //! main check for hack

    let query0 = `SELECT id FROM users WHERE owner_id =$1`;
    let rows0 = await db.any(query0, [req.session.owner_id]);
    if (rows0.length === 0) {
      await block_user(req,'auuwc')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }
    
    //! Security hacking 
    let query01 = `SELECT id from companies where owner_id = $1`;
    let rows01 = await db.any(query01, [
      req.session.owner_id
    ]);

    const deafult_companies_array = rows01.map((row) => parseInt(row.id));
    const dataArray = posted_elements.dataArray.map((item) => parseInt(item.N1));
    const defrenceArray = dataArray.filter((companyId) => !deafult_companies_array.includes(companyId));
    
    if (defrenceArray.length > 0){
      await block_user(req,'auuwc')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }

      if (posted_elements.delete_user && posted_elements.delete_user === true){
        await db.tx(async (tx) => {
          let queryD1 = `DELETE from user_company where user_id = $1`
          await tx.none(queryD1,[
            posted_elements.selectedUser
          ])

          let queryD2 = `DELETE from users where owner_id = $1 AND id = $2`
          await tx.none(queryD2,[
            parseInt(req.session.owner_id),
            posted_elements.selectedUser
          ])

        })
        return res.json({
          success: true,
          message_ar: " تم حذف المستخدم بنجاح : سيتم تحديث الصفحه ",
        });
      }
    //get all user_company data to check
    let query00 = `SELECT company_id from user_company where user_id = $1`;
    let rows00 = await db.any(query00, [posted_elements.selectedUser]);

    // قائمة الـ company_id من rows00
    const rows00Array = rows00.map((row) => parseInt(row.company_id));


    // data exist in dataArray and dosn't  exist in rows00Array
    const addArray = dataArray.filter(item => !rows00Array.includes(item));;

    // data exist in rows00Array and dosn't  exist in dataArray
    const deleteArray = rows00Array.filter(row => !dataArray.includes(row));

 
    //* if no company selected
    if (
      posted_elements.x !== true &&
      parseInt(posted_elements.dataArray.length) < 1
    ) {
      return res.json({
        success: false,
        message_ar: "من فضلك برجاء تحديد الاعمال التجاره المخصصه للمستخدم",
      });
    }


    let query7 = `SELECT TRIM(user_name) FROM users WHERE owner_id = $1 AND TRIM(user_name) = $2 AND id != $3`;
    let rows = await db.any(query7, [
      req.session.owner_id,
      posted_elements.user_name_input,
      posted_elements.selectedUser
    ]);

    if (rows.length > 0) {
      // اذا حصل على نتائج
      return res.json({
        success: false,
        message_ar: "اسم المستخدم موجود بالفعل",
      });
    } else {
      await db.tx(async (tx) => {
        //! تشفير كلمة المرور قبل إدخالها في قاعدة البيانات
        let query0;
        const is_chang_pass = posted_elements.is_chang_pass;
        if (is_chang_pass && is_chang_pass === true) {
          const pass_input1 = await bcrypt.hash(posted_elements.pass_input1,12);
          query0 = `UPDATE users SET user_name= $1, user_password = $2, user_full_name = $3, is_stop = $4, is_owner = $5 WHERE id= $6 And owner_id = $7`;
          await tx.none(query0, [
            posted_elements.user_name_input,
            pass_input1,
            posted_elements.user_fullName_input,
            posted_elements.stop_user_status,
            posted_elements.x,
            posted_elements.selectedUser,
            req.session.owner_id,
          ]);
        } else {
          query0 = `UPDATE users SET user_name= $1, user_full_name = $2, is_stop = $3, is_owner = $4 WHERE id= $5 And owner_id = $6`;
          await tx.none(query0, [
            posted_elements.user_name_input,
            posted_elements.user_fullName_input,
            posted_elements.stop_user_status,
            posted_elements.x,
            posted_elements.selectedUser,
            req.session.owner_id,
          ]);
        }

        if (posted_elements.x === true) {
          let query = `delete from user_company where user_id = $1`;
          await tx.none(query, [
            posted_elements.selectedUser
          ]);
        } else {
          //! insert new_companies
          for (const element of addArray) {
            let query5 = `INSERT INTO user_company
                                (user_id, company_id)
                                VALUES($1, $2);`;

            await tx.none(query5, [posted_elements.selectedUser, element]);
          }
          //! delete deleted companies
          for (const element of deleteArray) {
            let query6 = `DELETE FROM user_company WHERE user_id = $1 and company_id = $2`;

            await tx.none(query6, [posted_elements.selectedUser, element]);
          }
        }
      });
      //4: send a response to frontend about success transaction
      res.json({
        success: true,
        message_ar: " تم تحديث بيانات المستخدم بنجاح - سيتم تنشيط الصفحه",
      });
      last_activity(req);
    }
    // تنفيذ معاملة قاعدة البيانات
  } catch (error) {
    console.error("Error adding user:", error);

    // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
    return res.json({
      success: false,
      message_ar: "حدث خطأ أثناء معالجة البيانات وتم إلغاء العملية",
    });
  }
});

//#endregion

//#region 7:- get users for update
app.get("/get_All_users_Data_companies", async (req, res) => {
  try {
    //! check Permission
    // permissions(req, 'users_permission', 'view');
    // if (!permissions) {
    //   return;
    // };

    //*----------------------------------------------------------------

    let query = `select
    uc.user_id as id,
    u.user_name as user_name
    
    from user_company uc
    left join users u on uc.user_id = u.id
    where uc.company_id = $1
    order by user_name ASC`;
    let rows = await db.any(query, [req.session.company_id]);

    
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
//#endregion

//#region 8:- get users info for update
app.post("/get_info_for_updateUser", async (req, res) => {
  try {
    const posted_elements = req.body;
    //! Permission
    // await permissions(req, "Users_permission", "view");
    // if (!permissions) {
    //   return;
    // }

    const owner = req.session.is_owner;
    if (owner !== true) {
      return res.json({
        success: false,
        message_ar: "Sorry,you  can't use this featue",
      });
    }

    //! sql injection check
    const hasBadSymbols = sql_anti_injection([
      posted_elements.selectedUser,
      // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
    ]);
    if (hasBadSymbols) {
      return res.json({
        success: false,
        message_ar:
          "Invalid input detected due to prohibited characters. Please review your input and try again.",
      });
    }

    //* Start--------------------------------------------------------------
    //1: receive data from frontend new_employee_ar.

    //2: validation data befor inserting to db
    // const rows = await db.any("SELECT * FROM users WHERE id = $1", [
    //   posted_elements.user_id,
    // ]);

    let user_owner_permission = false;
    let rows1 = [];
    let rows2 = [];
    let rows3 = [];
    await db.tx(async (tx) => {
      let query1 = `select user_name, user_full_name, is_owner, is_stop from users u 
      where id = $1`;
      rows1 = await tx.any(query1, [posted_elements.selectedUser]);

      if (rows1.length > 0 && rows1[0].is_owner === true) {
        user_owner_permission = true;
      } else {
        user_owner_permission = false;
      }

      if (user_owner_permission === false) {
        let query2 = `select uc.company_id as n1,
        c.company_name as n2
        from user_company uc 
        left join companies c on uc.company_id = c.id
        where owner_id = $1 AND user_id = $2
        `;
        rows2 = await tx.any(query2, [
          req.session.owner_id,
          posted_elements.selectedUser,
        ]);
      }

      let query3 = `select id as n1,company_name as n2
      from companies c 
      where owner_id = $1`;
      rows3 = await tx.any(query3, [req.session.owner_id]);

      console.table(rows3);

      // قائمة لتخزين الـ company_id الموجودة في rows2
      const companyIds = rows2.map((row) => row.n1);
      // تصفية rows3 باستخدام filter()
      rows3 = rows3.filter((row) => !companyIds.includes(row.n1));
    });
    return res.json({
      success: true,
      message_ar: "data get success",
      is_user_owner: user_owner_permission,
      user_info: rows1,
      included_companies: rows2,
      not_included_companies: rows3,
    });
  } catch (error) {
    console.error("Error get users data:", error.message);
    res.status(500).json({
      success: false,
      message: "حدث خطأ معالجة البيانات",
    });
  }
});
//#endregion
//#endregion  END - owners_and_companies

//#region users

// review  users data
app.get("/get_All_users_Data", async (req, res) => {
  try {
    //! check Permission
    permissions(req, "users_permission", "view");
    if (!permissions) {
      return;
    }

  

    //*----------------------------------------------------------------

    let query = `select uc.user_id, u.user_full_name as user_name
    from user_company uc
    left join users u on uc.user_id = u.id 
    where uc.company_id  = $1`;
    let rows = await db.any(query, [req.session.company_id]);

    // const rows = await db.any("SELECT id, user_name  FROM users");
    const data = rows.map((row) => ({
      id: row.user_id,
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
    await permissions(req, "Users_permission", "add");
    if (!permissions) {
      return;
    }

    let general_permission = parseInt(req.session.general_permission);
    if (!general_permission || general_permission !== 6) {
      return res.json({
        success: false,
        message_ar: "Sorry,you  can't use this featue",
      });
    }

    //! sql injection check
    const hasBadSymbols = sql_anti_injection([
      posted_elements.user_name_input,
      posted_elements.pass_input1,
      posted_elements.general_permission_select,
      posted_elements.table_permission_users,
      posted_elements.table_permission_employee,
      posted_elements.table_permission_attendance,
      posted_elements.table_permission_production,
      posted_elements.today,
      // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
    ]);
    if (hasBadSymbols) {
      return res.json({
        success: false,
        message_ar:
          "Invalid input detected due to prohibited characters. Please review your input and try again.",
      });
    }

    //* Start--------------------------------------------------------------

    //1: receive data from frontend new_employee_ar.

    //2: validation data befor inserting to db
    // const rows = await db.any(
    //   "SELECT TRIM(user_name) FROM users WHERE TRIM(user_name) = $1",
    //   [posted_elements.user_name_input]
    // );

    let query = `SELECT TRIM(user_name) FROM users WHERE TRIM(user_name) = $1`;
    let rows = await db.any(query, [posted_elements.user_name_input]);

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
      const newId = await newId_fn("users");

      let query = `INSERT into users (id, user_name, user_password, general_permission, users_permission, employees_permission, attendance_permission, production_permission, bread_permission, datex) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
      await db.none(query, [
        newId,
        posted_elements.user_name_input,
        pass_input1,
        posted_elements.general_permission_select,
        posted_elements.table_permission_users,
        posted_elements.table_permission_employee,
        posted_elements.table_permission_attendance,
        posted_elements.table_permission_production,
        posted_elements.table_permission_bread,
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
    console.error("Error adding new user:", error.message);
    // send a response to frontend about fail transaction
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء اضافة المستخدم",
    });
  }
});

// update user
app.post("/updateUser", async (req, res) => {
  try {
    const posted_elements = req.body;
    //! Permission
    await permissions(req, "Users_permission", "view");
    if (!permissions) {
      return;
    }


    if(req.session.is_owner && req.session.is_owner !== true){
      let general_permission = parseInt(req.session.general_permission);
      if (!general_permission || general_permission !== 6) {
       
        return res.json({
          success: false,
          message_ar: "Sorry,you  can't use this featue",
        });
      }
  
    }

    //! sql injection check
    const hasBadSymbols = sql_anti_injection([
      posted_elements.user_id,
      // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
    ]);
    if (hasBadSymbols) {
      return res.json({
        success: false,
        message_ar:"Invalid input detected due to prohibited characters. Please review your input and try again.",
      });
    }

    //! check id
    let query0 = `SELECT id FROM users WHERE owner_id = $1 AND id = $2`;
    let rows0 = await db.any(query0, [
      req.session.owner_id,
      posted_elements.user_id
    ]);
    if (rows0.length === 0) {
      await block_user(req,'uu1')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }

    //* Start--------------------------------------------------------------
    //1: receive data from frontend new_employee_ar.

    //2: validation data befor inserting to db
    // const rows = await db.any("SELECT * FROM users WHERE id = $1", [
    //   posted_elements.user_id,
    // ]);

    let query = `SELECT uc.*,
    u.user_full_name,
    u.is_stop
    from user_company uc 
    left join users u on uc.user_id = u.id  
    WHERE uc.company_id = $1 AND uc.user_id = $2`;
    let rows = await db.any(query, [
      req.session.company_id,
      posted_elements.user_id,
    ]);

    if (rows.length > 0) {
      // اذا حصل على نتائج
      return res.json({
        success: true,
        message_ar: "data get success",
        rows: rows,
      });
    } else {
      return res.json({
        success: false,
        message_ar: "Faild to get user data from server",
      });
    }
  } catch (error) {
    console.error("Error get employee data:", error);
    res.status(500).json({
      success: false,
      message_ar: "حدث خطأ أثناء اضافة  الموظف",
    });
  }
});

app.post("/update_User_from_user_update_ar", async (req, res) => {
  try {
    const posted_elements = await req.body;

    //! Permission
    
    await permissions(req, "Users_permission", "update");
    if (!permissions) {
      return;
    }

    // let general_permission = parseInt(req.session.general_permission);
    // if (!general_permission || general_permission !== 6) {
    //   return res.json({
    //     success: false,
    //     message: "Sorry,you  can't use this featue",
    //   });
    // }

    //! sql injection check
    const hasBadSymbols = sql_anti_injection([
      posted_elements.user_id,
      posted_elements.general_permission_select,
      posted_elements.table_permission_users,
      posted_elements.table_permission_employee,
      posted_elements.table_permission_attendance,
      posted_elements.table_permission_production,
      posted_elements.today,
      // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
    ]);
    if (hasBadSymbols) {
      return res.json({
        success: false,
        message:
          "Invalid input detected due to prohibited characters. Please review your input and try again.",
      });
    }

    //* Start--------------------------------------------------------------

    if (parseInt(posted_elements.user_id) === 1) {
      return res.json({
        success: false,
        message: "لا يمكن التعديل على هذا المستخدم",
      });
    }

    //! check hacking 
    let query0 = `SELECT id FROM users WHERE owner_id =$1`;
    let rows0 = await db.any(query0, [req.session.owner_id]);
    if (rows0.length === 0) {
      await block_user(req,'auuwc')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }

    //2: validation data befor inserting to db
    // const rows = await db.any("SELECT user_name FROM users WHERE user_name = $1 and id != $2 ", [
    //   posted_elements.user_name_input,
    //   posted_elements.user_id,
    // ]);


      // updqte data depending on newPassword_Condition
     
        // فى حالة تعديل البيانات شامله  كلمة مرور جديده
       
        let query1 = `Update user_company set general_permission = $1, users_permission = $2, employees_permission = $3, attendance_permission = $4, production_permission = $5, bread_permission = $6 WHERE user_id = $7 AND company_id = $8`;
        await db.any(query1, [
          posted_elements.general_permission_select,
          posted_elements.table_permission_users,
          posted_elements.table_permission_employee,
          posted_elements.table_permission_attendance,
          posted_elements.table_permission_production,
          posted_elements.table_permission_bread,
          posted_elements.user_id,
          req.session.company_id
        ]);

        return res.json({
          success: true,
          message_ar: "تم تعديل بيانات المستخدم بنجاح",
        });
      
    
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({
      success: false,
      message_ar: "حدث خطأ أثناء تعديل بيانات المستخدم ",
    });
  }
});

// Delete_user
app.post("/delete_User_from_user_update_ar", async (req, res) => {
  try {
    const posted_elements = req.body;

    //! Permission
    await permissions(req, "Users_permission", "delete");
    if (!permissions) {
      return;
    }

    let general_permission = parseInt(req.session.general_permission);
    if (!general_permission || general_permission !== 6) {
      return res.json({
        success: false,
        message: "Sorry,you  can't use this featue",
      });
    }

    //! sql injection check
    const hasBadSymbols = sql_anti_injection([
      posted_elements.user_id,
      // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
    ]);
    if (hasBadSymbols) {
      return res.json({
        success: false,
        message:
          "Invalid input detected due to prohibited characters. Please review your input and try again.",
      });
    }

    //* Start--------------------------------------------------------------

    //3: insert data into db
    // const rows = await db.none("DELETE FROM users WHERE id = $1", [
    //   posted_elements.user_id,
    // ]);

    let query = `DELETE FROM users WHERE id = $1`;
    await db.none(query, [posted_elements.user_id]);

    return res.json({
      success: true,
      message:
        "تم حذف بيانات المستخدم بنجاح : سيتم توجيهك الى صفحه المستخدمين الرئيسية",
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

//#region Page : employees

// Add new employee
app.post("/addNewEmployee", async (req, res) => {
  try {
        // إرسال رسالة إلى العميل عبر WebSocket
        io.emit('blockUser', { userId: req.session.userId });
        console.log(`done`);
    const posted_elements = req.body;

    //! Permission
    await permissions(req, "employees_permission", "add");
    if (!permissions) {
      return;
    }

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
      posted_elements.employee_leave_date_input,
      // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
    ]);
    if (hasBadSymbols) {
      return res.json({
        success: false,
        message:
          "Invalid input detected due to prohibited characters. Please review your input and try again.",
      });
    }
    //* Start--------------------------------------------------------------

    //2: validation data befor inserting to db
    // const rows = await db.any(
    //   "SELECT TRIM(employee_name) FROM employees WHERE TRIM(employee_name) = $1",
    //   [posted_elements.employee_name_input]
    // );

    let X = `SELECT TRIM(employee_name) FROM employees 
              WHERE company_id = $1 AND TRIM(employee_name) = $2
              `;
    let rows = await db.any(X, [
      req.session.company_id,
      posted_elements.employee_name_input,
    ]);

    if (rows.length > 0) {
      // اذا حصل على نتائج
      return res.json({ success: false, message: "اسم الموظف موجود بالفعل" });
    }

    //3: insert data into db
    const newId = await newId_fn("employees");

    let query = `
  INSERT INTO employees (id, employee_name, datex, emp_job, emp_beta2a, emp_adress, emp_personal_phone, emp_emergency_phone, emp_start_date, emp_end_date, company_id)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
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
      posted_elements.employee_leave_date_input,
      req.session.company_id,
    ]);

    //4: send a response to frontend about success transaction
    res.json({
      success: true,
      message_ar: "تم حفظ الموظف بنجاح",
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

// update Employee
app.post("/updateEmployee", async (req, res) => {
  try {
    //! Permission
    await permissions(req, "employees_permission", "view");
    if (!permissions) {
      return;
    }

    const posted_elements = req.body;

    //! sql injection check
    const hasBadSymbols = sql_anti_injection([
      posted_elements.employee_id,
      // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
    ]);
    if (hasBadSymbols) {
      return res.json({
        success: false,
        message:
          "Invalid input detected due to prohibited characters. Please review your input and try again.",
      });
    }

    //* Start--------------------------------------------------------------

    //2: validation data befor inserting to db
    // const rows = await db.any("SELECT * FROM employees WHERE id = $1", [
    //   posted_elements.employee_id,
    // ]);
    let query = `SELECT * FROM employees 
    WHERE company_id = $1 AND id = $2
    `;
    let rows = await db.any(query, [
      req.session.company_id,
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
      message: "حدث خطأ أثناء معالجة البيانات",
    });
  }
});

// update_Employee
app.post("/update_employee", async (req, res) => {
  try {
    //! Permission
    await permissions(req, "employees_permission", "update");
    if (!permissions) {
      return;
    }

    const posted_elements = req.body;

    //! sql injection check
    const hasBadSymbols = sql_anti_injection([
      posted_elements.employee_name_input,
      posted_elements.employee_job_input,
      // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
    ]);
    if (hasBadSymbols) {
      return res.json({
        success: false,
        message:
          "Invalid input detected due to prohibited characters. Please review your input and try again.",
      });
    }

    //* Start--------------------------------------------------------------

    //1: receive data from frontend new_employee_ar.

    //2: validation data befor inserting to db
    // const rows = await db.any(
    //   "SELECT TRIM(employee_name) FROM employees WHERE TRIM(employee_name) = $1 AND id != $2",
    //   [posted_elements.employee_name_input, posted_elements.employee_id]
    // );

    let query1 = `SELECT TRIM(employee_name) FROM employees 
    WHERE company_id = $1 AND TRIM(employee_name) = $2 AND id != $2
     `;
    let rows = await db.any(query1, [
      req.session.company_id,
      posted_elements.employee_name_input,
      posted_elements.employee_id,
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

      let query2 = `UPDATE employees SET employee_name = $1, datex = $2, emp_job = $3, emp_beta2a = $4, emp_adress = $5, emp_personal_phone = $6, emp_emergency_phone = $7, emp_start_date = $8, emp_end_date = $9 where company_id = $10 AND id = $11`;
      await db.none(query2, [
        posted_elements.employee_name_input,
        posted_elements.today,
        posted_elements.employee_job_input,
        posted_elements.employee_beta2a_input,
        posted_elements.employee_adress_input,
        posted_elements.employee_phone_input,
        posted_elements.employee_emergency_phone_input,
        posted_elements.employee_start_date_input,
        posted_elements.employee_leave_date_input,
        req.session.company_id,
        posted_elements.employee_id,
      ]);

      return res.json({
        success: true,
        message:
          "تم تعديل البيانات : سيتم تحويلك الان الى صفحه الموظفين الرئيسيه",
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
    await permissions(req, "employees_permission", "delete");
    if (!permissions) {
      return;
    }

    const posted_elements = req.body;
    //! sql injection check
    const hasBadSymbols = sql_anti_injection([
      posted_elements.employee_id,
      // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
    ]);
    if (hasBadSymbols) {
      return res.json({
        success: false,
        message:
          "Invalid input detected due to prohibited characters. Please review your input and try again.",
      });
    }

    //* Start--------------------------------------------------------------

    //3: insert data into db
    // await db.none("DELETE FROM employees WHERE id = $1", [
    //   posted_elements.employee_id,
    // ]);

    let query1 = `DELETE FROM employees WHERE company_id = $1 AND id = $2`;
    await db.none(query1, [
      req.session.company_id,
      posted_elements.employee_id,
    ]);

    return res.json({
      success: true,
      message:
        "تم حذف بيانات الموظف : سيتم تحويلك الان الى صفحه الموظفين الرئيسيه",
    });
  } catch (error) {
    console.error("Error get employee data:", error.message);
    res.status(500).json({
      success: false,
      message:
        "لا يمكن حذف الموظف : قد تكون هناك عمليات مرتبطه بالموظف يجب حذفها اولا",
    });
  }
});

//_______________________________________________

// get all d employees data
app.get("/get_All_Employees_Data", async (req, res) => {
  try {
    //! Permission
    await permissions(req, "employees_permission", "view");
    if (!permissions) {
      return;
    }

    //* Start--------------------------------------------------------------

    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");

    console.log(req.session.company_id);
    let query1 = `SELECT e.id, e.employee_name FROM employees e
    WHERE e.company_id = $1`;
    let rows = await db.any(query1, [req.session.company_id]);

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

//#region 1: Add attendance_add
app.post("/attendance_add", async (req, res) => {
  try {
    //! Permission
    await permissions(req, "attendance_permission", "add");
    if (!permissions) {
      return;
    }

    const posted_elements = req.body;

    //! sql injection check
    const hasBadSymbols = sql_anti_injection([
      posted_elements.id_hidden_input,
      posted_elements.date_input,
      posted_elements.days_input,
      posted_elements.hours_inpu,
      posted_elements.values_input,
      posted_elements.note_inpute,
      // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
    ]);
    if (hasBadSymbols) {
      return res.json({
        success: false,
        message:
          "Invalid input detected due to prohibited characters. Please review your input and try again.",
      });
    }
    //* Start--------------------------------------------------------------

    //3: insert data into db
    const newId = await newId_fn("attendance");

    let query1 = `INSERT INTO attendance (id, employee_id, datex, days, hours, values, note, company_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    await db.none(query1, [
      newId,
      posted_elements.id_hidden_input,
      posted_elements.date_input,
      posted_elements.days_input,
      posted_elements.hours_inpu,
      posted_elements.values_input,
      posted_elements.note_inpute,
      req.session.company_id,
    ]);

    //4: send a response to frontend about success transaction
    res.json({
      success: true,
      message: "تم حفظ البيانات بنجاح",
    });
  } catch (error) {
    console.error("Error adding attendance:", error.message);
    // send a response to frontend about fail transaction
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء الاضافه",
    });
  }
});
//#endregion END - Add attendance_add

//#region 2: get data to fill dropdownbox of employees
app.get("/getEmployeesData1", async (req, res) => {
  try {
    //! Permission
    await permissions(req, "attendance_permission", "view");
    if (!permissions) {
      return;
    }

    //* Start--------------------------------------------------------------
    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");

    let query1 = `SELECT e.id, e.employee_name FROM employees e where e.company_id = $1`;
    let rows = await db.any(query1, [req.session.company_id]);

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
//#endregion

//#region 3: get data for review tables
app.get("/get_All_attendance_Data", async (req, res) => {
  try {
    //! Permission
    await permissions(req, "attendance_permission", "view");
    if (!permissions) {
      return;
    }

    //* Start--------------------------------------------------------------
    // const rows =
    //   await db.any(`SELECT A.id, A.employee_id, E.employee_name, A.note, A.datex, A.last_update
    //     FROM Attendance A
    //     LEFT JOIN  employees E on A.employee_id = E.id
    //     ORDER BY A.datex DESC`);

    let query1 = `SELECT A.id, A.employee_id, E.employee_name, A.days, A.hours, A.values, A.note, A.datex, A.last_update
          FROM Attendance A
          LEFT JOIN  employees E on A.employee_id = E.id
          where A.company_id = $1
          ORDER BY A.datex DESC`;
    let rows = await db.any(query1, [req.session.company_id]);

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
  } catch (error) {
    console.error("Error getEmployeesData1:", error.message);
    res
      .status(500)
      .json({ success: false, message: "حدث خطأ أثناء عرض البيانات" });
  }
});
//#endregion

//#region 4: update attendance
app.post("/updateattendance", async (req, res) => {
  try {
    const posted_elements = req.body;

    //! Permission
    await permissions(req, "attendance_permission", "view");
    if (!permissions) {
      return;
    }

    //! sql injection check
    const hasBadSymbols = sql_anti_injection([
      posted_elements.attendance_id,
      // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
    ]);
    if (hasBadSymbols) {
      return res.json({
        success: false,
        message:
          "Invalid input detected due to prohibited characters. Please review your input and try again.",
      });
    }

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
      where A.company_id = $1 AND A.id=$2 
      ORDER BY A.datex DESC`;
    let rows = await db.any(query1, [
      req.session.company_id,
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
    console.error("Error updateattendance:", error.message);
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء تحميل البيانات",
    });
  }
});
//#endregion

//#region 5: Update Attendance data
app.post("/attendance_update", async (req, res) => {
  try {
    const posted_elements = req.body;
    //! Permission
    await permissions(req, "attendance_permission", "update");
    if (!permissions) {
      return;
    }

    //! sql injection check
    const hasBadSymbols = sql_anti_injection([
      posted_elements.id_hidden_input,
      posted_elements.date_input,
      posted_elements.days_input,
      posted_elements.hours_inpu,
      posted_elements.values_input,
      posted_elements.note_inpute,
      posted_elements.attendance_id,
      // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
    ]);
    if (hasBadSymbols) {
      return res.json({
        success: false,
        message:
          "Invalid input detected due to prohibited characters. Please review your input and try again.",
      });
    }

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

    let query1 = `UPDATE attendance SET employee_id = $1, datex = $2, days = $3, hours = $4, values = $5, note = $6 where company_id = $7 AND id = $8`;
    await db.none(query1, [
      posted_elements.id_hidden_input,
      posted_elements.date_input,
      posted_elements.days_input,
      posted_elements.hours_inpu,
      posted_elements.values_input,
      posted_elements.note_inpute,
      req.session.company_id,
      posted_elements.attendance_id,
    ]);

    return res.json({
      success: true,
      message:
        "تم تعديل البيانات : سيتم تحويلك الان الى صفحه المؤثرات الرئيسيه",
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
//#endregion

//#region 6: Delete attatendace
app.post("/attendance_delete", async (req, res) => {
  try {
    const posted_elements = req.body;
    //! Permission
    await permissions(req, "attendance_permission", "delete");
    if (!permissions) {
      return;
    }

    //! sql injection check
    const hasBadSymbols = sql_anti_injection([
      posted_elements.attendance_id,
      // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
    ]);
    if (hasBadSymbols) {
      return res.json({
        success: false,
        message:
          "Invalid input detected due to prohibited characters. Please review your input and try again.",
      });
    }

    //* Start--------------------------------------------------------------

    //3: insert data into db
    // await db.none("DELETE FROM attendance WHERE id = $1", [
    //   posted_elements.attendance_id,
    // ]);

    let query1 = `DELETE FROM attendance WHERE company_id = $1 AND id = $2`;
    await db.none(query1, [
      req.session.company_id,
      posted_elements.attendance_id,
    ]);

    return res.json({
      success: true,
      message:
        "تم حذف البيانات بنجاح : سيتم تحويلك الان الى صفحه المؤثرات الرئيسيه",
    });
  } catch (error) {
    console.error("Error get employee data:", error.message);
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء حذف ",
    });
  }
});

//#endregion
//#endregion END - attendance

//#region production

app.post("/production_add_ar", async (req, res) => {
  try {
    const posted_elements = req.body;

    //! Permission
    await permissions(req, "production_permission", "add");
    if (!permissions) {
      return;
    }

    //! sql injection check
    const hasBadSymbols = sql_anti_injection([
      posted_elements.production_amount_input,
      posted_elements.sales_amount_input,
      posted_elements.note1_input,
      posted_elements.date1,
      posted_elements.today,
      // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
    ]);
    if (hasBadSymbols) {
      return res.json({
        success: false,
        message:
          "Invalid input detected due to prohibited characters. Please review your input and try again.",
      });
    }
    //* Start--------------------------------------------------------------

    //3: insert data into db
    const newId = await newId_fn("production");

    let query = `
  INSERT INTO production (id, datex, procution_amount, sales_amount, note, company_id)
  VALUES ($1, $2, $3, $4, $5, $6)
`;
    await db.none(query, [
      newId,
      posted_elements.date1,
      posted_elements.production_amount_input,
      posted_elements.sales_amount_input,
      posted_elements.note1_input,
      req.session.company_id,
    ]);

    //4: send a response to frontend about success transaction
    res.json({
      success: true,
      message: "تم حفظ البيانات بنجاح",
    });
  } catch (error) {
    console.error("Error adding production:", error);
    // send a response to frontend about fail transaction
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء اضافة البيانات",
    });
  }
});

// get all production data
app.get("/get_All_production_Data", async (req, res) => {
  try {
    //! Permission
    await permissions(req, "production_permission", "view");
    if (!permissions) {
      return;
    }

    //* Start--------------------------------------------------------------

    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");

    let query1 = `SELECT
    id,
    datex,
    note,
    procution_amount,
    sales_amount,
    SUM(procution_amount - sales_amount) OVER (ORDER BY datex ASC, id ASC) AS cumulative_balance
FROM
    production
 WHERE
 company_id = $1   
ORDER BY
    datex DESC, id DESC;
;`;
    let rows = await db.any(query1, [req.session.company_id]);

    const data = rows.map((row) => ({
      id: row.id,
      datex: row.datex,
      note: row.note,
      procution_amount: row.procution_amount,
      sales_amount: row.sales_amount,
      cumulative_balance: row.cumulative_balance,
    }));

    res.json(data);
  } catch (err) {
    console.error("Error fetching data:", err.message);
    res.status(500).send("Error: getEmployeesData");
  }
});

// update production
app.post("/production_update_ar", async (req, res) => {
  try {
    //! Permission
    await permissions(req, "production_permission", "update");
    if (!permissions) {
      return;
    }

    const posted_elements = req.body;

    //! sql injection check
    const hasBadSymbols = sql_anti_injection([
      posted_elements.id_input,
      posted_elements.production_amount_input,
      posted_elements.sales_amount_input,
      posted_elements.note1_input,
      posted_elements.date1,
      posted_elements.today,
      // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
    ]);
    if (hasBadSymbols) {
      return res.json({
        success: false,
        message:
          "Invalid input detected due to prohibited characters. Please review your input and try again.",
      });
    }

    //* Start--------------------------------------------------------------

    let query2 = `UPDATE production
        SET datex = $1,
        procution_amount = $2,
        sales_amount = $3,
        note = $4
        where company_id = $5 AND id = $6`;
    await db.none(query2, [
      posted_elements.date1,
      posted_elements.production_amount_input,
      posted_elements.sales_amount_input,
      posted_elements.note1_input,
      req.session.company_id,
      posted_elements.id_input,
    ]);

    return res.json({
      success: true,
      message: "تم تعديل البيانات : سيتم تحويلك الان الى صفحه الجرد الرئيسيه",
    });
  } catch (error) {
    console.error("Error production_update_ar", error);
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء تعديل البيانات",
    });
  }
});

// Delete Production
app.post("/delete_production", async (req, res) => {
  try {
    //! Permission
    await permissions(req, "production_permission", "delete");
    if (!permissions) {
      return;
    }

    const posted_elements = req.body;
    //! sql injection check
    const hasBadSymbols = sql_anti_injection([
      posted_elements.id,
      // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
    ]);
    if (hasBadSymbols) {
      return res.json({
        success: false,
        message:
          "Invalid input detected due to prohibited characters. Please review your input and try again.",
      });
    }

    //* Start--------------------------------------------------------------

    //3: insert data into db
    // await db.none("DELETE FROM employees WHERE id = $1", [
    //   posted_elements.employee_id,
    // ]);

    let query1 = `DELETE FROM production WHERE company_id = $1 AND id = $2`;
    await db.none(query1, [req.session.company_id, posted_elements.id]);

    return res.json({
      success: true,
      message:
        "تم حذف البيانات بنجاح : سيتم تحويلك الان الى صفحه الجرد والانتاج الرئيسيه",
    });
  } catch (error) {
    console.error("Error get employee data:", error.message);
    res.status(500).json({
      success: false,
      message: "حدث خطأ اثناء حذف البيانات",
    });
  }
});
//#endregion END- production

//#region  bread

//#region 1: bread_review
app.get("/get_All_bread_Data", async (req, res) => {
  try {
    //! Permission
    await permissions(req, "bread_permission", "view");
    if (!permissions) {
      return;
    }

    //* Start--------------------------------------------------------------

    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");

    let query1 = `SELECT
    h.id AS h_id, 
    h.datex, 
    h.vendor_id, 
    v.vendore_name, 
    SUM(b.wazn) AS total_wazn, 
    SUM(b.amount) AS total_amount
FROM bread_header AS h
left JOIN vendors AS v ON h.vendor_id = v.id
INNER JOIN bread_body AS b ON h.id = b.bread_header_id
where h.company_id = $1
GROUP BY h.id, h.datex, h.vendor_id, v.vendore_name
ORDER BY h.datex DESC, h.id DESC;
`;
    let rows = await db.any(query1, [req.session.company_id]);

    const data = rows.map((row) => ({
      id: row.h_id,
      datex: row.datex,
      vendor_id: row.vendor_id,
      vendore_name: row.vendore_name,
      wazn: row.total_wazn,
      amount: row.total_amount,
    }));

    res.json(data);
  } catch (err) {
    console.error("Error get_All_bread_Data:", err);
    res.status(500).send("Error:");
  }
});
//#endregion

//#region 2: add_bread
app.post("/api/bread_add", async (req, res) => {
  const posted_elements = req.body;

  try {
    const newId_bread_header = await newId_fn("bread_header");

    // تنفيذ معاملة قاعدة البيانات
    await db.tx(async (tx) => {
      let query1 = `INSERT INTO bread_header
                    (id, datex, vendor_id, company_id)
                    VALUES($1, $2, $3, $4);`;

      await tx.none(query1, [
        newId_bread_header,
        posted_elements.datex,
        posted_elements.vendore_id,
        req.session.company_id,
      ]);

      let newId_bread_body = await newId_fn("bread_body");

      for (const element of posted_elements.posted_array) {
        const newId = parseInt(newId_bread_body);
        let query2 = `INSERT INTO bread_body
                      (id, bread_header_id, wazn, amount)
                      VALUES($1, $2, $3, $4);`;

        await tx.none(query2, [
          newId,
          newId_bread_header,
          element.wazn,
          element.amount,
        ]);

        newId_bread_body = parseInt(newId_bread_body) + 1;
      }
    });

    // إذا تم تنفيذ جميع الاستعلامات بنجاح
    return res.json({
      success: true,
      message_ar: "تم الحفظ بنجاح",
    });
  } catch (error) {
    console.error("Error adding account:", error);

    // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
    return res.json({
      success: false,
      message_ar: "حدث خطأ أثناء عملية الحفظ وتم إلغاء العملية",
    });
  }
});

//#endregion

//#region 3: get_bread_Data_for_update_page

app.post("/get_bread_Data_for_update_page", async (req, res) => {
  try {
    const posted_elements = req.body;
    //! Permission
    await permissions(req, "bread_permission", "update");
    if (!permissions) {
      return;
    }

    //* Start--------------------------------------------------------------

    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");

    let query1 = `SELECT
    wazn, 
    amount
FROM bread_body
WHERE bread_header_id = $1 ;`;
    let rows = await db.any(query1, [posted_elements.h_id]);

    const data = rows.map((row) => ({
      wazn: row.wazn,
      amount: row.amount,
    }));

    res.json(data);
  } catch (err) {
    console.error("Error get_bread_Data_for_update_page:", err);
    res.status(500).send("Error:");
  }
});

//#endregion

//#region 4: /api/bread_update
//! Update code
app.post("/api/bread_update", async (req, res) => {
  try {
    const posted_elements = req.body;
    await db.tx(async (tx) => {
      // delete data from body as a first stip

      let query0 = `DELETE FROM bread_body
    WHERE bread_header_id = $1;`;

      await tx.none(query0, [posted_elements.h_id]);

      // add data
      const newId_bread_header = await newId_fn("bread_header");

      // تنفيذ معاملة قاعدة البيانات

      let query1 = `INSERT INTO bread_header
                    (id, datex, vendor_id, company_id)
                    VALUES($1, $2, $3, $4);`;

      await tx.none(query1, [
        newId_bread_header,
        posted_elements.datex,
        posted_elements.vendore_id,
        req.session.company_id,
      ]);

      let newId_bread_body = await newId_fn("bread_body");

      for (const element of posted_elements.posted_array) {
        const newId = parseInt(newId_bread_body);
        let query2 = `INSERT INTO bread_body
                      (id, bread_header_id, wazn, amount)
                      VALUES($1, $2, $3, $4);`;

        await tx.none(query2, [
          newId,
          newId_bread_header,
          element.wazn,
          element.amount,
        ]);

        newId_bread_body = parseInt(newId_bread_body) + 1;
      }
    });

    // إذا تم تنفيذ جميع الاستعلامات بنجاح
    return res.json({
      success: true,
      message_ar: "تم التعديل بنجاح",
    });
  } catch (error) {
    console.error("Error adding account:", error);

    // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
    return res.json({
      success: false,
      message_ar: "حدث خطأ أثناء عملية التحديث وتم إلغاء العملية",
    });
  }
});

//#endregion

//#region 5: /api/bread_delete
//! Delete code
app.post("/api/bread_delete", async (req, res) => {
  //! Permission
  await permissions(req, "bread_permission", "delete");
  if (!permissions) {
    return;
  }

  //* Start--------------------------------------------------------------

  try {
    const posted_elements = req.body;
    await db.tx(async (tx) => {
      // delete data from body as a first stip

      let query0 = `DELETE FROM bread_body
WHERE bread_header_id = $1;`;

      await tx.none(query0, [posted_elements.h_id]);

      let query1 = `DELETE FROM bread_header
                WHERE company_id = $1 AND id = $2;`;

      await tx.none(query1, [req.session.company_id, posted_elements.h_id]);
    });

    // إذا تم تنفيذ جميع الاستعلامات بنجاح
    return res.json({
      success: true,
      message_ar: "تم الحذف بنجاح",
    });
  } catch (error) {
    console.error("Error adding account:", error);

    // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
    return res.json({
      success: false,
      message_ar: "حدث خطأ أثناء عملية الحذف وتم إلغاء العملية",
    });
  }
});
//#endregion

//#endregion end - update bread

//#region report attendance
app.post("/report_attendance", async (req, res) => {
  try {
    const posted_elements = req.body;
    //! Permission
    await permissions(req, "attendance_permission", "view");
    if (!permissions) {
      return;
    }

    //! sql injection check
    const hasBadSymbols = sql_anti_injection([
      posted_elements.report_type,
      posted_elements.employee_id,
      posted_elements.month,
      posted_elements.year,
      // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
    ]);
    if (hasBadSymbols) {
      return res.json({
        success: false,
        message:
          "Invalid input detected due to prohibited characters. Please review your input and try again.",
      });
    }

    //* Start--------------------------------------------------------------

    if (posted_elements.report_type === 2) {
      let query1 = `SELECT
      e.id As employee_id,
      e.employee_name,
      SUM(a.days) AS total_days,
      SUM(a.hours) AS total_hours,
      SUM(a.values) AS total_values
    FROM attendance a
    LEFT JOIN employees e ON e.id = a.employee_id
    WHERE
      a.company_id = $1
      AND EXTRACT(MONTH FROM to_date(a.datex, 'YYYY-MM-DD')) = $2
      AND EXTRACT(YEAR FROM to_date(a.datex, 'YYYY-MM-DD')) = $3
    GROUP BY e.employee_name, e.id
    ORDER BY e.employee_name ASC`;
      let rows = await db.any(query1, [
        req.session.company_id,
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
    } else {
      // فى حاله الموظف الفردى عندما يكون نوع التقرير 1

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
      a.company_id = $1
      AND a.employee_id = $2
      AND EXTRACT(MONTH FROM to_date(a.datex, 'YYYY-MM-DD')) = $3
      AND EXTRACT(YEAR FROM to_date(a.datex, 'YYYY-MM-DD')) = $4
    ORDER BY a.datex DESC, e.employee_name ASC;`;
      let rows = await db.any(query1, [
        req.session.company_id,
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
      }
    }
  } catch (error) {
    console.error("Error report_attendance:", error.message);
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء تحميل البيانات",
    });
  }
});

//#endregion

//#region  Accounts

app.get("/api/tree", async (req, res) => {
  try {
    let query1 = `
    SELECT h1.id AS account_id,
           h1.account_name AS account_name,
           h1.is_final_account AS is_final_account,
           h1.account_no as account_no,
           h1.finance_statement as finance_statement,
           h1.cashflow_statement as cashflow_statement,
           h1.starting_balance_value as starting_balance_value,
           h1.starting_balance_type as starting_balance_type,
           h1.can_be_deleted as can_be_deleted,
           h1.is_main_acc as is_main_acc,
            h2.id AS parent_id,
            h2.account_name AS parent_name
    FROM accounts_header h1
    where h1.company_id = $1
    LEFT JOIN accounts_body b ON h1.id = b.account_id
    LEFT JOIN accounts_header h2 ON b.parent_id = h2.id;`;

    // استعلام SQL لجلب بيانات الشجرة
    let treeData = await db.any(query1, [req.session.company_id]);
    res.json(treeData);
  } catch (error) {
    console.error("Error fetching tree data:", error);
    res.status(500).send("Server Error");
  }
});

// contextmenu / add new node
app.post("/api/add-account", async (req, res) => {
  const posted_elements = req.body;

  try {
    //#region validation

    //check account

    //#endregion end- validation

    // تنفيذ معاملة قاعدة البيانات
    await db.tx(async (tx) => {
      // أدخل into accounts_header
      let new_account_id = await newId_fn("accounts_header");
      let query1 = `INSERT INTO accounts_header (id, account_name, account_no, is_final_account, finance_statement, cashflow_statement, starting_balance_value, starting_balance_type, can_be_deleted, company_id)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
      await tx.none(query1, [
        new_account_id,
        posted_elements.account_name,
        posted_elements.account_no,
        posted_elements.is_final_account,
        posted_elements.statment_type_value,
        posted_elements.cash_flow_statement_value,
        posted_elements.starting_balance_value,
        posted_elements.starting_balance_type,
        true,
        req.session.company_id,
      ]);

      // أدخل into accounts_body
      let new_id = await newId_fn("accounts_body");
      let query2 = `INSERT INTO accounts_body (id, parent_id, account_id)
                        VALUES ($1, $2, $3)`;
      await tx.none(query2, [
        new_id,
        posted_elements.account_parent_name_id,
        new_account_id,
      ]);
    });

    // إذا تم تنفيذ جميع الاستعلامات بنجاح
    return res.json({
      success: true,
      message_ar: "تم إضافة الحساب بنجاح",
    });
  } catch (error) {
    console.error("Error adding account:", error);
    // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
    return res.json({
      success: false, // العملية فشلت
      message_ar: "حدث خطأ أثناء عملية الإضافة وتم إلغاء العملية",
    });
  }
});

// contextmenu / update new node
app.post("/api/update-account", async (req, res) => {
  const posted_elements = req.body;

  try {
    // تنفيذ معاملة قاعدة البيانات
    await db.tx(async (tx) => {
      // أدخل into accounts_header
      // let new_account_id = await newId_fn('accounts_header');

      let query1 = `UPDATE accounts_header SET 
          account_name = $1,
          account_no = $2,
          finance_statement = $3,
          cashflow_statement = $4,
          starting_balance_value = $5,
          starting_balance_type = $6,
          WHERE company_id = $7 AND id = $8`;
      await tx.none(query1, [
        posted_elements.account_name,
        posted_elements.account_no,
        posted_elements.statment_type_value,
        posted_elements.cash_flow_statement_value,
        posted_elements.starting_balance_value,
        posted_elements.starting_balance_type,
        req.session.company_id,
        posted_elements.account_id,
      ]);
    });

    // إذا تم تنفيذ جميع الاستعلامات بنجاح
    return res.json({
      success: true,
      message_ar: "تم تعديل الحساب بنجاح",
    });
  } catch (error) {
    console.error("Error adding account:", error);
    // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
    return res.json({
      success: false, // العملية فشلت
      message_ar: "حدث خطأ أثناء عملية التعديل وتم إلغاء العملية",
    });
  }
});

// مسار لمعالجة طلبات حذف الحساب
app.post("/api/delete-account", async (req, res) => {
  try {
    const { account_id } = req.body;

    // تحقق مما إذا كان يمكن حذف العقدة (قد تحتاج إلى التحقق من وجود عقد فرعية أولاً)
    const query1 =
      "SELECT COUNT(*) as count FROM accounts_body WHERE parent_id = $1";
    const rows = await db.any(query1, [account_id]);

    // تحقق من أن النتيجة ليست فارغة وأنها تحتوي على القيمة المطلوبة
    if (rows.length > 0 && rows[0].count > 0) {
      // لا يمكن حذف العقدة لأن لديها عقد فرعية
      return res.json({
        success: false,
        message_ar: "لا يمكن حذف الحساب المحدد لوجود حسابات فرعيه بداخليه",
        message_en: "Cannot delete account with sub-accounts",
      });
    }

    // حذف العقدة من قاعدة البيانات
    const deleteQuery =
      "DELETE FROM accounts_header WHERE company_id = $1 AND id = $2";
    await db.none(deleteQuery, [req.session.company_id, account_id]);

    // إرسال استجابة نجاح إلى العميل
    return res.json({
      success: true,
      message_ar: "تم حذف الحساب بنجاح",
      message_en: "Account deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting account:", error);
    // إرسال استجابة خطأ إلى العميل
    return res.json({
      success: false,
      message_ar: "لا يمكن حذف الحساب لوجود حسابات فرعيه بداخله",
      message_en: "Can't delete this account with sub-accounts in it",
    });
  }
});

// dnd / drag and drop changes
app.post("/api/update-account-parent", async (req, res) => {
  try {
    const { account_id, new_parent_id } = req.body; // جلب معلومات العقدة المراد تعديلها

    // تحديث الأب الخاص بالعقدة في قاعدة البيانات
    const updateQuery = `
          UPDATE accounts_body
          SET parent_id = $1
          WHERE account_id = $2;
      `;
    await db.query(updateQuery, [new_parent_id, account_id]);

    // إرسال استجابة نجاح إلى العميل
    res.status(200).send("Parent updated successfully");
  } catch (error) {
    console.error("Error updating parent:", error);
    // إرسال خطأ إلى العميل
    res.status(500).send("Failed to update parent");
  }
});

//#endregion

//*-- server----------------------------------------------
//#region started server functions

//! 1: put all is_active to false for all users
async function make_all_users_is_active_to_false() {
  // we use this function in the begining of server start
  await db.none(`UPDATE users SET is_active = false`);
}
//#endregion End - sstarted server functions

//******************************************************************** */

server.listen(port, () => {
  console.log(`server is runing on http://localhost:${port}`);

  //! اوامر تنفذ مبشره بعد تشغيل السيرفر
  make_all_users_is_active_to_false();
});
