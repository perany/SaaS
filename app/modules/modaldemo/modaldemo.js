require("./modaldemo.less")
var html = require("./tpl.html")

function menu(){
	this.html=html
	var that=this;

	this.complete=function(){
        this.dom.find('.modal-close').on('click',function(){
            that.close()
        })
	}
	

}
//原型链一定要有的
module.exports = menu;
