'use strict';

let money;
let time;

(function start() {

  money = prompt(`Ваш бюджет на месяц?`, ``);
  // Если бюджет является NaN,пустым значением или нажата кнопка "Отмена"
  while (isNaN(money) || money === `` || money === null) {
    console.log(money);
    alert(`Введите значение без использования букв`);
    money = prompt(`Ваш бюджет на месяц?`, ``);
  }
  time = prompt(`Введите дату в формате YYYY-MM-DD`, ``);

})();

// Создаем объект с данными пользователя
let appData = {
  mounthlyBudget: +money,
  timeData: time,
  expenses: {

  },
  optionalExpenses: {

  },
  income: [

  ],
  savings: false
};

// Категории расходов
(function chooseExpenses() {

  let expensesValue = 2;

  for (let i = 0; i < expensesValue; i++) {
    let expensesCategory = prompt(`Введите обязательную статью расходов в этом месяце`, ``);
    let expensesAmount = prompt(`Во сколько обойдется?`, ``);

    // Если при любом диалоге нажата "Отмена", или введена пустая строка
    if (expensesCategory === null
        || expensesCategory === ``
        || expensesAmount === null
        || expensesAmount === ``) {
      i--;
      alert(`Значения не могут быть пустыми. Введите их заново.`);

    // Если во диалоге про сумму введено не число
    } else if (isNaN(expensesAmount)) {
      alert(`Введите числовое значение.`);
      i--;

    } else {
      // Записываем данный в пользовательский объект
      appData.expenses[expensesCategory] = expensesAmount;
    }
  }

})();

(function chooseOptExpenses() {

  let expensesValue = 3;

  for (let i = 0; i < expensesValue; i++) {
    let expensesCategory = prompt(`Введите статью дополнительных расходов в этом месяце`, ``);

    // Если в диалоге нажата "Отмена", или введена пустая строка
    if (expensesCategory === null || expensesCategory === ``) {
      i--;
      alert(`Значения не могут быть пустыми. Введите их заново.`);

    } else {
      // Записываем данный в пользовательский объект
      appData.optionalExpenses[i + 1] = expensesCategory;
    }
  }

})();

// Считаем ежедневный бюджет
(function countDailyBudget() {
  let daysInMonth = 30;
  // + приводит строку к числу, toFixed() округляет число
  appData.moneyPerDay = +(appData.mounthlyBudget / daysInMonth).toFixed();
})();

// Определяем уровень бюджета и выводим на экран
(function countBudgetLevel() {

  let budgetLevel;

  if (appData.mounthlyBudget < 10000) {
    budgetLevel = `Маловато будет.`;
  } else if (appData.mounthlyBudget >= 10000 && appData.mounthlyBudget <= 30000) {
    budgetLevel = `На хлеб с маслом хватит.`;
  } else if (appData.mounthlyBudget > 30000) {
    budgetLevel = `Ну ты и аристократ!`;
  } else {
    console.log(`Ошибка ввода бюджета`);
  }

  alert(`Ваш ежедневный бюджет: ` + appData.moneyPerDay + ` рублей. ` + budgetLevel);

})();


(function checkSavings() {

  if (appData.savings) {
    let save = +prompt(`Введите сумму на банковском вкладе?`, ``);
    let percent = +prompt(`Под какой процент?`);
    appData.monthIncome = save / 100 / 12 * percent;
    alert(`Ежемесячный доход от банковского вклада составляет: ` + appData.monthIncome + ` рублей.`);
  }
})();

console.log(appData);
