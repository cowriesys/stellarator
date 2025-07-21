const fetch = require('node-fetch');
const querystring = require('querystring');

const url = 'https://api.cowrie.exchange/transfer/';

module.exports = {
    deposit: (asset_code, account, amount) => {

        var query = querystring.stringify({ asset_code: asset_code, account: account, amount: amount });
        var api = url + 'deposit?' + query;
        console.log(api);

        var deposit_response = 

        fetch(api, {
            method: 'get',
            
        }).then((response) => {

            console.log('deposit_response: ' + response.status + ' ' + response.statusText);
            if (response.status == 200) {
                return response.json();
            }
            else {
                throw response.statusText;
            }

        }).then((body) => {

            console.log('deposit_response: ' + JSON.stringify(body));
            return body;

        }).catch((error) => {

           console.log('deposit_error: ' + error);
           throw error;
	    });

        return deposit_response;
    },

    withdraw: (asset_code, account, amount, bankCode, bankAccount) => {

        var query = querystring.stringify({ asset_code: asset_code, account: account, amount:amount, dest_extra: bankCode, dest: bankAccount});
        var api = url + 'withdraw?' + query;
        console.log(api);

        var withdraw_response = 

        fetch(api, {
            method: 'get',
            
        }).then((response) => {

            console.log('withdraw_response: ' + response.status + ' ' + response.statusText);
            if (response.status == 200) {
                return response.json();
            }
            else {
                throw response.statusText;
            }

        }).then((body) => {

            console.log('withdraw_response: ' + JSON.stringify(body));
            return body;

        }).catch((error) => {

           console.log('withdraw_error: ' + error);
           throw error;
	    });

        return withdraw_response;
    }
}
