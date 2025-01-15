let is_multiTaxes = false
function build_table(){
    table.querySelector('thead').innerHTML  = `
              <tr>
                <th style="width: auto;"></th>
                <th style="width: auto;">البيان</th>
                <th style="width: auto;">المعدل</th>
                <th style="width: auto;">النوع</th>
                <th style="width: auto; text-align: center;">الحساب</th>
                <th style="display: ${is_multiTaxes? 'table-cell' : 'none'}; width: auto;" class="hiddenCell"></th>
              </tr>
                
                `;
  }
  
  function td_EnterkeypressEvent1(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // يمنع السطر الجديد
    }
}
  


//#region accounts Data in dropdown select
let data_accounts = [];
let data_filterd = []
let array_accounts = [];
let slice_Array_accounts = [];


// تحضير البيانات من السيرفر
async function getAccounsData_fn() {

  data_accounts = await new_fetchData_postAndGet(
    "/getAccountsDataForTaxesAdd",
    {},
    'pass', 'pass',
    15,
    false,false,
    true,
    false,false,
    false,false,
    false,false,false,
    true,"settings_taxes_view_ar",
    "An error occurred (Code: TAA1). Please check your internet connection and try again; if the issue persists, contact the administrators."
  )

};


//#endregion


function fill_filtered_data_accounts_Array(event) {
  try {
    event.stopPropagation(); // منع انتقال الحدث إلى العنصر الأب
    const clickedIcon = event.target;
    const mainRow = clickedIcon.closest(`.mainTr`);

    const DropDown_accounts_tableColumnsName = ['id', 'account_name'];
    
    // استدعاء tableDropdownList بعد التحديث
    tableDropdownList(
      clickedIcon.closest('.dropdown_select_input_table'),
      encodeURIComponent(JSON.stringify(data_accounts || [])),
      encodeURIComponent(JSON.stringify(DropDown_accounts_tableColumnsName)),
      false,
      'taxes'
    );
  } catch (error) {
    catch_error(error);
  }
}