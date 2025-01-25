const closingDate_input = document.querySelector(`#closingDate_input`);
const prevent_futureDate_checkbox = document.querySelector(`#prevent_futureDate_checkbox`);
const prevent_futureDate_input = document.querySelector(`#prevent_futureDate_checkbox`);
const btn_save = document.querySelector(`#btn_save`);
const btn_production = document.querySelector(`#btn_production`);
const btn_bread = document.querySelector(`#btn_bread`);





btn_production.onclick = function(){
    // sessionStorage.removeItem(`settings_taxes_ViewArray`);
    window.location.href = `production_view_ar`;
}


btn_bread.onclick = function(){
    // sessionStorage.removeItem(`settings_taxes_ViewArray`); معلق
    window.location.href = `bread_view_ar`;
}



/*
document.addEventListener("DOMContentLoaded", async function () {
    show_data()
})
*/


