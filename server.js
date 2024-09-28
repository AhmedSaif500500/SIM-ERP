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
const { log, table, error } = require("console");
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
    console.error("Error connecting to the database:", error); // في حالة الفشل
    console.log(`check the internet or database connection`);
    
    process.exit();
  });

// ! Lazem el code da yt7t Befor routes definition
const session_time = 30
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
    cookie: { maxAge: 1000 * 60 * session_time }, // مدة صلاحية الجلسة (60 دقائق)
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
const { truncate } = require('fs');
app.use("/", routes);

// Start the server


//#endregion End / App-Started

//#region cron

//#region Cron Functions
async function check_last_activity_fn() {
  // احسب الوقت الحالي

  
  const now = new Date();

  // احسب وقت الحد الفاصل (5 دقائق)
  const sessionTime = new Date(now.getTime() - 1000 * 60 * session_time);

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
    console.error("Error cron check_last_activity_fn:", error);
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

//#region global variables
const is_forbidden_adding_branches = [1, 2, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 8, 19, 20, 21, 22, 23];
const is_accumulated_account = [9, 10, 11, 12, 13, 14, 15, 20];
//#endregion

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
        message_ar:
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
    console.error("Login Error:", error);
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
        message_ar:
          "Invalid input detected due to prohibited characters. Please review your input and try again.",
      });
    }

    //* start-----------------------------------
    // // تحقق من وجود userId في الجلسة
    // if (!req.session.userId) {
    //   return res.status(400).json({
    //     success: false,
    //     message_ar: "User not logged in"
    //   });
    // }

    let query = `UPDATE users SET is_active = false WHERE id = $1`;
    await db.none(query, [req.session.userId]);
    // تحديث is_active إلى false في قاعدة البيانات قبل إنهاء الجلسة
    // await db.none("UPDATE users SET is_active = false WHERE id = $1", [req.session.userId]);

    // إنهاء الجلسة
    req.session.destroy((err) => {
      if (err) {
        console.error("Logout Error:", error);
        res.status(500).json({ success: false, message_ar: "Logout Error" });
      } else {
        res.json({ success: true, message_ar: "Logout successful" });
      }
    });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ success: false, message_ar: "Logout Error" });
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
              message_ar: "عفوًا لا تملك صلاحية العرض",
            });
            return false;
          }
        case "add":
          if (X1 > 2 || X2 > 1) {
            return true;
          } else {
            res.json({
              success: false,
              message_ar: "عفوًا لا تملك صلاحية الاضافة",
            });
            return false;
          }
        case "update":
          if (X1 > 3 || X2 > 2) {
            return true;
          } else {
            res.json({
              success: false,
              message_ar: "عفوًا لا تملك صلاحية التعديل",
            });
            return false;
          }
        case "delete":
          if (X1 > 4 || X2 > 3) {
            return true;
          } else {
            res.json({
              success: false,
              message_ar: "عفوًا لا تملك صلاحية الحذف",
            });
            return false;
          }
      }
    }
  } catch (error) {
    console.error("Error permission Templet:", err);
    res.status(500).send("Error:");
  }
}

// get new id ( table foreign Key)
async function newId_fn(tableName_string,columnName_string) {
  // قم بتنفيذ الاستعلام للحصول على الحد الأقصى من القيم الموجودة
  const query = await db.any(`SELECT MAX(${columnName_string}) AS id FROM ${tableName_string}`);

  // افتراض أن الحد الأقصى للقيمة الأولية هو 1 إذا لم يكن هناك أي سجلات
  let result = 1;

  // تحقق مما إذا كان `query` فارغًا أو إذا لم يكن هناك قيمة في `query[0].id`
  if (query && query.length > 0 && query[0].id !== null) {
    result = parseInt(query[0].id) + 1;
  }

  // ارجع `result`
  return result;
}

// get new refrence
async function newRefrence_fn(req,int_transaction_type) {
  // قم بتنفيذ الاستعلام للحصول على الحد الأقصى من القيم الموجودة



  const query = `SELECT MAX(refrence) AS refrence FROM transaction_header
                  WHERE company_id = $1 AND transaction_type = ${int_transaction_type}`;
                                          
    let rows = await db.any(query, [
    req.session.owner_id,
  ]);
  // افتراض أن الحد الأقصى للقيمة الأولية هو 1 إذا لم يكن هناك أي سجلات
  let result = 1;

  // تحقق مما إذا كان `query` فارغًا أو إذا لم يكن هناك قيمة في `query[0].id`
  if (rows && rows.length > 0 && rows[0].refrence !== null) {
    result = parseInt(rows[0].refrence) + 1;
  }

  // ارجع `result`
  return result;
}

async function newReference_not_transaction(req, str_tableName, str_columnName) {
  const query = `SELECT MAX(${str_columnName}) AS refrenceCount FROM ${str_tableName} WHERE company_id = ${req.session.company_id}`;

  console.log(query);
  
  let rows = await db.oneOrNone(query);
  console.log(rows);
  
  let result = 1;

  // تحويل refrenceCount إلى عدد صحيح للتأكد من أن الشرط يعمل بشكل صحيح
  let referenceCount = parseInt(rows.refrencecount);

  if (rows && referenceCount > 0) {
    console.log(referenceCount);
    
    result = referenceCount + 1;
  }

  // ارجع `result`
  return result;
}

// last activity
async function last_activity(req) {

  try {
    await db.none(
      `
      UPDATE users
      SET last_activity = NOW(), last_activity_ip = $1
      WHERE id = $2
  `,[
    req.session.ipAddress,
    req.session.userId]
    );
  } catch (error) {
    console.error("Error last_activity:", error);
  }

}


function turn_EmptyValues_TO_null(object_Var){
  for (let key in object_Var) {
    if (object_Var[key] === "") {
      object_Var[key] = null;
    }
  }
}

// sql injection
let sql_injection_message_ar = "تم الكشف عن مدخلات غير صالحة بسبب وجود رموز ممنوعة. يرجى مراجعة المدخلات والمحاولة مرة أخرى."
let sql_injection_message_en =  "Invalid input detected due to prohibited characters. Please review your input and try again."
function sql_anti_injection(values) {
  // تحقق من كل قيمة في المصفوفة
  
  if(!values){
    return;
  }


  for (let value of Object.values(values)) {
    // إذا كانت القيمة null أو undefined أو عدد رقمي، تجاهلها
    if (value === null || value === undefined || typeof value === "number") {      
      continue; // تجاهل هذه القيمة وانتقل للقيمة التالية
    }
    
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


let InValidDateFormat_message_ar = `صيغة التاريخ غير صالحة برجاء التواصل مع احد المسؤلين`
function isInValidDateFormat(valuesAsArray) {
  try {
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

  for (const value of valuesAsArray) {
    if (!dateFormatRegex.test(value)) {
      return true; // إذا كانت الصيغة غير مطابقة
    }
  }
  return false; // كل القيم صيغتها صحيحة
} catch (error) {
  catch_error(error)
}
}

/*
const dates = ['2024-08-23', '2024-12-01', '2023-11-31']; // هنا كل الصيغ صحيحة حتى لو كانت بعض التواريخ غير منطقية
ex console.log(isValidDateFormat(dates)); 
or console.log(isValidDateFormat([date1, date2])); 
*/
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

      await last_activity(req);
      await khorogFawry(req,req.session.userId)
     

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
app.post("/get_companies_data", async (req, res) => {
  try {

    //! Permission
    // await permissions(req, 'bread_permission', 'view');
    // if (!permissions) { return; };

    //* Start--------------------------------------------------------------

    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");
    const owner = req.session.is_owner;
    let query1;
    let data;

    if (owner) {
      query1 = `select 
      id as company_id,
      company_name as company_name
      from companies uc 
      where owner_id = $1
      order BY company_name asc;
  `;
      data = await db.any(query1, [req.session.owner_id]);
    } else {
      query1 = `select 
      uc.company_id,
      c.company_name
      from user_company uc 
      left join companies c on uc.company_id  = c.id
      where uc.user_id = $1
      order BY c.company_name asc;
  `;
      data = await db.any(query1, [req.session.userId]);
    }



    res.json(data);
  } catch (error) {
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
        message_ar:
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
   
      res.json({
        success: false,
        message_ar: "اسم الشركه موجود بالفعل",
      });
    } else {


      const newCompanyId = await newId_fn("companies",'id');

      let query1 = `
      INSERT INTO companies (id, owner_id, company_name)
      VALUES ($1, $2, $3)
    `;

      const query1_parameters = [newCompanyId,req.session.owner_id,posted_elements.company_name_input_value,]


      
    await db.tx(async (tx) => {

      // 1 : add company
      await tx.none(query1,query1_parameters) 

      // 2 : add global accounts  in accounts_header
      let x = [];
      let account_header_new_id = await newId_fn("accounts_header",'id');

      const account_name = ['قائمة المركز المالى','قائمة الدخل','الاصول','الالتزمات','حقوق الملكيه','الايرادات','المصروفات','معلق','الاصول الثايتة','مجمع اهلاك الاصول الثابتة','النقدية وما فى حكمها','المخزون الحالى','العملاء','الموردين','حسابات رأس المال','الارياح المحتجزه','تكلفة المخزون','مصاريف اهلاك اصول ثابته','ايرادات المبيعات','الموظفين','مراكز التكلفه','مجموعة مراكز التكلفة 1']
      const is_final_account = [null,null,null,null,null,null,null,true,null,null,null,null,null,null,null,true,true,true,true,null,null,null]
      const finance_statement = [1,2,1,1,1,2,2,1,1,2,1,1,1,1,1,1,2,2,2,1,4,4,]
      const cashflow_statement = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
      const account_type_id = [null,null,null,null,null,1,null,null,null,null,null,5,null,null,null,1,null,6,1,4,null,null]
      const global_id = [1,2,3,4,5,5,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]
      const main_account_id = [null,null,null,null,null,null,null,3,1,2,1,1,1,2,3,3,5,5,4,2,null,null]
  

      for (let i = 0; i < account_name.length; i++) {
       
        let query = `
          INSERT INTO accounts_header (id, company_id, account_name, is_final_account, finance_statement, cashflow_statement, global_id, main_account_id, account_type_id) 
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`;

          let parameters = [account_header_new_id,newCompanyId,account_name[i],is_final_account[i],finance_statement[i],cashflow_statement[i],global_id[i],main_account_id[i],account_type_id[i]]
    
        await tx.none(query,parameters);
        x[i+1] = parseInt(account_header_new_id);
        account_header_new_id += 1;
      }
      // 3 : add global accounts in accouns_body
      let ab_new_id = await newId_fn("accounts_body",'id');
        await tx.none(`INSERT INTO accounts_body (id, parent_id, account_id) VALUES (${ab_new_id},${x[1]},${x[3]});`);
        await tx.none(`INSERT INTO accounts_body (id, parent_id, account_id) VALUES (${ab_new_id+1},${x[1]},${x[4]});`);
        await tx.none(`INSERT INTO accounts_body (id, parent_id, account_id) VALUES (${ab_new_id+2},${x[1]},${x[5]});`);
        await tx.none(`INSERT INTO accounts_body (id, parent_id, account_id) VALUES (${ab_new_id+3},${x[2]},${x[6]});`);
        await tx.none(`INSERT INTO accounts_body (id, parent_id, account_id) VALUES (${ab_new_id+4},${x[2]},${x[7]});`);
        await tx.none(`INSERT INTO accounts_body (id, parent_id, account_id) VALUES (${ab_new_id+5},${x[5]},${x[8]});`);
        await tx.none(`INSERT INTO accounts_body (id, parent_id, account_id) VALUES (${ab_new_id+6},${x[3]},${x[9]});`);
        await tx.none(`INSERT INTO accounts_body (id, parent_id, account_id) VALUES (${ab_new_id+7},${x[4]},${x[10]});`);
        await tx.none(`INSERT INTO accounts_body (id, parent_id, account_id) VALUES (${ab_new_id+8},${x[3]},${x[11]});`);
        await tx.none(`INSERT INTO accounts_body (id, parent_id, account_id) VALUES (${ab_new_id+9},${x[3]},${x[12]});`);
        await tx.none(`INSERT INTO accounts_body (id, parent_id, account_id) VALUES (${ab_new_id+10},${x[3]},${x[13]});`);
        await tx.none(`INSERT INTO accounts_body (id, parent_id, account_id) VALUES (${ab_new_id+11},${x[4]},${x[14]});`);
        await tx.none(`INSERT INTO accounts_body (id, parent_id, account_id) VALUES (${ab_new_id+12},${x[5]},${x[15]});`);
        await tx.none(`INSERT INTO accounts_body (id, parent_id, account_id) VALUES (${ab_new_id+13},${x[5]},${x[16]});`);
        await tx.none(`INSERT INTO accounts_body (id, parent_id, account_id) VALUES (${ab_new_id+14},${x[7]},${x[17]});`);
        await tx.none(`INSERT INTO accounts_body (id, parent_id, account_id) VALUES (${ab_new_id+15},${x[7]},${x[18]});`);
        await tx.none(`INSERT INTO accounts_body (id, parent_id, account_id) VALUES (${ab_new_id+16},${x[6]},${x[19]});`);
        await tx.none(`INSERT INTO accounts_body (id, parent_id, account_id) VALUES (${ab_new_id+17},${x[4]},${x[20]});`);
        await tx.none(`INSERT INTO accounts_body (id, parent_id, account_id) VALUES (${ab_new_id+18},${x[21]},${x[22]});`);

    })

    return res.json({
      success: true,
      message_ar: "تم حفظ البيانات بنجاح",
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
      query1 = `select company_name from companies c
      where id = $1 AND owner_id = $2`;
      rows = await db.any(query1, [posted_elements.c_id, req.session.owner_id]);

      
      if (rows.length > 0) {
        req.session.company_id = await parseInt(posted_elements.c_id);
        
        const data = rows.map((row) => ({
          company_id: posted_elements.c_id,
          company_name: rows[0].company_name,
        }));
        res.json(data);
      } else {
        res.json({
          success: false,
          message_ar: "حدث خطأ اثناء معالجه البيانات ",
        });
      }
    } else {

      // ----------------------- old
  //     query1 = `select 
  //   c.company_name,
  //   uc.*

  //   from user_company uc 
  //   left join companies c on uc.company_id  = c.id
  //   where uc.user_id = $1 and uc.company_id = $2
  //   order BY c.company_name asc;
  // `;
  //     rows = await db.any(query1, [req.session.userId, posted_elements.c_id]);

  //     if (rows.length > 0) {
  //       // save user &  company Permissions in session
  //       req.session.company_id = rows[0].company_id;
  //       req.session.general_permission = rows[0].general_permission;
  //       req.session.accounts_permission = rows[0].accounts_permission;
  //       req.session.employees_permission = rows[0].employees_permission;
  //       req.session.effects_permission = rows[0].effects_permission;
  //       req.session.users_permission = rows[0].users_permission;
  //       req.session.production_permission = rows[0].production_permission;
  //       req.session.bread_permission = rows[0].bread_permission;
  //       req.session.transaction_permission = rows[0].transaction_permission;

  //       const data = rows.map((row) => ({
  //         company_id: rows[0].company_id,
  //         company_name: rows[0].company_name,
  //         general_permission: rows[0].general_permission,
  //         employees_permission: rows[0].employees_permission,
  //         effects_permission: rows[0].effects_permission,
  //         users_permission: rows[0].users_permission,
  //         production_permission: rows[0].production_permission,
  //         bread_permission: rows[0].bread_permission,
  //         accounts_permission: rows[0].accounts_permission,
  //         transaction_permission: rows[0].transaction_permission,
  //       }));
  //       res.json(data);

  // end old
  // Define an array of permissions
const permissions = [
  "general_permission",
  "accounts_permission",
  "hr_permission",
  "departments_permission",
  "employees_permission",
  "effects_permission",
  "users_permission",
  "production_permission",
  "bread_permission",
  "transaction_permission",
  "items_permission",
  "customers_permission",
  "vendors_permission",
  // Add new permissions here
];

// The SQL query remains the same
const query1 = `select 
    c.company_name,
    uc.*
    from user_company uc 
    left join companies c on uc.company_id = c.id
    where uc.user_id = $1 and uc.company_id = $2
    order BY c.company_name asc;
  `;

const rows = await db.any(query1, [req.session.userId, posted_elements.c_id]);

if (rows.length > 0) {
  // Save user & company Permissions in session
  req.session.company_id = rows[0].company_id;

  // Save all permissions dynamically
  permissions.forEach(permission => {
    req.session[permission] = rows[0][permission];
  });

  // Create data array dynamically
  const data = rows.map(row => {
    let rowData = {
      company_id: row.company_id,
      company_name: row.company_name,
    };

    // Add all permissions to rowData
    permissions.forEach(permission => {
      rowData[permission] = row[permission];
    });

    return rowData;
  });

  res.json(data);

      } else {
        res.json({
          success: false,
          message_ar: "حدث خطأ اثناء معالجه البيانات ",
        });
      }
    }
  } catch (error) {
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
                message_ar: sql_injection_message_ar,
        message_en: sql_injection_message_en,
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
          message_ar: "حدث خطأ اثناء معالجه البيانات ",
        });
      }
    }
  } catch (error) {
    console.error("Error get_All_bread_Data:", err);
    res.status(500).send("Error:");
  }
});
//#endregion

