

//#region check permissions

const is_owner = sessionStorage.getItem('owner')
const add_company_users_btns_div = document.querySelector(`#add_company_users_btns_div`);
if (is_owner && is_owner === 'true') {
  add_company_users_btns_div.style.display = 'flex';
} else {
  add_company_users_btns_div.style.display = 'none';
}
//#endregion

//#region Companies_ar Page itself
// إعلان المتغير على مستوى الـ script  
const tableContainer = document.getElementById('tableContainer');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

const add_new_bussnies = document.querySelector(`#add_new_bussnies`);
const users_btn = document.querySelector(`#users_btn`);

let array1 = [];
let slice_Array1 = [];

async function geteProductionData_fn() {
try {
  
  const data = await fetchData_postAndGet(
    "/get_companies_data",
    {},
    "","",
    15,
    false,"",
    false,
    true,
    content_space,
    false,"",
    "حدث خطأ اثناء معالجة البيانات"
);


  // تحديث array1 بنتيجة الـ slice
  array1 = data.slice();

} catch (error) {
  catch_error(error)
}
}


async function new_user_fn(btn) {
  try {
    
    showLoadingIcon(btn)
    if (!new_user_dive) {
      return;
    }


    const htmlCode = `
    <h2 id="h2_new_user" class="h2">
    <i class="fa-solid fa-arrow-right back_icon" onclick="
document.querySelector('#dialog_body_button_div').style.display = 'flex'
document.querySelector('#new_user_dive').style.display = 'none'
document.querySelector('#yesButton').style.display = 'none'
"></i>
    مستخدم جديد
</h2>
<label for="user_name_input" class="lbl_sm">اسم المستخدم ( المستخدم فى الدخول )</label>
<input type="search" id="user_name_input" class="input_text_md w_full hover"
    oninput="check_parse(this, 'string')" autocomplete="off">


<!-- pass div -->
<button id="btn_change_pass" class="btn_new"
    style="width: fit-content; margin-block-end: 2rem; margin-block-start: 1rem; display: none;"
    onclick="btn_change_pass_fn()">تعيين كلمة مرور
    جديده</button>

<!-- passwords -->
<div id="pass_div" class="flex-column w_full" style="flex-wrap: nowrap;">
    <div id="new_pass_div" class="column" style="display:none">
        <label for="pass_input_new_pass_inpu" class="lbl_sm">كلمة المرور القديمة</label>

        <div id="input_your_new_pass_div" class="flex_row w_full"
            style="margin-inline-end: 1rem; display: flex">
            <div class="input_with_icon_div w_full">
                <input type="password" name="" id="pass_input_new_pass_inpu"
                    placeholder="ادخل كلمه المرور الجديده" class="pass_input w_full hover"
                    autocomplete="on">
                <i class="fa-solid fa-key left_icon"></i>
            </div>
            <button id="show_pass_btn1" class="btn_eye hover"
                onmousedown="showPassword('pass_input_new_pass_inpu', 'eye_icon1')"
                onmouseup="hidePassword('pass_input_new_pass_inpu', 'eye_icon1')"
                ontouchstart="showPassword('pass_input_new_pass_inpu', 'eye_icon1')"
                ontouchend="hidePassword('pass_input_new_pass_inpu', 'eye_icon1')"><i id="eye_icon1"
                    class="fa-regular fa-eye eye_icon"></i>
            </button>
        </div>
    </div>
    <label for="pass_input1" class="lbl_sm">كلمة المرور الجديده</label>
    <!-- pass div -->
    <div class="flex_row w_full">
        <div class="input_with_icon_div w_full">
            <input type="password" name="" id="pass_input1" oninput="check_parse(this, 'string')"
                placeholder="ادخل كلمه المرور" class="pass_input hover w_full" autocomplete="on">
            <i class="fa-solid fa-key left_icon"></i>
        </div>
        <button id="show_pass_btn1" class="btn_eye hover"
            onmousedown="showPassword('pass_input1', 'eye_icon1')"
            onmouseup="hidePassword('pass_input1', 'eye_icon1')"
            ontouchstart="showPassword('pass_input1', 'eye_icon1')"
            ontouchend="hidePassword('pass_input1', 'eye_icon1')"><i id="eye_icon1"
                class="fa-regular fa-eye eye_icon"></i>
        </button>
    </div>

    <!-- pass div -->
    <div class="flex_row w_full">
        <div class="input_with_icon_div w_full">
            <input type="password" name="" id="pass_input2" oninput="check_parse(this, 'string')"
                placeholder="تأكيد كلمه المرور" class="pass_input w_full hover" autocomplete="on">
            <i class="fa-solid fa-key left_icon"></i>
        </div>
        <button id="show_pass_btn2" class="btn_eye hover"
            onmousedown="showPassword('pass_input2', 'eye_icon2')"
            onmouseup="hidePassword('pass_input2', 'eye_icon2')"
            ontouchstart="showPassword('pass_input2', 'eye_icon2')"
            ontouchend="hidePassword('pass_input2', 'eye_icon2')"><i id="eye_icon2"
                class="fa-regular fa-eye eye_icon"></i>
        </button>
    </div>
</div>

<label for="user_fullName_input" class="lbl_sm">اسم المستخدم بالكامل</label>
<input type="search" id="user_fullName_input" class="input_text_md w_full hover"
    oninput="check_parse(this, 'string')" title="الاسم الذى يظهر على الشاشه للاخرين"
    autocomplete="off">


<!-- الصلاحيات -->

<label for="general_permission_select" class="lbl_sm">صلاحيات عامه</label>
<select class="permission_select hover mb_10" id="user_main_permission_select" onchange="user_main_permission_select_fn(this)">
    <option value="0" selected>صلاحيات المالك</option>
    <option value="1">صلاحيات مقيده</option>
</select>

<!-- الشركات -->
<div id="companies_div" class="column x_start y_start w_full" style="display: none">
    <label for="div1" class="lbl_sm">شركات منضمه</label>
    <div id="div1" class="tags_div hover scroll">
        <!-- Buttons in div1 -->

    </div>

    <label for="div2" class="lbl_sm">شركات غير منضمه</label>
    <div id="div2" class="tags_div hover scroll">
        <!-- Buttons in div2 -->

    </div>
</div>
    `
    new_user_dive.innerHTML= htmlCode


    const footer = `
    <button id="yesButton" class="btn_save" style="display: none;" onclick="save_new_user()">حفظ</button>
    <button id="noButton" class="btn_cancel" onclick="noButton()">إنهاء</button>
    `

    document.querySelector(`#dialogOverlay_input`).querySelector(`#dialog_footer`).innerHTML= footer;


    const new_user = 'true'
    let div2 = document.querySelector(`#div2`);
    const data = await fetchData_postAndGet(
      "/api/get_companies_users",
      { new_user },
      'pass', 'pass',
      20,
      false,
      '',
      false,
      false,'',
      false,'',
      'حدث خطأ اثناء معالجة البيانات'
    )

    const dataLength = data.length
    if (!dataLength) {
      closeDialog()
      showAlert('fail', 'حدث خطأ اثناء معالجه البيانات برجاء التواصل مع الدعم الفنى')
      return
    }
    
    div2.innerHTML = "";
    data.forEach(function (item) {
      const buttonHTML = `<button onclick="moveButton(this)" data-company='{"N1": ${item.company_id}, "N2": "${item.company_name}"}'>${item.company_name}</button>`;
      div2.innerHTML += buttonHTML;
    });


    if (new_user_dive.style.display === 'none') {
      new_user_dive.style.display = 'flex'
      yesButton.style.display = 'flex'
      dialog_body_button_div.style.display = 'none'
    } else {
      new_user_dive.style.display = 'none'
      dialog_body_button_div.style.display = 'flex'
      yesButton.style.display = 'none'
    }

    hideLoadingIcon(btn)
  } catch (error) {
    hideLoadingIcon(btn)
    closeDialog();
    catch_error(error)
  }
}

