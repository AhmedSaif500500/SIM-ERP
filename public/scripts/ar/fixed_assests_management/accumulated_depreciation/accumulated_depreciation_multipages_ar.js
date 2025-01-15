
const note_inpute = document.querySelector(`#note_inpute`);
const date1 = document.querySelector('#date1');
const start_date_input = document.querySelector(`#start_date_input`); start_date_input.value = firstDayOfYear;
const end_date_input = document.querySelector(`#end_date_input`); end_date_input.value = lastDayOfYear;
const calculate_depreciation_btn = document.querySelector(`#calculate_depreciation_btn`)

const style_name = `width: fit-content; min-width: 17rem`
const style_value = `width: fit-content; min-width: 10rem`

let Data = [];
let assestsAccountsArray = [];
let haderDataArray = [];
let bodyDataArray = [];
let accumulated_depreciation_data = []

function build_table(){

    table.querySelector('thead').innerHTML  = `
                  <tr>
                    <th style="width: auto;" class="notViewTd"></th>
                    <th style="width: auto;" class=""></th>
                    <th style="${style_name}">الاصل الثابت</th>
                    <th style="${style_value}">مبلغ الاهلاك</th>
                    <th style="width: auto;" class="notViewTd"></th>
                    <th style="width: 100%;" class="empty_for_full_width"></th>
                  </tr>
                `;
                
  table.querySelector('tfoot').innerHTML  = ` 

  <tr>
      <td id="lengthColumn1" class="notViewTd"></td>
      <td id="footer_recount" class=""></td>
      <td id="footer_assest_name" style="${style_name}"></td>
      <td id="footer_depreciation_value" style="${style_value}; text-align" class="normal_Total_In_Table"></td>
      <td id="" class="notViewTd"></td>
      <td id="" style="width: 100%;" class="empty_for_full_width"></td>
  </tr>

  <tr>
    <td colspan="6" class="notViewTd">
      <div class="row x_start y_center w_full h_full" style="gap: 0.5rem; ">
        <button id="btn_newRow" class="btn_new" onclick="addRow(assestsAccountsArray)">سطر جديد</button>
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
                        <div class="dropdown_select_input_table" id=""  onclick="tableDropdownList(this, '${encodeURIComponent(JSON.stringify(dataArray))}', '${encodeURIComponent(JSON.stringify(DropDown_accounts_tableColumnsName))}', false, 'normalForm')"  style="min-width: 10rem;">
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
                        <div class="inputTable_dropdown_tableContainer" id="">
                          <!-- قائمة الخيارات تظهر هنا -->
                        </div>
                      </div>
                    </div>
                  <!-- END dropdown -->
                  </td>
                  

                  <td style="${style_value}" class="div_input_sm td-value T hover" oninput="check_parse(this,'number'),updateFooter()" contenteditable="true"></td>
  
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
    updateFooter()
    

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
    updateFooter()
          
  } catch (error) {
    catch_error
  }
  }

  function updateFooter() {
    // تحديد الجدول بناءً على الـ ID الخاص به
    const table = document.getElementById(`myTable`);
    if (!table) {
        return
    }

    let total = 0;

    // البحث عن جميع الخلايا ذات الفئة المحددة داخل الجدول
    const cells = table.querySelectorAll(`.td-value`);
    cells.forEach(cell => {
        // محاولة تحويل محتوى الخلية إلى رقم
        const cellValue = parseFloat(cell.textContent.trim());
        if (!isNaN(cellValue)) {
            total += cellValue;
        }
    });

  //  return total;
  document.querySelector(`#footer_depreciation_value`).textContent = total
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
                        <div class="dropdown_select_input_table" id=""  onclick="tableDropdownList(this, '${encodeURIComponent(JSON.stringify(dataArray))}', '${encodeURIComponent(JSON.stringify(DropDown_accounts_tableColumnsName))}', false, 'normalForm')"  style="min-width: 10rem;">
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
                        <div class="inputTable_dropdown_tableContainer" id="">
                          <!-- قائمة الخيارات تظهر هنا -->
                        </div>
                      </div>
                    </div>
                  <!-- END dropdown -->
                  </td>
                  

                  <td style="${style_value}" class="div_input_sm td-value T hover" oninput="check_parse(this,'number'),updateFooter()" contenteditable="true"></td>
                    
  
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
  updateFooter()
  reset_rowcount_in_table(`myTable`)
}

function handleCurrentTr(row,tr){
try {
  
  tr.querySelector(`.td_account .dropdown_select_input`).textContent = row.account_name;
  tr.querySelector(`.td_account .id_hidden_input`).value = row.id;
  tr.querySelector(`.td-value`).textContent = row.depreciated_value;

} catch (error) {
  catch_error(error)
}
}


async function get_calculated_depreacation_data_for_update(x) {

  
  const data1 = await new_fetchData_postAndGet(
    "/get_calculated_depreacation_data_for_update",
    {x},
    'accumulated_depeciaton_permission', 'view',
    15,
    false,false,
    true,
    false,false,
    false,false,
    false,false,false,
    false,"accumulated_depreciation_view_ar",
    "An error occurred (Code: TAA1). Please check your internet connection and try again; if the issue persists, contact the administrators."
  )
  
return data1
};




async function get_fixed_assests_accumulated_accounts() {
  // معلق
  data_accounts = await new_fetchData_postAndGet(
    "/get_accumulated_depeciaton_accounts",
    {},
    'accumulated_depeciaton_permission', 'add',
    15,
    false,false,
    true,
    false,false,
    false,false,
    false,false,false,
    true,"accumulated_depreciation_view_ar",
    "An error occurred (Code: TAA1). Please check your internet connection and try again; if the issue persists, contact the administrators."
  )
return data_accounts
};


function create_auto_note(){
  note_inpute.value = 
  note_inpute.textContent = `إهلاك الاصول الثابتة للفترة من  ${reverseDateFormatting(start_date_input.value)}   الى   ${reverseDateFormatting(end_date_input.value)}`;
}




  calculate_depreciation_btn.onclick = async function () {
    try {
      showLoadingIcon(calculate_depreciation_btn)
        const startDate = start_date_input.value; 
        const endDate = end_date_input.value;

        if(!startDate || !endDate){
            showAlert('warning', 'برجاء تحديد فترة الاهلاك بشكل صحيح');
            return
        }

    Data = await new_fetchData_postAndGet(
      "/get_calculated_depreacation_values",
      {startDate, endDate},
      'accumulated_depreciation_permission', 'view',
      15,
      false,false,
      true,
      false,false,
      false,false,
      false,false,false,
      false,false,
      "An error occurred (Code: TAA1). Please check your internet connection and try again; if the issue persists, contact the administrators."
    )


    
  
    bodyDataArray = Data.calculated_depreciation_data
    assestsAccountsArray = Data.fixedAssestsAccounts

    clear_tbody(`myTable`)
    fillTable(assestsAccountsArray)
    create_auto_note()
    hideLoadingIcon(calculate_depreciation_btn);
    } catch (error) {
        hideLoadingIcon(calculate_depreciation_btn);
        catch_error(error)
    }
  }