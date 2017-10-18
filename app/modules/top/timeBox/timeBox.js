require("./timeBox.less");
var html = require("./timeBox.html");

function timeBox() {
    this.html = html
    var that = this;
    this.complete = function() {
        //console.log('参数', that.nowParam);
        that.dom.find('.timeBox_title').html(that.nowParam.title);
        if (that.nowParam.content.length > 0) {
            var html = ''
            $.each(that.nowParam.content, function(idx, val) {
                if (idx == 0) {
                    html += '<a class="selected">' + val + '</a>'
                } else {
                    html += '<a>' + val + '</a>'
                }
            })
            that.dom.find('.box_time').html(html);
            that.dom.find('.box_time a').on('click', function() {
                that.dom.find('.box_time a').removeClass('selected');
                $(this).addClass('selected');
                that.para($(this).html());
            })
        }
    }
    this.para = function(val) {
        var startDay = '';
        var endDay = '';
        var contrastDay = '';
        switch (val) {
            case '今天':
                startDay = Tool.GetDateStr(0);
                endDay = Tool.GetDateStr(0);
                break;
            case '近7天':
                startDay = Tool.GetDateStr(-7);
                endDay = Tool.GetDateStr(-1);
                break;
            case '近30天':
                startDay = Tool.GetDateStr(-30);
                endDay = Tool.GetDateStr(-1);
                break;
            case '过去7天':
                contrastDay = 7;
                break;
            case '过去30天':
                contrastDay = 30;
                break;
            case '过去60天':
                contrastDay = 60;
                break;
        }
        that.event._dispatch('timeBoxCont.click', {
            startDay: startDay,
            endDay: endDay,
            contrastDay: contrastDay
        })
    }
}
//原型链一定要有的
module.exports = timeBox;