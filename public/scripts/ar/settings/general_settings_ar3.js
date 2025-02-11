

const backup_btn = document.querySelector(`#backup_btn`) 
const restore_btn = document.querySelector(`#restore_btn`)


async function downloadBackup() {
    fetch("/backup_company", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
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
    })
    .catch(error => {
        console.error("❌ خطأ أثناء تنزيل النسخة الاحتياطية:", error);
        alert("حدث خطأ أثناء تنزيل النسخة الاحتياطية.");
    });
}

  
  
backup_btn.onclick = async function () {
       await downloadBackup()

}