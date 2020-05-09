'use strict';

window.addEventListener(`DOMContentLoaded`, function () {

  let tabBtnContainer = document.querySelector(`.info-header`);
  let tabBtns = document.querySelectorAll(`.info-header-tab`);
  let tabs = document.querySelectorAll(`.info-tabcontent`);

  // index - с какого индекса скрывать табы
  function hideTabs(index) {
    for (let i = index; i < tabs.length; i++) {
      tabs[i].classList.remove(`show`);
      tabs[i].classList.add(`hide`);
    }
  }
  // Прячем все табы начиная со второго
  hideTabs(1);

  function showTab(index) {
    if (tabs[index].classList.contains('hide')) {
      tabs[index].classList.remove(`hide`);
      tabs[index].classList.add(`show`);
    }
  }

  // Делигируем обработчик события на контейнер с кнопками
  tabBtnContainer.addEventListener(`click`, function (evt) {
    let target = evt.target;
    // если событие произошло, и мы кликнули по элементу с нужным классом
    if (target && target.classList.contains(`info-header-tab`)) {
      // запускаем цикл до длины псевдомассива всех табов
      for (let i = 0; i < tabs.length; i++) {
        // если мы кликнули по кнопке с индексом i
        if (target === tabBtns[i]) {
          // Прячем все табы
          hideTabs(0);
          // Показываем таб с индкксом i
          showTab(i);
        }
      }

    }
  });

});
