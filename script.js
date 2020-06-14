'use strict';

let	money,
		consumption,
		income = 'фриланс',
		mission = 999999;

const isNumber = (n) => {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

const start = () => {
	do {
		money = prompt('Ваш месячный доход?', '');
	}
	while(!isNumber(money));
}

start();

const addExpensesArr = () => {
	let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', '');
	return addExpenses.toLowerCase().split(',');
}

const arrExpenses = addExpensesArr();
console.log('длина возможных расходов:', arrExpenses.length);
console.log(arrExpenses);

console.log('Цель заработать ' + mission + ' долларов');

const deposit = confirm('Есть ли у вас депозит в банке?');

const expenses = [];

const showTypeOf = (data) => {
	console.log(data, typeof(data));
}
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

const getExpensesMonth = () => {
	let sum = 0;

	for (let i = 0; i < 2; i++) {
		
		expenses[i] = prompt('Введите обязательную статью расходов?', '');
		do {
			consumption = prompt('Во сколько это обойдется?', '');
		}
		while(!isNumber(consumption));
		sum += +consumption;
	}
	console.log(expenses);
	return sum;
}

const expensesAmount = getExpensesMonth();
console.log('Расходы за месяц: ' + expensesAmount);

const getAccumulatedMonth = (money) => {
	return +money - expensesAmount;
}

const accumulatedMonth = getAccumulatedMonth(money);
console.log('Бюджет на месяц ' + accumulatedMonth);

const targetMessageShow = (target) => {
	target > 0 ? 
	console.log('Цель будет достигнута!') :
	console.log('Цель не будет достигнута');
}

const getTargetMonth = (mission, acc) => {
	let target = mission / acc;
	targetMessageShow(target);
	return target;
}

const period = getTargetMonth(mission, accumulatedMonth);
console.log('Цель: ' + mission + '$ будет достигнута через ' + period + ' месяцев');
console.log('Период равен ' + period + ' месяцев');

const getBudjetDay = (acc, days) => {
	return acc / days;
}

const budjetDay = Math.floor(getBudjetDay(accumulatedMonth, 30));
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






