
//#region Main Global Variables
let body = document.querySelector('body');
let body_content = document.querySelector('#body_content');
let content_space = document.querySelector('#content_space');
let page_content = document.querySelector(`#page_content`)
let currentPage = new URL(window.location.href).pathname.split('/').pop(); // get name page like home
let currentLang = currentPage.substring(currentPage.length - 2); // فصل اخر حرفين الى هما ar - en 
let today = new Date().toISOString().split('T')[0]; // date in format (yyyy-mm-dd)
let currentYear = new Date().getFullYear();
let firstDayOfYear = new Date(currentYear, 0, 1).toLocaleDateString('en-CA');
let lastDayOfYear = new Date(currentYear, 11, 31).toLocaleDateString('en-CA');
let reference_input_checkbox = document.querySelector(`#reference_input_checkbox`);
let reference_input = document.querySelector(`#reference_input`);
let user_setting_btn = document.querySelector(`#user_setting_btn`);



//   if (reference_input_checkbox && reference_input) {
//     function is_checked_reference_fn() {
//     if (reference_input_checkbox.checked){
//       reference_input.value = "تلقائى"
//       reference_input.classList.remove(`reference_input`)
//       reference_input.classList.add(`reference_input_auto_mode`)
//     }else{
//       reference_input.value = ""
//       reference_input.classList.remove(`reference_input_auto_mode`)
//       reference_input.classList.add(`reference_input`)
//     }
//   }

//   reference_input_checkbox.onchange = function(){
//     is_checked_reference_fn()
//   }
  
//   document.addEventListener('DOMContentLoaded', async function(){
//      is_checked_reference_fn()
//    })
  
// }


function reverseDateFormatting(dateValue) {
  // افصل التاريخ بناءً على الشرطات "-"
  const parts = dateValue.split('-');
  
  // تحقق من أن التاريخ يتألف من 3 أجزاء (السنة، الشهر، اليوم)
  if (parts.length === 3) {
      const year = parts[0];
      const month = parts[1];
      const day = parts[2];
      
      // قم بإعادة ترتيب الأجزاء إلى dd-mm-yyyy
      return `${day}-${month}-${year}`;
  } else {
      // في حال كان التاريخ غير صالح
      return dateValue; // أو قم بإرجاع رسالة خطأ مثلاً
  }
}


function formatToFiveDigits(num) {


if (!num){
  return 0
}

  // Check if the number is a valid integer and not negative
  if (typeof +num !== 'number' || +num < 0 || +num > 99999) {
      showAlert('fail', 'يوجد خطأ فى بيانات المرجع : برجاء التواصل مع احد المسؤليين')
      return
  }
  
  // Convert the number to a string and pad it with leading zeros
  return num.toString().padStart(5, '0');
}


function getYear(dateString) {

  if (!dateString){
    return null
  }
  // التأكد من أن السلسلة تتبع الصيغة الصحيحة
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  
  
  
  if (!datePattern.test(dateString)) {
      throw new Error("Invalid date format. Please use YYYY-MM-DD.");
  }

  // تحويل السلسلة إلى كائن Date
  const date = new Date(dateString);
  
  // استخراج السنة
  return date.getFullYear();
}
//#region 

//#region add templetes

//#region add header

// في ملف JavaScript
function loadHeaderContents() {
  const headerDiv = document.querySelector('#header_div');
  const excludedPages = ['login', 'companies_ar']

  if (excludedPages.includes(currentPage)) {

    return;
  }
  // الكود HTML كمتغير نصي
  const headerContent = `
      <a href="#" id="MenueIcon" class="MenueIcon" title="Open Menue">
          <i class="fa-duotone fa-bars" style="font-size: 2.5rem"></i>
      </a>
      <div class="header_dark_lang_control">
          <a id="dark_toggle_btn" class="">
              <i class="fa-duotone fa-circle-half-stroke"></i>
          </a>
          <a href="" id="lang_btn" class=""> en </a>
      </div>
      <div class="header_menue">
          <a href="companies_ar" title="الاعمال التجارية"
            <i class="fa-duotone fa-solid fa-books" style="font-size: 2.5rem"></i>
          </a>


      </div>
      <div class="header_user_div" style="gap: 0.7rem;">
          <button id="header_user_today" class="header_user_name" style="display: none;">${today}</button>
          <button id="header_user_name" class="header_user_name"></button>
          <div id="user_options" class="user_options hidden_height">
              <button id="user_setting_btn" class="btn_new" onclick="window.location.href='general_settings_ar';">الاعدادات</button>
              <button id="history_setting_btn" class="btn_new" onclick="">السجل الزمنى</button>
              <button id="backup_setting_btn" class="btn_new" onclick="">النسخ الاحتياطى</button>
              <button id="user_logout_btn" class="btn_cancel" onclick="logout()">خروج</button>
          </div>
          <button id="header_company_name" class="header_user_name"></button>
      </div>
  `;

  // إضافة المحتويات إلى الـ header_div
  headerDiv.innerHTML = headerContent;
}

// لا تنس تنفيذ الدالة
loadHeaderContents();

//#endregion

//#region add sidebar
function loadSidebarContents() {
  const sidebar = document.querySelector('#sidebar');
  const excludedPages = ['login', 'companies_ar', '/', 'companies_add_ar', 'users_view_ar', 'users_add_ar', 'users_update_ar']

  if (excludedPages.includes(currentPage)) {

    return;
  }

  //!Global Code permissions500 F-7

  // الكود HTML كمتغير نصي
  const sidebarContent = `
      <div id="closeMenueIcon" class="closeMenueIcon">
      <i class="fa-duotone fa-square-xmark"></i>
    </div>

<a href="notes_ar" target="_self" class="" onclick="sessionStorage.removeItem('noteViewArray')">
  <i class="fa-duotone fa-list"></i>
  الملاحظات
</a>


    <a href="hr_ar" target="_self" class="" style="display: ${module_display("departments_permission","employees_permission","effects_permission")}">
      <i class="fa-duotone fa-user-tie"></i>
      الموارد البشريه
    </a>

    <a href="production_view_ar" target="_self" class="" onclick="sessionStorage.removeItem('productionViewArray')" style="display: ${module_display("production_permission")}">
      <i class="fa-duotone fa-industry"></i>
      الانتاج
    </a>

    <a href="bread_view_ar" target="_self" class="" style="display: ${module_display("bread_permission")}">
      <i class="fa-duotone fa-bread-slice"></i>
      العيش
    </a>

    <a href="customers_view_ar" target="_self" class="" style="display: ${module_display("customers_permission")}" onclick="sessionStorage.removeItem('customersViewArray')">
      <i class="fa-duotone fa-tree fa-bounce" style="color: blue;"></i>
      العملاء
    </a>

    <a href="vendors_view_ar" target="_self" class="" style="display: ${module_display("vendors_permission")}" onclick="sessionStorage.removeItem('vendorsViewArray')">
      <i class="fa-duotone fa-tree fa-bounce" style="color: blue;"></i>
      الموردين
    </a>

    <a href="itemsMain_view_ar" target="_self" class="" style="display: ${module_display("items_permission","itemsLocations_permission","services_permission")}">
      <i class="fa-duotone fa-tree fa-bounce" style="color: blue;"></i>
       إدارة المخزون
    </a>

    <a href="purshasesMain_view_ar" target="_self" class="" style="display: ${module_display("purshases_qutation_permission","purshases_order_permission","purshases_invoice_permission")}">
      <i class="fa-duotone fa-light fa-file-invoice-dollar"></i>
       إدارة المشتريات
    </a>

    <a href="salesMain_view_ar" target="_self" class="" style="display: ${module_display("salesman_permission","sales_qutation_permission","sales_order_permission","sales_invoice_permission")}">
      <i class="fa-duotone fa-light fa-file-invoice-dollar"></i>
       إدارة المبيعات
    </a>


    <a href="transaction_view_ar" target="_self" class="" style="display: ${module_display("transaction_permission")}">
      <i class="fa-duotone fa-tree fa-bounce" style="color: blue;"></i>
      شطب المخزون
    </a>


    <a href="permissions_view_ar" target="_self" id="users_control_a" style="display: ${module_display("0")};">
      <i class="fa-duotone fa-user"></i>
      الصلاحيات
    </a>

    <a href="accounts_view_ar" target="_self" class="" style="display: ${module_display("acounts_permission")};">
      <i class="fa-duotone fa-tree fa-bounce" style="color: #FFD43B;"></i>
      الحسابات
    </a>

    <a href="transaction_view_ar" target="_self" class="" style="display: ${module_display("transaction_permission")};" onclick="sessionStorage.removeItem('transactionViewArray')">
      <i class="fa-duotone fa-tree fa-bounce" style="color: blue;"></i>
      القيود المحاسبية
    </a>


    <a href="transaction_add_ar" target="_self" class="" style="display: ${module_display("0")};">
      <i class="fa-duotone fa-tree fa-bounce" style="color: green;"></i>
      التقارير
    </a>

    <a href="test_ar" target="_self" class="" style="display: ${module_display("0")};">
      <i class="fa-duotone fa-tree fa-bounce" style="color: red;"></i>
      test
    </a>

    <a href="general_settings_ar" target="_self" class="" style="display: ${module_display("0")};">
       <i class="fa-duotone fa-gear"></i>
      الاعدادت
    </a>



    <a id="Custmize_sidebar" href="#" style="display: ${module_display("0")};">
      <i class="fa-duotone fa-gear"></i>
      <p>تخصيص</p>
    </a>

    <a id="owner_sidebar" href="#" style="display: ${module_display("0")};">
      <i class="fa-duotone fa-gear"></i>
      <p>المالك</p>
    </a>
      `;

  // إضافة المحتويات إلى الـ header_div
  sidebar.innerHTML = sidebarContent;
}

// لا تنس تنفيذ الدالة
loadSidebarContents();



// function module_display(string_perm_name) {
//   const owner = sessionStorage.getItem('owner');
//   const general_permission = parseInt(sessionStorage.getItem('general_permission'));
//   const custom_permission = parseInt(sessionStorage.getItem(string_perm_name));

//   if ((owner && owner === 'true') || (general_permission > 1 && general_permission < 7)) {
    
//     return 'flex';
//   } else if (custom_permission && (custom_permission > 0 && custom_permission < 5)) {
//     return 'flex';
//   } else {
//     return 'none';
//   }
// }

function module_display(...permissions) {
  const owner = sessionStorage.getItem('owner');
  const general_permission = parseInt(sessionStorage.getItem('general_permission'));

  if ((owner && owner === 'true') || (general_permission > 1 && general_permission < 7)) {
    return 'flex';
  }

  for (let perm of permissions) {
    const custom_permission = parseInt(sessionStorage.getItem(perm));
    if (custom_permission && custom_permission > 0 && custom_permission < 5) {
      return 'flex';
    }
  }

  return 'none';
}


const fn_container_div = document.querySelector(`#fn_container_div`)
if (fn_container_div) {
  const fn_innerHTML = `
            <i id="fn_icon" class="fa-light fa-ellipsis"></i>
            <div id="fn_options_div" class="fn_options_div hover hidden_height">

              <div onclick = "window.print();" style="border: none">طباعه</div>
            </div>
`

fn_container_div.innerHTML = fn_innerHTML



content_space.addEventListener("scroll", () => {
  let currentScroll = content_space.scrollTop || document.documentElement.scrollTop;

  if (currentScroll > 50) {  // إذا كان التمرير أكبر من 50 بكسل
    fn_container_div.style.display = "none";
  } else {
    fn_container_div.style.display = "flex";
  }
})
}




function setActiveSidebar(pageName) {
  // احصل على العنصر الذي تحتوي قيمة الـ href فيه على اسم الصفحة المعطاة
  const link = document.querySelector(`a[href="${pageName}"]`);

  // تأكد من وجود العنصر قبل إضافة الكلاس
  if (link) {
    link.classList.add('sidebar-active');
  }
}

// لاستدعاء الدالة وتمرير اسم الصفحة كمعلمة

//#endregion 
//#endregion

//#region fixed information

async function fixed_information() {
  try {
    const user_name_session = sessionStorage.getItem('userFullName');
    const user_company_session = sessionStorage.getItem('company_name');
    const header_user_name = document.querySelector('#header_user_name');
    const header_company_name = document.querySelector('#header_company_name');
    const user_setting_btn = document.querySelector('#user_setting_btn');
  

    const excludedPages1 = ['/', 'login']
    if (excludedPages1.includes(currentPage)) {
      return;
    } else {
      if (!user_name_session) {
        
        window.location.href = "/login";
        return;
      } else {
        header_user_name.textContent = user_name_session
      }
    }

    const excludedPages = ['companies_ar', '/', 'login', 'companies_add_ar', 'users_view_ar', 'users_add_ar', 'users_update_ar']

    if (excludedPages.includes(currentPage)) {
      return;
    } else {
      if (!user_name_session || !user_company_session) {
        await khorogFawry(`برجاء إعادة تسجيل الدخول مره اخرى `)
        // window.location.href = "/login";
        return;
      } else {
        header_company_name.textContent = user_company_session
      }
    }

  } catch (error) {
    catch_error(error)
  }

}

fixed_information()

const history_setting_btn = document.querySelector('#history_setting_btn');
if (history_setting_btn){
  history_setting_btn.onclick = function(){
  try {
    sessionStorage.removeItem('historyViewArray');
    window.location.href = "history_view_ar";
  } catch (error) {
    catch_error(error)
  }
}
}

if (user_setting_btn){
  user_setting_btn.addEventListener('click', function () {
    try {
        showAlert(`info`, `مازال تحت التحديث`)
    } catch (error) {
      catch_error('user_setting_btn EROR', error.message)
    }
  });
}





header_user_name.addEventListener('click', function () {
  user_options_display()
});
function user_options_display() {
  const user_options = document.querySelector('#user_options');
  if (user_options.classList.contains(`hidden_height`)) {
    show_User_options()
  } else {
    hide_User_options()
  }
}

// hide element when focus out of it
document.addEventListener('click', function (event) {
  if (user_options !== null) {
    const clickedElement = event.target;
    if (!user_options.contains(clickedElement) && clickedElement !== header_user_name) {
      hide_User_options();
    }
  }

});
function show_User_options() {
  if (user_options !== null) {
    user_options.classList.remove(`hidden_height`)
    user_options.focus();
  }
}

function hide_User_options() {
  if (user_options !== null) {
    user_options.classList.add(`hidden_height`)
  }

}




//#endregion END - fixed information

//#region  Alerts
//! Alerts 
//todo how to work ? 
//? 1: you need toadd this div in html file into body ---: <div id="alert-container" class="alert-container ta7ded1"></div>
//? 2: you need to determin 2 parameter ( 'AlertType' & 'message' )
//? 3: you need to be attintions for css code to control design 

function showAlert(type, message) {
  try {
    const alertHTML = `
          <div class="alert alert-${type}">
              ${message}
          </div>
      `;

    // إضافة العنصر إلى الـ DOM
    const alertContainer = document.getElementById('alert-container');
    alertContainer.insertAdjacentHTML('beforeend', alertHTML);

    // إنشاء العنصر الصوتي
    const audioHTML = `
          <audio id="${type}">
              <source src="/public/sounds/${type}.mp3" type="audio/mpeg">
          </audio>
      `;
    document.body.insertAdjacentHTML('beforeend', audioHTML);

    const alertDiv = alertContainer.lastElementChild;
    const audioElement = document.getElementById(type);

    // عند اكتمال تحميل الملف الصوتي، قم بتشغيله
    audioElement.addEventListener("canplay", function () {
      audioElement.play();
    });

    // إضافة فئة .show لعرض التنبيه مع الرسوم المتحركة
    setTimeout(function () {
      alertDiv.classList.add('show');
    }, 100);

    // عند النقر، ابدأ في إخفاء التنبيه باستخدام الرسوم المتحركة
    alertDiv.addEventListener('click', function () {
      alertDiv.classList.add('hide');
      // إزالة التنبيه بعد اكتمال الرسوم المتحركة
      setTimeout(function () {
        alertDiv.remove();
      }, 500);
    });

    // بعد فترة زمنية معينة، ابدأ في إخفاء التنبيه
    setTimeout(function () {
      alertDiv.classList.add('hide');
      // إزالة التنبيه بعد اكتمال الرسوم المتحركة
      setTimeout(function () {
        alertDiv.remove();
      }, 500);
    }, 10000);
  } catch (error) {
    console.error('Error showing alert:', error.message);
  }
}



