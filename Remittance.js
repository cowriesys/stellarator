const StellarSDK = require('stellar-sdk');
const Authetication = require('./SEP10');
const Remittance = require('./SEP31');

let accountSecret = 'SECRET-KEY';
let account = StellarSDK.Keypair.fromSecret(accountSecret);

let remittance = {
    stellar_account : account.publicKey(),
    asset_code: 'NGNT',
    asset_issuer: 'GAWODAROMJ33V5YDFY3NPYTHVYQG7MJXVJ2ND3AOGIHYRWINES6ACCPD',
    amount: '1000',
    sender_id: '32c4f05c326440c3b29d22f8b7ea9fd3',
    fields: {
        transaction: {
            bank_name: 'GTBank',
            account_number: '0005538936',
            type: 'NIBSS'
        }
    }
}

Authetication.challenge(account)
.then((signed) => {
    console.log('signed: ' + signed);

    Authetication.token(signed)
    .then((jwt) => {
        console.log('token: ' + jwt);

        Remittance.send(remittance)
            .then((remit) => {
                console.log(JSON.stringify(remit, jwt));
        });
    })
});




