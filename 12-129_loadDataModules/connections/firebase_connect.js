// require npm firebase
var firebase = require('firebase');

//使用Firebase官網。將 Firebase 加入您的網路應用程式
var config = {
    apiKey: "AIzaSyBKDT9iVHFkuw-OrgVRQEDUtqxlXPgzPTc",
    authDomain: "expressfirebasetest-a1e8b.firebaseapp.com",
    databaseURL: "https://expressfirebasetest-a1e8b.firebaseio.com",
    projectId: "expressfirebasetest-a1e8b",
    storageBucket: "expressfirebasetest-a1e8b.appspot.com",
    messagingSenderId: "606267083241"
};

firebase.initializeApp(config);

//將此第三方連接資訊expore出去
module.exports = firebase;