setActiveSidebar('cashMain_view_ar');
pagePermission('view','cash_accounts_permission',"cash_transaction_permission","checks_permission");


const cash_accounts_btn = document.querySelector(`#cash_accounts_btn`)
const cash_rc_btn = document.querySelector(`#cash_rc_btn`)
const cash_pv_btn = document.querySelector(`#cash_pv_btn`)
const cash_transfer_btn = document.querySelector(`#cash_transfer_btn`)
const checks_btn = document.querySelector(`#checks_btn`)


function showData(){
  cash_accounts_btn.style.display = style= module_display("cash_accounts_permission") // 
  cash_rc_btn.style.display = style= module_display("cash_transaction_permission") // 
  cash_pv_btn.style.display = style= module_display("cash_transaction_permission") // 
  cash_transfer_btn.style.display = style= module_display("cash_transaction_permission") // 
  checks_btn.style.display = style= module_display("checks_permission") // 


  cash_accounts_btn.onclick = function(){
    sessionStorage.removeItem('cash_accounts_ViewArray');
    window.location.href = "/cash_accounts_view_ar";
  }
  
  cash_rc_btn.onclick = function(){
    sessionStorage.removeItem('cash_rc_ViewArray');
    window.location.href = "/cash_rc_view_ar";
  }
 
  
  cash_pv_btn.onclick = function(){
    sessionStorage.removeItem('cash_pv_ViewArray');
    window.location.href = "/cash_pv_view_ar";
  }


    
  cash_transfer_btn.onclick = function(){
    sessionStorage.removeItem('cashTransferViewArray');
    window.location.href = "/cash_transfer_view_ar";
  }


  
  checks_btn.onclick = function(){
    showAlert('info', 'قريباً.....')
    return
    sessionStorage.removeItem('checks_btn_Array');
    window.location.href = "/sales_invoice_view_ar";
  }

  page_content.style.display = 'flex'
}

function remove_arrays(){
  sessionStorage.removeItem('cash_accounts_ViewArray');
  sessionStorage.removeItem('cash_rc_ViewArray');
  sessionStorage.removeItem('cash_pv_ViewArray');
  sessionStorage.removeItem('cash_transfer_ViewArray');
  sessionStorage.removeItem('checks_btn_Array');
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