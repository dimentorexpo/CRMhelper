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

var TaskahtBtn;
function listener_for_start_aht() {
    console.log('Начинаю поиск кнопки')
    var takeTaskBtnlist = document.getElementsByClassName('mat-button-wrapper');
    if (window.location.href.indexOf('https://crm2.skyeng.ru/customer-support/start') !== -1 && takeTaskBtnlist.length > 0) {
        console.log('Нужная страница')
      if (takeTaskBtnlist[13] && takeTaskBtnlist[13].innerText == 'Взять новую задачу') {
        var TaskahtBtn = takeTaskBtnlist[13].parentNode;
        console.log('Нашел кнопку')
        TaskahtBtn.addEventListener("click", function() {
            if (!TaskahtBtn.classList.contains('mat-button-disabled')) {
                window.addEventListener('beforeunload', function(event) {
                    startahttimer();
                    console.log('Клик по кнопке');
                });
            }
          });
        clearInterval(ahtstartchecklistener);
      }
    }
}
var ahtstartchecklistener = setInterval(listener_for_start_aht, 1000);

var finishspanbtn;
var finishbnt;
function listener_for_stop_aht() {
    if (window.location.href.includes('customer-support/process')) {
        var finishbtnlist = document.getElementsByClassName('mat-button-wrapper');
        for (let index = 0; index < finishbtnlist.length; index++) {
            if (finishbtnlist[index].innerText == "Выполнить"){
                finishspanbtn = finishbtnlist[index];
            }
        }
        finishbnt = finishspanbtn.parentNode;
        finishbnt.addEventListener("click", function() {
            if (!finishbnt.classList.contains('mat-button-disabled')) {
                window.addEventListener('beforeunload', function(event) {
                    stopahttimer();
                    console.log('Клик по кнопке');
                });                
            }
        });
        clearInterval(ahtstopchecklistener);
    }
}
var ahtstopchecklistener = setInterval(istener_for_stop_aht, 1000);

function startahttimer() {
    console.log('Начинаю запуск таймера');
    var datetask = new Date();
    var taskminutes = datetask.getMinutes().toString().padStart(2, '0');
    var taskseconds = datetask.getSeconds().toString().padStart(2, '0');
  
    localStorage.setItem('opintask', true);
    console.log(localStorage.getItem('opintask'))
    localStorage.setItem('taskminutes', taskminutes);
    console.log(localStorage.getItem('taskminutes'));
    localStorage.setItem('taskseconds', taskseconds);
    console.log(localStorage.getItem('taskminutes'));
    setTimeout(listener_for_stop_aht, 5000);
    console.log('Запрос на поиск кнопки выполнить');
}

function stopahttimer() {
    localStorage.setItem('opintask', false);
    localStorage.removeItem('taskminutes');
    localStorage.removeItem('taskseconds');
}

var ahttimesetis;
function CRM_aht_timer() { // таймер оператор в задаче
    var data = new Date();
    var minutes = data.getMinutes();
    var seconds = data.getSeconds();
    if (localStorage.getItem('opintask') ==='true'){
        var taskMinutes = parseInt(localStorage.getItem('taskminutes'));
        var taskSeconds = parseInt(localStorage.getItem('taskseconds'));
            
        var elapsedMinutes = minutes - taskMinutes;
        var elapsedSeconds = seconds - taskSeconds;
            
        if (elapsedMinutes < 0) {
            elapsedMinutes += 60;
        }
        if (elapsedSeconds < 0) {
            elapsedSeconds += 60;
            elapsedMinutes -= 1;
        }
            
        ahttimesetis = formatTime(elapsedMinutes, elapsedSeconds);
    } else {
        ahttimesetis = "00" + " : " + "00";
    }
    if (document.getElementById("ahttimercrm")){
        document.getElementById("ahttimercrm").innerText = ahttimesetis;
    }
}
setInterval(CRM_aht_timer, 1000);
  
function formatTime(minutes, seconds) {
    var formattedMinutes = minutes < 10 ? "0" + minutes : minutes.toString();
    var formattedSeconds = seconds < 10 ? "0" + seconds : seconds.toString();
    return formattedMinutes + " : " + formattedSeconds;
}
