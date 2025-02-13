

const backup_btn = document.querySelector(`#backup_btn`) 


async function downloadBackup() {
    showLoadingIcon(backup_btn);

    fetch("/backup_company", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw response.json().then(err => { throw new Error(err.message); });
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
    })
    .catch(error => {
        console.error("❌ خطأ أثناء تنزيل النسخة الاحتياطية:", error);
        alert("حدث خطأ أثناء تنزيل النسخة الاحتياطية.");
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
                    alert("لم يتم اختيار أي ملف.");
                    return;
                }

                // تجهيز البيانات وإرسالها إلى السيرفر
                const formData = new FormData();
                formData.append("backupFile", file);

                const response = await fetch("/restore_backup", {
                    method: "POST",
                    body: formData,
                    credentials: "include",
                });

                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.message || "فشل استعادة النسخة الاحتياطية");
                }

                alert("✅ تم استعادة النسخة الاحتياطية بنجاح!");
            } catch (error) {
                console.error("❌ خطأ أثناء استعادة النسخة الاحتياطية:", error);
                alert("❌ حدث خطأ أثناء الاستعادة: " + error.message);
            }
        });

        document.body.appendChild(fileInput);
        fileInput.click(); // فتح نافذة الاختيار
        fileInput.remove(); // إزالة العنصر بعد الاستخدام
    } catch (error) {
        console.error("❌ خطأ غير متوقع:", error);
        alert("❌ حدث خطأ غير متوقع أثناء استعادة النسخة الاحتياطية.");
    }
};
