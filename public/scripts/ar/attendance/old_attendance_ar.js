
setActiveSidebar('attendance_ar');
const numberInput = document.querySelector("#numberInput");
const upArrow = document.querySelector("#upArrow");
const downArrow = document.querySelector("#downArrow");

//#region datepicker

//#endregion end DatePicker

//#region : Number_Inpt_Arrow

function upArrow_fn(params) {
  numberInput.value = parseFloat(numberInput.value) + 0.25;
  numberInputColor();
}

function downArrow_fn(params) {
  numberInput.value = parseFloat(numberInput.value) - 0.25;
  numberInputColor();
}

function numberInputColor(params) {
  const value = parseFloat(numberInput.value);

  if (value > 0) {
    numberInput.style.backgroundColor = "lightGreen";
  } else if (value < 0) {
    numberInput.style.backgroundColor = "lightcoral";
  } else {
    numberInput.style.backgroundColor = "aliceblue";
  }
}

upArrow.addEventListener("click", upArrow_fn);
downArrow.addEventListener("click", downArrow_fn);

//#endregion : Number_Inpt_Arrow

//#region  save saveAttendance

async function saveAttendance() {
  /* HOW TO USE
    1 : hena fe el object data da han7ot el variables ely haytem ersalha ela el server 
    2 : variable : value of variable ---- zay ay 7aga da5el object
    3 : @ 5aly balk en lazem ykon el variable name hena how nafso ely fe saf7t el server fe goz2 [const { id_hidden_input, numberInput } = req.body;] 3ashan ytm est2pal el data sa7
    4 : 5aly balak mn esm el /addNewAttendance fe function fetch hena -- lazem ykon motapk [app.post('/addNewAttendance', (req, res) => {] fe el server
   */

  //#region validation

  const id_hidden_input = document.getElementById("id_hidden_input").value;
  const numberNote = document.getElementById("numberNote").value.trim();
  const datepicker = document.getElementById("datepicker").value;
  const numberInput = document.getElementById("numberInput").value;

  // check datepicker
  if (!datepicker) {
    alert(`برجاء ادخال التاريخ`);
    console.log(`برجاء اختيار التاريخ`);
    return;
  }

  // check id_hidden_input
  if (!id_hidden_input) {
    alert(`برجاء اختيار اسم الموظف`);
    console.log(`برجاء اختيار اسم الموظف`);
    return;
  }

  // check numberNote
  if (!numberNote) {
    alert(`برجاء ادخال بيان للعمليه`);
    console.log(`برجاء ادخال بيان للعمليه`);
    return;
  }

  //#endregion validation

  const data = {
    id_hidden_input: id_hidden_input,
    numberNote: numberNote,
    datepicker: datepicker,
    numberInput: numberInput,
  };

  // استخدم دالة fetch لإرسال القيمة إلى السيرفر
  const response = await fetch("/addNewAttendance", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // الغاء العمليه اذا كان هناك اى شرط من الشرزط الى فوق لم ليتحقق
  if (response.status !== 200) {
    console.log(`saved failed :(`);
    return;
  } else {
    location.reload();
    console.log(`saved done :)`);
  }
}
//#endregion saveAttendance

//#region get employees data from server to fill dropdown

{
  let array1; // خاص بالبيانات القادمة من السيرفر
  const options = []; // انشاء مصفوفه فارغه لتحتوى الداتا

  // تحضير البيانات من السيرفر
  async function getEmployeesData_fn() {
    const response = await fetch("/getEmployeesData1");
    const data = await response.json();
    array1 = data;

    // وضع البيانات داخل القائمة المنسدلة
    array1.forEach((employee) => {
      options.push({ id: employee.id, name: employee.name });
    });
  }

  // وضع البيانات داخل القائمة المنسدلة بعد تحميل الصفحة
  getEmployeesData_fn().then(() => {
    // تحضير وعرض القائمة المنسدلة
    // إخفاء حقل id
    // document.getElementById("id_hidden_input").style.display = "none";

    // عرض البيانات في القائمة المنسدلة
    displayOptions();
  });

  // عرض البيانات في القائمة المنسدلة
  function displayOptions() {
    // تفريغ القائمة المنسدلة
    document.getElementById("dropdownItems").innerHTML = "";

    // حلقة على البيانات
    for (let option of options) {
      // إنشاء خيار جديد
      const optionElement = document.createElement("option");
      optionElement.value = option.id;
      optionElement.textContent = option.name;

      // إضافة `class` إلى الخيار
      optionElement.classList.add("option_row");

      // إضافة الخيار إلى القائمة المنسدلة
      document.getElementById("dropdownItems").appendChild(optionElement);

      optionElement.addEventListener("click", selectOption);
    }
  }

  // البحث في القائمة المنسدلة
  function filterOptions() {
    // الحصول على نص البحث
    const searchText = document.getElementById("dropdown_search_input").value;

    // تفريغ القائمة المنسدلة
    const dropdownItems = document.getElementById("dropdownItems");

    if (dropdownItems) {
      dropdownItems.innerHTML = "";

      // حلقة على البيانات
      for (let option of options) {
        // البحث عن مطابقة
        if (
          option &&
          option.name &&
          option.name.toLowerCase().includes(searchText.toLowerCase())
        ) {
          // إنشاء خيار جديد
          const optionElement = document.createElement("option");
          optionElement.value = option.id;
          optionElement.textContent = option.name;

          // إضافة `class` إلى الخيار
          optionElement.classList.add("option_row");

          // إضافة الخيار إلى القائمة المنسدلة
          dropdownItems.appendChild(optionElement);

          optionElement.addEventListener("click", selectOption);
        }
      }
    }
  }

  // تحديد الخيار المختار وإخفاء القائمة
  function selectOption(event) {
    const optionElement = event.target;
    document.querySelector("#dropdown_select_input").value =
      optionElement.textContent;
    document.querySelector(`#id_hidden_input`).value = optionElement.value;
    hideDropdown();
  }

  // إظهار/إخفاء القائمة
  function toggleDropdown() {
    if (dropdown_menue.style.display === "none") {
      showDropdown();
    } else {
      hideDropdown();
    }
  }

  // إظهار القائمة
  function showDropdown() {
    dropdown_menue.style.display = "block";
  }

  // إخفاء القائمة
  function hideDropdown() {
    dropdown_menue.style.display = "none";
  }

  // إظهار/إخفاء القائمة
  dropdown_select.addEventListener("click", toggleDropdown);

  // إخفاء القائمة عند فقدان التركيز
  document.addEventListener("click", (event) => {
    if (
      !dropdown_select.contains(event.target) &&
      !dropdown_menue.contains(event.target)
    ) {
      hideDropdown();
    }
  });

  // إخفاء القائمة عند الضغط على مفتاح الهروب
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      hideDropdown();
    }
  });
}
//#endregion fill dropdown

