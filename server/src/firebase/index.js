const admin = require("firebase-admin");
const serviceAccountCert = require("./serviceAccountKey.json");

const configure = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountCert),
    databaseURL: "https://construyo-coding-challenge.firebaseio.com", // Ideally this should take as an enviroment variable
  });
};

module.exports = configure;
