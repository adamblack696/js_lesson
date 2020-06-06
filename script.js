let money = 99999,
		income = 'фриланс',
		addExpenses = 'такси, еда, квартплата',
		deposit = true,
		mission = 9999999,
		period = 10,
		budjetDay;

console.log('money: ', typeof money);
console.log('income: ', typeof income);
console.log('deposit: ', typeof deposit);

console.log('длина addExpense:', addExpenses.length);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' долларов');

console.log(addExpenses.toLowerCase().split(','));

budjetDay = money / 30;
console.log('дневной бюджет = ' + budjetDay);

