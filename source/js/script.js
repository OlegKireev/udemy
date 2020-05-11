'use strict';

(function () {

  window.addEventListener(`DOMContentLoaded`, function () {

    let tabBtnContainer = document.querySelector(`.info-header`);
    let tabs = document.querySelectorAll(`.info-header-tab`);
    let tabContent = document.querySelectorAll(`.info-tabcontent`);

    // index - с какого индекса скрывать табы
    function hidetabContent(index) {
      for (let i = index; i < tabContent.length; i++) {
        tabContent[i].classList.remove(`show`);
        tabContent[i].classList.add(`hide`);
      }
    }
    // Прячем все табы начиная со второго
    hidetabContent(1);

    function showTab(index) {
      if (tabContent[index].classList.contains(`hide`)) {
        tabContent[index].classList.remove(`hide`);
        tabContent[index].classList.add(`show`);
      }
    }

    // Делигируем обработчик событий на контейнер с кнопками
    tabBtnContainer.addEventListener(`click`, function (evt) {
      let target = evt.target;
      // если событие произошло, и мы кликнули по элементу с нужным классом
      if (target && target.classList.contains(`info-header-tab`)) {
        // запускаем цикл до длины псевдомассива всех табов
        for (let i = 0; i < tabContent.length; i++) {
          // если мы кликнули по кнопке с индексом i
          if (target === tabs[i]) {
            // Прячем все табы
            hidetabContent(0);
            // Показываем таб с индкксом i
            showTab(i);
          }
        }
      }
    });

  });

})();

(function () {

  window.addEventListener(`DOMContentLoaded`, function () {

    // Дата до которой идет отсчет таймера
    let dedline = `2020-05-12T18:00`;

    function getTimeRemaining(endtime) {

      // Кол-во милисекунд до дедлайна (от даты дедлайна отнимаем текущую дату)
      let t = Date.parse(endtime) - Date.parse(new Date());
      // Делим мсек. до дедлайна на 1000 - получаем секунды, получаем остаток от
      // деления на 60 и получаем число не больше 60
      let seconds = Math.floor((t / 1000 % 60));
      let minutes = Math.floor((t / 1000 / 60 % 60));
      let hours = Math.floor(t / 1000 / 60 / 60);
      // Если нужны дни
      // let days = Math.floor(t / 1000 / 60 % 24);

      // Возвращаем все значения в виде объекта для удобного обращения к ним
      return {
        'total': t,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
      };
    }

    function setClock(id, endtime) {

      // Находим элементы на странице
      let timer = document.getElementById(id);
      let hours = timer.querySelector(`.hours`);
      let minutes = timer.querySelector(`.minutes`);
      let seconds = timer.querySelector(`.seconds`);
      // Записываем таймер в переменную для последующей остановки
      // 1000 - как часто обновлять данные о времени
      let timeInterval = setInterval(updateClock, 1000);

      function updateClock() {

        // Записываем во временную переменную объект с временем
        let t = getTimeRemaining(endtime);

        // Обновляем числа на странице
        // Часы
        // Добавляем один "0" если число меньше 9
        if (t.hours < 10) {
          hours.textContent = `0` + String(t.hours);
        // Если значение пустое ставим "00"
        } else if (t.hours === 0) {
          hours.textContent = `00`;
        // Иначе просто число
        } else {
          hours.textContent = t.hours;
        }

        // Минуты
        if (t.minutes < 10) {
          minutes.textContent = `0` + String(t.minutes);
        } else if (t.minutes === 0) {
          minutes.textContent = `00`;
        } else {
          minutes.textContent = t.minutes;
        }

        // Секунды
        if (t.seconds < 10) {
          seconds.textContent = `0` + String(t.seconds);
        } else if (t.seconds === 0) {
          seconds.textContent = `00`;
        } else {
          seconds.textContent = t.seconds;
        }

        // Остановка таймера
        if (t.total < 0) {

          clearInterval(timeInterval);
          hours.textContent = `00`;
          minutes.textContent = `00`;
          seconds.textContent = `00`;

        }
      }
    }
    // Запускаем таймер
    setClock(`timer`, dedline);

  });

})();
