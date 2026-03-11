// load environment variables (uses dotenv; install with `npm install dotenv`)
require('dotenv').config();

const StellarSdk = require('stellar-sdk');
const Transfer = require('./SEP6');

let NGNT = {asset:'NGNT', issuer: 'GAWODAROMJ33V5YDFY3NPYTHVYQG7MJXVJ2ND3AOGIHYRWINES6ACCPD'};

// read sender secret from .env
const senderAccountSecret = process.env.SENDER_ACCOUNT_SECRET;
if (!senderAccountSecret) {
    throw new Error('Please set SENDER_ACCOUNT_SECRET in your .env file');
}
const senderAccount = StellarSdk.Keypair.fromSecret(senderAccountSecret);

var amount = 1000;
var customerId = "CUSTOMER-ID";
var bankAccountNumber = 'BANK-ACCOUNT-NUMBER';
var bank = 'BANK-SORT-CODE';

/**WIHDRAW NGNT**/
Transfer.withdraw(NGNT.asset, senderAccount, amount, customer_id, bank, bankAccountNumber)
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