async function showFirst50RowAtTheBegening() {
  await geteProductionData_fn()
  slice_Array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  filleffectstable()
}

async function filleffectstable() {
  //  @@ هاااااام جدا 
  // el properties beta3 kol 3amod ytm wad3ha fe el <thead></thead> And <tbody></tbody> And <tfoor></tfoor> kol wa7ed lewa7do
  // el properties hya :
  // 1 : display: none; > fe 7alt enak ardt e5fa2 el 3amod -- display: ; hatspha fadya fe7alt enak ardt tezhr el 3amod
  // 2 : white-space: nowrap;  fe 7alt enak ardt en el text maylfsh ta7t ba3do  -- white-space: wrap; fe 7alt enak ardt en el tezt ylf
  // 3 : width: auto;  fe 7alt enak ardt en ykon 3ard el 3amod 3ala ad el mo7tawa -- width: 100%; fe 7alt enak ardt en el 3amod ya5od ba2y el mesa7a el fadla
  // 4 : text-align: center / left / right / justify   da 3ashan tet7km fe el text ymen wala shemal wala fe ele nos

  //* Prepare GLOBAL variables Befor sum functions
  // total_column1.value = 0
  // total_column2.value = 0
  // إعداد رأس الجدول
  let tableHTML = `<table id="companies_table" class="review_table">
        <thead>
          <tr style="height: 3.7rem;">
            <th style="display: none;">الكود</th>
            <th style="width: 100%;" class="ps_05"> اسم الشركه </th>
            <th style="width: auto;"></th>

          </tr>
        </thead>
        <tbody>`;
  // إضافة صفوف الجدول بناءً على البيانات
  // slice_Array1 = ""; // تفريغ المصفوفه
  slice_Array1.forEach(row => {
    tableHTML += `<tr style="height: 3.7rem;">
            <td style="display: none;">${row.company_id}</td>
            <td style="width: 100%;" class="ps_05">${row.company_name}</td>
            <td style="width: auto;"><button class="btn_save" onclick="company_login_btn(this)">دخول</button></td>
          </tr>`;
  });
  tableHTML += `</tbody>
        <tfoot>
            <tr class="table_totals_row" style="height: 3.7rem;">
                <td id="tfooter1" colspan="3" class="ps_05"></td>
            </tr>
                        <tr id="table_fotter_buttons_row" style="height: 3.7rem;">
                            <td colspan="3">   <!-- da awel 3amod fe ele sad tr han7othan5elh han3mel merge lkol el columns fe column wa7ed 3ashan n7ot el 2 buttons hat3mel colspan le3add el 3awamed kolaha -->
                                <div class="flex_H">
                                 <button class="table_footer_show_data"  id="" onclick="ShowAllDataIneffectsTable()">All</button>
                                 <button class="table_footer_show_data"  id="" onclick="showFirst50RowIneffectsTable()">50</button>
                                </div>
                            </td>
                        </tr>
                    </tfoot>`;
  // إغلاق الجدول
  tableHTML += '</table>';
  // تحديث محتوى الصفحة بناءً على البيانات
  tableContainer.innerHTML = await tableHTML;
  document.getElementById("tfooter1").textContent = slice_Array1.length; // عدد الصفوف
  // document.getElementById("tfooter7").textContent = total_column1.value;
  // document.getElementById("tfooter8").textContent = total_column2.value;

  if (array1.length > 0 && array1.length <= 50) {
    document.querySelector('#table_fotter_buttons_row').style.display = "none";
  } else if (array1.length < 1) {
    document.querySelector('#table_fotter_buttons_row').innerHTML = `<td colspan='7' class="td_no_result">لا نتائج</td>`;
  };

  page_content.style.display = `flex`
};

