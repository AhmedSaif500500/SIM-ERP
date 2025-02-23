setActiveSidebar('purshasesMain_view_ar');
pagePermission("add","purshases_qutation_permission");


const purshases_qutation_update_data = JSON.parse(sessionStorage.getItem('purshases_qutation_update_data'));
// sessionStorage.removeItem(`purshases_qutation_update_data`)

if (!purshases_qutation_update_data){
    redirection("purshases_qutation_view_ar","fail","حدث خطأ اثناء معالجة البيانات سيتم تحويل الى صفحه الموردين الرئيسية")
}

let href_pageName = 'purshasesMain_view_ar'
let href_pageTitle = 'عروض أسعار المشتريات'

if (purshases_qutation_update_data && purshases_qutation_update_data.href_pageName){
  href_pageName = purshases_qutation_update_data.href_pageName
  href_pageTitle = purshases_qutation_update_data.href_pageTitle
}

back_href.href = href_pageName
back_href.title = href_pageTitle


const date1 = document.querySelector('#date1');
const note_inpute = document.querySelector(`#note_inpute`);
const reference_status = document.querySelector(`#reference_status`);
// const is_RowNote_checkBox = document.querySelector(`#is_RowNote_checkBox`); //!  already in purshases_qutation_multi_pages
// const is_RowDiscount_checkBox = document.querySelector(`#is_RowDiscount_checkBox`); //!  already in purshases_qutation_multi_pages
const btn_newRow = document.querySelector(`#btn_newRow`);
const table = document.querySelector(`#myTable`);


date1.value = today


document.querySelector(`#btn_update`).onclick = async function () {
  
  try {

    const permission = await btn_permission('purshases_qutation_permission', 'update');
      if (!permission){
        showAlert('warning','عفواً لا تملك الصلاحيه للتحديث')
        return
      }

  const datex = date1.value;
  const x = headerDataArray.id
  
  const vendorId = document.querySelector(`#dropdown_div3_hidden_input`).value
  if (!vendorId || isNaN(+vendorId)) {
    showAlert(`warning`, `يرجى تحديد المورد `)
    return;
  }

  // const purshasesmanId = document.querySelector(`#dropdown_div_hidden_input`).value
  // if (!purshasesmanId || isNaN(+purshasesmanId)) {
  //   showAlert(`warning`, `يرجى تحديد البائع `)
  //   return;
  // }
  

  const itemLocationId = document.querySelector(`#dropdown_div2_hidden_input`).value
  if (!itemLocationId || isNaN(+itemLocationId)) {
    showAlert(`warning`, `يرجى تحديد موقع المخزون `)
    return;
  }



  const general_note = note_inpute.value.trim()

  
  let total = 0
  if (!totalTaxValue || isNaN(totalTaxValue) || totalTaxValue === 0){
    total = totalVal_beforTax
  }else{
    total = totalAfterTax
  }
  
const is_RowDiscount = is_RowDiscount_checkBox.checked
const is_RowNote  = is_RowNote_checkBox.checked
const is_RowTax  = is_RowTax_checkBox.checked


  const tableRows = document.querySelectorAll('#myTable > tbody > .mainTr');



  const posted_array = []; // انشاء مصفوفه جديده اضع فيها بيانات كل صف
  if (tableRows.length > 0) { // التأكد من وجود بيانات داخل المصفوفه اولا

    let currentIndex = 1;
    for (const row of tableRows) {
      
      const item_typeId = parseInt(row.querySelector('.td-item_type .account_type').value);
      const item_id = parseInt(row.querySelector('.td-itemId .id_hidden_input').value);

      if (isNaN(item_id)) {
        showAlert(`warning`, `يرجى تحديد الصنف فى السطر رقم ${currentIndex}`)
        return;
      }


      const row_note = row.querySelector(`.td-inputTable_noteTd`).textContent.trim();

      const row_amount = +row.querySelector(`.td-amount .Xitem_amount`).textContent;
      if (!row_amount || isNaN(row_amount)){
        showAlert(`warning`, ` يرجى تحديد الكميه فى السطر رقم ${currentIndex}`)
        return;
      }

      const row_unitPrice = +row.querySelector(`.td-unitePrice`).textContent;
      if (!row_unitPrice || isNaN(row_unitPrice)){
        showAlert(`warning`, ` يرجى تحديد السعر فى السطر رقم ${currentIndex}`)
        return;
      }

      const row_discountTypeId = +row.querySelector(`.td-dsicount .tbody_discountType`).value;
      const row_discountValue = +row.querySelector(`.td-dsicount .tbody_discountValue`).textContent;

      
      const row_taxHeaderId = +row.querySelector('.td-taxHeader .id_hidden_input').value || "";

          

      // انشاء اوبجيكت لوضع بيانات الخلايا فيه  ثم اضافة الاوبجيكت الى عناصر المصفوفه الفارغه
      const rowData = {
        item_typeId :item_typeId,
        item_id: item_id,
        row_note: row_note,
        row_amount: row_amount,
        row_unitPrice: row_unitPrice,
        row_discountTypeId: row_discountTypeId,
        row_discountValue: row_discountValue,
        row_taxHeaderId: row_taxHeaderId,
      };
      posted_array.push(rowData); // اضافة الاوبجيكت الى عناصر المصفوفه
      currentIndex++; // زيادة العدّاد بعد كل تكرار
    }

    const posted_Obj = {x,vendorId, total, datex,itemLocationId, is_RowNote, is_RowDiscount, general_note, is_RowTax, posted_array}


      const post = await new_fetchData_postAndGet(
        "/api/purshases_qutation_update",
        posted_Obj,
        'purshases_qutation_permission', 'update', // معلق
        60,
        true,"هل تريد تحديث بيانات عرض سعر الشراء ؟",
        true,
        false,false,false,false,false,
        true,href_pageName,
        true,href_pageName,
         "An error occurred (Code: TAA2). Please check your internet connection and try again; if the issue persists, contact the administrators."
      )

    // if (post){
    //   sessionStorage.removeItem('purshases_qutation_ViewArray')
    // }
    

  } else {
    showAlert('fail', 'لا توجد بيانات')
    return
  }
} catch (error) {
  catch_error(error)
}
}


