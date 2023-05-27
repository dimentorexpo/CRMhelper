let butahttimer = document.createElement('button')
butahttimer.id = "ahttimercrm"
butahttimer.innerText = "00 : 00"
butahttimer.title = "Таймер aht"

let CRMlogo;
window.addEventListener("load", function() {
    CRMlogo = document.getElementsByClassName('logo');
    setTimeout(function() {
        if (ahtshowcrm == 1){
            CRMlogo[0].style.widht = '150px'
            CRMlogo[0].appendChild(butahttimer)
        }  
    }, 1000);
});

function startlisteneraht() {
    var takeTaskBtnlist = document.getElementsByClassName('mat-button-wrapper');
    if (window.location.href.indexOf('https://crm2.skyeng.ru/customer-support/start') !== -1 && takeTaskBtnlist.length > 0) {
      if (takeTaskBtnlist[13] && takeTaskBtnlist[13].innerText == 'Взять новую задачу') {
        var TaskahtBtn = takeTaskBtnlist[13];
        TaskahtBtn.addEventListener("click", function() {
            if (document.getElementsByClassName('mat-button-disabled').length === 0) {
                console.log('КЛИК');
                startahttimer()
            }
            console.log("Клик по элементу");
          });
        clearInterval(ahtstartchecklistener)
        ahtstartchecklistener = '' // отслеживаю прекращение листенера
      }
    }
}
  
function startahttimer() {
    console.log('КЛАК');
}

var ahtstartchecklistener = setInterval(startlisteneraht, 1000);