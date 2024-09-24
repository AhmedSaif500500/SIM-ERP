setActiveSidebar('home_ar'); // يمكن تغيير 'home_ar' إلى اسم الصفحة المراد تحديدها
document.addEventListener("DOMContentLoaded", function () {
  show_redirection_Reason();
});


//----------------------------------------

const save_btn = document.querySelector('#save_btn');
const update_btn = document.querySelector('#update_btn');
const hidden_input = document.querySelector('#hidden_input');
const note_textarea = document.querySelector('#note_textarea');
const date_input = document.querySelector('#date_input');
const h2_id = document.querySelector('#h2_id');
const noButton = document.querySelector('#noButton');
const dialogOverlay_input = document.querySelector('#dialogOverlay_input');
const new_todo_btn = document.querySelector(`#new_todo_btn`);
const checked_div = document.querySelector(`#checked_div`);
const checked_input = document.querySelector(`#checked_input`);

date_input.value = new Date().toISOString().split('T')[0]; // date in format (yyyy-mm-dd)


const tableContainer = document.getElementById('tableContainer');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');



//#region  ( baynat el employees mn el database )
// get data from db and store it in array1
let data = [];
let array1 = [];
let slice_Array1 = [];


async function geteTodoData_fn() {

    data = await fetchData_postAndGet(
        '/get_All_todo_Data',
        {},
        '','',
        15,
        false,'',
        false,
        true,content_space,
        false,'',
        'حدث خطأ اثناء معالجة البيانات'
    )

    // const response = await fetch('/get_All_todo_Data');
    //  data = await response.json();

    // تحديث array1 بنتيجة الـ slice
    array1 = data.slice();
    
}

async function showFirst50RowAtTheBegening() {
    await geteTodoData_fn()
    slice_Array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    fillTodotable()
}

document.addEventListener("DOMContentLoaded", function () {
    // استدعاء الدالة عندما تكتمل تحميل الصفحة
    showFirst50RowAtTheBegening();
});

async function fillTodotable() {
    //  @@ هاااااام جدا 
    // el properties beta3 kol 3amod ytm wad3ha fe el <thead></thead> And <tbody></tbody> And <tfoor></tfoor> kol wa7ed lewa7do
    // el properties hya :
    // 1 : display: none; > fe 7alt enak ardt e5fa2 el 3amod -- display: ; hatspha fadya fe7alt enak ardt tezhr el 3amod
    // 2 : white-space: nowrap;  fe 7alt enak ardt en el text maylfsh ta7t ba3do  -- white-space: wrap; fe 7alt enak ardt en el tezt ylf
    // 3 : width: auto;  fe 7alt enak ardt en ykon 3ard el 3amod 3ala ad el mo7tawa -- width: 100%; fe 7alt enak ardt en el 3amod ya5od ba2y el mesa7a el fadla
    // 4 : text-align: center / left / right / justify   da 3ashan tet7km fe el text ymen wala shemal wala fe ele nos
    
        //* Prepare GLOBAL variables Befor sum functions
        // total_column1.value = 0
        // total_column2.value = 0

        // إعداد رأس الجدول
        let tableHTML = `<table id="todo_table" class="review_table">
                        <thead>
                            <tr>
                                <th></th>
                                <th style="display: none;" >ID</th>
                                <th style="width: auto; white-space: nowrap;">التاريخ</th>
                                <th style="width: auto;">الحالة</th>
                                <th style="width: 100%; white-space: wrap;">الملاحظات</th>
                                <th style="width: auto; white-space: nowrap;"></th>
                            </tr>
                            </thead>
                            <tbody>`;

        // إضافة صفوف الجدول بناءً على البيانات
        // slice_Array1 = ""; // تفريغ المصفوفه
        slice_Array1.forEach(row => {

            let isChecked = row.is_done ? 'checked' : ''; // تحديد ما إذا كان يجب تحديد الخانة
            let noteClass = row.is_done ? 'deleted_text' : ''; // إضافة deleted_text إلى العناصر التي تم حذفها
            tableHTML += `<tr>
                            <td> <button class="tabble_update_btn" onclick="table_update_btn_fn(this)">تحرير</button> </td>
                            <td style="display: none">${row.id}</td>
                            <td style="width: auto; white-space: nowrap;">${row.datex}</td>
                            <td style="width: auto; text-align: center;">
                                <input type="checkbox" onchange="checked_fn(this)" ${isChecked}> <!-- استخدام السمة isChecked هنا -->
                            </td>
                            <td style="width: 100%; white-space: wrap;" class="${noteClass}">${row.note}</td> <!-- إضافة الفئة noteClass هنا -->
                            <td style="width: auto; text-align: center;" class="">
                            <div class="table_buttons_div">
                              <button onclick="deleteRow(this)" title="حذف الصف"><i class="fa-solid fa-xmark"></i></button>
                            </div>
                          </td>
                          </tr>`;
        });
        
        tableHTML += `</tbody>
        
        <tfoot>
            <tr class="table_totals_row";>
                <td id="tfooter1"></td>
                <td id="tfooter2" style="display: none" ></td>
                <td id="tfooter3" style="width: auto; white-space: nowrap;"></td>
                <td id="tfooter4" style="width: auto;"></td>
                <td id="tfooter5" style="width: 100%; white-space: wrap;"></td>
                <td id="tfooter6" style="width: auto; white-space: nowrap;"></td>
            </tr>
                        <tr id="table_fotter_buttons_row">
                            <td colspan="6">   <!-- da awel 3amod fe ele sad tr han7othan5elh han3mel merge lkol el columns fe column wa7ed 3ashan n7ot el 2 buttons hat3mel colspan le3add el 3awamed kolaha -->
                                <div class='flex_H'>
                                 <button class="table_footer_show_data"  id="" onclick="ShowAllDataIneffectsTable()">All</button>
                                 <button class="table_footer_show_data"  id="" onclick="showFirst50RowIneffectsTable()">50</button>
                                </div>
                            </td>
                        </tr>
                    </tfoot>`;

        // إغلاق الجدول
        tableHTML += '</table>';

        // تحديث محتوى الصفحة بناءً على البيانات
        tableContainer.innerHTML = tableHTML;
        page_content.style.display = 'flex'


// عرض نتائج الجمع
document.getElementById("tfooter1").textContent = slice_Array1.length; // عدد الصفوف
// document.getElementById("tfooter5").textContent = total_column1.value;
// document.getElementById("tfooter6").textContent = total_column2.value;




if (array1.length > 0 && array1.length <= 50) {
    document.querySelector('#table_fotter_buttons_row').style.display = "none";
} else if (array1.length < 1) {
    document.querySelector('#table_fotter_buttons_row').innerHTML = `<td colspan='6' class="td_no_result">لا نتائج</td>`;
};


};


