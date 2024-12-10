

const qutation_reference_div = document.querySelector(`.qutation_reference_div`)
const order_reference_div = document.querySelector(`.order_reference_div`)

let is_column_Note_show = 'none'
let is_column_discount_show = 'none'

const is_RowNote_checkBox = document.querySelector(`#is_RowNote_checkBox`)
const is_RowDiscount_checkBox = document.querySelector(`#is_RowDiscount_checkBox`)

is_RowNote_checkBox.onchange = function(){
  const x = is_RowNote_checkBox.checked
    tableColumn_hidden_and_show(x,'myTable','td-inputTable_noteTd')
    is_column_Note_show = x
}

is_RowDiscount_checkBox.onchange = function(){
  const x = is_RowDiscount_checkBox.checked
    tableColumn_hidden_and_show(x,'myTable','td-dsicount')
    is_column_discount_show = x
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
                    <th style="width: auto;">الاجمالى</th>
                    <th style="width: auto;">الضريبة</th>
                    <th style="width: auto;">مبلغ الضريبه</th>
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

      <td id="" colspan="3">
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
    <td colspan="13" class="notViewTd">
      <div class="row x_start y_center w_full h_full" style="gap: 0.5rem; ">
        <button id="btn_newRow" class="btn_new" onclick="addRow(itemsDataArray, Data.taxHeaderArray)">سطر جديد</button>
        <select id="columnSelect" class="select m_0" style="width: fit-content; height: 3.5rem;">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
    </td>
  
    <td id="difference_debet_cerdit" colspan="2" class="" style="text-align: center; opacity: 0.5; color: var(--Font_Color); transition: var(--transition);"></td>
  
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
                        <span class="input_span_start account_type_name T">صنف</span>
                        <div class="dropdown_select_input_table" id=""  onclick="tableDropdownList(this, '${encodeURIComponent(JSON.stringify(dataArray))}', '${encodeURIComponent(JSON.stringify(DropDown_accounts_tableColumnsName))}', 'account_type', 'tbody_itemUniteName')"  style="min-width: 10rem;">
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
                  <!-- END dropdown -->
                  </td>
  
                  
                  <td style="display: ${is_column_Note_show}; width: auto;" class="td-inputTable_noteTd inputTable_noteTd T hover" contenteditable="true" onkeydown="td_EnterkeypressEvent1(event)"></td>
                  
                  <td style="width: auto;" class="td-amount">
                        <div class="row h_full">
                          <div class="div_input_sm  hover scroll Xitem_amount T" contenteditable="true" oninput="check_parse(this,'number'),update_table('myTable')" onkeydown="td_EnterkeypressEvent1(event)"></div>
                          <span class="input_span_end tbody_itemUniteName">الكمية</span>
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
                  
                  <td style="width: auto; margin: 0" class="span_Total_In_Table td-totalBeforTax"></td>
                  
                  <td style="width: auto;" class="td-taxHeader">
                    <!-- dropdown -->
                    <div class="dropdown_container_input_table taxHeaderDiv" id="">
                      <div class="row h_full">
                        <div class="dropdown_select_input_table" id=""  onclick="tableDropdownList(this, '${encodeURIComponent(JSON.stringify(taxHeaderArray))}', '${encodeURIComponent(JSON.stringify(DropDown_TaxHeader_tableColumnsName))}', false, false)"  style="min-width: 10rem;">
                          <div id="" class="dropdown_select_input taxHeaderInput T hover" oninput="update_table('myTable')"></div>
                          <i class="fa-solid fa-caret-down left_icon"></i>
                          <i class="fa-solid fa-xmark clear_icon" style="display: none;" onclick="clear_icon_on_table_td(event)"></i>
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

                  <td style="width: auto; margin: 0" class="span_Total_In_Table td-taxValue"></td>

                  <td style="width: auto; margin: 0" class="span_Total_In_Table td-totalAfterTax"></td>
  
  
                  <td style="width: auto;" class="td-lastTd notViewTd">
                    <div class="table_buttons_div">
                      <button onclick="deleteRow(this)" title="حذف الصف"><i class="fa-solid fa-xmark"></i></button>
                      <button onclick="copyRow(this)" title="نسخ الصف"><i class="fa-regular fa-copy"></i></button>
                    </div>
                  </td>
  `;
      table.querySelector('tbody').appendChild(emptyRow);
  
      const taxHeaderInput = emptyRow.querySelector('.taxHeaderInput');
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

 let totalsArray = []
 let totalTaxValue = 0
 let Val_beforTax = 0
 let totalAfterTax = 0
 
function update_table(str_tableName){
  try {

  const table = document.getElementById(`${str_tableName}`);
  const rows = table.querySelectorAll(`.mainTr`);
  

  
  totalsArray = []
  Val_beforTax = 0
  totalTaxValue = 0
  totalAfterTax = 0
  
  const tfoot_totalDiv_note = table.querySelector(`.tfoot_totalDiv_note`); tfoot_totalDiv_note.innerHTML = ""
  const tfoot_totalDiv_Values = table.querySelector(`.tfoot_totalDiv_Values`); tfoot_totalDiv_Values.innerHTML = ""

  function update_totalsArray (tax_account_id,str_name,val){
    if (tax_account_id){
      const obj = totalsArray.find(obj => obj.tax_account_id === tax_account_id)
      if (obj){
        obj.val = +obj.val + val;
      }else{
        totalsArray.push({tax_account_id:tax_account_id, name: str_name , val:+val})
      }
    }else{
      const obj = totalsArray.find(obj => obj.name === str_name)
      if (obj){
        obj.val = +obj.val + val;
      }else{
        totalsArray.push({name: str_name , val:+val})
      }
    }
  }



  for (const row of rows){
        
    const rowAmount = +row.querySelector(`.td-amount .Xitem_amount`).textContent || 0;
    const rowUnitePrice = +row.querySelector(`.td-unitePrice`).textContent || 0;
    const rowDiscountType = +row.querySelector(`.td-dsicount .tbody_discountType`).value || 0;
    const rowDiscountValue = +row.querySelector(`.td-dsicount .Xrow_discount_value`).textContent || 0;
    const rowTotalBeforTax = row.querySelector(`.td-totalBeforTax`);
    const rowTaxValue = row.querySelector(`.td-taxValue`);
    const rowAfterTax = row.querySelector(`.td-totalAfterTax`);


    const Xrow_discount_value =
    rowDiscountType === 1
        ? +((rowDiscountValue / 100) * (rowAmount * rowUnitePrice)).toFixed(2)
        : +rowDiscountValue.toFixed(2);
        Val_beforTax = +((rowAmount * rowUnitePrice) - Xrow_discount_value).toFixed(2);
        rowTotalBeforTax.textContent = Val_beforTax.toFixed(2)
        
        update_totalsArray(false,'الاجمالى',Val_beforTax)

        let Val_rowTax = 0;
        const taxType = +row.querySelector(`.tbody_taxType`).value || 0;
      
        if (taxType !== 0) {
          for (const taxRow of Data.taxBodyArray) {
            if (+taxRow.settings_tax_header_id === taxType) {
              const taxAccount_id = +taxRow.tax_account_id;
              // const taxAccount_name = taxRow.account_name.trim();
              const tax_name = taxRow.tax_name.trim();
              const taxRate = +taxRow.tax_rate / 100;
              const taxMultiplier = taxRow.is_tax_reverse ? -1 : 1;
              const taxValue = +(Val_beforTax * taxRate * taxMultiplier).toFixed(2);
              Val_rowTax += taxValue;
              totalTaxValue += taxValue
              update_totalsArray(taxAccount_id,tax_name,taxValue)
            }
          }
          rowTaxValue.textContent = Val_rowTax.toFixed(2)
        }else{
          rowTaxValue.textContent = 0.00
        }
    
        rowAfterTax.textContent =  (Val_beforTax + Val_rowTax).toFixed(2)
        totalAfterTax = (Val_beforTax + Val_rowTax).toFixed(2)
  }

  totalsArray.forEach((obj, index) => {

    tfoot_totalDiv_note.innerHTML += `<span style="${index === 0 ? 'font-weight: bold;' : ''}">${obj.name}</span>`
    tfoot_totalDiv_Values.innerHTML += `<span style="${index === 0 ? 'font-weight: bold;' : ''}" class="${obj.val < 0? 'color_negative' : ''}">${obj.val.toFixed(2)}</span>`
  })
  if (totalsArray.length > 1){
    tfoot_totalDiv_note.innerHTML += `<span style="font-weight: bold;font-size:1.6rem;">الاجمالى</span>`
    tfoot_totalDiv_Values.innerHTML += `<span style="font-weight: bold; font-size:1.6rem" class="totalsSpan_totalAfterTax">${(totalsArray[0].val + totalTaxValue).toFixed(2)}</span>`
  }
    
} catch (error) {
  catch_error(error)
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
                      <span class="input_span_start account_type_name T">صنف</span>
                      <div class="dropdown_select_input_table" id=""  onclick="tableDropdownList(this, '${encodeURIComponent(JSON.stringify(dataArray))}', '${encodeURIComponent(JSON.stringify(DropDown_accounts_tableColumnsName))}', 'account_type', 'tbody_itemUniteName')"  style="min-width: 10rem;">
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
                <!-- END dropdown -->
                </td>

                
                <td style="display: ${is_column_Note_show}; width: auto;" class="td-inputTable_noteTd inputTable_noteTd T hover" contenteditable="true" onkeydown="td_EnterkeypressEvent1(event)"></td>
                
                <td style="width: auto;" class="td-amount">
                      <div class="row h_full">
                        <div class="div_input_sm  hover scroll Xitem_amount T" contenteditable="true" oninput="check_parse(this,'number'),update_table('myTable')" onkeydown="td_EnterkeypressEvent1(event)"></div>
                        <span class="input_span_end tbody_itemUniteName">الكمية</span>
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
                
                <td style="width: auto; margin: 0" class="span_Total_In_Table td-totalBeforTax"></td>
                
                <td style="width: auto;" class="td-taxHeader">
                  <!-- dropdown -->
                  <div class="dropdown_container_input_table taxHeaderDiv" id="">
                    <div class="row h_full">
                      <div class="dropdown_select_input_table" id=""  onclick="tableDropdownList(this, '${encodeURIComponent(JSON.stringify(taxHeaderArray))}', '${encodeURIComponent(JSON.stringify(DropDown_TaxHeader_tableColumnsName))}', false, false)"  style="min-width: 10rem;">
                        <div id="" class="dropdown_select_input taxHeaderInput T hover" oninput="update_table('myTable')"></div>
                        <i class="fa-solid fa-caret-down left_icon"></i>
                        <i class="fa-solid fa-xmark clear_icon" style="display: none;" onclick="clear_icon_on_table_td(event)"></i>
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

                <td style="width: auto; margin: 0" class="span_Total_In_Table td-taxValue"></td>

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
let headerDataArray = [];
let bodyDataArray = [];

async function showsalesOrderData(x,type){

  try {
    
  Data = await new_fetchData_postAndGet(
    "/get_data_for_sales_order_update",
    {x,type},
    'sales_permission', 'view',
    15,
    false,false,
    true,
    false,false,
    false,false,
    false,false,false,
    false,"sales_order_view_ar",
    "An error occurred (Code: TAA1). Please check your internet connection and try again; if the issue persists, contact the administrators."
  )

  headerDataArray = Data.headerData[0];
  itemsDataArray =  Data.itemsDataArray;
  bodyDataArray =  Data.bodyData;

  
    if (!Data || !itemsDataArray || !itemsDataArray || !bodyDataArray){
      await redirection('sales_order_view_ar','fail','حدث خطأ اثتاء معالجه البيانات')
      return
    }

    build_table()
    fillTable(itemsDataArray, Data.taxHeaderArray) //! mtnsash te3del el addRow beta3 el zeror ely fe el table fe ele Buld_table() 5od de copy 7otaha henak
    
    
    //! show header data 
    const qutationId = type === 'qutation' ? x : headerDataArray.qutation_id
    
    create_drop_down_with_External_DataArray(`dropdown_div3`,Data.customersDataArray); selectedRow_dropdownDiv(`dropdown_div3`,Data.customersDataArray,headerDataArray.account_id);
    create_drop_down_with_External_DataArray(`dropdown_div`,Data.salesmanArray); selectedRow_dropdownDiv(`dropdown_div`,Data.salesmanArray,headerDataArray.salesman_id);
    create_drop_down_with_External_DataArray(`dropdown_div2`,Data.itemslocationsArray); selectedRow_dropdownDiv(`dropdown_div2`,Data.itemslocationsArray,headerDataArray.items_location_id);
    create_drop_down_with_External_DataArray(`dropdown_div4`,Data.salesQutationReferencesArray); selectedRow_dropdownDiv(`dropdown_div4`,Data.salesQutationReferencesArray,qutationId);
  

    let status = headerDataArray.is_invoiced; 
    if(status){
      reference_status.classList.add('table_green_condition')
      reference_status.textContent = 'مفوتر'
    }else{
      reference_status.classList.add('table_orange_condition')
      reference_status.textContent = 'غير مفوتر'
    }
    reference_input.value = type === 'qutation' ? "" : headerDataArray.referenceconcat
    date1.value = headerDataArray.datex
    note_inpute.value = headerDataArray.general_note
  
    is_RowNote_checkBox.checked = headerDataArray.is_row_note_show;
      tableColumn_hidden_and_show(headerDataArray.is_row_note_show,'myTable','td-inputTable_noteTd');
      is_column_Note_show = headerDataArray.is_row_note_show ? 'table-cell' : 'none';
    is_RowDiscount_checkBox.checked = headerDataArray.is_row_dicount_show;
      tableColumn_hidden_and_show(headerDataArray.is_row_dicount_show,'myTable','td-dsicount');
      is_column_discount_show = headerDataArray.is_row_dicount_show ? 'table-cell' : 'none';
    } catch (error) {
      catch_error(error)
    }
}


//#endregion