document.querySelector(`#btn_delete`).onclick = async function () {
  try {
    const permission = await btn_permission('purshases_qutation_permission', 'delete') // معلق
    if (!permission){
      showAlert('warning','عفواً لا تملك الصلاحيه للتحديث')
      return
    }

const x = headerDataArray.id

const post = await new_fetchData_postAndGet(
  "/api/purshases_qutation_delete",
  {x},
  'purshases_qutation_permission', 'delete',
  15,
  true,"هل تريد حذف بيانات عرض سعر الشراء ؟",
  true,
  false,false,false,false,false,
  true,href_pageName,
  true,href_pageName,
   "An error occurred (Code: TAA2). Please check your internet connection and try again; if the issue persists, contact the administrators."
)

// if (post){
// sessionStorage.removeItem('purshases_qutation_ViewArray')
// }


  } catch (error) {
    catch_error(error)
  }
}

function showHeaderData(){




  let status = +headerDataArray.qutation_status;
            
  if(status === true){
    reference_status.classList.add('table_green_condition')
    reference_status.textContent = 'مقبول'
  }else if(status === false){
    reference_status.classList.add('table_red_condition')
    reference_status.textContent = 'مرفوض'
  }else{
    reference_status.classList.add('table_orange_condition')
    reference_status.textContent = 'معلق'
  }

    
  reference_input.value = headerDataArray.referenceconcat;

  date1.value = headerDataArray.datex
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

}

async function get_Data_for_update_page_fn(x) {

  data_accounts = await new_fetchData_postAndGet(
    "/get_data_for_purshases_qutation_update",
    {x},
    'purshases_qutation_permission', 'update',
    60,
    false,false,
    true,
    false,false,
    false,false,
    false,false,false,
    true,"purshases_qutation_view_ar",
    "An error occurred (Code: pqu1). Please check your internet connection and try again; if the issue persists, contact the administrators."
  )
return data_accounts
};