// search in effectsTable
async function performSearch() {
    // الحصول على قيمة البحث
    const searchValue = searchInput.value.trim().toLowerCase();

    // فلترة البيانات بناءً على قيمة البحث
    array1 = data.filter(row => {
        const datex = row.datex && row.datex.toString().toLowerCase().includes(searchValue);
        const note = row.note && row.note.toString().toLowerCase().includes(searchValue);
        return datex || note;
    });

    // تحديد جزء البيانات للعرض (أول 50 صف فقط)
    slice_Array1 = array1.slice(0, 50);

    // ملء الجدول بالبيانات
    await fillTodotable();

//#region  افاء عامود ال جرد اذا كان هناك نتائج فى البحث
           
    const cumulativeBalanceColumnHeaders = document.querySelectorAll('#todo_table th:nth-child(7), #todo_table td:nth-child(7)');
    
    if (searchValue) {
        // إذا كانت قيمة البحث موجودة، أخفِ عمود الجرد
        cumulativeBalanceColumnHeaders.forEach(element => {
            element.style.display = 'none';
        });
    } else {
        // إذا لم تكن هناك قيمة في البحث، اعرض عمود الجرد
        cumulativeBalanceColumnHeaders.forEach(element => {
            element.style.display = 'table-cell';
        });
    }
//#endregion

}


async function ShowAllDataIneffectsTable(){
    showAlert('info', 'ان ظهار كامل البيانات فى القائمة المنسدله لا يؤثر على عمليه البحث فى البيانات')
    slice_Array1 = array1.slice(); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    fillTodotable()
}

async function showFirst50RowIneffectsTable(){
    slice_Array1 = array1.slice(0,50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    fillTodotable()
}


// عند الضغط على زر البحث
searchBtn.addEventListener('click',  performSearch);

// حدث عن الضغط على زر المسح الخاص ب الانبوت سيرش الى بيظهر لما بنكتب بيانات
searchInput.addEventListener('search', function () {
    performSearch();
});

// عند الضغط على زرار انتر وانت واقف فى مربع البحث
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        performSearch();
    };
});





