
//#region fixed information
const user_name_session = sessionStorage.getItem('username');
const header_user_name = document.querySelector('#header_user_name');
const user_setting_btn = document.querySelector('#user_setting_btn');
if (header_user_name){
  header_user_name.textContent = user_name_session
}else{
  header_user_name.value = 'user name'
};


user_setting_btn.addEventListener('click',function(){
  try {
    hide_User_options();
    const id = sessionStorage.getItem('current_id');
    sessionStorage.setItem("user_id", id);
    window.location.href = "/users_edit_ar";
  } catch (error) {
    catch_error('user_setting_btn EROR',error.message)
  }
});


header_user_name.addEventListener('click',function(){
  user_options_display()
});
function user_options_display() {
  const user_options = document.querySelector('#user_options');
  if (user_options.style.display === 'flex'){
    hide_User_options()
  }else{
    show_User_options()
  }
}
user_options.addEventListener('blur', function(event) {
  hide_User_options();
});
function show_User_options(){
  user_options.style.display = 'flex'
  user_options.focus();
}

function hide_User_options(){
  user_options.style.display = 'none'
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
    const alertContainer = document.getElementById('alert-container');
    const alertDiv = document.createElement('div');
    const alertClass = 'alert-' + type;
    alertDiv.classList.add('alert', alertClass);
    alertDiv.innerHTML = message;
    alertContainer.appendChild(alertDiv);

    // إنشاء عنصر الصوت المناسب
    const audioElement = document.createElement('audio');
    audioElement.setAttribute('id', type);
    const sourceElement = document.createElement('source');
    sourceElement.src = '/public/sounds/' + type + '.mp3';
    sourceElement.type = 'audio/mpeg';
    audioElement.appendChild(sourceElement);
    document.body.appendChild(audioElement);

    // عندما يكتمل تحميل الملف الصوتي، قم بتشغيله
    audioElement.addEventListener("canplay", function () {
      audioElement.play();
    });

    setTimeout(function () {
      alertDiv.classList.add('show');
    }, 100);

    alertDiv.addEventListener('click', function () {
      alertDiv.style.opacity = '0';
      setTimeout(function () {
        alertDiv.remove();
      }, 500);
    });

    setTimeout(function () {
      alertDiv.style.opacity = '0';
      setTimeout(function () {
        alertDiv.remove();
      }, 500);
    }, 10000);
  } catch (error) {
    console.error('error show alert', error.message)
  };
};


//#endregion End -- Alerts

//#region error handling
//todo el fekra hena enak hatzher el message beta3 el error fakt eza kont fat7 el bernameg 3ala el windwos beta3k local ama ezaraf3to 3ala  host msh hayzhar
function catch_error(message, erroType) {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.error(message, erroType);
  } else {
    showAlert('fail', 'An error occurred. Please try again later.');
  };
};
//#endregion END - error handling

//#region dark Mode
//! dark mode toggle button
document.querySelector('#dark_toggle_btn').addEventListener('click', function (event) {
  try {
    event.preventDefault; // stop <a> herf
    const body = document.querySelector('body');
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
const currentPage = new URL(window.location.href).pathname.split('/').pop();
const currentLang = currentPage.substring(currentPage.length - 2); // فصل اخر حرفين الى هما ar - en 
sessionStorage.setItem('currentPage', currentPage);
localStorage.setItem('currentLang', currentLang);



  // todo  : 5aly balk lazem ykon sa7t el english feha el lang_btn innerHtml : ar  we el 3aks fe el arapy we matnsash el route
  const lang_btn = document.querySelector('#lang_btn');
  lang_btn.addEventListener('click', function (event) {
    event.preventDefault(); // منع السلوك الافتراضى لعنر ال ايه انه لان الهيرف هيعمل ريلود
    const currentLang = localStorage.getItem('currentLang');
    const X = sessionStorage.getItem('currentPage');
    console.log(`${currentLang} -- ${currentLang === 'ar'} -- ${lang_btn.textContent.trim() === 'en'}`);
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
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Show button when user scrolls down
window.addEventListener("scroll", () => {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) { /* عنصر البودى اوى عنصر داخل البودى  اذا الاسكرول اكبر من 500 بيكسيل*/
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});


// Scroll to top when button is clicked
const rootElement = document.documentElement;

function scrollToTop() {
  // Scroll to top logic
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth" /* هنا هيطلع لفوق فى خلال 0.3 ثانيه  دى القيمه الافتراضيه مهما كان طول الصفحه هيطلع فى خلال 0.3 ثانيه*/

  });
}
scrollToTopBtn.addEventListener("click", function () {
  scrollToTop();
});
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


{//!#region Open Menue -- sidbar
  const sidebar = document.querySelector('#sidebar');
  const MenueIcon = document.querySelector('#MenueIcon');
  const closeMenueIcon = document.querySelector('#closeMenueIcon');
  const body = document.querySelector('body');

  // اظهار واخفاء القائمة   عند الضغط على زرار القائمة
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

  // ازالة كلاس الشاشه الصغيره اذا كان موجود وتم تغيير حجم الشاشه لاكبر من 750 بيكسيل
  window.addEventListener('resize', function () {
    if (window.innerWidth > 750) {
      // إزالة الفئة المحددة إذا كان عنصر الشاشة أصغر من 750 بكسل
      // sidebar.classList.remove("sidebar_Media_Show");
      hideMenue();
    }
  });
  // اخفاء القائمة عند الضغط على زر الاغلاق الموجود فى اعلى القائمة
  closeMenueIcon.addEventListener('click', function () {
    // sidebar.classList.remove("sidebar_Media_Show");
    hideMenue();
  })

  function showMenue(){
    sidebar.classList.add("sidebar_Media_Show");
    body.classList.add('no_scroll');
  };

  function hideMenue(){
    sidebar.classList.remove("sidebar_Media_Show");
    body.classList.remove('no_scroll');
  }


}//#endregion Open Menue



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

function back() {
  window.history.back();
};

function forward() {
  window.history.forward();
};
//#endregion end -  region back and forward

//#region redirection and reason
async function redirection(page, messageType, messageText) {
  showAlert(messageType, messageText);
  document.querySelector('#body_content').style.pointerEvents = 'none';
  
  // تأخير تنفيذ الكود بمدة 3 ثواني
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // توجيه المستخدم إلى الصفحة المحددة بواسطة window.location.href
  window.location.href = page;
};

function showRedirectionReason() {
    let message;
    const urlParams = new URLSearchParams(window.location.search);
    const reason = urlParams.get("reason");
    
    if (reason){
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
async function logout(){
    try {

      if (!confirm(`هل تريد الخروج من التطبيق؟`)) {
        return;
      };

      hide_User_options(); // hide user_option div

      const response = await fetch('/Logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const data = await response.json();
  
      if (data.success) {
        redirection('login','info','تم تسجيل الخروج بنجاح : سيتم تجويلك الى الصفحه الرئيسيه')
      } else {
        showAlert('fail',data.message);
      }
    } catch (error) {
      catch_error('logout Error',error.message);
    }
};

// تسجيل خروج فى حاله اغلاق المتسفح او الصفحه بدون تسجيل خروج
// window.addEventListener('beforeunload', function () {
//   logout()
// })

window.addEventListener('beforeunload', function() {
  const url = '/Logout';
  navigator.sendBeacon(url);
});

//#endregion End -- Logout

//#region sidbar custmize 

// handle users_control_a
let general_permission = parseInt(sessionStorage.getItem('general_permission'));

if (general_permission && general_permission === 6){
  document.querySelector(`#users_control_a`).style.display = 'block';
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

