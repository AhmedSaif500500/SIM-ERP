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


let today = new Date().toISOString().split("T")[0];


function getYear(dateString) {
  
  // التأكد من أن السلسلة تتبع الصيغة الصحيحة
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  
  if (!datePattern.test(dateString)) {
      throw new Error("Invalid date format. Please use YYYY-MM-DD. code S-getYear01");
  }

  // تحويل السلسلة إلى كائن Date مع التعامل كـ UTC
  const date = new Date(`${dateString}T00:00:00.000Z`); // إضافة "Z" يجعل التاريخ يعامل كـ UTC
  return date.getUTCFullYear();
}

function timeNow(){
  const now = new Date();

let hours = now.getHours();
const minutes = String(now.getMinutes()).padStart(2, '0');
const seconds = String(now.getSeconds()).padStart(2, '0');

const ampm = hours >= 12 ? 'PM' : 'AM';
hours = hours % 12;
hours = hours ? String(hours).padStart(2, '0') : '12'; // تحويل 0 إلى 12

// const result = `${hours}:${minutes}:${seconds} ${ampm}`;
const result = `${hours}:${minutes} ${ampm}`;
return result
}


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

    req.session.destroy((error) => {
      if (error) {
        console.error('Failed to destroy session:', error);
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
      SET is_active = null
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

function formatFromFiveDigits(num) {
  try {

  // التحقق من أن الرقم ليس سالبًا
  if (num < 0) {
      throw new Error("الرقم لا يمكن أن يكون سالبًا");
  }
  
  // التحقق من أن الرقم لا يتجاوز 5 أرقام
  if (num > 99999) {
      throw new Error("الرقم لا يمكن أن يتجاوز 5 أرقام");
  }
  
  // تحويل الرقم إلى صيغة مكونة من 5 أرقام مع أصفار بادئة
  return num.toString().padStart(5, '0');
      
} catch (error) {
  throw new Error('Error formatFromFiveDigits')
}
}



async function history(int_transactionTypeId, int_1Add_2Update_3Delete , transaction_id, reference, req, tx) {
  // احسب الوقت الحالي
  try {


    
    const timex = timeNow();
    const id = await newId_fn('history', 'id');

    // قم بتنفيذ استعلام SQL باستخدام `db.none`
    const query = `
      INSERT INTO history (id, user_id, transactionType_id, history_type, datex, timex, transaction_id, reference, company_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
    `;

    const params = [id,
                    req.session.userId,
                    int_transactionTypeId,
                    int_1Add_2Update_3Delete,
                    today,
                    timex,
                    transaction_id,
                    reference,
                    req.session.company_id];

    await tx.none(query, params);
  } catch (error) {
    console.error("Error while inserting history:", error);
    throw new Error("Error while inserting history Code-S-history1"); // إلقاء خطأ مع رسالة مخصصة
  }
}






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
            xx: true,
            message_ar: "هذا الحساب تم تجميده من قبل : برجاء التواصل مع الاداره",
          });
        }

        if(rows[0].is_stop && rows[0].is_stop === true){
          req.session.destroy();
          return res.json({
            success: false, // العمليه فشلت
            xx: true,
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
       
        let query2 = `SELECT id, transaction_type_name FROM transaction_type`;
        let rows2 = await db.any(query2);

        req.session.transaction_table = rows2


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
    req.session.destroy((error) => {
      if (error) {
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
    console.error("Error permission Templet:", error);
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



async function newReference_fn(str_tableName, year, req) {
  try {
    const query1 = `
      SELECT
        MAX(reference) AS max
      FROM
        ${str_tableName} -- كن حذرًا مع هذا الإدخال
      WHERE
        company_id = $1
         AND datex LIKE '${year}-%'; -- التحقق من السنة في بداية التاريخ

    `;

    const Params1 = [req.session.company_id];
    const result = await db.oneOrNone(query1, Params1);

    
    let new_reference = 1;
    if (result && result.max && result.max > 0) {
      
      new_reference = +result.max + 1;
    }

    return new_reference; // يجب إرجاع القيمة الجديدة

    
  

  } catch (error) {
    throw new Error(`Failed to retrieve reference: ${error.message}`);
  }
}


async function newReference_transaction_header_fn(str_tableName, int_transaction_type, year, req) {
  try {
    const query1 = `
      SELECT
        MAX(reference) AS max
      FROM
        ${str_tableName} -- كن حذرًا مع هذا الإدخال
      WHERE
        company_id = $1
        AND transaction_type = $2
         AND datex LIKE '${year}-%'; -- التحقق من السنة في بداية التاريخ

    `;

    const Params1 = [req.session.company_id, int_transaction_type];
    const result = await db.oneOrNone(query1, Params1);

    
    let new_reference = 1;
    if (result && result.max && result.max > 0) {
      
      new_reference = +result.max + 1;
    }

    return new_reference; // يجب إرجاع القيمة الجديدة


  } catch (error) {
    throw new Error(`Failed to retrieve reference: ${error.message}`);
  }
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


let closingDate_message_ar = `تم اغلاق جميع العمليات فى التطبيق فى هذا التاريخ `
// async function ClosingDate_is_Allow(transaction_date, req) {
//   try {
//     let query1 = `SELECT datex1 FROM settings WHERE company_id = $1 AND setting_type_id = $2`;
//     let params1 = [req.session.company_id, 1];
//     let result = await db.oneOrNone(query1, params1);

//     if (!result) {
//       return false;
//     }

//     const closingDate = result.datex1;

//     const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

//     // تحقق من تنسيق التاريخ
//     if (!dateFormatRegex.test(transaction_date) || !dateFormatRegex.test(closingDate)) {
//       return false;
//     }

//     // تحويل التواريخ إلى كائنات Date للمقارنة
//     const transactionDateObj = new Date(transaction_date);
//     const closingDateObj = new Date(closingDate);

//     // إذا كان تاريخ المعاملة قبل أو يساوي تاريخ الإغلاق، ارجع false
//     if (transactionDateObj <= closingDateObj) {
//       return false;
//     }

//     return true;
//   } catch (error) {
//     throw new Error(`Error while checking closingDate: ${error.message}`);
//   }
// }


async function check_settings_validation(options = {}, req) {
  try {

    if (options.type === 'add' || options.type === 'update' || options.type === 'delete'){
    // جلب الإعدادات بناءً على الشركة
    const query1 = `SELECT * FROM settings WHERE company_id = $1`;
    const params1 = [req.session.company_id];
    const result = await db.any(query1, params1);

    if (!result) {
      return { valid: false, message_ar: "حدث خطأ غير متوقع AR500، يرجى التواصل مع الدعم الفني" };
    }


    // دالة للتحقق من تنسيق التاريخ

    // التحقق من التاريخ المستقبلي
      const isPreventFutureDate = result.find(item => item.setting_type_id === 2)?.boolean1;

      const closingDate = result.find(item => item.setting_type_id === 1)?.datex1;

      const InValidDateFormat = isInValidDateFormat([closingDate])
      if (InValidDateFormat){
        return { valid: false, message_ar: "حدث خطأ غير متوقع AR518، يرجى التواصل مع الدعم الفني." };
      }


          if (options.type === 'add'){
            if (options.datex){

              const datex = options.datex
              const InValidDateFormat = isInValidDateFormat([datex])
              if (InValidDateFormat){
                return { valid: false, message_ar: "حدث خطأ غير متوقع AR519، يرجى التواصل مع الدعم الفني." };
              }

              /*
              //! check if update date out of orignal year 
              const originalYear = getYear(originalDatex)
              const datex_year = getYear(datex)
              if (options.type === 'update' && originalYear !== datex_year){
                return { valid: false, message_ar: "لا يمكن تعديل التاريخ خارج السنه المالية للتاريخ الاصلى" };
              }
              */

              //! check closingDate
              if (datex <= closingDate) {
                return { valid: false, message_ar: "تم إغلاق هذه الفترة." };
              }

              //! check futureDate prevent
              if (options.check_futureDate && isPreventFutureDate) {
                if (datex > today) {
                  return { valid: false, message_ar: "غير مسموح بإدخال تاريخ يتجاوز تاريخ اليوم. يرجى مراجعة مدير النظام." };
                }
              }
              
            }else{
              return { valid: false, message_ar: "حدث خطأ غير متوقع AR525، يرجى التواصل مع الدعم الفني." };
            }
          }



          if (options.type === 'update' || options.type === 'delete'){
            const query2 = `SELECT datex FROM ${options.tableName} WHERE id = $1 AND company_id = $2`;
            const params2 = [options.transaction_id, req.session.company_id];
            let result1 = await db.oneOrNone(query2, params2);
          
          const originalDatex = result1.datex
          

          const InValidDateFormat = isInValidDateFormat([originalDatex])
          if (InValidDateFormat){
            return { valid: false, message_ar: "حدث خطأ غير متوقع AR518، يرجى التواصل مع الدعم الفني." };
          }

          if (options.type === 'update'){
            if (options.tableName && options.transaction_id && options.datex){

              const datex = options.datex
              const InValidDateFormat = isInValidDateFormat([datex])
              if (InValidDateFormat){
                return { valid: false, message_ar: "حدث خطأ غير متوقع AR519، يرجى التواصل مع الدعم الفني." };
              }

              //! check if update date out of orignal year 
              const originalYear = getYear(originalDatex)
              const datex_year = getYear(datex)

              
              if (options.type === 'update' && originalYear !== datex_year){
                return { valid: false, message_ar: "لا يمكن تعديل التاريخ خارج السنه المالية للتاريخ الاصلى" };
              }

              //! check closingDate
              if (originalDatex <= closingDate || datex <= closingDate) {
                return { valid: false, message_ar: "تم إغلاق هذه الفترة." };
              }

              //! check futureDate prevent
              if (options.check_futureDate && isPreventFutureDate) {
                if (datex > today) {
                  return { valid: false, message_ar: "غير مسموح بإدخال تاريخ يتجاوز تاريخ اليوم. يرجى مراجعة مدير النظام." };
                }
              }
              
            }else{
              return { valid: false, message_ar: "حدث خطأ غير متوقع AR526، يرجى التواصل مع الدعم الفني." };
            }
          }
          if(options.type === 'delete'){
            if (originalDatex <= closingDate) {
              return { valid: false, message_ar: "تم إغلاق هذه الفترة." };
            }
          }
          }


    return { valid: true };
  }else{
    return { valid: false, message_ar: `An Error Accoured code AR530` };
  }
  } catch (error) {
    throw new Error(`Error while checking settings: ${error.message}`);
  }
}


// function turn_EmptyValues_TO_null(object_Var){
//   for (let key in object_Var) {
//     if (object_Var[key] === "") {
//       object_Var[key] = null;
//     }
//   }
// }


function turn_EmptyValues_TO_null(object_Var) {
  for (let key in object_Var) {
    // إذا كانت القيمة عبارة عن مصفوفة
    if (Array.isArray(object_Var[key])) {
      // المرور عبر العناصر في المصفوفة
      object_Var[key].forEach(item => {
        if (typeof item === 'object' && item !== null) {
          // إذا كان العنصر كائن، نفحص خصائصه
          turn_EmptyValues_TO_null(item); // استدعاء الدالة نفسها على الكائن
        }
      });
    } else if (typeof object_Var[key] === 'object' && object_Var[key] !== null) {
      // إذا كانت القيمة كائن، نفحص خصائصه
      turn_EmptyValues_TO_null(object_Var[key]);
    } else if (object_Var[key] === "" || object_Var[key] === 0) {
      // طباعة القيمة القديمة
      // console.log(`Changing: ${key} = ${object_Var[key]}`);
      object_Var[key] = null; // تغيير القيمة إلى null
      // طباعة القيمة الجديدة
      // console.log(`Changed: ${key} = ${object_Var[key]}`);
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
      // if (value.trim().match(/['";$%&<>]/)) {
      if (value.trim().match(/['";$&<>]/)) { // تم ازالى علامه % من الكود
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
    console.error("Error get_All_bread_Data:", error);
    res.status(500).send("Error:");
  }
});


//#endregion End - companies view

//#region 2:- add new company
app.post("/api/add_new_company", async (req, res) => {
  try {

    //! check number of companies allowed
const q1 = `select owner_number_of_companies_allowed 
from owners
where id = $1`
let r1 = await db.oneOrNone(q1,[req.session.owner_id])
r1 = r1.owner_number_of_companies_allowed




const q2 = `select count(id) as id
from companies
where owner_id = $1`

let r2 = await db.oneOrNone(q2,[req.session.owner_id])
r2 = r2.id ? r2.id : 0 


console.log(r1);
console.log(r2);

if(!r1 || isNaN(r1) || r1 < 1){
return res.json({
  success: false,
  message_ar: 'يرجى التواصل مع احد المسؤلين لتعيين الحد الاقصى لعدد الاعمال التجارية المسموح بها',
});
}

if ( r2 >= r1){
return res.json({
  success: false,
  message_ar: 'تم الوصول الى الحد الاقصى لعدد الاعمال التجارية المسموح بها : برجاء التواصل مع احد المسؤلين ',
});
}

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
    const hasBadSymbols = sql_anti_injection([posted_elements.company_name_input_value, // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
    ]);
    if (hasBadSymbols) {
      return res.json({
        success: false,
        message_ar:
          "Invalid input detected due to prohibited characters. Please review your input and try again.",
      });
    }
    //* Start--------------------------------------------------------------


    if (!posted_elements.company_name_input_value || posted_elements.company_name_input_value == ""){
      return res.json({
        success: false,
        message_ar: "رجاء ادخل اسم العمل التجارى بشكل صحيح",
      });
    }

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
    }


      const newCompanyId = await newId_fn("companies",'id');

      let query1 = `
      INSERT INTO companies (id, owner_id, company_name)
      VALUES ($1, $2, $3)
    `;

      const query1_parameters = [newCompanyId,req.session.owner_id,posted_elements.company_name_input_value,]


      
    await db.tx(async (tx) => {
      // 1 : add company
      await tx.none(query1, query1_parameters);

      // 2 : add global accounts  in accounts_header
    
      let account_header_new_id = await newId_fn("accounts_header", "id");

      let last_id = parseInt(account_header_new_id) - 1

      let x1 = last_id + 1
      let x2 = last_id + 2
      let x3 = last_id + 3
      let x4 = last_id + 4
      let x5 = last_id + 5
      let x6 = last_id + 6
      let x7 = last_id + 7
      let x8 = last_id + 8
      let x9 = last_id + 9
      let x10 = last_id + 10
      let x11 = last_id + 11
      let x12 = last_id + 12
      let x13 = last_id + 13
      let x14 = last_id + 14
      let x15 = last_id + 15
      let x16 = last_id + 16
      let x17 = last_id + 17
      let x18 = last_id + 18
      let x19 = last_id + 19
      let x20 = last_id + 20
      let x21 = last_id + 21
      let x22 = last_id + 22

      const accountEntries = [
        {id: x1, parent_id: false, account_name: "قائمة المركز المالى", is_final_account: null, finance_statement: 1, cashflow_statement: null, account_type_id: 0, account_name_en: null, global_id: 1, main_account_id: 0},
        {id: x2, parent_id: false, account_name: "قائمة الدخل", is_final_account: null, finance_statement: 2, cashflow_statement: null, account_type_id: 0, account_name_en: null, global_id: 2, main_account_id: 0},
        {id: x3, parent_id: x1, account_name: "الاصول", is_final_account: null, finance_statement: 1, cashflow_statement: null, account_type_id: null, account_name_en: null, global_id: 3, main_account_id: 1},
        {id: x4, parent_id: x1, account_name: "الالتزمات", is_final_account: null, finance_statement: 1, cashflow_statement: null, account_type_id: null, account_name_en: null, global_id: 4, main_account_id: 2},
        {id: x5, parent_id: x1, account_name: "حقوق الملكيه", is_final_account: null, finance_statement: 1, cashflow_statement: null, account_type_id: null, account_name_en: null, global_id: 5, main_account_id: 3},
        {id: x6, parent_id: x2, account_name: "الايرادات", is_final_account: null, finance_statement: 2, cashflow_statement: null, account_type_id: null, account_name_en: null, global_id: 6, main_account_id: 4},
        {id: x7, parent_id: x2, account_name: "المصروفات", is_final_account: null, finance_statement: 2, cashflow_statement: null, account_type_id: null, account_name_en: null, global_id: 7, main_account_id: 5},
        {id: x8, parent_id: x3, account_name: "الاصول الثايتة", is_final_account: null, finance_statement: 1, cashflow_statement: null, account_type_id: null, account_name_en: null, global_id: 9, main_account_id: 1},
        {id: x9, parent_id: x3, account_name: "مجمع اهلاك الاصول الثابتة", is_final_account: null, finance_statement: 1, cashflow_statement: null, account_type_id: null, account_name_en: null, global_id: 10, main_account_id: 2},
        {id: x10, parent_id: x3, account_name: "النقد وما فى حكمه", is_final_account: null, finance_statement: 1, cashflow_statement: null, account_type_id: null, account_name_en: null, global_id: 11, main_account_id: 1},
        {id: x11, parent_id: x3, account_name: "المخزون الحالى", is_final_account: null, finance_statement: 1, cashflow_statement: null, account_type_id: 5, account_name_en: null, global_id: 12, main_account_id: 1},
        {id: x12, parent_id: x3, account_name: "العملاء", is_final_account: null, finance_statement: 1, cashflow_statement: null, account_type_id: null, account_name_en: null, global_id: 13, main_account_id: 1},
        {id: x13, parent_id: x4, account_name: "الموردين", is_final_account: null, finance_statement: 1, cashflow_statement: null, account_type_id: null, account_name_en: null, global_id: 14, main_account_id: 2},
        {id: x14, parent_id: x4, account_name: "الموظفين", is_final_account: null, finance_statement: 1, cashflow_statement: null, account_type_id: 4, account_name_en: null, global_id: 20, main_account_id: 2},
        {id: x15, parent_id: x5, account_name: "حسابات رأس المال", is_final_account: null, finance_statement: 1, cashflow_statement: null, account_type_id: null, account_name_en: null, global_id: 15, main_account_id: 3},
        {id: x16, parent_id: x5, account_name: "ارباح وخسائر الفترة", is_final_account: true, finance_statement: 1, cashflow_statement: null, account_type_id: 1, account_name_en: null, global_id: 16, main_account_id: 3},
        {id: x17, parent_id: x5, account_name: "ارباح وخسائر فترات سابقة", is_final_account: true, finance_statement: 1, cashflow_statement: null, account_type_id: 1, account_name_en: null, global_id: 23, main_account_id: 3},
        {id: x18, parent_id: x6, account_name: "ايرادات المبيعات", is_final_account: true, finance_statement: 2, cashflow_statement: null, account_type_id: 1, account_name_en: null, global_id: 19, main_account_id: 4},
        {id: x19, parent_id: x7, account_name: "تكلفة المخزون - المبيعات", is_final_account: true, finance_statement: 2, cashflow_statement: null, account_type_id: 1, account_name_en: null, global_id: 17, main_account_id: 5},
        {id: x20, parent_id: x7, account_name: "مصاريف اهلاك اصول ثابته", is_final_account: true, finance_statement: 2, cashflow_statement: null, account_type_id: 1, account_name_en: null, global_id: 18, main_account_id: 5},
        {id: x21, parent_id: false, account_name: "مراكز التكلفة", is_final_account: null, finance_statement: 4, cashflow_statement: null, account_type_id: 11, account_name_en: null, global_id: 21, main_account_id: null},
        {id: x22, parent_id: x21, account_name: "مجموعة مراكز التكلفة 1", is_final_account: null, finance_statement: 4, cashflow_statement: null, account_type_id: 11, account_name_en: null, global_id: 22, main_account_id: null},
        // أضف باقي الحسابات
      ];

      //500500



      let insertHeaderQuery = `
      INSERT INTO accounts_header (id, company_id, account_name, is_final_account, finance_statement, cashflow_statement, account_type_id, account_name_en, global_id, main_account_id) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`;
    
        const insert_array_accounts_header = accountEntries.map(row => {
          // معالجة البيانات قبل إضافتها للمصفوفة
          const processedRow = [
            row.id,
            newCompanyId,
            row.account_name, 
            row.is_final_account, 
            row.finance_statement, 
            row.cashflow_statement,
            row.account_type_id,
            row.account_name_en,
            row.global_id,
            row.main_account_id,
          ];
        
          return processedRow;
        });
        
        // تنفيذ الاستعلام باستخدام batch
        await tx.batch(insert_array_accounts_header.map(data => tx.none(insertHeaderQuery, data)));


        let account_body_new_id = parseInt(await newId_fn("accounts_body", "id"));
       // account_body_new_id -=1 // 3ashan fe loop hayzod 1 fe kol loop
        let insertBodyQuery = `
          INSERT INTO accounts_body (id, parent_id, account_id) 
          VALUES ($1,$2,$3)
        `;
        
        const insert_array_accounts_body = [];
                
        for (const row of accountEntries) {
          if (row.parent_id) {  // إذا كان parent_id ليس false            
            const processedRow = [
              account_body_new_id++, // زيادة الحساب لكل صف
              row.parent_id,
              row.id,
            ];
        
            insert_array_accounts_body.push(processedRow);  // إضافة الصف إلى المصفوفة
          }
        }
        
        // تنفيذ الاستعلام باستخدام batch
        await tx.batch(insert_array_accounts_body.map(data => tx.none(insertBodyQuery, data)));
        
  

      //4 : add settings
      let settings_newId = await newId_fn("settings", "id");
      await tx.none(
        `INSERT INTO settings (id,company_id,setting_type_id) values(${settings_newId},${newCompanyId},1)`
      ); // closingDate = null
      await tx.none(
        `INSERT INTO settings (id,company_id,setting_type_id) values(${
          settings_newId + 1
        },${newCompanyId},2)`
      ); // prevent_futureDate = null
    })
    return res.json({
      success: true,
      message_ar: "تم حفظ البيانات بنجاح",
    });

  

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
    let data;
    const is_owner = req.session.is_owner;
    
    if (is_owner && is_owner === true) {
      query1 = `select company_name from companies c
      where id = $1 AND owner_id = $2`;
      data = await db.oneOrNone(query1, [posted_elements.c_id, req.session.owner_id]);

      if (data) {
        req.session.company_id = parseInt(posted_elements.c_id);
        
        data = {company_id: parseInt(posted_elements.c_id), company_name: data.company_name}
        
        res.json(data);
      } else {
        res.json({
          success: false,
          message_ar: "حدث خطأ اثناء معالجه البيانات ",
        });
      }
    } else {




//! Global Code permissions500 S-1
// The SQL query remains the same
const query_permissions = 
`select
    c.company_name,
    uc.user_id,
    uc.company_id,
    uc.general_permission,
    uc.employees_permission,
    uc.effects_permission,
    uc.users_permission,
    uc.production_permission,
    uc.bread_permission,
    uc.acounts_permission,
    uc.transaction_permission,
    uc.customers_permission,
    uc.vendors_permission,
    uc.departments_permission,
    uc.items_permission,
    uc.itemsLocations_permission,
    uc.salesman_permission,
    uc.sales_qutation_permission,
    uc.sales_order_permission,
    uc.sales_invoice_permission,
    uc.purshases_qutation_permission,
    uc.purshases_order_permission,
    uc.purshases_invoice_permission,
    uc.services_permission,
    uc.sales_returns_permission,
    uc.purshases_returns_permission,
    uc.fixed_assests_permission,
    uc.accumulated_depreciation_permission,
    uc.disposed_fixed_asset_permission
FROM user_company uc 
    left join companies c on uc.company_id = c.id
WHERE
    uc.user_id = $1
    AND uc.company_id = $2
order BY c.company_name asc;
  `;

const data = await db.oneOrNone(query_permissions, [req.session.userId, posted_elements.c_id]);

if (data) {
  // Save user & company Permissions in session
  req.session.company_id = data.company_id;

  // Save all permissions dynamically

  //! Global Code permissions500 S-2
  req.session.general_permission = data.general_permission
  req.session.employees_permission = data.employees_permission
  req.session.effects_permission = data.effects_permission
  req.session.users_permission = data.users_permission
  req.session.production_permission = data.production_permission
  req.session.bread_permission = data.bread_permission
  req.session.acounts_permission = data.acounts_permission
  req.session.transaction_permission = data.transaction_permission
  req.session.customers_permission = data.customers_permission
  req.session.vendors_permission = data.vendors_permission
  req.session.departments_permission = data.departments_permission
  req.session.items_permission = data.items_permission
  req.session.itemsLocations_permission = data.itemsLocations_permission
  req.session.salesman_permission = data.salesman_permission
  req.session.sales_qutation_permission = data.sales_qutation_permission
  req.session.sales_order_permission = data.sales_order_permission
  req.session.sales_invoice_permission = data.sales_invoice_permission
  req.session.purshases_qutation_permission = data.purshases_qutation_permission
  req.session.purshases_order_permission = data.purshases_order_permission
  req.session.purshases_invoice_permission = data.purshases_invoice_permission
  req.session.services_permission = data.services_permission
  req.session.sales_returns_permission = data.sales_returns_permission
  req.session.purshases_returns_permission = data.purshases_returns_permission
  req.session.fixed_assests_permission = data.fixed_assests_permission
  req.session.accumulated_depreciation_permission = data.accumulated_depreciation_permission
  req.session.disposed_fixed_asset_permission = data.disposed_fixed_asset_permission


  res.json(data);

      } else {
        res.json({
          success: false,
          message_ar: "حدث خطأ اثناء معالجه البيانات ",
        });
      }
    }
  } catch (error) {
    console.error("Error company_login:", error);
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
    console.error("Error get_All_bread_Data:", error);
    res.status(500).send("Error:");
  }
});
//#endregion

//#region 5:- get users
app.post("/get_main_users_Data", async (req, res) => {
  try {
    //! check Permission
    permissions(req, "users_permission", "view");
    if (!permissions) {
      return;
    }


    //*----------------------------------------------------------------

    let query = `select id,
      user_full_name,
              CASE
              WHEN is_stop = true THEN 'ايقاف'
              ELSE ''
          END AS is_stop
    from users
    where owner_id = $1`;
    let data = await db.any(query, [req.session.owner_id]);

    // const rows = await db.any("SELECT id, user_name  FROM users");
    

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

//#region 5:- save new user
app.post("/api/save_new_user", async (req, res) => {
  try {
    
//! check users_numbers_allowed

const q1 = `select owner_number_of_users_allowed 
    	from owners
    where id = $1`
 let r1 = await db.oneOrNone(q1,[req.session.owner_id])
    r1 = r1.owner_number_of_users_allowed

const q2 = `select count(id) as id
    from users
    where owner_id = $1`

let r2 = await db.oneOrNone(q2,[req.session.owner_id])
    r2 = r2.id ? r2.id : 0 
 
    if(!r1 || isNaN(r1) || r1 < 1){
      return res.json({
        success: false,
        message_ar: 'يرجى التواصل مع احد المسؤلين لتعيين الحد الاقصى لعدد المستخدمين المسموح بهم',
      });
    }

    if ( r2 >= r1){
      return res.json({
        success: false,
        message_ar: 'تم الوصول الى الحد الاقصى لعدد المستخدمين المسموح بهم : برجاء التواصل مع احد المسؤلين',
      });
    }
    

 //-------------------------------------------------------------------
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
      ...posted_elements.selectedCompanies.map((obj) => obj.company_id + obj.checked), // تحويل كل عنصر في dataArray إلى سلسلة نصية ودمجها معاً
      posted_elements.permission_type,
      posted_elements.user_name_value,
      posted_elements.pass_value,
      posted_elements.user_fullName_value,
      posted_elements.inactive_select_value,
      // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
    ]);
    if (hasBadSymbols) {
      return res.json({
        success: false,
        message_ar: sql_injection_message_ar,
        message_en: sql_injection_message_en,
      });
    }

    //* if no company selected
    if (posted_elements.permission_type == "1" && parseInt(posted_elements.selectedCompanies.length) < 1 ) {
      return res.json({
        success: false,
        message_ar: "من فضلك برجاء تحديد الاعمال التجاره المخصصه للمستخدم",
      });
    }

    if (posted_elements.permission_type == "1"){
        //! Security hacking 
        let query01 = `SELECT id from companies where owner_id = $1`;
        let rows01 = await db.any(query01, [
          req.session.owner_id
        ]);
    
        const deafult_companies_array = rows01.map((row) => parseInt(row.id));
        const selectedCompanies = posted_elements.selectedCompanies.map((item) => parseInt(item.company_id));
        const defrenceArray = selectedCompanies.filter((company_id) => !deafult_companies_array.includes(company_id));

        


        if (defrenceArray.length > 0){
          await block_user(req,'auuwc')
          return res.json({
            success: false,
            xx: true,
            message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
          });
        }
    }


    //* Start--------------------------------------------------------------

    const permission_type = posted_elements.permission_type == "0" ? true : null

    

    let query = `SELECT TRIM(user_name) FROM users WHERE owner_id =$1 AND TRIM(user_name) = $2`;
    let rows = await db.any(query, [
      req.session.owner_id,
      posted_elements.user_name_value
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
        const pass_input1 = await bcrypt.hash(posted_elements.pass_value, 12);
        //3: insert data into db
        
        const inactive_select_value = posted_elements.inactive_select_value == '0'? null : true 
        
        const newUserId = await newId_fn("users",'id');
        let query = `INSERT into users (id, user_name, user_password, user_full_name, is_active, owner_id, is_owner, datex, is_stop) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
        await tx.none(query, [
          newUserId,
          posted_elements.user_name_value,
          pass_input1,
          posted_elements.user_fullName_value,
          null,
          req.session.owner_id,
          permission_type,
          posted_elements.today,
          inactive_select_value
        ]);

        if (posted_elements.permission_type == "1" && parseInt(posted_elements.selectedCompanies.length) > 0 ) {
          for (const element of posted_elements.selectedCompanies) {
            let query2 = `INSERT INTO user_company
                                (user_id, company_id)
                                VALUES($1, $2);`;

            await tx.none(query2, [newUserId, element.company_id]);
          }
        }
      });
      //4: send a response to frontend about success transaction
      res.json({
        success: true,
        message_ar: " تم حفظ بيانات المستخدم بنجاح",
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
app.post("/api/update_user", async (req, res) => {
  try {
    

     //-------------------------------------------------------------------
        const posted_elements = req.body;
    
            //! owner
            if (req.session.is_owner !== true){
              await block_user(req,'uus1')
              return res.json({
                success: false,
                xx: true,
                message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
              });
            }
    
    
        //! Permission

        //! sql injection check
        let hasBadSymbols = sql_anti_injection([
          ...posted_elements.selectedCompanies.map((obj) => obj.company_id + obj.checked), // تحويل كل عنصر في dataArray إلى سلسلة نصية ودمجها معاً
          posted_elements.id,
          posted_elements.is_changePass,
          posted_elements.permission_type,
          posted_elements.user_name_value,
          posted_elements.pass_value,
          posted_elements.user_fullName_value,
          posted_elements.inactive_select_value,
          // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
        ]);
        if (hasBadSymbols) {
          return res.json({
            success: false,
            message_ar: sql_injection_message_ar,
            message_en: sql_injection_message_en,
          });
        }
    
        //* if no company selected
        if (posted_elements.permission_type == "1" && parseInt(posted_elements.selectedCompanies.length) < 1 ) {
          return res.json({
            success: false,
            message_ar: "من فضلك برجاء تحديد الاعمال التجاره المخصصه للمستخدم",
          });
        }
    


        if (posted_elements.permission_type == "1"){
            //! Security hacking 
            let query01 = `SELECT id from companies where owner_id = $1`;
            let rows01 = await db.any(query01, [
              req.session.owner_id
            ]);
        
            const deafult_companies_array = rows01.map((row) => parseInt(row.id));
            const selectedCompanies = posted_elements.selectedCompanies.map((item) => parseInt(item.company_id));
            const defrenceArray = selectedCompanies.filter((company_id) => !deafult_companies_array.includes(company_id));
    
            
    
    
            if (defrenceArray.length > 0){
              await block_user(req,'auuwc')
              return res.json({
                success: false,
                xx: true,
                message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
              });
            }
        }
    


        //* Start--------------------------------------------------------------
    
        const permission_type = posted_elements.permission_type == "0" ? true : null
    
        

          await db.tx(async (tx) => {

            //#region : تعديل البيانات فى جدول المستخمين 
            const inactive_select_value = posted_elements.inactive_select_value == '0'? null : true
            let q1
            let p1
            if (posted_elements.is_changePass){
                //? check pass
                if (!posted_elements.pass_value || posted_elements.pass_value == ""){
                  return res.json({
                    success: false,
                    message_ar: "كلمة المرور غير صحيحه",
                  });
                }

                //? تشفير كلمة المرور
                const pass_value = await bcrypt.hash(posted_elements.pass_value, 12);

                q1 = `update users set user_name = $1, user_password = $2, user_full_name = $3, is_owner = $4, is_stop = $5 Where id = $6 AND owner_id = $7 `;
                p1 = [posted_elements.user_name_value,pass_value,posted_elements.user_fullName_value,permission_type,inactive_select_value, posted_elements.id, req.session.owner_id]
            }else {

              q1 = `update users set user_name = $1, user_full_name = $2, is_owner = $3, is_stop = $4 Where id = $5 AND owner_id = $6 `;
              p1 = [posted_elements.user_name_value,posted_elements.user_fullName_value,permission_type,inactive_select_value, posted_elements.id, req.session.owner_id]
                      
            }
      
            await tx.none(q1,p1);

            //#endregion 

            //#region : تعديل البيانات فى جدول المستخدمين-الشركات
              if (permission_type || !posted_elements.selectedCompanies || posted_elements.selectedCompanies.length < 1){
                const q2 = `delete from user_company where user_id = $1`
                const p2 = [posted_elements.id]
                await tx.none(q2,p2);
              }else{
                //#region عمل مصفوفتين واحده للشركات المضافه وواحده للشركات المحذوفه
                const q01 = `select
                company_id
              from
                user_company
              where
                user_id = $1
              `
            const user_companies_in_db = await db.any(q01,[posted_elements.id])
  
            // تحويل المصفوفات إلى مجموعات للحصول على أداء أفضل في عمليات المقارنة
            const userCompaniesSet = new Set(user_companies_in_db.map(item => item.company_id));
            const selectedCompaniesSet = new Set(posted_elements.selectedCompanies.map(item => item.company_id));
  
            // إيجاد العناصر الفريدة في كل مجموعة
            const deletedArray = [...userCompaniesSet].filter(id => !selectedCompaniesSet.has(id));
            const newArray = [...selectedCompaniesSet].filter(id => !userCompaniesSet.has(id));
          
                //#endregion

                //#region حذف الشركات فى مصفوفه الحذف
              if (deletedArray.length > 0) {
                  const query2 = `DELETE FROM user_company WHERE user_id = $1 AND company_id = ANY($2::int[])`;
                  await tx.none(query2, [posted_elements.id, deletedArray]);
              }
                //#endregion

                //#region اضافة الشركات 
                if (newArray.length > 0) {
                  const values = newArray.map(element => `(${posted_elements.id}, ${element})`).join(', ');
              
                  const query3 = `INSERT INTO user_company (user_id, company_id) VALUES ${values}`;
                  await tx.none(query3);
              }
              
            //#endregion

              }

            //#endregion
            //!-----------------------------------------------------------

          });
          //4: send a response to frontend about success transaction
          res.json({
            success: true,
            message_ar: " تم تعديل بيانات المستخدم بنجاح",
          });
          last_activity(req);
        
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
app.post("/get_user_data_for_update", async (req, res) => {
  try {

    //! Permission

    
        //! owner
        if (req.session.is_owner !== true){
          await block_user(req,'gudfu1')
          return res.json({
            success: false,
            xx: true,
            message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
          });
        }
        const posted_elements = req.body;

    //* Start--------------------------------------------------------------

    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");
    

       //!validation
       const q1 = `SELECT COUNT(id) AS count FROM users WHERE id = $1 AND owner_id = $2`;
       const l1 = await db.oneOrNone(q1,[posted_elements.id, req.session.owner_id]);
       
       if (!l1 || l1.count !== '1') {
           await block_user(req, 'gudfu2');
           return res.json({
               success: false,
               xx: true,
               message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
           });
       }
       
    
    let data = {};


    // 1 : get all companies


     const query1 = `select 
      id as company_id,
      company_name as company_name
      from companies uc 
      where owner_id = $1
      order BY company_name asc;
  `;

  const query2 = `
    select
      id ,user_name ,user_password ,user_full_name ,is_stop, is_owner
    from
      users
    where
      id = $1
  `

const query3 = `
    select
    	company_id
    from
    	user_company
    where
    	user_id = $1 
`
      
      

await db.tx(async (tx) => {
  const allCompanies = await tx.any(query1, [req.session.owner_id]);
  const userinfo = await tx.oneOrNone(query2, [posted_elements.id]);
  const currentCompanies = await tx.any(query3, [posted_elements.id]);

  // استخراج معرفات الشركات الحالية في مصفوفة
  const currentCompanyIds = new Set(currentCompanies.map(company => company.company_id));

  // إنشاء مصفوفة جديدة مع إضافة is_select
  const companiesWithSelection = allCompanies.map(company => ({
      ...company,
      is_select: currentCompanyIds.has(company.company_id) // تحقق إذا كان المعرف موجود
  }));

  // ترتيب المصفوفة بحيث تكون العناصر التي is_select = true في البداية
  companiesWithSelection.sort((a, b) => {
      return (b.is_select === true) - (a.is_select === true);
  });


  data = { companiesWithSelection, userinfo };
});


    

    res.json(data);
  } catch (error) {
    console.error("Error get_user_data_for_update:", error);
    res.status(500).send("Error:");
  }
});
//#endregion

//#region 9:- delete user 
app.post("/delete_user", async (req, res) => {
  try {
        // // إرسال رسالة إلى العميل عبر WebSocket
        // io.emit('blockUser', { userId: req.session.userId });
        
    const posted_elements = req.body;
            //! owner
            if (req.session.is_owner !== true){
              await block_user(req,'dus1')
              return res.json({
                success: false,
                xx: true,
                message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
              });
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
    let query0 = ` 
                select count(id) as id_count from users where id = $1 AND owner_id = $2
              `;
    let result = await db.oneOrNone(query0, [
      posted_elements.id,
      req.session.owner_id
    ]);
    

    if (result.id_count === 0) {
      // اذا حصل على نتائج
      await block_user(req,'delue2')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }


    
    //3: delete data into db


    let query1 = `DELETE FROM users WHERE id = $1`;
    let params1 = [posted_elements.id];


    await db.tx(async (tx) => {
      await tx.none(query1, params1);
    })


    //4: send a response to frontend about success transaction
    res.json({
      success: true,
      message_ar: "تم حذف بيانات المستخدم بنجاح",
    });
  } catch (error) {
    console.error("Error delete_user:", error);
    // send a response to frontend about fail transaction
    res.status(500).json({
      success: false,
      message_ar: "حدث خطأ أثناء حذف بيانات الموظف",
    });
  }
});

//#endregion

//#region 9:- get users permissions view data
app.post("/get_users_permissions_Data", async (req, res) => {
  try {
    //! check Permission
    permissions(req, "users_permission", "view");
    if (!permissions) {
      return;
    }


    //*----------------------------------------------------------------

    let query = `    SELECT uc.user_id ,
    u.user_full_name
    from user_company uc 
    left join users u on uc.user_id = u.id  
    WHERE uc.company_id = $1
    `;
    let data = await db.any(query, [req.session.company_id]);

    // const rows = await db.any("SELECT id, user_name  FROM users");
    

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

//#endregion  END - owners_and_companies



//#region settings
  //#region get settings data
  app.post("/general_settings_view", async (req, res) => {
    try {
      
      const posted_elements = req.body;
  
      // //! Permission
      // await permissions(req, "effects_permission", "view");
      // if (!permissions) {
      //   return;
      // }
  
        //   // سرد كل القيم مره واحده 
        //   const hasBadSymbols = sql_anti_injection(...Object.values(posted_elements));
  
        //   if (hasBadSymbols) {
        //     return res.json({
        //       success: false,
        //       message_ar:
        //         "Invalid input detected due to prohibited characters. Please review your input and try again.",
        //     });
        //   }
        
        //   if (posted_elements.checkbox_aggregation_val && posted_elements.select_aggregation_val == '1') {
        //     const InValidDateFormat = isInValidDateFormat([posted_elements.start_date,posted_elements.end_date])
        //     if (InValidDateFormat){
        //       return res.json({
        //         success: false,
        //         message_ar: InValidDateFormat_message_ar,
        //       });
        //     }
        //   }
  
  
        // turn_EmptyValues_TO_null(posted_elements);
      //* Start--------------------------------------------------------------
  
          
          

            query = `SELECT * from settings where company_id = $1;`
            params = [req.session.company_id] 
      let data = await db.any(query, params);
      res.json(data);
    } catch (error) {
      console.error("Error getEffectsData1:", error);
      res
        .status(500)
        .json({ success: false, message_ar: "حدث خطأ أثناء عرض البيانات" });
    }
  });

  app.post("/general_settings_update", async (req, res) => {
    try {
      const posted_elements = req.body;
      // //! Permission
      // await permissions(req, "effects_permission", "update");
      // if (!permissions) {
      //   return;
      // }


      
       // افضل صورى  للتحقق من صلاحيات المالك او مدير النظام اذا لم يكن احداهما موجود سيتم تحقق الشرط وانهاء الكود
      if (req.session.is_owner !== true && +req.session.general_permission !== 6) {
        return res.json({
          success: false,
          message_ar: "عذرًا، ليس لديك الصلاحية اللازمة للقيام بهذا الإجراء. إذا كان لديك أي استفسارات أو تحتاج إلى مساعدة إضافية، يرجى التواصل مع الإدارة.",
          message_end: "Sorry, you do not have the necessary permissions to perform this action. If you have any questions or require further assistance, please contact the administration.",
        });
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
  
      const InValidDateFormat = isInValidDateFormat([posted_elements.closingDate])
      if (InValidDateFormat){
        return res.json({
          success: false,
          message_ar: InValidDateFormat_message_ar,
        });
      }
  

      turn_EmptyValues_TO_null(posted_elements);
  
      
  
      // const settings = await check_settings_validation({
      //   check_futureDate: true,
      //   check_closingDate: true,
      //   type: 'update',
      //   tableName: 'effects',
      //   transaction_id: posted_elements.id,
      //   datex: posted_elements.date_val,
      // }, req);
  
      // if (!settings.valid) {
      //   return res.json({
      //     success: false,
      //     message_ar: settings.message_ar,
      //   });
      // }
  
 
      //* Start--------------------------------------------------------------
  
  
  
      let query1 = `
UPDATE settings
SET 
    datex1 = CASE 
        WHEN setting_type_id = 1 THEN $2  -- القيمة الجديدة لـ datex1 عندما يكون setting_type_id يساوي $1
        ELSE datex1  -- الاحتفاظ بالقيمة القديمة إذا لم يتم استيفاء الشروط
    END,
    boolean1 = CASE 
        WHEN setting_type_id = 2 THEN $3  -- القيمة الجديدة لـ boolean1 عندما يكون setting_type_id يساوي $1
        ELSE boolean1  -- الاحتفاظ بالقيمة القديمة إذا لم يتم استيفاء الشروط
    END
WHERE company_id = $1 AND setting_type_id IN (1, 2);

      `;
      let params1 = [
        req.session.company_id,
        posted_elements.closingDate,
        posted_elements.is_prevent_futureDate
      ]
  
  
      // const year = getYear(posted_elements.date_val)
      // const reference = formatFromFiveDigits(posted_elements.reference);
  
      await db.tx(async (tx) => {
          await tx.none(query1, params1);
          // await history(16, 2, posted_elements.id, posted_elements.reference, req, tx)
      });
  
      
      return res.json({
        success: true,
        // message_ar: `تم تعديل بيانات المؤثر بمرجع : ${reference}-${year}`,
        message_ar: "تم تحديث الإعدادات العامة للتطبيق بنجاح. سيتم تحديث الصفحة تلقائيًا لتطبيق التغييرات.",
        message_en: "The application settings have been successfully updated. The page will refresh automatically to apply the changes.",
      });
      
    } catch (error) {
      console.error("Error Update general settings:", error);
      res.status(500).json({
        success: false,
        message_ar: "حدث خطأ أثناء تعديل البيانات",
      });
    }
  });

  //#endregion end get settings data

//#endregion settings



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



//#region history
  //#region history_view
  app.post("/get_All_history_Data", async (req, res) => {
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
	H.id,
  H.datex,
  H.timex,
  H.user_id,
  COALESCE(u.user_full_name, '') as user_full_name,
  H.transactiontype_id,
	tt.transaction_type_name,
	H.transaction_id,
  H.reference,
            CASE
              WHEN H.history_type = 1 THEN 'إنشاء'
              WHEN H.history_type = 2 THEN 'تحديث'
              WHEN H.history_type = 3 THEN 'حذف'
              ELSE 'غير محدد' -- خيار افتراضي إذا لم تكن القيمة 1 أو 2 أو 3
          END AS history_type
from
	history H
left join
	transaction_type tt on tt.id = H.transactiontype_id
left join
	users u on u.id  = H.user_id
where 
	H.company_id = $1
	AND (H.datex BETWEEN $2 AND $3 )
order by
	H.datex desc,
	H.id desc
  ;`;
      let data = await db.any(query1, [
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

  //#endregion

//#endregion




//#region users


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

       //! Global Code permissions500 S-3
        let query1 = `Update user_company set
                        general_permission = $3,
                        users_permission = $4,
                        departments_permission = $5,
                        employees_permission = $6,
                        effects_permission = $7,
                        production_permission = $8,
                        bread_permission = $9,
                        transaction_permission = $10,
                        items_permission = $11,
                        customers_permission = $12,
                        vendors_permission = $13,
                        itemsLocations_permission = $14,
                        salesman_permission = $15,
                        sales_qutation_permission = $16,
                        sales_order_permission = $17,
                        sales_invoice_permission = $18,
                        purshases_qutation_permission = $19,
                        purshases_order_permission = $20,
                        purshases_invoice_permission = $21,
                        services_permission = $22,
                        sales_returns_permission = $23,
                        purshases_returns_permission = $24,
                        fixed_assests_permission = $25,
                        accumulated_depreciation_permission = $26,
                        disposed_fixed_asset_permission = $27
                      WHERE user_id = $1
                        AND company_id = $2`;

         //! Global Code permissions500 S-4               
        await db.any(query1, [
          posted_elements.user_id,
          req.session.company_id,
          posted_elements.general_permission_select,
          posted_elements.table_permission_users,
          posted_elements.table_permission_departments,
          posted_elements.table_permission_employees,
          posted_elements.table_permission_effects,
          posted_elements.table_permission_production,
          posted_elements.table_permission_bread,
          posted_elements.table_permission_transaction,
          posted_elements.table_permission_items,
          posted_elements.table_permission_customers,
          posted_elements.table_permission_vendors,
          posted_elements.table_permission_itemsLocations,
          posted_elements.table_permission_salesman,
          posted_elements.table_permission_sales_qutation,
          posted_elements.table_permission_sales_order,
          posted_elements.table_permission_sales_invoice,
          posted_elements.table_permission_purshases_qutation,
          posted_elements.table_permission_purshases_order,
          posted_elements.table_permission_purshases_invoice,
          posted_elements.table_permission_services,
          posted_elements.table_permission_sales_returns,
          posted_elements.table_permission_purshases_returns,
          posted_elements.table_permission_fixed_assests,
          posted_elements.table_permission_accumulated_depreciation,
          posted_elements.table_permission_disposed_fixed_asset
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
app.post("/get_All_customers_Data", async (req, res) => {
  try {
    //! Permission
    await permissions(req, "customers_permission", "view");
    if (!permissions) {
      return;
    }

    //* Start--------------------------------------------------------------

    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");

    let query1 = `
  SELECT 
    A.id, 
    A.account_name,  
    COALESCE(A.account_no, '') as account_no,  
    COALESCE(A.numeric_column1, 0) as credit_limit,  
    COALESCE(A.str_textarea_column5, '') as email,
    COALESCE(A.str20_column1, '') as tasgel_darepy,
    COALESCE(A.str_textarea_column1, '') as legal_info,   
    COALESCE(A.str_textarea_column2, '') as contact_info,  
    COALESCE(A.str_textarea_column3, '') as delivery_adress,  
    COALESCE(A.str_textarea_column4, '') as banking_info,
    COALESCE(SUM(T.debit), 0) - COALESCE(SUM(T.credit), 0) AS balance
  FROM 
    accounts_header A
  LEFT JOIN 
    transaction_body T ON A.id = T.account_id
  WHERE
    A.company_id = $1
    AND A.account_type_id = 2
  GROUP BY
    A.id;
`;
    let data = await db.any(query1, [req.session.company_id]);
    last_activity(req)
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
      INSERT INTO accounts_header (id, account_name, is_final_account, account_no, finance_statement, company_id, account_type_id, main_account_id, numeric_column1, str_textarea_column5, str20_column1, str_textarea_column1, str_textarea_column2, str_textarea_column3, str_textarea_column4)
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

        await tx.none(query2,[newId_body,result.parent_id,newId_header])

        await history(18,1,newId_header,0,req,tx)
      })


      last_activity(req)
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
      await permissions(req, "customers_permission", "update");
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


      if (!posted_elements.account_name_input_value || posted_elements.account_name_input_value === '' || !posted_elements.account_id_hidden_value || isNaN(posted_elements.account_id_hidden_value) ) {
        return res.json({ success: false, message_ar: "ادخل اسم العميل" });
      }
      //* Start--------------------------------------------------------------
  

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
  
      let query1 = `
    UPDATE accounts_header set account_name = $1, account_no = $2, numeric_column1 = $3, str_textarea_column5 = $4, str20_column1 = $5, str_textarea_column1 = $6, str_textarea_column2 = $7, str_textarea_column3 = $8, str_textarea_column4 = $9
    WHERE company_id = $10 AND account_type_id = 2 AND id = $11
  `;

  
      const params1 =  [
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
      ];
  

      await db.tx(async (tx) => {
        await tx.none(query1, params1);
        await history(18,2,posted_elements.account_id_hidden_value,0,req,tx);
      })
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
  `;
  

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
      let params1 =  [
        req.session.company_id,
        posted_elements.account_id_hidden_value,
      ];
  

      await db.tx(async (tx) => {
        await tx.none(query1, params1);
        await history(18,3,posted_elements.account_id_hidden_value,0,req,tx);
      })

      await last_activity(req)
      return res.json({
        success: true,
        message_ar:
          "تم حذف بيانات الموظف : سيتم تحويلك الان الى صفحه الموظفين الرئيسيه",
      });
    } catch (error) {
      last_activity(req)
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
        await permissions(req, "employees_permission", "view");
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
        ah_inner.is_inactive IS NULL
    GROUP BY
        ab_inner.parent_id
)

-- 2 : Main query
SELECT 
    ah.id,
    COALESCE(ah.account_no , '') AS acc_no,
    COALESCE(ah.account_name, '') AS department_name,
    COALESCE(ah.str_textarea_column1, '') AS legal_info,
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
    

        let query1 = `INSERT INTO accounts_header (id, account_name, finance_statement, company_id, account_type_id, main_account_id, str_textarea_column1) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
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

        // if (posted_elements.activeValue && posted_elements.activeValue !== 1) {
        //   await block_user(req,'andep1')
        //   return res.json({
        //     success: false,
        //     xx: true,
        //     message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        //   });
        // }
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


        let query1 = `UPDATE accounts_header set account_name = $1, str_textarea_column1 = $2 WHERE company_id = $3 AND id = $4`;
        let params1 = [posted_elements.name, posted_elements.info, req.session.company_id, posted_elements.id];
    
    
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
    if (posted_elements.isUrlParams_salesman){
      await permissions(req, "salesman_permission", "add");
      if (!permissions) {
        return;
      }  
    }else{
      await permissions(req, "employees_permission", "add");
      if (!permissions) {
        return;
      }  
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
    
    
    let active_value;
    if(posted_elements.inactive_select_value == 0){
      active_value = null
    }else if (posted_elements.inactive_select_value == 1) {
      active_value = true
    }

    const newId_header = await newId_fn("accounts_header",'id');
    const newId_body = await newId_fn("accounts_body",'id');


    let query1 = `
  INSERT INTO accounts_header (id, account_name, account_no, str_textarea_column1, str_textarea_column5, str_textarea_column2, str_textarea_column3, str_textarea_column4, is_inactive, is_final_account, finance_statement, company_id, account_type_id, main_account_id, is_salesman)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
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
    2,
    posted_elements.is_salesman_value ? true : null
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
    await history(posted_elements.isUrlParams_salesman ? 21 : 20, 1, newId_header, 0, req, tx)

  })

  await last_activity(req)
    //4: send a response to frontend about success transaction
    res.json({
      success: true,
      message_ar: "تم حفظ الموظف بنجاح",
    });
  } catch (error) {
    await last_activity(req)
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
    if (posted_elements.isUrlParams_salesman){
      await permissions(req, "salesman_permission", "update");
      if (!permissions) {
        return;
      }  
    }else{
      await permissions(req, "employees_permission", "update");
      if (!permissions) {
        return;
      }  
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
    
    
    let active_value;
    if(posted_elements.inactive_select_value == 0){
      active_value = null
    }else if (posted_elements.inactive_select_value == 1) {
      active_value = true
    }

    
    

    let query1 = `
    UPDATE accounts_header set account_name = $1, account_no = $2, str_textarea_column1 = $3, str_textarea_column5 = $4, str_textarea_column2 = $5, str_textarea_column3 = $6, str_textarea_column4 = $7, is_inactive = $8, is_salesman = $9 WHERE company_id = $10 AND id = $11;
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
    posted_elements.is_salesman_value? true : null,
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
    await history(posted_elements.isUrlParams_salesman ? 21 : 20, 2, posted_elements.id_value, 0, req, tx)

  })

  await last_activity(req)
    //4: send a response to frontend about success transaction
    res.json({
      success: true,
      message_ar: "تم تعديل بيانات الموظف بنجاح : سيتم تحويلك الى صفحة الموظفين الرئيسية",
    });
  } catch (error) {
    await last_activity(req)
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
    if (posted_elements.isUrlParams_salesman){
      await permissions(req, "salesman_permission", "delete");
      if (!permissions) {
        return;
      }  
    }else{
      await permissions(req, "employees_permission", "delete");
      if (!permissions) {
        return;
      }  
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
                (select count(account_id) from transaction_body where account_id = $2) as count_actions,
                (select count(id) from effects where employee_id = $2) as count_effects

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

    if (result.count_actions > 0 || result.count_effects > 0){
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
      history(posted_elements.isUrlParams_salesman ? 21 : 20, 3, posted_elements.id_value, 0, req, tx)
    })

    await last_activity(req)
    //4: send a response to frontend about success transaction
    res.json({
      success: true,
      message_ar: "تم حذف بيانات الموظف بنجاح",
    });
  } catch (error) {
    await last_activity(req)
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
    let is_salesman = posted_elements.salesman
    is_salesman = is_salesman? true : false
   
    let query1 = `
    SELECT 
        A.id, 
        COALESCE(A.account_name, '') as account_name, 
        COALESCE(A.account_no, '') as account_no, 
        COALESCE(A.str_textarea_column1, '') as job,
        COALESCE(A.str_textarea_column5, '') as email,
        COALESCE(A.str_textarea_column2, '') as another_info,
        COALESCE(A.str_textarea_column3, '') as start_date,
        COALESCE(A.str_textarea_column4, '') as end_date,
        COALESCE(A.is_salesman, false) as is_salesman,
        CASE 
            WHEN A.is_inactive = true THEN 'غير نشط'
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
        AND (A.is_salesman = true OR $3 = false)  -- if is_salesman variable  = true it will returm only data when is is_salesman field = true  if the variable = false it wi;; return  all data
    GROUP BY
        A.id, 
        A.account_name, 
        A.account_no, 
        A.str_textarea_column1,
        A.str_textarea_column5,
        A.str_textarea_column2,
        A.str_textarea_column3, 
        A.str_textarea_column4,
        A.is_inactive,
        B.parent_id,
        ParentAccount.account_name;
    `;
    
    let data = await db.any(query1, [req.session.company_id,posted_elements.QKey,is_salesman]);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error: getEmployeesData");
  }
});

  //#endregion

  //#region human_resources_effects

  //#endregion

//#endregion

//#region vendors

//#region get vendor data
app.post("/get_All_vendors_Data", async (req, res) => {
  try {
    //! Permission
    await permissions(req, "vendors_permission", "view");
    if (!permissions) {
      return;
    }

    //* Start--------------------------------------------------------------

    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");

    let query1 = `
      SELECT 
    A.id, 
    COALESCE(A.account_name, '') as account_name,  
    COALESCE(A.account_no, '') as account_no,  
    COALESCE(A.numeric_column1, 0) as credit_limit,  
    COALESCE(A.str_textarea_column5, '') as email,
    COALESCE(A.str20_column1, '') as tasgel_darepy,
    COALESCE(A.str_textarea_column1, '') as legal_info,   
    COALESCE(A.str_textarea_column2, '') as contact_info,  
    COALESCE(A.str_textarea_column3, '') as delivery_adress,  
    COALESCE(A.str_textarea_column4, '') as banking_info,
    COALESCE(SUM(T.credit), 0) - COALESCE(SUM(T.debit), 0) AS balance
  FROM 
    accounts_header A
  LEFT JOIN 
    transaction_body T ON A.id = T.account_id
  WHERE
    A.company_id = $1
    AND A.account_type_id = 3
  GROUP BY
    A.id;
`;
    let data = await db.any(query1, [req.session.company_id]);
    last_activity(req)
    res.json(data);
  } catch (error) {
    last_activity(req)
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
    INSERT INTO accounts_header (id, account_name, is_final_account, account_no, finance_statement, company_id, account_type_id, main_account_id, numeric_column1, str_textarea_column5, str20_column1, str_textarea_column1, str_textarea_column2, str_textarea_column3, str_textarea_column4)
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
      2,
      posted_elements.credit_limit_value,
      posted_elements.email_input_value,
      posted_elements.tasgel_darepy_input_value,
      posted_elements.legal_info_input_value,
      posted_elements.contact_info_input_value,
      posted_elements.delivery_adress_input_value,
      posted_elements.banking_info_input_value,
    ]);

    await tx.none(query2,[newId_body,result.parent_id,newId_header])
    await history(19,1,newId_header,0,req,tx)
  })

  last_activity(req)
      //4: send a response to frontend about success transaction
      res.json({
        success: true,
        message_ar: "تم حفظ بيانات المورد بنجاح",
      });
    } catch (error) {
      last_activity(req)
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
      await permissions(req, "vendors_permission", "update");
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


      if (!posted_elements.account_name_input_value || posted_elements.account_name_input_value === '' || !posted_elements.account_id_hidden_value || isNaN(posted_elements.account_id_hidden_value) ) {
        return res.json({ success: false, message_ar: "ادخل اسم المورد" });
      }
      //* Start--------------------------------------------------------------
  
      //2: validation data befor inserting to db
      // const rows = await db.any(
      //   "SELECT TRIM(employee_name) FROM employees WHERE TRIM(employee_name) = $1",
      //   [posted_elements.employee_name_input]
      // );
  

      let query0 = `
      select
      (SELECT count(account_name) FROM accounts_header WHERE company_id = $1 AND account_type_id = 3 AND account_name = $3 AND id != $2) as count_account_name_exist,
      (select count(id) FROM accounts_header WHERE company_id = $1 AND account_type_id = 3) as count_id
  `;
  
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
        
      let query1 = `
    UPDATE accounts_header set account_name = $1, account_no = $2, numeric_column1 = $3, str_textarea_column5 = $4, str20_column1 = $5, str_textarea_column1 = $6, str_textarea_column2 = $7, str_textarea_column3 = $8, str_textarea_column4 = $9
    WHERE company_id = $10 AND account_type_id = 3 AND id = $11
  `;
      let params1 =  [
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
      ];
  

      await db.tx(async (tx) => {
        await tx.none(query1, params1);
        await history(19,2,posted_elements.account_id_hidden_value,0,req,tx);
      })

      last_activity(req)
      //4: send a response to frontend about success transaction
      res.json({
        success: true,
        message_ar: "تم تحديث بيانات المورد بنجاح",
      });
    } catch (error) {
      last_activity(req)
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
      let params1 =  [
        req.session.company_id,
        posted_elements.account_id_hidden_value,
      ];
  

      await db.tx(async (tx) => {
        await tx.none(query1, params1);
        await history(19,3,posted_elements.account_id_hidden_value,0,req,tx);
      })

      last_activity(req)
      return res.json({
        success: true,
        message_ar:
          "تم حذف بيانات المورد بنجاح : سيتم تحويلك الان الى صفحه الموردين الرئيسيه",
      });
    } catch (error) {
      last_activity(req)
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
      return res.status(403).json({
        success: false,
        message_ar: "ليس لديك الصلاحيات المطلوبة للقيام بهذه العملية.",
      });
    }

    const posted_elements = req.body;



    // سرد كل القيم مره واحده
    const hasBadSymbols = sql_anti_injection(...Object.values(posted_elements));

    if (hasBadSymbols) {
      return res.status(400).json({
        success: false,
        message_ar: "تم اكتشاف أحرف غير مسموح بها في المدخلات. يرجى مراجعة المدخلات والمحاولة مرة أخرى.",
      });
    }

    const InValidDateFormat = isInValidDateFormat([posted_elements.date_input_val]);
    if (InValidDateFormat) {
      return res.status(400).json({
        success: false,
        message_ar: InValidDateFormat_message_ar,
      });
    }

    const settings = await check_settings_validation({
      check_futureDate: true,
      check_closingDate: true,
      datex: posted_elements.date_input_val,
      type: 'add',
      tableName: 'effects', // if type = 'update' or 'delete' only
      transaction_id: posted_elements.id_hidden_input_val, // if type = 'update' or 'delete' only
    }, req);


    if (!settings.valid) {
      return res.json({
        success: false,
        message_ar: settings.message_ar,
      });
    }

    turn_EmptyValues_TO_null(posted_elements);

    //* Start Transaction --------------------------------------------------

    const newId = await newId_fn("effects", 'id');
    const year = getYear(posted_elements.date_input_val)
    const newReference = await newReference_fn('effects', year, req);



    let query1 = `INSERT INTO effects (id, employee_id, datex, days, hours, values, note, company_id, reference) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
    let params1 = [
      newId,
      posted_elements.id_hidden_input_val,
      posted_elements.date_input_val,
      posted_elements.days_input_val,
      posted_elements.hours_input_val,
      posted_elements.values_input_val,
      posted_elements.note_input_val,
      req.session.company_id,
      newReference,
    ];

    const new_referenceFormatting = formatFromFiveDigits(newReference);

    await db.tx(async (tx) => {
      await tx.none(query1, params1);

      //! history
      await history(16, 1, newId, newReference, req, tx);
    });

    await last_activity(req);
    // إرسال استجابة للواجهة الأمامية حول نجاح المعاملة
    res.json({
      success: true,
      message_ar: `تم إنشاء المؤثر بمرجع : ${new_referenceFormatting}-${year}`,
    });
  } catch (error) {
    await last_activity(req);
    console.error("Error adding effects:", error);
    // إرسال استجابة للواجهة الأمامية حول فشل المعاملة
    res.status(500).json({
      success: false,
      message_ar: "حدث خطأ أثناء الإضافة",
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

    let query1 = `SELECT id, account_name 
FROM accounts_header 
WHERE company_id = $1 
  AND account_type_id = 4 
  AND is_final_account IS TRUE 
  AND is_inactive IS NULL;
`;
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
        WHEN ah.is_inactive = true THEN 'غير نشط'
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
     AND (A.is_deleted IS DISTINCT FROM TRUE) -- جلب كل البيانات بإستثناء الحقل الذي قيمته ترو
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
                  WHEN ah.is_inactive = true THEN 'غير نشط'
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
              AND (A.is_deleted IS DISTINCT FROM TRUE) -- جلب كل البيانات بإستثناء الحقل الذي قيمته ترو
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

    

    const settings = await check_settings_validation({
      check_futureDate: true,
      check_closingDate: true,
      type: 'update',
      tableName: 'effects',
      transaction_id: posted_elements.id,
      datex: posted_elements.date_val,
    }, req);

    if (!settings.valid) {
      return res.json({
        success: false,
        message_ar: settings.message_ar,
      });
    }

if (!posted_elements.emp_name || posted_elements.emp_name == ''){
return res.json({
  success: false,
  message_ar:
    "ادخل اسم الموظف اولا",
});
}  
    //* Start--------------------------------------------------------------



    let query1 = `UPDATE effects SET employee_id = $1, datex = $2, days = $3, hours = $4, values = $5, note = $6 where id = $7 AND company_id = $8 `;
    let params1 = [
      posted_elements.emp_id,
      posted_elements.date_val,
      posted_elements.days_val,
      posted_elements.hours_val,
      posted_elements.values_val,
      posted_elements.note_val,
      posted_elements.id,
      req.session.company_id,
    ]


    const year = getYear(posted_elements.date_val)
    const reference = formatFromFiveDigits(posted_elements.reference);

    await db.tx(async (tx) => {
        await tx.none(query1, params1);
        await history(16, 2, posted_elements.id, posted_elements.reference, req, tx)
    });

    
    return res.json({
      success: true,
      message_ar: `تم تعديل بيانات المؤثر بمرجع : ${reference}-${year}`,
    });
    
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
      return res.status(403).json({ success: false, message_ar: "ليس لديك إذن للحذف." });
    }

    //! sql injection check
    const hasBadSymbols = sql_anti_injection(...Object.values(posted_elements));
    if (hasBadSymbols) {
      return res.json({
        success: false,
        message_ar: "Invalid input detected due to prohibited characters. Please review your input and try again.",
      });
    }

    const settings = await check_settings_validation({
      check_futureDate: true,
      check_closingDate: true,
      type: 'delete',
      tableName: 'effects',
      transaction_id: posted_elements.id,
      datex: posted_elements.datex,
    }, req);

    if (!settings.valid) {
      return res.json({
        success: false,
        message_ar: settings.message_ar,
      });
    }

    //* Start--------------------------------------------------------------
    let query1 = `update effects set is_deleted = TRUE WHERE company_id = $1 AND id = $2`;
    let params1 = [req.session.company_id, posted_elements.id];


    const reference = formatFromFiveDigits(posted_elements.reference);


    const year = getYear(posted_elements.datex)

    await db.tx(async (tx) => {
        await tx.none(query1, params1);
        await history(16, 3, posted_elements.id, posted_elements.reference, req, tx)
    });


    
    return res.json({
      success: true,
      message_ar: `تم حذف المؤثر بمرجع : ${reference}-${year}`,
    });
  } catch (error) {
    console.error("Error during effects deletion:", error);
    res.status(500).json({
      success: false,
      message_ar: "حدث خطأ أثناء حذف البيانات أو تسجيل التاريخ.",
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

    const InValidDateFormat = isInValidDateFormat([posted_elements.start_date,posted_elements.end_date])
    if (InValidDateFormat){
      return res.json({
        success: false,
        message_ar: InValidDateFormat_message_ar,
      });
    }
  
    turn_EmptyValues_TO_null(posted_elements);


    //* Start--------------------------------------------------------------

    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");

    let query0 = `SELECT 
        COALESCE(SUM(procution_amount - sales_amount), 0) AS opening_balance
    FROM 
        production
    WHERE 
        company_id = $1 
        AND datex < $2; `
        let result = await db.oneOrNone(query0,[req.session.company_id,posted_elements.start_date])
        let opening_balance = result.opening_balance
        

    let query1 = `SELECT
    id,
    datex,
    note,
    procution_amount,
    sales_amount,
    '' as cumulative_balance
FROM
    production
 WHERE
 company_id = $2
 AND (datex BETWEEN $3 AND $4 )
ORDER BY
    datex DESC, id DESC;
;`;

    let data = await db.any(query1, [opening_balance,req.session.company_id,posted_elements.start_date, posted_elements.end_date]);

    let ServerData = {data,opening_balance}

// دمج صف الرصيد الافتتاحي مع السجلات الرئيسية

    res.json(ServerData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error: getProductionData");
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
    console.error("Error get_All_bread_Data:", error);
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
    console.error("Error get_bread_Data_for_update_page:", error);
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
        (SELECT main_account_id FROM accounts_header WHERE company_id = $1 AND id = $2) AS main_account_id
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
        (SELECT main_account_id FROM accounts_header WHERE company_id = $1 AND id = $2) AS main_account_id
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
      let query1 = `INSERT INTO accounts_header (id, account_name, account_no, is_final_account, finance_statement, cashflow_statement, account_type_id, main_account_id, company_id)
                        VALUES ($1, $2, $3, $4, $5, $6, $7,$8, $9)`;
      await tx.none(query1, [
        new_account_id,
        posted_elements.account_name,
        posted_elements.account_no,
        true,
        result.finance_statement,
        posted_elements.cash_flow_statement_value,
        1,
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

    
    //! معلق -- مطلوب تعديل الماين اكونتس فى جدول الاكونت هيدرز بناء  على الحساب الاب
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

    let query1 = `
    SELECT
      A.id,
      A.account_name,
      A.account_type_id,
      COALESCE(A.item_unite, 'الكمية') as item_unite 
    FROM
      accounts_header A
    where
      A.company_id = $1
      AND is_final_account = true AND (global_id != 8 OR global_id IS NULL)`;
    let data = await db.any(query1, [req.session.company_id]);

    // const data = rows.map((row) => ({
    //   id: row.id,
    //   account_name: row.account_name,
    //   account_type: row.account_type_id
    // }));
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



//#region itemsLocations

  //#region 1 : get itemsLocations Data
  app.post("/itemsLocations_view", async (req, res) => {
    try {

            //! Permission
            await permissions(req, "itemsLocations_permission", "view");
            if (!permissions) {
              return res.status(403).json({
                success: false,
                message_ar: "ليس لديك الصلاحيات المطلوبة للقيام بهذه العملية.",
              });
            }
  
            
      let query1 = `select id, account_name
  from accounts_header
  where company_id = $1 AND account_type_id = 7 
  order by account_name ASC ;`;  // in (1,2 ) ya3ny = 1 or 2 
  
      // استعلام SQL لجلب بيانات الشجرة
      let data = await db.any(query1,[req.session.company_id]);
      await last_activity(req);

      res.json(data);
    } catch (error) {
      console.error("itemsLocations ERROR:", error);
      res.status(500).send("Server Error");
    }
  });
  //#endregion end items locations data

  //#region 2: add itemslocations
  app.post("/itemsLocations_add", async (req, res) => {
    try {
      //! Permission
      await permissions(req, "effects_permission", "add");
      if (!permissions) {
        return res.status(403).json({
          success: false,
          message_ar: "ليس لديك الصلاحيات المطلوبة للقيام بهذه العملية.",
        });
      }
  
      const posted_elements = req.body;
  
  
  
      // سرد كل القيم مره واحده
      const hasBadSymbols = sql_anti_injection(...Object.values(posted_elements));
  
      if (hasBadSymbols) {
        return res.status(400).json({
          success: false,
          message_ar: "تم اكتشاف أحرف غير مسموح بها في المدخلات. يرجى مراجعة المدخلات والمحاولة مرة أخرى.",
        });
      }
  


      turn_EmptyValues_TO_null(posted_elements);

      if (!posted_elements.account_name_input_value || posted_elements.account_name_input_value === '') {
        return res.json({ success: false, message_ar: "ادخل اسم موقع المخزون" });
      }
  
      //* Start Transaction --------------------------------------------------
  
      const query01 = `select count(account_name) as count_account_name from accounts_header where trim(account_name) = $1 and company_id = $2`;
      const result = await db.oneOrNone(query01,[posted_elements.account_name_input_value.trim(), req.session.company_id])

      if (result.count_account_name > 0){
        return res.json({
          success: false,
          message_ar: `هذا الاسم موجود من قبل `,
        });
      }

      const newId = await newId_fn("accounts_header", 'id');

  
      let query1 = `INSERT INTO accounts_header (id, account_name, account_type_id, company_id) VALUES ($1, $2, $3, $4)`;
      let params1 = [
        newId,
        posted_elements.account_name_input_value,
        7,
        req.session.company_id,
      ];
  
  
      await db.tx(async (tx) => {
        await tx.none(query1, params1);
  
        //! history
        await history(17, 1, newId, 0, req, tx);
      });
  
      await last_activity(req);
      // إرسال استجابة للواجهة الأمامية حول نجاح المعاملة
      res.json({
        success: true,
        message_ar: `تم إنشاء موقع المخزون بنجاح`,
      });
    } catch (error) {
      await last_activity(req);
      console.error("Error adding item location:", error);
      // إرسال استجابة للواجهة الأمامية حول فشل المعاملة
      res.status(500).json({
        success: false,
        message_ar: "حدث خطأ أثناء الإضافة",
      });
    }
  });
  
  //#endregion  end add itemsLocations

  //#region items location update
  app.post("/itemsLocations_update", async (req, res) => {
    try {
          // // إرسال رسالة إلى العميل عبر WebSocket
          // io.emit('blockUser', { userId: req.session.userId });
          
      const posted_elements = req.body;
  
      //! Permission
      await permissions(req, "itemsLocations_permission", "update");
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


      if (!posted_elements.account_name_input_value || posted_elements.account_name_input_value === '' || !posted_elements.account_id_hidden_value || isNaN(posted_elements.account_id_hidden_value) ) {
        return res.json({ success: false, message_ar: "ادخل اسم موقع المخزون" });
      }
      //* Start--------------------------------------------------------------
  
      //2: validation data befor inserting to db
      // const rows = await db.any(
      //   "SELECT TRIM(employee_name) FROM employees WHERE TRIM(employee_name) = $1",
      //   [posted_elements.employee_name_input]
      // );
  

      let query0 = ` select
                      (SELECT count(account_name) FROM accounts_header WHERE company_id = $1 AND account_type_id = 7 AND account_name = $3 AND id != $2) as count_account_name_exist,
                      (select count(id) FROM accounts_header WHERE company_id = $1 AND account_type_id = 7) as count_id
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
          message_ar: "اسم موقع المخزون موجود بالفعل"
        });
      }
  
      let query1 = `
    UPDATE accounts_header set account_name = $1
    WHERE id = $2 
  `;
      let params1 =  [
        posted_elements.account_name_input_value,
        posted_elements.account_id_hidden_value
      ];
  

      await db.tx(async (tx) => {
        await tx.none(query1, params1);
        await history(17,2,posted_elements.account_id_hidden_value,0,req,tx);
      })

      last_activity(req)
      //4: send a response to frontend about success transaction
      res.json({
        success: true,
        message_ar: "تم تحديث بيانات موقع المخزون بنجاح",
      });
    } catch (error) {
      last_activity(req)
      console.error("Error updating itemsLocations:", error);
      // send a response to frontend about fail transaction
      res.status(500).json({
        success: false,
        message_ar: "حدث خطأ أثناء تحديث بيانات المورد",
      });
    }
  });
  //#endregion end items location update 


  //#region itemslocation delete
  app.post("/itemsLocations_delete", async (req, res) => {
    try {
      //! Permission
      await permissions(req, "itemsLocations_permission", "delete");
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
      (select count(id) from accounts_header where company_id = $2 AND account_type_id = 7) as count_id
  `;
  
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


      let query1 = `DELETE FROM accounts_header WHERE id = $1`;
      let params1 =  [
        posted_elements.account_id_hidden_value,
      ];
  

      await db.tx(async (tx) => {
        await tx.none(query1, params1);
        await history(17,3,posted_elements.account_id_hidden_value,0,req,tx);
      })

      last_activity(req)
      return res.json({
        success: true,
        message_ar:
          "تم حذف بيانات موقع المخزون بنجاح  : سيتم تحويلك الان الى صفحه مواقع المخزون الرئيسيه",
      });
    } catch (error) {
      last_activity(req)
      console.error("Error get vendor data:", error);
      res.status(500).json({
        success: false,
        message_ar:
          "لا يمكن حذف بيانات المورد : قد تكون هناك عمليات مرتبطه بالمورد يجب حذفها اولا",
      });
    }
  });
  //#endregion end itemsLocations delete


  //#region items

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
    COALESCE(h1.item_unite, 'الكمية') AS item_unite,
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

      if (!posted_elements.accountname || !posted_elements.accountParent || isNaN(+posted_elements.accountParent)) {
        return res.json({
          success: false,
          message_ar: "برجاء ادخال البيانات بشكل صحيح",
        })
      }

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
app.post("/api/add_item", async (req, res) => {
  

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

    //#region validation

          if(!posted_elements.account_name || !posted_elements.account_parent_name_id || isNaN(+posted_elements.account_parent_name_id)){
            return res.json({
              success: false,
              message_ar: "رجاء تأكد من ادخال البيانات فى الحقول المطوبه بشكل صحيح",
            });
          }


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
      message_ar: "تم إضافة الصنف بنجاح",
    });
  } catch (error) {
    console.error("Error add_item:", error);
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

      turn_EmptyValues_TO_null(posted_elements);



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

  
    turn_EmptyValues_TO_null(posted_elements);



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

    let query1 = ` 
SELECT
    ah.id,
    ah.account_no,
    ah.account_name,
    ah.item_unite,
    ab.parent_id,
    parent_ah.account_name AS parent_account_name,
    SUM(
        CASE 
            WHEN tb.debit > 0 THEN tb.item_amount 
            ELSE tb.item_amount * -1 
        END
    ) AS current_amount,
    SUM(
        CASE 
	      	WHEN tb.debit > 0 and tb.cogs < 0 THEN tb.cogs*-1 -- ممرتجع المبيعات
            WHEN tb.debit > 0 THEN tb.debit
            ELSE 0  -- المبيعات
        END) 
        - SUM(
            CASE 
	            WHEN tb.credit > 0 and tb.cogs is null THEN tb.credit-- مرتجع المشتريات
                WHEN tb.credit > 0 THEN tb.cogs
                ELSE 0 -- المشتريات
            END
        ) AS value
FROM
    accounts_header ah
    LEFT JOIN accounts_body ab ON ab.account_id = ah.id
    LEFT JOIN accounts_header parent_ah ON ab.parent_id = parent_ah.id
    LEFT JOIN transaction_body tb ON tb.item_id = ah.id
    LEFT JOIN transaction_header th ON th.id = tb.transaction_header_id
WHERE
    ah.company_id = $1
    and ah.is_final_account = true
    and ah.account_type_id = 5
    and th.company_id = $1
    and th.is_including_items is TRUE
    and th.is_deleted is NULL
    -- and th.datex <= $2
    and tb.item_id is not NULL
GROUP BY
    ah.id, ab.parent_id, parent_ah.account_name
    ;
`;
    let data = await db.any(query1, [req.session.company_id, today]); // معلق -- هنا المفروض كان الكود لحد تاريخ اليوم خلى بالك كمان فى شرط معلق فى الاستعلام
   

    res.json(data);
  } catch (error) {
    console.error("Error get_All_bread_Data:", error);
    res.status(500).send("Error:");
  }
});


app.post("/getItemsGroupDataForItemsTableView", async (req, res) => {
  try {
    // //! Permission
    await permissions(req, "items_permission", "view");
    if (!permissions) {
      return;
    }

    //* Start--------------------------------------------------------------
    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");

    let query1 = `
    select
	ah.id,
	ah.account_name 
from
	accounts_header ah
where
	ah.company_id = $1
	and ah.is_final_account is not true
	and ah.account_type_id = 5
	and ah.is_inactive is not TRUE
    `;
    
    let data = await db.any(query1, [req.session.company_id]);

    res.json(data);
  } catch (error) {
    console.error("Error while get accounts Data", error);
    res.join;
    res
      .status(500)
      .json({ success: false, message_ar: "Error while get accounts Data" });
  }
});


app.post("/getRevenueAccountsDataForItemsTableView", async (req, res) => {
  try {
    // //! Permission
    await permissions(req, "items_permission", "view");
    if (!permissions) {
      return;
    }

    //* Start--------------------------------------------------------------
    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");

    let query1 = `
    select
	ah.id,
	ah.account_name,
  ah.global_id
from
	accounts_header ah
where
	ah.company_id = $1
	and ah.is_final_account is true
	and ah.account_type_id = 1
	and ah.main_account_id = 4
	and ah.is_inactive is not TRUE
    `;
    
    let data = await db.any(query1, [req.session.company_id]);

    res.json(data);
  } catch (error) {
    console.error("Error while get accounts Data", error);
    res.join;
    res
      .status(500)
      .json({ success: false, message_ar: "Error while get accounts Data" });
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
   

      
      turn_EmptyValues_TO_null(posted_elements);


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

    turn_EmptyValues_TO_null(posted_elements);

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
      message_ar: "تم حذف البيانات بنجاح",
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
where id IN (1, 2, 3, 4 ,5, 6, 8, 9, 10)
order by order_asc ASC;`;  // in (1,2 ) ya3ny = 1 or 2 

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
      
          const InValidDateFormat = isInValidDateFormat([posted_elements.start_date,posted_elements.end_date])
          if (InValidDateFormat){
            return res.json({
              success: false,
              message_ar: InValidDateFormat_message_ar,
            });
          }
        


      turn_EmptyValues_TO_null(posted_elements);
    //* Start--------------------------------------------------------------


    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");

    let query1 = `
    select
	    id,
      reference,
	    CONCAT(
        SUBSTRING(datex, 1, 4), '-',  -- استخراج السنة من datex
        LPAD(CAST(reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
      ) AS referenceconcat,
	    datex,
	    COALESCE(general_note, '') AS general_note,
	    COALESCE(total_value, 0) AS total_value
    from
      transaction_header
    where
      company_id = $1 AND
      transaction_type = 2
      AND (is_deleted IS NULL OR is_deleted != true)
      AND (datex BETWEEN $2 AND $3) -- تحديد الفترة الزمنية بين تاريخين
    ORDER BY
      datex DESC,
      reference desc;
`;
    let data = await db.any(query1, [req.session.company_id, posted_elements.start_date, posted_elements.end_date]);

    res.json(data);
  } catch (error) {
    console.error("Error get_All_transaction_Data:", error);
    res.status(500).send("Error:");
  }
});
//#endregion


//#region 2: add transaction
app.post("/api/transaction_add", async (req, res) => {
  try {

    //! Permission
    await permissions(req, "transaction_permission", "add");
    if (!permissions) {
      return res.status(403).json({
        success: false,
        message_ar: "ليس لديك الصلاحيات المطلوبة للقيام بهذه العملية.",
      });
    }

    const posted_elements = req.body;
    const transaction_type = 2
  

    //! sql injection check
    let hasBadSymbols = sql_anti_injection([
      ...posted_elements.posted_array.map((obj) => obj.account_id + obj.note_row + obj.debt + obj.credit ), // تحويل كل عنصر في dataArray إلى سلسلة نصية ودمجها معاً
      posted_elements.datex,
      posted_elements.total,
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


    const InValidDateFormat = isInValidDateFormat([posted_elements.datex]);
    if (InValidDateFormat) {
      return res.status(400).json({
        success: false,
        message_ar: InValidDateFormat_message_ar,
      });
    }

    //! settings
    const settings = await check_settings_validation({
      check_futureDate: true,
      check_closingDate: true,
      datex: posted_elements.datex,
      type: 'add',
      tableName: false, // if type = 'update' or 'delete' only
      transaction_id: false, // if type = 'update' or 'delete' only
    }, req);

    
    if (!settings.valid) {
      return res.json({
        success: false,
        message_ar: settings.message_ar,
      });
    }

    turn_EmptyValues_TO_null(posted_elements);

    //* Start Transaction --------------------------------------------------

    //! check diffrence between debit and credit
      let totalDebt = 0;
      let totalCredit = 0;
      // المرور على جميع الكائنات في المصفوفة
      posted_elements.posted_array.forEach(item => {
          totalDebt += parseFloat(item.debt || 0); // التأكد من تحويل القيم إلى أرقام
          totalCredit += parseFloat(item.credit || 0);
      });
      if (totalDebt !== totalCredit){
        return res.json({
          success: false,
          message_ar: "القيد غير متوازن",
        });
      }


        // //! Security hacking  accounts id
// جلب الحسابات من قاعدة البيانات
let query02 = `SELECT id, account_type_id FROM accounts_header WHERE company_id = $1`;
let rows02 = await db.any(query02, [req.session.company_id]);

// تحويل النتائج إلى مصفوفة للتسهيل في الفحص
const dbAccounts = rows02.map(row => ({
  id: parseInt(row.id),
  account_type_id: row.account_type_id
}));

// المرور على كل كائن في posted_elements.posted_array
for (const rowData of posted_elements.posted_array) {
  const account_typeId = rowData.account_typeId;
  const account_id = rowData.account_id;
  const items_location_id = rowData.items_location_id;

  //! make sure from every account_id
  const accountExists = dbAccounts.some(item => 
    +item.id === +account_id && +item.account_type_id === +account_typeId
  );

  // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
  if (!accountExists) {
    await block_user(req,'Sta1')
    return res.json({
      success: false,
      xx: true,
      message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
    });
  }

  //! make sure from itemLocation It
    const locationExists = dbAccounts.some(item => 
      item.id === +items_location_id && +item.account_type_id === 7
    );
    if (!locationExists) {
      await block_user(req,'Sta2')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }
  
}



const newId_transaction_header = await newId_fn("transaction_header", 'id');
const year = getYear(posted_elements.datex);
const newReference_transaction_header = await newReference_fn('transaction_header', year, req);
const newId_general_reference = await newId_fn("transaction_header", 'general_reference');

// تنفيذ معاملة قاعدة البيانات
await db.tx(async (tx) => {
  let query1 = `INSERT INTO transaction_header
                (id, reference, datex, company_id, transaction_type, total_value, general_note, general_reference, is_including_items)
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);`;

  await tx.none(query1, [
    newId_transaction_header,
    newReference_transaction_header,
    posted_elements.datex,
    req.session.company_id,
    transaction_type,
    posted_elements.total,
    posted_elements.general_note,
    newId_general_reference,
    null, // القيمة الافتراضية للحقل is_including_items
  ]);

  let insert_array2 = [];
  let items_array = [];
  let newId_transaction_body = parseInt(await newId_fn("transaction_body", 'id'));

  let query2 = `INSERT INTO transaction_body
  (id, transaction_header_id, account_id, debit, credit, row_note, item_id, item_amount, item_location_id_tb)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);`;

  for (const element of posted_elements.posted_array) {
    const newId = newId_transaction_body;
    const itemTypeId = 5;
    const items_location_id = +element.account_typeId === itemTypeId ? element.items_location_id : null;
    const item_amount = +element.account_typeId === itemTypeId ? element.item_amount : null;
    let item_id = null;

    if (+element.account_typeId === itemTypeId) { // صنف مخزون
      items_array.push(+element.account_id);
      item_id = +element.account_id;
    } else if (+element.account_typeId === 8) { // صنف خدمة
      item_id = +element.account_id;
    }

    insert_array2.push([
      newId,
      newId_transaction_header,
      element.account_id,
      element.debt,
      element.credit,
      element.note_row,
      item_id,
      item_amount,
      items_location_id,
    ]);

    newId_transaction_body += 1;
  }

  await tx.batch(insert_array2.map(data => tx.none(query2, data)));

  // تحديث is_including_items بناءً على محتوى items_array
  let is_including_items = items_array.length > 0 ? true : null;
  let updateQuery = `UPDATE transaction_header
                     SET is_including_items = $1
                     WHERE id = $2;`;

  await tx.none(updateQuery, [is_including_items, newId_transaction_header]);

  //! history // 500500
  if (items_array.length > 0){
    await update_items_cogs(items_array,posted_elements.datex, req, tx)
  }
  await history(transaction_type, 1, newId_transaction_header, newReference_transaction_header, req, tx);
});


    // await update_items_cogs(req,items_array,posted_elements.datex)
    const new_referenceFormatting = formatFromFiveDigits(newReference_transaction_header);
    await last_activity(req);
    // إذا تم تنفيذ جميع الاستعلامات بنجاح
    return res.json({
      success: true,
      message_ar: `تم إنشاء قيد محاسبى بمرجع : ${new_referenceFormatting}-${year}`,
    });
  } catch (error) {
    await last_activity(req);
    console.error("Error adding transaction:", error);

    // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
    return res.json({
      success: false,
      message_ar: "حدث خطأ أثناء عملية الحفظ وتم إلغاء العملية",
    });
  }
});
//#endregion


//#region 2: update transaction
app.post("/api/transaction_update", async (req, res) => {
  try {

    //! Permission
    await permissions(req, "transaction_permission", "update");
    if (!permissions) {
      return res.status(403).json({
        success: false,
        message_ar: "ليس لديك الصلاحيات المطلوبة للقيام بهذه العملية.",
      });
    }

    const posted_elements = req.body;
    const transaction_type = 2
  

    //! sql injection check
    let hasBadSymbols = sql_anti_injection([
      ...posted_elements.posted_array.map((obj) => obj.account_id + obj.note_row + obj.debt + obj.credit ), // تحويل كل عنصر في dataArray إلى سلسلة نصية ودمجها معاً
      posted_elements.x,
      posted_elements.total,
      posted_elements.datex,
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


    const InValidDateFormat = isInValidDateFormat([posted_elements.datex]);
    if (InValidDateFormat) {
      return res.status(400).json({
        success: false,
        message_ar: InValidDateFormat_message_ar,
      });
    }

    //! settings
    const settings = await check_settings_validation({
      check_futureDate: true,
      check_closingDate: true,
      datex: posted_elements.datex,
      type: 'update',
      tableName: 'transaction_header', // if type = 'update' or 'delete' only
      transaction_id: posted_elements.x, // if type = 'update' or 'delete' only
    }, req);

    
    if (!settings.valid) {
      return res.json({
        success: false,
        message_ar: settings.message_ar,
      });
    }

    turn_EmptyValues_TO_null(posted_elements);

    //* Start Transaction --------------------------------------------------

    //! check diffrence between debit and credit
      let totalDebt = 0;
      let totalCredit = 0;
      // المرور على جميع الكائنات في المصفوفة
      posted_elements.posted_array.forEach(item => {
          totalDebt += parseFloat(item.debt || 0); // التأكد من تحويل القيم إلى أرقام
          totalCredit += parseFloat(item.credit || 0);
      });
      if (totalDebt !== totalCredit){
        return res.json({
          success: false,
          message_ar: "القيد غير متوازن",
        });
      }

      //! Security hacking check id for company_name and transactio type
      let query01 = `SELECT id, reference FROM transaction_header WHERE id = $1 AND company_id = $2 AND transaction_type = $3  AND (is_deleted IS NULL OR is_deleted != true);`;
      let rows01 = await db.oneOrNone(query01, [posted_elements.x, req.session.company_id, transaction_type]);
      
      

      if (!rows01 || !rows01.id) {
        return res.json({
          success: false,
          message_ar: 'هذا القيد غير موجود. برجاء اعادة تحميل الصفحه ',
        });
      }
      const reference = rows01.reference

        //! Security hacking  accounts id
// جلب الحسابات من قاعدة البيانات
let query02 = `SELECT id, account_type_id FROM accounts_header WHERE company_id = $1`;
let rows02 = await db.any(query02, [req.session.company_id]);

// تحويل النتائج إلى مصفوفة للتسهيل في الفحص
const dbAccounts = rows02.map(row => ({
  id: parseInt(row.id),
  account_type_id: row.account_type_id
}));
// المرور على كل كائن في posted_elements.posted_array
for (const rowData of posted_elements.posted_array) {
  const account_typeId = rowData.account_typeId;
  const account_id = rowData.account_id;
  const items_location_id = rowData.items_location_id;


  
  
  //! make sure from every account_id
  const accountExists = dbAccounts.some(item => 
    +item.id === +account_id && +item.account_type_id === +account_typeId
  );

  
  // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
  if (!accountExists) {
    await block_user(req,'Sta1')
    return res.json({
      success: false,
      xx: true,
      message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
    });
  }



  //! make sure from itemLocation It
  if (+account_typeId === 5){
    const locationExists = dbAccounts.some(item => 
      +item.id === +items_location_id && +item.account_type_id === 7
    );
    if (!locationExists) {
      await block_user(req,'Sta2')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }
  }
}


    // تنفيذ معاملة قاعدة البيانات
    await db.tx(async (tx) => {

      //? Clear transaction_body
      let query0 = `Delete FROM transaction_body WHERE transaction_header_id = $1`
      await tx.none(query0,[posted_elements.x])

      //? update INTO transaction_header
      let query1 = `update transaction_header set 
                      datex = $1,
                      total_value = $2,
                      general_note = $3
                    WHERE
                      id = $4;`;

      await tx.none(query1, [
        posted_elements.datex,
        posted_elements.total,
        posted_elements.general_note,
        posted_elements.x
      ]);

      let insert_array2 = [];
  let items_array = [];
  let newId_transaction_body = parseInt(await newId_fn("transaction_body", 'id'));

  let query2 = `INSERT INTO transaction_body
  (id, transaction_header_id, account_id, debit, credit, row_note, item_id, item_amount, item_location_id_tb)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);`;

  for (const element of posted_elements.posted_array) {
    const newId = newId_transaction_body;
    const itemTypeId = 5;
    const items_location_id = +element.account_typeId === itemTypeId ? element.items_location_id : null;
    const item_amount = +element.account_typeId === itemTypeId ? element.item_amount : null;
    let item_id = null;

    if (+element.account_typeId === itemTypeId) { // صنف مخزون
      items_array.push(+element.account_id);
      item_id = +element.account_id;
    } else if (+element.account_typeId === 8) { // صنف خدمة
      item_id = +element.account_id;
    }

    insert_array2.push([
      newId,
      posted_elements.x,
      element.account_id,
      element.debt,
      element.credit,
      element.note_row,
      item_id,
      item_amount,
      items_location_id,
    ]);

    newId_transaction_body += 1;
  }

  await tx.batch(insert_array2.map(data => tx.none(query2, data)));

  // تحديث is_including_items بناءً على محتوى items_array
  let is_including_items = items_array.length > 0 ? true : null;
  let updateQuery = `UPDATE transaction_header
                     SET is_including_items = $1
                     WHERE id = $2;`;

  await tx.none(updateQuery, [is_including_items, posted_elements.x]);

  //! history // 500500
  if (items_array.length > 0){
    await update_items_cogs(items_array,posted_elements.datex, req, tx)
  }
      

      //! history
      await history(transaction_type,2,posted_elements.x,reference,req,tx);
    });

    const new_referenceFormatting = formatFromFiveDigits(reference);
    const year = getYear(posted_elements.datex)

    await last_activity(req);
    // إذا تم تنفيذ جميع الاستعلامات بنجاح
    return res.json({
      success: true,
      message_ar: `تم تعديل قيد محاسبى بمرجع : ${new_referenceFormatting}-${year}`,
    });
  } catch (error) {
    await last_activity(req);
    console.error("Error updating transaction:", error);

    // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
    return res.json({
      success: false,
      message_ar: "حدث خطأ أثناء عملية الحفظ وتم إلغاء العملية",
    });
  }
});
//#endregion



app.post("/api/transaction_delete", async (req, res) => {

  try {

    //! Permission
    await permissions(req, str_permissionName, "delete");
    if (!permissions) {
      return res.status(403).json({
        success: false,
        message_ar: "ليس لديك الصلاحيات المطلوبة للقيام بهذه العملية.",
      });
    }
    const posted_elements = req.body;

    const transaction_type = int_transaction_type
  
    const hasBadSymbols = sql_anti_injection(...Object.values(posted_elements));

    if (hasBadSymbols) {
      return res.json({
        success: false,
        message_ar:
          "Invalid input detected due to prohibited characters. Please review your input and try again.",
      });
    }
  
      const InValidDateFormat = isInValidDateFormat([posted_elements.datex])
      if (InValidDateFormat){
        return res.json({
          success: false,
          message_ar: InValidDateFormat_message_ar,
        });
      }
    


    //! settings
    const settings = await check_settings_validation({
      check_futureDate: true,
      check_closingDate: true,
      datex: false, // if // if type = 'update' or 'add' only
      type: 'delete',
      tableName: 'transaction_header', // if type = 'update' or 'delete' only
      transaction_id: posted_elements.x, // if type = 'update' or 'delete' only
    }, req);

    
    if (!settings.valid) {
      return res.json({
        success: false,
        message_ar: settings.message_ar,
      });
    }
    

    turn_EmptyValues_TO_null(posted_elements);

    //* Start Transaction --------------------------------------------------

    await db.tx(async (tx) => {
            //! Security hacking check id for company_name and transactio type
            let query01 = `SELECT id, reference FROM transaction_header WHERE id = $1 AND company_id = $2 AND transaction_type = $3  AND (is_deleted IS NULL OR is_deleted != true);`;
            let rows01 = await tx.oneOrNone(query01, [posted_elements.x, req.session.company_id, transaction_type]);
        
            if (!rows01 || !rows01.id) {
              throw new Error("لا يوجد قيد محاسبى بهذا المرجع");
            }
            const reference = rows01.reference

            let query2 = `select
            tb.item_id
          from
            transaction_body tb
          inner join accounts_header ah on ah.id = tb.item_id
          where
            tb.transaction_header_id = $1
            and ah.company_id = $2
            and tb.item_id is not null
            and ah.account_type_id = 5
            ;
            `
            let items_array = await tx.any(query2, [posted_elements.x, req.session.company_id]);
          
                  //? Clear transaction_body
      let query0 = `Delete FROM transaction_body WHERE transaction_header_id = $1`
      await tx.none(query0,[posted_elements.x])

      //? update transaction_header
      let query1 = `update transaction_header set 
                      is_deleted = true
                    WHERE
                      id = $1;`;

      await tx.none(query1, [
        posted_elements.x
      ]);

      if (items_array && items_array.length > 0) {
        await update_items_cogs(items_array,posted_elements.datex, req, tx)
      }
      
      //! history
      await history(transaction_type,3,posted_elements.x,reference,req,tx);
    })


    const new_referenceFormatting = formatFromFiveDigits(reference);
    const year = getYear(posted_elements.datex)

    await last_activity(req);
    // إذا تم تنفيذ جميع الاستعلامات بنجاح
    return res.json({
      success: true,
      message_ar: `تم حذف قيد محاسبى بمرجع : ${new_referenceFormatting}-${year}`,
    });
  } catch (error) {
    await last_activity(req);
    console.error("Error delete transaction:", error);

    // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
    return res.json({
      success: false,
      message_ar: "حدث خطأ أثناء عملية الحذف وتم إلغاء العملية",
    });
  }
});

//#region 3: get transaction data
app.post("/get_transaction_Data", async (req, res) => {
  try {
    //! Permission
    await permissions(req, "transaction_permission", "update");
    if (!permissions) {
      return;
    }


    const posted_elements = req.body;
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

    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");
    const q1 = `
  select 
  	company_id,
  	transaction_type
  from
  	transaction_header
  where
  	id = $1
  	`;
    const result = await db.oneOrNone(q1,[posted_elements.x])

    if(!result || !result.company_id || !result.transaction_type || +result.company_id != +req.session.company_id || +result.transaction_type != 2){
      await block_user(req,'Sgtu1')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }

//! مطلةب التاكد من  ترانكسشن هيدر اى دى يخص الشركه وانه عباره قيد محاسبى

let query1 = `select 
	th.id,
  CONCAT(
    SUBSTRING(th.datex, 1, 4), '-',  -- استخراج السنة من datex
    LPAD(CAST(th.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
  ) AS referenceconcat,
	th.datex,
  COALESCE(th.general_note, '') as general_note 
from
	transaction_header th 
where
	th.id = $1
	and th.company_id = $2
	and th.is_deleted is null
  ;
  `
  let params1 = [posted_elements.x, req.session.company_id]




    let query2 = `
SELECT
    tb.debit,
    tb.credit,
    tb.row_note,
    tb.item_amount,
    tb.item_location_id_tb,
    tb.account_id,
    ah.account_type_id,
    ah.account_name,
    COALESCE(ah.item_unite, 'الكمية') as item_unite 
FROM 
    transaction_body tb
inner JOIN accounts_header ah on ah.id = tb.account_id
WHERE
    tb.transaction_header_id = $1;

`;
let params2 = [posted_elements.x]

await db.tx(async (tx) => {
  
  const headerData = await tx.oneOrNone(query1, params1);
  const bodyData = await tx.any(query2, params2);


  const postedData = {headerData, bodyData};
  res.json(postedData);
})
await last_activity(req)
  } catch (error) {
    await last_activity(req)
    console.error("Error get_All_bread_Data:", error);
    res.status(500).send("Error:");
  }
});
//#endregion



//#region sales

//#region get itemsLocations and salesman
app.post("/get_Data_for_sales_qutation_add_page", async (req, res) => {
  try {
    //! Permission
    await permissions(req, "sales_qutation_permission", "add");
    if (!permissions) {
      return;
    }

    //* Start--------------------------------------------------------------
    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");

    let query1 = `
     -- مواقع المخزون
select
	id as id,
	account_name as account_name
from
	accounts_header 
WHERE company_id = $1 
  AND account_type_id = 7
  ;
`;
let params1 = [req.session.company_id]

let query2 = `
  select
	id as id,
	account_name as account_name
from
	accounts_header 
WHERE company_id = $1 
  AND account_type_id = 4
  AND is_final_account IS true
  and is_salesman IS true
  AND is_inactive IS null
  ;
`
let params2 = [req.session.company_id]

let query3 = `
    select 
	th.id,
	th.taxe_package_name as account_name
from
 	settings_tax_header th
where
	th.company_id = $1
	and th.is_inactive is null
order by
	th.taxe_package_name asc 
 
`
let params3 = [req.session.company_id]

let query4 = `
select
    tb.id,
    tb.tax_name,
    tb.tax_rate,
    tb.is_tax_reverse,
    tb.tax_account_id,
    ah.account_name,
    tb.settings_tax_header_id
from
    settings_tax_body tb
left join accounts_header ah on ah.id = tb.tax_account_id    
where
    tb.settings_tax_header_id = ANY($1::int[])
`;


let query5 = `
SELECT
  ah.id,
  ah.account_name,
  ah.account_type_id,
  COALESCE(ah.item_unite, 'الكمية') as item_unite,
  ah.item_revenue_account,
  ah_revenue.account_name as revenue_account_name,
  ah.item_expense_account,
  ah_expense.account_name as expense_account_name,
  ah.item_sales_price,
  ah.item_purshas_price
FROM
  accounts_header ah
left join accounts_header ah_revenue on ah_revenue.id = ah.item_revenue_account
left join accounts_header ah_expense on ah_expense.id = ah.item_expense_account
WHERE
  ah.company_id = $1
  AND ah.is_final_account = true
  AND ah.account_type_id IN (5, 8)
  AND ah.is_inactive IS NULL
`;

let params5 = [req.session.company_id];


let query6 = `
select
  ah.id,
  ah.account_name
from
  accounts_header ah
where
  ah.company_id = $1
  AND ah.is_final_account is true
  AND is_inactive is null
  AND (ah.account_type_id = 2 or ah.is_allow_to_buy_and_sell is true);`

  let params6 = [req.session.company_id];

await db.tx(async (tx) => {

  const itemslocationsArray = await tx.any(query1, params1);
  const salesmanArray = await tx.any(query2, params2);
  const taxHeaderArray = await tx.any(query3, params3);
  const settings_tax_header_id_Array = taxHeaderArray.map(row => row.id);  // استخراج IDs من الاستعلام الثالث
  const taxBodyArray = await tx.any(query4, [settings_tax_header_id_Array]);  // تمرير القائمة إلى الاستعلام الرابع
  const itemsDataArray = await tx.any(query5, params5);
  const customersDataArray = await tx.any(query6, params6);

  const postedData = { itemslocationsArray, salesmanArray, taxHeaderArray, taxBodyArray, itemsDataArray, customersDataArray };
  res.json(postedData);
})


    await last_activity(req)
  } catch (error) {
    await last_activity(req)
    console.error("Error while get Employees Data", error);
    res.join;
    res
      .status(500)
      .json({ success: false, message_ar: "Error while get Employees Data" });
  }
});
//#endregion end get itemslocations and salesman


app.post("/get_data_for_sales_qutation_update", async (req, res) => {
  try {
    //! Permission معلق
    await permissions(req, "sales_qutation_permission", "update");
    if (!permissions) {
      return;
    }

    const posted_elements = req.body;
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
    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");

    let query1 = `
     -- مواقع المخزون
select
	id as id,
	account_name as account_name
from
	accounts_header 
WHERE company_id = $1 
  AND account_type_id = 7
  ;
`;
let params1 = [req.session.company_id]

let query2 = `
  select
	id as id,
	account_name as account_name
from
	accounts_header 
WHERE company_id = $1 
  AND account_type_id = 4
  AND is_final_account IS true
  and is_salesman IS true
  AND is_inactive IS null
  ;
`
let params2 = [req.session.company_id]

let query3 = `
    select 
	th.id,
	th.taxe_package_name as account_name 
from
 	settings_tax_header th
where
	th.company_id = $1
	and th.is_inactive is null
order by
	th.taxe_package_name asc 
 
`
let params3 = [req.session.company_id]

let query4 = `
select
    tb.id,
    tb.tax_name,
    tb.tax_rate,
    tb.is_tax_reverse,
    tb.tax_account_id,
    ah.account_name,
    tb.settings_tax_header_id
from
    settings_tax_body tb
left join accounts_header ah on ah.id = tb.tax_account_id    
where
    tb.settings_tax_header_id = ANY($1::int[])
`;


let query5 = `
SELECT
  ah.id,
  ah.account_name,
  ah.account_type_id,
  COALESCE(ah.item_unite, 'الكمية') as item_unite,
  ah.item_revenue_account,
  ah_revenue.account_name as revenue_account_name,
  ah.item_expense_account,
  ah_expense.account_name as expense_account_name,
  ah.item_sales_price,
  ah.item_purshas_price
FROM
  accounts_header ah
left join accounts_header ah_revenue on ah_revenue.id = ah.item_revenue_account
left join accounts_header ah_expense on ah_expense.id = ah.item_expense_account
WHERE
  ah.company_id = $1
  AND ah.is_final_account = true
  AND ah.account_type_id IN (5, 8)
  AND ah.is_inactive IS NULL
`;

let params5 = [req.session.company_id];


let query6 = `
select
  ah.id,
  ah.account_name
from
  accounts_header ah
where
  ah.company_id = $1
  AND ah.is_final_account is true
  AND is_inactive is null
  AND (ah.account_type_id = 2 or ah.is_allow_to_buy_and_sell is true);`

  let params6 = [req.session.company_id];


let query7 = `
select 
	bih.id,
  bih.reference,
	bih.general_note,
	bih.datex,
	bih.account_id,
	bih.salesman_id,
	bih.is_qutation_status,
	bih.expire_offer_datex,
	bih.is_invoiced,
	bih.qutation_id,
	bih.is_delivered,
	bih.items_location_id,
	bih.is_row_note_show,
	bih.is_row_dicount_show,
  CONCAT(
    SUBSTRING(bih.datex, 1, 4), '-',  -- استخراج السنة من datex
    LPAD(CAST(bih.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
  ) AS referenceconcat
from
	befor_invoice_header bih
where 
bih.id = $1
and bih.company_id = $2
and bih.transaction_type = 23
AND bih.is_deleted IS NULL;
`
let params7 = [posted_elements.x, req.session.company_id];

let query8 = `
select
	bib.id,
	bib.item_type_id,
	bib.item_id,
  	ah.account_name,
  	ah.item_unite,
	bib.amount,
	bib.unite_price,
	COALESCE(bib.row_note, '') as row_note,
	bib.is_discount_percentage,
	bib.dicount_value,
	bib.tax_header_id,
	  sth.taxe_package_name

from
	befor_invoce_body bib
LEFT JOIN accounts_header ah on ah.id = bib.item_id 
LEFT JOIN settings_tax_header sth on sth.id = bib.tax_header_id 
where 
	bib.header_id = $1;
`
let params8 = [posted_elements.x]




await db.tx(async (tx) => {

  const itemslocationsArray = await tx.any(query1, params1);
  const salesmanArray = await tx.any(query2, params2);
  const taxHeaderArray = await tx.any(query3, params3);
  const settings_tax_header_id_Array = taxHeaderArray.map(row => row.id);  // استخراج IDs من الاستعلام الثالث
  const taxBodyArray = await tx.any(query4, [settings_tax_header_id_Array]);  // تمرير القائمة إلى الاستعلام الرابع
  const itemsDataArray = await tx.any(query5, params5);
  const customersDataArray = await tx.any(query6, params6);
  const headerDataArray = await tx.oneOrNone(query7, params7);
  const bodyDataArray = await tx.any(query8, params8);
  
  const postedData = { itemslocationsArray, salesmanArray, taxHeaderArray, taxBodyArray, itemsDataArray, customersDataArray, headerDataArray, bodyDataArray };
  res.json(postedData);
})


    await last_activity(req)
  } catch (error) {
    await last_activity(req)
    console.error("Error while get Employees Data", error);
    res.join;
    res
      .status(500)
      .json({ success: false, message_ar: "Error while get Employees Data" });
  }
});
//#endregion


//#region sales order
  
  //#region get data for sales order add
  app.post("/get_data_for_sales_order_add", async (req, res) => {
    try {
      //! Permission
      await permissions(req, "sales_permission", "add");
      if (!permissions) {
        return;
      }
  
      //* Start--------------------------------------------------------------
      // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");
  
      let query1 = `
       -- مواقع المخزون
  select
    id as id,
    account_name as account_name
  from
    accounts_header 
  WHERE company_id = $1 
    AND account_type_id = 7
    ;
  `;
  let params1 = [req.session.company_id]
  
  let query2 = `
    select
    id as id,
    account_name as account_name
  from
    accounts_header 
  WHERE company_id = $1 
    AND account_type_id = 4
    AND is_final_account IS true
    and is_salesman IS true
    AND is_inactive IS null
    ;
  `
  let params2 = [req.session.company_id]
  
  let query3 = `
      select 
    th.id,
    th.taxe_package_name as account_name
  from
     settings_tax_header th
  where
    th.company_id = $1
    and th.is_inactive is null
  order by
    th.taxe_package_name asc 
   
  `
  let params3 = [req.session.company_id]
  
  let query4 = `
  select
      tb.id,
      tb.tax_name,
      tb.tax_rate,
      tb.is_tax_reverse,
      tb.tax_account_id,
      ah.account_name,
      tb.settings_tax_header_id
  from
      settings_tax_body tb
  left join accounts_header ah on ah.id = tb.tax_account_id    
  where
      tb.settings_tax_header_id = ANY($1::int[])
  `;
  
  
  let query5 = `
SELECT
  ah.id,
  ah.account_name,
  ah.account_type_id,
  COALESCE(ah.item_unite, 'الكمية') as item_unite,
  ah.item_revenue_account,
  ah_revenue.account_name as revenue_account_name,
  ah.item_expense_account,
  ah_expense.account_name as expense_account_name,
  ah.item_sales_price,
  ah.item_purshas_price
FROM
  accounts_header ah
left join accounts_header ah_revenue on ah_revenue.id = ah.item_revenue_account
left join accounts_header ah_expense on ah_expense.id = ah.item_expense_account
WHERE
  ah.company_id = $1
  AND ah.is_final_account = true
  AND ah.account_type_id IN (5, 8)
  AND ah.is_inactive IS NULL
  `;
  
  let params5 = [req.session.company_id];
  
  
  let query6 = `
  select
    ah.id,
    ah.account_name
  from
    accounts_header ah
  where
    ah.company_id = $1
    AND ah.is_final_account is true
    AND is_inactive is null
    AND (ah.account_type_id = 2 or ah.is_allow_to_buy_and_sell is true);`
  
    let params6 = [req.session.company_id];
  

   let query7 = `
select 
	bih.id,
	    CONCAT(
        SUBSTRING(bih.datex, 1, 4), '-',  -- استخراج السنة من datex
        LPAD(CAST(bih.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
    ) AS account_name
from
	befor_invoice_header bih
where
	bih.transaction_type = 23
	and bih.company_id = $1
	and bih.is_deleted is NULL
	and bih.is_qutation_status IS NOT FALSE;
   ` 
   let params7 = [req.session.company_id]

  await db.tx(async (tx) => {
  
    const itemslocationsArray = await tx.any(query1, params1);
    const salesmanArray = await tx.any(query2, params2);
    const taxHeaderArray = await tx.any(query3, params3);
    const settings_tax_header_id_Array = taxHeaderArray.map(row => row.id);  // استخراج IDs من الاستعلام الثالث
    const taxBodyArray = await tx.any(query4, [settings_tax_header_id_Array]);  // تمرير القائمة إلى الاستعلام الرابع
    const itemsDataArray = await tx.any(query5, params5);
    const customersDataArray = await tx.any(query6, params6);
    const salesQutationReferencesArray = await tx.any(query7, params7);
  
    const postedData = { itemslocationsArray, salesmanArray, taxHeaderArray, taxBodyArray, itemsDataArray, customersDataArray, salesQutationReferencesArray };
    res.json(postedData);
  })
  
  
      await last_activity(req)
    } catch (error) {
      await last_activity(req)
      console.error("Error while get Employees Data", error);
      res.join;
      res
        .status(500)
        .json({ success: false, message_ar: "Error while get Employees Data" });
    }
  });
  //#endregion get data for sales order add

//#region getting data for sales order update
app.post("/get_data_for_sales_order_update", async (req, res) => {
  try {
    // //! Permission معلق
    // await permissions(req, "sales_permission", "add");
    // if (!permissions) {
    //   return;
    // }

    
    const posted_elements = req.body;
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
    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");

    let transaction_type;
    if(posted_elements.type === 'qutation'){
      transaction_type = 23
    }else if(posted_elements.type === 'order'){
      transaction_type = 24
    }


    let query1 = `
     -- مواقع المخزون
select
	id as id,
	account_name as account_name
from
	accounts_header 
WHERE company_id = $1 
  AND account_type_id = 7
  ;
`;
let params1 = [req.session.company_id]

let query2 = `
  select
	id as id,
	account_name as account_name
from
	accounts_header 
WHERE company_id = $1 
  AND account_type_id = 4
  AND is_final_account IS true
  and is_salesman IS true
  AND is_inactive IS null
  ;
`
let params2 = [req.session.company_id]

let query3 = `
    select 
	th.id,
	th.taxe_package_name as account_name
from
 	settings_tax_header th
where
	th.company_id = $1
	and th.is_inactive is null
order by
	th.taxe_package_name asc 
 
`
let params3 = [req.session.company_id]

let query4 = `
select
    tb.id,
    tb.tax_name,
    tb.tax_rate,
    tb.is_tax_reverse,
    tb.tax_account_id,
    ah.account_name,
    tb.settings_tax_header_id
from
    settings_tax_body tb
left join accounts_header ah on ah.id = tb.tax_account_id    
where
    tb.settings_tax_header_id = ANY($1::int[])
`;


let query5 = `
SELECT
  ah.id,
  ah.account_name,
  ah.account_type_id,
  COALESCE(ah.item_unite, 'الكمية') as item_unite,
  ah.item_revenue_account,
  ah_revenue.account_name as revenue_account_name,
  ah.item_expense_account,
  ah_expense.account_name as expense_account_name,
  ah.item_sales_price,
  ah.item_purshas_price
FROM
  accounts_header ah
left join accounts_header ah_revenue on ah_revenue.id = ah.item_revenue_account
left join accounts_header ah_expense on ah_expense.id = ah.item_expense_account
WHERE
  ah.company_id = $1
  AND ah.is_final_account = true
  AND ah.account_type_id IN (5, 8)
  AND ah.is_inactive IS NULL
`;

let params5 = [req.session.company_id];


let query6 = `
select
  ah.id,
  ah.account_name
from
  accounts_header ah
where
  ah.company_id = $1
  AND ah.is_final_account is true
  AND is_inactive is null
  AND (ah.account_type_id = 2 or ah.is_allow_to_buy_and_sell is true);`

  let params6 = [req.session.company_id];


let query7 = `
select 
	bih.id,
  bih.reference,
	bih.general_note,
	bih.datex,
	bih.account_id,
	bih.salesman_id,
	bih.is_qutation_status,
	bih.expire_offer_datex,
	bih.is_invoiced,
	bih.qutation_id,
	bih.is_delivered,
	bih.items_location_id,
	bih.is_row_note_show,
	bih.is_row_dicount_show,
  CONCAT(
    SUBSTRING(bih.datex, 1, 4), '-',  -- استخراج السنة من datex
    LPAD(CAST(bih.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
  ) AS referenceconcat
from
	befor_invoice_header bih
where 
bih.id = $1
and bih.company_id = $2
and bih.transaction_type = $3
AND bih.is_deleted IS NULL;
`
let params7 = [posted_elements.x, req.session.company_id, transaction_type];

let query8 = `
select
	bib.id,
	bib.item_type_id,
	bib.item_id,
  	ah.account_name,
  	ah.item_unite,
	bib.amount,
	bib.unite_price,
	COALESCE(bib.row_note, '') as row_note,
	bib.is_discount_percentage,
	bib.dicount_value,
	bib.tax_header_id,
	  sth.taxe_package_name

from
	befor_invoce_body bib
LEFT JOIN accounts_header ah on ah.id = bib.item_id 
LEFT JOIN settings_tax_header sth on sth.id = bib.tax_header_id 
where 
	bib.header_id = $1;
`
let params8 = [posted_elements.x]


let query9 = `
select 
	bih.id,
	    CONCAT(
        SUBSTRING(bih.datex, 1, 4), '-',  -- استخراج السنة من datex
        LPAD(CAST(bih.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
    ) AS account_name
from
	befor_invoice_header bih
where
	bih.transaction_type = 23
	and bih.company_id = $1
	and bih.is_deleted is NULL
	and (bih.is_qutation_status IS NOT FALSE or bih.id = $2);
   ` 
   qutation_id = isNaN(+posted_elements.qutation_id)? null : posted_elements.qutation_id 
   let params9 = [req.session.company_id, qutation_id]



await db.tx(async (tx) => {

  const itemslocationsArray = await tx.any(query1, params1);
  const salesmanArray = await tx.any(query2, params2);
  const taxHeaderArray = await tx.any(query3, params3);
  const settings_tax_header_id_Array = taxHeaderArray.map(row => row.id);  // استخراج IDs من الاستعلام الثالث
  const taxBodyArray = await tx.any(query4, [settings_tax_header_id_Array]);  // تمرير القائمة إلى الاستعلام الرابع
  const itemsDataArray = await tx.any(query5, params5);
  const customersDataArray = await tx.any(query6, params6);
  const headerDataArray = await tx.oneOrNone(query7, params7);
  const bodyDataArray = await tx.any(query8, params8);
  const salesQutationReferencesArray = await tx.any(query9, params9);

  const postedData = { itemslocationsArray, salesmanArray, taxHeaderArray, taxBodyArray, itemsDataArray, customersDataArray, headerDataArray, bodyDataArray, salesQutationReferencesArray};
  res.json(postedData);
})


    await last_activity(req)
  } catch (error) {
    await last_activity(req)
    console.error("Error while get Employees Data", error);
    res.join;
    res
      .status(500)
      .json({ success: false, message_ar: "Error while get Employees Data" });
  }
});
//#endregion getting data fro sales order update


//#endregion sales order


//#endregion


//#region  settings Taxes

  //#region settings Taxes view
  app.post("/get_settings_taxes_Data", async (req, res) => {
    try {

      // //! Permission
      // await permissions(req, "sales_permission", "view");
      // if (!permissions) {
      //   return;
      // }
  
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
        
            // const InValidDateFormat = isInValidDateFormat([posted_elements.start_date,posted_elements.end_date])
            // if (InValidDateFormat){
            //   return res.json({
            //     success: false,
            //     message_ar: InValidDateFormat_message_ar,
            //   });
            // }
          
  
  
        turn_EmptyValues_TO_null(posted_elements);
      //* Start--------------------------------------------------------------
  
  
      // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");
  
      let query1 = `
select 
	id,
  	taxe_package_name,
	CASE 
    	WHEN
      		is_inactive = true THEN 'غير نشط'
    	ELSE
     		'نشط'
  	END as is_inactive
from
	settings_tax_header
where 
	company_id = $1
ORDER BY
  id DESC;
  `;
  
      let data = await db.any(query1, [req.session.company_id]);
  
      res.json(data);
    } catch (error) {
      console.error("Error get_settings_taxes_data:", error);
      res.status(500).send("Error:");
    }
  });
  
  //#endregion

  //#region get accounts for taxes add
  app.post("/getAccountsDataForTaxesAdd", async (req, res) => {
    try {
      //! Permission
      // await permissions(req, "effects_permission", "view");
      // if (!permissions) {
      //   return;
      // }
  

      //* Start--------------------------------------------------------------
      // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");
  
      let query1 = `SELECT id, account_name FROM accounts_header where company_id = $1 AND account_type_id = 1 AND is_final_account IS TRUE AND main_account_id in(1,2)`;
      let data = await db.any(query1, [req.session.company_id]);
  

      res.json(data);
      await last_activity(req)
    } catch (error) {
      await last_activity(req)
      console.error("Error while get Accounts data for taxes add page Data", error);
      res.join;
      res
        .status(500)
        .json({ success: false, message_ar: "Error while get Accounts data for taxes add page Data" });
    }
  });

  //#endregion


  //#region add tax
  app.post("/api/tax_add", async (req, res) => {
    try {
  
      //! Permission
      // await permissions(req, "transaction_permission", "add");
      // if (!permissions) {
      //   return res.status(403).json({
      //     success: false,
      //     message_ar: "ليس لديك الصلاحيات المطلوبة للقيام بهذه العملية.",
      //   });
      // }
  
      const posted_elements = req.body;
      const transaction_type = 22
    
  
      //! sql injection check
      let hasBadSymbols = sql_anti_injection([
        ...posted_elements.posted_array.map((obj) => obj.Desc + obj.rate + obj.reverse_type + obj.account_id ), // تحويل كل عنصر في dataArray إلى سلسلة نصية ودمجها معاً
        posted_elements.tax_package_name,
        // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
      ]);
      if (hasBadSymbols) {
        return res.json({
          success: false,
          message_ar: sql_injection_message_ar,
          message_en: sql_injection_message_en,
        });
      }
  
  
      // const InValidDateFormat = isInValidDateFormat([posted_elements.datex]);
      // if (InValidDateFormat) {
      //   return res.status(400).json({
      //     success: false,
      //     message_ar: InValidDateFormat_message_ar,
      //   });
      // }
  
      // //! settings
      // const settings = await check_settings_validation({
      //   check_futureDate: true,
      //   check_closingDate: true,
      //   datex: posted_elements.datex,
      //   type: 'add',
      //   tableName: false, // if type = 'update' or 'delete' only
      //   transaction_id: false, // if type = 'update' or 'delete' only
      // }, req);
  
      
      // if (!settings.valid) {
      //   return res.json({
      //     success: false,
      //     message_ar: settings.message_ar,
      //   });
      // }
  
      turn_EmptyValues_TO_null(posted_elements);
  
      //* Start Transaction --------------------------------------------------
  
      //! check diffrence between debit and credit
        // المرور على جميع الكائنات في المصفوفة
        posted_elements.posted_array.forEach(item => {

          if(!item.Desc || item.Desc === '' || !item.rate || isNaN(item.rate) || !item.reverse_type || !item.account_id || isNaN(item.account_id)){
            return res.json({
              success: false,
              message_ar: "برجاء التأكد من ادخال البيانات بشكل صحيح ثم حاول مجددا",
            });
          } 
        });
  
  
          // //! Security hacking  accounts id
  // جلب الحسابات من قاعدة البيانات
  let query02 = `SELECT id
                  FROM
                    accounts_header
                  WHERE
                  company_id = $1
                  AND is_final_account = true
                  AND main_account_id in (1,2)`;
  let rows02 = await db.any(query02, [req.session.company_id]);
  
  // تحويل النتائج إلى مصفوفة للتسهيل في الفحص
  const dbAccounts = rows02.map(row => ({
    id: parseInt(row.id)
    // account_type_id: row.account_type_id
  }));
  
  // المرور على كل كائن في posted_elements.posted_array
  for (const rowData of posted_elements.posted_array) {
    const account_id = rowData.account_id;
  
    //! make sure from every account_id
    const accountExists = dbAccounts.some(item => 
      +item.id === +account_id
    );
  
    // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
    if (!accountExists) {
      await block_user(req,'Sta1')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }
    
  }
  
  
  
      
      const newId_tax_header = await newId_fn("settings_tax_header", 'id');

  
      // تنفيذ معاملة قاعدة البيانات
      await db.tx(async (tx) => {
        let query1 = `INSERT INTO settings_tax_header
                      (id, taxe_package_name, is_inactive, company_id)
                      VALUES($1, $2, $3, $4);`;
  
        await tx.none(query1, [
          newId_tax_header,
          posted_elements.tax_package_name,
          +posted_elements.inactive_select_val === 0 ? null : true, 
          req.session.company_id
        ]);
  
        let newId_tax_body = await newId_fn("settings_tax_body",'id');
        for (const element of posted_elements.posted_array) {
          const newId = parseInt(newId_tax_body);
  
          //! make sure if account id != item  then location and amount = null

  
          let query2 = `INSERT INTO settings_tax_body
                        (id, tax_name, tax_rate, is_tax_reverse, tax_account_id, settings_tax_header_id)
                        VALUES($1, $2, $3, $4, $5, $6);`;
  
          await tx.none(query2, [
            newId,
            element.Desc,
            +element.rate,
            +element.reverse_type === 1? null : true,
            element.account_id,
            newId_tax_header
          ]);
  
          
          newId_tax_body = parseInt(newId_tax_body) + 1;
        }
  
        //! history
        await history(transaction_type,1,newId_tax_header,0,req,tx);
      });
  
      // const new_referenceFormatting = formatFromFiveDigits(newReference_transaction_header);
      await last_activity(req);
      // إذا تم تنفيذ جميع الاستعلامات بنجاح
      return res.json({
        success: true,
        message_ar: `تم الحفظ بناج`,
      });
    } catch (error) {
      await last_activity(req);
      console.error("Error adding tax:", error);
  
      // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
      return res.json({
        success: false,
        message_ar: "حدث خطأ أثناء عملية الحفظ وتم إلغاء العملية",
      });
    }
  });

  app.post("/get_settings_update_Data", async (req, res) => {
    try {
      // //! Permission
      // await permissions(req, "transaction_permission", "update");
      // if (!permissions) {
      //   return;
      // }
  
  
      const posted_elements = req.body;
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
  
      // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");
      const q1 = `
    select 
      count(id) as id_count
    from
      settings_tax_header
    where
      id = $1
      `;
      const result = await db.oneOrNone(q1,[posted_elements.x])
  
      if(result.id_count < 1){
        await block_user(req,'gsud1')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }
  
  //! مطلةب التاكد من  ترانكسشن هيدر اى دى يخص الشركه وانه عباره قيد محاسبى
      let query1 = `
  SELECT
      tb.id,
      tb.tax_name,
      tb.tax_rate,
      tb.is_tax_reverse,
      tb.tax_account_id,
      ah.account_name
  FROM 
      settings_tax_body tb
  LEFT JOIN accounts_header as ah on ah.id = tb.tax_account_id    
  WHERE
      tb.settings_tax_header_id = $1
  ORDER BY
      tb.id ASC;

  
  `;
      const data = await db.any(query1, [posted_elements.x]);
      
      res.json(data);
      await last_activity(req)
    } catch (error) {
      await last_activity(req)
      console.error("Error get_settings_update_Data:", error);
      res.status(500).send("Error:");
    }
  });
  //#endregion


  app.post("/api/tax_update", async (req, res) => {
    try {
  
      //! Permission
      // await permissions(req, "transaction_permission", "add");
      // if (!permissions) {
      //   return res.status(403).json({
      //     success: false,
      //     message_ar: "ليس لديك الصلاحيات المطلوبة للقيام بهذه العملية.",
      //   });
      // }
  
      const posted_elements = req.body;
      const transaction_type = 22
    
  
      //! sql injection check
      let hasBadSymbols = sql_anti_injection([
        ...posted_elements.posted_array.map((obj) => obj.rowId + obj.Desc + obj.rate + obj.reverse_type + obj.account_id ), // تحويل كل عنصر في dataArray إلى سلسلة نصية ودمجها معاً
        posted_elements.tax_package_name,
        // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
      ]);
      if (hasBadSymbols) {
        return res.json({
          success: false,
          message_ar: sql_injection_message_ar,
          message_en: sql_injection_message_en,
        });
      }
  
  
      // const InValidDateFormat = isInValidDateFormat([posted_elements.datex]);
      // if (InValidDateFormat) {
      //   return res.status(400).json({
      //     success: false,
      //     message_ar: InValidDateFormat_message_ar,
      //   });
      // }
  
      // //! settings
      // const settings = await check_settings_validation({
      //   check_futureDate: true,
      //   check_closingDate: true,
      //   datex: posted_elements.datex,
      //   type: 'add',
      //   tableName: false, // if type = 'update' or 'delete' only
      //   transaction_id: false, // if type = 'update' or 'delete' only
      // }, req);
  
      
      // if (!settings.valid) {
      //   return res.json({
      //     success: false,
      //     message_ar: settings.message_ar,
      //   });
      // }
  
      turn_EmptyValues_TO_null(posted_elements);
  
      //* Start Transaction --------------------------------------------------
  
      //! check diffrence between debit and credit
        // المرور على جميع الكائنات في المصفوفة
        posted_elements.posted_array.forEach(item => {

          if(!item.rowId || isNaN(item.rowId) || !item.Desc || item.Desc === '' || !item.rate || isNaN(item.rate) || !item.reverse_type || !item.account_id || isNaN(item.account_id)){
            return res.json({
              success: false,
              message_ar: "برجاء التأكد من ادخال البيانات بشكل صحيح ثم حاول مجددا",
            });
          } 
        });
  
  
          // //! Security hacking  accounts id
  // جلب الحسابات من قاعدة البيانات
  let query02 = `SELECT id
                  FROM
                    accounts_header
                  WHERE
                  company_id = $1
                  AND is_final_account = true
                  AND main_account_id in (1,2)`;
  let rows02 = await db.any(query02, [req.session.company_id]);
  
  // تحويل النتائج إلى مصفوفة للتسهيل في الفحص
  const dbAccounts = rows02.map(row => ({
    id: parseInt(row.id)
    // account_type_id: row.account_type_id
  }));
  
  // المرور على كل كائن في posted_elements.posted_array
  for (const rowData of posted_elements.posted_array) {
    const account_id = rowData.account_id;
  
    //! make sure from every account_id
    const accountExists = dbAccounts.some(item => 
      +item.id === +account_id
    );
  
    // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
    if (!accountExists) {
      await block_user(req,'Sta1')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }
    
  }
  
  
  
      
      const newId_tax_header = await newId_fn("settings_tax_header", 'id');

  
      // تنفيذ معاملة قاعدة البيانات
      await db.tx(async (tx) => {
        let query1 = `update
                        settings_tax_header
                      set
                        taxe_package_name = $1,
                        is_inactive = $2
                      WHERE
                        id = $3
                        AND company_id = $4`;
  
         const resultQ1 = await tx.result(query1, [
            posted_elements.tax_package_name,
            +posted_elements.inactive_select_val === 0 ? null : true,
            posted_elements.header_Id,
            req.session.company_id,
          ]);
        


          if (resultQ1.rowCount === 0) {
            throw new Error("No rows were updated, rolling back transaction.");
          }
        


  
        for (const element of posted_elements.posted_array) {
  
          //! make sure if account id != item  then location and amount = null

  
          let query2 = `update settings_tax_body set
                            tax_name = $1,        
                            tax_rate = $2,    
                            is_tax_reverse = $3,    
                            tax_account_id = $4
                          WHERE
                            id = $5
                            AND settings_tax_header_id = $6;`;

          const resultQ2 = await tx.result(query2, [
            element.Desc,
            +element.rate,
            +element.reverse_type === 1? null : true,
            element.account_id,
            element.rowId,
            posted_elements.header_Id

          ]);
  
          if (resultQ2.rowCount === 0) {
            throw new Error("No rows were updated, rolling back transaction.");
          }
        
        }
  
        //! history
        await history(transaction_type,2,posted_elements.header_Id,0,req,tx);
      });
  
      // const new_referenceFormatting = formatFromFiveDigits(newReference_transaction_header);
      await last_activity(req);
      // إذا تم تنفيذ جميع الاستعلامات بنجاح
      return res.json({
        success: true,
        message_ar: `تم التعديل بنجاح`,
      });
    } catch (error) {
      await last_activity(req);
      console.error("Error adding tax:", error);
  
      // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
      return res.json({
        success: false,
        message_ar: "حدث خطأ أثناء عملية الحفظ وتم إلغاء العملية",
      });
    }
  });


  app.post("/api/tax_delete", async (req, res) => {
    try {
  
      //! Permission
      // await permissions(req, "transaction_permission", "add");
      // if (!permissions) {
      //   return res.status(403).json({
      //     success: false,
      //     message_ar: "ليس لديك الصلاحيات المطلوبة للقيام بهذه العملية.",
      //   });
      // }
  
      const posted_elements = req.body;
      const transaction_type = 22
    
  
      //! sql injection check
      let hasBadSymbols = sql_anti_injection([
        ...posted_elements.posted_array.map((obj) => obj.rowId), // تحويل كل عنصر في dataArray إلى سلسلة نصية ودمجها معاً
        posted_elements.tax_package_name,
        // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
      ]);
      if (hasBadSymbols) {
        return res.json({
          success: false,
          message_ar: sql_injection_message_ar,
          message_en: sql_injection_message_en,
        });
      }
  
  
      // const InValidDateFormat = isInValidDateFormat([posted_elements.datex]);
      // if (InValidDateFormat) {
      //   return res.status(400).json({
      //     success: false,
      //     message_ar: InValidDateFormat_message_ar,
      //   });
      // }
  
      // //! settings
      // const settings = await check_settings_validation({
      //   check_futureDate: true,
      //   check_closingDate: true,
      //   datex: posted_elements.datex,
      //   type: 'add',
      //   tableName: false, // if type = 'update' or 'delete' only
      //   transaction_id: false, // if type = 'update' or 'delete' only
      // }, req);
  
      
      // if (!settings.valid) {
      //   return res.json({
      //     success: false,
      //     message_ar: settings.message_ar,
      //   });
      // }
  
      turn_EmptyValues_TO_null(posted_elements);
  
      //* Start Transaction --------------------------------------------------
  
      //! check diffrence between debit and credit
        // المرور على جميع الكائنات في المصفوفة
        posted_elements.posted_array.forEach(item => {

          if(!item.rowId || isNaN(item.rowId)){
            return res.json({
              success: false,
              message_ar: "برجاء التأكد من ادخال البيانات بشكل صحيح ثم حاول مجددا",
            });
          } 
        });
  
        const query = `
        SELECT
          (SELECT COUNT(id) FROM settings_tax_header WHERE id = $1 AND company_id = $2) AS count_id,
          (SELECT COUNT(settings_tax_header_id) FROM transaction_body WHERE settings_tax_header_id = $1) as settings_tax_header_id_count
      `;
  
      const result = await db.oneOrNone(query, [
        posted_elements.header_Id,
        req.session.company_id
      ]);
  
      if (result.count_id === 0){
        await block_user(req,'S-td1')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }


      if (result.settings_tax_header_id_count > 0){
        return res.json({
          success: false,
          message_ar: 'توجد حركات تتعلق بهذا الرمز الضريبى',
        });
      }
              
  
          // //! Security hacking  accounts id

      
      const newId_tax_header = await newId_fn("settings_tax_header", 'id');

  
      // تنفيذ معاملة قاعدة البيانات
      await db.tx(async (tx) => {
        let query1 = `delete from
                        settings_tax_header
                      WHERE
                        id = $1
                        AND company_id = $2`;
  
         const resultQ1 = await tx.result(query1, [
            posted_elements.header_Id,
            req.session.company_id
          ]);
        


          if (resultQ1.rowCount === 0) {
            throw new Error("No rows were delete, rolling back transaction.");
          }
        

        //! history
        await history(transaction_type,3,posted_elements.header_Id,0,req,tx);
      });
  
      // const new_referenceFormatting = formatFromFiveDigits(newReference_transaction_header);
      await last_activity(req);
      // إذا تم تنفيذ جميع الاستعلامات بنجاح
      return res.json({
        success: true,
        message_ar: `تم حذف البيانات`,
      });
    } catch (error) {
      await last_activity(req);
      console.error("Error Deleting tax:", error);
  
      // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
      return res.json({
        success: false,
        message_ar: "حدث خطأ أثناء عملية حذف البيانات وتم إلغاء العملية",
      });
    }
  });


//#region sales Qutation
  

//#region 1: sales_qutation_view
app.post("/get_sales_qutation_Data_view", async (req, res) => {
  try {
    
    //! Permission  معلق
    await permissions(req, "sales_qutation_permission", "view");
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
      
          const InValidDateFormat = isInValidDateFormat([posted_elements.start_date,posted_elements.end_date])
          if (InValidDateFormat){
            return res.json({
              success: false,
              message_ar: InValidDateFormat_message_ar,
            });
          }
        


      turn_EmptyValues_TO_null(posted_elements);
    //* Start--------------------------------------------------------------


    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");

    let query1 = `
select 
    bih.id,
    bih.reference,
    bih.total_value,
    COALESCE(bih.general_note, '') as general_note, 
    bih.datex,
    bih.account_id as customer_id,
    ah1.account_name as customer_name,
    bih.salesman_id as salesman_id,
    ah2.account_name as salesman_name,
    CASE 
        WHEN bih.is_qutation_status IS TRUE THEN 'مقبول'
        WHEN bih.is_qutation_status IS NULL THEN 'معلق'
        ELSE 'مرفوض'
    END AS qutation_status,
    bih.expire_offer_datex,
    bih.is_row_note_show,
    bih.is_row_dicount_show,
    CONCAT(
        SUBSTRING(bih.datex, 1, 4), '-',  -- استخراج السنة من datex
        LPAD(CAST(bih.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
    ) AS referenceconcat
from
    befor_invoice_header bih
left join accounts_header ah1 on ah1.id = bih.account_id
left join accounts_header ah2 on ah2.id = bih.salesman_id
where
    bih.company_id = $1
    AND bih.transaction_type = 23
    AND (bih.datex BETWEEN $2 AND $3) -- التأكد أن القيم بين التواريخ النصية تعمل بشكل صحيح
    AND bih.is_deleted IS NULL
ORDER BY
    bih.datex DESC,
    bih.reference DESC;

`;

    let data = await db.any(query1, [req.session.company_id,posted_elements.start_date, posted_elements.end_date]);

    res.json(data);
  } catch (error) {
    console.error("Error get_sales_qutation_Data_view:", error);
    res.status(500).send("Error:");
  }
});

app.post("/getItemssData1", async (req, res) => {
  try {
    // //! Permission معلق
    // await permissions(req, "effects_permission", "view");
    // if (!permissions) {
    //   return;
    // }

    //* Start--------------------------------------------------------------
    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");

    let query1 = `
SELECT
  ah.id,
  ah.account_name,
  ah.account_type_id,
  COALESCE(ah.item_unite, 'الكمية') as item_unite,
  ah.item_revenue_account,
  ah_revenue.account_name as revenue_account_name,
  ah.item_expense_account,
  ah_expense.account_name as expense_account_name,
  ah.item_sales_price,
  ah.item_purshas_price
FROM
  accounts_header ah
left join accounts_header ah_revenue on ah_revenue.id = ah.item_revenue_account
left join accounts_header ah_expense on ah_expense.id = ah.item_expense_account
WHERE
  ah.company_id = $1
  AND ah.is_final_account = true
  AND ah.account_type_id IN (5, 8)
  AND ah.is_inactive IS NULL
    `;
    
    let data = await db.any(query1, [req.session.company_id]);


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


    //#region sales qutation add
    app.post("/api/sales_qutation_add", async (req, res) => {
      try {
    
        //! Permission
        await permissions(req, "sales_qutation_permission", "add");
        if (!permissions) {
          return res.status(403).json({
            success: false,
            message_ar: "ليس لديك الصلاحيات المطلوبة للقيام بهذه العملية.",
          });
        }



    
        const posted_elements = req.body;
        const transaction_type = 23
      
    
        //! sql injection check
        let hasBadSymbols = sql_anti_injection([
          ...posted_elements.posted_array.map((obj) => obj.item_typeId + obj.item_id + obj.row_note + obj.row_amount + obj.row_unitPrice + obj.row_discountTypeId + obj.row_discountValue + obj.row_taxHeaderId), // تحويل كل عنصر في dataArray إلى سلسلة نصية ودمجها معاً
          posted_elements.customerId,
          posted_elements.total,
          posted_elements.datex,
          posted_elements.itemLocationId,
          posted_elements.salesmanId,
          posted_elements.is_RowNote,
          posted_elements.is_RowDiscount,
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
    
    
        const InValidDateFormat = isInValidDateFormat([posted_elements.datex]);
        if (InValidDateFormat) {
          return res.status(400).json({
            success: false,
            message_ar: InValidDateFormat_message_ar,
          });
        }
    
        //! settings
        const settings = await check_settings_validation({
          check_futureDate: true,
          check_closingDate: true,
          datex: posted_elements.datex,
          type: 'add',
          tableName: false, // if type = 'update' or 'delete' only
          transaction_id: false, // if type = 'update' or 'delete' only
        }, req);
    
        
        if (!settings.valid) {
          return res.json({
            success: false,
            message_ar: settings.message_ar,
          });
        }
    
        turn_EmptyValues_TO_null(posted_elements);
    
        

        //* Start Transaction --------------------------------------------------
    
       const total = +posted_elements.total

       if (!total || isNaN(total)){
        await block_user(req,'Ssqa001')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
       }

    
    // //! Security hacking  accounts id


    // جلب الحسابات من قاعدة البيانات
    let query02 = `SELECT id, account_type_id, is_salesman FROM accounts_header WHERE company_id = $1 AND is_inactive is null`;
    let rows02 = await db.any(query02, [req.session.company_id]);
    
    // تحويل النتائج إلى مصفوفة للتسهيل في الفحص
    const dbAccounts = rows02.map(row => ({
      id: parseInt(row.id),
      account_type_id: row.account_type_id,
      is_salesman: row.is_salesman
    }));

    //check salesman

    const count_salesman = dbAccounts.some(row => +row.id === +posted_elements.salesmanId && +row.account_type_id === 4 && row.is_salesman === true);
    const count_itemLocation = dbAccounts.some(row => +row.id === +posted_elements.itemLocationId && +row.account_type_id === 7);

      // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
      if (!count_salesman) {
        await block_user(req,'Ssqa01')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }

      // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
      if (!count_itemLocation) {
        await block_user(req,'Ssqa02')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }


    // المرور على كل كائن في posted_elements.posted_array
    for (const rowData of posted_elements.posted_array) {
      const item_typeId = rowData.item_typeId;
      const item_id = rowData.item_id;

    
      //! make sure from every account_id
      const accountExists = dbAccounts.some(item => 
        +item.id === +item_id && +item.account_type_id === +item_typeId
      );
    
      // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
      if (!accountExists) {
        await block_user(req,'Ssqa1')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }
    }
    
    
        // جلب من قاعدة البيانات
        let query03 = `SELECT id FROM settings_tax_header WHERE company_id = $1`;
        let rows03 = await db.any(query03, [req.session.company_id]);
        
        // تحويل النتائج إلى مصفوفة للتسهيل في الفحص
        const dbTaxesHeaderArray = rows03.map(row => ({
          id: parseInt(row.id)
        }));
        
        // المرور على كل كائن في posted_elements.posted_array
        for (const rowData of posted_elements.posted_array) {
          const row_taxHeaderId = rowData.row_taxHeaderId;
          
          if (row_taxHeaderId){
          //! make sure from every account_id
          const taxExists = dbTaxesHeaderArray.some(item =>
            +item.id === +row_taxHeaderId
          );
          

        
          // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
          if (!taxExists) {
            await block_user(req,'Ssqa2')
            return res.json({
              success: false,
              xx: true,
              message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
            });
          }
        }
        }
    

        
        const newId_transaction_header = await newId_fn("befor_invoice_header", 'id');
        const year = getYear(posted_elements.datex)
        
        const query001 = `SELECT MAX(reference) AS max FROM befor_invoice_header WHERE company_id = $1 AND transaction_Type = 23 AND datex LIKE '${year}-%'; -- التحقق من السنة في بداية التاريخ `;
      const Params001 = [req.session.company_id];
      const result001 = await db.oneOrNone(query001, Params001);
      let newReference_transaction_header = 1;
      if (result001 && result001.max && result001.max > 0) {
        newReference_transaction_header = +result001.max + 1;
      }
    
        // تنفيذ معاملة قاعدة البيانات
        await db.tx(async (tx) => {
          let query1 = `INSERT INTO befor_invoice_header
                        (id, reference,transaction_type, total_value, general_note, datex, account_id, salesman_id, items_location_id, is_row_note_show, is_row_dicount_show, is_qutation_status, company_id)
                        VALUES($1, $2, $3, $4, $5, $6, $7 , $8 , $9 , $10 , $11 , $12, $13);`;
    
          await tx.none(query1, [
            newId_transaction_header,
            newReference_transaction_header,
            transaction_type,
            total,
            posted_elements.general_note,
            posted_elements.datex,
            posted_elements.customerId,
            posted_elements.salesmanId,
            posted_elements.itemLocationId,
            posted_elements.is_RowNote ? true : null,
            posted_elements.is_RowDiscount ? true : null,
            null,
            req.session.company_id
          ]);
    
          let newId_transaction_body = await newId_fn("befor_invoce_body",'id');
          for (const element of posted_elements.posted_array) {
            const newId = parseInt(newId_transaction_body);
    
            //! make sure if account id != item  then location and amount = null

            if(isNaN(+element.row_amount) || isNaN(+element.row_unitPrice)){
              await block_user(req,'Ssqa3')
              return res.json({
                success: false,
                xx: true,
                message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
              });
            }

    
            let query2 = `INSERT INTO befor_invoce_body
                          (id, header_id, item_type_id, item_id, amount, unite_price, row_note, is_discount_percentage, dicount_value, tax_header_id)
                          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
    
            await tx.none(query2, [
              newId,
              newId_transaction_header,
              +element.item_typeId,
              element.item_id,
              +element.row_amount,
              +element.row_unitPrice,
              element.row_note,
              +element.row_discountTypeId === 1? true : null,
              +element.row_discountValue,
              element.row_taxHeaderId
            ]);
    
            
            newId_transaction_body = parseInt(newId_transaction_body) + 1;
          }
    
          //! history
          await history(transaction_type,1,newId_transaction_header,newReference_transaction_header,req,tx);
        });
    
        const new_referenceFormatting = formatFromFiveDigits(newReference_transaction_header);
        await last_activity(req);
        // إذا تم تنفيذ جميع الاستعلامات بنجاح
        return res.json({
          success: true,
          message_ar: `تم إنشاء عرض سعر بيع بمرجع : ${new_referenceFormatting}-${year}`,
        });
      } catch (error) {
        await last_activity(req);
        console.error("Error adding sales Qutation:", error);
    
        // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
        return res.json({
          success: false,
          message_ar: "حدث خطأ أثناء عملية الحفظ وتم إلغاء العملية",
        });
      }
    });

    //#endregion sales qutation end

    //#region sales_qutation_update
    app.post("/api/sales_qutation_update", async (req, res) => {
      try {
    
        // //! Permission معلق
        // await permissions(req, "transaction_permission", "add");
        // if (!permissions) {
        //   return res.status(403).json({
        //     success: false,
        //     message_ar: "ليس لديك الصلاحيات المطلوبة للقيام بهذه العملية.",
        //   });
        // }



    
        const posted_elements = req.body;
        const transaction_type = 23
      
        const year = getYear(posted_elements.datex)
        //! sql injection check
        let hasBadSymbols = sql_anti_injection([
          ...posted_elements.posted_array.map((obj) => obj.item_typeId + obj.item_id + obj.row_note + obj.row_amount + obj.row_unitPrice + obj.row_discountTypeId + obj.row_discountValue + obj.row_taxHeaderId), // تحويل كل عنصر في dataArray إلى سلسلة نصية ودمجها معاً
          posted_elements.x,
          posted_elements.customerId,
          posted_elements.total,
          posted_elements.datex,
          posted_elements.itemLocationId,
          posted_elements.salesmanId,
          posted_elements.is_RowNote,
          posted_elements.is_RowDiscount,
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
    
    
        const InValidDateFormat = isInValidDateFormat([posted_elements.datex]);
        if (InValidDateFormat) {
          return res.status(400).json({
            success: false,
            message_ar: InValidDateFormat_message_ar,
          });
        }
    
        //! settings
        const settings = await check_settings_validation({
          check_futureDate: true,
          check_closingDate: true,
          datex: posted_elements.datex,
          type: 'update',
          tableName: 'befor_invoice_header', // if type = 'update' or 'delete' only
          transaction_id: posted_elements.x, // if type = 'update' or 'delete' only
        }, req);
    
        
        if (!settings.valid) {
          return res.json({
            success: false,
            message_ar: settings.message_ar,
          });
        }
    
        turn_EmptyValues_TO_null(posted_elements);
    
        

        //* Start Transaction --------------------------------------------------
    
       const total = +posted_elements.total

       if (!total || isNaN(total)){
        await block_user(req,'Ssqa001')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
       }

    
    // //! Security hacking  accounts id

          //! Security hacking check id for company_name and transactio type
          let query01 = `SELECT id, reference FROM befor_invoice_header WHERE id = $1 AND company_id = $2;`;
          let rows01 = await db.oneOrNone(query01, [posted_elements.x, req.session.company_id]);
          
          
    
          if (!rows01 || !rows01.id) {
            return res.json({
              success: false,
              message_ar: 'هذا المرجع غير موجود. برجاء اعادة تحميل الصفحه ',
            });
          }
          const reference = rows01.reference

    // جلب الحسابات من قاعدة البيانات
    let query02 = `SELECT id, account_type_id, is_salesman FROM accounts_header WHERE company_id = $1 AND is_inactive is null`;
    let rows02 = await db.any(query02, [req.session.company_id]);
    
    // تحويل النتائج إلى مصفوفة للتسهيل في الفحص
    const dbAccounts = rows02.map(row => ({
      id: parseInt(row.id),
      account_type_id: row.account_type_id,
      is_salesman: row.is_salesman
    }));

    //check salesman

    const count_salesman = dbAccounts.some(row => +row.id === +posted_elements.salesmanId && +row.account_type_id === 4 && row.is_salesman === true);
    const count_itemLocation = dbAccounts.some(row => +row.id === +posted_elements.itemLocationId && +row.account_type_id === 7);

      // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
      if (!count_salesman) {
        await block_user(req,'Ssqa01')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }

      // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
      if (!count_itemLocation) {
        await block_user(req,'Ssqa02')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }


    // المرور على كل كائن في posted_elements.posted_array
    for (const rowData of posted_elements.posted_array) {
      const item_typeId = rowData.item_typeId;
      const item_id = rowData.item_id;

    
      //! make sure from every account_id
      const accountExists = dbAccounts.some(item => 
        +item.id === +item_id && +item.account_type_id === +item_typeId
      );
    
      // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
      if (!accountExists) {
        await block_user(req,'Ssqa1')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }
    }
    
    
        // جلب من قاعدة البيانات
        let query03 = `SELECT id FROM settings_tax_header WHERE company_id = $1`;
        let rows03 = await db.any(query03, [req.session.company_id]);
        
        // تحويل النتائج إلى مصفوفة للتسهيل في الفحص
        const dbTaxesHeaderArray = rows03.map(row => ({
          id: parseInt(row.id)
        }));
        
        // المرور على كل كائن في posted_elements.posted_array
        for (const rowData of posted_elements.posted_array) {
          const row_taxHeaderId = rowData.row_taxHeaderId;
          
          if (row_taxHeaderId){
          //! make sure from every account_id
          const taxExists = dbTaxesHeaderArray.some(item =>
            +item.id === +row_taxHeaderId
          );
          

        
          // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
          if (!taxExists) {
            await block_user(req,'Ssqa2')
            return res.json({
              success: false,
              xx: true,
              message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
            });
          }
        }
        }
    




        // تنفيذ معاملة قاعدة البيانات
        await db.tx(async (tx) => {
          let query1 = `update befor_invoice_header
                        set total_value = $1, general_note = $2, datex = $3, account_id = $4, salesman_id = $5, items_location_id = $6, is_row_note_show = $7, is_row_dicount_show = $8
                        where id = $9 and company_id = $10;`;
    
          const resultQ1 = await tx.result(query1, [
            total,
            posted_elements.general_note,
            posted_elements.datex,
            posted_elements.customerId,
            posted_elements.salesmanId,
            posted_elements.itemLocationId,
            posted_elements.is_RowNote ? true : null,
            posted_elements.is_RowDiscount ? true : null,
            posted_elements.x,
            req.session.company_id
          ]);
    
          if (resultQ1.rowCount === 0) {
            throw new Error("No rows were update, rolling back sales Qutation Update.");
          }
    
          let query0 = `DELETE from befor_invoce_body where header_id = $1`
          await tx.none(query0,[posted_elements.x])

          let newId_transaction_body = await newId_fn("befor_invoce_body",'id');
          for (const element of posted_elements.posted_array) {
            const newId = parseInt(newId_transaction_body);
    
            //! make sure if account id != item  then location and amount = null

            if(isNaN(+element.row_amount) || isNaN(+element.row_unitPrice)){
              await block_user(req,'Ssqa3')
              return res.json({
                success: false,
                xx: true,
                message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
              });
            }

    
            let query2 = `INSERT INTO befor_invoce_body
                          (id, header_id, item_type_id, item_id, amount, unite_price, row_note, is_discount_percentage, dicount_value, tax_header_id)
                          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
    
            await tx.none(query2, [
              newId,
              posted_elements.x,
              +element.item_typeId,
              element.item_id,
              +element.row_amount,
              +element.row_unitPrice,
              element.row_note,
              +element.row_discountTypeId === 1? true : null,
              +element.row_discountValue,
              element.row_taxHeaderId
            ]);
    
            
            newId_transaction_body = parseInt(newId_transaction_body) + 1;
          }
    
          //! history
          await history(transaction_type,2,posted_elements.x,reference,req,tx);
        });
    
        const new_referenceFormatting = formatFromFiveDigits(reference);
        await last_activity(req);
        // إذا تم تنفيذ جميع الاستعلامات بنجاح
        return res.json({
          success: true,
          message_ar: `تم تحديث عرض سعر بيع بمرجع : ${new_referenceFormatting}-${year}`,
        });
      } catch (error) {
        await last_activity(req);
        console.error("Error updating sales Qutation:", error);
    
        // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
        return res.json({
          success: false,
          message_ar: "حدث خطأ أثناء عملية الحفظ وتم إلغاء العملية",
        });
      }
    });
    //#endregion sales_qutation_update

    //#region sales qutation reject
    app.post("/api/sales_qutation_reject", async (req, res) => {
      try {
    
        // //! Permission
        await permissions(req, "sales_qutation_permission", "update");
        if (!permissions) {
          return res.status(403).json({
            success: false,
            message_ar: "ليس لديك الصلاحيات المطلوبة للقيام بهذه العملية.",
          });
        }



    
        const posted_elements = req.body;
        const transaction_type = 23
      
        
        //! sql injection check
        const hasBadSymbols = sql_anti_injection(...Object.values(posted_elements));

        if (hasBadSymbols) {
          return res.json({
            success: false,
            message_ar:
              "Invalid input detected due to prohibited characters. Please review your input and try again.",
          });
        }
    
    
        const InValidDateFormat = isInValidDateFormat([posted_elements.datex]);
        if (InValidDateFormat) {
          return res.status(400).json({
            success: false,
            message_ar: InValidDateFormat_message_ar,
          });
        }
    
        //! settings
        const settings = await check_settings_validation({
          check_futureDate: true,
          check_closingDate: true,
          datex: posted_elements.datex,
          type: 'update',
          tableName: 'befor_invoice_header', // if type = 'update' or 'delete' only
          transaction_id: posted_elements.x, // if type = 'update' or 'delete' only
        }, req);
    
        
        if (!settings.valid) {
          return res.json({
            success: false,
            message_ar: settings.message_ar,
          });
        }
    
        turn_EmptyValues_TO_null(posted_elements);
    
        

        //* Start Transaction --------------------------------------------------
    
        const year = getYear(posted_elements.datex)
    
    // //! Security hacking  accounts id

          //! Security hacking check id for company_name and transactio type

          const query1 = `
          SELECT 
            (SELECT count(id) 
             FROM befor_invoice_header 
             WHERE qutation_id = $1 
               AND company_id = $2 
               AND transaction_type = 24 
               AND is_deleted IS NULL) AS befor_invoice_count, 
            (SELECT count(id) 
             FROM transaction_header 
             WHERE qutation_id = $1 
               AND company_id = $2 
               AND is_deleted IS NULL) AS transaction_header_count,
            (SELECT reference 
             FROM befor_invoice_header 
             WHERE id = $1 
               AND company_id = $2
               AND transaction_type = 23 
               AND is_deleted IS NULL) AS qutation_reference
        `;
        
        const result1 = await db.oneOrNone(query1, [posted_elements.x, req.session.company_id]);
        
        if (result1.befor_invoice_count > 0 || result1.transaction_header_count > 0) {
          return res.json({
            success: false,
            message_ar: 'لا يمكن رفض عرض السعر الحالي، حيث تم قبوله بالفعل فى احد المعاملات.',
          });
        }
        
        if (!result1 || !result1.qutation_reference){
          await block_user(req,'Ssqr01')
          return res.json({
            success: false,
            xx: true,
            message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
          });
        }

          let query01 = `update befor_invoice_header set is_qutation_status = false WHERE id = $1 AND company_id = $2 AND is_deleted IS null;`;
          let rows01 = await db.result(query01, [posted_elements.x, req.session.company_id]);

          if (rows01.rowCount === 0) {
            await block_user(req,'Ssqr02')
            return res.json({
              success: false,
              xx: true,
              message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
            });
          }

          

        await last_activity(req);
        const new_referenceFormatting = formatFromFiveDigits(result1.qutation_reference);

        // إذا تم تنفيذ جميع الاستعلامات بنجاح
        return res.json({
          success: true,
          message_ar: `تم تسجيل رفض عرض السعر بمرجع : ${new_referenceFormatting}-${year}`,
        });
      } catch (error) {
        await last_activity(req);
        console.error("Error sales_qutation_reject:", error);
    
        // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
        return res.json({
          success: false,
          message_ar: "حدث خطأ أثناء عملية رفض عرض السعر وتم الغاء العملية",
        });
      }
    });
    //#endregion sales qutation reject


    //#region delete sales Qutation
    app.post("/api/sales_qutation_delete", async (req, res) => {
      try {
    
        //! Permission 
        await permissions(req, "sales_qutation_permission", "delete");
        if (!permissions) {
          return res.status(403).json({
            success: false,
            message_ar: "ليس لديك الصلاحيات المطلوبة للقيام بهذه العملية.",
          });
        }



    
        const posted_elements = req.body;
        const transaction_type = 23
      
      
        //! sql injection check
        const hasBadSymbols = sql_anti_injection(...Object.values(posted_elements));
  
        if (hasBadSymbols) {
          return res.json({
            success: false,
            message_ar:
              "Invalid input detected due to prohibited characters. Please review your input and try again.",
          });
        }
    

    
        //! settings
        const settings = await check_settings_validation({
          check_futureDate: true,
          check_closingDate: true,
          datex: false,
          type: 'delete',
          tableName: 'befor_invoice_header', // if type = 'update' or 'delete' only
          transaction_id: posted_elements.x, // if type = 'update' or 'delete' only
        }, req);
    
        
        if (!settings.valid) {
          return res.json({
            success: false,
            message_ar: settings.message_ar,
          });
        }
    
        turn_EmptyValues_TO_null(posted_elements);
    
        

        //* Start Transaction --------------------------------------------------

    
    // //! Security hacking  accounts id

          //! Security hacking check id for company_name and transactio type
          let query01 = `
          SELECT reference, datex 
          FROM befor_invoice_header 
          WHERE id = $1 AND company_id = $2;
        `;
        
        let rows01 = await db.oneOrNone(query01, [posted_elements.x, req.session.company_id]);
        
        if (!rows01) {
          await block_user(req, 'Ssqd01');
          return res.json({
            success: false,
            xx: true,
            message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
          });
        }
        
        const datex = rows01.datex;
        const reference = rows01.reference;
        
        const year = getYear(datex)

        let queries = `
          SELECT COUNT(qutation_id) AS count_qutation_id
          FROM befor_invoice_header 
          WHERE reference = $1 
            AND SUBSTRING(datex, 1, 4) = SUBSTRING($2, 1, 4);
        `;
        
        let result = await db.oneOrNone(queries, [reference, datex]);
        
        if (result.count_qutation_id > 0) {
          return res.json({
            success: false,
            message_ar: 'عفوا : لا يمكن حذف سعر البيع لانه مستخدم بالفعل ',
          });
        }
        

        // تنفيذ معاملة قاعدة البيانات
        await db.tx(async (tx) => {
          let query1 = `update befor_invoice_header
                        set is_deleted = true where id = $1 and company_id = $2;`;
    
          const resultQ1 = await tx.result(query1, [
            posted_elements.x,
            req.session.company_id
          ]);
    
          if (resultQ1.rowCount === 0) {
            throw new Error("No rows were update, rolling back sales Qutation Update.");
          }
    
          let query0 = `DELETE from befor_invoce_body where header_id = $1`
          await tx.none(query0,[posted_elements.x])

          await history(transaction_type,3,posted_elements.x,reference,req,tx);
        });
    
        const new_referenceFormatting = formatFromFiveDigits(reference);
        await last_activity(req);
        // إذا تم تنفيذ جميع الاستعلامات بنجاح
        return res.json({
          success: true,
          message_ar: `تم حذف عرض سعر بيع بمرجع : ${new_referenceFormatting}-${year}`,
        });
      } catch (error) {
        await last_activity(req);
        console.error("Error deleting sales Qutation:", error);
    
        // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
        return res.json({
          success: false,
          message_ar: "حدث خطأ أثناء عملية الحذف وتم إلغاء العملية",
        });
      }
    });
    //#endregion delete sales qutation

//#endregion sales Qutation

//#region sales order


    //#region sales order view
    app.post("/get_sales_order_Data_view", async (req, res) => {
      try {
        //! Permission  معلق
        await permissions(req, "sales_order_permission", "view");
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
          
              const InValidDateFormat = isInValidDateFormat([posted_elements.start_date,posted_elements.end_date])
              if (InValidDateFormat){
                return res.json({
                  success: false,
                  message_ar: InValidDateFormat_message_ar,
                });
              }
            
    
    
          turn_EmptyValues_TO_null(posted_elements);
        //* Start--------------------------------------------------------------
    
    
        // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");
    
        let query1 = `
    select 
        bih.id,
        bih.reference,
        bih.total_value,
        COALESCE(bih.general_note, '') as general_note, 
        bih.datex,
        bih.account_id as customer_id,
        ah1.account_name as customer_name,
        bih.salesman_id as salesman_id,
        ah2.account_name as salesman_name,
        CASE 
            WHEN bih.is_invoiced IS TRUE THEN 'مفوتر'
            ELSE 'غير مفوتر'
        END AS is_invoiced,
        bih.expire_offer_datex,
        bih.is_row_note_show,
        bih.is_row_dicount_show,
        CONCAT(
            SUBSTRING(bih.datex, 1, 4), '-',  -- استخراج السنة من datex
            LPAD(CAST(bih.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
        ) AS referenceconcat,
         bih.qutation_id,
        CONCAT(
            SUBSTRING(bih2.datex, 1, 4), '-',  -- استخراج السنة من datex
            LPAD(CAST(bih2.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
        ) AS qutation_reference
         
    from
        befor_invoice_header bih
    left join accounts_header ah1 on ah1.id = bih.account_id
    left join accounts_header ah2 on ah2.id = bih.salesman_id
    left join befor_invoice_header bih2 on bih2.id = bih.qutation_id
    where
        bih.company_id = $1
        AND bih.transaction_type = 24
        AND (bih.datex BETWEEN $2 AND $3) -- التأكد أن القيم بين التواريخ النصية تعمل بشكل صحيح
        AND bih.is_deleted IS NULL
    ORDER BY
        bih.datex DESC,
        bih.reference DESC;
    
    `;
    
        let data = await db.any(query1, [req.session.company_id,posted_elements.start_date, posted_elements.end_date]);
    
        res.json(data);
      } catch (error) {
        console.error("Error get_sales_order_Data_view:", error);
        res.status(500).send("Error:");
      }
    });
    
    //#endregion

    //#region add sales order
    app.post("/api/sales_order_add", async (req, res) => {
      try {
    
        // //! Permission
        await permissions(req, "sales_order_permission", "add");
        if (!permissions) {
          return res.status(403).json({
            success: false,
            message_ar: "ليس لديك الصلاحيات المطلوبة للقيام بهذه العملية.",
          });
        }



    
        const posted_elements = req.body;
        const transaction_type = 24
      
    
        //! sql injection check
        let hasBadSymbols = sql_anti_injection([
          ...posted_elements.posted_array.map((obj) => obj.item_typeId + obj.item_id + obj.row_note + obj.row_amount + obj.row_unitPrice + obj.row_discountTypeId + obj.row_discountValue + obj.row_taxHeaderId), // تحويل كل عنصر في dataArray إلى سلسلة نصية ودمجها معاً
          posted_elements.customerId,
          posted_elements.total,
          posted_elements.datex,
          posted_elements.qutationReferenceId,
          posted_elements.itemLocationId,
          posted_elements.salesmanId,
          posted_elements.is_RowNote,
          posted_elements.is_RowDiscount,
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
    
    
        const InValidDateFormat = isInValidDateFormat([posted_elements.datex]);
        if (InValidDateFormat) {
          return res.status(400).json({
            success: false,
            message_ar: InValidDateFormat_message_ar,
          });
        }
                

        //! settings
        const settings = await check_settings_validation({
          check_futureDate: true,
          check_closingDate: true,
          datex: posted_elements.datex,
          type: 'add',
          tableName: false, // if type = 'update' or 'delete' only
          transaction_id: false, // if type = 'update' or 'delete' only
        }, req);
    
        
        if (!settings.valid) {
          return res.json({
            success: false,
            message_ar: settings.message_ar,
          });
        }
    
        turn_EmptyValues_TO_null(posted_elements);
    
        

        //* Start Transaction --------------------------------------------------
    
       const total = +posted_elements.total

       if (!total || isNaN(total)){
        await block_user(req,'Ssqa001')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
       }

    
    // //! Security hacking  accounts id
   
       // check qutationReferenceId
       let query04;
       let rows04;
       if (posted_elements.qutationReferenceId){
         query04 = `select id, is_qutation_status from befor_invoice_header where id = $1 and company_id = $2 and transaction_type = 23 and is_deleted IS NULL`
         rows04 = await db.oneOrNone(query04, [posted_elements.qutationReferenceId, req.session.company_id])
        if (!rows04 || !rows04.id){
          await block_user(req,'Ssqa01')
          return res.json({
            success: false,
            xx: true,
            message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
          });
        }
        }



    // جلب الحسابات من قاعدة البيانات
    let query02 = `SELECT id, account_type_id, is_salesman FROM accounts_header WHERE company_id = $1 AND is_inactive is null`;
    let rows02 = await db.any(query02, [req.session.company_id]);
    
    // تحويل النتائج إلى مصفوفة للتسهيل في الفحص
    const dbAccounts = rows02.map(row => ({
      id: parseInt(row.id),
      account_type_id: row.account_type_id,
      is_salesman: row.is_salesman
    }));

    //check salesman

    const count_salesman = dbAccounts.some(row => +row.id === +posted_elements.salesmanId && +row.account_type_id === 4 && row.is_salesman === true);
    const count_itemLocation = dbAccounts.some(row => +row.id === +posted_elements.itemLocationId && +row.account_type_id === 7);

      // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
      if (!count_salesman) {
        await block_user(req,'Ssqa01')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }

      // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
      if (!count_itemLocation) {
        await block_user(req,'Ssqa02')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }


    // المرور على كل كائن في posted_elements.posted_array
    for (const rowData of posted_elements.posted_array) {
      const item_typeId = rowData.item_typeId;
      const item_id = rowData.item_id;

    
      //! make sure from every account_id
      const accountExists = dbAccounts.some(item => 
        +item.id === +item_id && +item.account_type_id === +item_typeId
      );
    
      // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
      if (!accountExists) {
        await block_user(req,'Ssqa1')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }
    }
    
    
        // جلب من قاعدة البيانات
        let query03 = `SELECT id FROM settings_tax_header WHERE company_id = $1`;
        let rows03 = await db.any(query03, [req.session.company_id]);
        
        // تحويل النتائج إلى مصفوفة للتسهيل في الفحص
        const dbTaxesHeaderArray = rows03.map(row => ({
          id: parseInt(row.id)
        }));
        
        // المرور على كل كائن في posted_elements.posted_array
        for (const rowData of posted_elements.posted_array) {
          const row_taxHeaderId = rowData.row_taxHeaderId;
          
          if (row_taxHeaderId){
          //! make sure from every account_id
          const taxExists = dbTaxesHeaderArray.some(item =>
            +item.id === +row_taxHeaderId
          );
          

        
          // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
          if (!taxExists) {
            await block_user(req,'Ssqa2')
            return res.json({
              success: false,
              xx: true,
              message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
            });
          }
        }
        }
    

        
        const newId_transaction_header = await newId_fn("befor_invoice_header", 'id');
        const year = getYear(posted_elements.datex)
    

        const query001 = `SELECT MAX(reference) AS max FROM befor_invoice_header WHERE company_id = $1 AND transaction_Type = 24 AND datex LIKE '${year}-%'; -- التحقق من السنة في بداية التاريخ `;
      const Params001 = [req.session.company_id];
      const result001 = await db.oneOrNone(query001, Params001);
      let newReference_transaction_header = 1;
      if (result001 && result001.max && result001.max > 0) {
        newReference_transaction_header = +result001.max + 1;
      }
  
        // تنفيذ معاملة قاعدة البيانات
        await db.tx(async (tx) => {


          if (rows04 && rows04.is_qutation_status === null) {
            await tx.none(
              `UPDATE befor_invoice_header 
               SET is_qutation_status = true 
               WHERE id = $1 AND company_id = $2`,
              [posted_elements.qutationReferenceId, req.session.company_id]
            );
          }
          


          let query1 = `INSERT INTO befor_invoice_header
                        (id, reference,transaction_type, total_value, general_note, datex, account_id, salesman_id, items_location_id, is_row_note_show, is_row_dicount_show,qutation_id, company_id)
                        VALUES($1, $2, $3, $4, $5, $6, $7 , $8 , $9 , $10 , $11 , $12, $13);`;
    
          await tx.none(query1, [
            newId_transaction_header,
            newReference_transaction_header,
            transaction_type,
            total,
            posted_elements.general_note,
            posted_elements.datex,
            posted_elements.customerId,
            posted_elements.salesmanId,
            posted_elements.itemLocationId,
            posted_elements.is_RowNote ? true : null,
            posted_elements.is_RowDiscount ? true : null,
            posted_elements.qutationReferenceId,
            req.session.company_id
          ]);
    
          let newId_transaction_body = await newId_fn("befor_invoce_body",'id');
          for (const element of posted_elements.posted_array) {
            const newId = parseInt(newId_transaction_body);
    
            //! make sure if account id != item  then location and amount = null

            if(isNaN(+element.row_amount) || isNaN(+element.row_unitPrice)){
              await block_user(req,'Ssqa3')
              return res.json({
                success: false,
                xx: true,
                message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
              });
            }

    
            let query2 = `INSERT INTO befor_invoce_body
                          (id, header_id, item_type_id, item_id, amount, unite_price, row_note, is_discount_percentage, dicount_value, tax_header_id)
                          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
    
            await tx.none(query2, [
              newId,
              newId_transaction_header,
              +element.item_typeId,
              element.item_id,
              +element.row_amount,
              +element.row_unitPrice,
              element.row_note,
              +element.row_discountTypeId === 1? true : null,
              +element.row_discountValue,
              element.row_taxHeaderId
            ]);
    
            
            newId_transaction_body = parseInt(newId_transaction_body) + 1;
          }
    
          //! history
          await history(transaction_type,1,newId_transaction_header,newReference_transaction_header,req,tx);
        });
    
        const new_referenceFormatting = formatFromFiveDigits(newReference_transaction_header);
        await last_activity(req);
        // إذا تم تنفيذ جميع الاستعلامات بنجاح
        return res.json({
          success: true,
          message_ar: `تم إنشاء امر بيع بمرجع : ${new_referenceFormatting}-${year}`,
        });
      } catch (error) {
        await last_activity(req);
        console.error("Error adding sales Qutation:", error);
    
        // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
        return res.json({
          success: false,
          message_ar: "حدث خطأ أثناء عملية الحفظ وتم إلغاء العملية",
        });
      }
    });
    //#endregionsales order

        //#region sales_order_update
        app.post("/api/sales_order_update", async (req, res) => {
          try {
        
            //! Permission معلق
            await permissions(req, "sales_order_permission", "update");
            if (!permissions) {
              return res.status(403).json({
                success: false,
                message_ar: "ليس لديك الصلاحيات المطلوبة للقيام بهذه العملية.",
              });
            }
    
    
    
        
            const posted_elements = req.body;
            const transaction_type = 24
          
            const year = getYear(posted_elements.datex)
            //! sql injection check
            let hasBadSymbols = sql_anti_injection([
              ...posted_elements.posted_array.map((obj) => obj.item_typeId + obj.item_id + obj.row_note + obj.row_amount + obj.row_unitPrice + obj.row_discountTypeId + obj.row_discountValue + obj.row_taxHeaderId), // تحويل كل عنصر في dataArray إلى سلسلة نصية ودمجها معاً
              posted_elements.x,
              posted_elements.qutation_id,
              posted_elements.customerId,
              posted_elements.total,
              posted_elements.datex,
              posted_elements.itemLocationId,
              posted_elements.salesmanId,
              posted_elements.is_RowNote,
              posted_elements.is_RowDiscount,
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
        
        
            const InValidDateFormat = isInValidDateFormat([posted_elements.datex]);
            if (InValidDateFormat) {
              return res.status(400).json({
                success: false,
                message_ar: InValidDateFormat_message_ar,
              });
            }
        
            //! settings
            const settings = await check_settings_validation({
              check_futureDate: true,
              check_closingDate: true,
              datex: posted_elements.datex,
              type: 'update',
              tableName: 'befor_invoice_header', // if type = 'update' or 'delete' only
              transaction_id: posted_elements.x, // if type = 'update' or 'delete' only
            }, req);
        
            
            if (!settings.valid) {
              return res.json({
                success: false,
                message_ar: settings.message_ar,
              });
            }
        
            turn_EmptyValues_TO_null(posted_elements);
        
            
    
            //* Start Transaction --------------------------------------------------
        
           const total = +posted_elements.total
    
           if (!total || isNaN(total)){
            await block_user(req,'Ssqa001')
            return res.json({
              success: false,
              xx: true,
              message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
            });
           }
    
        
        // //! Security hacking  accounts id


              //! Security hacking check id for company_name and transactio type
              if (posted_elements.qutation_id){
                let query05 = `SELECT count(id) as countQutationId FROM befor_invoice_header WHERE id = $1 AND company_id = $2;`;
                let rows05 = await db.oneOrNone(query05, [posted_elements.qutation_id, req.session.company_id]);
                if (!rows05.countQutationId === 0) {
                  await block_user(req,'Ssqa05')
                  return res.json({
                    success: false,
                    xx: true,
                    message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
                  });
                }
              }
         

              let query01 = `SELECT id, reference, qutation_id FROM befor_invoice_header WHERE id = $1 AND company_id = $2;`;
              let rows01 = await db.oneOrNone(query01, [posted_elements.x, req.session.company_id]);
              
              
        
              if (!rows01 || !rows01.id) {
                return res.json({
                  success: false,
                  message_ar: 'هذا المرجع غير موجود. برجاء اعادة تحميل الصفحه ',
                });
              }
              const reference = rows01.reference

    
        // جلب الحسابات من قاعدة البيانات
        let query02 = `SELECT id, account_type_id, is_salesman FROM accounts_header WHERE company_id = $1 AND is_inactive is null`;
        let rows02 = await db.any(query02, [req.session.company_id]);
        
        // تحويل النتائج إلى مصفوفة للتسهيل في الفحص
        const dbAccounts = rows02.map(row => ({
          id: parseInt(row.id),
          account_type_id: row.account_type_id,
          is_salesman: row.is_salesman
        }));
    
        //check salesman
    
        const count_salesman = dbAccounts.some(row => +row.id === +posted_elements.salesmanId && +row.account_type_id === 4 && row.is_salesman === true);
        const count_itemLocation = dbAccounts.some(row => +row.id === +posted_elements.itemLocationId && +row.account_type_id === 7);
    
          // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
          if (!count_salesman) {
            await block_user(req,'Ssqa01')
            return res.json({
              success: false,
              xx: true,
              message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
            });
          }
    
          // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
          if (!count_itemLocation) {
            await block_user(req,'Ssqa02')
            return res.json({
              success: false,
              xx: true,
              message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
            });
          }
    
    
        // المرور على كل كائن في posted_elements.posted_array
        for (const rowData of posted_elements.posted_array) {
          const item_typeId = rowData.item_typeId;
          const item_id = rowData.item_id;
    
        
          //! make sure from every account_id
          const accountExists = dbAccounts.some(item => 
            +item.id === +item_id && +item.account_type_id === +item_typeId
          );
        
          // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
          if (!accountExists) {
            await block_user(req,'Ssqa1')
            return res.json({
              success: false,
              xx: true,
              message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
            });
          }
        }
        
        
            // جلب من قاعدة البيانات
            let query03 = `SELECT id FROM settings_tax_header WHERE company_id = $1`;
            let rows03 = await db.any(query03, [req.session.company_id]);
            
            // تحويل النتائج إلى مصفوفة للتسهيل في الفحص
            const dbTaxesHeaderArray = rows03.map(row => ({
              id: parseInt(row.id)
            }));
            
            // المرور على كل كائن في posted_elements.posted_array
            for (const rowData of posted_elements.posted_array) {
              const row_taxHeaderId = rowData.row_taxHeaderId;
              
              if (row_taxHeaderId){
              //! make sure from every account_id
              const taxExists = dbTaxesHeaderArray.some(item =>
                +item.id === +row_taxHeaderId
              );
              
    
            
              // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
              if (!taxExists) {
                await block_user(req,'Ssqa2')
                return res.json({
                  success: false,
                  xx: true,
                  message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
                });
              }
            }
            }
        
    
    
    
            // تنفيذ معاملة قاعدة البيانات
            await db.tx(async (tx) => {

              //! qutation_id check and update
              const db_qutation_id = rows01.qutation_id || 0
              const posted_qutation_id = posted_elements.qutation_id || 0
              if (+db_qutation_id !== +posted_qutation_id){
                if (+db_qutation_id !== 0) {
                  const q1 = `
                    SELECT 
                      (SELECT COUNT(id) FROM befor_invoice_header WHERE id != $1 AND qutation_id = $2 AND company_id = $3 AND is_deleted IS NULL) AS count_befor_invoice_header,
                      (SELECT COUNT(id) FROM transaction_header WHERE qutation_id = $2 AND company_id = $3 AND is_deleted IS NULL) AS count_transaction_header
                  `;                  
                  let result1 = await tx.oneOrNone(q1, [+posted_elements.x, +db_qutation_id, req.session.company_id]);                  
                  if (+result1.count_befor_invoice_header === 0 && +result1.count_transaction_header === 0) {
                    const updateQuery1 = `UPDATE befor_invoice_header SET is_qutation_status = NULL WHERE id = $1 AND company_id = $2`;
                    await tx.none(updateQuery1, [+db_qutation_id, req.session.company_id]);
                  }
                }
                if (+posted_qutation_id !== 0) {
                  const updateQuery2 = `UPDATE befor_invoice_header SET is_qutation_status = true WHERE id = $1 AND company_id = $2`;
                  await tx.none(updateQuery2, [+posted_qutation_id, req.session.company_id]);
                }
              }
              


              let query1 = `update befor_invoice_header
                            set total_value = $1, general_note = $2, datex = $3, account_id = $4, salesman_id = $5, items_location_id = $6, is_row_note_show = $7, is_row_dicount_show = $8, qutation_id = $9
                            where id = $10 and company_id = $11;`;
        
              const resultQ1 = await tx.result(query1, [
                total,
                posted_elements.general_note,
                posted_elements.datex,
                posted_elements.customerId,
                posted_elements.salesmanId,
                posted_elements.itemLocationId,
                posted_elements.is_RowNote ? true : null,
                posted_elements.is_RowDiscount ? true : null,
                posted_elements.qutation_id ? +posted_elements.qutation_id : null,
                posted_elements.x,
                req.session.company_id
              ]);
        
              if (resultQ1.rowCount === 0) {
                throw new Error("No rows were update, rolling back sales order Update.");
              }
        
              let query0 = `DELETE from befor_invoce_body where header_id = $1`
              await tx.none(query0,[posted_elements.x])
    
              let newId_transaction_body = await newId_fn("befor_invoce_body",'id');
              for (const element of posted_elements.posted_array) {
                const newId = parseInt(newId_transaction_body);
        
                //! make sure if account id != item  then location and amount = null
    
                if(isNaN(+element.row_amount) || isNaN(+element.row_unitPrice)){
                  await block_user(req,'Ssqa3')
                  return res.json({
                    success: false,
                    xx: true,
                    message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
                  });
                }
    
        
                let query2 = `INSERT INTO befor_invoce_body
                              (id, header_id, item_type_id, item_id, amount, unite_price, row_note, is_discount_percentage, dicount_value, tax_header_id)
                              VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
        
                await tx.none(query2, [
                  newId,
                  posted_elements.x,
                  +element.item_typeId,
                  element.item_id,
                  +element.row_amount,
                  +element.row_unitPrice,
                  element.row_note,
                  +element.row_discountTypeId === 1? true : null,
                  +element.row_discountValue,
                  element.row_taxHeaderId
                ]);
        
                
                newId_transaction_body = parseInt(newId_transaction_body) + 1;
              }
        
              //! history
              await history(transaction_type,2,posted_elements.x,reference,req,tx);
            });
        
            const new_referenceFormatting = formatFromFiveDigits(reference);
            await last_activity(req);
            // إذا تم تنفيذ جميع الاستعلامات بنجاح
            return res.json({
              success: true,
              message_ar: `تم تحديث امر بيع بمرجع : ${new_referenceFormatting}-${year}`,
            });
          } catch (error) {
            await last_activity(req);
            console.error("Error updating sales Order:", error);
        
            // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
            return res.json({
              success: false,
              message_ar: "حدث خطأ أثناء عملية التحديث وتم إلغاء العملية",
            });
          }
        });
        //#endregion sales_order_update
    

    //#region delete sales order
    app.post("/api/sales_order_delete", async (req, res) => {
      try {
    
        //! Permission معلق
        await permissions(req, "sales_order_permission", "delete");
        if (!permissions) {
          return res.status(403).json({
            success: false,
            message_ar: "ليس لديك الصلاحيات المطلوبة للقيام بهذه العملية.",
          });
        }



    
        const posted_elements = req.body;
        const transaction_type = 24
      
      
        //! sql injection check
        const hasBadSymbols = sql_anti_injection(...Object.values(posted_elements));
  
        if (hasBadSymbols) {
          return res.json({
            success: false,
            message_ar:
              "Invalid input detected due to prohibited characters. Please review your input and try again.",
          });
        }
    
        const InValidDateFormat = isInValidDateFormat([posted_elements.datex]);
        if (InValidDateFormat) {
          return res.status(400).json({
            success: false,
            message_ar: InValidDateFormat_message_ar,
          });
        }
    

    
        //! settings
        const settings = await check_settings_validation({
          check_futureDate: true,
          check_closingDate: true,
          datex: false,
          type: 'delete',
          tableName: 'befor_invoice_header', // if type = 'update' or 'delete' only
          transaction_id: posted_elements.x, // if type = 'update' or 'delete' only
        }, req);
    
        
        if (!settings.valid) {
          return res.json({
            success: false,
            message_ar: settings.message_ar,
          });
        }
    
        turn_EmptyValues_TO_null(posted_elements);
    
        

        //* Start Transaction --------------------------------------------------

    
    // //! Security hacking  accounts id

          //! Security hacking check id for company_name and transactio type
          let query01 = `
          SELECT reference, datex, qutation_id
          FROM befor_invoice_header 
          WHERE id = $1 AND company_id = $2 AND transaction_type = $3 AND is_deleted IS NULL;
        `;
        
        let rows01 = await db.oneOrNone(query01, [posted_elements.x, req.session.company_id, transaction_type]);
        if (!rows01) {
          await block_user(req, 'Ssqd01');
          return res.json({
            success: false,
            xx: true,
            message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
          });
        }
        
        const datex = rows01.datex;
        const reference = rows01.reference;
        const qutation_id = rows01.qutation_id;
        
        const year = getYear(datex)

        let queries = `
          SELECT COUNT(order_id) AS count_order_id
          FROM transaction_header 
          WHERE order_id = $1 
                AND company_id = $2
                AND is_deleted IS NULL ;
        `;
        
        let result = await db.oneOrNone(queries, [posted_elements.x, req.session.company_id]);
        
        if (result.count_order_id > 0) {
          return res.json({
            success: false,
            message_ar: 'عفوا : لا يمكن حذف عرض سعر البيع لانه مستخدم بالفعل ',
          });
        }
        
        

        // تنفيذ معاملة قاعدة البيانات
        await db.tx(async (tx) => {
          let result1;
          if (qutation_id){
            const q1 = `select count(id) as id_count from befor_invoice_header where id != $1 AND qutation_id = $2 and Company_id = $3 AND is_deleted IS NULL`            
            result1 = await tx.oneOrNone(q1,[+posted_elements.x, +qutation_id, req.session.company_id])            
            if (+result1.id_count === 0){    
              const q2 = `update befor_invoice_header set is_qutation_status = null where id = $1 AND company_id = $2`
              const p1 = await tx.none(q2,[+qutation_id, req.session.company_id])
            }
          }


          let query1 = `update befor_invoice_header
                        set is_deleted = true where id = $1 and company_id = $2 AND transaction_type = 24;`;
    
          const resultQ1 = await tx.result(query1, [
            posted_elements.x,
            req.session.company_id
          ]);
    
          if (resultQ1.rowCount === 0) {
            throw new Error("No rows were update, rolling back sales Qutation Update.");
          }
    
          let query0 = `DELETE from befor_invoce_body where header_id = $1`
          await tx.none(query0,[posted_elements.x])

          await history(transaction_type,3,posted_elements.x,reference,req,tx);
        });
    
        const new_referenceFormatting = formatFromFiveDigits(reference);
        await last_activity(req);
        // إذا تم تنفيذ جميع الاستعلامات بنجاح
        return res.json({
          success: true,
          message_ar: `تم حذف امر بيع بمرجع : ${new_referenceFormatting}-${year}`,
        });
      } catch (error) {
        await last_activity(req);
        console.error("Error deleting sales Order:", error);
    
        // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
        return res.json({
          success: false,
          message_ar: "حدث خطأ أثناء عملية الحذف وتم إلغاء العملية",
        });
      }
    });
    //#endregion delete sales order

//#endregion sales order


//#region sales invoice

        //#region sales invoice view

        app.post("/get_sales_invoice_Data_view", async (req, res) => {
          try {
            
            //! Permission  
            await permissions(req, "sales_invoice_permission", "view");
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
              
                  const InValidDateFormat = isInValidDateFormat([posted_elements.start_date,posted_elements.end_date])
                  if (InValidDateFormat){
                    return res.json({
                      success: false,
                      message_ar: InValidDateFormat_message_ar,
                    });
                  }
                
        
        
              turn_EmptyValues_TO_null(posted_elements);
            //* Start--------------------------------------------------------------
        
      /*
      -- استعلام فواتير العملاء المفتوحه
      WITH balances AS (
    SELECT 
        A.id AS customer_id,
        COALESCE(SUM(T.debit), 0) - COALESCE(SUM(T.credit), 0) AS balance
    FROM 
        accounts_header A
    LEFT JOIN 
        transaction_body T ON A.id = T.account_id
    WHERE
        A.company_id = $1
        AND A.account_type_id = 2
    GROUP BY
        A.id
),
ordered_invoices AS (
    SELECT 
        th.id AS invoice_id,
        th.account_id AS customer_id,
        th.total_value AS invoice_value,
        th.datex AS invoice_date
    FROM
        transaction_header th
    WHERE
        th.company_id = $1
        AND th.transaction_type = 3
        AND (th.datex BETWEEN $2 AND $3)
        AND th.is_deleted IS NULL
    ORDER BY
        th.account_id ASC,
        th.datex ASC,
        th.id ASC
),
distributed AS (
    SELECT
        oi.invoice_id,
        oi.customer_id,
        oi.invoice_value,
        oi.invoice_date,
        b.balance,
        GREATEST(
            0,
            LEAST(oi.invoice_value, 
                  b.balance - COALESCE(SUM(oi.invoice_value) OVER (PARTITION BY oi.customer_id ORDER BY oi.invoice_date ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING), 0)
            )
        ) AS remaining_balance
    FROM
        ordered_invoices oi
    LEFT JOIN 
        balances b ON oi.customer_id = b.customer_id
)
SELECT 
    invoice_id,
    customer_id,
    invoice_value,
    invoice_date,
    remaining_balance
FROM
    distributed
WHERE
    remaining_balance > 0
ORDER BY
    customer_id,
    invoice_date;
   
      */
         
      
        let quer1 = `
        -- 1. حساب الأرصدة المتبقية للعملاء
WITH balances AS (
    SELECT 
        A.id AS customer_id, -- تعريف العميل باستخدام معرّف العميل
        COALESCE(SUM(T.debit), 0) - COALESCE(SUM(T.credit), 0) AS balance -- حساب الرصيد: (المجموع المدين - المجموع الدائن)
    FROM 
        accounts_header A -- الجدول الذي يحتوي على بيانات الحسابات
    LEFT JOIN 
        transaction_body T ON A.id = T.account_id -- ربط الحسابات بالمعاملات عبر معرّف الحساب
    WHERE
        A.company_id = $1 -- تحديد الشركة بناءً على معرّف الشركة
        AND A.account_type_id = 2 -- تحديد نوع الحساب (حسابات العملاء)
    GROUP BY
        A.id -- تجميع البيانات حسب معرّف العميل
),

-- 2. ترتيب الفواتير حسب العميل والتاريخ
---- هنضيف الاعمده النهائية 3 مرات بدأ من الجزىء التالى وحتى الاخير
ordered_invoices AS (
    SELECT 
        th.id as id,
        th.reference as reference,
        th.total_value AS total_value,        
        COALESCE(th.general_note, '') as general_note,
        th.datex AS datex,
        th.account_id AS customer_id,
        ah1.account_name as customer_name,
        th.salesman_id as salesman_id,
        ah2.account_name as salesman_name,
        th.due_date,
        th.is_row_note_show,
        th.is_row_dicount_show,
        CONCAT(
          SUBSTRING(th.datex, 1, 4), '-',  -- استخراج السنة من datex
            LPAD(CAST(th.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
        ) AS referenceconcat,
        th.qutation_id,
        CONCAT(
          SUBSTRING(bih.datex, 1, 4), '-',  -- استخراج السنة من datex
            LPAD(CAST(bih.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
        ) AS qutation_reference,
        th.order_id,
        CONCAT(
          SUBSTRING(bih2.datex, 1, 4), '-',  -- استخراج السنة من datex
            LPAD(CAST(bih2.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
        ) AS order_reference
    FROM
        transaction_header th
    left join accounts_header ah1 on ah1.id = th.account_id
    left join accounts_header ah2 on ah2.id = th.salesman_id
    left join befor_invoice_header bih on bih.id = th.qutation_id
    left join befor_invoice_header bih2 on bih2.id = th.order_id
    WHERE
        th.company_id = $1 -- تحديد الشركة بناءً على معرّف الشركة
        AND th.transaction_type = 3 -- تحديد نوع المعاملة (فاتورة بيع)
        AND (th.datex BETWEEN $2 AND $3) -- تحديد الفترة الزمنية بين تاريخين
        AND th.is_deleted IS NULL -- تجاهل الفواتير المحذوفة
    ORDER BY
        th.account_id ASC, -- ترتيب الفواتير حسب معرّف العميل
        th.datex ASC, -- ثم حسب تاريخ الفاتورة
        th.id ASC -- وأخيرًا حسب معرّف الفاتورة
),

-- 3. توزيع الرصيد على الفواتير
distributed AS (
    SELECT
        oi.id,
        oi.reference,
        oi.total_value,
        oi.general_note,
        oi.datex,
        oi.customer_id,
        oi.customer_name,
        oi.salesman_id,
        oi.salesman_name,
        oi.due_date,
        oi.is_row_note_show,
        oi.is_row_dicount_show,
        oi.referenceconcat,
        oi.qutation_id,
        oi.qutation_reference,
        oi.order_id,
        oi.order_reference,
        b.balance, -- الرصيد المتبقي للعميل
        -- حساب الرصيد المتبقي بعد توزيع الأموال على الفاتورة
        CASE
            WHEN b.balance <= 0 THEN 0 -- إذا انتهى الرصيد، يتم تخصيص 0
            ELSE
                -- إذا كان هناك رصيد متبقي، يتم توزيعه على الفاتورة
                GREATEST(
                    0, -- الحد الأدنى للرصيد المتبقي
                    LEAST(
                        oi.total_value, -- قيمة الفاتورة
                        b.balance - COALESCE(SUM(oi.total_value) OVER (PARTITION BY oi.customer_id ORDER BY oi.datex ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING), 0) -- حساب الرصيد المتبقي بعد توزيع الفواتير السابقة
                    )
                )
        END AS remaining_balance -- إذا انتهى الرصيد يتم وضع 0 وإلا يتم حساب الرصيد المتبقي
    FROM
        ordered_invoices oi -- استخدام الفواتير المرتبة
    LEFT JOIN 
        balances b ON oi.customer_id = b.customer_id -- ربط الفواتير مع الأرصدة
)

-- 4. تحديد البيانات النهائية التي سيتم استرجاعها
SELECT 
    id,
    reference,
    total_value,
    general_note,
    datex,
    customer_id,
    customer_name,
    salesman_id,
    salesman_name,
    due_date,
    is_row_note_show,
    is_row_dicount_show,
    referenceconcat,
    qutation_id,
    qutation_reference,
    order_id,
    order_reference,
    CASE
      WHEN remaining_balance = 0 THEN
        'مدفوع بالكامل'  
      WHEN due_date::DATE - datex::DATE > 0 THEN
        CASE
            WHEN remaining_balance <= 0 THEN 
                'مدفوع مقدماً' -- إذا كان الرصيد المتبقي صفر أو أقل
            ELSE 
                CONCAT('يستحق بعد ', due_date::DATE - datex::DATE, ' يوم') -- إذا كان هناك رصيد متبقي
        END
      WHEN due_date::DATE - datex::DATE = 0 THEN 
        'مستحق اليوم' -- إذا كان الفرق صفر
      WHEN due_date::DATE - datex::DATE < 0 THEN 
        CONCAT('مستحق منذ ', ABS(datex::DATE - due_date::DATE), ' يوم') -- إذا كان الفرق أقل من صفر
    END AS payment_status,
    remaining_balance -- الرصيد المتبقي بعد توزيع الرصيد
FROM
    distributed -- استرجاع البيانات الموزعة
ORDER BY
    customer_id, -- ترتيب النتائج حسب معرّف العميل
    datex; -- ثم ترتيب النتائج حسب تاريخ الفاتورة

        `;
        
        // تنفيذ الاستعلامات
        let data = await db.any(quer1, [req.session.company_id, posted_elements.start_date, posted_elements.end_date]);

            res.json(data);
          } catch (error) {
            console.error("Error get_sales_invoice_Data_view:", error);
            res.status(500).send("Error:");
          }
        });
        
        //#endregion sales invoice view
    
          //#region get data for sales order add
  app.post("/get_data_for_sales_invoice_add", async (req, res) => {
    try {
      // //! Permission
      await permissions(req, "sales_invoice_add", "add");
      if (!permissions) {
        return;
      }
  
      //* Start--------------------------------------------------------------
      // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");
  
      let query1 = `
       -- مواقع المخزون
  select
    id as id,
    account_name as account_name
  from
    accounts_header 
  WHERE company_id = $1 
    AND account_type_id = 7
    ;
  `;
  let params1 = [req.session.company_id]
  
  let query2 = `
    select
    id as id,
    account_name as account_name
  from
    accounts_header 
  WHERE company_id = $1 
    AND account_type_id = 4
    AND is_final_account IS true
    and is_salesman IS true
    AND is_inactive IS null
    ;
  `
  let params2 = [req.session.company_id]
  
  let query3 = `
      select 
    th.id,
    th.taxe_package_name as account_name
  from
     settings_tax_header th
  where
    th.company_id = $1
    and th.is_inactive is null
  order by
    th.taxe_package_name asc 
   
  `
  let params3 = [req.session.company_id]
  
  let query4 = `
  select
      tb.id,
      tb.tax_name,
      tb.tax_rate,
      tb.is_tax_reverse,
      tb.tax_account_id,
      ah.account_name,
      tb.settings_tax_header_id
  from
      settings_tax_body tb
  left join accounts_header ah on ah.id = tb.tax_account_id    
  where
      tb.settings_tax_header_id = ANY($1::int[])
  `;
  
  
  let query5 = `
SELECT
  ah.id,
  ah.account_name,
  ah.account_type_id,
  COALESCE(ah.item_unite, 'الكمية') as item_unite,
  ah.item_revenue_account,
  ah_revenue.account_name as revenue_account_name,
  ah.item_expense_account,
  ah_expense.account_name as expense_account_name,
  ah.item_sales_price,
  ah.item_purshas_price
FROM
  accounts_header ah
left join accounts_header ah_revenue on ah_revenue.id = ah.item_revenue_account
left join accounts_header ah_expense on ah_expense.id = ah.item_expense_account
WHERE
  ah.company_id = $1
  AND ah.is_final_account = true
  AND ah.account_type_id IN (5, 8)
  AND ah.is_inactive IS NULL
  `;
  
  let params5 = [req.session.company_id];
  
  
  let query6 = `
  select
    ah.id,
    ah.account_name
  from
    accounts_header ah
  where
    ah.company_id = $1
    AND ah.is_final_account is true
    AND is_inactive is null
    AND (ah.account_type_id = 2 or ah.is_allow_to_buy_and_sell is true);`
  
    let params6 = [req.session.company_id];
  

   let query7 = `
select 
	bih.id,
	    CONCAT(
        SUBSTRING(bih.datex, 1, 4), '-',  -- استخراج السنة من datex
        LPAD(CAST(bih.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
    ) AS account_name
from
	befor_invoice_header bih
where
	bih.transaction_type = 23
	and bih.company_id = $1
	and bih.is_deleted is NULL
	and bih.is_qutation_status IS NOT FALSE;
   ` 
   let params7 = [req.session.company_id]

   let query8 = `
   select 
     bih.id,
         CONCAT(
           SUBSTRING(bih.datex, 1, 4), '-',  -- استخراج السنة من datex
           LPAD(CAST(bih.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
       ) AS account_name
   from
     befor_invoice_header bih
   where
     bih.transaction_type = 24
     and bih.company_id = $1
     and bih.is_deleted is NULL
     and bih.is_invoiced is NULL;
      ` 
      let params8 = [req.session.company_id]

  await db.tx(async (tx) => {
  
    const itemslocationsArray = await tx.any(query1, params1);
    const salesmanArray = await tx.any(query2, params2);
    const taxHeaderArray = await tx.any(query3, params3);
    const settings_tax_header_id_Array = taxHeaderArray.map(row => row.id);  // استخراج IDs من الاستعلام الثالث
    const taxBodyArray = await tx.any(query4, [settings_tax_header_id_Array]);  // تمرير القائمة إلى الاستعلام الرابع
    const itemsDataArray = await tx.any(query5, params5);
    const customersDataArray = await tx.any(query6, params6);
    const salesQutationReferencesArray = await tx.any(query7, params7);
    const salesOederReferencesArray = await tx.any(query8, params8);
  
    const postedData = { itemslocationsArray, salesmanArray, taxHeaderArray, taxBodyArray, itemsDataArray, customersDataArray, salesQutationReferencesArray, salesOederReferencesArray };
    res.json(postedData);
  })
  
  
      await last_activity(req)
    } catch (error) {
      await last_activity(req)
      console.error("Error while get Employees Data", error);
      res.join;
      res
        .status(500)
        .json({ success: false, message_ar: "Error while get Employees Data" });
    }
  });
  //#endregion get data for sales order add

  //#region sales invoice add
  app.post("/api/sales_invoice_add", async (req, res) => {
    try {
  
      //! Permission معلق
      await permissions(req, "sales_invoice_permission", "add");
      if (!permissions) {
        return res.status(403).json({
          success: false,
          message_ar: "ليس لديك الصلاحيات المطلوبة للقيام بهذه العملية.",
        });
      }



  
      const posted_elements = req.body;
      const transaction_type = 3
      let items_array = []
    
  
      //! sql injection check
      let hasBadSymbols = sql_anti_injection([
        ...posted_elements.posted_array.map((obj) => obj.item_typeId + obj.item_id + obj.row_note + obj.row_amount + obj.row_unitPrice + obj.row_discountTypeId + obj.row_discountValue + obj.row_taxHeaderId), // تحويل كل عنصر في dataArray إلى سلسلة نصية ودمجها معاً
        posted_elements.customerId,
        posted_elements.total,
        posted_elements.datex,
        posted_elements.dueDate,
        posted_elements.orderReferenceId,
        posted_elements.qutationReferenceId,
        posted_elements.itemLocationId,
        posted_elements.salesmanId,
        posted_elements.is_RowNote,
        posted_elements.is_RowDiscount,
        posted_elements.general_note,
        posted_elements.location_name,
        // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
      ]);
      if (hasBadSymbols) {
        return res.json({
          success: false,
          message_ar: sql_injection_message_ar,
          message_en: sql_injection_message_en,
        });
      }
  
  
      const InValidDateFormat = isInValidDateFormat([posted_elements.datex, posted_elements.dueDate]);
      if (InValidDateFormat) {
        return res.status(400).json({
          success: false,
          message_ar: InValidDateFormat_message_ar,
        });
      }
  
      //! settings
      const settings = await check_settings_validation({
        check_futureDate: true,
        check_closingDate: true,
        datex: posted_elements.datex,
        type: 'add',
        tableName: false, // if type = 'update' or 'delete' only
        transaction_id: false, // if type = 'update' or 'delete' only
      }, req);
  
      
      if (!settings.valid) {
        return res.json({
          success: false,
          message_ar: settings.message_ar,
        });
      }
  
      turn_EmptyValues_TO_null(posted_elements);
  
      

      //* Start Transaction --------------------------------------------------
  
     const total = +posted_elements.total

     if (!total || isNaN(total)){
      await block_user(req,'Ssia001')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
     }

  
  // //! Security hacking  accounts id
 
     // check qutationReferenceId


     let query04;
     let rows04;
     if (posted_elements.qutationReferenceId){
       query04 = `select id, is_qutation_status from befor_invoice_header where id = $1 and company_id = $2 and transaction_type = 23 and is_deleted IS NULL`
       rows04 = await db.oneOrNone(query04, [posted_elements.qutationReferenceId, req.session.company_id])
      if (!rows04 || !rows04.id){
        await block_user(req,'Ssqi01')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }
      }




      let query05;
      let rows05;
      if (posted_elements.orderReferenceId){
        query05 = `select count(id) as salesOrderReferenceCount from befor_invoice_header where id = $1 and company_id = $2 and transaction_type = 24 and is_deleted IS NULL AND is_invoiced IS NULL`
        rows05 = await db.oneOrNone(query05, [posted_elements.orderReferenceId, req.session.company_id])
       if (rows05.salesOrderReferenceCount === 0){
         await block_user(req,'Ssia02')
         return res.json({
           success: false,
           xx: true,
           message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
         });
       }
       }

  // جلب الحسابات من قاعدة البيانات
  let query02 = `SELECT id, account_type_id, is_salesman FROM accounts_header WHERE company_id = $1 AND is_inactive is null`;
  let rows02 = await db.any(query02, [req.session.company_id]);
  
  // تحويل النتائج إلى مصفوفة للتسهيل في الفحص
  const dbAccounts = rows02.map(row => ({
    id: parseInt(row.id),
    account_type_id: row.account_type_id,
    is_salesman: row.is_salesman
  }));

  //check salesman

  const count_salesman = dbAccounts.some(row => +row.id === +posted_elements.salesmanId && +row.account_type_id === 4 && row.is_salesman === true);
  const count_itemLocation = dbAccounts.some(row => +row.id === +posted_elements.itemLocationId && +row.account_type_id === 7);

    // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
    if (!count_salesman) {
      await block_user(req,'Ssia03')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }

    // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
    if (!count_itemLocation) {
      await block_user(req,'Ssia04')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }


  // المرور على كل كائن في posted_elements.posted_array
  for (const rowData of posted_elements.posted_array) {
    const item_typeId = rowData.item_typeId;
    const item_id = rowData.item_id;

  
    //! make sure from every account_id
    const accountExists = dbAccounts.some(item => 
      +item.id === +item_id && +item.account_type_id === +item_typeId
    );
  
    // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
    if (!accountExists) {
      await block_user(req,'Ssqa5')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }

    items_array.push(+rowData.item_id)
  }
  
  
      // جلب من قاعدة البيانات
      let query03 = `SELECT id FROM settings_tax_header WHERE company_id = $1`;
      let rows03 = await db.any(query03, [req.session.company_id]);
      
      // تحويل النتائج إلى مصفوفة للتسهيل في الفحص
      const dbTaxesHeaderArray = rows03.map(row => ({
        id: parseInt(row.id)
      }));
      

      // المرور على كل كائن في posted_elements.posted_array
      for (const rowData of posted_elements.posted_array) {
        const row_taxHeaderId = rowData.row_taxHeaderId;
        
        if (row_taxHeaderId){
        //! make sure from every account_id
        const taxExists = dbTaxesHeaderArray.some(item =>
          +item.id === +row_taxHeaderId
        );
        

      
        // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
        if (!taxExists) {
          await block_user(req,'Ssia6')
          return res.json({
            success: false,
            xx: true,
            message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
          });
        }
      }
      }
  

      //! فحص الجرد الكميات حسب الموقع
      const query_items = `
       select 
    	tb.item_id,
    	sum(
    		case 
    			when tb.debit > 0 then tb.item_amount else tb.item_amount *-1
    		end
    		
    	) as current_location_amount
    from
    	transaction_body tb
	inner join transaction_header th on th.id = tb.transaction_header_id
	where 
		th.company_id = $1
		and th.is_deleted is null
		and th.is_including_items is TRUE
		and tb.item_id IN (${items_array.join(',')})
		and tb.item_location_id_tb = $2
    and th.datex <= $3
	group by
		tb.item_id;
      `

      const items_amount_location = await db.any(query_items,[req.session.company_id, +posted_elements.itemLocationId, posted_elements.datex])
      
      
      const newId_transaction_header = await newId_fn("transaction_header", 'id');
      const year = getYear(posted_elements.datex)
      // const newReference_transaction_header = await newReference_fn('transaction_header', year, req);
      const newReference_transaction_header = await newReference_transaction_header_fn('transaction_header',3, year, req);
      const newId_general_reference = await newId_fn("transaction_header", 'general_reference');



      // تنفيذ معاملة قاعدة البيانات
      await db.tx(async (tx) => {


        if (rows04 && rows04.is_qutation_status === null) {
          await tx.none(
            `UPDATE befor_invoice_header 
             SET is_qutation_status = true 
             WHERE id = $1 AND company_id = $2`,
            [+posted_elements.qutationReferenceId, req.session.company_id]
          );
        }
        

        
        if(rows05){
          if(rows05.salesorderreferencecount && +rows05.salesorderreferencecount > 0){
            await tx.none(
              `UPDATE befor_invoice_header 
               SET is_invoiced = true 
               WHERE id = $1 AND company_id = $2`,
              [+posted_elements.orderReferenceId, req.session.company_id]
            );
          }
        }


        let query1 = `INSERT INTO transaction_header
                      (id, reference, company_id, transaction_type, total_value, general_note, datex, account_id, salesman_id, due_date, is_row_dicount_show, is_row_note_show, items_location_id, order_id, qutation_id, general_reference, is_including_items)
                      VALUES($1, $2, $3, $4, $5, $6, $7 , $8 , $9 , $10 , $11 , $12, $13, $14, $15, $16, $17);`;
  
        await tx.none(query1, [
          newId_transaction_header,
          newReference_transaction_header,
          req.session.company_id,
          transaction_type,
          total.toFixed(2),
          posted_elements.general_note,
          posted_elements.datex,
          posted_elements.customerId,
          posted_elements.salesmanId,
          posted_elements.dueDate,
          posted_elements.is_RowDiscount ? true : null,
          posted_elements.is_RowNote ? true : null,
          posted_elements.itemLocationId,
          posted_elements.orderReferenceId,
          posted_elements.qutationReferenceId,
          newId_general_reference,
          true
        ]);
  
        let DeafultAccounts = await tx.any('select id, item_revenue_account, item_expense_account from accounts_header where is_final_account = true and company_id = $1 and is_inactive IS NULL',[req.session.company_id])
        let taxBodyArray = await tx.any('select id, tax_rate, is_tax_reverse, tax_account_id, settings_tax_header_id from settings_tax_body')

        let other_posted_array = []
        let Val_beforTax = 0
        let taxValue = 0
        let TotalValue = 0
        let newId_transaction_body = await newId_fn("transaction_body",'id');
        let insertData2 = []
        for (const element of posted_elements.posted_array) {
          const newId = parseInt(newId_transaction_body);
  
          //! make sure if account id != item  then location and amount = null

          if(isNaN(+element.row_amount) || isNaN(+element.row_unitPrice)){
            await block_user(req,'Ssia7')
            throw new Error(
              'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق'
            );
          }

          //! check amount
          
          const current_location_amount_data = items_amount_location.find(item => +item.item_id === +element.item_id);
          const db_amount = +(current_location_amount_data?.current_location_amount || 0);
          const result_amount = db_amount - +element.row_amount;
            
          if (isNaN(result_amount) || result_amount <= 0) {       
            throw new Error(
              `لا يوجد رصيد كافى فى موقع ${posted_elements.location_name} للصنف ${element.item_name}`
            );
          }

          
         const rowDiscountType = +element.row_discountTypeId || 0
         const rowDiscountValue= +element.row_discountValue || 0
         const rowAmount = +element.row_amount || 0
         const rowUnitePrice = +element.row_unitPrice || 0

          const Xrow_discount_value =
          rowDiscountType === 1
              ? +((rowDiscountValue / 100) * (rowAmount * rowUnitePrice))
              : +rowDiscountValue;
              Val_beforTax = +((rowAmount * rowUnitePrice) - Xrow_discount_value).toFixed(2);
              TotalValue += Val_beforTax
              

          const account_row = DeafultAccounts.filter(item => +item.id === element.item_id);
          
          if (!account_row){
            await block_user(req,'Ssia8')
            throw new Error(
              'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق'
            );
          }
          const account_id = +account_row[0].item_revenue_account
          
          
  
          insertData2.push([
            newId,
            newId_transaction_header,
            null,
            +Val_beforTax,
            element.row_note,
            +element.row_amount,
            +element.row_unitPrice,
            +account_id,
            +element.row_discountTypeId === 1 ? true : null,
            element.row_discountValue || null,
            element.row_taxHeaderId || null,
            null,
            null,
            +element.item_typeId === 5? element.item_id : null,
            +element.item_typeId === 5? posted_elements.itemLocationId : null
          ]);

          //! check if has taxHeader
          if (element.row_taxHeaderId){
            const taxesbodyArray = taxBodyArray.filter(item => +item.settings_tax_header_id === +element.row_taxHeaderId)
            if (taxesbodyArray){
              for (const row of taxesbodyArray){
                const taxRate = +row.tax_rate /100
                const taxMultiplier = row.is_tax_reverse ? -1 : 1;
                taxValue = +(Val_beforTax * taxRate * taxMultiplier).toFixed(2);
                TotalValue += taxValue

                const newObject = {
                  taxBodyId: row.id,
                  taxHeaderId: row.settings_tax_header_id,
                  debit: taxValue < 0 ? taxValue*-1 : null,
                  credit: taxValue > 0 ? taxValue : null,
                  account_id: row.tax_account_id,
                  is_tax: true
                }
                other_posted_array.push(newObject)
              }
            }
          }

          newId_transaction_body = parseInt(newId_transaction_body) + 1;
        }

          

        //! add customer row to transaction
        const newObject = {
          taxBodyId: null,
          taxHeaderId: null,
          debit: TotalValue > 0 ? TotalValue : null,
          credit: TotalValue < 0 ? TotalValue*-1 : null,
          account_id: posted_elements.customerId,
          is_tax: null
        }
        other_posted_array.push(newObject)

        //! insert the other part to transaction
        for (const object of other_posted_array){
          const newId = parseInt(newId_transaction_body);


          insertData2.push([
          newId,
          newId_transaction_header,
          +object.debit || null,
          +object.credit || null,
          null,
          null,
          null,
          +object.account_id,
          null,
          null,
          +object.taxHeaderId || null,
          +object.taxBodyId || null,
          object.is_tax,
          null,
          null
          ]);

          newId_transaction_body = parseInt(newId_transaction_body) + 1;
        }
  
        let query2 = `INSERT INTO transaction_body
        (id, transaction_header_id, debit, credit, row_note, item_amount, item_price, account_id,  is_discount_percentage, dicount_value, settings_tax_header_id, settings_tax_body_id, is_tax, item_id, item_location_id_tb)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);`;

        // استخدم tx.batch بدلاً من tx.none
        await tx.batch(insertData2.map(data => tx.none(query2, data)));

        //! history
        await update_items_cogs(items_array,posted_elements.datex, req, tx)
        await history(transaction_type,1,newId_transaction_header,newReference_transaction_header,req,tx);
      });
  
      // await update_items_cogs(req,items_array,posted_elements.datex)
      const new_referenceFormatting = formatFromFiveDigits(newReference_transaction_header);
      await last_activity(req);
      // إذا تم تنفيذ جميع الاستعلامات بنجاح
      return res.json({
        success: true,
        message_ar: `تم إنشاء فاتورة مبيعات بمرجع : ${new_referenceFormatting}-${year}`,
      });
    } catch (error) {
      await last_activity(req);
      console.error("Error adding sales Invoice:", error);
  
      // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
      return res.json({
        success: false,
        message_ar: error.message,
      });
    }
  });
  //#endregionsales invoice add

  //#region get data for invoice_update_page
  app.post("/get_data_for_sales_invoice_update", async (req, res) => {
    try {
      //! Permission معلق
      await permissions(req, "sales_invoice_permission", "update");
      if (!permissions) {
        return;
      }
  
      
      const posted_elements = req.body;
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
      // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");
  
      const transaction_type = 3

      
  
      let query1 = `
       -- مواقع المخزون
  select
    id as id,
    account_name as account_name
  from
    accounts_header 
  WHERE company_id = $1 
    AND account_type_id = 7
    AND is_inactive IS NULL
    ;
  `;
  let params1 = [req.session.company_id]
  
  let query2 = `
    select
    id as id,
    account_name as account_name
  from
    accounts_header 
  WHERE company_id = $1 
    AND account_type_id = 4
    AND is_final_account IS true
    and is_salesman IS true
    AND is_inactive IS null
    ;
  `
  let params2 = [req.session.company_id]
  
  let query3 = `
      select 
    th.id,
    th.taxe_package_name as account_name
  from
     settings_tax_header th
  where
    th.company_id = $1
    and th.is_inactive is null
  order by
    th.taxe_package_name asc 
   
  `
  let params3 = [req.session.company_id]
  
  let query4 = `
  select
      tb.id,
      tb.tax_name,
      tb.tax_rate,
      tb.is_tax_reverse,
      tb.tax_account_id,
      ah.account_name,
      tb.settings_tax_header_id
  from
      settings_tax_body tb
  left join accounts_header ah on ah.id = tb.tax_account_id    
  where
      tb.settings_tax_header_id = ANY($1::int[])
      AND ah.is_inactive IS NULL
  `;
  
  
  let query5 = `
SELECT
  ah.id,
  ah.account_name,
  ah.account_type_id,
  COALESCE(ah.item_unite, 'الكمية') as item_unite,
  ah.item_revenue_account,
  ah_revenue.account_name as revenue_account_name,
  ah.item_expense_account,
  ah_expense.account_name as expense_account_name,
  ah.item_sales_price,
  ah.item_purshas_price
FROM
  accounts_header ah
left join accounts_header ah_revenue on ah_revenue.id = ah.item_revenue_account
left join accounts_header ah_expense on ah_expense.id = ah.item_expense_account
WHERE
  ah.company_id = $1
  AND ah.is_final_account = true
  AND ah.account_type_id IN (5, 8)
  AND ah.is_inactive IS NULL
  `;
  
  let params5 = [req.session.company_id];
  
  
  let query6 = `
  select
    ah.id,
    ah.account_name
  from
    accounts_header ah
  where
    ah.company_id = $1
    AND ah.is_final_account is true
    AND is_inactive is null
    AND (ah.account_type_id = 2 or ah.is_allow_to_buy_and_sell is true);`
  
    let params6 = [req.session.company_id];
  
  
  let query7 = `
  select 
    th.id,
    th.reference,
    th.general_note,
    th.datex,
    th.due_date,
    th.account_id,
    th.salesman_id,
    th.qutation_id,
    th.order_id,
    th.is_delivered,
    th.items_location_id,
    th.is_row_note_show,
    th.is_row_dicount_show,
    CONCAT(
      SUBSTRING(th.datex, 1, 4), '-',  -- استخراج السنة من datex
      LPAD(CAST(th.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
    ) AS referenceconcat,
    CONCAT(
      SUBSTRING(bih_qutation.datex, 1, 4), '-',  -- استخراج السنة من datex
      LPAD(CAST(bih_qutation.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
    ) AS referenceconcat_qutation,
    CONCAT(
      SUBSTRING(bih_order.datex, 1, 4), '-',  -- استخراج السنة من datex
      LPAD(CAST(bih_order.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
    ) AS referenceconcat_order
  from
    transaction_header th
	left join befor_invoice_header bih_qutation on bih_qutation.id = th.qutation_id
	left join befor_invoice_header bih_order on bih_order.id = th.order_id
  where 
  th.id = $1
  and th.company_id = $2
  and th.transaction_type = $3
  AND th.is_deleted IS NULL
  `
  let params7 = [posted_elements.x, req.session.company_id, transaction_type];
  
  let query8 = `
  select
    tb.id,
    tb.item_id,
      ah.account_name,
      ah.item_unite,
      ah.account_type_id as item_type_id,
    tb.item_amount as amount,
    tb.item_price as unite_price,
    COALESCE(tb.row_note, '') as row_note,
    tb.is_discount_percentage,
    tb.dicount_value,
    tb.settings_tax_header_id as tax_header_id,
      sth.taxe_package_name
  from
    transaction_body tb
  LEFT JOIN accounts_header ah on ah.id = tb.item_id
  LEFT JOIN settings_tax_header sth on sth.id = tb.settings_tax_header_id
  left join account_type at on at.id = ah.account_type_id
  where 
    tb.transaction_header_id = $1
    AND tb.item_id is NOT NULL
    ;
  `
  let params8 = [posted_elements.x]
  
  
  let query9 = `
  select 
    bih.id,
        CONCAT(
          SUBSTRING(bih.datex, 1, 4), '-',  -- استخراج السنة من datex
          LPAD(CAST(bih.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
      ) AS account_name
  from
    befor_invoice_header bih
  where
    bih.transaction_type = 23
    and bih.company_id = $1
    and bih.is_deleted is NULL
    and (bih.is_qutation_status IS NOT FALSE or bih.id = $2);
     ` 
     qutationId = isNaN(+posted_elements.qutationId) ? null : posted_elements.qutationId

     let params9 = [req.session.company_id, qutationId]
  
     let query10 = `
     select 
       bih.id,
           CONCAT(
             SUBSTRING(bih.datex, 1, 4), '-',  -- استخراج السنة من datex
             LPAD(CAST(bih.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
         ) AS account_name
     from
       befor_invoice_header bih
     where
       bih.transaction_type = 24
       and bih.company_id = $1
       and bih.is_deleted is NULL
       and (bih.is_invoiced IS NULL or bih.id = $2);
        ` 
        
        
        orderId = isNaN(+posted_elements.orderId) ? null : posted_elements.orderId
        let params10 = [req.session.company_id, orderId]
  
  
  await db.tx(async (tx) => {
  
    const itemslocationsArray = await tx.any(query1, params1);
    const salesmanArray = await tx.any(query2, params2);
    const taxHeaderArray = await tx.any(query3, params3);
    const settings_tax_header_id_Array = taxHeaderArray.map(row => row.id);  // استخراج IDs من الاستعلام الثالث
    const taxBodyArray = await tx.any(query4, [settings_tax_header_id_Array]);  // تمرير القائمة إلى الاستعلام الرابع
    const itemsDataArray = await tx.any(query5, params5);
    const customersDataArray = await tx.any(query6, params6);
    const headerData = await tx.any(query7, params7);
    const bodyData = await tx.any(query8, params8);
    const salesQutationReferencesArray = await tx.any(query9, params9);
    const salesOrderReferencesArray = await tx.any(query10, params10);
  
    const postedData = { itemslocationsArray, salesmanArray, taxHeaderArray, taxBodyArray, itemsDataArray, customersDataArray, headerData, bodyData, salesQutationReferencesArray, salesOrderReferencesArray};
    res.json(postedData);
  })
  
  
      await last_activity(req)
    } catch (error) {
      await last_activity(req)
      console.error("Error while get_data_for_sales_invoice_update  Data", error);
      res.join;
      res
        .status(500)
        .json({ success: false, message_ar: "Error while get_data_for_sales_invoice_update Data" });
    }
  });

  app.post("/get_data_for_qutationToInvoice", async (req, res) => {
    try {
      //! Permission معلق
      await permissions(req, "sales_invoice_permission", "add");
      if (!permissions) {
        return;
      }
  
      
      const posted_elements = req.body;
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
      // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");
  
      const transaction_type = 23

  
  
      let query1 = `
       -- مواقع المخزون
  select
    id as id,
    account_name as account_name
  from
    accounts_header 
  WHERE company_id = $1 
    AND account_type_id = 7
    AND is_inactive IS NULL
    ;
  `;
  let params1 = [req.session.company_id]
  
  let query2 = `
    select
    id as id,
    account_name as account_name
  from
    accounts_header 
  WHERE company_id = $1 
    AND account_type_id = 4
    AND is_final_account IS true
    and is_salesman IS true
    AND is_inactive IS null
    ;
  `
  let params2 = [req.session.company_id]
  
  let query3 = `
      select 
    th.id,
    th.taxe_package_name as account_name
  from
     settings_tax_header th
  where
    th.company_id = $1
    and th.is_inactive is null
  order by
    th.taxe_package_name asc 
   
  `
  let params3 = [req.session.company_id]
  
  let query4 = `
  select
      tb.id,
      tb.tax_name,
      tb.tax_rate,
      tb.is_tax_reverse,
      tb.tax_account_id,
      ah.account_name,
      tb.settings_tax_header_id
  from
      settings_tax_body tb
  left join accounts_header ah on ah.id = tb.tax_account_id    
  where
      tb.settings_tax_header_id = ANY($1::int[])
      AND ah.is_inactive IS NULL
  `;
  
  
  let query5 = `
SELECT
  ah.id,
  ah.account_name,
  ah.account_type_id,
  COALESCE(ah.item_unite, 'الكمية') as item_unite,
  ah.item_revenue_account,
  ah_revenue.account_name as revenue_account_name,
  ah.item_expense_account,
  ah_expense.account_name as expense_account_name,
  ah.item_sales_price,
  ah.item_purshas_price
FROM
  accounts_header ah
left join accounts_header ah_revenue on ah_revenue.id = ah.item_revenue_account
left join accounts_header ah_expense on ah_expense.id = ah.item_expense_account
WHERE
  ah.company_id = $1
  AND ah.is_final_account = true
  AND ah.account_type_id IN (5, 8)
  AND ah.is_inactive IS NULL
  `;
  
  let params5 = [req.session.company_id];
  
  
  let query6 = `
  select
    ah.id,
    ah.account_name
  from
    accounts_header ah
  where
    ah.company_id = $1
    AND ah.is_final_account is true
    AND is_inactive is null
    AND (ah.account_type_id = 2 or ah.is_allow_to_buy_and_sell is true);`
  
    let params6 = [req.session.company_id];
  
  
  let query7 = `
  select 
    bih.id,
    bih.reference,
    bih.general_note,
    bih.datex,
    NULL as due_date,
    bih.account_id,
    bih.salesman_id,
    bih.qutation_id,
    bih.is_delivered,
    bih.items_location_id,
    bih.is_row_note_show,
    bih.is_row_dicount_show,
    CONCAT(
      SUBSTRING(bih.datex, 1, 4), '-',  -- استخراج السنة من datex
      LPAD(CAST(bih.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
    ) AS referenceconcat,
    CONCAT(
      SUBSTRING(qt.datex, 1, 4), '-',  -- استخراج السنة من datex
      LPAD(CAST(qt.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
    ) AS referenceconcat_qutation,
	NULL AS referenceconcat_order
  from
    befor_invoice_header bih
    left join befor_invoice_header qt on qt.id = bih.qutation_id
  where 
  bih.id = $1
  and bih.company_id = $2
  and bih.transaction_type = $3
  AND bih.is_deleted IS NULL
  `
  let params7 = [posted_elements.x, req.session.company_id, transaction_type];
  
  let query8 = `
  select
    bib.id,
    bib.item_id,
      ah.account_name,
      ah.item_unite,
      ah.account_type_id as item_type_id,
    bib.amount as amount,
    bib.unite_price as unite_price,
    COALESCE(bib.row_note, '') as row_note,
    bib.is_discount_percentage,
    bib.dicount_value,
    bib.tax_header_id as tax_header_id,
      sth.taxe_package_name
  from
    befor_invoce_body bib
  LEFT JOIN accounts_header ah on ah.id = bib.item_id
  LEFT JOIN settings_tax_header sth on sth.id = bib.tax_header_id
  left join account_type at on at.id = ah.account_type_id
  where 
    bib.header_id = $1
    ;
  `
  let params8 = [posted_elements.x]
  
  
  let query9 = `
  select 
    bih.id,
        CONCAT(
          SUBSTRING(bih.datex, 1, 4), '-',  -- استخراج السنة من datex
          LPAD(CAST(bih.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
      ) AS account_name
  from
    befor_invoice_header bih
  where
    bih.transaction_type = 23
    and bih.company_id = $1
    and bih.is_deleted is NULL
    and (bih.is_qutation_status IS NOT FALSE or bih.id = $2);
     ` 
     qutation_id = isNaN(+posted_elements.x) ? null : posted_elements.x

     let params9 = [req.session.company_id, qutation_id]
  
     let query10 = `
     select 
       bih.id,
           CONCAT(
             SUBSTRING(bih.datex, 1, 4), '-',  -- استخراج السنة من datex
             LPAD(CAST(bih.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
         ) AS account_name
     from
       befor_invoice_header bih
     where
       bih.transaction_type = 24
       and bih.company_id = $1
       and bih.is_deleted is NULL
       and (bih.is_invoiced IS NULL or bih.id = $2);
        ` 
        
        // order_id = isNaN(+posted_elements.order_id) ? null : posted_elements.order_id
        order_id = null
        
        let params10 = [req.session.company_id, order_id]
  
  
  await db.tx(async (tx) => {
  
    const itemslocationsArray = await tx.any(query1, params1);
    const salesmanArray = await tx.any(query2, params2);
    const taxHeaderArray = await tx.any(query3, params3);
    const settings_tax_header_id_Array = taxHeaderArray.map(row => row.id);  // استخراج IDs من الاستعلام الثالث
    const taxBodyArray = await tx.any(query4, [settings_tax_header_id_Array]);  // تمرير القائمة إلى الاستعلام الرابع
    const itemsDataArray = await tx.any(query5, params5);
    const customersDataArray = await tx.any(query6, params6);
    const headerData = await tx.any(query7, params7);
    const bodyData = await tx.any(query8, params8);
    const salesQutationReferencesArray = await tx.any(query9, params9);
    const salesOrderReferencesArray = await tx.any(query10, params10);
  
    const postedData = { itemslocationsArray, salesmanArray, taxHeaderArray, taxBodyArray, itemsDataArray, customersDataArray, headerData, bodyData, salesQutationReferencesArray, salesOrderReferencesArray};
    res.json(postedData);
  })
  
  
      await last_activity(req)
    } catch (error) {
      await last_activity(req)
      console.error("Error while get_data_for_sales_invoice_update  Data", error);
      res.join;
      res
        .status(500)
        .json({ success: false, message_ar: "Error while get_data_for_sales_invoice_update Data" });
    }
  });


  app.post("/get_data_for_orderToInvoice", async (req, res) => {
    try {
      //! Permission معلق
      await permissions(req, "sales_invoice_permission", "add");
      if (!permissions) {
        return;
      }
  
      
      const posted_elements = req.body;
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
      // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");
  
      const transaction_type = 24

  
  
      let query1 = `
       -- مواقع المخزون
  select
    id as id,
    account_name as account_name
  from
    accounts_header 
  WHERE company_id = $1 
    AND account_type_id = 7
    AND is_inactive IS NULL
    ;
  `;
  let params1 = [req.session.company_id]
  
  let query2 = `
    select
    id as id,
    account_name as account_name
  from
    accounts_header 
  WHERE company_id = $1 
    AND account_type_id = 4
    AND is_final_account IS true
    and is_salesman IS true
    AND is_inactive IS null
    ;
  `
  let params2 = [req.session.company_id]
  
  let query3 = `
      select 
    th.id,
    th.taxe_package_name as account_name
  from
     settings_tax_header th
  where
    th.company_id = $1
    and th.is_inactive is null
  order by
    th.taxe_package_name asc 
   
  `
  let params3 = [req.session.company_id]
  
  let query4 = `
  select
      tb.id,
      tb.tax_name,
      tb.tax_rate,
      tb.is_tax_reverse,
      tb.tax_account_id,
      ah.account_name,
      tb.settings_tax_header_id
  from
      settings_tax_body tb
  left join accounts_header ah on ah.id = tb.tax_account_id    
  where
      tb.settings_tax_header_id = ANY($1::int[])
      AND ah.is_inactive IS NULL
  `;
  
  
  let query5 = `
SELECT
  ah.id,
  ah.account_name,
  ah.account_type_id,
  COALESCE(ah.item_unite, 'الكمية') as item_unite,
  ah.item_revenue_account,
  ah_revenue.account_name as revenue_account_name,
  ah.item_expense_account,
  ah_expense.account_name as expense_account_name,
  ah.item_sales_price,
  ah.item_purshas_price
FROM
  accounts_header ah
left join accounts_header ah_revenue on ah_revenue.id = ah.item_revenue_account
left join accounts_header ah_expense on ah_expense.id = ah.item_expense_account
WHERE
  ah.company_id = $1
  AND ah.is_final_account = true
  AND ah.account_type_id IN (5, 8)
  AND ah.is_inactive IS NULL
  `;
  
  let params5 = [req.session.company_id];
  
  
  let query6 = `
  select
    ah.id,
    ah.account_name
  from
    accounts_header ah
  where
    ah.company_id = $1
    AND ah.is_final_account is true
    AND is_inactive is null
    AND (ah.account_type_id = 2 or ah.is_allow_to_buy_and_sell is true);`
  
    let params6 = [req.session.company_id];
  
  
  let query7 = `
  select 
    bih.id,
    bih.reference,
    bih.general_note,
    bih.datex,
    NULL as due_date,
    bih.account_id,
    bih.salesman_id,
    bih.qutation_id,
    bih.is_delivered,
    bih.items_location_id,
    bih.is_row_note_show,
    bih.is_row_dicount_show,
    CONCAT(
      SUBSTRING(bih.datex, 1, 4), '-',  -- استخراج السنة من datex
      LPAD(CAST(bih.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
    ) AS referenceconcat,
    CONCAT(
      SUBSTRING(qt.datex, 1, 4), '-',  -- استخراج السنة من datex
      LPAD(CAST(qt.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
    ) AS referenceconcat_qutation,
	NULL AS referenceconcat_order
  from
    befor_invoice_header bih
    left join befor_invoice_header qt on qt.id = bih.qutation_id
  where 
  bih.id = $1
  and bih.company_id = $2
  and bih.transaction_type = $3
  AND bih.is_deleted IS NULL
  `

  
  let params7 = [posted_elements.x, req.session.company_id, transaction_type];
  
  let query8 = `
  select
    bib.id,
    bib.item_id,
      ah.account_name,
      ah.item_unite,
      ah.account_type_id as item_type_id,
    bib.amount as amount,
    bib.unite_price as unite_price,
    COALESCE(bib.row_note, '') as row_note,
    bib.is_discount_percentage,
    bib.dicount_value,
    bib.tax_header_id as tax_header_id,
      sth.taxe_package_name
  from
    befor_invoce_body bib
  LEFT JOIN accounts_header ah on ah.id = bib.item_id
  LEFT JOIN settings_tax_header sth on sth.id = bib.tax_header_id
  left join account_type at on at.id = ah.account_type_id
  where 
    bib.header_id = $1
    ;
  `
  let params8 = [posted_elements.x]
  
  
  let query9 = `
  select 
    bih.id,
        CONCAT(
          SUBSTRING(bih.datex, 1, 4), '-',  -- استخراج السنة من datex
          LPAD(CAST(bih.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
      ) AS account_name
  from
    befor_invoice_header bih
  where
    bih.transaction_type = 23
    and bih.company_id = $1
    and bih.is_deleted is NULL
    and (bih.is_qutation_status IS NOT FALSE or bih.id = $2);
     ` 
     qutation_id = isNaN(+posted_elements.qutationId) ? null : posted_elements.qutationId

     let params9 = [req.session.company_id, qutation_id]
  
     let query10 = `
     select 
       bih.id,
           CONCAT(
             SUBSTRING(bih.datex, 1, 4), '-',  -- استخراج السنة من datex
             LPAD(CAST(bih.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
         ) AS account_name
     from
       befor_invoice_header bih
     where
       bih.transaction_type = 24
       and bih.company_id = $1
       and bih.is_deleted is NULL
       and (bih.is_invoiced IS NULL or bih.id = $2);
        ` 
        
        order_id = isNaN(+posted_elements.x) ? null : posted_elements.x
        
        let params10 = [req.session.company_id, order_id]
  
  
  await db.tx(async (tx) => {
  
    const itemslocationsArray = await tx.any(query1, params1);
    const salesmanArray = await tx.any(query2, params2);
    const taxHeaderArray = await tx.any(query3, params3);
    const settings_tax_header_id_Array = taxHeaderArray.map(row => row.id);  // استخراج IDs من الاستعلام الثالث
    const taxBodyArray = await tx.any(query4, [settings_tax_header_id_Array]);  // تمرير القائمة إلى الاستعلام الرابع
    const itemsDataArray = await tx.any(query5, params5);
    const customersDataArray = await tx.any(query6, params6);
    const headerData = await tx.any(query7, params7);
    const bodyData = await tx.any(query8, params8);
    const salesQutationReferencesArray = await tx.any(query9, params9);
    const salesOrderReferencesArray = await tx.any(query10, params10);
  
    const postedData = { itemslocationsArray, salesmanArray, taxHeaderArray, taxBodyArray, itemsDataArray, customersDataArray, headerData, bodyData, salesQutationReferencesArray, salesOrderReferencesArray};
    res.json(postedData);
  })
  
  
      await last_activity(req)
    } catch (error) {
      await last_activity(req)
      console.error("Error while get_data_for_sales_invoice_update  Data", error);
      res.join;
      res
        .status(500)
        .json({ success: false, message_ar: "Error while get_data_for_sales_invoice_update Data" });
    }
  });
  //#endregion end - get data for invoice_update_page

  //#region sales invoice update
  app.post("/api/sales_invoice_update", async (req, res) => {
    try {
  
      // //! Permission معلق
      await permissions(req, "sales_invoice_permission", "update");
      if (!permissions) {
        return res.status(403).json({
          success: false,
          message_ar: "ليس لديك الصلاحيات المطلوبة للقيام بهذه العملية.",
        });
      }



  
      const posted_elements = req.body;
      const transaction_type = 3
      let items_array = []
    
  
      //! sql injection check
      let hasBadSymbols = sql_anti_injection([
        ...posted_elements.posted_array.map((obj) => obj.item_typeId + obj.item_id + obj.row_note + obj.row_amount + obj.row_unitPrice + obj.row_discountTypeId + obj.row_discountValue + obj.row_taxHeaderId), // تحويل كل عنصر في dataArray إلى سلسلة نصية ودمجها معاً
        posted_elements.x,
        posted_elements.customerId,
        posted_elements.total,
        posted_elements.datex,
        posted_elements.dueDate,
        posted_elements.orderReferenceId,
        posted_elements.qutationReferenceId,
        posted_elements.itemLocationId,
        posted_elements.salesmanId,
        posted_elements.is_RowNote,
        posted_elements.is_RowDiscount,
        posted_elements.general_note,
        posted_elements.location_name,
        // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
      ]);
      if (hasBadSymbols) {
        return res.json({
          success: false,
          message_ar: sql_injection_message_ar,
          message_en: sql_injection_message_en,
        });
      }
  
  
      const InValidDateFormat = isInValidDateFormat([posted_elements.datex, posted_elements.dueDate]);
      if (InValidDateFormat) {
        return res.status(400).json({
          success: false,
          message_ar: InValidDateFormat_message_ar,
        });
      }
  
      //! settings
      const settings = await check_settings_validation({
        check_futureDate: true,
        check_closingDate: true,
        datex: posted_elements.datex,
        type: 'update',
        tableName: 'transaction_header', // if type = 'update' or 'delete' only
        transaction_id: posted_elements.x, // if type = 'update' or 'delete' only
      }, req);
  
      
      if (!settings.valid) {
        return res.json({
          success: false,
          message_ar: settings.message_ar,
        });
      }
  
      turn_EmptyValues_TO_null(posted_elements);
  
      

      //* Start Transaction --------------------------------------------------
  
     const total = +posted_elements.total

     if (!total || isNaN(total)){
      await block_user(req,'Ssiu001')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
     }

  
  // //! Security hacking  accounts id
 
     // check qutationReferenceId

     let query_1 = `select reference from transaction_header where id = $1 AND company_id = $2 AND is_deleted IS NULL`
     const result_1 = await db.oneOrNone(query_1,[posted_elements.x, req.session.company_id])
     if (!result_1){
      await block_user(req,'Ssqu02')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
     }


     let query04;
     let rows04;
     if (posted_elements.qutationReferenceId){      
       query04 = `select id, is_qutation_status from befor_invoice_header where id = $1 and company_id = $2 and transaction_type = 23 and is_deleted IS NULL`
       rows04 = await db.oneOrNone(query04, [posted_elements.qutationReferenceId, req.session.company_id])
      if (!rows04 || !rows04.id){
        await block_user(req,'Ssqu03')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }
      }




      let query05;
      let rows05;
      if (posted_elements.orderReferenceId){
        query05 = `select count(id) as salesOrderReferenceCount from befor_invoice_header where id = $1 and company_id = $2 and transaction_type = 24 and is_deleted IS NULL AND is_invoiced IS NULL`
        rows05 = await db.oneOrNone(query05, [posted_elements.orderReferenceId, req.session.company_id])
       if (rows05.salesOrderReferenceCount === 0){
         await block_user(req,'Ssiau04')
         return res.json({
           success: false,
           xx: true,
           message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
         });
       }
       }

  // جلب الحسابات من قاعدة البيانات
  let query02 = `SELECT id, account_type_id, is_salesman FROM accounts_header WHERE company_id = $1 AND is_inactive is null`;
  let rows02 = await db.any(query02, [req.session.company_id]);
  
  // تحويل النتائج إلى مصفوفة للتسهيل في الفحص
  const dbAccounts = rows02.map(row => ({
    id: parseInt(row.id),
    account_type_id: row.account_type_id,
    is_salesman: row.is_salesman
  }));

  //check salesman

  const count_salesman = dbAccounts.some(row => +row.id === +posted_elements.salesmanId && +row.account_type_id === 4 && row.is_salesman === true);
  const count_itemLocation = dbAccounts.some(row => +row.id === +posted_elements.itemLocationId && +row.account_type_id === 7);

    // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
    if (!count_salesman) {
      await block_user(req,'Ssqu05')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }

    // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
    if (!count_itemLocation) {
      await block_user(req,'Ssqu06')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }


  // المرور على كل كائن في posted_elements.posted_array
  for (const rowData of posted_elements.posted_array) {
    const item_typeId = rowData.item_typeId;
    const item_id = rowData.item_id;

  
    //! make sure from every account_id
    const accountExists = dbAccounts.some(item => 
      +item.id === +item_id && +item.account_type_id === +item_typeId
    );
  
    // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
    if (!accountExists) {
      await block_user(req,'Ssqu07')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }

    items_array.push(+rowData.item_id)
  }
  
  
      // جلب من قاعدة البيانات
      let query03 = `SELECT id FROM settings_tax_header WHERE company_id = $1`;
      let rows03 = await db.any(query03, [req.session.company_id]);
      
      // تحويل النتائج إلى مصفوفة للتسهيل في الفحص
      const dbTaxesHeaderArray = rows03.map(row => ({
        id: parseInt(row.id)
      }));
      

      // المرور على كل كائن في posted_elements.posted_array
      for (const rowData of posted_elements.posted_array) {
        const row_taxHeaderId = rowData.row_taxHeaderId;
        
        if (row_taxHeaderId){
        //! make sure from every account_id
        const taxExists = dbTaxesHeaderArray.some(item =>
          +item.id === +row_taxHeaderId
        );
        

      
        // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
        if (!taxExists) {
          await block_user(req,'Ssqu08')
          return res.json({
            success: false,
            xx: true,
            message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
          });
        }
      }
      }
  

      //! فحص الجرد الكميات حسب الموقع
      const query_items = `
       select 
    	tb.item_id,
    	sum(
    		case 
    			when tb.debit > 0 then tb.item_amount else tb.item_amount *-1
    		end
    		
    	) as current_location_amount
    from
    	transaction_body tb
	inner join transaction_header th on th.id = tb.transaction_header_id
	where 
		th.company_id = $1
		and th.is_deleted is null
		and th.is_including_items is TRUE
    and th.id != $2
		and tb.item_id IN (${items_array.join(',')})
		and tb.item_location_id_tb = $3
		and th.datex <= $4
	group by
		tb.item_id;
      `

      const items_amount_location = await db.any(query_items,[req.session.company_id, posted_elements.x, +posted_elements.itemLocationId, posted_elements.datex])
      
      
      const year = getYear(posted_elements.datex)

      // تنفيذ معاملة قاعدة البيانات
      await db.tx(async (tx) => {

        let query01 = `SELECT qutation_id, order_id FROM transaction_header WHERE id = $1 AND company_id = $2 AND is_deleted IS NULL;`;
        let rows01 = await db.oneOrNone(query01, [posted_elements.x, req.session.company_id]);
        
 

              //! qutation_id check and update
              const db_qutation_id = rows01.qutation_id || 0
              const posted_qutation_id = posted_elements.qutationReferenceId || 0
              if (+db_qutation_id !== +posted_qutation_id){
                if (+db_qutation_id !== 0) {
                  const q1 = `
                    SELECT 
                      (SELECT COUNT(id) FROM befor_invoice_header WHERE qutation_id = $2 AND company_id = $3 AND is_deleted IS NULL) AS count_befor_invoice_header,
                      (SELECT COUNT(id) FROM transaction_header WHERE id != $1 AND qutation_id = $2 AND company_id = $3 AND is_deleted IS NULL) AS count_transaction_header
                  `;                  
                  let result1 = await tx.oneOrNone(q1, [+posted_elements.x, +db_qutation_id, req.session.company_id]);                  
                  if (+result1.count_befor_invoice_header === 0 && +result1.count_transaction_header === 0) {
                    const updateQuery1 = `UPDATE befor_invoice_header SET is_qutation_status = NULL WHERE id = $1 AND company_id = $2`;
                    await tx.none(updateQuery1, [+db_qutation_id, req.session.company_id]);
                  }
                }
                if (+posted_qutation_id !== 0) {
                  const updateQuery2 = `UPDATE befor_invoice_header SET is_qutation_status = true WHERE id = $1 AND company_id = $2`;
                  await tx.none(updateQuery2, [+posted_qutation_id, req.session.company_id]);
                }
              }


              //! order_id check and update
              const db_order_id = rows01.order_id || 0
              const posted_order_id = posted_elements.orderReferenceId || 0
              if (+db_order_id !== +posted_order_id){
                if (+db_order_id !== 0) {
                  const q01 = `
                    SELECT 
                      (SELECT COUNT(id) FROM transaction_header WHERE id != $1 AND order_id = $2 AND company_id = $3 AND is_deleted IS NULL) AS count_transaction_header
                  `;                  
                  let result01 = await tx.oneOrNone(q01, [+posted_elements.x, +db_order_id, req.session.company_id]);                  
                  if (+result01.count_transaction_header === 0) {
                    const updateQuery01 = `UPDATE befor_invoice_header SET is_invoiced = NULL WHERE id = $1 AND company_id = $2`;
                    await tx.none(updateQuery01, [+db_order_id, req.session.company_id]);
                  }
                }
                if (+posted_order_id !== 0) {
                  const updateQuery02 = `UPDATE befor_invoice_header SET is_invoiced = true WHERE id = $1 AND company_id = $2`;
                  await tx.none(updateQuery02, [+posted_order_id, req.session.company_id]);
                }
              }              


        let query1 = `update transaction_header
                      set total_value = $1,
                        general_note = $2,
                        datex = $3,
                        account_id = $4,
                        salesman_id = $5,
                        due_date = $6,
                        is_row_dicount_show = $7,
                        is_row_note_show = $8,
                        items_location_id = $9,
                        order_id = $10,
                        qutation_id = $11
                      Where
                        id = $12
                        AND company_id = $13
                      ;`;
  
        await tx.none(query1, [
          total.toFixed(2),
          posted_elements.general_note,
          posted_elements.datex,
          posted_elements.customerId,
          posted_elements.salesmanId,
          posted_elements.dueDate,
          posted_elements.is_RowDiscount ? true : null,
          posted_elements.is_RowNote ? true : null,
          posted_elements.itemLocationId,
          posted_elements.orderReferenceId,
          posted_elements.qutationReferenceId,
          posted_elements.x,
          req.session.company_id
        ]);
  
        const query_delete = `delete from transaction_body where transaction_header_id = $1`
        await tx.none(query_delete,[posted_elements.x])

        let DeafultAccounts = await tx.any('select id, item_revenue_account, item_expense_account from accounts_header where is_final_account = true and company_id = $1 and is_inactive IS NULL',[req.session.company_id])
        let taxBodyArray = await tx.any('select id, tax_rate, is_tax_reverse, tax_account_id, settings_tax_header_id from settings_tax_body')

        let other_posted_array = []
        let Val_beforTax = 0
        let taxValue = 0
        let TotalValue = 0
        let newId_transaction_body = await newId_fn("transaction_body",'id');
        let insertData2 = []
        for (const element of posted_elements.posted_array) {
          const newId = parseInt(newId_transaction_body);
  
          //! make sure if account id != item  then location and amount = null

          if(isNaN(+element.row_amount) || isNaN(+element.row_unitPrice)){
            await block_user(req,'Ssia3')
            throw new Error(
              'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق'
            );
          }

          //! check amount
          
          const current_location_amount_data = items_amount_location.find(item => +item.item_id === +element.item_id);
          const db_amount = +(current_location_amount_data?.current_location_amount || 0);
          const result_amount = db_amount - +element.row_amount;
            
          if (isNaN(result_amount) || result_amount <= 0) {       
            throw new Error(
              `لا يوجد رصيد كافى فى موقع ${posted_elements.location_name} للصنف ${element.item_name}`
            );
          }

          
         const rowDiscountType = +element.row_discountTypeId || 0
         const rowDiscountValue= +element.row_discountValue || 0
         const rowAmount = +element.row_amount || 0
         const rowUnitePrice = +element.row_unitPrice || 0

          const Xrow_discount_value =
          rowDiscountType === 1
              ? +((rowDiscountValue / 100) * (rowAmount * rowUnitePrice))
              : +rowDiscountValue;
              Val_beforTax = +((rowAmount * rowUnitePrice) - Xrow_discount_value).toFixed(2);
              TotalValue += Val_beforTax
              

          const account_row = DeafultAccounts.filter(item => +item.id === element.item_id);
          
          if (!account_row){
            await block_user(req,'Ssia4')
            throw new Error(
              'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق'
            );
          }
          const account_id = +account_row[0].item_revenue_account
          
          
  
          insertData2.push([
            newId,
            posted_elements.x,
            null,
            +Val_beforTax,
            element.row_note,
            +element.row_amount,
            +element.row_unitPrice,
            +account_id,
            +element.row_discountTypeId === 1 ? true : null,
            element.row_discountValue || null,
            element.row_taxHeaderId || null,
            null,
            null,
            +element.item_typeId === 5? element.item_id : null,
            +element.item_typeId === 5? posted_elements.itemLocationId : null
          ]);

          //! check if has taxHeader
          if (element.row_taxHeaderId){
            const taxesbodyArray = taxBodyArray.filter(item => +item.settings_tax_header_id === +element.row_taxHeaderId)
            if (taxesbodyArray){
              for (const row of taxesbodyArray){
                const taxRate = +row.tax_rate /100
                const taxMultiplier = row.is_tax_reverse ? -1 : 1;
                taxValue = +(Val_beforTax * taxRate * taxMultiplier).toFixed(2);
                TotalValue += taxValue

                const newObject = {
                  taxBodyId: row.id,
                  taxHeaderId: row.settings_tax_header_id,
                  debit: taxValue < 0 ? taxValue*-1 : null,
                  credit: taxValue > 0 ? taxValue : null,
                  account_id: row.tax_account_id,
                  is_tax: true
                }
                other_posted_array.push(newObject)
              }
            }
          }

          newId_transaction_body = parseInt(newId_transaction_body) + 1;
        }

          

        //! add customer row to transaction
        const newObject = {
          taxBodyId: null,
          taxHeaderId: null,
          debit: TotalValue > 0 ? TotalValue : null,
          credit: TotalValue < 0 ? TotalValue*-1 : null,
          account_id: posted_elements.customerId,
          is_tax: null
        }
        other_posted_array.push(newObject)

        //! insert the other part to transaction
        for (const object of other_posted_array){
          const newId = parseInt(newId_transaction_body);


          insertData2.push([
          newId,
          posted_elements.x,
          +object.debit || null,
          +object.credit || null,
          null,
          null,
          null,
          +object.account_id,
          null,
          null,
          +object.taxHeaderId || null,
          +object.taxBodyId || null,
          object.is_tax,
          null,
          null
          ]);

          newId_transaction_body = parseInt(newId_transaction_body) + 1;
        }
  
        let query2 = `INSERT INTO transaction_body
        (id, transaction_header_id, debit, credit, row_note, item_amount, item_price, account_id,  is_discount_percentage, dicount_value, settings_tax_header_id, settings_tax_body_id, is_tax, item_id, item_location_id_tb)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);`;

        // استخدم tx.batch بدلاً من tx.none
        await tx.batch(insertData2.map(data => tx.none(query2, data)));


        //! history
        await update_items_cogs(items_array,posted_elements.datex, req, tx)
        await history(transaction_type,2,posted_elements.x,result_1.reference,req,tx);
      });
  
      // await update_items_cogs(req,items_array,posted_elements.datex)
      const new_referenceFormatting = formatFromFiveDigits(result_1.reference);
      await last_activity(req);
      // إذا تم تنفيذ جميع الاستعلامات بنجاح
      return res.json({
        success: true,
        message_ar: `تم تعديل  فاتورة مبيعات بمرجع : ${new_referenceFormatting}-${year}`,
      });
    } catch (error) {
      await last_activity(req);
      console.error("Error sales_invouce_update:", error);
  
      // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
      return res.json({
        success: false,
        message_ar: error.message,
      });
    }
  });
  //#endregion sales invoice update

  //#region delete sales invoice
  app.post("/api/sales_invoice_delete", async (req, res) => {
    try {
  
      //! Permission معلق
      await permissions(req, "sales_invoice_permission", "delete");
      if (!permissions) {
        return res.status(403).json({
          success: false,
          message_ar: "ليس لديك الصلاحيات المطلوبة للقيام بهذه العملية.",
        });
      }



  
      const posted_elements = req.body;
      const transaction_type = 3
    
  
        //! sql injection check
        const hasBadSymbols = sql_anti_injection(...Object.values(posted_elements));
  
        if (hasBadSymbols) {
          return res.json({
            success: false,
            message_ar:
              "Invalid input detected due to prohibited characters. Please review your input and try again.",
          });
        }
  
  
      const InValidDateFormat = isInValidDateFormat([posted_elements.datex]);
      if (InValidDateFormat) {
        return res.status(400).json({
          success: false,
          message_ar: InValidDateFormat_message_ar,
        });
      }
  
      //! settings
      const settings = await check_settings_validation({
        check_futureDate: true,
        check_closingDate: true,
        datex: posted_elements.datex,
        type: 'delete',
        tableName: 'transaction_header', // if type = 'update' or 'delete' only
        transaction_id: posted_elements.x, // if type = 'update' or 'delete' only
      }, req);
  
      
      if (!settings.valid) {
        return res.json({
          success: false,
          message_ar: settings.message_ar,
        });
      }
  
      turn_EmptyValues_TO_null(posted_elements);
  
      

      //* Start Transaction --------------------------------------------------
  

  
  // //! Security hacking  accounts id
 
 
      let query1 = `select reference, datex from transaction_header where id = $1 and company_id = $2 and is_deleted IS NULL `
      let result1 = await db.oneOrNone(query1,[posted_elements.x, req.session.company_id])

      if (!result1){
        await block_user(req,'Ssid001')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }
      
      const year = getYear(result1.datex)


      let query2 = `select item_id from transaction_body where transaction_header_id = $1 AND item_id IS NOT NULL`;
      let result2 = await db.any(query2, [posted_elements.x]);
      
      if (!result2 || result2.length === 0) {
        await block_user(req, 'Ssid002');
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }
      
      // تحويل النتيجة إلى مصفوفة أرقام
      const items_array = result2.map(row => row.item_id);
      
    
      // تنفيذ معاملة قاعدة البيانات
      await db.tx(async (tx) => {


        let query01 = `SELECT qutation_id, order_id FROM transaction_header WHERE id = $1 AND company_id = $2 AND transaction_type = 3 AND is_deleted IS NULL;`;
        let rows01 = await db.oneOrNone(query01, [posted_elements.x, req.session.company_id]);
        
 

              //! qutation_id check and update
              const db_qutation_id = rows01.qutation_id || 0
                if (+db_qutation_id !== 0) {
                  const q1 = `
                    SELECT 
                      (SELECT COUNT(id) FROM befor_invoice_header WHERE qutation_id = $2 AND company_id = $3 AND is_deleted IS NULL) AS count_befor_invoice_header,
                      (SELECT COUNT(id) FROM transaction_header WHERE id != $1 AND qutation_id = $2 AND company_id = $3 AND is_deleted IS NULL) AS count_transaction_header
                  `;                  
                  let result1 = await tx.oneOrNone(q1, [+posted_elements.x, +db_qutation_id, req.session.company_id]);                  
                  if (+result1.count_befor_invoice_header === 0 && +result1.count_transaction_header === 0) {
                    const updateQuery1 = `UPDATE befor_invoice_header SET is_qutation_status = NULL WHERE id = $1 AND company_id = $2`;
                    await tx.none(updateQuery1, [+db_qutation_id, req.session.company_id]);
                  }
                }



              //! order_id check and update
              const db_order_id = rows01.order_id || 0
                if (+db_order_id !== 0) {
                  const q01 = `
                    SELECT 
                      (SELECT COUNT(id) FROM transaction_header WHERE id != $1 AND order_id = $2 AND company_id = $3 AND is_deleted IS NULL) AS count_transaction_header
                  `;                  
                  let result01 = await tx.oneOrNone(q01, [+posted_elements.x, +db_order_id, req.session.company_id]);                  
                  if (+result01.count_transaction_header === 0) {
                    const updateQuery01 = `UPDATE befor_invoice_header SET is_invoiced = NULL WHERE id = $1 AND company_id = $2`;
                    await tx.none(updateQuery01, [+db_order_id, req.session.company_id]);
                  }
                }



        let query1 = `update transaction_header
                      set is_deleted = true
                      Where
                        id = $1
                        AND company_id = $2
                        AND transaction_type = 3
                      ;`;
  
                    
            
            

        const resultQ1 = await tx.result(query1, [
          posted_elements.x,
          req.session.company_id
        ]);

        if (resultQ1.rowCount === 0) {
          await block_user(req,'Ssid1')
          throw new Error(
            'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق'
          );
        }
  
        const query_delete = `delete from transaction_body where transaction_header_id = $1`
        await tx.none(query_delete,[posted_elements.x])


        //! history
        await update_items_cogs(items_array,result1.datex, req, tx)
        await history(transaction_type,3,posted_elements.x,result1.reference,req,tx);
      });

      // await update_items_cogs(req,items_array,result1.datex)
      const new_referenceFormatting = formatFromFiveDigits(result1.reference);
      await last_activity(req);
      // إذا تم تنفيذ جميع الاستعلامات بنجاح
      return res.json({
        success: true,
        message_ar: `تم حذف  فاتورة مبيعات بمرجع : ${new_referenceFormatting}-${year}`,
      });
    } catch (error) {
      await last_activity(req);
      console.error("Error sales_invouce_delete:", error);
  
      // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
      return res.json({
        success: false,
        message_ar: error.message,
      });
    }
  });
  //#endregion
//#endregion sales invoice

//#region purshases

  //#region purshases Qutation

//#region 1: sales_qutation_view
app.post("/get_purshases_qutation_Data_view", async (req, res) => {
  try {
    
    //! Permission
    await permissions(req, "purshases_qutation_permission", "view");
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
      
          const InValidDateFormat = isInValidDateFormat([posted_elements.start_date,posted_elements.end_date])
          if (InValidDateFormat){
            return res.json({
              success: false,
              message_ar: InValidDateFormat_message_ar,
            });
          }
        


      turn_EmptyValues_TO_null(posted_elements);
    //* Start--------------------------------------------------------------


    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");

    let query1 = `
select 
    bih.id,
    bih.reference,
    bih.total_value,
    COALESCE(bih.general_note, '') as general_note, 
    bih.datex,
    bih.account_id as vendor_id,
    ah1.account_name as vendor_name,
    CASE 
        WHEN bih.is_qutation_status IS TRUE THEN 'مقبول'
        WHEN bih.is_qutation_status IS NULL THEN 'معلق'
        ELSE 'مرفوض'
    END AS qutation_status,
    bih.expire_offer_datex,
    bih.is_row_note_show,
    bih.is_row_dicount_show,
    CONCAT(
        SUBSTRING(bih.datex, 1, 4), '-',  -- استخراج السنة من datex
        LPAD(CAST(bih.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
    ) AS referenceconcat
from
    befor_invoice_header bih
left join accounts_header ah1 on ah1.id = bih.account_id
where
    bih.company_id = $1
    AND bih.transaction_type = 25
    AND (bih.datex BETWEEN $2 AND $3) -- التأكد أن القيم بين التواريخ النصية تعمل بشكل صحيح
    AND bih.is_deleted IS NULL
ORDER BY
    bih.datex DESC,
    bih.reference DESC;

`;

    let data = await db.any(query1, [req.session.company_id,posted_elements.start_date, posted_elements.end_date]);

    res.json(data);
  } catch (error) {
    console.error("Error get_purshases_qutation_Data_view:", error);
    res.status(500).send("Error:");
  }
});


app.post("/get_Data_for_purshases_qutation_add_page", async (req, res) => {
  try {
    //! Permission
    await permissions(req, "purshases_qutation_ViewArray", "add"); // معلق
    if (!permissions) {
      return;
    }

    //* Start--------------------------------------------------------------
    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");

    let query1 = `
     -- مواقع المخزون
select
	id as id,
	account_name as account_name
from
	accounts_header 
WHERE company_id = $1 
  AND account_type_id = 7
  ;
`;
let params1 = [req.session.company_id]

/*
let query2 = `
  select
	id as id,
	account_name as account_name
from
	accounts_header 
WHERE company_id = $1 
  AND account_type_id = 4
  AND is_final_account IS true
  and is_salesman IS true
  AND is_inactive IS null
  ;
`
let params2 = [req.session.company_id]
*/

let query3 = `
    select 
	th.id,
	th.taxe_package_name as account_name
from
 	settings_tax_header th
where
	th.company_id = $1
	and th.is_inactive is null
order by
	th.taxe_package_name asc 
 
`
let params3 = [req.session.company_id]

let query4 = `
select
    tb.id,
    tb.tax_name,
    tb.tax_rate,
    tb.is_tax_reverse,
    tb.tax_account_id,
    ah.account_name,
    tb.settings_tax_header_id
from
    settings_tax_body tb
left join accounts_header ah on ah.id = tb.tax_account_id    
where
    tb.settings_tax_header_id = ANY($1::int[])
`;


let query5 = `
SELECT
  ah.id,
  ah.account_name,
  ah.account_type_id,
  COALESCE(ah.item_unite, 'الكمية') as item_unite,
  ah.item_revenue_account,
  ah_revenue.account_name as revenue_account_name,
  ah.item_expense_account,
  ah_expense.account_name as expense_account_name,
  ah.item_sales_price,
  ah.item_purshas_price
FROM
  accounts_header ah
left join accounts_header ah_revenue on ah_revenue.id = ah.item_revenue_account
left join accounts_header ah_expense on ah_expense.id = ah.item_expense_account
WHERE
  ah.company_id = $1
  AND ah.is_final_account = true
  AND ah.account_type_id IN (5, 8)
  AND ah.is_inactive IS NULL
`;

let params5 = [req.session.company_id];


let query6 = `
select
  ah.id,
  ah.account_name
from
  accounts_header ah
where
  ah.company_id = $1
  AND ah.is_final_account is true
  AND is_inactive is null
  AND (ah.account_type_id = 3 or ah.is_allow_to_buy_and_sell is true);`

  let params6 = [req.session.company_id];

await db.tx(async (tx) => {

  const itemslocationsArray = await tx.any(query1, params1);
  // const salesmanArray = await tx.any(query2, params2);
  const taxHeaderArray = await tx.any(query3, params3);
  const settings_tax_header_id_Array = taxHeaderArray.map(row => row.id);  // استخراج IDs من الاستعلام الثالث
  const taxBodyArray = await tx.any(query4, [settings_tax_header_id_Array]);  // تمرير القائمة إلى الاستعلام الرابع
  const itemsDataArray = await tx.any(query5, params5);
  const vendorsDataArray = await tx.any(query6, params6);

  const postedData = { itemslocationsArray, taxHeaderArray, taxBodyArray, itemsDataArray, vendorsDataArray };
  res.json(postedData);
})


    await last_activity(req)
  } catch (error) {
    await last_activity(req)
    console.error("Error while get_Data_for_purshases_qutation_add_page", error);
    res.join;
    res
      .status(500)
      .json({ success: false, message_ar: "Error while get_Data_for_purshases_qutation_add_page" });
  }
});
/*
app.post("/getItemssData1", async (req, res) => {
  try {
    // //! Permission
    // await permissions(req, "effects_permission", "view");
    // if (!permissions) {
    //   return;
    // }

    //* Start--------------------------------------------------------------
    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");

    let query1 = `
    SELECT
      A.id,
      A.account_name,
      A.account_type_id,
      COALESCE(A.item_unite, 'الكمية') as item_unite 
    FROM
      accounts_header A
    WHERE
      A.company_id = $1
      AND is_final_account = true
      AND account_type_id IN (5, 8)
    `;
    
    let data = await db.any(query1, [req.session.company_id]);

    // const data = rows.map((row) => ({
    //   id: row.id,
    //   account_name: row.account_name,
    //   account_type: row.account_type_id
    // }));
    res.json(data);
  } catch (error) {
    console.error("Error while get accounts Data", error);
    res.join;
    res
      .status(500)
      .json({ success: false, message_ar: "Error while get accounts Data" });
  }
});
*/
//#endregion


    //#region purshases qutation add
    app.post("/api/purshases_qutation_add", async (req, res) => {
      try {
    
        //! Permission معلق
        await permissions(req, "purshases_qutation_permission", "add");
        if (!permissions) {
          return res.status(403).json({
            success: false,
            message_ar: "ليس لديك الصلاحيات المطلوبة للقيام بهذه العملية.",
          });
        }



    
        const posted_elements = req.body;
        const transaction_type = 25
      
    
        //! sql injection check
        let hasBadSymbols = sql_anti_injection([
          ...posted_elements.posted_array.map((obj) => obj.item_typeId + obj.item_id + obj.row_note + obj.row_amount + obj.row_unitPrice + obj.row_discountTypeId + obj.row_discountValue + obj.row_taxHeaderId), // تحويل كل عنصر في dataArray إلى سلسلة نصية ودمجها معاً
          posted_elements.vendorId,
          posted_elements.total,
          posted_elements.datex,
          posted_elements.itemLocationId,
          // posted_elements.salesmanId,
          posted_elements.is_RowNote,
          posted_elements.is_RowDiscount,
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
    
    
        const InValidDateFormat = isInValidDateFormat([posted_elements.datex]);
        if (InValidDateFormat) {
          return res.status(400).json({
            success: false,
            message_ar: InValidDateFormat_message_ar,
          });
        }
    
        //! settings
        const settings = await check_settings_validation({
          check_futureDate: true,
          check_closingDate: true,
          datex: posted_elements.datex,
          type: 'add',
          tableName: false, // if type = 'update' or 'delete' only
          transaction_id: false, // if type = 'update' or 'delete' only
        }, req);
    
        
        if (!settings.valid) {
          return res.json({
            success: false,
            message_ar: settings.message_ar,
          });
        }
    
        turn_EmptyValues_TO_null(posted_elements);
    
        

        //* Start Transaction --------------------------------------------------
    
       const total = +posted_elements.total

       if (!total || isNaN(total)){
        await block_user(req,'Ssqa001')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
       }

    
    // //! Security hacking  accounts id


    // جلب الحسابات من قاعدة البيانات
    let query02 = `SELECT id, account_type_id, is_salesman FROM accounts_header WHERE company_id = $1 AND is_inactive is null`;
    let rows02 = await db.any(query02, [req.session.company_id]);
    
    // تحويل النتائج إلى مصفوفة للتسهيل في الفحص
    const dbAccounts = rows02.map(row => ({
      id: parseInt(row.id),
      account_type_id: row.account_type_id,
      // is_salesman: row.is_salesman
    }));

    //check salesman

    // const count_salesman = dbAccounts.some(row => +row.id === +posted_elements.salesmanId && +row.account_type_id === 4 && row.is_salesman === true);
    

      // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
      /*
      if (!count_salesman) {
        await block_user(req,'Spqa01')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }
        */

      const count_itemLocation = dbAccounts.some(row => +row.id === +posted_elements.itemLocationId && +row.account_type_id === 7);
      // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
      if (!count_itemLocation) {
        await block_user(req,'Spqa02')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }


    // المرور على كل كائن في posted_elements.posted_array
    for (const rowData of posted_elements.posted_array) {
      const item_typeId = rowData.item_typeId;
      const item_id = rowData.item_id;

    
      //! make sure from every account_id
      const accountExists = dbAccounts.some(item => 
        +item.id === +item_id && +item.account_type_id === +item_typeId
      );
    
      // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
      if (!accountExists) {
        await block_user(req,'Spqa1')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }
    }
    
    
        // جلب من قاعدة البيانات
        let query03 = `SELECT id FROM settings_tax_header WHERE company_id = $1`;
        let rows03 = await db.any(query03, [req.session.company_id]);
        
        // تحويل النتائج إلى مصفوفة للتسهيل في الفحص
        const dbTaxesHeaderArray = rows03.map(row => ({
          id: parseInt(row.id)
        }));
        
        // المرور على كل كائن في posted_elements.posted_array
        for (const rowData of posted_elements.posted_array) {
          const row_taxHeaderId = rowData.row_taxHeaderId;
          
          if (row_taxHeaderId){
          //! make sure from every account_id
          const taxExists = dbTaxesHeaderArray.some(item =>
            +item.id === +row_taxHeaderId
          );
          

        
          // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
          if (!taxExists) {
            await block_user(req,'Spqa2')
            return res.json({
              success: false,
              xx: true,
              message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
            });
          }
        }
        }
    

        
        const newId_transaction_header = await newId_fn("befor_invoice_header", 'id');
        const year = getYear(posted_elements.datex)
        
        const query001 = `SELECT MAX(reference) AS max FROM befor_invoice_header WHERE company_id = $1 AND transaction_Type = 25 AND datex LIKE '${year}-%'; -- التحقق من السنة في بداية التاريخ `;
      const Params001 = [req.session.company_id];
      const result001 = await db.oneOrNone(query001, Params001);
      let newReference_transaction_header = 1;
      if (result001 && result001.max && result001.max > 0) {
        newReference_transaction_header = +result001.max + 1;
      }
          
        // تنفيذ معاملة قاعدة البيانات
        await db.tx(async (tx) => {
          let query1 = `INSERT INTO befor_invoice_header
                        (id, reference,transaction_type, total_value, general_note, datex, account_id, items_location_id, is_row_note_show, is_row_dicount_show, is_qutation_status, company_id)
                        VALUES($1, $2, $3, $4, $5, $6, $7 , $8 , $9 , $10 , $11 , $12);`;
    
          await tx.none(query1, [
            newId_transaction_header,
            newReference_transaction_header,
            transaction_type,
            total,
            posted_elements.general_note,
            posted_elements.datex,
            posted_elements.vendorId,
            posted_elements.itemLocationId,
            posted_elements.is_RowNote ? true : null,
            posted_elements.is_RowDiscount ? true : null,
            null,
            req.session.company_id
          ]);
    
          let newId_transaction_body = await newId_fn("befor_invoce_body",'id');
          for (const element of posted_elements.posted_array) {
            const newId = parseInt(newId_transaction_body);
    
            //! make sure if account id != item  then location and amount = null

            if(isNaN(+element.row_amount) || isNaN(+element.row_unitPrice)){
              await block_user(req,'Spqa3')
              return res.json({
                success: false,
                xx: true,
                message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
              });
            }

    
            let query2 = `INSERT INTO befor_invoce_body
                          (id, header_id, item_type_id, item_id, amount, unite_price, row_note, is_discount_percentage, dicount_value, tax_header_id)
                          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
    
            await tx.none(query2, [
              newId,
              newId_transaction_header,
              +element.item_typeId,
              element.item_id,
              +element.row_amount,
              +element.row_unitPrice,
              element.row_note,
              +element.row_discountTypeId === 1? true : null,
              +element.row_discountValue,
              element.row_taxHeaderId
            ]);
    
            
            newId_transaction_body = parseInt(newId_transaction_body) + 1;
          }
    
          //! history
          await history(transaction_type,1,newId_transaction_header,newReference_transaction_header,req,tx);
        });
    
        const new_referenceFormatting = formatFromFiveDigits(newReference_transaction_header);
        await last_activity(req);
        // إذا تم تنفيذ جميع الاستعلامات بنجاح
        return res.json({
          success: true,
          message_ar: `تم إنشاء عرض سعر شراء بمرجع : ${new_referenceFormatting}-${year}`,
        });
      } catch (error) {
        await last_activity(req);
        console.error("Error adding purshases Qutation:", error);
    
        // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
        return res.json({
          success: false,
          message_ar: "حدث خطأ أثناء عملية الحفظ وتم إلغاء العملية",
        });
      }
    });

    //#endregion sales qutation end

    //#region get_data_for_purshases_qutation_update
    app.post("/get_data_for_purshases_qutation_update", async (req, res) => {
      try {
        //! Permission معلق
        await permissions(req, "purshases_qutation_permission", "update");
        if (!permissions) {
          return;
        }
    
        const posted_elements = req.body;
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
        // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");
    
        let query1 = `
         -- مواقع المخزون
    select
      id as id,
      account_name as account_name
    from
      accounts_header 
    WHERE company_id = $1 
      AND account_type_id = 7
      ;
    `;
    let params1 = [req.session.company_id]
    
    let query2 = `
      select
      id as id,
      account_name as account_name
    from
      accounts_header 
    WHERE company_id = $1 
      AND account_type_id = 4
      AND is_final_account IS true
      and is_salesman IS true
      AND is_inactive IS null
      ;
    `
    let params2 = [req.session.company_id]
    
    let query3 = `
        select 
      th.id,
      th.taxe_package_name as account_name
    from
       settings_tax_header th
    where
      th.company_id = $1
      and th.is_inactive is null
    order by
      th.taxe_package_name asc 
     
    `
    let params3 = [req.session.company_id]
    
    let query4 = `
    select
        tb.id,
        tb.tax_name,
        tb.tax_rate,
        tb.is_tax_reverse,
        tb.tax_account_id,
        ah.account_name,
        tb.settings_tax_header_id
    from
        settings_tax_body tb
    left join accounts_header ah on ah.id = tb.tax_account_id    
    where
        tb.settings_tax_header_id = ANY($1::int[])
    `;
    
    
    let query5 = `
SELECT
  ah.id,
  ah.account_name,
  ah.account_type_id,
  COALESCE(ah.item_unite, 'الكمية') as item_unite,
  ah.item_revenue_account,
  ah_revenue.account_name as revenue_account_name,
  ah.item_expense_account,
  ah_expense.account_name as expense_account_name,
  ah.item_sales_price,
  ah.item_purshas_price
FROM
  accounts_header ah
left join accounts_header ah_revenue on ah_revenue.id = ah.item_revenue_account
left join accounts_header ah_expense on ah_expense.id = ah.item_expense_account
WHERE
  ah.company_id = $1
  AND ah.is_final_account = true
  AND ah.account_type_id IN (5, 8)
  AND ah.is_inactive IS NULL
    `;
    
    let params5 = [req.session.company_id];
    
    
    let query6 = `
    select
      ah.id,
      ah.account_name
    from
      accounts_header ah
    where
      ah.company_id = $1
      AND ah.is_final_account is true
      AND is_inactive is null
      AND (ah.account_type_id = 3 or ah.is_allow_to_buy_and_sell is true);`
    
      let params6 = [req.session.company_id];
    
    
    let query7 = `
    select 
      bih.id,
      bih.reference,
      bih.general_note,
      bih.datex,
      bih.account_id,
      bih.is_qutation_status,
      bih.expire_offer_datex,
      bih.is_invoiced,
      bih.qutation_id,
      bih.is_delivered,
      bih.items_location_id,
      bih.is_row_note_show,
      bih.is_row_dicount_show,
      CONCAT(
        SUBSTRING(bih.datex, 1, 4), '-',  -- استخراج السنة من datex
        LPAD(CAST(bih.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
      ) AS referenceconcat
    from
      befor_invoice_header bih
    where 
    bih.id = $1
    and bih.company_id = $2
    and bih.transaction_type = 25
    AND bih.is_deleted IS NULL;
    `
    let params7 = [posted_elements.x, req.session.company_id];
    
    let query8 = `
    select
      bib.id,
      bib.item_type_id,
      bib.item_id,
        ah.account_name,
        ah.item_unite,
      bib.amount,
      bib.unite_price,
      COALESCE(bib.row_note, '') as row_note,
      bib.is_discount_percentage,
      bib.dicount_value,
      bib.tax_header_id,
        sth.taxe_package_name
    
    from
      befor_invoce_body bib
    LEFT JOIN accounts_header ah on ah.id = bib.item_id 
    LEFT JOIN settings_tax_header sth on sth.id = bib.tax_header_id 
    where 
      bib.header_id = $1;
    `
    let params8 = [posted_elements.x]
    
    
    
    
    await db.tx(async (tx) => {
    
      const itemslocationsArray = await tx.any(query1, params1);
      const salesmanArray = await tx.any(query2, params2);
      const taxHeaderArray = await tx.any(query3, params3);
      const settings_tax_header_id_Array = taxHeaderArray.map(row => row.id);  // استخراج IDs من الاستعلام الثالث
      const taxBodyArray = await tx.any(query4, [settings_tax_header_id_Array]);  // تمرير القائمة إلى الاستعلام الرابع
      const itemsDataArray = await tx.any(query5, params5);
      const vendorsDataArray = await tx.any(query6, params6);
      const headerDataArray = await tx.oneOrNone(query7, params7);
      const bodyDataArray = await tx.any(query8, params8);
      
      const postedData = { itemslocationsArray, salesmanArray, taxHeaderArray, taxBodyArray, itemsDataArray, vendorsDataArray, headerDataArray, bodyDataArray };
      res.json(postedData);
    })
    
    
        await last_activity(req)
      } catch (error) {
        await last_activity(req)
        console.error("Error while get Employees Data", error);
        res.join;
        res
          .status(500)
          .json({ success: false, message_ar: "Error while get Employees Data" });
      }
    });
    //#endregion end

    //#region purshases_qutation_update
    app.post("/api/purshases_qutation_update", async (req, res) => {
      try {
    
        //! Permission
        await permissions(req, "purshases_qutation_update", "update");
        if (!permissions) {
          return res.status(403).json({
            success: false,
            message_ar: "ليس لديك الصلاحيات المطلوبة للقيام بهذه العملية.",
          });
        }



    
        const posted_elements = req.body;
        const transaction_type = 25
      
        const year = getYear(posted_elements.datex)
        //! sql injection check
        let hasBadSymbols = sql_anti_injection([
          ...posted_elements.posted_array.map((obj) => obj.item_typeId + obj.item_id + obj.row_note + obj.row_amount + obj.row_unitPrice + obj.row_discountTypeId + obj.row_discountValue + obj.row_taxHeaderId), // تحويل كل عنصر في dataArray إلى سلسلة نصية ودمجها معاً
          posted_elements.x,
          posted_elements.vendorId,
          posted_elements.total,
          posted_elements.datex,
          posted_elements.itemLocationId,
          posted_elements.is_RowNote,
          posted_elements.is_RowDiscount,
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
    
    
        const InValidDateFormat = isInValidDateFormat([posted_elements.datex]);
        if (InValidDateFormat) {
          return res.status(400).json({
            success: false,
            message_ar: InValidDateFormat_message_ar,
          });
        }
    
        //! settings
        const settings = await check_settings_validation({
          check_futureDate: true,
          check_closingDate: true,
          datex: posted_elements.datex,
          type: 'update',
          tableName: 'befor_invoice_header', // if type = 'update' or 'delete' only
          transaction_id: posted_elements.x, // if type = 'update' or 'delete' only
        }, req);
    
        
        if (!settings.valid) {
          return res.json({
            success: false,
            message_ar: settings.message_ar,
          });
        }
    
        turn_EmptyValues_TO_null(posted_elements);
    
        

        //* Start Transaction --------------------------------------------------
    
       const total = +posted_elements.total

       if (!total || isNaN(total)){
        await block_user(req,'Ssqa001')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
       }

    
    // //! Security hacking  accounts id

          //! Security hacking check id for company_name and transactio type
          let query01 = `SELECT id, reference FROM befor_invoice_header WHERE id = $1 AND company_id = $2;`;
          let rows01 = await db.oneOrNone(query01, [posted_elements.x, req.session.company_id]);
          
          
    
          if (!rows01 || !rows01.id) {
            return res.json({
              success: false,
              message_ar: 'هذا المرجع غير موجود. برجاء اعادة تحميل الصفحه ',
            });
          }
          const reference = rows01.reference

    // جلب الحسابات من قاعدة البيانات
    let query02 = `SELECT id, account_type_id, is_salesman FROM accounts_header WHERE company_id = $1 AND is_inactive is null`;
    let rows02 = await db.any(query02, [req.session.company_id]);
    
    // تحويل النتائج إلى مصفوفة للتسهيل في الفحص
    const dbAccounts = rows02.map(row => ({
      id: parseInt(row.id),
      account_type_id: row.account_type_id,
      // is_salesman: row.is_salesman
    }));

    //check salesman

    // const count_salesman = dbAccounts.some(row => +row.id === +posted_elements.salesmanId && +row.account_type_id === 4 && row.is_salesman === true);

      // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
      // if (!count_salesman) {
      //   await block_user(req,'Ssqa01')
      //   return res.json({
      //     success: false,
      //     xx: true,
      //     message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      //   });
      // }
      const count_itemLocation = dbAccounts.some(row => +row.id === +posted_elements.itemLocationId && +row.account_type_id === 7);

      // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
      if (!count_itemLocation) {
        await block_user(req,'Spqa02')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }


    // المرور على كل كائن في posted_elements.posted_array
    for (const rowData of posted_elements.posted_array) {
      const item_typeId = rowData.item_typeId;
      const item_id = rowData.item_id;

    
      //! make sure from every account_id
      const accountExists = dbAccounts.some(item => 
        +item.id === +item_id && +item.account_type_id === +item_typeId
      );
    
      // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
      if (!accountExists) {
        await block_user(req,'Spqa1')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }
    }
    
    
        // جلب من قاعدة البيانات
        let query03 = `SELECT id FROM settings_tax_header WHERE company_id = $1`;
        let rows03 = await db.any(query03, [req.session.company_id]);
        
        // تحويل النتائج إلى مصفوفة للتسهيل في الفحص
        const dbTaxesHeaderArray = rows03.map(row => ({
          id: parseInt(row.id)
        }));
        
        // المرور على كل كائن في posted_elements.posted_array
        for (const rowData of posted_elements.posted_array) {
          const row_taxHeaderId = rowData.row_taxHeaderId;
          
          if (row_taxHeaderId){
          //! make sure from every account_id
          const taxExists = dbTaxesHeaderArray.some(item =>
            +item.id === +row_taxHeaderId
          );
          

        
          // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
          if (!taxExists) {
            await block_user(req,'Spqa2')
            return res.json({
              success: false,
              xx: true,
              message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
            });
          }
        }
        }
    




        // تنفيذ معاملة قاعدة البيانات
        await db.tx(async (tx) => {
          let query1 = `update befor_invoice_header
                        set total_value = $1, general_note = $2, datex = $3, account_id = $4, items_location_id = $5, is_row_note_show = $6, is_row_dicount_show = $7
                        where id = $8 and company_id = $9 and transaction_type = $10 AND is_deleted IS NULL;`;
    
          const resultQ1 = await tx.result(query1, [
            total,
            posted_elements.general_note,
            posted_elements.datex,
            posted_elements.vendorId,
            posted_elements.itemLocationId,
            posted_elements.is_RowNote ? true : null,
            posted_elements.is_RowDiscount ? true : null,
            posted_elements.x,
            req.session.company_id,
            transaction_type
          ]);
    
          if (resultQ1.rowCount === 0) {
            throw new Error("No rows were update, rolling back purshases Qutation Update.");
          }
    
          let query0 = `DELETE from befor_invoce_body where header_id = $1`
          await tx.none(query0,[posted_elements.x])

          let newId_transaction_body = await newId_fn("befor_invoce_body",'id');
          for (const element of posted_elements.posted_array) {
            const newId = parseInt(newId_transaction_body);
    
            //! make sure if account id != item  then location and amount = null

            if(isNaN(+element.row_amount) || isNaN(+element.row_unitPrice)){
              await block_user(req,'Ssqa3')
              return res.json({
                success: false,
                xx: true,
                message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
              });
            }

    
            let query2 = `INSERT INTO befor_invoce_body
                          (id, header_id, item_type_id, item_id, amount, unite_price, row_note, is_discount_percentage, dicount_value, tax_header_id)
                          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
    
            await tx.none(query2, [
              newId,
              posted_elements.x,
              +element.item_typeId,
              element.item_id,
              +element.row_amount,
              +element.row_unitPrice,
              element.row_note,
              +element.row_discountTypeId === 1? true : null,
              +element.row_discountValue,
              element.row_taxHeaderId
            ]);
    
            
            newId_transaction_body = parseInt(newId_transaction_body) + 1;
          }
    
          //! history
          await history(transaction_type,2,posted_elements.x,reference,req,tx);
        });
    
        const new_referenceFormatting = formatFromFiveDigits(reference);
        await last_activity(req);
        // إذا تم تنفيذ جميع الاستعلامات بنجاح
        return res.json({
          success: true,
          message_ar: `تم تحديث عرض سعر الشراء بمرجع : ${new_referenceFormatting}-${year}`,
        });
      } catch (error) {
        await last_activity(req);
        console.error("Error updating purshase Qutation:", error);
    
        // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
        return res.json({
          success: false,
          message_ar: "حدث خطأ أثناء عملية الحفظ وتم إلغاء العملية",
        });
      }
    });
    //#endregion sales_qutation_update

    //#region sales qutation reject
    app.post("/api/purshases_qutation_reject", async (req, res) => {
      try {
    
        //! Permission
        await permissions(req, "purshases_qutation_permission", "update");
        if (!permissions) {
          return res.status(403).json({
            success: false,
            message_ar: "ليس لديك الصلاحيات المطلوبة للقيام بهذه العملية.",
          });
        }



    
        const posted_elements = req.body;
        const transaction_type = 25
      
        
        //! sql injection check
        const hasBadSymbols = sql_anti_injection(...Object.values(posted_elements));

        if (hasBadSymbols) {
          return res.json({
            success: false,
            message_ar:
              "Invalid input detected due to prohibited characters. Please review your input and try again.",
          });
        }
    
    
        const InValidDateFormat = isInValidDateFormat([posted_elements.datex]);
        if (InValidDateFormat) {
          return res.status(400).json({
            success: false,
            message_ar: InValidDateFormat_message_ar,
          });
        }
    
        //! settings
        const settings = await check_settings_validation({
          check_futureDate: true,
          check_closingDate: true,
          datex: posted_elements.datex,
          type: 'update',
          tableName: 'befor_invoice_header', // if type = 'update' or 'delete' only
          transaction_id: posted_elements.x, // if type = 'update' or 'delete' only
        }, req);
    
        
        if (!settings.valid) {
          return res.json({
            success: false,
            message_ar: settings.message_ar,
          });
        }
    
        turn_EmptyValues_TO_null(posted_elements);
    
        

        //* Start Transaction --------------------------------------------------
    
        const year = getYear(posted_elements.datex)
    
    // //! Security hacking  accounts id

          //! Security hacking check id for company_name and transactio type

          const query1 = `
          SELECT 
            (SELECT count(id) 
             FROM befor_invoice_header 
             WHERE qutation_id = $1 
               AND company_id = $2 
               AND transaction_type = 26
               AND is_deleted IS NULL) AS befor_invoice_count, 
            (SELECT count(id) 
             FROM transaction_header 
             WHERE qutation_id = $1 
               AND company_id = $2 
               AND is_deleted IS NULL) AS transaction_header_count,
            (SELECT reference 
             FROM befor_invoice_header 
             WHERE id = $1 
               AND company_id = $2
               AND transaction_type = 25
               AND is_deleted IS NULL) AS qutation_reference
        `;
        
        const result1 = await db.oneOrNone(query1, [posted_elements.x, req.session.company_id]);
        
        if (result1.befor_invoice_count > 0 || result1.transaction_header_count > 0) {
          return res.json({
            success: false,
            message_ar: 'لا يمكن رفض عرض السعر الحالي، حيث تم قبوله بالفعل فى احد المعاملات.',
          });
        }
        
        if (!result1 || !result1.qutation_reference){
          await block_user(req,'Spqr01')
          return res.json({
            success: false,
            xx: true,
            message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
          });
        }

          let query01 = `update befor_invoice_header set is_qutation_status = false WHERE id = $1 AND company_id = $2 AND is_deleted IS null;`;
          let rows01 = await db.result(query01, [posted_elements.x, req.session.company_id]);

          if (rows01.rowCount === 0) {
            await block_user(req,'Spqr02')
            return res.json({
              success: false,
              xx: true,
              message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
            });
          }

          

        await last_activity(req);
        const new_referenceFormatting = formatFromFiveDigits(result1.qutation_reference);

        // إذا تم تنفيذ جميع الاستعلامات بنجاح
        return res.json({
          success: true,
          message_ar: `تم تسجيل رفض عرض السعر بمرجع : ${new_referenceFormatting}-${year}`,
        });
      } catch (error) {
        await last_activity(req);
        console.error("Error sales_qutation_reject:", error);
    
        // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
        return res.json({
          success: false,
          message_ar: "حدث خطأ أثناء عملية رفض عرض السعر وتم الغاء العملية",
        });
      }
    });
    //#endregion sales qutation reject


    //#region delete sales Qutation
    app.post("/api/purshases_qutation_delete", async (req, res) => {
      try {
    
        //! Permission معلق
        await permissions(req, "purshases_qutation_permission", "delete");
        if (!permissions) {
          return res.status(403).json({
            success: false,
            message_ar: "ليس لديك الصلاحيات المطلوبة للقيام بهذه العملية.",
          });
        }



    
        const posted_elements = req.body;
        const transaction_type = 25
      
      
        //! sql injection check
        const hasBadSymbols = sql_anti_injection(...Object.values(posted_elements));
  
        if (hasBadSymbols) {
          return res.json({
            success: false,
            message_ar:
              "Invalid input detected due to prohibited characters. Please review your input and try again.",
          });
        }
    

    
        //! settings
        const settings = await check_settings_validation({
          check_futureDate: true,
          check_closingDate: true,
          datex: false,
          type: 'delete',
          tableName: 'befor_invoice_header', // if type = 'update' or 'delete' only
          transaction_id: posted_elements.x, // if type = 'update' or 'delete' only
        }, req);
    
        
        if (!settings.valid) {
          return res.json({
            success: false,
            message_ar: settings.message_ar,
          });
        }
    
        turn_EmptyValues_TO_null(posted_elements);
    
        

        //* Start Transaction --------------------------------------------------

    
    // //! Security hacking  accounts id

          //! Security hacking check id for company_name and transactio type
          let query01 = `
          SELECT reference, datex 
          FROM befor_invoice_header 
          WHERE id = $1 AND company_id = $2;
        `;
        
        let rows01 = await db.oneOrNone(query01, [posted_elements.x, req.session.company_id]);
        
        if (!rows01) {
          await block_user(req, 'Spqd01');
          return res.json({
            success: false,
            xx: true,
            message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
          });
        }
        
        const datex = rows01.datex;
        const reference = rows01.reference;
        
        const year = getYear(datex)

        let queries = `
          SELECT COUNT(qutation_id) AS count_qutation_id
          FROM befor_invoice_header 
          WHERE reference = $1 
            AND SUBSTRING(datex, 1, 4) = SUBSTRING($2, 1, 4);
        `;
        
        let result = await db.oneOrNone(queries, [reference, datex]);
        
        if (result.count_qutation_id > 0) {
          return res.json({
            success: false,
            message_ar: 'عفوا : لا يمكن حذف سعر الشراء لانه مستخدم بالفعل ',
          });
        }
        

        // تنفيذ معاملة قاعدة البيانات
        await db.tx(async (tx) => {
          let query1 = `update befor_invoice_header
                        set is_deleted = true where id = $1 and company_id = $2 and transaction_type = 25;`;
    
          const resultQ1 = await tx.result(query1, [
            posted_elements.x,
            req.session.company_id
          ]);
    
          if (resultQ1.rowCount === 0) {
            throw new Error("No rows were update, rolling back purshases Qutation Update.");
          }
    
          let query0 = `DELETE from befor_invoce_body where header_id = $1`
          await tx.none(query0,[posted_elements.x])

          await history(transaction_type,3,posted_elements.x,reference,req,tx);
        });
    
        const new_referenceFormatting = formatFromFiveDigits(reference);
        await last_activity(req);
        // إذا تم تنفيذ جميع الاستعلامات بنجاح
        return res.json({
          success: true,
          message_ar: `تم حذف عرض سعر الشراء بمرجع : ${new_referenceFormatting}-${year}`,
        });
      } catch (error) {
        await last_activity(req);
        console.error("Error deleting purshasing Qutation:", error);
    
        // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
        return res.json({
          success: false,
          message_ar: "حدث خطأ أثناء عملية الحذف وتم إلغاء العملية",
        });
      }
    });
    //#endregion delete sales qutation

//#endregion sales Qutation

  
//#region purshases order

    //#region purshases order view
    app.post("/get_purshases_order_Data_view", async (req, res) => {
      try {
        
        //! Permission 
        await permissions(req, "purshases_order_permission", "view");
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
          
              const InValidDateFormat = isInValidDateFormat([posted_elements.start_date,posted_elements.end_date])
              if (InValidDateFormat){
                return res.json({
                  success: false,
                  message_ar: InValidDateFormat_message_ar,
                });
              }
            
    
    
          turn_EmptyValues_TO_null(posted_elements);
        //* Start--------------------------------------------------------------
    
    
        // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");
    
        let query1 = `
    select 
        bih.id,
        bih.reference,
        bih.total_value,
        COALESCE(bih.general_note, '') as general_note, 
        bih.datex,
        bih.account_id as vendor_id,
        ah1.account_name as vendor_name,
        CASE 
            WHEN bih.is_invoiced IS TRUE THEN 'مفوتر'
            ELSE 'غير مفوتر'
        END AS is_invoiced,
        bih.expire_offer_datex,
        bih.is_row_note_show,
        bih.is_row_dicount_show,
        CONCAT(
            SUBSTRING(bih.datex, 1, 4), '-',  -- استخراج السنة من datex
            LPAD(CAST(bih.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
        ) AS referenceconcat,
         bih.qutation_id,
        CONCAT(
            SUBSTRING(bih2.datex, 1, 4), '-',  -- استخراج السنة من datex
            LPAD(CAST(bih2.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
        ) AS qutation_reference
         
    from
        befor_invoice_header bih
    left join accounts_header ah1 on ah1.id = bih.account_id
    left join befor_invoice_header bih2 on bih2.id = bih.qutation_id
    where
        bih.company_id = $1
        AND bih.transaction_type = 26
        AND (bih.datex BETWEEN $2 AND $3) -- التأكد أن القيم بين التواريخ النصية تعمل بشكل صحيح
        AND bih.is_deleted IS NULL
    ORDER BY
        bih.datex DESC,
        bih.reference DESC;
    
    `;
    
        let data = await db.any(query1, [req.session.company_id,posted_elements.start_date, posted_elements.end_date]);
    
        res.json(data);
      } catch (error) {
        console.error("Error get_sales_order_Data_view:", error);
        res.status(500).send("Error:");
      }
    });
    
    //#endregion

    //#region add purshases order
    app.post("/api/purshases_order_add", async (req, res) => {
      try {
    
        //! Permission
        await permissions(req, "purshases_order_permission", "add");
        if (!permissions) {
          return res.status(403).json({
            success: false,
            message_ar: "ليس لديك الصلاحيات المطلوبة للقيام بهذه العملية.",
          });
        }



    
        const posted_elements = req.body;
        const transaction_type = 26
      
    
        //! sql injection check
        let hasBadSymbols = sql_anti_injection([
          ...posted_elements.posted_array.map((obj) => obj.item_typeId + obj.item_id + obj.row_note + obj.row_amount + obj.row_unitPrice + obj.row_discountTypeId + obj.row_discountValue + obj.row_taxHeaderId), // تحويل كل عنصر في dataArray إلى سلسلة نصية ودمجها معاً
          posted_elements.vendorId,
          posted_elements.total,
          posted_elements.datex,
          posted_elements.qutationReferenceId,
          posted_elements.itemLocationId,
          // posted_elements.salesmanId,
          posted_elements.is_RowNote,
          posted_elements.is_RowDiscount,
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
    
    
        const InValidDateFormat = isInValidDateFormat([posted_elements.datex]);
        if (InValidDateFormat) {
          return res.status(400).json({
            success: false,
            message_ar: InValidDateFormat_message_ar,
          });
        }
                

        //! settings
        const settings = await check_settings_validation({
          check_futureDate: true,
          check_closingDate: true,
          datex: posted_elements.datex,
          type: 'add',
          tableName: false, // if type = 'update' or 'delete' only
          transaction_id: false, // if type = 'update' or 'delete' only
        }, req);
    
        
        if (!settings.valid) {
          return res.json({
            success: false,
            message_ar: settings.message_ar,
          });
        }
    
        turn_EmptyValues_TO_null(posted_elements);
    
        

        //* Start Transaction --------------------------------------------------
    
       const total = +posted_elements.total

       if (!total || isNaN(total)){
        await block_user(req,'Spqa001')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
       }

    
    // //! Security hacking  accounts id
   
       // check qutationReferenceId
       let query04;
       let rows04;
       if (posted_elements.qutationReferenceId){
         query04 = `select id, is_qutation_status from befor_invoice_header where id = $1 and company_id = $2 and is_deleted IS NULL`
         rows04 = await db.oneOrNone(query04, [posted_elements.qutationReferenceId, req.session.company_id])
        if (!rows04 || !rows04.id){
          await block_user(req,'Spqa01')
          return res.json({
            success: false,
            xx: true,
            message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
          });
        }
        }



    // جلب الحسابات من قاعدة البيانات
    let query02 = `SELECT id, account_type_id, is_salesman FROM accounts_header WHERE company_id = $1 AND is_inactive is null`;
    let rows02 = await db.any(query02, [req.session.company_id]);
    
    // تحويل النتائج إلى مصفوفة للتسهيل في الفحص
    const dbAccounts = rows02.map(row => ({
      id: parseInt(row.id),
      account_type_id: row.account_type_id,
      // is_salesman: row.is_salesman
    }));

    //check salesman

    // const count_salesman = dbAccounts.some(row => +row.id === +posted_elements.salesmanId && +row.account_type_id === 4 && row.is_salesman === true);

      // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
      // if (!count_salesman) {
      //   await block_user(req,'Ssqa01')
      //   return res.json({
      //     success: false,
      //     xx: true,
      //     message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      //   });
      // }

      const count_itemLocation = dbAccounts.some(row => +row.id === +posted_elements.itemLocationId && +row.account_type_id === 7);
      // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
      if (!count_itemLocation) {
        await block_user(req,'Spqa02')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }


    // المرور على كل كائن في posted_elements.posted_array
    for (const rowData of posted_elements.posted_array) {
      const item_typeId = rowData.item_typeId;
      const item_id = rowData.item_id;

    
      //! make sure from every account_id
      const accountExists = dbAccounts.some(item => 
        +item.id === +item_id && +item.account_type_id === +item_typeId
      );
    
      // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
      if (!accountExists) {
        await block_user(req,'Spqa1')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }
    }
    
    
        // جلب من قاعدة البيانات
        let query03 = `SELECT id FROM settings_tax_header WHERE company_id = $1`;
        let rows03 = await db.any(query03, [req.session.company_id]);
        
        // تحويل النتائج إلى مصفوفة للتسهيل في الفحص
        const dbTaxesHeaderArray = rows03.map(row => ({
          id: parseInt(row.id)
        }));
        
        // المرور على كل كائن في posted_elements.posted_array
        for (const rowData of posted_elements.posted_array) {
          const row_taxHeaderId = rowData.row_taxHeaderId;
          
          if (row_taxHeaderId){
          //! make sure from every account_id
          const taxExists = dbTaxesHeaderArray.some(item =>
            +item.id === +row_taxHeaderId
          );
          

        
          // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
          if (!taxExists) {
            await block_user(req,'Spqa2')
            return res.json({
              success: false,
              xx: true,
              message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
            });
          }
        }
        }
    
        const newId_transaction_header = await newId_fn("befor_invoice_header", 'id');
        const year = getYear(posted_elements.datex)
    

        const query001 = `SELECT MAX(reference) AS max FROM befor_invoice_header WHERE company_id = $1 AND transaction_Type = 26 AND datex LIKE '${year}-%'; -- التحقق من السنة في بداية التاريخ `;
      const Params001 = [req.session.company_id];
      const result001 = await db.oneOrNone(query001, Params001);
      let newReference_transaction_header = 1;
      if (result001 && result001.max && result001.max > 0) {
        newReference_transaction_header = +result001.max + 1;
      }
  
        // تنفيذ معاملة قاعدة البيانات
        await db.tx(async (tx) => {


          if (rows04 && rows04.is_qutation_status === null) {
            await tx.none(
              `UPDATE befor_invoice_header 
               SET is_qutation_status = true 
               WHERE id = $1 AND company_id = $2`,
              [posted_elements.qutationReferenceId, req.session.company_id]
            );
          }
          


          let query1 = `INSERT INTO befor_invoice_header
                        (id, reference,transaction_type, total_value, general_note, datex, account_id, items_location_id, is_row_note_show, is_row_dicount_show,qutation_id, company_id)
                        VALUES($1, $2, $3, $4, $5, $6, $7 , $8 , $9 , $10 , $11 , $12);`;
    
          await tx.none(query1, [
            newId_transaction_header,
            newReference_transaction_header,
            transaction_type,
            total,
            posted_elements.general_note,
            posted_elements.datex,
            posted_elements.vendorId,
            posted_elements.itemLocationId,
            posted_elements.is_RowNote ? true : null,
            posted_elements.is_RowDiscount ? true : null,
            posted_elements.qutationReferenceId,
            req.session.company_id
          ]);
    
          let newId_transaction_body = await newId_fn("befor_invoce_body",'id');
          for (const element of posted_elements.posted_array) {
            const newId = parseInt(newId_transaction_body);
    
            //! make sure if account id != item  then location and amount = null

            if(isNaN(+element.row_amount) || isNaN(+element.row_unitPrice)){
              await block_user(req,'Spqa3')
              return res.json({
                success: false,
                xx: true,
                message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
              });
            }

    
            let query2 = `INSERT INTO befor_invoce_body
                          (id, header_id, item_type_id, item_id, amount, unite_price, row_note, is_discount_percentage, dicount_value, tax_header_id)
                          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
    
            await tx.none(query2, [
              newId,
              newId_transaction_header,
              +element.item_typeId,
              element.item_id,
              +element.row_amount,
              +element.row_unitPrice,
              element.row_note,
              +element.row_discountTypeId === 1? true : null,
              +element.row_discountValue,
              element.row_taxHeaderId
            ]);
    
            
            newId_transaction_body = parseInt(newId_transaction_body) + 1;
          }
    
          //! history
          await history(transaction_type,1,newId_transaction_header,newReference_transaction_header,req,tx);
        });
    
        const new_referenceFormatting = formatFromFiveDigits(newReference_transaction_header);
        await last_activity(req);
        // إذا تم تنفيذ جميع الاستعلامات بنجاح
        return res.json({
          success: true,
          message_ar: `تم إنشاء امر شراء  : ${new_referenceFormatting}-${year}`,
        });
      } catch (error) {
        await last_activity(req);
        console.error("Error adding sales Qutation:", error);
    
        // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
        return res.json({
          success: false,
          message_ar: "حدث خطأ أثناء عملية الحفظ وتم إلغاء العملية",
        });
      }
    });
    //#endregionsales order

    //#region get_data_for_purshases_order_add
    app.post("/get_data_for_purshases_order_add", async (req, res) => {
      try {
        //! Permission
        await permissions(req, "purshases_order_permission", "add"); // معلق
        if (!permissions) {
          return;
        }
    
        //* Start--------------------------------------------------------------
        // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");
    
        let query1 = `
         -- مواقع المخزون
    select
      id as id,
      account_name as account_name
    from
      accounts_header 
    WHERE company_id = $1 
      AND account_type_id = 7
      ;
    `;
    let params1 = [req.session.company_id]
    
    // let query2 = `
    //   select
    //   id as id,
    //   account_name as account_name
    // from
    //   accounts_header 
    // WHERE company_id = $1 
    //   AND account_type_id = 4
    //   AND is_final_account IS true
    //   and is_salesman IS true
    //   AND is_inactive IS null
    //   ;
    // `
    // let params2 = [req.session.company_id]
    
    let query3 = `
        select 
      th.id,
      th.taxe_package_name as account_name
    from
       settings_tax_header th
    where
      th.company_id = $1
      and th.is_inactive is null
    order by
      th.taxe_package_name asc 
     
    `
    let params3 = [req.session.company_id]
    
    let query4 = `
    select
        tb.id,
        tb.tax_name,
        tb.tax_rate,
        tb.is_tax_reverse,
        tb.tax_account_id,
        ah.account_name,
        tb.settings_tax_header_id
    from
        settings_tax_body tb
    left join accounts_header ah on ah.id = tb.tax_account_id    
    where
        tb.settings_tax_header_id = ANY($1::int[])
    `;
    
    
    let query5 = `
SELECT
  ah.id,
  ah.account_name,
  ah.account_type_id,
  COALESCE(ah.item_unite, 'الكمية') as item_unite,
  ah.item_revenue_account,
  ah_revenue.account_name as revenue_account_name,
  ah.item_expense_account,
  ah_expense.account_name as expense_account_name,
  ah.item_sales_price,
  ah.item_purshas_price
FROM
  accounts_header ah
left join accounts_header ah_revenue on ah_revenue.id = ah.item_revenue_account
left join accounts_header ah_expense on ah_expense.id = ah.item_expense_account
WHERE
  ah.company_id = $1
  AND ah.is_final_account = true
  AND ah.account_type_id IN (5, 8)
  AND ah.is_inactive IS NULL
    `;
    
    let params5 = [req.session.company_id];
    
    
    let query6 = `
    select
      ah.id,
      ah.account_name
    from
      accounts_header ah
    where
      ah.company_id = $1
      AND ah.is_final_account is true
      AND is_inactive is null
      AND (ah.account_type_id = 3 or ah.is_allow_to_buy_and_sell is true);`
    
      let params6 = [req.session.company_id];
    
  
     let query7 = `
  select 
    bih.id,
        CONCAT(
          SUBSTRING(bih.datex, 1, 4), '-',  -- استخراج السنة من datex
          LPAD(CAST(bih.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
      ) AS account_name
  from
    befor_invoice_header bih
  where
    bih.transaction_type = 25
    and bih.company_id = $1
    and bih.is_deleted is NULL
    and bih.is_qutation_status IS NOT FALSE;
     ` 
     let params7 = [req.session.company_id]
  
    await db.tx(async (tx) => {
    
      const itemslocationsArray = await tx.any(query1, params1);
      // const salesmanArray = await tx.any(query2, params2);
      const taxHeaderArray = await tx.any(query3, params3);
      const settings_tax_header_id_Array = taxHeaderArray.map(row => row.id);  // استخراج IDs من الاستعلام الثالث
      const taxBodyArray = await tx.any(query4, [settings_tax_header_id_Array]);  // تمرير القائمة إلى الاستعلام الرابع
      const itemsDataArray = await tx.any(query5, params5);
      const vendorsDataArray = await tx.any(query6, params6);
      const purshasesQutationReferencesArray = await tx.any(query7, params7);
    
      const postedData = { itemslocationsArray, taxHeaderArray, taxBodyArray, itemsDataArray, vendorsDataArray, purshasesQutationReferencesArray };
      res.json(postedData);
    })
    
    
        await last_activity(req)
      } catch (error) {
        await last_activity(req)
        console.error("Error while get Employees Data", error);
        res.join;
        res
          .status(500)
          .json({ success: false, message_ar: "Error while get Employees Data" });
      }
    });
    //#endregion end get data for purshases order update

    //#region purshases_order_update
        app.post("/api/purshases_order_update", async (req, res) => {
          try {
        
            //! Permission معلق
            await permissions(req, "purshases_order_permission", "update");
            if (!permissions) {
              return res.status(403).json({
                success: false,
                message_ar: "ليس لديك الصلاحيات المطلوبة للقيام بهذه العملية.",
              });
            }
    
    
    
        
            const posted_elements = req.body;
            const transaction_type = 26
          
            const year = getYear(posted_elements.datex)
            //! sql injection check
            let hasBadSymbols = sql_anti_injection([
              ...posted_elements.posted_array.map((obj) => obj.item_typeId + obj.item_id + obj.row_note + obj.row_amount + obj.row_unitPrice + obj.row_discountTypeId + obj.row_discountValue + obj.row_taxHeaderId), // تحويل كل عنصر في dataArray إلى سلسلة نصية ودمجها معاً
              posted_elements.x,
              posted_elements.qutation_id,
              posted_elements.vendorId,
              posted_elements.total,
              posted_elements.datex,
              posted_elements.itemLocationId,
              posted_elements.is_RowNote,
              posted_elements.is_RowDiscount,
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
        
        
            const InValidDateFormat = isInValidDateFormat([posted_elements.datex]);
            if (InValidDateFormat) {
              return res.status(400).json({
                success: false,
                message_ar: InValidDateFormat_message_ar,
              });
            }
        
            //! settings
            const settings = await check_settings_validation({
              check_futureDate: true,
              check_closingDate: true,
              datex: posted_elements.datex,
              type: 'update',
              tableName: 'befor_invoice_header', // if type = 'update' or 'delete' only
              transaction_id: posted_elements.x, // if type = 'update' or 'delete' only
            }, req);
        
            
            if (!settings.valid) {
              return res.json({
                success: false,
                message_ar: settings.message_ar,
              });
            }
        
            turn_EmptyValues_TO_null(posted_elements);
        
            
    
            //* Start Transaction --------------------------------------------------
        
           const total = +posted_elements.total
    
           if (!total || isNaN(total)){
            await block_user(req,'Spqa001')
            return res.json({
              success: false,
              xx: true,
              message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
            });
           }
    
        
        // //! Security hacking  accounts id


              //! Security hacking check id for company_name and transactio type
              if (posted_elements.qutation_id){
                let query05 = `SELECT count(id) as countQutationId FROM befor_invoice_header WHERE id = $1 AND company_id = $2 and transaction_type = 25;`;
                let rows05 = await db.oneOrNone(query05, [posted_elements.qutation_id, req.session.company_id]);
                if (!rows05.countQutationId === 0) {
                  await block_user(req,'Spqa05')
                  return res.json({
                    success: false,
                    xx: true,
                    message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
                  });
                }
              }
         

              let query01 = `SELECT id, reference, qutation_id FROM befor_invoice_header WHERE id = $1 AND company_id = $2 and transaction_type = 26;`;
              let rows01 = await db.oneOrNone(query01, [posted_elements.x, req.session.company_id]);
              
              

              if (!rows01 || !rows01.id) {
                return res.json({
                  success: false,
                  message_ar: 'هذا المرجع غير موجود. برجاء اعادة تحميل الصفحه ',
                });
              }
              const reference = rows01.reference

    
        // جلب الحسابات من قاعدة البيانات
        let query02 = `SELECT id, account_type_id, is_salesman FROM accounts_header WHERE company_id = $1 AND is_inactive is null`;
        let rows02 = await db.any(query02, [req.session.company_id]);
        
        // تحويل النتائج إلى مصفوفة للتسهيل في الفحص
        const dbAccounts = rows02.map(row => ({
          id: parseInt(row.id),
          account_type_id: row.account_type_id,
          is_salesman: row.is_salesman
        }));
    
        //check salesman
    
        // const count_salesman = dbAccounts.some(row => +row.id === +posted_elements.salesmanId && +row.account_type_id === 4 && row.is_salesman === true);
    
          // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
          // if (!count_salesman) {
          //   await block_user(req,'Ssqa01')
          //   return res.json({
          //     success: false,
          //     xx: true,
          //     message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
          //   });
          // }
          const count_itemLocation = dbAccounts.some(row => +row.id === +posted_elements.itemLocationId && +row.account_type_id === 7);

          // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
          if (!count_itemLocation) {
            await block_user(req,'Ssqa02')
            return res.json({
              success: false,
              xx: true,
              message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
            });
          }
    
    
        // المرور على كل كائن في posted_elements.posted_array
        for (const rowData of posted_elements.posted_array) {
          const item_typeId = rowData.item_typeId;
          const item_id = rowData.item_id;
    
        
          //! make sure from every account_id
          const accountExists = dbAccounts.some(item => 
            +item.id === +item_id && +item.account_type_id === +item_typeId
          );
        
          // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
          if (!accountExists) {
            await block_user(req,'Ssqa1')
            return res.json({
              success: false,
              xx: true,
              message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
            });
          }
        }
        
        
            // جلب من قاعدة البيانات
            let query03 = `SELECT id FROM settings_tax_header WHERE company_id = $1`;
            let rows03 = await db.any(query03, [req.session.company_id]);
            
            // تحويل النتائج إلى مصفوفة للتسهيل في الفحص
            const dbTaxesHeaderArray = rows03.map(row => ({
              id: parseInt(row.id)
            }));
            
            // المرور على كل كائن في posted_elements.posted_array
            for (const rowData of posted_elements.posted_array) {
              const row_taxHeaderId = rowData.row_taxHeaderId;
              
              if (row_taxHeaderId){
              //! make sure from every account_id
              const taxExists = dbTaxesHeaderArray.some(item =>
                +item.id === +row_taxHeaderId
              );
              
    
            
              // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
              if (!taxExists) {
                await block_user(req,'Spqa2')
                return res.json({
                  success: false,
                  xx: true,
                  message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
                });
              }
            }
            }
        
    
    
    
            // تنفيذ معاملة قاعدة البيانات
            await db.tx(async (tx) => {

              //! qutation_id check and update
              const db_qutation_id = rows01.qutation_id || 0
              const posted_qutation_id = posted_elements.qutation_id || 0
              if (+db_qutation_id !== +posted_qutation_id){
                if (+db_qutation_id !== 0) {
                  const q1 = `
                    SELECT 
                      (SELECT COUNT(id) FROM befor_invoice_header WHERE id != $1 AND qutation_id = $2 AND company_id = $3 AND is_deleted IS NULL) AS count_befor_invoice_header,
                      (SELECT COUNT(id) FROM transaction_header WHERE qutation_id = $2 AND company_id = $3 AND is_deleted IS NULL) AS count_transaction_header
                  `;                  
                  let result1 = await tx.oneOrNone(q1, [+posted_elements.x, +db_qutation_id, req.session.company_id]);                  
                  if (+result1.count_befor_invoice_header === 0 && +result1.count_transaction_header === 0) {
                    const updateQuery1 = `UPDATE befor_invoice_header SET is_qutation_status = NULL WHERE id = $1 AND company_id = $2`;
                    await tx.none(updateQuery1, [+db_qutation_id, req.session.company_id]);
                  }
                }
                if (+posted_qutation_id !== 0) {
                  const updateQuery2 = `UPDATE befor_invoice_header SET is_qutation_status = true WHERE id = $1 AND company_id = $2`;
                  await tx.none(updateQuery2, [+posted_qutation_id, req.session.company_id]);
                }
              }
              


              let query1 = `update befor_invoice_header
                            set total_value = $1, general_note = $2, datex = $3, account_id = $4, items_location_id = $5, is_row_note_show = $6, is_row_dicount_show = $7, qutation_id = $8
                            where id = $9 and company_id = $10;`;
        
              const resultQ1 = await tx.result(query1, [
                total,
                posted_elements.general_note,
                posted_elements.datex,
                posted_elements.vendorId,
                posted_elements.itemLocationId,
                posted_elements.is_RowNote ? true : null,
                posted_elements.is_RowDiscount ? true : null,
                posted_elements.qutation_id ? +posted_elements.qutation_id : null,
                posted_elements.x,
                req.session.company_id
              ]);
        
              if (resultQ1.rowCount === 0) {
                throw new Error("No rows were update, rolling back purshases order Update.");
              }
        
              let query0 = `DELETE from befor_invoce_body where header_id = $1`
              await tx.none(query0,[posted_elements.x])
    
              let newId_transaction_body = await newId_fn("befor_invoce_body",'id');
              for (const element of posted_elements.posted_array) {
                const newId = parseInt(newId_transaction_body);
        
                //! make sure if account id != item  then location and amount = null
    
                if(isNaN(+element.row_amount) || isNaN(+element.row_unitPrice)){
                  await block_user(req,'Spqa3')
                  return res.json({
                    success: false,
                    xx: true,
                    message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
                  });
                }
    
        
                let query2 = `INSERT INTO befor_invoce_body
                              (id, header_id, item_type_id, item_id, amount, unite_price, row_note, is_discount_percentage, dicount_value, tax_header_id)
                              VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
        
                await tx.none(query2, [
                  newId,
                  posted_elements.x,
                  +element.item_typeId,
                  element.item_id,
                  +element.row_amount,
                  +element.row_unitPrice,
                  element.row_note,
                  +element.row_discountTypeId === 1? true : null,
                  +element.row_discountValue,
                  element.row_taxHeaderId
                ]);
        
                
                newId_transaction_body = parseInt(newId_transaction_body) + 1;
              }
        
              //! history
              await history(transaction_type,2,posted_elements.x,reference,req,tx);
            });
        
            const new_referenceFormatting = formatFromFiveDigits(reference);
            await last_activity(req);
            // إذا تم تنفيذ جميع الاستعلامات بنجاح
            return res.json({
              success: true,
              message_ar: `تم تحديث امر شراء بمرجع : ${new_referenceFormatting}-${year}`,
            });
          } catch (error) {
            await last_activity(req);
            console.error("Error updating purshases Order:", error);
        
            // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
            return res.json({
              success: false,
              message_ar: "حدث خطأ أثناء عملية التحديث وتم إلغاء العملية",
            });
          }
        });
        //#endregion sales_order_update
    
    //#region get_data_for_purshases_order_update
    app.post("/get_data_for_purshases_order_update", async (req, res) => {
      try {
        //! Permission
        await permissions(req, "purshases_order_permission", "update");
        if (!permissions) {
          return;
        }
    
        
        const posted_elements = req.body;
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
        // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");
    
        let transaction_type;
        if(posted_elements.type === 'qutation'){
          transaction_type = 25
        }else if(posted_elements.type === 'order'){
          transaction_type = 26
        }
    
    
        let query1 = `
         -- مواقع المخزون
    select
      id as id,
      account_name as account_name
    from
      accounts_header 
    WHERE company_id = $1 
      AND account_type_id = 7
      ;
    `;
    let params1 = [req.session.company_id]
    
    // let query2 = `
    //   select
    //   id as id,
    //   account_name as account_name
    // from
    //   accounts_header 
    // WHERE company_id = $1 
    //   AND account_type_id = 4
    //   AND is_final_account IS true
    //   and is_salesman IS true
    //   AND is_inactive IS null
    //   ;
    // `
    // let params2 = [req.session.company_id]
    
    let query3 = `
        select 
      th.id,
      th.taxe_package_name as account_name
    from
       settings_tax_header th
    where
      th.company_id = $1
      and th.is_inactive is null
    order by
      th.taxe_package_name asc 
     
    `
    let params3 = [req.session.company_id]
    
    let query4 = `
    select
        tb.id,
        tb.tax_name,
        tb.tax_rate,
        tb.is_tax_reverse,
        tb.tax_account_id,
        ah.account_name,
        tb.settings_tax_header_id
    from
        settings_tax_body tb
    left join accounts_header ah on ah.id = tb.tax_account_id    
    where
        tb.settings_tax_header_id = ANY($1::int[])
    `;
    
    
    let query5 = `
SELECT
  ah.id,
  ah.account_name,
  ah.account_type_id,
  COALESCE(ah.item_unite, 'الكمية') as item_unite,
  ah.item_revenue_account,
  ah_revenue.account_name as revenue_account_name,
  ah.item_expense_account,
  ah_expense.account_name as expense_account_name,
  ah.item_sales_price,
  ah.item_purshas_price
FROM
  accounts_header ah
left join accounts_header ah_revenue on ah_revenue.id = ah.item_revenue_account
left join accounts_header ah_expense on ah_expense.id = ah.item_expense_account
WHERE
  ah.company_id = $1
  AND ah.is_final_account = true
  AND ah.account_type_id IN (5, 8)
  AND ah.is_inactive IS NULL
    `;
    
    let params5 = [req.session.company_id];
    
    
    let query6 = `
    select
      ah.id,
      ah.account_name
    from
      accounts_header ah
    where
      ah.company_id = $1
      AND ah.is_final_account is true
      AND is_inactive is null
      AND (ah.account_type_id = 3 or ah.is_allow_to_buy_and_sell is true);`
    
      let params6 = [req.session.company_id];
    
    
    let query7 = `
    select 
      bih.id,
      bih.reference,
      bih.general_note,
      bih.datex,
      bih.account_id,
      bih.is_qutation_status,
      bih.expire_offer_datex,
      bih.is_invoiced,
      bih.qutation_id,
      bih.is_delivered,
      bih.items_location_id,
      bih.is_row_note_show,
      bih.is_row_dicount_show,
      CONCAT(
        SUBSTRING(bih.datex, 1, 4), '-',  -- استخراج السنة من datex
        LPAD(CAST(bih.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
      ) AS referenceconcat
    from
      befor_invoice_header bih
    where 
    bih.id = $1
    and bih.company_id = $2
    and bih.transaction_type = $3
    AND bih.is_deleted IS NULL;
    `
    let params7 = [posted_elements.x, req.session.company_id, transaction_type];
    
    let query8 = `
    select
      bib.id,
      bib.item_type_id,
      bib.item_id,
        ah.account_name,
        ah.item_unite,
      bib.amount,
      bib.unite_price,
      COALESCE(bib.row_note, '') as row_note,
      bib.is_discount_percentage,
      bib.dicount_value,
      bib.tax_header_id,
        sth.taxe_package_name
    
    from
      befor_invoce_body bib
    LEFT JOIN accounts_header ah on ah.id = bib.item_id 
    LEFT JOIN settings_tax_header sth on sth.id = bib.tax_header_id 
    where 
      bib.header_id = $1;
    `
    let params8 = [posted_elements.x]
    
    
    let query9 = `
    select 
      bih.id,
          CONCAT(
            SUBSTRING(bih.datex, 1, 4), '-',  -- استخراج السنة من datex
            LPAD(CAST(bih.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
        ) AS account_name
    from
      befor_invoice_header bih
    where
      bih.transaction_type = 25
      and bih.company_id = $1
      and bih.is_deleted is NULL
      and (bih.is_qutation_status IS NOT FALSE or bih.id = $2);
       ` 
       qutation_id = isNaN(+posted_elements.qutation_id)? null : posted_elements.qutation_id 
       let params9 = [req.session.company_id, qutation_id]
    
    
    
    await db.tx(async (tx) => {
    
      const itemslocationsArray = await tx.any(query1, params1);
      // const salesmanArray = await tx.any(query2, params2);
      const taxHeaderArray = await tx.any(query3, params3);
      const settings_tax_header_id_Array = taxHeaderArray.map(row => row.id);  // استخراج IDs من الاستعلام الثالث
      const taxBodyArray = await tx.any(query4, [settings_tax_header_id_Array]);  // تمرير القائمة إلى الاستعلام الرابع
      const itemsDataArray = await tx.any(query5, params5);
      const vendorsDataArray = await tx.any(query6, params6);
      const headerDataArray = await tx.oneOrNone(query7, params7);
      const bodyDataArray = await tx.any(query8, params8);
      const purshasesQutationReferencesArray = await tx.any(query9, params9);
    
      const postedData = { itemslocationsArray, taxHeaderArray, taxBodyArray, itemsDataArray, vendorsDataArray, headerDataArray, bodyDataArray, purshasesQutationReferencesArray};
      res.json(postedData);
    })
    
    
        await last_activity(req)
      } catch (error) {
        await last_activity(req)
        console.error("Error while get_data_for_purshases_order_update", error);
        res.join;
        res
          .status(500)
          .json({ success: false, message_ar: "Error while get_data_for_purshases_order_update" });
      }
    });
    //#endregion end- Get_data_for_purshases_order_update

    //#region delete sales order
    app.post("/api/purshases_order_delete", async (req, res) => {
      try {
    
        //! Permission معلق
        await permissions(req, "purshases_order_permission", "delete");
        if (!permissions) {
          return res.status(403).json({
            success: false,
            message_ar: "ليس لديك الصلاحيات المطلوبة للقيام بهذه العملية.",
          });
        }



    
        const posted_elements = req.body;
        const transaction_type = 26
      
      
        //! sql injection check
        const hasBadSymbols = sql_anti_injection(...Object.values(posted_elements));
  
        if (hasBadSymbols) {
          return res.json({
            success: false,
            message_ar:
              "Invalid input detected due to prohibited characters. Please review your input and try again.",
          });
        }
    
        const InValidDateFormat = isInValidDateFormat([posted_elements.datex]);
        if (InValidDateFormat) {
          return res.status(400).json({
            success: false,
            message_ar: InValidDateFormat_message_ar,
          });
        }
    

    
        //! settings
        const settings = await check_settings_validation({
          check_futureDate: true,
          check_closingDate: true,
          datex: false,
          type: 'delete',
          tableName: 'befor_invoice_header', // if type = 'update' or 'delete' only
          transaction_id: posted_elements.x, // if type = 'update' or 'delete' only
        }, req);
    
        
        if (!settings.valid) {
          return res.json({
            success: false,
            message_ar: settings.message_ar,
          });
        }
    
        turn_EmptyValues_TO_null(posted_elements);
    
        

        //* Start Transaction --------------------------------------------------

    
    // //! Security hacking  accounts id

          //! Security hacking check id for company_name and transactio type
          let query01 = `
          SELECT reference, datex, qutation_id
          FROM befor_invoice_header 
          WHERE id = $1 AND company_id = $2 AND transaction_type = $3 AND is_deleted IS NULL;
        `;
        
        let rows01 = await db.oneOrNone(query01, [posted_elements.x, req.session.company_id, transaction_type]);
        if (!rows01) {
          await block_user(req, 'Spqd01');
          return res.json({
            success: false,
            xx: true,
            message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
          });
        }
        
        const datex = rows01.datex;
        const reference = rows01.reference;
        const qutation_id = rows01.qutation_id;
        
        const year = getYear(datex)

        let queries = `
          SELECT COUNT(order_id) AS count_order_id
          FROM transaction_header 
          WHERE order_id = $1 
                AND company_id = $2
                AND is_deleted IS NULL ;
        `;
        
        let result = await db.oneOrNone(queries, [posted_elements.x, req.session.company_id]);
        
        if (result.count_order_id > 0) {
          return res.json({
            success: false,
            message_ar: 'عفوا : لا يمكن حذف عرض سعر الشراء لانه مستخدم بالفعل ',
          });
        }
        
        

        // تنفيذ معاملة قاعدة البيانات
        await db.tx(async (tx) => {
          let result1;
          if (qutation_id){
            const q1 = `select count(id) as id_count from befor_invoice_header where id != $1 AND qutation_id = $2 and Company_id = $3 AND is_deleted IS NULL`            
            result1 = await tx.oneOrNone(q1,[+posted_elements.x, +qutation_id, req.session.company_id])            
            if (+result1.id_count === 0){    
              const q2 = `update befor_invoice_header set is_qutation_status = null where id = $1 AND company_id = $2`
              const p1 = await tx.none(q2,[+qutation_id, req.session.company_id])
            }
          }


          let query1 = `update befor_invoice_header
                        set is_deleted = true where id = $1 and company_id = $2 AND transaction_type = 26;`;
    
          const resultQ1 = await tx.result(query1, [
            posted_elements.x,
            req.session.company_id
          ]);
    
          if (resultQ1.rowCount === 0) {
            throw new Error("No rows were update, rolling back purshases Qutation Update.");
          }
    
          let query0 = `DELETE from befor_invoce_body where header_id = $1`
          await tx.none(query0,[posted_elements.x])

          await history(transaction_type,3,posted_elements.x,reference,req,tx);
        });
    
        const new_referenceFormatting = formatFromFiveDigits(reference);
        await last_activity(req);
        // إذا تم تنفيذ جميع الاستعلامات بنجاح
        return res.json({
          success: true,
          message_ar: `تم حذف امر الشراء بمرجع : ${new_referenceFormatting}-${year}`,
        });
      } catch (error) {
        await last_activity(req);
        console.error("Error deleting purshases Order:", error);
    
        // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
        return res.json({
          success: false,
          message_ar: "حدث خطأ أثناء عملية الحذف وتم إلغاء العملية",
        });
      }
    });
    //#endregion delete sales order

//#endregion purshases order


//#endregion end-purshases

//#region purshases invoice

        //#region purshases invoice view

        /*
        app.post("/get_purshases_invoice_Data_view", async (req, res) => {
          try {
            //! Permission
            await permissions(req, "purshases_invoice_permission", "view");
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
              
                  const InValidDateFormat = isInValidDateFormat([posted_elements.start_date,posted_elements.end_date])
                  if (InValidDateFormat){
                    return res.json({
                      success: false,
                      message_ar: InValidDateFormat_message_ar,
                    });
                  }
                
        
        
              turn_EmptyValues_TO_null(posted_elements);
            //* Start--------------------------------------------------------------
        
        
            // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");
        
            let query1 = `
        select 
            th.id,
            th.reference,
            th.total_value,
            COALESCE(th.general_note, '') as general_note, 
            th.datex,
            th.account_id as vendor_id,
            ah1.account_name as vendor_name,
            '' AS is_invoiced,
            th.due_date,
            th.is_row_note_show,
            th.is_row_dicount_show,
            CONCAT(
                SUBSTRING(th.datex, 1, 4), '-',  -- استخراج السنة من datex
                LPAD(CAST(th.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
            ) AS referenceconcat,
             th.qutation_id,
            CONCAT(
                SUBSTRING(bih.datex, 1, 4), '-',  -- استخراج السنة من datex
                LPAD(CAST(bih.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
            ) AS qutation_reference,
             th.order_id,
            CONCAT(
                SUBSTRING(bih2.datex, 1, 4), '-',  -- استخراج السنة من datex
                LPAD(CAST(bih2.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
            ) AS order_reference

             
        from
          	transaction_header th
        left join accounts_header ah1 on ah1.id = th.account_id
        left join befor_invoice_header bih on bih.id = th.qutation_id
        left join befor_invoice_header bih2 on bih2.id = th.order_id
        where
            th.company_id = $1
            AND th.transaction_type = 6
            AND (th.datex BETWEEN $2 AND $3) -- التأكد أن القيم بين التواريخ النصية تعمل بشكل صحيح
            AND th.is_deleted IS NULL
        ORDER BY
            th.datex DESC,
            th.reference DESC;
        
        `;
        
            let data = await db.any(query1, [req.session.company_id,posted_elements.start_date, posted_elements.end_date]);
        
            res.json(data);
          } catch (error) {
            console.error("Error get_purshases_invoice_Data_view:", error);
            res.status(500).send("Error:");
          }
        });
        */


        app.post("/get_purshases_invoice_Data_view", async (req, res) => {
          try {
            
            //! Permission  
            await permissions(req, "sales_purshases_permission", "view");
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
              
                  const InValidDateFormat = isInValidDateFormat([posted_elements.start_date,posted_elements.end_date])
                  if (InValidDateFormat){
                    return res.json({
                      success: false,
                      message_ar: InValidDateFormat_message_ar,
                    });
                  }
                
        
        
              turn_EmptyValues_TO_null(posted_elements);
            //* Start--------------------------------------------------------------
        
      /*
      -- استعلام فواتير العملاء المفتوحه
      WITH balances AS (
    SELECT 
        A.id AS customer_id,
        COALESCE(SUM(T.debit), 0) - COALESCE(SUM(T.credit), 0) AS balance
    FROM 
        accounts_header A
    LEFT JOIN 
        transaction_body T ON A.id = T.account_id
    WHERE
        A.company_id = $1
        AND A.account_type_id = 2
    GROUP BY
        A.id
),
ordered_invoices AS (
    SELECT 
        th.id AS invoice_id,
        th.account_id AS customer_id,
        th.total_value AS invoice_value,
        th.datex AS invoice_date
    FROM
        transaction_header th
    WHERE
        th.company_id = $1
        AND th.transaction_type = 3
        AND (th.datex BETWEEN $2 AND $3)
        AND th.is_deleted IS NULL
    ORDER BY
        th.account_id ASC,
        th.datex ASC,
        th.id ASC
),
distributed AS (
    SELECT
        oi.invoice_id,
        oi.customer_id,
        oi.invoice_value,
        oi.invoice_date,
        b.balance,
        GREATEST(
            0,
            LEAST(oi.invoice_value, 
                  b.balance - COALESCE(SUM(oi.invoice_value) OVER (PARTITION BY oi.customer_id ORDER BY oi.invoice_date ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING), 0)
            )
        ) AS remaining_balance
    FROM
        ordered_invoices oi
    LEFT JOIN 
        balances b ON oi.customer_id = b.customer_id
)
SELECT 
    invoice_id,
    customer_id,
    invoice_value,
    invoice_date,
    remaining_balance
FROM
    distributed
WHERE
    remaining_balance > 0
ORDER BY
    customer_id,
    invoice_date;
   
      */
         
      
        let quer1 = `
        -- 1. حساب الأرصدة المتبقية للموردين
WITH balances AS (
    SELECT 
        A.id AS vendor_id, -- تعريف العميل باستخدام معرّف المورد
        COALESCE(SUM(T.credit), 0) - COALESCE(SUM(T.debit), 0) AS balance -- حساب الرصيد: (المجموع الدائن - المجموع المدين)
    FROM 
        accounts_header A -- الجدول الذي يحتوي على بيانات الحسابات
    LEFT JOIN 
        transaction_body T ON A.id = T.account_id -- ربط الحسابات بالمعاملات عبر معرّف الحساب
    WHERE
        A.company_id = $1 -- تحديد الشركة بناءً على معرّف الشركة
        AND A.account_type_id = 3 -- تحديد نوع الحساب (حسابات الموردين)
    GROUP BY
        A.id -- تجميع البيانات حسب معرّف العميل
),

-- 2. ترتيب الفواتير حسب العميل والتاريخ
---- هنضيف الاعمده النهائية 3 مرات بدأ من الجزىء التالى وحتى الاخير
ordered_invoices AS (
    SELECT 
        th.id as id,
        th.reference as reference,
        th.total_value AS total_value,        
        COALESCE(th.general_note, '') as general_note,
        th.datex AS datex,
        th.account_id AS vendor_id,
        ah1.account_name as vendor_name,
        th.salesman_id as salesman_id,
        ah2.account_name as salesman_name,
        th.due_date,
        th.is_row_note_show,
        th.is_row_dicount_show,
        CONCAT(
          SUBSTRING(th.datex, 1, 4), '-',  -- استخراج السنة من datex
            LPAD(CAST(th.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
        ) AS referenceconcat,
        th.qutation_id,
        CONCAT(
          SUBSTRING(bih.datex, 1, 4), '-',  -- استخراج السنة من datex
            LPAD(CAST(bih.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
        ) AS qutation_reference,
        th.order_id,
        CONCAT(
          SUBSTRING(bih2.datex, 1, 4), '-',  -- استخراج السنة من datex
            LPAD(CAST(bih2.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
        ) AS order_reference
    FROM
        transaction_header th
    left join accounts_header ah1 on ah1.id = th.account_id
    left join accounts_header ah2 on ah2.id = th.salesman_id
    left join befor_invoice_header bih on bih.id = th.qutation_id
    left join befor_invoice_header bih2 on bih2.id = th.order_id
    WHERE
        th.company_id = $1 -- تحديد الشركة بناءً على معرّف الشركة
        AND th.transaction_type = 6 -- تحديد نوع المعاملة (فاتورة شراء)
        AND (th.datex BETWEEN $2 AND $3) -- تحديد الفترة الزمنية بين تاريخين
        AND th.is_deleted IS NULL -- تجاهل الفواتير المحذوفة
    ORDER BY
        th.account_id ASC, -- ترتيب الفواتير حسب معرّف العميل
        th.datex ASC, -- ثم حسب تاريخ الفاتورة
        th.id ASC -- وأخيرًا حسب معرّف الفاتورة
),

-- 3. توزيع الرصيد على الفواتير
distributed AS (
    SELECT
        oi.id,
        oi.reference,
        oi.total_value,
        oi.general_note,
        oi.datex,
        oi.vendor_id,
        oi.vendor_name,
        oi.salesman_id,
        oi.salesman_name,
        oi.due_date,
        oi.is_row_note_show,
        oi.is_row_dicount_show,
        oi.referenceconcat,
        oi.qutation_id,
        oi.qutation_reference,
        oi.order_id,
        oi.order_reference,
        b.balance, -- الرصيد المتبقي للمورد
        -- حساب الرصيد المتبقي بعد توزيع الأموال على الفاتورة
        CASE
            WHEN b.balance <= 0 THEN 0 -- إذا انتهى الرصيد، يتم تخصيص 0
            ELSE
                -- إذا كان هناك رصيد متبقي، يتم توزيعه على الفاتورة
                GREATEST(
                    0, -- الحد الأدنى للرصيد المتبقي
                    LEAST(
                        oi.total_value, -- قيمة الفاتورة
                        b.balance - COALESCE(SUM(oi.total_value) OVER (PARTITION BY oi.vendor_id ORDER BY oi.datex ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING), 0) -- حساب الرصيد المتبقي بعد توزيع الفواتير السابقة
                    )
                )
        END AS remaining_balance -- إذا انتهى الرصيد يتم وضع 0 وإلا يتم حساب الرصيد المتبقي
    FROM
        ordered_invoices oi -- استخدام الفواتير المرتبة
    LEFT JOIN 
        balances b ON oi.vendor_id = b.vendor_id -- ربط الفواتير مع الأرصدة
)

-- 4. تحديد البيانات النهائية التي سيتم استرجاعها
SELECT 
    id,
    reference,
    total_value,
    general_note,
    datex,
    vendor_id,
    vendor_name,
    salesman_id,
    salesman_name,
    due_date,
    is_row_note_show,
    is_row_dicount_show,
    referenceconcat,
    qutation_id,
    qutation_reference,
    order_id,
    order_reference,
    CASE
      WHEN remaining_balance = 0 THEN
        'مدفوع بالكامل'  
      WHEN due_date::DATE - datex::DATE > 0 THEN
        CASE
            WHEN remaining_balance <= 0 THEN 
                'مدفوع مقدماً' -- إذا كان الرصيد المتبقي صفر أو أقل
            ELSE 
                CONCAT('يستحق بعد ', due_date::DATE - datex::DATE, ' يوم') -- إذا كان هناك رصيد متبقي
        END
      WHEN due_date::DATE - datex::DATE = 0 THEN 
        'مستحق اليوم' -- إذا كان الفرق صفر
      WHEN due_date::DATE - datex::DATE < 0 THEN 
        CONCAT('مستحق منذ ', ABS(datex::DATE - due_date::DATE), ' يوم') -- إذا كان الفرق أقل من صفر
    END AS payment_status,
    remaining_balance -- الرصيد المتبقي بعد توزيع الرصيد
FROM
    distributed -- استرجاع البيانات الموزعة
ORDER BY
    vendor_id, -- ترتيب النتائج حسب معرّف العميل
    datex; -- ثم ترتيب النتائج حسب تاريخ الفاتورة

        `;
        
        // تنفيذ الاستعلامات
        let data = await db.any(quer1, [req.session.company_id, posted_elements.start_date, posted_elements.end_date]);


            res.json(data);
          } catch (error) {
            console.error("Error get_purshases_invoice_Data_view:", error);
            res.status(500).send("Error:");
          }
        });
        //#endregion sales invoice view

        app.post("/get_data_for_purshasesQutationToInvoice", async (req, res) => {
          try {
            //! Permission
            await permissions(req, "purshases_invoice_permission", "add");
            if (!permissions) {
              return;
            }
        
            
            const posted_elements = req.body;
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
            // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");
        
            const transaction_type = 25
      
        
        
            let query1 = `
             -- مواقع المخزون
        select
          id as id,
          account_name as account_name
        from
          accounts_header 
        WHERE company_id = $1 
          AND account_type_id = 7
          AND is_inactive IS NULL
          ;
        `;
        let params1 = [req.session.company_id]
        
        // let query2 = `
        //   select
        //   id as id,
        //   account_name as account_name
        // from
        //   accounts_header 
        // WHERE company_id = $1 
        //   AND account_type_id = 4
        //   AND is_final_account IS true
        //   and is_salesman IS true
        //   AND is_inactive IS null
        //   ;
        // `
        // let params2 = [req.session.company_id]
        
        let query3 = `
            select 
          th.id,
          th.taxe_package_name as account_name
        from
           settings_tax_header th
        where
          th.company_id = $1
          and th.is_inactive is null
        order by
          th.taxe_package_name asc 
         
        `
        let params3 = [req.session.company_id]
        
        let query4 = `
        select
            tb.id,
            tb.tax_name,
            tb.tax_rate,
            tb.is_tax_reverse,
            tb.tax_account_id,
            ah.account_name,
            tb.settings_tax_header_id
        from
            settings_tax_body tb
        left join accounts_header ah on ah.id = tb.tax_account_id    
        where
            tb.settings_tax_header_id = ANY($1::int[])
            AND ah.is_inactive IS NULL
        `;
        
        
        let query5 = `
SELECT
  ah.id,
  ah.account_name,
  ah.account_type_id,
  COALESCE(ah.item_unite, 'الكمية') as item_unite,
  ah.item_revenue_account,
  ah_revenue.account_name as revenue_account_name,
  ah.item_expense_account,
  ah_expense.account_name as expense_account_name,
  ah.item_sales_price,
  ah.item_purshas_price
FROM
  accounts_header ah
left join accounts_header ah_revenue on ah_revenue.id = ah.item_revenue_account
left join accounts_header ah_expense on ah_expense.id = ah.item_expense_account
WHERE
  ah.company_id = $1
  AND ah.is_final_account = true
  AND ah.account_type_id IN (5, 8)
  AND ah.is_inactive IS NULL
        `;
        
        let params5 = [req.session.company_id];
        
        
        let query6 = `
        select
          ah.id,
          ah.account_name
        from
          accounts_header ah
        where
          ah.company_id = $1
          AND ah.is_final_account is true
          AND is_inactive is null
          AND (ah.account_type_id = 3 or ah.is_allow_to_buy_and_sell is true);`
        
          let params6 = [req.session.company_id];
        
        
        let query7 = `
        select 
          bih.id,
          bih.reference,
          bih.general_note,
          bih.datex,
          NULL as due_date,
          bih.account_id,
          bih.qutation_id,
          bih.is_delivered,
          bih.items_location_id,
          bih.is_row_note_show,
          bih.is_row_dicount_show,
          CONCAT(
            SUBSTRING(bih.datex, 1, 4), '-',  -- استخراج السنة من datex
            LPAD(CAST(bih.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
          ) AS referenceconcat,
          CONCAT(
            SUBSTRING(qt.datex, 1, 4), '-',  -- استخراج السنة من datex
            LPAD(CAST(qt.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
          ) AS referenceconcat_qutation,
        NULL AS referenceconcat_order
        from
          befor_invoice_header bih
          left join befor_invoice_header qt on qt.id = bih.qutation_id
        where 
        bih.id = $1
        and bih.company_id = $2
        and bih.transaction_type = $3
        AND bih.is_deleted IS NULL
        `
        let params7 = [posted_elements.x, req.session.company_id, transaction_type];
        
        let query8 = `
        select
          bib.id,
          bib.item_id,
            ah.account_name,
            ah.item_unite,
            ah.account_type_id as item_type_id,
          bib.amount as amount,
          bib.unite_price as unite_price,
          COALESCE(bib.row_note, '') as row_note,
          bib.is_discount_percentage,
          bib.dicount_value,
          bib.tax_header_id as tax_header_id,
            sth.taxe_package_name
        from
          befor_invoce_body bib
        LEFT JOIN accounts_header ah on ah.id = bib.item_id
        LEFT JOIN settings_tax_header sth on sth.id = bib.tax_header_id
        left join account_type at on at.id = ah.account_type_id
        where 
          bib.header_id = $1
          ;
        `
        let params8 = [posted_elements.x]
        
        
        let query9 = `
        select 
          bih.id,
              CONCAT(
                SUBSTRING(bih.datex, 1, 4), '-',  -- استخراج السنة من datex
                LPAD(CAST(bih.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
            ) AS account_name
        from
          befor_invoice_header bih
        where
          bih.transaction_type = 25
          and bih.company_id = $1
          and bih.is_deleted is NULL
          and (bih.is_qutation_status IS NOT FALSE or bih.id = $2);
           ` 
           qutation_id = isNaN(+posted_elements.x) ? null : posted_elements.x
      
           let params9 = [req.session.company_id, qutation_id]
        
           let query10 = `
           select 
             bih.id,
                 CONCAT(
                   SUBSTRING(bih.datex, 1, 4), '-',  -- استخراج السنة من datex
                   LPAD(CAST(bih.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
               ) AS account_name
           from
             befor_invoice_header bih
           where
             bih.transaction_type = 26
             and bih.company_id = $1
             and bih.is_deleted is NULL
             and (bih.is_invoiced IS NULL or bih.id = $2);
              ` 
              
              // order_id = isNaN(+posted_elements.order_id) ? null : posted_elements.order_id
              order_id = null
              
              let params10 = [req.session.company_id, order_id]
        
        
        await db.tx(async (tx) => {
        
          const itemslocationsArray = await tx.any(query1, params1);
          // const salesmanArray = await tx.any(query2, params2);
          const taxHeaderArray = await tx.any(query3, params3);
          const settings_tax_header_id_Array = taxHeaderArray.map(row => row.id);  // استخراج IDs من الاستعلام الثالث
          const taxBodyArray = await tx.any(query4, [settings_tax_header_id_Array]);  // تمرير القائمة إلى الاستعلام الرابع
          const itemsDataArray = await tx.any(query5, params5);
          const vendorsDataArray = await tx.any(query6, params6);
          const headerData = await tx.any(query7, params7);
          const bodyData = await tx.any(query8, params8);
          const purshasesQutationReferencesArray = await tx.any(query9, params9);
          const purshasesOrderReferencesArray = await tx.any(query10, params10);
        
          const postedData = { itemslocationsArray, taxHeaderArray, taxBodyArray, itemsDataArray, vendorsDataArray, headerData, bodyData, purshasesQutationReferencesArray, purshasesOrderReferencesArray};
          res.json(postedData);
        })
        
        
            await last_activity(req)
          } catch (error) {
            await last_activity(req)
            console.error("Error while get_data_for_purshasesQutationToInvoice  Data", error);
            res.join;
            res
              .status(500)
              .json({ success: false, message_ar: "Error while get_data_for_purshasesQutationToInvoice Data" });
          }
        });

        app.post("/get_data_for_purshasesOrderToInvoice", async (req, res) => {
          try {
            //! Permission
            await permissions(req, "purshases_invoice_permission", "add");
            if (!permissions) {
              return;
            }
        
            
            const posted_elements = req.body;
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
            // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");
        
            const transaction_type = 26
      
        
        
            let query1 = `
             -- مواقع المخزون
        select
          id as id,
          account_name as account_name
        from
          accounts_header 
        WHERE company_id = $1 
          AND account_type_id = 7
          AND is_inactive IS NULL
          ;
        `;
        let params1 = [req.session.company_id]
        
        // let query2 = `
        //   select
        //   id as id,
        //   account_name as account_name
        // from
        //   accounts_header 
        // WHERE company_id = $1 
        //   AND account_type_id = 4
        //   AND is_final_account IS true
        //   and is_salesman IS true
        //   AND is_inactive IS null
        //   ;
        // `
        // let params2 = [req.session.company_id]
        
        let query3 = `
            select 
          th.id,
          th.taxe_package_name as account_name
        from
           settings_tax_header th
        where
          th.company_id = $1
          and th.is_inactive is null
        order by
          th.taxe_package_name asc 
         
        `
        let params3 = [req.session.company_id]
        
        let query4 = `
        select
            tb.id,
            tb.tax_name,
            tb.tax_rate,
            tb.is_tax_reverse,
            tb.tax_account_id,
            ah.account_name,
            tb.settings_tax_header_id
        from
            settings_tax_body tb
        left join accounts_header ah on ah.id = tb.tax_account_id    
        where
            tb.settings_tax_header_id = ANY($1::int[])
            AND ah.is_inactive IS NULL
        `;
        
        
        let query5 = `
SELECT
  ah.id,
  ah.account_name,
  ah.account_type_id,
  COALESCE(ah.item_unite, 'الكمية') as item_unite,
  ah.item_revenue_account,
  ah_revenue.account_name as revenue_account_name,
  ah.item_expense_account,
  ah_expense.account_name as expense_account_name,
  ah.item_sales_price,
  ah.item_purshas_price
FROM
  accounts_header ah
left join accounts_header ah_revenue on ah_revenue.id = ah.item_revenue_account
left join accounts_header ah_expense on ah_expense.id = ah.item_expense_account
WHERE
  ah.company_id = $1
  AND ah.is_final_account = true
  AND ah.account_type_id IN (5, 8)
  AND ah.is_inactive IS NULL
        `;
        
        let params5 = [req.session.company_id];
        
        
        let query6 = `
        select
          ah.id,
          ah.account_name
        from
          accounts_header ah
        where
          ah.company_id = $1
          AND ah.is_final_account is true
          AND is_inactive is null
          AND (ah.account_type_id = 3 or ah.is_allow_to_buy_and_sell is true);`
        
          let params6 = [req.session.company_id];
        
        
        let query7 = `
        select 
          bih.id,
          bih.reference,
          bih.general_note,
          bih.datex,
          NULL as due_date,
          bih.account_id,
          bih.qutation_id,
          bih.is_delivered,
          bih.items_location_id,
          bih.is_row_note_show,
          bih.is_row_dicount_show,
          CONCAT(
            SUBSTRING(bih.datex, 1, 4), '-',  -- استخراج السنة من datex
            LPAD(CAST(bih.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
          ) AS referenceconcat,
          CONCAT(
            SUBSTRING(qt.datex, 1, 4), '-',  -- استخراج السنة من datex
            LPAD(CAST(qt.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
          ) AS referenceconcat_qutation,
        NULL AS referenceconcat_order
        from
          befor_invoice_header bih
          left join befor_invoice_header qt on qt.id = bih.qutation_id
        where 
        bih.id = $1
        and bih.company_id = $2
        and bih.transaction_type = $3
        AND bih.is_deleted IS NULL
        `
        
        let params7 = [posted_elements.x, req.session.company_id, transaction_type];
        
        let query8 = `
        select
          bib.id,
          bib.item_id,
            ah.account_name,
            ah.item_unite,
            ah.account_type_id as item_type_id,
          bib.amount as amount,
          bib.unite_price as unite_price,
          COALESCE(bib.row_note, '') as row_note,
          bib.is_discount_percentage,
          bib.dicount_value,
          bib.tax_header_id as tax_header_id,
            sth.taxe_package_name
        from
          befor_invoce_body bib
        LEFT JOIN accounts_header ah on ah.id = bib.item_id
        LEFT JOIN settings_tax_header sth on sth.id = bib.tax_header_id
        left join account_type at on at.id = ah.account_type_id
        where 
          bib.header_id = $1
          ;
        `
        let params8 = [posted_elements.x]
        
        
        let query9 = `
        select 
          bih.id,
              CONCAT(
                SUBSTRING(bih.datex, 1, 4), '-',  -- استخراج السنة من datex
                LPAD(CAST(bih.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
            ) AS account_name
        from
          befor_invoice_header bih
        where
          bih.transaction_type = 25
          and bih.company_id = $1
          and bih.is_deleted is NULL
          and (bih.is_qutation_status IS NOT FALSE or bih.id = $2);
           ` 
           qutation_id = isNaN(+posted_elements.qutationId) ? null : posted_elements.qutationId
      
           let params9 = [req.session.company_id, qutation_id]
        
           let query10 = `
           select 
             bih.id,
                 CONCAT(
                   SUBSTRING(bih.datex, 1, 4), '-',  -- استخراج السنة من datex
                   LPAD(CAST(bih.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
               ) AS account_name
           from
             befor_invoice_header bih
           where
             bih.transaction_type = 26
             and bih.company_id = $1
             and bih.is_deleted is NULL
             and (bih.is_invoiced IS NULL or bih.id = $2);
              ` 
              
              order_id = isNaN(+posted_elements.x) ? null : posted_elements.x
              
              let params10 = [req.session.company_id, order_id]
        
        
        await db.tx(async (tx) => {
        
          const itemslocationsArray = await tx.any(query1, params1);
          // const salesmanArray = await tx.any(query2, params2);
          const taxHeaderArray = await tx.any(query3, params3);
          const settings_tax_header_id_Array = taxHeaderArray.map(row => row.id);  // استخراج IDs من الاستعلام الثالث
          const taxBodyArray = await tx.any(query4, [settings_tax_header_id_Array]);  // تمرير القائمة إلى الاستعلام الرابع
          const itemsDataArray = await tx.any(query5, params5);
          const vendorsDataArray = await tx.any(query6, params6);
          const headerData = await tx.any(query7, params7);
          const bodyData = await tx.any(query8, params8);
          const purshasesQutationReferencesArray = await tx.any(query9, params9);
          const purshasesOrderReferencesArray = await tx.any(query10, params10);
        
          const postedData = { itemslocationsArray, salesmanArray, taxHeaderArray, taxBodyArray, itemsDataArray, vendorsDataArray, headerData, bodyData, purshasesQutationReferencesArray, purshasesOrderReferencesArray};
          res.json(postedData);
        })
        
        
            await last_activity(req)
          } catch (error) {
            await last_activity(req)
            console.error("Error while get_data_for_purshasesOrderToInvoice", error);
            res.join;
            res
              .status(500)
              .json({ success: false, message_ar: "Error while get_data_for_purshasesOrderToInvoice" });
          }
        });

        app.post("/get_data_for_sales_purshasesInvoice_update", async (req, res) => {
          try {
            //! Permission
            await permissions(req, "purshases_invoice_permission", "update");
            if (!permissions) {
              return;
            }
        
            
            const posted_elements = req.body;
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
            // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");
        
            const transaction_type = 6
      
        
        
            let query1 = `
             -- مواقع المخزون
        select
          id as id,
          account_name as account_name
        from
          accounts_header 
        WHERE company_id = $1 
          AND account_type_id = 7
          AND is_inactive IS NULL
          ;
        `;
        let params1 = [req.session.company_id]
        
        // let query2 = `
        //   select
        //   id as id,
        //   account_name as account_name
        // from
        //   accounts_header 
        // WHERE company_id = $1 
        //   AND account_type_id = 4
        //   AND is_final_account IS true
        //   and is_salesman IS true
        //   AND is_inactive IS null
        //   ;
        // `
        // let params2 = [req.session.company_id]
        
        let query3 = `
            select 
          th.id,
          th.taxe_package_name as account_name
        from
           settings_tax_header th
        where
          th.company_id = $1
          and th.is_inactive is null
        order by
          th.taxe_package_name asc 
         
        `
        let params3 = [req.session.company_id]
        
        let query4 = `
        select
            tb.id,
            tb.tax_name,
            tb.tax_rate,
            tb.is_tax_reverse,
            tb.tax_account_id,
            ah.account_name,
            tb.settings_tax_header_id
        from
            settings_tax_body tb
        left join accounts_header ah on ah.id = tb.tax_account_id    
        where
            tb.settings_tax_header_id = ANY($1::int[])
            AND ah.is_inactive IS NULL
        `;
        
        
        let query5 = `
SELECT
  ah.id,
  ah.account_name,
  ah.account_type_id,
  COALESCE(ah.item_unite, 'الكمية') as item_unite,
  ah.item_revenue_account,
  ah_revenue.account_name as revenue_account_name,
  ah.item_expense_account,
  ah_expense.account_name as expense_account_name,
  ah.item_sales_price,
  ah.item_purshas_price
FROM
  accounts_header ah
left join accounts_header ah_revenue on ah_revenue.id = ah.item_revenue_account
left join accounts_header ah_expense on ah_expense.id = ah.item_expense_account
WHERE
  ah.company_id = $1
  AND ah.is_final_account = true
  AND ah.account_type_id IN (5, 8)
  AND ah.is_inactive IS NULL
        `;
        
        let params5 = [req.session.company_id];
        
        
        let query6 = `
        select
          ah.id,
          ah.account_name
        from
          accounts_header ah
        where
          ah.company_id = $1
          AND ah.is_final_account is true
          AND is_inactive is null
          AND (ah.account_type_id = 3 or ah.is_allow_to_buy_and_sell is true);`
        
          let params6 = [req.session.company_id];
        
        
        let query7 = `
        select 
          th.id,
          th.reference,
          th.general_note,
          th.datex,
          th.due_date,
          th.account_id,
          th.qutation_id,
          th.order_id,
          th.is_delivered,
          th.items_location_id,
          th.is_row_note_show,
          th.is_row_dicount_show,
          CONCAT(
            SUBSTRING(th.datex, 1, 4), '-',  -- استخراج السنة من datex
            LPAD(CAST(th.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
          ) AS referenceconcat,
          CONCAT(
            SUBSTRING(bih_qutation.datex, 1, 4), '-',  -- استخراج السنة من datex
            LPAD(CAST(bih_qutation.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
          ) AS referenceconcat_qutation,
          CONCAT(
            SUBSTRING(bih_order.datex, 1, 4), '-',  -- استخراج السنة من datex
            LPAD(CAST(bih_order.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
          ) AS referenceconcat_order
        from
          transaction_header th
        left join befor_invoice_header bih_qutation on bih_qutation.id = th.qutation_id
        left join befor_invoice_header bih_order on bih_order.id = th.order_id
        where 
        th.id = $1
        and th.company_id = $2
        and th.transaction_type = $3
        AND th.is_deleted IS NULL
        `
        let params7 = [posted_elements.x, req.session.company_id, transaction_type];
        
        let query8 = `
        select
          tb.id,
          tb.item_id,
            ah.account_name,
            ah.item_unite,
            ah.account_type_id as item_type_id,
          tb.item_amount as amount,
          tb.item_price as unite_price,
          COALESCE(tb.row_note, '') as row_note,
          tb.is_discount_percentage,
          tb.dicount_value,
          tb.settings_tax_header_id as tax_header_id,
            sth.taxe_package_name
        from
          transaction_body tb
        LEFT JOIN accounts_header ah on ah.id = tb.item_id
        LEFT JOIN settings_tax_header sth on sth.id = tb.settings_tax_header_id
        left join account_type at on at.id = ah.account_type_id
        where 
          tb.transaction_header_id = $1
          AND tb.item_id is NOT NULL
          ;
        `
        let params8 = [posted_elements.x]
        
        
        let query9 = `
        select 
          bih.id,
              CONCAT(
                SUBSTRING(bih.datex, 1, 4), '-',  -- استخراج السنة من datex
                LPAD(CAST(bih.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
            ) AS account_name
        from
          befor_invoice_header bih
        where
          bih.transaction_type = 25
          and bih.company_id = $1
          and bih.is_deleted is NULL
          and (bih.is_qutation_status IS NOT FALSE or bih.id = $2);
           ` 
           qutation_id = isNaN(+posted_elements.qutation_id) ? null : posted_elements.qutation_id
      
           let params9 = [req.session.company_id, qutation_id]
        
           let query10 = `
           select 
             bih.id,
                 CONCAT(
                   SUBSTRING(bih.datex, 1, 4), '-',  -- استخراج السنة من datex
                   LPAD(CAST(bih.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
               ) AS account_name
           from
             befor_invoice_header bih
           where
             bih.transaction_type = 26
             and bih.company_id = $1
             and bih.is_deleted is NULL
             and (bih.is_invoiced IS NULL or bih.id = $2);
              ` 
              
              order_id = isNaN(+posted_elements.order_id) ? null : posted_elements.order_id
              
              let params10 = [req.session.company_id, order_id]
        
        
        await db.tx(async (tx) => {
        
          const itemslocationsArray = await tx.any(query1, params1);
          // const salesmanArray = await tx.any(query2, params2);
          const taxHeaderArray = await tx.any(query3, params3);
          const settings_tax_header_id_Array = taxHeaderArray.map(row => row.id);  // استخراج IDs من الاستعلام الثالث
          const taxBodyArray = await tx.any(query4, [settings_tax_header_id_Array]);  // تمرير القائمة إلى الاستعلام الرابع
          const itemsDataArray = await tx.any(query5, params5);
          const vendorsDataArray = await tx.any(query6, params6);
          const headerData = await tx.any(query7, params7);
          const bodyData = await tx.any(query8, params8);
          const purshasesQutationReferencesArray = await tx.any(query9, params9);
          const purshasesOrderReferencesArray = await tx.any(query10, params10);
        
          const postedData = { itemslocationsArray, taxHeaderArray, taxBodyArray, itemsDataArray, vendorsDataArray, headerData, bodyData, purshasesQutationReferencesArray, purshasesOrderReferencesArray};
          res.json(postedData);
        })
        
        
            await last_activity(req)
          } catch (error) {
            await last_activity(req)
            console.error("Error while get_data_for_sales_purshasesInvoice_update", error);
            res.join;
            res
              .status(500)
              .json({ success: false, message_ar: "Error while get_data_for_sales_purshasesInvoice_update" });
          }
        });
      
        app.post("/api/purshases_invoice_add", async (req, res) => {
          try {
        
            //! Permission
            await permissions(req, "purshases_invoice_add", "add");
            if (!permissions) {
              return res.status(403).json({
                success: false,
                message_ar: "ليس لديك الصلاحيات المطلوبة للقيام بهذه العملية.",
              });
            }
      
      
      
        
            const posted_elements = req.body;
            const transaction_type = 6
            let items_array = []
          
        
            //! sql injection check
            let hasBadSymbols = sql_anti_injection([
              ...posted_elements.posted_array.map((obj) => obj.item_typeId + obj.item_id + obj.row_note + obj.row_amount + obj.row_unitPrice + obj.row_discountTypeId + obj.row_discountValue + obj.row_taxHeaderId), // تحويل كل عنصر في dataArray إلى سلسلة نصية ودمجها معاً
              posted_elements.vendorId,
              posted_elements.total,
              posted_elements.datex,
              posted_elements.dueDate,
              posted_elements.orderReferenceId,
              posted_elements.qutationReferenceId,
              posted_elements.itemLocationId,
              posted_elements.is_RowNote,
              posted_elements.is_RowDiscount,
              posted_elements.general_note,
              posted_elements.location_name,
              // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
            ]);
            if (hasBadSymbols) {
              return res.json({
                success: false,
                message_ar: sql_injection_message_ar,
                message_en: sql_injection_message_en,
              });
            }
        
        
            const InValidDateFormat = isInValidDateFormat([posted_elements.datex, posted_elements.dueDate]);
            if (InValidDateFormat) {
              return res.status(400).json({
                success: false,
                message_ar: InValidDateFormat_message_ar,
              });
            }
        
            //! settings
            const settings = await check_settings_validation({
              check_futureDate: true,
              check_closingDate: true,
              datex: posted_elements.datex,
              type: 'add',
              tableName: false, // if type = 'update' or 'delete' only
              transaction_id: false, // if type = 'update' or 'delete' only
            }, req);
        
            
            if (!settings.valid) {
              return res.json({
                success: false,
                message_ar: settings.message_ar,
              });
            }
        
            turn_EmptyValues_TO_null(posted_elements);
        
            
      
            //* Start Transaction --------------------------------------------------
        
           const total = +posted_elements.total
      
           if (!total || isNaN(total)){
            await block_user(req,'Spia001')
            return res.json({
              success: false,
              xx: true,
              message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
            });
           }
      
        
        // //! Security hacking  accounts id
       
           // check qutationReferenceId
      
      
           let query04;
           let rows04;
           if (posted_elements.qutationReferenceId){
             query04 = `select id, is_qutation_status from befor_invoice_header where id = $1 and company_id = $2 and transaction_type = 25 and is_deleted IS NULL`
             rows04 = await db.oneOrNone(query04, [posted_elements.qutationReferenceId, req.session.company_id])
            if (!rows04 || !rows04.id){
              await block_user(req,'Spqi01')
              return res.json({
                success: false,
                xx: true,
                message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
              });
            }
            }
      
      
            let query05;
            let rows05;
            if (posted_elements.orderReferenceId){
              query05 = `select count(id) as salesOrderReferenceCount from befor_invoice_header where id = $1 and company_id = $2 and transaction_type = 26 and is_deleted IS NULL AND is_invoiced IS NULL`
              rows05 = await db.oneOrNone(query05, [posted_elements.orderReferenceId, req.session.company_id])
             if (rows05.salesOrderReferenceCount === 0){
               await block_user(req,'Spia02')
               return res.json({
                 success: false,
                 xx: true,
                 message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
               });
             }
             }
      
        // جلب الحسابات من قاعدة البيانات
        let query02 = `SELECT id, account_type_id, is_salesman FROM accounts_header WHERE company_id = $1 AND is_inactive is null`;
        let rows02 = await db.any(query02, [req.session.company_id]);
        
        // تحويل النتائج إلى مصفوفة للتسهيل في الفحص
        const dbAccounts = rows02.map(row => ({
          id: parseInt(row.id),
          account_type_id: row.account_type_id,
          // is_salesman: row.is_salesman
        }));
      
        //check salesman
      
        // const count_salesman = dbAccounts.some(row => +row.id === +posted_elements.salesmanId && +row.account_type_id === 4 && row.is_salesman === true);
      
          // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
          // if (!count_salesman) {
          //   await block_user(req,'Ssia03')
          //   return res.json({
          //     success: false,
          //     xx: true,
          //     message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
          //   });
          // }

          const count_itemLocation = dbAccounts.some(row => +row.id === +posted_elements.itemLocationId && +row.account_type_id === 7);
          // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
          if (!count_itemLocation) {
            await block_user(req,'Spia04')
            return res.json({
              success: false,
              xx: true,
              message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
            });
          }
      
      
        // المرور على كل كائن في posted_elements.posted_array
        for (const rowData of posted_elements.posted_array) {
          const item_typeId = rowData.item_typeId;
          const item_id = rowData.item_id;
      
        
          //! make sure from every account_id
          const accountExists = dbAccounts.some(item => 
            +item.id === +item_id && +item.account_type_id === +item_typeId
          );
        
          // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
          if (!accountExists) {
            await block_user(req,'Spqa5')
            return res.json({
              success: false,
              xx: true,
              message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
            });
          }
      
          items_array.push(+rowData.item_id)
        }
        
        
            // جلب من قاعدة البيانات
            let query03 = `SELECT id FROM settings_tax_header WHERE company_id = $1`;
            let rows03 = await db.any(query03, [req.session.company_id]);
            
            // تحويل النتائج إلى مصفوفة للتسهيل في الفحص
            const dbTaxesHeaderArray = rows03.map(row => ({
              id: parseInt(row.id)
            }));
            
      
            // المرور على كل كائن في posted_elements.posted_array
            for (const rowData of posted_elements.posted_array) {
              const row_taxHeaderId = rowData.row_taxHeaderId;
              
              if (row_taxHeaderId){
              //! make sure from every account_id
              const taxExists = dbTaxesHeaderArray.some(item =>
                +item.id === +row_taxHeaderId
              );
              
      
            
              // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
              if (!taxExists) {
                await block_user(req,'Spia6')
                return res.json({
                  success: false,
                  xx: true,
                  message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
                });
              }
            }
            }
        
      
            //! فحص الجرد الكميات حسب الموقع
        //     const query_items = `
        //      select 
        //     tb.item_id,
        //     sum(
        //       case 
        //         when tb.debit > 0 then tb.item_amount else tb.item_amount *-1
        //       end
              
        //     ) as current_location_amount
        //   from
        //     transaction_body tb
        // inner join transaction_header th on th.id = tb.transaction_header_id
        // where 
        //   th.company_id = $1
        //   and th.is_deleted is null
        //   and th.is_including_items is TRUE
        //   and tb.item_id IN (${items_array.join(',')})
        //   and tb.item_location_id_tb = $2
        // group by
        //   tb.item_id;
        //     `
      
        //     const items_amount_location = await db.any(query_items,[req.session.company_id, +posted_elements.itemLocationId])
            const newId_transaction_header = await newId_fn("transaction_header", 'id');
            const year = getYear(posted_elements.datex)
            const newReference_transaction_header = await newReference_transaction_header_fn('transaction_header', 6, year, req);
            const newId_general_reference = await newId_fn("transaction_header", 'general_reference');
      
      
            
      
            // تنفيذ معاملة قاعدة البيانات
            await db.tx(async (tx) => {
      
      
              if (rows04 && rows04.is_qutation_status === null) {
                await tx.none(
                  `UPDATE befor_invoice_header 
                   SET is_qutation_status = true 
                   WHERE id = $1 AND company_id = $2`,
                  [+posted_elements.qutationReferenceId, req.session.company_id]
                );
              }
              
      
              
              if(rows05){
                if(rows05.salesorderreferencecount && +rows05.salesorderreferencecount > 0){
                  await tx.none(
                    `UPDATE befor_invoice_header 
                     SET is_invoiced = true 
                     WHERE id = $1 AND company_id = $2`,
                    [+posted_elements.orderReferenceId, req.session.company_id]
                  );
                }
              }
      
      
              let query1 = `INSERT INTO transaction_header
                            (id, reference, company_id, transaction_type, total_value, general_note, datex, account_id, due_date, is_row_dicount_show, is_row_note_show, items_location_id, order_id, qutation_id, general_reference, is_including_items)
                            VALUES($1, $2, $3, $4, $5, $6, $7 , $8 , $9 , $10 , $11 , $12, $13, $14, $15, $16);`;
        
              await tx.none(query1, [
                newId_transaction_header,
                newReference_transaction_header,
                req.session.company_id,
                transaction_type,
                total.toFixed(2),
                posted_elements.general_note,
                posted_elements.datex,
                posted_elements.vendorId,
                posted_elements.dueDate,
                posted_elements.is_RowDiscount ? true : null,
                posted_elements.is_RowNote ? true : null,
                posted_elements.itemLocationId,
                posted_elements.orderReferenceId,
                posted_elements.qutationReferenceId,
                newId_general_reference,
                true
              ]);
        
              let global_stock_id = await tx.oneOrNone(`select id from accounts_header ah where ah.company_id = 1 and ah.global_id = 12`, [req.session.company_id])
              let DeafultAccounts = await tx.any('select id, item_revenue_account, item_expense_account from accounts_header where is_final_account = true and company_id = $1 and is_inactive IS NULL',[req.session.company_id])
              let taxBodyArray = await tx.any('select id, tax_rate, is_tax_reverse, tax_account_id, settings_tax_header_id from settings_tax_body')
      
              let other_posted_array = []
              let Val_beforTax = 0
              let taxValue = 0
              let TotalValue = 0
              let newId_transaction_body = await newId_fn("transaction_body",'id');
              let insertData2 = []
              for (const element of posted_elements.posted_array) {
                const newId = parseInt(newId_transaction_body);
        
                //! make sure if account id != item  then location and amount = null
      
                if(isNaN(+element.row_amount) || isNaN(+element.row_unitPrice)){
                  await block_user(req,'Spia7')
                  throw new Error(
                    'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق'
                  );
                }
      
                //! check amount
                
                // const current_location_amount_data = items_amount_location.find(item => +item.item_id === +element.item_id);
                // const db_amount = +(current_location_amount_data?.current_location_amount || 0);
                // const result_amount = db_amount - +element.row_amount;
                  
                // if (isNaN(result_amount) || result_amount <= 0) {       
                //   throw new Error(
                //     `لا يوجد رصيد كافى فى موقع ${posted_elements.location_name} للصنف ${element.item_name}`
                //   );
                // }
      
                
               const rowDiscountType = +element.row_discountTypeId || 0
               const rowDiscountValue= +element.row_discountValue || 0
               const rowAmount = +element.row_amount || 0
               const rowUnitePrice = +element.row_unitPrice || 0
      
                const Xrow_discount_value =
                rowDiscountType === 1
                    ? +((rowDiscountValue / 100) * (rowAmount * rowUnitePrice))
                    : +rowDiscountValue;
                    Val_beforTax = +((rowAmount * rowUnitePrice) - Xrow_discount_value).toFixed(2);
                    TotalValue += Val_beforTax
                    
      
                    let account_id
                    if (+element.item_typeId === 5){
                      account_id = +global_stock_id.id
                    }else{
                      const account_row = DeafultAccounts.find(item => +item.id === element.item_id);
                    
                      if (!account_row){
                        await block_user(req,'Spia4')
                        throw new Error(
                          'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق'
                        );
                      }
                      account_id = +account_row.item_expense_account 
                    }
                    
                
        
                insertData2.push([
                  newId,
                  newId_transaction_header,
                  +Val_beforTax, // debit
                  null,  // credit
                  element.row_note,
                  +element.row_amount,
                  +element.row_unitPrice,
                  +account_id,
                  +element.row_discountTypeId === 1 ? true : null,
                  element.row_discountValue || null,
                  element.row_taxHeaderId || null,
                  null,
                  null,
                  +element.item_typeId === 5? element.item_id : null,
                  +element.item_typeId === 5? posted_elements.itemLocationId : null
                ]);
      
                //! check if has taxHeader
                if (element.row_taxHeaderId){
                  const taxesbodyArray = taxBodyArray.filter(item => +item.settings_tax_header_id === +element.row_taxHeaderId)
                  if (taxesbodyArray){
                    for (const row of taxesbodyArray){
                      const taxRate = +row.tax_rate /100
                      const taxMultiplier = row.is_tax_reverse ? -1 : 1;
                      taxValue = +(Val_beforTax * taxRate * taxMultiplier).toFixed(2);
                      TotalValue += taxValue
      
                      const newObject = {
                        taxBodyId: row.id,
                        taxHeaderId: row.settings_tax_header_id,
                        debit: taxValue > 0 ? taxValue : null,
                        credit: taxValue < 0 ? taxValue*-1 : null,
                        account_id: row.tax_account_id,
                        is_tax: true
                      }
                      other_posted_array.push(newObject)
                    }
                  }
                }
      
                newId_transaction_body = parseInt(newId_transaction_body) + 1;
              }
      
                
      
              //! add vendor row to transaction
              const newObject = {
                taxBodyId: null,
                taxHeaderId: null,
                debit: TotalValue < 0 ? TotalValue*-1 : null,
                credit: TotalValue > 0 ? TotalValue : null,
                account_id: posted_elements.vendorId,
                is_tax: null
              }
              other_posted_array.push(newObject)
      
              //! insert the other part to transaction
              for (const object of other_posted_array){
                const newId = parseInt(newId_transaction_body);
      
      
                insertData2.push([
                newId,
                newId_transaction_header,
                +object.debit || null,
                +object.credit || null,
                null,
                null,
                null,
                +object.account_id,
                null,
                null,
                +object.taxHeaderId || null,
                +object.taxBodyId || null,
                object.is_tax,
                null,
                null
                ]);
      
                newId_transaction_body = parseInt(newId_transaction_body) + 1;
              }
        
              let query2 = `INSERT INTO transaction_body
              (id, transaction_header_id, debit, credit, row_note, item_amount, item_price, account_id,  is_discount_percentage, dicount_value, settings_tax_header_id, settings_tax_body_id, is_tax, item_id, item_location_id_tb)
              VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);`;
      
              // استخدم tx.batch بدلاً من tx.none
              await tx.batch(insertData2.map(data => tx.none(query2, data)));
      
      
              //! history
              await update_items_cogs(items_array,posted_elements.datex, req, tx)
              await history(transaction_type,1,newId_transaction_header,newReference_transaction_header,req,tx);
            });
        
            // await update_items_cogs(req,items_array,posted_elements.datex)
            const new_referenceFormatting = formatFromFiveDigits(newReference_transaction_header);
            await last_activity(req);
            // إذا تم تنفيذ جميع الاستعلامات بنجاح
            return res.json({
              success: true,
              message_ar: `تم إنشاء فاتورة مشتريات بمرجع : ${new_referenceFormatting}-${year}`,
            });
          } catch (error) {
            await last_activity(req);
            console.error("Error purshases_invoice_add:", error);
        
            // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
            return res.json({
              success: false,
              message_ar: error.message,
            });
          }
        });

        app.post("/get_data_for_purshases_invoice_add", async (req, res) => {
          try {
            //! Permission
            await permissions(req, "sales_invoice_permission", "add");
            if (!permissions) {
              return;
            }
        
            //* Start--------------------------------------------------------------
            // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");
        
            let query1 = `
             -- مواقع المخزون
        select
          id as id,
          account_name as account_name
        from
          accounts_header 
        WHERE company_id = $1 
          AND account_type_id = 7
          ;
        `;
        let params1 = [req.session.company_id]
        
        // let query2 = `
        //   select
        //   id as id,
        //   account_name as account_name
        // from
        //   accounts_header 
        // WHERE company_id = $1 
        //   AND account_type_id = 4
        //   AND is_final_account IS true
        //   and is_salesman IS true
        //   AND is_inactive IS null
        //   ;
        // `
        // let params2 = [req.session.company_id]
        
        let query3 = `
            select 
          th.id,
          th.taxe_package_name as account_name
        from
           settings_tax_header th
        where
          th.company_id = $1
          and th.is_inactive is null
        order by
          th.taxe_package_name asc 
         
        `
        let params3 = [req.session.company_id]
        
        let query4 = `
        select
            tb.id,
            tb.tax_name,
            tb.tax_rate,
            tb.is_tax_reverse,
            tb.tax_account_id,
            ah.account_name,
            tb.settings_tax_header_id
        from
            settings_tax_body tb
        left join accounts_header ah on ah.id = tb.tax_account_id    
        where
            tb.settings_tax_header_id = ANY($1::int[])
        `;
        
        
        let query5 = `
SELECT
  ah.id,
  ah.account_name,
  ah.account_type_id,
  COALESCE(ah.item_unite, 'الكمية') as item_unite,
  ah.item_revenue_account,
  ah_revenue.account_name as revenue_account_name,
  ah.item_expense_account,
  ah_expense.account_name as expense_account_name,
  ah.item_sales_price,
  ah.item_purshas_price
FROM
  accounts_header ah
left join accounts_header ah_revenue on ah_revenue.id = ah.item_revenue_account
left join accounts_header ah_expense on ah_expense.id = ah.item_expense_account
WHERE
  ah.company_id = $1
  AND ah.is_final_account = true
  AND ah.account_type_id IN (5, 8)
  AND ah.is_inactive IS NULL
        `;
        
        let params5 = [req.session.company_id];
        
        
        let query6 = `
        select
          ah.id,
          ah.account_name
        from
          accounts_header ah
        where
          ah.company_id = $1
          AND ah.is_final_account is true
          AND is_inactive is null
          AND (ah.account_type_id = 3 or ah.is_allow_to_buy_and_sell is true);`
        
          let params6 = [req.session.company_id];
        
      
         let query7 = `
      select 
        bih.id,
            CONCAT(
              SUBSTRING(bih.datex, 1, 4), '-',  -- استخراج السنة من datex
              LPAD(CAST(bih.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
          ) AS account_name
      from
        befor_invoice_header bih
      where
        bih.transaction_type = 25
        and bih.company_id = $1
        and bih.is_deleted is NULL
        and bih.is_qutation_status IS NOT FALSE;
         ` 
         let params7 = [req.session.company_id]
      
         let query8 = `
         select 
           bih.id,
               CONCAT(
                 SUBSTRING(bih.datex, 1, 4), '-',  -- استخراج السنة من datex
                 LPAD(CAST(bih.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
             ) AS account_name
         from
           befor_invoice_header bih
         where
           bih.transaction_type = 26
           and bih.company_id = $1
           and bih.is_deleted is NULL
           and bih.is_invoiced is NULL;
            ` 
            let params8 = [req.session.company_id]
      
        await db.tx(async (tx) => {
        
          const itemslocationsArray = await tx.any(query1, params1);
          // const salesmanArray = await tx.any(query2, params2);
          const taxHeaderArray = await tx.any(query3, params3);
          const settings_tax_header_id_Array = taxHeaderArray.map(row => row.id);  // استخراج IDs من الاستعلام الثالث
          const taxBodyArray = await tx.any(query4, [settings_tax_header_id_Array]);  // تمرير القائمة إلى الاستعلام الرابع
          const itemsDataArray = await tx.any(query5, params5);
          const vendorsDataArray = await tx.any(query6, params6);
          const purshasesQutationReferencesArray = await tx.any(query7, params7);
          const purshasesOederReferencesArray = await tx.any(query8, params8);
        
          const postedData = { itemslocationsArray, taxHeaderArray, taxBodyArray, itemsDataArray, vendorsDataArray, purshasesQutationReferencesArray, purshasesOederReferencesArray };
          res.json(postedData);
        })
        
        
            await last_activity(req)
          } catch (error) {
            await last_activity(req)
            console.error("Error while get_data_for_purshases_invoice_add", error);
            res.join;
            res
              .status(500)
              .json({ success: false, message_ar: "Error while get_data_for_purshases_invoice_add" });
          }
        });

        app.post("/api/purshases_invoice_update", async (req, res) => {
          try {
        
            //! Permission معلق
            await permissions(req, "purshases_invoice_permission", "update");
            if (!permissions) {
              return res.status(403).json({
                success: false,
                message_ar: "ليس لديك الصلاحيات المطلوبة للقيام بهذه العملية.",
              });
            }
        
            const posted_elements = req.body;
            const transaction_type = 6
            let items_array = []
          
        
            //! sql injection check
            let hasBadSymbols = sql_anti_injection([
              ...posted_elements.posted_array.map((obj) => obj.item_typeId + obj.item_id + obj.row_note + obj.row_amount + obj.row_unitPrice + obj.row_discountTypeId + obj.row_discountValue + obj.row_taxHeaderId), // تحويل كل عنصر في dataArray إلى سلسلة نصية ودمجها معاً
              posted_elements.x,
              posted_elements.vendorId,
              posted_elements.total,
              posted_elements.datex,
              posted_elements.dueDate,
              posted_elements.orderReferenceId,
              posted_elements.qutationReferenceId,
              posted_elements.itemLocationId,
              posted_elements.is_RowNote,
              posted_elements.is_RowDiscount,
              posted_elements.general_note,
              posted_elements.location_name,
              // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
            ]);
            if (hasBadSymbols) {
              return res.json({
                success: false,
                message_ar: sql_injection_message_ar,
                message_en: sql_injection_message_en,
              });
            }
        
        
            const InValidDateFormat = isInValidDateFormat([posted_elements.datex, posted_elements.dueDate]);
            if (InValidDateFormat) {
              return res.status(400).json({
                success: false,
                message_ar: InValidDateFormat_message_ar,
              });
            }
        
            //! settings
            const settings = await check_settings_validation({
              check_futureDate: true,
              check_closingDate: true,
              datex: posted_elements.datex,
              type: 'update',
              tableName: 'transaction_header', // if type = 'update' or 'delete' only
              transaction_id: posted_elements.x, // if type = 'update' or 'delete' only
            }, req);
        
            
            if (!settings.valid) {
              return res.json({
                success: false,
                message_ar: settings.message_ar,
              });
            }
        
            turn_EmptyValues_TO_null(posted_elements);
        
            
      
            //* Start Transaction --------------------------------------------------
        
           const total = +posted_elements.total
      
           if (!total || isNaN(total)){
            await block_user(req,'Spiu001')
            return res.json({
              success: false,
              xx: true,
              message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
            });
           }
      
        
        // //! Security hacking  accounts id
       
           // check qutationReferenceId
      
           let query_1 = `select reference from transaction_header where id = $1 AND company_id = $2 AND is_deleted IS NULL`
           const result_1 = await db.oneOrNone(query_1,[posted_elements.x, req.session.company_id])
           if (!result_1){
            await block_user(req,'Spqu02')
            return res.json({
              success: false,
              xx: true,
              message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
            });
           }
      
      
           let query04;
           let rows04;
           if (posted_elements.qutationReferenceId){      
             query04 = `select id, is_qutation_status from befor_invoice_header where id = $1 and company_id = $2 and transaction_type = 25 and is_deleted IS NULL`
             rows04 = await db.oneOrNone(query04, [posted_elements.qutationReferenceId, req.session.company_id])
            if (!rows04 || !rows04.id){
              await block_user(req,'Spqu03')
              return res.json({
                success: false,
                xx: true,
                message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
              });
            }
            }
      
      
      
      
            let query05;
            let rows05;
            if (posted_elements.orderReferenceId){
              query05 = `select count(id) as salesOrderReferenceCount from befor_invoice_header where id = $1 and company_id = $2 and transaction_type = 26 and is_deleted IS NULL AND is_invoiced IS NULL`
              rows05 = await db.oneOrNone(query05, [posted_elements.orderReferenceId, req.session.company_id])
             if (rows05.salesOrderReferenceCount === 0){
               await block_user(req,'Spiau04')
               return res.json({
                 success: false,
                 xx: true,
                 message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
               });
             }
             }
      
        // جلب الحسابات من قاعدة البيانات
        let query02 = `SELECT id, account_type_id, is_salesman FROM accounts_header WHERE company_id = $1 AND is_inactive is null`;
        let rows02 = await db.any(query02, [req.session.company_id]);
        
        // تحويل النتائج إلى مصفوفة للتسهيل في الفحص
        const dbAccounts = rows02.map(row => ({
          id: parseInt(row.id),
          account_type_id: row.account_type_id,
          // is_salesman: row.is_salesman
        }));
      
        //check salesman
      
        // const count_salesman = dbAccounts.some(row => +row.id === +posted_elements.salesmanId && +row.account_type_id === 4 && row.is_salesman === true);
      
          // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
          // if (!count_salesman) {
          //   await block_user(req,'Ssqu05')
          //   return res.json({
          //     success: false,
          //     xx: true,
          //     message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
          //   });
          // }

          const count_itemLocation = dbAccounts.some(row => +row.id === +posted_elements.itemLocationId && +row.account_type_id === 7);
          // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
          if (!count_itemLocation) {
            await block_user(req,'Spqu06')
            return res.json({
              success: false,
              xx: true,
              message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
            });
          }
      
      
        // المرور على كل كائن في posted_elements.posted_array
        for (const rowData of posted_elements.posted_array) {
          const item_typeId = rowData.item_typeId;
          const item_id = rowData.item_id;
      
        
          //! make sure from every account_id
          const accountExists = dbAccounts.some(item => 
            +item.id === +item_id && +item.account_type_id === +item_typeId
          );
        
          // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
          if (!accountExists) {
            await block_user(req,'Spqu07')
            return res.json({
              success: false,
              xx: true,
              message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
            });
          }
      
          items_array.push(+rowData.item_id)
        }
        
        
            // جلب من قاعدة البيانات
            let query03 = `SELECT id FROM settings_tax_header WHERE company_id = $1`;
            let rows03 = await db.any(query03, [req.session.company_id]);
            
            // تحويل النتائج إلى مصفوفة للتسهيل في الفحص
            const dbTaxesHeaderArray = rows03.map(row => ({
              id: parseInt(row.id)
            }));
            
      
            // المرور على كل كائن في posted_elements.posted_array
            for (const rowData of posted_elements.posted_array) {
              const row_taxHeaderId = rowData.row_taxHeaderId;
              
              if (row_taxHeaderId){
              //! make sure from every account_id
              const taxExists = dbTaxesHeaderArray.some(item =>
                +item.id === +row_taxHeaderId
              );
              
      
            
              // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
              if (!taxExists) {
                await block_user(req,'Spqu08')
                return res.json({
                  success: false,
                  xx: true,
                  message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
                });
              }
            }
            }
        
      
            //! فحص الجرد الكميات حسب الموقع      
        //     const query_items = `
        //      select 
        //     tb.item_id,
        //     sum(
        //       case 
        //         when tb.debit > 0 then tb.item_amount else tb.item_amount *-1
        //       end
              
        //     ) as current_location_amount
        //   from
        //     transaction_body tb
        // inner join transaction_header th on th.id = tb.transaction_header_id
        // where 
        //   th.company_id = $1
        //   and th.is_deleted is null
        //   and th.is_including_items is TRUE
        //   and th.id != $2
        //   and tb.item_id IN (${items_array.join(',')})
        //   and tb.item_location_id_tb = $3
        // group by
        //   tb.item_id;
        //     `
      
        //     const items_amount_location = await db.any(query_items,[req.session.company_id, posted_elements.x, +posted_elements.itemLocationId])
            
            
            const year = getYear(posted_elements.datex)
      
            // تنفيذ معاملة قاعدة البيانات
            await db.tx(async (tx) => {
      
              let query01 = `SELECT qutation_id, order_id FROM transaction_header WHERE id = $1 AND company_id = $2 AND is_deleted IS NULL;`;
              let rows01 = await db.oneOrNone(query01, [posted_elements.x, req.session.company_id]);
              
       
      
                    //! qutation_id check and update
                    const db_qutation_id = rows01.qutation_id || 0
                    const posted_qutation_id = posted_elements.qutationReferenceId || 0
                    if (+db_qutation_id !== +posted_qutation_id){
                      if (+db_qutation_id !== 0) {
                        const q1 = `
                          SELECT 
                            (SELECT COUNT(id) FROM befor_invoice_header WHERE qutation_id = $2 AND company_id = $3 AND is_deleted IS NULL) AS count_befor_invoice_header,
                            (SELECT COUNT(id) FROM transaction_header WHERE id != $1 AND qutation_id = $2 AND company_id = $3 AND is_deleted IS NULL) AS count_transaction_header
                        `;                  
                        let result1 = await tx.oneOrNone(q1, [+posted_elements.x, +db_qutation_id, req.session.company_id]);                  
                        if (+result1.count_befor_invoice_header === 0 && +result1.count_transaction_header === 0) {
                          const updateQuery1 = `UPDATE befor_invoice_header SET is_qutation_status = NULL WHERE id = $1 AND company_id = $2`;
                          await tx.none(updateQuery1, [+db_qutation_id, req.session.company_id]);
                        }
                      }
                      if (+posted_qutation_id !== 0) {
                        const updateQuery2 = `UPDATE befor_invoice_header SET is_qutation_status = true WHERE id = $1 AND company_id = $2`;
                        await tx.none(updateQuery2, [+posted_qutation_id, req.session.company_id]);
                      }
                    }
      
      
                    //! order_id check and update
                    const db_order_id = rows01.order_id || 0
                    const posted_order_id = posted_elements.orderReferenceId || 0
                    if (+db_order_id !== +posted_order_id){
                      if (+db_order_id !== 0) {
                        const q01 = `
                          SELECT 
                            (SELECT COUNT(id) FROM transaction_header WHERE id != $1 AND order_id = $2 AND company_id = $3 AND is_deleted IS NULL) AS count_transaction_header
                        `;                  
                        let result01 = await tx.oneOrNone(q01, [+posted_elements.x, +db_order_id, req.session.company_id]);                  
                        if (+result01.count_transaction_header === 0) {
                          const updateQuery01 = `UPDATE befor_invoice_header SET is_invoiced = NULL WHERE id = $1 AND company_id = $2`;
                          await tx.none(updateQuery01, [+db_order_id, req.session.company_id]);
                        }
                      }
                      if (+posted_order_id !== 0) {
                        const updateQuery02 = `UPDATE befor_invoice_header SET is_invoiced = true WHERE id = $1 AND company_id = $2`;
                        await tx.none(updateQuery02, [+posted_order_id, req.session.company_id]);
                      }
                    }              
      
      
              let query1 = `update transaction_header
                            set total_value = $1,
                              general_note = $2,
                              datex = $3,
                              account_id = $4,
                              due_date = $5,
                              is_row_dicount_show = $6,
                              is_row_note_show = $7,
                              items_location_id = $8,
                              order_id = $9,
                              qutation_id = $10
                            Where
                              id = $11
                              AND company_id = $12
                              AND transaction_type = $13
                              AND is_deleted IS NULL
                            ;`;
        
              await tx.none(query1, [
                total.toFixed(2),
                posted_elements.general_note,
                posted_elements.datex,
                posted_elements.vendorId,
                posted_elements.dueDate,
                posted_elements.is_RowDiscount ? true : null,
                posted_elements.is_RowNote ? true : null,
                posted_elements.itemLocationId,
                posted_elements.orderReferenceId,
                posted_elements.qutationReferenceId,
                posted_elements.x,
                req.session.company_id,
                transaction_type
              ]);
        
              const query_delete = `delete from transaction_body where transaction_header_id = $1`
              await tx.none(query_delete,[posted_elements.x])
      
              let global_stock_id = await tx.oneOrNone(`select id from accounts_header ah where ah.company_id = 1 and ah.global_id = 12`, [req.session.company_id])
              let DeafultAccounts = await tx.any('select id, item_revenue_account, item_expense_account from accounts_header where is_final_account = true and company_id = $1 and is_inactive IS NULL',[req.session.company_id])
              let taxBodyArray = await tx.any('select id, tax_rate, is_tax_reverse, tax_account_id, settings_tax_header_id from settings_tax_body')
      
              let other_posted_array = []
              let Val_beforTax = 0
              let taxValue = 0
              let TotalValue = 0
              let newId_transaction_body = await newId_fn("transaction_body",'id');
              let insertData2 = []
              for (const element of posted_elements.posted_array) {
                const newId = parseInt(newId_transaction_body);
        
                //! make sure if account id != item  then location and amount = null
      
                if(isNaN(+element.row_amount) || isNaN(+element.row_unitPrice)){
                  await block_user(req,'Spia3')
                  throw new Error(
                    'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق'
                  );
                }
      
                //! check amount           
                // const current_location_amount_data = items_amount_location.find(item => +item.item_id === +element.item_id);
                // const db_amount = +(current_location_amount_data?.current_location_amount || 0);
                // const result_amount = db_amount - +element.row_amount;
                  
                // if (isNaN(result_amount) || result_amount <= 0) {       
                //   throw new Error(
                //     `لا يوجد رصيد كافى فى موقع ${posted_elements.location_name} للصنف ${element.item_name}`
                //   );
                // }
      
                
               const rowDiscountType = +element.row_discountTypeId || 0
               const rowDiscountValue= +element.row_discountValue || 0
               const rowAmount = +element.row_amount || 0
               const rowUnitePrice = +element.row_unitPrice || 0
      
                const Xrow_discount_value =
                rowDiscountType === 1
                    ? +((rowDiscountValue / 100) * (rowAmount * rowUnitePrice))
                    : +rowDiscountValue;
                    Val_beforTax = +((rowAmount * rowUnitePrice) - Xrow_discount_value).toFixed(2);
                    TotalValue += Val_beforTax
                    
      
                    let account_id
                    if (+element.item_typeId === 5){
                      account_id = +global_stock_id.id
                    }else{
                      const account_row = DeafultAccounts.find(item => +item.id === element.item_id);
                    
                      if (!account_row){
                        await block_user(req,'Spia4')
                        throw new Error(
                          'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق'
                        );
                      }
                      account_id = +account_row.item_expense_account 
                    }
                    
        
                insertData2.push([
                  newId,
                  posted_elements.x,
                  +Val_beforTax,
                  null,
                  element.row_note,
                  +element.row_amount,
                  +element.row_unitPrice,
                  +account_id,
                  +element.row_discountTypeId === 1 ? true : null,
                  element.row_discountValue || null,
                  element.row_taxHeaderId || null,
                  null,
                  null,
                  +element.item_typeId === 5? element.item_id : null,
                  +element.item_typeId === 5? posted_elements.itemLocationId : null
                ]);
      
                //! check if has taxHeader
                if (element.row_taxHeaderId){
                  const taxesbodyArray = taxBodyArray.filter(item => +item.settings_tax_header_id === +element.row_taxHeaderId)
                  if (taxesbodyArray){
                    for (const row of taxesbodyArray){
                      const taxRate = +row.tax_rate /100
                      const taxMultiplier = row.is_tax_reverse ? -1 : 1;
                      taxValue = +(Val_beforTax * taxRate * taxMultiplier).toFixed(2);
                      TotalValue += taxValue
      
                      const newObject = {
                        taxBodyId: row.id,
                        taxHeaderId: row.settings_tax_header_id,
                        debit: taxValue > 0 ? taxValue : null,
                        credit: taxValue < 0 ? taxValue*-1 : null,
                        account_id: row.tax_account_id,
                        is_tax: true
                      }
                      other_posted_array.push(newObject)
                    }
                  }
                }
      
                newId_transaction_body = parseInt(newId_transaction_body) + 1;
              }
      
                
      
              //! add customer row to transaction
              const newObject = {
                taxBodyId: null,
                taxHeaderId: null,
                debit: TotalValue < 0 ? TotalValue*-1 : null,
                credit: TotalValue > 0 ? TotalValue : null,
                account_id: posted_elements.vendorId,
                is_tax: null
              }
              other_posted_array.push(newObject)
      
              //! insert the other part to transaction
              for (const object of other_posted_array){
                const newId = parseInt(newId_transaction_body);
      
      
                insertData2.push([
                newId,
                posted_elements.x,
                +object.debit || null,
                +object.credit || null,
                null,
                null,
                null,
                +object.account_id,
                null,
                null,
                +object.taxHeaderId || null,
                +object.taxBodyId || null,
                object.is_tax,
                null,
                null
                ]);
      
                newId_transaction_body = parseInt(newId_transaction_body) + 1;
              }
        
              let query2 = `INSERT INTO transaction_body
              (id, transaction_header_id, debit, credit, row_note, item_amount, item_price, account_id,  is_discount_percentage, dicount_value, settings_tax_header_id, settings_tax_body_id, is_tax, item_id, item_location_id_tb)
              VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);`;
      
              // استخدم tx.batch بدلاً من tx.none
              await tx.batch(insertData2.map(data => tx.none(query2, data)));
      
      
              //! history
              await update_items_cogs(items_array,posted_elements.datex, req, tx)
              await history(transaction_type,2,posted_elements.x,result_1.reference,req,tx);
            });
        
            // await update_items_cogs(req,items_array,posted_elements.datex)
            const new_referenceFormatting = formatFromFiveDigits(result_1.reference);
            await last_activity(req);
            // إذا تم تنفيذ جميع الاستعلامات بنجاح
            return res.json({
              success: true,
              message_ar: `تم تعديل  فاتورة المشتريات بمرجع : ${new_referenceFormatting}-${year}`,
            });
          } catch (error) {
            await last_activity(req);
            console.error("Error purshases_invoice_update:", error);
        
            // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
            return res.json({
              success: false,
              message_ar: error.message,
            });
          }
        });

        app.post("/api/purshases_invoice_delete", async (req, res) => {
          try {
        
            // //! Permission معلق
            // await permissions(req, "transaction_permission", "add");
            // if (!permissions) {
            //   return res.status(403).json({
            //     success: false,
            //     message_ar: "ليس لديك الصلاحيات المطلوبة للقيام بهذه العملية.",
            //   });
            // }
      
            const posted_elements = req.body;
            const transaction_type = 6
          
        
              //! sql injection check
              const hasBadSymbols = sql_anti_injection(...Object.values(posted_elements));
        
              if (hasBadSymbols) {
                return res.json({
                  success: false,
                  message_ar:
                    "Invalid input detected due to prohibited characters. Please review your input and try again.",
                });
              }
        
        
            const InValidDateFormat = isInValidDateFormat([posted_elements.datex]);
            if (InValidDateFormat) {
              return res.status(400).json({
                success: false,
                message_ar: InValidDateFormat_message_ar,
              });
            }
        
            //! settings
            const settings = await check_settings_validation({
              check_futureDate: true,
              check_closingDate: true,
              datex: posted_elements.datex,
              type: 'delete',
              tableName: 'transaction_header', // if type = 'update' or 'delete' only
              transaction_id: posted_elements.x, // if type = 'update' or 'delete' only
            }, req);
        
            
            if (!settings.valid) {
              return res.json({
                success: false,
                message_ar: settings.message_ar,
              });
            }
        
            turn_EmptyValues_TO_null(posted_elements);
        
            
      
            //* Start Transaction --------------------------------------------------
        
      
        
        // //! Security hacking  accounts id
       
       
            let query1 = `select reference, datex from transaction_header where id = $1 and company_id = $2 and is_deleted IS NULL `
            let result1 = await db.oneOrNone(query1,[posted_elements.x, req.session.company_id])
      
            if (!result1){
              await block_user(req,'Spid001')
              return res.json({
                success: false,
                xx: true,
                message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
              });
            }
            
            const year = getYear(result1.datex)
      
      
            let query2 = `select item_id from transaction_body where transaction_header_id = $1 AND item_id IS NOT NULL`;
            let result2 = await db.any(query2, [posted_elements.x]);
            
            if (!result2 || result2.length === 0) {
              await block_user(req, 'Spid001');
              return res.json({
                success: false,
                xx: true,
                message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
              });
            }
            
            // تحويل النتيجة إلى مصفوفة أرقام
            const items_array = result2.map(row => row.item_id);
            
          
            // تنفيذ معاملة قاعدة البيانات
            await db.tx(async (tx) => {



              let query01 = `SELECT qutation_id, order_id FROM transaction_header WHERE id = $1 AND company_id = $2 AND transaction_type = 6 AND is_deleted IS NULL;`;
              let rows01 = await db.oneOrNone(query01, [posted_elements.x, req.session.company_id]);
              
       
      
                    //! qutation_id check and update
                    const db_qutation_id = rows01.qutation_id || 0
                      if (+db_qutation_id !== 0) {
                        const q1 = `
                          SELECT 
                            (SELECT COUNT(id) FROM befor_invoice_header WHERE qutation_id = $2 AND company_id = $3 AND is_deleted IS NULL) AS count_befor_invoice_header,
                            (SELECT COUNT(id) FROM transaction_header WHERE id != $1 AND qutation_id = $2 AND company_id = $3 AND is_deleted IS NULL) AS count_transaction_header
                        `;                  
                        let result1 = await tx.oneOrNone(q1, [+posted_elements.x, +db_qutation_id, req.session.company_id]);                  
                        if (+result1.count_befor_invoice_header === 0 && +result1.count_transaction_header === 0) {
                          const updateQuery1 = `UPDATE befor_invoice_header SET is_qutation_status = NULL WHERE id = $1 AND company_id = $2`;
                          await tx.none(updateQuery1, [+db_qutation_id, req.session.company_id]);
                        }
                      }

      
      
                    //! order_id check and update
                    const db_order_id = rows01.order_id || 0
                      if (+db_order_id !== 0) {
                        const q01 = `
                          SELECT 
                            (SELECT COUNT(id) FROM transaction_header WHERE id != $1 AND order_id = $2 AND company_id = $3 AND is_deleted IS NULL) AS count_transaction_header
                        `;                  
                        let result01 = await tx.oneOrNone(q01, [+posted_elements.x, +db_order_id, req.session.company_id]);                  
                        if (+result01.count_transaction_header === 0) {
                          const updateQuery01 = `UPDATE befor_invoice_header SET is_invoiced = NULL WHERE id = $1 AND company_id = $2`;
                          await tx.none(updateQuery01, [+db_order_id, req.session.company_id]);
                        }
                      }


              let query1 = `update transaction_header
                            set is_deleted = true
                            Where
                              id = $1
                              AND company_id = $2
                              AND transaction_type = 6
                            ;`;

              const resultQ1 = await tx.result(query1, [
                posted_elements.x,
                req.session.company_id
              ]);
      
              if (resultQ1.rowCount === 0) {
                await block_user(req,'Spid1')
                throw new Error(
                  'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق'
                );
              }
        
              const query_delete = `delete from transaction_body where transaction_header_id = $1`
              await tx.none(query_delete,[posted_elements.x])
      
      
              //! history
              await update_items_cogs(items_array,result1.datex, req, tx)
              await history(transaction_type,3,posted_elements.x,result1.reference,req,tx);
            });
      
            // await update_items_cogs(req,items_array,result1.datex)
            const new_referenceFormatting = formatFromFiveDigits(result1.reference);
            await last_activity(req);
            // إذا تم تنفيذ جميع الاستعلامات بنجاح
            return res.json({
              success: true,
              message_ar: `تم حذف  فاتورة مشتريات بمرجع : ${new_referenceFormatting}-${year}`,
            });
          } catch (error) {
            await last_activity(req);
            console.error("Error purshases_invoice_delete:", error);
        
            // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
            return res.json({
              success: false,
              message_ar: error.message,
            });
          }
        });
//#endregion purshases invoice

//#endregion

//#region services

app.post("/services_view_ar", async (req, res) => {
  try {
    // //! Permission
    await permissions(req, "services_permission", "view");
    if (!permissions) {
      return;
    }

    //* Start--------------------------------------------------------------
    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");

    let query1 = `
   select
	ah.id,
	ah.account_name,
	ah.account_no,
	CASE 
    	WHEN
      		ah.is_inactive = true THEN 'غير نشط'
    	ELSE
     		'نشط'
  	END as is_inactive
from
	accounts_header ah
where 
	ah.company_id = $1
	and ah.is_final_account is true
	and ah.account_type_id = 8
    `;
    
    let data = await db.any(query1, [req.session.company_id]);

    res.json(data);
  } catch (error) {
    console.error("Error while get accounts Data", error);
    res.join;
    res
      .status(500)
      .json({ success: false, message_ar: "Error while get accounts Data" });
  }
});

app.post("/get_data_for_services_add", async (req, res) => {
  try {
    // //! Permission
    await permissions(req, "services_permission", "add");
    if (!permissions) {
      return;
    }

    //* Start--------------------------------------------------------------
    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");

    let query1 = `
     -- الايرادات
select
	ah.id,
	ah.account_name,
	ah.global_id
from
	accounts_header ah
where 
	ah.company_id = $1
	and ah.is_final_account is true
	and ah.account_type_id = 1
	and ah.is_inactive is null
	and ah.main_account_id = 4
  ;
`;
let params1 = [req.session.company_id]

let query2 = `
-- المصروفات
select
ah.id,
ah.account_name,
ah.global_id
from
accounts_header ah
where 
ah.company_id = $1
and ah.is_final_account is true
and ah.account_type_id = 1
and ah.is_inactive is null
and ah.main_account_id = 5
;
`;
let params2 = [req.session.company_id]

await db.tx(async (tx) => {

  const revenueAccountsArray = await tx.any(query1, params1);
  const expensesAccountsArray = await tx.any(query2, params2);


  const postedData = { revenueAccountsArray, expensesAccountsArray};
  res.json(postedData);
})


    await last_activity(req)
  } catch (error) {
    await last_activity(req)
    console.error("Error while get Employees Data", error);
    res.join;
    res
      .status(500)
      .json({ success: false, message_ar: "Error while get Employees Data" });
  }
});

app.post("/get_data_for_services_update", async (req, res) => {
  try {
    // //! Permission
    await permissions(req, "services_permission", "add");
    if (!permissions) {
      return;
    }

    const posted_elements = req.body;
  
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
    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");

    let query1 = `
     -- الايرادات
select
	ah.id,
	ah.account_name,
	ah.global_id
from
	accounts_header ah
where 
	ah.company_id = $1
	and ah.is_final_account is true
	and ah.account_type_id = 1
	and ah.is_inactive is null
	and ah.main_account_id = 4
  ;
`;
let params1 = [req.session.company_id]

let query2 = `
-- المصروفات
select
ah.id,
ah.account_name,
ah.global_id
from
accounts_header ah
where 
ah.company_id = $1
and ah.is_final_account is true
and ah.account_type_id = 1
and ah.is_inactive is null
and ah.main_account_id = 5
;
`;
let params2 = [req.session.company_id]


let query3 = `
select 
	ah.id,
	ah.account_name,
	ah.account_no,
	ah.is_inactive,
	ah.item_unite,
	ah.item_revenue_account,
	ah.item_expense_account,
	ah.item_sales_price,
	ah.item_purshas_price
from
	accounts_header ah
where 
	ah.id = $1
	and ah.company_id = $2
	and ah.is_final_account is true
	and ah.account_type_id = 8
	and ah.is_inactive is null
  ;
`
let params3 = [posted_elements.x, req.session.company_id]




await db.tx(async (tx) => {

  const revenueAccountsArray = await tx.any(query1, params1);
  const expensesAccountsArray = await tx.any(query2, params2);
  const serviceDataArray = await tx.oneOrNone(query3, params3);


  const postedData = { revenueAccountsArray, expensesAccountsArray, serviceDataArray};
  res.json(postedData);
})


    await last_activity(req)
  } catch (error) {
    await last_activity(req)
    console.error("Error while get Employees Data", error);
    res.join;
    res
      .status(500)
      .json({ success: false, message_ar: "Error while get Employees Data" });
  }
});

app.post("/services_add", async (req, res) => {
  try {
        // إرسال رسالة إلى العميل عبر WebSocket
        // io.emit('blockUser', { userId: req.session.userId });
        
    const posted_elements = req.body;
    

    //! Permission
      await permissions(req, "services_permission", "add");
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

          
          // const InValidDateFormat = isInValidDateFormat([posted_elements.employee_start_date_value, posted_elements.employee_leave_date_value])
          // if (InValidDateFormat){
          //   return res.json({
          //     success: false,
          //     message_ar: InValidDateFormat_message_ar,
          //   });
          // }

        turn_EmptyValues_TO_null(posted_elements);

    if (!posted_elements.account_name ||
        !posted_elements.unite_name ||
        !posted_elements.revenueAccount ||
        isNaN(+posted_elements.revenueAccount) ||
        !posted_elements.expenseAccount ||
        isNaN(+posted_elements.expenseAccount) ||
        (posted_elements.sales_price && isNaN(+posted_elements.sales_price)) ||   
        (posted_elements.purshase_price && isNaN(+posted_elements.purshase_price))   
      ){
          return res.json({
        success: false,
        message_ar:
          'برجاء ادخال البيانات المطلوبه بشكل صحيح',
      });
    }          
    
    //* Start--------------------------------------------------------------


    let query0 = `SELECT
               (select count(id) FROM accounts_header WHERE company_id = $1 AND account_name = $2 AND account_type_id = 8 AND is_final_account = true AND is_inactive is null) as count_account_name,
               (select count(id) FROM accounts_header WHERE id = $3 AND company_id = $1 AND is_final_account = true  AND account_type_id = 1 AND main_account_id = 4 AND is_inactive IS NULL) as count_revenue_account,
               (select count(id) FROM accounts_header WHERE id = $4 AND company_id = $1 AND is_final_account = true  AND account_type_id = 1 AND main_account_id = 5 AND is_inactive IS NULL) as count_expenses_account
              `;
    let result = await db.oneOrNone(query0, [
      req.session.company_id,
      posted_elements.account_name.trim(),
      posted_elements.revenueAccount,
      posted_elements.expenseAccount
    ]);

  
    if (result.count_account_name > 0){
      return res.json({
        success: false,
        message_ar: 'اسم الخدمه موجود من قبل',
      });
    }


    if (+result.count_revenue_account === 0 || +result.count_expenses_account === 0){
      await block_user(req,'Ssadd1')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }


    //3: insert data into db
    
    
    let active_value;
    if(posted_elements.inactive_select_value == 0){
      active_value = null
    }else if (posted_elements.inactive_select_value == 1) {
      active_value = true
    }

    const newId_header = await newId_fn("accounts_header",'id');
    const newId_body = await newId_fn("accounts_body",'id');


    let query1 = `
  INSERT INTO accounts_header (id, account_name, account_no, item_unite, item_revenue_account, item_expense_account, item_sales_price, item_purshas_price, is_inactive, is_final_account, finance_statement, company_id, account_type_id)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
`;

  let params1 =[
    newId_header,
    posted_elements.account_name,
    posted_elements.accountNo,
    posted_elements.unite_name,
    posted_elements.revenueAccount,
    posted_elements.expenseAccount,
    posted_elements.sales_price,
    posted_elements.purshase_price,
    active_value,
    true,
    1,
    req.session.company_id,
    8
  ]


  // let query2 = `INSERT INTO accounts_body (id, parent_id, account_id)
  //               VALUES ($1, $2, $3)`

  // let params2 = [newId_body,
  //   posted_elements.select_department_value,
  //   newId_header
  // ]               


  await db.tx(async (tx) => {
    await tx.none(query1, params1);
    // await tx.none(query2, params2);
    await history(27, 1, newId_header, 0, req, tx)

  })

  await last_activity(req)
    //4: send a response to frontend about success transaction
    res.json({
      success: true,
      message_ar: "تم حفظ صنف الخدمة بنجاح",
    });
  } catch (error) {
    await last_activity(req)
    console.error("Error services_add:", error);
    // send a response to frontend about fail transaction
    res.status(500).json({
      success: false,
      message_ar: "حدث خطأ أثناء اضافة الموظف",
    });
  }
});

app.post("/services_update", async (req, res) => {
  try {
        // إرسال رسالة إلى العميل عبر WebSocket
        // io.emit('blockUser', { userId: req.session.userId });
        
    const posted_elements = req.body;
    

    //! Permission
      await permissions(req, "services_permission", "update");
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

          
          // const InValidDateFormat = isInValidDateFormat([posted_elements.employee_start_date_value, posted_elements.employee_leave_date_value])
          // if (InValidDateFormat){
          //   return res.json({
          //     success: false,
          //     message_ar: InValidDateFormat_message_ar,
          //   });
          // }

        turn_EmptyValues_TO_null(posted_elements);

    if (!posted_elements.account_name ||
        !posted_elements.unite_name ||
        !posted_elements.revenueAccount ||
        isNaN(+posted_elements.revenueAccount) ||
        !posted_elements.expenseAccount ||
        isNaN(+posted_elements.expenseAccount) ||
        (posted_elements.sales_price && isNaN(+posted_elements.sales_price)) ||   
        (posted_elements.purshase_price && isNaN(+posted_elements.purshase_price))   
      ){
          return res.json({
        success: false,
        message_ar:
          'برجاء ادخال البيانات المطلوبه بشكل صحيح',
      });
    }          
    
    //* Start--------------------------------------------------------------


    let query0 = `SELECT
               (select count(id) FROM accounts_header WHERE id = $5 AND company_id = $1 AND account_type_id = 8 AND is_final_account = true AND is_inactive is null) as count_exist_account_name,
               (select count(id) FROM accounts_header WHERE company_id = $1 AND account_name = $2 AND id != $5 AND account_type_id = 8 AND is_final_account = true AND is_inactive is null) as count_account_name,
               (select count(id) FROM accounts_header WHERE id = $3 AND company_id = $1 AND is_final_account = true  AND account_type_id = 1 AND main_account_id = 4 AND is_inactive IS NULL) as count_revenue_account,
               (select count(id) FROM accounts_header WHERE id = $4 AND company_id = $1 AND is_final_account = true  AND account_type_id = 1 AND main_account_id = 5 AND is_inactive IS NULL) as count_expenses_account
              `;
    let result = await db.oneOrNone(query0, [
      req.session.company_id,
      posted_elements.account_name.trim(),
      posted_elements.revenueAccount,
      posted_elements.expenseAccount,
      posted_elements.x

    ]);

  
    if (result.count_account_name > 0){
      return res.json({
        success: false,
        message_ar: 'اسم الخدمه موجود من قبل',
      });
    }


    if (+result.count_exist_account_name ===0 || +result.count_revenue_account === 0 || +result.count_expenses_account === 0){
      await block_user(req,'Ssadd1')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }


    //3: insert data into db
    
    
    let active_value;
    if(posted_elements.inactive_select_value == 0){
      active_value = null
    }else if (posted_elements.inactive_select_value == 1) {
      active_value = true
    }

    // const newId_header = await newId_fn("accounts_header",'id');
    // const newId_body = await newId_fn("accounts_body",'id');


    let query1 = `
  update accounts_header set
     account_name = $1,
     account_no = $2,
     item_unite = $3,
     item_revenue_account = $4,
     item_expense_account = $5,
     item_sales_price = $6,
     item_purshas_price = $7,
     is_inactive = $8
    where
    id = $9 
    and company_id = $10 
    and account_type_id = 8
    and is_inactive is NULL
  ;  
`;

  let params1 =[
    posted_elements.account_name,
    posted_elements.accountNo,
    posted_elements.unite_name,
    posted_elements.revenueAccount,
    posted_elements.expenseAccount,
    posted_elements.sales_price,
    posted_elements.purshase_price,
    active_value,
    posted_elements.x,
    req.session.company_id
  ]


  // let query2 = `INSERT INTO accounts_body (id, parent_id, account_id)
  //               VALUES ($1, $2, $3)`

  // let params2 = [newId_body,
  //   posted_elements.select_department_value,
  //   newId_header
  // ]               


  await db.tx(async (tx) => {
    await tx.none(query1, params1);
    // await tx.none(query2, params2);
    await history(27, 2, posted_elements.x, 0, req, tx)

  })

  await last_activity(req)
    //4: send a response to frontend about success transaction
    res.json({
      success: true,
      message_ar: "تم تعديل صنف الخدمة بنجاح",
    });
  } catch (error) {
    await last_activity(req)
    console.error("Error services_update:", error);
    // send a response to frontend about fail transaction
    res.status(500).json({
      success: false,
      message_ar: "حدث خطأ أثناء اضافة الموظف",
    });
  }
});

app.post("/services_delete", async (req, res) => {
  try {
        // إرسال رسالة إلى العميل عبر WebSocket
        // io.emit('blockUser', { userId: req.session.userId });
        
    const posted_elements = req.body;
    

    //! Permission
      await permissions(req, "services_permission", "delete");
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

          
          // const InValidDateFormat = isInValidDateFormat([posted_elements.employee_start_date_value, posted_elements.employee_leave_date_value])
          // if (InValidDateFormat){
          //   return res.json({
          //     success: false,
          //     message_ar: InValidDateFormat_message_ar,
          //   });
          // }

        turn_EmptyValues_TO_null(posted_elements);
         
    
    //* Start--------------------------------------------------------------


    let query0 = `SELECT
               (select count(tb.id) from transaction_body tb left join transaction_header th on th.id = tb.transaction_header_id where th.company_id = $1 and tb.item_id = $2 and th.is_deleted is null and th.is_including_items is true) as_count_transactions,
               (select count(id) FROM accounts_header WHERE company_id = $1 AND id = $2 AND account_type_id = 8 AND is_final_account = true AND is_inactive is null) as count_exist_account_name
              `;
    let result = await db.oneOrNone(query0, [
      req.session.company_id,
      posted_elements.x

    ]);

  

    if (+result.count_exist_account_name === 0){
      await block_user(req,'Ssadd1')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }


    if(+result.as_count_transactions > 0){
      return res.json({
        success: false,
        message_ar: 'يوجد حركات على هذا الصنف الخدمى ولا يمكن حذفه',
      });
    }

    let query1 = `
    delete from accounts_header where id = $1 and company_id = $2 and account_type_id = 8
  ;  
`;

  let params1 =[
    posted_elements.x,
    req.session.company_id
  ]
          


  await db.tx(async (tx) => {
    await tx.none(query1, params1);
    // await tx.none(query2, params2);
    await history(27, 3, posted_elements.x, 0, req, tx)

  })

  await last_activity(req)
    //4: send a response to frontend about success transaction
    res.json({
      success: true,
      message_ar: "تم حذف صنف الخدمة بنجاح",
    });
  } catch (error) {
    await last_activity(req)
    console.error("Error services_delete:", error);
    // send a response to frontend about fail transaction
    res.status(500).json({
      success: false,
      message_ar: "حدث خطأ أثناء اضافة الموظف",
    });
  }
});
//#endregion services

//#region sales_returns
app.post("/get_sales_returns_Data_view", async (req, res) => {
  try {
    
    //! Permission  
    await permissions(req, "sales_returns_permission", "view");
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
      
          const InValidDateFormat = isInValidDateFormat([posted_elements.start_date,posted_elements.end_date])
          if (InValidDateFormat){
            return res.json({
              success: false,
              message_ar: InValidDateFormat_message_ar,
            });
          }
        


      turn_EmptyValues_TO_null(posted_elements);
    //* Start--------------------------------------------------------------


    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");

    let query1 = `
select 
    th.id,
    th.reference,
        CONCAT(
        SUBSTRING(th.datex, 1, 4), '-',  -- استخراج السنة من datex
        LPAD(CAST(th.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
    ) AS referenceconcat,
    th.total_value,
    COALESCE(th.general_note, '') as general_note, 
    th.datex,
    th.account_id as customer_id,
    ah1.account_name as customer_name,
    th.salesman_id as salesman_id,
    ah2.account_name as salesman_name,
    '' AS is_invoiced,
    th.due_date,
    th.is_row_note_show,
    th.is_row_dicount_show,
     th.invoice_id,
    CONCAT(
        SUBSTRING(th_invoice.datex, 1, 4), '-',  -- استخراج السنة من datex
        LPAD(CAST(th_invoice.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
    ) AS invoice_reference
from
    transaction_header th
left join accounts_header ah1 on ah1.id = th.account_id
left join accounts_header ah2 on ah2.id = th.salesman_id
left join transaction_header th_invoice on th_invoice.invoice_id = th.id 

where
    th.company_id = $1
    AND th.transaction_type = 4
    AND (th.datex BETWEEN $2 AND $3) -- التأكد أن القيم بين التواريخ النصية تعمل بشكل صحيح
    AND th.is_deleted IS NULL
ORDER BY
    th.datex DESC,
    th.reference DESC
    ;
`;

    let data = await db.any(query1, [req.session.company_id,posted_elements.start_date, posted_elements.end_date]);

    res.json(data);
  } catch (error) {
    console.error("Error get_sales_returns_Data_view:", error);
    res.status(500).send("Error:");
  }
});

  app.post("/get_data_for_sales_returns_add", async (req, res) => {
    try {
      // //! Permission
      await permissions(req, "sales_returns_add", "add");
      if (!permissions) {
        return;
      }
  
      //* Start--------------------------------------------------------------
      // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");
  
      let query1 = `
       -- مواقع المخزون
  select
    id as id,
    account_name as account_name
  from
    accounts_header 
  WHERE company_id = $1 
    AND account_type_id = 7
    ;
  `;
  let params1 = [req.session.company_id]
  
  let query2 = `
    select
    id as id,
    account_name as account_name
  from
    accounts_header 
  WHERE company_id = $1 
    AND account_type_id = 4
    AND is_final_account IS true
    and is_salesman IS true
    AND is_inactive IS null
    ;
  `
  let params2 = [req.session.company_id]
  
  let query3 = `
      select 
    th.id,
    th.taxe_package_name as account_name
  from
     settings_tax_header th
  where
    th.company_id = $1
    and th.is_inactive is null
  order by
    th.taxe_package_name asc 
   
  `
  let params3 = [req.session.company_id]
  
  let query4 = `
  select
      tb.id,
      tb.tax_name,
      tb.tax_rate,
      tb.is_tax_reverse,
      tb.tax_account_id,
      ah.account_name,
      tb.settings_tax_header_id
  from
      settings_tax_body tb
  left join accounts_header ah on ah.id = tb.tax_account_id    
  where
      tb.settings_tax_header_id = ANY($1::int[])
  `;
  
  
  let query5 = `
SELECT
  ah.id,
  ah.account_name,
  ah.account_type_id,
  COALESCE(ah.item_unite, 'الكمية') as item_unite,
  ah.item_revenue_account,
  ah_revenue.account_name as revenue_account_name,
  ah.item_expense_account,
  ah_expense.account_name as expense_account_name,
  ah.item_sales_price,
  ah.item_purshas_price
FROM
  accounts_header ah
left join accounts_header ah_revenue on ah_revenue.id = ah.item_revenue_account
left join accounts_header ah_expense on ah_expense.id = ah.item_expense_account
WHERE
  ah.company_id = $1
  AND ah.is_final_account = true
  AND ah.account_type_id IN (5, 8)
  AND ah.is_inactive IS NULL
  `;
  
  let params5 = [req.session.company_id];
  
  
  let query6 = `
  select
    ah.id,
    ah.account_name
  from
    accounts_header ah
  where
    ah.company_id = $1
    AND ah.is_final_account is true
    AND is_inactive is null
    AND (ah.account_type_id = 2 or ah.is_allow_to_buy_and_sell is true);`
  
    let params6 = [req.session.company_id];
  

   let query8 = `
   select 
     th.id,
         CONCAT(
           SUBSTRING(th.datex, 1, 4), '-',  -- استخراج السنة من datex
           LPAD(CAST(th.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
       ) AS account_name
   from
     transaction_header th
   where
     th.transaction_type = 3
     and th.company_id = $1
     and th.is_deleted is NULL;
      ` 
      let params8 = [req.session.company_id]

  await db.tx(async (tx) => {
  
    const itemslocationsArray = await tx.any(query1, params1);
    const salesmanArray = await tx.any(query2, params2);
    const taxHeaderArray = await tx.any(query3, params3);
    const settings_tax_header_id_Array = taxHeaderArray.map(row => row.id);  // استخراج IDs من الاستعلام الثالث
    const taxBodyArray = await tx.any(query4, [settings_tax_header_id_Array]);  // تمرير القائمة إلى الاستعلام الرابع
    const itemsDataArray = await tx.any(query5, params5);
    const customersDataArray = await tx.any(query6, params6);
    const salesInvoiceReferencesArray = await tx.any(query8, params8);
  
    const postedData = { itemslocationsArray, salesmanArray, taxHeaderArray, taxBodyArray, itemsDataArray, customersDataArray, salesInvoiceReferencesArray };
    res.json(postedData);
  })
  
  
      await last_activity(req)
    } catch (error) {
      await last_activity(req)
      console.error("Error while get Employees Data", error);
      res.join;
      res
        .status(500)
        .json({ success: false, message_ar: "Error while get Employees Data" });
    }
  });

  app.post("/api/sales_returns_add", async (req, res) => {
    try {
  
      
      //! Permission معلق
      await permissions(req, "sales_returns_permission", "add");
      if (!permissions) {
        return res.status(403).json({
          success: false,
          message_ar: "ليس لديك الصلاحيات المطلوبة للقيام بهذه العملية.",
        });
      }



  
      const posted_elements = req.body;
      const transaction_type = 4 // sales_returns
      let items_array = []
    
  
      //! sql injection check
      let hasBadSymbols = sql_anti_injection([
        ...posted_elements.posted_array.map((obj) => obj.item_typeId + obj.item_id + obj.row_note + obj.row_amount + obj.row_unitPrice + obj.row_discountTypeId + obj.row_discountValue + obj.row_taxHeaderId), // تحويل كل عنصر في dataArray إلى سلسلة نصية ودمجها معاً
        posted_elements.customerId,
        posted_elements.total,
        posted_elements.datex,
        posted_elements.invoiceReferenceId,
        posted_elements.itemLocationId,
        posted_elements.salesmanId,
        posted_elements.is_RowNote,
        posted_elements.is_RowDiscount,
        posted_elements.general_note,
        posted_elements.location_name,
        // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
      ]);
      if (hasBadSymbols) {
        return res.json({
          success: false,
          message_ar: sql_injection_message_ar,
          message_en: sql_injection_message_en,
        });
      }
  
  
      const InValidDateFormat = isInValidDateFormat([posted_elements.datex]);
      if (InValidDateFormat) {
        return res.status(400).json({
          success: false,
          message_ar: InValidDateFormat_message_ar,
        });
      }
  
      //! settings
      const settings = await check_settings_validation({
        check_futureDate: true,
        check_closingDate: true,
        datex: posted_elements.datex,
        type: 'add',
        tableName: false, // if type = 'update' or 'delete' only
        transaction_id: false, // if type = 'update' or 'delete' only
      }, req);
  
      
      if (!settings.valid) {
        return res.json({
          success: false,
          message_ar: settings.message_ar,
        });
      }
  
      turn_EmptyValues_TO_null(posted_elements);
  
      

      //* Start Transaction --------------------------------------------------
  
     const total = +posted_elements.total

     if (!total || isNaN(total)){
      await block_user(req,'Ssra001')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
     }


  // //! Security hacking  accounts id
 
     // check qutationReferenceId

      let query05;
      let rows05;
      if (posted_elements.invoiceReferenceId){
        query05 = `select count(id) as salesreturnsReferenceCount from transaction_header where id = $1 and company_id = $2 and transaction_type = 3 and is_deleted IS NULL`
        rows05 = await db.oneOrNone(query05, [posted_elements.invoiceReferenceId, req.session.company_id])
       if (rows05.salesreturnsReferenceCount === 0){
         await block_user(req,'Ssra02')
         return res.json({
           success: false,
           xx: true,
           message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
         });
       }
       }

  // جلب الحسابات من قاعدة البيانات
  let query02 = `SELECT id, account_type_id, is_salesman FROM accounts_header WHERE company_id = $1 AND is_inactive is null`;
  let rows02 = await db.any(query02, [req.session.company_id]);
  
  // تحويل النتائج إلى مصفوفة للتسهيل في الفحص
  const dbAccounts = rows02.map(row => ({
    id: parseInt(row.id),
    account_type_id: row.account_type_id,
    is_salesman: row.is_salesman
  }));

  //check salesman

  const count_salesman = dbAccounts.some(row => +row.id === +posted_elements.salesmanId && +row.account_type_id === 4 && row.is_salesman === true);
  const count_itemLocation = dbAccounts.some(row => +row.id === +posted_elements.itemLocationId && +row.account_type_id === 7);

    // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
    if (!count_salesman) {
      await block_user(req,'Ssra03')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }

    // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
    if (!count_itemLocation) {
      await block_user(req,'Ssra04')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }


  // المرور على كل كائن في posted_elements.posted_array
  for (const rowData of posted_elements.posted_array) {
    const item_typeId = rowData.item_typeId;
    const item_id = rowData.item_id;

  
    //! make sure from every account_id
    const accountExists = dbAccounts.some(item => 
      +item.id === +item_id && +item.account_type_id === +item_typeId
    );
  
    // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
    if (!accountExists) {
      await block_user(req,'Ssra05')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }

    items_array.push(+rowData.item_id)
  }
  
  
      // جلب من قاعدة البيانات
      let query03 = `SELECT id FROM settings_tax_header WHERE company_id = $1`;
      let rows03 = await db.any(query03, [req.session.company_id]);
      
      // تحويل النتائج إلى مصفوفة للتسهيل في الفحص
      const dbTaxesHeaderArray = rows03.map(row => ({
        id: parseInt(row.id)
      }));
      

      // المرور على كل كائن في posted_elements.posted_array
      for (const rowData of posted_elements.posted_array) {
        const row_taxHeaderId = rowData.row_taxHeaderId;
        
        if (row_taxHeaderId){
        //! make sure from every account_id
        const taxExists = dbTaxesHeaderArray.some(item =>
          +item.id === +row_taxHeaderId
        );
        

      
        // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
        if (!taxExists) {
          await block_user(req,'Ssra6')
          return res.json({
            success: false,
            xx: true,
            message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
          });
        }
      }
      }
  
/*
      //! فحص الجرد الكميات حسب الموقع
      const query_items = `
       select 
    	tb.item_id,
    	sum(
    		case 
    			when tb.debit > 0 then tb.item_amount else tb.item_amount *-1
    		end
    		
    	) as current_location_amount
    from
    	transaction_body tb
	inner join transaction_header th on th.id = tb.transaction_header_id
	where 
		th.company_id = $1
		and th.is_deleted is null
		and th.is_including_items is TRUE
		and tb.item_id IN (${items_array.join(',')})
		and tb.item_location_id_tb = $2
	group by
		tb.item_id;
      `
         const items_amount_location = await db.any(query_items,[req.session.company_id, +posted_elements.itemLocationId])
  */

   
      
      const newId_transaction_header = await newId_fn("transaction_header", 'id');
      const year = getYear(posted_elements.datex)
      // const newReference_transaction_header = await newReference_fn('transaction_header', year, req);
      const newReference_transaction_header = await newReference_transaction_header_fn('transaction_header',4, year, req);
      const newId_general_reference = await newId_fn("transaction_header", 'general_reference');

      // const items_avg = await get_last_avg_cost(items_array, posted_elements.datex, req)
      
      // تنفيذ معاملة قاعدة البيانات
      await db.tx(async (tx) => {

     

        let query1 = `INSERT INTO transaction_header
                      (id, reference, company_id, transaction_type, total_value, general_note, datex, account_id, salesman_id, is_row_dicount_show, is_row_note_show, items_location_id, invoice_id, general_reference, is_including_items)
                      VALUES($1, $2, $3, $4, $5, $6, $7 , $8 , $9 , $10 , $11 , $12, $13, $14, $15);`;
  
        await tx.none(query1, [
          newId_transaction_header,
          newReference_transaction_header,
          req.session.company_id,
          transaction_type,
          total.toFixed(2),
          posted_elements.general_note,
          posted_elements.datex,
          posted_elements.customerId,
          posted_elements.salesmanId,
          posted_elements.is_RowDiscount ? true : null,
          posted_elements.is_RowNote ? true : null,
          posted_elements.itemLocationId,
          posted_elements.invoiceReferenceId,
          newId_general_reference,
          true
        ]);
  
        let DeafultAccounts = await tx.any('select id, item_revenue_account, item_expense_account from accounts_header where is_final_account = true and company_id = $1 and is_inactive IS NULL',[req.session.company_id])
        let taxBodyArray = await tx.any('select id, tax_rate, is_tax_reverse, tax_account_id, settings_tax_header_id from settings_tax_body')

        let other_posted_array = []
        let Val_beforTax = 0
        let taxValue = 0
        let TotalValue = 0
        let newId_transaction_body = await newId_fn("transaction_body",'id');
        let insertData2 = []
        for (const element of posted_elements.posted_array) {
          const newId = parseInt(newId_transaction_body);
  
          //! make sure if account id != item  then location and amount = null

          if(isNaN(+element.row_amount) || isNaN(+element.row_unitPrice)){
            await block_user(req,'Ssra7')
            throw new Error(
              'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق'
            );
          }

         /* 
          //! check amount
          const current_location_amount_data = items_amount_location.find(item => +item.item_id === +element.item_id);
          const db_amount = +(current_location_amount_data?.current_location_amount || 0);
          const result_amount = db_amount - +element.row_amount;
            
          if (isNaN(result_amount) || result_amount <= 0) {       
            throw new Error(
              `لا يوجد رصيد كافى فى موقع ${posted_elements.location_name} للصنف ${element.item_name}`
            );
          }
         */ 
          
         const rowDiscountType = +element.row_discountTypeId || 0
         const rowDiscountValue= +element.row_discountValue || 0
         const rowAmount = +element.row_amount || 0
         const rowUnitePrice = +element.row_unitPrice || 0

          const Xrow_discount_value =
          rowDiscountType === 1
              ? +((rowDiscountValue / 100) * (rowAmount * rowUnitePrice))
              : +rowDiscountValue;
              Val_beforTax = +((rowAmount * rowUnitePrice) - Xrow_discount_value).toFixed(2);
              TotalValue += Val_beforTax
              
            //  let cogs = null 
            // if (+element.item_typeId === 5){
            //   x = items_avg.find(item => +item.item_id === element.item_id)
            //   if (x){
            //     cogs = (+element.row_amount * +x.avg)*-1
            //   }
            // }

            

          const account_row = DeafultAccounts.find(item => +item.id === element.item_id);
          
          if (!account_row){
            await block_user(req,'Ssra8')
            throw new Error(
              'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق'
            );
          }
          const account_id = +account_row.item_revenue_account
          
          insertData2.push([
            newId,
            newId_transaction_header,
            +Val_beforTax,
            null,
            element.row_note,
            +element.row_amount,
            +element.row_unitPrice,
            +account_id,
            +element.row_discountTypeId === 1 ? true : null,
            element.row_discountValue || null,
            element.row_taxHeaderId || null,
            null,
            null,
            +element.item_typeId === 5? element.item_id : null,
            +element.item_typeId === 5? posted_elements.itemLocationId : null
          ]);

          //! check if has taxHeader
          if (element.row_taxHeaderId){
            const taxesbodyArray = taxBodyArray.filter(item => +item.settings_tax_header_id === +element.row_taxHeaderId)
            if (taxesbodyArray){
              for (const row of taxesbodyArray){
                const taxRate = +row.tax_rate /100
                const taxMultiplier = row.is_tax_reverse ? -1 : 1;
                taxValue = +(Val_beforTax * taxRate * taxMultiplier).toFixed(2);
                TotalValue += taxValue

                const newObject = {
                  taxBodyId: row.id,
                  taxHeaderId: row.settings_tax_header_id,
                  debit: taxValue > 0 ? taxValue : null,
                  credit: taxValue < 0 ? taxValue*-1 : null,
                  account_id: row.tax_account_id,
                  is_tax: true
                }
                other_posted_array.push(newObject)
              }
            }
          }

          newId_transaction_body = parseInt(newId_transaction_body) + 1;
        }

          

        //! add customer row to transaction
        const newObject = {
          taxBodyId: null,
          taxHeaderId: null,
          debit: TotalValue < 0 ? TotalValue*-1 : null,
          credit: TotalValue > 0 ? TotalValue : null,
          account_id: posted_elements.customerId,
          is_tax: null
        }
        other_posted_array.push(newObject)

        //! insert the other part to transaction
        for (const object of other_posted_array){
          const newId = parseInt(newId_transaction_body);


          insertData2.push([
          newId,
          newId_transaction_header,
          +object.debit || null,
          +object.credit || null,
          null,
          null,
          null,
          +object.account_id,
          null,
          null,
          +object.taxHeaderId || null,
          +object.taxBodyId || null,
          object.is_tax,
          null,
          null
          ]);

          newId_transaction_body = parseInt(newId_transaction_body) + 1;
        }
  
        let query2 = `INSERT INTO transaction_body
        (id, transaction_header_id, debit, credit, row_note, item_amount, item_price, account_id, is_discount_percentage, dicount_value, settings_tax_header_id, settings_tax_body_id, is_tax, item_id, item_location_id_tb)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);`;

        // استخدم tx.batch بدلاً من tx.none
        await tx.batch(insertData2.map(data => tx.none(query2, data)));

        //! history
        await update_items_cogs(items_array,posted_elements.datex, req, tx)
        await history(transaction_type,1,newId_transaction_header,newReference_transaction_header,req,tx);
      });
  
      // await update_items_cogs(req,items_array,posted_elements.datex)
      const new_referenceFormatting = formatFromFiveDigits(newReference_transaction_header);
      await last_activity(req);
      // إذا تم تنفيذ جميع الاستعلامات بنجاح
      return res.json({
        success: true,
        message_ar: `تم إنشاء مرتجع مبيعات بمرجع : ${new_referenceFormatting}-${year}`,
      });
    } catch (error) {
      await last_activity(req);
      console.error("Error adding sales returns:", error);
  
      // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
      return res.json({
        success: false,
        message_ar: error.message,
      });
    }
  });

  app.post("/api/sales_returns_update", async (req, res) => {
    try {
  
      // //! Permission معلق
      await permissions(req, "sales_returns_permission", "update");
      if (!permissions) {
        return res.status(403).json({
          success: false,
          message_ar: "ليس لديك الصلاحيات المطلوبة للقيام بهذه العملية.",
        });
      }



  
      const posted_elements = req.body;
      const transaction_type = 4 // مرتجع المبيعات 4
      let items_array = []
    
  
      //! sql injection check
      let hasBadSymbols = sql_anti_injection([
        ...posted_elements.posted_array.map((obj) => obj.item_typeId + obj.item_id + obj.row_note + obj.row_amount + obj.row_unitPrice + obj.row_discountTypeId + obj.row_discountValue + obj.row_taxHeaderId), // تحويل كل عنصر في dataArray إلى سلسلة نصية ودمجها معاً
        posted_elements.x,
        posted_elements.customerId,
        posted_elements.total,
        posted_elements.datex,
        posted_elements.invoiceReferenceId,
        posted_elements.itemLocationId,
        posted_elements.salesmanId,
        posted_elements.is_RowNote,
        posted_elements.is_RowDiscount,
        posted_elements.general_note,
        posted_elements.location_name,
        // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
      ]);
      if (hasBadSymbols) {
        return res.json({
          success: false,
          message_ar: sql_injection_message_ar,
          message_en: sql_injection_message_en,
        });
      }
  
  
      const InValidDateFormat = isInValidDateFormat([posted_elements.datex]);
      if (InValidDateFormat) {
        return res.status(400).json({
          success: false,
          message_ar: InValidDateFormat_message_ar,
        });
      }
  
      //! settings
      const settings = await check_settings_validation({
        check_futureDate: true,
        check_closingDate: true,
        datex: posted_elements.datex,
        type: 'update',
        tableName: 'transaction_header', // if type = 'update' or 'delete' only
        transaction_id: posted_elements.x, // if type = 'update' or 'delete' only
      }, req);
  
      
      if (!settings.valid) {
        return res.json({
          success: false,
          message_ar: settings.message_ar,
        });
      }
  
      turn_EmptyValues_TO_null(posted_elements);
  
      

      //* Start Transaction --------------------------------------------------
  
     const total = +posted_elements.total

     if (!total || isNaN(total)){
      await block_user(req,'Ssru001')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
     }

  
  // //! Security hacking  accounts id
 
     // check qutationReferenceId

     let query_1 = `select reference from transaction_header where id = $1 AND company_id = $2 AND transaction_type = 4 AND is_deleted IS NULL`
     const result_1 = await db.oneOrNone(query_1,[posted_elements.x, req.session.company_id])
     if (!result_1){
      await block_user(req,'Ssqu02')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
     }


     //! check sales invoice reference if exist
      let query05;
      let rows05;
      if (posted_elements.orderReferenceId){
        query05 = `select count(id) as salesReturnsReferenceCount from transaction_header where id = $1 and company_id = $2 and transaction_type = 3 and is_deleted IS NULL`
        rows05 = await db.oneOrNone(query05, [posted_elements.invoiceReferenceId, req.session.company_id])
       if (rows05.salesReturnsReferenceCount === 0){
         await block_user(req,'Ssrau04')
         return res.json({
           success: false,
           xx: true,
           message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
         });
       }
       }

  // جلب الحسابات من قاعدة البيانات
  let query02 = `SELECT id, account_type_id, is_salesman FROM accounts_header WHERE company_id = $1 AND is_inactive is null`;
  let rows02 = await db.any(query02, [req.session.company_id]);
  
  // تحويل النتائج إلى مصفوفة للتسهيل في الفحص
  const dbAccounts = rows02.map(row => ({
    id: parseInt(row.id),
    account_type_id: row.account_type_id,
    is_salesman: row.is_salesman
  }));

  //check salesman

  const count_salesman = dbAccounts.some(row => +row.id === +posted_elements.salesmanId && +row.account_type_id === 4 && row.is_salesman === true);
  const count_itemLocation = dbAccounts.some(row => +row.id === +posted_elements.itemLocationId && +row.account_type_id === 7);

    // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
    if (!count_salesman) {
      await block_user(req,'Ssru05')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }

    // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
    if (!count_itemLocation) {
      await block_user(req,'Ssru06')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }


  // المرور على كل كائن في posted_elements.posted_array
  for (const rowData of posted_elements.posted_array) {
    const item_typeId = rowData.item_typeId;
    const item_id = rowData.item_id;

  
    //! make sure from every account_id
    const accountExists = dbAccounts.some(item => 
      +item.id === +item_id && +item.account_type_id === +item_typeId
    );
  
    // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
    if (!accountExists) {
      await block_user(req,'Ssru07')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }

    items_array.push(+rowData.item_id)
  }
  
  
      // جلب من قاعدة البيانات
      let query03 = `SELECT id FROM settings_tax_header WHERE company_id = $1`;
      let rows03 = await db.any(query03, [req.session.company_id]);
      
      // تحويل النتائج إلى مصفوفة للتسهيل في الفحص
      const dbTaxesHeaderArray = rows03.map(row => ({
        id: parseInt(row.id)
      }));
      

      // المرور على كل كائن في posted_elements.posted_array
      for (const rowData of posted_elements.posted_array) {
        const row_taxHeaderId = rowData.row_taxHeaderId;
        
        if (row_taxHeaderId){
        //! make sure from every account_id
        const taxExists = dbTaxesHeaderArray.some(item =>
          +item.id === +row_taxHeaderId
        );
        

      
        // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
        if (!taxExists) {
          await block_user(req,'Ssqr08')
          return res.json({
            success: false,
            xx: true,
            message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
          });
        }
      }
      }
  
/*
      //! فحص الجرد الكميات حسب الموقع
      const query_items = `
       select 
    	tb.item_id,
    	sum(
    		case 
    			when tb.debit > 0 then tb.item_amount else tb.item_amount *-1
    		end
    		
    	) as current_location_amount
    from
    	transaction_body tb
	inner join transaction_header th on th.id = tb.transaction_header_id
	where 
		th.company_id = $1
		and th.is_deleted is null
		and th.is_including_items is TRUE
    and th.id != $2
		and tb.item_id IN (${items_array.join(',')})
		and tb.item_location_id_tb = $3
	group by
		tb.item_id;
      `
      const items_amount_location = await db.any(query_items,[req.session.company_id, posted_elements.x, +posted_elements.itemLocationId])
      */
      
      const year = getYear(posted_elements.datex)

      // const items_avg = await get_last_avg_cost(items_array, posted_elements.datex, req)
      // تنفيذ معاملة قاعدة البيانات
      await db.tx(async (tx) => {

        let query1 = `update transaction_header
                      set total_value = $1,
                        general_note = $2,
                        datex = $3,
                        account_id = $4,
                        salesman_id = $5,
                        is_row_dicount_show = $6,
                        is_row_note_show = $7,
                        items_location_id = $8,
                        invoice_id = $9
                      Where
                        id = $10
                        AND company_id = $11
                      ;`;
  
        await tx.none(query1, [
          total.toFixed(2),
          posted_elements.general_note,
          posted_elements.datex,
          posted_elements.customerId,
          posted_elements.salesmanId,
          posted_elements.is_RowDiscount ? true : null,
          posted_elements.is_RowNote ? true : null,
          posted_elements.itemLocationId,
          posted_elements.invoiceReferenceId,
          posted_elements.x,
          req.session.company_id
        ]);
  
        const query_delete = `delete from transaction_body where transaction_header_id = $1`
        await tx.none(query_delete,[posted_elements.x])

        let DeafultAccounts = await tx.any('select id, item_revenue_account, item_expense_account from accounts_header where is_final_account = true and company_id = $1 and is_inactive IS NULL',[req.session.company_id])
        let taxBodyArray = await tx.any('select id, tax_rate, is_tax_reverse, tax_account_id, settings_tax_header_id from settings_tax_body')

        let other_posted_array = []
        let Val_beforTax = 0
        let taxValue = 0
        let TotalValue = 0
        let newId_transaction_body = await newId_fn("transaction_body",'id');
        let insertData2 = []
        for (const element of posted_elements.posted_array) {
          const newId = parseInt(newId_transaction_body);
  
          //! make sure if account id != item  then location and amount = null

          if(isNaN(+element.row_amount) || isNaN(+element.row_unitPrice)){
            await block_user(req,'Ssra3')
            throw new Error(
              'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق'
            );
          }

          /*
          //! check amount
          const current_location_amount_data = items_amount_location.find(item => +item.item_id === +element.item_id);
          const db_amount = +(current_location_amount_data?.current_location_amount || 0);
          const result_amount = db_amount - +element.row_amount;
            
          if (isNaN(result_amount) || result_amount <= 0) {       
            throw new Error(
              `لا يوجد رصيد كافى فى موقع ${posted_elements.location_name} للصنف ${element.item_name}`
            );
          }
          */
          
         const rowDiscountType = +element.row_discountTypeId || 0
         const rowDiscountValue= +element.row_discountValue || 0
         const rowAmount = +element.row_amount || 0
         const rowUnitePrice = +element.row_unitPrice || 0

          const Xrow_discount_value =
          rowDiscountType === 1
              ? +((rowDiscountValue / 100) * (rowAmount * rowUnitePrice))
              : +rowDiscountValue;
              Val_beforTax = +((rowAmount * rowUnitePrice) - Xrow_discount_value).toFixed(2);
              TotalValue += Val_beforTax
              
              // let cogs = null 
              // if (+element.item_typeId === 5){
              //   x = items_avg.find(item => +item.item_id === element.item_id)
              //   if (x){
              //     cogs = (+element.row_amount * +x.avg)*-1
              //   }
              // }


          const account_row = DeafultAccounts.filter(item => +item.id === element.item_id);
          
          if (!account_row){
            await block_user(req,'Ssia4')
            throw new Error(
              'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق'
            );
          }
          const account_id = +account_row[0].item_revenue_account
          
          
  
          insertData2.push([
            newId,
            posted_elements.x,
            +Val_beforTax,
            null,
            element.row_note,
            +element.row_amount,
            +element.row_unitPrice,
            +account_id,
            +element.row_discountTypeId === 1 ? true : null,
            element.row_discountValue || null,
            element.row_taxHeaderId || null,
            null,
            null,
            +element.item_typeId === 5? element.item_id : null,
            +element.item_typeId === 5? posted_elements.itemLocationId : null
          ]);

          //! check if has taxHeader
          if (element.row_taxHeaderId){
            const taxesbodyArray = taxBodyArray.filter(item => +item.settings_tax_header_id === +element.row_taxHeaderId)
            if (taxesbodyArray){
              for (const row of taxesbodyArray){
                const taxRate = +row.tax_rate /100
                const taxMultiplier = row.is_tax_reverse ? -1 : 1;
                taxValue = +(Val_beforTax * taxRate * taxMultiplier).toFixed(2);
                TotalValue += taxValue

                const newObject = {
                  taxBodyId: row.id,
                  taxHeaderId: row.settings_tax_header_id,
                  debit: taxValue < 0 ? taxValue*-1 : null,
                  credit: taxValue > 0 ? taxValue : null,
                  account_id: row.tax_account_id,
                  is_tax: true
                }
                other_posted_array.push(newObject)
              }
            }
          }

          newId_transaction_body = parseInt(newId_transaction_body) + 1;
        }

          

        //! add customer row to transaction
        const newObject = {
          taxBodyId: null,
          taxHeaderId: null,
          debit: TotalValue < 0 ? TotalValue*-1 : null,
          credit: TotalValue > 0 ? TotalValue : null,
          account_id: posted_elements.customerId,
          is_tax: null
        }
        other_posted_array.push(newObject)

        //! insert the other part to transaction
        for (const object of other_posted_array){
          const newId = parseInt(newId_transaction_body);


          insertData2.push([
          newId,
          posted_elements.x,
          +object.debit || null,
          +object.credit || null,
          null,
          null,
          null,
          +object.account_id,
          null,
          null,
          +object.taxHeaderId || null,
          +object.taxBodyId || null,
          object.is_tax,
          null,
          null
          ]);

          newId_transaction_body = parseInt(newId_transaction_body) + 1;
        }
  
        let query2 = `INSERT INTO transaction_body
        (id, transaction_header_id, debit, credit, row_note, item_amount, item_price, account_id,  is_discount_percentage, dicount_value, settings_tax_header_id, settings_tax_body_id, is_tax, item_id, item_location_id_tb)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);`;

        // استخدم tx.batch بدلاً من tx.none
        await tx.batch(insertData2.map(data => tx.none(query2, data)));


        //! history
        await update_items_cogs(items_array,posted_elements.datex, req, tx)
        await history(transaction_type,2,posted_elements.x,result_1.reference,req,tx);
      });
  
      // await update_items_cogs(req,items_array,posted_elements.datex)
      const new_referenceFormatting = formatFromFiveDigits(result_1.reference);
      await last_activity(req);
      // إذا تم تنفيذ جميع الاستعلامات بنجاح
      return res.json({
        success: true,
        message_ar: `تم تعديل  مرتجع مبيعات بمرجع : ${new_referenceFormatting}-${year}`,
      });
    } catch (error) {
      await last_activity(req);
      console.error("Error sales_returns_update:", error);
  
      // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
      return res.json({
        success: false,
        message_ar: error.message,
      });
    }
  });

  app.post("/api/sales_returns_delete", async (req, res) => {
    try {
  
      //! Permission معلق
      await permissions(req, "sales_returns_permission", "delete");
      if (!permissions) {
        return res.status(403).json({
          success: false,
          message_ar: "ليس لديك الصلاحيات المطلوبة للقيام بهذه العملية.",
        });
      }



  
      const posted_elements = req.body;
      const transaction_type = 4
    
  
        //! sql injection check
        const hasBadSymbols = sql_anti_injection(...Object.values(posted_elements));
  
        if (hasBadSymbols) {
          return res.json({
            success: false,
            message_ar:
              "Invalid input detected due to prohibited characters. Please review your input and try again.",
          });
        }
  
  
      const InValidDateFormat = isInValidDateFormat([posted_elements.datex]);
      if (InValidDateFormat) {
        return res.status(400).json({
          success: false,
          message_ar: InValidDateFormat_message_ar,
        });
      }
  
      //! settings
      const settings = await check_settings_validation({
        check_futureDate: true,
        check_closingDate: true,
        datex: posted_elements.datex,
        type: 'delete',
        tableName: 'transaction_header', // if type = 'update' or 'delete' only
        transaction_id: posted_elements.x, // if type = 'update' or 'delete' only
      }, req);
  
      
      if (!settings.valid) {
        return res.json({
          success: false,
          message_ar: settings.message_ar,
        });
      }
  
      turn_EmptyValues_TO_null(posted_elements);
  
      

      //* Start Transaction --------------------------------------------------
  

  
  // //! Security hacking  accounts id
 
 
      let query1 = `select reference, datex from transaction_header where id = $1 and company_id = $2 AND transaction_type = $3 AND is_deleted IS NULL`
      let result1 = await db.oneOrNone(query1,[posted_elements.x, req.session.company_id, transaction_type])

      if (!result1){
        await block_user(req,'Ssrd001')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }
      
      const year = getYear(result1.datex)


      let query2 = `select item_id from transaction_body where transaction_header_id = $1 AND item_id IS NOT NULL`;
      let result2 = await db.any(query2, [posted_elements.x]);
      
      if (!result2 || result2.length === 0) {
        await block_user(req, 'Ssrd001');
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }
      
      // تحويل النتيجة إلى مصفوفة أرقام
      const items_array = result2.map(row => row.item_id);
      
    
      // تنفيذ معاملة قاعدة البيانات
      await db.tx(async (tx) => {

        let query1 = `update transaction_header
                      set is_deleted = true
                      Where
                        id = $1
                        AND company_id = $2
                        AND transaction_type = $3
                      ;`;
  
                    
            
            

        const resultQ1 = await tx.result(query1, [
          posted_elements.x,
          req.session.company_id,
          transaction_type
        ]);

        if (resultQ1.rowCount === 0) {
          await block_user(req,'Ssrd1')
          throw new Error(
            'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق'
          );
        }
  
        const query_delete = `delete from transaction_body where transaction_header_id = $1`
        await tx.none(query_delete,[posted_elements.x])


        //! history
        await update_items_cogs(items_array,result1.datex, req, tx)
        await history(transaction_type,3,posted_elements.x,result1.reference,req,tx);
      });

      // await update_items_cogs(req,items_array,result1.datex)
      const new_referenceFormatting = formatFromFiveDigits(result1.reference);
      await last_activity(req);
      // إذا تم تنفيذ جميع الاستعلامات بنجاح
      return res.json({
        success: true,
        message_ar: `تم حذف  مرتجع مبيعات بمرجع : ${new_referenceFormatting}-${year}`,
      });
    } catch (error) {
      await last_activity(req);
      console.error("Error sales_returns_delete:", error);
  
      // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
      return res.json({
        success: false,
        message_ar: error.message,
      });
    }
  });

  app.post("/get_data_for_sales_returns_update", async (req, res) => {
    try {
      //! Permission معلق
      await permissions(req, "sales_returns_permission", "update");
      if (!permissions) {
        return;
      }
  
      
      const posted_elements = req.body;
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
      // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");
  
      const transaction_type = 4 // مرتجع المبيعات

      
  
      let query1 = `
       -- مواقع المخزون
  select
    id as id,
    account_name as account_name
  from
    accounts_header 
  WHERE company_id = $1 
    AND account_type_id = 7
    AND is_inactive IS NULL
    ;
  `;
  let params1 = [req.session.company_id]
  
  let query2 = `
    select
    id as id,
    account_name as account_name
  from
    accounts_header 
  WHERE company_id = $1 
    AND account_type_id = 4
    AND is_final_account IS true
    and is_salesman IS true
    AND is_inactive IS null
    ;
  `
  let params2 = [req.session.company_id]
  
  let query3 = `
      select 
    th.id,
    th.taxe_package_name as account_name
  from
     settings_tax_header th
  where
    th.company_id = $1
    and th.is_inactive is null
  order by
    th.taxe_package_name asc 
   
  `
  let params3 = [req.session.company_id]
  
  let query4 = `
  select
      tb.id,
      tb.tax_name,
      tb.tax_rate,
      tb.is_tax_reverse,
      tb.tax_account_id,
      ah.account_name,
      tb.settings_tax_header_id
  from
      settings_tax_body tb
  left join accounts_header ah on ah.id = tb.tax_account_id    
  where
      tb.settings_tax_header_id = ANY($1::int[])
      AND ah.is_inactive IS NULL
  `;
  
  
  let query5 = `
SELECT
  ah.id,
  ah.account_name,
  ah.account_type_id,
  COALESCE(ah.item_unite, 'الكمية') as item_unite,
  ah.item_revenue_account,
  ah_revenue.account_name as revenue_account_name,
  ah.item_expense_account,
  ah_expense.account_name as expense_account_name,
  ah.item_sales_price,
  ah.item_purshas_price
FROM
  accounts_header ah
left join accounts_header ah_revenue on ah_revenue.id = ah.item_revenue_account
left join accounts_header ah_expense on ah_expense.id = ah.item_expense_account
WHERE
  ah.company_id = $1
  AND ah.is_final_account = true
  AND ah.account_type_id IN (5, 8)
  AND ah.is_inactive IS NULL
  `;
  
  let params5 = [req.session.company_id];
  
  
  let query6 = `
  select
    ah.id,
    ah.account_name
  from
    accounts_header ah
  where
    ah.company_id = $1
    AND ah.is_final_account is true
    AND is_inactive is null
    AND (ah.account_type_id = 2 or ah.is_allow_to_buy_and_sell is true);`
  
    let params6 = [req.session.company_id];
  
  
  let query7 = `
  select 
    th.id,
    th.reference,
    th.general_note,
    th.datex,
    th.due_date,
    th.account_id,
    th.salesman_id,
    th.invoice_id,
    th.is_delivered,
    th.items_location_id,
    th.is_row_note_show,
    th.is_row_dicount_show,
    CONCAT(
      SUBSTRING(th.datex, 1, 4), '-',  -- استخراج السنة من datex
      LPAD(CAST(th.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
    ) AS referenceconcat,
    CONCAT(
      SUBSTRING(th_invoice.datex, 1, 4), '-',  -- استخراج السنة من datex
      LPAD(CAST(th_invoice.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
    ) AS referenceconcat_invoice
  from
    transaction_header th
	left join transaction_header th_invoice on th_invoice.id = th.invoice_id
  where 
  th.id = $1
  and th.company_id = $2
  and th.transaction_type = $3
  AND th.is_deleted IS NULL
  `
  let params7 = [posted_elements.x, req.session.company_id, transaction_type];
  
  let query8 = `
  select
    tb.id,
    tb.item_id,
      ah.account_name,
      ah.item_unite,
      ah.account_type_id as item_type_id,
    tb.item_amount as amount,
    tb.item_price as unite_price,
    COALESCE(tb.row_note, '') as row_note,
    tb.is_discount_percentage,
    tb.dicount_value,
    tb.settings_tax_header_id as tax_header_id,
      sth.taxe_package_name
  from
    transaction_body tb
  LEFT JOIN accounts_header ah on ah.id = tb.item_id
  LEFT JOIN settings_tax_header sth on sth.id = tb.settings_tax_header_id
  left join account_type at on at.id = ah.account_type_id
  where 
    tb.transaction_header_id = $1
    AND tb.item_id is NOT NULL
    ;
  `
  let params8 = [posted_elements.x]
  
  
  let query9 = `
  select 
    th.id,
        CONCAT(
          SUBSTRING(th.datex, 1, 4), '-',  -- استخراج السنة من datex
          LPAD(CAST(th.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
      ) AS account_name
  from
    transaction_header th
  where
    th.transaction_type = 3
    and th.company_id = $1
    and th.account_id = $2
    and th.is_deleted is NULL
     ` 

     let params9 = [req.session.company_id, posted_elements.customer_id]
  
  
  await db.tx(async (tx) => {
  
    const itemslocationsArray = await tx.any(query1, params1);
    const salesmanArray = await tx.any(query2, params2);
    const taxHeaderArray = await tx.any(query3, params3);
    const settings_tax_header_id_Array = taxHeaderArray.map(row => row.id);  // استخراج IDs من الاستعلام الثالث
    const taxBodyArray = await tx.any(query4, [settings_tax_header_id_Array]);  // تمرير القائمة إلى الاستعلام الرابع
    const itemsDataArray = await tx.any(query5, params5);
    const customersDataArray = await tx.any(query6, params6);
    const headerData = await tx.oneOrNone(query7, params7);
    const bodyData = await tx.any(query8, params8);
    const salesInvoiceReferencesArray = await tx.any(query9, params9);
  
    const postedData = { itemslocationsArray, salesmanArray, taxHeaderArray, taxBodyArray, itemsDataArray, customersDataArray, headerData, bodyData, salesInvoiceReferencesArray};
    res.json(postedData);
  })
  
  
      await last_activity(req)
    } catch (error) {
      await last_activity(req)
      console.error("Error while get_data_for_sales_returns_update  Data", error);
      res.join;
      res
        .status(500)
        .json({ success: false, message_ar: "Error while get_data_for_sales_returns_update Data" });
    }
  });

  app.post("/get_data_for_invoiceToreturns", async (req, res) => {
    try {
      //! Permission معلق
      await permissions(req, "sales_returns_permission", "add");
      if (!permissions) {
        return;
      }
  
      
      const posted_elements = req.body;
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
      // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");
  
      const transaction_type = 4

  
  
      let query1 = `
       -- مواقع المخزون
  select
    id as id,
    account_name as account_name
  from
    accounts_header 
  WHERE company_id = $1 
    AND account_type_id = 7
    AND is_inactive IS NULL
    ;
  `;
  let params1 = [req.session.company_id]
  
  let query2 = `
    select
    id as id,
    account_name as account_name
  from
    accounts_header 
  WHERE company_id = $1 
    AND account_type_id = 4
    AND is_final_account IS true
    and is_salesman IS true
    AND is_inactive IS null
    ;
  `
  let params2 = [req.session.company_id]
  
  let query3 = `
      select 
    th.id,
    th.taxe_package_name as account_name
  from
     settings_tax_header th
  where
    th.company_id = $1
    and th.is_inactive is null
  order by
    th.taxe_package_name asc 
   
  `
  let params3 = [req.session.company_id]
  
  let query4 = `
  select
      tb.id,
      tb.tax_name,
      tb.tax_rate,
      tb.is_tax_reverse,
      tb.tax_account_id,
      ah.account_name,
      tb.settings_tax_header_id
  from
      settings_tax_body tb
  left join accounts_header ah on ah.id = tb.tax_account_id    
  where
      tb.settings_tax_header_id = ANY($1::int[])
      AND ah.is_inactive IS NULL
  `;
  
  
  let query5 = `
SELECT
  ah.id,
  ah.account_name,
  ah.account_type_id,
  COALESCE(ah.item_unite, 'الكمية') as item_unite,
  ah.item_revenue_account,
  ah_revenue.account_name as revenue_account_name,
  ah.item_expense_account,
  ah_expense.account_name as expense_account_name,
  ah.item_sales_price,
  ah.item_purshas_price
FROM
  accounts_header ah
left join accounts_header ah_revenue on ah_revenue.id = ah.item_revenue_account
left join accounts_header ah_expense on ah_expense.id = ah.item_expense_account
WHERE
  ah.company_id = $1
  AND ah.is_final_account = true
  AND ah.account_type_id IN (5, 8)
  AND ah.is_inactive IS NULL
  `;
  
  let params5 = [req.session.company_id];
  
  
  let query6 = `
  select
    ah.id,
    ah.account_name
  from
    accounts_header ah
  where
    ah.company_id = $1
    AND ah.is_final_account is true
    AND is_inactive is null
    AND (ah.account_type_id = 2 or ah.is_allow_to_buy_and_sell is true);`
  
    let params6 = [req.session.company_id];
  
  
  let query7 = `
  select 
    th.id,
    th.reference,
    th.general_note,
    th.datex,
    th.account_id,
    th.salesman_id,
    th.items_location_id,
    th.is_row_note_show,
    th.is_row_dicount_show,
    CONCAT(
      SUBSTRING(th.datex, 1, 4), '-',  -- استخراج السنة من datex
      LPAD(CAST(th.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
    ) AS referenceconcat
  from
    transaction_header th
  where 
  th.id = $1
  and th.company_id = $2
  and th.transaction_type = 3 -- فواتير المبيعات
  AND th.is_deleted IS NULL
  `
  let params7 = [posted_elements.x, req.session.company_id];
  
  let query8 = `
  select
    tb.id,
    tb.item_id,
      ah.account_name,
      ah.item_unite,
      ah.account_type_id as item_type_id,
    tb.item_amount as amount,
    tb.item_price as unite_price,
    COALESCE(tb.row_note, '') as row_note,
    tb.is_discount_percentage,
    tb.dicount_value,
    tb.settings_tax_header_id as tax_header_id,
      sth.taxe_package_name
  from
    transaction_body tb
  LEFT JOIN accounts_header ah on ah.id = tb.item_id
  LEFT JOIN settings_tax_header sth on sth.id = tb.settings_tax_header_id
  left join account_type at on at.id = ah.account_type_id
  where 
    tb.transaction_header_id = $1
    and tb.item_id is not NULL
    ;
  `
  let params8 = [posted_elements.x]
  
  
  let query9 = `
  select 
    th.id,
        CONCAT(
          SUBSTRING(th.datex, 1, 4), '-',  -- استخراج السنة من datex
          LPAD(CAST(th.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
      ) AS account_name
  from
    transaction_header th
  where
    th.transaction_type = 3
    and th.company_id = $1
    and th.account_id = $2
    and th.is_deleted is NULL
     ` 

     let params9 = [req.session.company_id, posted_elements.customer_id]
    
  
  await db.tx(async (tx) => {
  
    const itemslocationsArray = await tx.any(query1, params1);
    const salesmanArray = await tx.any(query2, params2);
    const taxHeaderArray = await tx.any(query3, params3);
    const settings_tax_header_id_Array = taxHeaderArray.map(row => row.id);  // استخراج IDs من الاستعلام الثالث
    const taxBodyArray = await tx.any(query4, [settings_tax_header_id_Array]);  // تمرير القائمة إلى الاستعلام الرابع
    const itemsDataArray = await tx.any(query5, params5);
    const customersDataArray = await tx.any(query6, params6);
    const headerData = await tx.oneOrNone(query7, params7);
    const bodyData = await tx.any(query8, params8);
    const salesInvoiceReferencesArray = await tx.any(query9, params9);
  
    const postedData = { itemslocationsArray, salesmanArray, taxHeaderArray, taxBodyArray, itemsDataArray, customersDataArray, headerData, bodyData, salesInvoiceReferencesArray};
    res.json(postedData);
  })
  
  
      await last_activity(req)
    } catch (error) {
      await last_activity(req)
      console.error("Error while get_data_for_sales_invoice_update  Data", error);
      res.join;
      res
        .status(500)
        .json({ success: false, message_ar: "Error while get_data_for_sales_invoice_update Data" });
    }
  });


//#endregion


//#region purshases_returns
app.post("/get_purshases_returns_Data_view", async (req, res) => {
  try {
    
    //! Permission  
    await permissions(req, "purshases_returns_permission", "view");
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
      
          const InValidDateFormat = isInValidDateFormat([posted_elements.start_date,posted_elements.end_date])
          if (InValidDateFormat){
            return res.json({
              success: false,
              message_ar: InValidDateFormat_message_ar,
            });
          }
        


      turn_EmptyValues_TO_null(posted_elements);
    //* Start--------------------------------------------------------------


    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");

    let query1 = `
select 
    th.id,
    th.reference,
        CONCAT(
        SUBSTRING(th.datex, 1, 4), '-',  -- استخراج السنة من datex
        LPAD(CAST(th.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
    ) AS referenceconcat,
    th.total_value,
    COALESCE(th.general_note, '') as general_note, 
    th.datex,
    th.account_id as vendor_id,
    ah1.account_name as vendor_name,
    '' AS is_invoiced,
    th.is_row_note_show,
    th.is_row_dicount_show,
     th.invoice_id,
    CONCAT(
        SUBSTRING(th_invoice.datex, 1, 4), '-',  -- استخراج السنة من datex
        LPAD(CAST(th_invoice.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
    ) AS invoice_reference
from
    transaction_header th
left join accounts_header ah1 on ah1.id = th.account_id
left join accounts_header ah2 on ah2.id = th.salesman_id
left join transaction_header th_invoice on th_invoice.invoice_id = th.id 

where
    th.company_id = $1
    AND th.transaction_type = 7
    AND (th.datex BETWEEN $2 AND $3) -- التأكد أن القيم بين التواريخ النصية تعمل بشكل صحيح
    AND th.is_deleted IS NULL
ORDER BY
    th.datex DESC,
    th.reference DESC
    ;
`;

    let data = await db.any(query1, [req.session.company_id,posted_elements.start_date, posted_elements.end_date]);

    res.json(data);
  } catch (error) {
    console.error("Error get_purshases_returns_Data_view:", error);
    res.status(500).send("Error:");
  }
});

app.post("/get_data_for_purshases_returns_add", async (req, res) => {
  try {
    // //! Permission
    await permissions(req, "purshases_returns_add", "add");
    if (!permissions) {
      return;
    }

    //* Start--------------------------------------------------------------
    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");

    let query1 = `
     -- مواقع المخزون
select
  id as id,
  account_name as account_name
from
  accounts_header 
WHERE company_id = $1 
  AND account_type_id = 7
  ;
`;
let params1 = [req.session.company_id]

/*
let query2 = `
  select
  id as id,
  account_name as account_name
from
  accounts_header 
WHERE company_id = $1 
  AND account_type_id = 4
  AND is_final_account IS true
  and is_salesman IS true
  AND is_inactive IS null
  ;
`
let params2 = [req.session.company_id]
*/

let query3 = `
    select 
  th.id,
  th.taxe_package_name as account_name
from
   settings_tax_header th
where
  th.company_id = $1
  and th.is_inactive is null
order by
  th.taxe_package_name asc 
 
`
let params3 = [req.session.company_id]

let query4 = `
select
    tb.id,
    tb.tax_name,
    tb.tax_rate,
    tb.is_tax_reverse,
    tb.tax_account_id,
    ah.account_name,
    tb.settings_tax_header_id
from
    settings_tax_body tb
left join accounts_header ah on ah.id = tb.tax_account_id    
where
    tb.settings_tax_header_id = ANY($1::int[])
`;


let query5 = `
SELECT
ah.id,
ah.account_name,
ah.account_type_id,
COALESCE(ah.item_unite, 'الكمية') as item_unite,
ah.item_revenue_account,
ah_revenue.account_name as revenue_account_name,
ah.item_expense_account,
ah_expense.account_name as expense_account_name,
ah.item_sales_price,
ah.item_purshas_price
FROM
accounts_header ah
left join accounts_header ah_revenue on ah_revenue.id = ah.item_revenue_account
left join accounts_header ah_expense on ah_expense.id = ah.item_expense_account
WHERE
ah.company_id = $1
AND ah.is_final_account = true
AND ah.account_type_id IN (5, 8)
AND ah.is_inactive IS NULL
`;

let params5 = [req.session.company_id];


let query6 = `
select
  ah.id,
  ah.account_name
from
  accounts_header ah
where
  ah.company_id = $1
  AND ah.is_final_account is true
  AND is_inactive is null
  AND (ah.account_type_id = 3 or ah.is_allow_to_buy_and_sell is true);`

  let params6 = [req.session.company_id];


 let query8 = `
 select 
   th.id,
       CONCAT(
         SUBSTRING(th.datex, 1, 4), '-',  -- استخراج السنة من datex
         LPAD(CAST(th.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
     ) AS account_name
 from
   transaction_header th
 where
   th.transaction_type = 6 -- فواتير المشتريات
   and th.company_id = $1
   and th.is_deleted is NULL;
    ` 
    let params8 = [req.session.company_id]

await db.tx(async (tx) => {

  const itemslocationsArray = await tx.any(query1, params1);
  // const salesmanArray = await tx.any(query2, params2);
  const taxHeaderArray = await tx.any(query3, params3);
  const settings_tax_header_id_Array = taxHeaderArray.map(row => row.id);  // استخراج IDs من الاستعلام الثالث
  const taxBodyArray = await tx.any(query4, [settings_tax_header_id_Array]);  // تمرير القائمة إلى الاستعلام الرابع
  const itemsDataArray = await tx.any(query5, params5);
  const vendorsDataArray = await tx.any(query6, params6);
  const purshasesInvoiceReferencesArray = await tx.any(query8, params8);

  const postedData = { itemslocationsArray, taxHeaderArray, taxBodyArray, itemsDataArray, vendorsDataArray, purshasesInvoiceReferencesArray };
  res.json(postedData);
})


    await last_activity(req)
  } catch (error) {
    await last_activity(req)
    console.error("Error while get_data_for_purshases_returns_add", error);
    res.join;
    res
      .status(500)
      .json({ success: false, message_ar: "Error while get_data_for_purshases_returns_add" });
  }
});

app.post("/api/purshases_returns_update", async (req, res) => {
  try {

    // //! Permission معلق
    await permissions(req, "purshases_returns_permission", "update");
    if (!permissions) {
      return res.status(403).json({
        success: false,
        message_ar: "ليس لديك الصلاحيات المطلوبة للقيام بهذه العملية.",
      });
    }




    const posted_elements = req.body;
    const transaction_type = 7 // مرتجع المبيعات 4
    let items_array = []
  

    //! sql injection check
    let hasBadSymbols = sql_anti_injection([
      ...posted_elements.posted_array.map((obj) => obj.item_typeId + obj.item_id + obj.row_note + obj.row_amount + obj.row_unitPrice + obj.row_discountTypeId + obj.row_discountValue + obj.row_taxHeaderId), // تحويل كل عنصر في dataArray إلى سلسلة نصية ودمجها معاً
      posted_elements.x,
      posted_elements.vendorId,
      posted_elements.total,
      posted_elements.datex,
      posted_elements.invoiceReferenceId,
      posted_elements.itemLocationId,
      posted_elements.is_RowNote,
      posted_elements.is_RowDiscount,
      posted_elements.general_note,
      posted_elements.location_name,
      // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
    ]);
    if (hasBadSymbols) {
      return res.json({
        success: false,
        message_ar: sql_injection_message_ar,
        message_en: sql_injection_message_en,
      });
    }


    const InValidDateFormat = isInValidDateFormat([posted_elements.datex]);
    if (InValidDateFormat) {
      return res.status(400).json({
        success: false,
        message_ar: InValidDateFormat_message_ar,
      });
    }

    //! settings
    const settings = await check_settings_validation({
      check_futureDate: true,
      check_closingDate: true,
      datex: posted_elements.datex,
      type: 'update',
      tableName: 'transaction_header', // if type = 'update' or 'delete' only
      transaction_id: posted_elements.x, // if type = 'update' or 'delete' only
    }, req);

    
    if (!settings.valid) {
      return res.json({
        success: false,
        message_ar: settings.message_ar,
      });
    }

    turn_EmptyValues_TO_null(posted_elements);

    

    //* Start Transaction --------------------------------------------------

   const total = +posted_elements.total

   if (!total || isNaN(total)){
    await block_user(req,'Spru001')
    return res.json({
      success: false,
      xx: true,
      message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
    });
   }


// //! Security hacking  accounts id

   // check qutationReferenceId

   let query_1 = `select reference from transaction_header where id = $1 AND company_id = $2 AND transaction_type = 7 AND is_deleted IS NULL`
   const result_1 = await db.oneOrNone(query_1,[posted_elements.x, req.session.company_id])
   if (!result_1){
    await block_user(req,'Spqu02')
    return res.json({
      success: false,
      xx: true,
      message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
    });
   }


   //! check sales purshases reference if exist
    let query05;
    let rows05;
    if (posted_elements.orderReferenceId){
      query05 = `select count(id) as salesReturnsReferenceCount from transaction_header where id = $1 and company_id = $2 and transaction_type = 6 and is_deleted IS NULL`
      rows05 = await db.oneOrNone(query05, [posted_elements.invoiceReferenceId, req.session.company_id])
     if (rows05.salesReturnsReferenceCount === 0){
       await block_user(req,'Sprau04')
       return res.json({
         success: false,
         xx: true,
         message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
       });
     }
     }

// جلب الحسابات من قاعدة البيانات
let query02 = `SELECT id, account_type_id, is_salesman FROM accounts_header WHERE company_id = $1 AND is_inactive is null`;
let rows02 = await db.any(query02, [req.session.company_id]);

// تحويل النتائج إلى مصفوفة للتسهيل في الفحص
const dbAccounts = rows02.map(row => ({
  id: parseInt(row.id),
  account_type_id: row.account_type_id
  // is_salesman: row.is_salesman
}));

//check salesman


/*
const count_salesman = dbAccounts.some(row => +row.id === +posted_elements.salesmanId && +row.account_type_id === 4 && row.is_salesman === true);
  // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
  if (!count_salesman) {
    await block_user(req,'Ssru05')
    return res.json({
      success: false,
      xx: true,
      message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
    });
  }
*/

const count_itemLocation = dbAccounts.some(row => +row.id === +posted_elements.itemLocationId && +row.account_type_id === 7);
  // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
  if (!count_itemLocation) {
    await block_user(req,'Spru06')
    return res.json({
      success: false,
      xx: true,
      message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
    });
  }


// المرور على كل كائن في posted_elements.posted_array
for (const rowData of posted_elements.posted_array) {
  const item_typeId = rowData.item_typeId;
  const item_id = rowData.item_id;


  //! make sure from every account_id
  const accountExists = dbAccounts.some(item => 
    +item.id === +item_id && +item.account_type_id === +item_typeId
  );

  // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
  if (!accountExists) {
    await block_user(req,'Spru07')
    return res.json({
      success: false,
      xx: true,
      message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
    });
  }

  items_array.push(+rowData.item_id)
}


    // جلب من قاعدة البيانات
    let query03 = `SELECT id FROM settings_tax_header WHERE company_id = $1`;
    let rows03 = await db.any(query03, [req.session.company_id]);
    
    // تحويل النتائج إلى مصفوفة للتسهيل في الفحص
    const dbTaxesHeaderArray = rows03.map(row => ({
      id: parseInt(row.id)
    }));
    

    // المرور على كل كائن في posted_elements.posted_array
    for (const rowData of posted_elements.posted_array) {
      const row_taxHeaderId = rowData.row_taxHeaderId;
      
      if (row_taxHeaderId){
      //! make sure from every account_id
      const taxExists = dbTaxesHeaderArray.some(item =>
        +item.id === +row_taxHeaderId
      );
      
      // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
      if (!taxExists) {
        await block_user(req,'Spqr08')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }
    }
    }


    //! فحص الجرد الكميات حسب الموقع
    const query_items = `
     select 
    tb.item_id,
    sum(
      case 
        when tb.debit > 0 then tb.item_amount else tb.item_amount *-1
      end
      
    ) as current_location_amount
  from
    transaction_body tb
inner join transaction_header th on th.id = tb.transaction_header_id
where 
  th.company_id = $1
  and th.is_deleted is null
  and th.is_including_items is TRUE
  and th.id != $2
  and tb.item_id IN (${items_array.join(',')})
  and tb.item_location_id_tb = $3
  and th.datex <= $4
group by
  tb.item_id;
    `
    const items_amount_location = await db.any(query_items,[req.session.company_id, posted_elements.x, +posted_elements.itemLocationId, posted_elements.datex])

    
    const year = getYear(posted_elements.datex)

    // const items_avg = await get_last_avg_cost(items_array, posted_elements.datex, req)
    // تنفيذ معاملة قاعدة البيانات
    await db.tx(async (tx) => {

      let query1 = `update transaction_header
                    set total_value = $1,
                      general_note = $2,
                      datex = $3,
                      account_id = $4,
                      is_row_dicount_show = $5,
                      is_row_note_show = $6,
                      items_location_id = $7,
                      invoice_id = $8
                    Where
                      id = $9
                      AND company_id = $10
                    ;`;

      await tx.none(query1, [
        total.toFixed(2),
        posted_elements.general_note,
        posted_elements.datex,
        posted_elements.vendorId,
        posted_elements.is_RowDiscount ? true : null,
        posted_elements.is_RowNote ? true : null,
        posted_elements.itemLocationId,
        posted_elements.invoiceReferenceId,
        posted_elements.x,
        req.session.company_id
      ]);

      const query_delete = `delete from transaction_body where transaction_header_id = $1`
      await tx.none(query_delete,[posted_elements.x])

      let global_stock_id = await tx.oneOrNone(`select id from accounts_header ah where ah.company_id = 1 and ah.global_id = 12`, [req.session.company_id])
      let DeafultAccounts = await tx.any('select id, item_revenue_account, item_expense_account from accounts_header where is_final_account = true and company_id = $1 and is_inactive IS NULL',[req.session.company_id])
      let taxBodyArray = await tx.any('select id, tax_rate, is_tax_reverse, tax_account_id, settings_tax_header_id from settings_tax_body')

      let other_posted_array = []
      let Val_beforTax = 0
      let taxValue = 0
      let TotalValue = 0
      let newId_transaction_body = await newId_fn("transaction_body",'id');
      let insertData2 = []
      for (const element of posted_elements.posted_array) {
        const newId = parseInt(newId_transaction_body);

        //! make sure if account id != item  then location and amount = null

        if(isNaN(+element.row_amount) || isNaN(+element.row_unitPrice)){
          await block_user(req,'Ssra3')
          throw new Error(
            'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق'
          );
        }

        
        //! check amount
        const current_location_amount_data = items_amount_location.find(item => +item.item_id === +element.item_id);
        const db_amount = +(current_location_amount_data?.current_location_amount || 0);
        const result_amount = db_amount - +element.row_amount;
          
        if (isNaN(result_amount) || result_amount <= 0) {       
          throw new Error(
            `لا يوجد رصيد كافى فى موقع ${posted_elements.location_name} للصنف ${element.item_name}`
          );
        }
        
        
       const rowDiscountType = +element.row_discountTypeId || 0
       const rowDiscountValue= +element.row_discountValue || 0
       const rowAmount = +element.row_amount || 0
       const rowUnitePrice = +element.row_unitPrice || 0

        const Xrow_discount_value =
        rowDiscountType === 1
            ? +((rowDiscountValue / 100) * (rowAmount * rowUnitePrice))
            : +rowDiscountValue;
            Val_beforTax = +((rowAmount * rowUnitePrice) - Xrow_discount_value).toFixed(2);
            TotalValue += Val_beforTax
            
           /*
            let cogs = null 
            if (+element.item_typeId === 5){
              x = items_avg.find(item => +item.item_id === element.item_id)
              if (x){
                cogs = (+element.row_amount * +x.avg)*-1
              }
            }
          */



        let account_id
        if (+element.item_typeId === 5){
          account_id = +global_stock_id.id
        }else{
          const account_row = DeafultAccounts.find(item => +item.id === element.item_id);
        
          if (!account_row){
            await block_user(req,'Spia4')
            throw new Error(
              'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق'
            );
          }
          account_id = +account_row.item_expense_account 
        }
        

        insertData2.push([
          newId,
          posted_elements.x,
          null,
          +Val_beforTax,
          element.row_note,
          +element.row_amount,
          +element.row_unitPrice,
          +account_id,
          +element.row_discountTypeId === 1 ? true : null,
          element.row_discountValue || null,
          element.row_taxHeaderId || null,
          null,
          null,
          +element.item_typeId === 5? element.item_id : null,
          +element.item_typeId === 5? posted_elements.itemLocationId : null
        ]);

        //! check if has taxHeader
        if (element.row_taxHeaderId){
          const taxesbodyArray = taxBodyArray.filter(item => +item.settings_tax_header_id === +element.row_taxHeaderId)
          if (taxesbodyArray){
            for (const row of taxesbodyArray){
              const taxRate = +row.tax_rate /100
              const taxMultiplier = row.is_tax_reverse ? -1 : 1;
              taxValue = +(Val_beforTax * taxRate * taxMultiplier).toFixed(2);
              TotalValue += taxValue

              const newObject = {
                taxBodyId: row.id,
                taxHeaderId: row.settings_tax_header_id,
                debit: taxValue > 0 ? taxValue : null,
                credit: taxValue < 0 ? taxValue*-1 : null,
                account_id: row.tax_account_id,
                is_tax: true
              }
              other_posted_array.push(newObject)
            }
          }
        }

        newId_transaction_body = parseInt(newId_transaction_body) + 1;
      }

        

      //! add vendor row to transaction
      const newObject = {
        taxBodyId: null,
        taxHeaderId: null,
        debit: TotalValue > 0 ? TotalValue : null,
        credit: TotalValue < 0 ? TotalValue*-1 : null,
        account_id: posted_elements.vendorId,
        is_tax: null
      }
      other_posted_array.push(newObject)

      //! insert the other part to transaction
      for (const object of other_posted_array){
        const newId = parseInt(newId_transaction_body);


        insertData2.push([
        newId,
        posted_elements.x,
        +object.debit || null,
        +object.credit || null,
        null,
        null,
        null,
        +object.account_id,
        null,
        null,
        +object.taxHeaderId || null,
        +object.taxBodyId || null,
        object.is_tax,
        null,
        null
        ]);

        newId_transaction_body = parseInt(newId_transaction_body) + 1;
      }

      let query2 = `INSERT INTO transaction_body
      (id, transaction_header_id, debit, credit, row_note, item_amount, item_price, account_id,  is_discount_percentage, dicount_value, settings_tax_header_id, settings_tax_body_id, is_tax, item_id, item_location_id_tb)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);`;

      // استخدم tx.batch بدلاً من tx.none
      await tx.batch(insertData2.map(data => tx.none(query2, data)));


      //! history
      await update_items_cogs(items_array,posted_elements.datex, req, tx)
      await history(transaction_type,2,posted_elements.x,result_1.reference,req,tx);
    });

    // await update_items_cogs(req,items_array,posted_elements.datex)
    const new_referenceFormatting = formatFromFiveDigits(result_1.reference);
    await last_activity(req);
    // إذا تم تنفيذ جميع الاستعلامات بنجاح
    return res.json({
      success: true,
      message_ar: `تم تعديل  مرتجع المشتريات بمرجع : ${new_referenceFormatting}-${year}`,
    });
  } catch (error) {
    await last_activity(req);
    console.error("Error purshases_returns_update:", error);

    // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
    return res.json({
      success: false,
      message_ar: error.message,
    });
  }
});

app.post("/api/purshases_returns_add", async (req, res) => {
  try {

    
    //! Permission معلق
    await permissions(req, "purshases_returns_permission", "add");
    if (!permissions) {
      return res.status(403).json({
        success: false,
        message_ar: "ليس لديك الصلاحيات المطلوبة للقيام بهذه العملية.",
      });
    }




    const posted_elements = req.body;
    const transaction_type = 7 // sales_returns
    let items_array = []
  

    //! sql injection check
    let hasBadSymbols = sql_anti_injection([
      ...posted_elements.posted_array.map((obj) => obj.item_typeId + obj.item_id + obj.row_note + obj.row_amount + obj.row_unitPrice + obj.row_discountTypeId + obj.row_discountValue + obj.row_taxHeaderId), // تحويل كل عنصر في dataArray إلى سلسلة نصية ودمجها معاً
      posted_elements.vendorrId,
      posted_elements.total,
      posted_elements.datex,
      posted_elements.invoiceReferenceId,
      posted_elements.itemLocationId,
      // posted_elements.salesmanId,
      posted_elements.is_RowNote,
      posted_elements.is_RowDiscount,
      posted_elements.general_note,
      posted_elements.location_name,
      // يمكنك إضافة المزيد من القيم هنا إذا لزم الأمر
    ]);
    if (hasBadSymbols) {
      return res.json({
        success: false,
        message_ar: sql_injection_message_ar,
        message_en: sql_injection_message_en,
      });
    }


    const InValidDateFormat = isInValidDateFormat([posted_elements.datex]);
    if (InValidDateFormat) {
      return res.status(400).json({
        success: false,
        message_ar: InValidDateFormat_message_ar,
      });
    }

    //! settings
    const settings = await check_settings_validation({
      check_futureDate: true,
      check_closingDate: true,
      datex: posted_elements.datex,
      type: 'add',
      tableName: false, // if type = 'update' or 'delete' only
      transaction_id: false, // if type = 'update' or 'delete' only
    }, req);

    
    if (!settings.valid) {
      return res.json({
        success: false,
        message_ar: settings.message_ar,
      });
    }

    turn_EmptyValues_TO_null(posted_elements);

    

    //* Start Transaction --------------------------------------------------

   const total = +posted_elements.total

   if (!total || isNaN(total)){
    await block_user(req,'Spra001')
    return res.json({
      success: false,
      xx: true,
      message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
    });
   }


// //! Security hacking  accounts id

   // check qutationReferenceId

    let query05;
    let rows05;
    if (posted_elements.invoiceReferenceId){
      query05 = `select count(id) as purshasesReturnsReferenceCount from transaction_header where id = $1 and company_id = $2 and transaction_type = 6 and is_deleted IS NULL`
      rows05 = await db.oneOrNone(query05, [posted_elements.invoiceReferenceId, req.session.company_id])
     if (rows05.purshasesReturnsReferenceCount === 0){
       await block_user(req,'Ssra02')
       return res.json({
         success: false,
         xx: true,
         message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
       });
     }
     }

// جلب الحسابات من قاعدة البيانات
let query02 = `SELECT id, account_type_id, is_salesman FROM accounts_header WHERE company_id = $1 AND is_inactive is null`;
let rows02 = await db.any(query02, [req.session.company_id]);

// تحويل النتائج إلى مصفوفة للتسهيل في الفحص
const dbAccounts = rows02.map(row => ({
  id: parseInt(row.id),
  account_type_id: row.account_type_id
  // is_salesman: row.is_salesman
}));

//check salesman

/*
 const count_salesman = dbAccounts.some(row => +row.id === +posted_elements.salesmanId && +row.account_type_id === 4 && row.is_salesman === true);

  // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
  if (!count_salesman) {
    await block_user(req,'Spra03')
    return res.json({
      success: false,
      xx: true,
      message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
    });
  }
*/

const count_itemLocation = dbAccounts.some(row => +row.id === +posted_elements.itemLocationId && +row.account_type_id === 7);

  // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
  if (!count_itemLocation) {
    await block_user(req,'Spra04')
    return res.json({
      success: false,
      xx: true,
      message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
    });
  }


// المرور على كل كائن في posted_elements.posted_array
for (const rowData of posted_elements.posted_array) {
  const item_typeId = rowData.item_typeId;
  const item_id = rowData.item_id;


  //! make sure from every account_id
  const accountExists = dbAccounts.some(item => 
    +item.id === +item_id && +item.account_type_id === +item_typeId
  );

  // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
  if (!accountExists) {
    await block_user(req,'Spra05')
    return res.json({
      success: false,
      xx: true,
      message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
    });
  }

  items_array.push(+rowData.item_id)
}


    // جلب من قاعدة البيانات
    let query03 = `SELECT id FROM settings_tax_header WHERE company_id = $1`;
    let rows03 = await db.any(query03, [req.session.company_id]);
    
    // تحويل النتائج إلى مصفوفة للتسهيل في الفحص
    const dbTaxesHeaderArray = rows03.map(row => ({
      id: parseInt(row.id)
    }));
    

    // المرور على كل كائن في posted_elements.posted_array
    for (const rowData of posted_elements.posted_array) {
      const row_taxHeaderId = rowData.row_taxHeaderId;
      
      if (row_taxHeaderId){
      //! make sure from every account_id
      const taxExists = dbTaxesHeaderArray.some(item =>
        +item.id === +row_taxHeaderId
      );
      

    
      // إذا لم يوجد الحساب، اوقف الكود وأرسل رسالة
      if (!taxExists) {
        await block_user(req,'Spra6')
        return res.json({
          success: false,
          xx: true,
          message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
        });
      }
    }
    }


    //! فحص الجرد الكميات حسب الموقع
    const query_items = `
     select 
    tb.item_id,
    sum(
      case 
        when tb.debit > 0 then tb.item_amount else tb.item_amount *-1
      end
    ) as current_location_amount
  from
    transaction_body tb
inner join transaction_header th on th.id = tb.transaction_header_id
where 
  th.company_id = $1
  and th.is_deleted is null
  and th.is_including_items is TRUE
  and tb.item_id IN (${items_array.join(',')})
  and tb.item_location_id_tb = $2
  and th.datex <= $3
group by
  tb.item_id;
    `
       const items_amount_location = await db.any(query_items,[req.session.company_id, +posted_elements.itemLocationId, posted_elements.datex])
    
    const newId_transaction_header = await newId_fn("transaction_header", 'id');
    const year = getYear(posted_elements.datex)
    // const newReference_transaction_header = await newReference_fn('transaction_header', year, req);
    const newReference_transaction_header = await newReference_transaction_header_fn('transaction_header',transaction_type, year, req);
    const newId_general_reference = await newId_fn("transaction_header", 'general_reference');

    // const items_avg = await get_last_avg_cost(items_array, posted_elements.datex, req)
    
    // تنفيذ معاملة قاعدة البيانات
    await db.tx(async (tx) => {

      let query1 = `INSERT INTO transaction_header
                    (id, reference, company_id, transaction_type, total_value, general_note, datex, account_id, is_row_dicount_show, is_row_note_show, items_location_id, invoice_id, general_reference, is_including_items)
                    VALUES($1, $2, $3, $4, $5, $6, $7 , $8 , $9 , $10 , $11 , $12, $13, $14);`;

      await tx.none(query1, [
        newId_transaction_header,
        newReference_transaction_header,
        req.session.company_id,
        transaction_type,
        total.toFixed(2),
        posted_elements.general_note,
        posted_elements.datex,
        posted_elements.vendorId,
        posted_elements.is_RowDiscount ? true : null,
        posted_elements.is_RowNote ? true : null,
        posted_elements.itemLocationId,
        posted_elements.invoiceReferenceId,
        newId_general_reference,
        true
      ]);

      let global_stock_id = await tx.oneOrNone(`select id from accounts_header ah where ah.company_id = 1 and ah.global_id = 12`, [req.session.company_id])
      let DeafultAccounts = await tx.any('select id, item_revenue_account, item_expense_account from accounts_header where is_final_account = true and company_id = $1 and is_inactive IS NULL',[req.session.company_id])
      let taxBodyArray = await tx.any('select id, tax_rate, is_tax_reverse, tax_account_id, settings_tax_header_id from settings_tax_body')

      let other_posted_array = []
      let Val_beforTax = 0
      let taxValue = 0
      let TotalValue = 0
      let newId_transaction_body = await newId_fn("transaction_body",'id');
      let insertData2 = []
      for (const element of posted_elements.posted_array) {
        const newId = parseInt(newId_transaction_body);

        //! make sure if account id != item  then location and amount = null

        if(isNaN(+element.row_amount) || isNaN(+element.row_unitPrice)){
          await block_user(req,'Spra7')
          throw new Error(
            'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق'
          );
        }

       
        //! check amount
        const current_location_amount_data = items_amount_location.find(item => +item.item_id === +element.item_id);
        const db_amount = +(current_location_amount_data?.current_location_amount || 0);
        const result_amount = db_amount - +element.row_amount;
          
        if (isNaN(result_amount) || result_amount <= 0) {       
          throw new Error(
            `لا يوجد رصيد كافى فى موقع ${posted_elements.location_name} للصنف ${element.item_name}`
          );
        }
       
        
       const rowDiscountType = +element.row_discountTypeId || 0
       const rowDiscountValue= +element.row_discountValue || 0
       const rowAmount = +element.row_amount || 0
       const rowUnitePrice = +element.row_unitPrice || 0

        const Xrow_discount_value =
        rowDiscountType === 1
            ? +((rowDiscountValue / 100) * (rowAmount * rowUnitePrice))
            : +rowDiscountValue;
            Val_beforTax = +((rowAmount * rowUnitePrice) - Xrow_discount_value).toFixed(2);
            TotalValue += Val_beforTax
            
          //  let cogs = null 
          // if (+element.item_typeId === 5){
          //   x = items_avg.find(item => +item.item_id === element.item_id)
          //   if (x){
          //     cogs = (+element.row_amount * +x.avg)*-1
          //   }
          // }

          



        let account_id
        if (+element.item_typeId === 5){
          account_id = +global_stock_id.id
        }else{
          const account_row = DeafultAccounts.find(item => +item.id === element.item_id);
          if (!account_row){
            await block_user(req,'Spra8')
            throw new Error(
              'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق'
            );
          }

          account_id = +account_row.item_expense_account 
        }

        insertData2.push([
          newId,
          newId_transaction_header,
          null,
          +Val_beforTax,
          element.row_note,
          +element.row_amount,
          +element.row_unitPrice,
          +account_id,
          +element.row_discountTypeId === 1 ? true : null,
          element.row_discountValue || null,
          element.row_taxHeaderId || null,
          null,
          null,
          +element.item_typeId === 5? element.item_id : null,
          +element.item_typeId === 5? posted_elements.itemLocationId : null
        ]);

        //! check if has taxHeader
        if (element.row_taxHeaderId){
          const taxesbodyArray = taxBodyArray.filter(item => +item.settings_tax_header_id === +element.row_taxHeaderId)
          if (taxesbodyArray){
            for (const row of taxesbodyArray){
              const taxRate = +row.tax_rate /100
              const taxMultiplier = row.is_tax_reverse ? -1 : 1;
              taxValue = +(Val_beforTax * taxRate * taxMultiplier).toFixed(2);
              TotalValue += taxValue

              const newObject = {
                taxBodyId: row.id,
                taxHeaderId: row.settings_tax_header_id,
                debit: taxValue < 0 ? taxValue*-1 : null,
                credit: taxValue > 0 ? taxValue : null,
                account_id: row.tax_account_id,
                is_tax: true
              }
              other_posted_array.push(newObject)
            }
          }
        }

        newId_transaction_body = parseInt(newId_transaction_body) + 1;
      }

        

      //! add vendor row to transaction
      const newObject = {
        taxBodyId: null,
        taxHeaderId: null,
        debit: TotalValue > 0 ? TotalValue : null,
        credit: TotalValue < 0 ? TotalValue*-1 : null,
        account_id: posted_elements.vendorId,
        is_tax: null
      }
      other_posted_array.push(newObject)

      //! insert the other part to transaction
      for (const object of other_posted_array){
        const newId = parseInt(newId_transaction_body);


        insertData2.push([
        newId,
        newId_transaction_header,
        +object.debit || null,
        +object.credit || null,
        null,
        null,
        null,
        +object.account_id,
        null,
        null,
        +object.taxHeaderId || null,
        +object.taxBodyId || null,
        object.is_tax,
        null,
        null
        ]);

        newId_transaction_body = parseInt(newId_transaction_body) + 1;
      }

      let query2 = `INSERT INTO transaction_body
      (id, transaction_header_id, debit, credit, row_note, item_amount, item_price, account_id, is_discount_percentage, dicount_value, settings_tax_header_id, settings_tax_body_id, is_tax, item_id, item_location_id_tb)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);`;

      // استخدم tx.batch بدلاً من tx.none
      await tx.batch(insertData2.map(data => tx.none(query2, data)));

      //! history
      await update_items_cogs(items_array,posted_elements.datex, req, tx)
      await history(transaction_type,1,newId_transaction_header,newReference_transaction_header,req,tx);
    });

    // await update_items_cogs(req,items_array,posted_elements.datex)
    const new_referenceFormatting = formatFromFiveDigits(newReference_transaction_header);
    await last_activity(req);
    // إذا تم تنفيذ جميع الاستعلامات بنجاح
    return res.json({
      success: true,
      message_ar: `تم إنشاء مرتجع مشتريات بمرجع : ${new_referenceFormatting}-${year}`,
    });
  } catch (error) {
    await last_activity(req);
    console.error("Error adding purshases returns:", error);

    // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
    return res.json({
      success: false,
      message_ar: error.message,
    });
  }
});

app.post("/get_data_for_purshases_returns_update", async (req, res) => {
  try {
    //! Permission معلق
    await permissions(req, "purshases_returns_permission", "update");
    if (!permissions) {
      return;
    }

    
    const posted_elements = req.body;
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
    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");

    const transaction_type = 7 // مرتجع المشتريات

    

    let query1 = `
     -- مواقع المخزون
select
  id as id,
  account_name as account_name
from
  accounts_header 
WHERE company_id = $1 
  AND account_type_id = 7
  AND is_inactive IS NULL
  ;
`;
let params1 = [req.session.company_id]

/*
let query2 = `
  select
  id as id,
  account_name as account_name
from
  accounts_header 
WHERE company_id = $1 
  AND account_type_id = 4
  AND is_final_account IS true
  and is_salesman IS true
  AND is_inactive IS null
  ;
`
let params2 = [req.session.company_id]
*/

let query3 = `
    select 
  th.id,
  th.taxe_package_name as account_name
from
   settings_tax_header th
where
  th.company_id = $1
  and th.is_inactive is null
order by
  th.taxe_package_name asc 
 
`
let params3 = [req.session.company_id]

let query4 = `
select
    tb.id,
    tb.tax_name,
    tb.tax_rate,
    tb.is_tax_reverse,
    tb.tax_account_id,
    ah.account_name,
    tb.settings_tax_header_id
from
    settings_tax_body tb
left join accounts_header ah on ah.id = tb.tax_account_id    
where
    tb.settings_tax_header_id = ANY($1::int[])
    AND ah.is_inactive IS NULL
`;


let query5 = `
SELECT
ah.id,
ah.account_name,
ah.account_type_id,
COALESCE(ah.item_unite, 'الكمية') as item_unite,
ah.item_revenue_account,
ah_revenue.account_name as revenue_account_name,
ah.item_expense_account,
ah_expense.account_name as expense_account_name,
ah.item_sales_price,
ah.item_purshas_price
FROM
accounts_header ah
left join accounts_header ah_revenue on ah_revenue.id = ah.item_revenue_account
left join accounts_header ah_expense on ah_expense.id = ah.item_expense_account
WHERE
ah.company_id = $1
AND ah.is_final_account = true
AND ah.account_type_id IN (5, 8)
AND ah.is_inactive IS NULL
`;

let params5 = [req.session.company_id];


let query6 = `
select
  ah.id,
  ah.account_name
from
  accounts_header ah
where
  ah.company_id = $1
  AND ah.is_final_account is true
  AND is_inactive is null
  AND (ah.account_type_id = 3 or ah.is_allow_to_buy_and_sell is true);`

  let params6 = [req.session.company_id];


let query7 = `
select 
  th.id,
  th.reference,
  th.general_note,
  th.datex,
  th.due_date,
  th.account_id,
  th.invoice_id,
  th.is_delivered,
  th.items_location_id,
  th.is_row_note_show,
  th.is_row_dicount_show,
  CONCAT(
    SUBSTRING(th.datex, 1, 4), '-',  -- استخراج السنة من datex
    LPAD(CAST(th.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
  ) AS referenceconcat,
  CONCAT(
    SUBSTRING(th_invoice.datex, 1, 4), '-',  -- استخراج السنة من datex
    LPAD(CAST(th_invoice.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
  ) AS referenceconcat_invoice
from
  transaction_header th
left join transaction_header th_invoice on th_invoice.id = th.invoice_id
where 
th.id = $1
and th.company_id = $2
and th.transaction_type = $3
AND th.is_deleted IS NULL
`
let params7 = [posted_elements.x, req.session.company_id, transaction_type];

let query8 = `
select
  tb.id,
  tb.item_id,
    ah.account_name,
    ah.item_unite,
    ah.account_type_id as item_type_id,
  tb.item_amount as amount,
  tb.item_price as unite_price,
  COALESCE(tb.row_note, '') as row_note,
  tb.is_discount_percentage,
  tb.dicount_value,
  tb.settings_tax_header_id as tax_header_id,
    sth.taxe_package_name
from
  transaction_body tb
LEFT JOIN accounts_header ah on ah.id = tb.item_id
LEFT JOIN settings_tax_header sth on sth.id = tb.settings_tax_header_id
left join account_type at on at.id = ah.account_type_id
where 
  tb.transaction_header_id = $1
  AND tb.item_id is NOT NULL
  ;
`
let params8 = [posted_elements.x]


let query9 = `
select 
  th.id,
      CONCAT(
        SUBSTRING(th.datex, 1, 4), '-',  -- استخراج السنة من datex
        LPAD(CAST(th.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
    ) AS account_name
from
  transaction_header th
where
  th.transaction_type = 6 -- فواتير المشتريات
  and th.company_id = $1
  and th.account_id = $2
  and th.is_deleted is NULL
   ` 

   let params9 = [req.session.company_id, posted_elements.vendor_id]


await db.tx(async (tx) => {

  const itemslocationsArray = await tx.any(query1, params1);
  // const salesmanArray = await tx.any(query2, params2);
  const taxHeaderArray = await tx.any(query3, params3);
  const settings_tax_header_id_Array = taxHeaderArray.map(row => row.id);  // استخراج IDs من الاستعلام الثالث
  const taxBodyArray = await tx.any(query4, [settings_tax_header_id_Array]);  // تمرير القائمة إلى الاستعلام الرابع
  const itemsDataArray = await tx.any(query5, params5);
  const vendorsDataArray = await tx.any(query6, params6);
  const headerData = await tx.oneOrNone(query7, params7);
  const bodyData = await tx.any(query8, params8);
  const purshasesInvoiceReferencesArray = await tx.any(query9, params9);

  const postedData = {itemslocationsArray, taxHeaderArray, taxBodyArray, itemsDataArray, vendorsDataArray, headerData, bodyData, purshasesInvoiceReferencesArray};
  res.json(postedData);
})


    await last_activity(req)
  } catch (error) {
    await last_activity(req)
    console.error("Error while get_data_for_purshases_returns_update", error);
    res.join;
    res
      .status(500)
      .json({ success: false, message_ar: "Error while get_data_for_purshases_returns_update"});
  }
});

app.post("/get_data_for_purshasesInvoiceToreturns", async (req, res) => {
  try {
    //! Permission معلق
    await permissions(req, "purshases_returns_permission", "add");
    if (!permissions) {
      return;
    }

    
    const posted_elements = req.body;
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
    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");

    const transaction_type = 7


    let query1 = `
     -- مواقع المخزون
select
  id as id,
  account_name as account_name
from
  accounts_header 
WHERE company_id = $1 
  AND account_type_id = 7
  AND is_inactive IS NULL
  ;
`;
let params1 = [req.session.company_id]

/*
let query2 = `
  select
  id as id,
  account_name as account_name
from
  accounts_header 
WHERE company_id = $1 
  AND account_type_id = 4
  AND is_final_account IS true
  and is_salesman IS true
  AND is_inactive IS null
  ;
`
let params2 = [req.session.company_id]
*/

let query3 = `
    select 
  th.id,
  th.taxe_package_name as account_name
from
   settings_tax_header th
where
  th.company_id = $1
  and th.is_inactive is null
order by
  th.taxe_package_name asc 
 
`
let params3 = [req.session.company_id]

let query4 = `
select
    tb.id,
    tb.tax_name,
    tb.tax_rate,
    tb.is_tax_reverse,
    tb.tax_account_id,
    ah.account_name,
    tb.settings_tax_header_id
from
    settings_tax_body tb
left join accounts_header ah on ah.id = tb.tax_account_id    
where
    tb.settings_tax_header_id = ANY($1::int[])
    AND ah.is_inactive IS NULL
`;


let query5 = `
SELECT
ah.id,
ah.account_name,
ah.account_type_id,
COALESCE(ah.item_unite, 'الكمية') as item_unite,
ah.item_revenue_account,
ah_revenue.account_name as revenue_account_name,
ah.item_expense_account,
ah_expense.account_name as expense_account_name,
ah.item_sales_price,
ah.item_purshas_price
FROM
accounts_header ah
left join accounts_header ah_revenue on ah_revenue.id = ah.item_revenue_account
left join accounts_header ah_expense on ah_expense.id = ah.item_expense_account
WHERE
ah.company_id = $1
AND ah.is_final_account = true
AND ah.account_type_id IN (5, 8)
AND ah.is_inactive IS NULL
`;

let params5 = [req.session.company_id];


let query6 = `
select
  ah.id,
  ah.account_name
from
  accounts_header ah
where
  ah.company_id = $1
  AND ah.is_final_account is true
  AND is_inactive is null
  AND (ah.account_type_id = 3 or ah.is_allow_to_buy_and_sell is true);`

  let params6 = [req.session.company_id];


let query7 = `
select 
  th.id,
  th.reference,
  th.general_note,
  th.datex,
  th.account_id,
  th.items_location_id,
  th.is_row_note_show,
  th.is_row_dicount_show,
  CONCAT(
    SUBSTRING(th.datex, 1, 4), '-',  -- استخراج السنة من datex
    LPAD(CAST(th.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
  ) AS referenceconcat
from
  transaction_header th
where 
th.id = $1
and th.company_id = $2
and th.transaction_type = 6 -- فواتير المشتريات
AND th.is_deleted IS NULL
`
let params7 = [posted_elements.x, req.session.company_id];

let query8 = `
select
  tb.id,
  tb.item_id,
    ah.account_name,
    ah.item_unite,
    ah.account_type_id as item_type_id,
  tb.item_amount as amount,
  tb.item_price as unite_price,
  COALESCE(tb.row_note, '') as row_note,
  tb.is_discount_percentage,
  tb.dicount_value,
  tb.settings_tax_header_id as tax_header_id,
    sth.taxe_package_name
from
  transaction_body tb
LEFT JOIN accounts_header ah on ah.id = tb.item_id
LEFT JOIN settings_tax_header sth on sth.id = tb.settings_tax_header_id
left join account_type at on at.id = ah.account_type_id
where 
  tb.transaction_header_id = $1
  and tb.item_id is not NULL
  ;
`
let params8 = [posted_elements.x]


let query9 = `
select 
  th.id,
      CONCAT(
        SUBSTRING(th.datex, 1, 4), '-',  -- استخراج السنة من datex
        LPAD(CAST(th.reference AS TEXT), 5, '0') -- تحويل reference إلى نص وإضافة الأصفار
    ) AS account_name
from
  transaction_header th
where
  th.transaction_type = 6
  and th.company_id = $1
  and th.account_id = $2
  and th.is_deleted is NULL
   ` 

   let params9 = [req.session.company_id, posted_elements.vendor_id]
  

await db.tx(async (tx) => {

  const itemslocationsArray = await tx.any(query1, params1);
  // const salesmanArray = await tx.any(query2, params2);
  const taxHeaderArray = await tx.any(query3, params3);
  const settings_tax_header_id_Array = taxHeaderArray.map(row => row.id);  // استخراج IDs من الاستعلام الثالث
  const taxBodyArray = await tx.any(query4, [settings_tax_header_id_Array]);  // تمرير القائمة إلى الاستعلام الرابع
  const itemsDataArray = await tx.any(query5, params5);
  const vendorsDataArray = await tx.any(query6, params6);
  const headerData = await tx.oneOrNone(query7, params7);
  const bodyData = await tx.any(query8, params8);
  const purshasesInvoiceReferencesArray = await tx.any(query9, params9);

  const postedData = { itemslocationsArray, taxHeaderArray, taxBodyArray, itemsDataArray, vendorsDataArray, headerData, bodyData, purshasesInvoiceReferencesArray};
  res.json(postedData);
})


    await last_activity(req)
  } catch (error) {
    await last_activity(req)
    console.error("Error while get_data_for_purshasesInvoiceToreturns", error);
    res.join;
    res
      .status(500)
      .json({ success: false, message_ar: "Error while get_data_for_purshasesInvoiceToreturns" });
  }
});

app.post("/api/purshases_returns_delete", async (req, res) => {
  try {

    //! Permission معلق
    await permissions(req, "purshases_returns_permission", "delete");
    if (!permissions) {
      return res.status(403).json({
        success: false,
        message_ar: "ليس لديك الصلاحيات المطلوبة للقيام بهذه العملية.",
      });
    }

    const posted_elements = req.body;
    const transaction_type = 7
  

      //! sql injection check
      const hasBadSymbols = sql_anti_injection(...Object.values(posted_elements));

      if (hasBadSymbols) {
        return res.json({
          success: false,
          message_ar:
            "Invalid input detected due to prohibited characters. Please review your input and try again.",
        });
      }


    const InValidDateFormat = isInValidDateFormat([posted_elements.datex]);
    if (InValidDateFormat) {
      return res.status(400).json({
        success: false,
        message_ar: InValidDateFormat_message_ar,
      });
    }

    //! settings
    const settings = await check_settings_validation({
      check_futureDate: true,
      check_closingDate: true,
      datex: posted_elements.datex,
      type: 'delete',
      tableName: 'transaction_header', // if type = 'update' or 'delete' only
      transaction_id: posted_elements.x, // if type = 'update' or 'delete' only
    }, req);

    
    if (!settings.valid) {
      return res.json({
        success: false,
        message_ar: settings.message_ar,
      });
    }

    turn_EmptyValues_TO_null(posted_elements);

    

    //* Start Transaction --------------------------------------------------



// //! Security hacking  accounts id


    let query1 = `select reference, datex from transaction_header where id = $1 and company_id = $2 AND transaction_type = $3 AND is_deleted IS NULL`
    let result1 = await db.oneOrNone(query1,[posted_elements.x, req.session.company_id, transaction_type])

    if (!result1){
      await block_user(req,'Sprd001')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }
    
    const year = getYear(result1.datex)


    let query2 = `select item_id from transaction_body where transaction_header_id = $1 AND item_id IS NOT NULL`;
    let result2 = await db.any(query2, [posted_elements.x]);
    
    if (!result2 || result2.length === 0) {
      await block_user(req, 'Sprd001');
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }
    
    // تحويل النتيجة إلى مصفوفة أرقام
    const items_array = result2.map(row => row.item_id);
    
  
    // تنفيذ معاملة قاعدة البيانات
    await db.tx(async (tx) => {

      let query1 = `update transaction_header
                    set is_deleted = true
                    Where
                      id = $1
                      AND company_id = $2
                      AND transaction_type = $3
                    ;`;

      const resultQ1 = await tx.result(query1, [
        posted_elements.x,
        req.session.company_id,
        transaction_type
      ]);

      if (resultQ1.rowCount === 0) {
        await block_user(req,'Sprd1')
        throw new Error(
          'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق'
        );
      }

      const query_delete = `delete from transaction_body where transaction_header_id = $1`
      await tx.none(query_delete,[posted_elements.x])


      //! history
      await update_items_cogs(items_array,result1.datex, req, tx)
      await history(transaction_type,3,posted_elements.x,result1.reference,req,tx);
    });

    await update_items_cogs(req,items_array,result1.datex)
    const new_referenceFormatting = formatFromFiveDigits(result1.reference);
    await last_activity(req);
    // إذا تم تنفيذ جميع الاستعلامات بنجاح
    return res.json({
      success: true,
      message_ar: `تم حذف مرتجع مشتريات بمرجع : ${new_referenceFormatting}-${year}`,
    });
  } catch (error) {
    await last_activity(req);
    console.error("Error purshases_returns_delete:", error);

    // إذا حدث خطأ أثناء المعاملة، سيتم إلغاؤها تلقائيًا
    return res.json({
      success: false,
      message_ar: error.message,
    });
  }
});

//#endregion


//#region fixed_assests_management

app.post("/get_expenses_accounts", async (req, res) => {
  try {
    //! Permission معلق
    await permissions(req, "fixed_assests_permission", "add");
    if (!permissions) {
      return;
    }

    const posted_elements = req.body;
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
    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");

    let query1 = `
     --  حسابات المصورفات باستثناء حساب تكلفة المخزون
select
	ah.id as id,
	ah.account_name as account_name
from
	accounts_header ah
WHERE ah.company_id = $1
  AND ah.account_type_id in(1,6)
  and ah.finance_statement = 2
  and ah.main_account_id = 5
  and ah.is_final_account is true
  and ah.global_id != 17
  and ah.is_inactive is null
  ;
`;
let params1 = [req.session.company_id]

let query2 = `
--  حسابات المصورفات باستثناء حساب تكلفة المخزون
select
	ah.id as id
from
	accounts_header ah
WHERE ah.company_id = $1
      and ah.global_id = 18

;
`;
let params2 = [req.session.company_id]



await db.tx(async (tx) => {

  const expensesAccountsArray = await tx.any(query1, params1);
  const deafultDepreciationExpensesAccount = await tx.oneOrNone(query2, params2);

  
  const postedData = { expensesAccountsArray, deafultDepreciationExpensesAccount};
  res.json(postedData);
})


    await last_activity(req)
  } catch (error) {
    await last_activity(req)
    console.error("Error while get Employees Data", error);
    res.join;
    res
      .status(500)
      .json({ success: false, message_ar: "Error while get Employees Data" });
  }
});


app.post("/fixed_assests_view", async (req, res) => {
  try {
    
    //! Permission  
    await permissions(req, "fixed_assests_permission", "view");
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
      
          // const InValidDateFormat = isInValidDateFormat([posted_elements.start_date,posted_elements.end_date])
          // if (InValidDateFormat){
          //   return res.json({
          //     success: false,
          //     message_ar: InValidDateFormat_message_ar,
          //   });
          // }
        


      turn_EmptyValues_TO_null(posted_elements);
    //* Start--------------------------------------------------------------

 

let quer1 = `
WITH
main_query as(
SELECT
    ah.id,
    ah.account_no,
    ah.account_name,
    ah.item_expense_account,
    ah.str10_data_column1 AS purshases_date,
    ah.str10_data_column2 AS started_depreciation_date,
    ah.numeric_column1 AS rate_value,
    ah.numeric_column2 AS un_depericated_value,
    ah.str50_column1 AS fixed_ssests_group_name,
    ah.str_textarea_column1 AS asset_info,
    SUM(
        CASE 
            WHEN tb.is_accumulated_depreciation IS NULL THEN (COALESCE(tb.debit, 0) - COALESCE(tb.credit, 0))
            ELSE 0
        END
    ) AS asset_cost,
    SUM(
        CASE 
            WHEN tb.is_accumulated_depreciation IS TRUE THEN (COALESCE(tb.credit, 0) - COALESCE(tb.debit, 0))
            ELSE 0
        END
    ) AS depreciation_value,
     'نشط' as assest_status
FROM
    accounts_header ah
LEFT JOIN transaction_body tb ON tb.account_id = ah.id
LEFT JOIN transaction_header th ON th.id = tb.transaction_header_id
WHERE
    ah.company_id = $1
    AND ah.finance_statement = 1
    AND ah.account_type_id = 6
    AND (th.is_deleted IS NULL OR th.is_deleted = FALSE)
GROUP BY
    ah.id)
select
    mq.id,
    mq.account_no,
    mq.account_name,
    mq.item_expense_account,
    mq.purshases_date,
    mq.started_depreciation_date,
    mq.rate_value,
    mq.un_depericated_value,
    mq.fixed_ssests_group_name,
    mq.asset_info,
	mq.asset_cost,
	mq.depreciation_value,
	mq.asset_cost - mq.depreciation_value as book_value,
	mq.assest_status
    from
    	main_query mq
;
`;

// تنفيذ الاستعلامات
let data = await db.any(quer1, [req.session.company_id]);

    res.json(data);
  } catch (error) {
    console.error("Error get_sales_invoice_Data_view:", error);
    res.status(500).send("Error:");
  }
});

app.post("/fixed_assests_add", async (req, res) => {
  try {
        // إرسال رسالة إلى العميل عبر WebSocket
        // io.emit('blockUser', { userId: req.session.userId });
        
    const posted_elements = req.body;
    

    //! Permission
      await permissions(req, "fixed_assests_permission", "add");
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

          
          const InValidDateFormat = isInValidDateFormat([posted_elements.purshase_date_input_value, posted_elements.started_accumulated_depeciation_date_input_value])
          if (InValidDateFormat){
            return res.json({
              success: false,
              message_ar: InValidDateFormat_message_ar,
            });
          }

        turn_EmptyValues_TO_null(posted_elements);

    if (!posted_elements.fixed_ssests_name_input_value || posted_elements.fixed_ssests_name_input_value == ''){
      return res.json({
        success: false,
        message_ar:
          "برجاء ادخال اسم الاصل",
      });
    }          
    
    if (!posted_elements.rate_input_value || isNaN(posted_elements.rate_input_value)){
      return res.json({
        success: false,
        message_ar:
          "برجاء ادخال معدل الضريبه بشكل صحيح",
      });
    }     
    //* Start--------------------------------------------------------------

    //2: validation data befor inserting to db
    // const rows = await db.any(
    //   "SELECT TRIM(employee_name) FROM employees WHERE TRIM(employee_name) = $1",
    //   [posted_elements.employee_name_input]
    // );

    let query0 = `SELECT
               (select count(id) FROM accounts_header WHERE company_id = $1 AND account_name = $2 AND account_type_id = 6) as count_account_name,
               (select main_account_id FROM accounts_header WHERE company_id = $1 AND global_id = 9) as parent_main_account_id,
               (select id FROM accounts_header WHERE company_id = $1 AND global_id = 9) as parent_id,
               (select count(id) FROM accounts_header WHERE company_id = $1 AND id = $3 AND account_type_id = 1 AND main_account_id = 5 AND global_id != 17) as count_expense_account
              `;
    let result = await db.oneOrNone(query0, [
      req.session.company_id,
      posted_elements.fixed_ssests_name_input_value,    
      posted_elements.dropdown_div_hidden_input_value, // depreciation_account
    ]);
    
     

    if (result.count_expense_account === 0) {
      await block_user(req, 'Sfaa001');
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }

    if (result.count_account_name > 0) {
      // اذا حصل على نتائج
      return res.json({
        success: false,
        message_ar: "اسم الاصل موجود بالفعل"
      });
    }


    if (!result.parent_main_account_id || !result.parent_id) {
      // اذا حصل على نتائج
      return res.json({
        success: false,
        message_ar: "حدث خطأ غير متوقع : برجاء التواصل مع الدعم الفنى والابلاغ عن كود الخطأ (Sfaa1)"
      });
    }

    //3: insert data into db
    
    

    const newId_header = await newId_fn("accounts_header",'id');
    const newId_body = await newId_fn("accounts_body",'id');


    let query1 = `
  INSERT INTO accounts_header (id, account_name, account_no, is_final_account, finance_statement, company_id, account_type_id, main_account_id, item_expense_account, str10_data_column1, str10_data_column2, numeric_column1, numeric_column2, str50_column1, str_textarea_column1)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
`;

  let params1 =[
    newId_header,
    posted_elements.fixed_ssests_name_input_value,
    posted_elements.fixed_ssests_input_value,
    true,
    1,
    req.session.company_id,
    6,
    +result.parent_main_account_id,
    posted_elements.dropdown_div_hidden_input_value,
    posted_elements.purshase_date_input_value,
    posted_elements.started_accumulated_depeciation_date_input_value,
    posted_elements.rate_input_value,
    posted_elements.un_depericated_value_input_value,
    posted_elements.fixed_ssests_group_name_input_value,
    posted_elements.asset_info_input_value
  ]


  let query2 = `INSERT INTO accounts_body (id, parent_id, account_id)
                VALUES ($1, $2, $3)`

  let params2 = [newId_body,
    +result.parent_id,
    newId_header
  ]               


  await db.tx(async (tx) => {
    await tx.none(query1, params1);
    await tx.none(query2, params2);
    await history(14, 1, newId_header, 0, req, tx)
  })

  await last_activity(req)
    //4: send a response to frontend about success transaction
    res.json({
      success: true,
      message_ar: "تم حفظ بيانات الاصل الثابت بنجاح",
    });
  } catch (error) {
    await last_activity(req)
    console.error("Error fixed_assests_add:", error);
    // send a response to frontend about fail transaction
    res.status(500).json({
      success: false,
      message_ar: "حدث خطأ أثناء اضافة الموظف",
    });
  }
});


app.post("/get_fixed_assests_data_for_update_page", async (req, res) => {
  try {
    //! Permission معلق
    await permissions(req, "fixed_assests_permission", "view");
    if (!permissions) {
      return;
    }

    const posted_elements = req.body;
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
    // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");

    let query1 = `
     --  حسابات المصورفات باستثناء حساب تكلفة المخزون
select
	ah.id as id,
	ah.account_name as account_name
from
	accounts_header ah
WHERE ah.company_id = $1
  AND ah.account_type_id in(1,6)
  and ah.finance_statement = 2
  and ah.main_account_id = 5
  and ah.is_final_account is true
  and ah.global_id != 17
  and ah.is_inactive is null
  ;
`;
let params1 = [req.session.company_id]

let query2 = `
--  حسابات المصورفات باستثناء حساب تكلفة المخزون
select
	ah.id as id
from
	accounts_header ah
WHERE ah.company_id = $1
      and ah.global_id = 18
;
`;
let params2 = [req.session.company_id]


let query3 = `
--  بيانات الاصل الثابت
select
	ah.id,
	ah.account_no,
	ah.account_name,
	ah.item_expense_account,
	ah.str10_data_column1 as purshases_date,
	ah.str10_data_column2 AS started_depreciation_date,
	ah.numeric_column1 AS rate_value,
	ah.numeric_column2 AS un_depericated_value,
	ah.str50_column1 AS fixed_ssests_group_name,
	ah.str_textarea_column1 AS asset_info
from
	accounts_header ah
where 
	ah.company_id = $1
	and ah.id = $2
	and ah.account_type_id = 6
	and ah.is_final_account is true
;
`;
let params3 = [req.session.company_id, posted_elements.x]


await db.tx(async (tx) => {

  const expensesAccountsArray = await tx.any(query1, params1);
  const deafultDepreciationExpensesAccount = await tx.oneOrNone(query2, params2);
  const asset_data = await tx.oneOrNone(query3, params3);

  
  const postedData = { expensesAccountsArray, deafultDepreciationExpensesAccount, asset_data};
  res.json(postedData);
})


    await last_activity(req)
  } catch (error) {
    await last_activity(req)
    console.error("Error while get Employees Data", error);
    res.join;
    res
      .status(500)
      .json({ success: false, message_ar: "Error while get Employees Data" });
  }
});

app.post("/fixed_assests_update", async (req, res) => {
  try {
        // إرسال رسالة إلى العميل عبر WebSocket
        // io.emit('blockUser', { userId: req.session.userId });
        
    const posted_elements = req.body;
    

    //! Permission
      await permissions(req, "fixed_assests_permission", "update");
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

          
          const InValidDateFormat = isInValidDateFormat([posted_elements.purshase_date_input_value, posted_elements.started_accumulated_depeciation_date_input_value])
          if (InValidDateFormat){
            return res.json({
              success: false,
              message_ar: InValidDateFormat_message_ar,
            });
          }

        turn_EmptyValues_TO_null(posted_elements);

    if (!posted_elements.fixed_ssests_name_input_value || posted_elements.fixed_ssests_name_input_value == ''){
      return res.json({
        success: false,
        message_ar:
          "برجاء ادخال اسم الاصل",
      });
    }          
    
    if (!posted_elements.rate_input_value || isNaN(posted_elements.rate_input_value)){
      return res.json({
        success: false,
        message_ar:
          "برجاء ادخال معدل الضريبه بشكل صحيح",
      });
    }     
    //* Start--------------------------------------------------------------

    //2: validation data befor inserting to db
    // const rows = await db.any(
    //   "SELECT TRIM(employee_name) FROM employees WHERE TRIM(employee_name) = $1",
    //   [posted_elements.employee_name_input]
    // );

    let query0 = `SELECT
               (select count(id) FROM accounts_header WHERE company_id = $1 AND account_name = $2 AND id != $3 AND account_type_id = 6) as count_account_name,
               (select count(id) FROM accounts_header WHERE company_id = $1 AND id = $3 and account_type_id = 6) as count_id,
                (select count(id) FROM accounts_header WHERE company_id = $1 AND id = $4 AND account_type_id = 1 AND main_account_id = 5 AND global_id != 17) as count_expense_account
              `;
    let result = await db.oneOrNone(query0, [
      req.session.company_id,
      posted_elements.fixed_ssests_name_input_value,
      posted_elements.x,
      posted_elements.dropdown_div_hidden_input_value,
    ]);



    if (result.count_expense_account === 0) {
      await block_user(req, 'Sfau001');
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }

    //500500
    if (result.count_id === 0) {
      await block_user(req,'Sfau002')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }
    
     
    if (result.count_account_name > 0) {
      // اذا حصل على نتائج
      return res.json({
        success: false,
        message_ar: "اسم الاصل موجود بالفعل"
      });
    }


    let query1 = `
  UPDATE accounts_header set account_name = $1,
                    account_no = $2,
                    item_expense_account = $3,
                    str10_data_column1 = $4,
                    str10_data_column2 = $5,
                    numeric_column1 = $6,
                    numeric_column2 = $7,
                    str50_column1 = $8,
                    str_textarea_column1 = $9
                where
                    id = $10
                    AND company_id = $11
                    AND account_type_id = 6
                    ;
  `;

  let params1 =[
    posted_elements.fixed_ssests_name_input_value,
    posted_elements.fixed_ssests_input_value,
    posted_elements.dropdown_div_hidden_input_value,
    posted_elements.purshase_date_input_value,
    posted_elements.started_accumulated_depeciation_date_input_value,
    posted_elements.rate_input_value,
    posted_elements.un_depericated_value_input_value,
    posted_elements.fixed_ssests_group_name_input_value,
    posted_elements.asset_info_input_value,
    posted_elements.x,
    req.session.company_id
  ]



  await db.tx(async (tx) => {
    await tx.none(query1, params1);
    await history(14, 2, posted_elements.x, 0, req, tx)
  })

  await last_activity(req)
    //4: send a response to frontend about success transaction
    res.json({
      success: true,
      message_ar: "تم تعديل بيانات الاصل الثابت بنجاح",
    });
  } catch (error) {
    await last_activity(req)
    console.error("Error fixed_assests_update:", error);
    // send a response to frontend about fail transaction
    res.status(500).json({
      success: false,
      message_ar: "حدث خطأ أثناء اضافة الموظف",
    });
  }
});


app.post("/fixed_assests_delete", async (req, res) => {
  try {
        // إرسال رسالة إلى العميل عبر WebSocket
        // io.emit('blockUser', { userId: req.session.userId });
        
    const posted_elements = req.body;
    

    //! Permission
      await permissions(req, "fixed_assests_permission", "delete");
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

          
          // const InValidDateFormat = isInValidDateFormat([posted_elements.purshase_date_input_value, posted_elements.started_accumulated_depeciation_date_input_value])
          // if (InValidDateFormat){
          //   return res.json({
          //     success: false,
          //     message_ar: InValidDateFormat_message_ar,
          //   });
          // }

        turn_EmptyValues_TO_null(posted_elements);

       
    //* Start--------------------------------------------------------------

    //2: validation data befor inserting to db
    // const rows = await db.any(
    //   "SELECT TRIM(employee_name) FROM employees WHERE TRIM(employee_name) = $1",
    //   [posted_elements.employee_name_input]
    // );

    let query0 = `SELECT
               (select count(id) FROM accounts_header WHERE company_id = $1 AND id = $2 AND is_final_account IS TRUE and account_type_id = 6) as count_id,
               (select count(id) FROM transaction_body WHERE account_id = $2) as count_transaction_body
              `;
    let result = await db.oneOrNone(query0, [
      req.session.company_id,
      posted_elements.x
    ]);


    if (result.count_id === 0) {
      await block_user(req,'Sfad001')
      return res.json({
        success: false,
        xx: true,
        message_ar: 'تم تجميد جميع الحسابات نظرا لمحاولة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق',
      });
    }

    if (result.count_transaction_body > 0) {
      return res.json({
        success: false,
        message_ar: 'يوجد حركات على الاصل الثابت فى القيود اليوميه ولا يمكن حذفه',
      });
    }


    let query1 = `
  delete from accounts_header where id = $1 AND company_id = $2 AND is_final_account is true AND account_type_id = 6;
  `;

  let params1 =[
    posted_elements.x,
    req.session.company_id
  ]



  await db.tx(async (tx) => {
    await tx.none(query1, params1);
    await history(14, 3, posted_elements.x, 0, req, tx)
  })

  await last_activity(req)
    //4: send a response to frontend about success transaction
    res.json({
      success: true,
      message_ar: "تم حذف بيانات الاصل الثابت بنجاح",
    });
  } catch (error) {
    await last_activity(req)
    console.error("Error fixed_assests_delete:", error);
    // send a response to frontend about fail transaction
    res.status(500).json({
      success: false,
      message_ar: "حدث خطأ أثناء اضافة الموظف",
    });
  }
});

//#endregion


//#region reports
  //#region statememnts
    //#region trial_balance
    app.post("/reports_trialBalance_view", async (req, res) => {
      try {

    //! Permission معلق
    // await permissions(req, "purshases_returns_permission", "delete");
    // if (!permissions) {
    //   return res.status(403).json({
    //     success: false,
    //     message_ar: "ليس لديك الصلاحيات المطلوبة للقيام بهذه العملية.",
    //   });
    // }

    const posted_elements = req.body;
    // const transaction_type = 7
  

      //! sql injection check
      const hasBadSymbols = sql_anti_injection(...Object.values(posted_elements));
      if (hasBadSymbols) {
        return res.json({
          success: false,
          message_ar:
            "Invalid input detected due to prohibited characters. Please review your input and try again.",
        });
      }


    const InValidDateFormat = isInValidDateFormat([posted_elements.start_date,posted_elements.end_date]);
    if (InValidDateFormat) {
      return res.status(400).json({
        success: false,
        message_ar: InValidDateFormat_message_ar,
      });
    }

        //* Start--------------------------------------------------------------
        // const rows = await db.any("SELECT e.id, e.employee_name FROM employees e");
    //50000
        let query1 = `
WITH 
stock_balances as(
select
	sum(case when ah.account_type_id = 5 AND th2.datex < $2 then tb2.debit else 0 end) as stock_debit_begining,
	sum(case when ah.account_type_id = 5 AND th2.datex BETWEEN $2 AND $3 then tb2.debit else 0 end) as stock_debit_current,
	sum(case when (ah.account_type_id = 5 or ah.global_id = 17) AND th2.datex < $2 then tb2.cogs else 0 end) as cost_value_begining,
	sum(case when (ah.account_type_id = 5 or ah.global_id = 17) AND th2.datex BETWEEN $2 AND $3 then tb2.cogs else 0 end) as cost_value_current
from transaction_body tb2
INNER JOIN accounts_header ah ON ah.id = tb2.item_id
LEFT JOIN transaction_header th2 ON th2.id = tb2.transaction_header_id
WHERE ah.company_id = $1 AND th2.is_deleted IS NULL
),
previous_profit_query as(
select
	sum(tb2.credit) - sum(tb2.debit) as previous_profit_value
from transaction_body tb2
INNER JOIN accounts_header ah ON ah.id = tb2.account_id
LEFT JOIN transaction_header th2 ON th2.id = tb2.transaction_header_id
where
	ah.company_id = $1 
	AND th2.is_deleted IS null
	and (ah.main_account_id in (4,5) or ah.global_id in (23,16))  -- حساب الارباح الحالية و الارباح السابقه
	AND th2.datex < $2
),
main_trial_balance AS (
    SELECT
        ah.id,
        ah.account_name,
        CASE
            WHEN ah.global_id = 12 THEN -- قيمه مخزون اول المدة
            	case
            		when (sb.stock_debit_begining - sb.cost_value_begining) > 0 then (sb.stock_debit_begining - sb.cost_value_begining)
            		else 0
            	end
            WHEN ah.global_id = 23 then -- ارباح فترات سابقة
            	case
             		when ppq.previous_profit_value < 0 then ABS(ppq.previous_profit_value)
            		else 0
            	end
            WHEN ah.main_account_id in (4,5) then 0  -- لا يجمع بنود قائمة الدخل اول المده            	
            ELSE 
                SUM(CASE WHEN tb.debit IS NOT NULL AND th.datex < $2 THEN tb.debit ELSE 0 END)
        END AS debit_first,
                CASE
            WHEN ah.global_id = 12 THEN -- قيمه مخزون اول المدة
            	case
            		when (sb.stock_debit_begining - sb.cost_value_begining) < 0 then ABS(sb.stock_debit_begining - sb.cost_value_begining)
            		else 0
            	end
            WHEN ah.global_id = 23 then -- ارباح فترات سابقة
            	case
            		when ppq.previous_profit_value > 0 then ppq.previous_profit_value
            		else 0
            	end
            	 WHEN ah.main_account_id in (4,5) then 0  -- لا يجمع بنود قائمة الدخل اول المده   
            ELSE 
                SUM(CASE WHEN tb.credit IS NOT NULL AND th.datex < $2 THEN tb.credit ELSE 0 END)
        END AS credit_first,
        CASE
            WHEN ah.global_id = 12 THEN -- قيمه مخزون ا المدة
            	case
            		when (sb.stock_debit_current - sb.cost_value_current) > 0 then (sb.stock_debit_current - sb.cost_value_current)
            		else 0
            	end
            WHEN ah.global_id = 17 THEN -- تكلفه المخزون خلال الفتره
            	case
            		when sb.cost_value_current > 0 then sb.cost_value_current
            		else 0
            	end
            ELSE 
                SUM(CASE WHEN tb.debit IS NOT NULL AND th.datex BETWEEN $2 AND $3 THEN tb.debit ELSE 0 END)
        END AS debit_current,
        CASE
            WHEN ah.global_id = 12 THEN -- قيمه مخزون ا المدة
            	case
            		when (sb.stock_debit_current - sb.cost_value_current) < 0 then ABS(sb.stock_debit_current - sb.cost_value_current)
            		else 0
            	end
            WHEN ah.global_id = 17 THEN -- تكلفه المخزون خلال الفتره
            	case
            		when sb.cost_value_current < 0 then ABS(sb.cost_value_current)
            		else 0
            	end
            ELSE 
                SUM(CASE WHEN tb.credit IS NOT NULL AND th.datex BETWEEN $2 AND $3 THEN tb.credit ELSE 0 END)
        END AS credit_current,        
        ah.is_final_account,
        ah.account_no,
        ah.finance_statement,
        ah.cashflow_statement,
        ah.account_type_id,
        ah.account_name_en,
        ah.global_id,
        ah.main_account_id,
        ah.is_inactive,
        ab.parent_id
    FROM
        accounts_header ah
    LEFT JOIN accounts_body ab ON ab.account_id = ah.id
    LEFT JOIN transaction_body tb ON tb.account_id = ah.id
    LEFT JOIN transaction_header th ON th.id = tb.transaction_header_id
    LEFT JOIN stock_balances sb ON true -- ربط الاستعلام فى حاله الصف الوحد
    LEFT JOIN previous_profit_query ppq ON true -- ربط الاستعلام فى حاله الصف الواحد
    WHERE
        ah.company_id = $1
        AND (ah.account_type_id NOT IN (7, 8, 11) or ah.account_type_id is null)
       -- AND NOT (ah.account_type_id = 5 AND ah.global_id != 12)
        AND ((ah.account_type_id != 5 or ah.account_type_id is null) or ah.global_id = 12)
    GROUP BY
        ah.id, ab.parent_id, sb.stock_debit_begining, sb.cost_value_begining, ppq.previous_profit_value, sb.stock_debit_current, sb.cost_value_current
)
select
    mt.id,
    mt.account_name,
          CASE
        WHEN (mt.debit_first + mt.debit_current) > (mt.credit_first + mt.credit_current)
        THEN (mt.debit_first + mt.debit_current) - (mt.credit_first + mt.credit_current)
        ELSE NULL
    END AS debit_end,
        CASE
        WHEN (mt.debit_first + mt.debit_current) < (mt.credit_first + mt.credit_current)
        THEN (mt.credit_first + mt.credit_current) - (mt.debit_first + mt.debit_current)
        ELSE NULL
    END AS credit_end,
    mt.debit_first,
    mt.debit_current,
    mt.credit_first,
    mt.credit_current,
    mt.is_final_account,
    mt.account_no,
    mt.finance_statement,
    mt.cashflow_statement,
    mt.account_type_id,
    mt.account_name_en,
    mt.global_id,
    mt.main_account_id,
    mt.is_inactive,
    mt.parent_id,
    null as padding
from 
	main_trial_balance mt
  order by
    mt.main_account_id asc, mt.parent_id asc, mt.id asc

      ;
    `;
    let params1 = [req.session.company_id, posted_elements.start_date, posted_elements.end_date]
    
    await db.tx(async (tx) => {
      let trial_balance = await tx.any(query1, params1);
    
      const hide_zero = posted_elements.is_hiding_zero_balances;
      let new_array = [];
      let addedAccounts = new Set(); // لتتبع الحسابات التي تمت إضافتها
    
      // دالة تكرارية للبحث عن الحسابات الفرعية
      async function addSubAccounts(row, trial_balance, currentPadding = 0) {
        const id = row.id;
        const is_final_account = row.is_final_account;
      
        // التحقق إذا كان الحساب قد أُضيف بالفعل
        if (!addedAccounts.has(id)) {
          addedAccounts.add(id); // تسجيل الحساب كمضاف
      
          // تحديث قيم padding و is_main
          row.padding = currentPadding;
      
          if (!is_final_account) {
            // إذا كان hide_zero مفعلاً وكان الحساب لا يحتوي على حسابات فرعية وجميع الأعمدة الستة تساوي صفر
            const sub_accounts_array = trial_balance.filter(item => +item.parent_id === +id) || [];
            const allColumnsZero = 
              +row.debit_first === 0 && +row.credit_first === 0 && 
              +row.debit_current === 0 && +row.credit_current === 0 && 
              +row.debit_end === 0 && +row.credit_end === 0;
      
            if (hide_zero && sub_accounts_array.length === 0 && allColumnsZero) {
              // إذا كانت جميع الشروط متحققة لا نضيف الحساب
              return;
            }
      
            new_array.push(row);
      
            // البحث عن الحسابات الفرعية لهذا الحساب
            if (sub_accounts_array.length > 0) {
              for (const subrow of sub_accounts_array) {
                // إضافة الحساب الفرعي مع زيادة قيمة padding
                await addSubAccounts(subrow, trial_balance, currentPadding + 1.5); // 1rem
              }
            }
          } else {
            // التحقق من إخفاء الأرصدة الصفرية
            if (hide_zero) {
              if (+row.debit_first !== 0 || +row.credit_first !== 0 || +row.debit_current !== 0 || +row.credit_current !== 0 || +row.debit_end !== 0 || +row.credit_end !== 0) {
                new_array.push(row);
              }
            } else {
              new_array.push(row);
            }
          }
        }
      }
      
    
      // معالجة الـ trial_balance
      for (const row of trial_balance) {
        await addSubAccounts(row, trial_balance, 0); // استدعاء الدالة لكل حساب رئيسي مع padding ابتدائي 0
      }
      trial_balance = new_array;
          
      const postedData = { trial_balance/*, customersDataArray */};
      res.json(postedData);
    })
    
    
        await last_activity(req)
      } catch (error) {
        await last_activity(req)
        console.error("Error while reports_trialBalance_view", error);
        res.join;
        res
          .status(500)
          .json({ success: false, message_ar: "Error while reports_trialBalance_view" });
      }
    });
    //#endregion end trial balace
  //#endregion end statements

//#endregion end reports



//!====================================================================================================================================



async function update_items_cogs(items_array,datex, req, tx) {
  
  //   اخر شرط تم اضافته امبارح
  // باقى اختبار الجرد مع المرتجعات والفواتير
  
  
    const query0 = `SELECT
      tb.item_id,
      SUM(
          CASE 
              when th.datex = $1 and th.transaction_type in (3,4) then 0
              WHEN tb.debit > 0 THEN tb.item_amount
              ELSE tb.item_amount * -1 
          END
      ) AS Current_amount,
      SUM(
          CASE
            when th.datex = $1 and th.transaction_type in (3,4) then 0
              WHEN th.transaction_type in (4) THEN tb.cogs*-1 
              WHEN th.transaction_type in (6) THEN tb.debit
              WHEN th.transaction_type in (2) AND tb.credit IS NULL THEN tb.debit
              ELSE 0
        END) 
      - SUM(
        CASE 
          WHEN th.transaction_type in (7) THEN tb.credit
          WHEN th.transaction_type in (3) THEN tb.cogs
          WHEN th.transaction_type in (2) AND tb.debit IS NULL THEN tb.credit
          ELSE 0
          END
      ) AS value
  FROM
      transaction_body tb
  INNER JOIN transaction_header th ON th.id = tb.transaction_header_id
  WHERE
      th.datex <= $1
      AND th.company_id = $2
      AND tb.item_id IN (${items_array.join(',')})
      AND th.is_deleted IS NULL
      AND th.is_including_items IS TRUE
      AND NOT (th.transaction_type IN (3,4) AND th.datex = $1) -- استثناء العمليات
  GROUP BY
      tb.item_id;`
  
     
    const started_balance = await tx.any(query0,[datex, req.session.company_id])  //! dayman 5aly el datex $1 3ashan mortpt be be el arkam fe ele est3lam 
    
  
    const query1 = `
        SELECT 
            tb.id,
            th.transaction_type,
            th.datex,
            tb.debit,
            tb.credit,
            tb.item_amount,
            tb.item_id,
            tb.cogs
        FROM
            transaction_body tb
        LEFT JOIN 
            transaction_header th ON th.id = tb.transaction_header_id
        WHERE 
            th.company_id = $1
            AND th.is_deleted IS NULL
            AND tb.item_id IS NOT NULL
            AND th.datex >= $2
            AND NOT (th.transaction_type IN (6,7,2) AND th.datex = $2) -- استثناء عمليات ( المشتريات ومرتجع المشتريات التى فى نفس التاريخ )
        ORDER BY 
            th.datex ASC,
            CASE th.transaction_type -- الترتيب المخصص لـ transaction_type
              WHEN 6 THEN 1 -- مشتريات
              WHEN 7 THEN 2 -- مرتجع مشتريات
              WHEN 2 THEN 3 -- قيد محاسبى ( مشتريات ومرتجع مشتريات )
              WHEN 4 THEN 4 -- مرتجع مبيعات
              WHEN 3 THEN 5 -- مبيعات
              ELSE 6 -- القيم الأخرى تكون في النهاية
            END ASC
            ;
    `;
  
    // جلب البيانات من قاعدة البيانات
    const items_transactions_array = await tx.any(query1,[req.session.company_id,datex]);
    
    let updatedRecords = [];
  
    for (const item_id of items_array){
    
    // تعريف المتغيرات لتتبع القيم
    let old_cogs = 0;
      
    let started_balances = []
    let started_amount = 0
    let started_value = 0
    started_balances = started_balance.find(item => +item.item_id === +item_id);
    
    if (started_balances){
      started_amount = +started_balances.current_amount || 0;
      started_value = +started_balances.value || 0;
    }
  
  
    const item_transaction_arry = items_transactions_array.filter(item => +item.item_id === +item_id)  

    for (const row of item_transaction_arry) {
      
      const type = +row.transaction_type
      let cogs = 0;
      
        if (type === 6 || (type === 2 && row.debit && !row.credit)){ // فاتورة مشتريات او قيد محاسبى مدين
          started_amount += +row.item_amount;
          started_value += +row.debit;
        }else if(type === 7 || (type === 2 && row.credit && !row.debit)){ // مرتجع المشتريات قيد محاسبى دائن
          started_amount -= +row.item_amount;
          started_value -= +row.credit;
        }else if(type === 3){ // فاتورة مبيعات
          if(+started_value === 0 || +started_amount === 0 || +row.item_amount === 0){
            cogs = 0  
          }else{
            cogs = (started_value / started_amount) * +row.item_amount       
          }
          started_amount -= +row.item_amount;
          started_value -= cogs;
          updatedRecords.push({ id: row.id, cogs });
        }else if(type === 4){ // مرتجع مبيعات
          if(+started_value === 0 || +started_amount === 0 || +row.item_amount === 0){
            cogs = 0  
          }else{
            cogs = ((started_value / started_amount) * +row.item_amount)
          }
          started_amount += +row.item_amount;
          started_value += cogs; // عملنا دى بالسالب لانى ضربت الكوجز فوق بالسالب  وبالتالى هيدينى زائد
          updatedRecords.push({ id: row.id, cogs: cogs*-1  });
        }
        
        old_cogs += cogs;
  
  
    }
  }
  
  // console.table(updatedRecords);
  
    // إعداد استعلامات التحديث دفعة واحدة
    const queries = updatedRecords.map(
        ({ id, cogs }) =>
            `UPDATE transaction_body SET cogs = ${cogs} WHERE id = ${id};`
    );
  
    // تنفيذ التحديثات باستخدام tx.batch
      
            await tx.batch(queries.map((query) => tx.none(query)));
      
        
  }


async function get_last_avg_cost(items_array, datex, req) {
  const query0 = `
   SELECT 
    tb.item_id,
    (tb.cogs / tb.item_amount) AS avg
FROM 
    transaction_body tb
LEFT JOIN 
    transaction_header th ON th.id = tb.transaction_header_id
WHERE 
    th.company_id = $1
    AND th.is_including_items IS TRUE
    AND th.is_deleted IS NULL
    AND th.datex <= $2
    AND tb.item_id IN (${items_array.join(',')})
    AND tb.cogs IS NOT NULL
    AND tb.item_amount IS NOT NULL
    AND tb.item_id IS NOT NULL
    AND tb.item_amount > 0
    AND th.datex = (
        SELECT MAX(th2.datex)
        FROM transaction_header th2
        WHERE th2.company_id = $1
        AND th2.is_including_items IS TRUE
        AND th2.is_deleted IS NULL
        AND th2.datex <= $2
        AND th2.id = tb.transaction_header_id
    )
;
`;

  const avg_cost = await db.any(query0, [req.session.company_id, datex]);

  return avg_cost


}




//! 
/*
-- استعلام لجلب بيانات  التكلقه

select
	th.datex,
	th.transaction_type,
	tb.debit,
	tb.credit,
	tb.item_amount,
	tb.cogs
from
	transaction_body tb
left join transaction_header th on th.id = tb.transaction_header_id
where
	th.is_including_items is true
	and tb.item_amount is not null
order by
	th.datex desc,
	CASE th.transaction_type -- الترتيب المخصص لـ transaction_type
            WHEN 6 THEN 1 -- مشتريات
            WHEN 7 THEN 2 -- مرتجع مشتريات
            WHEN 2 THEN 3 -- قيد محاسبى ( مشتريات ومرتجع مشتريات )
            WHEN 4 THEN 4 -- مرتجع مبيعات
            WHEN 3 THEN 5 -- مبيعات
            ELSE 6 -- القيم الأخرى تكون في النهاية
    END desc
    



    -- استعلام الميزان الاول الاساس بتاع التجميع فقط 
    SELECT
    ah.id,
    ah.account_name,
    -- الحسابات قبل التاريخ $2
    SUM(CASE WHEN tb.debit IS NOT NULL AND th.datex < $2 THEN tb.debit ELSE 0 END) AS debit_first,
    SUM(CASE WHEN tb.credit IS NOT NULL AND th.datex < $2 THEN tb.credit ELSE 0 END) AS credit_first,
    -- الحسابات في الفترة بين التاريخين $2 و $3
    SUM(CASE WHEN tb.debit IS NOT NULL AND th.datex BETWEEN $2 AND $3 THEN tb.debit ELSE 0 END) AS debit_now,
    SUM(CASE WHEN tb.credit IS NOT NULL AND th.datex BETWEEN $2 AND $3 THEN tb.credit ELSE 0 END) AS credit_now,
    ah.is_final_account,
    ah.account_no,
    ah.finance_statement,
    ah.cashflow_statement,
    ah.account_type_id,
    ah.account_name_en,
    ah.global_id,
    ah.main_account_id,
    ah.is_inactive,
    ab.parent_id
FROM
    accounts_header ah
LEFT JOIN accounts_body ab ON ab.account_id = ah.id
LEFT JOIN transaction_body tb ON tb.account_id = ah.id
LEFT JOIN transaction_header th ON th.id = tb.transaction_header_id
WHERE
    ah.company_id = $1
GROUP BY
    ah.id, ab.parent_id;
   
   
   
   ------------------------------------------
   
   
	
*/


//! استعلام 


//*-- server----------------------------------------------
//#region started server functions

async function test_trial_balance() {
  // we use this function in the begining of server start
  let trial_balance =  await db.any(`
	

		
    -- #1 stock_values
    WITH main_trial_balance AS (
        SELECT
            ah.id,
            ah.account_name,
            -- الحسابات قبل التاريخ $2
            CASE
                WHEN ah.global_id = 12 THEN 
                    (SELECT stock_value_begining
                     FROM 
                         (SELECT
                              sum(case when ah2.account_type_id = 5 AND th2.datex < $2 then tb2.debit else 0 end) - 
                              sum(case when ah2.account_type_id = 5 AND th2.datex < $2 then tb2.cogs else 0 end) as stock_value_begining
                          FROM
                              transaction_body tb2
                          INNER JOIN accounts_header ah2 ON ah2.id = tb2.item_id
                          LEFT JOIN transaction_header th2 ON th2.id = tb2.transaction_header_id
                          WHERE ah2.company_id = $1 AND th2.is_deleted IS NULL
                          GROUP BY ah2.id
                         ) AS stock_values
                    )
                WHEN ah.global_id = 17 THEN 
                    (SELECT stock_value_begining
                     FROM 
                         (SELECT
                              sum(case when (ah2.account_type_id = 5 or ah2.global_id = 17) AND th2.datex < $2 then tb2.cogs else 0 end) as stock_value_begining
                          FROM
                              transaction_body tb2
                          INNER JOIN accounts_header ah2 ON ah2.id = tb2.item_id
                          LEFT JOIN transaction_header th2 ON th2.id = tb2.transaction_header_id
                          WHERE ah2.company_id = $1 AND th2.is_deleted IS NULL
                          GROUP BY ah2.id
                         ) AS stock_values
                    )
                ELSE 
                    SUM(CASE WHEN tb.debit IS NOT NULL AND th.datex < $2 THEN tb.debit ELSE 0 END)
            END AS debit_first,
            
            -- الحسابات في الفترة بين التاريخين $2 و $3
            CASE
                WHEN ah.global_id = 12 THEN 
                    (SELECT stock_value_current
                     FROM 
                         (SELECT
                              sum(case when ah2.account_type_id = 5 AND th2.datex BETWEEN $2 AND $3 then tb2.debit else 0 end) - 
                              sum(case when ah2.account_type_id = 5 AND th2.datex BETWEEN $2 AND $3 then tb2.cogs else 0 end) as stock_value_current
                          FROM
                              transaction_body tb2
                          INNER JOIN accounts_header ah2 ON ah2.id = tb2.item_id
                          LEFT JOIN transaction_header th2 ON th2.id = tb2.transaction_header_id
                          WHERE ah2.company_id = $1 AND th2.is_deleted IS NULL
                          GROUP BY ah2.id
                         ) AS stock_values
                    )
                WHEN ah.global_id = 17 THEN 
                    (SELECT stock_value_current
                     FROM 
                         (SELECT
                              sum(case when ah2.account_type_id = 5 AND th2.datex BETWEEN $2 AND $3 then tb2.cogs else 0 end) as stock_value_current
                          FROM
                              transaction_body tb2
                          INNER JOIN accounts_header ah2 ON ah2.id = tb2.item_id
                          LEFT JOIN transaction_header th2 ON th2.id = tb2.transaction_header_id
                          WHERE ah2.company_id = $1 AND th2.is_deleted IS NULL
                          GROUP BY ah2.id
                         ) AS stock_values
                    )
                ELSE 
                    SUM(CASE WHEN tb.debit IS NOT NULL AND th.datex BETWEEN $2 AND $3 THEN tb.debit ELSE 0 END)
            END AS debit_current,
            
            -- باقي الأعمدة
            SUM(CASE WHEN tb.credit IS NOT NULL AND th.datex < $2 THEN tb.credit ELSE 0 END) AS credit_first,
            SUM(CASE WHEN tb.credit IS NOT NULL AND th.datex BETWEEN $2 AND $3 THEN tb.credit ELSE 0 END) AS credit_current,
            ah.is_final_account,
            ah.account_no,
            ah.finance_statement,
            ah.cashflow_statement,
            ah.account_type_id,
            ah.account_name_en,
            ah.global_id,
            ah.main_account_id,
            ah.is_inactive,
            ab.parent_id
        FROM
            accounts_header ah
        LEFT JOIN accounts_body ab ON ab.account_id = ah.id
        LEFT JOIN transaction_body tb ON tb.account_id = ah.id
        LEFT JOIN transaction_header th ON th.id = tb.transaction_header_id
        WHERE
            ah.company_id = $1
            AND ah.account_type_id NOT IN (0, 7, 8)
            AND NOT (ah.account_type_id = 5 AND ah.global_id != 12)
        GROUP BY
            ah.id, ab.parent_id
    ),
    befor_profit as(
    select
        mt.id,
        mt.account_name,
        mt.debit_first,
        mt.debit_current,
        mt.credit_first,
        mt.credit_current,
          CASE
            WHEN (mt.debit_first + mt.debit_current) > (mt.credit_first + mt.credit_current)
            THEN (mt.debit_first + mt.debit_current) - (mt.credit_first + mt.credit_current)
            ELSE NULL
        END AS debit_end,
            CASE
            WHEN (mt.debit_first + mt.debit_current) < (mt.credit_first + mt.credit_current)
            THEN (mt.credit_first + mt.credit_current) - (mt.debit_first + mt.debit_current)
            ELSE NULL
        END AS credit_end,
        mt.is_final_account,
        mt.account_no,
        mt.finance_statement,
        mt.cashflow_statement,
        mt.account_type_id,
        mt.account_name_en,
        mt.global_id,
        mt.main_account_id,
        mt.is_inactive,
        mt.parent_id
    from 
      main_trial_balance mt)
      
    select 
        bp.id,
           bp.account_name,
        CASE
            WHEN bp.global_id = 23 THEN 
                CASE 
                    WHEN (bp.credit_first - bp.debit_first) > 0 THEN NULL
                    ELSE ABS(bp.credit_first - bp.debit_first)
                END
            ELSE bp.debit_first
        END AS debit_first,
        CASE
            WHEN bp.global_id = 23 THEN 
                CASE 
                    WHEN (bp.credit_first - bp.debit_first) > 0 THEN (bp.credit_first - bp.debit_first)
                    ELSE NULL
                END
            ELSE bp.credit_first
        END AS credit_first,
    CASE
        WHEN bp.global_id = 16 THEN 
            CASE 
                WHEN (bp.debit_current - bp.credit_current) > 0 THEN (bp.debit_current - bp.credit_current)
                ELSE NULL
            END
        ELSE bp.debit_current
    END AS debit_current,
    CASE
        WHEN bp.global_id = 16 THEN 
            CASE 
                WHEN (bp.debit_current - bp.credit_current) > 0 THEN NULL
                ELSE ABS(bp.credit_current - bp.debit_current)
            END
        ELSE bp.credit_current
    END AS credit_current,
      bp.debit_end,
      bp.credit_end,
        bp.is_final_account,
        bp.account_no,
        bp.finance_statement,
        bp.cashflow_statement,
        bp.account_type_id,
        bp.account_name_en,
        bp.global_id,
        bp.main_account_id,
        bp.is_inactive,
        bp.parent_id
    from
      befor_profit bp
      

;`,
  [1,'2025-01-01','2025-12-13']);



}







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
  //test_trial_balance() // معلق
});
