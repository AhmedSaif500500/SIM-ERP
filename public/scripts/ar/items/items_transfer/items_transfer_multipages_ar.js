
const note_inpute = document.querySelector(`#note_inpute`);
const date1 = document.querySelector('#date1');
const dropdown_div1 = document.querySelector(`#dropdown_div1`)
const dropdown_div2 = document.querySelector(`#dropdown_div2`)

const style_name = `width: fit-content; min-width: 17rem`
const style_note = `width: fit-content; min-width: 20rem`
const style_amount = `width: fit-content; min-width: 10rem`

let Data = [];
let itemsLocationsArray = [];
let itemsArray = [];
let haderDataArray = [];
let bodyDataArray = [];


function build_table(){

    table.querySelector('thead').innerHTML  = `
                  <tr>
                    <th style="width: auto;" class="notViewTd"></th>
                    <th style="width: auto;" class=""></th>
                    <th style="${style_name}">الصنف</th>
                    <th style="${style_note}">البيان</th>
                    <th style="${style_amount}">الكمية</th>
                    <th style="width: auto;" class="notViewTd"></th>
                    <th style="width: 100%;" class="empty_for_full_width"></th>
                  </tr>
                `;
                
  table.querySelector('tfoot').innerHTML  = ` 

  <tr>
      <td id="lengthColumn1" class="notViewTd"></td>
      <td id="footer_recount" class=""></td>
      <td id="footer_item_name" style="${style_name}"></td>
      <td id="footer_note" style="${style_note}"></td>
      <td id="footer_amount" style="${style_amount}; text-align" class="normal_Total_In_Table"></td>
      <td id="" class="notViewTd"></td>
      <td id="" style="width: 100%;" class="empty_for_full_width"></td>
  </tr>

  <tr>
    <td colspan="7" class="notViewTd">
      <div class="row x_start y_center w_full h_full" style="gap: 0.5rem; ">
        <button id="btn_newRow" class="btn_new" onclick="addRow(itemsArray)">سطر جديد</button>
        <select id="columnSelect" class="select m_0" style="width: fit-content; height: 3.5rem;">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
    </td>
  </tr>
  
  `;
  
  }
  
  function addRow(dataArray) { //! mtnsash te3del el addRow beta3 el zeror ely fe el table fe ele Buld_table()
    
    
    const DropDown_accounts_tableColumnsName = ['id', 'account_name'];
    
    var numRows = parseInt(document.getElementById("columnSelect").value);
    
    const str_uniqVar = 'str_uniqVar1'
    // إضافة صف جديد فارغ في نهاية الجدول
    for (var i = 0; i < numRows; i++) {
      var emptyRow = document.createElement("tr");
      emptyRow.classList.add(`mainTr`)
      emptyRow.innerHTML = `
                  <td style="width: auto;" class="td-drag-handle notViewTd">
                    <div class="dragbutton_table">
                      <button class="drag-handle">
                        <i class="fa-solid fa-arrows-up-down" style=" pointer-events: none;"></i>
                      </button>
                    </div>
                  </td>

                  <td class="span_Total_In_Table rowCount td-account_type" style="min-width:fit-content"></td>
                                      
                  <!-- dropdown -->
                  <td style="${style_name}" class="td_account">
                    <div class="dropdown_container_input_table" id="">
                      <div class="row h_full">
                        <div class="dropdown_select_input_table" id=""  onclick="tableDropdownList(this, '${encodeURIComponent(JSON.stringify(dataArray))}', '${encodeURIComponent(JSON.stringify(DropDown_accounts_tableColumnsName))}', false, 'items_transfer_Form')"  style="min-width: 10rem;">
                          <div id="" class="dropdown_select_input T hover"></div>
                          <i class="fa-solid fa-caret-down left_icon"></i>
                          <i class="fa-solid fa-xmark clear_icon" style="display: none;" onclick="clear_icon_on_table_td(event),reset_row_unit(event)"></i>
                          <input type="hidden" class="id_hidden_input x1 T" id="" readonly>
                        </div>

                    </div>
                      <div class="dropdown_menue hover scroll" id="" style="display: none;">
                        <div class="dropdown_search">
                          <input type="search" class="dropdown_search_input hover" id="" placeholder="ابحث هنا..."
                            oninput="tableDropdownList_performSearch(this)" autocomplete="off">
                        </div>
                        <div class="inputTable_dropdown_tableContainer scroll" id="">
                          <!-- قائمة الخيارات تظهر هنا -->
                        </div>
                      </div>
                    </div>
                  <!-- END dropdown -->
                  </td>
                  
                  <td style="${style_note}" class="td-inputTable_noteTd inputTable_noteTd T hover" contenteditable="true" onkeydown="td_EnterkeypressEvent1(event)"></td>

  
                  <td style="${style_amount}" class="td-amount">
                        <div class="row h_full">
                          <div class="div_input_sm  hover scroll Xitem_amount T" contenteditable="true" oninput="check_parse(this,'number')" onkeydown="td_EnterkeypressEvent1(event)"></div>
                          <span class="span_end tbody_itemUniteName">الكمية</span>
                        </div>
                  </td>

                  <td style="width: auto;" class="td-lastTd notViewTd">
                    <div class="table_buttons_div">
                      <button onclick="deleteRow(this)" title="حذف الصف"><i class="fa-solid fa-xmark"></i></button>
                      <button onclick="copyRow(this)" title="نسخ الصف"><i class="fa-regular fa-copy"></i></button>
                    </div>
                  </td>

            <td id="" style="width: 100%;" class="empty_for_full_width"></td>

  `;
      table.querySelector('tbody').appendChild(emptyRow);
    }
    reset_rowcount_in_table(`myTable`)
  }
  
  function td_EnterkeypressEvent1(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // يمنع السطر الجديد
    }
}
  
  function deleteRow(btn) {
    try {
    const rows_length = parseInt(btn.closest("tbody").rows.length) || 0;
    if (rows_length <= 1) {
      showAlert('info', 'لايمكن حذف هذا الصف ,يمكنك حذف العمليه بالكامل بدلا من ذلك')
      return;
    }
    const row = btn.closest("tr");
    row.remove();
    reset_rowcount_in_table(`myTable`)
    

    } catch (error) {
      catch_error
    }
  }
  
  function copyRow(btn) {
    try {

    const row = btn.closest("tr");
    const newRow = row.cloneNode(true);

    // const tbody_taxType_select_value = row.querySelector(`.tbody_taxType`).value
    // newRow.querySelector(`.tbody_taxType`).value = tbody_taxType_select_value

    row.parentNode.insertBefore(newRow, row.nextSibling);
    
    reset_rowcount_in_table(`myTable`)
          
  } catch (error) {
    catch_error
  }
  }



 function tableColumn_hidden_and_show(is_hide_or_show,str_tableId,str_className){
  const cells = document.querySelectorAll(`#${str_tableId} .${str_className}`)
  if (is_hide_or_show){
    for (const cell of cells){
      cell.style.display = 'table-cell'
    }
  }else{
    for (const cell of cells){
    cell.style.display = 'none'
  }
  }
 }
  
  
