setActiveSidebar('bread_view_ar');

let Authentication = true;
//#region  Authentication
const bread_data = JSON.parse(sessionStorage.getItem('bread_update_data'));
sessionStorage.removeItem('bread_update_data');
if (!bread_data) {
  Authentication = false;
  redirection('production_view_ar','fail','من فضلك اختر يوم الانتاج اولا للتعديل , سيتم توجيهك الى صفحه الانتاج والجرد')
};

const date1 = document.querySelector('#date1');
const vendore_id = parseInt(bread_data.vendor_id);
const vendore_select = document.querySelector('#vendore_select');
tableContainer = document.querySelector('#table-container')

date1.value = bread_data.datex;
changeSelect('vendore_select',vendore_id);




let data = [];
// let array1 = [];
// let slice_Array1 = [];

async function geteProductionData_fn() {

  //preparing data
  const h_id = parseInt(bread_data.h_id);

  //! send id and recwive data
  data =  await fetchData_postAndGet(
    "/get_bread_Data_for_update_page",
    {h_id},
    'bread_permission','update',
    10,
    false,
    '',
    'حدث خطأ اثناء معاجله البيانات',
    true
  )


 

 //! fill data

 let tableHTML = `<table id="myTable" class="input_table">
              <thead class="">
                <tr>
                  <th></th>
                  <th style="width: auto;">الكمية</th>
                  <th style="width: auto;">الوزن</th>
                  <th style="width: auto;"></th>
                </tr>
              </thead>
              <tbody class="">`;

        // إضافة صفوف الجدول بناءً على البيانات
        // slice_Array1 = ""; // تفريغ المصفوفه
        data.forEach(row => {
            tableHTML += `<tr class="">
            <td style="width: auto;" class="">
              <div class="dragbutton_table">
              <button class="drag-handle">
              <i class="fa-solid fa-arrows-up-down" style=" pointer-events: none;"></i>
              </button>
              </div>
            </td>
            <td style="width: auto;" class="">
              <div class="input_table_input_div">
                <span>عدد</span>
                <input value="${row.amount}" type="search" class="hover" oninput="handle_input_event(this)" autocomplete="off">
              </div>
            </td>
            <td style="width: auto;" class="">
              <div class="input_table_input_div">
                <span>كيلو</span>
                <input value="${row.wazn}" type="search" class="hover" oninput="handle_input_event(this)" autocomplete="off">
              </div>
            </td>
            <td style="width: 100%;" class="">
              <div class="table_buttons_div">
                <button onclick="deleteRow(this)" title="حذف الصف"><i class="fa-solid fa-xmark"></i></button>
                <button onclick="copyRow(this)" title="نسخ الصف"><i class="fa-regular fa-copy"></i></button>
              </div>
            </td>
          </tr>`;
        });

        tableHTML += `</tbody>
        <tfoot class="">
                <tr class="table_total_row">
                  <td id="lengthColumn1"></td>
                  <td id="sumColumn1" style="padding-inline-start: 2.5rem; font-weight: bold; opacity: 0.8;">0</td>
                  <td id="sumColumn2" style="padding-inline-start: 2.5rem; font-weight: bold; opacity: 0.8;">0</td>
                  <td id="sumColumn3"></td>
                </tr>
                <tr>
                  <td colspan="4" class="">
                    <div class="row x_start y_center w_full h_full" style="gap: 0.5rem; ">
                    <button onclick="addRows()" class="btn_new" style="height: 100%;">سطر جديد</button>
                    <select id="columnSelect" class="select_month m_0" style="width: fit-content; height: 2.9rem;">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                  </td>
                </tr>
              </tfoot>
`;

        // إغلاق الجدول
        tableHTML += '</table>';

        // تحديث محتوى الصفحة بناءً على البيانات
        tableContainer.innerHTML = await tableHTML;
}


function deleteRow(btn) {
  //فى حالة اذا كان صف واحد فقط
  const rows_length = parseInt(btn.closest("tbody").rows.length);
  if (rows_length === 1 ){
    showAlert('info','لايمكن حذف هذا الصف ,يمكنك حذف العمليه بالكامل بدلا من ذلك')
    return;
  }
  const row = btn.closest("tr");
  row.remove();
  updateFooter()
}


function copyRow(btn) {
  // الحصول على الصف الذي يحتوي على الزرار الذي تم النقر عليه
  const row = btn.closest("tr");

  // استنساخ الصف
  const newRow = row.cloneNode(true);

  // إدراج الصف المستنسخ بعد الصف الحالي
  row.parentNode.insertBefore(newRow, row.nextSibling);
  updateFooter()
}


