setActiveSidebar('purshasesMain_view_ar');
pagePermission('view', 'sales_permission','salesman_permissions'); // معلق



const purshases_qutation_btn = document.querySelector(`#purshases_qutation_btn`)
const purshases_order_btn = document.querySelector(`#purshases_order_btn`)
const purshases_invoice_btn = document.querySelector(`#purshases_invoice_btn`)
// const mnadep_btn = document.querySelector(`#mnadep_btn`)


function showData(){
  purshases_qutation_btn.style.display = style= module_display("purshases_permission") // معلق
  purshases_order_btn.style.display = style= module_display("purshases_permission") // معلق
  purshases_invoice_btn.style.display = style= module_display("purshases_permission") // معلق
  // mnadep_btn.style.display = style= module_display("salesman_permissions") // معلق
   
  purshases_qutation_btn.onclick = function(){
    sessionStorage.removeItem('purshases_qutation_Array');
    window.location.href = "/purshases_qutation_view_ar";
  }
  
  purshases_order_btn.onclick = function(){
    sessionStorage.removeItem('purshases_order_Array');
    window.location.href = "/purshases_order_view_ar";
  }
  
  purshases_invoice_btn.onclick = function(){
    sessionStorage.removeItem('purshases_invoice_Array');
    window.location.href = "/purshases_invoice_view_ar";
  }

  // mnadep_btn.onclick = function(){
  //   // sessionStorage.removeItem('salesmansConditionsArray');
  //   window.location.href = "/salesman_view_ar";
  // }
  
  page_content.style.display = 'flex'
}

function remove_arrays(){
  // sessionStorage.removeItem('salesmansConditionsArray');
  sessionStorage.removeItem('purshases_order_update_data');
  sessionStorage.removeItem('purshases_order_Array');
  sessionStorage.removeItem('purshases_qutation_Array');
  sessionStorage.removeItem('purshases_qutation_update_data');
  sessionStorage.removeItem('purshases_invoice_Array');
  sessionStorage.removeItem('purshases_invoice_update_data');
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