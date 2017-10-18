require("./errorTips.less")
var html = require("./errorTips.html")

function department() {
    this.html = html
    var that = this;
    this.complete = function() {

    }
}
//原型链一定要有的
module.exports = department;