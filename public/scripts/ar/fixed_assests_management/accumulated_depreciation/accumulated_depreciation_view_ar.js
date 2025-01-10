<!DOCTYPE html>
<html lang="en" dir="rtl">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  <link rel="stylesheet" href="/public/css/style.css" />
  <link rel="stylesheet" href="/public/css/fontawesome-free-6.4.2-web/css/all.min.css" />
  <link rel="stylesheet" href="/public/flatpickr/dist/flatpickr.min.css">
</head>

<body class="body scroll">
  <script src="/public/scripts/darkmode.js"></script>
  <div id="alert-container" class="alert-container"></div>
  <div id="body_content">
    <script src="/public/scripts/ar/Authentication_ar.js"></script>
    <button id="scrollToTopBtn">&#9650;</button>

    <!-- start ------------------------------------------------------------------------------------------>

    <div class="header" id="header_div"></div>

    <div class="sub_container">
      <div id="sidebar" class="sidebar scroll"></div>

      <div id="white_backcolor" class="white_backcolor">
        <!-- content -->
        <div id="content_space" class="scroll">

          <div id="fn_container_div" class="fn_container_div"></div>

          <h2 id="h2" class="h2">
            <a id="back_href" class="back_href" href="salesMain_view_ar" title="إدارة المبيعات">
              <i class="fa-solid fa-arrow-right back_icon"></i>
            </a>
            <div class="h2_main_text_div">
              <a id="h2_text_div" class="h2_text_div" href="sales_invoice_view_ar.html" title="اعادة تحميل الصفحة">فواتير المبيعات</a>
              <span id="sub_h2_header" class="sub_h2_header"></span>
            </div>
          </h2>
          <!-- ________________________________________________CONTENT_____________________________________________________________ -->

          <div id="page_content" style="display: none;">
            <div class="btn_container">
              <button class="btn_new" id="newBtn">جديد</button>
              <!-- <a href="/effects_report_ar" class="btn_update" id="newBtn">تقارير</a> -->
            </div>

            <!-- search in table -->
            <div class="search_in_table_div">
              <div class="input_with_icon_div">
                <input type="search" name="searchInput" id="searchInput" placeholder="search"
                  class="search_input hover">
                <i class="fa-light fa-magnifying-glass left_icon"></i>
              </div>
              <button id="searchBtn" class="btn_search hover">search</button>
              <i id="filter_icon" class="fa-duotone fa-solid fa-filter-list filer_icon" title="تصفية متقدمة"></i>
              <i id="filter_icon_cancel" class="fa-duotone fa-solid fa-filter-slash fa-bounce filer_icon_cancel"
                style="display: none;" title="الغاء التصفية ( الحالة الافتراضية )"></i>
            </div>

        
          <div id="filter_div" class="filter_div hidden_height">

          
            <!-- datex  -->
            <div class="filter_div_sub flex_column y_start" id="f0_div">
              <div id="f0_checkbox_div" class="row">
                <span class="reference_input_checkbox"><input type="checkbox" id="f0_checkbox"  checked disabled title="اظهار العمود"
                    onchange="filter_outsideCheckbox_date_column_with_select_and_two_inputs(this)"></span>
                <div  class="checkbox_label">التاريخ</div>
              </div>
              <div class="select_and_input_div flex_column y_start gap_05">
                <select id="f0_select" class="dark_select hover"
                  onchange="filter_insideSelect_date_column_with_two_input(this)">
                  <option value="1" selected>تحديد الفتره</option>
                </select>
                <div class="two_date_div">
                  <!-- date -->
                  <div class="row wrap gap_05">
                    <label for="f0_input_start_date1" class="lbl_sm">من</label>
                    <div class="input_with_icon_div m_0">
                      <input type="search" id="f0_input_start_date1" class="hover input_date m_0 datepicker"
                        placeholder="التاريخ..." readonly autocomplete="off">
                      <i class="fa-regular fa-calendar left_icon"></i>
                    </div>
                  </div>
                  <!-- date -->
                  <div class="row wrap gap_05">
                    <label for="f0_input_end_date1" class="lbl_sm">الى</label>
                    <div class="input_with_icon_div m_0">
                      <input type="search" id="f0_input_end_date1" class="hover input_date m_0 datepicker"
                        placeholder="التاريخ..." readonly autocomplete="off">
                      <i class="fa-regular fa-calendar left_icon"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- due date  -->
            <div class="filter_div_sub flex_column y_start" id="f100_div">
              <div id="f100_checkbox_div" class="row">
                <span class="reference_input_checkbox"><input type="checkbox" id="f100_checkbox" title="اظهار العمود"
                    onchange="filter_outsideCheckbox_date_column_with_select_and_two_inputs(this)"></span>
                <div  class="checkbox_label">تاريخ الاستحقاق</div>
              </div>
              <div class="select_and_input_div flex_column y_start gap_05 hidden_select_and_input_div">
                <select id="f100_select" class="dark_select hover"
                  onchange="filter_insideSelect_date_column_with_two_input(this)">
                  <option value="1" selected>تحديد الفتره</option>
                </select>
                <div class="two_date_div">
                  <!-- date -->
                  <div class="row wrap gap_05">
                    <label for="f100_input_start_date1" class="lbl_sm">من</label>
                    <div class="input_with_icon_div m_0">
                      <input type="search" id="f100_input_start_date1" class="hover input_date m_0 datepicker"
                        placeholder="التاريخ..." readonly autocomplete="off">
                      <i class="fa-regular fa-calendar left_icon"></i>
                    </div>
                  </div>
                  <!-- date -->
                  <div class="row wrap gap_05">
                    <label for="f100_input_end_date1" class="lbl_sm">الى</label>
                    <div class="input_with_icon_div m_0">
                      <input type="search" id="f100_input_end_date1" class="hover input_date m_0 datepicker"
                        placeholder="التاريخ..." readonly autocomplete="off">
                      <i class="fa-regular fa-calendar left_icon"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- reference  -->
            <div class="filter_div_sub" id="f1_div">
              <div class="row">
                <span class="reference_input_checkbox"><input type="checkbox" id="f1_checkbox" title="اظهار العمود"
                    onchange="filter_outsideCheckbox_string_column_with_select_and_input(this)" checked></span>
                <div class="checkbox_label">المرجع</div>
              </div>
              <div id="f1_selectAndInput_div" class="select_and_input_div">
                <select id="f1_select" class="dark_select hover"
                  onchange="filter_insideSelect_string_column_with_input(this)">
                  <option value="0" selected>اظهار الكل</option>
                  <option value="1">يحتوى على</option>
                  <option value="2">لا يحتوى على</option>
                  <option value="3">فارغ</option>
                  <option value="4">ليس فارغ</option>
                </select>
                <input id="f1_input" name="inside_input_search" type="search" class="input_text_sm hover"
                  style="display: none;" placeholder="مطلوب" oninput="check_parse(this,'string')">
              </div>
            </div>



            <!-- accountName  -->
            <div class="filter_div_sub" id="f3_div">
              <div class="row">
                <span class="reference_input_checkbox"><input type="checkbox" id="f3_checkbox" title="اظهار العمود"
                    onchange="filter_outsideCheckbox_string_column_with_select_and_input(this)" checked></span>
                <div class="checkbox_label">اسم العميل</div>
              </div>
              <div id="f3_selectAndInput_div" class="select_and_input_div">
                <select id="f3_select" class="dark_select hover"
                  onchange="filter_insideSelect_string_column_with_input(this)">
                  <option value="0" selected>اظهار الكل</option>
                  <option value="1">يحتوى على</option>
                  <option value="2">لا يحتوى على</option>
                  <option value="3">فارغ</option>
                  <option value="4">ليس فارغ</option>
                </select>
                <input id="f3_input" name="inside_input_search" type="search" class="input_text_sm hover"
                  style="display: none;" placeholder="مطلوب" oninput="check_parse(this,'string')">
              </div>
            </div>

            
            <!-- salesman  -->
            <div class="filter_div_sub" id="f2_div">
              <div class="row">
                <span class="reference_input_checkbox"><input type="checkbox" id="f2_checkbox" title="اظهار العمود"
                    onchange="filter_outsideCheckbox_string_column_with_select_and_input(this)"></span>
                <div class="checkbox_label">المندوب</div>
              </div>
              <div id="f2_selectAndInput_div" class="select_and_input_div hidden_select_and_input_div">
                <select id="f2_select" class="dark_select hover"
                  onchange="filter_insideSelect_string_column_with_input(this)">
                  <option value="0" selected>اظهار الكل</option>
                  <option value="1">يحتوى على</option>
                  <option value="2">لا يحتوى على</option>
                  <option value="3">فارغ</option>
                  <option value="4">ليس فارغ</option>
                </select>
                <input id="f2_input" name="inside_input_search" type="search" class="input_text_sm hover"
                  style="display: none;" placeholder="مطلوب" oninput="check_parse(this,'string')">
              </div>
            </div>


                        <!-- sales order Reference  -->
                        <div class="filter_div_sub" id="f7_div">
                          <div class="row">
                            <span class="reference_input_checkbox"><input type="checkbox" id="f7_checkbox" title="اظهار العمود"
                                onchange="filter_outsideCheckbox_string_column_with_select_and_input(this)"></span>
                            <div class="checkbox_label">امر البيع</div>
                          </div>
                          <div id="f7_selectAndInput_div" class="select_and_input_div hidden_select_and_input_div">
                            <select id="f7_select" class="dark_select hover"
                              onchange="filter_insideSelect_string_column_with_input(this)">
                              <option value="0" selected>اظهار الكل</option>
                              <option value="1">يحتوى على</option>
                              <option value="2">لا يحتوى على</option>
                              <option value="3">فارغ</option>
                              <option value="4">ليس فارغ</option>
                            </select>
                            <input id="f7_input" name="inside_input_search" type="search" class="input_text_sm hover"
                              style="display: none;" placeholder="مطلوب" oninput="check_parse(this,'string')">
                          </div>
                        </div>



                        <!-- sales Qutation Reference  -->
                        <div class="filter_div_sub" id="f8_div">
                          <div class="row">
                            <span class="reference_input_checkbox"><input type="checkbox" id="f8_checkbox" title="اظهار العمود"
                                onchange="filter_outsideCheckbox_string_column_with_select_and_input(this)"></span>
                            <div class="checkbox_label">عرض السعر</div>
                          </div>
                          <div id="f8_selectAndInput_div" class="select_and_input_div hidden_select_and_input_div">
                            <select id="f8_select" class="dark_select hover"
                              onchange="filter_insideSelect_string_column_with_input(this)">
                              <option value="0" selected>اظهار الكل</option>
                              <option value="1">يحتوى على</option>
                              <option value="2">لا يحتوى على</option>
                              <option value="3">فارغ</option>
                              <option value="4">ليس فارغ</option>
                            </select>
                            <input id="f8_input" name="inside_input_search" type="search" class="input_text_sm hover"
                              style="display: none;" placeholder="مطلوب" oninput="check_parse(this,'string')">
                          </div>
                        </div>
                        
                        
            <!-- note  -->
            <div class="filter_div_sub" id="f4_div">
              <div class="row">
                <span class="reference_input_checkbox"><input type="checkbox" id="f4_checkbox" checked title="اظهار العمود"
                    onchange="filter_outsideCheckbox_string_column_with_select_and_input(this)"></span>
                <div class="checkbox_label">البيان</div>
              </div>
              <div id="f4_selectAndInput_div" class="select_and_input_div">
                <select id="f4_select" class="dark_select hover"
                  onchange="filter_insideSelect_string_column_with_input(this)">
                  <option value="0" selected>اظهار الكل</option>
                  <option value="1">يحتوى على</option>
                  <option value="2">لا يحتوى على</option>
                  <option value="3">فارغ</option>
                  <option value="4">ليس فارغ</option>
                </select>
                <input id="f4_input" name="inside_input_search" type="search" class="input_text_sm hover"
                  style="display: none;" placeholder="مطلوب" oninput="check_parse(this,'string')">
              </div>
            </div>


        
            <!-- total_value  -->
            <div id="f5_div" class="filter_div_sub">
              <div class="row">
                <span class="reference_input_checkbox"><input type="checkbox" id="f5_checkbox" checked
                    title="اظهار العمود"
                    onchange="filter_outsideCheckbox_string_column_with_select_and_input(this)"></span>
                <div class="checkbox_label">القيمة</div>
              </div>
              <div id="f5_selectAndInput_div" class="select_and_input_div">
                <select id="f5_select" class="dark_select hover"
                  onchange="filter_insideSelect_number_column_with_input(this)">
                  <option value="0" selected>اظهار الكل</option>
                  <option value="1">اكبر من</option>
                  <option value="2">اصغر من</option>
                  <option value="3">تساوى</option>
                  <option value="4">صفر</option>
                  <option value="5">ليس صفر</option>
                </select>
                <input id="f5_input" name="inside_input_search" type="search" class="input_text_sm hover"
                  style="display: none;" placeholder="مطلوب" oninput="check_parse(this,'number')">
              </div>
            </div>

            <!-- remaining_balance  -->
            <div id="f9_div" class="filter_div_sub">
              <div class="row">
                <span class="reference_input_checkbox"><input type="checkbox" id="f9_checkbox" checked
                    title="اظهار العمود"
                    onchange="filter_outsideCheckbox_string_column_with_select_and_input(this)"></span>
                <div class="checkbox_label">المستحق</div>
              </div>
              <div id="f9_selectAndInput_div" class="select_and_input_div">
                <select id="f9_select" class="dark_select hover"
                  onchange="filter_insideSelect_number_column_with_input(this)">
                  <option value="0" selected>اظهار الكل</option>
                  <option value="1">اكبر من</option>
                  <option value="2">اصغر من</option>
                  <option value="3">تساوى</option>
                  <option value="4">صفر</option>
                  <option value="5">ليس صفر</option>
                </select>
                <input id="f9_input" name="inside_input_search" type="search" class="input_text_sm hover"
                  style="display: none;" placeholder="مطلوب" oninput="check_parse(this,'number')">
              </div>
            </div>


            <!-- payment_status  -->
            <div class="filter_div_sub" id="f6_div">
              <div class="row">
                <span class="reference_input_checkbox"><input type="checkbox" id="f6_checkbox" checked title="اظهار العمود"
                    onchange="filter_outsideCheckbox_string_column_with_select_and_input(this)"></span>
                <div class="checkbox_label">الحالة</div>
              </div>
              <div id="f6_selectAndInput_div" class="select_and_input_div">
                <select id="f6_select" class="dark_select hover"
                  onchange="filter_insideSelect_string_column_with_input(this)">
                  <option value="0" selected>اظهار الكل</option>
                  <option value="1">يحتوى على</option>
                  <option value="2">لا يحتوى على</option>
                  <option value="3">فارغ</option>
                  <option value="4">ليس فارغ</option>
                </select>
                <input id="f6_input" name="inside_input_search" type="search" class="input_text_sm hover"
                  style="display: none;" placeholder="مطلوب" oninput="check_parse(this,'string')">
              </div>
            </div>


            <div class="btn_container_top_border">
              <button id="btn_do" class="btn_do">تطبيق</button>
            </div>

          </div>
          <div id="tableContainer" class="tableContainer"></div>
        </div>
      </div>
    </div>
  </div>

  </div> <!-- end body content -->
  <!-- scripts------------------------------------------------------------------------------ -->
  <script src="/public/flatpickr/dist/flatpickr.min.js"></script> <!-- lazem da ykon apl el main.js -->
  <script src="/public/socket/socket.io.min.js"></script>
  <script src="/public/scripts/main.js"></script> <!-- lazem da ykon a5er malaf -->
  <script src="/public/scripts/ar/sales_management/sales/sales_invoice/sales_invoice_view_ar.js"></script>
  


</body>

</html>