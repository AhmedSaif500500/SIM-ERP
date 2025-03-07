setActiveSidebar('fixedAssestsMain_view_ar');
pagePermission('view','fixed_assests_permission',"accumulated_depreciation_permission","disposed_fixed_asset_permission");


const fixed_assests_btn = document.querySelector(`#fixed_assests_btn`)
const accumulated_depreciation_btn = document.querySelector(`#accumulated_depreciation_btn`)
const disposed_fixed_asset_btn = document.querySelector(`#disposed_fixed_asset_btn`)


function showData(){
  fixed_assests_btn.style.display = style= module_display("fixed_assests_permission") // 
  accumulated_depreciation_btn.style.display = style= module_display("accumulated_depreciation_permission") // 
  disposed_fixed_asset_btn.style.display = style= module_display("disposed_fixed_asset_permission") // 


  fixed_assests_btn.onclick = function(){
    sessionStorage.removeItem('statement_obj');
    sessionStorage.removeItem('fixed_assests_viewArray');
    window.location.href = "/fixed_assests_view_ar";
  }
  
  accumulated_depreciation_btn.onclick = function(){
    sessionStorage.removeItem('accumulated_depreciation_viewArray');
    window.location.href = "/accumulated_depreciation_view_ar";
  }
  
  disposed_fixed_asset_btn.onclick = function(){
    showAlert('info', 'قريباً.....')
    return
    sessionStorage.removeItem('disposed_fixed_asset_btn_Array');
    window.location.href = "/sales_invoice_view_ar";
  }

  page_content.style.display = 'flex'
}

function remove_arrays(){
  sessionStorage.removeItem('statement_obj');
  sessionStorage.removeItem('fixed_assests_viewArray');
  sessionStorage.removeItem('accumulated_depreciation_viewArray');
  sessionStorage.removeItem('disposed_fixed_asset_btn_Array');
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