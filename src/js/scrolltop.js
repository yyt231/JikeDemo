/**
 * Created by Tony on 16/10/8.
 */
var sdelay = 0;
function returnTop() {
    window.scrollBy(0, -100);//Only for y vertical-axis
    if (document.body.scrollTop > 0) {
        sdelay = setTimeout('returnTop()', 0);
    }
}

/********************
 * 取窗口滚动条高度
 ******************/
function getScrollTop() {
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    }
    else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}
/********************
 * 取窗口可视范围的高度
 *******************/
function getClientHeight() {
    var clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    }
    else {
        var clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    }
    return clientHeight;
}
/********************
 * 取文档内容实际高度
 *******************/
function getScrollHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}
function test() {
    if (getScrollTop() + getClientHeight() == getScrollHeight()) {
        alert("到达底部");
    } else {
        alert("没有到达底部");
    }
}