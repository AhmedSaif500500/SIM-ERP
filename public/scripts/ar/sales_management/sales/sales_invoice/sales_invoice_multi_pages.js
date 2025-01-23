

const qutation_reference_div = document.querySelector(`.qutation_reference_div`)
const order_reference_div = document.querySelector(`.order_reference_div`)
const dueDate_input = document.querySelector(`#dueDate_input`)

let is_column_Note_show = 'none'
let is_column_discount_show = 'none'
let is_column_tax_show = 'none'

const is_RowNote_checkBox = document.querySelector(`#is_RowNote_checkBox`)
const is_RowDiscount_checkBox = document.querySelector(`#is_RowDiscount_checkBox`)
const is_RowTax_checkBox = document.querySelector(`#is_RowTax_checkBox`)

is_RowNote_checkBox.onchange = function(){
  const x = is_RowNote_checkBox.checked
    tableColumn_hidden_and_show(x,'myTable','td-inputTable_noteTd')
    is_column_Note_show = x === true ? x : 'none'
    
}

is_RowDiscount_checkBox.onchange = function(){
  const x = is_RowDiscount_checkBox.checked
    tableColumn_hidden_and_show(x,'myTable','td-dsicount')
    is_column_discount_show = x === true ? x : 'none'
}


is_RowTax_checkBox.onchange = function(){
  const x = is_RowTax_checkBox.checked
    tableColumn_hidden_and_show(x,'myTable','td-tax')
    is_column_tax_show = x === true ? x : 'none'
}

