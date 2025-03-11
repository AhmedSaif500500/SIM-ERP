//setActiveSidebar("salesMain_view_ar");  
//pagePermission("view", "sales_invoice_permission");  // معلق

/*
const newBtn = document.querySelector('#newBtn');
newBtn.onclick = function (){
    sessionStorage.removeItem('sales_invoice_update_data')
    window.location.href = "/sales_invoice_add_ar";
  }
*/



//-------------------------------------------------


let data2 = [];
let array2 = [];
let slice_array2 = [];
let filteredData_Array2 = [];
let checkedAll = false
let locations_array = []


// let end_date;
// let is_hiding_zero_balances;
// let is_show_account_no = false;


async function getData_fn1() {
    try {       
        //  معلق
        data2 = await new_fetchData_postAndGet(
            "/get_location_data",
            {},
            "pass","pass", // معلق
            60,
            false,'',
            false,
            false,false,
            false,false,'',
            false,'',
            false,false,
            'حدث خطأ اثناء معالجة البيانات'
        )

        data2 = data2.itemslocationsArray
        
        showFirst50RowAtTheBegening1();
    } catch (error) {
      catch_error(error)
    }
}

function showFirst50RowAtTheBegening1() {
    try {
        page_content.style.display = "none";

        filteredData_Array2 = data2.filter((row) => {

            const isAccountNameMatch =
            filterData_string_column_with_showAndHiddenCheckbox(
                f1_checkbox,
                f1_select,
                f1_input,
                "account_name",
                row
            );
               
            return (
                isAccountNameMatch
            ); // && otherCondition;
        });

        // QKey = null;

        array2 = filteredData_Array2.slice();

       // slice_array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
       slice_array2 = array2
        fillTable1();

    } catch (error) {
        catch_error(error);
    }
}

function fillTable1() {
    try {
        //  @@ هاااااام جدا
        // el properties beta3 kol 3amod ytm wad3ha fe el <thead></thead> And <tbody></tbody> And <tfoor></tfoor> kol wa7ed lewa7do
        // el properties hya :
        // 1 : display: none; > fe 7alt enak ardt e5fa2 el 3amod -- display: ; hatspha fadya fe7alt enak ardt tezhr el 3amod
        // 2 : white-space: nowrap;  fe 7alt enak ardt en el text maylfsh ta7t ba3do  -- white-space: wrap; fe 7alt enak ardt en el tezt ylf
        // 3 : width: auto;  fe 7alt enak ardt en ykon 3ard el 3amod 3ala ad el mo7tawa -- width: 100%; fe 7alt enak ardt en el 3amod ya5od ba2y el mesa7a el fadla
        // 4 : text-align: center / start / end / justify   da 3ashan tet7km fe el text ymen wala shemal wala fe ele nos

        page_content.style.display = "none";
        showLoadingIcon(content_space);

        let style_id = `display: none;`;
        let style_checkbox = `display: table-cell; width: auto; white-space: nowrap; text-align: center`;
        let style_account_name = `display: table-cell; width: 100%; white-space: nowrap; text-align: start`;


        total_column1.value = 0;
        let fn = `onclick = "table_update_btn_fn(this)"`;

        // إعداد رأس الجدول
        // هنا بناء الجدول بدون صف الأزرار
        let tableHTML = `<table id="review_table1" class="review_table">
                        <thead>
                            <tr>
                                <th style="${style_id}">x</th>
                                <th style="${style_checkbox}" onclick="checkAll()">الكل</th>
                                <th style="${style_account_name}">الموقع</th>

                            </tr>
                        </thead>
                        <tbody>`;

                        
        slice_array2.forEach((row) => {
                

    
            tableHTML +=
                     `<tr>
                        <td style="${style_id}" class="td_x">${row.id}</td>
                        <td style="${style_checkbox}" class="td_checkbox"><input type="checkbox" class="checkbox"></td>
                        <td style="${style_account_name}" class="td_account_name">${row.account_name}</td>
                      </tr>`;
        });

        tableHTML += `
                    <tr class="table_totals_row">
                        <td id="footer_style_id" style="${style_id}"></td>
                        <td id="footer_style_checkbox" style="${style_checkbox}"></td>
                        <td id="footer_style_account_name" style="${style_account_name}"></td>
                    </tr>
                </tbody>
            </table>`;

        // هنا إضافة صف الأزرار بعد إغلاق الجدول
        tableHTML += `<div id="table_fotter_buttons_row" class="table_fotter_buttons_row_div">
                    <div id="table_footer_showRows_div" class='flex_H'>
                        <button class="table_footer_show_data" id="copy" onclick="copyTableToClipboard(this,'review_table')">نسخ الى الحافظة</button>
                    </div>
                 </div>`;

        // تحديث محتوى الصفحة بناءً على البيانات
        tableContainer1.innerHTML = tableHTML;
        // setupColumnSorting("review_table");
        hideLoadingIcon(content_space);
        page_content.style.display = "flex";
        //  عمليات صف الاجمالى
        // جمع القيم في العمود رقم 6

        // document.getElementById("tFooter6").textContent = totalColumn_Valuu;
       tableContainer1.querySelector(`#footer_style_checkbox`).textContent = slice_array2.length; //  عدد الصفوف

        // tableContainer.querySelector(`#footer_style_total_value`).textContent = floatToString(true,total_column1.value);
        // tableContainer.querySelector(`#footer_debit_first`).textContent = floatToString(true,total_column1.value);

        // if (array1.length > 0 && array1.length <= 50) {
        //     document.querySelector("#table_footer_showRows_div").style.display ="none";
        // }

    } catch (error) {
        hideLoadingIcon(content_space);
        catch_error(error);
    }
}

