

const backup_btn = document.querySelector(`#backup_btn`) 


async function downloadBackup() {
    // عرض نافذة إدخال كلمة المرور
    const password = prompt("🔑 أدخل كلمة المرور لحماية النسخة الاحتياطية:");

    // إذا ضغط المستخدم على "Cancel"، يتم إيقاف التنفيذ فورًا
    if (password === null) {
        return;
    }

    // التحقق من صحة كلمة المرور
    if (password.length < 6 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
        //alert("⚠️ كلمة المرور يجب أن تحتوي على حروف وأرقام، ولا تقل عن 6 أحرف.");
        showAlert(`warning`, "⚠️ كلمة المرور يجب أن تحتوي على حروف وأرقام، ولا تقل عن 6 أحرف.")
        return;
    }

    showLoadingIcon(backup_btn);

    fetch("/backup_company", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ password }) // إرسال كلمة المرور مع الطلب
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw new Error(err.message); });
        }

        // قراءة اسم الملف من الهيدر
        const contentDisposition = response.headers.get("Content-Disposition");
        let filename = "backup.enc"; // اسم افتراضي

        if (contentDisposition) {
            const match = contentDisposition.match(/filename="?([^"]+)"?/);
            if (match) {
                filename = match[1]; // استخراج الاسم من الهيدر
            }
        }

        return response.blob().then(blob => ({ blob, filename }));
    })
    .then(({ blob, filename }) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename; // استخدام الاسم المستخرج من السيرفر
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
            // رسالة نجاح بعد التنزيل
        showAlert('success', '✅ تم تنزيل النسخة الاحتياطية بنجاح!');
    })
    .catch(error => {
        console.error("❌ خطأ أثناء تنزيل النسخة الاحتياطية:", error);
        //alert("⚠️ حدث خطأ أثناء تنزيل النسخة الاحتياطية: " + error.message);
        showAlert('fail', "⚠️ حدث خطأ أثناء تنزيل النسخة الاحتياطية: " + error.message)
    })
    .finally(() => {
        hideLoadingIcon(backup_btn);
    });
}

  
  
backup_btn.onclick = async function () {
       await downloadBackup()
}





//----------------------------





const restore_btn = document.querySelector("#restore_btn");

// عند الضغط على الزر، يتم فتح نافذة لاختيار ملف

restore_btn.onclick = async function () {
    try {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = ".SIM"; // السماح فقط بملفات SIM
        fileInput.style.display = "none"; // إخفاء عنصر الإدخال

        fileInput.addEventListener("change", async (event) => {
            try {
                const file = event.target.files[0]; // الحصول على الملف المختار
                
                if (!file) {
                    //alert("⚠️ لم يتم اختيار أي ملف.");
                    showAlert('warning', "⚠️ لم يتم اختيار أي ملف.")
                    return;
                }

                // طلب إدخال كلمة المرور
                let password;
                while (true) {
                    password = prompt("🔑 أدخل كلمة المرور لاستعادة النسخة الاحتياطية:");
                    if (password === null) {
                        console.log("🚫 تم إلغاء إدخال كلمة المرور.");
                        return; // الخروج من العملية
                    }
                    if (/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(password)) {
                        break; // كلمة المرور صحيحة
                    }
                    //alert("⚠️ كلمة المرور يجب أن تحتوي على حروف وأرقام ولا تقل عن 6 أحرف.");
                    showAlert('warning', "⚠️ كلمة المرور يجب أن تحتوي على حروف وأرقام ولا تقل عن 6 أحرف.")
                }

                // تجهيز البيانات وإرسالها إلى السيرفر
                const formData = new FormData();
                formData.append("backupFile", file);
                formData.append("password", password); // إرسال كلمة المرور مع الملف

                const response = await fetch("/restore_backup", {
                    method: "POST",
                    body: formData,
                    credentials: "include",
                });

                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.message || "❌ فشل استعادة النسخة الاحتياطية");
                }

                //alert("✅ تم استعادة النسخة الاحتياطية بنجاح!");
                showAlert('success', '✅ تم استعادة النسخة الاحتياطية بنجاح!')
            } catch (error) {
                console.error("❌ خطأ أثناء استعادة النسخة الاحتياطية:", error);
                //alert("❌ حدث خطأ أثناء الاستعادة: " + error.message);
                showAlert('fail', "❌ حدث خطأ أثناء الاستعادة: " + error.message)
            }
        });

        document.body.appendChild(fileInput);
        fileInput.click(); // فتح نافذة الاختيار
        fileInput.remove(); // إزالة العنصر بعد الاستخدام
    } catch (error) {
        console.error("❌ خطأ غير متوقع:", error);
        //alert("❌ حدث خطأ غير متوقع أثناء استعادة النسخة الاحتياطية.");
        showAlert('fail', "❌ حدث خطأ غير متوقع أثناء استعادة النسخة الاحتياطية.")
    }
};
