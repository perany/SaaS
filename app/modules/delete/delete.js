require("./delete.less");
var html = require("./tpl.html")

function menu() {
    this.html = html
    var that = this;

    this.complete = function() {
        this.dom.find('.modal-close,.cancleBtn').on('click', function() {
            that.close()
        });
        that.dom.find('.modal-title').html(this.nowParam.title)
        this.dom.find('.deleteConts span').html(this.nowParam.content)
        if (this.nowParam.css) {
            that.dom.find('.deleteIcon').css('margin', '45px 0 0 80px')
            that.dom.find('.deleteConts').css('left', '113px')
            that.dom.find('.deleteConts').css('top', '45px')
            that.dom.find('.deleteConts').css('position', 'absolute')
            that.dom.find('.btnDelete').css('margin-top', '50px')
        }
        this.dom.find('.deleteOk').on('click', function() {
            //$(this).removeClass('.addDelete')
            //console.log('删除', that.nowParam.delfun());
            that.nowParam.delfun()
            that.close()

        })
    }


}
//原型链一定要有的
module.exports = menu;