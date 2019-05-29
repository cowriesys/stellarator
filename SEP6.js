const fetch = require('node-fetch');
const querystring = require('querystring');

const url = 'https://api.cowrie.exchange/transfer/';

module.exports = {
    deposit: function (asset_code, account, memo_type, memo, email_address) {

        var query = querystring.stringify({ asset_code: asset_code, account: account, memo_type: memo_type, memo: memo, email_address: email_address});
        var api = url + 'deposit?' + query;
        console.log(api);

        var deposit_response = 

        fetch(api, {
            method: 'get',
            
        }).then(function(response) {

            console.log('deposit_response: ' + response.status + ' ' + response.statusText);
            if (response.status == 200) {
                return response.json();
            }
            else {
                throw response.statusText;
            }

        }).then(function(body) {

            console.log('deposit_response: ' + JSON.stringify(body));
            return body;

        }).catch(function(error) {

           console.log('deposit_error: ' + error);
           throw error;
	    });

        return deposit_response;
    },

    withdraw: function (type, asset_code, dest, dest_extra, account, memo, memo_type) {

        var query = querystring.stringify({ asset_code: asset_code, dest: dest, dest_extra: dest_extra, account: account, memo: memo, memo_type: memo_type});
        var api = url + 'withdraw?' + query;
        console.log(api);

        var withdraw_response = 

        fetch(api, {
            method: 'get',
            
        }).then(function(response) {

            console.log('withdraw_response: ' + response.status + ' ' + response.statusText);
            if (response.status == 200) {
                return response.json();
            }
            else {
                throw response.statusText;
            }

        }).then(function(body) {

            console.log('withdraw_response: ' + JSON.stringify(body));
            return body;

        }).catch(function(error) {

           console.log('withdraw_error: ' + error);
           throw error;
	    });

        return withdraw_response;
    }
}
