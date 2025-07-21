const fetch = require('node-fetch');
const StellarSdk = require('stellar-sdk');
const querystring = require('querystring');

const networkPassphrase = 'Public Global Stellar Network ; September 2015';

const url = 'https://api.cowrie.exchange/web_auth';

module.exports = {
    challenge: (keyPair) => {
        var query = querystring.stringify({ account: keyPair.publicKey()});
        var api = url + '?' + query;
        console.log(api);
        
        var signed =

        fetch(api, { method: 'GET' }
        ).then((response) => {
            console.log('HTTP: ' + response.status);
        
            if(response.status == 200) {
                return response.json();
            }
            else {
                throw response.ststausText;
            }
        }).then((body) => {
            //console.log('body: ' + JSON.stringify(body));
            var transaction = StellarSdk.TransactionBuilder.fromXDR(body.transaction, networkPassphrase);
            transaction.sign(keyPair);
            return transaction.toXDR();
        }).catch((error) => {
            console.log(error);
        });

        return signed;
    },

    token: (transaction) => {
        var post = JSON.stringify({ transaction: transaction });
        var api = url;
        console.log(api);
        console.log(post);
        
        var jwt =

        fetch(api, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: post }
        ).then((response) => {
            console.log('HTTP: ' + response.status);
        
            if(response.status == 200) {
                return response.json();
            }
            else {
                throw response.ststausText;
            }
        }).then((body) => {
            //console.log('body: ' + JSON.stringify(body));
            return body.token;
        }).catch((error) => {
            console.log(error);
        });

        return jwt;
    }
}
