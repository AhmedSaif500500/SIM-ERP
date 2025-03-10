setActiveSidebar('hr_ar');
//check permissions
pagePermission("view", "employees_permission", "effects_permission", "departments_permission");

const departments_btn = document.querySelector(`#departments_btn`)
const employees_btn = document.querySelector(`#employees_btn`)
const effects_btn = document.querySelector(`#effects_btn`)


function showData(){
  departments_btn.style.display = style= module_display("departments_permission")
  employees_btn.style.display = style= module_display("employees_permission")
  effects_btn.style.display = style= module_display("effects_permission")
   
  departments_btn.onclick = function(){
    sessionStorage.removeItem('departments_viewArray');
    window.location.href = "/departments_view_ar";
  }
  
  employees_btn.onclick = function(){
    sessionStorage.removeItem('statement_obj');
    sessionStorage.removeItem('employees_viewArray');
    window.location.href = "/employees_view_ar";
  }
  
  effects_btn.onclick = function(){
    sessionStorage.removeItem('effects_viewArray');
    window.location.href = "/effects_view_ar";
  }
  
 
  page_content.style.display = 'flex'
}


document.addEventListener('DOMContentLoaded', function() {
  showData()
    showRedirectionReason();
  });