//#region get employees data from server to fill table of attaendance
{
  // start a New scope

  // 1: function 5asa be zapt el page height automatic Mohema gedan
  function adjustIframeHeight() {
    var iframe = parent.document.getElementById("localspace");
    iframe.style.minHeight =
      iframe.contentWindow.document.body.scrollHeight + "px";
  }

  const tableContainer = document.getElementById("tableContainer"); // da div magod fe el html ely han7ot feh el table be ele kalme be el shakl da (( <div id="tableContainer"></div> ))
  let array1;
  let array1Copy = [];
  let slice_Array1 = [];

  async function getAttendanceData_fn() {
    console.log(`fetch getattendance will start now`);
    try {
      const response = await fetch("/getEAttendanceData");
      const data = await response.json();

      console.log(`fetch getattendance end`);
      array1 = data;

      // تحديث array1Copy بنتيجة الـ slice
      array1Copy = array1.slice();
    } catch (error) {
      console.error("Error fetching data:", error.message);
      res.status(500).send("Error fetching data");
    }
  }

  async function showFirst50RowAtTheBegening() {
    await getAttendanceData_fn();
    slice_Array1 = array1Copy.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    fillAttendancetable();
  }

  document.addEventListener("DOMContentLoaded", function () {
    // استدعاء الدالة عندما تكتمل تحميل الصفحة
    showFirst50RowAtTheBegening();
  });

  async function fillAttendancetable() {
    //  @@ هاااااام جدا
    // el properties beta3 kol 3amod ytm wad3ha fe el <thead></thead> And <tbody></tbody> And <tfoor></tfoor> kol wa7ed lewa7do
    // el properties hya :
    // 1 : diplay: none; > fe 7alt enak ardt e5fa2 el 3amod -- display: ; hatspha fadya fe7alt enak ardt tezhr el 3amod
    // 2 : white-space: nowrap;  fe 7alt enak ardt en el text maylfsh ta7t ba3do  -- white-space: wrap; fe 7alt enak ardt en el tezt ylf
    // 3 : width: auto;  fe 7alt enak ardt en ykon 3ard el 3amod 3ala ad el mo7tawa -- width: 100%; fe 7alt enak ardt en el 3amod ya5od ba2y el mesa7a el fadla
    // 4 : text-align: center / left / right / justify   da 3ashan tet7km fe el text ymen wala shemal wala fe ele nos

    // إعداد رأس الجدول
    let tableHTML = `<table id="Attendance_table" class="review_table">
                              <thead>
                                <tr>
                                    <th></th>
                                    <th style="display: none; white-space: nowrap; width: auto;">id</th>
                                    <th style="display: none; white-space: nowrap"; >كود الموظف</th>
                                    <th style="white-space: nowrap;">اسم الموظف</th>
                                    <th style="white-space: nowrap;text-align: center;">التاريخ</th>
                                    <th style="white-space: nowrap;">القيمه</th>
                                    <th style="white-space: wrap; width: 100%;">البيان</th>
                                    <th style="white-space: nowrap;">اخر تحديث</th>
                                </tr>
                              </thead>
                              <tbody>`;

    // إضافة صفوف الجدول بناءً على البيانات
    slice_Array1.forEach((row) => {
      tableHTML += `<tr>
                              <td> <button class="tabble_edite_btn" onclick="displayAttendanceData(${row.id})">تحرير</button> </td>
                              <td style="display: none";>${row.id}</td>
                              <td style="display: none;text-align: center;" >${row.employee_id}</td>
                              <td style="white-space: nowrap;">${row.employee_name}</td>
                              <td style="white-space: nowrap; text-align: center;">${row.datex}</td>
                              <td style="display:; white-space: nowrap; text-align: center; width: auto;">${row.value}</td>
                              <td style="white-space: wrap; width: 100%; text-align: right;">${row.note}</td>
                              <td style="white-space: nowrap; text-align: center;">${row.last_update}</td>
                            </tr>`;
    });

    // table footer
    tableHTML += `</tbody>
      <tfoot>
          <tr>
            <td id="tFooter1"></td>
            <td id="tFooter2" style="display: none;">A2</td>
            <td id="tFooter3" style="display: none;">A3</td>
            <td id="tFooter4"></td>
            <td id="tFooter5"></td>
            <td id="tFooter6"></td>
            <td id="tFooter7"></td> 
            <td id="tFooter8"></td>
          </tr>
      

          <tr>
              <td colspan="6">
                  <div class='flex_H'>
                   <button class="table_footer_btn" type="submit" id="btn_showAll" onclick="ShowAllDataInAttendanceTable()">All</button>
                   <button class="table_footer_btn" type="submit" id="btn_show50" onclick="showFirst50RowInAttendanceTable()">50</button>
                  </div>
              </td>
          </tr>
      </tfoot>`;

    // إغلاق الجدول
    tableHTML += "</table>";

    // تحديث محتوى الصفحة بناءً على البيانات
    tableContainer.innerHTML = tableHTML;

    //  عمليات صف الاجمالى
    // جمع القيم في العمود رقم 6
    let totalColumn_Valuu = 0;
    slice_Array1.forEach((row) => {
      // جمع الاعمده
      totalColumn_Valuu += row.value; // value hena how esm el column ely mawgod fe el array nafsaha EX. ( row.employee_id ,row.value,row.note )
      // totalColumn6 += row.employee_id; // value hena how esm el column ely mawgod fe el array nafsaha EX. ( row.employee_id ,row.value,row.note )
    });

    // وضع القيمة في tFooter6
    document.getElementById("tFooter6").textContent = totalColumn_Valuu;
    document.getElementById("tFooter1").textContent = slice_Array1.length; //  عدد الصفوف

    adjustIframeHeight();
  }

  async function performSearch() {
    // الحصول على قيمة البحث
    const searchValue = document
      .getElementById("searchInput")
      .value.trim()
      .toLowerCase();

    const startDate = document.getElementById("startDate").value.trim();
    const endDate = document.getElementById("endDate").value.trim();

    // فلترة البيانات بناءً على قيمة البحث
    array1Copy = array1.filter((row) => {
      // هضيف هنا الحقول الى عايز اعمل فيها بحث بالطريقه دى اولا هضيف سطر زى دول وبرضه هضيف تحت فى الريترن
      const idMatch =
        row.id && row.id.toString().toLowerCase().includes(searchValue);
      const nameMatch =
        row.employee_name &&
        row.employee_name.toLowerCase().includes(searchValue);

      // البحث بين تاريخين
      const dateMatch =
        !startDate ||
        !endDate ||
        (row.datex >= startDate && row.datex <= endDate);

      return (idMatch || nameMatch) && dateMatch; // فى حالة البحث بين تاريخين
      // return idMatch || nameMatch;  // فى حالة عدم وجود تاريخين
    });

    slice_Array1 = array1Copy.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    fillAttendancetable();
  }

  async function ShowAllDataInAttendanceTable() {
    slice_Array1 = array1Copy.slice(); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    fillAttendancetable();
  }

  async function showFirst50RowInAttendanceTable() {
    slice_Array1 = array1Copy.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    fillAttendancetable();
  }

  // clearArrow1 fe el search dive
  document.querySelector("#clearArrow1").addEventListener("click", function () {
    document.getElementById("searchInput").innerText = "";
    showFirst50RowAtTheBegening();
  });

  document.getElementById("searchBtn").addEventListener("click", performSearch);

  document
    .getElementById("searchInput")
    .addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        performSearch();
      }
    });

  //---------------------------------
  // 3 : diplay Selected row data
  function displayAttendanceData(RowID) {
    // RowID da 3opara 3an parameter han3awd 3ano be id beta3 el saf  3end est5dam el function fe button el ta7rer
    // عثر على الموظف باستخدام معرف الموظف
    const selectedRow = array1.find((X) => X.id === RowID);

    // اعرض بيانات الموظف في الفورم

    document.getElementById("selectedRowIdInput").value = selectedRow.id;
    document.getElementById("datepicker").value = selectedRow.datex;
    document.getElementById("dropdown_select_input").value =
      selectedRow.employee_name;
    document.getElementById("id_hidden_input").value = selectedRow.employee_id;
    document.getElementById("numberInput").value = selectedRow.value;
    document.getElementById("numberNote").value = selectedRow.note;

    document.getElementById("saveBtn").style.display = "none";
    // saveBtn.style.display = 'block'

    // input text focus
    const dropdown_select_input = document.getElementById("dropdown_select_input"
    );
    if (dropdown_select_input) {
      dropdown_select_input.focus();
    }
  }
} // End scope