async function performSearch() {
  // الحصول على قيمة البحث
  const searchValue = searchInput.value.trim().toLowerCase();
  // فلترة البيانات بناءً على قيمة البحث
  array1 = data.filter(row => {
    const company_name = row.company_name && row.company_name.toString().toLowerCase().includes(searchValue);
    // const vendore_name = row.vendore_name && row.vendore_name.toString().toLowerCase().includes(searchValue);
    // const total_wazn = row.total_wazn && row.total_wazn.toString().toLowerCase().includes(searchValue);
    // const total_amount = row.sales_amount && row.total_amount.toString().toLowerCase().includes(searchValue);
    return company_name; // || vendore_name || total_wazn || total_amount;
  });

  slice_Array1 = array1.slice(0, 50);

  await filleffectstable();

}


async function ShowAllDataIneffectsTable() {
  showAlert('info', 'ان ظهار كامل البيانات فى القائمة المنسدله لا يؤثر على عمليه البحث فى البيانات')
  slice_Array1 = array1.slice(); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  await filleffectstable()
}

async function showFirst50RowIneffectsTable() {
  slice_Array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  await filleffectstable()

}


// عند الضغط على زر البحث
searchBtn.addEventListener('click', performSearch);

// حدث عن الضغط على زر المسح الخاص ب الانبوت سيرش الى بيظهر لما بنكتب بيانات
searchInput.addEventListener('search', function () {
  performSearch();
});

// عند الضغط على زرار انتر وانت واقف فى مربع البحث
searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    performSearch();
  };
});

async function company_login_btn(enter_button) {
  try {


    const c_id = parseInt(enter_button.closest("tr").cells[0].textContent);


    showLoadingIcon(enter_button);

    const data = await fetchData_postAndGet(
      "/company_login",
      { c_id },
      'pass', 'pass',
      20,
      false,
      '',
      false,
      false,'',
      false,'',
      'حدث خطأ اثناء الدخول الى العمل التجارى المحدد'
    )

    const dataLength = data.length
    if (!dataLength) {
      hideLoadingIcon(enter_button);
      showAlert('fail', 'حدث خطأ اثناء معالجه البيانات برجاء التواصل مع الدعم الفنى')
      return
    }


   // sessionStorage.setItem('forbidden_deletion_array', JSON.stringify([1,2,3,4,5,6,7,8,8,10,11,12,13,14,15,16,17,8,19,20,21,22,23]));





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

// Save company_id and company_name
sessionStorage.setItem("company_id", data[0].company_id); 
sessionStorage.setItem("company_name", data[0].company_name); 

// Save all permissions dynamically
permissions.forEach(permission => {
  sessionStorage.setItem(permission, data[0][permission]);
});


    hideLoadingIcon(enter_button)
    window.location.href = '/home_ar';
  } catch (error) {
    hideLoadingIcon(enter_button);
    catch_error(error)
  }
}

//#endregion


//#region dialogs

//#region 1:- Add new Company


// let dialogNewCompany = false; // متغير عالمي

function showDialog_new_company() {
  return new Promise((resolve) => {
    dialogNewCompany = false;

    const dialogHTML = `
        <div id="dialogOverlay_input" class = "dialogOverlay" >
            <div id="dialog" class="dialog">
              <div class="dialog_header">

              </div>
            <div id="dialog_body_button_div1" class="row x_center y_center mb_10 wrap" style="gap: 1rem;">
                <button id="btn_new_company" class="btn_new">شركه جديده</button>
                <button id="btn_restore_company" class="btn_new">استعادة شركه من النسخ الاحتياطى</button>
            </div>
           
            <div class="dialog_body">

                <div id="new_company_div" class="column x_start y_start w_full" style="display: none;">
                <h2 class="h2">
                <i class="fa-solid fa-arrow-right back_icon" onclick="
                  document.querySelector('#new_company_div').style.display = 'none'
                  document.querySelector('#yesButton').style.display = 'none'
                  document.querySelector('#dialog_body_button_div1').style.display = 'flex'
                "></i>

              إنشاء عمل تجارى جديد
              </h2>
                    <label for="company_name_input" class="lbl_sm">اسم العمل التجارى الجديده</label>
                    <input type="search" id="company_name_input" class="input_text_md hover w_full" oninput="check_parse(this, 'string')" autocomplete="off">
                </div>
            </div>
              <div id="dialog_footer" class="dialog_footer">
                <button id="yesButton" class="btn_save" style="display: none;">حفظ</button>
                <button id="noButton" class="btn_cancel">إنهاء</button>
              </div>
            </div>
          </div>
        `;

    // إضافة العنصر إلى الـ DOM
    document.body.insertAdjacentHTML('beforeend', dialogHTML);
    const dialogOverlay_input = document.querySelector(`#dialogOverlay_input`)
    const yesButton = dialogOverlay_input.querySelector(`#yesButton`);
    const noButton = dialogOverlay_input.querySelector(`#noButton`);
    const dialog_body_button_div1 = dialogOverlay_input.querySelector(`#dialog_body_button_div1`);
    const btn_new_company = dialogOverlay_input.querySelector(`#btn_new_company`);
    const btn_restore_company = dialogOverlay_input.querySelector(`#btn_restore_company`);
    const new_company_div = dialogOverlay_input.querySelector(`#new_company_div`);
    const company_name_input = dialogOverlay_input.querySelector(`#company_name_input`);
    let company_name_hidden_input = document.querySelector(`#company_name_hidden_input`);


    //#region btn new company
    btn_new_company.onclick = async function () {
      try {
        if (!new_company_div) {
          return
        }
        if (new_company_div.style.display === 'none') {
          new_company_div.style.display = 'flex'
          yesButton.style.display = 'flex'
          dialog_body_button_div1.style.display = 'none'
        } else {
          new_company_div.style.display = 'none'
          dialog_body_button_div1.style.display = 'flex'
          yesButton.style.display = 'none'
        }
      } catch (error) {
        closeDialog()
        closeDialog_input();
        catch_error(error)
      }
    }
    //#endregion end btn new company


    //#region restore btn
    //! btn restore
    btn_restore_company.onclick = function () {
      try {
        closeDialog()
        closeDialog_input();
        showAlert('info', 'سيتم اضافه هذا الجزىء قريبا')
      } catch (error) {
        closeDialog()
        closeDialog_input();
        catch_error(error)
      }
    }
    //#endregion end restore btn


    //#region yes btn 
    yesButton.onclick = async function () {
      try {
        // dialogOverlay_input.style.pointerEvents = 'none';

        const company_name_input_value = company_name_input.value.trim();

        if (!company_name_input_value || company_name_input_value === "") {
          return;
        }
        company_name_hidden_input.value = company_name_input_value
        await showDialog('', 'هل تريد حغظ بيانات العمل التجارى الجديد ؟', '');
        if (!dialogAnswer) {
          return;
        }
    
        // if (yesButton.textContent === 'حفظ') {
        //   yesButton.textContent = 'تأكيد الحفظ'
        //   return;
        // }
        const posted_elements = {
          company_name_input_value
        }
        const controller = new AbortController();
        const signal = controller.signal;

        try {
          if (inputErrors) {
            closeDialog()
            showAlert('fail', 'رجاء أصلح حقول الإدخال التي تحتوي على أخطاء');
            return;
          }
          // تعيين حد زمني للطلب
          const timeout = setTimeout(() => {
            controller.abort(); // إلغاء الطلب
          }, 50 * 1000); 

          // إرسال الطلب إلى الخادم
          const response = await fetch("/api/add_new_company", {
            method: 'post',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(posted_elements),
            signal, // تمرير الإشارة لإلغاء الطلب
          });

          // إلغاء المهلة الزمنية إذا تمت الاستجابة في الوقت المناسب
          clearTimeout(timeout);

          if (response.ok) {
            closeDialog();
    
            const data = await response.json();
            if (data.success) {
              // yesButton.textContent === 'حفظ'
              // body_content.style.pointerEvents = 'none';
              redirection('companies_ar', 'success', data.message_ar);
            } else {
              if (data.xx && data.xx === true) {
                redirection('login','fail', data.message_ar)
              }else{
              yesButton.textContent === 'حفظ'
              body_content.style.pointerEvents = 'auto';
              showAlert('fail', data.message_ar);
              }
            }
          } else {
            body_content.style.pointerEvents = 'auto';
            closeDialog();
            showAlert('fail', `Request failed with status code: ${response.status}`);
          }
        } catch (error) {
          closeDialog();
          //   showAlert('fail', "");
          catch_error(error);
        }

      } catch (error) {
        closeDialog();
        catch_error(error)
      }
    };
    //#endregion end - yes btn

    //#region no btn
    noButton.onclick = function () {
      closeDialog()
      closeDialog_input();
    };
    //#endregion

    dialogOverlay_input.style.display = 'flex';
  });
}

