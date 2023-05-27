let butahttimer = document.createElement('button')
butahttimer.id = "ahttimercrm"
butAlarmclock.classList.add('btnCRM')
butAlarmclock.innerHTML = "00 : 00"
butahttimer.title = "Таймер aht"
butahttimer.style.color = "lightgreen"

let CRMlogo = document.getElementsByClassName('logo');
if (ahtshowcrm == 1){
//    CRMlogo[0].style = "widht:150px"
    CRMlogo[0].appendChild(butahttimer)
}