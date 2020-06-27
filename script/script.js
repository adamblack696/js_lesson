'use strict';

const startButton = document.getElementById('start'),
incomeAdd = document.getElementsByTagName('button')[0],
expensesPlus = document.getElementsByTagName('button')[1],
depositCheck = document.querySelector('#deposit-check'),
additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
salaryAmount = document.querySelector('.salary-amount'),
inputIncomeTitle = document.querySelector('input.income-title'),
inputIncomeAmount = document.querySelector('.income-amount'),
inputExpensesTitle = document.querySelector('input.expenses-title'),
inputAddExpensesItem = document.querySelector('.additional_expenses-item'),
targetAmount = document.querySelector('.target-amount'),
resultTotal = document.getElementsByClassName('result-total'),
budjetMonthValue = resultTotal[0],
budjetDayValue = resultTotal[1],
expensesMonthValue = resultTotal[2],
addIncomeValue = resultTotal[3],
addExpensesValue = resultTotal[4],
incomePeriodValue = resultTotal[5],
targetMonthValue = resultTotal[6],
periodAmount = document.querySelector('.period-amount'),
additionalExpensesItem = document.querySelector('.additional_expenses-item'),
periodSelect = document.querySelector('.period-select');

let expensesItem = document.querySelectorAll('.expenses-items'),
incomeItem = document.querySelectorAll('.income-items');

const isNumber = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

const isString = function(string) {
	return (/[a-zA-Z|а-яА-Я]/g).test(string) && string !== null;
}

let appData = {
	budjet: 0,
	budjetDay: 0,
	budjetMonth: 0,
	expensesMonth: 0,
	income: {},
	incomeMonth: 0,
	addIncome: [],
	expenses: {},
	addExpenses: [],
	deposit: false,
	percentDeposit: 0,
	moneyDeposit: 0,
	period: 3,
	start: function() {
		if(!salaryAmount.value) {
			alert('Ошибка "Месячный доход должен быть заполнен!"');
			return;
		}
		appData.budjet = +salaryAmount.value;

		appData.getExpenses();
		appData.getIncome();
		appData.getExpensesMonth();
		appData.getAddExpenses();
		appData.getAddIncome();
		appData.getBudjet(appData.budjet);
		appData.showResult();
	},
	showResult: function() {
		budjetMonthValue.value = appData.budjetMonth;
		budjetDayValue.value = appData.budjetDay;
		expensesMonthValue.value = appData.expensesMonth;
		addExpensesValue.value = appData.addExpenses.join(', ');
		addIncomeValue.value = appData.addIncome.join(', ');
		targetMonthValue.value = Math.ceil(appData.getTargetMonth());
	},
	addExpensesBlock: function() {
		const cloneExpensesItem = expensesItem[0].cloneNode(true);
		expensesItem[expensesItem.length - 1].insertAdjacentElement('afterend', cloneExpensesItem);
		expensesItem = document.querySelectorAll('.expenses-items');
		if(expensesItem.length === 3) {
			expensesPlus.style.display = 'none';
		}
	},
	getAddExpenses: function() {
		let addExpenses = additionalExpensesItem.value.split(',');
		addExpenses.forEach((item) => {
			item = item.trim();
			if(item) {
				appData.addExpenses.push(item);
			}
		});
	},
	addIncomeBlock: function() {
		const incomeItemClone = incomeItem[0].cloneNode(true);
		incomeItem[incomeItem.length - 1].insertAdjacentElement('afterend', incomeItemClone);
		incomeItem = document.querySelectorAll('.income-items');
		if(incomeItem.length === 3) {
			incomeAdd.style.display = 'none';
		}
	},
	getAddIncome: function() {
		additionalIncomeItem.forEach((item) => {
			let itemValue = item.value.trim();
			if(itemValue) {
				appData.addIncome.push(itemValue);
			}
		})
	},
	getExpenses: function() {
		expensesItem.forEach((item) => {
			let itemExpenses = item.querySelector('.expenses-title').value,
			cashExpenses = item.querySelector('.expenses-amount').value;
			if(itemExpenses && cashExpenses) {
				appData.expenses[itemExpenses] = cashExpenses;
			}
		});
	},
	getIncome: function() {
		incomeItem.forEach((item) => {
			let title = item.querySelector('.income-title').value,
			amount = item.querySelector('.income-amount').value;
			if(title && amount) {
				appData.income[title] = amount;
			}
		})
		for(let key in appData.income) {
			appData.incomeMonth += +appData.income[key];
		}
	},
	getExpensesMonth: function() {
		for(let article in appData.expenses) {
			appData.expensesMonth += +appData.expenses[article];
		}
	},
	getBudjet: function(money) {
		appData.budjetMonth = +money + appData.incomeMonth - appData.expensesMonth;
		appData.budjetDay = Math.floor(appData.budjetMonth / 30);
	},
	getTargetMonth: function() {
		return targetAmount.value / appData.budjetMonth;
	},
	targetMessageShow: function(target) {
		target > 0 ? 
		console.log('Цель будет достигнута!') :
		console.log('Цель не будет достигнута');
	},
	getStatusIncome: function(budjet) {
		if(budjet < 0) {
			return 'Что то пошло не так';
		} else {
			if(budjet > 1200) {
				return 'У вас высокий уровень дохода';
			} else if(budjet < 600) {
				return 'К сожалению у вас уровень дохода ниже среднего';
			} else {
				return 'К сожалению у вас средний уровень дохода';
			}
		}
	},
	getinfoDeposit: function() {
		if(appData.deposit) {
			do {
				appData.percentDeposit = prompt('Какой годовой процент?', '10');
			}	while (!isString(appData.percentDeposit));
			do {
				appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
			} while (!isNumber(appData.moneyDeposit));
		}
	},
	calcSavedMoney: function() {
		return appData.budjetMonth * periodSelect.value;
	},
	periodChange: function() {
		periodAmount.textContent = periodSelect.value;
	}
};
start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomeAdd.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('change', appData.periodChange);
periodSelect.addEventListener('change', appData.start);
// console.log('Цель: ' + appData.mission + '$ будет достигнута через ' + appData.getTargetMonth() + ' месяцев');
// console.log(`Наша программа включает в себя данные: `);
// for(let property in appData) {
// 	console.log(`${property}: `, appData[property]);
// }