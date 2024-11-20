const dropdown_div = document.querySelector(`#dropdown_div`)
document.addEventListener('DOMContentLoaded', function() {
  showLoadingIcon(content_space)
  create_drop_down(`dropdown_div`,'/getEmployeesData1','effects_permission','view')
  create_drop_down(`dropdown_div2`,'/getEmployeesData1','effects_permission','view')
 hideLoadingIcon(content_space)
});