//#endregion End -- Alerts

//#region dialog confirm
let dialogAnswer = false; // متغير عالمي

function showDialog(title, message, icon) {
try {
  

  
  return new Promise((resolve) => {
    dialogAnswer = false;

    const dialogHTML = `
            <div id="dialogOverlay" class="dialogOverlay" style="display: none;">
                <div id="dialog" class="dialog">
                    <div class="dialog_header">
                        <h3 id="dialogTitle"></h3>
                    </div>
                    <div class="dialog_body">
                        <p id="dialogMessage"></p>
                        <i id="dialogIcon"></i>
                    </div>
                    <div class="dialog_footer">
                        <button id="yesButton" class="btn_save">نعم</button>
                        <button id="noButton" class="btn_cancel">لا</button>
                    </div>
                </div>
            </div>
        `;

  
        
    // إضافة القالب إلى الـ DOM
    document.body.insertAdjacentHTML('beforeend', dialogHTML);

    // تحديث محتوى العناصر
    document.getElementById('dialogTitle').textContent = title;
    document.getElementById('dialogMessage').textContent = message;
    document.getElementById('dialogIcon').className = icon;

    const overlay = document.getElementById('dialogOverlay');
    const dialog = document.getElementById('dialog');

    const yesButton = document.querySelector(`#dialogOverlay`).querySelector(`#yesButton`);
    const noButton = document.querySelector(`#dialogOverlay`).querySelector(`#noButton`);
    // عرض النافذة
    overlay.style.display = 'flex';

    // التحكم في زر "نعم"
    yesButton.onclick = function () {

      showLoadingIcon(this);
      body.style.pointerEvents = 'none';
      dialogAnswer = true;
      resolve(true);
    };

    // التحكم في زر "لا"
    noButton.onclick = function () {
      dialogAnswer = false;
      closeDialog();
      resolve(false);
    };
  });

} catch (error) {
  catch_error(error)
}
}

async function closeDialog() {
  body.style.pointerEvents = 'auto';
  const overlay = document.getElementById('dialogOverlay');

  if (overlay !== null) {
    // إضافة التحريك للإغلاق
    overlay.style.animation = 'fadeOut 0.3s forwards';

    setTimeout(() => {
      // إخفاء التراكب بعد انتهاء التحريك
      overlay.remove();
    }, 300);
  }
}


// noButton.onclick = function () {
//   try {
//       dialogOverlay_input.style.animation = 'fadeOut 0.3s forwards';
//       setTimeout(() => {
//           dialogOverlay_input.style.display = 'none'
//           closeDialog()
//           clear_todo()
//           dialogOverlay_input.style.animation = 'none';
//         }, 300);

//   } catch (error) {
//       dialogOverlay_input.style.display = 'none'
//       closeDialog()
//       clear_todo()
//       catch_error(error)
//       dialogOverlay_input.style.animation = 'none';
//   }
// };

async function closeDialog_input() {
  const dialogOverlay_input = document.getElementById('dialogOverlay_input');

  if (dialogOverlay_input !== null) {
    // إضافة التحريك للإغلاق
    dialogOverlay_input.style.animation = 'fadeOut 0.3s forwards';

    setTimeout(() => {
      // إخفاء التراكب بعد انتهاء التحريك


      // dialogOverlay_input.remove(); // old
      dialogOverlay_input.style.display = 'none';
      dialogOverlay_input.style.animation = 'none'; // إعادة ضبط الأنماط بعد الإخفاء

      // إعادة تعيين الحالة بعد إغلاق النافذة الحوارية
      // هذا الجزء يتعامل مع إعادة تعيين `hideLoadingIcon`
      // const dialog = document.getElementById('dialog');
      // const yesButton = document.getElementById('yesButton');
      // hideLoadingIcon(yesButton);
      // dialog.style.pointerEvents = 'auto';
    }, 300);
  }
}

// * HOW TO USE 

//const userChoice = await showDialog('Test message', 'Do you want to save?', 'icon-question');
//console.log(userChoice); // true إذا كان "نعم" وfalse إذا كان "لا"

//#endregion  dialog confirm

//#region error handling
//todo el fekra hena enak hatzher el message beta3 el error fakt eza kont fat7 el bernameg 3ala el windwos beta3k local ama ezaraf3to 3ala  host msh hayzhar
function catch_error(error) {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // في بيئة التطوير المحلية، يعرض معلومات الخطأ في وحدة التحكم
    console.error('Error details:', error);
    showAlert('fail', 'An error occurred. Please check the cosole');
  } else {
    // في بيئة الإنتاج، يعرض رسالة عامة للمستخدمين
    showAlert('fail', 'An error occurred. Please contact the administrators for assistance.');
  }
}


//#endregion END - error handling

//#region dark Mode
//! dark mode toggle button
document.querySelector('#dark_toggle_btn').addEventListener('click', function (event) {
  try {

    event.preventDefault; // stop <a> herf

    const darkMode = localStorage.getItem('darkmode')
    if (darkMode && darkMode === 'dark') {
      body.classList.remove('dark');
      localStorage.setItem('darkmode', 'light')
    } else {
      body.classList.add('dark');
      localStorage.setItem('darkmode', 'dark')
    }
  } catch (error) {
    catch_error('Dark mode error')
  };
});
//#endregion

//#region  langauge toggle ar - en
//! save current page in sessionstorage and ar - en toggle

sessionStorage.setItem('currentPage', currentPage);
localStorage.setItem('currentLang', currentLang);



// todo  : 5aly balk lazem ykon sa7t el english feha el lang_btn innerHtml : ar  we el 3aks fe el arapy we matnsash el route
const lang_btn = document.querySelector('#lang_btn');
lang_btn.addEventListener('click', function (event) {
  event.preventDefault(); // منع السلوك الافتراضى لعنر ال ايه انه لان الهيرف هيعمل ريلود
  const currentLang = localStorage.getItem('currentLang');
  const X = sessionStorage.getItem('currentPage');
  // console.log(`${currentLang} -- ${currentLang === 'ar'} -- ${lang_btn.textContent.trim() === 'en'}`);
  if (currentLang && currentLang === 'ar' && lang_btn.textContent.trim() === 'en') {
    const page_toggle = X.substring(0, X.length - 2) + 'en';
    window.location.href = `/${page_toggle}`; // window.location.href = '/home_en';
  } else if (currentLang && currentLang === 'en' && lang_btn.textContent.trim() === 'ar') {
    const page_toggle = X.substring(0, X.length - 2) + 'ar';
    window.location.href = `/${page_toggle}`; // window.location.href = '/home_en';

  } else {
    return;
  };
});

//#endregion End -- langauge toggle ar - en

//#region scroll Button Top


