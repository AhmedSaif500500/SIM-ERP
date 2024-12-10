setActiveSidebar('salesMain_view_ar');
pagePermission('view', 'sales_permission','salesman_permissions');


const sales_qutation_btn = document.querySelector(`#sales_qutation_btn`)
const sales_order_btn = document.querySelector(`#sales_order_btn`)
const sales_invoice_btn = document.querySelector(`#sales_invoice_btn`)
const mnadep_btn = document.querySelector(`#mnadep_btn`)


function showData(){
  sales_qutation_btn.style.display = style= module_display("sales_permission") // معلق
  sales_order_btn.style.display = style= module_display("sales_permission") // معلق
  sales_invoice_btn.style.display = style= module_display("sales_permission") // معلق
  mnadep_btn.style.display = style= module_display("salesman_permissions") // معلق
   
  sales_qutation_btn.onclick = function(){
    sessionStorage.removeItem('sales_qutation_Array');
    window.location.href = "/sales_qutation_view_ar";
  }
  
  sales_order_btn.onclick = function(){
    sessionStorage.removeItem('sales_order_Array');
    window.location.href = "/sales_order_view_ar";
  }
  

  mnadep_btn.onclick = function(){
    // sessionStorage.removeItem('salesmansConditionsArray');
    window.location.href = "/salesman_view_ar";
  }
  
  page_content.style.display = 'flex'
}

function remove_arrays(){
  sessionStorage.removeItem('salesmansConditionsArray');
  sessionStorage.removeItem('sales_order_update_data');
  sessionStorage.removeItem('sales_order_Array');
  sessionStorage.removeItem('sales_qutation_Array');
  sessionStorage.removeItem('sales_qutation_update_data');
}


document.addEventListener('DOMContentLoaded', function() {
  try {
    showLoadingIcon(content_space)
    showData()
    showRedirectionReason();
    hideLoadingIcon(content_space)
  } catch (error) {
    catch_error(error)
  }
  });