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
periodSelect = document.querySelector('.period-select'),
inputsData = document.querySelectorAll('.data input[type=text]');

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
		this.saveData();
		this.budjet = +salaryAmount.value;
		this.getExpInc();
		this.getExpensesMonth();
		this.getAddIncExp();
		if(this.getInfoDeposit()) {
			this.getBudjet();
			this.getTargetMonth();
			this.showResult();
			startButton.style.display = 'none';
			cancelButton.style.display = 'inline-block';
			inputsData.forEach((input) => {
				input.disabled = true;
			});
			incomeAdd.disabled = true;
			expensesAdd.disabled = true;
		}
		this.saveData();
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
		localStorage.clear();
		this.clearCookie();
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
	setCookie(key, value, year, month, day, path, domain, secure) {
		let cookieStr = encodeURI(key) + '=' + encodeURI(value);
		if (year && month) {
			const expires = new Date(year+1, month-1, day);
			cookieStr += '; expires=' + expires.toGMTString();
		} else {
			cookieStr += '; expires=' + year;
		}
		cookieStr += path ? '; path=' + path : '';
		cookieStr += domain ? '; domain=' + domain : '';
		cookieStr += secure ? '; secure' : '';
		document.cookie = cookieStr;
	}
	getCookie(key) {
		const reg = new RegExp(`${key}[^;]+`, 'gm');
		const strCookie = decodeURI(document.cookie).match(reg).join();
		return strCookie.split('=')[1];
	}
	clearCookie() {
		[...resultTotal].forEach(item => {
			this.setCookie(item.className, item.value, -1);
		});
	}
	saveData() {
		const date = new Date();
		[...resultTotal].forEach((item) => {
			localStorage.setItem(item.className, JSON.stringify(item.value));
			this.setCookie(item.className, item.value, date.getFullYear(), date.getMonth(), date.getDate());
		});
	}
	getObj() {
		for(let input of [...resultTotal]) {
			if(this.getCookie(input.className) === JSON.parse(localStorage.getItem(input.className))) {
				input.value = this.getCookie(input.className);
			} else {
				this.clearCookie();
				this.reset();
				break;
			};
		};
		if (resultTotal[0].value > 0) {
			inputsData.forEach((input) => {
				input.disabled = true;
			});
			startButton.style.display = 'none';
			cancelButton.style.display = 'inline-block';
		}
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
	addExpIncBlock(item, add) {
		const itemClone = item[0].cloneNode(true),
		str = item[0].className.split('-')[0];
		itemClone.querySelector(`.${str}-title`).value = '';
		itemClone.querySelector(`.${str}-amount`).value = '';
		add.insertAdjacentElement('beforebegin', itemClone);
		item = document.querySelectorAll(`.${str}-items`);
		if(item.length === 3) {
			add.style.display = 'none';
		}
	}
	getAddIncExp() {
		this.addExpenses = additionalExpensesItem.value.split(', ');
		const addArr = (item) => {
			const str = item.className.split('-')[0].split('_')[1];
			if (this.isString(item.value)) {
				this[`add${str[0].toUpperCase() + str.slice(1)}`].push(item.value);
			}
		};
		additionalIncomeItem.forEach(addArr);
		addArr(additionalExpensesItem);
	}
	getExpInc() {
		const count = item => {
			const	startStr = item.className.split('-')[0],
					itemTitle = item.querySelector(`.${startStr}-title`),
					itemAmount = item.querySelector(`.${startStr}-amount`);

			if (this.isString(itemTitle.value) && this.isNumber(itemAmount.value)) {
				this[startStr][itemTitle.value] = itemAmount.value;
			} else {
				itemTitle.style.border = '1px solid red';
				itemAmount.style.border = '1px solid red';
			}
		}
		incomeItem.forEach(count);
		expensesItem.forEach(count);
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
		if(depositPercent.value < 0 || depositPercent.value > 100) {
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
		this.getObj.call(this);
		start.addEventListener('click', this.start.bind(this));
		expensesAdd.addEventListener('click', this.addExpIncBlock.bind(this, expensesItem, expensesAdd));
		incomeAdd.addEventListener('click', this.addExpIncBlock.bind(this, incomeItem, incomeAdd));
		periodSelect.addEventListener('change', this.periodChange.bind(this));
		cancelButton.addEventListener('click', this.reset.bind(this));
		depositCheck.addEventListener('change', this.depositHandler.bind(this));
		depositPercent.addEventListener('change', this.getInfoDeposit.bind(this));
		depositAmount.addEventListener('change', this.getInfoDeposit.bind(this));
		window.addEventListener('unload', this.saveData.bind(this));
	};
};
const appData = new AppData();
appData.eventListeners();