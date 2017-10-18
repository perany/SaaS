require("./footer.less")
var html = require("./tpl.html")


function footer(){
	this.html=html
	this.complete=function(){
		//写自己的代码
		//console.log('footer',this.app)
	}

}
module.exports =footer;
