'use strict';

let money,
		income,
		addExpenses,
		deposit,
		mission = 99999,
		period,
		expenses1,
		expenses2,
		amount1,
		amount2,
		budjetMonth,
		budjetDay;

alert('Учеба началась. Ура!!!');
console.log('Сообщение в консоли');

money = prompt('Ваш месячный доход?', '');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', '');
deposit = confirm('Есть ли у вас депозит в банке?');
expenses1 = prompt('Введите обязательную статью расходов?', '');
expenses2 = prompt('Введите обязательную статью расходов?', '');
amount1 = prompt('Во сколько это обойдется?', '');
amount2 = prompt('Во сколько это обойдется?', '');

budjetMonth = money - (+amount1 + +amount2);
console.log(budjetMonth);

period = Math.ceil(mission / budjetMonth);
console.log('Цель: ' + mission + '$ будет достигнута через ' + period + ' месяцев');

budjetDay = Math.floor(budjetMonth / 30);
console.log('budjetDay' + budjetDay);

if(budjetDay < 0) {
	console.log('Что то пошло не так');
} else {
	if(budjetDay > 1200) console.log('У вас высокий уровень дохода');
	else if(budjetDay < 600) console.log('К сожалению у вас уровень дохода ниже среднего');
	else console.log('К сожалению у вас средний уровень дохода');
}