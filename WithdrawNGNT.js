const Transfer = require('./SEP6');
const StellarSdk = require('stellar-sdk');
const horizon = new StellarSdk.Server('https://horizon.stellar.org');
const networkPassphrase = 'Public Global Stellar Network ; September 2015';

let NGNT = {asset:'NGNT', issuer: 'GAWODAROMJ33V5YDFY3NPYTHVYQG7MJXVJ2ND3AOGIHYRWINES6ACCPD'};

let senderAccountSecret = 'SECRET-KEY';
let senderAccount = StellarSdk.Keypair.fromSecret(senderAccountSecret);

var bankAccountNumber = '005509890';
var bank = 'GTBank';

/**WIHDRAW NGNT**/
Transfer.withdraw('bank_account', NGNT.asset, bankAccountNumber, bank, null, null, null)
.then((withdraw) => {

    horizon.loadAccount(senderAccount.publicKey())
    .then((account) => {
        var transaction = new StellarSdk.TransactionBuilder(account, opts={fee:100,networkPassphrase:networkPassphrase})
            .addMemo(StellarSdk.Memo.text(withdraw.memo))
            .addOperation(StellarSdk.Operation.payment({
                destination: withdraw.account_id,
                asset: new StellarSdk.Asset(NGNT.asset, NGNT.issuer),
                amount: '1200'
            })).setTimeout(0).build();
    
        transaction.sign(senderAccount);
        return horizon.submitTransaction(transaction);
    })
    .then((result) => {
     console.log('Complete View the transaction at: ' + result._links.transaction.href);
    });    
});

