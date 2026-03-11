const Transfer = require('./SEP6');

let NGNT = {asset:'NGNT', issuer: 'GAWODAROMJ33V5YDFY3NPYTHVYQG7MJXVJ2ND3AOGIHYRWINES6ACCPD'};

var destinationAccount = 'STELLAR-PUBLIC-KEY';
var amount = 1000;
var customerId = "CUSTOMER-ID";

Transfer.deposit(NGNT.asset, destinationAccount, amount, customerId)
.then((deposit) => {
    console.log(JSON.stringify(deposit));
});
