var StellarSdk = require("stellar-sdk");
var horizon = new StellarSdk.Horizon.Server("https://horizon.stellar.org");

horizon
  .strictSendPaths(
    new StellarSdk.Asset(
      "USDC",
      "GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN",
    ),
    "100",
    [
      new StellarSdk.Asset(
        "NGNT",
        "GAWODAROMJ33V5YDFY3NPYTHVYQG7MJXVJ2ND3AOGIHYRWINES6ACCPD",
      )
    ]
  )
  .call()
  .then(function (resp) {
    //console.log(resp);
    if (resp.records.length > 0) {
        var dest = resp.records[0].destination_amount;
        var source = resp.records[0].source_amount;
        var rate = dest / source;
        console.log(`${source} USD = NGN ${dest}`);
        console.log(`1 USD = NGN ${rate}`);
    }
  })
  .catch(function (err) {
    console.error(err);
  });