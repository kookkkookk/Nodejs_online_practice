// require npm firebase-admin
var admin = require("firebase-admin");

var serviceAccount = require("../expressfirebasetest-a1e8b-firebase-adminsdk-57ize-10b886e49b.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://expressfirebasetest-a1e8b.firebaseio.com"
});

var db = admin.database();

//將此第三方連接資訊expore出去
module.exports = db;