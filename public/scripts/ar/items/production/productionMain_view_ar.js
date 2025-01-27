setActiveSidebar('itemsMain_view_ar');
pagePermission("view", "production_permissions");

const forms_btn = document.querySelector(`#forms_btn`)
const orders_btn = document.querySelector(`#orders_btn`)



function showData(){
  
  forms_btn.style.display = style= module_display("production_permission")
  orders_btn.style.display = style= module_display("production_permission")


  forms_btn.onclick = function(){
    sessionStorage.removeItem('production_forms_ViewArray');
    window.location.href = "/production_forms_view_ar";
  }
  
  orders_btn.onclick = function(){
    sessionStorage.removeItem('production_order_ViewArray');
    window.location.href = "/production_order_view_ar";
  }
  
  page_content.style.display = 'flex'
}


document.addEventListener('DOMContentLoaded', function() {
  showData()
    showRedirectionReason();
  });