const StellarSdk = require('stellar-sdk');
const Authentication = require('./SEP10');
const Remittance = require('./SEP31');

const horizon = new StellarSdk.Horizon.Server("https://horizon.stellar.org");
const networkPassphrase = 'Public Global Stellar Network ; September 2015';

let NGNT = {asset:'NGNT', issuer: 'GAWODAROMJ33V5YDFY3NPYTHVYQG7MJXVJ2ND3AOGIHYRWINES6ACCPD'};

let accountSecret = 'SECRET-KEY';
let source_account = StellarSdk.Keypair.fromSecret(accountSecret);

let sender_id = '32c4f05c326440c3b29d22f8b7ea9fd3';
let amount = '1000';
let bank_name = 'GTBank';
let account_number = '005509890';

let remittance = {
    stellar_account : source_account.publicKey(),
    asset_code: NGNT.asset,
    asset_issuer: NGNT.issuer,
    amount: amount,
    sender_id: sender_id,
    fields: {
        transaction: {
            bank_name: bank_name,
            account_number: account_number,
            type: 'NIBSS'
        }
    }
}

Authentication.challenge(source_account)
.then((signed) => {
    console.log('signed: ' + signed);

    Authentication.token(signed)
    .then((jwt) => {
        console.log('token: ' + jwt);

        Remittance.send(remittance)
            .then((remit) => {
                console.log(JSON.stringify(remit, jwt));

                /**SEND NGNT**/
                horizon.loadAccount(source_account.publicKey())
                .then((account) => {
                    var transaction = new StellarSdk.TransactionBuilder(account, opts={fee:1000, networkPassphrase:networkPassphrase})
                        .addOperation(StellarSdk.Operation.payment({
                            destination: remit.stellar_account_id,
                            asset: new StellarSdk.Asset(NGNT.asset, NGNT.issuer),
                            amount: amount
                        }))
                        .addMemo(StellarSdk.Memo.hash(remit.stellar_memo))
                        .setTimeout(0).build();

                    transaction.sign(source_account);
                    return horizon.submitTransaction(transaction);
                })
                .then((result) => {
                    console.log('Complete View the transaction at: ' + result._links.transaction.href);
                }).catch((exception) => {
                    console.error(exception);
                });
        });
    })
});