add_new_bussnies.addEventListener('click', async function () {
  showDialog_new_company();
});

//#endregion end- add new company

//#region 2:-  Users

// dialogNewCompany = false; // متغير عالمي
let array2 = [];
let slice_Array2 = [];
function showDialog_users() {
  return new Promise((resolve) => {
    dialogNewCompany = false;

    if (document.querySelector(`#dialogOverlay_input`) !== null) {

    } else {
      // closeDialog()
    }
    const dialogHTML = `
    <div id="dialogOverlay_input" class="dialogOverlay">
    <div id="users_table_view" class="dialog" style="display: none"> </div>

    <div id="dialog5" class="dialog">

        <div class="dialog_header">
            <h3 id="dialogTitle"></h3>
        </div>
        <div id="dialog_body_button_div" class="row x_center y_center mb_10 wrap w_full" style="gap: 1rem;">
            <button id="btn_new_user" class="btn_new" onclick="new_user_fn(this)">مستخدم جديد</button>
            <button id="btn_update_current_user" class="btn_update" onclick="show_table_update_current_user()">تعديل مستخدم حالى</button>
        </div>

        <div class="dialog_body w_full scroll">
            <div id="new_user_dive" class="column x_start y_start w_full" style="display: none;"></div>
        </div>
        <div id="dialog_footer" class="dialog_footer">
        <button id="noButton" class="btn_cancel" onclick="noButton()">إنهاء</button>
        </div>
    </div>
</div>
        `;

    // إضافة العنصر إلى الـ DOM
    document.body.insertAdjacentHTML('beforeend', dialogHTML);

    const dialogOverlay_input = document.querySelector(`#dialogOverlay_input`)

    //#region  update user

    //#region yes button

    //#endregion

    // عرض النافذة
    dialogOverlay_input.style.display = 'flex';
  });
}
    //#region handel_select_user_main_per_select
  
    async function user_main_permission_select_fn(selectElement) {
      const value = parseInt(selectElement.value)
      if (value === 0) {
        companies_div.style.display = 'none'
      } else {
        companies_div.style.display = 'flex'
      }
    }

  //#endregion
async function show_table_update_current_user() {
  try {
    const btn_update_current_user = document.querySelector(`#btn_update_current_user`);
    showLoadingIcon(btn_update_current_user)
    await showFirst50RowAtTheBegening2();
    hideLoadingIcon(btn_update_current_user)
    // closeDialog();
    // showAlert('info', 'سيتم اضافه هذا الجزىء قريبا')
  } catch (error) {
    hideLoadingIcon(btn_update_current_user)
    closeDialog();
    catch_error(error)
  }
}

async function showFirst50RowAtTheBegening2() {
  await getUsersData_fn2();
  slice_Array2 = array2.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  filleffectstable2();
}

async function getUsersData_fn2() {
  const response = await fetch("/get_All_users_Data_companies");
  data = await response.json();

  // تحديث array1 بنتيجة الـ slice
  array2 = data.slice();
};