function performSearch1() {
    try {
        // الحصول على قيمة البحث
        const searchValue = searchInput1.value.trim().toLowerCase();

        // فلترة البيانات بناءً على قيمة البحث

        array2 = filteredData_Array2.filter((row) => {
            const accountName_Match = performSearch_Row(f1_checkbox,"account_name",searchValue,row);


            // استخدام || بدلاً من && لضمان أن البحث يتم في كلا الحقلين
            return (
                accountName_Match
            );
        });

     //   slice_array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
        slice_array2 = array2; // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
        fillTable1();
    } catch (error) {
        catch_error;
    }
}

function ShowAllDataInTable1() {
    showAlert(
        "info",
        "ان ظهار كامل البيانات فى القائمة المنسدله لا يؤثر على عمليه البحث فى البيانات"
    );
    slice_array2 = array2.slice(); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    fillTable1();
}

function showFirst50RowInTable() {
    slice_array2 = array2.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    fillTable1();
}

// عند الضغط على زر البحث
searchBtn1.addEventListener("click", performSearch);

// حدث عن الضغط على زر المسح الخاص ب الانبوت سيرش الى بيظهر لما بنكتب بيانات
searchInput1.addEventListener("search", function () {
    performSearch1();
});

// عند الضغط على زرار انتر وانت واقف فى مربع البحث
searchInput1.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        performSearch1();
    }
});


function checkAll(){
    const checkboxes = tableContainer1.querySelectorAll(`#tableContainer1 table tbody .td_checkbox .checkbox`)
    checkedAll = checkedAll ? false : true
    for (const x of checkboxes){
        x.checked = checkedAll
    }    
}


//#region dialog
const dialogOverlay_input = document.querySelector(`#dialogOverlay_input`);
const report_name_input = document.querySelector(`#report_name_input`);
const end_date_input = document.querySelector(`#end_date_input`);
const checked_hide_zero_balabce = document.querySelector(`#checked_hide_zero_balabce`);
// const checked_show_account_no = document.querySelector(`#checked_show_account_no`);
const view_report_btn = document.querySelector(`#view_report_btn`);
const cancel_report_btn = document.querySelector(`#cancel_report_btn`);
const report_setting_icon = document.querySelector(`#report_setting_icon`);





view_report_btn.onclick = async function () {
    try {


        showLoadingIcon(view_report_btn)
        const stock_location_viewArray = JSON.parse(sessionStorage.getItem('stock_location_viewArray')) || [];


                start_date = false;
                end_date = end_date_input.value;
                permissionName = `items_permissions`
                back_href_page = stock_location_viewArray.length === 0  ?'report_map_ar' : 'stock_location_view_ar';
                back_title_page = stock_location_viewArray.length === 0  ? 'التقارير' : 'جرد الاصناف حسب اموقع'
                is_hiding_zero_balances = checked_hide_zero_balabce.checked
                is_show_account_no = false
                
                
                const rows = tableContainer1.querySelectorAll(`#tableContainer1 table tbody tr .td_checkbox`)
                
                for (const row of rows){
                    const checkedX = row.querySelector(`.checkbox`)                    
                    if (checkedX.checked){
                        locations_array.push(+row.closest(`tr`).querySelector(`.td_x`).textContent)
                    }
                }
        
                if (locations_array.length === 0){
                    showAlert(`info`,'رجاء تحديد موقع مخزون او اكثر بشكل صحيح')
                    return;
                }

                sessionStorage.removeItem('locations_array')
                sessionStorage.setItem('locations_array', JSON.stringify(locations_array));  

        h2_text_div.textContent = report_name_input.value ? report_name_input.value : 'جرد المخزون حسب المواقع' 
        sub_h2_header.textContent = `كما فى ${reverseDateFormatting(end_date_input.value)}`;
        //await getData_fn(end_date, is_hiding_zero_balances, is_show_account_no, locations_array);


        backUp_page1(`stock_location_viewArray`, Qkey, permissionName, start_date, end_date, back_href_page, back_title_page, is_hiding_zero_balances, is_show_account_no, {locations_array : locations_array})
        await restore_page1(getData_fn, `stock_location_viewArray`)
        
        
    } catch (error) {
        catch_error(error)
    } finally {
        close_dialogx()
        hideLoadingIcon(view_report_btn)
    }
}

function show_dialogx(){
    end_date_input.value = today
    checked_hide_zero_balabce.checked = true
    dialogOverlay_input.style.display = 'flex'
}


report_setting_icon.onclick = function(){
    show_dialogx()
}


cancel_report_btn.onclick = function(){
    close_dialogx()
}

function close_dialogx(){
    try {
        if (!sub_h2_header.textContent){
            window.location.href = `report_map_ar`;
        }
        cancel_dialogOverlay_input(dialogOverlay_input)
    } catch (error) {
        catch_error(error)
    }
}
//#endregion end dialog



document.addEventListener("DOMContentLoaded", async function () {
    try {
        showLoadingIcon(content_space)
        await getData_fn1()

      
        const stock_location_viewArray = JSON.parse(sessionStorage.getItem('stock_location_viewArray')) || [];

        if (stock_location_viewArray.length === 0){
            show_dialogx()
        }else{
           
            locations_array = JSON.parse(sessionStorage.getItem('locations_array')) || [];
            await restore_page1(getData_fn, `stock_location_viewArray`)
            
        }

        showRedirectionReason();
    } catch (error) {
        catch_error(error)
    } finally {
        hideLoadingIcon(content_space)
    }
});

window.addEventListener("beforeprint", function () {
    beforeprint_reviewTable("review_table", 0, 1); // هذا سيخفي العمود الأول والثاني
});

/*--------------------------------------------------------------------------------*/
