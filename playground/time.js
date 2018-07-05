console.log('\n');
// UNIX epoch time - needs to be converted
// started: Jan 1st 1970 00:00:00am UTC

const moment = require('moment');

// const date = new Date();
// console.log(date.getMonth());

// var date = moment();

// console.log(date.format('MMM Do, YYYY'));

// console.log(date.format('HH:MM a \n'));


// morn = date.subtract(12, 'hours').format('H:MM a')
// console.log(morn);

const ts = moment().valueOf();
console.log(ts);

// const createdAt = 1234;
// const date = moment(createdAt);
// console.log(date.format('h:mm a'));
