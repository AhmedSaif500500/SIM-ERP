//#region  get user data and show



//#region  Authentication
let Authentication = true;
const user_id = sessionStorage.getItem('user_id');
sessionStorage.removeItem('user_id');
if (!user_id) {
  Authentication = false;
 redirection('users_ar','fail','رجاء تحديد المستخدم اولا : سيتم توجيهك الى صفحه المستخدمين الرئيسية')
};

//#endregion end-Authentication


  // many codes

  async function get_user_data_fn() {
    try {
      if(!Authentication){
        return;
    }
      // تجهيز البيانات للإرسال إلى الخادم
      const posted_elements = {
        user_id
      };

      // إرسال البيانات إلى الخادم وانتظار استجابة الخادم
      const response = await fetch('/editUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(posted_elements)
      });

      const data = await response.json();

      if (data.success) {
        array1 = data.rows[0]; /* اول صف فقط فى الروز الى فيه البيانات */
        await show_data();
      } else {
        catch_error('error fetching employee_id 1 : ', data.message);
      }
    } catch (error) {
      catch_error('error fetching employee_id 3 : ', error.message);
    };
  };


  async function show_data() {
    try {
      const optionValue = array1.general_permission;
      document.querySelector(`#user_name_input`).value = array1.user_name;
      document.querySelector('#general_permission_select').value = document.querySelector('#general_permission_select').options[optionValue].value;
      document.querySelector('#table_permission_users').value = array1.users_permission;
      document.querySelector('#table_permission_employee').value = array1.employees_permission;
      document.querySelector('#table_permission_attendance').value = array1.attendance_permission;
      document.querySelector('#table_permission_production').value = array1.production_permission;
    } catch (error) {
      catch_error('error in show_data', error.message);
    };
  };

  // ! general permission select input
  async function general_permission_select_change() {
    const table = document.querySelector("#permissions_table");
    const value = parseInt(document.querySelector("#general_permission_select").value);
    if (value === 1) {
      // table.removeAttribute("hidden"); // show table
      table.style.display = "block";
    } else {
      table.style.display = "none";
    };
  };


  //! table level select change

  // todo how to use
  /*
                   <select style="width: 100%; height: 100%; line-height: 100%; font-size: 1.5rem;" onchange="updatePermissionLevel(this)">
                    <option value="0" selected>0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </td>
   */
  function updatePermissionLevel(select) {
    const level = select.value;
    let text = "";

    switch (level) {
      case "0":
        text = "لا صلاحيات";
        break;
      case "1":
        text = "عرض";
        break;
      case "2":
        text = "عرض واضافه";
        break;
      case "3":
        text = "عرض واضافه وتعديل";
        break;
      case "4":
        text = "عرض واضافه وتعديل وحذف";
        break;
    }

    // تحديث العمود الأخير بقيمة الـ text
    const row = select.closest("tr"); // الحصول على الصف
    const lastColumn = row.cells[4]; // العمود الأخير في الصف
    lastColumn.textContent = text;
  };

  document.querySelector('#changePassword_btn').addEventListener('click', async function () {
    const changePassword_div = document.querySelector('#changePassword_div');
    // التحقق مما إذا كان العنصر مخفيًا أم لا
    if (changePassword_div.style.display === 'none') {
      // إذا كان مخفيًا، قم بإظهاره
      changePassword_div.style.display = 'block';
    } else {
      // إذا كان ظاهرًا، قم بإخفائه
      changePassword_div.style.display = 'none';
    }
  });


  //! events 
  document.querySelector("#general_permission_select").addEventListener("change", function () {
    general_permission_select_change();
  });


  //  عمل فحص لكل صف لفحص مستولى الصلاحيه واضفه النص الخاص بالصلاحيه
  function update_Permissions_Levels_Text_OnPageLoad() {
    // العثور على جميع عناصر الـ select في الصفحة
    const selects = document.querySelectorAll('.permission_table_select');

    // الدوران على كل select وتحديث النص لكل صف
    selects.forEach(select => {
      updatePermissionLevel(select);
    });
  };

  document.addEventListener("DOMContentLoaded", async function () {
    try {
      await get_user_data_fn();
      general_permission_select_change();
      update_Permissions_Levels_Text_OnPageLoad();
    } catch (error) {
      console.error('Error during DOMContentLoaded:', error);
      catch_error('Error during DOMContentLoaded', error)
    }
  });

  //#endregion END - get user data and show



  //#region edite function



  document.querySelector("#btn_edit").addEventListener("click", async function () {
    try {

      // event.preventDefault(); // if <a>

      // استعداد البيانات
      const user_name_input = document.querySelector("#user_name_input").value.trim();
      const pass_input1 = document.querySelector("#pass_input1").value.trim();
      const pass_input2 = document.querySelector("#pass_input2").value.trim();
      let general_permission_select = parseInt(document.querySelector("#general_permission_select").value);
      let table_permission_users = parseInt(document.querySelector("#table_permission_users").value); // 5aleha let msh const
      let table_permission_employee = parseInt(document.querySelector("#table_permission_employee").value);
      let table_permission_attendance = parseInt(document.querySelector("#table_permission_attendance").value);
      let table_permission_production = parseInt(document.querySelector("#table_permission_production").value);
      const today = new Date().toISOString().split("T")[0]; // date in format (yyyy-mm-dd)
      const changePassword_div = document.querySelector('#changePassword_div');

      // التحقق من صحة البيانات هنا
      if (!user_name_input) {
        showAlert("fail", "من فضلك تأكد من ادخال اسم المستخدم بشكل صحيح");
        return;
      };

      // التحقق من اراده المستخجم لتعديل الباسورد ام لا 
      if (changePassword_div.style.display === 'block') {
        if (!pass_input1 || !pass_input2) {
          showAlert('fail', 'من فضلك ادخل كلمة المرور الجديده بشكل صحيح')
          return;
        } else {
          if (pass_input1 !== pass_input2) {
            showAlert('fail', 'كلمة المرور الجديده غير متطابقه')
            return;
          };
        };
      };

      // تأكيد المستخدم
      if (!confirm(`Please Confirm.. Do you want to save data ?`)) {
        return;
      };

      // التحقق اذا المستخدم يريد ادخال  كلمة مرور جديده ام لا 
      let newPassword_Condition = false;
      if (changePassword_div.style.display === 'block') {
        newPassword_Condition = true;
      };


      // ضبط قيم الصلاحيات
      if (general_permission_select !== 1 || general_permission_select === 0) {
        table_permission_users = 0;
        table_permission_employee = 0;
        table_permission_attendance = 0;
        table_permission_production = 0;
        // add here all tables select permission id
      };



      // تجهيز البيانات للإرسال إلى الخادم
      const posted_elements = {
        user_id,
        newPassword_Condition,
        user_name_input,
        pass_input1,
        general_permission_select,
        table_permission_users,
        table_permission_employee,
        table_permission_attendance,
        table_permission_production,
        today,
      };

      // إرسال البيانات إلى الخادم
      const response = await fetch("/edit_User_from_user_edit_ar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(posted_elements),
      })
      // استلام الرد من الخادم
      const data = await response.json();
      if (data.success) {
        redirection('users_ar','success',data.message);
      } else {
        showAlert("fail", data.message);
      };

    } catch (error) {
      console.error("Error updating employee:", error.message);
      // يمكنك هنا إظهار رسالة خطأ أو اتخاذ إجراء آخر في حالة حدوث أي خطأ آخر
    }
  });




  document.querySelector("#btn_delete").addEventListener("click", async function () {
    try {

      
      if (inputErrors) {
        showAlert('fail','رجاء اصلح  حقول الادخال التى تحتوى على اخطاء')
        return;
    }

      // event.preventDefault(); // if <a>
      // تأكيد المستخدم


      // تجهيز البيانات للإرسال إلى الخادم
      const posted_elements = {
        user_id,
      };

      await showDialog('','هل تريد حذف المستخدم ؟','');
      if (!dialogAnswer){
        return
      }
      // إرسال البيانات إلى الخادم
      const response = await fetch("/delete_User_from_user_edit_ar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(posted_elements),
      })
      // استلام الرد من الخادم
      const data = await response.json();
      if (data.success) {
        closeDialog();
        redirection('users_ar','success',data.message);
      } else {
        closeDialog();
        showAlert("fail", data.message);
      };

    } catch (error) {
      console.error("Error deleting employee:", error.message);
      // يمكنك هنا إظهار رسالة خطأ أو اتخاذ إجراء آخر في حالة حدوث أي خطأ آخر
    }
  });





//#endregion End save Function












