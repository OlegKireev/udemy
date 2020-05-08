'use strict';

let runBtn = document.querySelector('#start');

let resultWrapper = document.querySelector('.result');
let budgetField = resultWrapper.querySelector('.budget-value');
let dailyBudgetField = resultWrapper.querySelector('.daybudget-value');
let incomeLevelField = resultWrapper.querySelector('.level-value');
let expensesField = resultWrapper.querySelector('.expenses-value');
let optionalExpensesField = resultWrapper.querySelector('.optionalexpenses-value');
let additionalIncomeField = resultWrapper.querySelector('.income-value');
let monthlySavingsField = resultWrapper.querySelector('.monthsavings-value');
let annualSavingsField = resultWrapper.querySelector('.yearsavings-value');


let dataWrapper = document.querySelector('.data');

let expensesInputs = dataWrapper.querySelectorAll('.expenses-item');
let expensesAddBtn = dataWrapper.querySelector('.expenses-item-btn');

let optionalExpensesInputs = dataWrapper.querySelectorAll('.optionalexpenses-item');
let optionalExpensesBtn = dataWrapper.querySelector('.optionalexpenses-btn');

let additionalIncomeInput = dataWrapper.querySelector('.choose-income');

let isSavingsInput = dataWrapper.querySelector('.savings');

let savingsSum = dataWrapper.querySelector('.choose-sum');
let savingsPercent = dataWrapper.querySelector('.choose-percent');


let timeWrapper = document.querySelector('.time-data');

let yearOutput = timeWrapper.querySelector('.year-value');
let monthOutput = timeWrapper.querySelector('.month-value');
let dayOutput = timeWrapper.querySelector('.day-value');