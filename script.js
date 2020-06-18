'use strict';

let money;

const start = () => {
	do {
		money = prompt('Ваш месячный доход?', '');
	}
	while(!isNumber(money));
}

const isNumber = (n) => {
	return !isNaN(parseFloat(n)) && isFinite(n);
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
	mission: 50000,
	period: 0,
	asking: () => {
		let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', '');
		appData.addExpenses = addExpenses.toLowerCase().split(',');
		appData.deposit = confirm('Есть ли у вас депозит в банке?');
		let article,
		consumption;

		for(let i = 0; i < 2; i++) {
			article = prompt('Введите обязательную статью расходов?', '');
			do {
				consumption = prompt('Во сколько это обойдется?', '');
			} while (!isNumber(consumption));
	
			appData.expenses[article] = +consumption;
		}
	},
	getExpensesMonth: () => {
		let sum = 0;
		for(let article in appData.expenses) {
			sum += +appData.expenses[article];
		}

		return sum;
	},
	getBudjet: (money) => {
		appData.budjetMonth = +money - appData.getExpensesMonth();
		appData.budjetDay = Math.floor(appData.budjetMonth / 30);
	},
	getTargetMonth: (mission, acc) => {
		let target = mission / acc;
		targetMessageShow(target);
		return target;
	}

};

appData.asking();

console.log('длина возможных расходов:', appData.addExpenses.length);
console.log(appData.addExpenses);

console.log('Цель заработать ' + appData.mission + ' долларов');

console.log(appData.expenses);
console.log('Расходы за месяц: ' + appData.getExpensesMonth());

console.log('Бюджет на месяц ' + appData.budjetMonth);

const targetMessageShow = (target) => {
	target > 0 ? 
	console.log('Цель будет достигнута!') :
	console.log('Цель не будет достигнута');
}

const period = Math.ceil(appData.getTargetMonth(appData.mission, appData.budjetMonth));
console.log('Цель: ' + appData.mission + '$ будет достигнута через ' + period + ' месяцев');
console.log('Период равен ' + period + ' месяцев');

const budjetDay = appData.budjetDay;
console.log('Бюджет на день ' + budjetDay);

const getStatusIncome = (budjet) => {
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
}

console.log(getStatusIncome(budjetDay));