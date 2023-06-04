function listener_for_aht_timer() {
    function handleClassChange(mutationsList, observer) {
      for (let mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const targetElement = mutation.target;
          const currentClass = targetElement.getAttribute('class');
          console.log('Изменен класс объекта:', currentClass);
  
          if (targetElement === TaskahtBtn && !currentClass.includes('mat-button-disabled')) {
            // Действия после удаления класса у кнопки Взять новую задачу
            console.log('Кнопка Взять новую задачу активна');
          }
  
          if (targetElement === ManualtaskahtBtn && !currentClass.includes('mat-button-disabled')) {
            // Действия после удаления класса у кнопки Взять задачу
            console.log('Кнопка Взять задачу активна');
          }
  
          if (targetElement === finishahtbnt && !currentClass.includes('mat-button-disabled')) {
            // Действия после удаления класса у кнопки Выполнить
            console.log('Кнопка Выполнить активна');
          }
        }
      }
    }
  
    function handleUrlChange(mutationsList, observer) {
      for (let mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'href') {
          const currentUrl = window.location.href;
          console.log('Изменение URL:', currentUrl);
  
          // Добавьте здесь свою логику обработки изменения URL
        }
      }
    }
  
    const observerOptions = {
      attributes: true,
      attributeFilter: ['class', 'href'],
      attributeOldValue: true,
    };
  
    const observer = new MutationObserver((mutationsList) => {
      handleClassChange(mutationsList, observer);
      handleUrlChange(mutationsList, observer);
    });
  
    if (window.location.href.includes('customer-support/start')) {
      const takeTaskBtnlist = document.getElementsByClassName('mat-button-wrapper');
      for (let index = 0; index < takeTaskBtnlist.length; index++) {
        if (takeTaskBtnlist[index].innerText === "Взять новую задачу") {
          TaskahtBtn = takeTaskBtnlist[index].parentNode;
          observer.observe(TaskahtBtn, observerOptions);
          console.log('Наблюдение за кнопкой Взять новую задачу');
          break;
        }
      }
    }
  
    if (window.location.href.includes('customer-support/list')) {
      const ManuatakeTaskBtnlist = document.getElementsByClassName('mat-button-wrapper');
      for (let index = 0; index < ManuatakeTaskBtnlist.length; index++) {
        if (ManuatakeTaskBtnlist[index].innerText === "Взять задачу") {
          ManualtaskahtBtn = ManuatakeTaskBtnlist[index].parentNode;
          observer.observe(ManualtaskahtBtn, observerOptions);
          console.log('Наблюдение за кнопкой Взять задачу');
          break;
        }
      }
    }
  
    if (window.location.href.includes('customer-support/process')) {
      const finishbtnlist = document.getElementsByClassName('mat-button-wrapper');
      for (let index = 0; index < finishbtnlist.length; index++) {
        if (finishbtnlist[index].innerText === "Выполнить") {
          finishahtbnt = finishbtnlist[index].parentNode;
          observer.observe(finishahtbnt, observerOptions);
          console.log('Наблюдение за кнопкой Выполнить');
          break;
        }
      }
    }
  }
  
  // Вызовите функцию listener_for_aht_timer() для начала отслеживания изменений класса и URL
  listener_for_aht_timer();
  

  const startPageObserver = new MutationObserver(checkStartPage);
const listPageObserver = new MutationObserver(checkListPage);
const processPageObserver = new MutationObserver(checkProcessPage);

const startPageOptions = { subtree: true, childList: true };
const listPageOptions = { subtree: true, childList: true };
const processPageOptions = { subtree: true, childList: true };

startPageObserver.observe(document.body, startPageOptions);
listPageObserver.observe(document.body, listPageOptions);
processPageObserver.observe(document.body, processPageOptions);

function checkStartPage(mutationsList) {
    if (window.location.href.includes('customer-support/start')) {
        console.log('Страница customer-support/start');
        const takeNewTaskBtn = document.querySelector("button.mat-button-wrapper:contains('Взять новую задачу')");
        if (takeNewTaskBtn) {
            console.log('Нашел кнопку Взять новую задачу');
            takeNewTaskBtn.addEventListener("click", handleButtonClick);
            startPageObserver.disconnect();
        }
    }
}

function checkListPage(mutationsList) {
    if (window.location.href.includes('customer-support/list')) {
        console.log('Страница customer-support/list');
        const takeTaskBtn = document.querySelector("button.mat-button-wrapper:contains('Взять задачу')");
        if (takeTaskBtn) {
            console.log('Нашел кнопку Взять задачу');
            takeTaskBtn.addEventListener("click", handleButtonClick);
            listPageObserver.disconnect();
        }
    }
}

function checkProcessPage(mutationsList) {
    if (window.location.href.includes('customer-support/process')) {
        console.log('Страница customer-support/process');
        const finishBtn = document.querySelector("button.mat-button-wrapper:contains('Выполнить')");
        if (finishBtn) {
            console.log('Нашел кнопку Выполнить');
            finishBtn.addEventListener("click", handleButtonClick);
            processPageObserver.disconnect();
        }
    }
}

function handleButtonClick() {
    const button = this.parentNode;
    if (!button.classList.contains('mat-button-disabled')) {
        const prevPage = window.location.href;
        console.log('Клик по кнопке');
        // Do something with prevPage
    }
}