async function save_new_user() {
  try {

    // dialogOverlay_input.style.pointerEvents = 'none';
    const user_name_input = document.querySelector(`#user_name_input`).value.trim();
    if (!user_name_input || user_name_input === '') {
      showAlert('warning', 'رجاء ادخل اسم المستخدم')
      return;
    }

    

    const pass_input1 = document.querySelector(`#pass_input1`).value.trim();
    const pass_input2 = document.querySelector(`#pass_input2`).value.trim();

    if (!pass_input1 || !pass_input2) {
      showAlert('warning', 'رجاء التأكد من ادخال كلمة المرور بشكل صحيح')
      return
    }
    if (pass_input1 !== pass_input2) {
      showAlert('warning', 'كلمة المرور غير متطابقه')
      return
    }

    const user_fullName_input = document.querySelector(`#user_fullName_input`).value.trim();
    if (!user_fullName_input || user_fullName_input === '') {
      showAlert('warning', 'رجاء ادخل اسم المستخدم الذى يظهر فى التطبيق للاخرين  ')
      return;
    }

    let x = false
    const x1 = parseInt(document.querySelector(`#user_main_permission_select`).value)
    if (x1 === 0) {
      x = true
    } else {
      x = false
    }
    const buttons = document.querySelectorAll("#div1 button");
    let dataArray = [];
    if (buttons.length > 0) {
      buttons.forEach(function (button) {
        const companyData = JSON.parse(button.getAttribute('data-company'));
        dataArray.push(companyData);
      });
    }


    const controller = new AbortController();
    const signal = controller.signal;
    if (inputErrors) {
      showAlert('fail', 'رجاء أصلح حقول الإدخال التي تحتوي على أخطاء');
      return;
    }

    await showDialog('', 'هل تريد حغظ بيانات المستخدم الجديد ؟', '');
    if (!dialogAnswer) {
      return;
    }

    // تعيين حد زمني للطلب
    const timeout = setTimeout(() => {
      controller.abort(); // إلغاء الطلب
    }, 20 * 1000); // 10 ثواني

    const posted_elements = {
      user_name_input,
      pass_input1,
      user_fullName_input,
      x,
      dataArray
    }
    // إرسال الطلب إلى الخادم
    const response = await fetch("/api/save_new_user", {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(posted_elements),
      signal, // تمرير الإشارة لإلغاء الطلب
    });

    // إلغاء المهلة الزمنية إذا تمت الاستجابة في الوقت المناسب
    clearTimeout(timeout);

    if (response.ok) {
      const data = await response.json();
      closeDialog();

      if (data.success) {
        redirection('companies_ar', 'success', data.message_ar);
        body.style.pointerEvents = 'auto';
      } else {
        body.style.pointerEvents = 'auto';
        showAlert('fail', data.message_ar);
        body.style.pointerEvents = 'auto';
      }
    } else {
      body.style.pointerEvents = 'auto';
      closeDialog();
      showAlert('fail', `Request failed with status code: ${response.status}`);
    }


    dialogNewCompany = true;
    resolve(true);

  } catch (error) {
    body.style.pointerEvents = 'auto';
    hideLoadingIcon(this);
    closeDialog();
    closeDialog_input();
    if (error.name === 'AbortError') {
      showAlert('fail', 'Request timed out. Please try again.');
    }else{
      showAlert('fail', 'حدث خطأ اثناء معالجه البيانات وتم الغاء العمليه')
      catch_error(error)
    }
  }
};
    //#region noButton

    function noButton() {
      // dialogNewCompany = false;
      closeDialog_input();
      // resolve(false);
    };
    //#endregion noButton




async function filleffectstable2() {

  const dialogOverlay_input = document.querySelector('#dialogOverlay_input');
  const users_table_view = dialogOverlay_input.querySelector('#users_table_view');

  

  const htmlcode_table = `
    <h2 class="h2">
      <i class="fa-solid fa-arrow-right back_icon" onclick="
        document.querySelector('#users_table_view').style.display = 'none'
        document.querySelector('#dialog5').style.display = 'block'
      "></i>

      المستخدمين
    </h2>

    <div class="flex_row w_full">
      <div class="input_with_icon_div w_full">
        <input type="search" name="searchInput2" id="searchInput2" placeholder="search" class="search_input w_full hover" onkeydown="performSearch2_Oninput(event)" onsearch="performSearch2_Onsearch(this)">
        <i class="fa-light fa-magnifying-glass left_icon"></i>
      </div>
      <button id="searchBtn2" onclick="performSearch2()" class="btn_search hover">search</button>
    </div>

    <div id="tableContainer" class="tableContainer w_full" style="height: auto;"></div>
    
    <div class="dialog_footer">
      <button id="noButton2" class="btn_cancel" onclick="noButton()">إنهاء</button>
    </div>
  `;

  users_table_view.innerHTML = await htmlcode_table;

  //  @@ هاااااام جدا
  // el properties beta3 kol 3amod ytm wad3ha fe el <thead></thead> And <tbody></tbody> And <tfoor></tfoor> kol wa7ed lewa7do
  // el properties hya :
  // 1 : style="display: none;" > fe 7alt enak ardt e5fa2 el 3amod -- display: ; hatspha fadya fe7alt enak ardt tezhr el 3amod style="display: ;"
  // 2 : white-space: nowrap;  fe 7alt enak ardt en el text maylfsh ta7t ba3do  -- white-space: wrap; fe 7alt enak ardt en el tezt ylf
  // 3 : width: auto;  fe 7alt enak ardt en ykon 3ard el 3amod 3ala ad el mo7tawa -- width: 100%; fe 7alt enak ardt en el 3amod ya5od ba2y el mesa7a el fadla
  // 4 : text-align: center / left / right / justify   da 3ashan tet7km fe el text ymen wala shemal wala fe ele nos


  // إعداد رأس الجدول
  let tableHTML2 = `

<table id="users_table" class="review_table">
    <thead>
        <tr>
            <th></th>
            <th style="display: none;">ID</th>
            <th>اسم المستخدم</th>
        </tr>
    </thead>
    <tbody>`;

  // إضافة صفوف الجدول بناءً على البيانات
  // slice_Array2 = ""; // تفريغ المصفوفه
  slice_Array2.forEach((user) => {
    tableHTML2 += `<tr>
    <td style="width: auto;"> <button class="tabble_update_btn" onclick="table_update_btn_fn2(this)">تحرير</button> </td>
    <td style="display: none;">${user.id}</td> <!-- تم إخفاء العمود ID -->
    <td style="width: 100%;">${user.user_name}</td>
  </tr>`;
  });

  tableHTML2 += `</tbody>
<tfoot>
<tr class="table_totals_row";>
    <td id="tfooter1_2"></td>
    <td id="tfooter2_2" style="display: none;"></td>
    <td id="tfooter3_2"></td>
</tr>
<tr id="table_fotter_buttons_row2">
    <td colspan="3">
        <div class='flex_H'>
            <button class="table_footer_show_data" onclick="ShowAllDataIneffectsTable2()">All</button>
            <button class="table_footer_show_data" onclick="showFirst50RowIneffectsTable2()">50</button>
        </div>
    </td>
</tr>
</tfoot>

`;

  // إغلاق الجدول
  tableHTML2 += "</table>";
 
  const tableContainer = users_table_view.querySelector('#tableContainer');

  // تحديث محتوى الصفحة بناءً على البيانات
  tableContainer.innerHTML = tableHTML2;
  dialog5.style.display = 'none';
  users_table_view.style.display = 'block';
  //  عمليات صف الاجمالى
  // جمع القيم في العمود رقم 6

  // document.getElementById("tFooter6").textContent = totalColumn_Valuu;
  document.getElementById("tfooter1_2").textContent = slice_Array2.length; //  عدد الصفوف


  // اظهار الازرار فى الاسفل او اخفاءها حسب حجم البيانات
  if (array2.length > 0 && array2.length <= 50) {
    document.querySelector('#table_fotter_buttons_row2').style.display = "none";
  } else if (array2.length < 1) {
    document.querySelector('#table_fotter_buttons_row2').innerHTML = `<td colspan='3' class="td_no_result">لا نتائج</td>`;
  };
}

