
// todo this darkmode.js

// ! Link this file in the beginning of body in all html files
const body_darkMode = document.querySelector('body');
const darkmode =localStorage.getItem('darkmode');
if(darkmode && darkmode === 'dark'){
  body_darkMode.classList.add('dark');
}else{
  body_darkMode.classList.remove('dark');
}