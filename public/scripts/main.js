
//#region Main Global Variables
 let body_content = document.querySelector('#body_content');
//#region 


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
    window.location.href = "/users_update_ar";
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
let dialogAnswer = false  // global variable
function showDialog(title, message, icon) {
  return new Promise((resolve) => {

    dialogAnswer = false;

      // إنشاء عنصر الـ HTML إذا لم يكن موجودًا بالفعل
      let overlay = document.getElementById('dialogOverlay');
      if (!overlay) {
          // إنشاء التراكب (overlay)
          overlay = document.createElement('div');
          overlay.id = 'dialogOverlay';
          overlay.style.display = 'none'; // يجب أن يكون مخفيًا في البداية
          document.body.appendChild(overlay);
          
          // إنشاء نافذة الحوار (dialog)
          const dialog = document.createElement('div');
          dialog.id = 'dialog';
          dialog.className = 'dialog'; // سيتم تطبيق أنماط CSS الخاصة به
          
          // إنشاء الرأس (header)
          const header = document.createElement('div');
          header.className = 'dialog_header';
          const h3 = document.createElement('h3');
          h3.id = 'dialogTitle';
          h3.className = '';
          header.appendChild(h3);
          dialog.appendChild(header);
          
          // إنشاء الجسم (body)
          const body = document.createElement('div');
          body.className = 'dialog_body';
          const p = document.createElement('p');
          p.id = 'dialogMessage';
          body.appendChild(p);
          const i = document.createElement('i');
          i.id = 'dialogIcon';
          body.appendChild(i);
          dialog.appendChild(body);
          
          // إنشاء القدم (footer)
          const footer = document.createElement('div');
          footer.className = 'dialog_footer';
          const yesButton = document.createElement('button');
          yesButton.id = 'yesButton';
          yesButton.textContent = 'نعم';
          yesButton.className = 'btn_save';
          const noButton = document.createElement('button');
          noButton.id = 'noButton';
          noButton.textContent = 'لا';
          noButton.className = 'btn_cancel';
          footer.appendChild(yesButton);
          footer.appendChild(noButton);
          dialog.appendChild(footer);
          
          // إضافة نافذة الحوار إلى التراكب
          overlay.appendChild(dialog);
      }

      // إعداد الرأس والجسم
      document.getElementById('dialogTitle').textContent = title;
      document.getElementById('dialogMessage').textContent = message;

      // ضبط الأيقونة
      const dialogIcon = document.getElementById('dialogIcon');
      dialogIcon.className = icon;

      // عرض النافذة
      overlay.style.display = 'flex';

      // التحكم في زر "نعم"
      document.getElementById('yesButton').onclick = function() {
        showLoadingIcon(this)
        dialog.style.pointerEvents = 'none'
          // closeDialog();
          dialogAnswer = true;
          resolve(true); // إرجاع true عند النقر على زر "نعم"
      };

      // التحكم في زر "لا"
      document.getElementById('noButton').onclick = function() {
          dialogAnswer = false;
          closeDialog();
          resolve(false); // إرجاع false عند النقر على زر "لا"
      };
  });
}

function closeDialog() {
  const overlay = document.getElementById('dialogOverlay');
  
  // إضافة التحريك للإغلاق
  overlay.style.animation = 'fadeOut 0.3s forwards';
  
  setTimeout(() => {
      // إخفاء التراكب بعد انتهاء التحريك
      overlay.style.display = 'none';
      overlay.style.animation = ''; // إعادة ضبط الأنماط بعد الإخفاء
      
      // إعادة تعيين الحالة بعد إغلاق النافذة الحوارية
      // هذا الجزء يتعامل مع إعادة تعيين `hideLoadingIcon`
      const dialog = document.getElementById('dialog');
      const yesButton = document.getElementById('yesButton');
      hideLoadingIcon(yesButton);
      dialog.style.pointerEvents = 'auto';
  }, 300);
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
  } else {
      // في بيئة الإنتاج، يعرض رسالة عامة للمستخدمين
      showAlert('fail', 'An error occurred. Please try again later.');
  }
}


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
        totalVariable.value += rowData; // sum
        if (parseFloat(rowData) < 0) {
            return `<span style="color: red">${rowData}</span>`;
        } else if (parseFloat(rowData) === 0) {
            return '';
        } else {
            return rowData;
        }
    } else {
        return '';
    }
  } catch (error) {
    catch_error(error);
  }
}

