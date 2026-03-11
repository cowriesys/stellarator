// load environment variables (requires installing dotenv with `npm install dotenv`)
require('dotenv').config();

const StellarSdk = require('stellar-sdk');
const Authentication = require('./SEP10');
const { saveToken } = require('./TokenStore');

// read secret from .env file
const accountSecret = process.env.ACCOUNT_SECRET;
if (!accountSecret) {
    throw new Error('Missing ACCOUNT_SECRET in environment variables');
}
const account = StellarSdk.Keypair.fromSecret(accountSecret);

Authentication.challenge(account)
.then((signed) => {
    console.log('signed: ' + signed);

    Authentication.token(signed)
    .then((token) => {
        console.log('token: ' + token);
        saveToken(token);
    })
});

