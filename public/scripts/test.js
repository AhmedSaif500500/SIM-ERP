// Auto resize For ifram(localSpace) in index.html
function adjustIframeHeight() {
    parent.document.body.style.height = '100vh' // رد طول البودى الى اصله كبدايه
    var iframe = parent.document.getElementById("localspace");
    iframe.style.height = iframe.contentWindow.document.body.scrollHeight + "px";
}




