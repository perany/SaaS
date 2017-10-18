var resolve = $.Deferred()

var title
require.ensure(['../../title/title.js'], function(e) {
    title = require('../../title/title.js')
    resolve.resolve()
});
require("./bubble.less");
var html = require("./bubble.html");


function index() {
    var that = this;
    this.html = html;
    var titleCont = null;
    this.complete = function() {
        // var title = that.nowParam.title;
        var id = that.nowParam.data.id;
        this.app.returnRequier([resolve]).done(function() {
            //标题
            that.dom.find('.bubble').addClass(id);
            var dom = that.dom.find('.' + id);
            dom.find('.body_cont').attr('id', id);
            titleCont = that.app.loadModule(title, dom.find('.title_cont'), {
                data: that.nowParam.title
            });
        })
    };
}
module.exports = index;