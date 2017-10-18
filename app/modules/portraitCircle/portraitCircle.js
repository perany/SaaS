require("./portraitCircle.less");
var html = require("./portraitCircle.html");
var round;

var resolve1 = $.Deferred();
require.ensure(['../../libs/drawsvg/drawradar.js'], function(e) {
    round = require('../../libs/drawsvg/drawradar.js');
    resolve1.resolve();
});

function index() {
    var that = this;
    this.html = html;
    this.complete = function() {
        console.log('Circle', this.nowParam);
        this.app.returnRequier([resolve1]).done(function() {
            switch (that.nowParam.type) {
                case 'pie':
                    that.piefun();
                    break;
                case 'halfarc0':
                    that.halfarc0fun();
                    break;
                case 'halfarc1':
                    that.halfarc1fun();
                    break;
                case 'radar':
                    that.radarfun();
                    break;
                case 'ring':
                    that.ringfun();
                    break;
            }
        })
    };
    this.setData = function(val) {

    }
    this.halfarc0fun = function() {
        var svgEx1 = new that.app.svgLib({
                width: 284,
                height: 250,
                el: that.nowParam.id
            })
            //console.log('halfarc0');
        var tip1 = new this.app.svgTip(that.nowParam.id);
        svgEx1.data = that.nowParam.percentage;
        svgEx1.angle = 0;
        svgEx1.avage = 1;
        svgEx1.color = that.nowParam.color;
        Tool.addObject({
            format: function(value) {
                return '';
            },
            mouseover: function(value) {
                var htmls = '<p><i  class="portraitCircle_details_color" style="background-color: ' + that.nowParam.color[value.index] + '"></i>' + that.nowParam.text[value.index] + ' ' + '占比:' + Tool.moneyFormat(that.nowParam.percentage[value.index]) + '%' + '</p>';
                tip1.html(htmls)
                    // tip1.show(value.mousepos)
                tip1.show(value.pos)
            },
            mouseout: function() {
                tip1.hide()
            }
        }, svgEx1)
        round.drawBn(svgEx1)
    }

    this.halfarc1fun = function() {
        var svgEx1 = new that.app.svgLib({
                width: 284,
                height: 250,
                el: that.nowParam.id
            })
            //console.log('halfarc0');
        var tip1 = new this.app.svgTip(that.nowParam.id);
        svgEx1.data = that.nowParam.percentage;
        svgEx1.angle = 1;
        svgEx1.color = that.nowParam.color;
        Tool.addObject({
            format: function(value) {
                return '';
            },
            mouseover: function(value) {
                var htmls = '<p><i  class="portraitCircle_details_color" style="background-color: ' + that.nowParam.color[value.index] + '"></i>' + that.nowParam.text[value.index] + ' ' + '占比:' + Tool.moneyFormat(that.nowParam.percentage[value.index]) + '%' + '</p>';
                tip1.html(htmls)
                    // tip1.show(value.mousepos)
                tip1.show(value.pos)
            },
            mouseout: function() {
                tip1.hide()
            }
        }, svgEx1)
        round.drawBn(svgEx1)
    }

    this.piefun = function() {
        that.dom.find('.portraitCircle_circle').css('margin-top', '-25px');
        that.dom.find('.portraitCircle_details').css('margin-top', '-225px');
        var svgEx1 = new that.app.svgLib({
                width: 324,
                height: 290,
                el: that.nowParam.id
            })
            //console.log('halfarc0');
        var tip1 = new this.app.svgTip(that.nowParam.id);
        svgEx1.data = that.nowParam.percentage;
        svgEx1.color = that.nowParam.color;
        svgEx1.circleTxt = false;
        svgEx1.textlist = true;
        svgEx1.x = that.nowParam.text;
        svgEx1.disWhite = false; //disWhite为true时为圆环图
        svgEx1.formatKdX = function(value) {
            return value;
        }
        Tool.addObject({
            format: function(value) {
                return '';
            },
            mouseover: function(value) {
                var htmls = '<p><i  class="portraitCircle_details_color" style="background-color: ' + that.nowParam.color[value.index] + '"></i>' + that.nowParam.text[value.index] + ' ' + '占比:' + Tool.moneyFormat(that.nowParam.percentage[value.index]) + '%' + '</p>';
                tip1.html(htmls)
                    // tip1.show(value.mousepos)
                tip1.show(value.pos)
            },
            mouseout: function() {
                tip1.hide()
            }
        }, svgEx1)
        round.drawCicle(svgEx1)
    }

    this.ringfun = function() {
        that.dom.find('.portraitCircle_circle').css('margin-top', '-25px');
        that.dom.find('.portraitCircle_details').css('margin-top', '-225px');
        var svgEx1 = new that.app.svgLib({
                width: 324,
                height: 290,
                el: that.nowParam.id
            })
            //console.log('halfarc0');
        var tip1 = new this.app.svgTip(that.nowParam.id);
        svgEx1.data = that.nowParam.percentage;
        svgEx1.color = that.nowParam.color;
        svgEx1.circleTxt = false;
        svgEx1.textlist = true;
        svgEx1.x = that.nowParam.text;
        svgEx1.disWhite = true; //disWhite为true时为圆环图
        svgEx1.formatKdX = function(value) {
            return value;
        }
        Tool.addObject({
            format: function(value) {
                return '';
            },
            mouseover: function(value) {
                var htmls = '<p><i  class="portraitCircle_details_color" style="background-color: ' + that.nowParam.color[value.index] + '"></i>' + that.nowParam.text[value.index] + ' ' + '占比:' + Tool.moneyFormat(that.nowParam.percentage[value.index]) + '%' + '</p>';
                tip1.html(htmls)
                    // tip1.show(value.mousepos)
                tip1.show(value.pos)
            },
            mouseout: function() {
                tip1.hide()
            }
        }, svgEx1)
        round.drawCicle(svgEx1)
    }

    this.radarfun = function() {
        var svgEx1 = new that.app.svgLib({
                width: 284,
                height: 250,
                el: that.nowParam.id
            })
            //console.log('halfarc0');
        var tip1 = new this.app.svgTip(that.nowParam.id);
        svgEx1.drawR({
            x: that.nowParam.text,
            data: that.nowParam.percentage,
            color: that.nowParam.color,
            mouseover: function(value) {
                var htmls = '<p><i  class="portraitCircle_details_color" style="background-color: ' + that.nowParam.color[value.index] + '"></i>' + that.nowParam.text[value.index] + ' ' + '占比:' + Tool.moneyFormat(that.nowParam.percentage[value.index]) + '%' + '</p>';
                tip1.html(htmls)
                    // tip1.show(value.mousepos)
                tip1.show(value.pos)
            },
            mouseout: function() {
                tip1.hide();
            }
        })

        round.drawRadar(svgEx1.data)
    }
}
module.exports = index;