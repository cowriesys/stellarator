const Transfer = require('./SEP6');

let NGNT = {asset:'NGNT', issuer: 'GAWODAROMJ33V5YDFY3NPYTHVYQG7MJXVJ2ND3AOGIHYRWINES6ACCPD'};

let destinationAccountAddress = 'GB3B2EQSBR4A5WFSR6KBDSTSZNCZLKGEIBI7HCM3XZIGAFCEINAK3QUT';

Transfer.deposit(NGNT.asset, destinationAccountAddress,  null, null, 'gdini2003@gmail.com')
.then(function(deposit) {
    console.log(JSON.stringify(deposit));
});
