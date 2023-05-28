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

window.onbeforeunload = function() {
    console.log(window.location.href);
};

function listener_for_start_aht() {
    var takeTaskBtnlist = document.getElementsByClassName('mat-button-wrapper');
    if (window.location.href.indexOf('https://crm2.skyeng.ru/customer-support/start') !== -1 && takeTaskBtnlist.length > 0) {
      if (takeTaskBtnlist[13] && takeTaskBtnlist[13].innerText == 'Взять новую задачу') {
        var TaskahtBtn = takeTaskBtnlist[13];
        TaskahtBtn.addEventListener("click", function() {
            if (document.getElementsByClassName('mat-button-disabled').length === 0) {
                startahttimer()
            }
          });
        clearInterval(ahtstartchecklistener)
      }
    }
}
var ahtstartchecklistener = setInterval(listener_for_start_aht, 1000);

function startahttimer() {
    var datetask = new Date();
    var taskminutes = datetask.getMinutes().toString().padStart(2, '0');
    var taskseconds = datetask.getSeconds().toString().padStart(2, '0');
  
    localStorage.setItem('opintask', true);
    localStorage.setItem('taskminutes', taskminutes);
    localStorage.setItem('taskseconds', taskseconds);
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
