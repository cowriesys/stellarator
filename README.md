# Stellarator
### Cowrie Exchange API for depositing and withdrawing NGNT digital currency.
[Cowrie Exchange](https://cowrie.exchange) is a cryptocurrency exchange that enables instant conversion between fiat money (Naira NGN) and cryptocurrency ([Stellar XLM](https://stellar.org))


Cowrie Exchange acts as a bridge connecting any Nigerian bank account to any Stellar wallet.
This repository documents the Cowrie Exchange API which exposes fiat deposit and withdrawal to other wallets/services.
Any Stellar based wallet/service provider can connect any Nigerian bank account using this API.
# NGNT
Cowrie Exhange issuses the NGNT token on the Stellar network.
NGNT is an asset backed digital token issued on the Stellar decentralized network. It is pegged to the Nigerian Naira (NGN) at a 1:1 ratio. It digitizes the Naira giving it the benefits of both a decentralized token and traditional fiat.

NGNT offers a decentralized method of storing and exchanging value globally, securely and in an instant using an accounting unit familiar to people, giving holders total control of their money.  This gives it the properties of cryptocurrency but is forever tied to the value price of NGN.

With NGNT it is now possible to integrate the NGN fiat system with distributed digital services. NGNT is tradable on the [SDEX (Stellar Decentralized Exchange)](https://www.stellarx.com/markets/NGNT:GAWODAROMJ33V5YDFY3NPYTHVYQG7MJXVJ2ND3AOGIHYRWINES6ACCPD/native)

## Stellar Issuer Details
Asset|Domain|Issuer
-----|------|------
NGNT|cowrie.exchange|GAWODAROMJ33V5YDFY3NPYTHVYQG7MJXVJ2ND3AOGIHYRWINES6ACCPD

[Explore NGNT statistics](https://stellar.expert/explorer/public/asset/NGNT-GAWODAROMJ33V5YDFY3NPYTHVYQG7MJXVJ2ND3AOGIHYRWINES6ACCPD)

## API Structure
The Cowrie Exhange API is based on a HTTP/REST architecture. API clients issue HTTP GET requests with parameters specified in the query string. API responses use standard HTTP response codes with messages encoded in JSON format. The API follows the [Stellar SEP6 standard](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0006.md)

# Deposit Request
Call this endpoint to initiate a deposit
```
https://api.cowrie.exchange/transfer/deposit?asset_code=NGNT&account=GBS6VGR6UJYKXEPTPSU4CTPY7GFRLO4BYXFTJH3RHX4V2WIQHSRKEKKB
```

## Request Parameters
Name|Description
----|-----------
asset_code|sset code to deposit (NGNT)
amount|Amount to deposit
account|Stellar public key address
memo|Stellar memo (optional)
memo_type|Stellar memo type id, text, hash (option)
type|Type of deposit, either bank or card (optional)
email_address| Email address for notifications (optional)

# Deposit Response
A successful deposit request will return the following JSON encoded response

**HTTP 200 OK**
```javascript
{
    eta: '2 minutes',
    min_amount: 200,
    fee_fixed: 100,
    how: 'Please transfer your funds to Cowrie Integrated Systems account at GTBank. The account number is 0174408645. Your deposit reference is 043558D, please put this as your transfers remarks/memo.',    
    extra_info :
    {
        bank_name: 'Guaranty Trust Bank',
        account_name: 'Cowrie Integrated Systems Limited',
        account_number: '0174408645',
        deposit_ref: '043558D'
    }
}
```

Response Fields|Description
----|----------------------
eta|Expected Time of Arrival
min_amount|The minimum acceptable deposit amount
fee_fixed|Fee charged for this deposit
how|Deposit instructions
extra_info|Deposit details
bank_name|Bank name to transfer deposit
account_name|Bank account name to transfer deposit
account_number|Bank account number to transfer deposit 




## NGNT Deposit Instructions
Launch your internet banking website or mobile banking app and make a transfer using these details
* Bank Name: Guaranty Trust Bank
* Account Name: Cowrie Integrated Systems Limited
* Account Number: 0174408645
* Narration/Description/Remarks: 043558D

# Withdraw Request
Call this endpoint to initiate a withdrawal
```
https://api.cowrie.exchange/transfer/withdraw?asset_code=NGNT&account=GBS6VGR6UJYKXEPTPSU4CTPY7GFRLO4BYXFTJH3RHX4V2WIQHSRKEKKB&dest=0005538936&dest_extra=000013
```

## Request Parameters
Name|Description
----|-----------
asset_code|Asset code to withdraw (NGNT)
account|Stellar public key address that initiates the withdaw request
dest|10 digit nuban account number
dest_extra|6 digit bank sort code
memo|Stellar memo (optional)
memo_type|Stellar memo type id, text, hash (option)
type|Type of deposit, either bank or card (optional)
email_address|Email address for notifications (optional)

# Withdraw Response
A successful withdraw request will return the following JSON encoded response

**HTTP 200 OK**
```javascript
{
    account_id: 'GBQZOJE2GWJU5VBT6NBLD2F3IOVOYUBDAXYUU32XMHDF4RMDOURWV3GT',
    memo_type: 'text',
    memo: '0000130005538936',
    eta: 120,
    min_amount: 100,
    fee_fixed: 200
}
```

Response Fields|Description
----|----------------------
account_id|Stellar public key to send the withdrawal payment
memo_type|Stellar memo type
memo|Bank account name
eta|Expected Time of Arrival
min_amount|Minimum withdrawal amount
fee_fixed|Fee charged for this transaction

## NGNT Withdrawal Instructions
To credit account: GTBank account 0005538936 from your XLM wallet, send a payment with the following details
* Address: GBQZOJE2GWJU5VBT6NBLD2F3IOVOYUBDAXYUU32XMHDF4RMDOURWV3GT
* Memo: 0000130005538936

## Bank Sort Codes
The 6 digit bank sort codes are listed here. The bank_code parameter must be from  this list.

Bank|Sort Code
----|---------
AccessBank|000014
CitiBank|000009
DiamondBank|000005
Ecobank|000010
EnterpriseBank|000019
FCMB|000003
FidelityBank|000007
FirstBank|000016
GTBank|000013
Heritage|000020
KeystoneBank|000002
SkyeBank|000008
Stanbic|000012
StandardChartered|000021
SterlingBank|000001
UBA|000004
UnionBank|000018
UnityBank|000011
WemaBank|000017
ZenithBank|000015

## Response Error Codes
A failed request for any of the APIs will result in one of the following HTTP response error codes.

HTTP Code|HTTP Status|Description
---------|-----------|------------
400|Bad Request|one or more query parameters is incorrect
404|Not Found|Asset code not available
500|Server Error|the server encountered an error
