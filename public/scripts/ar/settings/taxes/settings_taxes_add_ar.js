
const dropdown_div = document.querySelector(`#dropdown_div`)
const inactive_select = document.querySelector(`#inactive_select`)

document.addEventListener('DOMContentLoaded', function() {
  showLoadingIcon(content_space)
  create_drop_down(`dropdown_div`,'/getAccountsDataForTaxesAdd','effects_permission','view')
 hideLoadingIcon(content_space)
});





inactive_select.onchange = function (){
  active_color(inactive_select)
}


function clear_inputs() {
  const inputs = document.querySelectorAll(`input, textarea`);
  for (const input of inputs){
    input.value = ''
  }
  inactive_select.value = 0
  active_color(inactive_select)
}
