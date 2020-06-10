'use strict';

const	money = prompt('Ваш месячный доход?', ''),
			income = 'фриланс',
			addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', ''),
			deposit = confirm('Есть ли у вас депозит в банке?'),
			mission = 999999,
			expenses1 = prompt('Введите обязательную статью расходов?', ''),
			amount1 = prompt('Во сколько это обойдется?', ''),
			expenses2 = prompt('Введите обязательную статью расходов?', ''),
			amount2 = prompt('Во сколько это обойдется?', '');

const showTypeOf = (data) => {
	console.log(data, typeof(data));
}

const getExpensesMonth = (amount1, amount2) => {
	return +amount1 + +amount2;
}

const getAccumulatedMonth = (money, callback) => {
	return money - callback;
}

const accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount1, amount2));

const getTargetMonth = (mission, acc) => {
	return mission / acc;
}

const period = getTargetMonth(mission, accumulatedMonth);

const getBudjetDay = (acc, days) => {
	return acc / days;
}

const budjetDay = Math.floor(getBudjetDay(accumulatedMonth, 30));

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

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log('длина addExpense:', addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' долларов');
console.log(addExpenses.toLowerCase().split(','));
console.log('Бюджет на месяц ' + accumulatedMonth);
console.log('Цель: ' + mission + '$ будет достигнута через ' + period + ' месяцев');
console.log(getExpensesMonth(amount1, amount2));
console.log('Бюджет на день ' + budjetDay);
console.log(getStatusIncome(budjetDay));