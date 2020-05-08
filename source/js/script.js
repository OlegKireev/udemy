'use strict';

let runBtn = document.querySelector(`#start`);

let resultWrapper = document.querySelector(`.result`);
let budgetField = resultWrapper.querySelector(`.budget-value`);
let dailyBudgetField = resultWrapper.querySelector(`.daybudget-value`);
let incomeLevelField = resultWrapper.querySelector(`.level-value`);
let expensesField = resultWrapper.querySelector(`.expenses-value`);
let optionalExpensesField = resultWrapper.querySelector(`.optionalexpenses-value`);
let additionalIncomeField = resultWrapper.querySelector(`.income-value`);
let monthlySavingsField = resultWrapper.querySelector(`.monthsavings-value`);
let annualSavingsField = resultWrapper.querySelector(`.yearsavings-value`);


let dataWrapper = document.querySelector(`.data`);

let expensesInputs = dataWrapper.querySelectorAll(`.expenses-item`);
let expensesAddBtn = dataWrapper.querySelector(`.expenses-item-btn`);

let optionalExpensesInputs = dataWrapper.querySelectorAll(`.optionalexpenses-item`);
let optionalExpensesBtn = dataWrapper.querySelector(`.optionalexpenses-btn`);

let additionalIncomeInput = dataWrapper.querySelector(`.choose-income`);

let isSavingsInput = dataWrapper.querySelector(`.savings`);

let savingsSum = dataWrapper.querySelector(`.choose-sum`);
let savingsPercent = dataWrapper.querySelector(`.choose-percent`);


let timeWrapper = document.querySelector(`.time-data`);

let yearOutput = timeWrapper.querySelector(`.year-value`);
let monthOutput = timeWrapper.querySelector(`.month-value`);
let dayOutput = timeWrapper.querySelector(`.day-value`);


// Добавляем обработчик на кнопку "Начать расчет"
runBtn.addEventListener(`click`, onStartBtnClick);
// Добавляем обработчик на кнопку "Утвердить"
expensesAddBtn.addEventListener(`click`, onExpensesBtnClick);
// Добавляем обработчик на вторую кнопку "Утвердить"
optionalExpensesBtn.addEventListener(`click`, onOptExpensesBtnClick);
// Добавляем обработчик для поля с доп. доходом
additionalIncomeInput.addEventListener(`input`, onAdditionalIncomeInput);
// ------------------------------------------------------

function setTime() {
  yearOutput.value = new Date(Date.parse(appData.timeData)).getFullYear();
  monthOutput.value = new Date(Date.parse(appData.timeData)).getMonth() + 1;
  dayOutput.value = new Date(Date.parse(appData.timeData)).getDate();
}

function countDailyBudget() {
  let daysInMonth = 30;
  // + приводит строку к числу, toFixed() округляет число
  appData.moneyPerDay = +(appData.mounthlyBudget / daysInMonth).toFixed();
}


function countBudgetLevel() {
  let budgetLevel;

  if (appData.mounthlyBudget < 10000) {
    budgetLevel = `Низкий`;
  } else if (appData.mounthlyBudget >= 10000 && appData.mounthlyBudget <= 30000) {
    budgetLevel = `Средний`;
  } else if (appData.mounthlyBudget > 30000) {
    budgetLevel = `Высокий`;
  } else {
    console.log(`Ошибка ввода бюджета`);
  }
  appData.incomeLevel = budgetLevel;
}

function displayValues() {
  setTime();
  budgetField.textContent = appData.mounthlyBudget;
  dailyBudgetField.textContent = appData.moneyPerDay;
  incomeLevelField.textContent = appData.incomeLevel;
}

function resetExpensesValue() {
  expensesInputs.forEach(function (input) {
    input.value = ``;
  });
}

function onStartBtnClick() {
  let time = prompt(`Введите дату в формате YYYY-MM-DD`, ``);
  let money = prompt(`Ваш бюджет на месяц?`, ``);
  // Если бюджет является NaN,пустым значением или нажата кнопка "Отмена"
  while (isNaN(money) || money === `` || money === null) {
    console.log(money);
    alert(`Введите значение без использования букв`);
    money = prompt(`Ваш бюджет на месяц?`, ``);
  }
  appData.mounthlyBudget = +money;
  appData.timeData = time;

  countDailyBudget();
  countBudgetLevel();
  displayValues();
}

