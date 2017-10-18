require("./education.less");
var html = require("./education.html");
var circleJs = require("../../../libs/circles.min.js");
var title
var resolve2 = $.Deferred();
require.ensure(['../../title/title.js'], function(e) {
    title = require('../../title/title.js')
    resolve2.resolve()
});

function index() {
    var that = this;
    this.html = html;
    this.complete = function() {
        var id = that.nowParam.data.id;
        this.app.returnRequier([resolve2]).done(function() {
            that.dom.find('.education').addClass(id);
            var dom = that.dom.find('.' + id);
            dom.find('.body_cont').attr('id', id);
            titleCont = that.app.loadModule(title, dom.find('.title_cont'), {
                data: that.nowParam.title
            });
        })
    }
    this.setData = function(value) {
        that.dom.find('#' + value.id).empty();
        var circles = [];
        var colors = ['#85c2ff', '#528fcc', '#3962a0', '#717ccb'];
        var id = ['educationType1', 'educationType2', 'educationType3', 'educationType4']
        var html = '';

        $(value.name).each(function(i, val) {
            html = '<div class="' + id[i] + '" id="' + id[i] + '"></div>';
            that.dom.find('.body_cont').append(html);
            circles.push(circleJs.create({
                id: id[i],
                value: value.percentage[i],
                name: val,
                radius: 70,
                width: 8,
                colors: ['#cfd8dc', colors[i]]
            }));
        });
    };
}
module.exports = index;