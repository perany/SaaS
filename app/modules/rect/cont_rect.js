var resolve = $.Deferred()
var resolve1 = $.Deferred()
var rectangle
var title
require.ensure(['../drawRect/rectangle.js'], function(e) {
    rectangle = require('../drawRect/rectangle.js')
    resolve.resolve()
});
require.ensure(['../title/title.js'], function(e) {
    title = require('../title/title.js')
    resolve1.resolve()
});
require("./cont_rect.less");
var html = require("./cont_rect.html");

function index() {
    var that = this;
    this.html = html;
    var titleCont = null;
    var rectangleCont = null;
    this.complete = function() {
        var id = that.nowParam.data.id;
        this.app.returnRequier([resolve, resolve1]).done(function() {
            //标题
            that.dom.find('.actCont_rect').addClass(id);
            var dom = that.dom.find('.' + id);
            dom.find('.body_cont').attr('id', id);
            titleCont = that.app.loadModule(title, dom.find('.title_cont'), {
                data: that.nowParam.title
            });
            //内容
        })

    }
    this.setData = function(val) {
        // console.log('矩形数据', val);
        this.app.returnRequier([resolve]).done(function() {
            rectangleCont = that.app.loadModule(rectangle, that.dom.find('.body_cont'), {
                data: val
            });
        })
    }
    this.setSmallRect = function(data) {
        this.app.returnRequier([resolve1]).done(function() {
            titleCont.setSmallRect(data)
        })
    }

}
module.exports = index;