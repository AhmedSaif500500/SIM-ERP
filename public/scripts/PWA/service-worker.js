// service-worker.js
//!!  هاااااااام جدا 
//!  هذه الصفحه مخصصه لاضفه الملفات التى سيتم تخزينها فى الذاكره لتعمل بدون انترنت 
//! وبالتالى اولا :  مش صح انك تضيف كل الملفات لان دا هيمثل عبىء كبير على التطبيق 
//! ثانيا  : اذا  كان المشروع باك اند ومرتبط بقواعد بيانات اونلاين فلا داعى لاستخدام هذا الملف من الاساسس

self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('static-v1').then(function(cache) {
        return cache.addAll([
          '/',
          '/index1.html',
          '/index2.html',
          '/styles/style.css',
          '/scripts/script.js',
          '/icon.png'
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
  