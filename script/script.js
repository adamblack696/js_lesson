'use strict';

const startButton = document.getElementById('start'),
cancelButton = document.getElementById('cancel'),
inputsData = document.querySelectorAll('.data input[type=text]'),
inputs = document.querySelectorAll('input'),
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
targetMonthValue = resultTotal[6],
periodAmount = document.querySelector('.period-amount'),
additionalExpensesItem = document.querySelector('.additional_expenses-item'),
periodSelect = document.querySelector('.period-select');

let expensesItem = document.querySelectorAll('.expenses-items'),
incomePeriodValue = resultTotal[5],
incomeItem = document.querySelectorAll('.income-items');

const isNumber = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

const isString = function(string) {
	return (/[а-яА-Я]/g).test(string);
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
		if(!isNumber(salaryAmount.value)) {
			alert('Ошибка "Месячный доход должен быть заполнен!"');
			return;
		}
		startButton.style.display = 'none';
		cancelButton.style.display = 'inline-block';
		this.budjet = +salaryAmount.value;
		salaryAmount.value = '';
		inputsData.forEach((input) => {
			input.textContent = '';
			input.disabled = true;
		});
		this.getExpenses();
		this.getIncome();
		this.getExpensesMonth();
		this.getAddExpenses();
		this.getAddIncome();
		this.getBudjet(this.budjet);
		this.getTargetMonth();
		this.showResult();
		cancelButton.addEventListener('click', this.reset)
	},
	reset: function() {
		const newObj = Object.assign({}, appData);
		appData = {};
		appData = newObj;
		appData.start;
		cancelButton.style.display = 'none';
		startButton.style.display = 'inline-block';
		inputs.forEach((input, i) => {
			input.value = '';
			if(i < 12) {
				input.disabled = false;
			}
		});
	},
	showResult: function() {
		budjetMonthValue.value = this.budjetMonth;
		budjetDayValue.value = this.budjetDay;
		expensesMonthValue.value = this.expensesMonth;
		addExpensesValue.value = this.addExpenses.join(', ');
		addIncomeValue.value = this.addIncome.join(', ');
		targetMonthValue.value = Math.ceil(this.getTargetMonth());
		this.calcSavedMoney.bind(this);
		periodSelect.addEventListener('change', this.calcSavedMoney.bind(this));
	},
	addExpensesBlock: function() {
		const cloneExpensesItem = expensesItem[0].cloneNode(true);
		cloneExpensesItem.querySelector('.expenses-title').value = '';
		cloneExpensesItem.querySelector('.expenses-amount').value = '';
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
				this.addExpenses.push(item);
			}
		});
	},
	addIncomeBlock: function() {
		const incomeItemClone = incomeItem[0].cloneNode(true);
		incomeItemClone.querySelector('.income-title').value = '';
		incomeItemClone.querySelector('.income-amount').value = '';
		incomeItem[incomeItem.length - 1].insertAdjacentElement('afterend', incomeItemClone);
		incomeItem = document.querySelectorAll('.income-items');
		if(incomeItem.length === 3) {
			incomeAdd.style.display = 'none';
		}
	},
	getAddIncome: function() {
		additionalIncomeItem.forEach((item) => {
			let itemValue = item.value.trim();
			if(isString(itemValue)) {
				this.addIncome.push(itemValue);
			} else {
				item.style.border = '1px solid red';
			}
		})
	},
	getExpenses: function() {
		expensesItem.forEach((item) => {
			let itemExpenses = item.querySelector('.expenses-title'),
			cashExpenses = item.querySelector('.expenses-amount');
			if(isString(itemExpenses.value) && isNumber(cashExpenses.value)) {
				isNumber(cashExpenses.value);
				this.expenses[itemExpenses.value] = cashExpenses.value;
			} else {
				itemExpenses.style.border = '1px solid red';
				cashExpenses.style.border = '1px solid red';
			}
		});
	},
	getIncome: function() {
		incomeItem.forEach((item) => {
			let title = item.querySelector('.income-title'),
			amount = item.querySelector('.income-amount');
			if(isString(title.value) && isNumber(amount.value)) {
				this.income[title.value] = amount.value;
			} else {
				title.style.border = '1px solid red';
				amount.style.border = '1px solid red';
			}
		});
		for(let key in this.income) {
			this.incomeMonth += +this.income[key];
		}
	},
	getExpensesMonth: function() {
		for(let article in this.expenses) {
			this.expensesMonth += +this.expenses[article];
		}
	},
	getBudjet: function(money) {
		this.budjetMonth = +money + this.incomeMonth - this.expensesMonth;
		this.budjetDay = Math.floor(this.budjetMonth / 30);
	},
	getTargetMonth: function() {
		if(isNumber(targetAmount.value)) {
			return targetAmount.value / this.budjetMonth;
		} else {
			targetAmount.style.border = '1px solid red';
			return 0; 
		}
	},
	calcSavedMoney: function() {
		incomePeriodValue.value = this.budjetMonth * periodSelect.value;
	},
	periodChange: function() {
		periodAmount.textContent = periodSelect.value;
	}
};
start.addEventListener('click', appData.start.bind(appData));
expensesPlus.addEventListener('click', appData.addExpensesBlock.bind(appData));
incomeAdd.addEventListener('click', appData.addIncomeBlock.bind(appData));
periodSelect.addEventListener('change', appData.periodChange.bind(appData));

periodSelect.addEventListener('change', () => {
	if(appData.budjetMonth) {
		appData.showResult.bind(appData);
	}
});