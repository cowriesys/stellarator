const StellarSdk = require('stellar-sdk');
const horizon = new StellarSdk.Server('https://horizon.stellar.org');
const networkPassphrase = 'Public Global Stellar Network ; September 2015';

let NGNT = {asset:'NGNT', issuer: 'GAWODAROMJ33V5YDFY3NPYTHVYQG7MJXVJ2ND3AOGIHYRWINES6ACCPD'};

let senderAccountSecret = 'SECRET-KEY'; // Replace with your sender account secret key
let destinationAccountAddress = 'GDI5EK4HNMBHJJQGP3GUXQJIIOHU2CJO3LABPWD6WYSPJZP5NP67TMNN';

let senderAccount = StellarSdk.Keypair.fromSecret(senderAccountSecret);
let destinationAccount = StellarSdk.Keypair.fromPublicKey(destinationAccountAddress);


/**SEND NGNT**/
horizon.loadAccount(senderAccount.publicKey())
.then((account) => {
    var transaction = new StellarSdk.TransactionBuilder(account, opts={fee:100, networkPassphrase:networkPassphrase})
        .addOperation(StellarSdk.Operation.payment({
            destination: destinationAccount.publicKey(),
            asset: new StellarSdk.Asset(NGNT.asset, NGNT.issuer),
            amount: '1000' // Amount to send
        })).setTimeout(0).build();

    transaction.sign(senderAccount);
    return horizon.submitTransaction(transaction);
})
.then((result) => {
    console.log('Complete View the transaction at: ' + result._links.transaction.href);
}).catch((exception) => {
    console.error(exception);
});