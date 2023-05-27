let butahttimer = document.createElement('button')
butahttimer.id = "ahttimercrm"
butahttimer.classList.add('btnCRM')
butahttimer.innerText = "00 : 00"
butahttimer.title = "Таймер aht"
butahttimer.style.color = "lightgreen"

let CRMlogo = document.getElementsByClassName('logo');
if (ahtshowcrm == 1){
    setTimeout(function () {
        CRMlogo[0].style = "widht:150px"
        CRMlogo[0].appendChild(butahttimer)
    }, 2000)  
}