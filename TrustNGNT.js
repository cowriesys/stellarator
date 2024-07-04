const StellarSdk = require("stellar-sdk");
const horizon = new StellarSdk.Horizon.Server("https://horizon.stellar.org");
const networkPassphrase = 'Public Global Stellar Network ; September 2015';

let NGNT = {asset:'NGNT', issuer: 'GAWODAROMJ33V5YDFY3NPYTHVYQG7MJXVJ2ND3AOGIHYRWINES6ACCPD'};

let destinationAccountSecret = 'SECRET-KEY';
let destinationAccount = StellarSdk.Keypair.fromSecret(destinationAccountSecret);


/**TRUST NGNT**/
horizon.loadAccount(destinationAccount.publicKey())
.then((account) => {
    var transaction = new StellarSdk.TransactionBuilder(account, opts={fee:1000, networkPassphrase:networkPassphrase})
        .addOperation(StellarSdk.Operation.changeTrust({
            asset: new StellarSdk.Asset(NGNT.asset, NGNT.issuer)
        })).setTimeout(0).build();

    transaction.sign(destinationAccount);
    return horizon.submitTransaction(transaction);
})
.then((result) => {
    console.log('Complete View the transaction at: ' + result._links.transaction.href);
});