// search in effectsTable

async function performSearch2() {

  // الحصول على قيمة البحث
  const searchInput2 = document.querySelector("#searchInput2");
  const searchValue = searchInput2.value.trim().toLowerCase();

  // فلترة البيانات بناءً على قيمة البحث
  array2 = data.filter((user) => {
    // التحقق من أن user.id و user.name ليستان فارغتين
    // const idMatch = user.id && user.id.toString().toLowerCase().includes(searchValue);
    const nameMatch = user.user_name && user.user_name.toString().toLowerCase().includes(searchValue);
    // return idMatch || nameMatch;
    return nameMatch;
  });

  slice_Array2 = array2.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  filleffectstable2();
}
async function ShowAllDataIneffectsTable2() {
  showAlert('info', 'ان ظهار كامل البيانات فى القائمة المنسدله لا يؤثر على عمليه البحث فى البيانات')
  slice_Array2 = array2.slice(); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  filleffectstable2();
}
async function showFirst50RowIneffectsTable2() {
  slice_Array2 = array2.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  filleffectstable2();
}
async function performSearch2_Onsearch(input) {
  input.addEventListener("search", async (event) => {
    await performSearch2();
  });
}

async function performSearch2_Oninput(event){
    if (event.key === "Enter") {
      await performSearch2();
    }
}

