setActiveSidebar('permissions_view_ar');

//#region  get user data and show



//#region  Authentication

// const user_id = parseInt(sessionStorage.getItem('user_id'));
// sessionStorage.removeItem('user_id');
// if (!user_id) {

//   redirection('permissions_view_ar', 'fail', 'رجاء تحديد المستخدم اولا : سيتم توجيهك الى صفحه المستخدمين الرئيسية')
// };



//#endregion end-Authentication


const sub_h2_header =  document.querySelector(`#sub_h2_header`);
const btn_update =  document.querySelector(`#btn_update`);

// many codes
let data = [];
let array1 = [];
let slice_Array1 = [];

let user_id;
async function get_user_data_fn() {
  try {

    let urlData = getURLData('data','permissions_view_ar','رابط غير صالح : سيتم اعادة توجيهك الى صفحة الصلاحيات')
    user_id = urlData.selectedUser;


    data = await new_fetchData_postAndGet(
      '/updateUser',
      { user_id },
      "users_permission", "update",
      15,
      false,'',
      true,
      true,content_space,
      false,false,false,
      false,false,false,false,
      'حدث خطأ اثناء معالجة البيانات'
    ) 


    array1 = data[0] /* اول صف فقط فى الروز الى فيه البيانات */

    
    show_data();

  } catch (error) {
    catch_error(error);
  };
};

  function show_data() {
  try {

    if (array1.is_stop && array1.is_stop === true) {
      document.querySelector(`#p_stop_user_text`).display.style = "block";
    }

    sub_h2_header.textContent = `المستخدم : ${array1.user_full_name}`
    const optionValue = array1.general_permission;

    //! Global Code permissions500 F-3
    document.querySelector(`#user_name_input`).value = array1.user_full_name || 0;
    // document.querySelector('#general_permission_select').value = document.querySelector('#general_permission_select').options[optionValue].value || 0;
    document.querySelector('#general_permission_select').value = array1.general_permission || 0;
    document.querySelector("#table_permission_users").value = array1.users_permission || 0;
    document.querySelector("#table_permission_departments").value = array1.departments_permission || 0;
    document.querySelector("#table_permission_employees").value = array1.employees_permission || 0;
    document.querySelector("#table_permission_effects").value = array1.effects_permission || 0;
    document.querySelector("#table_permission_production").value = array1.production_permission || 0;
    document.querySelector("#table_permission_bread").value = array1.bread_permission || 0;
    document.querySelector("#table_permission_transaction").value = array1.transaction_permission || 0;
    document.querySelector("#table_permission_items").value = array1.items_permission || 0;
    document.querySelector("#table_permission_customers").value = array1.customers_permission || 0;
    document.querySelector("#table_permission_vendors").value = array1.vendors_permission || 0;
    document.querySelector("#table_permission_itemsLocations").value = array1.itemsLocations_permission || 0;
    document.querySelector("#table_permission_salesman").value = array1.salesman_permission || 0;
    document.querySelector("#table_permission_sales_qutation").value = array1.sales_qutation_permission || 0;
    document.querySelector("#table_permission_sales_order").value = array1.sales_order_permission || 0;
    document.querySelector("#table_permission_sales_invoice").value = array1.sales_invoice_permission || 0;
    document.querySelector("#table_permission_purshases_qutation").value = array1.purshases_qutation_permission || 0;
    document.querySelector("#table_permission_purshases_order").value = array1.purshases_order_permission || 0;
    document.querySelector("#table_permission_purshases_invoice").value = array1.purshases_invoice_permission || 0;
    document.querySelector("#table_permission_services").value = array1.services_permission || 0;
    document.querySelector("#table_permission_sales_returns").value = array1.sales_returns_permission || 0;
    document.querySelector("#table_permission_purshases_returns").value = array1.purshases_returns_permission || 0;
    document.querySelector("#table_permission_fixed_assests").value = array1.fixed_assests_permission || 0;
    document.querySelector("#table_permission_accumulated_depreciation").value = array1.accumulated_depreciation_permission || 0;
    document.querySelector("#table_permission_disposed_fixed_asset").value = array1.disposed_fixed_asset_permission || 0;
    document.querySelector("#table_permission_items_transfer").value = array1.items_transfer_permission || 0;
    document.querySelector("#table_permission_cash_accounts").value = array1.cash_accounts_permission || 0;
    document.querySelector("#table_permission_cash_transaction").value = array1.cash_transaction_permission || 0;
  } catch (error) {
    catch_error(error)
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

// document.querySelector('#changePassword_btn').addEventListener('click', async function () {
//   const changePassword_div = document.querySelector('#changePassword_div');
//   // التحقق مما إذا كان العنصر مخفيًا أم لا
//   if (changePassword_div.style.display === 'none') {
//     // إذا كان مخفيًا، قم بإظهاره
//     changePassword_div.style.display = 'block';
//   } else {
//     // إذا كان ظاهرًا، قم بإخفائه
//     changePassword_div.style.display = 'none';
//   }
// });


//! events 
document.querySelector("#general_permission_select").addEventListener("change", function () {
  general_permission_select_change();
});


//  عمل فحص لكل صف لفحص مستولى الصلاحيه واضفه النص الخاص بالصلاحيه
function update_Permissions_Levels_Text_OnPageLoad() {
  
  // العثور على جميع عناصر الـ select في الصفحة
  const selects = document.querySelectorAll('.s');

  // الدوران على كل select وتحديث النص لكل صف
  selects.forEach(select => {
    updatePermissionLevel(select);
  });
};

document.addEventListener("DOMContentLoaded", async function () {
  try {
    await get_user_data_fn();
    await general_permission_select_change();
    update_Permissions_Levels_Text_OnPageLoad();
    page_content.style.display = `flex`
  } catch (error) {
    catch_error('Error during DOMContentLoaded', error)
  }
});

//#endregion END - get user data and show



//#region update function



btn_update.addEventListener("click", async function () {
  
try {
  

  
    function A(str_variable) {
      const element = document.querySelector(str_variable);
      return element.value == 0 ? '' : element.value;
  }
  
  //! Global Code permissions500 F-4
  let general_permission_select = A("#general_permission_select");
  let table_permission_users = A("#table_permission_users");
  let table_permission_departments = A("#table_permission_departments");
  let table_permission_employees = A("#table_permission_employees");
  let table_permission_effects = A("#table_permission_effects");
  let table_permission_production = A("#table_permission_production");
  let table_permission_bread = A("#table_permission_bread");
  let table_permission_transaction = A("#table_permission_transaction");
  let table_permission_items = A("#table_permission_items");
  let table_permission_customers = A("#table_permission_customers");
  let table_permission_vendors = A("#table_permission_vendors");
  let table_permission_itemsLocations = A("#table_permission_itemsLocations");
  let table_permission_salesman = A("#table_permission_salesman");
  let table_permission_sales_qutation = A("#table_permission_sales_qutation");
  let table_permission_sales_order = A("#table_permission_sales_order");
  let table_permission_sales_invoice = A("#table_permission_sales_invoice");
  let table_permission_purshases_qutation = A("#table_permission_purshases_qutation");
  let table_permission_purshases_order = A("#table_permission_purshases_order");
  let table_permission_purshases_invoice = A("#table_permission_purshases_invoice");
  let table_permission_services = A("#table_permission_services");
  let table_permission_sales_returns = A("#table_permission_sales_returns");
  let table_permission_purshases_returns = A("#table_permission_purshases_returns");
  let table_permission_fixed_assests = A("#table_permission_fixed_assests");
  let table_permission_accumulated_depreciation = A("#table_permission_accumulated_depreciation");
  let table_permission_disposed_fixed_asset = A("#table_permission_disposed_fixed_asset");
  let table_permission_items_transfer = A("#table_permission_items_transfer");
  let table_permission_cash_accounts = A("#table_permission_cash_accounts");
  let table_permission_cash_transaction = A("#table_permission_cash_transaction");

    // ضبط قيم الصلاحيات
    if (general_permission_select != "1" || general_permission_select == '') {

      //! Global Code permissions500 F-5
      table_permission_users = '';
      table_permission_departments = '';
      table_permission_employees = '';
      table_permission_effects = '';
      table_permission_production = '';
      table_permission_bread = '';
      table_permission_transaction = '';
      table_permission_items = '';
      table_permission_customers = '';
      table_permission_vendors = '';
      table_permission_itemsLocations = '';
      table_permission_salesman = '';
      table_permission_sales_qutation = '';
      table_permission_sales_order = '';
      table_permission_sales_invoice = '';
      table_permission_purshases_qutation = '';
      table_permission_purshases_order = '';
      table_permission_purshases_invoice = '';
      table_permission_services = '';
      table_permission_sales_returns = '';
      table_permission_purshases_returns = '';
      table_permission_fixed_assests = '';
      table_permission_accumulated_depreciation = '';
      table_permission_disposed_fixed_asset = '';
      table_permission_items_transfer = '';
      table_permission_cash_accounts = '';
      table_permission_cash_transaction = '';
      // add here all tables select permission id
    };


    // تجهيز البيانات للإرسال إلى الخادم
  
    //! Global Code permissions500 F-6
      const post = await new_fetchData_postAndGet(
        '/update_User_from_user_update_ar',
        { user_id,
          general_permission_select,
          table_permission_users,
          table_permission_departments,
          table_permission_employees,
          table_permission_effects,
          table_permission_production,
          table_permission_bread,
          table_permission_transaction,
          table_permission_items,
          table_permission_customers,
          table_permission_vendors,
          table_permission_itemsLocations,
          table_permission_salesman,
          table_permission_sales_qutation,
          table_permission_sales_order,
          table_permission_sales_invoice,
          table_permission_purshases_qutation,
          table_permission_purshases_order,
          table_permission_purshases_invoice,
          table_permission_services,
          table_permission_sales_returns,
          table_permission_purshases_returns,
          table_permission_fixed_assests,
          table_permission_accumulated_depreciation,
          table_permission_disposed_fixed_asset,
          table_permission_items_transfer,
          table_permission_cash_accounts,
          table_permission_cash_transaction,
        },
        'users_permission','update',
        20,
        true,"هل تريد تعديل صلاحيات المستخدم ؟ ",
        true,
        false,false,
        false,false,false,
        true,"permissions_view_ar",
        false,false,
        'حدث خطأ اثناء معالجة البيانات : تم الغاء العمليه'
      )

      

  } catch (error) {
    catch_error(error)
  }
});





//#endregion End save Function












