setActiveSidebar('bread_view_ar');
pagePermission("transaction_permission", "add");


const date1 = document.querySelector('#date1');
const btn_update = document.querySelector('#btn_update');
const btn_delete = document.querySelector('#btn_delete');
const note_inpute = document.querySelector(`#note_inpute`);
const btn_newRow = document.querySelector(`#btn_newRow`);
const table = document.querySelector(`#myTable`);
let tableBody = table.querySelector(`tbody`);
let tableTfoot = table.querySelector(`tfoot`);


date1.value = today


let transaction_update_data = {}
let is_coming_from_transaction_view = false
let urlData = getURLData('data','transaction_view_ar','رابط غير صالح : سيتم اعادة توجيهك الى صفحة القيود اليومية')
let transaction_data = urlData.transaction_update_data
function CheckUrlParams (){
  try {
      if (transaction_data && transaction_data !== 'noParams'){
        transaction_update_data = {pageName : 'transaction_update_ar',}
            const encodedData = encodeURIComponent(JSON.stringify(transaction_update_data));
            back_href.href = `transaction_view_ar?data=${encodedData}`
            is_coming_from_transaction_view = true
            return true
      }else if(transaction_data && transaction_data === 'noParams'){
            return true
      }else{
          return false
      }
              
  } catch (error) {
      catch_error(error)
      return false
  }
}





function showData(){
    date1.value = transaction_data.datex
    reference_input.value = transaction_data.referenceCONCAT;
    note_inpute.value = transaction_data.note;


    getTransactionData_fn()
}


let data = [];
let array1 = [];
let slice_Array1 = [];


