const StellarSDK = require('stellar-sdk');
const Authetication = require('./SEP10');

let accountSecret = 'SECRET-KEY';
let account = StellarSDK.Keypair.fromSecret(accountSecret);

Authetication.challenge(account)
.then((signed) => {
    console.log('signed: ' + signed);

    Authetication.token(signed)
    .then((token) => {
        console.log('token: ' + token);
    })
});

