/**
 * Created by lenovo on 2017/7/21.
 */
var resolve = $.Deferred()
var resolve1 = $.Deferred()
var resolve2 = $.Deferred()
var title;
var cicle;
var perLine;
require.ensure(['../../title/title.js'], function(e) {
    title = require('../../title/title.js')
    resolve.resolve()
});
require.ensure(['../../../utils/drawradar.js'], function(e) {
    cicle = require('../../../utils/drawradar.js')
    resolve1.resolve()
});
require.ensure(['../perLine/perLine.js'], function(e) {
    perLine = require('../perLine/perLine.js')
    resolve2.resolve()
});
require("./circle.less");
var html = require("./circle.html");


function index() {
    var that = this;
    this.html = html;
    var titleCont = null;
    var perLineCont = null;
    this.complete = function() {
        // var title = that.nowParam.title;
        var id = that.nowParam.data.id;
        this.app.returnRequier([resolve, resolve2]).done(function() {
            //标题
            that.dom.find('.circle').addClass(id);
            var dom = that.dom.find('.' + id);
            dom.find('.body_cont_left').attr('id', id);
            titleCont = that.app.loadModule(title, dom.find('.title_cont'), {
                data: that.nowParam.title
            });
            perLineCont = that.app.loadModule(perLine, that.dom.find('.line'), {

            })
        })
    };
    this.setData = function(val) {
        this.app.returnRequier([resolve1, resolve2]).done(function() {
            that.dom.find('.' + val.id).find('.body_cont_left').empty();
            that.dom.find('.' + val.id).find('.body_cont_right').empty();
            // console.log('///', val.width);
            var svgEx1 = new that.app.svgLib({
                width: val.width,
                height: 190,
                el: val.id
            })
            svgEx1.data = val.percentages;
            svgEx1.angle = val.angle;
            svgEx1.color = val.color;

            Tool.addObject({
                format: function(value) {
                    return value + '%'
                },
                mouseover: function(value) {

                },
                mouseout: function() {

                }
            }, svgEx1)
            cicle.drawBn(svgEx1);
            var html1 = '';
            var newArr = [];
            that.dom.find('.body_cont_right').html(perLineCont.setData({
                name: val.name,
                percent: val.percentages,
                color: val.color
            }));
            if (val.angle == 0) {
                newArr = val.name
            } else {
                newArr = val.name.reverse()
            }
            $(newArr).each(function(i, val) {
                html1 += '<span class="text t-' + i + '">' + val + '</span>';
            });
            that.dom.find('#' + val.id).append(html1);
        })
    }
}
module.exports = index;