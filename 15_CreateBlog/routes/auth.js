//使用connections firebase auth模組
const express = require('express');
var firebaseClient = require('../connections/firebase_connect');

const router = express.Router();

//註冊頁面
router.get('/signup', (req, res) => {
  const messages = req.flash('error');
  res.render('dashboard/signup', {
    messages,
    hasErrors: messages.length > 0,
  });
});

//登入頁面
router.get('/signin', (req, res) => {
  //console.log(firebaseClient.auth());
  const messages = req.flash('error');
  res.render('dashboard/signin', {
    messages,
    hasErrors: messages.length > 0,
  });
});

//登出
router.get('/signout', (req, res) => {
  //清除session.uid
  req.session.uid = '';
  res.redirect('/auth/signin');
});


//傳送POST Firbase 註冊
router.post('/signup', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirm_password;
  if (password !== confirmPassword) {
    req.flash('error', '兩個密碼輸入不符合');
    res.redirect('/auth/signup');
  }

  //使用EmailAndPassword 創建一個帳號
  firebaseClient.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log(req.session.uid);
      res.redirect('/auth/signin');
    })
    .catch((error) => {
      console.log(error);
      req.flash('error', error.message);
      res.redirect('/auth/signup');
    });
});

//POST Emai 登入
router.post('/signin', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //User輸入的帳密 與signInWithEmai 比對登入，成功即產生一個session.uid
  firebaseClient.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      req.session.uid = user.uid;
      req.session.mail = req.body.email;
      console.log(req.session.uid);
      res.redirect('/dashboard');
    })
    .catch((error) => {
      console.log(error);
      req.flash('error', error.message);
      res.redirect('/auth/signin');
    });
});

module.exports = router;
