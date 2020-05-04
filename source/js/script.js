'use strict';

let money = +prompt('Ваш бюджет на месяц?', '');
let time = prompt('Введите дату в формате YYYY-MM-DD', '');

let appData = {
  mounthlyBudget: money,
  timeData: time,
  expenses: {

  },
  optionalExpenses: {

  },
  income: [

  ],
  savings: false
};

let expensesCategory = prompt('Введите обязательную статью расходов в этом месяце', '');
let expensesAmount = prompt('Во сколько обойдется?', '');
appData[expensesCategory] = expensesAmount;
console.log(appData);

let dailyBudget = appData.mounthlyBudget / 30;

alert('Ваш ежедневный бюджет: ' + dailyBudget);

