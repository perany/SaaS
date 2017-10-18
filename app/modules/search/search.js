require("./search.less");
var html = require("./tpl.html");

function search() {
    //this.dom
    var that=this
    this.html = html;
    this.keyword=''
    this.complete = function() {
        // this.dom.html(html)
        this.dom.find('.searcher a').on('click', function() {
            that.keyword=that.dom.find('.searchCont').val()
            that.event._dispatch('search.click', that.keyword)
        })
    }


}
//原型链一定要有的
module.exports = search;
