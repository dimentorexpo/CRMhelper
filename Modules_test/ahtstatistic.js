let takeTaskahtBtn;
let butahttimer = document.createElement('button')
butahttimer.id = "ahttimercrm"
butahttimer.innerText = "00 : 00"
butahttimer.title = "Таймер aht"

let CRMlogo = document.getElementsByClassName('logo');
window.addEventListener("load", function() {
    setTimeout(() => {
        if (ahtshowcrm == 1){
            CRMlogo[0].style.widht = '150px'
            CRMlogo[0].appendChild(butahttimer)
        }  
    }, 1000);
    
});

document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname === "/customer-support/start") {
        console.log("Открыли")
    }
});