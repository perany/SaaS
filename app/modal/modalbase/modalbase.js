require("./modalbase.less");
var html = require("./tpl.html")

function menu() {
    this.html = html
    var that = this;
    this.body = ''
    this.complete = function() {
        this.body = this.dom.find('.bhs')
        this.aa()
    }
    this.aa = function() {
        console.log('aasd');
    }
    this.setWidth = function(width) {
        this.dom.find('.modal-demo').css( {
            'width': width + 'px',
            'margin-left': -width/2 + 'px'
        } );
    }

}
//原型链一定要有的
module.exports = menu;
