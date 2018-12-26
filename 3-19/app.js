var path = require("path");

//將String分析 '路徑'
console.log(path.dirname('/floder1/floder1-1/floder1-1-1/zz.js'));

//用__dirname 抓取目前位置 (前一章節有說明到)。 再使用join組合字串，串出整個完整路徑
console.log(path.join(__dirname , path.dirname('/floder1/floder1-1/floder1-1-1/zz.js') ));

//抓檔名
console.log(path.basename("/floder1/floder1-1/floder1-1-1/zz.js"));

//抓副檔名
console.log(path.extname("/floder1/floder1-1/floder1-1-1/zz.js"));

//分析路徑 回傳Obj
console.log(path.parse("/floder1/floder1-1/floder1-1-1/zz.js"));