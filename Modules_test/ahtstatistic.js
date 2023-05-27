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

function startlisteneraht(){
    takeTaskahtBtn = document.getElementsByClassName('mat-button-wrapper');
    if (window.location.href.indexOf('https://crm2.skyeng.ru/customer-support/start') !== -1 && takeTaskahtBtn.length > 0) {
        if (takeTaskahtBtn[13] && takeTaskahtBtn[13].innerText == 'Взять новую задачу') {
            takeTaskahtBtn[13].addEventListener("click", startahttimer())    
        }
    }
}

function startahttimer(){
    if (document.getElementsByClassName('mat-button-disabled').length == 0){
        console.log('КЛИК')
    }
    
}