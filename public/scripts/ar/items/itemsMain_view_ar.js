setActiveSidebar('itemsMain_view_ar');
pagePermission("view", "items_permission", "itemsLocations_permission", "services_permission");

const items_btn = document.querySelector(`#items_btn`)
const itemsLocations_btn = document.querySelector(`#itemsLocations_btn`)
const services_btn = document.querySelector(`#services_btn`)


function showData(){
    items_btn.style.display = style= module_display("items_permission")
    itemsLocations_btn.style.display = style= module_display("itemsLocations_permission")
    services_btn.style.display = style= module_display("services_permission")
   

    items_btn.onclick = function(){
    sessionStorage.removeItem('itemsViewArray');
    window.location.href = "/items_view_ar";
  }
  
  itemsLocations_btn.onclick = function(){
    sessionStorage.removeItem('itemsLocationsViewArray');
    window.location.href = "/itemsLocations_view_ar";
  }
  
  services_btn.onclick = function(){
    sessionStorage.removeItem('services_Array');
    window.location.href = "/services_view_ar";
  }

  page_content.style.display = 'flex'
}


document.addEventListener('DOMContentLoaded', function() {
  showData()
    showRedirectionReason();
  });