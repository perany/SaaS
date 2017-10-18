/**
 * Created by lenovo on 2017/7/21.
 */
require("./perLine.less");
var html = require("./perLine.html");

function index() {
    var that = this;
    this.html = html;
    this.complete = function() {

    };
    this.setData = function(val) {
        var html = '';
        if (val.name.length > 0) {
            $.each(val.name, function(i, value) {
                var ss = ''
                if (val.percent[i]) {
                    ss = Tool.moneyFormat(val.percent[i])
                } else {
                    ss = 0.00
                }
                html +=
                    '<dl class="linedl">' +
                    '<dt class="lineText">' +
                    '<span class="lineTitle">' + val.name[i] + '</span>' +
                    '<span class="linePer" style="color: ' + val.color[i] + '">' + ss + '%</span>' +
                    '</dt>' +
                    '<dd class="lineColor">' +
                    '<span class="colorBottom"></span>' +
                    '<span class="colorTop" style="width: ' + ss + '%; background-color: ' + val.color[i] + '"></span>' +
                    '</dd>' +
                    '</dl>'
            })
        }
        return html;
    }
}
module.exports = index;