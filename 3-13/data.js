exports.data = 2;

exports.helloFn = function () {
    return 'Hello require fn!'
}

//等同於 ↓
//只能選擇一種 exports 方式，不然會被覆蓋

/*
module.exports = {
    data:2,
    helloFn: function () {
        return 'Hello require fn!'
    }
}
*/