const fs = require('fs');
const FormData = require('form-data');
const fetch = require('node-fetch');
const StellarSdk = require('stellar-sdk');
const Authentication = require('./SEP10');

const url = 'https://api.cowrie.exchange/kyc/customer';

let accountSecret = 'SECRET-KEY';
let account = StellarSdk.Keypair.fromSecret(accountSecret);

Authentication.challenge(account)
.then((signed) => {
    console.log('signed: ' + signed);

    Authentication.token(signed)
    .then((token) => {
        console.log('token: ' + token);

        //SEP12 HERE        
        const fileName = 'passport.jpg';
        const data = fs.readFileSync(fileName);
        const form = new FormData();
        form.append('account', account.publicKey());
        form.append('jwt', token);
        form.append('kyc_type', 'Individual');
        form.append('first_name', 'JOHNATHAN');
        form.append('last_name', 'CASH');
        form.append('birth_date', '03/05/1995');
        form.append('email_address', 'jcash@gmail.com');
        form.append('mobile_number', '2348023348970');
        form.append('id_type', 'PASSPORT');
        form.append('id_country_code', 'NGA');
        form.append('id_number', 'A00000008');
        form.append('id_issue_date', '11/08/2020');
        form.append('id_expiration_date', '10/08/2025');
        form.append('address', '17 FEMI ANYANTUGA STREET');
        form.append('city', 'SURULERE');
        form.append('state_or_province', 'LAGOS');
        form.append('address_country_code', 'NGA');
        // ID IMAGE
        form.append('photo_id_front', data, fileName);

        const kyc = fetch(url, {
            method: 'POST',
            body: form
        }).then((response) => {
            console.log('HTTP: ' + response.status);
            if((response.status == 202) || response.status == 400) {
                return response.json();
            }
            else {
                throw response.statusText;
            }
        }).then((body) => {
            console.log(JSON.stringify(body));
            return body;

        }).catch((error) => {
            console.log(error);
        });
    })
});

