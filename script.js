'use strict';

const money = prompt('Ваш месячный доход?', ''),
			income = 'фриланс',
			addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', ''),
			deposit = confirm('Есть ли у вас депозит в банке?'),
			mission = 999999,
			expenses1 = prompt('Введите обязательную статью расходов?', ''),
			expenses2 = prompt('Введите обязательную статью расходов?', ''),
			amount1 = prompt('Во сколько это обойдется?', ''),
			amount2 = prompt('Во сколько это обойдется?', '');

let period,
		budjetMonth,
		budjetDay;

budjetMonth = money - (Number(amount1) + Number(amount2));

period = Math.ceil(mission / budjetMonth);

budjetDay = Math.floor(budjetMonth / 30);

console.log('money: ', typeof money);
console.log('income: ', typeof income);
console.log('deposit: ', typeof deposit);
console.log('длина addExpense:', addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' долларов');
console.log(addExpenses.toLowerCase().split(','));
console.log('Бюджет на месяц ' + budjetMonth);
console.log('Цель: ' + mission + '$ будет достигнута через ' + period + ' месяцев');
console.log('Бюджет на день ' + budjetDay);

if(budjetDay < 0) {
	console.log('Что то пошло не так');
} else {
	if(budjetDay > 1200) console.log('У вас высокий уровень дохода');
	else if(budjetDay < 600) console.log('К сожалению у вас уровень дохода ниже среднего');
	else console.log('К сожалению у вас средний уровень дохода');
}
