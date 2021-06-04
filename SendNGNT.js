const StellarSDK = require('stellar-sdk');
const horizon = new StellarSDK.Server('https://horizon-testnet.stellar.org');
StellarSDK.Network.useTestNetwork();

let NGNT = {asset:'NGNT', issuer: 'GAWODAROMJ33V5YDFY3NPYTHVYQG7MJXVJ2ND3AOGIHYRWINES6ACCPD'};

let senderAccountSecret = '';
let destinationAccountAddress = 'GDI5EK4HNMBHJJQGP3GUXQJIIOHU2CJO3LABPWD6WYSPJZP5NP67TMNN';

let senderAccount = StellarSDK.Keypair.fromSecret(senderAccountSecret);
let destinationAccount = StellarSDK.Keypair.fromPublicKey(destinationAccountAddress);


/**SEND NGNT**/
horizon.loadAccount(senderAccount.publicKey())
.then((account) => {
    var transaction = new StellarSDK.TransactionBuilder(account, opts={fee:100})
        .addOperation(StellarSDK.Operation.payment({
            destination: destinationAccount.publicKey(),
            asset: new StellarSDK.Asset(NGNT.asset, NGNT.issuer),
            amount: '10000000'
        })).setTimeout(0).build();

    transaction.sign(senderAccount);
    return horizon.submitTransaction(transaction);
})
.then((result) => {
    console.log('Complete View the transaction at: ' + result._links.transaction.href);
}).catch((exception) => {
    console.error(exception);
});