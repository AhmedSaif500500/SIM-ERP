
// todo this darkmode.js

// ! Link this file in the beginning of body in all html files
const body = document.querySelector('body');
const darkmode =localStorage.getItem('darkmode');
if(darkmode && darkmode === 'dark'){
  body.classList.add('dark');
}else{
  body.classList.remove('dark');
}