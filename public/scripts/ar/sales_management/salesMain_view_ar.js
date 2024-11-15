setActiveSidebar('salesMain_view_ar');
pagePermission('view', 'sales_permission','salesman_permissions');


const sales_btn = document.querySelector(`#sales_btn`)
const mnadep_btn = document.querySelector(`#mnadep_btn`)


function showData(){
  sales_btn.style.display = style= module_display("sales_permission")
  mnadep_btn.style.display = style= module_display("salesman_permissions")
   
  sales_btn.onclick = function(){
    sessionStorage.removeItem('salesViewArray');
    window.location.href = "/sales_view_ar";
  }
  
  mnadep_btn.onclick = function(){
    // sessionStorage.removeItem('salesmansConditionsArray');
    window.location.href = "/salesman_view_ar";
  }
  
  page_content.style.display = 'flex'
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