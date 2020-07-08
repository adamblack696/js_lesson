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

const AppData = function() {
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
};

AppData.prototype.isNumber = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

AppData.prototype.isString = function(string) {
	if(string) {
		const newString = string.match(/[а-яА-Я]/g).join('');
		return newString === string;
	} else {
		return false;
	}
}

AppData.prototype.start = function() {
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
};

AppData.prototype.reset = function() {
	const _this = this;
	const inputs = document.querySelectorAll('input');
	const newObj = new AppData();
	Object.assign(_this, newObj);
	incomeAdd.disabled = '';
	incomeAdd.style.display = '';
	expensesAdd.disabled = '';
	expensesAdd.style.display = ''
	cancelButton.style.display = 'none';
	startButton.style.display = 'inline-block';
	for(let i = 0; i < inputs.length; i++) {
		if(inputs[i].type === 'range') {
			break;
		}
		inputs[i].disabled = '';
	};
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
	removedNode(expensesItems)
	inputs.forEach((input) => {
		if(input.type !== 'range') {
			input.value = '';
		} else {
			input.value = 1;
			periodAmount.textContent = 1;
		}
	});
	this.eventListeners();
};
AppData.prototype.showResult = function() {
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
};
AppData.prototype.addExpensesBlock = function() {
	const cloneExpensesItem = expensesItem[0].cloneNode(true);
	cloneExpensesItem.querySelector('.expenses-title').value = '';
	cloneExpensesItem.querySelector('.expenses-amount').value = '';
	expensesItem[expensesItem.length - 1].insertAdjacentElement('afterend', cloneExpensesItem);
	expensesItem = document.querySelectorAll('.expenses-items');
	if(expensesItem.length === 3) {
		expensesAdd.style.display = 'none';
	}
};
AppData.prototype.getAddExpenses = function() {
	let addExpenses = additionalExpensesItem.value.split(',');
	const _this = this;
	addExpenses.forEach((item) => {
		item = item.trim();
		if(_this.isString(item)) {
			_this.addExpenses.push(item);
		}
	});
};
AppData.prototype.addIncomeBlock = function() {
	const incomeItemClone = incomeItem[0].cloneNode(true);
	incomeItemClone.querySelector('.income-title').value = '';
	incomeItemClone.querySelector('.income-amount').value = '';
	incomeItem[incomeItem.length - 1].insertAdjacentElement('afterend', incomeItemClone);
	incomeItem = document.querySelectorAll('.income-items');
	if(incomeItem.length === 3) {
		incomeAdd.style.display = 'none';
	}
};
AppData.prototype.getAddIncome = function() {
	const _this = this;
	additionalIncomeItem.forEach((item) => {
		let itemValue = item.value.trim();
		if(_this.isString(itemValue)) {
			_this.addIncome.push(itemValue);
		} else {
			item.style.border = '1px solid red';
		}
	});
};
AppData.prototype.getExpenses = function() {
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
};
AppData.prototype.getIncome = function() {
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
};
AppData.prototype.getExpensesMonth = function() {
	for(let article in this.expenses) {
		this.expensesMonth += +this.expenses[article];
	}
};
AppData.prototype.getBudjet = function() {
	this.budjet = +salaryAmount.value;
	this.budjetMonth = +this.budjet + this.incomeMonth - this.expensesMonth;
	this.budjetDay = Math.floor(this.budjetMonth / 30);
};
AppData.prototype.getTargetMonth = function() {
	if(this.isNumber(targetAmount.value)) {
		return targetAmount.value / this.budjetMonth;
	} else {
		targetAmount.style.border = '1px solid red';
		return 0; 
	}
};
AppData.prototype.calcSavedMoney = function() {
	incomePeriodValue.value = this.budjetMonth * periodSelect.value;
};
AppData.prototype.periodChange = function() {
	periodAmount.textContent = periodSelect.value;
};
AppData.prototype.eventListeners = function() {
	const _this = this;
	
	start.addEventListener('click', function() {
		_this.start();
	});
	expensesAdd.addEventListener('click', _this.addExpensesBlock);
	incomeAdd.addEventListener('click', _this.addIncomeBlock);
	periodSelect.addEventListener('change', _this.periodChange);
	cancelButton.addEventListener('click', () => {
		_this.reset.call(_this)
	});
};

const appData = new AppData();
appData.eventListeners();