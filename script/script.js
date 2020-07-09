'use strict';

const startButton = document.getElementById('start'),
cancelButton = document.getElementById('cancel'),
incomeAdd = document.getElementsByTagName('button')[0],
expensesAdd = document.getElementsByTagName('button')[1],
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

class AppData {
	constructor() {
		this.budjet = 0;
		this.budjetDay = 0;
		this.budjetMonth = 0;
		this.expensesMonth = 0;
		this.income = {};
		this.incomeMonth = 0;
		this.addIncome = [];
		this.expenses = {};
		this.addExpenses = [];
		this.deposit = false;
		this.percentDeposit = 0;
		this.moneyDeposit = 0;
	}
	isNumber(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}
	isString(string) {
		if(string) {
			const newString = string.match(/[а-яА-Я]/g).join('');
			return newString === string;
		} else {
			return false;
		}
	}
	start() {
		if(!this.isNumber(salaryAmount.value)) {
			alert('Ошибка "Месячный доход должен быть заполнен!"');
			return;
		}
		startButton.style.display = 'none';
		cancelButton.style.display = 'inline-block';
		this.budjet = +salaryAmount.value;
		this.getExpenses();
		this.getIncome();
		this.getExpensesMonth();
		this.getAddExpenses();
		this.getAddIncome();
		this.getBudjet();
		this.getTargetMonth();
		this.showResult();
		const inputsData = document.querySelectorAll('.data input[type=text]');
		inputsData.forEach((input) => {
			input.disabled = true;
		});
		incomeAdd.disabled = true;
		expensesAdd.disabled = true;
	}
	reset() {
		const inputs = document.querySelectorAll('input');
		const newObj = new AppData();
		Object.assign(this, newObj);
		incomeAdd.disabled = '';
		incomeAdd.style.display = '';
		expensesAdd.disabled = '';
		expensesAdd.style.display = ''
		cancelButton.style.display = 'none';
		startButton.style.display = 'inline-block';
		for(let input of inputs) {
			if(input.type === 'range') {
				break;
			}
			input.disabled = '';
		}
		const incomeItems = document.querySelectorAll('.income-items'),
		expensesItems = document.querySelectorAll('.expenses-items');
		const removedNode = function(nodes) {
			if(nodes.length > 1) {
				for(let i = 1; i < nodes.length; i++) {
					nodes[i].remove();
				}
			}
		}
		removedNode(incomeItems);
		removedNode(expensesItems);
		inputs.forEach((input) => {
			if(input.type !== 'range') {
				input.style.border = '';
				input.value = '';
			} else {
				input.value = 1;
				periodAmount.textContent = 1;
			}
		});
		this.eventListeners();
	}
	showResult() {
		const _this = this;
		budjetMonthValue.value = this.budjetMonth;
		budjetDayValue.value = this.budjetDay;
		expensesMonthValue.value = this.expensesMonth;
		addExpensesValue.value = this.addExpenses.join(', ');
		addIncomeValue.value = this.addIncome.join(', ');
		targetMonthValue.value = Math.ceil(this.getTargetMonth());
		this.calcSavedMoney();
		periodSelect.addEventListener('change', _this.periodChange.bind(_this));
		periodSelect.addEventListener('change', _this.calcSavedMoney.bind(_this));
	}
	addExpensesBlock() {
		const cloneExpensesItem = expensesItem[0].cloneNode(true);
		cloneExpensesItem.querySelector('.expenses-title').value = '';
		cloneExpensesItem.querySelector('.expenses-amount').value = '';
		expensesItem[expensesItem.length - 1].insertAdjacentElement('afterend', cloneExpensesItem);
		expensesItem = document.querySelectorAll('.expenses-items');
		if(expensesItem.length === 3) {
			expensesAdd.style.display = 'none';
		}
	}
	getAddExpenses() {
		let addExpenses = additionalExpensesItem.value.split(',');
		const _this = this;
		addExpenses.forEach((item) => {
			item = item.trim();
			if(_this.isString(item)) {
				_this.addExpenses.push(item);
			}
		});
	}
	addIncomeBlock() {
		const incomeItemClone = incomeItem[0].cloneNode(true);
		incomeItemClone.querySelector('.income-title').value = '';
		incomeItemClone.querySelector('.income-amount').value = '';
		incomeItem[incomeItem.length - 1].insertAdjacentElement('afterend', incomeItemClone);
		incomeItem = document.querySelectorAll('.income-items');
		if(incomeItem.length === 3) {
			incomeAdd.style.display = 'none';
		}
	}
	getAddIncome() {
		const _this = this;
		additionalIncomeItem.forEach((item) => {
			let itemValue = item.value.trim();
			if(_this.isString(itemValue)) {
				_this.addIncome.push(itemValue);
			} else {
				item.style.border = '1px solid red';
			}
		});
	}
	getExpenses() {
		const _this = this;
		expensesItem.forEach((item) => {
			let itemExpenses = item.querySelector('.expenses-title'),
			cashExpenses = item.querySelector('.expenses-amount');
			if(_this.isString(itemExpenses.value) && _this.isNumber(cashExpenses.value)) {
				_this.expenses[itemExpenses.value] = cashExpenses.value;
			} else {
				itemExpenses.style.border = '1px solid red';
				cashExpenses.style.border = '1px solid red';
			}
		});
	}
	getIncome() {
		const _this = this;
		incomeItem.forEach((item) => {
			let title = item.querySelector('.income-title'),
			amount = item.querySelector('.income-amount');
			if(_this.isString(title.value) && _this.isNumber(amount.value)) {
				this.income[title.value] = amount.value;
			} else {
				title.style.border = '1px solid red';
				amount.style.border = '1px solid red';
			}
		});
		for(let key in this.income) {
			this.incomeMonth += +this.income[key];
		}
	}
	getExpensesMonth() {
		for(let article in this.expenses) {
			this.expensesMonth += +this.expenses[article];
		}
	}
	getBudjet() {
		this.budjet = +salaryAmount.value;
		this.budjetMonth = +this.budjet + this.incomeMonth - this.expensesMonth;
		this.budjetDay = Math.floor(this.budjetMonth / 30);
	}
	getTargetMonth() {
		if(this.isNumber(targetAmount.value)) {
			return targetAmount.value / this.budjetMonth;
		} else {
			targetAmount.style.border = '1px solid red';
			return 0; 
		}
	}
	calcSavedMoney() {
		incomePeriodValue.value = this.budjetMonth * periodSelect.value;
	}
	periodChange() {
		periodAmount.textContent = periodSelect.value;
	}
	eventListeners = function() {
		const _this = this;
		start.addEventListener('click', () => _this.start());
		expensesAdd.addEventListener('click', _this.addExpensesBlock);
		incomeAdd.addEventListener('click', _this.addIncomeBlock);
		periodSelect.addEventListener('change', () => {
			_this.periodChange.bind(_this);
		})
		cancelButton.addEventListener('click', () => _this.reset.call(_this));
	};
};
const appData = new AppData();
appData.eventListeners();