async function getTransactionData_fn() {

  const x =  transaction_data.x


  data = await new_fetchData_postAndGet(
    "/get_transaction_Data",
    {x},
    'transaction_permission','update',
    15,
    false,"",
    true,
    true,content_space,
    false,false,false,
    false,false,
    true,"transaction_view_ar",
    "حدث خطأ اثناء معالجة البيانات"
  )

  filleffectstable()    
  };
  

   function filleffectstable() {
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
    data.forEach((row) => {
    //!____________________________________________________________
      const data_account_row = data_accounts.find(item => +item.id === +row.account_id);
      if (data_account_row) {
        account_name = data_account_row.account_name
      } else {
          throw new Error(`an error occurred code: Ftuft1`);
      }
    //!____________________________________________________________

    
      
      const newTr =
       `
        <tr>
          <td style="width: auto;" class="">
            <div class="dragbutton_table">
                <button class="drag-handle">
                  <i class="fa-solid fa-arrows-up-down" style=" pointer-events: none;"></i>
              </button>
            </div>
          </td>

          <td>
            <select name="" id="" class="account_type select h_full" onchange="change_select_account_type(this)">${get_accounts_type_array}</select>
          </td>         

          <!-- dropdown -->
          <td style="width: auto; height: var(--input_height);">
            <div class="dropdown_container_input_table" id="">
              <div class="row h_full">
                <span class="input_span_start account_type_name T">حساب عام</span>
                <div class="dropdown_select_input_table" id="" onclick="toggleDropdown(this)">
                  <div id="" class="dropdown_select_input T hover">${account_name}</div>
                  <i class="fa-solid fa-caret-down left_icon"></i>
                  <input type="hidden" class="id_hidden_input x1 T" id="" readonly value="${+row.account_id}">
                </div>
                <!-- items -->
                <div class="row items_div" style="gap:0.2rem; display:none">
                  <div class="row">
                    <span class="input_span_start">الكمية</span>
                    <div class="div_input_sm hover scroll Xitem_amount T" contenteditable="true" oninput="check_parse(this,'number')" onkeydown="td_EnterkeypressEvent1(event)">${row.item_amount ? row.item_amount : ""}</div>
                  </div>
                  <div class="row">
                    <span class="input_span_start">موقع المخزون</span>
                    <select name="" id="" class="select h_full items_locations_select">${get_items_locations_array}</select>
                  </div>
                </div>
              </div>
              <div class="dropdown_menue hover scroll" id="" style="display: none;">
                <div class="dropdown_search">
                  <input type="search" class="dropdown_search_input hover" id="" placeholder="ابحث هنا..." oninput="performSearch_accounts_table(this)" autocomplete="off">
                </div>
                <div class="inputTable_dropdown_tableContainer" id="">
                  <!-- قائمة الخيارات تظهر هنا   -->
                </div>
              </div>
            </div>
          </td>

          <td style="width: 100%;" class="inputTable_noteTd hover" contenteditable="true" onkeydown="td_EnterkeypressEvent1(event)">${row.row_note ? row.row_note : ""}</td>
          <td style="width: auto;" class="inputTable_NumberTd sum hover" contenteditable="true" oninput="handle_input_event(this)" onkeydown="td_EnterkeypressEvent1(event)">${row.debit ? row.debit : ""}</td>
          <td style="width: auto;" class="inputTable_NumberTd sum hover" contenteditable="true" oninput="handle_input_event(this)" onkeydown="td_EnterkeypressEvent1(event)">${row.credit ? row.credit : ""}</td>
  
          <td style="width: auto;" class="">
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
  
  
    const balance = data.reduce((sum, item) => sum + (+item.debit ?? 0), 0);
    tableTfoot.querySelector(`#totalDebit`).textContent = balance
    tableTfoot.querySelector(`#totalCredit`).textContent = balance
    tableTfoot.querySelector(`#difference_debet_cerdit`).textContent = 0
          
  } catch (error) {
    catch_error(error)
  } 
  }
  

  function handleCurrentTr(row,tr){
    
    const select_accountTpe = tr.querySelector(`.account_type`);
    const span = tr.querySelector(`.account_type_name`);
    const item_div = tr.querySelector(`.items_div`)
    const select_itemLocation = tr.querySelector(`.items_locations_select`)


    //1 :
      select_accountTpe.value = row.account_type_id;
      select_itemLocation.value = row.item_location_id;

    //2 :
    const val = parseInt(select_accountTpe.value)
    if (val === 1) {
      span.textContent = "حساب عام"
    } else if (val === 2) {
      span.textContent = "عميل"
    } else if (val === 3) {
      span.textContent = "مورد"
    } else if (val === 4) {
      span.textContent = "موظف"
    } else if (val === 5) {
      span.textContent = "صنف مخزون"
      item_div.style.display = 'flex'
    } else if (val === 6) {
      span.textContent = "اصل ثابت"
    }


  }



//!----------------------------------------------------------------------------
async function update() {

  const difference_debet_cerdit = parseFloat(document.querySelector(`#myTable > tfoot #difference_debet_cerdit`).textContent)
  if (difference_debet_cerdit !== 0) {
    showAlert(`warning`, 'القيد غير متوازن');
    return
  }

  const datex = date1.value;
  
  const total = parseFloat(document.querySelector(`#myTable > tfoot .table_total_row #totalDebit`).textContent)

  const x = transaction_data.x
  const general_note = note_inpute.value

  //preparing bread_body Data
  const tableRows = document.querySelectorAll('#myTable > tbody > tr');

  const posted_array = []; // انشاء مصفوفه جديده اضع فيها بيانات كل صف
  if (tableRows.length > 0) { // التأكد من وجود بيانات داخل المصفوفه اولا

    let t = 0
    for (const row of tableRows) {
      const account_typeId = parseInt(row.children[1].querySelector('.account_type').value);
      const account_id = parseInt(row.children[2].querySelector('.id_hidden_input').value);

      if (isNaN(account_id)) {
        showAlert(`warning`, 'توجد صفوف لا تحتوى على حساب')
        return;
      }

      
      const note_row = row.children[3].textContent; // الوصول لمحتوى الخليه فى العاممود رقم 3 داخل الصف
      const debt = parseFloat(row.children[4].textContent || 0); // لو ملقاش قيمه يعتبرها صفر
      const credit = parseFloat(row.children[5].textContent || 0); // لو ملقاش قيمه يعتبرها صفر
      const item_amount = parseFloat(row.children[2].querySelector('.Xitem_amount').textContent || 0)
      const items_locations_select = row.children[2].querySelector('.items_locations_select').value


      if (debt < 0 || credit < 0) {
        showAlert(`warning`, `لا يمكن ادخل قيمه بالسالب فى القيد`);
        return;
      }
      // انشاء اوبجيكت لوضع بيانات الخلايا فيه  ثم اضافة الاوبجيكت الى عناصر المصفوفه الفارغه
      const rowData = {
        account_typeId :account_typeId,
        account_id: account_id,
        note_row: note_row,
        debt: debt,
        credit: credit,
        item_amount: item_amount,
        items_location_id: items_locations_select,
      };
      posted_array.push(rowData); // اضافة الاوبجيكت الى عناصر المصفوفه
    }

      const post = await new_fetchData_postAndGet(
        "/api/transaction_update",
        { x, total, datex, general_note, posted_array },
        'transaction_permission', 'update',
        15,
        true,"هل تريد حفظ البيانات ؟",
        true,
        false,false,
        true,transaction_update_data,"transaction_view_ar",
        true,"transaction_view_ar",
        false,false,
         "An error occurred (Code: TAA2). Please check your internet connection and try again; if the issue persists, contact the administrators."
      )
    
  } else {
    showAlert('fail', 'لا توجد بيانات')
    return
  }
}

btn_update.onclick = async function () {
  await update()
}



async function deleteX() {

  const datex = date1.value;
  const x = transaction_data.x

      const post = await new_fetchData_postAndGet(
        "/api/transaction_delete",
        {x, datex},
        'transaction_permission', 'update',
        15,
        true,"هل تريد حذف البيانات ؟",
        true,
        false,false,
        true,transaction_update_data,"transaction_view_ar",
        true,"transaction_view_ar",
        false,false,
         "An error occurred (Code: TAA2). Please check your internet connection and try again; if the issue persists, contact the administrators."
      )
    
}

btn_delete.onclick = async function () {
  await deleteX()
}




document.addEventListener('DOMContentLoaded', async function () {
try {
  showLoadingIcon(content_space)
  const result = CheckUrlParams(); if (!result) {return}
  
  await getAccounsData_fn() // *
  await get_accounts_type()
  await get_items_locations()
  build_table()

  showData()
  makeTableRowsDraggable('myTable'); // make sure that the table already loaded
  hideLoadingIcon(content_space)         
} catch (error) {
    hideLoadingIcon(content_space)
    catch_error(error)
}
})
