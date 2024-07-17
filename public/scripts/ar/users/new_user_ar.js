setActiveSidebar('users_ar');
//#region  save function

document.querySelector("#btn_save").addEventListener("click", async function () {
    try {

      if (inputErrors) {
        showAlert("fail", "رجاء اصلح  حقول الادخال التى تحتوى على اخطاء");
        return;
      }
      // event.preventDefault(); // if <a>

      // استعداد البيانات
      const user_name_input = document.querySelector("#user_name_input").value.trim();
      const pass_input1 = document.querySelector("#pass_input1").value.trim();
      const pass_input2 = document.querySelector("#pass_input2").value.trim();
      let general_permission_select = parseInt(document.querySelector("#general_permission_select").value); // 5aleha let msh const
      // let table_permission_users = parseInt(document.querySelector("#table_permission_users").value); // 5aleha let msh const
      // let table_permission_employee = parseInt(document.querySelector("#table_permission_employee").value); // 5aleha let msh const
      // let table_permission_attendance = parseInt(document.querySelector("#table_permission_attendance").value); // 5aleha let msh const
      // let table_permission_production = parseInt(document.querySelector("#table_permission_production").value); // 5aleha let msh const
      // let table_permission_bread = parseInt(document.querySelector("#table_permission_bread").value); // 5aleha let msh const
      // let table_permission_transaction = parseInt(document.querySelector("#table_permission_transaction").value); // 5aleha let msh const
      const permissions = [
        "users",
        "employee",
        "attendance",
        "production",
        "bread",
        "transaction",
        "items",
        // Add new permissions here
      ];

      // Initialize an object to store permissions
let permissionsValues = {};

// Get the values of all permissions dynamically
permissions.forEach(permission => {
  permissionsValues[`table_permission_${permission}`] = parseInt(document.querySelector(`#table_permission_${permission}`).value);
});

      const today = new Date().toISOString().split("T")[0]; // date in format (yyyy-mm-dd)

      // التحقق من صحة البيانات هنا

      if (!user_name_input || !pass_input1 || !pass_input2) {
        showAlert("fail", "من فضلك تأكد من ادخال البيانات بشكل صحيح");
        return;
      };

      if (pass_input1 !== pass_input2) {
        showAlert("fail", "كلمة المرور غير متطابقه");
        return;
      };

       
      // ضبط قيم الصلاحيات
// Adjust the permissions based on the value of general_permission_select
if (general_permission_select !== 1 || general_permission_select === 0) {
  permissions.forEach(permission => {
    permissionsValues[`table_permission_${permission}`] = 0;
  });
}
      await showDialog('','هل تريد حفظ البيانات ؟','');
      if (!dialogAnswer){
        return
      }
      // تجهيز البيانات للإرسال إلى الخادم
// Create the posted_elements object dynamically
const posted_elements = {
  user_name_input,
  pass_input1,
  general_permission_select,
  today,
  ...permissionsValues // الثلاث نقط دول لنشر عناصر الاوبجيكت
};

      // إرسال البيانات إلى الخادم
      const response = await fetch("/addNewuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(posted_elements),
      });
        // استلام الرد من الخادم
        const data = await response.json();
          if (data.success) {
            closeDialog();
            showAlert("success", data.message);
            clear();
          } else {
            closeDialog();
            showAlert("fail", data.message);
          };
    } catch (error) {
      console.error("Error adding employee:", error.message);
      // يمكنك هنا إظهار رسالة خطأ أو اتخاذ إجراء آخر في حالة حدوث أي خطأ آخر
    }
  });


  

function clear() {

// clear top inputs
const fieldsToClear = [
  "#user_name_input",
  "#pass_input1",
  "#pass_input2",
];
fieldsToClear.forEach((field) => {
  document.querySelector(field).value = "";
});

// clear general_permission_select
const general_permission_select = document.querySelector('#general_permission_select');
general_permission_select.value = general_permission_select.options[0].value;

// clear table data
const selects = document.querySelectorAll('.permission_table_select');
selects.forEach(select => {
  select.value = select.options[0].value;
  select.closest("tr").cells[4].textContent = 'لا صلاحيات';

  // hidden table
  document.querySelector('#permissions_table').style.display = "none" // hidden table
});


}
//#endregion End save Function



// ! general permission select input
document.querySelector("#general_permission_select").addEventListener("change", async function () {
    const table = document.querySelector("#permissions_table");
    const value = parseInt(
      document.querySelector("#general_permission_select").value
    );
    if (value === 1) {
      // table.removeAttribute("hidden"); // show table
      table.style.display = "block";
    } else {
      table.style.display = "none";
    }
  });

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



//  عمل فحص لكل صف لفحص مستولى الصلاحيه واضفه النص الخاص بالصلاحيه
function update_Permissions_Levels_Text_OnPageLoad() {
  // العثور على جميع عناصر الـ select في الصفحة
  const selects = document.querySelectorAll(".permission_table_select");

  // الدوران على كل select وتحديث النص لكل صف
  selects.forEach((select) => {
    updatePermissionLevel(select);
  });
};

document.addEventListener("DOMContentLoaded", function () {
  update_Permissions_Levels_Text_OnPageLoad();
});