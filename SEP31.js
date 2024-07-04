const fetch = require('node-fetch');
const StellarSdk = require('stellar-sdk');
const querystring = require('querystring');

const networkPassphrase = 'Public Global Stellar Network ; September 2015';

const url = 'https://api.cowrie.exchange/sep31/direct/transactions';

module.exports = {
    send: (remittance, jwt) => {
        var post = JSON.stringify(remittance);
        var api = url;
        console.log(api);
        console.log(post);
        
        var remit = fetch(
            api, { 
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                }, 
                body: post 
            }
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
            return body;
        }).catch((error) => {
            console.log(error);
        });

        return remit;
    }
}
