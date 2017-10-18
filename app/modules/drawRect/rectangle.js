//var html = require("./rectangle.html");
var resolve = $.Deferred();
var rect;
require.ensure(['../../libs/drawsvg/drawrect.js'], function(e) {
    rect = require('../../libs/drawsvg/drawrect.js');
    resolve.resolve();
});
//rectangle
var html = require("./rectangle.html");

function index() {
    var that = this;
    this.html = html;
    this.complete = function() {
        var type = that.nowParam.type;
        this.app.returnRequier([resolve]).done(function() {
            switch (that.nowParam.data.id) {
                case 'versionAnalysis1':
                    if (that.nowParam.data.arrY[1]) {
                        that.draw1(that.nowParam.data);
                    } else {
                        that.drawOne(that.nowParam.data);
                    }
                    break;
                default:
                    that.draw(that.nowParam.data);
                    break;
            }
        });
    }
    this.peopleAnalysis = function(val, value) {
        var index = parseInt(value.index);
        var html = '';
        html += '<p style="margin-bottom:5px">' + val.arrX1[value.index] + ' 影响差异度：</p>';
        if (val.tips[value.index] != '') {
            html += '<p style="margin-bottom:5px"><span class="circle_people" style="background:' + val.color[value.index][0] + '"></span>版本：<span style="color:' + val.color[value.index][0] + '">' + val.tips[value.index] + '</span></p>'
        }
        return html
    }
    this.versionAnalysis = function(val, value) {
        var html = '';
        if (val.times) {
            html += '<p style="font-size:12px;color:#fff;margin-bottom:5px">' + val.tipsName + '<span style="margin-left:5px">' + val.times + '</span>' + '<span style="margin-left:5px">' + val.arrX[value.index] + '</span></p>'
        } else {
            html += '<p style="font-size:12px;color:#fff;margin-bottom:5px">' + val.tipsName + '<span style="margin-left:5px">' + val.arrX[value.index] + '</span></p>'
        }
        //html += '<p style="font-size:12px;color:#fff;margin-bottom:5px">' + val.tipsName + val.arrX[value.index] + '</p>'
        $.each(val.tips, function(i, v) {
            html += '<p style="margin-bottom:5px"><span class="circle_people" style="background:' + val.color[value.index][i] + '"></span>' + v + '：<span style="margin-left:5px">' + Tool.numFormat(val.arrY[value.index][i]) + '人</span></p>'
        })
        return html
    }
    this.versionAnalysis1 = function(val, value) {
        var html = '';
        if (val.times) {
            html += '<p style="font-size:12px;color:#fff;margin-bottom:5px">' + val.tipsName + '<span style="margin-left:5px">' + val.times + '</span>' + '<span style="margin-left:5px">' + val.arrX[value.index] + '</span></p>'
        } else {
            html += '<p style="font-size:12px;color:#fff;margin-bottom:5px">' + val.tipsName + '<span style="margin-left:5px">' + val.arrX[value.index] + '</span></p>'
        }
        //html += '<p style="font-size:12px;color:#fff;margin-bottom:5px">' + val.tipsName + val.arrX[value.index] + '</p>'
        html += '<p style="margin-bottom:5px"><span class="circle_people" style="background:#99ccff"></span>' + val.tips[0] + '：<span style="margin-left:5px">' + Tool.numFormat(val.arrY[0][value.index]) + '人</span></p>'
        return html
    }
    this.channelAnalysis = function(val, value) {
        var html = '';
        html += '<p style="font-size:12px;color:#fff;margin-bottom:5px">' + val.arrX[value.index] + '渠道' + val.startDa + '至' + val.endDa + '</p>'
        html += '<p style="margin-bottom:5px"><span class="circle_people" style="background:' + val.color[value.index][0] + '"></span>新增用户占全部渠道新增用户比：<span style="color:' + val.color[value.index][0] + '">' + Tool.moneyFormat(val.arrY[value.index][0]) + '%</span></p>';
        html += '<p style="margin-bottom:5px"><span class="circle_people" style="background:' + val.color[value.index][1] + '"></span>活跃用户占全部渠道新增用户比：<span style="color:' + val.color[value.index][1] + '">' + Tool.moneyFormat(val.arrY[value.index][1]) + '%</span></p>';
        html += '<p style="margin-bottom:5px"><span class="circle_people" style="background:' + val.color[value.index][2] + '"></span>付费用户占全部渠道新增用户比：<span style="color:' + val.color[value.index][2] + '">' + Tool.moneyFormat(val.arrY[value.index][2]) + '%</span></p>';
        html += '<p style="margin-bottom:5px"><span class="circle_people" style="background:' + val.color[value.index][3] + '"></span>注册用户占全部渠道新增用户比：<span style="color:' + val.color[value.index][3] + '">' + Tool.moneyFormat(val.arrY[value.index][3]) + '%</span></p>'
        return html
    }
    this.draw1 = function(val) {
        //console.log('hhhhh', val)
        var svg1 = new this.app.svgLib({
            width: val.width - 60,
            height: 286,
            el: val.id,
            'fontColor': '#909090',
        });
        var tip1 = new this.app.svgTip(val.id);
        var html = '';
        svg1.drawXk({
            ftype: 'normal',
            ctype: 'more',
            x: val.arrX,
            data: val.arrY,
            top: 20,
            unit: '',
            xytext: { x: 'middle', y: 'bottom' },
            range: [0.08, 0.05],
            color: val.color,
            xyshow: { linenum: 2, close: true },
            format: function(num) {
                return ''
            },
            formatKdY: function(value) {
                if (val.id == 'channelAnalysis1') {
                    return value + "%"
                } else if (val.id == 'versionAnalysis1') {
                    //console.log('jjjjjjjjjjj', svg1.data.maxY)
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
                    return ''
                }
            },
            formatKdYA: function(value) {
                return '';
            },
            mouseover: function(value) {
                tip1.html(that.versionAnalysis(val, value))
                tip1.show(value.mousepos)
            },
            mouseout: function() {
                tip1.hide()
            }
        });
        if (!rect) {
            resolve.done(function() {
                rect.drawRecX(svg1.data)
            })
        } else {
            rect.drawRecX(svg1.data)
        }
    };
    this.drawOne = function(val) {
        console.log('hhh11111hh', val)
        var svg1 = new this.app.svgLib({
            width: val.width - 60,
            height: 286,
            el: val.id,
            'fontColor': '#909090',
        });
        var tip1 = new this.app.svgTip(val.id);
        var html = '';
        svg1.drawXk({
            ftype: 'normal',
            ctype: 'normal',
            x: val.arrX,
            data: val.arrY[0],
            top: 20,
            unit: '',
            xytext: { x: 'middle', y: 'bottom' },
            range: [0.08, 0.05],
            color: val.color,
            xyshow: { linenum: 2, close: true },
            format: function(num) {
                return ''
            },
            formatKdY: function(value) {
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
            },
            formatKdYA: function(value) {
                return '';
            },
            mouseover: function(value) {
                tip1.html(that.versionAnalysis1(val, value))
                tip1.show(value.mousepos)
            },
            mouseout: function() {
                tip1.hide()
            }
        });
        if (!rect) {
            resolve.done(function() {
                rect.drawRecX(svg1.data)
            })
        } else {
            rect.drawRecX(svg1.data)
        }
    };
    this.draw = function(val) {
        console.log('hhhhh', val)
        var svg1 = new this.app.svgLib({
            width: val.width - 60,
            height: 286,
            el: val.id,
            'fontColor': '#909090',
        });
        var tip1 = new this.app.svgTip(val.id);
        var html = '';
        svg1.drawXk({
            ftype: 'normal',
            ctype: 'more',
            x: val.arrX,
            y: [0, 25, 50, 75, 100],
            maxY: 100,
            minY: 0,
            data: val.arrY,
            top: 20,
            unit: '',
            xytext: { x: 'middle', y: 'bottom' },
            range: [0.08, 0.05],
            color: val.color,
            xyshow: { linenum: 2, close: true },
            format: function(num) {
                //if()
                return ''
            },
            formatKdY: function(value) {
                if (val.id == 'channelAnalysis1') {
                    return value + "%"
                } else {
                    return ''
                }
            },
            formatKdYA: function(value) {
                return '';
            },
            mouseover: function(value) {
                switch (val.id) {
                    case 'peopleAnalysis2':
                    case 'usageAnalysis2':
                        if (val.tips[value.index] != '') {
                            tip1.html(that.peopleAnalysis(val, value))
                            tip1.show(value.mousepos)
                        }
                        break;
                    case 'channelAnalysis1':
                        tip1.html(that.channelAnalysis(val, value))
                        tip1.show(value.mousepos)
                        break;
                }
            },
            mouseout: function() {
                tip1.hide()
            }
        });
        if (!rect) {
            resolve.done(function() {
                rect.drawRecX(svg1.data)
            })
        } else {
            rect.drawRecX(svg1.data)
        }
    };
}


//原型链一定要有的
module.exports = index;