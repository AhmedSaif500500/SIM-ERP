setActiveSidebar('bread_view_ar');

const date1 = document.querySelector('#date1');
const vendore_select = document.querySelector('#vendore_select');
const note_inpute = document.querySelector('#note_inpute');


date1.value = today

function update_input_table_total(input) {
  const column_index = input.closest("td").cellIndex
  console.log(column_index);
}


function handele_addrow(){
  addRows()
  updateFooter()
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
                      <span class="span_start">عدد</span>
                      <input type="search" class="input_table_normal_input_text count_amount hover" oninput="handle_input_event(this)" value="1000" autocomplete="off">
                    </div>
                  </td>

                  <td style="width: auto;" class="">
                    <div class="input_table_input_div">
                      <span class="span_start">جرام</span>
                      <input type="search" class="input_table_normal_input_text hover" oninput="handle_input_event(this)" autocomplete="off">
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

function handle_input_event(input){
  check_parse(input,'number');
  updateFooter()
}


  // استدعاء الدالة وتمرير اسم الجدول كمعلمة
  makeTableRowsDraggable('myTable');

async function add_new_bread() {

// preparing bread_header data
const datex = date1.value;
const vendore_id = vendore_select.value
const note_inpute_value = note_inpute.value.trim();

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
    "/api/bread_add",
    {vendore_id,datex,note_inpute_value,posted_array},
    'bread_permission','add',
    'هل تريد حفظ البيانات ؟',
    10,
    'bread_add_ar',
    'حدث خطأ اثناء حفظ البيانات'
  )
}

document.querySelector('#btn_save').addEventListener('click', async function (){
  await add_new_bread();
})


document.addEventListener('DOMContentLoaded', async function(){
  makeTableRowsDraggable('myTable'); // make sure that the table already loaded
 })
 



