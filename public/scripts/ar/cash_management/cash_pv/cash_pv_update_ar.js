setActiveSidebar('cashMain_view_ar');
pagePermission("update", "cash_transaction_permission");


const cash_pv_update_data = JSON.parse(sessionStorage.getItem('cash_pv_update_data'));
// sessionStorage.removeItem(`purshases_invoice_update_data`)

if (!cash_pv_update_data){
    redirection("cash_transaction_view_ar","fail","حدث خطأ اثناء معالجة البيانات سيتم تحويل الى صفحه  القيود المقبوضات الرئيسية")
}

const obj_cash_pv_update = {pageName : 'cash_pv_update_ar'}

const encodedData = encodeURIComponent(JSON.stringify(obj_cash_pv_update));
back_href.href = `cash_pv_view_ar?data=${encodedData}`


const date1 = document.querySelector('#date1');
const note_inpute = document.querySelector('#note_inpute');
const btn_update = document.querySelector('#btn_update');
const btn_delete = document.querySelector('#btn_delete');
const btn_newRow = document.querySelector(`#btn_newRow`);
const table = document.querySelector(`#myTable`);
let tableBody = table.querySelector(`tbody`);
let tableTfoot = table.querySelector(`tfoot`);


// date1.value = today

btn_update.onclick = async function () {
try {
  
  const x = data_accounts.headerData.id
  const datex = date1.value;
    
  const total = parseFloat(document.querySelector(`#myTable #totalValue`).textContent)
  const main_account = document.querySelector(`#dropdown_div1_hidden_input`).value
  const general_note = note_inpute.value

  //preparing bread_body Data
  const tableRows = document.querySelectorAll('#myTable > tbody > tr');

  const posted_array = []; // انشاء مصفوفه جديده اضع فيها بيانات كل صف
  if (tableRows.length > 0) { // التأكد من وجود بيانات داخل المصفوفه اولا

    let index = 1
    for (const row of tableRows) {
      const account_typeId = parseInt(row.querySelector('.td_account_type .account_type').value);
      const account_id = parseInt(row.querySelector('.td_account .id_hidden_input').value);
      
      if (isNaN(account_id)) {
        showAlert(`warning`, `برجاء اختيار الحساب بشكل صحيح فى السطر رقم ${index}`)
        return;
      }

      const note_row = row.querySelector(`.td_row_note`).textContent; // الوصول لمحتوى الخليه فى العاممود رقم 3 داخل الصف
      const value = parseFloat(row.querySelector(`.td_value`).textContent || 0); // لو ملقاش قيمه يعتبرها صفر
      if (value <= 0) {
        showAlert(`warning`, `برجاء ادخال القيمه بشكل صحيح فى السطر رقم ${index}`);
        return;
      }
      // انشاء اوبجيكت لوضع بيانات الخلايا فيه  ثم اضافة الاوبجيكت الى عناصر المصفوفه الفارغه
      const rowData = {
        x : x,
        account_typeId :account_typeId,
        account_id: account_id,
        note_row: note_row,
        value: value
      };
      posted_array.push(rowData); // اضافة الاوبجيكت الى عناصر المصفوفه
      index++;
    }

      const post = await new_fetchData_postAndGet(
        "/api/cash_pv_update",
        {x, main_account, total, datex, general_note, posted_array},
        'cash_transaction_permission', 'update',
        15,
        true,"هل تريد تعديل بيانات سند الدفع ؟",
        true,
        false,false,
        true,cash_pv_update_data,'cash_pv_view_ar',
        false,false,
        false,false,
         "An error occurred (Code: TAA2). Please check your internet connection and try again; if the issue persists, contact the administrators."
      
      )

  } else {
    showAlert('fail', 'لا توجد بيانات')
    return
  }
} catch (error) {
  catch_error(error)
}
}