//#region 5:- save new user
app.post("/api/save_new_user", async (req, res) => {
  try {
    // console.log(req.session.ipAddress);
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
                message_ar: sql_injection_message_ar,
        message_en: sql_injection_message_en,
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
        const newUserId = await newId_fn("users",'id');
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
                message_ar: sql_injection_message_ar,
        message_en: sql_injection_message_en,
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
    where u.owner_id = $1
    order by user_name ASC`;
    let data = await db.any(query, [req.session.owner_id]);

    


    res.json(data);
    last_activity(req);
  } catch (error) {
    console.error("Error get_All_users_Data ", error);
    res.status(500).json({
      success: false,
      message_ar: "حدث خطأ أثناء تحضير بيانات المستخدمين ",
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
        message_ar: sql_injection_message_ar,
        message_en: sql_injection_message_en,
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
    console.error("Error get users data:", error);
    res.status(500).json({
      success: false,
      message_ar: "حدث خطأ معالجة البيانات",
    });
  }
});
//#endregion
//#endregion  END - owners_and_companies

//#region todo

  //#region get todo data
  app.post("/get_All_todo_Data", async (req, res) => {
    try {
      const posted_elements = req.body;
      //! No permissions


      const hasBadSymbols = sql_anti_injection(...Object.values(posted_elements));

      if (hasBadSymbols) {
        return res.json({
          success: false,
          message_ar:
            "Invalid input detected due to prohibited characters. Please review your input and try again.",
        });
      }


      const InValidDateFormat = isInValidDateFormat([posted_elements.start_date,posted_elements.end_date])
      if (InValidDateFormat){
        return res.json({
          success: false,
          message_ar: InValidDateFormat_message_ar,
        });
      }
  
      //* Start--------------------------------------------------------------
  
      // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");
  
      let query1 = `
      select
        t.id,
        COALESCE(t.datex, '') as datex,
        t.is_done,
        COALESCE(t.text, '') as note
      from todo t
      where t.user_id = $1
       And company_id = $2
       AND (t.datex BETWEEN $3 AND $4 )
      ORDER BY
        t.is_done ASC, t.datex DESC, t.id DESC;
  ;`;
      let data = await db.any(query1, [
        req.session.userId,
        req.session.company_id,
        posted_elements.start_date,
        posted_elements.end_date,
      ]);
  

    
      
      res.json(data);
    } catch (error) {
      console.error("Error notes data:", error);
      res.status(500).send("Error: getting todo list");
    }
  });


  app.post("/api/todo_add", async (req, res) => {
    try {

      const posted_elements = req.body;
  
      // //! Permission
      // await permissions(req, "employees_permission", "add");
      // if (!permissions) {
      //   return;
      // }
  
      //! sql injection check
      const hasBadSymbols = sql_anti_injection([
        posted_elements.datex,
        posted_elements.note,
      ]);
      if (hasBadSymbols) {
        return res.json({
          success: false,
          message_ar:
            "Invalid input detected due to prohibited characters. Please review your input and try again.",
        });
      }
      //* Start--------------------------------------------------------------
  
  
      //3: insert data into db
      const newId = await newId_fn("todo",'id');
  
      let query = `
    INSERT INTO todo (id, user_id, datex, is_done, text, company_id)
    VALUES ($1, $2, $3, $4, $5, $6)
  `;
      await db.none(query, [
        newId,
        req.session.userId,
        posted_elements.datex,
        false,
        posted_elements.note,
        req.session.company_id,
      ]);
  
      //4: send a response to frontend about success transaction
      res.json({
        success: true,
        message_ar: "تم حفظ البيانات بنجاح",
      });
    } catch (error) {
      console.error("Error adding employee:", error);
      // send a response to frontend about fail transaction
      res.status(500).json({
        success: false,
        message_ar: "حدث خطأ أثناء معالجة البيانات",
      });
    }
  });


  app.post("/api/todo_update", async (req, res) => {
    try {

      const posted_elements = req.body;
  
      // //! Permission
      // await permissions(req, "employees_permission", "add");
      // if (!permissions) {
      //   return;
      // }
  
      //! sql injection check
      const hasBadSymbols = sql_anti_injection([
        posted_elements.id_value,
        posted_elements.datex,
        posted_elements.note,
        posted_elements.is_checked,
      ]);
      if (hasBadSymbols) {
        return res.json({
          success: false,
          message_ar:
            "Invalid input detected due to prohibited characters. Please review your input and try again.",
        });
      }
      //* Start--------------------------------------------------------------
  
      //! check if hack
      let query0 = `SELECT id FROM todo WHERE id = $1 AND user_id =$2 AND company_id = $3`;
      let rows0 = await db.any(query0, [
        posted_elements.id_value,
        req.session.userId,
        req.session.company_id,
      ]);
      if (rows0.length === 0) {
        await block_user(req,'todoBlock1')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }

  
      //3: insert data into db
    
  
      let query = `
    update todo set datex = $1, is_done = $2, text = $3
    WHERE id = $4
  `;
      await db.none(query, [
        posted_elements.datex,
        posted_elements.is_checked,
        posted_elements.note,
        posted_elements.id_value,
      ]);
  
      //4: send a response to frontend about success transaction
      res.json({
        success: true,
        message_ar: "تم تعديل البيانات بنجاح",
      });
    } catch (error) {
      console.error("Error adding employee:", error);
      // send a response to frontend about fail transaction
      res.status(500).json({
        success: false,
        message_ar: "حدث خطأ أثناء معالجة البيانات",
      });
    }
  });


  app.post("/api/todo_update_is_checked", async (req, res) => {
    try {

      const posted_elements = req.body;
  
      // //! Permission
      // await permissions(req, "employees_permission", "add");
      // if (!permissions) {
      //   return;
      // }
  
      //! sql injection check
      const hasBadSymbols = sql_anti_injection([
        posted_elements.id_value,
        posted_elements.isChecked,
      ]);
      if (hasBadSymbols) {
        return res.json({
          success: false,
          message_ar:
            "Invalid input detected due to prohibited characters. Please review your input and try again.",
        });
      }
      //* Start--------------------------------------------------------------
  
      //! check if hack
      let query0 = `SELECT id FROM todo WHERE id = $1 AND user_id =$2 AND company_id = $3`;
      let rows0 = await db.any(query0, [
        posted_elements.id_value,
        req.session.userId,
        req.session.company_id,
      ]);
      if (rows0.length === 0) {
        await block_user(req,'todoBlock2')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }

  
      //3: insert data into db
    
  
      let query = `
    update todo set is_done = $1
    WHERE id = $2
  `;
      await db.none(query, [
        posted_elements.isChecked,
        posted_elements.id_value
      ]);
  
      //4: send a response to frontend about success transaction
      res.json({
        success: true,
        message_ar: "تم تعديل البيانات بنجاح",
      });
    } catch (error) {
      console.error("Error update todo2:", error);
      // send a response to frontend about fail transaction
      res.status(500).json({
        success: false,
        message_ar: "حدث خطأ أثناء معالجة البيانات",
      });
    }
  });


  app.post("/api/todo_delete", async (req, res) => {
    try {

      const posted_elements = req.body;
  
      // //! Permission
      // await permissions(req, "employees_permission", "add");
      // if (!permissions) {
      //   return;
      // }
  
      //! sql injection check
      const hasBadSymbols = sql_anti_injection([
        posted_elements.id_value,
      ]);
      if (hasBadSymbols) {
        return res.json({
          success: false,
          message_ar:
            "Invalid input detected due to prohibited characters. Please review your input and try again.",
        });
      }
      //* Start--------------------------------------------------------------
  
      //! check if hack
      let query0 = `SELECT id FROM todo WHERE id = $1 AND user_id =$2 AND company_id = $3`;
      let rows0 = await db.any(query0, [
        posted_elements.id_value,
        req.session.userId,
        req.session.company_id,
      ]);
      if (rows0.length === 0) {
        await block_user(req,'todoBlock2')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }

  
      //3: insert data into db
    
  
      let query = `
    DELETE FROM todo WHERE id = $1
  `;
      await db.none(query, [
        posted_elements.id_value
      ]);
  
      //4: send a response to frontend about success transaction
      res.json({
        success: true,
        message_ar: "تم حذف البيانات بنجاح",
      });
    } catch (error) {
      console.error("Error update todo2:", error);
      // send a response to frontend about fail transaction
      res.status(500).json({
        success: false,
        message_ar: "حدث خطأ أثناء معالجة البيانات",
      });
    }
  });
  //#endregion

//#endregion

//#region users

// review  users data
app.post("/get_All_users_Data", async (req, res) => {
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
  } catch (error) {
    console.error("Error get_All_users_Data ", error);
    res.status(500).json({
      success: false,
      message_ar: "حدث خطأ أثناء تحضير بيانات المستخدمين ",
    });
  }
});



//     //* Start--------------------------------------------------------------

//     //1: receive data from frontend new_employee_ar.

//     //2: validation data befor inserting to db
//     // const rows = await db.any(
//     //   "SELECT TRIM(user_name) FROM users WHERE TRIM(user_name) = $1",
//     //   [posted_elements.user_name_input]
//     // );

//     let query = `SELECT TRIM(user_name) FROM users WHERE TRIM(user_name) = $1`;
//     let rows = await db.any(query, [posted_elements.user_name_input]);

//     if (rows.length > 0) {
//       // اذا حصل على نتائج
//       return res.json({
//         success: false,
//         message_ar: "اسم المستخدم موجود بالفعل",
//       });
//     } else {
//       //! تشفير كلمة المرور قبل إدخالها في قاعدة البيانات
//       const pass_input1 = await bcrypt.hash(posted_elements.pass_input1, 12);

//       //3: insert data into db
//       const newId = await newId_fn("users",'id');

//       let query = `INSERT into users (id, user_name, user_password, general_permission, users_permission, employees_permission, effects_permission, production_permission, bread_permission, transaction_permission, datex) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
//       await db.none(query, [
//         newId,
//         posted_elements.user_name_input,
//         pass_input1,
//         posted_elements.general_permission_select,
//         posted_elements.table_permission_users,
//         posted_elements.table_permission_employees,
//         posted_elements.table_permission_effects,
//         posted_elements.table_permission_production,
//         posted_elements.table_permission_bread,
//         posted_elements.table_permission_transaction,
//         posted_elements.today,
//       ]);

//       //4: send a response to frontend about success transaction
//       res.json({
//         success: true,
//         message_ar: "تم حفظ المستخدم بنجاح",
//       });
//       last_activity(req);
//     }
//   } catch (error) {
//     console.error("Error adding new user:", error);
//     // send a response to frontend about fail transaction
//     res.status(500).json({
//       success: false,
//       message_ar: "حدث خطأ أثناء اضافة المستخدم",
//     });
//   }
// });

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
    let data = await db.any(query, [
      req.session.company_id,
      posted_elements.user_id,
    ]);

    res.json(data);
    
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

    //! sql injection check
    const hasBadSymbols = sql_anti_injection(...Object.values(posted_elements));

    if (hasBadSymbols) {
      return res.json({
        success: false,
        message_ar:
          "Invalid input detected due to prohibited characters. Please review your input and try again.",
      });
    }

    turn_EmptyValues_TO_null(posted_elements);


   
    //* Start--------------------------------------------------------------

    if (parseInt(posted_elements.user_id) === 1) {
      return res.json({
        success: false,
        message_ar: "لا يمكن التعديل على هذا المستخدم",
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

       
        let query1 = `Update user_company set general_permission = $3,
                        users_permission = $4,
                        hr_permission = $5,
                        departments_permission = $6,
                        employees_permission = $7,
                        effects_permission = $8,
                        production_permission = $9,
                        bread_permission = $10,
                        transaction_permission = $11,
                        items_permission = $12,
                        customers_permission = $13,
                        vendors_permission = $14
                      WHERE user_id = $1
                        AND company_id = $2`;
        await db.any(query1, [
          posted_elements.user_id,
          req.session.company_id,
          posted_elements.general_permission_select,
          posted_elements.table_permission_users,
          posted_elements.table_permission_hr,
          posted_elements.table_permission_departments,
          posted_elements.table_permission_employees,
          posted_elements.table_permission_effects,
          posted_elements.table_permission_production,
          posted_elements.table_permission_bread,
          posted_elements.table_permission_transaction,
          posted_elements.table_permission_items,
          posted_elements.table_permission_customers,
          posted_elements.table_permission_vendors,
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
        message_ar: "Sorry,you  can't use this featue",
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
        message_ar:
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
      message_ar:
        "تم حذف بيانات المستخدم بنجاح : سيتم توجيهك الى صفحه المستخدمين الرئيسية",
    });
  } catch (error) {
    console.error("Error Deleting user data:", error);
    res.status(500).json({
      success: false,
      message_ar: "توجد عمليات فى التطبيق مرتبطه بهذا المستخدم ولا يمكن حذفه",
    });
  }
});
//#endregion users


//#region cutomers

//#region get customers data
app.get("/get_All_customers_Data", async (req, res) => {
  try {
    //! Permission
    await permissions(req, "customers_permission", "view");
    if (!permissions) {
      return;
    }

    //* Start--------------------------------------------------------------

    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");

    // console.log(req.session.company_id);
    let query1 = `SELECT 
    A.id, 
    A.account_name, 
    A.account_no, 
    A.credit_limit, 
    A.email, 
    A.tasgel_darepy, 
    A.legal_info, 
    A.contact_info, 
    A.delivery_adress, 
    A.banking_info,
    COALESCE(SUM(T.debit) - SUM(T.credit), 0) AS balance
FROM 
    accounts_header A
LEFT JOIN 
    transaction_body T ON A.id = T.account_id
WHERE
    A.company_id = $1
    AND A.account_type_id = 2
GROUP BY
    A.id, 
    A.account_name, 
    A.account_no, 
    A.credit_limit, 
    A.email, 
    A.tasgel_darepy, 
    A.legal_info, 
    A.contact_info, 
    A.delivery_adress, 
    A.banking_info;
`;
    let data = await db.any(query1, [req.session.company_id]);

    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error: getEmployeesData");
  }
});

//#endregion

  //#region add customers
  app.post("/addNewCustomer", async (req, res) => {
    try {
          // // إرسال رسالة إلى العميل عبر WebSocket
          // io.emit('blockUser', { userId: req.session.userId });
          
      const posted_elements = req.body;
  
      //! Permission
      await permissions(req, "customers_permission", "add");
      if (!permissions) {
        return;
      }
  
      //! sql injection check
      // const hasBadSymbols = sql_anti_injection([
      //   posted_elements.employee_name_input,
      //   posted_elements.today,
      //   posted_elements.employee_job_input,
      //   posted_elements.employee_beta2a_input,
      //   posted_elements.employee_adress_input,
      //   posted_elements.employee_phone_input,
      //   posted_elements.employee_emergency_phone_input,
      //   posted_elements.employee_start_date_input,
      //   posted_elements.employee_leave_date_input,
      //   // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
      // ]);

      // سرد كل القيم مره واحده 
      const hasBadSymbols = sql_anti_injection(...Object.values(posted_elements));

      if (hasBadSymbols) {
        return res.json({
          success: false,
          message_ar:
            "Invalid input detected due to prohibited characters. Please review your input and try again.",
        });
      }


      if (!posted_elements.account_name_input_value || posted_elements.account_name_input_value === '') {
        return res.json({ success: false, message_ar: "ادخل اسم العميل" });
      }
      //* Start--------------------------------------------------------------
  
      //2: validation data befor inserting to db
      // const rows = await db.any(
      //   "SELECT TRIM(employee_name) FROM employees WHERE TRIM(employee_name) = $1",
      //   [posted_elements.employee_name_input]
      // );
  
      let query0 = ` select
      (SELECT count(account_name) FROM accounts_header WHERE company_id = $1 AND TRIM(account_name) = $2) as account_name_count,
      (select id from accounts_header where company_id = $1 AND global_id = 13) as parent_id
                `;
      let result = await db.oneOrNone(query0, [
        req.session.company_id,
        posted_elements.account_name_input_value,
      ]);
  
      if (result.account_name_count > 0) {
        // اذا حصل على نتائج
        return res.json({ success: false, message_ar: "اسم العميل موجود بالفعل" });
      }
  
      //3: insert data into db
      const newId_header = await newId_fn("accounts_header",'id');
      const newId_body = await newId_fn("accounts_body",'id');
  
      let query1 = `
      INSERT INTO accounts_header (id, account_name, is_final_account, account_no, finance_statement, company_id, account_type_id, main_account_id, credit_limit, email, tasgel_darepy, legal_info, contact_info, delivery_adress, banking_info)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    `;

    let query2 = `
    insert into accounts_body (id, parent_id, account_id)
    values ($1, $2, $3)
    `


      await db.tx(async (tx) => {
        await tx.none(query1, [
          newId_header,
          posted_elements.account_name_input_value,
          true,
          posted_elements.acc_no_div_value,
          1,
          req.session.company_id,
          2,
          1,
          posted_elements.credit_limit_value,
          posted_elements.email_input_value,
          posted_elements.tasgel_darepy_input_value,
          posted_elements.legal_info_input_value,
          posted_elements.contact_info_input_value,
          posted_elements.delivery_adress_input_value,
          posted_elements.banking_info_input_value,
        ]);

        await tx.none(query2,[
          newId_body,
          result.parent_id,
          newId_header
        ])
      })


  
      //4: send a response to frontend about success transaction
      res.json({
        success: true,
        message_ar: "تم حفظ بيانات العميل بنجاح",
      });
    } catch (error) {
      console.error("Error adding customers:", error);
      // send a response to frontend about fail transaction
      res.status(500).json({
        success: false,
        message_ar: "حدث خطأ أثناء اضافة العميل",
      });
    }
  });
  //#endregion

  //#region update cutomer
  app.post("/updateCustomer", async (req, res) => {
    try {
          // // إرسال رسالة إلى العميل عبر WebSocket
          // io.emit('blockUser', { userId: req.session.userId });
          
      const posted_elements = req.body;
  
      //! Permission
      await permissions(req, "customers_permission", "add");
      if (!permissions) {
        return;
      }
  
      //! sql injection check
      // const hasBadSymbols = sql_anti_injection([
      //   posted_elements.employee_name_input,
      //   posted_elements.today,
      //   posted_elements.employee_job_input,
      //   posted_elements.employee_beta2a_input,
      //   posted_elements.employee_adress_input,
      //   posted_elements.employee_phone_input,
      //   posted_elements.employee_emergency_phone_input,
      //   posted_elements.employee_start_date_input,
      //   posted_elements.employee_leave_date_input,
      //   // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
      // ]);

      console.log(posted_elements);
      
      // سرد كل القيم مره واحده 
      const hasBadSymbols = sql_anti_injection(...Object.values(posted_elements));

      if (hasBadSymbols) {
        return res.json({
          success: false,
          message_ar:
            "Invalid input detected due to prohibited characters. Please review your input and try again.",
        });
      }


      if (!posted_elements.account_name_input_value || posted_elements.account_name_input_value === '' || !posted_elements.account_id_hidden_value || isNaN(posted_elements.account_id_hidden_value) ) {
        return res.json({ success: false, message_ar: "ادخل اسم العميل" });
      }
      //* Start--------------------------------------------------------------
  
      //2: validation data befor inserting to db
      // const rows = await db.any(
      //   "SELECT TRIM(employee_name) FROM employees WHERE TRIM(employee_name) = $1",
      //   [posted_elements.employee_name_input]
      // );
  

      let query0 = ` select
                      (SELECT count(account_name) FROM accounts_header WHERE company_id = $1 AND account_type_id = 2 AND account_name = $3 AND id != $2) as count_account_name_exist,
                      (select count(id) FROM accounts_header WHERE company_id = $1 AND account_type_id = 2) as count_id
      `
      let result = await db.oneOrNone(query0, [
        req.session.company_id,
        posted_elements.account_id_hidden_value,
        posted_elements.account_name_input_value,
      ]);
  
      if (result.count_id === 0) {
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }

      if (result.count_account_name_exist > 0) {
        return res.json({
          success: false,
          message_ar: "اسم العميل موجود بالفعل"
        });
      }
  
      let query = `
    UPDATE accounts_header set account_name = $1, account_no = $2, credit_limit = $3, email = $4, tasgel_darepy = $5, legal_info = $6, contact_info = $7, delivery_adress = $8, banking_info = $9
    WHERE company_id = $10 AND account_type_id = 2 AND id = $11
  `;
      await db.none(query, [
        posted_elements.account_name_input_value,
        posted_elements.acc_no_div_value,
        posted_elements.credit_limit_value,
        posted_elements.email_input_value,
        posted_elements.tasgel_darepy_input_value,
        posted_elements.legal_info_input_value,
        posted_elements.contact_info_input_value,
        posted_elements.delivery_adress_input_value,
        posted_elements.banking_info_input_value,
        req.session.company_id,
        posted_elements.account_id_hidden_value
      ]);
  
      //4: send a response to frontend about success transaction
      res.json({
        success: true,
        message_ar: "تم تحديث بيانات العميل بنجاح",
      });
    } catch (error) {
      console.error("Error adding customers:", error);
      // send a response to frontend about fail transaction
      res.status(500).json({
        success: false,
        message_ar: "حدث خطأ أثناء تحديث بيانات العميل",
      });
    }
  });
  //#endregion

  //#region delete customers
  app.post("/delete_customer", async (req, res) => {
    try {
      //! Permission
      await permissions(req, "customers_permission", "delete");
      if (!permissions) {
        return;
      }
  
      const posted_elements = req.body;
      //! sql injection check
      const hasBadSymbols = sql_anti_injection([
        posted_elements.account_id_hidden_value,
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
  
      if (!posted_elements.account_id_hidden_value || isNaN(posted_elements.account_id_hidden_value)) {
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }
  
      let query0 = `
              select
              (select count(account_id) from transaction_body where account_id = $1) as count_account_id,
              (select count(id) from accounts_header where company_id = $2 AND account_type_id = 2) as count_id
      `

      let result = await db.oneOrNone(query0,[
        posted_elements.account_id_hidden_value,
        req.session.company_id
      ])


      if (result.count_id === 0) {
        await block_user(req,'dc1')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }

      if (result.count_account_id > 0) {
        return res.json({
          success: false,
          message_ar: 'يوجد حركات على الحساب : تم الغاء الحذف',
        });
      }

      let query1 = `DELETE FROM accounts_header WHERE company_id = $1 AND id = $2 AND account_type_id = 2`;
      await db.none(query1, [
        req.session.company_id,
        posted_elements.account_id_hidden_value,
      ]);
  
      return res.json({
        success: true,
        message_ar:
          "تم حذف بيانات الموظف : سيتم تحويلك الان الى صفحه الموظفين الرئيسيه",
      });
    } catch (error) {
      console.error("Error get customer data:", error);
      res.status(500).json({
        success: false,
        message_ar:
          "لا يمكن حذف العميل : قد تكون هناك عمليات مرتبطه بالعميل يجب حذفها اولا",
      });
    }
  });
  //#endregion

//#endregion

//#region human_resources

  //#region human_resources_department

    //#region 1: get departments data
    app.post("/get_All_human_resources_department_Data", async (req, res) => {
      try {
        //! Permission
        await permissions(req, "human_resources_department", "view");
        if (!permissions) {
          return;
        }
    
        //* Start--------------------------------------------------------------
        

        let query0 = `
        SELECT id FROM accounts_header Where company_id = $1 AND global_id = 20
        `
        let result = await db.oneOrNone(query0,[req.session.company_id])
        
        if (!result) {
          return res.json({
            success: false,
            message_ar: "حدث خطأ اثناء معالجة البيانات ",
            message_en: "You do not have the necessary permissions to delete this account",
          })
        }


        // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");
    
        // console.log(req.session.company_id);
        let query1 = `

        -- hena ba3mel ensha2 mo2kt le table gept feh el parent_id, employees_count fe table lew7dhom
        -- we ba3den ha3tbro gdwal 3ady we ha3melo join 3ashan a5od el count beta3 el employees da5el kol ksm 3asla tol mnho

    -- 1 : get depratmentId and employeesCont in it    
   WITH department_employees AS (
    SELECT
        ab_inner.parent_id,
        COUNT(ab_inner.id) AS employees_count
    FROM 
        accounts_body ab_inner
    LEFT JOIN 
        accounts_header ah_inner 
        ON ab_inner.account_id = ah_inner.id
    WHERE 
        ah_inner.is_inactive IS NULL OR ah_inner.is_inactive <> 1
    GROUP BY
        ab_inner.parent_id
)

-- 2 : Main query
SELECT 
    ah.id,
    COALESCE(ah.account_no , '') AS acc_no,
    COALESCE(ah.account_name, '') AS department_name,
    COALESCE(ah.legal_info, '') AS legal_info,
    COALESCE(de.employees_count, 0) AS employees_count
FROM 
    accounts_body ab_outer
LEFT JOIN 
    accounts_header ah 
    ON ab_outer.account_id = ah.id
LEFT JOIN
    department_employees de 
    ON de.parent_id = ab_outer.account_id
WHERE 
    ah.company_id = $1
    AND ab_outer.parent_id = $2
    AND (ah.is_final_account IS NULL OR ah.is_final_account = false)
ORDER BY
    employees_count DESC,
    ah.account_name ASC;
    `;
        let data = await db.any(query1, [
          req.session.company_id,
          result.id
        ]);
    
        res.json(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Error: human_resources_department");
      }
    });
    //#endregion  end get department data


    //#region departments_add
    app.post("/addNewDepartment", async (req, res) => {
      try {
            // // إرسال رسالة إلى العميل عبر WebSocket
            // io.emit('blockUser', { userId: req.session.userId });
            
        const posted_elements = req.body;
    
        //! Permission
        await permissions(req, "departments_permission", "add");
        if (!permissions) {
          return;
        }
    
        //! sql injection check

        // سرد كل القيم مره واحده 
        const hasBadSymbols = sql_anti_injection(...Object.values(posted_elements));
  
        if (hasBadSymbols) {
          return res.json({
            success: false,
            message_ar:
              "Invalid input detected due to prohibited characters. Please review your input and try again.",
          });
        }
  
        
        turn_EmptyValues_TO_null(posted_elements);



  
        if (!posted_elements.name || posted_elements.name === '') {
          return res.json({ success: false, message_ar: "ادخل اسم القسم" });
        }


        if (posted_elements.activeValue && posted_elements.activeValue !== 1) {
          await block_user(req,'andep1')
          return res.json({
            success: false,
            xx: true,
            message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
          });
        }

        //* Start--------------------------------------------------------------
    
        //2: validation data befor inserting to db
        // const rows = await db.any(
        //   "SELECT TRIM(employee_name) FROM employees WHERE TRIM(employee_name) = $1",
        //   [posted_elements.employee_name_input]
        // );
        let query0 = ` select
                    (SELECT count(account_name) FROM accounts_header WHERE company_id = $1 AND account_name = $2 AND account_type_id = 4 AND  (is_final_account IS FALSE OR is_final_account IS NULL)) as account_name_count,
                    (select id from accounts_header where company_id = $1 AND global_id = 20) as parent_id
                  `;
        let result = await db.oneOrNone(query0, [
          req.session.company_id,
          posted_elements.name,
        ]);
        


        if (result.account_name_count > 0) {
          // اذا حصل على نتائج
          return res.json({ success: false, message_ar: "اسم القسم موجود بالفعل" });
        }
        
        
        if (!result.parent_id) {
          // اذا حصل على نتائج
          return res.json({ success: false, message_ar: "حدث خطأ اثناء معالجة البيانات وتم الغاء العمليه" });
        }
        //3: insert data into db

        let active_value;
        if(posted_elements.activeValue == 0){
          active_value = null
        }else if (posted_elements.activeValue == 1) {
          active_value = 1
        }



        const newId_header = await newId_fn("accounts_header",'id');
        const newId_body = await newId_fn("accounts_body",'id');
    

        let query1 = `INSERT INTO accounts_header (id, account_name, finance_statement, company_id, account_type_id, main_account_id, legal_info) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
        let params1 = [newId_header, posted_elements.name, 1, req.session.company_id, 4, 2, posted_elements.info];
    
        let query2 = `insert into accounts_body (id, parent_id, account_id) values ($1, $2, $3)`
        let params2 = [newId_body, result.parent_id, newId_header]
    
        await db.tx(async (tx) => {
          await tx.none(query1, params1);
          await tx.none(query2,params2);
        })
  
    
        //4: send a response to frontend about success transaction
        res.json({
          success: true,
          message_ar: "تم حفظ بيانات القسم بنجاح",
        });
      } catch (error) {
        console.error("Error adding department:", error);
        // send a response to frontend about fail transaction
        res.status(500).json({
          success: false,
          message_ar: "حدث خطأ أثناء اضافة القسم",
        });
      }
    });

    //#endregion

    //#region departments Update
    app.post("/deleteDepartment", async (req, res) => {
      try {
            // // إرسال رسالة إلى العميل عبر WebSocket
            // io.emit('blockUser', { userId: req.session.userId });
            
        const posted_elements = req.body;
    
        //! Permission
        await permissions(req, "departments_permission", "delete");
        if (!permissions) {
          return;
        }
    
        //! sql injection check

        // سرد كل القيم مره واحده 
        const hasBadSymbols = sql_anti_injection(...Object.values(posted_elements));
  
        if (hasBadSymbols) {
          return res.json({
            success: false,
            message_ar:
              "Invalid input detected due to prohibited characters. Please review your input and try again.",
          });
        }

        turn_EmptyValues_TO_null(posted_elements);
  
        //* Start--------------------------------------------------------------
    
        //2: validation data befor inserting to db
        // const rows = await db.any(
        //   "SELECT TRIM(employee_name) FROM employees WHERE TRIM(employee_name) = $1",
        //   [posted_elements.employee_name_input]
        // );
        let query0 = ` 
                    select count(id) as id_count from accounts_header where company_id = $1 AND id = $2 AND account_type_id = 4 AND (is_final_account IS NULL OR is_final_account = FALSE);
                  `;
        let result = await db.oneOrNone(query0, [
          req.session.company_id,
          posted_elements.id,
        ]);
        

        if (result.id_count === 0) {
          // اذا حصل على نتائج
          await block_user(req,'udep1')
          return res.json({
            success: false,
            xx: true,
            message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
          });
        }


        
        //3: delete data into db


        let query1 = `DELETE FROM accounts_header WHERE company_id = $1 AND id = $2`;
        let params1 = [req.session.company_id, posted_elements.id];
    
    
        await db.tx(async (tx) => {
          await tx.none(query1, params1);
        })
  
    
        //4: send a response to frontend about success transaction
        res.json({
          success: true,
          message_ar: "تم حذف بيانات القسم بنجاح",
        });
      } catch (error) {
        console.error("Error adding department:", error);
        // send a response to frontend about fail transaction
        res.status(500).json({
          success: false,
          message_ar: "حدث خطأ أثناء اضافة القسم",
        });
      }
    });
    //#endregion


    //#region department delete
    app.post("/updateDepartment", async (req, res) => {
      try {
            // // إرسال رسالة إلى العميل عبر WebSocket
            // io.emit('blockUser', { userId: req.session.userId });
            
        const posted_elements = req.body;
    
        //! Permission
        await permissions(req, "departments_permission", "update");
        if (!permissions) {
          return;
        }
    
        //! sql injection check

        // سرد كل القيم مره واحده 
        const hasBadSymbols = sql_anti_injection(...Object.values(posted_elements));
  
        if (hasBadSymbols) {
          return res.json({
            success: false,
            message_ar:
              "Invalid input detected due to prohibited characters. Please review your input and try again.",
          });
        }
  
  
        if (!posted_elements.name || posted_elements.name === '') {
          return res.json({ success: false, message_ar: "ادخل اسم القسم" });
        }

        if (posted_elements.activeValue && posted_elements.activeValue !== 1) {
          await block_user(req,'andep1')
          return res.json({
            success: false,
            xx: true,
            message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
          });
        }
        //* Start--------------------------------------------------------------
    
        //2: validation data befor inserting to db
        // const rows = await db.any(
        //   "SELECT TRIM(employee_name) FROM employees WHERE TRIM(employee_name) = $1",
        //   [posted_elements.employee_name_input]
        // );
        let query0 = ` select
                    (select count(id) from accounts_header where company_id = $1 AND id = $3 AND account_type_id = 4 AND (is_final_account IS NULL OR is_final_account = FALSE)) as id_count,
                    (SELECT count(account_name) FROM accounts_header WHERE company_id = $1 AND account_name = $2 AND id != $3 AND account_type_id = 4 AND  (is_final_account = FALSE OR is_final_account IS NULL)) as account_name_count
                  `;
        let result = await db.oneOrNone(query0, [
          req.session.company_id,
          posted_elements.name,
          posted_elements.id,
        ]);
        

        if (result.id_count === 0) {
          // اذا حصل على نتائج
          await block_user(req,'udep1')
          return res.json({
            success: false,
            xx: true,
            message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
          });        }

        if (result.account_name_count > 0) {
          // اذا حصل على نتائج
          return res.json({ success: false, message_ar: "اسم القسم موجود بالفعل" });
        }
        
        
        //3: insert data into db


        let query1 = `UPDATE accounts_header set account_name = $1, legal_info = $2, is_inactive = $3 WHERE company_id = $4 AND id = $5`;
        let params1 = [posted_elements.name, posted_elements.info, posted_elements.activeValue, req.session.company_id, posted_elements.id];
    
    
        await db.tx(async (tx) => {
          await tx.none(query1, params1);
        })
  
    
        //4: send a response to frontend about success transaction
        res.json({
          success: true,
          message_ar: "تم تعديل بيانات القسم بنجاح",
        });
      } catch (error) {
        console.error("Error adding department:", error);
        // send a response to frontend about fail transaction
        res.status(500).json({
          success: false,
          message_ar: "حدث خطأ أثناء اضافة القسم",
        });
      }
    });
    //#endregion

  //#endregion

  //#region human_resources_employees
// Add new employee
app.post("/employee_add", async (req, res) => {
  try {
        // إرسال رسالة إلى العميل عبر WebSocket
        // io.emit('blockUser', { userId: req.session.userId });
        
    const posted_elements = req.body;
    

    //! Permission
    await permissions(req, "employees_permission", "add");
    if (!permissions) {
      return;
    }

    //! sql injection check

          // سرد كل القيم مره واحده 
          const hasBadSymbols = sql_anti_injection(...Object.values(posted_elements));

          if (hasBadSymbols) {
            return res.json({
              success: false,
              message_ar:
                "Invalid input detected due to prohibited characters. Please review your input and try again.",
            });
          }

          
          const InValidDateFormat = isInValidDateFormat([posted_elements.employee_start_date_value, posted_elements.employee_leave_date_value])
          if (InValidDateFormat){
            return res.json({
              success: false,
              message_ar: InValidDateFormat_message_ar,
            });
          }

        turn_EmptyValues_TO_null(posted_elements);

    if (!posted_elements.employee_name_value || posted_elements.employee_name_value == ''){
      return res.json({
        success: false,
        message_ar:
          "ادخل اسم الموظف اولا",
      });
    }          
    
    //* Start--------------------------------------------------------------

    //2: validation data befor inserting to db
    // const rows = await db.any(
    //   "SELECT TRIM(employee_name) FROM employees WHERE TRIM(employee_name) = $1",
    //   [posted_elements.employee_name_input]
    // );

    let query0 = `SELECT

               (select count(account_name) FROM accounts_header WHERE company_id = $1 AND account_name = $2 AND account_type_id = 4) as count_account_name,
               (select count(account_name) FROM accounts_header WHERE company_id = $1 AND id = $3 AND (is_final_account = false or is_final_account IS NULL) AND account_type_id = 4) as count_department_name
              `;
    let result = await db.oneOrNone(query0, [
      req.session.company_id,
      posted_elements.employee_name_value,
      posted_elements.select_department_value,
      
    ]);

     
    if (![0,1].includes(+posted_elements.inactive_select_value)){
      await block_user(req,'emadd1')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }


    if (result.count_department_name == 0){
      await block_user(req,'emadd2')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }


    if (result.count_account_name > 0) {
      // اذا حصل على نتائج
      return res.json({ success: false, message_ar: "اسم الموظف موجود بالفعل" });
    }

    //3: insert data into db
    
    console.log(posted_elements.inactive_select_value);
    
    let active_value;
    if(posted_elements.inactive_select_value == 0){
      active_value = null
    }else if (posted_elements.inactive_select_value == 1) {
      active_value = 1
    }

    const newId_header = await newId_fn("accounts_header",'id');
    const newId_body = await newId_fn("accounts_body",'id');

    let query1 = `
  INSERT INTO accounts_header (id, account_name, account_no, legal_info, email, contact_info, delivery_adress, banking_info, is_inactive, is_final_account, finance_statement, company_id, account_type_id, main_account_id)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
`;

  let params1 =[newId_header,
    posted_elements.employee_name_value,
    posted_elements.account_no_value,
    posted_elements.employee_job_value,
    posted_elements.email_input_value,
    posted_elements.other_info_value,
    posted_elements.employee_start_date_value,
    posted_elements.employee_leave_date_value,
    active_value,
    true,
    1,
    req.session.company_id,
    4,
    2
  ]


  let query2 = `INSERT INTO accounts_body (id, parent_id, account_id)
                VALUES ($1, $2, $3)`

  let params2 = [newId_body,
    posted_elements.select_department_value,
    newId_header
  ]               


  await db.tx(async (tx) => {
    await tx.none(query1, params1);
    await tx.none(query2, params2);
  })

    //4: send a response to frontend about success transaction
    res.json({
      success: true,
      message_ar: "تم حفظ الموظف بنجاح",
    });
  } catch (error) {
    console.error("Error adding employee:", error);
    // send a response to frontend about fail transaction
    res.status(500).json({
      success: false,
      message_ar: "حدث خطأ أثناء اضافة الموظف",
    });
  }
});

// update Employee

// update_Employee
app.post("/update_employee", async (req, res) => {
  try {
        // إرسال رسالة إلى العميل عبر WebSocket
        // io.emit('blockUser', { userId: req.session.userId });
        
    const posted_elements = req.body;

    //! Permission
    await permissions(req, "employees_permission", "update");
    if (!permissions) {
      return;
    }

    //! sql injection check

          // سرد كل القيم مره واحده 
          const hasBadSymbols = sql_anti_injection(...Object.values(posted_elements));

          if (hasBadSymbols) {
            return res.json({
              success: false,
              message_ar:
                "Invalid input detected due to prohibited characters. Please review your input and try again.",
            });
          }

          const InValidDateFormat = isInValidDateFormat([posted_elements.employee_start_date_value, posted_elements.employee_leave_date_value])
          if (InValidDateFormat){
            return res.json({
              success: false,
              message_ar: InValidDateFormat_message_ar,
            });
          }

          turn_EmptyValues_TO_null(posted_elements);

    if (!posted_elements.employee_name_value || posted_elements.employee_name_value == ''){
      return res.json({
        success: false,
        message_ar:
          "ادخل اسم الموظف اولا",
      });
    }          
    
    //* Start--------------------------------------------------------------

    //2: validation data befor inserting to db
    // const rows = await db.any(
    //   "SELECT TRIM(employee_name) FROM employees WHERE TRIM(employee_name) = $1",
    //   [posted_elements.employee_name_input]
    // );

    let query0 = `SELECT
              (select count(id) FROM accounts_header WHERE company_id = $1 AND id = $2 AND account_type_id = 4 AND is_final_account = true) as count_id,
              (select count(id) FROM accounts_header WHERE company_id = $1 AND id = $3 AND account_type_id = 4 AND (is_final_account = false or is_final_account IS NULL)) as count_department_id,
              (select count(account_name) FROM accounts_header WHERE company_id = $1 AND account_name = $4 AND id != $2 AND account_type_id = 4) as count_account_name
              `;
    let result = await db.oneOrNone(query0, [
      req.session.company_id,
      posted_elements.id_value,
      posted_elements.select_department_value,
      posted_elements.employee_name_value
    ]);

     
    if (![0,1].includes(+posted_elements.inactive_select_value)){
      await block_user(req,'upemp1')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }


    if (result.count_id == 0){
      await block_user(req,'upemp2')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }


    if (result.count_department_id == 0){
      await block_user(req,'upemp3')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }

    if (result.count_account_name > 0) {
      // اذا حصل على نتائج
      return res.json({ success: false, message_ar: "اسم الموظف موجود بالفعل" });
    }

    //3: insert data into db
    
    console.log(posted_elements.inactive_select_value);
    
    let active_value;
    if(posted_elements.inactive_select_value == 0){
      active_value = null
    }else if (posted_elements.inactive_select_value == 1) {
      active_value = 1
    }

    
    

    let query1 = `
    UPDATE accounts_header set account_name = $1, account_no = $2, legal_info = $3, email = $4, contact_info = $5, delivery_adress = $6, banking_info = $7, is_inactive = $8 WHERE company_id = $9 AND id = $10;
    `;

  let params1 =[
    posted_elements.employee_name_value,
    posted_elements.account_no_value,
    posted_elements.employee_job_value,
    posted_elements.email_value,
    posted_elements.other_info_value,
    posted_elements.employee_start_date_value,
    posted_elements.employee_leave_date_value,
    active_value,
    req.session.company_id,
    posted_elements.id_value,
  ]


  let query2 = `update accounts_body set parent_id = $1 WHERE account_id = $2`

  let params2 = [
    posted_elements.select_department_value,
    posted_elements.id_value,
  ]               


  await db.tx(async (tx) => {
    await tx.none(query1, params1);
    await tx.none(query2, params2);
  })

    //4: send a response to frontend about success transaction
    res.json({
      success: true,
      message_ar: "تم تعديل بيانات الموظف بنجاح : سيتم تحويلك الى صفحة الموظفين الرئيسية",
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    // send a response to frontend about fail transaction
    res.status(500).json({
      success: false,
      message_ar: "حدث خطأ أثناء تعديل بيانات الموظف",
    });
  }
});

// Delete_Employee
app.post("/delete_employee", async (req, res) => {
  try {
        // // إرسال رسالة إلى العميل عبر WebSocket
        // io.emit('blockUser', { userId: req.session.userId });
        
    const posted_elements = req.body;

    //! Permission
    await permissions(req, "employees_permission", "delete");
    if (!permissions) {
      return;
    }

    //! sql injection check

    // سرد كل القيم مره واحده 
    const hasBadSymbols = sql_anti_injection(...Object.values(posted_elements));

    if (hasBadSymbols) {
      return res.json({
        success: false,
        message_ar:
          "Invalid input detected due to prohibited characters. Please review your input and try again.",
      });
    }

    //* Start--------------------------------------------------------------

    //2: validation data befor inserting to db
    // const rows = await db.any(
    //   "SELECT TRIM(employee_name) FROM employees WHERE TRIM(employee_name) = $1",
    //   [posted_elements.employee_name_input]
    // );
    let query0 = `SELECT 
                (select count(id) from accounts_header where company_id = $1 AND id = $2 AND account_type_id = 4 AND is_final_account = true) as count_id,
                (select count(account_id) from transaction_body where account_id = $2) as count_actions

              `;
    let result = await db.oneOrNone(query0, [
      req.session.company_id,
      posted_elements.id_value,
    ]);
    

    if (result.id_count === 0) {
      // اذا حصل على نتائج
      await block_user(req,'delmp1')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }

    if (result.count_actions > 0){
      return res.json({
        success: false,
        message_ar: 'يوجد حركات على الحساب : لا يمكن حذف الحساب',
      });
    }


    
    //3: delete data into db


    let query1 = `DELETE FROM accounts_header WHERE company_id = $1 AND id = $2`;
    let params1 = [req.session.company_id, posted_elements.id_value];


    await db.tx(async (tx) => {
      await tx.none(query1, params1);
    })


    //4: send a response to frontend about success transaction
    res.json({
      success: true,
      message_ar: "تم حذف بيانات الموظف بنجاح",
    });
  } catch (error) {
    console.error("Error deleting employee:", error);
    // send a response to frontend about fail transaction
    res.status(500).json({
      success: false,
      message_ar: "حدث خطأ أثناء حذف بيانات الموظف",
    });
  }
});

//_______________________________________________

// get all d employees data
app.post("/get_All_Employees_Data", async (req, res) => {
  try {
 
    const posted_elements = req.body;
    
    //! Permission
    await permissions(req, "employees_permission", "view");
    if (!permissions) {
      return;
    }

    // سرد كل القيم مره واحده 
    const hasBadSymbols = sql_anti_injection(...Object.values(posted_elements));

    if (hasBadSymbols) {
      return res.json({
        success: false,
        message_ar:
          "Invalid input detected due to prohibited characters. Please review your input and try again.",
      });
    }
      

    //* Start--------------------------------------------------------------

   
    // console.log(req.session.company_id);
    let query1 = `
    SELECT 
        A.id, 
        COALESCE(A.account_name, '') as account_name, 
        COALESCE(A.account_no, '') as account_no, 
        COALESCE(A.legal_info, '') as job,
        COALESCE(A.email, '') as email,
        COALESCE(A.contact_info, '') as another_info,
        COALESCE(A.delivery_adress, '') as start_date,
        COALESCE(A.banking_info, '') as end_date,
        CASE 
            WHEN A.is_inactive = 1 THEN 'غير نشط'
            ELSE 'نشط'
        END as is_inactive,
        COALESCE(SUM(T.credit) - SUM(T.debit), 0) AS balance,
        B.parent_id as department_id,
        COALESCE(ParentAccount.account_name, '') AS department_name
    FROM 
        accounts_header A
    LEFT JOIN 
        transaction_body T ON A.id = T.account_id
    LEFT JOIN 
        accounts_body B ON A.id = B.account_id
    LEFT JOIN 
        accounts_header ParentAccount ON B.parent_id = ParentAccount.id
    WHERE
        A.company_id = $1
        AND A.account_type_id = 4
        AND A.is_final_account = true
        AND (B.parent_id = $2 OR $2 IS NULL)  -- هذا الشرط الجديد للتحقق من department_id
    GROUP BY
        A.id, 
        A.account_name, 
        A.account_no, 
        A.legal_info,
        A.email,
        A.contact_info,
        A.delivery_adress, 
        A.banking_info,
        A.is_inactive,
        B.parent_id,
        ParentAccount.account_name;
    `;
    
    let data = await db.any(query1, [req.session.company_id,posted_elements.QKey]);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", err);
    res.status(500).send("Error: getEmployeesData");
  }
});

  //#endregion

  //#region human_resources_effects

  //#endregion

//#endregion

//#region vendors

//#region get vendor data
app.get("/get_All_vendors_Data", async (req, res) => {
  try {
    //! Permission
    await permissions(req, "vendors_permission", "view");
    if (!permissions) {
      return;
    }

    //* Start--------------------------------------------------------------

    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");

    // console.log(req.session.company_id);
    let query1 = `SELECT 
    A.id, 
    A.account_name, 
    A.account_no, 
    A.credit_limit, 
    A.email, 
    A.tasgel_darepy, 
    A.legal_info, 
    A.contact_info, 
    A.delivery_adress, 
    A.banking_info,
    COALESCE(SUM(T.debit) - SUM(T.credit), 0) AS balance
FROM 
    accounts_header A
LEFT JOIN 
    transaction_body T ON A.id = T.account_id
WHERE
    A.company_id = $1
    AND A.account_type_id = 3
GROUP BY
    A.id, 
    A.account_name, 
    A.account_no, 
    A.credit_limit, 
    A.email, 
    A.tasgel_darepy, 
    A.legal_info, 
    A.contact_info, 
    A.delivery_adress, 
    A.banking_info;
`;
    let data = await db.any(query1, [req.session.company_id]);

    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error: getVendorsData");
  }
});

//#endregion

  //#region add vendor
  app.post("/addNewVendor", async (req, res) => {
    try {
          // // إرسال رسالة إلى العميل عبر WebSocket
          // io.emit('blockUser', { userId: req.session.userId });
          
      const posted_elements = req.body;
  
      //! Permission
      await permissions(req, "vendors_permission", "add");
      if (!permissions) {
        return;
      }
  
      //! sql injection check
      // const hasBadSymbols = sql_anti_injection([
      //   posted_elements.employee_name_input,
      //   posted_elements.today,
      //   posted_elements.employee_job_input,
      //   posted_elements.employee_beta2a_input,
      //   posted_elements.employee_adress_input,
      //   posted_elements.employee_phone_input,
      //   posted_elements.employee_emergency_phone_input,
      //   posted_elements.employee_start_date_input,
      //   posted_elements.employee_leave_date_input,
      //   // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
      // ]);

      // سرد كل القيم مره واحده 
      const hasBadSymbols = sql_anti_injection(...Object.values(posted_elements));

      if (hasBadSymbols) {
        return res.json({
          success: false,
          message_ar:
            "Invalid input detected due to prohibited characters. Please review your input and try again.",
        });
      }


      if (!posted_elements.account_name_input_value || posted_elements.account_name_input_value === '') {
        return res.json({ success: false, message_ar: "ادخل اسم المورد" });
      }
      //* Start--------------------------------------------------------------
  
      //2: validation data befor inserting to db
      // const rows = await db.any(
      //   "SELECT TRIM(employee_name) FROM employees WHERE TRIM(employee_name) = $1",
      //   [posted_elements.employee_name_input]
      // );
      let query0 = ` select
      (SELECT count(account_name) FROM accounts_header WHERE company_id = $1 AND TRIM(account_name) = $2) as account_name_count,
      (select id from accounts_header where company_id = $1 AND global_id = 14) as parent_id
                `;
      let result = await db.oneOrNone(query0, [
        req.session.company_id,
        posted_elements.account_name_input_value,
      ]);
  
      if (result.account_name_count > 0) {
        // اذا حصل على نتائج
        return res.json({ success: false, message_ar: "اسم المورد موجود بالفعل" });
      }
  
      //3: insert data into db
      const newId_header = await newId_fn("accounts_header",'id');
      const newId_body = await newId_fn("accounts_body",'id');
  
      let query1 = `
    INSERT INTO accounts_header (id, account_name, is_final_account, account_no, finance_statement, company_id, account_type_id, main_account_id, credit_limit, email, tasgel_darepy, legal_info, contact_info, delivery_adress, banking_info)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
  `;

  let query2 = `
  insert into accounts_body (id, parent_id, account_id)
  values ($1, $2, $3)
  `
  await db.tx(async (tx) => {
    await tx.none(query1, [
      newId_header,
      posted_elements.account_name_input_value,
      true,
      posted_elements.acc_no_div_value,
      1,
      req.session.company_id,
      3,
      1,
      posted_elements.credit_limit_value,
      posted_elements.email_input_value,
      posted_elements.tasgel_darepy_input_value,
      posted_elements.legal_info_input_value,
      posted_elements.contact_info_input_value,
      posted_elements.delivery_adress_input_value,
      posted_elements.banking_info_input_value,
    ]);

    await tx.none(query2,[
      newId_body,
      result.parent_id,
      newId_header
    ])
  })

  
      //4: send a response to frontend about success transaction
      res.json({
        success: true,
        message_ar: "تم حفظ بيانات المورد بنجاح",
      });
    } catch (error) {
      console.error("Error adding vendors:", error);
      // send a response to frontend about fail transaction
      res.status(500).json({
        success: false,
        message_ar: "حدث خطأ أثناء اضافة العميل",
      });
    }
  });
  //#endregion

  //#region update vendor
  app.post("/updateVendor", async (req, res) => {
    try {
          // // إرسال رسالة إلى العميل عبر WebSocket
          // io.emit('blockUser', { userId: req.session.userId });
          
      const posted_elements = req.body;
  
      //! Permission
      await permissions(req, "vendors_permission", "add");
      if (!permissions) {
        return;
      }
  
      //! sql injection check
      // const hasBadSymbols = sql_anti_injection([
      //   posted_elements.employee_name_input,
      //   posted_elements.today,
      //   posted_elements.employee_job_input,
      //   posted_elements.employee_beta2a_input,
      //   posted_elements.employee_adress_input,
      //   posted_elements.employee_phone_input,
      //   posted_elements.employee_emergency_phone_input,
      //   posted_elements.employee_start_date_input,
      //   posted_elements.employee_leave_date_input,
      //   // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
      // ]);

      console.log(posted_elements);
      
      // سرد كل القيم مره واحده 
      const hasBadSymbols = sql_anti_injection(...Object.values(posted_elements));

      if (hasBadSymbols) {
        return res.json({
          success: false,
          message_ar:
            "Invalid input detected due to prohibited characters. Please review your input and try again.",
        });
      }


      if (!posted_elements.account_name_input_value || posted_elements.account_name_input_value === '' || !posted_elements.account_id_hidden_value || isNaN(posted_elements.account_id_hidden_value) ) {
        return res.json({ success: false, message_ar: "ادخل اسم المورد" });
      }
      //* Start--------------------------------------------------------------
  
      //2: validation data befor inserting to db
      // const rows = await db.any(
      //   "SELECT TRIM(employee_name) FROM employees WHERE TRIM(employee_name) = $1",
      //   [posted_elements.employee_name_input]
      // );
  

      let query0 = ` select
                      (SELECT count(account_name) FROM accounts_header WHERE company_id = $1 AND account_type_id = 3 AND account_name = $3 AND id != $2) as count_account_name_exist,
                      (select count(id) FROM accounts_header WHERE company_id = $1 AND account_type_id = 3) as count_id
      `
      let result = await db.oneOrNone(query0, [
        req.session.company_id,
        posted_elements.account_id_hidden_value,
        posted_elements.account_name_input_value,
      ]);
  
      if (result.count_id === 0) {
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }

      if (result.count_account_name_exist > 0) {
        return res.json({
          success: false,
          message_ar: "اسم المورد موجود بالفعل"
        });
      }
  
      let query = `
    UPDATE accounts_header set account_name = $1, account_no = $2, credit_limit = $3, email = $4, tasgel_darepy = $5, legal_info = $6, contact_info = $7, delivery_adress = $8, banking_info = $9
    WHERE company_id = $10 AND account_type_id = 2 AND id = $11
  `;
      await db.none(query, [
        posted_elements.account_name_input_value,
        posted_elements.acc_no_div_value,
        posted_elements.credit_limit_value,
        posted_elements.email_input_value,
        posted_elements.tasgel_darepy_input_value,
        posted_elements.legal_info_input_value,
        posted_elements.contact_info_input_value,
        posted_elements.delivery_adress_input_value,
        posted_elements.banking_info_input_value,
        req.session.company_id,
        posted_elements.account_id_hidden_value
      ]);
  
      //4: send a response to frontend about success transaction
      res.json({
        success: true,
        message_ar: "تم تحديث بيانات المورد بنجاح",
      });
    } catch (error) {
      console.error("Error adding vendors:", error);
      // send a response to frontend about fail transaction
      res.status(500).json({
        success: false,
        message_ar: "حدث خطأ أثناء تحديث بيانات المورد",
      });
    }
  });
  //#endregion

  //#region delete vendor
  app.post("/delete_vendor", async (req, res) => {
    try {
      //! Permission
      await permissions(req, "vendors_permission", "delete");
      if (!permissions) {
        return;
      }
  
      const posted_elements = req.body;
      //! sql injection check
      const hasBadSymbols = sql_anti_injection([
        posted_elements.account_id_hidden_value,
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
  
      if (!posted_elements.account_id_hidden_value || isNaN(posted_elements.account_id_hidden_value)) {
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }
  
      let query0 = `
              select
              (select count(account_id) from transaction_body where account_id = $1) as count_account_id,
              (select count(id) from accounts_header where company_id = $2 AND account_type_id = 3) as count_id
      `

      let result = await db.oneOrNone(query0,[
        posted_elements.account_id_hidden_value,
        req.session.company_id
      ])


      if (result.count_id === 0) {
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }

      if (result.count_account_id > 0) {
        return res.json({
          success: false,
          message_ar: 'يوجد حركات على الحساب : تم الغاء الحذف',
        });
      }

      let query1 = `DELETE FROM accounts_header WHERE company_id = $1 AND id = $2 AND account_type_id = 3`;
      await db.none(query1, [
        req.session.company_id,
        posted_elements.account_id_hidden_value,
      ]);
  
      return res.json({
        success: true,
        message_ar:
          "تم حذف بيانات المورد بنجاح : سيتم تحويلك الان الى صفحه الموردين الرئيسيه",
      });
    } catch (error) {
      console.error("Error get vendor data:", error);
      res.status(500).json({
        success: false,
        message_ar:
          "لا يمكن حذف بيانات المورد : قد تكون هناك عمليات مرتبطه بالمورد يجب حذفها اولا",
      });
    }
  });
  //#endregion

//#endregion

//#region effects

//#region 1: Add effects_add
app.post("/effects_add", async (req, res) => {
  try {


    //! Permission
    await permissions(req, "effects_permission", "add");
    if (!permissions) {
      return;
    }
    const posted_elements = req.body;
    

          // سرد كل القيم مره واحده 
          const hasBadSymbols = sql_anti_injection(...Object.values(posted_elements));

          if (hasBadSymbols) {
            return res.json({
              success: false,
              message_ar:
                "Invalid input detected due to prohibited characters. Please review your input and try again.",
            });
          }

          const InValidDateFormat = isInValidDateFormat([posted_elements.date_input_val])
          if (InValidDateFormat){
            return res.json({
              success: false,
              message_ar: InValidDateFormat_message_ar,
            });
          }

        turn_EmptyValues_TO_null(posted_elements);
    //* Start--------------------------------------------------------------

    //3: insert data into db
    const newId = await newId_fn("effects",'id');
    let Reference

    if (posted_elements.reference && !isNaN(posted_elements.reference) && posted_elements.reference > 0) {
      const query = `select count(reference) as count from effects where company_id = $1 AND reference = $2`
      const result = await db.oneOrNone(query, [req.session.company_id, posted_elements.reference])
      if (result && result.count > 0) {
          return res.json({
          success: false,
          message_ar: "هذا المرجع موجود بالفعل , رجاء تفعيل الوضع التلقائى او ادخل مرجع صالح",
        });
      }else{
        Reference = posted_elements.reference
      }

    }else{
      Reference = await newReference_not_transaction(req,'effects','reference')
    }

    let query1 = `INSERT INTO effects (id, employee_id, datex, days, hours, values, note, company_id, reference) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
    await db.none(query1, [
      newId,
      posted_elements.id_hidden_input_val,
      posted_elements.date_input_val,
      posted_elements.days_input_val,
      posted_elements.hours_input_val,
      posted_elements.values_input_val,
      posted_elements.note_input_val,
      req.session.company_id,
      Reference
    ]);

    //4: send a response to frontend about success transaction
    res.json({
      success: true,
      message_ar: "تم حفظ البيانات بنجاح",
    });
  } catch (error) {
    console.error("Error adding effects:", error);
    // send a response to frontend about fail transaction
    res.status(500).json({
      success: false,
      message_ar: "حدث خطأ أثناء الاضافه",
    });
  }
});
//#endregion END - Add effects_add

//#region 2: get data to fill dropdownbox of employees
app.post("/getEmployeesData1", async (req, res) => {
  try {
    //! Permission
    await permissions(req, "effects_permission", "view");
    if (!permissions) {
      return;
    }

    //* Start--------------------------------------------------------------
    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");

    let query1 = `SELECT id, account_name FROM accounts_header where company_id = $1 AND account_type_id = 4 AND is_final_account IS TRUE`;
    let data = await db.any(query1, [req.session.company_id]);

    res.json(data);
  } catch (error) {
    console.error("Error while get Employees Data", error);
    res.join;
    res
      .status(500)
      .json({ success: false, message_ar: "Error while get Employees Data" });
  }
});
//#endregion

//#region 3: get data for review tables
app.post("/effects_view", async (req, res) => {
  try {

    const posted_elements = req.body;

    //! Permission
    await permissions(req, "effects_permission", "view");
    if (!permissions) {
      return;
    }

        // سرد كل القيم مره واحده 
        const hasBadSymbols = sql_anti_injection(...Object.values(posted_elements));

        if (hasBadSymbols) {
          return res.json({
            success: false,
            message_ar:
              "Invalid input detected due to prohibited characters. Please review your input and try again.",
          });
        }
      
        if (posted_elements.checkbox_aggregation_val && posted_elements.select_aggregation_val == '1') {
          const InValidDateFormat = isInValidDateFormat([posted_elements.start_date,posted_elements.end_date])
          if (InValidDateFormat){
            return res.json({
              success: false,
              message_ar: InValidDateFormat_message_ar,
            });
          }
        }


      turn_EmptyValues_TO_null(posted_elements);
    //* Start--------------------------------------------------------------

        
        

        let query
        let params;

        if (posted_elements.checkbox_aggregation_val && posted_elements.checkbox_aggregation_val === true){
          
          query = `
SELECT 
    NULL as id, -- عامود id ببيانات فارغة
    COALESCE(ah.account_no, '') as account_no, -- إضافة account_no من accounts_header
    NULL as datex, -- عامود datex ببيانات فارغة
    NULL as reference,
    A.employee_id,
    COALESCE(ah.account_name, '') as account_name,
    SUM(COALESCE(A.days, 0)) as days, -- جمع أيام الحضور
    SUM(COALESCE(A.hours, 0)) as hours, -- جمع الساعات
    SUM(COALESCE(A.values, 0)) as values, -- جمع القيم
    '' as note, -- حقل note ببيانات فارغة
    CASE
        WHEN ah.is_inactive = 1 THEN 'غير نشط'
        ELSE 'نشط'
    END as is_inactive,
    COALESCE(parent_ah.id, 0) as department_id, -- ID الحساب الأب
    COALESCE(parent_ah.account_name, '') as department_name -- اسم الحساب الأب
FROM 
    effects A
LEFT JOIN
    accounts_header ah ON A.employee_id = ah.id
LEFT JOIN 
    accounts_body ab ON ah.id = ab.account_id -- الانضمام إلى accounts_body للحصول على parent_id
LEFT JOIN 
    accounts_header parent_ah ON ab.parent_id = parent_ah.id -- الانضمام إلى accounts_header للحصول على account_name للحساب الأب
WHERE
    A.company_id = $1
    AND ah.account_type_id = 4
    AND ah.is_final_account = true
    AND (A.datex BETWEEN $2 AND $3 )
GROUP BY 
    A.employee_id, ah.account_name, parent_ah.id, parent_ah.account_name, ah.account_no, ah.is_inactive
ORDER BY 
    A.employee_id;

`

  params = [req.session.company_id,posted_elements.start_date,posted_elements.end_date]


        }else{
          query =  `
          SELECT 
              A.id,
              COALESCE(ah.account_no, '') as account_no,
              COALESCE(A.datex, '') as datex,
              A.reference,
              A.employee_id,
              COALESCE(ah.account_name, '') as account_name,
              COALESCE(A.days, 0) as days, 
              COALESCE(A.hours, 0) as hours,
              COALESCE(A.values, 0) as values,
              COALESCE(A.note, '') as note,
              CASE 
                  WHEN ah.is_inactive = 1 THEN 'غير نشط'
                  ELSE 'نشط'
              END as is_inactive,
              COALESCE(parent_ah.id, 0) as department_id, -- إضافة للحصول على ID الحساب الأب
              COALESCE(parent_ah.account_name, '') as department_name -- اسم الحساب الأب
          FROM effects A
          LEFT JOIN accounts_header ah ON A.employee_id = ah.id
          LEFT JOIN accounts_body ab ON ah.id = ab.account_id -- الانضمام إلى accounts_body للحصول على parent_id
          LEFT JOIN accounts_header parent_ah ON ab.parent_id = parent_ah.id -- الانضمام إلى accounts_header للحصول على account_name للحساب الأب
          WHERE
              A.company_id = $1
              AND ah.account_type_id = 4
              AND ah.is_final_account = true
              AND (A.datex BETWEEN $2 AND $3 )
              AND (A.employee_id = $4 OR $4 IS NULL)
          ORDER BY
              A.datex DESC,
              A.reference DESC;
          `

          params = [req.session.company_id,posted_elements.start_date,posted_elements.end_date,posted_elements.QKey] 
        }
    


    let data = await db.any(query, params);
    res.json(data);
  } catch (error) {
    console.error("Error getEffectsData1:", error);
    res
      .status(500)
      .json({ success: false, message_ar: "حدث خطأ أثناء عرض البيانات" });
  }
});
//#endregion

//#region 4: update effects
app.post("/updateeffects", async (req, res) => {
  try {
    const posted_elements = req.body;

    //! Permission
    await permissions(req, "effects_permission", "view");
    if (!permissions) {
      return;
    }

    //! sql injection check
    const hasBadSymbols = sql_anti_injection([
      posted_elements.effects_id,
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

    //2: validation data befor inserting to db
    // const rows = await db.any(`SELECT A.id, A.employee_id, E.employee_name, A.days, A.hours, A.values, A.note, A.datex, A.last_update
    // FROM effects A
    // LEFT JOIN  employees E on A.employee_id = E.id
    // where A.id=$1
    // ORDER BY A.datex DESC`, [
    //   posted_elements.effects_id,
    // ]);

    let query1 = `SELECT A.id, A.employee_id, E.employee_name, A.days, A.hours, A.values, A.note, A.datex, A.last_update
      FROM effects A
      LEFT JOIN  employees E on A.employee_id = E.id
      where A.company_id = $1 AND A.id=$2 
      ORDER BY A.datex DESC`;
    let rows = await db.any(query1, [
      req.session.company_id,
      posted_elements.effects_id,
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
        message_ar: "Faild to get data from server",
      });
    }
  } catch (error) {
    console.error("Error updateeffects:", error);
    res.status(500).json({
      success: false,
      message_ar: "حدث خطأ أثناء تحميل البيانات",
    });
  }
});
//#endregion

//#region 5: Update effects data
app.post("/effects_update", async (req, res) => {
  try {
    const posted_elements = req.body;
    //! Permission
    await permissions(req, "effects_permission", "update");
    if (!permissions) {
      return;
    }

    //! sql injection check
    const hasBadSymbols = sql_anti_injection(...Object.values(posted_elements));

    if (hasBadSymbols) {
      return res.json({
        success: false,
        message_ar:
          "Invalid input detected due to prohibited characters. Please review your input and try again.",
      });
    }

    const InValidDateFormat = isInValidDateFormat([posted_elements.date_val])
    if (InValidDateFormat){
      return res.json({
        success: false,
        message_ar: InValidDateFormat_message_ar,
      });
    }

    turn_EmptyValues_TO_null(posted_elements);

if (!posted_elements.emp_name || posted_elements.emp_name == ''){
return res.json({
  success: false,
  message_ar:
    "ادخل اسم الموظف اولا",
});
}  
    //* Start--------------------------------------------------------------
    let Reference

    if (posted_elements.reference && !isNaN(posted_elements.reference) && posted_elements.reference > 0) {
      const query = `select count(reference) as count from effects where company_id = $1 AND reference = $2 And id != $3`
      const result = await db.oneOrNone(query, [req.session.company_id, posted_elements.reference, posted_elements.id_val])
      if (result && result.count > 0) {
          return res.json({
          success: false,
          message_ar: "هذا المرجع موجود بالفعل , رجاء تفعيل الوضع التلقائى او ادخل مرجع صالح",
        });
      }else{
        Reference = posted_elements.reference
      }

    }else{
      Reference = await newReference_not_transaction(req,'effects','reference')
    }

    let query1 = `UPDATE effects SET employee_id = $1, datex = $2, days = $3, hours = $4, values = $5, note = $6, reference = $7 where company_id = $8 AND id = $9`;
    await db.none(query1, [
      posted_elements.emp_id,
      posted_elements.date_val,
      posted_elements.days_val,
      posted_elements.hours_val,
      posted_elements.values_val,
      posted_elements.note_val,
      Reference,
      req.session.company_id,
      posted_elements.id_val,
    ]);

    return res.json({
      success: true,
      message_ar:
        "تم تعديل البيانات : سيتم تحويلك الان الى صفحه المؤثرات الرئيسيه",
    });
    // }
  } catch (error) {
    console.error("Error get employee data:", error);
    res.status(500).json({
      success: false,
      message_ar: "حدث خطأ أثناء تعديل البيانات",
    });
  }
});
//#endregion

//#region 6: Delete attatendace
app.post("/effects_delete", async (req, res) => {
  try {
    const posted_elements = req.body;
    //! Permission
    await permissions(req, "effects_permission", "delete");
    if (!permissions) {
      return;
    }

    //! sql injection check
    const hasBadSymbols = sql_anti_injection(...Object.values(posted_elements));

    if (hasBadSymbols) {
      return res.json({
        success: false,
        message_ar:
          "Invalid input detected due to prohibited characters. Please review your input and try again.",
      });
    }

    //* Start--------------------------------------------------------------



    let query1 = `DELETE FROM effects WHERE company_id = $1 AND id = $2`;
    await db.none(query1, [
      req.session.company_id,
      posted_elements.id_val,
    ]);

    return res.json({
      success: true,
      message_ar:
        "تم حذف البيانات بنجاح : سيتم تحويلك الان الى صفحه المؤثرات الرئيسيه",
    });
  } catch (error) {
    console.error("Error get employee data:", error);
    res.status(500).json({
      success: false,
      message_ar: "حدث خطأ أثناء حذف ",
    });
  }
});

//#endregion
//#endregion END - effects

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
        message_ar:
          "Invalid input detected due to prohibited characters. Please review your input and try again.",
      });
    }
    //* Start--------------------------------------------------------------

    //3: insert data into db
    const newId = await newId_fn("production",'id');

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
      message_ar: "تم حفظ البيانات بنجاح",
    });
  } catch (error) {
    console.error("Error adding production:", error);
    // send a response to frontend about fail transaction
    res.status(500).json({
      success: false,
      message_ar: "حدث خطأ أثناء اضافة البيانات",
    });
  }
});

