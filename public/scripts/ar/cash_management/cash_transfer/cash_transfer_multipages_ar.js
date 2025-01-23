
const note_inpute = document.querySelector(`#note_inpute`);
const date1 = document.querySelector('#date1');
const value_input = document.querySelector('#value_input');
const dropdown_div1 = document.querySelector(`#dropdown_div1`)
const dropdown_div2 = document.querySelector(`#dropdown_div2`)


let Data = [];
let itemsLocationsArray = [];
let itemsArray = [];
let haderDataArray = [];
let bodyDataArray = [];



async function getCash() {

  const empty = 1
  const data1 = await new_fetchData_postAndGet(
    "/getCash",
    {empty},
    'cash_transfer_permission', 'view',
    15,
    false,false,
    true,
    false,false,
    false,false,
    false,false,false,
    false,"cash_transfer_view_ar",
    "An error occurred (Code: TAA1). Please check your internet connection and try again; if the issue persists, contact the administrators."
  )
  
return data1
};


async function get_cash_transfer_data_for_update(x) {

  const data1 = await new_fetchData_postAndGet(
    "/get_cash_transfer_data_for_update",
    {x},
    'cash_transfer_permission', 'view',
    15,
    false,false,
    true,
    false,false,
    false,false,
    false,false,false,
    false,"cash_transfer_view_ar",
    "An error occurred (Code: TAA1). Please check your internet connection and try again; if the issue persists, contact the administrators."
  )
  
return data1
};


async function get_items_transfer_main_data() {
  // معلق
  data_accounts = await new_fetchData_postAndGet(
    "/items_transfer_main_data",
    {},
    'items_transfer_permission', 'add',
    15,
    false,false,
    true,
    false,false,
    false,false,
    false,false,false,
    true,"items_transfer_view_ar",
    "An error occurred (Code: TAA1). Please check your internet connection and try again; if the issue persists, contact the administrators."
  )
return data_accounts
};

