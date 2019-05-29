const StellarSDK = require('stellar-sdk');
const horizon = new StellarSDK.Server('https://horizon.stellar.org');
StellarSDK.Network.usePublicNetwork();

let NGNT = {asset:'NGNT', issuer: 'GAWODAROMJ33V5YDFY3NPYTHVYQG7MJXVJ2ND3AOGIHYRWINES6ACCPD'};

let destinationAccountSecret = 'SCLYXA5XERZVVUT3ADWQ6AS74UXWII4PMOSOMJFGGM4QAJ6PD27DVJIH';
let destinationAccount = StellarSDK.Keypair.fromSecret(destinationAccountSecret);


/**TRUST NGNT**/
horizon.loadAccount(destinationAccount.publicKey())
.then((account) => {
    var transaction = new StellarSDK.TransactionBuilder(account, opts={fee:100})
        .addOperation(StellarSDK.Operation.changeTrust({
            asset: new StellarSDK.Asset(NGNT.asset, NGNT.issuer)
        })).setTimeout(0).build();

    transaction.sign(destinationAccount);
    return horizon.submitTransaction(transaction);
})
.then((result) => {
    console.log('Complete View the transaction at: ' + result._links.transaction.href);
});