// get all production data
app.post("/get_All_production_Data", async (req, res) => {
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
  } catch (error) {
    console.error("Error fetching data:", error);
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
        message_ar:
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
      message_ar: "تم تعديل البيانات : سيتم تحويلك الان الى صفحه الجرد الرئيسيه",
    });
  } catch (error) {
    console.error("Error production_update_ar", error);
    res.status(500).json({
      success: false,
      message_ar: "حدث خطأ أثناء تعديل البيانات",
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
        message_ar:
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
      message_ar:
        "تم حذف البيانات بنجاح : سيتم تحويلك الان الى صفحه الجرد والانتاج الرئيسيه",
    });
  } catch (error) {
    console.error("Error get employee data:", error);
    res.status(500).json({
      success: false,
      message_ar: "حدث خطأ اثناء حذف البيانات",
    });
  }
});
//#endregion END- production

//#region  bread

//#region 1: bread_review
app.post("/get_All_bread_Data", async (req, res) => {
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
    h.note,
    SUM(b.wazn) / 1000 AS total_wazn, 
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
      note: row.note,
      wazn: row.total_wazn,
      amount: row.total_amount,
    }));

    res.json(data);
  } catch (error) {
    console.error("Error get_All_bread_Data:", err);
    res.status(500).send("Error:");
  }
});
//#endregion

