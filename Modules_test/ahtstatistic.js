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
                startahttimer()
            }
          });
        clearInterval(ahtstartchecklistener)
      }
    }
}
var ahtstartchecklistener = setInterval(startlisteneraht, 1000);

var timerisstarted;
function startahttimer() {
    var datetask = new Date();
    var taskhours = datetask.getHours().toString().padStart(2, '0');
    var taskminutes = datetask.getMinutes().toString().padStart(2, '0');
    var taskseconds = datetask.getSeconds().toString().padStart(2, '0');
  
    localStorage.setItem('opintask', true);
    localStorage.setItem('taskminutes', taskminutes);
    localStorage.setItem('taskseconds', taskseconds);
    timerisstarted = setInterval(CRM_aht_timer_on_javascript, 1000);
}


function CRM_aht_timer_on_javascript() { // таймер c момента взятия задачи
    var data = new Date();
    var minutes = data.getMinutes();
    var seconds = data.getSeconds();
    
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
        
    var time = formatTime(elapsedMinutes, elapsedSeconds);
    document.getElementById("ahttimercrm").innerText = time;
}
  
function formatTime(minutes, seconds) {
    var formattedMinutes = minutes < 10 ? "0" + minutes : minutes.toString();
    var formattedSeconds = seconds < 10 ? "0" + seconds : seconds.toString();
    return formattedMinutes + " : " + formattedSeconds;
}
