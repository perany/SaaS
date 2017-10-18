var resolve1 = $.Deferred()
require("./trendLine.less")
var html = require("./trendLine.html");
var title;
require.ensure(['../../title/title.js'], function(e) {
    title = require('../../title/title.js')
    resolve1.resolve()
});

function trendLine() {
    var that = this;
    this.html = html;
    var titleCont = null;
    this.complete = function() {
        this.app.returnRequier([resolve1]).done(function() {
            titleCont = that.app.loadModule(title, that.dom.find('.title_cont'), {
                data: that.nowParam.title
            });
        })
    }

    this.setData = function(data) {
        // allConvert, transEvent, transLoseNum, transInterNum, convertRate
        var lineNum = data.transEvent.length;
        var htmlLine = '';
        for (var i = 0; i < lineNum; i++) {
            htmlLine +=
                '<div class="line line' + (i + 1) + '">' +
                '<div class="left">' +
                '<span class="titleName"><i></i><span attr_eventid="' + data.eventid[i] + '">' + data.transEvent[i] + '</span></span>' +
                '<span class="lose">流失用户：<span>' + data.transLoseNum[i] + '人</span></span>' +
                '</div>' +
                '<div class="right">' +
                '<span class="inter">访问人数：' + data.transInterNum[i] + '人</span>' +
                '</div>' +
                '<span class="rightLine"></span>' +
                '<span class="allLine"></span>' +
                '</div>';
        }
        htmlLine +=
            '<ul class="convert">' +

            '</ul>' +
            '<div class="bigFont">' +
            '<span class="per"></span>' +
            '<span>整体转化率</span>' +
            '</div>';
        that.dom.find('.trendLine .content .img').html(htmlLine);

        //右侧整体转化率
        that.dom.find('.trendLine .content .img .bigFont .per').html(data.allConvert + '%');

        //控制每条线样式
        var increaseLeftWidth = (40 - 30) / (lineNum - 1);
        var decreaseRightWidth = (40 - 20) / (lineNum - 1);
        var leftColor = ['#c9d0fe', '#c6d6fe', '#bcddff', '#c5eeff', '#ccf9ff', '#d7fef9', '#d1ffe8', '#e7fbd3', '#f9f7ce', '#fffbe0'];
        var rightColor = ['#717ccb', '#6085e4', '#3d98f5', '#3dbff5', '#58cad8', '#58d8c7', '#58d897', '#9ad858', '#d8d358', '#ffde00'];
        increaseLeftWidth = increaseLeftWidth.toFixed(3);
        decreaseRightWidth = decreaseRightWidth.toFixed(3);
        // console.log('递增的宽度为', 30 + Number(increaseLeftWidth));
        for (var i = 0; i < lineNum; i++) {
            // console.log('长度为', (30 + Number(increaseLeftWidth)) + '%');
            that.dom.find('.trendLine .content .img .line' + (i + 1) + ' .left').css({
                'width': (30 + Number(increaseLeftWidth * i)) + '%',
                'background-color': leftColor[i % leftColor.length]
            });
            that.dom.find('.trendLine .content .img .line' + (i + 1) + ' .right').css({
                'width': (40 - Number(decreaseRightWidth * i)) + '%',
                'background-color': rightColor[i % rightColor.length]
            });

            if (i == 0) {
                that.dom.find('.trendLine .content .img .line1 .lose').remove();
                that.dom.find('.trendLine .content .img .line1 .rightLine').css({
                    // 'width': '50px',
                    'height': '13px',
                    'background': 'url("/images/behaviorAnalysis/smallLine1.png") no-repeat'
                });
                if (lineNum > 3) {
                    that.dom.find('.trendLine .content .img .line1 .allLine').css({
                        'background': 'url("/images/behaviorAnalysis/bigLine1.png") no-repeat'
                    })
                } else if (lineNum > 2) {
                    that.dom.find('.trendLine .content .img .line1 .allLine').css({
                        'margin-left': 85 + '%',
                        'background': 'url("/images/behaviorAnalysis/smallLine1.png") no-repeat'
                    });
                } else {
                    that.dom.find('.trendLine .content .img .bigFont').remove();
                }

            } else if (i == (lineNum - 1)) {
                that.dom.find('.trendLine .content .img .line' + lineNum + ' .rightLine').css({
                    'height': '13px',
                    'background': 'url("/images/behaviorAnalysis/smallLine3.png") no-repeat'
                });
                if (lineNum > 3) {
                    that.dom.find('.trendLine .content .img .line' + lineNum + ' .allLine').css({
                        'width': '89px',
                        'background': 'url("/images/behaviorAnalysis/bigLine2.png") no-repeat',
                        'margin-left': 80 + '%',
                        'margin-top': -50 + 'px'
                    })
                } else if (lineNum > 2) {
                    that.dom.find('.trendLine .content .img .line' + lineNum + ' .allLine').css({
                        'width': '89px',
                        'background': 'url("/images/behaviorAnalysis/smallLine3.png") no-repeat',
                        'margin-left': 80 + '%',
                        'margin-top': -30 + 'px'
                    })
                }
            } else {
                that.dom.find('.trendLine .content .img .line' + (i + 1) + ' .rightLine').css({
                    'background': 'url("/images/behaviorAnalysis/smallLine2.png") no-repeat'
                })
            }
        }

        //右侧数字
        var htmlConvert = '';
        //最短线的宽度
        var shortLineWidth = that.dom.find('.trendLine .content .img .line' + lineNum + ' .left').width() + that.dom.find('.trendLine .content .img .line' + lineNum + ' .right').width() + 5;
        //最长线的宽度
        var longLineWidth = that.dom.find('.trendLine .content .img .line1 .left').width() + that.dom.find('.trendLine .content .img .line1 .right').width() + 5;

        //
        var index = (longLineWidth - shortLineWidth) / lineNum;
        // console.log('长短线的宽度', shortLineWidth, longLineWidth, index);
        for (var i = 1; i < data.convertRate.length; i++) {
            // var newPervent = Tool.moneyFormat(that.formate(data.convertRate[i] * 100, 2))
            var newPervent = data.convertRate[i]
            htmlConvert += '<li class="li' + i + '">' + newPervent + '%</li>';
        }
        that.dom.find('.trendLine .content .img .convert').html(htmlConvert);
        for (var i = 0; i < data.convertRate.length; i++) {
            that.dom.find('.trendLine .content .img .convert .li' + (i + 1)).css({
                'margin-left': -(index * i) + 'px'
            });
        }

        that.clickLeft();
    }
    this.clickLeft = function() {
            that.dom.find('.trendLine .left .titleName').on('click', function() {
                that.dom.find('.trendLine .left .titleName').removeClass('selected');
                $(this).addClass('selected');
                var eventid = that.dom.find('.trendLine .left .selected span').attr('attr_eventid');
                that.event._dispatch('trendLineCont.click', eventid);
            })
        }
        /*this.formate = function(num, length) {
            return Math.round(num * Math.pow(10, length)) / Math.pow(10, length);
        }*/
        /*that.event._dispatch('trendLineCont.click', obj1);
        that.dom.find('.wayTrans .left .titleName').on('click', function() {
            that.dom.find('.wayTrans .left .titleName').removeClass('selected');
            $(this).addClass('selected');
            // console.log('点击了**********', $('.wayTrans .left .selected span').html());
            wayTransSelName = $('.wayTrans .left .selected span').html();
            for (var j = 0; j < transEvent.length; j++) {
                if (transEvent[j] == wayTransSelName) {
                    choosenEvent = eventid[j];
                    that.getDifferenceFun();
                }
            }
        });*/
}
//原型链一定要有的
module.exports = trendLine;