//?  use it like this 
//todoa 1 :  first  code line after FillAttendanceTable lazem t3mel prepare Global variables ely hatshta8ala 3alhea  7asp 3add el columns ely enta 3ayz tegm3ha 
//? example       total_column1.value = 0
//? example       total_column2.value = 0

//todo 2: hatst5dem el function fe el td  zay Keda 3ashan te3mel sum we fnafs el wa2t trg3 el value beta3 el cell
//? example  <td style="width: auto; white-space: nowrap;">${total_column(total_amount, row.amount)}</td>

//todo 3: a5er 7aga ba3d  el table mayktmel  hat7ot el totals beta3k
//? document.getElementById("tfooter1").textContent = slice_Array1.length; // عدد الصفوف
//? document.getElementById("tfooter7").textContent = total_column1.value;
//? document.getElementById("tfooter8").textContent = total_column2.value;

  //#endregion END - total column

  //#region dragable ( rows > drag and drop )
  function makeTableRowsDraggable(tableId) {
    const table = document.getElementById(tableId).getElementsByTagName('tbody')[0];
    let draggedRow = null;
  
    table.addEventListener('mousedown', function(event) {
      if (event.target.classList.contains('drag-handle')) {
        draggedRow = event.target.closest('tr');
        draggedRow.style.cursor = 'grabbing';
        const mouseY = event.clientY;
        const initialTop = draggedRow.getBoundingClientRect().top;
        
        const mouseMoveHandler = function(event) {
          const deltaY = event.clientY - mouseY;
          draggedRow.style.transform = `translateY(${deltaY}px)`;
        };
  
        const mouseUpHandler = function(event) {
          document.removeEventListener('mousemove', mouseMoveHandler);
          document.removeEventListener('mouseup', mouseUpHandler);
          draggedRow.style.cursor = 'grab';
          draggedRow.style.transform = '';
          const targetRow = document.elementFromPoint(event.clientX, event.clientY).closest('tr');
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
        };
        
  
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
      }
    });
  
    table.addEventListener('dragstart', function(event) {
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

const options = { weekday: 'short' }; // تحديد نوع الترجمة
const currentLang = localStorage.getItem('currentLang')
if (currentLang === 'ar'){
  const dayName = date.toLocaleDateString('ar-EG', options); // هنا "ar-EG" يشير إلى اللغة العربية
  return dayName
}else{
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

  function showMenue() {
    sidebar.classList.add("sidebar_Media_Show");
    sidebar.classList.add("show");
    body.classList.add('no_scroll');
};

function hideMenue() {
    sidebar.classList.remove("show");
    sidebar.classList.add("hide");
    setTimeout(() => {
        sidebar.classList.remove("sidebar_Media_Show");
        sidebar.classList.remove("hide");
    }, 300); /* تأكد من إزالة الفئات بعد انتهاء الرسوم المتحركة */
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
  body_content.style.pointerEvents = 'none';
  
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

    await showDialog('','هل تريد الخروج من التطبيق ؟','');
    if (!dialogAnswer){
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
        redirection('login','info','تم تسجيل الخروج بنجاح : سيتم تجويلك الى الصفحه الرئيسيه')
      } else {
        showAlert('fail',data.message);
      }
    } catch (error) {
      closeDialog();
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

//#region check input type
let inputErrors = false; // المتغير العالمي لتتبع وجود الأخطاء في الإدخال
function check_parse(inputid, type) {
  const value = inputid.value; // احصل على قيمة حقل الإدخال
  const specialCharRegex = /['";$%&<>]/; // التعبير المنتظم للتحقق من الرموز الخاصة

  // إذا كان حقل الإدخال فارغًا، أعد null
  if (!value || value.trim() === '') {
      inputid.classList.remove('hover_error', 'input_error');
      inputErrors = false; // توجد أخطاء في الإدخال
      return null;
      
  }

  // تحقق من نوع القيمة بناءً على نوع البيانات المطلوب
  if (type === 'string') {
      // تحقق من وجود أي من الرموز الخاصة في القيمة
      if (isNaN(value) && !specialCharRegex.test(value)) {
          inputid.classList.remove('hover_error', 'input_error');
          inputErrors = false; // توجد أخطاء في الإدخال
      } else {
          inputid.classList.add('hover_error', 'input_error');
          inputErrors = true; // توجد أخطاء في الإدخال
      }
  }

  if (type === 'number') {
    // تحقق من وجود أي من الرموز الخاصة في القيمة
    if (isNaN(value) && !specialCharRegex.test(value)) {
      inputid.classList.add('hover_error', 'input_error');
      inputErrors = true; // توجد أخطاء في الإدخال

    } else {
      inputid.classList.remove('hover_error', 'input_error');
      inputErrors = false; // توجد أخطاء في الإدخال
    }
}
}

//#endregion end - check input type

//#region  loading
function showLoadingIcon(element) {
  element.classList.add('loading_icon');
  // element.style.pointerEvents = 'none'; // تعطيل التفاعل مع العنصر
  element.disabled = true; // تعطيل العنصر
  element.title = 'رجاء الانتظار قليلا...' // اضافه تلميح
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
  element.classList.remove('loading_icon');
  element.disabled = false; // تشغيل العنصر
  element.title = ''  // تعطيل ال التلميح
}


//#endregion end- loading

//#region fetching...



  //#region Update fetching...
  async function fetchUpdate1(posted_elements_AS_OBJECT,permission_name_string,dialogMessage_string,ResponseTimeBySecends_Time_secends,FetchURL_string,redirctionStatues_boolean,redirectionPage_string,){
    const controller = new AbortController();
      const signal = controller.signal;
      
      try {
          if (inputErrors) {
              showAlert('fail','رجاء أصلح حقول الإدخال التي تحتوي على أخطاء');
              return;
          }
          
          const permission = await btn_permission(permission_name_string,'update');
       
          if(!permission) {
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
          }, ResponseTimeBySecends_Time_secends*1000); // 10 ثواني
          
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
  async function fetchDelete1(posted_elements_AS_OBJECT,permission_name,dialogMessage,ResponseTimeBySecends,FetchURL,redirction_Boolean_Statues,redirectionPage,){
    const controller = new AbortController();
      const signal = controller.signal;
      
      try {
          if (inputErrors) {
              showAlert('fail','رجاء أصلح حقول الإدخال التي تحتوي على أخطاء');
              return;
          }
          
          const permission = await btn_permission(permission_name,'delete');
       
          if(!permission) {
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
          }, ResponseTimeBySecends*1000); // 10 ثواني
          
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


  async function fetchData_post1(FetchURL,posted_elements_AS_OBJECT,permission_name,permission_type,dialogMessage,ResponseTimeBySecends,redirectionPage,error_message){
    const controller = new AbortController();
      const signal = controller.signal;
      
      try {
          if (inputErrors) {
              showAlert('fail','رجاء أصلح حقول الإدخال التي تحتوي على أخطاء');
              return;
          }
          
          const permission = await btn_permission(permission_name,permission_type);
       
          if(!permission) {
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
          }, ResponseTimeBySecends*1000); // 10 ثواني
          
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
                  showAlert('fail', data.message_ar);
              }
          } else {
              closeDialog();
              showAlert('fail', `Request failed with status code: ${response.status}`);
          }
      } catch (error) {
          closeDialog();
          showAlert('fail',error_message);
          catch_error(error);
      }
  }
  

  // let data = [];
  async function fetchData_postAndGet(FetchURL,posted_elements_AS_OBJECT,permission_name,permission_type,ResponseTimeBySecends,is_confirm_dialog,dialogMessage,error_message){
    const controller = new AbortController();
      const signal = controller.signal;
      
      try {
          if (inputErrors) {
              showAlert('fail','رجاء أصلح حقول الإدخال التي تحتوي على أخطاء');
              return;
          }
          
          const permission = await btn_permission(permission_name,permission_type);
       
          if(!permission) {
           return;
          };
  
          // // تجهيز البيانات للإرسال إلى الخادم
          // const posted_elements = {
          //     user_id,
          // };
          if (is_confirm_dialog) {
            if (is_confirm_dialog)
            await showDialog('', dialogMessage, '');
            if (!dialogAnswer) {
                return;
            }
          }

          
          // تعيين حد زمني للطلب
          const timeout = setTimeout(() => {
              controller.abort(); // إلغاء الطلب
          }, ResponseTimeBySecends*1000); // 10 ثواني
          
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
            // closeDialog();
              data = await response.json();
          } else {
            // closeDialog();
              showAlert('fail', `Request failed with status code: ${response.status}`);
          }
      } catch (error) {
        // closeDialog();
          showAlert('fail',error_message);
          catch_error(error);
      }
  }

//#endregion END- fetching

