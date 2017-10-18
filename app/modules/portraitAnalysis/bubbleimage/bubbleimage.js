var resolve = $.Deferred()
require.ensure(['../../title/title.js'], function(e) {
    title = require('../../title/title.js')
    resolve.resolve()
});
require("./bubbleimage.less");
var html = require("./bubbleimage.html");


function index() {
    var that = this;
    this.html = html;
    var titleCont = null;
    this.complete = function() {
        // var title = that.nowParam.title;
        var id = that.nowParam.data.id;
        this.app.returnRequier([resolve]).done(function() {
            //标题
            that.dom.find('.bubbleimage').addClass(id);
            var dom = that.dom.find('.' + id);
            dom.find('.body_cont').attr('id', id);
            titleCont = that.app.loadModule(title, dom.find('.title_cont'), {
                data: that.nowParam.title
            });
        })
    }

    this.setData = function(value) {
        that.dom.find('#' + value.id).empty();
        var htmls = '';
        $(value.name).each(function(i, val) {
            htmls += '<span class="interst' + i + '">' + val + '</span>';
        })
        that.dom.find('#' + value.id).html(htmls);
    }
};
module.exports = index;