function onExpensesBtnClick() {
  let sum = 0;
  let expensesCategory;
  let expensesAmount;

  for (let i = 0; i < expensesInputs.length; i++) {
    expensesCategory = expensesInputs[i].value;
    expensesAmount = +expensesInputs[++i].value;

    // Если при любом диалоге нажата "Отмена", или введена пустая строка
    if (expensesCategory === null || expensesCategory === `` || expensesAmount === null || expensesAmount === ``) {
      i--;
      alert(`Значения не могут быть пустыми. Введите их заново.`);


    // Если в диалоге про сумму введено не число
    } else if (isNaN(expensesAmount)) {
      alert(`Введите числовое значение.`);
      i--;


    } else {
      sum += expensesAmount;
      // Записываем данные в пользовательский объект
      appData.expenses[expensesCategory] = expensesAmount;
    }
  }

  // Записываем общую сумму в пользовательский объект
  appData.expensesTotal += sum;
  // Выводим информацию на экран
  expensesField.textContent = appData.expensesTotal;
  resetExpensesValue();
}

function onOptExpensesBtnClick() {
  let expensesCategory;

  optionalExpensesInputs.forEach(function (item, i) {
    expensesCategory = item.value;

    // Если в диалоге нажата "Отмена", или введена пустая строка
    if (expensesCategory === null || expensesCategory === ``) {
      optionalExpensesField.textContent = `Значения не могут быть пустыми. Введите их заново.`;

    } else {
      // Записываем данные в пользовательский объект
      appData.optionalExpenses[i] = expensesCategory;
      // Выводим данные
      optionalExpensesField.textContent += appData.optionalExpenses[i] + ' ';
      // Сбрасываем значения полей
      optionalExpensesInputs[i].value = ``;
    }
  });

}

function onAdditionalIncomeInput() {
  let items = additionalIncomeInput.value;
  // Пока нажата кнопка отмена или введено пустое значение
  // while (items === null || items === ``) {
  //   alert(`Введенное значение не может быть пустым`);
  //   items = prompt(`Что принесет дополнительный доход? (Перечислите через запятую)`, ``);
  // }
  // // Пока тип введенных данных не строка
  // while (typeof (items) !== `string`) {
  //   alert(`Введенное значение не может состоять только из цифр.`);
  //   items = prompt(`Что принесет дополнительный доход? (Перечислите через запятую)`, ``);
  // }
  // Записываем все что ввел пользователь в массив, разделяя элементы запятой
  appData.income = items.split(`,`);
  additionalIncomeField.textContent = items;
};

// Создаем объект с данными пользователя
let appData = {

  expenses: {
  },
  expensesTotal: 0,
  optionalExpenses: {
  },
  income: [
  ],
  savings: false,
  // Категории расходов
  checkSavings() {
    if (appData.savings) {
      let save = +prompt(`Введите сумму на банковском вкладе?`, ``);
      let percent = +prompt(`Под какой процент?`);
      appData.monthIncome = save / 100 / 12 * percent;
      alert(`Ежемесячный доход от банковского вклада составляет: ` + appData.monthIncome + ` рублей.`);
    }
  },
  // chooseIncome() {
  //   let items = prompt(`Что принесет дополнительный доход? (Перечислите через запятую)`, ``);
  //   // Пока нажата кнопка отмена или введено пустое значение
  //   while (items === null || items === ``) {
  //     alert(`Введенное значение не может быть пустым`);
  //     items = prompt(`Что принесет дополнительный доход? (Перечислите через запятую)`, ``);
  //   }
  //   // Пока тип введенных данных не строка
  //   while (typeof (items) !== `string`) {
  //     alert(`Введенное значение не может состоять только из цифр.`);
  //     items = prompt(`Что принесет дополнительный доход? (Перечислите через запятую)`, ``);
  //   }
  //   // Записываем все что ввел пользователь в массив, разделяя элементы запятой
  //   this.income = items.split(`,`);
  //   // Добавдяем еще одно значене
  //   this.income.push(prompt(`Может что-то еще?`, ``));
  //   // Упорядочиваем
  //   this.income.sort();

  //   // Собираем сообщение для вывода
  //   let mess;
  //   this.income.forEach(function (item, index, arr) {
  //     // Действия при первом проходе цикла
  //     if (index === 0) {
  //       mess = (index + 1) + `. ` + item + `, `;
  //     // Действия при последнем прохоже цикла
  //     } else if (index === (arr.length - 1)) {
  //       mess += (index + 1) + `. ` + item + `.`;
  //     // Действия при всех остальных проходах циклов
  //     } else {
  //       mess += (index + 1) + `. ` + item + `, `;
  //     }
  //     console.log(mess);
  //   });

  //   // Выводим сообщение
  //   let message = this.income.join(``, ``);
  //   alert(`Способы доп. заработка: ` + mess);
  // },
  displayData() {
    let mess;
    let i = 0;
    for (let key in this) {
      if (i === 0) {
        mess = key + ` `;
      } else {
        mess += key + ` `;
      }
      i++;
    }
    alert(`Наша программа включает в себя данные: ` + mess);
  }
};


// appData.chooseExpenses();
// appData.chooseOptExpenses();
// appData.countDailyBudget();
// appData.countBudgetLevel();
// appData.checkSavings();
// appData.chooseIncome();
// appData.displayData();

console.log(appData);