async function deleteX() {

  const datex = date1.value;
  const x = cash_pv_update_data.x

      const post = await new_fetchData_postAndGet(
        "/api/cash_pv_delete",
        {x, datex},
        'cash_transaction_permission', 'delete',
        15,
        true,"هل تريد حذف بيانات سند الدفع ؟",
        true,
        false,false,
        true,cash_pv_update_data,"cash_pv_view_ar",
        true,"cash_pv_view_ar",
        false,false,
         "An error occurred (Code: TAA2). Please check your internet connection and try again; if the issue persists, contact the administrators."
      )
    
}

btn_delete.onclick = async function () {
  await deleteX()
}

function showHeaderData(){
    const th = data_accounts.headerData
    date1.value = th.datex
    reference_input.value = th.referenceconcat;
    note_inpute.value = th.general_note;

    create_drop_down_with_External_DataArray(`dropdown_div1`,data_accounts.cash_accounts);  selectedRow_dropdownDiv(`dropdown_div1`,data_accounts.cash_accounts,+data_accounts.headerData.account_id);

}


let data = [];
let array1 = [];
let slice_Array1 = [];


async function getTransactionData_fn() {
  
  const x =  cash_pv_update_data.x

  r = await new_fetchData_postAndGet(
    "/getCash_pv_AccountsData2",
    {x},
    'cash_transaction_permission','view',
    15,
    false,"",
    true,
    true,content_space,
    false,false,false,
    false,false,
    true,"cash_pv_view_ar",
    "حدث خطأ اثناء معالجة البيانات"
  )
  return r
  };
  

   function fillBodyTable() {
    try {

    //  @@ هاااااام جدا
    // el properties beta3 kol 3amod ytm wad3ha fe el <thead></thead> And <tbody></tbody> And <tfoor></tfoor> kol wa7ed lewa7do
    // el properties hya :
    // 1 : style="display: none;" > fe 7alt enak ardt e5fa2 el 3amod -- display: ; hatspha fadya fe7alt enak ardt tezhr el 3amod style="display: ;"
    // 2 : white-space: nowrap;  fe 7alt enak ardt en el text maylfsh ta7t ba3do  -- white-space: wrap; fe 7alt enak ardt en el tezt ylf
    // 3 : width: auto;  fe 7alt enak ardt en ykon 3ard el 3amod 3ala ad el mo7tawa -- width: 100%; fe 7alt enak ardt en el 3amod ya5od ba2y el mesa7a el fadla
    // 4 : text-align: center / left / right / justify   da 3ashan tet7km fe el text ymen wala shemal wala fe ele nos
  
    // إعداد رأس الجدول
    tableBody.innerHTML = ""; // تأكد من تفريغ محتوى tbody قبل إضافة الصفوف

    

    // إضافة صفوف الجدول بناءً على البيانات
    // slice_Array1 = ""; // تفريغ المصفوفه
    
    data_accounts.bodyData.forEach((row) => {
      
      const newTr =
       `
        <tr class="mainTr">
                          <td style="width: auto;" class="td_drag_handle notViewTd">
                    <div class="dragbutton_table">
                      <button class="drag-handle">
                        <i class="fa-solid fa-arrows-up-down" style=" pointer-events: none;"></i>
                      </button>
                    </div>
                  </td>
                  <td class="span_Total_In_Table rowCount td-account_type" style="min-width:fit-content"></td>

                    <td class="td_account_type">
                      <select name="" id="" class="account_type select h_full" onchange="change_select_account_type(this)">${get_accounts_type_array}</select>
                    </td>

                  <!-- dropdown -->
                  <td style="width: auto; height: var(--input_height);" class="td_account">
                    <div class="dropdown_container_input_table" id="">
                      <div class="row h_full">
                        <span class="span_start account_type_name T">حساب عام</span>

                        <div class="dropdown_select_input_table" id=""  onclick="fill_filtered_data_accounts_Array(event)"  style="min-width: 10rem;">
                          <div id="" class="dropdown_select_input T hover"></div>
                          <i class="fa-solid fa-caret-down left_icon"></i>
                          <i class="fa-solid fa-xmark clear_icon" style="display: none;" onclick="clear_icon_on_table_td(event)"></i>
                          <input type="hidden" class="id_hidden_input x1 T" id="" readonly>
                        </div>
                    </div>
                      <div class="dropdown_menue hover scroll" id="" style="display: none;">
                        <div class="dropdown_search">
                          <input type="search" class="dropdown_search_input hover" id="" placeholder="ابحث هنا..."
                            oninput="tableDropdownList_performSearch(this)" autocomplete="off">
                        </div>
                        <div class="inputTable_dropdown_tableContainer" id="">
                          <!-- قائمة الخيارات تظهر هنا -->
                        </div>
                      </div>
                    </div>
                  </td>
  



                  <td style="width: 100%;" class="inputTable_noteTd td_row_note hover" contenteditable="true" onkeydown="td_EnterkeypressEvent1(event)"></td>
                  <td style="width: auto;" class="inputTable_NumberTd td_value sum hover" contenteditable="true" oninput="handle_input_event(this)" onkeydown="td_EnterkeypressEvent1(event)"></td>
    
                  <td style="width: auto;" class="td_lastTd notViewTd">
                    <div class="table_buttons_div">
                      <button onclick="deleteRow(this)" title="حذف الصف"><i class="fa-solid fa-xmark"></i></button>
                      <button onclick="copyRow(this)" title="نسخ الصف"><i class="fa-regular fa-copy"></i></button>
                    </div>
                  </td>
        </tr>`;

        tableBody.insertAdjacentHTML('beforeend', newTr);
        const tr = tableBody.querySelector(`tr:last-child`)
        handleCurrentTr(row,tr)
    });
  
  
    reset_rowcount_in_table(`myTable`)
    updateFooter()       
  } catch (error) {
    catch_error(error)
  } 
  }
  
  function handleCurrentTr(row,tr){
          
        tr.querySelector(`.td_account_type .account_type`).value = row.account_type_id;
        tr.querySelector(`.td_account .id_hidden_input`).value = row.account_id;
        tr.querySelector(`.td_account .dropdown_select_input`).textContent = row.account_name;
        tr.querySelector(`.td_row_note`).textContent = row.row_note ? row.row_note : "";
        tr.querySelector(`.td_value`).textContent = row.value ? row.value : "";
        

    const span = tr.querySelector(`.td_account .account_type_name`);

    const val = parseInt(tr.querySelector(`.td_account_type .account_type`).value)
    if (val === 1) {
      span.textContent = "حساب عام"
    } else if (val === 2) {
      span.textContent = "عميل"
    } else if (val === 3) {
      span.textContent = "مورد"
    } else if (val === 4) {
      span.textContent = "موظف"
    } else if (val === 10) {
      span.textContent = "حسابات رأس المال"
    }
  }


//!----------------------------------------------------------------------------





document.addEventListener('DOMContentLoaded', async function () {
try {
  showLoadingIcon(content_space)
  
  await get_accounts_type()
  data_accounts = await getTransactionData_fn()
  showHeaderData()
  build_table()
  fillBodyTable()

  viewMode(true,'cash_transaction_permission','view')
  handle_fn_options()
  makeTableRowsDraggable('myTable'); // make sure that the table already loaded
  hideLoadingIcon(content_space)         
} catch (error) {
    hideLoadingIcon(content_space)
    catch_error(error)
}
})


function handle_fn_options(){  
  const newDivs = `
    <div id="fn_option_update_btn" onclick="viewMode(false,'cash_transaction_permission','update')">وضع التعديل</div>
    <div id="fn_option_view_btn" onclick="viewMode(true,'cash_transaction_permission','view')" style="display: none;">وضع العرض</div>
  `;
  fn_options_div.insertAdjacentHTML('afterbegin', newDivs);
}