document.addEventListener('DOMContentLoaded', async function () {
  try {
  showLoadingIcon(content_space)
    const x = purshases_qutation_update_data.x
  Data =  await get_Data_for_update_page_fn(x)

  itemslocationsArray =  Data.itemslocationsArray
  taxHeaderArray =  Data.taxHeaderArray
  settings_tax_header_id_Array =  Data.settings_tax_header_id_Array
  taxBodyArray =  Data.taxBodyArray
  itemsDataArray =  Data.itemsDataArray
  vendorsDataArray =  Data.vendorsDataArray
  headerDataArray =  Data.headerDataArray
  bodyDataArray =  Data.bodyDataArray

  
    
    if (!Data || !itemsDataArray || !headerDataArray || !bodyDataArray){

      await redirection('purshases_qutation_view_ar','fail','حدث خطأ اثتاء معالجه البيانات')
      return
    }
    
    build_table()
  fillTable(itemsDataArray, taxHeaderArray) //! mtnsash te3del el addRow beta3 el zeror ely fe el table fe ele Buld_table() 5od de copy 7otaha henak
  
  create_drop_down_with_External_DataArray(`dropdown_div3`,vendorsDataArray); selectedRow_dropdownDiv(`dropdown_div3`,vendorsDataArray,headerDataArray.account_id);
  // create_drop_down_with_External_DataArray(`dropdown_div`,purshasesmanArray); selectedRow_dropdownDiv(`dropdown_div`,purshasesmanArray,headerDataArray.purshasesman_id);
  create_drop_down_with_External_DataArray(`dropdown_div2`,itemslocationsArray); selectedRow_dropdownDiv(`dropdown_div2`,itemslocationsArray,headerDataArray.items_location_id);

  showHeaderData()
  viewMode(true,'purshases_qutation_permission','view')
  handle_fn_options()
  makeTableRowsDraggable('myTable'); // make sure that the table already loaded
  hideLoadingIcon(content_space)
} catch (error) {
  hideLoadingIcon(content_space)
  catch_error(error)
}
})


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
                      <div class="dropdown_select_input_table" id=""  onclick="tableDropdownList(this, '${encodeURIComponent(JSON.stringify(dataArray))}', '${encodeURIComponent(JSON.stringify(DropDown_accounts_tableColumnsName))}', 'account_type', 'purshasesInvoiceForm')"  style="min-width: 10rem;">
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
                      <div class="inputTable_dropdown_tableContainer scroll" id="">
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
  
}

function handle_fn_options(){
  const newDivs = `
    <div id="fn_option_update_btn" onclick="viewMode(false,'purshases_qutation_permission','update')">وضع التعديل</div>
    <div id="fn_option_view_btn" onclick="viewMode(true,'purshases_qutation_permission','view')" style="display: none;">وضع العرض</div>
    <div onclick="createpurshasesOrder()">انشاء امر شراء</div>
    <div onclick="createpurshasesInvoice()">انشاء فاتوره مشتريات</div>
    <div onclick="rejectَQutation()">رفض</div>
  `;
  fn_options_div.insertAdjacentHTML('afterbegin', newDivs);
}



async function createpurshasesOrder(){
  try {

    const permission = await btn_permission('purshases_order_permission', 'add') // معلق
    if (!permission){
      showAlert('warning','عفواً لا تملك الصلاحيه')
      return
    }

    await showDialog('', `سيتم تحويلك الى صفحة انشاء امر شراء , هل تريد المتابعه؟`, '');        
    if (!dialogAnswer) {
      return false;
    }
    const purshases_qutation_update_data = {
      x: headerDataArray.id,
      href_pageName : `purshases_qutation_update_ar`,
      href_pageTitle : 'تحديث أمر شراء',
      qutationToOrder: true
    };
    sessionStorage.removeItem('purshases_order_update_data')
    sessionStorage.setItem('purshases_order_update_data', JSON.stringify(purshases_qutation_update_data));                            
    window.location.href = `purshases_order_add_ar`;
  } catch (error) {
    catch_error(error)
  }
}

async function createpurshasesInvoice(){
  try {

    const permission = await btn_permission('purshases_invoice_permission', 'add') // معلق
    if (!permission){
      showAlert('warning','عفواً لا تملك الصلاحيه')
      return
    }

    await showDialog('', `سيتم تحويلك الى صفحة انشاء فواتير المشتريات , هل تريد المتابعه؟`, '');        
    if (!dialogAnswer) {
      return false;
    }

    const purshases_qutation_update_data = {
      x: headerDataArray.id,
      href_pageName : `purshases_qutation_update_ar`,
      href_pageTitle : 'تحديث أمر شراء',
      qutationToInvoice: true
    };
    sessionStorage.removeItem('purshases_invoice_update_data')
    sessionStorage.setItem('purshases_invoice_update_data', JSON.stringify(purshases_qutation_update_data));                            
    window.location.href = `purshases_invoice_add_ar`;
  } catch (error) {
    catch_error(error)
  }
}


async function rejectَQutation(){
try {
  

    // معلق  -- هنا هنحتاج نعنمل صلاحسات الرفض ونعمل هييستورى
  const x = headerDataArray.id;
  const datex = date1.value;


  const post = await new_fetchData_postAndGet(
    "/api/purshases_qutation_reject",
    {x,datex},
    'purshases_qutation_permission', 'update',   // معلق
    60,
    true,"هل تريد رفض عرض السعر الحالى ؟",
    true,
    false,false,
    false,false,
    false,
    true,href_pageName,
    true,href_pageName,
    "An error occurred (Code: TAA1). Please check your internet connection and try again; if the issue persists, contact the administrators."
  )
} catch (error) {
  catch_error(error)
}
}