// Show button when user scrolls down
if (content_space !== null) {
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  content_space.addEventListener("scroll", () => {
    if (content_space.scrollTop > 200 || document.documentElement.scrollTop > 200) { /* عنصر البودى اوى عنصر داخل البودى  اذا الاسكرول اكبر من 500 بيكسيل*/
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  });

  // Scroll to top when button is clicked
  // const rootElement = document.documentElement;

  function scrollToTop() {
    // Scroll to top logic
    // rootElement.scrollTo({
    content_space.scrollTo({
      top: 0,
      behavior: "smooth" /* هنا هيطلع لفوق فى خلال 0.3 ثانيه  دى القيمه الافتراضيه مهما كان طول الصفحه هيطلع فى خلال 0.3 ثانيه*/

    });
  }

  scrollToTopBtn.addEventListener("click", function () {
    scrollToTop();
  });

}


//#endregion end - scroll Button Top

//#region flatpicker

flatpickr(".datepicker", {
  dateFormat: "Y-m-d", // تحديد صيغة التاريخ yyyy-mm-dd
  //   wrap: true // بتخلى ال كاليندر تظهر فوق لو تحت فى الشاشاه مش كافى بس فيها مشكله متشغلهاش
  //  minDate: "2020-01-01", // or by month "2020-01" or by year "2020"
  //  minDate: "today",
  //  maxDate: "2023-12-31",
  //  maxDate: new Date().fp_incr(14) // 14 days from now
  // disable: ["2025-01-30", "2025-02-21", "2025-03-08", new Date(2025, 4, 9) ], // diable some datets
  /*
     disable: [
     {
       from: "2025-04-01",
       to: "2025-05-01"
     },
     {
       from: "2025-09-01",
       to: "2025-12-01"
     }
   ]
  */
});
//! END_______________________
//#endregion End -- flatpicker

//#region table

//#region totl_column 
//! GLOBAL totalVariableName for columns (( دى متغيرات تحسبا لوجود ست اعمده عايزين يتجمعو ))
let total_column1 = { value: 0 };
let total_column2 = { value: 0 };
let total_column3 = { value: 0 };
let total_column4 = { value: 0 };
let total_column5 = { value: 0 };
let total_column6 = { value: 0 };

function total_column(totalVariable, rowData) {
  try {

    if (!isNaN(rowData)) {
      rowData = parseFloat(rowData);
      totalVariable.value += rowData; // sum
      if (rowData < 0) {
        return `<span style="color: red">${floatToString(true, rowData)}</span>`;
      } else if (rowData === 0) {
        return `0.00`;
      } else {
        // return parseFloat(rowData);
        rowData = floatToString(false, rowData)
        return rowData;
      }
    } else {
      return 0.00;
    }
  } catch (error) {
    catch_error(error);
  }
}

//?  use it like this 
//todoa 1 :  first  code line after FilleffectsTable lazem t3mel prepare Global variables ely hatshta8ala 3alhea  7asp 3add el columns ely enta 3ayz tegm3ha 
//? example       total_column1.value = 0
//? example       total_column2.value = 0

//todo 2: hatst5dem el function fe el td  zay Keda 3ashan te3mel sum we fnafs el wa2t trg3 el value beta3 el cell
//? example  <td style="width: auto; white-space: nowrap;">${total_column(total_amount, row.amount)}</td>

//todo 3: a5er 7aga ba3d  el table mayktmel  hat7ot el totals beta3k
//? document.getElementById("tfooter1").textContent = slice_Array1.length; // عدد الصفوف
//? document.getElementById("tfooter7").textContent = total_column1.value;
//? document.getElementById("tfooter8").textContent = total_column2.value;

//#endregion END - total column


function tdNumber(is_link,is_bold,is_showZero,number,style_class,var_total_column,string_eventWithFunction,idClassName){
  try {
    let num = +number;
    let fontweight;
    let classX;

    if (num === 0) {
      num = is_showZero ? '0.00' : '';
  }
  
    
    fontweight = is_bold ? 'bold' : 'normal'
    
    if (is_link){
      if (+num < 0){
        classX = `td_link_number td_negative_number`
      }else {
        classX = `td_link_number`
      }
    }else{
      if (+num < 0){
        classX = `td_negative_number`
      }else {
        classX = `td_normal_number`
      }
    }
    

let value;
if (!var_total_column || !var_total_column) {
   value = floatToString(true,num)
} else{
  value = total_column(var_total_column,num)
}

    return `<td style="min-width: 1rem; width: auto; font-weight: ${fontweight}; ${style_class}" class="${classX} ${idClassName}" ${string_eventWithFunction}>${value}</td>`;

  } catch (error) {
    catch_error(error);
  }
}


//#region  table_filter

function performSearch_Row(var_checkbox_or_emptyValue, string_fieldName, var_searchValue, row) {
  try {
    // إذا تم تمرير الـ checkbox وكان فارغًا أو كان محددًا
    if (var_checkbox_or_emptyValue === "" || var_checkbox_or_emptyValue.checked) {
      // تنفيذ الفلتر
      return row[string_fieldName] && row[string_fieldName].toString().toLowerCase().includes(var_searchValue);
    } else {
      // تجاوز الفلتر لهذا الحقل
      return false;
    }
  } catch (error) {
    catch_error(error);
  }
}



function filterData_string_column_without_showAndHiddenCheckbox(var_selectType, var_searchInput, string_row_columnName, row) {
  try {

  let var_select = String(var_selectType.value || '');
  let input_anotherInfoValue = String(var_searchInput.value || '').trim().toLowerCase();
  
  // تحويل قيمة row.columnName إلى نصوص بشكل آمن
  const anotherInfo = String(row[string_row_columnName] || '').trim().toLowerCase();

  // تحقق من شرط الفلترة بناءً على حالة الـ Checkbox
 
      if (var_select == 0) {
          // إرجاع true للحصول على كل القيم بلا استثناء
          return true;
      } else if (var_select == 1) {
          // البحث الجزئي داخل النصوص
          return anotherInfo.includes(input_anotherInfoValue);
      } else if (var_select == 2) {
          return !anotherInfo.includes(input_anotherInfoValue);
      } else if (var_select == 3) {
          return anotherInfo === '';
      } else if (var_select == 4) {
          return anotherInfo !== '';
      }
      
} catch (error) {
  catch_error(error)
}
}


function filterData_string_column_with_showAndHiddenCheckbox(var_checkbox, var_selectType, var_searchInput, string_row_columnName, row) {
  try {

  let var_select = String(var_selectType.value || '');
  let searchValue = String(var_searchInput.value || '').trim().toLowerCase();
  
  // تحويل قيمة row.columnName إلى نصوص بشكل آمن
  const rowValue = String(row[string_row_columnName] || '').trim().toLowerCase();

  // تحقق من شرط الفلترة بناءً على حالة الـ Checkbox
  if (var_checkbox.checked) {
      if (var_select == 0) {
          // إرجاع true للحصول على كل القيم بلا استثناء
          return true;
      } else if (var_select == 1) {
          // البحث الجزئي داخل النصوص
          return rowValue.includes(searchValue);
      } else if (var_select == 2) {
          return !rowValue.includes(searchValue);
      } else if (var_select == 3) {
          return rowValue === '';
      } else if (var_select == 4) {
          return rowValue !== '';
      }
  } else {
      return true;
  }
          
} catch (error) {
  catch_error(error)
}
}


function filterData_string_column_with_showAndHiddenCheckbox_with_only_select(var_checkbox, var_selectType, string_row_columnName, row) {
  try {

    let var_select = String(var_selectType.value || '');
    let searchValue = String(var_selectType.options[var_selectType.selectedIndex].text || '').trim().toLowerCase();
  

    // تحويل قيمة row.columnName إلى نصوص بشكل آمن
    const rowData = String(row[string_row_columnName] || '').trim().toLowerCase();

    // تحقق من شرط الفلترة بناءً على حالة الـ Checkbox
    if (var_checkbox.checked) {
        if (var_select == 0) {
            // إرجاع true للحصول على كل القيم بلا استثناء
            return true;
        } else {
            // التحقق من التطابق التام
            return rowData === searchValue;
        }
    } else {
        return true;
    }

  } catch (error) {
    catch_error(error);
  }
}




function filterData_number_column_with_showAndHiddenCheckbox(var_checkbox, var_selectType, var_searchInput, string_row_columnName, row) {
  try {

    let var_select = String(var_selectType.value || '');
    let input_number = parseFloat(var_searchInput.value || ''); // تحويل قيمة الإدخال إلى رقم

    // تحويل قيمة row.columnName إلى رقم بشكل آمن
    const rowNumber = parseFloat(row[string_row_columnName] || 0); // تأكد من أن القيمة رقمية

    // تحقق من شرط الفلترة بناءً على حالة الـ Checkbox
    if (var_checkbox.checked) {
        if (var_select == 0) {
            // إرجاع true للحصول على كل القيم بلا استثناء
            return true;
        } else if (var_select == 1) {
            // إرجاع القيم الأكبر من input_anotherInfoValue
            return rowNumber > input_number;
        } else if (var_select == 2) {
            // إرجاع القيم الأصغر من input_anotherInfoValue
            return rowNumber < input_number;
        } else if (var_select == 3) {
            // إرجاع القيم التي تساوي input_anotherInfoValue
            return rowNumber === input_number;
        } else if (var_select == 4) {
            // إرجاع القيم التي تساوي 0
            return rowNumber === 0;
        } else if (var_select == 5) {
            // إرجاع القيم التي لا تساوي 0
            return rowNumber !== 0;
        }
    } else {
        return true; // إذا لم يكن الـ Checkbox مفعلاً، إرجاع true
    }

  } catch (error) {
    catch_error(error);
  }
}



function filterData_date_column_with_two_inputs_and_showAndHiddenCheckbox(var_checkbox, var_selectType, var_dateInputStart, var_dateInputEnd, string_row_columnName, row) {
  try {

    
    let var_select = String(var_selectType.value || '');
    let startDate = new Date(var_dateInputStart.value).toISOString().split('T')[0];
    let endDate = new Date(var_dateInputEnd.value).toISOString().split('T')[0];
  
    // تحويل قيمة row.columnName إلى نصوص بشكل آمن والتأكد من أنها بصيغة صحيحة
    let rowDate = String(row[string_row_columnName] || '').trim();


    // تحقق من شرط الفلترة بناءً على حالة الـ Checkbox
    if (var_checkbox.checked) {
        if (var_select == 0) {
            // إرجاع true للحصول على كل القيم بلا استثناء
            return true;
        } else if (var_select == 1) {
              // التحقق من أن التاريخ غير فارغ وأنه بصيغة صحيحة (YYYY-MM-DD)
    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(rowDate);

    if (!isValidDate) {
        // استبعد الصف إذا كان التاريخ فارغًا أو بصيغة غير صحيحة
        return false;
    }

            // البحث عن الصفوف التي تقع تواريخها بين التاريخين المدخلين
            return rowDate >= startDate && rowDate <= endDate;
        }
    } else {
        return true;
    }
          
  } catch (error) {
    catch_error(error);
  }
}


function filterData_Qkey(QKey, string_row_columnName, row) {
  try {

    if (!QKey || isNaN(+QKey)) {
      return true
    }else{
    
    // تحويل قيمة row.columnName إلى نصوص بشكل آمن
    const rowData = String(row[string_row_columnName] || '').trim().toLowerCase();
    return rowData == QKey;
  }
  } catch (error) {
    catch_error(error);
  }
}



function filter_outsideCheckbox_string_column_with_select_and_input(var_checkbox) {
  // البحث عن العنصر الأب الذي يحتوي على select_and_input_div
  const filter_div_sub = var_checkbox.closest('.filter_div_sub');
  const select_and_input_div = filter_div_sub.querySelector('.select_and_input_div');
  const select = select_and_input_div.querySelector(`select`)
  const input = select_and_input_div.querySelector(`input`)

    select.value = 0
    if (input) {
        input.style.display = 'none'
        input.value = ''
    }


  // تعديل الظهور بناءً على حالة الـ checkbox
  if (var_checkbox.checked) {
    select_and_input_div.classList.remove('hidden_select_and_input_div');
  } else {
    select_and_input_div.classList.add('hidden_select_and_input_div');
  }
}

function filter_outsideCheckbox_date_column_with_select_and_two_inputs(var_checkbox) {
  // البحث عن العنصر الأب الذي يحتوي على select_and_input_div
  const filter_div_sub = var_checkbox.closest('.filter_div_sub');
  const select_and_input_div = filter_div_sub.querySelector('.select_and_input_div');

  // const input = select_and_input_div.querySelector(`input`)

   
  //   input.style.display = 'none'
  //   input.value = ''

  // تعديل الظهور بناءً على حالة الـ checkbox
  if (var_checkbox.checked) {
    select_and_input_div.classList.remove('hidden_select_and_input_div');
  } else {
    select_and_input_div.classList.add('hidden_select_and_input_div');
  }
}

function filter_insideSelect_string_column_with_input(select_element) {
  try {
    const select_and_input_div = select_element.closest(`.select_and_input_div`);
    const input = select_and_input_div.querySelector(`input`)
    
    input.value =''
    const array = [1,2];
    if (array.includes(+select_element.value)){
      input.style.display = 'flex'
    }else{
      input.style.display = 'none'
    }
  } catch (error) {
    catch_error(error)
  }
}



function filter_insideSelect_number_column_with_input(select_element) {
  try {
    const select_and_input_div = select_element.closest(`.select_and_input_div`);
    const input = select_and_input_div.querySelector(`input`)
    
    input.value =''
    const array = [1,2,3];
    if (array.includes(+select_element.value)){
      input.style.display = 'flex'
    }else{
      input.style.display = 'none'
    }
  } catch (error) {
    catch_error(error)
  }
}


function filter_insideSelect_date_column_with_two_input(select_element) {
  try {
    const select_and_input_div = select_element.closest(`.select_and_input_div`);
    const two_date_div = select_and_input_div.querySelector(`.two_date_div`)
    const inputs = two_date_div.querySelectorAll(`input`)
    
    for (const input of inputs){
      input.value = today
    }

    const array = [1];
    if (array.includes(+select_element.value)){
      two_date_div.style.display = 'flex'
    }else{
      two_date_div.style.display = 'none'
    }
  } catch (error) {
    catch_error(error)
  }
}



function beforeprint_reviewTable(str_tableName, ...hideColumnIndices) {
  try {
    const table = document.querySelector(`#${str_tableName}`);
    const headerCells = table.querySelectorAll('thead th');
    const numberOfColumns = headerCells.length;
    const countValue = table.querySelector(`#tfooter0`).textContent;

    // التعامل مع الأعمدة المخفية أولاً
    if (Array.isArray(hideColumnIndices) && hideColumnIndices.length > 0) {
      for (const index of hideColumnIndices) {
        if (typeof index === 'number' && index >= 0) {
          // إضافة الكلاس لإخفاء الأعمدة أثناء الطباعة
          const cells = table.querySelectorAll(`tr td:nth-child(${index + 1}), tr th:nth-child(${index + 1})`);
          for (const cell of cells) {
            cell.classList.add('hide-print');
          }
        }
      }
    }

    // التعامل مع خلايا التذييل
    
    for (let i = 0; i <= numberOfColumns -1; i++) { // تغيير < إلى <= لتغطية كل الأعمدة
      const tfoot = table.querySelector(`#tfooter${i}`);
      if (tfoot && getComputedStyle(tfoot).display !== 'none' && !tfoot.classList.contains('hide-print')) { // استخدام getComputedStyle للتحقق من الظهور
        if (!tfoot.textContent || tfoot.textContent.trim() === '') { // تحقق من كون النص فارغًا
          tfoot.textContent = countValue;
        }
        break; // إنهاء الحلقة بعد العثور على أول عنصر غير مخفي
      }
    }

  } catch (error) {
    console.error('Error in beforeprint_reviewTable:', error);
  }

  // مثال على كيفية الاستخدام
//window.addEventListener('beforeprint', function() {
  //beforeprint_reviewTable('employees_table', 0, 1, 2); // سيخفي الأعمدة 1 و 2 و 3 أثناء الطباعة
//});

}






//#endregion


//#region Numbers Formating show seperator
// function floatToString(is_showZero, floatValue) {
//   try {
//     let num = parseFloat(floatValue);
//     if (num === 0 && is_showZero) return '';
//     return num.toLocaleString('en-US', {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2
//     });
//   } catch (error) {
//     catch_error(error);
//   }
// }


function floatToString(is_showZero, floatValue) {
  try {
    let num = parseFloat(floatValue);
    
    if (num === 0) {
      if (is_showZero) return '0.00';
      return '';
    }
    
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  } catch (error) {
    catch_error(error);
  }
}

// hiden seperator
function stringToFloat(is_showZero, stringFloatValue) {
  let NewfloatValue = parseFloat(stringFloatValue.replace(/,/g, ''));
  if (parseFloat(stringFloatValue) === 0) {
    if (!is_showZero) {
      return ''
    }
  }
  return NewfloatValue
}

//#endregion

//#region table-sorting
// دالة لتطبيق الترتيب على جدول
// tableSort.js

function copyTableToClipboard(copyBtn,tableNameID) {
  try {
    showLoadingIcon(copyBtn)
    let table = document.getElementById(tableNameID);
    let rows = table.querySelectorAll('tr');
    let dataToCopy = '';

    // Loop through each row to collect visible data
    for (const row of rows) {
        let cells = Array.from(row.querySelectorAll('th, td')).slice(1); // Skip the first column
        let rowText = '';

        for (const cell of cells) {
            // Skip hidden columns
            if (window.getComputedStyle(cell).display !== 'none') {
                rowText += cell.innerText + '\t'; // Tab delimited
            }
        }

        dataToCopy += rowText.trim() + '\n'; // Newline for each row
    }

    // Copy the collected data to the clipboard
    navigator.clipboard.writeText(dataToCopy).then(() => {
      showAlert('info','تم نسخ البيانات بنجاح!')
       
    }).catch(err => {
        console.error('فشل في نسخ البيانات: ', err);
    });
    hideLoadingIcon(copyBtn)
  } catch (error) {
    hideLoadingIcon(copyBtn)
    showAlert('fail','حدث خطأ اثناء نسخ البيانات')
    catch_error(error);
  }
}



// دالة لتطبيق الترتيب على جدول
function applySorting(tableId, columnIndex, sortOrder = 'asc') {
  try {
    const table = document.getElementById(tableId);
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // افترض أن صف الإجمالي هو آخر صف في tbody
    const totalRow = rows.pop();

    // فرز الصفوف المتبقية
    rows.sort((a, b) => {
      const aText = a.children[columnIndex].textContent.trim();
      const bText = b.children[columnIndex].textContent.trim();

      if (sortOrder === 'asc') {
        return aText.localeCompare(bText, undefined, { numeric: true });
      } else {
        return bText.localeCompare(aText, undefined, { numeric: true });
      }
    });

    // إعادة إضافة الصفوف إلى الجدول
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));

    // إضافة صف الإجمالي مرة أخرى
    tbody.appendChild(totalRow);

    // تحديث أيقونات الترتيب
    updateSortIcons(tableId, columnIndex, sortOrder);
  } catch (error) {
    catch_error(error);
  }
}


// دالة لتحديث أيقونات الترتيب في رؤوس الأعمدة
function updateSortIcons(tableId, activeColumnIndex, sortOrder) {
  try {
    
  const table = document.getElementById(tableId);
  const headers = table.querySelectorAll('thead th');

  headers.forEach((header, index) => {
    const icon = header.querySelector('.sort-icon');
    if (index === activeColumnIndex) {
      if (icon) {
        icon.classList.remove('fa-sort', 'fa-sort-up', 'fa-sort-down');
        icon.classList.add(sortOrder === 'asc' ? 'fa-sort-up' : 'fa-sort-down');
      } else {
        header.innerHTML += ` <i class="sort-icon fas ${sortOrder === 'asc' ? 'fa-sort-up' : 'fa-sort-down'}"></i>`;
      }
    } else {
      if (icon) {
        icon.classList.remove('fa-sort-up', 'fa-sort-down');
        icon.classList.add('fa-sort');
      }
    }
  });
} catch (error) {
    catch_error(error)
}
}

// إضافة مستمعي الأحداث لرؤوس الأعمدة لتفعيل الترتيب عند النقر
function setupColumnSorting(tableId) {
try {
  
  const table = document.getElementById(tableId);
  const headers = table.querySelectorAll('thead th');

  // if (!table || !headers) {
  //   return
  // }

  
  headers.forEach((header, index) => {
    header.addEventListener('click', () => {
      const currentOrder = header.getAttribute('data-sort-order') || 'asc';
      const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';

      header.setAttribute('data-sort-order', newOrder);
      applySorting(tableId, index, newOrder);
    });
  });
} catch (error) {
 catch_error(error) 
}
}

// تأكد من أن الدالة setupColumnSorting يمكن استدعاؤها بعد تحميل الصفحة
// document.addEventListener('DOMContentLoaded', () => {
//   setupColumnSorting('employees_table'); // يمكنك تغيير 'employees_table' إلى معرّف الجدول المناسب
// });


// تأكد من أن الدالة setupColumnSorting يمكن استدعاؤها بعد تحميل الصفحة
//document.addEventListener('DOMContentLoaded', () => {
  //setupColumnSorting('employees_table'); // يمكنك تغيير 'employees_table' إلى معرّف الجدول المناسب
//});
//#endregion



//#region dragable ( rows > drag and drop )
function makeTableRowsDraggable(tableId) {
  const table = document.getElementById(tableId).getElementsByTagName('tbody')[0];
  let draggedRow = null;
  let initialY = null;

  const startDragHandler = function (event) {
    if (event.target.classList.contains('drag-handle')) {
      draggedRow = event.target.closest('tr');
      draggedRow.style.cursor = 'grabbing';
      initialY = event.clientY || event.touches[0].clientY;
    }
  };

  const dragMoveHandler = function (event) {
    if (draggedRow) {
      const currentY = event.clientY || event.touches[0].clientY;
      const deltaY = currentY - initialY;
      draggedRow.style.transform = `translateY(${deltaY}px)`;
    }
  };

  const endDragHandler = function (event) {
    if (draggedRow) {
      draggedRow.style.cursor = 'grab';
      draggedRow.style.transform = '';
      const targetRow = document.elementFromPoint(
        event.clientX || event.changedTouches[0].clientX,
        event.clientY || event.changedTouches[0].clientY
      ).closest('tr');

      if (targetRow && targetRow !== draggedRow && table.contains(targetRow)) {
        const rows = Array.from(table.children);
        const indexDragged = rows.indexOf(draggedRow);
        const indexTarget = rows.indexOf(targetRow);

        if (indexTarget > indexDragged) {
          table.insertBefore(draggedRow, targetRow.nextSibling);
        } else {
          table.insertBefore(draggedRow, targetRow);
        }
      }
      draggedRow = null;
      initialY = null;
    }
    reset_rowcount_in_table(tableId)

  };

  table.addEventListener('mousedown', startDragHandler);
  table.addEventListener('touchstart', startDragHandler);

  document.addEventListener('mousemove', dragMoveHandler);
  document.addEventListener('touchmove', dragMoveHandler);

  document.addEventListener('mouseup', endDragHandler);
  document.addEventListener('touchend', endDragHandler);

  table.addEventListener('dragstart', function (event) {
    event.preventDefault();
  });
}




//*HOW TO USE 
/*
1 : hat7ot fe ele button el 5as be ele draggable fe el table tr  ha7ot class = 'drag-handle'
2 : lazem if there is icon inside button yo have to make it disabled click like that 
                          <button class="drag-handle ta7ded1">
                    <i class="fa-solid fa-arrows-up-down" style=" pointer-events: none;"></i>
                    </button>

3 : call the funcion and path the id of table as a parameter  makeTableRowsDraggable('myTable');
4 : Make sure that table is loaded befor you call this function > @!important 
*/

//#endregion END - dragable 
//#endregion ENd - table

//#region day_name
function day_name(dateStr) {
  // صيغة التاريخ: dd-mm-yyyy

  // const dateStr = "05-02-2024";

  // نقوم بتقسيم التاريخ إلى يوم، شهر، وسنة
  const [year, month, day] = dateStr.split('-');

  // نقوم بإنشاء كائن Date باستخدام السنة، الشهر واليوم
  const date = new Date(`${year}-${month}-${day}`);

    // نضيف يومًا واحدًا للحصول على اليوم التالي
    date.setDate(date.getDate() + 1);


  const options = { weekday: 'short' }; // تحديد نوع الترجمة
  const currentLang = localStorage.getItem('currentLang')
  if (currentLang === 'ar') {
    const dayName = date.toLocaleDateString('ar-EG', options); // هنا "ar-EG" يشير إلى اللغة العربية
    return dayName
  } else {
    const dayName = date.toLocaleDateString('en-US', options); // هنا "ar-EG" يشير إلى اللغة العربية
    return dayName
  }

}

//* HOW TO USE
/*
const date = '2024-04-16'
const day =  day_name(date);
console.log(day);
*/

