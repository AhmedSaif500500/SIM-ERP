


//#region "Permisions"
async function openPage(dirPageName, perm_name, perm_type) {
  const owner = sessionStorage.getItem('owner');
  if (!owner) {
    const X1 = sessionStorage.getItem('general_permission');
    const X2 = sessionStorage.getItem(perm_name);
    switch (perm_type) {
      case 'view':
        if (X1 > 1 || X2 > 0) {
          window.location.href = dirPageName;
        } else {
          showAlert('fail', 'عفوًا لا تملك صلاحية العرض');
        }
        break;
      case 'add':
        if (X1 > 2 || X2 > 1) {
          window.location.href = dirPageName;
        } else {
          showAlert('fail', 'عفوًا لا تملك صلاحية الإضافة');
        }
        break;
      case 'update':
        if (X1 > 3 || X2 > 2) {
          window.location.href = dirPageName;
        } else {
          showAlert('fail', 'عفوًا لا تملك صلاحية التعديل');
        }
        break;
      case 'delete':
        if (X1 > 4 || X2 > 3) {
          window.location.href = dirPageName;
        } else {
          showAlert('fail', 'عفوًا لا تملك صلاحية الحذف');
        }
        break;
      default:
        showAlert('fail', 'نوع الصلاحية غير معروف');
        break;
    }
  }
}

//check Permissions in the begninng of js page
async function pagePermission(perm_name, perm_type) {
  const owner = sessionStorage.getItem('owner');
  if (!owner) {
    const X1 = sessionStorage.getItem('general_permission');
    const X2 = sessionStorage.getItem(perm_name);
    const dirPageName = 'home_ar';
    const body_content = document.querySelector('#body_content');
    switch (perm_type) {
      case 'view':
        if (X1 > 1 || X2 > 0) {

        } else {
          showAlert('fail', ' عفوًا لا تملك صلاحية الدخول لهذه الصفحه , سيتم توجيهك الى الصفحه الرئيسيه');
          body_content.style.display = 'none'
          setTimeout(() => {
            window.location.replace(dirPageName);
          }, 4000);
        }
        break;
      case 'view':
        if (X1 > 1 || X2 > 0) {

        } else {
          showAlert('fail', ' عفوًا لا تملك صلاحية الدخول لهذه الصفحه , سيتم توجيهك الى الصفحه الرئيسيه');
          setTimeout(() => {
            window.location.replace(dirPageName);
          }, 4000);
        }
        break;
      case 'add':
        if (X1 > 2 || X2 > 1) {

        } else {
          showAlert('fail', ' عفوًا لا تملك صلاحية الدخول لهذه الصفحه , سيتم توجيهك الى الصفحه الرئيسيه');
          setTimeout(() => {
            window.location.replace(dirPageName);
          }, 4000);
        }
        break;
      case 'update':
        if (X1 > 3 || X2 > 2) {

        } else {
          showAlert('fail', ' عفوًا لا تملك صلاحية الدخول لهذه الصفحه , سيتم توجيهك الى الصفحه الرئيسيه');
          setTimeout(() => {
            window.location.replace(dirPageName);
          }, 4000);
        }
        break;
      case 'delete':
        if (X1 > 4 || X2 > 3) {
          break;
        } else {
          showAlert('fail', ' عفوًا لا تملك صلاحية الدخول لهذه الصفحه , سيتم توجيهك الى الصفحه الرئيسيه');
          setTimeout(() => {
            window.location.replace(dirPageName);
          }, 4000);
        }
        break;
    }
  }
}


async function btn_permission(perm_name, perm_type) {
  const owner = sessionStorage.getItem('owner');
  if (owner) {
    return true;
  } else if (perm_name === 'pass' || perm_type === 'pass') {
    return true;
  } else {
    const X1 = sessionStorage.getItem('general_permission');
    const X2 = sessionStorage.getItem(perm_name);
    switch (perm_type) {
      case 'view':
        if (X1 > 1 || X2 > 0) {
          return true;
        } else {
          showAlert('fail', 'عفوًا لا تملك صلاحية العرض');
          return false;
        }
        break;
      case 'add':
        if (X1 > 2 || X2 > 1) {
          return true;
        } else {
          showAlert('fail', 'عفوًا لا تملك صلاحية الإضافة');
          return false;
        }
        break;
      case 'update':
        if (X1 > 3 || X2 > 2) {
          return true;
        } else {
          showAlert('fail', 'عفوًا لا تملك صلاحية التعديل');
          return false;
        }
        break;
      case 'delete':
        if (X1 > 4 || X2 > 3) {
          return true;
        } else {
          showAlert('fail', 'عفوًا لا تملك صلاحية الحذف');
          return false;
        }
        break;
      // default:
    }
  }
}

//#endregion End-Permissions