let stop_user_status = false;
async function table_update_btn_fn2(updateBtn) {
  // عثر على الموظف باستخدام معرف الموظف
  try {

    const selectedUser = parseInt(updateBtn.closest("tr").cells[1].textContent);
    if (selectedUser) {
      // document.querySelector('#i_h2_header_new_user').textContent = "تعديل مستخدم"

      updateBtn.textContent = ""
      showLoadingIcon(updateBtn)
      const data = await fetchData_postAndGet(
        "get_info_for_updateUser",
        { selectedUser },
        'pass', 'pass',
        20,
        false, '',
        'حدث خطأ اثناء معاجله البيانات',
        false,
        false,'',
        false,'',
        'حدث خطأ اثناء الدخول الى العمل التجارى المحدد'
      )

    

    const htmlCode = `
    <h2 id="h2_new_user_table_update" class="h2">
      <i class="fa-solid fa-arrow-right back_icon" onclick="show_table_update_current_user()"></i>

    تعديل مستخدم :  ${data.user_info[0].user_full_name} 
    </h2>
    <p id="p_stop_user_text" style="color: red; text-align: start; margin-block-end: 1rem; display:none">* هذا المستخدم تم ايقافه</p>
<label for="user_name_input" class="lbl_sm">اسم المستخدم ( المستخدم فى الدخول )</label>
<input type="search" id="user_name_input" class="input_text_md w_full hover"
    oninput="check_parse(this, 'string')" autocomplete="off">


<!-- pass div -->

 <div class="row" style="gap: 1rem;">
  <button 
    id="btn_change_pass" 
    class="btn_new"
    onclick="btn_change_pass_fn()">
    تعيين كلمة مرور جديده
  </button>
  <button id="btn_stop_user" class="btn_cancel" onclick="btn_stop_user_fn(this)">ايقاف المستخدم</button>
  </div>
<!-- passwords -->
<div id="pass_div" class="flex-column w_full" style="flex-wrap: nowrap; display:none;">

    <label for="pass_input1" class="lbl_sm">كلمة المرور الجديده</label>
    <!-- pass div -->
    <div class="flex_row w_full">
        <div class="input_with_icon_div w_full">
            <input type="password" name="" id="pass_input1" oninput="check_parse(this, 'string')"
                placeholder="ادخل كلمه المرور" class="pass_input hover w_full" autocomplete="on">
            <i class="fa-solid fa-key left_icon"></i>
        </div>
        <button id="show_pass_btn1" class="btn_eye hover"
            onmousedown="showPassword('pass_input1', 'eye_icon1')"
            onmouseup="hidePassword('pass_input1', 'eye_icon1')"
            ontouchstart="showPassword('pass_input1', 'eye_icon1')"
            ontouchend="hidePassword('pass_input1', 'eye_icon1')"><i id="eye_icon1"
                class="fa-regular fa-eye eye_icon"></i>
        </button>
    </div>

    <!-- pass div -->
    <div class="flex_row w_full">
        <div class="input_with_icon_div w_full">
            <input type="password" name="" id="pass_input2" oninput="check_parse(this, 'string')"
                placeholder="تأكيد كلمه المرور" class="pass_input w_full hover" autocomplete="on">
            <i class="fa-solid fa-key left_icon"></i>
        </div>
        <button id="show_pass_btn2" class="btn_eye hover"
            onmousedown="showPassword('pass_input2', 'eye_icon2')"
            onmouseup="hidePassword('pass_input2', 'eye_icon2')"
            ontouchstart="showPassword('pass_input2', 'eye_icon2')"
            ontouchend="hidePassword('pass_input2', 'eye_icon2')"><i id="eye_icon2"
                class="fa-regular fa-eye eye_icon"></i>
        </button>
    </div>
</div>

<label for="user_fullName_input" class="lbl_sm">اسم المستخدم بالكامل</label>
<input type="search" id="user_fullName_input" class="input_text_md w_full hover"
    oninput="check_parse(this, 'string')" title="الاسم الذى يظهر على الشاشه للاخرين"
    autocomplete="off">


<!-- الصلاحيات -->

<label for="general_permission_select" class="lbl_sm">صلاحيات عامه</label>
<select class="permission_select hover mb_10" id="user_main_permission_select" onchange="user_main_permission_select_fn(this)">
    <option value="0" selected>صلاحيات المالك</option>
    <option value="1">صلاحيات مقيده</option>
</select>

<!-- الشركات -->
<div id="companies_div" class="column x_start y_start w_full" style="display: none">
    <label for="div1" class="lbl_sm">شركات منضمه</label>
    <div id="div1" class="tags_div hover scroll">
        <!-- Buttons in div1 -->

    </div>

    <label for="div2" class="lbl_sm">شركات غير منضمه</label>
    <div id="div2" class="tags_div hover scroll">
        <!-- Buttons in div2 -->

    </div>

</div>
    `
    const new_user_dive = document.querySelector(`#dialogOverlay_input`).querySelector(`#new_user_dive`)
    new_user_dive.innerHTML= htmlCode


    const footer = `
    <button id="updateButton" class="btn_update" onclick="update_user_information(this)">تحديث</button>
   
    <button id="btn_delete_user" class="btn_cancel" onclick="delete_user_fn(this)">حذف المستخدم</button>
    <button id="noButton" class="btn_cancel" onclick="noButton()">إنهاء</button>
    `

    document.querySelector(`#dialogOverlay_input`).querySelector(`#dialog_footer`).innerHTML= footer;

    const dialogOverlay_input = document.querySelector(`#dialogOverlay_input`)
      const p_stop_user_text = dialogOverlay_input.querySelector(`#p_stop_user_text`)
      const btn_stop_user = dialogOverlay_input.querySelector(`#btn_stop_user`);
      const is_stop = data.user_info[0].is_stop;
      
      
      if (is_stop && is_stop === true) {
        p_stop_user_text.style.display = 'block';
        btn_stop_user.classList.remove('btn_update');
        btn_stop_user.classList.add('btn_save');
        btn_stop_user.textContent = 'الغاء ايقاف المستخدم';
        stop_user_status = true;
      }else{
        p_stop_user_text.style.display = 'none';
        btn_stop_user.classList.remove('btn_save');
        btn_stop_user.classList.add('btn_update');
        btn_stop_user.textContent = 'ايقاف المستخدم';
        stop_user_status = false;
      }


      const user_name = data.user_info[0].user_name;
      const user_name_input = dialogOverlay_input.querySelector(`#user_name_input`);
      if (user_name){
        user_name_input.value = user_name
      }

      const user_full_name = data.user_info[0].user_full_name;
      const user_fullName_input = dialogOverlay_input.querySelector(`#user_fullName_input`);
      if (user_full_name){
        user_fullName_input.value = user_full_name
      }
      
      const companies_div = document.querySelector(`#dialogOverlay_input`).querySelector(`#companies_div`);
    
      if (data.is_user_owner === true){
        changeSelect('user_main_permission_select', 0);
        companies_div.style.display = 'none';
      }else{
        changeSelect('user_main_permission_select', 1);
        companies_div.style.display = 'flex'
      }


      div1.innerHTML = "";
      data.included_companies.forEach(function (item) {
        const buttonHTML = `<button onclick="moveButton(this)" data-company='{"N1": ${item.n1}, "N2": "${item.n2}"}'>${item.n2}</button>`;
        div1.innerHTML += buttonHTML;
      });

      div2.innerHTML = "";
      data.not_included_companies.forEach(function (item) {
        const buttonHTML = `<button onclick="moveButton(this)" data-company='{"N1": ${item.n1}, "N2": "${item.n2}"}'>${item.n2}</button>`;
        div2.innerHTML += buttonHTML;
      });
  
      // hideLoadingIcon(this);

      const dialog_body_button_div = dialogOverlay_input.querySelector(`#dialog_body_button_div`)
      const dialog5 = document.querySelector(`#dialog5`);
      const users_table_view = document.querySelector(`#users_table_view`);
 
      dialog_body_button_div.style.display = 'none'
      dialog5.style.display = "block"
      users_table_view.style.display = 'none'
      new_user_dive.style.display = 'flex'

      sessionStorage.setItem('selectedUser',selectedUser);




      updateBtn.textContent = "تحرير"
      hideLoadingIcon(updateBtn)
    } else {
      return;
    };
  } catch (error) {
    updateBtn.textContent = "تحرير"
    hideLoadingIcon(updateBtn)
    catch_error(error)
  }
};

let is_chang_pass = false
function btn_change_pass_fn(){

  const pass_div = document.querySelector('#pass_div');
  // التحقق مما إذا كان العنصر مخفيًا أم لا
  if (pass_div.style.display === 'none') {
    // إذا كان مخفيًا، قم بإظهاره
    pass_div.style.display = 'block';
    is_chang_pass = true;
  } else {
    // إذا كان ظاهرًا، قم بإخفائه
    pass_div.style.display = 'none';
    is_chang_pass = false;
  }
}