//#endregion end day_name

//#region showReason of redirection
//! الكود دا خاص بملف ال روووتس  هو الى من خلاله بجيب القيم بتاع  سويتش كيس
function show_redirection_Reason() {
  let message;
  const urlParams = new URLSearchParams(window.location.search);
  const reason = urlParams.get("reason");

  if (reason) {
    switch (reason) {
      case "0":
        message = "عفوا , انت لا تملك صلاحيه العرض"; // Unauthorized message in Arabic
        break;
      case "1":
        message = "عفوا , انت لا تملك صلاحيه الاضافه"; // Unauthorized message in Arabic
        break;
      case "2":
        message = "عفوا , انت لا تملك صلاحيه التعديل"; // Invalid credentials message in Arabic
        break;
      case "3":
        message = "عفوا , انت لا تملك صلاحيه الحذف"; // Invalid credentials message in Arabic
        break;
      default:
        message = "حدث خطأ غير معروف."; // Default error message
    }
  };

  if (message) {
    showAlert('fail', message);
  }
};


//#endregion End - showReason of redirection

//#region dropdown
// const dropdowns = document.querySelectorAll(".dropdown");

// dropdowns.forEach(dropdown => {
//     const dropdown_select = dropdown.querySelector(".dropdown_select");
//     const dropdown_menue = dropdown.querySelector(".dropdown_menue");
//     // show menue
//     dropdown_select.addEventListener("click", function(){
//         dropdown_menue.classList.toggle("active");
//     });

//     // when click out of dropdown
//     document.addEventListener("click", function(event){
//         if (!dropdown.contains(event.target)){ // ! ta3nt 3aks el el value ya3ny  if el target ely dost 3aleh click ((msh)) wa7ed mn 3nasr el dropdwon
//             dropdown_menue.classList.remove("active")
//         }
//     });

//     // when click Esc 
//     document.addEventListener("keydown",function(event){
//         if (event.keyCode === 27) {
//             if (dropdown.contains(event.target)){
//                 dropdown_menue.classList.remove("active");
//             };
//         };
//     });
// });


//!#region Open Menue -- sidbar
const sidebar = document.querySelector('#sidebar');
const MenueIcon = document.querySelector('#MenueIcon');
const closeMenueIcon = document.querySelector('#closeMenueIcon');


// اظهار واخفاء القائمة   عند الضغط على زرار القائمة
if (MenueIcon){
  MenueIcon.addEventListener('click', function (event) {
    event.preventDefault(); // stop a deafult herf 
    hide_User_options(); // el ta2ked 3ala en el user_options_div is hidden
    const sidebar_status = sidebar.classList.contains("sidebar_Media_Show"); // check if sidbar have this class or no
    if (!sidebar_status) {
      showMenue();
    } else {
      hideMenue();
    }
  })
}


// ازالة كلاس الشاشه الصغيره اذا كان موجود وتم تغيير حجم الشاشه لاكبر من 750 بيكسيل
window.addEventListener('resize', function () {
  if (window.innerWidth > 750) {
    // إزالة الفئة المحددة إذا كان عنصر الشاشة أصغر من 750 بكسل
    // sidebar.classList.remove("sidebar_Media_Show");
    hideMenue();
  }
});
// اخفاء القائمة عند الضغط على زر الاغلاق الموجود فى اعلى القائمة
if (closeMenueIcon){
  closeMenueIcon.addEventListener('click', function () {
    // sidebar.classList.remove("sidebar_Media_Show");
    hideMenue();
  })
}


function showMenue() {
  if (!sidebar){
    return
  }
  sidebar.classList.add("sidebar_Media_Show");
  sidebar.classList.add("show");
  body.classList.add('no_scroll');
};

function hideMenue() {
  if (!sidebar){
    return
  }
  sidebar.classList.remove("show");
  sidebar.classList.add("hide");
  setTimeout(() => {
    sidebar.classList.remove("sidebar_Media_Show");
    sidebar.classList.remove("hide");
  }, 300); /* تأكد من إزالة الفئات بعد انتهاء الرسوم المتحركة */
  body.classList.remove('no_scroll');
}

//#endregion Open Menue


//#endregion

//#region  selects and options 

function changeSelect(selectId, optionValue) {
  const selectElement = document.querySelector('#' + selectId);
  const selectedOption = selectElement.querySelector('option[value="' + optionValue + '"]');
  if (selectedOption) {
    selectedOption.selected = true;
  }
}


//#endregion End - selects and options 

//#region back and forward

// function back() {
//   window.history.back();
// };

function forward() {
  window.history.forward();
};
//#endregion end -  region back and forward

//#region redirection and reason
async function redirection(page, messageType, messageText) {
  showAlert(messageType, messageText);
  body.style.pointerEvents = 'none';

  // تأخير تنفيذ الكود بمدة 3 ثواني
  await new Promise(resolve => setTimeout(resolve, 3000));

  // توجيه المستخدم إلى الصفحة المحددة بواسطة window.location.href
  window.location.href = page;
};


async function urlParamsRedirection(urlParams_object, redirectionPage, messageType, messageText) {
  showAlert(messageType, messageText);
  body.style.pointerEvents = 'none';

  // تأخير تنفيذ الكود بمدة 3 ثواني
  await new Promise(resolve => setTimeout(resolve, 3000));

    const encodedData = encodeURIComponent(JSON.stringify(urlParams_object));
    window.location.href = `${redirectionPage}?data=${encodedData}`
};



function showRedirectionReason() {
  let message;
  const urlParams = new URLSearchParams(window.location.search);
  const reason = urlParams.get("reason");

  if (reason) {
    switch (reason) {
      case "0":
        message = "عفوا , انت لا تملك صلاحيه العرض"; // Unauthorized message in Arabic
        break;
      case "1":
        message = "عفوا , انت لا تملك صلاحيه الاضافه"; // Unauthorized message in Arabic
        break;
      case "2":
        message = "عفوا , انت لا تملك صلاحيه التعديل"; // Invalid credentials message in Arabic
        break;
      case "3":
        message = "عفوا , انت لا تملك صلاحيه الحذف"; // Invalid credentials message in Arabic
        break;
      default:
        message = "حدث خطأ غير معروف."; // Default error message
    }
  };

  if (message) {
    showAlert('fail', message);
  }
}
//#endregion END - redirection

//#region logout
// افتراض أن لدينا زر تسجيل الخروج بالاسم logoutButton في الـ HTML
async function logout() {
  try {

    await showDialog('', 'هل تريد الخروج من التطبيق ؟', '');
    if (!dialogAnswer) {
      return
    }


    hide_User_options(); // hide user_option div

    const response = await fetch('/Logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (data.success) {
      closeDialog();
      sessionStorage.clear();
      redirection('login', 'info', 'تم تسجيل الخروج بنجاح : سيتم تجويلك الى الصفحه الرئيسيه')
    } else {
      showAlert('fail', data.message);
    }
  } catch (error) {
    closeDialog();
    catch_error('logout Error', error.message);
  }
};


