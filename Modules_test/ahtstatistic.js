var taskbtnisclicked = 0; // нажатали кнопка взять задачу
var finishahtbntisclicked = 0; // нажатали кнопка выполнено

var TaskahtBtn; // кнопка взять задачу
var finishahtbnt; // кнопка выполнено

let CRMlogo; // див с логотипом

let butahttimer = document.createElement('button') // создание формы для таймера
butahttimer.id = "ahttimercrm"
butahttimer.innerText = "00 : 00"
butahttimer.title = "Таймер aht"


window.addEventListener("load", function() { // добавление таймера в логотип
    CRMlogo = document.getElementsByClassName('logo');
    setTimeout(function() {
        if (ahtshowcrm == 1){
            CRMlogo[0].style.widht = '150px'
            CRMlogo[0].appendChild(butahttimer)
        }  
    }, 1000);
});

function listener_for_start_aht() {
    console.log('Начинаю поиск кнопки взятия задачи')
    if (window.location.href.includes('customer-support/start')) {
        console.log('Нужная страница')
        var Taskahtspanbtn;
        let TaskahtBtnflag = 0;
        var takeTaskBtnlist = document.getElementsByClassName('mat-button-wrapper');
        for (let index = 0; index < takeTaskBtnlist.length; index++) {
            if (takeTaskBtnlist[index].innerText == "Взять новую задачу"){
                Taskahtspanbtn = takeTaskBtnlist[index];
                TaskahtBtnflag = 1;
                console.log('Нашел кнопку')
            }
        }
        if (TaskahtBtnflag == 1){
            TaskahtBtn = Taskahtspanbtn.parentNode;
            TaskahtBtn.addEventListener("click", function() {
                if (!TaskahtBtn.classList.contains('mat-button-disabled')) {
                    taskbtnisclicked = 1;
                    console.log('Клик по кнопке взятия задачи');
                }
              });
            console.log('addEventListener');
            clearInterval(ahtstartchecklistener);
        }
    }
}
var ahtstartchecklistener = setInterval(listener_for_start_aht, 1000);

function listener_for_stop_aht() {
    if (window.location.href.includes('customer-support/process')) {
        var finishspanbtn;
        let finishahtBtnflag = 0;
        var finishbtnlist = document.getElementsByClassName('mat-button-wrapper');
        for (let index = 0; index < finishbtnlist.length; index++) {
            if (finishbtnlist[index].innerText == "Выполнить"){
                finishspanbtn = finishbtnlist[index];
                finishahtBtnflag = 1;
            }
        }
        if (finishahtBtnflag == 1){
            finishahtbnt = finishspanbtn.parentNode;
            finishahtbnt.addEventListener("click", function() {
                if (!finishahtbnt.classList.contains('mat-button-disabled')) {
                    finishahtbntisclicked = 1;
                    console.log('Клик по кнопке');
                }
            });
            clearInterval(ahtstopchecklistener);
        }
       
    }
}
var ahtstopchecklistener = setInterval(listener_for_stop_aht, 1000);


window.addEventListener('beforeunload', function() {
    console.log('пердвыгрузкой страницы')
    if (taskbtnisclicked == 1){
//        console.log('запрашиваю запуск таймера')
//        startahttimer()
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

        console.log('Таймер запущен');
    }
    if (finishahtbntisclicked == 1){
//        stopahttimer()
        console.log('Начинаю остановку таймера');
        localStorage.setItem('opintask', false);
        localStorage.removeItem('taskminutes');
        localStorage.removeItem('taskseconds');

        console.log('Таймер остановлен');
    }
});

/*
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
}

function stopahttimer() {
    localStorage.setItem('opintask', false);
    localStorage.removeItem('taskminutes');
    localStorage.removeItem('taskseconds');
}
*/

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
