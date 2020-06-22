'use strict';

let money;

const start = () => {
	do {
		money = prompt('Ваш месячный доход?', '');
	}
	while (!isNumber(money));
}

const isNumber = (n) => {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

const isString = (string) => {
	return (/[a-zA-Z|а-яА-Я]/g).test(string) && string !== null;
}
start();

let appData = {
	budjet: money,
	budjetDay: 0,
	budjetMonth: 0,
	expensesMonth: 0,
	income: {},
	addIncome: [],
	expenses: {},
	addExpenses: [],
	deposit: false,
	percentDeposit: 0,
	moneyDeposit: 0,
	mission: 50000,
	period: 3,
	asking: () => {
		if(confirm('Есть ли у вас дополнительный заработок?')) {
			let itemIncome, cashIncome;
			do {
				itemIncome = prompt('Какой у вас дополнительный заработок?', 'Фриланс');
			}
			while(!isString(itemIncome));
			do {
				cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
			}
			while(!isNumber(cashIncome));
		}
		let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', '');
		addExpenses = addExpenses.toLowerCase().split(', ');
		addExpenses.forEach((item) => {
			appData.addExpenses.push(item[0].toUpperCase() + item.slice(1));
		})
		appData.deposit = confirm('Есть ли у вас депозит в банке?');
		let article,
		consumption;

		for(let i = 0; i < 2; i++) {
			do {
			article = prompt('Введите обязательную статью расходов?', '');
			} while (!isString(article));
			do {
				consumption = prompt('Во сколько это обойдется?', '');
			} while (!isNumber(consumption));
	
			appData.expenses[article] = +consumption;
		}
	},
	getExpensesMonth: () => {
		for(let article in appData.expenses) {
			appData.expensesMonth += +appData.expenses[article];
		}
	},
	getBudjet: (money) => {
		appData.budjetMonth = +money - appData.expensesMonth;
		appData.budjetDay = Math.floor(appData.budjetMonth / 30);
	},
	getTargetMonth: () => {
		let target = appData.mission / appData.budjetMonth;
		return target;
	},
	targetMessageShow: (target) => {
		target > 0 ? 
		console.log('Цель будет достигнута!') :
		console.log('Цель не будет достигнута');
	},
	getStatusIncome: (budjet) => {
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
	getinfoDeposit: () => {
		if(appData.deposit) {
			do {
				appData.percentDeposit = prompt('Какой годовой процент?', '10');
			}	while (!isString(appData.percentDeposit));
			do {
				appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
			} while (!isNumber(appData.moneyDeposit));
		}
	},
	calcSavedMoney: () => {
		return appData.budjetMonth * appData.period;
	}
};
appData.asking();
appData.getExpensesMonth();
console.log('Расходы за месяц: ' + appData.expensesMonth);
appData.getBudjet(appData.budjet);
console.log('Цель: ' + appData.mission + '$ будет достигнута через ' + appData.getTargetMonth() + ' месяцев');
console.log(appData.getStatusIncome(appData.budjetDay));
console.log(`Наша программа включает в себя данные: `);
for(let property in appData) {
	console.log(`${property}: `, appData[property]);
}