var resolve1 = $.Deferred()
var resolve2 = $.Deferred()
var title
var circle
require.ensure(['../title/title.js'], function(e) {
    title = require('../title/title.js')
    resolve1.resolve()
});
require.ensure(['../../libs/drawsvg/drawradar.js'], function(e) {
    circle = require('../../libs/drawsvg/drawradar.js')
    resolve2.resolve()
});
require("./VeDifferent.less");
var html = require("./VeDifferent.html");

function index() {
    var that = this;
    this.data = '';
    this.html = html;
    var titleCont = null;
    this.complete = function() {
        var id = that.nowParam.data.id;
        this.app.returnRequier([resolve1, resolve2]).done(function() {
            that.dom.find('.actCont1').addClass(id);
            var dom = that.dom.find('.' + id);
            dom.find('.body_cont').attr('id', id);
            titleCont = that.app.loadModule(title, dom.find('.title_cont'), {
                data: that.nowParam.title
            });
            titleCont.event._addEvent('title.radio', function(val) {
                that.event._dispatch('line.radio', val);
            });
        })

    }
    this.setData = function(value) {
        var htmlCircle = '';
        var aaa = '平均值';
        var len = value.length; //根据circle个数动态画
        var html_1 = '';
        var html_2 = '';
        var html_21 = '';
        var htmls = '';
        var lefts = '';
        var typeName = '人';
        if (value[0].typeCode == '12') {
            typeName = '分钟'
        } else if (value[0].typeCode == '11') {
            typeName = '次'
        }
        that.dom.find('#' + value[0].id).html('');
        $.each(value, function(i, val) {
            //动态铺circle
            //  console.log('???',val.cirNum);
            var widthChange = len < 5 ? that.widthFun(len) : '20%';
            // if (len % 5 == 0) {
            //     htmlCircle = '<div style="width: ' + widthChange + ';float: right;text-align: center;"><div class="circle" id="' + (val.cirNum + (i + 1)) + '" style="position: relative; margin-bottom: 10px;"></div></div>';
            // } else {
            htmlCircle = '<div style="width: ' + widthChange + ';display:inline-block;text-align: center;"><div class="circle" id="' + (val.cirNum + (i + 1)) + '" style="position: relative; margin-bottom: 10px;"></div></div>';
            //}
            that.dom.find('#' + val.id).append(htmlCircle);
            that.newworkChart(val, i);
            that.htmlFun(val, i, that.leftFun('#' + val.cirNum + (i + 1)), typeName);

            $(window).resize(function() {
                that.htmlFun(val, i, that.leftFun('#' + val.cirNum + (i + 1)), typeName);
            })
        })
    }
    this.leftFun = function(dom) {
        if (that.dom.find(dom).width() < 250) {
            lefts = (248 - that.dom.find(dom).width()) / 2 + 'px';
            // lefts = '10px';
        } else {
            lefts = '0'
        }
        return lefts;
    }
    this.htmlFun = function(val, i, lefts, typeName) {
        that.dom.find('#' + val.cirNum + (i + 1) + ' .cirBg').remove();
        that.dom.find('#' + val.cirNum + (i + 1) + ' .cirP1').remove();
        that.dom.find('#' + val.cirNum + (i + 1) + ' .cirP2').remove();
        var colorGrey = (i + 1) % 2 == 0 ? ('url(/images/circlebg2.jpg) -80px -1399px') : ('url(/images/circlebg1.jpg) -80px -1433px');
        if (typeName != '分钟') {
            html_1 = '<div style="position:absolute;width:100%;height: 100%;top: 42px;left:' + lefts + ';" class="cirBg"><div style="background:' + colorGrey + ';width:159px;height:158px;border-radius:114px;margin:4px auto;">' +
                '<div style="width: 100%; height: 64px; padding-top: 30px;"><span style="display:block;font-size:20px;color:' + val.color + '">' + Tool.numFormat(parseInt(val.uv)) + typeName + '</span>' +
                '<span style="display:block;">' + val.startDate + '至' + val.endDate + '</span></div>' +
                '<div style="width: 100%; height: 100px;"><span style="display:block;font-size:20px;color:#FF9933;">' + Tool.numFormat(parseInt(val.avgUv)) + typeName + '</span>' +
                '<span style="display:block;">' + '过去' + val.contrastDay + '天平均值</span></div>' +
                '</div></div>';
        } else {
            html_1 = '<div style="position:absolute;width:100%;height: 100%;top: 42px;left:' + lefts + ';" class="cirBg"><div style="background:' + colorGrey + ';width:158px;height:158px;border-radius:114px;margin:4px auto;">' +
                '<div style="width: 100%; height: 64px; padding-top: 30px;"><span style="display:block;font-size:20px;color:' + val.color + '">' + Tool.minutesM(val.uv) + '</span>' +
                '<span style="display:block;">' + val.startDate + '至' + val.endDate + '</span></div>' +
                '<div style="width: 100%; height: 100px;"><span style="display:block;font-size:20px;color:#FF9933;">' + Tool.minutesM(val.avgUv) + '</span>' +
                '<span style="display:block;">' + '过去' + val.contrastDay + '天平均值</span></div>' +
                '</div></div>';
        }
        var difName_html = '';
        if (that.dom.find('.' + val.id + ' .title_cont .left_bor').html().substring(0, 2) == '版本') {
            // that.dom.find('#' + val.cirNum + (i + 1)).append(html_21);
            difName_html = val.difName ? 'v' + val.difName : '';
        } else {
            // that.dom.find('#' + val.cirNum + (i + 1)).append(html_2);
            difName_html = val.difName ? val.difName : '';
        }
        html_2 = "<p style='margin-top: -16px; font-size: 11px;' class='cirP1'><span  style='font-size:14px; margin-left: 10px;color:" + val.color + "'>" + difName_html + "</span></p>";
        // html_21 = "<p style='margin-top: -16px; font-size: 11px;' class='cirP1'><span  style='font-size:14px; margin-left: 10px;color:" + val.color + "'>v" + val.difName + "</span></p>";
        htmls = "<p style='margin-top: 6px; font-size: 12px; margin-left: 10px;' class='cirP2'>差异率：" + "<span class='percent' style='font-size:14px;color:" + val.color + "'>" + Tool.moneyFormat(val.difRate) + "%</span></p>";
        that.dom.find('#' + val.cirNum + (i + 1)).append(html_1).append(html_2).append(htmls);
        // that.dom.find('#' + val.cirNum + (i + 1)).append(html_2);
        // that.dom.find('#' + val.cirNum + (i + 1)).append(htmls);
    }
    this.widthFun = function(value) {
            switch (value) {
                case 1:
                    return '100%';
                    break;
                case 2:
                    return '50%';
                    break;
                case 3:
                    return '33.33%';
                    break;
                case 4:
                    return '25%';
                    break;
            }
        }
        /**
         * 环形图
         */
    this.newworkChart = function(val, i) {
        //console.log('newwwwwww',val,i)
        that.dom.find('#' + val.cirNum + (i + 1)).empty();
        var svgEx1 = new this.app.svgLib({
            width: 250,
            height: 250,
            el: val.cirNum + (i + 1)
        })
        var rate = Math.abs(val.difRate * 1);
        rate = rate > 100 ? 100 : rate;
        svgEx1.x = val.difName;
        svgEx1.data = [100 - rate, rate];
        svgEx1.color = ['#cfd8dc', val.color];
        svgEx1.disWhite = true;
        svgEx1.circleTxt = false;
        svgEx1.textlist = true;
        Tool.addObject({
            format: function(value) {
                return ''
            },
            mouseover: function(value) {},
            mouseout: function() {},
            formatKdX: function(value) {
                return value
            }
        }, svgEx1)
        circle.drawCicle(svgEx1);
    }
};



module.exports = index;