function build_table(){

    table.querySelector('thead').innerHTML  = `
                  <tr>
                    <th style="width: auto;" class="notViewTd"></th>
                    <th style="width: auto;">#</th>
                    <th style="width: auto;">النوع</th>
                    <th style="width: 100%;">الصنف</th>
                    <th style="display: ${is_column_Note_show}; width: auto;" class="td-inputTable_noteTd">البيان</th>
                    <th style="width: auto;">الكميه</th>
                    <th style="width: auto;">السعر</th>
                    <th style="display: ${is_column_discount_show}; width: auto;" class="td-dsicount">الخصم</th>
                    <th style="display: ${is_column_tax_show}; width: auto;" class="td-tax">الاجمالى</th>
                    <th style="display: ${is_column_tax_show}; width: auto;" class="td-tax">الضريبة</th>
                    <th style="display: ${is_column_tax_show}; width: auto;" class="td-tax">مبلغ الضريبه</th>
                    <th style="width: auto; text-align: center;">الاجمالى</th>
                    <th style="width: auto;" class="notViewTd"></th>
                  </tr>
                
                `;
                
  table.querySelector('tfoot').innerHTML  = ` 

  <tr>
      <td id="lengthColumn1" class="notViewTd"></td>
      <td id=""></td>
      <td id=""></td>
      <td id=""style="width:100%; padding-inline-start: 2.5rem; font-weight: bold; opacity: 0.8;"></td>
      <td id=""style="display: ${is_column_Note_show}; padding-inline-start: 2.5rem; font-weight: bold; opacity: 0.8;" class="td-inputTable_noteTd"></td>
      <td id="" style="text-align: center"></td>
      <td id=""></td>
      <td id="" style="display: ${is_column_discount_show};" class="td-dsicount"></td>
      <td id="" style="display: ${is_column_tax_show}; width: auto;" class="td-tax"></td>
      <td id="" colspan="2" style="display: ${is_column_tax_show};" class="td-tax">
        <div class="tfoot_totalDiv_note">
             <!-- يتم ملء أسماء الضرائب هنا ديناميكيًا -->
        </div>
      </td>
      <td id="">
        <div class="tfoot_totalDiv_Values">
           <!-- يتم ملء أسماء الضرائب هنا ديناميكيًا -->
        </div>
      </td>
      <td id="" class="notViewTd"></td>
  </tr>

  <tr>
   <td class="notViewTd"></td>
    <td colspan="12" class="">
      <div class="row x_start y_center w_full h_full notView" style="gap: 0.5rem;">
        <button id="btn_newRow" class="btn_new" onclick="addRow(itemsDataArray, taxHeaderArray)">سطر جديد</button>
        <select id="columnSelect" class="select m_0" style="width: fit-content; height: 3.5rem;">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
    </td>
  
    <td id="difference_debit_cerdit" colspan="2" class="" style="text-align: center; opacity: 0.5; color: var(--Font_Color); transition: var(--transition);"></td>
  
    <td></td>
    <td></td>
  
  </tr>
  
  `;
  
  }
  
  function addRow(dataArray, taxHeaderArray) { //! mtnsash te3del el addRow beta3 el zeror ely fe el table fe ele Buld_table()
        
    const DropDown_accounts_tableColumnsName = ['id', 'account_name', 'item_unite'];
    const DropDown_TaxHeader_tableColumnsName = ['id', 'taxe_package_name'];
    
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
                  <td class="td-item_type">
                      <select name="" id="" class="account_type select h_full" onchange="change_select_account_type(this)">
                         <option value="5">صنف</option>
                         <option value="8">خدمة</option>
                      </select>
                  </td>
                    
                  
                  <td style="width: 100%; height: var(--input_height);" class="td-itemId">
                  <!-- dropdown -->
                    <div class="dropdown_container_input_table" id="">
                      <div class="row h_full">
                        <span class="span_start account_type_name T">صنف</span>
                        <div class="dropdown_select_input_table" id=""  onclick="tableDropdownList(this, '${encodeURIComponent(JSON.stringify(dataArray))}', '${encodeURIComponent(JSON.stringify(DropDown_accounts_tableColumnsName))}', 'account_type', 'salesInvoiceForm')"  style="min-width: 10rem;">
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
  
                  
                  <td style="display: ${is_column_Note_show}; width: auto;" class="td-inputTable_noteTd inputTable_noteTd T hover" contenteditable="true" onkeydown="td_EnterkeypressEvent1(event)"></td>
                  
                  <td style="width: auto;" class="td-amount">
                        <div class="row h_full">
                          <div class="div_input_sm  hover scroll Xitem_amount T" contenteditable="true" oninput="check_parse(this,'number'),update_table('myTable')" onkeydown="td_EnterkeypressEvent1(event)"></div>
                          <span class="span_end tbody_itemUniteName">الكمية</span>
                          </div>
                  </td>

                  <td style="width: auto;" class="div_input_sm td-unitePrice T hover" oninput="check_parse(this,'number'),update_table('myTable')" contenteditable="true"></td>
                  
                  <td style="display: ${is_column_discount_show}; width: auto;" class="td-dsicount">
                        <div class="row h_full">
                        <select class="span_Total_In_Table tbody_discountType" onchange="update_table('myTable')">
                          <option value="1">نسبه %</option>
                          <option value="2">مبلغ</option>
                        </select>
                          <div class="div_input_sm  hover scroll tbody_discountValue Xrow_discount_value T" contenteditable="true" oninput="check_parse(this,'number'),update_table('myTable')" onkeydown="td_EnterkeypressEvent1(event)"></div>
                        </div>
                  </td>
                  <td style="display: ${is_column_tax_show}; width: auto; margin: 0" class="span_Total_In_Table td-totalBeforTax td-tax"></td>
                  <td style="display: ${is_column_tax_show}; width: auto;" class="td-taxHeader td-tax">
                    <!-- dropdown -->
                    <div class="dropdown_container_input_table taxHeaderDiv" id="">
                      <div class="row h_full">
                        <div class="dropdown_select_input_table" id=""  onclick="tableDropdownList(this, '${encodeURIComponent(JSON.stringify(taxHeaderArray))}', '${encodeURIComponent(JSON.stringify(DropDown_TaxHeader_tableColumnsName))}', false, false)"  style="min-width: 10rem;">
                          <div id="" class="dropdown_select_input taxHeaderInput T hover" oninput="update_table('myTable')"></div>
                          <i class="fa-solid fa-caret-down left_icon"></i>
                          <i class="fa-solid fa-xmark clear_icon" style="display: none;" onclick="clear_icon_on_table_td(event),reset_row_unit(event),update_table('myTable')"></i>
                          <input type="hidden" class="id_hidden_input tbody_taxType x1 T" id="" readonly>
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
                  <td style="width: auto; margin: 0; display: ${is_column_tax_show};" class="span_Total_In_Table td-taxValue td-tax"></td>

                  <td style="width: auto; margin: 0" class="span_Total_In_Table td-totalAfterTax"></td>
  
  
                  <td style="width: auto;" class="td-lastTd notViewTd">
                    <div class="table_buttons_div">
                      <button onclick="deleteRow(this)" title="حذف الصف"><i class="fa-solid fa-xmark"></i></button>
                      <button onclick="copyRow(this)" title="نسخ الصف"><i class="fa-regular fa-copy"></i></button>
                    </div>
                  </td>
  `;
      table.querySelector('tbody').appendChild(emptyRow);
      observe_changes_in_taxheaderinput(emptyRow)
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
    update_table('myTable')
    

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
    update_table('myTable')
          
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



function handle_input_event(input) {
    const currentRow = input.closest("tr");
    const cellIndex = input.closest("td").cellIndex;
    if (cellIndex === 4) {          
      currentRow.cells[5].textContent = "";
    } else if (cellIndex === 5) {
      currentRow.cells[4].textContent = "";
    }
    check_parse(input, 'number');
    updateFooter()
  }
  
  
// تحديد الخيار المختار وإخفاء القائمة


function change_select_account_type(select) {
  const tr = select.closest("tr");

  const inputes = tr.querySelectorAll('.T');

  for (const input of inputes) {
    // التحقق إذا كان العنصر input أو textarea
    if (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA') {
      input.value = ""; // استخدام value لهذه العناصر
    } else {
      input.textContent = ""; // استخدام textContent للعناصر الأخرى
    }
  }

  const clear_icons = tr.querySelectorAll('.clear_icon'); // row.id
  clear_icons.forEach(element => {
    element.style.display = 'none'
  });

  // tr.querySelector(`.items_div`).style.display = 'none'
  const span = tr.querySelector(`.account_type_name`)
  const val = parseInt(select.value)
  if (val === 5) {
    span.textContent = "صنف"
  } else if (val === 8) {
    span.textContent = "خدمة"
  }
 
  update_table('myTable')
}



//#region get salesman and itemsLocations

function fillTable(dataArray, taxHeaderArray) { //! mtnsash te3del el addRow beta3 el zeror ely fe el table fe ele Buld_table()
    

  
  const tableBody = document.querySelector(`#myTable tbody`)
    
  const DropDown_accounts_tableColumnsName = ['id', 'account_name', 'item_unite'];
  const DropDown_TaxHeader_tableColumnsName = ['id', 'taxe_package_name'];
  

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
                <td class="td-item_type">
                    <select name="" id="" class="account_type select h_full" onchange="change_select_account_type(this)">
                       <option value="5">صنف</option>
                       <option value="8">خدمة</option>
                    </select>
                </td>
                  
                
                <td style="width: 100%; height: var(--input_height);" class="td-itemId">
                <!-- dropdown -->
                  <div class="dropdown_container_input_table" id="">
                    <div class="row h_full">
                      <span class="span_start account_type_name T">صنف</span>
                      <div class="dropdown_select_input_table" id=""  onclick="tableDropdownList(this, '${encodeURIComponent(JSON.stringify(dataArray))}', '${encodeURIComponent(JSON.stringify(DropDown_accounts_tableColumnsName))}', 'account_type', 'salesInvoiceForm')"  style="min-width: 10rem;">
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

                
                <td style="display: ${is_column_Note_show}; width: auto;" class="td-inputTable_noteTd inputTable_noteTd T hover" contenteditable="true" onkeydown="td_EnterkeypressEvent1(event)"></td>
                
                <td style="width: auto;" class="td-amount">
                      <div class="row h_full">
                        <div class="div_input_sm  hover scroll Xitem_amount T" contenteditable="true" oninput="check_parse(this,'number'),update_table('myTable')" onkeydown="td_EnterkeypressEvent1(event)"></div>
                        <span class="span_end tbody_itemUniteName">الكمية</span>
                        </div>
                </td>

                <td style="width: auto;" class="td_number td-unitePrice T hover" oninput="check_parse(this,'number'),update_table('myTable')" contenteditable="true"></td>
                
                <td style="display: ${is_column_discount_show}; width: auto;" class="td-dsicount">
                      <div class="row h_full">
                      <select class="span_Total_In_Table tbody_discountType" onchange="update_table('myTable')">
                        <option value="1">نسبه %</option>
                        <option value="2">مبلغ</option>
                      </select>
                        <div class="div_input_sm  hover scroll tbody_discountValue Xrow_discount_value T" contenteditable="true" oninput="check_parse(this,'number'),update_table('myTable')" onkeydown="td_EnterkeypressEvent1(event)"></div>
                      </div>
                </td>
                
                  <td style="display: ${is_column_tax_show}; width: auto; margin: 0" class="span_Total_In_Table td-totalBeforTax td-tax"></td>
                
                  <td style="display: ${is_column_tax_show}; width: auto;" class="td-taxHeader td-tax">
                  <!-- dropdown -->
                  <div class="dropdown_container_input_table taxHeaderDiv" id="">
                    <div class="row h_full">
                      <div class="dropdown_select_input_table" id=""  onclick="tableDropdownList(this, '${encodeURIComponent(JSON.stringify(taxHeaderArray))}', '${encodeURIComponent(JSON.stringify(DropDown_TaxHeader_tableColumnsName))}', false, false)"  style="min-width: 10rem;">
                        <div id="" class="dropdown_select_input taxHeaderInput T hover" oninput="update_table('myTable')"></div>
                        <i class="fa-solid fa-caret-down left_icon"></i>
                        <i class="fa-solid fa-xmark clear_icon" style="display: none;" onclick="clear_icon_on_table_td(event),reset_row_unit(event)"></i>
                        <input type="hidden" class="id_hidden_input tbody_taxType x1 T" id="" readonly>
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

                  <td style="width: auto; margin: 0; display: ${is_column_tax_show};" class="span_Total_In_Table td-taxValue td-tax"></td>

                <td style="width: auto; margin: 0" class="span_Total_In_Table td-totalAfterTax"></td>


                <td style="width: auto;" class="td-lastTd notViewTd">
                  <div class="table_buttons_div">
                    <button onclick="deleteRow(this)" title="حذف الصف"><i class="fa-solid fa-xmark"></i></button>
                    <button onclick="copyRow(this)" title="نسخ الصف"><i class="fa-regular fa-copy"></i></button>
                  </div>
                </td>
    </tr>
    `;
    tableBody.insertAdjacentHTML('beforeend', newTr);
    const tr = tableBody.querySelector(`tr:last-child`)
    handleCurrentTr(row,tr)

  });
  update_table(`myTable`)
  reset_rowcount_in_table(`myTable`)
}

function handleCurrentTr(row,tr){
try {
  
  observe_changes_in_taxheaderinput(tr)
  
  const selectItemType = tr.querySelector(`.td-item_type .account_type`) 
  selectItemType.value = row.item_type_id;
  tr.querySelector(`.td-itemId .account_type_name`).textContent = selectItemType.options[selectItemType.selectedIndex].text;
  tr.querySelector(`.td-itemId .id_hidden_input`).value = row.item_id;
  tr.querySelector(`.td-itemId .dropdown_select_input`).textContent = row.account_name; tr.querySelector(`.td-itemId .clear_icon`).style.display = row.account_name? 'flex' : 'none'; 
  tr.querySelector(`.td-inputTable_noteTd`).textContent = row.row_note;
  tr.querySelector(`.td-amount .tbody_itemUniteName`).textContent = row.item_unite;
tr.querySelector(`.td-amount .Xitem_amount`).textContent = row.amount;
tr.querySelector(`.td-unitePrice`).textContent = row.unite_price;
tr.querySelector(`.td-dsicount .tbody_discountType`).value = row.is_discount_percentage ? 1 : 2;
tr.querySelector(`.td-dsicount .tbody_discountValue`).textContent = row.dicount_value;
tr.querySelector(`.td-taxHeader .id_hidden_input`).value = row.tax_header_id;
tr.querySelector(`.td-taxHeader .dropdown_select_input`).textContent = row.taxe_package_name; tr.querySelector(`.td-taxHeader .clear_icon`).style.display = row.taxe_package_name? 'flex' : 'none';
} catch (error) {
  catch_error(error)
}
}


let Data = [];
let itemsDataArray = [];
let taxHeaderArray = [];
let taxBodyArray = [];
let headerDataArray = [];
let bodyDataArray = [];
let customersDataArray = [];
let salesmanArray = [];
let itemslocationsArray = [];
let salesQutationReferencesArray = [];
let salesOrderReferencesArray = [];

async function showsalesInvoiceData(x, qutationId, orderId, type){

  try {
    let permType
    let url;
    if (type === 'qutation'){
      url = "/get_data_for_qutationToInvoice"
      permType = 'add'
    }else if (type === 'order'){
      url = "/get_data_for_orderToInvoice"
      permType = 'add'
    }else{
      url = "/get_data_for_sales_invoice_update"
      permType = 'update'
    }


    
  Data = await new_fetchData_postAndGet(
    url,
    {x, qutationId, orderId},
    'sales_invoice_permission', permType, // معلق
    15,
    false,false,
    true,
    false,false,
    false,false,
    false,false,false,
    false,"sales_invoice_view_ar",
    "An error occurred (Code: TAA1). Please check your internet connection and try again; if the issue persists, contact the administrators."
  )


  headerDataArray = Data.headerData[0];
  itemsDataArray =  Data.itemsDataArray;
  bodyDataArray =  Data.bodyData;
  taxHeaderArray =  Data.taxHeaderArray;
  taxBodyArray =  Data.taxBodyArray;
  customersDataArray =  Data.customersDataArray;
  salesmanArray =  Data.salesmanArray;
  itemslocationsArray =  Data.itemslocationsArray;
  salesQutationReferencesArray =  Data.salesQutationReferencesArray;
  salesOrderReferencesArray =  Data.salesOrderReferencesArray;

    if (!Data || !itemsDataArray || !itemsDataArray || !bodyDataArray){
      await redirection('sales_order_view_ar','fail','حدث خطأ اثتاء معالجه البيانات')
      return
    }

    build_table()
    fillTable(itemsDataArray, taxHeaderArray) //! mtnsash te3del el addRow beta3 el zeror ely fe el table fe ele Buld_table() 5od de copy 7otaha henak
    
    
    //! show header data 
    let qutation_id;
    let order_id;
    if(type === 'qutation'){
      qutation_id = x
      order_id = headerDataArray.order_id
    }else if(type === 'order'){
      qutation_id = headerDataArray.qutation_id
      order_id = x
    }else{
      qutation_id = headerDataArray.qutation_id
      order_id = headerDataArray.order_id
    }


    create_drop_down_with_External_DataArray(`dropdown_div3`,customersDataArray); selectedRow_dropdownDiv(`dropdown_div3`,customersDataArray,headerDataArray.account_id);
    create_drop_down_with_External_DataArray(`dropdown_div`,salesmanArray); selectedRow_dropdownDiv(`dropdown_div`,salesmanArray,headerDataArray.salesman_id);
    create_drop_down_with_External_DataArray(`dropdown_div2`,itemslocationsArray); selectedRow_dropdownDiv(`dropdown_div2`,itemslocationsArray,headerDataArray.items_location_id);
    create_drop_down_with_External_DataArray(`dropdown_div4`,salesOrderReferencesArray); selectedRow_dropdownDiv(`dropdown_div4`,salesOrderReferencesArray,order_id);
    create_drop_down_with_External_DataArray(`dropdown_div5`,salesQutationReferencesArray); selectedRow_dropdownDiv(`dropdown_div5`,salesQutationReferencesArray,qutation_id);
    
  

    let status = headerDataArray.is_invoiced; 
    // if(status){
    //   reference_status.classList.add('table_green_condition')
    //   reference_status.textContent = 'مفوتر'
    // }else{
    //   reference_status.classList.add('table_orange_condition')
    //   reference_status.textContent = 'غير مفوتر'
    // }
    reference_input.value =  headerDataArray.referenceconcat
    date1.value = headerDataArray.datex
    
    dueDate_input.value = type === 'qutation' || type === 'order' ? today : headerDataArray.due_date
    note_inpute.value = headerDataArray.general_note
  
    is_RowNote_checkBox.checked = headerDataArray.is_row_note_show;
      tableColumn_hidden_and_show(headerDataArray.is_row_note_show,'myTable','td-inputTable_noteTd');
      is_column_Note_show = headerDataArray.is_row_note_show ? 'table-cell' : 'none';
    is_RowDiscount_checkBox.checked = headerDataArray.is_row_dicount_show;
      tableColumn_hidden_and_show(headerDataArray.is_row_dicount_show,'myTable','td-dsicount');
      is_column_discount_show = headerDataArray.is_row_dicount_show ? 'table-cell' : 'none';
    is_RowTax_checkBox.checked = headerDataArray.is_row_tax_show;
      tableColumn_hidden_and_show(headerDataArray.is_row_tax_show,'myTable','td-tax');
      is_column_tax_show = headerDataArray.is_row_tax_show ? 'table-cell' : 'none';
    } catch (error) {
      catch_error(error)
    }
}

function reset_row_unit(event){
  try {
    event.stopPropagation(); // منع انتقال الحدث إلى العنصر الأب
    const clickedIcon = event.target;
    const mainRow = clickedIcon.closest(`.mainTr`)    
    const unit = mainRow.querySelector(`.td-amount .tbody_itemUniteName`).textContent = 'الكميه' 
  } catch (error) {
    catch_error(error)
  }
}

//#endregion

function observe_changes_in_taxheaderinput(row){
  const taxHeaderInput = row.querySelector('.td-taxHeader .taxHeaderInput');
  if (taxHeaderInput) {
    const observer = new MutationObserver(() => {
      // تحديث الجدول عند حدوث تغير
      update_table('myTable');
      
    });

    observer.observe(taxHeaderInput, {
      childList: true, // مراقبة تغييرات العناصر
      characterData: false, // مراقبة النصوص
      subtree: false // مراقبة العناصر الفرعية
    });
  }
}