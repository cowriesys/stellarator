const Transfer = require('./SEP6');

let NGNT = {asset:'NGNT', issuer: 'GAWODAROMJ33V5YDFY3NPYTHVYQG7MJXVJ2ND3AOGIHYRWINES6ACCPD'};

var destinationAccount = 'GDPSWKVZST3EQ4TNZ7LENUCDA3U3C4SL23FNPB6JFCCWI5XKEIMFAG52';
var amount = 1000;

Transfer.deposit(NGNT.asset, destinationAccount, amount)
.then((deposit) => {
    console.log(JSON.stringify(deposit));
});
