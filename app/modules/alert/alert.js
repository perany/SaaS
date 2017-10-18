require("./alert.less");
var html = require("./alert.html");

function menu() {
    this.html = html
    var that = this;
    this.complete = function() {
        this.dom.find('.modal-close,.cancleBtn').on('click', function() {
            that.close()
        });
        that.dom.find('.modal-title').html(this.nowParam.title)
        this.dom.find('.deleteConts p').html(this.nowParam.content)
    }


}
//原型链一定要有的
module.exports = menu;