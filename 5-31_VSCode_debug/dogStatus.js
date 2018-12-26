//我要exports給入口點 (Project/app.js) 使用

var bark = (num) => {
    let dogName = 'QQ';
    var dogAge = '3';
    console.log('汪' + num + '次');
}

module.exports = {
    'bark': bark
}