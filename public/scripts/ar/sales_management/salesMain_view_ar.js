setActiveSidebar('salesMain_view_ar');
pagePermission('view','salesman_permissions',"sales_qutation_permission","sales_order_permission","sales_invoice_permission","sales_returns_permission");


const sales_qutation_btn = document.querySelector(`#sales_qutation_btn`)
const sales_order_btn = document.querySelector(`#sales_order_btn`)
const sales_invoice_btn = document.querySelector(`#sales_invoice_btn`)
const mnadep_btn = document.querySelector(`#mnadep_btn`)
const sales_returns_btn = document.querySelector(`#sales_returns_btn`)


function showData(){
  sales_qutation_btn.style.display = style= module_display("sales_qutation_permission") // 
  sales_order_btn.style.display = style= module_display("sales_order_permission") // 
  sales_invoice_btn.style.display = style= module_display("sales_invoice_permission") // 
  mnadep_btn.style.display = style= module_display("salesman_permissions") // 
  sales_returns_btn.style.display = style= module_display("sales_returns_permission") // 

   
  sales_qutation_btn.onclick = function(){
    sessionStorage.removeItem('sales_qutation_ViewArray');
    window.location.href = "/sales_qutation_view_ar";
  }
  
  sales_order_btn.onclick = function(){
    sessionStorage.removeItem('sales_order_ViewArray');
    window.location.href = "/sales_order_view_ar";
  }
  
  sales_invoice_btn.onclick = function(){
    sessionStorage.removeItem('sales_invoice_viewArray');
    sessionStorage.removeItem('sales_order_update_data')
    window.location.href = "/sales_invoice_view_ar";
  }

  mnadep_btn.onclick = function(){
    // sessionStorage.removeItem('salesmansConditionsArray');
    window.location.href = "/salesman_view_ar";
  }
  

  sales_returns_btn.onclick = function(){
    sessionStorage.removeItem('sales_returns_ViewArray');
    window.location.href = "/sales_returns_view_ar";
  }


  page_content.style.display = 'flex'
}

function remove_arrays(){
  sessionStorage.removeItem('salesmansConditionsArray');
  sessionStorage.removeItem('sales_order_update_data');
  sessionStorage.removeItem('sales_order_ViewArray');
  sessionStorage.removeItem('sales_qutation_ViewArray');
  sessionStorage.removeItem('sales_qutation_update_data');
  sessionStorage.removeItem('sales_invoice_Array');
  sessionStorage.removeItem('sales_invoice_update_data');
  sessionStorage.removeItem('sales_returns_Array');
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