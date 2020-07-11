'use strict';

const startButton = document.getElementById('start'),
cancelButton = document.getElementById('cancel'),
incomeAdd = document.getElementsByTagName('button')[0],
expensesAdd = document.getElementsByTagName('button')[1],
depositCheck = document.getElementById('deposit-check'),
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
depositBank = document.querySelector('.deposit-bank'),
depositAmount = document.querySelector('.deposit-amount'),
depositPercent = document.querySelector('.deposit-percent'),
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
		this.moneyDeposit = 0;
		this.percentDeposit = 0;
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
		this.budjet = +salaryAmount.value;
		this.getExpenses();
		this.getIncome();
		this.getExpensesMonth();
		this.getAddExpenses();
		this.getAddIncome();
		if(this.getInfoDeposit()) {
			this.getBudjet();
			this.getTargetMonth();
			this.showResult();
			startButton.style.display = 'none';
			cancelButton.style.display = 'inline-block';
			const inputsData = document.querySelectorAll('.data input[type=text]');
			inputsData.forEach((input) => {
				input.disabled = true;
			});
			incomeAdd.disabled = true;
			expensesAdd.disabled = true;
		}
	}
	removedNode(nodes) {
		if(nodes.length > 1) {
			for(let i = 1; i < nodes.length; i++) {
				nodes[i].remove();
			}
		}
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
		depositPercent.style.display = 'none';
		depositPercent.setAttribute('disabled', 'disabled');
		const incomeItems = document.querySelectorAll('.income-items'),
		expensesItems = document.querySelectorAll('.expenses-items');
		this.removedNode(incomeItems);
		this.removedNode(expensesItems);
		inputs.forEach((input) => {
			if(input.type !== 'range') {
				input.style.border = '';
				input.value = '';
			} else {
				input.value = 1;
				periodAmount.textContent = 1;
			}
		});
		depositCheck.checked = false;
		depositBank.value = '';
		depositAmount.value = '';
		depositBank.style.display = '';
		depositAmount.style.display = '';
		depositBank.removeEventListener('change', this.changePercent);
	}
	showResult() {
		budjetMonthValue.value = this.budjetMonth;
		budjetDayValue.value = this.budjetDay;
		expensesMonthValue.value = this.expensesMonth;
		addExpensesValue.value = this.addExpenses.join(', ');
		addIncomeValue.value = this.addIncome.join(', ');
		targetMonthValue.value = Math.ceil(this.getTargetMonth());
		this.calcSavedMoney();
		periodSelect.addEventListener('change', () => this.periodChange.call(this));
		periodSelect.addEventListener('change', () => this.calcSavedMoney.call(this));
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
		addExpenses.forEach((item) => {
			item = item.trim();
			if(this.isString(item)) {
				this.addExpenses.push(item);
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
		additionalIncomeItem.forEach((item) => {
			let itemValue = item.value.trim();
			if(this.isString(itemValue)) {
				this.addIncome.push(itemValue);
			} else {
				item.style.border = '1px solid red';
			}
		});
	}
	getExpenses() {
		expensesItem.forEach((item) => {
			let itemExpenses = item.querySelector('.expenses-title'),
			cashExpenses = item.querySelector('.expenses-amount');
			if(this.isString(itemExpenses.value) && this.isNumber(cashExpenses.value)) {
				this.expenses[itemExpenses.value] = cashExpenses.value;
			} else {
				itemExpenses.style.border = '1px solid red';
				cashExpenses.style.border = '1px solid red';
			}
		});
	}
	getIncome() {
		incomeItem.forEach((item) => {
			let title = item.querySelector('.income-title'),
			amount = item.querySelector('.income-amount');
			if(this.isString(title.value) && this.isNumber(amount.value)) {
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
		const monthDeposit = this.percentDeposit * this.moneyDeposit;
		this.budjet = +salaryAmount.value;
		this.budjetMonth = +this.budjet + this.incomeMonth - this.expensesMonth + monthDeposit;
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
	getInfoDeposit() {
		if(!this.isNumber(depositAmount.value) || !this.isNumber(depositPercent.value) && depositPercent.value >= 0 && depositPercent.value <= 100) {
			alert('Введите корректное значение в поле проценты');
			startButton.setAttribute('disabled', 'disabled');
			depositAmount.value = 0;
			depositPercent.value = 0;
			return false;
		} else {
			this.moneyDeposit = depositAmount.value;
			this.percentDeposit = depositPercent.value;
			startButton.removeAttribute('disabled');
			return true;
		}
	}
	changePercent() {
		const valueSelect = this.value;
		if(valueSelect === 'other') {
			depositPercent.style.display = 'inline-block';
			depositPercent.removeAttribute('disabled');
		} else {
			depositPercent.value = valueSelect;
		}
	}
	depositHandler() {
		if(depositCheck.checked) {
			depositBank.style.display = 'inline-block';
			depositAmount.style.display = 'inline-block';
			this.deposit = true;
			depositBank.addEventListener('change', this.changePercent);
		} else {
			depositBank.value = '';
			depositAmount.value = '';
			depositBank.style.display = '';
			depositAmount.style.display = '';
			this.deposit = false;
			depositBank.removeEventListener('change', this.changePercent);
		}
	}
	eventListeners() {
		start.addEventListener('click', this.start.bind(this));
		expensesAdd.addEventListener('click', this.addExpensesBlock.bind(this));
		incomeAdd.addEventListener('click', this.addIncomeBlock.bind(this));
		periodSelect.addEventListener('change', this.periodChange.bind(this));
		cancelButton.addEventListener('click', this.reset.bind(this));
		depositCheck.addEventListener('change', this.depositHandler.bind(this));
		depositPercent.addEventListener('change', this.getInfoDeposit.bind(this));
		depositAmount.addEventListener('change', this.getInfoDeposit.bind(this));
	};
};
const appData = new AppData();
appData.eventListeners();