setActiveSidebar('fixedAssestsMain_view_ar');
pagePermission("view","accumulated_depreciation_permission");


const accumulated_depreciation_update_data = JSON.parse(sessionStorage.getItem('accumulated_depreciation_update_data'));
// sessionStorage.removeItem(`purshases_invoice_update_data`)

if (!accumulated_depreciation_update_data){
    redirection("accumulated_depreciation_view_data","fail","حدث خطأ اثناء معالجة البيانات سيتم تحويل الى صفحه الاهلاكات الرئيسية")
}

let href_pageName = 'fixedAssestsMain_view_ar'
let href_pageTitle = 'إدارة الأصول الثابتة'

if (accumulated_depreciation_update_data && accumulated_depreciation_update_data.href_pageName){
  href_pageName = accumulated_depreciation_update_data.href_pageName
  href_pageTitle = accumulated_depreciation_update_data.href_pageTitle
}

back_href.href = href_pageName
back_href.title = href_pageTitle

 date1.value = today
// const is_RowNote_checkBox = document.querySelector(`#is_RowNote_checkBox`); //!  already in sales_qutation_multi_pages
// const is_RowDiscount_checkBox = document.querySelector(`#is_RowDiscount_checkBox`); //!  already in sales_qutation_multi_pages
const btn_update = document.querySelector(`#btn_update`);
const btn_delete = document.querySelector(`#btn_delete`);
const table = document.querySelector(`#myTable`);

date1.value = today


btn_update.onclick = async function(){
  try {
    const x = haderDataArray.id
    const datex = date1.value;
    const startDate = start_date_input.value;
    const endDate = end_date_input.value;
    const note = note_inpute.value.trim()
    const tableRows = document.querySelectorAll('#myTable > tbody > .mainTr');

    const posted_array = []; 
    if (tableRows.length > 0) { 
      let currentIndex = 1;
      for (const row of tableRows) {
        
        const account_id = parseInt(row.querySelector('.id_hidden_input').value);
        const depreciation_value = row.querySelector('.td-value').textContent;
        
  
        if (!account_id ||isNaN(account_id)) {
          showAlert(`warning`, `يرجى تحديد الاصل فى السطر رقم ${currentIndex}`)
          return;
        }
  
        if (!depreciation_value || isNaN(depreciation_value)){
          showAlert(`warning`, ` يرجى تحديد فيمة الاهلاك فى السطر رقم ${currentIndex}`)
          return;
        }
  
        // انشاء اوبجيكت لوضع بيانات الخلايا فيه  ثم اضافة الاوبجيكت الى عناصر المصفوفه الفارغه
        const rowData = {
          account_id :account_id,
          depreciation_value: depreciation_value,
        };
        posted_array.push(rowData); // اضافة الاوبجيكت الى عناصر المصفوفه
        currentIndex++; // زيادة العدّاد بعد كل تكرار
      }
  
        const post = await new_fetchData_postAndGet(
          "/api/accumulated_depreciation_update",
          {x, datex, startDate, endDate, note, posted_array},
          'accumulated_depreciation_permission', 'update',
          60,
          true,"هل تريد تعديل  بيانات إهلاكات الاصول الثابتة؟",
          true,
          false,false,
          false,false,false,
          true,href_pageName,
          true,href_pageName,
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

const datex = date1.value
btn_delete.onclick = async function () {
  try {
    const x = haderDataArray.id
    const post = await new_fetchData_postAndGet(
      "/api/accumulated_depreciation_delete",
      {x, datex},
      'accumulated_depreciation_permission', 'delete',
      60,
      true,"هل تريد تعديل  بيانات إهلاكات الاصول الثابتة؟",
      true,
      false,false,
      false,false,false,
      true,href_pageName,
      true,href_pageName,
       "An error occurred (Code: TAA2). Please check your internet connection and try again; if the issue persists, contact the administrators."
    )
  } catch (error) {
    catch_error(error)
  }
}

document.addEventListener('DOMContentLoaded', async function () {
  try {

  showLoadingIcon(content_space)

  const x = accumulated_depreciation_update_data.x

  Data =  await get_calculated_depreacation_data_for_update(x)
  
  if (!Data || !Data.haderDataArray || !Data.bodyDataArray || !Data.fixedAssestsAccounts){
    redirection('accumulated_depreciation_view_ar', 'fail', 'حدث خطأ اثناء معالجة البيانات : سيتم تحويلك الى صفحة الاهلاكات الرئيسية')
    return;
  }

  haderDataArray = Data.haderDataArray;
  bodyDataArray = Data.bodyDataArray;
  assestsAccountsArray = Data.fixedAssestsAccounts;

    



  date1.value = haderDataArray.datex;
  reference_input.value = haderDataArray.referenceconcat;
  start_date_input.value = haderDataArray.started_date;
  end_date_input.value = haderDataArray.end_date;
  note_inpute.value = haderDataArray.general_note;

  build_table()
  fillTable(assestsAccountsArray)
  
  viewMode(true,'accumulated_depreciation_permission','view')
  handle_fn_options()
  //makeTableRowsDraggable('myTable'); // make sure that the table already loaded
  hideLoadingIcon(content_space)
} catch (error) {
  hideLoadingIcon(content_space)
  catch_error(error)
}
})


function handle_fn_options(){  
  const newDivs = `
    <div id="fn_option_update_btn" onclick="viewMode(false,'accumulated_depreciation_permission','update')">وضع التعديل</div>
    <div id="fn_option_view_btn" onclick="viewMode(true,'accumulated_depreciation_permission','view')" style="display: none;">وضع العرض</div>
  `;
  fn_options_div.insertAdjacentHTML('afterbegin', newDivs);
}