function updateFooter() {
  let sum1 = 0;
  let sum2 = 0;
  const cells = document.querySelectorAll("#myTable tbody tr td div input");
  cells.forEach(function (cell) {
    let cellValue = parseFloat(cell.value);
    if (isNaN(cellValue)) {
      cellValue = 0;
    }
    const cellIndex = cell.closest("td").cellIndex;
    
    if (cellIndex === 1) {
      sum1 += cellValue;
      document.getElementById("sumColumn1").textContent = sum1;
    } else if (cellIndex === 2) {
      sum2 += cellValue;
      document.getElementById("sumColumn2").textContent = sum2;
    }
  });
}


function addRows() {
  var table = document.getElementById("myTable");
  var numRows = parseInt(document.getElementById("columnSelect").value);

  // إضافة صف جديد فارغ في نهاية الجدول
  for (var i = 0; i < numRows; i++) {
    var emptyRow = document.createElement("tr");
    emptyRow.innerHTML = `
                  <td style="width: auto;" class="">
                    <div class="dragbutton_table">
                      <button class="drag-handle">
                        <i class="fa-solid fa-arrows-up-down" style=" pointer-events: none;"></i>
                        </button>
                    </div>
                  </td>
                  <td style="width: auto;" class="">
                    <div class="input_table_input_div">
                      <span>عدد</span>
                      <input type="search" class="hover" oninput="handle_input_event(this)" autocomplete="off">
                    </div>
                  </td>
                  <td style="width: auto;" class="">
                    <div class="input_table_input_div">
                      <span>كيلو</span>
                      <input type="search" class="hover" oninput="handle_input_event(this)" autocomplete="off">
                    </div>
                  </td>
                  <td style="width: 100%;" class="">
                    <div class="table_buttons_div">
                      <button onclick="deleteRow(this)" title="حذف الصف"><i class="fa-solid fa-xmark"></i></button>
                      <button onclick="copyRow(this)" title="نسخ الصف"><i class="fa-regular fa-copy"></i></button>
                    </div>
                  </td>
`;
    table.querySelector('tbody').appendChild(emptyRow);
  }
}


function handle_input_event(input){
  check_parse(input,'number');
  updateFooter()
}


async function update_bread() {
  const datex = date1.value;
  const vendore_id = vendore_select.value
  const h_id = parseInt(bread_data.h_id);

  //preparing bread_body Data
  const tableRows = document.querySelectorAll('#myTable tbody tr');
  const posted_array = [];
  
  tableRows.forEach(row => {
      const inputs = row.querySelectorAll('input[type="search"]');
      
      if (inputs.length >= 2) { // التحقق من وجود ما لا يقل عن اثنين من العناصر input
          const amount = +inputs[0].value || 0; // في هذا السياق، علامة الجمع + تحول القيمة إلى عدد عائم. إذا كانت القيمة غير رقمية، فستعود إلى القيمة الافتراضية التي هي صفر
          const wazn = +inputs[1].value || 0; // في هذا السياق، علامة الجمع + تحول القيمة إلى عدد عائم. إذا كانت القيمة غير رقمية، فستعود إلى القيمة الافتراضية التي هي صفر
          const rowData = {
              amount: amount,
              wazn: wazn
          };
          posted_array.push(rowData);
      }
  });


  await fetchData_post1(
    "/api/bread_update",
    {h_id,vendore_id,datex,posted_array},
    'bread_permission','update',
    'هل تريد تعديل البيانات البيانات ؟',
    10,
    'bread_view_ar',
    'حدث خطأ اثناء تعديل البيانات'
  )
}

async function delete_bread() {
  
  const h_id = parseInt(bread_data.h_id);

  await fetchData_post1(
    "/api/bread_delete",
    {h_id},
    'bread_permission','delete',
    'هل تريد حذف البيانات ؟',
    10,
    'bread_view_ar',
    'حدث خطأ اثناء حذف البيانات'
  )
}




//#region events
document.addEventListener('DOMContentLoaded', async function(){
 await geteProductionData_fn();
 updateFooter()
 makeTableRowsDraggable('myTable'); // make sure that the table already loaded
})

document.querySelector('#btn_update').addEventListener('click', async function(){
  await update_bread()
})

document.querySelector('#btn_delete').addEventListener('click', async function(){
  await delete_bread()
})

//#endregion end - events