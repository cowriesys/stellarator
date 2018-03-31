# Stellarator
### Cowrie Exchange API for converting between fiat currencies and crypto currencies.
[Cowrie Exchange](https://cowrie.exchange) is a cryptocurrency exchange that enables instant conversion between fiat money (Naira NGN) and cryptocurrency ([Stellar XLM](https://stellar.org))


Cowrie Exchange acts as a bridge connecting any Nigerian bank account to any crypto exchange or wallet.
This repository documents the Cowrie Exchange API. This API exposes the Cowrie Exhange service to other wallets/services.
Any wallet/service provider can connect any Nigerian bank account using this API.
# NGNT
Cowrie Exhange issuses the NGNT token on the Stellar network.
NGNT is an asset backed digital token issued on the Stellar decentralized network, it is pegged to the Naira (NGN) on a 1:1 ratio, it digitizes the Naira giving it the benefits of a decentralized token and traditional fiat.

NGNT offers a decentralized method of storing and exchanging value globally, securely and in an instant using an accounting unit familiar to people, giving holders total control of their money.  This gives it the properties of cryptocurrency but is forever tied to the value price of NGN.

With NGNT it is now possible to integrate the NGN fiat system with distributed digital services. NGNT is tradable on the SDEX (Stellar Decentralized Exchange)

## Stellar Issuer Details
Asset|Domain|Issuer
-----|------|------
NGNT|cowrie.exchange|GAWODAROMJ33V5YDFY3NPYTHVYQG7MJXVJ2ND3AOGIHYRWINES6ACCPD

[Explore NGNT statistics](https://stellar.expert/explorer/public/asset/NGNT-GAWODAROMJ33V5YDFY3NPYTHVYQG7MJXVJ2ND3AOGIHYRWINES6ACCPD)

## API Structure
The Cowrie Exhange API is based on a HTTP/REST architecture. API clients issue HTTP GET requests with parameters specified in the query string. API responses use standard HTTP response codes with messages encoded in JSON format.

# Exchange Fiat for Crypto Request
https://api.cowrie.exchange/fiat/crypto?fiat=NGN&crypto=NGNT&address=GBS6VGR6UJYKXEPTPSU4CTPY7GFRLO4BYXFTJH3RHX4V2WIQHSRKEKKB

## Request Parameters
Name|Description
----|-----------
fiat|NGN fiat from bank account
crypto|NGNT or XLM
address|Stellar public key address
meta|Stellar memo (optional)

# Exchange Fiat for Crypto Response
A successful request will return the following JSON encoded response

**HTTP 200 OK**
```javascript
{
    pair: 'NGN/NGNT',
    exchange_rate: 1,
    fee: 100,
    deposit_ref: '0066474342',
    account_number: '0174408645',
    account_name: 'Cowrie Integrated Systems Limited',
    bank_name: 'Guaranty Trust Bank',
    eta: '5 minutes'
}
```

Response Fields|Description
----|----------------------
pair|fiat/crypto conversion pair
exchange_rate|Current exchange rate for this conversion pair
fee|Fee charged for this transaction
deposit_ref|Narration/description/remarks to include with bank deposit
account_number|Bank account number 10 digit nuban
account_name|Bank account name
bank_name|Bank name
eta|Expected Time of Arrival

## Fiat for Crypto Conversion Instructions
Launch your internet banking website or mobile banking app and make a transfer using these details
* Bank Name: Guaranty Trust Bank
* Account Name: Cowrie Integrated Systems Limited
* Account Number: 0174408645
* Narration/Description/Remarks: 0066474342

# Exchange Crypto for Fiat Request
https://api.cowrie.exchange/crypto/fiat?crypto=NGNT&fiat=NGN&bank_code=000013&account_number=0005538936

## Request Parameters
Name|Description
----|-----------
crypto|NGNT or XLM
fiat|NGN fiat from bank account
bank_code|6 digit bank sort code
account_number|10 digit nuban account number

# Exchange Crypto for Fiat Response
A successful request will return the following JSON encoded response

**HTTP 200 OK**
```javascript
{
    pair: 'NGNT/NGN',
    exchange_rate: 1,
    fee: 200,
    meta: '0000130005538936',
    address: 'GBQZOJE2GWJU5VBT6NBLD2F3IOVOYUBDAXYUU32XMHDF4RMDOURWV3GT',
    eta: '5 minutes'
}
```

Response Fields|Description
----|----------------------
pair|crypto/fiat conversion pair
exchange_rate|Current exchange rate for this conversion pair
fee|Fee charged for this transaction
meta|Bank account name
address|Stellar address to send payment
eta|Expected Time of Arrival

## Crypto for Fiat Conversion Instructions
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
404|Not Found|exchange pair not available
500|Server Error|the server encountered an error

## Cowrie Exchange Team
Cowrie Exchange was built by
* [Damola Taiwo](https://www.linkedin.com/in/damolataiwo)
* [Dolapo Taiwo](https://www.linkedin.com/in/dolapo-taiwo-94b005a)
* [Gbubemi Agbeyegbe](https://www.linkedin.com/in/gbubemi-agbeyegbe-ab785912)
* [Ladi Okordudu](https://www.linkedin.com/in/ladicowrie)