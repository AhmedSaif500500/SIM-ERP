setActiveSidebar('purshasesMain_view_ar');
pagePermission('view', 'purshases_qutation_permission','purshases_order_permission','purshases_invoice_permission', 'purshases_returns_permission'); 



const purshases_qutation_btn = document.querySelector(`#purshases_qutation_btn`)
const purshases_order_btn = document.querySelector(`#purshases_order_btn`)
const purshases_invoice_btn = document.querySelector(`#purshases_invoice_btn`)
const purshases_returns_btn = document.querySelector(`#purshases_returns_btn`)
// const mnadep_btn = document.querySelector(`#mnadep_btn`)


function showData(){
  purshases_qutation_btn.style.display = style= module_display("purshases_qutation_permission") // 
  purshases_order_btn.style.display = style= module_display("purshases_order_permission") // 
  purshases_invoice_btn.style.display = style= module_display("purshases_invoice_permission") // 
  purshases_returns_btn.style.display = style= module_display("purshases_returns_permission") // 
  // mnadep_btn.style.display = style= module_display("salesman_permissions") // 
   
  purshases_qutation_btn.onclick = function(){
    sessionStorage.removeItem('purshases_qutation_ViewArray');
    window.location.href = "/purshases_qutation_view_ar";
  }
  
  purshases_order_btn.onclick = function(){
    sessionStorage.removeItem('purshases_order_ViewArray');
    window.location.href = "/purshases_order_view_ar";
  }
  
  purshases_invoice_btn.onclick = function(){
    sessionStorage.removeItem('purshases_invoice_ViewArray');
    window.location.href = "/purshases_invoice_view_ar";
  }

  purshases_returns_btn.onclick = function(){
    sessionStorage.removeItem('purshases_returns_ViewArray');
    window.location.href = "/purshases_returns_view_ar";
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
  sessionStorage.removeItem('purshases_order_ViewArray');
  sessionStorage.removeItem('purshases_qutation_ViewArray');
  sessionStorage.removeItem('purshases_qutation_update_data');
  sessionStorage.removeItem('purshases_invoice_ViewArray');
  sessionStorage.removeItem('purshases_invoice_update_data');
  sessionStorage.removeItem('purshases_returns_ViewArray');
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