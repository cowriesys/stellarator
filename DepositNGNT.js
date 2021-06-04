const Transfer = require('./SEP6');

let NGNT = {asset:'NGNT', issuer: 'GAWODAROMJ33V5YDFY3NPYTHVYQG7MJXVJ2ND3AOGIHYRWINES6ACCPD'};

var destinationAccountAddress = 'GB3B2EQSBR4A5WFSR6KBDSTSZNCZLKGEIBI7HCM3XZIGAFCEINAK3QUT';
var amount = 1000;
var email = 'gdini2003@gmail.com';
var name = 'Gbubemi Agbeyegbe'

Transfer.deposit(NGNT.asset, destinationAccountAddress, amount, email, name,  null, null)
.then((deposit) => {
    console.log(JSON.stringify(deposit));
});
