setActiveSidebar('report_map_ar');
//pagePermission('view','salesman_permissions',"sales_qutation_permission","sales_order_permission","sales_invoice_permission","sales_returns_permission");


//! statement_div
const finance_statemebt_dive = document.querySelector(`#finance_statemebt_dive`)
const account_statment = document.querySelector(`#account_statment`)
const trial_balance = document.querySelector(`#trial_balance`)
const finance_statement = document.querySelector(`#finance_statement`)
const income_statement_view_ar = document.querySelector(`#income_statement_view_ar`)

//! stock
const stock_div = document.querySelector(`#stock_div`)
const stock_location_report_btn = document.querySelector(`#stock_location_report_btn`)
const item_movement_report_btn = document.querySelector(`#item_movement_report_btn`)
const stock_cost_and_items_btn = document.querySelector(`#stock_cost_and_items_btn`)


//! hr
const hr_div = document.querySelector(`#hr_div`)
const effects_report1_report_btn = document.querySelector(`#effects_report1_report_btn`)
const effects_report2_report_btn = document.querySelector(`#effects_report2_report_btn`)

//! sales_div


function showData(){
  finance_statemebt_dive.style.display = style= module_display("accounts_permission") // معلق
  trial_balance.style.display = style= module_display("accounts_permission") // معلق
  finance_statement.style.display = style= module_display("accounts_permission") // معلق
  income_statement_view_ar.style.display = style= module_display("accounts_permission") // معلق
  account_statment.style.display = style= module_display("accounts_permission") // معلق
  stock_location_report_btn.style.display = style= module_display("items_permission") // معلق
  item_movement_report_btn.style.display = style= module_display("items_permission") // معلق
  stock_cost_and_items_btn.style.display = style= module_display("items_permission") // معلق

   
  account_statment.onclick = function(){
    sessionStorage.removeItem('accountStatement_view_Array');
    sessionStorage.removeItem('obj_statement');
    window.location.href = "/account_statement_view_ar";
  }

  trial_balance.onclick = function(){
    sessionStorage.removeItem('trial_balance_viewArray');
    window.location.href = "/trial_balance_view_ar";
  }
  
  finance_statement.onclick = function(){
    sessionStorage.removeItem('finance_statement_viewArray');
    window.location.href = "/finance_statement_view_ar";
  }
  
  income_statement_view_ar.onclick = function(){
    sessionStorage.removeItem('income_statement_viewArray');
    window.location.href = "/income_statement_view_ar";
  }
  
  stock_location_report_btn.onclick = function(){
    sessionStorage.removeItem('stock_location_viewArray');
    window.location.href = "/stock_location_view_ar";
  }
  

  item_movement_report_btn.onclick = function(){
    sessionStorage.removeItem('item_movement_viewArray');
    sessionStorage.removeItem('obj_item_movement');
    window.location.href = "/item_movement_view_ar";
  }

  stock_cost_and_items_btn.onclick = function(){
    sessionStorage.removeItem('stock_cost_and_items_viewArray');
    sessionStorage.removeItem('obj_stock_cost_and_items');
    window.location.href = "/stock_cost_and_items_view_ar";
  }


  effects_report1_report_btn.onclick = function(){
    sessionStorage.removeItem('effects_statement_viewArray');
    sessionStorage.removeItem('obj_effects_statement');
    window.location.href = "/effects_statement_view_ar";
  }


  effects_report2_report_btn.onclick = function(){
    sessionStorage.removeItem('aggregated_effects_viewArray');
    sessionStorage.removeItem('obj_aggregated_effects');
    window.location.href = "/aggregated_effects_view_ar";
  }

  page_content.style.display = 'flex'
}

/*
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
  */


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