async function checked_fn(checkbox) {
    const row  = checkbox.closest("tr")
    const id_value = row.cells[1].textContent
    let isChecked = checkbox.checked; // يتم فحص ما إذا كانت القيمة محددة (true) أو غير محددة (false)
   
    // let noteCell = checkbox.parentNode.cells[4]; // يحصل على الـ <td> الذي يحتوي على الـ note
    let noteCell = row.cells[4]; // يحصل على الـ <td> الذي يحتوي على الـ note

    await fetchData_post1(
        "/api/todo_update_is_checked",
        {id_value,isChecked},
        'pass','pass',
        'هل تريد تعديل حالة الملاحظه ؟',
        15,
        'home_ar',
        'حدث خطأ اثناء معالجة البيانات'
      )


    
    // if (isChecked) {
    //     noteCell.classList.add('deleted_text'); // إذا كانت القيمة محددة، يتم إضافة الفئة deleted_text
    // } else {
    //     noteCell.classList.remove('deleted_text'); // إذا كانت القيمة غير محددة، يتم إزالة الفئة deleted_text
    // }
}


//#region 


function clear_todo(){
    date_input.value = new Date().toISOString().split('T')[0]; // date in format (yyyy-mm-dd)
    checked_div.style.display = 'none'
    update_btn.style.display = 'none'
    save_btn.style.display = 'flex'
    h2_id.textContent = 'ملاحظه جديدة'
    hidden_input.value = ''
    note_textarea.value = ''
}

new_todo_btn.addEventListener('click', function (){
    clear_todo()
    dialogOverlay_input.style.display = 'flex'
})
  
  save_btn.addEventListener('click', async function(){
    datex = date_input.value;
    note = note_textarea.value;
    // await fetchData_post1(
    //     "/api/todo_add",
    //     {datex,note},
    //     'pass','pass',
    //     'هل تريد حفظ البيانات ؟',
    //     15,
    //     'home_ar',
    //     'حدث خطأ اثناء حفظ البيانات'
    //   )

    await fetchData_postAndGet(
        "/api/todo_add",
        {datex,note},
        'pass','pass',
        15,
        false,'',
        false,
        true,save_btn,
        true,
        'home_ar',
        'حدث خطأ اثناء معالجة البيانات'
    )
    
    })



  
    async function table_update_btn_fn(updateBtn) {
        const row  = updateBtn.closest("tr")
        
        checked_div.style.display = 'flex'
        update_btn.style.display = 'flex'
        save_btn.style.display = 'none'
        h2_id.textContent = 'تعديل ملاحظة'
        hidden_input.value = row.cells[1].textContent
        date_input.value= row.cells[2].textContent
        const checkbox = row.cells[3].querySelector("input[type='checkbox']");
        checked_input.checked = checkbox.checked
        note_textarea.value = row.cells[4].textContent
        dialogOverlay_input.style.display = 'flex'
      };

      update_btn.addEventListener('click', async function(){
        const id_value = hidden_input.value
        const datex = date_input.value;
        const note = note_textarea.value;
        const is_checked = checked_input.checked
        

        // await fetchData_post1(
        //     "/api/todo_update",
        //     {id_value,
        //     datex,
        //     note,
        //     is_checked},
        //     'pass','pass',
        //     'هل تريد تعديل البيانات ؟',
        //     15,
        //     'home_ar',
        //     'حدث خطأ اثناء تعديل البيانات'
        //   )

          await fetchData_postAndGet(
            "/api/todo_update",
            {id_value,datex,note,is_checked},
            'pass','pass',
            15,
            false,'',
            true,
            true,update_btn,
            true,'home_ar',
            'حدث خطأ اثناء معالجة البيانات'
          )
        })


async function deleteRow(button){
    const row  = button.closest("tr")
    const id_value = row.cells[1].textContent

    // await fetchData_post1(
    //     "/api/todo_delete",
    //     {id_value},
    //     'pass','pass',
    //     'هل تريد حذف هذه الملاحظه ؟',
    //     15,
    //     'home_ar',
    //     'حدث خطأ اثناء معالجة البيانات'
    //   )

        await fetchData_postAndGet(
            "/api/todo_delete",
            {id_value},
            'pass','pass',
            15,
            true,'هل تريد حذف الملاحظه الحالية ؟',
            true,
            false,'',
            true,'home_ar',
            'حدث خطأ اثناء معالجة البيانات'
        )

}

  noButton.onclick = function () {
    try {
        dialogOverlay_input.style.animation = 'fadeOut 0.3s forwards';
        setTimeout(() => {
            dialogOverlay_input.style.display = 'none'
            closeDialog()
            clear_todo()
            dialogOverlay_input.style.animation = 'none';
          }, 300);
          
    } catch (error) {
        dialogOverlay_input.style.display = 'none'
        closeDialog()
        clear_todo()
        catch_error(error)
        dialogOverlay_input.style.animation = 'none';
    }
  };

//#region showReason of redirection
//! الكود دا خاص بملف ال روووتس  هو الى من خلاله بجيب القيم بتاع  سويتش كيس

  document.addEventListener('DOMContentLoaded', function() {
    showRedirectionReason();
  });
  
  //#endregion End - showReason of redirection