// تحديد الخيار المختار وإخفاء القائمة


//#region get salesman and itemsLocations

function fillTable(dataArray) { //! mtnsash te3del el addRow beta3 el zeror ely fe el table fe ele Buld_table()
    

  
  const tableBody = document.querySelector(`#myTable tbody`)
    
  const DropDown_accounts_tableColumnsName = ['id', 'account_name', 'item_unite'];
  

  // إضافة صف جديد فارغ في نهاية الجدول

  bodyDataArray.forEach(row => {

    const newTr = 
    `
    <tr class = mainTr>
                <td style="width: auto;" class="td-drag-handle notViewTd">
                    <div class="dragbutton_table">
                      <button class="drag-handle">
                        <i class="fa-solid fa-arrows-up-down" style=" pointer-events: none;"></i>
                      </button>
                    </div>
                  </td>

                  <td class="span_Total_In_Table rowCount td-account_type" style="min-width:fit-content"></td>
                                      
                  <!-- dropdown -->
                  <td style="${style_name}" class="td_account">
                    <div class="dropdown_container_input_table" id="">
                      <div class="row h_full">
                        <div class="dropdown_select_input_table" id=""  onclick="tableDropdownList(this, '${encodeURIComponent(JSON.stringify(dataArray))}', '${encodeURIComponent(JSON.stringify(DropDown_accounts_tableColumnsName))}', false, 'items_transfer_Form')"  style="min-width: 10rem;">
                          <div id="" class="dropdown_select_input T hover"></div>
                          <i class="fa-solid fa-caret-down left_icon"></i>
                          <i class="fa-solid fa-xmark clear_icon" style="display: none;" onclick="clear_icon_on_table_td(event),reset_row_unit(event)"></i>
                          <input type="hidden" class="id_hidden_input x1 T" id="" readonly>
                        </div>

                    </div>
                      <div class="dropdown_menue hover scroll" id="" style="display: none;">
                        <div class="dropdown_search">
                          <input type="search" class="dropdown_search_input hover" id="" placeholder="ابحث هنا..."
                            oninput="tableDropdownList_performSearch(this)" autocomplete="off">
                        </div>
                        <div class="inputTable_dropdown_tableContainer scroll" id="">
                          <!-- قائمة الخيارات تظهر هنا -->
                        </div>
                      </div>
                    </div>
                  <!-- END dropdown -->
                  </td>
                  
                   <td style="${style_note}" class="td-inputTable_noteTd inputTable_noteTd T hover" contenteditable="true" onkeydown="td_EnterkeypressEvent1(event)"></td>
                  <td style="${style_amount}" class="td-amount">
                        <div class="row h_full">
                          <div class="div_input_sm  hover scroll Xitem_amount T" contenteditable="true" oninput="check_parse(this,'number')" onkeydown="td_EnterkeypressEvent1(event)"></div>
                          <span class="span_end tbody_itemUniteName">الكمية</span>
                        </div>
                  </td>                    
  
                  <td style="width: auto;" class="td-lastTd notViewTd">
                    <div class="table_buttons_div">
                      <button onclick="deleteRow(this)" title="حذف الصف"><i class="fa-solid fa-xmark"></i></button>
                      <button onclick="copyRow(this)" title="نسخ الصف"><i class="fa-regular fa-copy"></i></button>
                    </div>
                  </td>

            <td id="" style="width: 100%;" class="empty_for_full_width"></td>
    </tr>
    `;
    tableBody.insertAdjacentHTML('beforeend', newTr);
    const tr = tableBody.querySelector(`tr:last-child`)
    handleCurrentTr(row,tr)

  });
  reset_rowcount_in_table(`myTable`)
}

