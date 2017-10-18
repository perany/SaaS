require("./cirlce.less");
var html = require("./cirlce.html");
require("../../tips/tips.js");

function index() {
    var that = this;
    this.html = html;;
    this.complete = function() {
        that.dom.find('.tooltip').toolTip();
    };
    this.setData = function(val) {
        $.each(val.historyAvgUv, function(idx, value) {
            var dom = that.dom.find('.circle_content .circle' + value.code);
            var dom1 = that.dom.find('.circle_average .circle' + value.code); //历史
            if (val.historyAvgUv[idx].avg == 'null人') {
                dom.html('0人')
                dom1.html('0人')
            } else {
                dom.html(Tool.numFormat(val.uv[idx].uv) + '人');
                dom1.html(Tool.numFormat(val.historyAvgUv[idx].avg) + '人');
            }
        })
    }
    this.setTitle = function(val) {
        var dom = that.dom.find('.circle_title_text');
        $.each(dom, function(idx, value) {
            $(this).html(val[idx]);
        })
    }
}
module.exports = index;