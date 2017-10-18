require("./portraitCircle.less");
var html = require("./portraitCircle.html");
var round;
var title
var resolve1 = $.Deferred();
var resolve2 = $.Deferred();
require.ensure(['../../../libs/drawsvg/drawradar.js'], function(e) {
    round = require('../../../libs/drawsvg/drawradar.js');
    resolve1.resolve();
});
require.ensure(['../../title/title.js'], function(e) {
    title = require('../../title/title.js')
    resolve2.resolve()
});

function index() {
    var that = this;
    this.html = html;
    this.complete = function() {
        var id = that.nowParam.data.id;
        this.app.returnRequier([resolve1, resolve2]).done(function() {
            that.dom.find('.bubble').addClass(id);
            var dom = that.dom.find('.' + id);
            dom.find('.body_cont_left').attr('id', id);
            titleCont = that.app.loadModule(title, dom.find('.title_cont'), {
                data: that.nowParam.title
            });
        })
    };
    this.setData = function(val) {
        this.app.returnRequier([resolve1, resolve2]).done(function() {
            that.dom.find('.body_cont_left').empty();
            switch (val.type) {
                case 'pie':
                    that.piefun(val);
                    that.rightView(val);
                    break;
                case 'halfarc0':
                    that.halfarc0fun(val, 0);
                    that.rightView(val);
                    break;
                case 'halfarc1':
                    that.halfarc0fun(val, 1);
                    that.rightView(val);
                    break;
                case 'radar':
                    that.radarfun(val);
                    that.rightView(val);
                    break;
                case 'ring':
                    that.ringfun(val);
                    that.rightView(val);
                    break;
            }
        })
    }
    this.halfarc0fun = function(val, angle) {
        var svgEx1 = new that.app.svgLib({
            width: 284,
            height: 250,
            el: val.id
        })
        var tip1 = new this.app.svgTip(val.id);
        svgEx1.data = val.percentage;
        svgEx1.angle = angle;
        svgEx1.avage = 1;
        svgEx1.color = val.color;
        svgEx1.sumAll = 100;
        Tool.addObject({
            format: function(value) {
                return '';
            },
            mouseover: function(value) {
                var htmls = '<p><i  class="portraitCircle_details_color" style="background-color: ' + val.color[value.index] + '"></i>' + val.text[value.index] + ' ' + '占比:' + Tool.moneyFormat(val.percentage[value.index]) + '%' + '</p>';
                tip1.html(htmls)
                tip1.show(value.pos)
            },
            mouseout: function() {
                tip1.hide()
            }
        }, svgEx1)
        if (!round) {
            resolve1.done(function() {
                round.drawBn(svgEx1)
            })
        } else {
            round.drawBn(svgEx1)
        }
    }
    this.rightView = function(val) {
        var html = '<ul>'
        $.each(val.color, function(idx, value) {
            //console.log('76767677', val.text[idx])
            if (val.text[idx]) {
                html += '<li><em class="portraitCircle_details_color" style="background-color: ' + value + '"></em><span>' + val.text[idx] + '</span></li>'
            }
        });
        html += '</ul>'
        that.dom.find('.' + val.id).find('.body_cont_right').html(html);
        that.dom.find('.' + val.id).find('.body_cont_right li').on('mouseover', function() {
            $(this).find('span').css('color', '#33b8f5')
        })
        that.dom.find('.' + val.id).find('.body_cont_right li').on('mouseout', function() {
            $(this).find('span').css('color', '#333')
        })
    }
    this.piefun = function(val) {
        that.dom.find('.portraitCircle_circle').css('margin-top', '-25px');
        var svgEx1 = new that.app.svgLib({
            width: 324,
            height: 290,
            el: val.id
        })
        var tip1 = new this.app.svgTip(val.id);
        svgEx1.data = val.percentage;
        svgEx1.color = val.color;
        svgEx1.circleTxt = false;
        svgEx1.textlist = true;
        svgEx1.x = val.text;
        svgEx1.disWhite = false; //disWhite为true时为圆环图
        svgEx1.formatKdX = function(value) {
            return value;
        }
        Tool.addObject({
            format: function(value) {
                return '';
            },
            mouseover: function(value) {
                var htmls = '<p><i  class="portraitCircle_details_color" style="background-color: ' + val.color[value.index] + '"></i>' + val.text[value.index] + ' ' + '占比:' + Tool.moneyFormat(val.percentage[value.index]) + '%' + '</p>';
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
    this.ringfun = function(val) {
        that.dom.find('.portraitCircle_circle').css('margin-top', '-25px');
        var svgEx1 = new that.app.svgLib({
            width: 324,
            height: 290,
            el: val.id
        });
        var tip1 = new this.app.svgTip(val.id);
        svgEx1.data = val.percentage;
        svgEx1.color = val.color;
        svgEx1.circleTxt = false;
        svgEx1.textlist = true;
        svgEx1.x = val.text;
        svgEx1.disWhite = true; //disWhite为true时为圆环图
        svgEx1.formatKdX = function(value) {
            return value;
        }
        Tool.addObject({
            format: function(value) {
                return '';
            },
            mouseover: function(value) {
                var htmls = '<p><i  class="portraitCircle_details_color" style="background-color: ' + val.color[value.index] + '"></i>' + val.text[value.index] + ' ' + '占比:' + Tool.moneyFormat(val.percentage[value.index]) + '%' + '</p>';
                tip1.html(htmls)
                tip1.show(value.pos)
            },
            mouseout: function() {
                tip1.hide()
            }
        }, svgEx1)
        round.drawCicle(svgEx1)
    }
    this.radarfun = function(val) {
        var svgEx1 = new that.app.svgLib({
            width: 284,
            height: 250,
            el: val.id
        });
        var tip1 = new this.app.svgTip(val.id);
        svgEx1.drawR({
            x: val.text,
            data: val.percentage,
            color: val.color,
            mouseover: function(value) {
                var htmls = '<p><i  class="portraitCircle_details_color" style="background-color: ' + val.color[value.index] + '"></i>' + val.text[value.index] + ' ' + '占比:' + Tool.moneyFormat(val.percentage[value.index]) + '%' + '</p>';
                tip1.html(htmls)
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