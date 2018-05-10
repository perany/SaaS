require("./title.less");
var html = require("./title.html");
var resolve = $.Deferred();
var resolve1 = $.Deferred();
var resolve2 = $.Deferred();
var resolve3 = $.Deferred();
var underline;
var titleContent
var radio
var saveBtn
require("../tips/tips.js");

require.ensure(['./underline/underline.js'], function(e) {
    underline = require('./underline/underline.js')
    resolve.resolve()
});
require.ensure(['./titleContent/titleContent.js'], function(e) {
    titleContent = require('./titleContent/titleContent.js')
    resolve1.resolve()
});
require.ensure(['./radio/Radio.js'], function(e) {
    radio = require('./radio/Radio.js')
    resolve2.resolve()
});
require.ensure(['./saveBtn/detailCont.js'], function(e) {
    saveBtn = require('./saveBtn/detailCont.js')
    resolve3.resolve()
});

function index() {
    var that = this;
    this.data = '';
    this.html = html;
    var underlineCont = null;
    var titleContentCont = null;
    var calendarCont = null;
    var saveBtnCont = null;
    var radioCont = null;
    var position;
    var typeN;
    this.complete = function() {
        //console.log('title.js', that.nowParam.data);
        position = that.nowParam.data.position;
        typeN = that.nowParam.data.type;
        $.each(position, function(idx, val) {
            if (val.indexOf('left') != -1) {
                that.dom.find('.left_title').append('<span class=' + val + '></span>')
            } else {
                that.dom.find('.right_title').append('<span class=' + val + '></span>')
            }
        });
        that.fun();
    }
    this.fun = function() {
        $.each(typeN, function(idx, val) {
            switch (val) {
                case 'title':
                    that.dom.find('.' + position[idx]).addClass('left_bor');
                    var html = that.nowParam.data.title;
                    if (that.nowParam.data.titleTips)
                        html += '<span class="iCoin tooltip" title-data="' + that.nowParam.data.titleTips + '" style="margin-top: 0px;margin-left: 5px;"></span>'
                    that.dom.find('.' + position[idx]).html(html);
                    break;
                case 'tip':
                    that.dom.find('.' + position[idx]).html('<span class="circle_title_tip tooltip" title-data="' + that.nowParam.data.tips + '" style="margin-top: 16px;margin-left: 5px;"></span>')
                        //that.dom.find('.' + position[idx]).attr('title-data', that.nowParam.data.tips)
                    break;
                case 'save':
                    that.dom.find('.' + position[idx]).html('<a class="saves"></a>')
                    break;
                case 'indexIcon':
                    // that.dom.find('.right1').css('margin-right', '20px');
                    var html = '<span class="indexIcon1"></span><span class="iTitle">波峰波谷</span><span class="iCoin tooltip" title-data="' + that.nowParam.data.iconTips[0] + '" style="margin-top: 1px;margin-left: 5px;"></span>'
                    html += '<img src="/images/u443.png" class="indexIcon2"/><span class="iTitle">活动版本</span><span class="iCoin tooltip" title-data="' + that.nowParam.data.iconTips[1] + '" style="margin-top: 1px;margin-left: 5px;"></span>'
                    that.dom.find('.' + position[idx]).html(html)
                    break;
                case 'underline':
                    //console.log('哈哈11', that.nowParam.data)
                    var underlineData = that.nowParam.data.underlineData;
                    var underlineType1 = that.nowParam.data.underlineType1;
                    that.app.returnRequier([resolve]).done(function() {
                        underlineCont = that.app.loadModule(underline, that.dom.find('.underline'), { data: underlineData, type: underlineType1 });
                        underlineCont.event._addEvent('underline.type', function(val) {
                            // console.log('_____', val);
                            that.event._dispatch('title.underline', val);
                        });
                    })
                    break;
                case 'titleContent':
                    var text = that.nowParam.data.text;
                    //console.log('text', text);
                    var color = that.nowParam.data.color;
                    that.app.returnRequier([resolve1]).done(function() {
                        titleContentCont = that.app.loadModule(titleContent, that.dom.find('.' + position[idx]), { color: color, text: text });
                    })
                    break;
                case 'saveBtn':
                    var name = that.nowParam.data.saveName;
                    var type = that.nowParam.data.saveBtnType;
                    that.app.returnRequier([resolve3]).done(function() {
                        saveBtnCont = that.app.loadModule(saveBtn, that.dom.find('.' + position[idx]), { title: name, type: type });
                        saveBtnCont.event._addEvent('saveBtn.data', function(val) {
                            that.event._dispatch('title.saveBtn', val);
                        })
                    })
                    break;
                case 'other':
                    that.dom.find('.' + position[idx]).html('');
                    break;
                case 'text':
                    var html = '<span>' + that.nowParam.data.text + '</span>';
                    that.dom.find('.' + position[idx]).html(html);
                    break;
                case 'smallRect':
                    var data = that.nowParam.data.smallRect;
                    var html = '<ul class="rectList">';
                    //console.log(',,,', data);
                    $.each(data, function(idx, val) {
                        html += '<li><i style="background-color:' + val.color + '"></i><span class="vname">' + val.version + '</span><span class="vuser">用户总数：</span><span class="vuser">' + val.num + '人</span></li>'
                    })
                    html += '</ul>'
                    that.dom.find('.' + position[idx]).html(html);
                    break;
            }
        })
        that.dom.find('.tooltip').toolTip();
    }
    this.setRadioData = function(val, type, more) {
        //console.log('pppppp', val, type, more);
        that.app.returnRequier([resolve2]).done(function() {
            radioCont = that.app.loadModule(radio, that.dom.find('.left2'), {
                data: {
                    more: more,
                    datas: val,
                    type: type
                }
            });
            radioCont.event._addEvent('radio.data', function(val) {
                that.event._dispatch('title.radio', val);
            })
        })
    }
    this.setSmallRect = function(data, type) {
        //console.log('000', that.dom.find('.rectList'), data, type)
        that.dom.find('.rectList').empty();
        var html = '';
        if (type) {
            $.each(data, function(idx, val) {
                html += '<li><i style="background-color:' + val.color + '"></i><span class="vname">' + val.version + '</span></li>'
            })
        } else {
            $.each(data, function(idx, val) {
                html += '<li><i style="background-color:' + val.color + '"></i><span class="vname">' + val.version + '</span><span class="vuser">用户总数：</span><span class="vuser">' + Tool.numFormat(val.num) + '人</span></li>'
            })
        }
        that.dom.find('.rectList').html(html);
    }
    this.timeDiff = function(val, type) {
        that.app.returnRequier([resolve3]).done(function() {
            saveBtnCont.timeDiff(val, type);
        })
    }
    this.timeDiff1 = function(val, type) {
        that.app.returnRequier([resolve3]).done(function() {
            saveBtnCont.timeDiff1(val, type);
        })
    }
}
module.exports = index;