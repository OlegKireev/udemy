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

for (let i = 0; i < 2; i++) {
  let expensesCategory = prompt('Введите обязательную статью расходов в этом месяце', '');
  let expensesAmount = +prompt('Во сколько обойдется?', '');
  if (expensesCategory !== null
      && expensesCategory !== ``
      && expensesAmount !== null
      && expensesAmount !== ``) {
    console.log(`done`);
    appData.expenses[expensesCategory] = expensesAmount;
  } else {
    i--;
    alert(`Значения не могут быть пустыми`);
  }
}

console.log(appData);

appData.moneyPerDay = appData.mounthlyBudget / 30;

let budgetLevel;
if (appData.mounthlyBudget < 10000) {
  budgetLevel = `Маловато будет.`;
} else if (appData.mounthlyBudget >= 10000 && appData.mounthlyBudget <= 30000) {
  budgetLevel = `На хлеб с маслом хватит.`;
} else if (appData.mounthlyBudget > 30000) {
  budgetLevel = `Ну ты и аристократ!`;
} else {
  console.log(`Ошибка ввода`);
}

alert('Ваш ежедневный бюджет: ' + appData.moneyPerDay + ' рублей. ' + budgetLevel);

