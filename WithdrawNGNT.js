const Transfer = require('./SEP6');
const StellarSDK = require('stellar-sdk');
const horizon = new StellarSDK.Server('https://horizon.stellar.org');
StellarSDK.Network.usePublicNetwork();

let NGNT = {asset:'NGNT', issuer: 'GAWODAROMJ33V5YDFY3NPYTHVYQG7MJXVJ2ND3AOGIHYRWINES6ACCPD'};

let senderAccountSecret = 'SECRET-KEY';
let senderAccount = StellarSDK.Keypair.fromSecret(senderAccountSecret);

var bankAccountNumber = '0005538936';
var bank = 'GTBank';

/**WIHDRAW NGNT**/
Transfer.withdraw('bank_account', NGNT.asset, bankAccountNumber, bank, null, null, null)
.then((withdraw) => {

    horizon.loadAccount(senderAccount.publicKey())
    .then((account) => {
        var transaction = new StellarSDK.TransactionBuilder(account, opts={fee:100})
            .addMemo(StellarSDK.Memo.text(withdraw.memo))
            .addOperation(StellarSDK.Operation.payment({
                destination: withdraw.account_id,
                asset: new StellarSDK.Asset(NGNT.asset, NGNT.issuer),
                amount: '1200'
            })).setTimeout(0).build();
    
        transaction.sign(senderAccount);
        return horizon.submitTransaction(transaction);
    })
    .then((result) => {
     console.log('Complete View the transaction at: ' + result._links.transaction.href);
    });    
});

