require("./loading.less");
var html = require("./tpl.html");


function index() {
    var that = this

    this.complete = function() {
        this.dom.append(html)
            // this.choose = this.nowParam.chose

    }
}


//原型链一定要有的
module.exports = index;