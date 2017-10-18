require("./selectActive.less")
var html = require("./tpl.html");

function selectActive() {
    this.html = html
        // console.log(html,'============')
    var that = this;
    this.complete = function() {
        //写自己的代码
        //console.log('menu',this.app.header,this.dom)
        that.eventFun();
    }
    this.eventFun =function(){
        that.dom.find('.activeMore').on('click',function(){
           $(this).siblings('.activeDiv').removeClass('hide')
        })
    }


}
//原型链一定要有的
module.exports = selectActive;