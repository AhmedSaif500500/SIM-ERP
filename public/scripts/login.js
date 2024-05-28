  
  //#region login function
  
  const loginBtn = document.querySelector('#loginBtn')
  const login_div = document.querySelector('#login_div');
  login_div.style.pointerEvents = 'auto';

 
  async function login_fn() {
    try {
      const controller = new AbortController();
      const signal = controller.signal;

      showLoadingIcon(loginBtn);

      login_div.style.pointerEvents = 'none';
      // login_div.style.setProperty('pointer-events', 'none'); // disable login  dive till recieve  response
      // event.preventDefault();  // if <a> button
      //1: variables
      const username_Input = document.querySelector('#username').value.trim();
      const password_Input = document.querySelector('#password').value.trim();
      const loginInformation = document.querySelector('#loginInformation');

      //2: validation
      if (!username_Input || !password_Input) {
        showAlert('fail','Username or Password is empty');
        loginInformation.innerText = 'رجاء التأكد من ادخال اسم المستخدم  وكلمه المرو';
        login_div.style.pointerEvents = 'auto';
        return;
    }
 
    //3: confirmation 
    
    //4: prepare data that you want to post ( send to backend)
    const posted_elements = {
      username_Input,
      password_Input
    };
   

              // تعيين حد زمني للطلب
              const timeout = setTimeout(() => {
                controller.abort(); // إلغاء الطلب
            },10000); // 10 ثواني
   
    //5: post(send) posted_elements to Backend
    const response = await fetch('/Login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(posted_elements),
        signal, // تمرير الإشارة لإلغاء الطلب
    });

              
          // إلغاء المهلة الزمنية إذا تمت الاستجابة في الوقت المناسب
          clearTimeout(timeout);

   // dont put anything here 
    //6: receive  respons from backend about transaction
    if (response.ok) {
      hideLoadingIcon(loginBtn);
    const data = await response.json();
        if (data.success) {
          
          
           showAlert('success',data.message_ar);
           showAlert('warning',`Don't forget to sign out when you're done to ensure the security of your account`);


            // انتظار ثلاث ثوانى بعد ظهر الرساله
           setTimeout(() => {
              sessionStorage.setItem("username", data.username); // save username in seesionStorage to use it in index.html
              sessionStorage.setItem("current_id", data.user_id); // save username in seesionStorage to use it in index.html
              sessionStorage.setItem("userFullName", data.user_full_name); // save username in seesionStorage to use it in index.html
              sessionStorage.setItem("owner", data.is_owner); // save username in seesionStorage to use it in index.html


              //! فحص اذا كان اللغه انجليزى ولا عربى
              const currentLang = localStorage.getItem('currentLang')
              if(currentLang && currentLang === 'en') {
                login_div.style.pointerEvents = 'auto';
                  window.location.href = '/companies_en';
              }else{

                login_div.style.pointerEvents = 'auto';
                  window.location.href = '/companies_ar'; // if no lang saved
              };
          }, 3000);

            //!_________________________________________

        } else {
          hideLoadingIcon(loginBtn);
          showAlert('fail',data.message_ar) // lazem da el awel befor( login_div.style.pointerEvents = 'auto'; ) 3ashan lw 3akst hatla2y el IDM bysht8al y7mel el sound
          login_div.style.pointerEvents = 'auto';
            
        };
      } else {
        hideLoadingIcon(loginBtn);
        showAlert('fail', `Request failed with status code: ${response.status}`);
    }
      } catch (error) {
        hideLoadingIcon(loginBtn);
        login_div.style.pointerEvents = 'auto';
          catch_error(error)
      };
  }

  loginBtn.addEventListener('click', function () {
      
      login_fn();
      });

      document.querySelector('#username').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          login_fn();
        };
    });

    document.querySelector('#password').addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        login_fn();
      };
  });

    //#endregion end login function


    function showReason() {
        let message;
        const urlParams = new URLSearchParams(window.location.search);
        const reason = urlParams.get("reason");
        
        if (reason){
        switch (reason) {
          case "0":
            message = "من فضلك اعد تسجيل الدخول"; // Unauthorized message in Arabic
            break;
          case "1":
            message = "اسم المستخدم أو كلمة المرور غير صحيحة."; // Invalid credentials message in Arabic
            break;
          default:
            message = "حدث خطأ غير معروف."; // Default error message
        }
    };
      
        if (message) {
          showAlert('fail', message);
        }
      }
      
      document.addEventListener('DOMContentLoaded', function() {
        showReason();
      });
      
