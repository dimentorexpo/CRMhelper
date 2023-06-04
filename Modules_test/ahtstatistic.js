var ahttimerchecklistener;
var ahtcheckbuttons;
var prevPageaht;
var curPageaht;

var TaskahtBtn; // кнопка взять задачу
var finishahtbnt; // кнопка выполнено

let CRMlogo; // див с логотипом

let butahttimer = document.createElement('button') // создание формы для таймера
butahttimer.id = "ahttimercrm"
butahttimer.innerText = "00 : 00"
butahttimer.title = "Таймер aht"

if (ahtshowcrm == 1) {
    setInterval(CRM_aht_timer, 1000);
    ahttimerchecklistener = setInterval(listener_for_aht_timer, 1000);
    ahtcheckbuttons = setInterval(listener_aht_buttons_is_clicked, 1000);
    window.addEventListener("load", function() { // добавление таймера в логотип
        CRMlogo = document.getElementsByClassName('logo');
        setTimeout(function() {         
            CRMlogo[0].style.widht = '150px'
            CRMlogo[0].appendChild(butahttimer)
        }, 1000);
    });
}


function listener_aht_buttons_is_clicked(){
    if (localStorage.getItem('opintask') === 'false' && window.location.href.includes('customer-support/process') && (prevPageaht.includes('customer-support/start') || prevPageaht.includes('customer-support/list'))) {
        startahttimer();
        prevPageaht = "";
        ahttimerchecklistener = setInterval(listener_for_aht_timer, 1000);
    }

    if (localStorage.getItem('opintask') === 'true' && window.location.href.includes('customer-support/start') && prevPageaht.includes('customer-support/process')) {
        stopahttimer();
        prevPageaht = "";
        ahttimerchecklistener = setInterval(listener_for_aht_timer, 1000);
    }
}

const observerOptions = {
    attributes: true,  // Наблюдать за изменениями атрибутов
    attributeFilter: ['class'],  // Отслеживать только изменения атрибута 'class'
    attributeOldValue: true,  // Сохранять старое значение атрибута
};

const observer = new MutationObserver(handleClassChange);

function handleClassChange(mutationsList, observer) {
    for (let mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const targetElement = mutation.target;
            const currentClass = targetElement.getAttribute('class');
            console.log('Изменен класс объекта:', currentClass);

            if ((targetElement === TaskahtBtn || targetElement === ManualtaskahtBtn || targetElement === finishahtbnt) && !currentClass.includes('mat-button-disabled')) {
                prevPageaht = window.location.href;
                observer.disconnect()
            }
        }
    }
}

function listener_for_aht_timer() {
    curPageaht = window.location.href;

    if (curPageaht.includes('customer-support/start')) {
        const takeTaskBtnlist = document.getElementsByClassName('mat-button-wrapper');
        for (let index = 0; index < takeTaskBtnlist.length; index++) {
          if (takeTaskBtnlist[index].innerText === "Взять новую задачу") {
            TaskahtBtn = takeTaskBtnlist[index].parentNode;
            observer.observe(TaskahtBtn, observerOptions);
            console.log('Наблюдение за кнопкой Взять новую задачу');
            clearInterval(ahtstartchecklistener);
            break;
          }
        }
      }
    
      if (curPageaht.includes('customer-support/list')) {
        const ManuatakeTaskBtnlist = document.getElementsByClassName('mat-button-wrapper');
        for (let index = 0; index < ManuatakeTaskBtnlist.length; index++) {
          if (ManuatakeTaskBtnlist[index].innerText === "Взять задачу") {
            ManualtaskahtBtn = ManuatakeTaskBtnlist[index].parentNode;
            observer.observe(ManualtaskahtBtn, observerOptions);
            console.log('Наблюдение за кнопкой Взять задачу');
            clearInterval(ahtstartchecklistener);
            break;
          }
        }
      }
    
      if (curPageaht.includes('customer-support/process')) {
        const finishbtnlist = document.getElementsByClassName('mat-button-wrapper');
        for (let index = 0; index < finishbtnlist.length; index++) {
          if (finishbtnlist[index].innerText === "Выполнить") {
            finishahtbnt = finishbtnlist[index].parentNode;
            observer.observe(finishahtbnt, observerOptions);
            console.log('Наблюдение за кнопкой Выполнить');
            clearInterval(ahtstartchecklistener);
            break;
          }
        }
      }
}

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

    console.log('Таймер запущен');
}

function stopahttimer() {
    console.log('Начинаю остановку таймера');

    localStorage.setItem('opintask', false);
    localStorage.removeItem('taskminutes');
    localStorage.removeItem('taskseconds');

    console.log('Таймер остановлен');
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
  
function formatTime(minutes, seconds) {
    var formattedMinutes = minutes < 10 ? "0" + minutes : minutes.toString();
    var formattedSeconds = seconds < 10 ? "0" + seconds : seconds.toString();
    return formattedMinutes + " : " + formattedSeconds;
}
