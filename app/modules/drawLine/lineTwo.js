require("./lineTwo.less");
var resolve = $.Deferred();
var resolve1 = $.Deferred();
var line;
var rect;
require.ensure(['../../libs/drawsvg/drawline.js'], function(e) {
    line = require('../../libs/drawsvg/drawline.js');
    resolve.resolve();
});
require.ensure(['../../libs/drawsvg/drawrect.js'], function(e) {
    rect = require('../../libs/drawsvg/drawrect.js');
    resolve1.resolve();
});
var html = require("./cont.html");

function index() {
    var that = this;
    var pipei = ',08,09,10,11,12,15,16,17,19,22,23,24,25,27,28,';
    this.html = html;
    var fillColor = [];
    var circleShow1 = [true];
    var circleShow2 = [true, true];
    var unit = '';
    this.complete = function() {
        this.app.returnRequier([resolve]).done(function() {
            var type = that.nowParam.data.id;
            switch (type) {
                case 'versionAnalysis5':
                    fillColor = ['']
                    that.drawline(that.nowParam.data, type);
                    break;
                case 'versionAnalysis41':
                    fillColor = ['']
                    that.drawline(that.nowParam.data, type);
                    break;
                case 'peopleAnalysis1':
                    fillColor = ['#a1dad6']
                    that.drawline(that.nowParam.data, type);
                    break;
                case 'index3':
                    circleShow2 = [false, false];
                    that.drawline(that.nowParam.data, type);
                    break;
                case 'behaviorAnalysis1':
                    fillColor = ['#c2e0ff']
                    that.drawline(that.nowParam.data, type);
                    break;
                case 'usageAnalysis1':
                    fillColor = ['#a1dad6']
                    that.drawline(that.nowParam.data, type);
                    break;
                case 'channelAnalysis3':
                case 'channelAnalysis4':
                case 'channelAnalysis5':
                case 'channelAnalysis6':
                    that.drawline1(that.nowParam.data, type);
                    break;
                case 'activesAnalysis2':
                case 'activesAnalysis3':
                case 'activesAnalysis4':
                case 'activesAnalysis5':
                    that.drawline1(that.nowParam.data, type);
                    break;
                case 'versionAnalysis2':
                case 'versionAnalysis3':
                case 'versionAnalysis4':
                case 'versionAnalysis5':
                    fillColor = that.nowParam.data.fillColor
                    that.drawline(that.nowParam.data, type);
                    break;
            }
        });
    };
    that.mouseoverIndex = function(val, value) {
        var html = '';
        if (val.arrX1.length > 0) {
            html = '<p><span style="margin-left:5px"> ' + val.arrX[value.index] + '</span></p>'
        } else {
            html = '<p>' + val.arrX[value.index] + '</p>'
        }
        if (val.typeCode == -1) {
            html += '<p><span class="circle_people" style="background:' + val.tipsArr[0].color + '"></span>' + val.tipsArr[0].name + '：<span style="color:' + val.tipsArr[0].color + '">' + Tool.numFormat(val.arrY[0][value.index]) + '人</span></p>'
            html += '<p><span class="circle_people" style="background:' + val.tipsArr[1].color + '"></span>' + val.tipsArr[1].name + '：<span style="color:' + val.tipsArr[1].color + '">' + Tool.numFormat(val.arrY[1][value.index]) + '人</span></p>'
            html += '<p><span class="circle_people" style="background:' + val.tipsArr[2].color + '"></span>' + val.tipsArr[2].name + '：<span style="color:' + val.tipsArr[2].color + '">' + Tool.numFormat(val.arrY[2][value.index]) + '人</span></p>'
            html += '<p><span class="circle_people" style="background:' + val.tipsArr[3].color + '"></span>' + val.tipsArr[3].name + '：<span style="color:' + val.tipsArr[3].color + '">' + Tool.numFormat(val.arrY[3][value.index]) + '人</span></p>'
        } else {
            html += '<p><span class="circle_people" style="background:' + val.tipsArr1[0].color + '"></span>' + val.tipsArr1[0].name + '：' + Tool.numFormat(val.arrY[0][value.index]) + '人</p>'
        }

        return html;
    }
    that.mouseoverPeopleAnalysis1 = function(val, value, uni) {
        var html = '';
        html += '<p>' + val.tips + '</p>';
        if (parseInt(val.unitY) == 12) {
            html += '<p><span class="circle_people" style="background:' + val.arrColor[0] + '"></span><span style="margin-right:5px;">' + val.arrX1[value.index] + '</span><span style="color:' + val.arrColor[0] + '"> ' + Tool.minutes(val.arrY[0][value.index]) + '</span></p>';
        } else {
            html += '<p><span class="circle_people" style="background:' + val.arrColor[0] + '"></span><span style="margin-right:5px;">' + val.arrX1[value.index] + '</span><span style="color:' + val.arrColor[0] + '">' + Tool.numFormat(val.arrY[0][value.index]) + uni + '</span></p>';
        }
        return html;
    }
    that.mouseoverVersionAnalysis = function(val, value) {
        var html = '';
        if (val.times) {
            html += '<p style="font-size:12px;color:#fff;margin-bottom:5px">' + val.title + '<span style="margin-left:5px">' + val.times + '</span>' + '<span style="margin-left:5px">' + val.arrX[value.index] + '</span></p>'
        } else {
            html += '<p style="font-size:12px;color:#fff;margin-bottom:5px">' + val.title + '<span style="margin-left:5px">' + val.arrX[value.index] + '</span></p>'
        }
        $.each(val.tips, function(i, v) {
            html += '<p style="margin-bottom:5px"><span class="circle_people" style="background:' + val.arrColor[i] + '"></span>' + v + '：<span style="margin-left:5px">' + Tool.numFormat(val.arrY[i][value.index]) + '人</span></p>'
        })
        return html
    };
    that.mouseoverPeopleAnalysis2 = function(val, value, uni) {
        var html = '';
        html += '<p>' + val.tips1 + val.arrX1[value.index] + '的' + val.tips + '平均值</p>';
        if (parseInt(val.unitY) == 12) {
            html += '<p><span class="circle_people" style="background:' + val.arrColor[1] + '"></span><span style="margin-right:5px;">' + val.tips2 + '</span><span style="color:' + val.arrColor[1] + '">' + Tool.minutes(val.arrY[1][value.index]) + '</span></p>';
        } else {
            html += '<p><span class="circle_people" style="background:' + val.arrColor[1] + '"></span><span style="margin-right:5px;">' + val.tips2 + '</span><span style="color:' + val.arrColor[1] + '">' + Tool.numFormat(val.arrY[1][value.index]) + uni + '</span></p>';
        }
        return html;
    }
    that.mouseoverBehaviorAnalysis1 = function(val, value) {
        var html = '';
        html += '<p>' + val.tips1 + '访问人数平均值：</p>';
        html += '<p><span class="circle_people" style="background:' + val.arrColor[0] + '"></span>' + val.arrX1[value.index] + '：<span style="color:' + val.arrColor[0] + '"> ' + Tool.numFormat(val.arrY[0][value.index]) + '人</span></p>';
        return html;
    }
    that.mouseoverBehaviorAnalysis2 = function(val, value) {
        var html = '';
        html += '<p>' + val.tips2 + '访问人数：</p>';
        html += '<p><span class="circle_people" style="background:' + val.arrColor[1] + '"></span>' + val.arrX1[value.index] + '：<span style="color:' + val.arrColor[1] + '"> ' + Tool.numFormat(val.arrY[1][value.index]) + '人</span></p>';
        return html;
    }
    that.mouseoverChannelAnalysis1 = function(val, value) {
        if (val.arrTip) {
            var html = '<p style="font-size:12px;color:#fff">' + val.channelName + ' ' + val.arrTip[value.index] + "</p>"
        } else {
            var html = '<p style="font-size:12px;color:#fff">' + val.channelName + ' ' + val.arrX[value.index] + "</p>"
        }
        if (val.tips[value.index] != '无') {
            html += '<p style="font-size:12px;color:#fff"><i style="display: inline-block;width: 10px;height: 10px;border-radius: 10px;margin-right:5px;background-color:' + val.lineColor + '"></i>' + val.title + '：' + Tool.moneyFormat(val.arrY[value.index]) + "元</p>"
        } else {
            html += '<p style="font-size:12px;color:#fff"><i style="display: inline-block;width: 10px;height: 10px;border-radius: 10px;margin-right:5px;background-color:' + val.lineColor + '"></i>' + val.title + "：无</p>"
        }
        return html;
    }
    that.mouseoverActVerFun = function(val, value) {
        var html1 = '<div style="color: #FFFFFF;">';
        var html2 = '';
        var html3 = '';
        var html4 = '';
        if (val.actList[value.index].length > 0) {
            $.each(val.actList[value.index], function(ind, valu) {
                html2 +=
                    '<img src="/images/u443.png" style="width: 14px; height: 14px; margin: 4px 5px 0 0;">' +
                    '<span>' + valu.name + '</span><br>' +
                    '<span style="margin: 0 16px;">活动周期：' + valu.startDate.substring(5).replace(/-/g, '/') + '-' + valu.endDate.substring(5).replace(/-/g, '/') + '： ' + valu.startTime + '-' + valu.endTime + '</span><br>'
            })
        } else {
            html2 += '';
        }
        if (val.verList[value.index]) {
            html3 +=
                '<img src="/images/u443.png" style="width: 14px; height: 14px; margin: 2px 5px 0 -3px;">' +
                '<span>版本 v' + val.verList[value.index].name + '</span><br>' +
                '<span style="margin: 0 16px;">起始日期：' + val.verList[value.index].startDate.replace(/-/g, '/') + '</span><br>'
        } else {
            html3 += '';
        }
        if (val.ratioArr[value.index] * 1 > 0) {
            html4 += '<p style="margin-top:-5px"><span class="circle_people" style="background:#fb0615"></span>与上一时期: <span class="percent"><i class="updowntips"></i>' + Tool.moneyFormat(Math.abs(val.ratioArr[value.index])) + '%</span></p>'
        } else if (val.ratioArr[value.index] * 1 < 0) {
            html4 += '<p style="margin-top:-5px"><span class="circle_people" style="background:#03c824"></span>与上一时期: <span class="numTitle2"><i class="updown1"></i>' + Tool.moneyFormat(Math.abs(val.ratioArr[value.index])) + '%</span></p>'
        } else {
            html4 += '';
        }
        var showTip0 = html2 + html3 + html4;
        var showTip = showTip0 ? html1 + showTip0 + '</div>' : '';
        return showTip;
    }
    this.drawline = function(val, type) {
        var svg1 = new this.app.svgLib({
            width: val.width - 22,
            height: 333,
            el: val.id,
            'lineColor': '#f3f3f3'
        });
        var fill = [];
        if (type == 'peopleAnalysis1') {
            var tip1 = new this.app.svgTip(val.id, "1")
            var tip2 = new this.app.svgTip(val.id, "2")
            var tip3 = new this.app.svgTip(val.id, "3")
        } else if (type == 'behaviorAnalysis1' || type == 'usageAnalysis1' || type == 'index3') {
            var tip1 = new this.app.svgTip(val.id, '1');
            var tip2 = new this.app.svgTip(val.id, '2');
        } else {
            var tip1 = new this.app.svgTip(val.id);
        }
        if (type == 'versionAnalysis2' || type == 'versionAnalysis3' || type == 'versionAnalysis4' || type == 'versionAnalysis5') {
            fill = [true, true, true, true]
            circleShow2 = [false, false, false, false];
        } else {
            fill = [false, false]
        }
        // console.log('ppp', circleShow2)
        svg1.drawXk({
            ftype: 'normal',
            ctype: 'more',
            xytext: { x: 'middle', y: 'bottom' },
            fillColor: fillColor,
            lineColor: val.arrColor,
            backLineColor:"#f3f3f3",
            xyshow: { linenum: 2, close: true },
            ruleshow: { x: true, y: true },
            range: [0.07, 0.07],
            x: val.arrX,
            data: val.arrY,
            modulus: [false, false, false, false],
            fill: fill,
            modulusRate: [],
            circleShow: circleShow2,
            iconImages: val.topImg ? val.topImg : [],
            weatherImages: val.activeImg ? val.activeImg : [],
            formatKdY: function(value) {
                if (type == 'peopleAnalysis1') {
                    var yname = '';
                    if (value == 0) {
                        return value + '/' + Tool.getUnitY(svg1.data.maxY) + '人'
                    } else {
                        switch (Tool.getUnitY(svg1.data.maxY)) {
                            case '':
                                yname = Tool.numFormat(value);
                                break;
                            case '万':
                                yname = Tool.isDecimal(value * 1 / 10000);
                                break;
                            case '亿':
                                yname = Tool.isDecimal(value * 1 / 100000000);
                                break;
                        }
                        return yname;
                    }
                } else if (type == 'usageAnalysis1') {
                    if (parseInt(val.unitY) == 11) {
                        unit = '次'
                        var yname = '';
                        if (value == 0) {
                            return value + '/' + Tool.getUnitY(svg1.data.maxY) + '次'
                        } else {
                            switch (Tool.getUnitY(svg1.data.maxY)) {
                                case '':
                                    yname = Tool.numFormat(value);
                                    break;
                                case '万':
                                    yname = Tool.isDecimal(value * 1 / 10000);
                                    break;
                                case '亿':
                                    yname = Tool.isDecimal(value * 1 / 100000000);
                                    break;
                            }
                            return yname;
                        }
                    } else {
                        var yname = '';
                        if (value == 0) {
                            unit = Tool.timeY(svg1.data.maxY);
                            return value + '/' + Tool.timeY(svg1.data.maxY)
                        } else {
                            switch (Tool.timeY(svg1.data.maxY)) {
                                case '分钟':
                                    yname = Tool.minutes1(value);
                                    break;
                                case '小时':
                                    yname = Tool.hours(value);
                                    break;
                                case '天':
                                    yname = Tool.days(value);
                                    break;
                            }
                            return yname;
                        }
                    }
                } else if (type == 'versionAnalysis2' || type == 'versionAnalysis3' || type == 'versionAnalysis4' || type == 'versionAnalysis5') {
                    var yname = '';
                    if (value == 0) {
                        return value + '/' + Tool.getUnitY(svg1.data.maxY) + '人'
                    } else {
                        switch (Tool.getUnitY(svg1.data.maxY)) {
                            case '':
                                yname = Tool.numFormat(value);
                                break;
                            case '万':
                                yname = Tool.isDecimal(value * 1 / 10000);
                                break;
                            case '亿':
                                yname = Tool.isDecimal(value * 1 / 100000000);
                                break;
                        }
                        return yname;
                    }
                } else {
                    var yname = '';
                    if (parseInt(value) == 0) {
                        return value + '/' + Tool.getUnitY(svg1.data.maxY) + '人'
                    } else {
                        switch (Tool.getUnitY(svg1.data.maxY)) {
                            case '':
                                yname = value;
                                break;
                            case '万':
                                yname = Tool.isDecimal(value * 1 / 10000);
                                break;
                            case '亿':
                                yname = Tool.isDecimal(value * 1 / 100000000);
                                break;
                        }
                        return yname;
                    }
                }
            },
            mouseover: function(value) {
                switch (type) {
                    case 'index3':
                        tip1.html(that.mouseoverIndex(val, value));
                        var position1 = { x: value.mousepos.x, y: 70 }
                        tip1.show(position1);
                        if (val.topImg[0][value.index] || val.activeImg[value.index]) {
                            var position2 = { x: value.mousepos.x, y: 180 }
                            tip2.html(that.mouseoverActVerFun(val, value))
                            tip2.show(position2)
                        }
                        break;
                    case 'peopleAnalysis1':
                        tip1.html(that.mouseoverPeopleAnalysis1(val, value, '人'));
                        var position1 = { x: value.mousepos.x, y: 5 }
                        tip1.show(position1)
                        var position2 = { x: value.mousepos.x, y: 60 }
                        tip2.html(that.mouseoverPeopleAnalysis2(val, value, '人'))
                        tip2.show(position2)
                        if (val.topImg[0][value.index] != '' || val.activeImg[value.index]) {
                            var position3 = { x: value.mousepos.x, y: 115 }
                            tip3.html(that.mouseoverActVerFun(val, value))
                            tip3.show(position3)
                        }
                        break;
                    case 'behaviorAnalysis1':
                        tip1.html(that.mouseoverBehaviorAnalysis1(val, value));
                        var position1 = { x: value.mousepos.x, y: 90 }
                        tip1.show(position1)
                        tip2.html(that.mouseoverBehaviorAnalysis2(val, value))
                        var position2 = { x: value.mousepos.x, y: 150 }
                        tip2.show(position2)
                        break;
                    case 'usageAnalysis1':
                        tip1.html(that.mouseoverPeopleAnalysis1(val, value, unit));
                        var position1 = { x: value.mousepos.x, y: 5 }
                        tip1.show(position1)
                        var position2 = { x: value.mousepos.x, y: 60 }
                        tip2.html(that.mouseoverPeopleAnalysis2(val, value, unit))
                        tip2.show(position2)
                        break;
                    case 'versionAnalysis2':
                    case 'versionAnalysis3':
                    case 'versionAnalysis4':
                    case 'versionAnalysis5':
                        tip1.html(that.mouseoverVersionAnalysis(val, value));
                        tip1.show(value.mousepos)
                        break;
                }
            },
            mouseout: function() {
                switch (type) {
                    case 'index3':
                        tip1.hide();
                        tip2.hide();
                        break;
                    case 'peopleAnalysis1':
                        tip1.hide();
                        tip2.hide();
                        tip3.hide();
                        break;
                    case 'behaviorAnalysis1':
                    case 'usageAnalysis1':
                        tip1.hide();
                        tip2.hide();
                        break;
                    case 'versionAnalysis5':
                        tip1.hide();
                        break;
                    case 'versionAnalysis41':
                        tip1.hide();
                        break;
                    case 'versionAnalysis2':
                    case 'versionAnalysis3':
                    case 'versionAnalysis4':
                    case 'versionAnalysis5':
                        tip1.hide();
                        break;
                }
            }
        })
        if (!line) {
            resolve2.done(function() {
                line.drawLine(svg1.data)
            })
        } else {
            line.drawLine(svg1.data)
        }
    }
    this.drawline1 = function(val) {
        var svg1 = new this.app.svgLib({
            width: val.width - 22,
            height: 333,
            el: val.id
        });
        var tip1 = new this.app.svgTip(val.id, '1');
        svg1.drawXk({
            ftype: 'normal',
            ctype: 'normal',
            xytext: { x: 'middle', y: 'bottom' },
            fillColor: [val.fillColor],
            lineColor: [val.lineColor],
            xyshow: { linenum: 2, close: true },
            ruleshow: { x: true, y: true },
            range: [0.07, 0.07],
            x: val.arrX,
            data: val.arrY,
            circleShow: [true],
            modulus: [false],
            modulusRate: [],
            formatKdY: function(value) {
                var yname = '';
                if (value == 0) {
                    return value + '/' + Tool.getUnitY(svg1.data.maxY) + '元'
                } else {
                    switch (Tool.getUnitY(svg1.data.maxY)) {
                        case '':
                            yname = Tool.numFormat(value);
                            break;
                        case '万':
                            yname = Tool.isDecimal(value * 1 / 10000);
                            break;
                        case '亿':
                            yname = Tool.isDecimal(value * 1 / 100000000);
                            break;
                    }
                    return yname;
                }
            },
            formatKdYA: function(value) {
                return '';
            },
            mouseover: function(value) {
                switch (val.id) {
                    case 'channelAnalysis3':
                    case 'channelAnalysis4':
                    case 'channelAnalysis5':
                    case 'channelAnalysis6':
                    case 'activesAnalysis2':
                    case 'activesAnalysis3':
                    case 'activesAnalysis4':
                    case 'activesAnalysis5':
                        tip1.html(that.mouseoverChannelAnalysis1(val, value));
                        tip1.show(value.mousepos);
                        break;
                }
            },
            mouseout: function() {
                tip1.hide();
            }
        })
        if (!line) {
            resolve.done(function() {
                line.drawLine(svg1.data)
                    //console.log('///', svg1.data)
            })
        } else {
            line.drawLine(svg1.data)
                //console.log('///', svg1.data)
        }
    }
}
module.exports = index;