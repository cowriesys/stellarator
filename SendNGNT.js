const StellarSDK = require('stellar-sdk');
const horizon = new StellarSDK.Server('https://horizon.stellar.org');
StellarSDK.Network.usePublicNetwork();

let NGNT = {asset:'NGNT', issuer: 'GAWODAROMJ33V5YDFY3NPYTHVYQG7MJXVJ2ND3AOGIHYRWINES6ACCPD'};

let senderAccountSecret = 'SECRET-KEY';
let destinationAccountAddress = 'GB3B2EQSBR4A5WFSR6KBDSTSZNCZLKGEIBI7HCM3XZIGAFCEINAK3QUT';

let senderAccount = StellarSDK.Keypair.fromSecret(senderAccountSecret);
let destinationAccount = StellarSDK.Keypair.fromPublicKey(destinationAccountAddress);


/**SEND NGNT**/
horizon.loadAccount(senderAccount.publicKey())
.then((account) => {
    var transaction = new StellarSDK.TransactionBuilder(account, opts={fee:100})
        .addOperation(StellarSDK.Operation.payment({
            destination: destinationAccount.publicKey(),
            asset: new StellarSDK.Asset(NGNT.asset, NGNT.issuer),
            amount: '2000'
        })).setTimeout(0).build();

    transaction.sign(senderAccount);
    return horizon.submitTransaction(transaction);
})
.then((result) => {
    console.log('Complete View the transaction at: ' + result._links.transaction.href);
});