let takeTaskahtBtn;
let butahttimer = document.createElement('button')
butahttimer.id = "ahttimercrm"
butahttimer.innerText = "00 : 00"
butahttimer.title = "Таймер aht"

let CRMlogo = document.getElementsByClassName('logo')[0];
window.addEventListener("load", function() {
    if (ahtshowcrm == 1){
        CRMlogo.style.widht = "150px"
        CRMlogo.appendChild(butahttimer)
    }
});

document.addEventListener("DOMContentLoaded", function() {
    if (window.location.href.indexOf('https://crm2.skyeng.ru/customer-support/start') !== -1) {
        console.log("Открыли")
    }
});