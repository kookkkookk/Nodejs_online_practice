const convertPagination = function(sourceData, currentPage) {
    //分頁功能
    const totalResult = sourceData.length;//總公開資料量
    const perpage = 3;//設定每頁顯示三筆資料
    const pageTotal = Math.ceil(totalResult / perpage);//依每頁顯示數量，算出總頁數
    //User指定的頁數不可超過總頁數
    if (currentPage > pageTotal) currentPage = pageTotal;

    //算出User輸入的當前頁，所要顯示的第幾筆資料到第幾筆 ps. 第二頁= articles的4~6
    const minItem = (currentPage * perpage) - perpage + 1;
    let maxItem = currentPage * perpage;
    //如果最後一筆為遺留不滿perpage 不可超過總公開資料量
    if (maxItem > totalResult) maxItem = totalResult;
    //console.log('總公開資料量:' + totalResult + ',每頁數量:' + perpage + ',總頁數:' + pageTotal + '. ' + minItem + ' ' + maxItem);

    //要顯示傳入的data
    const data = [];
    sourceData.forEach(function (item, i) {
        let itemNum = i + 1;
        if (itemNum >= minItem && itemNum <= maxItem) {
            //console.log(item.title, i)
            data.push(item);
        }
    })
    //這邊把一些值丟給前端做pagination
    const page = {
        pageTotal,
        currentPage,
        hasPre: currentPage > 1,
        hasNext: currentPage < pageTotal
    }
    //console.log("page: ", page);

    //將資料回傳出去
    return {
        data,
        page
    }
}

module.exports = convertPagination;