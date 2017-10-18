var resolve1 = $.Deferred()
require("./banner.less");
var html = require("./banner.html");

function index() {
    var that = this;
    this.html = html;
    var data
    this.complete = function() {
        var title = that.nowParam.title;
        var img = that.nowParam.id;
        data = that.nowParam.data;
        var background = that.nowParam.background;
        this.app.returnRequier([resolve1]).done(function() {

            that.dom.find('.banner').addClass(id);
            var dom = that.dom.find('.' + id);
            dom.find('.body_cont').attr('id', id);
            titleCont = that.app.loadModule(title, dom.find('.title'), {
                title: title_name,
            });
        })
    };
    this.setData = function(data) {
        if (data) {
            for (var n in data) {
                if (data[n] == null) {
                    that.dom.find('.' + n).html('0人')
                } else {
                    that.dom.find('.' + n).html(Tool.numFormat(data[n]) + '人')
                }

            }
        }
    }
}
module.exports = index;