//#region 2: add_bread
app.post("/api/bread_add", async (req, res) => {
  const posted_elements = req.body;

  try {
    const newId_bread_header = await newId_fn("bread_header",'id');

    // تنفيذ معاملة قاعدة البيانات
    await db.tx(async (tx) => {
      let query1 = `INSERT INTO bread_header
                    (id, datex, vendor_id, note, company_id)
                    VALUES($1, $2, $3, $4, $5);`;

      await tx.none(query1, [
        newId_bread_header,
        posted_elements.datex,
        posted_elements.vendore_id,
        posted_elements.note_inpute_value,
        req.session.company_id,
      ]);

      let newId_bread_body = await newId_fn("bread_body",'id');

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
let query0 = `select note from bread_header where company_id = $1 AND id = $2`
let rows0 = await db.oneOrNone(query0,[req.session.company_id,posted_elements.h_id])

    let query1 = `SELECT
    wazn, 
    amount
FROM bread_body
WHERE bread_header_id = $1 ;`;
    let rows = await db.any(query1, [posted_elements.h_id]);

    // const data = rows.map((row) => ({
    //   wazn: row.wazn,
    //   amount: row.amount,
    // }));

  const data = {header:rows0 , body:rows}    
    res.json(data);
  } catch (error) {
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
      const newId_bread_header = await newId_fn("bread_header",'id');

      // تنفيذ معاملة قاعدة البيانات

      let query1 = `INSERT INTO bread_header
                    (id, datex, vendor_id, note, company_id)
                    VALUES($1, $2, $3, $4, $5);`;

      await tx.none(query1, [
        newId_bread_header,
        posted_elements.datex,
        posted_elements.vendore_id,
        posted_elements.note,
        req.session.company_id,
      ]);

      let newId_bread_body = await newId_fn("bread_body",'id');

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

//#region report effects
app.post("/report_effects", async (req, res) => {
  try {
    const posted_elements = req.body;
    //! Permission
    await permissions(req, "effects_permission", "view");
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
        message_ar:
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
    FROM effects a
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
          message_ar: "لا نتائج",
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
    FROM effects a
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
          message_ar: "لا نتائج",
        });
      }
    }
  } catch (error) {
    console.error("Error report_effects:", error);
    res.status(500).json({
      success: false,
      message_ar: "حدث خطأ أثناء تحميل البيانات",
    });
  }
});

//#endregion

//#region  Accounts

app.get("/api/tree", async (req, res) => {
  try {
    const accumulatedValues = is_accumulated_account.join(',');
    let query1 = `
    SELECT h1.id AS account_id,
    h1.account_name AS account_name,
    h1.is_final_account AS is_final_account,
    h1.account_no AS account_no,
    h1.finance_statement AS finance_statement,
    h1.cashflow_statement AS cashflow_statement,
    h1.global_id AS global_id,
    h2.id AS parent_id,
    h2.account_name AS parent_name
FROM accounts_header h1
LEFT JOIN accounts_body b ON h1.id = b.account_id
LEFT JOIN accounts_header h2 ON b.parent_id = h2.id
WHERE h1.company_id = $1
  AND h1.finance_statement IN (1, 2)
  AND (h1.global_id IS NULL OR h1.global_id != 8)
  AND (b.parent_id IS NULL OR b.parent_id NOT IN (${accumulatedValues}))
ORDER BY h1.id asc;`;  // in (1,2 ) ya3ny = 1 or 2 

    // استعلام SQL لجلب بيانات الشجرة
    
    let treeData = await db.any(query1, [req.session.company_id]);
    res.json(treeData);
  } catch (error) {
    console.error("Error fetching tree data:", error);
    res.status(500).send("Server Error");
  }
});


app.post("/api/addGroup-account", async (req, res) => {
  try {
    const posted_elements = req.body;

    // تحقق مما إذا كان يمكن حذف العقدة (قد تحتاج إلى التحقق من وجود عقد فرعية أولاً)

    // تحقق من الصلاحيات
    const hasPermission = await permissions(req, "accounts_permission", "add");
    if (!hasPermission) {
      return res.json({
        success: false,
        message_ar: "ليس لديك الصلاحيات اللازمة لاضافة هذا الحساب",
        message_en: "You do not have the necessary permissions to delete this account",
      });
    }

    // التحقق من حقن SQL
    const hasBadSymbols = sql_anti_injection([
      posted_elements.accountname,
      posted_elements.accountParent,
      // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
    ]);
    if (hasBadSymbols) {
      return res.json({
        success: false,
        message_ar: sql_injection_message_ar,
        message_en: sql_injection_message_en,
      });
    }

    //* Start--------------------------------------------------------------
    let result = [];
    const query = `
      SELECT
        (SELECT finance_statement FROM accounts_header WHERE company_id = $1 AND id = $2) AS finance_statement,
        (SELECT is_final_account FROM accounts_header WHERE company_id = $1 AND id = $2) AS is_final_account,
        (SELECT global_id FROM accounts_header WHERE company_id = $1 AND id = $2) AS global_id,
        (SELECT COUNT(account_name) FROM accounts_header WHERE company_id = $1 AND account_name = $3) AS count_account_name,
        (SELECT COUNT(main_account_id) FROM accounts_header WHERE company_id = $1 AND id = $2) AS main_account_id
    `;
    
    result = await db.oneOrNone(query, [
      req.session.company_id,
      posted_elements.accountParent,
      posted_elements.accountname,
    ]);
    

    if (result.is_final_account) {
      return res.json({
        success: false,
        message_ar: "لا يمكن مجموعه فرعية ضمن هذه المجموعه",
      });
    }


    if (result.finance_statement === null) {
      await block_user(req,'adac1')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }

    
    
    if (result.global_id !== null && is_forbidden_adding_branches.includes(result.global_id)) {
      return res.json({
        success: false,
        message_ar: "لا اضافة يمكن مجموعه فرعية ضمن هذه المجموعه",
        message_en: "Cannot add group in this group",
      });
    }
    
    if (result.count_account_name > 0) {
      return res.json({
        success: false,
        message_ar: "هذا الحساب موجود بالفعل",
        message_en: "Account with this name already exists",
      });
    }
    
    // Additional logic here if needed
    let new_account_header_id = await newId_fn('accounts_header','id');
   
    const query1 = `insert into accounts_header (id, account_name, is_final_account, finance_statement,company_id, main_account_id)
                          values ($1,$2,$3,$4,$5,$6); `;
    const query1_parameters = [new_account_header_id,posted_elements.accountname,false,result.finance_statement,req.session.company_id,result.main_account_id]

    const new_account_body_id = await newId_fn("accounts_body",'id');

    const query2 =`INSERT INTO accounts_body (id,parent_id,account_id)
                                      values($1,$2,$3);`;
    const query2_parameters = [new_account_body_id,posted_elements.accountParent,new_account_header_id];

    await db.tx(async (tx) => {
      await tx.none(query1,query1_parameters);
      await tx.none(query2,query2_parameters);

    })
    // حذف العقدة من قاعدة البيانات

    // إرسال استجابة نجاح إلى العميل
    return res.json({
      success: true,
      message_ar: "تم اضافة المجموعه بنجاح",
      message_en: "",
    });
  } catch (error) {
    console.error("Error addGroup-account:", error);
    // إرسال استجابة خطأ إلى العميل
    return res.json({
      success: false,
      message_ar: "حدث خطأ أثناء اضافة المجموعه",
      message_en: "An error occurred while deleting the account",
    });
  }
});

app.post("/api/add-account", async (req, res) => {
  

  try {
    const posted_elements = req.body;

    const hasPermission = await permissions(req, "accounts_permission", "add");
    if (!hasPermission) {
      return res.json({
        success: false,
        message_ar: "ليس لديك الصلاحيات اللازمة لاضافة هذا الحساب",
        message_en: "You do not have the necessary permissions to delete this account",
      });
    }

    // التحقق من حقن SQL
    const hasBadSymbols = sql_anti_injection([
      posted_elements.account_no,
      posted_elements.account_name,
      posted_elements.account_parent_name_id,
      posted_elements.cash_flow_statement_value,
      // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
    ]);
    if (hasBadSymbols) {
      return res.json({
        success: false,
        message_ar: sql_injection_message_ar,
        message_en: sql_injection_message_en,
      });
    }

    //#region validation
    let result = [];
    const query = `
      SELECT
        (SELECT finance_statement FROM accounts_header WHERE company_id = $1 AND id = $2) AS finance_statement,
        (SELECT is_final_account FROM accounts_header WHERE company_id = $1 AND id = $2) AS is_final_account,
        (SELECT global_id FROM accounts_header WHERE company_id = $1 AND id = $2) AS global_id,
        (SELECT COUNT(account_name) FROM accounts_header WHERE company_id = $1 AND account_name = $3) AS count_account_name,
        (SELECT COUNT(main_account_id) FROM accounts_header WHERE company_id = $1 AND id = $2) AS main_account_id
    `;

    result = await db.oneOrNone(query, [
      req.session.company_id,
      posted_elements.account_parent_name_id,
      posted_elements.account_name,
    ]);
    

    if (result.is_final_account) {
      return res.json({
        success: false,
        message_ar: "لا يمكن اضافة مجموعه فرعية ضمن هذه المجموعه",
      });
    }


    if (result.finance_statement === null) {
      await block_user(req,'ada1')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }
  
    if (result.global_id !== null && is_forbidden_adding_branches.includes(result.global_id)) {
      return res.json({
        success: false,
        message_ar: "لا يمكن اضافة حساب فرعى ضمن هذه المجموعه",
        message_en: "Cannot add group in this group",
      });
    }
    
    if (result.count_account_name > 0) {
      return res.json({
        success: false,
        message_ar: "هذا الحساب موجود بالفعل",
        message_en: "Account with this name already exists",
      });
    }
    //#endregion end- validation

    // تنفيذ معاملة قاعدة البيانات
    await db.tx(async (tx) => {
      // أدخل into accounts_header
      let new_account_id = await newId_fn("accounts_header",'id');
      let query1 = `INSERT INTO accounts_header (id, account_name, account_no, is_final_account, finance_statement, cashflow_statement, main_account_id, company_id)
                        VALUES ($1, $2, $3, $4, $5, $6, $7,$8)`;
      await tx.none(query1, [
        new_account_id,
        posted_elements.account_name,
        posted_elements.account_no,
        true,
        result.finance_statement,
        posted_elements.cash_flow_statement_value,
        result.main_account_id,
        req.session.company_id,
      ]);

      // أدخل into accounts_body
      let new_id = await newId_fn("accounts_body",'id');
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
  

  try {
    const posted_elements = req.body;
    
    const hasPermission = await permissions(req, "accounts_permission", "update");
    if (!hasPermission) {
      return res.json({
        success: false,
        message_ar: "ليس لديك الصلاحيات اللازمة لتعديل هذا الحساب",
        message_en: "You do not have the necessary permissions to delete this account",
      });
    }


    // التحقق من حقن SQL
    if (posted_elements.is_group){
      const hasBadSymbols = sql_anti_injection([
        posted_elements.account_id,
        posted_elements.account_name,
        posted_elements.parent_id,
        posted_elements.is_group,
        // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
      ]);
      if (hasBadSymbols) {
        return res.json({
          success: false,
          message_ar: sql_injection_message_ar,
          message_en: sql_injection_message_en,
        });
      }
    }else{
      const hasBadSymbols = sql_anti_injection([
        posted_elements.account_name,
        posted_elements.account_no,
        posted_elements.statment_type_value,
        posted_elements.account_id,
        posted_elements.parent_id,
        posted_elements.is_group,
        // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
      ]);
      if (hasBadSymbols) {
        return res.json({
          success: false,
          message_ar: sql_injection_message_ar,
          message_en: sql_injection_message_en,
        });
      }
    }


    let result = [];
    const query = `
      SELECT
        (SELECT finance_statement FROM accounts_header WHERE company_id = $1 AND id = $2) AS finance_statement,
        (SELECT is_final_account FROM accounts_header WHERE company_id = $1 AND id = $2) AS is_final_account,
        (SELECT global_id FROM accounts_header WHERE company_id = $1 AND id = $2) AS global_id,
        (SELECT COUNT(account_name) FROM accounts_header WHERE company_id = $1 AND account_name = $3 AND id != $4) AS count_account_name,
        (SELECT COUNT(main_account_id) FROM accounts_header WHERE company_id = $1 AND id = $2) AS main_account_id
    `;

    result = await db.oneOrNone(query, [
      req.session.company_id,
      posted_elements.parent_id,
      posted_elements.account_name,
      posted_elements.account_id,
    ]);
    
    if (result.is_final_account) {
      return res.json({
        success: false,
        message_ar: "لا يمكن اضافة مجموعه فرعية ضمن هذه المجموعه",
      });
    }

    if (!posted_elements.is_group){
      if (result.finance_statement === null) {
        await block_user(req,'uda1')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }
    }

    
    if (result.global_id !== null && is_forbidden_adding_branches.includes(result.global_id)) {
      return res.json({
        success: false,
        message_ar: "لا يمكن اضافة حساب فرعى ضمن هذه المجموعه",
        message_en: "Cannot add group in this group",
      });
    }
    
    if (result.count_account_name > 0) {
      return res.json({
        success: false,
        message_ar: "هذا الحساب موجود بالفعل",
        message_en: "Account with this name already exists",
      });
    }

    let query1;
    let query1_parameters;
    let query2;
    let query2_parameters;
    if (posted_elements.is_group){

      query1 = `UPDATE accounts_header SET 
      account_name = $1
      WHERE company_id = $2 AND id = $3`;
      query1_parameters = [
        posted_elements.account_name,
        req.session.company_id,
        posted_elements.account_id,
      ]

      query2 = `UPDATE accounts_body SET 
      parent_id = $1
      WHERE account_id = $2`;
      query2_parameters = [
        posted_elements.parent_id,
        posted_elements.account_id
      ]


    }else{
      query1 = `UPDATE accounts_header SET 
      account_name = $1,
      account_no = $2,
      finance_statement = $3,
      cashflow_statement = $4
      WHERE company_id = $5 AND id = $6`;
      query1_parameters = [
        posted_elements.account_name,
        posted_elements.account_no,
        posted_elements.statment_type_value,
        posted_elements.cash_flow_statement_value,
        req.session.company_id,
        posted_elements.account_id,
      ]

      query2 = `UPDATE accounts_body SET 
      parent_id = $1
      WHERE account_id = $2`;
      query2_parameters = [
        posted_elements.parent_id,
        posted_elements.account_id
      ]
    }

    // تنفيذ معاملة قاعدة البيانات
    await db.tx(async (tx) => {
      await tx.none(query1, query1_parameters);
      await tx.none(query2, query2_parameters)
    });

    // إذا تم تنفيذ جميع الاستعلامات بنجاح
    return res.json({
      success: true,
      message_ar: "تم تعديل البيانات بنجاح",
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

app.post("/api/rename-account", async (req, res) => {
  try {
    const posted_elements = req.body;

    // تحقق مما إذا كان يمكن حذف العقدة (قد تحتاج إلى التحقق من وجود عقد فرعية أولاً)

    // //! Permission

    const hasPermission = await permissions(req, "accounts_permission", "update");
    if (!hasPermission) {
      return res.json({
        success: false,
        message_ar: "ليس لديك الصلاحيات اللازمة لتحديث هذا الحساب",
        message_en: "You do not have the necessary permissions to delete this account",
      });
    }

    //! sql injection check
    const hasBadSymbols = sql_anti_injection([
      posted_elements.account_id,
      posted_elements.account_rename_input
    ]);
    if (hasBadSymbols) {
      return res.json({
        success: false,
        message_ar: "تم الكشف عن مدخلات غير صالحة بسبب وجود رموز ممنوعة. يرجى مراجعة المدخلات والمحاولة مرة أخرى.",
        message_ar: "Invalid input detected due to prohibited characters. Please review your input and try again.",
      });
    }

    // استعلام واحد لجلب كل البيانات المطلوبة
    const query = `
      SELECT 
        (SELECT COUNT(*) FROM accounts_header WHERE company_id = $1 AND id = $2) AS account_exists,
        (SELECT global_id FROM accounts_header WHERE company_id = $1 AND id = $2) AS global_id,
        (SELECT COUNT(*) FROM accounts_header WHERE company_id = $1 AND id != $2 AND trim(account_name) = $3) AS account_name_exists
    `;
    const result = await db.oneOrNone(query, [
      req.session.company_id,
      posted_elements.account_id,
      posted_elements.account_rename_input
    ]);

    // التحقق من أن الحساب موجود
    if (result.account_exists === 0) {
      await block_user(req,'arc01');
      return res.json({
        success: false,
        message_ar: "تم حظر الحساب",
        xx: true,
        message_en: "Cannot delete account with sub-accounts",
      });
    }

    // التحقق من أن الحساب لا يمكن حذفه
    if (result.global_id !== null && global_id > 0) {
      return res.json({
        success: false,
        message_ar: "لا يمكن اعادة تمسية الحساب المحدد لانه من الحسابات الافتراضية",
        message_en: "Cannot delete account with sub-accounts",
      });
    }

    // التحقق من أن الاسم الجديد غير موجود بالفعل
    if (result.account_name_exists > 0) {
      return res.json({
        success: false,
        message_ar: "هذا الاسم موجود بالفعل : تم الغاء العمليه",
        message_en: "Cannot delete account with sub-accounts",
      });
    }

    // تحديث الاسم
    const updateQuery = `
      UPDATE accounts_header 
      SET account_name = $1 
      WHERE company_id = $2 AND id = $3
    `;
    await db.none(updateQuery, [
      posted_elements.account_rename_input,
      req.session.company_id,
      posted_elements.account_id
    ]);

    // إرسال استجابة نجاح إلى العميل
    return res.json({
      success: true,
      message_ar: "تم تحديث اسم الحساب بنجاح",
      message_en: "Account deleted successfully",
    });
  } catch (error) {
    console.error("Error rename account:", error);
    // إرسال استجابة خطأ إلى العميل
    return res.json({
      success: false,
      message_ar: "حدث خطأ اثناء معالجة البيانات : تم الغاء العمليه",
      message_en: "Can't delete this account with sub-accounts in it",
    });
  }
});





// مسار لمعالجة طلبات حذف الحساب
app.post("/api/delete-account", async (req, res) => {
  try {
    const posted_elements = req.body;

    // تحقق مما إذا كان يمكن حذف العقدة (قد تحتاج إلى التحقق من وجود عقد فرعية أولاً)

    // تحقق من الصلاحيات
    const hasPermission = await permissions(req, "accounts_permission", "delete");
    if (!hasPermission) {
      return res.json({
        success: false,
        message_ar: "ليس لديك الصلاحيات اللازمة لحذف هذا الحساب",
        message_en: "You do not have the necessary permissions to delete this account",
      });
    }

    // التحقق من حقن SQL
    const hasBadSymbols = sql_anti_injection([
      posted_elements.account_id,
      // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
    ]);
    if (hasBadSymbols) {
      return res.json({
        success: false,
        message_ar: sql_injection_message_ar,
        message_en: sql_injection_message_en,
      });
    }

    //* Start--------------------------------------------------------------

    const query = `
      SELECT
        (SELECT COUNT(*) FROM accounts_header WHERE company_id = $1 AND id = $2) AS account_exists,
         (SELECT global_id FROM accounts_header WHERE company_id = $1 AND id = $2) AS global_id,
        (SELECT COUNT(*) FROM accounts_body WHERE parent_id = $2) as parentId
    `;

    const result = await db.oneOrNone(query, [
      req.session.company_id,
      posted_elements.account_id
    ]);


    if (result.account_exists === 0){
      await block_user(req,'adc01');
      return res.json({
        success: false,
        message_ar: "تم حظر الحساب",
        xx: true,
        message_en: "Cannot delete account with sub-accounts",
      });
    }

    if (result.global_id !== null && global_id > 0) {
      return res.json({
        success: false,
        message_ar: "لا يمكن حذف الحساب المحدد لأنه من الحسابات الافتراضية",
        message_en: "Cannot delete account as it is a default account",
      });
    }

    if (result.parentid > 0) {
      return res.json({
        success: false,
        message_ar: "لا يمكن حذف الحساب المحدد لوجود حسابات فرعية بداخله",
        message_en: "Cannot delete account with sub-accounts",
      });
    }

    // حذف العقدة من قاعدة البيانات
    const deleteQuery = `
      DELETE FROM accounts_header 
      WHERE company_id = $1 AND id = $2
    `;
    await db.none(deleteQuery, [req.session.company_id, posted_elements.account_id]);

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
      message_ar: "حدث خطأ أثناء حذف الحساب",
      message_en: "An error occurred while deleting the account",
    });
  }
});


// dnd / drag and drop changes
app.post("/api/update-account-parent", async (req, res) => {
  try {
    const { currentAccountId, newParentId } = req.body; // جلب معلومات العقدة المراد تعديلها

    const hasPermission = await permissions(req, "accounts_permission", "update");
    if (!hasPermission) {
      return res.json({
        success: false,
        message_ar: "ليس لديك الصلاحيات اللازمة لتعديل هذا الحساب",
        message_en: "You do not have the necessary permissions to delete this account",
      });
    }

    // التحقق من حقن SQL
    const hasBadSymbols = sql_anti_injection([
      currentAccountId,
      newParentId
      // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
    ]);
    if (hasBadSymbols) {
      return res.json({
        success: false,
        message_ar: sql_injection_message_ar,
        message_en: sql_injection_message_en,
      });
    }

  



    const query = `
    SELECT
      (SELECT COUNT(*) FROM accounts_header WHERE company_id = $1 AND id = $2) as account_id,
      (SELECT COUNT(*) FROM accounts_header WHERE company_id = $1 AND id = $3) as parent_id,
      (SELECT finance_statement FROM accounts_header WHERE company_id = $1 AND id = $2) AS finance_statement
  `;

  const result = await db.oneOrNone(query, [
    req.session.company_id,
    currentAccountId,
    newParentId
  ]);





    if (result.account_id === 0 || result.parent_id === 0){
      await block_user(req,'udp01');
      return res.json({
        success: false,
        message_ar: "تم حظر الحساب",
        xx: true,
        message_en: "Cannot delete account with sub-accounts",
      });
    }



    const forbiddenValues = is_forbidden_adding_branches.join(','); // تحويل المصفوفه الى سلسه نصيه

    console.log(is_forbidden_adding_branches);
    console.log(forbiddenValues);
    
    const query0 = `select
    id
  from
    accounts_header
  where
    company_id = $1
    and id != $2
    and finance_statement = $3
    AND (is_final_account = false OR is_final_account IS NULL)
    AND global_id NOT IN (${forbiddenValues})`
  
    const result0 = await db.any(query0,[
      req.session.company_id,
      currentAccountId,
      result.finance_statement
    ])

 
    const ids_array = result0.map(row => row.id); // استخراج قيم الـ id من نتائج الاستعلام

    if (!ids_array.includes(newParentId)) {
      return res.json({
        success: false,
        message_ar: "لا يمكن اضافة مجموعه فرعيه ضمن الحساب المحدد",
        message_en: "Cannot delete account with sub-accounts",
      });
    }




    // تحديث الأب الخاص بالعقدة في قاعدة البيانات
    const updateQuery = `
          UPDATE accounts_body
          SET parent_id = $1
          WHERE account_id = $2;
      `;
    await db.query(updateQuery, [newParentId, currentAccountId]);

    // إرسال استجابة نجاح إلى العميل
    return res.json({
      success: true,
      message_ar: "تم حفظ البيانات بنجاح",
    });
  } catch (error) {
    console.error("Error updating parent:", error);
    // إرسال خطأ إلى العميل
    res.status(500).send("Failed to update parent");
  }
});

// get all final accounts by company_id
app.post("/getAccountsData1", async (req, res) => {
  try {
    // //! Permission
    // await permissions(req, "effects_permission", "view");
    // if (!permissions) {
    //   return;
    // }

    //* Start--------------------------------------------------------------
    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");

    let query1 = `SELECT A.id, A.account_name, A.account_type_id FROM accounts_header A where A.company_id = 1 AND is_final_account = true AND (global_id != 8 OR global_id IS NULL)`;
    let rows = await db.any(query1, [req.session.company_id]);

    const data = rows.map((row) => ({
      id: row.id,
      account_name: row.account_name,
      account_type: row.account_type_id
    }));
    res.json(data);
  } catch (error) {
    console.error("Error while get accounts Data", error);
    res.join;
    res
      .status(500)
      .json({ success: false, message_ar: "Error while get accounts Data" });
  }
});

//#endregion



//#region items

  //#region tree

 //#region 1 : view items - tree
 app.get("/api/tree/items", async (req, res) => {
  try {

    // تحديد حساب المخزون الحالى للشركه لكى يتم استثناءه فى الاستعلام التالى
    let query = `SELECT id FROM accounts_header WHERE global_id = 12 AND company_id = $1`;
    let result = await db.one(query, [req.session.company_id]);

    let stock_id = parseInt(result.id);


    //! fe el est3lam da han5aly el parent_id eta3 7esap el stock = null >> lazem 3ashan el tree teshta8al 
    let query1 = `
     SELECT h1.id AS account_id,
    h1.account_name AS account_name,
    h1.is_final_account AS is_final_account,
    h1.account_no AS account_no,
    h1.finance_statement AS finance_statement,
    h1.cashflow_statement AS cashflow_statement,
    h1.global_id AS global_id,
    h1.item_revenue_account AS item_revenue_account,
    h1.item_expense_account AS item_expense_account,
    h1.item_sales_price AS item_sales_price,
    h1.item_purshas_price AS item_purshas_price,
    h1.item_amount_reorder_point AS item_amount_reorder_point,
    h1.item_unite AS item_unite,
      CASE
        WHEN h1.id = $2 THEN NULL
        ELSE h2.id
      END AS parent_id,
    h2.account_name AS parent_name
FROM accounts_header h1
LEFT JOIN accounts_body b ON h1.id = b.account_id
LEFT JOIN accounts_header h2 ON b.parent_id = h2.id
WHERE h1.company_id = $1
    AND h1.account_type_id = 5
ORDER BY h1.id asc;`;  // in (1,2 ) ya3ny = 1 or 2 

    // استعلام SQL لجلب بيانات الشجرة
    let treeData = await db.any(query1, [req.session.company_id,stock_id]);
    
    res.json(treeData);
  } catch (error) {
    console.error("Error fetching tree data:", error);
    res.status(500).send("Server Error");
  }
});
 //#endregion

//#region 2 : get revenue_account
app.post("/api/get_revenue_accounts", async (req, res) => {
  try {
    console.log('start');
    let query1 = `select id, account_name, global_id
from accounts_header
where company_id = $1 AND main_account_id = 4 AND is_final_account = true
order by account_name ASC ;`;  // in (1,2 ) ya3ny = 1 or 2 

    // استعلام SQL لجلب بيانات الشجرة
    let data = await db.any(query1,[req.session.company_id]);
    res.json(data);
  } catch (error) {
    console.error("api/get_revenue_accounts:", error);
    res.status(500).send("Server Error");
  }
});
//#endregion

  //#region 2: add item group
  app.post("/api/addGroup-item", async (req, res) => {
    try {
      const posted_elements = req.body;
  
      // تحقق مما إذا كان يمكن حذف العقدة (قد تحتاج إلى التحقق من وجود عقد فرعية أولاً)
  
      // تحقق من الصلاحيات
      const hasPermission = await permissions(req,"items_permission", "add");
      if (!hasPermission) {
        return res.json({
          success: false,
          message_ar: "ليس لديك الصلاحيات اللازمة لاضافة هذا المجموعة",
          message_en: "You do not have the necessary permissions to delete this account",
        });
      }
  
      // التحقق من حقن SQL
      const hasBadSymbols = sql_anti_injection([
        posted_elements.accountname,
        posted_elements.accountParent,
        // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
      ]);
      if (hasBadSymbols) {
        return res.json({
          success: false,
          message_ar: sql_injection_message_ar,
          message_en: sql_injection_message_en,
        });
      }
  
      //* Start--------------------------------------------------------------
      let result = [];
      const query = `
        SELECT
          (SELECT COUNT(id) FROM accounts_header WHERE company_id = $1 AND id = $2) as parent_exist,
          (SELECT is_final_account FROM accounts_header WHERE company_id = $1 AND id = $2) AS is_final_account,
          (SELECT COUNT(account_name) FROM accounts_header WHERE company_id = $1 AND account_name = $3) AS count_account_name
      `;
      
      result = await db.oneOrNone(query, [
        req.session.company_id,
        posted_elements.accountParent,
        posted_elements.accountname,
      ]);
      

      if (parseInt(result.parent_exist) === 0) {
        await block_user(req,'adai0')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }

      if (result.is_final_account) {
        await block_user(req,'adai1')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }
  
  

      
      if (result.count_account_name > 0) {
        return res.json({
          success: false,
          message_ar: "هذا الاسم موجود بالفعل",
          message_en: "Account with this name already exists",
        });
      }
      
      // Additional logic here if needed
      let new_account_header_id = await newId_fn('accounts_header','id');
     
      const query1 = `insert into accounts_header (id, account_name, is_final_account, account_type_id,company_id)
                            values ($1,$2,$3,$4,$5); `;
      const query1_parameters = [new_account_header_id,posted_elements.accountname,false,5,req.session.company_id]
  
      const new_account_body_id = await newId_fn("accounts_body",'id');
  
      const query2 =`INSERT INTO accounts_body (id,parent_id,account_id)
                                        values($1,$2,$3);`;
      const query2_parameters = [new_account_body_id,posted_elements.accountParent,new_account_header_id];
  
      await db.tx(async (tx) => {
        await tx.none(query1,query1_parameters);
        await tx.none(query2,query2_parameters);
  
      })
      // حذف العقدة من قاعدة البيانات
  
      // إرسال استجابة نجاح إلى العميل
      return res.json({
        success: true,
        message_ar: "تم اضافة المجموعه بنجاح",
        message_en: "",
      });
    } catch (error) {
      console.error("Error addGroup-account:", error);
      // إرسال استجابة خطأ إلى العميل
      return res.json({
        success: false,
        message_ar: "حدث خطأ أثناء اضافة المجموعه",
        message_en: "An error occurred while deleting the account",
      });
    }
  });
  
  //#endregion

//#region add new item
app.post("/api/add-item", async (req, res) => {
  

  try {
    const posted_elements = req.body;

    const hasPermission = await permissions(req, "items_permission", "add");
    if (!hasPermission) {
      return res.json({
        success: false,
        message_ar: "ليس لديك الصلاحيات اللازمة لاضافة هذا الحساب",
        message_en: "You do not have the necessary permissions to delete this account",
      });
    }

    // التحقق من حقن SQL
    const hasBadSymbols = sql_anti_injection([
      posted_elements.account_no,
      posted_elements.account_name,
      posted_elements.item_unite_input,
      posted_elements.account_parent_name_id,
      posted_elements.revenue_account_select_value,
      posted_elements.sales_price,
      posted_elements.purchase_price,
      posted_elements.reorder_point
      // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
    ]);
    if (hasBadSymbols) {
      return res.json({
        success: false,
        message_ar: sql_injection_message_ar,
        message_en: sql_injection_message_en,
      });
    }

    //#region validation
    let result = [];
    const query = `
      SELECT
        (SELECT is_final_account FROM accounts_header WHERE company_id = $1 AND id = $2) AS is_final_account,
        (SELECT COUNT(account_name) FROM accounts_header WHERE company_id = $1 AND account_name = $3) AS count_account_parent,
        (SELECT COUNT(account_name) FROM accounts_header WHERE company_id = $1 AND account_name = $3) AS count_account_name,
        (SELECT id FROM accounts_header WHERE company_id = $1 AND global_id = 17) AS cost_account_id
    `;

    result = await db.oneOrNone(query, [
      req.session.company_id,
      posted_elements.account_parent_name_id,
      posted_elements.account_name,
    ]);
    

    if (result.is_final_account) {
      return res.json({
        success: false,
        message_ar: "لا يمكن اضافة مجموعه فرعية ضمن هذه المجموعه",
      });
    }


    
    if (result.count_account_parent === 0) {
      await block_user(req,'aai1')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }

    if (result.count_account_name > 0) {
      return res.json({
        success: false,
        message_ar: "هذا الحساب موجود بالفعل",
        message_en: "Account with this name already exists",
      });
    }

    //#endregion end- validation

    // تنفيذ معاملة قاعدة البيانات
    await db.tx(async (tx) => {

    

      // أدخل into accounts_header
      let new_account_id = await newId_fn("accounts_header",'id');
      let query1 = `INSERT INTO accounts_header (id, account_name, account_no, is_final_account, account_type_id, item_revenue_account, item_expense_account, item_sales_price, item_purshas_price, item_amount_reorder_point, item_unite, company_id)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;
      await tx.none(query1, [
        new_account_id,
        posted_elements.account_name,
        posted_elements.account_no,
        true,
        5,
        posted_elements.revenue_account_select_value,
        result.cost_account_id,
        posted_elements.sales_price,
        posted_elements.purchase_price,
        posted_elements.reorder_point,
        posted_elements.item_unite_input,
        req.session.company_id
      ]);

      // أدخل into accounts_body
      let new_id = await newId_fn("accounts_body",'id');
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

//#endregion

//#region update Group
app.post("/api/update-group_items", async (req, res) => {
  

  try {
    const posted_elements = req.body;
    
    const hasPermission = await permissions(req, "items_permission", "update");
    if (!hasPermission) {
      return res.json({
        success: false,
        message_ar: "ليس لديك الصلاحيات اللازمة لتعديل هذه المجموعة",
        message_en: "You do not have the necessary permissions to delete this account",
      });
    }


    // التحقق من حقن SQL

      const hasBadSymbols = sql_anti_injection([
        posted_elements.account_id,
        posted_elements.account_name,
        posted_elements.parent_id,
        // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
      ]);
      if (hasBadSymbols) {
        return res.json({
          success: false,
          message_ar: sql_injection_message_ar,
          message_en: sql_injection_message_en,
        });
      }


    let result = [];
    const query = `
      SELECT

        (SELECT is_final_account FROM accounts_header WHERE company_id = $1 AND id = $4) AS is_final_account_item,
        (SELECT is_final_account FROM accounts_header WHERE company_id = $1 AND id = $2) AS is_final_account_parent,
        (SELECT COUNT(account_name) FROM accounts_header WHERE company_id = $1 AND account_name = $3 AND id != $4) AS count_account_name
    `;

    result = await db.oneOrNone(query, [
      req.session.company_id,
      posted_elements.parent_id,
      posted_elements.account_name,
      posted_elements.account_id,
    ]);
    


      if (result.is_final_account_item || result.is_final_account_parent) {
        await block_user(req,'uda1')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }


    
    if (result.count_account_name > 0) {
      return res.json({
        success: false,
        message_ar: "هذا الحساب موجود بالفعل",
        message_en: "Account with this name already exists",
      });
    }

    let query1;
    let query1_parameters;
    let query2;
    let query2_parameters;


      query1 = `UPDATE accounts_header SET 
      account_name = $1
      WHERE company_id = $2 AND id = $3`;
      query1_parameters = [
        posted_elements.account_name,
        req.session.company_id,
        posted_elements.account_id,
      ]

      query2 = `UPDATE accounts_body SET 
      parent_id = $1
      WHERE account_id = $2`;
      query2_parameters = [
        posted_elements.parent_id,
        posted_elements.account_id
      ]


 

    // تنفيذ معاملة قاعدة البيانات
    await db.tx(async (tx) => {
      await tx.none(query1, query1_parameters);
      await tx.none(query2, query2_parameters)
    });

    // إذا تم تنفيذ جميع الاستعلامات بنجاح
    return res.json({
      success: true,
      message_ar: "تم تعديل البيانات بنجاح",
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

//#endregion

//#region drag and drop
app.post("/api/items_tree_drag_and_drop", async (req, res) => {
  try {
 
    const { currentAccountId, newParentId } = req.body; // جلب معلومات العقدة المراد تعديلها

    const hasPermission = await permissions(req, "items_permission", "update");
    if (!hasPermission) {
      return res.json({
        success: false,
        message_ar: "ليس لديك الصلاحيات اللازمة لتعديل هذا الصنف",
        message_en: "You do not have the necessary permissions to delete this account",
      });
    }

    // التحقق من حقن SQL
    const hasBadSymbols = sql_anti_injection([
      currentAccountId,
      newParentId
      // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
    ]);
    if (hasBadSymbols) {
      return res.json({
        success: false,
        message_ar: sql_injection_message_ar,
        message_en: sql_injection_message_en,
      });
    }

  



    const query = `
    SELECT
      (SELECT COUNT(id) FROM accounts_header WHERE company_id = $1 AND id = $2) as account_id,
      (SELECT COUNT(id) FROM accounts_header WHERE company_id = $1 AND id = $3) as parent_id,
      (SELECT is_final_account FROM accounts_header WHERE company_id = $1 AND id = $3) as is_parent_group
  `;

  const result = await db.oneOrNone(query, [
    req.session.company_id,
    currentAccountId,
    newParentId
  ]);


    if (result.account_id === 0 || result.parent_id === 0){
      await block_user(req,'udp01');
      return res.json({
        success: false,
        message_ar: "تم حظر الحساب",
        xx: true,
        message_en: "Cannot delete account with sub-accounts",
      });
    }


    
    if (result.is_parent_group) {
      return res.json({
        success: false,
        message_ar: "لا يمكن اضافه الصنف الحالى داخل المجموعه المحدد",
        message_en: "Cannot delete account with sub-accounts",
      });
    }


  //   const forbiddenValues = is_forbidden_adding_branches.join(','); // تحويل المصفوفه الى سلسه نصيه

    
  //   const query0 = `select
  //   id
  // from
  //   accounts_header
  // where
  //   company_id = $1
  //   and id != $2
  //   and finance_statement = $3
  //   AND (is_final_account = false OR is_final_account IS NULL)
  //   AND global_id NOT IN (${forbiddenValues})`
  
  //   const result0 = await db.any(query0,[
  //     req.session.company_id,
  //     currentAccountId,
  //     result.finance_statement
  //   ])

 
  //   const ids_array = result0.map(row => row.id); // استخراج قيم الـ id من نتائج الاستعلام

  //   if (!ids_array.includes(newParentId)) {
  //     return res.json({
  //       success: false,
  //       message_ar: "لا يمكن اضافة مجموعه فرعيه ضمن الحساب المحدد",
  //       message_en: "Cannot delete account with sub-accounts",
  //     });
  //   }




    // تحديث الأب الخاص بالعقدة في قاعدة البيانات
    const updateQuery = `
          UPDATE accounts_body
          SET parent_id = $1
          WHERE account_id = $2;
      `;
    await db.query(updateQuery, [newParentId, currentAccountId]);

    // إرسال استجابة نجاح إلى العميل
    return res.json({
      success: true,
      message_ar: "تم حفظ البيانات بنجاح",
    });
  } catch (error) {
    console.error("Error updating parent:", error);
    // إرسال خطأ إلى العميل
    res.status(500).send("Failed to update parent");
  }
});
//#endregion

//#endregion end tree
app.post("/get_All_items_Data_for_table", async (req, res) => {
  try {
    //! Permission
    await permissions(req, "items_permission", "view");
    if (!permissions) {
      return;
    }

    //* Start--------------------------------------------------------------

    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");

    let query1 = `SELECT h1.id AS account_id,
    h1.account_name AS account_name,
    h1.item_unite as item_unite,
    h2.account_name AS parent_name,
    h2.id AS parent_id,
    h1.is_final_account AS is_final_account,
    h1.account_no AS account_no,
    h1.item_revenue_account AS item_revenue_account,
    h1.item_expense_account AS item_expense_account,
    h1.item_sales_price AS item_sales_price,
    h1.item_purshas_price AS item_purshas_price,
    h1.item_amount_reorder_point AS item_amount_reorder_point
FROM accounts_header h1
LEFT JOIN accounts_body b ON h1.id = b.account_id
LEFT JOIN accounts_header h2 ON b.parent_id = h2.id
WHERE h1.company_id = $1
  AND h1.account_type_id = 5
  AND h1.is_final_account = true
ORDER BY h1.id asc;;
`;
    let data = await db.any(query1, [req.session.company_id]);
    res.json(data);
  } catch (error) {
    console.error("Error get_All_bread_Data:", err);
    res.status(500).send("Error:");
  }
});

//#region table 

//#region 1: get data for items table-view

//#endregion
//#region update item 
app.post("/api/update-item", async (req, res) => {
  

  try {
    const posted_elements = req.body;
    
    const hasPermission = await permissions(req, "accounts_permission", "update");
    if (!hasPermission) {
      return res.json({
        success: false,
        message_ar: "ليس لديك الصلاحيات اللازمة لتعديل هذا الحساب",
        message_en: "You do not have the necessary permissions to delete this account",
      });
    }


    // التحقق من حقن SQL

      const hasBadSymbols = sql_anti_injection([
        posted_elements.account_no,
        posted_elements.item_id,
        posted_elements.account_name,
        posted_elements.item_unite_input,
        posted_elements.account_parent_id,
        posted_elements.revenue_account_select_value,
        posted_elements.sales_price,
        posted_elements.purchase_price,
        posted_elements.reorder_point
        // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
      ]);
      if (hasBadSymbols) {
        return res.json({
          success: false,
          message_ar: sql_injection_message_ar,
          message_en: sql_injection_message_en,
        });
      }
   


    let result = [];
    const query = `
      SELECT
        (SELECT is_final_account FROM accounts_header WHERE company_id = $1 AND id = $2) AS is_final_account_for_parent,
        (SELECT is_final_account FROM accounts_header WHERE company_id = $1 AND id = $4) AS is_final_account,
        (SELECT COUNT(id) FROM accounts_header WHERE company_id = $1 AND id = $4) AS count_account_id,
        (SELECT COUNT(id) FROM accounts_header WHERE company_id = $1 AND id = $2) AS count_account_parent,
        (SELECT COUNT(account_name) FROM accounts_header WHERE company_id = $1 AND account_name = $3 AND id != $4) AS count_account_name
    `;

    result = await db.oneOrNone(query, [
      req.session.company_id,
      posted_elements.account_parent_id,
      posted_elements.account_name,
      posted_elements.item_id,
    ]);
    


    if (result.is_final_account_for_parent || !result.is_final_account || result.count_account_id === 0 || result.count_account_parent === 0){
      if (result.finance_statement === null) {
        await block_user(req,'udi1')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }
    }

    
    
    if (result.count_account_name > 0) {
      return res.json({
        success: false,
        message_ar: "اسم الصنف موجود بالفعل",
        message_en: "Account with this name already exists",
      });
    }

    let query1;
    let query1_parameters;
    let query2;
    let query2_parameters;


      query1 = `UPDATE accounts_header SET 
      account_name = $1, account_no = $2, item_revenue_account = $3, item_sales_price = $4, item_purshas_price = $5, item_amount_reorder_point = $6 , item_unite = $7
      WHERE company_id = $8 AND id = $9`;
      query1_parameters = [
        posted_elements.account_name,
        posted_elements.account_no,
        posted_elements.revenue_account_select_value,
        posted_elements.sales_price,
        posted_elements.purchase_price,
        posted_elements.reorder_point,
        posted_elements.item_unite_input,
        req.session.company_id,
        posted_elements.item_id,
      ]

      query2 = `UPDATE accounts_body SET 
      parent_id = $1
      WHERE account_id = $2`;
      query2_parameters = [
        posted_elements.account_parent_id,
        posted_elements.item_id
      ]


   

    // تنفيذ معاملة قاعدة البيانات
    await db.tx(async (tx) => {
      await tx.none(query1, query1_parameters);
      await tx.none(query2, query2_parameters)
    });

    // إذا تم تنفيذ جميع الاستعلامات بنجاح
    return res.json({
      success: true,
      message_ar: "تم تعديل البيانات بنجاح",
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
//#endregion

//#region delete item
app.post("/api/delete-item", async (req, res) => {
  try {
    const posted_elements = req.body;

    // تحقق مما إذا كان يمكن حذف العقدة (قد تحتاج إلى التحقق من وجود عقد فرعية أولاً)

    // تحقق من الصلاحيات
    const hasPermission = await permissions(req, "items_permission", "delete");
    if (!hasPermission) {
      return res.json({
        success: false,
        message_ar: "ليس لديك الصلاحيات اللازمة لحذف هذا الصنف",
        message_en: "You do not have the necessary permissions to delete this account",
      });
    }

    // التحقق من حقن SQL
    const hasBadSymbols = sql_anti_injection([
      posted_elements.account_id,
      // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
    ]);
    if (hasBadSymbols) {
      return res.json({
        success: false,
        message_ar: sql_injection_message_ar,
        message_en: sql_injection_message_en,
      });
    }

    //* Start--------------------------------------------------------------

    const query = `
      SELECT
        (SELECT COUNT(id) FROM accounts_header WHERE company_id = $1 AND id = $2) AS account_exists,
        (SELECT COUNT(id) FROM accounts_body WHERE parent_id = $2) as parentId
    `;

    const result = await db.oneOrNone(query, [
      req.session.company_id,
      posted_elements.account_id
    ]);


    if (result.account_exists === 0){
      await block_user(req,'adc01');
      return res.json({
        success: false,
        message_ar: "تم حظر الحساب",
        xx: true,
        message_en: "Cannot delete account with sub-accounts",
      });
    }


    if (result.parentid > 0) {
      return res.json({
        success: false,
        message_ar: "لا يمكن حذف الحساب المحدد لوجود حسابات فرعية بداخله",
        message_en: "Cannot delete account with sub-accounts",
      });
    }

    // حذف العقدة من قاعدة البيانات
    const deleteQuery = `
      DELETE FROM accounts_header 
      WHERE company_id = $1 AND id = $2
    `;
    await db.none(deleteQuery, [req.session.company_id, posted_elements.account_id]);

    // إرسال استجابة نجاح إلى العميل
    return res.json({
      success: true,
      message_ar: "تم حذف الصنف بنجاح",
      message_en: "Account deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting account:", error);
    // إرسال استجابة خطأ إلى العميل
    return res.json({
      success: false,
      message_ar: "حدث خطأ أثناء حذف الصنف",
      message_en: "An error occurred while deleting the account",
    });
  }
});
//#endregion

 //#endregion

//#region  transaction

//#region 
app.post("/api/transaction_accounts_types", async (req, res) => {
  try {
    let query1 = `select id, account_type_name
from account_type
where id > 0
order by id ASC ;`;  // in (1,2 ) ya3ny = 1 or 2 

    // استعلام SQL لجلب بيانات الشجرة
    let data = await db.any(query1);
    res.json(data);
  } catch (error) {
    console.error("/api/transaction_accounts_types:", error);
    res.status(500).send("Server Error");
  }
});
//#endregion


//#region 
app.post("/api/transaction_items_locations", async (req, res) => {
  try {
    let query1 = `select id, account_name
from accounts_header
where company_id = $1 AND account_type_id = 7 
order by account_name ASC ;`;  // in (1,2 ) ya3ny = 1 or 2 

    // استعلام SQL لجلب بيانات الشجرة
    let data = await db.any(query1,[req.session.company_id]);
    res.json(data);
  } catch (error) {
    console.error("/api/transaction_items_locations:", error);
    res.status(500).send("Server Error");
  }
});
//#endregion

//#region 1: transaction_review
app.post("/get_All_transaction_Data", async (req, res) => {
  try {
    //! Permission
    await permissions(req, "transaction_permission", "view");
    if (!permissions) {
      return;
    }

    //* Start--------------------------------------------------------------

    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");

    let query1 = `select
	id,
	refrence,
	datex,	
	general_note,
	COALESCE(total_value, 0) AS total_value
from transaction_header
where company_id = $1 and transaction_type = 2
ORDER BY datex DESC, refrence desc;
`;
    let rows = await db.any(query1, [req.session.company_id]);

    const data = rows.map((row) => ({
      id: row.id,
      refrence: row.refrence,
      datex: row.datex,
      note: row.general_note,
      valuex: row.total_value,
    }));

    res.json(data);
  } catch (error) {
    console.error("Error get_All_transaction_Data:", err);
    res.status(500).send("Error:");
  }
});
//#endregion


//#region 2: add transaction
app.post("/api/transaction_add", async (req, res) => {
  try {
  const posted_elements = req.body;

  const transaction_type = 2



    //! Permission
    await permissions(req, "transaction_permission", "add");
    if (!permissions) {
      return;
    }


        //! Permission
    // await permissions(req, 'bread_permission', 'view');
    // if (!permissions) { return; };
    //! sql injection check
    let hasBadSymbols = sql_anti_injection([
      ...posted_elements.posted_array.map((obj) => obj.account_id + obj.note_row + obj.debt + obj.credit ), // تحويل كل عنصر في dataArray إلى سلسلة نصية ودمجها معاً
      posted_elements.total,
      posted_elements.is_refrence,
      posted_elements.refrenc_value,
      posted_elements.general_note,
      // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
    ]);
    if (hasBadSymbols) {
      return res.json({
        success: false,
                message_ar: sql_injection_message_ar,
        message_en: sql_injection_message_en,
      });
    }

    //! check diffrence between debit and credit
      let totalDebt = 0;
      let totalCredit = 0;
      // المرور على جميع الكائنات في المصفوفة
      posted_elements.posted_array.forEach(item => {
          totalDebt += parseFloat(item.debt); // التأكد من تحويل القيم إلى أرقام
          totalCredit += parseFloat(item.credit);
      });
      if (totalDebt !== totalCredit){
        return res.json({
          success: false,
          message_ar: "القيد غير متوازن",
        });
      }

    //! check refrence

    
    if (!posted_elements.is_refrence){
         
      if (posted_elements.refrenc_value <= 0){
   
        return res.json({
          success: false,
          message_ar: 'رجاء ادخال مرجع صحيح او تفعيل الوضع التلقائى',
        });
      }


      

      let query01 = `SELECT refrence from transaction_header where company_id = $1 AND transaction_type = $2`;
      let rows01 = await db.any(query01, [
        req.session.company_id,
        transaction_type
      ]);

      if (rows01.length >0) {
          return res.json({
            success: false,
            message_ar: 'هذا المرجع موجود بالفعل رجاء تفعيل الوضع التلقائى او ادخل مرجع صالح',
          });
      }
    }

        // //! Security hacking 
        let query02 = `SELECT id from accounts_header where company_id = $1`;
        let rows02 = await db.any(query02, [
          req.session.company_id
        ]);
    
        const deafult_accountsId_array = rows02.map((row) => parseInt(row.id));
        const dataArray = posted_elements.posted_array.map((item) => parseInt(item.account_id));
        const defrenceArray = dataArray.filter((accountId) => !deafult_accountsId_array.includes(accountId));
        
        if (defrenceArray.length > 0){


          await block_user(req,'ta1')
          return res.json({
            success: false,
            xx: true,
            message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
          });
        }

        //* start--------------------------------------------


  
   
    const newId_transaction_header = await newId_fn("transaction_header",'id');

    const newRefrence = await newRefrence_fn(req,transaction_type)
    // تنفيذ معاملة قاعدة البيانات
    await db.tx(async (tx) => {
      let query1 = `INSERT INTO transaction_header
                    (id, refrence,datex, company_id, transaction_type, total_value, general_note)
                    VALUES($1, $2, $3, $4, $5, $6, $7);`;

      await tx.none(query1, [
        newId_transaction_header,
        newRefrence,
        posted_elements.datex,
        req.session.company_id,
        transaction_type,
        posted_elements.total,
        posted_elements.general_note,
      ]);

      let newId_transaction_body = await newId_fn("transaction_body",'id');
      for (const element of posted_elements.posted_array) {
        const newId = parseInt(newId_transaction_body);
        let query2 = `INSERT INTO transaction_body
                      (id, transaction_header_id, account_id, debit, credit, row_note)
                      VALUES($1, $2, $3, $4, $5, $6);`;

        await tx.none(query2, [
          newId,
          newId_transaction_header,
          element.account_id,
          element.debt,
          element.credit,
          element.note_row
        ]);

        newId_transaction_body = parseInt(newId_transaction_body) + 1;
      }
    });

    // إذا تم تنفيذ جميع الاستعلامات بنجاح
    return res.json({
      success: true,
      message_ar: "تم حفظ البيانات بنجاح",
    });
  } catch (error) {
    console.error("Error adding transaction:", error);

    // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
    return res.json({
      success: false,
      message_ar: "حدث خطأ أثناء عملية الحفظ وتم إلغاء العملية",
    });
  }
});
//#endregion


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
