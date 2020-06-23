'use strict';

const startButton = document.getElementById('start'),
buttonIncomeAdd = document.querySelectorAll('button')[0],
buttonExpensesAdd = document.querySelectorAll('button')[1],
depositCheck = document.querySelector('#deposit-check'),
inputAddIncom = document.querySelectorAll('.additional_income-item'),
inputSalaryAmount = document.querySelector('.salary-amount'),
inputIncomeTitle = document.querySelector('input.income-title'),
inputIncomeAmount = document.querySelector('.income-amount'),
inputExpensesTitle = document.querySelector('input.expenses-title'),
inputExpensesAmount = document.querySelector('.expenses-amount'),
inputAddExpensesItem = document.querySelector('.additional_expenses-item'),
inputTargetAmount = document.querySelector('.target-amount'),
budjetDayValue = document.querySelector('.budget_day-value'),
budjetMonthValue = document.querySelector('.budget_month-value'),
expensesMonthValue = document.querySelector('.expenses_month-value'),
addIncomeValue = document.querySelector('.additional_income-value'),
addExpensesValue = document.querySelector('.additional_expenses-value'),
incomePeriodValue = document.querySelector('.income_period-value'),
targetMonthValue = document.querySelector('.target_month-value'),
range = document.querySelector('.period-select');

console.log(startButton, buttonIncomeAdd, buttonExpensesAdd, depositCheck, inputAddIncom, inputSalaryAmount, inputIncomeTitle, inputIncomeAmount, inputExpensesTitle, inputExpensesAmount, inputAddExpensesItem,inputTargetAmount, budjetDayValue, budjetMonthValue, expensesMonthValue, addIncomeValue, addExpensesValue, incomePeriodValue, targetMonthValue, range);

// let money;

// const start = function() {
// 	do {
// 		money = prompt('Ваш месячный доход?', 50000);
// 	}
// 	while (!isNumber(money));
// }

// const isNumber = function(n) {
// 	return !isNaN(parseFloat(n)) && isFinite(n);
// }

// const isString = function(string) {
// 	return (/[a-zA-Z|а-яА-Я]/g).test(string) && string !== null;
// }
// start();

// let appData = {
// 	budjet: money,
// 	budjetDay: 0,
// 	budjetMonth: 0,
// 	expensesMonth: 0,
// 	income: {},
// 	addIncome: [],
// 	expenses: {},
// 	addExpenses: [],
// 	deposit: false,
// 	percentDeposit: 0,
// 	moneyDeposit: 0,
// 	mission: 50000,
// 	period: 3,
// 	asking: function() {
// 		if(confirm('Есть ли у вас дополнительный заработок?')) {
// 			let itemIncome, cashIncome;
// 			do {
// 				itemIncome = prompt('Какой у вас дополнительный заработок?', 'Фриланс');
// 			}
// 			while(!isString(itemIncome));
// 			do {
// 				cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
// 			}
// 			while(!isNumber(cashIncome));
// 		}
// 		let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'кино, концерты, рестораны');
// 		addExpenses = addExpenses.toLowerCase().split(', ');
// 		addExpenses.forEach((item) => {
// 			appData.addExpenses.push(item[0].toUpperCase() + item.slice(1));
// 		})
// 		appData.deposit = confirm('Есть ли у вас депозит в банке?');
// 		let article,
// 		consumption;

// 		for(let i = 0; i < 2; i++) {
// 			do {
// 			article = prompt('Введите обязательную статью расходов?', 'квартплата');
// 			} while (!isString(article));
// 			do {
// 				consumption = prompt('Во сколько это обойдется?', 5000);
// 			} while (!isNumber(consumption));
	
// 			appData.expenses[article] = +consumption;
// 		}
// 	},
// 	getExpensesMonth: function() {
// 		for(let article in appData.expenses) {
// 			appData.expensesMonth += +appData.expenses[article];
// 		}
// 	},
// 	getBudjet: function(money) {
// 		appData.budjetMonth = +money - appData.expensesMonth;
// 		appData.budjetDay = Math.floor(appData.budjetMonth / 30);
// 	},
// 	getTargetMonth: function() {
// 		let target = appData.mission / appData.budjetMonth;
// 		return target;
// 	},
// 	targetMessageShow: function(target) {
// 		target > 0 ? 
// 		console.log('Цель будет достигнута!') :
// 		console.log('Цель не будет достигнута');
// 	},
// 	getStatusIncome: function(budjet) {
// 		if(budjet < 0) {
// 			return 'Что то пошло не так';
// 		} else {
// 			if(budjet > 1200) {
// 				return 'У вас высокий уровень дохода';
// 			} else if(budjet < 600) {
// 				return 'К сожалению у вас уровень дохода ниже среднего';
// 			} else {
// 				return 'К сожалению у вас средний уровень дохода';
// 			}
// 		}
// 	},
// 	getinfoDeposit: function() {
// 		if(appData.deposit) {
// 			do {
// 				appData.percentDeposit = prompt('Какой годовой процент?', '10');
// 			}	while (!isString(appData.percentDeposit));
// 			do {
// 				appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
// 			} while (!isNumber(appData.moneyDeposit));
// 		}
// 	},
// 	calcSavedMoney: function() {
// 		return appData.budjetMonth * appData.period;
// 	}
// };
// appData.asking();
// appData.getExpensesMonth();
// console.log('Расходы за месяц: ' + appData.expensesMonth);
// appData.getBudjet(appData.budjet);
// console.log('Цель: ' + appData.mission + '$ будет достигнута через ' + appData.getTargetMonth() + ' месяцев');
// console.log(appData.getStatusIncome(appData.budjetDay));
// console.log(`Наша программа включает в себя данные: `);
// for(let property in appData) {
// 	console.log(`${property}: `, appData[property]);
// }