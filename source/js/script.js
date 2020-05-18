'use strict';

// Табы
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
      // если событие произошло, и мы кликнули по элементу
      //  с нужным классом
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

// Таймер
(function () {

  window.addEventListener(`DOMContentLoaded`, function () {

    // Дата до которой идет отсчет таймера
    let dedline = `2020-05-15T18:00`;

    function getTimeRemaining(endtime) {

      // Кол-во милисекунд до дедлайна (от даты дедлайна
      // отнимаем текущую дату)
      let t = Date.parse(endtime) - Date.parse(new Date());
      // Делим мсек. до дедлайна на 1000 - получаем секунды,
      // получаем остаток от деления на 60 и получаем число
      // не больше 60
      let seconds = Math.floor((t / 1000 % 60));
      let minutes = Math.floor((t / 1000 / 60 % 60));
      let hours = Math.floor(t / 1000 / 60 / 60);
      // Если нужны дни
      // let days = Math.floor(t / 1000 / 60 % 24);

      // Возвращаем все значения в виде объекта для удобного
      // обращения к ним
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
        // Добавляем один "0" если число меньше 9
        if (t.hours < 10) {
          hours.textContent = `0${String(t.hours)}`;
        // Если значение пустое ставим "00"
        } else if (t.hours === 0) {
          hours.textContent = `00`;
        // Иначе просто число
        } else {
          hours.textContent = t.hours;
        }

        // Минуты
        if (t.minutes < 10) {
          minutes.textContent = `0${String(t.minutes)}`;
        } else if (t.minutes === 0) {
          minutes.textContent = `00`;
        } else {
          minutes.textContent = t.minutes;
        }

        // Секунды
        if (t.seconds < 10) {
          seconds.textContent = `0${String(t.seconds)}`;
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

// Модальное окно
(function () {

  window.addEventListener(`DOMContentLoaded`, () => {

    const ESC_KEYCODE = 27;

    let moreBtn = document.querySelector(`.more`);
    let tabsMoreBtn = document.querySelectorAll(`.description-btn`);
    let modal = document.querySelector(`.overlay`);
    let closeBtn = modal.querySelector(`.popup-close`);

    let onModalEscKeydown = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeModal();
      }
    };

    function openModal() {
      window.addEventListener(`keydown`, onModalEscKeydown);
      modal.style.display = `block`;
      moreBtn.classList.add(`more-splash`);
      document.body.style.overflow = `hidden`;
    }

    function closeModal() {
      window.removeEventListener(`keydown`, onModalEscKeydown);
      modal.style.display = ``;
      moreBtn.classList.remove(`more-splash`);
      document.body.style.overflow = ``;
    }

    moreBtn.addEventListener(`click`, () => {
      openModal();
    });

    closeBtn.addEventListener(`click`, () => {
      closeModal();
    });

    tabsMoreBtn.forEach((btn) => {
      btn.addEventListener(`click`, () => {
        openModal();
      });
    });


  });
})();

// Формы

(function () {

  window.addEventListener(`DOMContentLoaded`, () => {

    // Находим элементы формы на странице
    let modalForm = document.querySelector(`.main-form`);
    let inputs = modalForm.querySelectorAll(`input`);

    let contactForm = document.querySelector(`#form`);
    let contactInputs = contactForm.querySelectorAll(`input`);

    // Создаем узел для помещения туда сообщения о статусе
    // загрузки
    let statusMessage = document.createElement(`div`);

    // Записываем в объект все сообщения о процессе загрузки
    let message = {
      loading: `Загрузка...`,
      success: `Спасибо. Мы скоро с вами свяжемся!`,
      failure: `Что-то пошло не так...`
    };

    // Обработчик для модальной формы
    let onModalFormSubmit = function (evt) {
      // Отключаем перезагрузку страницы
      evt.preventDefault();

      // Добавляем в форму узел с сообщением о статусе загрузки
      modalForm.append(statusMessage);

      // Добавляем класс узлу
      statusMessage.classList.add(`status`);

      serverRequest(modalForm);

      // Обнуляем значение у всех инпутов в форме
      inputs.forEach((input) => {
        input.value = ``;
      });
    };

    // Обработчик для нижней формы
    let onContactFormSubmit = function (evt) {
      // Отключаем перезагрузку страницы
      evt.preventDefault();

      // Добавляем в форму узел с сообщением о статусе загрузки
      contactForm.append(statusMessage);

      // Добавляем класс узлу
      statusMessage.classList.add(`status`);
      statusMessage.style.color = `#fff`;
      statusMessage.style.marginTop = `20px`;

      serverRequest(contactForm);

      // Обнуляем значение у всех инпутов в форме
      contactInputs.forEach((input) => {
        input.value = ``;
      });
    };

    // Запрос к серверу
    let serverRequest = function (form) {
      // Записываем с помоощью конструктора в переменную новый
      // запрос
      let request = new XMLHttpRequest();

      // Адресс сервера
      let serverUrl = `server.php`;

      // Открываем запрос на сервер, указывая метод и адрес
      // сервера
      request.open(`POST`, serverUrl);

      // Указываем тип данных передающихся по запросу
      request.setRequestHeader(`Content-type`, `application/json; charset=utf-8`);

      // Записываем с помощью констрктора в переменную данные
      //  формы которые ввел пользователь
      let formData = new FormData(form);

      // Создаем объект для помещения в него данных из формы
      let obj = {};

      // Проходимся по объекту с пользовательскими данными
      // и записываем их в обычный js-объект
      formData.forEach((value, key) => {
        obj[key] = value;
      });

      // Преобразовываем объект в JSON формат
      let json = JSON.stringify(obj);

      // Отправляем запрос на сервер
      request.send(json);

      // Вешаем обработчик изменения статуса запроса на наш
      // отправленный запрос
      request.addEventListener(`readystatechange`, () => {

        // Если запрос еще не вернулся
        if (request.readyState < 4) {
          statusMessage.textContent = message.loading;

          // Если запрос вернулся без ошибок
        } else if (request.readyState === 4 && request.status === 200) {
          statusMessage.textContent = message.success;

          // Во всех других случаях
        } else {
          statusMessage.textContent = `${message.failure}. Номер ошибки:${request.status}`;
        }
      });
    };

    modalForm.addEventListener(`submit`, onModalFormSubmit);
    contactForm.addEventListener(`submit`, onContactFormSubmit);

  });
})();
