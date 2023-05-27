let takeTaskahtBtn;
let butahttimer = document.createElement('div')
butahttimer.id = "ahttimercrm"
butahttimer.innerText = "00 : 00"
butahttimer.title = "Таймер aht"

let CRMlogo = document.getElementsByClassName('logo');
if (ahtshowcrm == 1){
    setTimeout(ahtstat(), 2000)  
}

function ahtstat() {
    CRMlogo[0].style = "widht:150px"
    CRMlogo[0].appendChild(butahttimer)
}

document.addEventListener("DOMContentLoaded", function() {
    if (window.location.href.indexOf('https://crm2.skyeng.ru/customer-support/start') !== -1) {
        console.log("Открыли")
    }
});