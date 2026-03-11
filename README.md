# Stellarator
### Cowrie Exchange API for depositing and withdrawing NGNT digital currency.
Cowrie Exchange API enables instant conversion between fiat money (Naira NGN) and digital currency.

Cowrie Exchange acts as a bridge connecting any Nigerian bank account to any Stellar wallet.
This repository documents the Cowrie Exchange API which exposes fiat deposit and withdrawal to other wallets or services.
Any Stellar based wallet or service provider can connect any Nigerian bank account using this API.
# NGNT
Cowrie Exchange issuses the NGNT token on the Stellar network.
NGNT is an asset backed digital token. It is pegged to the Nigerian Naira (NGN) at a 1:1 ratio. It digitizes the Naira giving it the benefits of both a decentralized token and traditional fiat.

NGNT offers a decentralized method of storing and exchanging value globally, securely and in an instant using an accounting unit familiar to people, giving holders total control of their money.  This gives it the properties of cryptocurrency but is pegged to the value price of NGN.

With NGNT it is now possible to integrate the NGN fiat system with digital services. NGNT is tradable on the [SDEX (Stellar Decentralized Exchange)](https://www.stellarx.com/markets/NGNT:GAWODAROMJ33V5YDFY3NPYTHVYQG7MJXVJ2ND3AOGIHYRWINES6ACCPD/native)

## Stellar Issuer Details
Asset|Domain|Issuer
-----|------|------
NGNT|cowrie.exchange|GAWODAROMJ33V5YDFY3NPYTHVYQG7MJXVJ2ND3AOGIHYRWINES6ACCPD

[Explore NGNT statistics](https://stellar.expert/explorer/public/asset/NGNT-GAWODAROMJ33V5YDFY3NPYTHVYQG7MJXVJ2ND3AOGIHYRWINES6ACCPD)

## API Structure
The Cowrie Exchange API is based on a HTTP/REST architecture. API clients issue HTTP requests with parameters specified in the query string or in the HTTP body in JSON format. API responses use standard HTTP response codes with messages encoded in JSON format. The API is based on the [Stellar SEP6 standard](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0006.md)

# Authentication
Authentication is based on  [Stellar SEP10 standard](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0010.md). The authentication flow is as follows:
1. The Client requests a unique challenge transaction from the Server, which is represented as a specially formed Stellar transaction.
2. The Server responds with the challenge transaction.
3. The Client signs the transaction using the secret key(s) of the signer(s) for the Client Account.
4. The Client submits the signed challenge back to the Server using the token endpoint.
5. The Server verifies the client signature and responds with a JWT that represents the authenticated session.
The JWT is then used to authenticate all other APIs.

## Challenge Request
Call this endpoint to request a challenge
```
https://api.cowrie.exchange/transfer/web_auth?account=GBS6VGR6UJYKXEPTPSU4CTPY7GFRLO4BYXFTJH3RHX4V2WIQHSRKEKK
```

## Challenge Request Parameters
Name|Description
----|-----------
account|Stellar public key address

## Challenge Response
The server will return a challenge (Stellar transaction)

**HTTP 200 OK**
```javascript
{
    "transaction": "AAAAAgAAAABhlySaNZNO1DPzQrHou0Oq7FAjBfFKb1dhxl5Fg3UjagAAAMgAAAAAAAAAAAAAAAEAAAAAabHcwgAAAABpsy5CAAAAAAAAAAIAAAABAAAAAGXqmj6icKuR83ypwU34+YsVu4HFyzSfcT35XVkQPKKiAAAACgAAABRjb3dyaWUuZXhjaGFuZ2UgYXV0aAAAAAEAAABAdm9SSzYya2RJa0t6dHNHRWtYeXR0bVBMa3FwU1RSa1VYRWNTdGJibkcvV3greUhRRGh4cHZnU1VoSlhFcFAzbwAAAAEAAAAAYZckmjWTTtQz80Kx6LtDquxQIwXxSm9XYcZeRYN1I2oAAAAKAAAAD3dlYl9hdXRoX2RvbWFpbgAAAAABAAAAD2Nvd3JpZS5leGNoYW5nZQAAAAAAAAAAAYN1I2oAAABAOnWnG6iAE4Zi5VY35L++DqQMnLdc7DgSbZa3s/glOlFuuzBd6rCWBgtWUyRy3FKaFPrC5kq6LljPgxDjPpRcCA==",
    "network_passphrase": "Public Global Stellar Network ; September 2015"
}
```

Challenge Response Fields|Description
----|----------------------
transaction|XDR encoded challenge Stellar transaction

## Token Request
The challenge Stellar transaction is then signed by the Stellar account that initiated the request and sent to the server to retrieve a JWT
```
https://api.cowrie.exchange/transfer/web_auth
```

**POST**

```javascript
{
"transaction":"AAAAAgAAAABhlySaNZNO1DPzQrHou0Oq7FAjBfFKb1dhxl5Fg3UjagAAAMgAAAAAAAAAAAAAAAEAAAAAZlZQgAAAAABmV6IAAAAAAAAAAAIAAAABAAAAAO1Ch5FPDm78B0qdenlkMw9AkJEge4xQvIy7etukjrzHAAAACgAAABRjb3dyaWUuZXhjaGFuZ2UgYXV0aAAAAAEAAABAaEl3YnVGdlB6Q0F1RWxPWUFkNEQ0WVoycVg0SEdwMW50Yndlejl2b09CaUxHUmVwZ2RIWFh3RHRucUN5RjdnUwAAAAEAAAAAYZckmjWTTtQz80Kx6LtDquxQIwXxSm9XYcZeRYN1I2oAAAAKAAAAD3dlYl9hdXRoX2RvbWFpbgAAAAABAAAAD2Nvd3JpZS5leGNoYW5nZQAAAAAAAAAAAoN1I2oAAABAEq189Luwz6NTyH2TI7PXfqVry238aXTCCWeO9k317yb0XqoWJ9URRSnw2z2n/Ml2v1tcO+RTi0oPGB5w+7zSD6SOvMcAAABA5RolbuoNCDmb4O/f38kahDgi1uHLKD/qbJdMeE1h57ynEHF5xsch9QpgLIpct0nBLDog/JRetko7WCTBDjlVAQ=="
}
```

## Token Respone
The server will verify the client signature and return a JWT

**HTTP OK**
```javascript
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FwaS5jb3dyaWUuZXhjaGFuZ2UiLCJzdWIiOiJHQlM2VkdSNlVKWUtYRVBUUFNVNENUUFk3R0ZSTE80QllYRlRKSDNSSFg0VjJXSVFIU1JLRUtLQiIsImlhdCI6MTc3MzI2NTIxNiwiZXhwIjoxNzczMzUxNjE2LCJqdGkiOiJkYTk2YTY4YjYwOWI2NTM5YjZkMTMyMDk4OWZhYTc5ZDZmNDZlNDkzOTFiNGQ3ZWVhZDM5N2Q1MTNhNjRkMGIzIn0.M2EJ-lMGK_iwe5a3TYBS_4tXGBRf-g8KoTc2inQROcM"
}
```

Token Response Fields|Description
----|----------------------
token|JWT used to authenticate protected endpoints

# Deposit Request
Call this endpoint to initiate a deposit
```
https://api.cowrie.exchange/transfer/deposit?asset_code=NGNT&account=GBS6VGR6UJYKXEPTPSU4CTPY7GFRLO4BYXFTJH3RHX4V2WIQHSRKEKKB&amount=1000&customer_id=b24d05fed7ad420fa9e2e7968215e400
```

## Deposit Request Parameters
Name|Description
----|-----------
asset_code|asset code to deposit (NGNT)
account|Stellar public key address
amount|Amount to deposit
customer_id| Customer id onboarded via SEP12

## Deposit Response
A successful deposit request will return the following JSON encoded response

**HTTP 200 OK**
```javascript
{
    id: "92a4e33c12634ea1"
    eta: 120,
    min_amount: 200,
    fee_fixed: 100,
    how: 'Please transfer NGN 1000 to Nombank MFB account number 3780321530. This account number will expire at Monday, January 12, 2026 11:02 PM, please make your transfer before then.',    
    extra_info :
    {
        bank_name: 'Nombank MFB',
        account_name: 'Cowrie',
        account_number: '3780321530',
        deposit_ref: '9d84769a'
    }
}
```

Deposit Response Fields|Description
----|----------------------
id|Unique ID for this deposit
eta|Expected Time of Arrival in seconds
min_amount|The minimum acceptable deposit amount
fee_fixed|Fee charged for this deposit
how|Deposit instructions
extra_info|Deposit details
bank_name|Bank name to transfer deposit
account_name|Bank account name to transfer deposit
account_number|Bank account number to transfer deposit 

## NGNT Deposit Instructions
Launch your internet banking website or mobile banking app and make a transfer using the details returned in the Deposit Response
* Bank Name: Nombank MFB
* Account Name: Cowrie
* Account Number: 3780321530

# Withdraw Request
Call this endpoint to initiate a withdrawal
```
https://api.cowrie.exchange/transfer/withdraw?asset_code=NGNT&account=GBS6VGR6UJYKXEPTPSU4CTPY7GFRLO4BYXFTJH3RHX4V2WIQHSRKEKKB&amount=1200&customer_id=b24d05fed7ad420fa9e2e7968215e400&dest=0005538936&dest_extra=000013
```

## Withdraw Request Parameters
Name|Description
----|-----------
asset_code|Asset code to withdraw (NGNT)
account|Stellar public key address that initiates the withdaw request
amount|Amount to withdraw
customer_id| Customer id onboarded via SEP12
dest|10 digit nuban account number
dest_extra|6 digit bank sort code or bank name code

## Withdraw Response
A successful withdraw request will return the following JSON encoded response

**HTTP 200 OK**
```javascript
{
    id: "2cd764e19cd64a93",
    account_id: 'GBQZOJE2GWJU5VBT6NBLD2F3IOVOYUBDAXYUU32XMHDF4RMDOURWV3GT',
    memo_type: 'text',
    memo: '2cd764e19cd64a93',
    eta: 120,
    min_amount: 100,
    fee_fixed: 200,
    extra_info: "Alice Hancock"
}
```

Withdraw Response Fields|Description
----|----------------------
id|Unique ID for this withdrawal
account_id|Stellar public key to send the withdrawal payment
memo_type|Stellar memo type
memo|Bank account name
eta|Expected Time of Arrival
min_amount|Minimum withdrawal amount
fee_fixed|Fee charged for this transaction

## NGNT Withdrawal Instructions
To credit account: GTBank account 0005538936 from your Stellar wallet, send a payment with the following details
* Address: GBQZOJE2GWJU5VBT6NBLD2F3IOVOYUBDAXYUU32XMHDF4RMDOURWV3GT
* Memo: ae5fa4d1


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

# Transaction Query
Call this endpoint to query for a single tranaction by it's unique id
```
https://api.cowrie.exchange/transfer/transaction?id=2cd764e19cd64a93
```

## Transaction Query Response
A successful transation query request will return the following JSON encoded response

**HTTP 200 OK**
```javascript
{
    transaction: {
        id: "2cd764e19cd64a93",
        kind: "withdrawal",
        status: "pending_user_transfer_start",
        amount_in: "0",
        amount_out: "0",
        amount_fee: "0",
        started_at: "2025-10-29 14:56:04"
    }
}
```

Response Fields|Description
----|----------------------
id|Unique ID for this transaction
kind|Either deposit or withdrawal
status|state of this transaction. Can be pending_user_transfer_start, completed or error
amount_in|Amount received for this transaction
amount_out|Amount sent out for this transaction
amount_fee|Fee charged for this transaction
started_at|Time stamp when the transaction was started

## Response Error Codes
A failed request for any of the APIs will result in one of the following HTTP response error codes.

HTTP Code|HTTP Status|Description
---------|-----------|------------
400|Bad Request|one or more query parameters is incorrect
404|Not Found|Asset code not available
500|Server Error|the server encountered an error

## Running the JavaScript Samples

### Prerequisites
- Node.js 14+ installed
- A Stellar account with a secret key
- Customer ID and bank account details (for withdraw/deposit operations)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```
   This installs all required packages: `stellar-sdk`, `dotenv`, `node-fetch`, and `form-data`.

### Environment Setup

2. **Create or edit the `.env` file** in the project root with your Stellar credentials:
   ```text
   # Your Stellar account secret (used by Authenticate.js, Kyc.js, Remittance.js)
   ACCOUNT_SECRET=your_stellar_secret_key_here
   
   # Sender account secret (used by WithdrawNGNT.js and SendNGNT.js)
   SENDER_ACCOUNT_SECRET=your_sender_stellar_secret_key_here
   
   # Destination account secret (used by TrustNGNT.js)
   DESTINATION_ACCOUNT_SECRET=your_destination_stellar_secret_key_here
   ```

### Updating Script Variables

Before running the samples, update the hardcoded variables in each script:

#### `DepositNGNT.js`
- **STELLAR-PUBLIC-KEY**: Your Stellar public key (the public address of your account). Obtain from your Stellar wallet or by running: `npx stellar-cli keys:list`
- **CUSTOMER-ID**: Your unique customer ID from Cowrie Exchange onboarding (obtained during SEP12 KYC verification)

#### `WithdrawNGNT.js`
- **BANK-ACCOUNT-NUMBER**: Your Nigerian bank account number (10-digit NUBAN format, e.g., `0005538936`)
- **BANK-SORT-CODE**: Your bank's 6-digit sort code. See the bank codes table in the API documentation below.
- **CUSTOMER-ID**: Your Cowrie Exchange customer ID

#### `SendNGNT.js`
- **DESTINATION-STELLAR-ADDRESS**: The Stellar public key address of the recipient (e.g., `GXYZ...`)

#### `TrustNGNT.js`
- Uses `DESTINATION_ACCOUNT_SECRET` from `.env` (no additional variables)

#### `Kyc.js`
- Replace personal information (name, email, phone, ID details) with your actual data
- Provide a `passport.jpg` image file in the project root

### Available npm Scripts

Run any sample using the npm scripts defined in `package.json`:

```bash
# Authenticate with Cowrie Exchange (SEP10)
npm run authenticate

# Set up trust for NGNT asset on your account
npm run trust

# Initiate a deposit request
npm run deposit

# Initiate a withdrawal request
npm run withdraw

# Send NGNT to another Stellar account
npm run send

### Example Workflow

1. **Generate or import a Stellar account:**
   - Use [Stellar Lab](https://stellar.expert/laboratory) or any Stellar wallet
   - Save your secret key securely

2. **Configure `.env`:**
   ```bash
   ACCOUNT_SECRET=SCXXXXXX...
   SENDER_ACCOUNT_SECRET=SCYYYY...
   DESTINATION_ACCOUNT_SECRET=SCZZZZ...
   ```

3. **Run authentication first:**
   ```bash
   npm run authenticate
   ```

4. **Set up trust (one-time):**
   ```bash
   npm run trust
   ```

5. **Update script variables** (bank account, customer ID, recipient address, etc.)

6. **Execute the desired operation:**
   ```bash
   npm run deposit
   npm run withdraw
   npm run send
   ```