//#endregion get data from server to fill table of attendance

//#region table1 sum count sort filter
// try sum columns
async function updateTotal(columnsToSum) {
  var Attendance_table = document.getElementById("Attendance_table");
  var rowCount = 0; // عدد الصفوف
  // إعادة تعيين قيم المجموع لكل عمود
  var columnSums = {};
  for (var i = 0; i < columnsToSum.length; i++) {
    var columnIndex = columnsToSum[i];
    columnSums[columnIndex] = 0;
  }
  // حساب المجموع لكل عمود

  var tbody = Attendance_table.getElementsByTagName("tbody")[0];
  var rows = tbody.getElementsByTagName("tr");
  for (var i = 0; i < rows.length; i++) {
    if (rows[i].style.display !== "none") {
      rowCount++; // زيادة العداد عندما يكون الصف ظاهرًا
      var cells = rows[i].getElementsByTagName("td");
      for (var j = 0; j < columnsToSum.length; j++) {
        var columnIndex = columnsToSum[j];
        alert(cells);
        //const cellValue = parseFloat(cells[columnIndex].querySelector("input[type='text']").value); // فى حالة اذا كان هناك مربع نص داخل ال الخليه
        var cellValue = parseFloat(cells[columnIndex].textContent); // فى حال اذا ان القيمه مكتوبه داخل الخليه مباشره بدون مربع نص او شىء
        if (cellValue !== undefined && !isNaN(cellValue)) {
          columnSums[columnIndex] += cellValue;
        }
      }
    }
  }
  // عرض عدد الصفوف في الخلية الأولى في tfooter
  var rowCountCell = document.getElementById("tFooter1");
  rowCountCell.textContent = "عدد الصفوف: " + rowCount;
  // عرض المجموع لكل عمود في tfooter
  for (var columnIndex in columnSums) {
    if (columnSums.hasOwnProperty(columnIndex)) {
      var columnSumCell = document.getElementById("tFooter" + columnIndex);
      columnSumCell.textContent = "المجموع: " + columnSums[columnIndex];
    }
  }
} // end function updateTotal

//  تشغيل الداله عند تحميل الصفحه او تحديث البيانات

// document.addEventListener("DOMContentLoaded",async function () {
//    await updateTotal([1, 2, 7]); // جمع الأعمدة 1 و 2
// });

//#endregion table1 sum count sort filter

//-------------------------------------------------------------------------------------------
function UpdateAttendanceData() {
  // 1. الحصول على قيمة اسم الموظف
  const selectedRowIdInput =
    document.getElementById("selectedRowIdInput").value;
  const numberInput = document.getElementById("numberInput").value;
  const datepicker = document.getElementById("datepicker").value;
  const id_hidden_input = document.getElementById("id_hidden_input").value;
  const numberNote = document.getElementById("numberNote").value;

  if (
    !confirm(`Please Confirm..
            do you want to continue edite ?`)
  ) {
    return;
  }

  fetch("/updateAttendance", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      // Hena ha7ot el variables ely ha3melha send le el server
      selectedRowIdInput,
      numberInput,
      numberNote,
      datepicker,
      id_hidden_input,
    }),
    
  });
} // function updateEmployee()

//#endregion end UpdateAttendanceData