function handleCurrentTr(row,tr){
try {
  
  tr.querySelector(`.td_account .id_hidden_input`).value = row.item_id;
  tr.querySelector(`.td_account .dropdown_select_input`).textContent = row.item_name;
  tr.querySelector(`.td-amount .Xitem_amount`).textContent = row.item_amount;
  tr.querySelector(`.td-amount .tbody_itemUniteName`).textContent = row.item_unite;
  tr.querySelector(`.td-inputTable_noteTd`).textContent = row.row_note;

} catch (error) {
  catch_error(error)
}
}


async function get_items_transfer_data_for_update(x) {

  
  const data1 = await new_fetchData_postAndGet(
    "/get_items_transfer_data_for_update",
    {x},
    'items_transfer_permission', 'view',
    15,
    false,false,
    true,
    false,false,
    false,false,
    false,false,false,
    false,"items_transfer_view_ar",
    "An error occurred (Code: TAA1). Please check your internet connection and try again; if the issue persists, contact the administrators."
  )
  
return data1
};




async function get_items_transfer_main_data() {
  // معلق
  data_accounts = await new_fetchData_postAndGet(
    "/items_transfer_main_data",
    {},
    'items_transfer_permission', 'add',
    15,
    false,false,
    true,
    false,false,
    false,false,
    false,false,false,
    true,"items_transfer_view_ar",
    "An error occurred (Code: TAA1). Please check your internet connection and try again; if the issue persists, contact the administrators."
  )
return data_accounts
};

function reset_row_unit(event){
  try {
    event.stopPropagation(); // منع انتقال الحدث إلى العنصر الأب
    const clickedIcon = event.target;
    const mainRow = clickedIcon.closest(`.mainTr`)    
    const tbody_itemUniteName = mainRow.querySelector(`.tbody_itemUniteName`).textContent = 'الكميه'
    const Xitem_amount = mainRow.querySelector(`.Xitem_amount`).textContent = ''
  } catch (error) {
    catch_error(error)
  }
}
