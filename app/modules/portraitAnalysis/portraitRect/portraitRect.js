require("./portraitRect.less");
var html = require("./portraitRect.html");

var rect;
var title
var resolve = $.Deferred();
var resolve2 = $.Deferred();
require.ensure(['../../../libs/drawsvg/drawrect.js'], function(e) {
    rect = require('../../../libs/drawsvg/drawrect.js');
    resolve.resolve();
});
require.ensure(['../../title/title.js'], function(e) {
    title = require('../../title/title.js')
    resolve2.resolve()
});

function index() {
    var that = this;
    this.html = html;

    this.complete = function() {
        var id = that.nowParam.data.id;
        this.app.returnRequier([resolve, resolve2]).done(function() {
            that.dom.find('.portraitRect').addClass(id);
            var dom = that.dom.find('.' + id);
            dom.find('.body_cont').attr('id', id);
            titleCont = that.app.loadModule(title, dom.find('.title_cont'), {
                data: that.nowParam.title
            });
        })
    };
    this.setData = function(val) {
        //console.log('新的数据', val);
        that.dom.find('#' + val.id).empty();
        this.app.returnRequier([resolve]).done(function() {
            var svgRect1 = new that.app.svgLib({
                width: val.width - 20,
                height: 280,
                el: val.id,
            });
            svgRect1.drawXk({
                ftype: 'normal',
                ctype: 'normal',
                x: val.text,
                data: val.percentage,
                xytext: { x: 'middle', y: 'bottom' },
                top: 0,
                color: val.color,
                xyshow: { linenum: 2, close: true },
                xTextRotate: 0,
                range: [0.1, 0.1],
                colorShow: val.color,
                ruleshow: [false, true],
                format: function(num) {
                    console.log('新的数据', num)
                    return num + '%';
                },
                formatKdY: function(num) {
                    return num + '%';
                }
            })
            rect.drawRecX(svgRect1.data);
        })
    }
}
module.exports = index;