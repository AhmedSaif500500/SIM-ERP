// service-worker.js
//!!  هاااااااام جدا 
//!  هذه الصفحه مخصصه لاضفه الملفات التى سيتم تخزينها فى الذاكره لتعمل بدون انترنت 
//! وبالتالى اولا :  مش صح انك تضيف كل الملفات لان دا هيمثل عبىء كبير على التطبيق 
//! ثانيا  : اذا  كان المشروع باك اند ومرتبط بقواعد بيانات اونلاين فلا داعى لاستخدام هذا الملف من الاساسس

self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('static-v1').then(function(cache) {
        return cache.addAll([

          //PWA
          '/public/scripts/PWA/k.png',
          '/public/scripts/PWA/manifest.json',
          '/public/scripts/PWA/service-worker.js',



          //sounds
          '/public/sounds/fail.mp3',
          '/public/sounds/info.mp3',
          '/public/sounds/readme',
          '/public/sounds/success.mp3',
          '/public/sounds/warning.mp3',

          //main CSS
          '/public/css/style.css',
          '/public/css/fontawesome-free-6.4.2-web/css/all.min.css',
          '/public/flatpickr/dist/flatpickr.min.css',

          // Main js
          '/public/scripts/darkmode.js',
          '/public/scripts/ar/Authentication_ar.js',
          '/public/flatpickr/dist/flatpickr.min.js',
          '/public/scripts/main.js',

          //login
          '/',
          '/views/login.html',
          '/public/scripts/login.js',

          //home_ar
          '/views/ar/home_ar.html',
          '/public/scripts/ar/home_ar.js',

          //attendance
          '/views/ar/attendance/attendance_ar.html',
          '/views/ar/attendance/attendance_add_ar.html',
          '/views/ar/attendance/attendance_update_ar.html',

          '/public/scripts/ar/attendance/attendance_ar.js',
          '/public/scripts/ar/attendance/attendance_add_ar.js',
          '/public/scripts/ar/attendance/attendance_update_ar.js',

          //employees
          '/views/ar/employees/employees_ar.html',
          '/views/ar/employees/new_employee_ar.html',
          '/views/ar/employees/update_employee_ar.html',

          '/public/scripts/ar/employees/employees.js',
          '/public/scripts/ar/employees/new_employee_ar.js',
          '/public/scripts/ar/employees/update_employees_ar.js',

          //production
          '/views/ar/production/production_add_ar.html',
          '/views/ar/production/production_update_ar.html',
          '/views/ar/production/production_view_ar.html',

          '/public/scripts/ar/production/production_add_ar.js',
          '/public/scripts/ar/production/production_update_ar.js',
          '/public/scripts/ar/production/production_view_ar.js',

          //users
          '/views/ar/users/users_add_ar.html',
          '/views/ar/users/users_ar.html',
          '/views/ar/users/users_update_ar.html',

          '/public/scripts/ar/users/new_user_ar.js',
          '/public/scripts/ar/users/users_ar.js',
          '/public/scripts/ar/users/users_edit_ar.js',

          //reports
          '/views/ar/reports/attendance/attendance_report_ar.html',

          '/public/scripts/ar/reports/attendance_reports/attendance_report_ar.js',

          
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });
  