function btn_stop_user_fn(btn) {
  if (stop_user_status === false) {
    btn.classList.remove('btn_cancel');
    btn.classList.add('btn_save');
    btn.textContent = 'الغاء ايقاف المستخدم';
    stop_user_status = true;
  } else {
    btn.classList.remove('btn_save');
    btn.classList.add('btn_cancel');
    btn.textContent = 'ايقاف المستخدم';
    stop_user_status = false;
  }
}


async function update_user_information(btn){
  try {
   
    //! variables
    const dialogOverlay_input = document.querySelector(`#dialogOverlay_input`);
    const selectedUser = parseInt(sessionStorage.getItem('selectedUser'));
    
    if (!selectedUser || isNaN(selectedUser)){
      await redirection('companies_ar','fail','حدث خطأ اثناء معالجه البيانات ')
      return;
    }
    

     //! Authentication
    // dialogOverlay_input.style.pointerEvents = 'none';
    const user_name_input = document.querySelector(`#user_name_input`).value.trim();
    if (!user_name_input || user_name_input === '') {
      showAlert('warning', 'رجاء ادخل اسم المستخدم')
      return;
    }

 
    let pass_input1
    let pass_input2
    if( is_chang_pass === true){

     
      pass_input1 = document.querySelector(`#pass_input1`).value.trim();
      pass_input2 = document.querySelector(`#pass_input2`).value.trim();
  
      if (!pass_input1 || !pass_input2) {
        showAlert('warning', 'رجاء التأكد من ادخال كلمات المرور بشكل صحيح')
        return
      }
      if (pass_input1 !== pass_input2) {
        showAlert('warning', 'كلمة المرور القديمة غير متطابقه')
        return
      }
    }

    const user_fullName_input = document.querySelector(`#user_fullName_input`).value.trim();
    if (!user_fullName_input || user_fullName_input === '') {
      showAlert('warning', 'رجاء ادخل اسم المستخدم الذى يظهر فى البرنامج للاخرين  ')
      return;
    }

    let x = false
    const x1 = parseInt(document.querySelector(`#user_main_permission_select`).value)
    if (x1 === 0) {
      x = true
    } else {
      x = false
    }
    const buttons = document.querySelectorAll("#div1 button");
    let dataArray = [];
    if (buttons.length > 0) {
      buttons.forEach(function (button) {
        const companyData = JSON.parse(button.getAttribute('data-company'));
        dataArray.push(companyData);
      });
    }
   

    //!fetching
    const controller = new AbortController();
    const signal = controller.signal;
    if (inputErrors) {
      showAlert('fail', 'رجاء أصلح حقول الإدخال التي تحتوي على أخطاء');
      return;
    }

    if (delete_user && delete_user === true){
      await showDialog('', 'هل تريد حذف بيانات المستخدم ؟', '');
      if (!dialogAnswer) {
        return;
      }
    }else{
      await showDialog('', 'هل تريد تعديل بيانات المستخدم ؟', '');
      if (!dialogAnswer) {
        return;
      }
    }


        // تعيين حد زمني للطلب
        const timeout = setTimeout(() => {
          controller.abort(); // إلغاء الطلب
        }, 20 * 1000); // 10 ثواني
    
        const posted_elements = {
          selectedUser,
          stop_user_status,
          user_name_input,
          is_chang_pass,
          pass_input1,
          user_fullName_input,
          x,
          dataArray,
          delete_user
        }

            // إرسال الطلب إلى الخادم
    const response = await fetch("/api/update_user_with_companies", {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(posted_elements),
      signal, // تمرير الإشارة لإلغاء الطلب
    });


    clearTimeout(timeout);

    if (response.ok) {
      const data = await response.json();
      closeDialog();

      if (data.success) {
        redirection('companies_ar', 'success', data.message_ar);
        body.style.pointerEvents = 'auto';
      } else {
        if(data.xx){
          redirection('login', 'fail', 'تم تجميد جميع الحسابات نظرا لمحازلة التلاعب بالاكواد البرمجيه الخاصه بالتطبيق : رجاء التواصل مع الاداره');
        }else{
        body.style.pointerEvents = 'auto';
        showAlert('fail', data.message_ar);
        body.style.pointerEvents = 'auto';
        }
      }
    } else {
      body.style.pointerEvents = 'auto';
      closeDialog();
      showAlert('fail', `Request failed with status code: ${response.status}`);
    }

    // dialogNewCompany = true;
    // resolve(true);

  } catch (error) {
    body.style.pointerEvents = 'auto';
    hideLoadingIcon(btn);
    closeDialog();
    closeDialog_input();
    if (error.name === 'AbortError') {
      showAlert('fail', 'Request timed out. Please try again.');
    }else{
      showAlert('fail', 'حدث خطأ اثناء معالجه البيانات وتم الغاء العمليه')
      catch_error(error)
    }
  }
}
let delete_user = false
async function delete_user_fn(btn){
  delete_user = true
  await update_user_information(btn)
  delete_user = false
}

function moveButton(button) {
  // تحديد الـ div الأصلي
  var originDiv = button.parentNode;

  // تحديد الـ div الهدف
  var targetDiv = (originDiv.id === 'div1') ? document.getElementById('div2') : document.getElementById('div1');

  // نسخ الزر
  var clonedButton = button.cloneNode(true);

  // حذف الزر من الـ div الأصلي
  button.parentNode.removeChild(button);

  // إضافة الزر المنسوخ إلى الـ div المستهدف
  targetDiv.appendChild(clonedButton);
}

users_btn.addEventListener('click', async function () {
  showDialog_users();
});

//#endregion end show dialog USERS

//#endregion




//#region showReason of redirection
//! الكود دا خاص بملف ال روووتس  هو الى من خلاله بجيب القيم بتاع  سويتش كيس


document.addEventListener('DOMContentLoaded', async function () {
  // استدعاء الدالة عندما تكتمل تحميل الصفحة
  await showFirst50RowAtTheBegening();
});

//#endregion End - showReason of redirection