async function khorogFawry(message) {
  try {

    // await showDialog('', 'هل تريد الخروج من التطبيق ؟', '');
    // if (!dialogAnswer) {
    //   return
    // }


    hide_User_options(); // hide user_option div

    const response = await fetch('/Logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

     let txt = message ? message : 'قام احد المستخدمين بمحاولة تسجيل الدخول بالحساب الحالى : سيتم تجويلك الى الصفحه الرئيسيه'

    if (data.success) {
      closeDialog();
      redirection('login', 'info', txt )
    } else {
      showAlert('fail', data.message);
    }
  } catch (error) {
    closeDialog();
    catch_error('logout Error', error);
  }
};


// تسجيل خروج فى حاله اغلاق المتسفح او الصفحه بدون تسجيل خروج
// window.addEventListener('beforeunload', function () {
//   logout()
// })

// window.addEventListener('beforeunload', function () {
//   const url = '/Logout';
//   navigator.sendBeacon(url);
// });

//#endregion End -- Logout

//#region sidbar custmize 

// handle users_control_a

const users_control_a = document.querySelector(`#users_control_a`)
let general_permission = parseInt(sessionStorage.getItem('general_permission')) || 0;
let owner = sessionStorage.getItem('owner');

// console.log(owner);
if (users_control_a){
  if (owner === 'true' || !isNaN(general_permission) && general_permission === 6) {
    document.querySelector(`#users_control_a`).style.display = 'block';
  } else {
    document.querySelector(`#users_control_a`).style.display = 'none';
  }
}



//#endregion

//#region password input show and hidden in input 

//#region how its work work ? 
/*
عند استدعاء الداله لازم تستخدم  الاحداث الاربعه دول 
              <button id="show_pass_btn1" class="btn_eye hover" 
          onmousedown="showPassword('pass_input1', 'eye_icon1')"
          onmouseup="hidePassword('pass_input1', 'eye_icon1')" 
          ontouchstart="showPassword('pass_input1', 'eye_icon1')"   دا عشان الاندرويد
          ontouchend="hidePassword('pass_input1', 'eye_icon1')"    دا عشان الاندرويد
          ><i id="eye_icon1" class="fa-regular fa-eye eye_icon"></i>
        </button>
*/
//#endregion end how to wirk

//#region functions
function showPassword(inputId, iconId) {
  const passwordField = document.querySelector("#" + inputId);
  const eyeIcon = document.querySelector("#" + iconId);
  passwordField.type = "text";
  eyeIcon.classList.remove("fa-eye");
  eyeIcon.classList.add("fa-eye-slash");
}

function hidePassword(inputId, iconId) {
  const passwordField = document.querySelector("#" + inputId);
  const eyeIcon = document.querySelector("#" + iconId);
  passwordField.type = "password";
  eyeIcon.classList.remove("fa-eye-slash");
  eyeIcon.classList.add("fa-eye");
}
//#endregion end - functions

//#endregion END-pasword input

//#region check input type
let inputErrors = false; // المتغير العالمي لتتبع وجود الأخطاء في الإدخال

// دالة لفحص وتحديث حالة الأخطاء في جميع حقول الإدخال
function updateInputErrors() {
  // العثور على جميع العناصر التي تحتوي على الصنف 'input_error'
  const errorElements = document.querySelectorAll('.input_error');
  let hasError = false; // متغير لتتبع وجود أخطاء

  if (errorElements.length > 0) {
    hasError = true;
  }

  // تحديث قيمة inputErrors بناءً على وجود أخطاء
  inputErrors = hasError;
}


// دالة للتحقق من صحة القيمة في حقل الإدخال
function check_parse(inputid, type) {
  let value

  const elementType = inputid.tagName.toLowerCase();
  // console.log(elementType);
  if (elementType === 'td' || elementType === 'div') {
    value = inputid.textContent;
  } else if (elementType === 'input' || elementType === 'textarea') {
    value = inputid.value;
  }


  // احصل على قيمة حقل الإدخال
  // const specialCharRegex = /['";$%&<>]/; // التعبير المنتظم للتحقق من الرموز الخاصة
  const specialCharRegex = /['";$&<>]/; // التعبير المنتظم للتحقق من الرموز الخاصة  تم ازالة علامه ال %

  // إذا كان حقل الإدخال فارغًا، أعد null
  if (!value || value.trim() === '') {
    inputid.classList.remove('hover_error', 'input_error');
    updateInputErrors(); // تحديث حالة الأخطاء
    return null;
  }

  // تحقق من نوع القيمة بناءً على نوع البيانات المطلوب
  if (type === 'string') {
    // تحقق من وجود أي من الرموز الخاصة في القيمة
    // if (isNaN(value) && !specialCharRegex.test(value)) {  //  old
    if (!specialCharRegex.test(value)) {
      inputid.classList.remove('hover_error', 'input_error');
      updateInputErrors(); // تحديث حالة الأخطاء
    } else {
      inputid.classList.add('hover_error', 'input_error');
      updateInputErrors(); // تحديث حالة الأخطاء
      // console.log(inputErrors);
    }
  }

  if (type === 'number') {
    // تحقق من وجود أي من الرموز الخاصة في القيمة
    if (isNaN(value) && !specialCharRegex.test(value)) {
      inputid.classList.add('hover_error', 'input_error');
      updateInputErrors(); // تحديث حالة الأخطاء
    } else {
      inputid.classList.remove('hover_error', 'input_error');
      updateInputErrors(); // تحديث حالة الأخطاء
    }
  }
}


//#endregion end - check input type

//#region  loading
function showLoadingIcon(element) {
  try {

    if (element === content_space){      
      if (page_content) {

        page_content.style.display = 'none'
      }
      content_space.classList.add('loading_icon_content_space');
    }else{
      element.classList.add('loading_icon_btns');
    }
    
    
    // element.style.pointerEvents = 'none'; // تعطيل التفاعل مع العنصر
    // body_content.style.pointerEvents = 'none'; // تعطيل التفاعل مع العنصر
    body.style.pointerEvents = 'none'; // تعطيل التفاعل مع العنصر
    // element.disabled = true; // تعطيل العنصر
    element.title = 'رجاء الانتظار قليلا...' // اضافه تلميح
  } catch (error) {
    catch_error(error)
  }
}

//* how to use 
/*
de ay code hat7to keda 
const login_div = document.querySelector('#login_div');   << da el zorar ely enta 3ayz yzhar feh el icon

hategy maslan apl el fetch tro7 fe el fn 3amel keda
showLoadingIcon(loginBtn);

nfs el amr fe el hideen loading
*/


function hideLoadingIcon(element) {
  try {
    if (!element) {
      return;
    }

    if (element === content_space){
      if (page_content) {
        page_content.style.display = 'flex'
      }
      content_space.classList.remove('loading_icon_content_space');
    }else{
      element.classList.remove('loading_icon_btns');
    }

    // element.style.pointerEvents = 'auto'; // تعطيل التفاعل مع العنصر
    // body_content.style.pointerEvents = 'auto'; // تعطيل التفاعل مع العنصر
    body.style.pointerEvents = 'auto'; // تعطيل التفاعل مع العنصر
    element.classList.remove('loading_icon_btns', 'loading_icon_content_space');
    // element.disabled = false; // تشغيل العنصر
    element.title = ''  // تعطيل ال التلميح
  } catch (error) {
    catch_error(error)
  }

}


//#endregion end- loading

//#region fetching...



//#region Update fetching...
async function fetchUpdate1(posted_elements_AS_OBJECT, permission_name_string, dialogMessage_string, ResponseTimeBySecends_Time_secends, FetchURL_string, redirctionStatues_boolean, redirectionPage_string,) {
  const controller = new AbortController();
  const signal = controller.signal;

  try {
    if (inputErrors) {
      showAlert('fail', 'رجاء أصلح حقول الإدخال التي تحتوي على أخطاء');
      return;
    }

    const permission = await btn_permission(permission_name_string, 'update');

    if (!permission) {
      return;
    };

    // // تجهيز البيانات للإرسال إلى الخادم
    // const posted_elements = {
    //     user_id,
    // };

    await showDialog('', dialogMessage_string, '');
    if (!dialogAnswer) {
      return;
    }

    // تعيين حد زمني للطلب
    const timeout = setTimeout(() => {
      controller.abort(); // إلغاء الطلب
    }, ResponseTimeBySecends_Time_secends * 1000); // 10 ثواني

    // إرسال الطلب إلى الخادم
    const response = await fetch(FetchURL_string, {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(posted_elements_AS_OBJECT),
      signal, // تمرير الإشارة لإلغاء الطلب
    });

    // إلغاء المهلة الزمنية إذا تمت الاستجابة في الوقت المناسب
    clearTimeout(timeout);

    if (response.ok) {
      const data = await response.json();
      closeDialog();
      if (data.success) {
        if (redirctionStatues_boolean) {
          body_content.style.pointerEvents = 'none'; // disable body_content
          redirection(redirectionPage_string, 'success', data.message);
        }
      } else {
        body_content.style.pointerEvents = 'auto'; // disable body_content
        showAlert('fail', data.message);
      }
    } else {
      closeDialog();
      showAlert('fail', `Request failed with status code: ${response.status}`);
    }
  } catch (error) {
    closeDialog();
    catch_error(error);
    showAlert('fail', 'حدث خطأ أثناء تنفيذ عمليه تحديث البيانات .');
  }

}
//#endregion END - update - fetching

//#region delete fetching
async function fetchDelete1(posted_elements_AS_OBJECT, permission_name, dialogMessage, ResponseTimeBySecends, FetchURL, redirction_Boolean_Statues, redirectionPage,) {
  const controller = new AbortController();
  const signal = controller.signal;

  try {
    if (inputErrors) {
      showAlert('fail', 'رجاء أصلح حقول الإدخال التي تحتوي على أخطاء');
      return;
    }

    const permission = await btn_permission(permission_name, 'delete');

    if (!permission) {
      return;
    };

    // // تجهيز البيانات للإرسال إلى الخادم
    // const posted_elements = {
    //     user_id,
    // };

    await showDialog('', dialogMessage, '');
    if (!dialogAnswer) {
      return;
    }

    // تعيين حد زمني للطلب
    const timeout = setTimeout(() => {
      controller.abort(); // إلغاء الطلب
    }, ResponseTimeBySecends * 1000); // 10 ثواني

    // إرسال الطلب إلى الخادم
    const response = await fetch(FetchURL, {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(posted_elements_AS_OBJECT),
      signal, // تمرير الإشارة لإلغاء الطلب
    });

    // إلغاء المهلة الزمنية إذا تمت الاستجابة في الوقت المناسب
    clearTimeout(timeout);

    if (response.ok) {
      const data = await response.json();
      closeDialog();
      if (data.success) {
        if (redirction_Boolean_Statues) {
          body_content.style.pointerEvents = 'none';
          redirection(redirectionPage, 'success', data.message);
        }
      } else {
        body_content.style.pointerEvents = 'auto';
        showAlert('fail', data.message);
      }
    } else {
      closeDialog();
      showAlert('fail', `Request failed with status code: ${response.status}`);
    }
  } catch (error) {
    closeDialog();
    showAlert('fail', 'حدث خطأ أثناء تنفيذ عمليه حذف البيانات .');
    catch_error(error);
    // console.error("Error deleting employee:", error.message);

  }

}
//#endregion End - delete fetching


async function fetchData_post1(FetchURL, posted_elements_AS_OBJECT, permission_name, permission_type, dialogMessage, ResponseTimeBySecends, redirectionPage, error_message) {
  const controller = new AbortController();
  const signal = controller.signal;

  // console.log(inputErrors);
  try {
    if (inputErrors) {
      showAlert('fail', 'رجاء أصلح حقول الإدخال التي تحتوي على أخطاء');
      return;
    }

    const permission = await btn_permission(permission_name, permission_type);

    if (!permission) {
      return;
    };


    // // تجهيز البيانات للإرسال إلى الخادم
    // const posted_elements = {
    //     user_id,
    // };

    await showDialog('', dialogMessage, '');
    if (!dialogAnswer) {
      return;
    }

    // تعيين حد زمني للطلب
    const timeout = setTimeout(() => {
      controller.abort(); // إلغاء الطلب
    }, ResponseTimeBySecends * 1000); // 10 ثواني

    // إرسال الطلب إلى الخادم
    const response = await fetch(FetchURL, {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(posted_elements_AS_OBJECT),
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
        if (data.xx && data.xx === true) {
          redirection('login', 'fail', data.message_ar)
        } else {
          showAlert('fail', data.message_ar);
        }

      }
    } else {
      closeDialog();
      showAlert('fail', `Request failed with status code: ${response.status}`);
    }
  } catch (error) {
    closeDialog();
    if (error.name === 'AbortError') {
      showAlert('fail', 'Request timed out. Please try again.');
    } else {
      showAlert('fail', error_message);
      catch_error(error);
    }
  }
}

async function fetchData_post1(FetchURL, posted_elements_AS_OBJECT, permission_name, permission_type, dialogMessage, ResponseTimeBySecends, redirectionPage, error_message) {
  const controller = new AbortController();
  const signal = controller.signal;

  // console.log(inputErrors);
  try {
    if (inputErrors) {
      showAlert('fail', 'رجاء أصلح حقول الإدخال التي تحتوي على أخطاء');
      return;
    }

    const permission = await btn_permission(permission_name, permission_type);

    if (!permission) {
      return;
    };


    // // تجهيز البيانات للإرسال إلى الخادم
    // const posted_elements = {
    //     user_id,
    // };

    await showDialog('', dialogMessage, '');
    if (!dialogAnswer) {
      return;
    }

    // تعيين حد زمني للطلب
    const timeout = setTimeout(() => {
      controller.abort(); // إلغاء الطلب
    }, ResponseTimeBySecends * 1000); // 10 ثواني

    // إرسال الطلب إلى الخادم
    const response = await fetch(FetchURL, {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(posted_elements_AS_OBJECT),
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
        if (data.xx && data.xx === true) {
          redirection('login', 'fail', data.message_ar)
        } else {
          showAlert('fail', data.message_ar);
        }

      }
    } else {
      closeDialog();
      showAlert('fail', `Request failed with status code: ${response.status}`);
    }
  } catch (error) {
    closeDialog();
    if (error.name === 'AbortError') {
      showAlert('fail', 'Request timed out. Please try again.');
    } else {
      showAlert('fail', error_message);
      catch_error(error);
    }
  }
}


// let data = [];
async function fetchData_postAndGet(FetchURL, posted_elements_AS_OBJECT, permission_name, permission_type, ResponseTimeBySecends, is_confirm_dialog, dialogMessage, is_close_dialog, is_showLoadingIcon, Element_showLoadingIcon_as_avariable, is_redirection_page, redirection_page, is_urlParams, urlParams_object, urlParams_Page, is_ERROR_redirection_page, ERROR_redirection_page, error_message) {
  const controller = new AbortController();
  const signal = controller.signal;

  try {

    
    if (is_showLoadingIcon) {
      showLoadingIcon(Element_showLoadingIcon_as_avariable)

    }


    if (inputErrors) {
      showAlert('fail', 'رجاء أصلح حقول الإدخال التي تحتوي على أخطاء');
      hideLoadingIcon(Element_showLoadingIcon_as_avariable)
      return false;
    }

    
    const permission = await btn_permission(permission_name, permission_type);

    if (!permission) {
      hideLoadingIcon(Element_showLoadingIcon_as_avariable)
      return false;
    };

    
    

    if (is_confirm_dialog) {
      if (is_confirm_dialog === true)
        await showDialog('', dialogMessage, '');        
      if (!dialogAnswer) {
        hideLoadingIcon(Element_showLoadingIcon_as_avariable)
        return false;
      }
    }

    

    // تعيين حد زمني للطلب
    const timeout = setTimeout(() => {
      controller.abort(); // إلغاء الطلب
    }, ResponseTimeBySecends * 1000); //

    // إرسال الطلب إلى الخادم
    
    const response = await fetch(FetchURL, {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(posted_elements_AS_OBJECT),
      signal, // تمرير الإشارة لإلغاء الطلب
    });

    
    // إلغاء المهلة الزمنية إذا تمت الاستجابة في الوقت المناسب
    clearTimeout(timeout);

    if (response.ok) {
      hideLoadingIcon(Element_showLoadingIcon_as_avariable)
      if (is_close_dialog === true) { closeDialog(); }
      

      const data = await response.json();
      if (data.xx && data.xx === true) {
        closeDialog();
        redirection('login', 'fail', data.message_ar)
        return false
      } else {
        if (data.success && is_redirection_page) {
          closeDialog();
          body_content.style.pointerEvents = 'none';
          redirection(redirection_page, 'success', data.message_ar);
          return true
        }else if (is_confirm_dialog){
          closeDialog();
          if (data.success) {
            showAlert('success',data.message_ar)
            return true
          } else {
            showAlert('fail',data.message_ar)
            return false
          } 
        } else {
          return data; // إرجاع البيانات لاستخدامها خارج الدالة
        }

      }
    } else {
      hideLoadingIcon(Element_showLoadingIcon_as_avariable)
      if (is_close_dialog === true) { closeDialog(); }
      showAlert('fail', `Request failed with status code: ${response.status}`);
    }
  } catch (error) {
    hideLoadingIcon(Element_showLoadingIcon_as_avariable)
    closeDialog();
    if (error.name === 'AbortError') {
      showAlert('fail', 'Request timed out. Please try again.');
      return false;
    } else {
      showAlert('fail', error_message);
      catch_error(error);
      return false
    }
  }
}



async function new_fetchData_postAndGet(FetchURL, posted_elements_AS_OBJECT, permission_name, permission_type, ResponseTimeBySecends, is_confirm_dialog, dialogMessage, is_close_dialog, is_showLoadingIcon, Element_showLoadingIcon_as_avariable, is_urlParams, urlParams_object, urlParams_redirectionPage, is_redirection_page, redirection_page, is_ERROR_redirection_page, ERROR_redirection_page, error_message) {
  const controller = new AbortController();
  const signal = controller.signal;

  try {

    
    if (is_showLoadingIcon) {
      showLoadingIcon(Element_showLoadingIcon_as_avariable)

    }


    if (inputErrors) {
      showAlert('fail', 'رجاء أصلح حقول الإدخال التي تحتوي على أخطاء');
      hideLoadingIcon(Element_showLoadingIcon_as_avariable)
      return false;
    }

    
    const permission = await btn_permission(permission_name, permission_type);

    if (!permission) {
      hideLoadingIcon(Element_showLoadingIcon_as_avariable)
      return false;
    };

    
    

    if (is_confirm_dialog) {
      if (is_confirm_dialog === true)
        await showDialog('', dialogMessage, '');        
      if (!dialogAnswer) {
        hideLoadingIcon(Element_showLoadingIcon_as_avariable)
        return false;
      }
    }

    

    // تعيين حد زمني للطلب
    const timeout = setTimeout(() => {
      controller.abort(); // إلغاء الطلب
    }, ResponseTimeBySecends * 1000); //

    // إرسال الطلب إلى الخادم
    
    const response = await fetch(FetchURL, {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(posted_elements_AS_OBJECT),
      signal, // تمرير الإشارة لإلغاء الطلب
    });

    
    // إلغاء المهلة الزمنية إذا تمت الاستجابة في الوقت المناسب
    clearTimeout(timeout);

    if (response.ok) {
      hideLoadingIcon(Element_showLoadingIcon_as_avariable)
      if (is_close_dialog === true) { closeDialog(); }
    
      const data = await response.json();
      if (data.xx && data.xx === true) {
        closeDialog();
        redirection('login', 'fail', data.message_ar)
        return false
      } else {
        if (data.success && is_urlParams){
          closeDialog();
          body_content.style.pointerEvents = 'none';
          urlParamsRedirection(urlParams_object, urlParams_redirectionPage, 'success', data.message_ar);
          return true
        } else if (data.success && is_redirection_page) {
          closeDialog();
          body_content.style.pointerEvents = 'none';
          redirection(redirection_page, 'success', data.message_ar);
          return true
        }else if (is_confirm_dialog){
          closeDialog();
          if (data.success) {
            showAlert('success',data.message_ar)
            return true
          } else {
            showAlert('fail',data.message_ar)
            return false
          } 
        } else {
          return data; // إرجاع البيانات لاستخدامها خارج الدالة
        }

      }
    } else {
      hideLoadingIcon(Element_showLoadingIcon_as_avariable)
      if (is_close_dialog === true) { closeDialog(); }
      if (is_ERROR_redirection_page){
        if (is_urlParams) {
          urlParamsRedirection(urlParams_object, ERROR_redirection_page, 'fail', error_message);
        } else {
          redirection(ERROR_redirection_page, 'fail', error_message);
        }
      }
      showAlert('fail', error_message);
      return false
    }
  } catch (error) {
    hideLoadingIcon(Element_showLoadingIcon_as_avariable)
    closeDialog();
    if (error.name === 'AbortError') {
      showAlert('fail', 'Request timed out. Please try again.');
      return false;
    } else {
      
      catch_error(error);
      if (is_ERROR_redirection_page){
        if (is_urlParams) {
          urlParamsRedirection(urlParams_object, ERROR_redirection_page, 'fail', error_message);
        } else {
          redirection(ERROR_redirection_page, 'fail', error_message);
        }
      }
      showAlert('fail', error_message);
      return false
    }
  }
}



//#endregion END- fetching

//#region document EVENTS

//#region escape btn

function hideOnDocumentClick(event, FN, ...classes) {
  try {
    const clickedInside = classes.some(className => {
      return event.target.classList.contains(className) || event.target.closest(`.${className}`);
    });
  
    if (!clickedInside) {
      FN();
    }
  } catch (error) {
    catch_error
  }

}


document.addEventListener("click", (event) => {  
  // hideOnDocumentClick(event, hideDropdown, 'dropdown_select_input_table', 'dropdown_menue', 'dropdown_search_input');
  hideOnDocumentClick(event, hide_fn_options_div, 'fn_container_div', 'fn_options_div');
});



document.onkeydown = function (event) {
  if (event.key === 'Escape') {
    // هنا يمكنك وضع الإجراءات التي تريدها عند الضغط على "esc"
    hideMenue();
    closeDialog();
    closeDialog_input()
    hide_User_options();
    hide_fn_options_div();
    tableDropdownList_hideDropdown()
  }
}

//#endregion
//#endregion end- document events

//#region socket
const socket = io();
socket.on('khorogFawry', (data) => {
  const x1 = parseInt(sessionStorage.getItem(`current_id`))
  // console.log(`this is x1 = ${x1} ${typeof(x1)} and this is ${data.x1} ${typeof(data.x1)}`);
  if (x1 && x1 === data.x1) {
    khorogFawry()
  }
});

socket.on('ozkrAllah', (data) => {
  const x1 = sessionStorage.getItem(`userFullName`)
  if (x1) {
    showAlert('warning', `${data.Alzekr} اخى الحبيب ${x1}`)
  } else {
    showAlert('warning', `${data.Alzekr} اخى الحبيب`)
  }

});
//#endregion


const filter_icon = document.querySelector(`#filter_icon`);
const filter_icon_cancel = document.querySelector(`#filter_icon_cancel`);
const filter_div = document.querySelector(`#filter_div`)

function show_filter_div() {
  try {
    if (filter_div !== null) {
      filter_div.classList.remove(`hidden_height`)
      filter_icon.style.display = 'none'
      filter_icon_cancel.style.display = 'flex'
    }
  } catch (error) {
    catch_error(error)
  }
}

function hidden_filter_div() {
  try {
    if (filter_div !== null) {
      filter_div.classList.add(`hidden_height`)
      filter_icon_cancel.style.display = 'none'
      filter_icon.style.display = 'flex'
    }
  } catch (error) {
    catch_error(error)
  }
}




function getURLData(paramName, string_redirectPageOnError, string_redirectionErrorMessage) {
  try {
    // الحصول على سلسلة الاستعلام من الـ URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const encodedData = urlParams.get(paramName);

    // التحقق مما إذا كانت البيانات موجودة
    if (encodedData) {
        return JSON.parse(decodeURIComponent(encodedData));
    } else {
      return 'noParams';
    }
  } catch (error) {
    // catch_error(error)
    redirection(string_redirectPageOnError,'fail',string_redirectionErrorMessage)

    // window.location.href = string_redirectPageOnError;
    return false;
  }
}


/*
// استخدام الدالة
const department_data = getDecodedDataFromURL('data');
if (department_data) {
    console.log('x:', department_data.id);
}
*/


function showHeight(var_element){
  if(var_element !== null){
    var_element.classList.remove(`hidden_height`)
  }
}

function hideHeight(var_element){
  if(var_element !== null){
    var_element.classList.add(`hidden_height`)
  }
}


const fn_icon = document.querySelector(`#fn_icon`)
const fn_options_div = document.querySelector(`#fn_options_div`)

function hide_fn_options_div(){
  if (fn_options_div){    
    hideHeight(fn_options_div)
  }
}

function show_fn_options_div (){
  if (fn_options_div){
    showHeight(fn_options_div)
   }
}



if (fn_icon && fn_options_div){
  fn_icon.onclick = () =>{
    if (fn_options_div.classList.contains(`hidden_height`)){
      showHeight(fn_options_div)
    }else{
      hideHeight(fn_options_div)
    }
  }
}




function textareaFormat(string_td_or_textarea, value) {
  try {
    let result;
    switch (string_td_or_textarea) {
      case 'td':
        result = value.replace(/\n/g, "<br>");
        break;
      case 'textarea':
        result = value.replace(/<br\s*\/?>/gi, "\n");
        break;
      default:
        throw new Error("Invalid input type: must be 'td' or 'textarea'");
    }
    return result;
  } catch (error) {
    catch_error(error);
  }

/* How to use:
    textareaFormat('textarea', row.cells[4].innerHTML);
*/

}

//!Global Code permissions500 F-1
const internal_permissions = [
  "general_permission",
  "accounts_permission",
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
  "itemsLocations_permission",
  "salesman_permission",
  "sales_qutation_permission",
  "sales_order_permission",
  "sales_invoice_permission",
  "purshases_qutation_permission",
  "purshases_order_permission",
  "purshases_invoice_permission",
  "services_permission",
];


function clear_sub_sessionStorage(){

  // حذف الشركة
  sessionStorage.removeItem("company_id");
  sessionStorage.removeItem("company_name");
  
  // حذف جميع الأذونات
  internal_permissions.forEach(permission => {
    sessionStorage.removeItem(permission);
  });
  
}



async function create_drop_down(str_dropDownDivId, str_ApiUrl, str_permissionName, str_permissionType) {
  const dropDownDiv = document.querySelector(`#${str_dropDownDivId}`);
  // dropDownDiv.style.width = '20rem'
  
  if (!dropDownDiv) {
    console.error(`Element with ID '${str_dropDownDivId}' not found.`);
    return;
  }

  // تعريف هيكل القائمة المنسدلة
  const dropDownDiv_structure = `
    <div class="dropdown_select" id="${str_dropDownDivId}_select">
      <input 
        type="search" 
        id="${str_dropDownDivId}_select_input" 
        placeholder="اختر من القائمة"
        class="dropdown_select_input hover" 
        readonly 
        autocomplete="off">
      <i class="fa-solid fa-caret-down left_icon"></i>
      <input type="hidden" id="${str_dropDownDivId}_hidden_input" readonly>
    </div>
    <div class="dropdown_menue hover scroll" id="${str_dropDownDivId}_menue" style="display: none;">

      <div class="dropdown_menue-items" id="${str_dropDownDivId}_items">
        <!-- قائمة الخيارات تظهر هنا -->

              <table id="${str_dropDownDivId}_table" class="review_table">
        <thead>
          <tr>
            <th style="display: none;">ID</th>
            <th>
                <input 
                  type="search" 
                    class="search_input hover" 
                    id="${str_dropDownDivId}_search_input" 
                    placeholder="ابحث هنا..."
                    autocomplete="off">
            </th>
          </tr>
        </thead>
        <tbody></tbody>
        <tfoot>
          <tr id="${str_dropDownDivId}_table_footer_buttons_row">
            <td colspan="2" style="border: none; padding-inline-sratrt: 1rem;">
              <div id="none_Data_${str_dropDownDivId}" style="pointer-events: none;">
                  لا توجد بيانات...
              </div>
              <div id="footer_btn_${str_dropDownDivId}"  class="flex_H">
                <button class="table_footer_show_data" id="showAll_${str_dropDownDivId}">All</button>
                <button class="table_footer_show_data" id="show50_${str_dropDownDivId}">50</button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>

      </div>
    </div>
  `;
  dropDownDiv.innerHTML = ''
  dropDownDiv.insertAdjacentHTML("beforeend", dropDownDiv_structure);


  // عناصر DOM الخاصة بالقائمة
  const dropdown_select = dropDownDiv.querySelector(`#${str_dropDownDivId}_select`);
  const dropdown_select_input = dropDownDiv.querySelector(`#${str_dropDownDivId}_select_input`);
  const icon = dropdown_select.querySelector(`i`)
  const id_hidden_input = dropDownDiv.querySelector(`#${str_dropDownDivId}_hidden_input`);
  const dropdown_menue = dropDownDiv.querySelector(`#${str_dropDownDivId}_menue`);
  const dropdown_search_input = dropDownDiv.querySelector(`#${str_dropDownDivId}_search_input`);
  const dropdownItems = dropDownDiv.querySelector(`#${str_dropDownDivId}_items`);
  const showAlldata_btn = dropDownDiv.querySelector(`#showAll_${str_dropDownDivId}`);
  const Show50_btn = dropDownDiv.querySelector(`#show50_${str_dropDownDivId}`);
  const tableFooterdiv = dropDownDiv.querySelector(`#${str_dropDownDivId}_table_footer_buttons_row`);
  const footer_btn = dropDownDiv.querySelector(`#footer_btn_${str_dropDownDivId}`);
  const none_Data = dropDownDiv.querySelector(`#none_Data_${str_dropDownDivId}`);


  let data = [];
  let array1 = [];
  let slice_Array1 = [];

  // دالة لجلب البيانات
  async function getData_fn() {
    data = await new_fetchData_postAndGet(
      str_ApiUrl,
      {},
      str_permissionName,
      str_permissionType,
      15,
      false, "", true, false, false, false, false,
      false, false, false, "", "حدث خطأ اثناء معالجة البيانات"
    );
    // array1 = data.slice(); // نسخ البيانات
  }

  await getData_fn();

  // دالة عرض أول 50 صف
  function showFirst50RowAtTheBeginning() {
    slice_Array1 = data.slice(0, 50); // أول 50 صف
    fillTable();
    showAlldata_btn.style.display = 'flex'
    Show50_btn.style.display = 'none'
  }

  function showFirst50RowInTable(){
    
    slice_Array1 = data.slice(0, 50); // أول 50 صف
    fillTable();
    showAlldata_btn.style.display = 'flex'
    Show50_btn.style.display = 'none'
  }
  
  function ShowAllDataInTable(){
    slice_Array1 = data
    showAlldata_btn.style.display = 'none'
    Show50_btn.style.display = 'flex'

    fillTable();
  }

  // دالة تعبئة الجدول
  function fillTable() {
  
    
    if (slice_Array1.length === 0) {
      tableFooterdiv.style.display = 'flex'
      footer_btn.style.display = 'none';
      none_Data.style.display = 'flex';
    } else if(slice_Array1.length <= 50) {
      tableFooterdiv.style.display = 'none'
    } else if(slice_Array1.length > 50){
      tableFooterdiv.style.display = 'flex'
      none_Data.style.display = 'none';
      footer_btn.style.display = 'flex';
    }
    
  
    const tbody = dropdownItems.querySelector("tbody");
    tbody.innerHTML = ''
    
    slice_Array1.forEach(row => {
      const new_tr = `
        <tr tabindex="0" class="dropdown_table_tr"> <!-- إضافة tabindex لجعل الصف قابل للتركيز -->
          <td style="display: none;" class="row1">${row.id}</td>
          <td style="width: 100%;" class="row2">${row.account_name}</td>
        </tr>
      `;
      tbody.insertAdjacentHTML("beforeend", new_tr);
    });
  
    const rows = tbody.querySelectorAll("tr");
  
    // تعيين أول صف كـ Focused
    if (rows.length > 0) {
      setFocusedRow(rows[0]);
    }
  
    // إضافة أحداث النقر على الصفوف
    rows.forEach(tr => {
      tr.addEventListener("click", () => selectedRow(tr));
    });
  }
  
  function handleKeyboardNavigation(event) {
    const focusedRow = dropdownItems.querySelector(".focused");
    const allRows = Array.from(dropdownItems.querySelectorAll("tbody tr"));
    const currentIndex = allRows.indexOf(focusedRow);
  
    if (event.key === "ArrowDown") {
      // التنقل إلى الصف التالي
      if (currentIndex < allRows.length - 1) {
        setFocusedRow(allRows[currentIndex + 1]);
      }
      event.preventDefault(); // منع السلوك الافتراضي (مثل التمرير)
    } else if (event.key === "ArrowUp") {
      // التنقل إلى الصف السابق
      if (currentIndex > 0) {
        setFocusedRow(allRows[currentIndex - 1]);
      }
      event.preventDefault();
    } else if (event.key === "Enter" && focusedRow) {
      // اختيار الصف الحالي عند الضغط على Enter
      selectedRow(focusedRow);
      event.preventDefault();
    } else if (event.key === "Escape") {
      hideDropdown();
    }
  
    // أعد التركيز على حقل البحث عند استخدام الأسهم
    dropdown_search_input.focus();
  }
  
  
  // إضافة مستمع أحداث لوحة المفاتيح عند فتح القائمة
  dropdown_menue.addEventListener("keydown", handleKeyboardNavigation);
  
  // تعيين فئة التركيز على صف معين
  function setFocusedRow(row) {
    const allRows = dropdownItems.querySelectorAll("tbody tr");
    allRows.forEach(tr => tr.classList.remove("focused")); // إزالة التركيز
    row.classList.add("focused"); // إضافة التركيز
    row.focus(); // تعيين التركيز للصف
}

  // دالة البحث
  function performSearch() {
    
    const searchValue = dropdown_search_input.value.trim().toLowerCase();
    
  
    // تصفية البيانات بناءً على البحث
    const filteredData = data.filter(row => {
        const nameMatch = row.account_name && row.account_name.toString().toLowerCase().includes(searchValue);
        return nameMatch;
    });

    // تحديث array1 و slice_Array1 بالبيانات المصفاة
    // array1 = filteredData;
    slice_Array1 = filteredData.slice(0, 50);

    
    // تعبئة الجدول بالنتائج الجديدة
    fillTable();

    dropdown_search_input.focus();
}

  // دالة اختيار صف
  function selectedRow(row) {
    id_hidden_input.value = row.cells[0].textContent; // ID
    dropdown_select_input.value = row.cells[1].textContent; // الاسم
    hideDropdown();
  }

  // عرض/إخفاء القائمة
  function toggleDropdown() {
    
    if (dropdown_menue.style.display === "none") {
      
      measureDistanceToBottom();
      showDropdown();
    } else {
      
      hideDropdown();
    }
  }

  function showDropdown() {
    showFirst50RowAtTheBeginning(); // عرض أول 50 صف
    dropdown_menue.style.display = "block";
  
    // ضع التركيز داخل حقل البحث عند فتح القائمة
    dropdown_search_input.focus();
  
    // إذا كنت بحاجة إلى أن يكون الصف الأول محددًا (ولكن لا يفقد التركيز من حقل البحث)،
    // يمكنك تنفيذ التالي:
    // const firstRow = dropdownItems.querySelector("tbody tr");
    // if (firstRow) {
    //   setFocusedRow(firstRow); // التركيز على الصف الأول
    // }
  }
  
  
  function hideDropdown() {
    dropdown_menue.style.display = "none";
    dropdown_search_input.value = "";
    
    icon.classList.add('fa-caret-down');
    icon.classList.remove('fa-caret-up');
  }

  dropdown_select.addEventListener("click", toggleDropdown);
  dropdown_search_input.addEventListener("input", performSearch);
  Show50_btn.addEventListener("click", showFirst50RowInTable);
  showAlldata_btn.addEventListener("click", ShowAllDataInTable);

  // إخفاء القائمة عند النقر خارجها
  document.addEventListener("click", (event) => {
    if (
      !dropdown_select.contains(event.target) &&
      !dropdown_menue.contains(event.target)
    ) {
      hideDropdown();
    }
  });

  // دالة قياس المسافة إلى أسفل الشاشة
  function measureDistanceToBottom() {
    const rect = dropDownDiv.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const distanceToBottom = windowHeight - rect.bottom;
    const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const distanceToBottomRem = distanceToBottom / fontSize;

    if (distanceToBottomRem < 21) {
      icon.classList.remove('fa-caret-down');
      icon.classList.add('fa-caret-up');
      dropdown_menue.classList.add("dropdown_menue_Open_top");
      dropdown_menue.classList.remove("dropdown_menue_Open_bottom");
    } else {
      icon.classList.add('fa-caret-down');
      icon.classList.remove('fa-caret-up');
      dropdown_menue.classList.add("dropdown_menue_Open_bottom");
      dropdown_menue.classList.remove("dropdown_menue_Open_top");
    }

    window.addEventListener('scroll', measureDistanceToBottom);
    window.addEventListener('resize', measureDistanceToBottom);
  }



  return {
    showDropdown,
    hideDropdown,
    performSearch,
    ShowAllDataInTable,
    showFirst50RowInTable
  };


  /*
  HOW TO USE 
  create_drop_down(`dropdown_div`,'/getEmployeesData1','effects_permission','view')
  create_drop_down(`dropdown_div2`,'/getEmployeesData1','effects_permission','view')
  */

}


async function create_drop_down_with_External_DataArray(str_dropDownDivId, DataArray) {
try {
  const dropDownDiv = document.querySelector(`#${str_dropDownDivId}`);
  // dropDownDiv.style.width = '20rem'
  
  if (!dropDownDiv) {
    console.error(`Element with ID '${str_dropDownDivId}' not found.`);
    return;
  }

  // تعريف هيكل القائمة المنسدلة
  const dropDownDiv_structure = `
    <div class="dropdown_select" id="${str_dropDownDivId}_select">
      <input 
        type="search" 
        id="${str_dropDownDivId}_select_input" 
        placeholder="اختر من القائمة"
        class="dropdown_select_input hover" 
        readonly 
        autocomplete="off">
      <i class="fa-solid fa-caret-down left_icon"></i>
      <i class="fa-solid fa-xmark clear_icon" style="display: none;" onclick="clear_icon2(event)"></i>
      <input type="hidden" id="${str_dropDownDivId}_hidden_input" class="idHidden_dropdown_select_input"readonly>
    </div>
    <div class="dropdown_menue hover scroll" id="${str_dropDownDivId}_menue" style="display: none;">

      <div class="dropdown_menue-items" id="${str_dropDownDivId}_items">
        <!-- قائمة الخيارات تظهر هنا -->

              <table id="${str_dropDownDivId}_table" class="review_table">
        <thead>
          <tr>
            <th style="display: none;">ID</th>
            <th>
                <input 
                  type="search" 
                    class="search_input hover" 
                    id="${str_dropDownDivId}_search_input" 
                    placeholder="ابحث هنا..."
                    autocomplete="off">
            </th>
          </tr>
        </thead>
        <tbody></tbody>
        <tfoot>
          <tr id="${str_dropDownDivId}_table_footer_buttons_row">
            <td colspan="2" style="border: none; padding-inline-sratrt: 1rem;">
              <div id="none_Data_${str_dropDownDivId}" style="pointer-events: none;">
                  لا توجد بيانات...
              </div>
              <div id="footer_btn_${str_dropDownDivId}"  class="flex_H">
                <button class="table_footer_show_data" id="showAll_${str_dropDownDivId}">All</button>
                <button class="table_footer_show_data" id="show50_${str_dropDownDivId}">50</button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>

      </div>
    </div>
  `;
  dropDownDiv.innerHTML = ''
  dropDownDiv.insertAdjacentHTML("beforeend", dropDownDiv_structure);


  // عناصر DOM الخاصة بالقائمة
  const dropdown_select = dropDownDiv.querySelector(`#${str_dropDownDivId}_select`);
  const dropdown_select_input = dropDownDiv.querySelector(`#${str_dropDownDivId}_select_input`);
  const icon = dropdown_select.querySelector(`i`)
  const id_hidden_input = dropDownDiv.querySelector(`#${str_dropDownDivId}_hidden_input`);
  const dropdown_menue = dropDownDiv.querySelector(`#${str_dropDownDivId}_menue`);
  const dropdown_search_input = dropDownDiv.querySelector(`#${str_dropDownDivId}_search_input`);
  const dropdownItems = dropDownDiv.querySelector(`#${str_dropDownDivId}_items`);
  const showAlldata_btn = dropDownDiv.querySelector(`#showAll_${str_dropDownDivId}`);
  const Show50_btn = dropDownDiv.querySelector(`#show50_${str_dropDownDivId}`);
  const tableFooterdiv = dropDownDiv.querySelector(`#${str_dropDownDivId}_table_footer_buttons_row`);
  const footer_btn = dropDownDiv.querySelector(`#footer_btn_${str_dropDownDivId}`);
  const none_Data = dropDownDiv.querySelector(`#none_Data_${str_dropDownDivId}`);


  
  let slice_Array1 = [];


  function showFirst50RowAtTheBeginning() {
    slice_Array1 = DataArray.slice(0, 50); // أول 50 صف
    fillTable();
    showAlldata_btn.style.display = 'flex'
    Show50_btn.style.display = 'none'
  }

  function showFirst50RowInTable(){
    
    slice_Array1 = DataArray.slice(0, 50); // أول 50 صف
    fillTable();
    showAlldata_btn.style.display = 'flex'
    Show50_btn.style.display = 'none'
  }
  
  function ShowAllDataInTable(){
    slice_Array1 = DataArray
    showAlldata_btn.style.display = 'none'
    Show50_btn.style.display = 'flex'

    fillTable();
  }

  // دالة تعبئة الجدول
  function fillTable() {
  
    
    if (slice_Array1.length === 0) {
      tableFooterdiv.style.display = 'flex'
      footer_btn.style.display = 'none';
      none_Data.style.display = 'flex';
    } else if(slice_Array1.length <= 50) {
      tableFooterdiv.style.display = 'none'
    } else if(slice_Array1.length > 50){
      tableFooterdiv.style.display = 'flex'
      none_Data.style.display = 'none';
      footer_btn.style.display = 'flex';
    }
    
  
    const tbody = dropdownItems.querySelector("tbody");
    tbody.innerHTML = ''
    
    slice_Array1.forEach(row => {
      const new_tr = `
        <tr tabindex="0" class="dropdown_table_tr"> <!-- إضافة tabindex لجعل الصف قابل للتركيز -->
          <td style="display: none;" class="row1">${row.id}</td>
          <td style="width: 100%;" class="row2">${row.account_name}</td>
        </tr>
      `;
      tbody.insertAdjacentHTML("beforeend", new_tr);
    });
  
    const rows = tbody.querySelectorAll("tr");
  
    // تعيين أول صف كـ Focused
    if (rows.length > 0) {
      setFocusedRow(rows[0]);
    }
  
    // إضافة أحداث النقر على الصفوف
    rows.forEach(tr => {
      tr.addEventListener("click", () => selectedRow(tr));
    });
  }
  
  function handleKeyboardNavigation(event) {
    const focusedRow = dropdownItems.querySelector(".focused");
    const allRows = Array.from(dropdownItems.querySelectorAll("tbody tr"));
    const currentIndex = allRows.indexOf(focusedRow);
  
    if (event.key === "ArrowDown") {
      // التنقل إلى الصف التالي
      if (currentIndex < allRows.length - 1) {
        setFocusedRow(allRows[currentIndex + 1]);
      }
      event.preventDefault(); // منع السلوك الافتراضي (مثل التمرير)
    } else if (event.key === "ArrowUp") {
      // التنقل إلى الصف السابق
      if (currentIndex > 0) {
        setFocusedRow(allRows[currentIndex - 1]);
      }
      event.preventDefault();
    } else if (event.key === "Enter" && focusedRow) {
      // اختيار الصف الحالي عند الضغط على Enter
      selectedRow(focusedRow);
      event.preventDefault();
    } else if (event.key === "Escape") {
      hideDropdown();
    }
  
    // أعد التركيز على حقل البحث عند استخدام الأسهم
    dropdown_search_input.focus();
  }
  
  
  // إضافة مستمع أحداث لوحة المفاتيح عند فتح القائمة
  dropdown_menue.addEventListener("keydown", handleKeyboardNavigation);
  
  // تعيين فئة التركيز على صف معين
  function setFocusedRow(row) {
    const allRows = dropdownItems.querySelectorAll("tbody tr");
    allRows.forEach(tr => tr.classList.remove("focused")); // إزالة التركيز
    row.classList.add("focused"); // إضافة التركيز
    row.focus(); // تعيين التركيز للصف
}

  // دالة البحث
  function performSearch() {
    
    const searchValue = dropdown_search_input.value.trim().toLowerCase();
    
  
    // تصفية البيانات بناءً على البحث
    const filteredData = DataArray.filter(row => {
        const nameMatch = row.account_name && row.account_name.toString().toLowerCase().includes(searchValue);
        return nameMatch;
    });

    // تحديث array1 و slice_Array1 بالبيانات المصفاة
    // array1 = filteredData;
    slice_Array1 = filteredData.slice(0, 50);

    
    // تعبئة الجدول بالنتائج الجديدة
    fillTable();

    dropdown_search_input.focus();
}

  // دالة اختيار صف
  function selectedRow(row) {
    id_hidden_input.value = row.cells[0].textContent; // ID
    dropdown_select_input.value = row.cells[1].textContent; // الاسم

    row.closest(`.dropdown_menue-items`).parentElement.parentElement.querySelector(`.clear_icon`).style.display = 'flex'
    
    
    hideDropdown();
  }

  // عرض/إخفاء القائمة
  function toggleDropdown() {
    
    if (dropdown_menue.style.display === "none") {
      
      measureDistanceToBottom();
      showDropdown();
    } else {
      
      hideDropdown();
    }
  }

  function showDropdown() {
    showFirst50RowAtTheBeginning(); // عرض أول 50 صف
    dropdown_menue.style.display = "block";
  
    // ضع التركيز داخل حقل البحث عند فتح القائمة
    dropdown_search_input.focus();
  
    // إذا كنت بحاجة إلى أن يكون الصف الأول محددًا (ولكن لا يفقد التركيز من حقل البحث)،
    // يمكنك تنفيذ التالي:
    // const firstRow = dropdownItems.querySelector("tbody tr");
    // if (firstRow) {
    //   setFocusedRow(firstRow); // التركيز على الصف الأول
    // }
  }
  
  
  function hideDropdown() {
    dropdown_menue.style.display = "none";
    dropdown_search_input.value = "";
    
    icon.classList.add('fa-caret-down');
    icon.classList.remove('fa-caret-up');
  }

  dropdown_select.addEventListener("click", toggleDropdown);
  dropdown_search_input.addEventListener("input", performSearch);
  Show50_btn.addEventListener("click", showFirst50RowInTable);
  showAlldata_btn.addEventListener("click", ShowAllDataInTable);

  // إخفاء القائمة عند النقر خارجها
  document.addEventListener("click", (event) => {
    if (
      !dropdown_select.contains(event.target) &&
      !dropdown_menue.contains(event.target)
    ) {
      hideDropdown();
    }
  });

  // دالة قياس المسافة إلى أسفل الشاشة
  function measureDistanceToBottom() {
    
    const rect = dropDownDiv.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const distanceToBottom = windowHeight - rect.bottom;
    const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    
    const distanceToBottomRem = distanceToBottom / fontSize;

    if (distanceToBottomRem < 21) {
      icon.classList.remove('fa-caret-down');
      icon.classList.add('fa-caret-up');
      dropdown_menue.classList.add("dropdown_menue_Open_top");
      dropdown_menue.classList.remove("dropdown_menue_Open_bottom");
    } else {
      icon.classList.add('fa-caret-down');
      icon.classList.remove('fa-caret-up');
      dropdown_menue.classList.add("dropdown_menue_Open_bottom");
      dropdown_menue.classList.remove("dropdown_menue_Open_top");
    }

    window.addEventListener('scroll', measureDistanceToBottom);
    window.addEventListener('resize', measureDistanceToBottom);
  }


  return {
    showDropdown,
    hideDropdown,
    performSearch,
    ShowAllDataInTable,
    showFirst50RowInTable
  };
} catch (error) {
  catch_error(error)
}


  /*
  HOW TO USE 
  create_drop_down(`dropdown_div`,'/getEmployeesData1','effects_permission','view')
  create_drop_down(`dropdown_div2`,'/getEmployeesData1','effects_permission','view')
  */

}


function selectedRow_dropdownDiv(str_dropdown_div,dataArray,id) {
try {

  if (!str_dropdown_div || !dataArray || !id){
    return
  }
  const dropdown_div = document.getElementById(str_dropdown_div)
  const id_hidden_input = dropdown_div.querySelector(`.idHidden_dropdown_select_input`)
  const dropdown_select_input = dropdown_div.querySelector(`.dropdown_select_input`)
  const clear_icon = dropdown_div.querySelector(`.clear_icon`)
  const filteredData = dataArray.filter(item => +item.id === +id);

  
  id_hidden_input.value = filteredData[0].id; // ID
  dropdown_select_input.value = filteredData[0].account_name; // الاسم  

  clear_icon.style.display = 'flex'
} catch (error) {
  catch_error(error)
}
}


function get_cumulative_balance_fn(orignalArray,sliceArray,opening_balance, AllRows_or_50) {

  if (AllRows_or_50 === 50) {
    
      let totalDifference = 0;  // لحساب مجموع الفرق بين production_amount و sales_amount بعد الأوبجكت رقم 50
      
      // نبدأ من الأوبجكت رقم 51 (أي الأوبجكت الذي يلي الأوبجكت رقم 50)
      for (let i = 50; i < orignalArray.length; i++) {
          const currentObj = orignalArray[i];
          
          totalDifference += currentObj.procution_amount - currentObj.sales_amount;
      }
      
      opening_balance += totalDifference
      
      

  }
      // حساب cumulative_balance كما في الكود السابق
      for (let i = sliceArray.length - 1; i >= 0; i--) {
          const currentObj = sliceArray[i];
          currentObj.cumulative_balance = (i === sliceArray.length - 1)
              ? opening_balance + currentObj.procution_amount - currentObj.sales_amount
              : sliceArray[i + 1].cumulative_balance + currentObj.procution_amount - currentObj.sales_amount;
      }
      
      return opening_balance
}



function active_color(select_variable) {
  try {
              if (select_variable.value == 1){
                  select_variable.classList.add(`inactive_color`);
              }else{
                  select_variable.classList.remove(`inactive_color`);
              }
  } catch (error) {
      catch_error(error)
  }
}

function reset_rowcount_in_table(str_tablename){
  const table = document.getElementById(`${str_tablename}`)
  if (!table) {
    return
  }
  const rows = table.querySelectorAll(`.rowCount`)
  if (!rows) {
    return
  }
  let x = 1
  for (const row of rows){
    row.textContent = x
    x +=1
  }
}


//#region fill dropdown  ------------------------------------------


let tableDropdownList_DataFilterdArray = []
let tableDropdownList_Array1 = [];
let slice_tableDropdownList_Array1 = [];
let tableDropdownList_TableMainTr;
let tableDropdownList_TableMainTd;
let tableDropdownList_DropdownMenue;
let tableDropdownList_ClassName_ThatYouWantToShow_thirdCoumnValue;
let tableDropdownList_ArraycolumnsNameToSHow = [];


async function tableDropdownList(dropdown, dataArray,Array_columnsNameToSHow, typeNameOfAccountTypeClassInTheSameRowIfExist_IfNoAccountTypeNotExistTypeFalse, Type_ClassName_ThatYouWantToShow_thirdCoumnValueInsideIt) {

  tableDropdownList_DataFilterdArray = []
  tableDropdownList_Array1 = [];
  slice_tableDropdownList_Array1 = [];
  tableDropdownList_TableMainTr = ""
  tableDropdownList_TableMainTd = ""
  tableDropdownList_DropdownMenue = ""
  tableDropdownList_ClassName_ThatYouWantToShow_thirdCoumnValue = Type_ClassName_ThatYouWantToShow_thirdCoumnValueInsideIt  
  tableDropdownList_ArraycolumnsNameToSHow = JSON.parse(decodeURIComponent(Array_columnsNameToSHow));

  // تحويل البيانات النصية إلى بيانات أصلية
  dataArray = JSON.parse(decodeURIComponent(dataArray));


  tableDropdownList_TableMainTr = dropdown.closest('tr');
  tableDropdownList_TableMainTd = dropdown.closest("td");
  tableDropdownList_DropdownMenue = tableDropdownList_TableMainTd.querySelector(".dropdown_menue");

  if (tableDropdownList_DropdownMenue.style.display === "none") {
    if (typeNameOfAccountTypeClassInTheSameRowIfExist_IfNoAccountTypeNotExistTypeFalse){
      const account_type_id = parseInt(tableDropdownList_TableMainTr.querySelector(`.${typeNameOfAccountTypeClassInTheSameRowIfExist_IfNoAccountTypeNotExistTypeFalse}`).value);
      tableDropdownList_DataFilterdArray = await dataArray.filter(item => item.account_type_id === account_type_id);
      tableDropdownList_Array1 = tableDropdownList_DataFilterdArray;
    }else{
      tableDropdownList_DataFilterdArray = dataArray
      tableDropdownList_Array1 = tableDropdownList_DataFilterdArray;
    }
    
    
    

    tableDropdownList_measureDistanceToBottom();
    tableDropdownList_showDropdown();
  } else {
    tableDropdownList_measureDistanceToBottom();
    tableDropdownList_hideDropdown();
  }

  // إضافة مستمعين للأحداث مع تمرير المعاملات الصحيحة
  window.addEventListener('scroll', tableDropdownList_handleResizeOrScroll());
  window.addEventListener('resize', tableDropdownList_handleResizeOrScroll());
}


function tableDropdownList_measureDistanceToBottom() {
  
  
  const dropdown_container = tableDropdownList_TableMainTd.querySelector('.dropdown_container_input_table'); // el main container
  // const dropdownList_heigh = dropdown_container.querySelector(`.inputTable_dropdown_tableContainer`).offsetHeight;
  // const dropdownList_heigh = window.getComputedStyle(dropdown_container.querySelector(`.inputTable_dropdown_tableContainer`)).height;
  // console.log(dropdownList_heigh);
  
  
  const icon = dropdown_container.querySelector('i'); // تعديل هذا السطر للتأكد من العثور على العنصر الصحيح

  // الحصول على معلومات الحجم والموقع النسبي للعنصر
  const rect = dropdown_container.getBoundingClientRect();

  
  // الحصول على ارتفاع النافذة الرئيسية للمتصفح
  const windowHeight = window.innerHeight;

  // حساب المسافة بين العنصر والحافة السفلية للشاشة
  const distanceToBottom = windowHeight - rect.bottom;

  // حساب المسافة بوحدة REM
  // الحصول على حجم الخط الأساسي وتحويل المسافة إلى REM
  const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  
  const distanceToBottomRem = distanceToBottom / fontSize;
  
  if (distanceToBottomRem < 21) { // 5aleh nafs rl hight beta3 el drop_menue + 1
    icon.classList.remove('fa-caret-down');
    icon.classList.add('fa-caret-up');
    tableDropdownList_DropdownMenue.classList.add("dropdown_menue_Open_top");
    tableDropdownList_DropdownMenue.classList.remove("dropdown_menue_Open_bottom");
  } else {
    icon.classList.add('fa-caret-down');
    icon.classList.remove('fa-caret-up');
    tableDropdownList_DropdownMenue.classList.add("dropdown_menue_Open_bottom");
    tableDropdownList_DropdownMenue.classList.remove("dropdown_menue_Open_top");
  }
}




async function tableDropdownList_showDropdown() {
  tableDropdownList_hideDropdown()
  await tableDropdownList_showFirst50RowAtTheBegening();
  const dropdown_search_input = tableDropdownList_TableMainTd.querySelector('.dropdown_search_input')
  dropdown_search_input.value = ""
  tableDropdownList_DropdownMenue.style.display = "block";
  tableDropdownList_handle_dropdown_row_selection()

  const icon = dropdown_search_input.closest(`td`).querySelector(`i`)      
  icon.classList.remove('fa-caret-down');
  icon.classList.add('fa-caret-up');
}


let keydownHandler = null;

function tableDropdownList_handle_dropdown_row_selection() {
  try {
    const dropdown_search_input = tableDropdownList_TableMainTd.querySelector('.dropdown_search_input');
    dropdown_search_input.focus();
    
    const rows = tableDropdownList_TableMainTd.querySelectorAll(`.inputTable_dropdown_tableContainer table > tbody > tr`);
    if (rows.length > 0) {
      let currentIndex = 0;

      rows[currentIndex].classList.add('custom_tr_hover');

      function updateHighlight(newIndex) {
        if (newIndex >= 0 && newIndex < rows.length) {
          rows.forEach(row => row.classList.remove('custom_tr_hover'));
          currentIndex = newIndex;
          rows[currentIndex].classList.add('custom_tr_hover');
        }
      }

      // تعريف مستمع الحدث الجديد
      const newKeydownHandler = (event) => {
        switch (event.key) {
          case 'ArrowDown':
            updateHighlight(currentIndex + 1);
            event.preventDefault(); // Prevent the input cursor from moving
            break;
          case 'ArrowUp':
            updateHighlight(currentIndex - 1);
            event.preventDefault(); // Prevent the input cursor from moving
            break;
          case 'Enter':
                 
            if (slice_tableDropdownList_Array1.length > 0) {
              const currentRow = rows[currentIndex];              
              tableDropdownList_selectedRow(currentRow)
            }
            break;
        }
      };

      // إزالة المستمع القديم إذا كان موجودًا
      if (keydownHandler) {
        dropdown_search_input.removeEventListener('keydown', keydownHandler);
      }

      // إضافة المستمع الجديد
      dropdown_search_input.addEventListener('keydown', newKeydownHandler);

      // تحديث المتغير لمستمع الحدث
      keydownHandler = newKeydownHandler;
    }
  } catch (error) {
    catch_error(error);
  }
}


function tableDropdownList_hideDropdown() {
  try {

    const All_dropdown_menue = document.querySelectorAll(`table .dropdown_menue`);
    All_dropdown_menue.forEach(dropdown_menue => {
      dropdown_menue.style.display = "none";
      const icon = dropdown_menue.closest(`td`).querySelector(`i`)      
      icon.classList.add('fa-caret-down');
      icon.classList.remove('fa-caret-up');

      const dropdown_search_input = dropdown_menue.querySelector('.dropdown_search_input');
      if (dropdown_search_input) {
        dropdown_search_input.removeEventListener('keydown', keydownHandler);
      }
    })

  } catch (error) {
    catch_error(error);
  }
}

async function tableDropdownList_showFirst50RowAtTheBegening() {
  slice_tableDropdownList_Array1 = tableDropdownList_Array1.slice(0, 50);
  tableDropdownList_fillTable()
}


async function tableDropdownList_fillTable() {
  if (!slice_tableDropdownList_Array1 || slice_tableDropdownList_Array1.length === 0) {
    tableDropdownList_TableMainTd.querySelector('.inputTable_dropdown_tableContainer').innerHTML = `<p class="no_data" style="line-height: 3.2rem; padding-inline-start: 0.6rem;">لا توجد بيانات..</p>`;
    return;
  }

  // استخراج أسماء الأعمدة التي ستظهر فقط
  const columnNames = Object.keys(slice_tableDropdownList_Array1[0]).filter(colName =>
    tableDropdownList_ArraycolumnsNameToSHow.includes(colName)
  );

  if (columnNames.length === 0) {
    console.error("لا توجد أعمدة تطابق الأسماء المحددة.");
    return;
  }

  // إنشاء هيكل الجدول
  let tableHTML = `<table id="accounts_table" class="inputTable_dropdown_table">
                    <thead style='display: none;'>
                      <tr>`;

  // إنشاء الأعمدة في رأس الجدول
  columnNames.forEach((colName, index) => {
    const displayStyle = index === 1 ? "" : "style='display: none;'"; // إخفاء الأعمدة ما عدا العمود الثاني
    tableHTML += `<th ${displayStyle}>${colName}</th>`;
  });

  tableHTML += `</tr>
                </thead>
                <tbody>`;

  // إنشاء الصفوف بناءً على البيانات
  slice_tableDropdownList_Array1.forEach(row => {
    tableHTML += `<tr onclick="tableDropdownList_selectedRow(this)">`;

    columnNames.forEach((colName, index) => {
      const displayStyle = index === 1 ? "" : "style='display: none;'"; // إخفاء الأعمدة ما عدا العمود الثاني
      tableHTML += `<td ${displayStyle}>${row[colName] || ""}</td>`;
    });

    tableHTML += `</tr>`;
  });

  tableHTML += `</tbody>
                <tfoot>
                  <tr id="table_fotter_buttons_row">
                    <td colspan="${columnNames.length}">
                      <div class='flex_H'>
                        <button class="table_footer_show_data" id="w1" onclick="tableDropdownList_ShowAllDataInTable(this)">All</button>
                        <button class="table_footer_show_data" id="w2" onclick="tableDropdownList_showFirst50RowInTable(this)">50</button>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>`;

  // تحديث محتوى الصفحة بالجدول
  tableDropdownList_TableMainTd.querySelector('.inputTable_dropdown_tableContainer').innerHTML = tableHTML;

  // إخفاء أزرار التذييل إذا كانت الصفوف أقل من 50
  if (tableDropdownList_Array1.length > 0 && tableDropdownList_Array1.length <= 50) {
    tableDropdownList_DropdownMenue.querySelector('#table_fotter_buttons_row').style.display = "none";
  } else if (tableDropdownList_Array1.length < 1) {
    tableDropdownList_TableMainTd.querySelector('#table_fotter_buttons_row').innerHTML = `<td colspan="${columnNames.length}" class="td_no_result">لا نتائج</td>`;
  }
}


async function tableDropdownList_ShowAllDataInTable(button) {
  const td = button.closest("td");
  showAlert('info', 'ان ظهار كامل البيانات فى القائمة المنسدله لا يؤثر على عمليه البحث فى البيانات')
  slice_tableDropdownList_Array1 = tableDropdownList_Array1.slice();
  await tableDropdownList_fillTable()
};

async function tableDropdownList_showFirst50RowInTable(button) {
  const td = button.closest("td");
  slice_tableDropdownList_Array1 = tableDropdownList_Array1.slice(0, 50);
  await tableDropdownList_fillTable();
}


async function tableDropdownList_performSearch(input) {
  const td = input.closest("td");
  const searchValue = td.querySelector('.dropdown_search_input').value.trim().toLowerCase();
  if (!tableDropdownList_Array1 || !Array.isArray(tableDropdownList_Array1)) {
    console.error("tableDropdownList_Array1 غير معرّف أو ليس مصفوفة.");
    return;
  }
  tableDropdownList_Array1 = tableDropdownList_DataFilterdArray.filter(row => {
    const secondColumnValue = Object.values(row)[1];
    return secondColumnValue && secondColumnValue.toString().toLowerCase().includes(searchValue);
  });
  slice_tableDropdownList_Array1 = tableDropdownList_Array1.slice(0, 50);
  await tableDropdownList_fillTable();
  if (slice_tableDropdownList_Array1.length > 0) {
    tableDropdownList_handle_dropdown_row_selection();
  }
}


function tableDropdownList_handleResizeOrScroll() {
  return function () {
    tableDropdownList_measureDistanceToBottom();
  };
}



// إخفاء القائمة عند الضغط على مفتاح الهروب
// document.addEventListener("keydown", (event) => {
//   if (event.key === "Escape") {
//     tableDropdownList_hideDropdown();
//   }
// });



function tableDropdownList_selectedRow(row) {


  const mainTd = row.closest("td")
  const mainRow = row.closest(`.mainTr`)

  mainTd.querySelector('.id_hidden_input').value = row.cells[0].textContent; // row.id
  mainTd.querySelector('.dropdown_select_input').textContent = row.cells[1].textContent; // row.employee_name
  
  if (tableDropdownList_ClassName_ThatYouWantToShow_thirdCoumnValue){
    mainRow.querySelector('.tbody_itemUniteName').textContent = row.cells[2].textContent || 'الكمية'; // row.employee_name
  }

  mainTd.querySelector('.clear_icon').style.display = 'flex'; // row.id

  tableDropdownList_hideDropdown();
};



document.addEventListener("click", (event) => {
  // console.log('Clicked element:', event.target);
  const classesToCheck = ['dropdown_select_input_table', 'dropdown_menue', 'dropdown_search_input', 'table_footer_show_data'];

  const clickedInside = classesToCheck.some(className => {
    return event.target.classList.contains(className) || event.target.closest(`.${className}`);
  });

  if (!clickedInside) {
    tableDropdownList_hideDropdown();
  }
});




//#endregion


function clear_icon_on_table_td(event) {
  event.stopPropagation(); // منع انتقال الحدث إلى العنصر الأب
    const clickedIcon = event.target;
    td = clickedIcon.closest(`td`)
    td.querySelector(`.dropdown_select_input`).textContent = ""
    td.querySelector(`.id_hidden_input`).value = ""

        

    
    td.querySelector(`.dropdown_menue`).style.display = "none" // hide menue
    const icon = td.querySelector(`.left_icon`)
    
    icon.classList.add('fa-caret-down');
    icon.classList.remove('fa-caret-up');

    clickedIcon.style.display = 'none'
}

function clear_icon2(event) {
  event.stopPropagation(); // منع انتقال الحدث إلى العنصر الأب
    const clickedIcon = event.target;
    dropDownSelect = clickedIcon.closest(`.dropdown_select`)
    dropDownSelect.querySelector(`.dropdown_select_input`).value = ""
    dropDownSelect.querySelector(`.idHidden_dropdown_select_input`).value = ""

    
    
    const x = dropDownSelect.parentElement;
    x.querySelector(`.dropdown_menue`).style.display = "none" // hide menue
    const icon = x.querySelector(`.left_icon`)
    
    icon.classList.add('fa-caret-down');
    icon.classList.remove('fa-caret-up');
    clickedIcon.style.display = 'none'

}

const preventKeyDown = (e) => e.preventDefault();

async function viewMode(is_hidden, permName, permType) {
  try {
    const permission = await btn_permission(permName, permType);
    if (!permission) {
      return;
    }
    
    showLoadingIcon(content_space);

    const elements = document.querySelectorAll(`.notView, .notViewTd`);
    const displayStyles = {
      notView: is_hidden ? 'none' : 'flex',
      notViewTd: is_hidden ? 'none' : 'table-cell',
    };

    elements.forEach(element => {
      const className = element.classList.contains('notView') ? 'notView' : 'notViewTd';
      element.style.display = displayStyles[className];
    });

    // تحديث النص وأسلوب المؤشر
    sub_h2_header.textContent = is_hidden ? 'عرض' : 'تحديث';
    page_content.style.pointerEvents = is_hidden ? 'none' : 'auto';

    // إضافة أو إزالة المستمع بناءً على الحالة
    if (is_hidden) {
      page_content.addEventListener('keydown', preventKeyDown);
    } else {
      page_content.removeEventListener('keydown', preventKeyDown);
    }

    // تحديث عرض الأزرار
    fn_container_div.querySelector(`#fn_option_update_btn`).style.display = is_hidden ? 'flex' : 'none';
    fn_container_div.querySelector(`#fn_option_view_btn`).style.display = is_hidden ? 'none' : 'flex';

    hide_fn_options_div();
    hideLoadingIcon(content_space);
  } catch (error) {
    hide_fn_options_div();
    hideLoadingIcon(content_space);
    catch_error(error);
  }
}




let totalsArray = []
let totalVal_beforTax = 0
let totalTaxValue = 0
let totalAfterTax = 0
let row_Val_beforTax = 0
let row_totalAfterTax = 0

function update_table(str_tableName){
 try {

 const table = document.getElementById(`${str_tableName}`);
 const rows = table.querySelectorAll(`.mainTr`);
 

 //#region update totals in table
 totalsArray = []
 row_Val_beforTax = 0
 totalTaxValue = 0
 row_totalAfterTax = 0
 totalAfterTax = 0
 totalVal_beforTax = 0
 
 const tfoot_totalDiv_note = table.querySelector(`.tfoot_totalDiv_note`); tfoot_totalDiv_note.innerHTML = ""
 const tfoot_totalDiv_Values = table.querySelector(`.tfoot_totalDiv_Values`); tfoot_totalDiv_Values.innerHTML = ""

 function update_totalsArray (tax_account_id,str_name,val){
   if (tax_account_id){
     const obj = totalsArray.find(obj => obj.tax_account_id === tax_account_id)
     if (obj){
       obj.val = +obj.val + val;
     }else{
       totalsArray.push({tax_account_id:tax_account_id, name: str_name , val:+val})
     }
   }else{
     const obj = totalsArray.find(obj => obj.name === str_name)
     if (obj){
       obj.val = +obj.val + val;
     }else{
       totalsArray.push({name: str_name , val:+val})
     }
   }
 }



 for (const row of rows){
       
   const rowAmount = +row.querySelector(`.td-amount .Xitem_amount`).textContent || 0;
   const rowUnitePrice = +row.querySelector(`.td-unitePrice`).textContent || 0;
   const rowDiscountType = +row.querySelector(`.td-dsicount .tbody_discountType`).value || 0;
   const rowDiscountValue = +row.querySelector(`.td-dsicount .Xrow_discount_value`).textContent || 0;
   const rowTotalBeforTax = row.querySelector(`.td-totalBeforTax`);
   const rowTaxValue = row.querySelector(`.td-taxValue`);
   const rowAfterTax = row.querySelector(`.td-totalAfterTax`);


   const Xrow_discount_value =
   rowDiscountType === 1
       ? +((rowDiscountValue / 100) * (rowAmount * rowUnitePrice))
       : +rowDiscountValue;
       row_Val_beforTax = +((rowAmount * rowUnitePrice) - Xrow_discount_value).toFixed(2);
       rowTotalBeforTax.textContent = row_Val_beforTax.toFixed(2)
       
       update_totalsArray(false,'الاجمالى',row_Val_beforTax)
       totalVal_beforTax += row_Val_beforTax
       let Val_rowTax = 0;
       const taxType = +row.querySelector(`.tbody_taxType`).value || 0;
     
       if (taxType !== 0) {
         for (const taxRow of taxBodyArray) {
           if (+taxRow.settings_tax_header_id === taxType) {
             const taxAccount_id = +taxRow.tax_account_id;
             // const taxAccount_name = taxRow.account_name.trim();
             const tax_name = taxRow.tax_name.trim();
             const taxRate = +taxRow.tax_rate / 100;
             const taxMultiplier = taxRow.is_tax_reverse ? -1 : 1;
             const taxValue = +(row_Val_beforTax * taxRate * taxMultiplier).toFixed(2);
             Val_rowTax += taxValue;
             totalTaxValue += taxValue
             update_totalsArray(taxAccount_id,tax_name,taxValue)
           }
         }
         rowTaxValue.textContent = Val_rowTax.toFixed(2)
       }else{
         rowTaxValue.textContent = 0.00
       }
   
       rowAfterTax.textContent =  (row_Val_beforTax + Val_rowTax).toFixed(2)
       row_totalAfterTax = (row_Val_beforTax + Val_rowTax).toFixed(2)
       totalAfterTax += +row_totalAfterTax
 }

 totalsArray.forEach((obj, index) => {

   tfoot_totalDiv_note.innerHTML += `<span style="${index === 0 ? 'font-weight: bold;' : ''}">${obj.name}</span>`
   tfoot_totalDiv_Values.innerHTML += `<span style="${index === 0 ? 'font-weight: bold;' : ''}" class="${obj.val < 0? 'color_negative' : ''}">${obj.val.toFixed(2)}</span>`
 })
 if (totalsArray.length > 1){
   tfoot_totalDiv_note.innerHTML += `<span style="font-weight: bold;font-size:1.6rem;">الاجمالى</span>`
   tfoot_totalDiv_Values.innerHTML += `<span style="font-weight: bold; font-size:1.6rem" class="totalsSpan_totalAfterTax">${(totalsArray[0].val + totalTaxValue).toFixed(2)}</span>`
 }
   
} catch (error) {
 catch_error(error)
}
}

//#endregion end - update tables in table
