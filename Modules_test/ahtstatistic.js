let butahttimer = document.createElement('button')
butahttimer.id = "ahttimercrm"
butAlarmclock.classList.add('btnCRM')
butAlarmclock.innerHTML = "00 : 00"
butahttimer.title = "Таймер aht"
butahttimer.style.color = "lightgreen"

let CRMlogo = document.getElementsByClassName('logo')[0];
if (ahtshowcrm == 1){
    CRMlogo.style.widht = "150px"
    CRMlogo.appendChild(butahttimer)
}