const Transfer = require('./SEP6');
const StellarSdk = require('stellar-sdk');

let NGNT = {asset:'NGNT', issuer: 'GAWODAROMJ33V5YDFY3NPYTHVYQG7MJXVJ2ND3AOGIHYRWINES6ACCPD'};
let senderAccountSecret = 'SECRET-KEY'; // Replace with your sender account secret key
let senderAccount = StellarSdk.Keypair.fromSecret(senderAccountSecret);

var amount = 1000;
var bankAccountNumber = '0005538936';
var bank = '000013';

/**WIHDRAW NGNT**/
Transfer.withdraw(NGNT.asset, senderAccount, amount, bank, bankAccountNumber)
.then((withdraw) => {

    horizon.loadAccount(senderAccount.publicKey())
    .then((account) => {
        var transaction = new StellarSdk.TransactionBuilder(account, opts={fee:100,networkPassphrase:networkPassphrase})
            .addMemo(StellarSdk.Memo.text(withdraw.memo))
            .addOperation(StellarSdk.Operation.payment({
                destination: withdraw.account_id,
                asset: new StellarSdk.Asset(NGNT.asset, NGNT.issuer),
                amount: amount.toString()
            })).setTimeout(0).build();
    
        transaction.sign(senderAccount);
        return horizon.submitTransaction(transaction);
    })
    .then((result) => {
     console.log('Complete View the transaction at: ' + result._links.transaction.href);
    });    
});