// saveToken.js
const fs = require('fs');
const path = require('path');

const tokenPath = path.resolve(__dirname, 'token.jwt');

function saveToken(token) {
  fs.writeFileSync(tokenPath, token);
}

function loadToken() {
  if (!fs.existsSync(tokenPath)) return null;
  const data = fs.readFileSync(tokenPath);
  return data.toString();
}

module.exports = { saveToken, loadToken };