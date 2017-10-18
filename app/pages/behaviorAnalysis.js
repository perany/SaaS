var resolve = $.Deferred()
var resolve1 = $.Deferred()
var resolve2 = $.Deferred()
var resolve3 = $.Deferred()
var resolve4 = $.Deferred()
var top
var line
var trendLine
var VeDifferent
require.ensure(['../moduleslibs/topCont/topCont.js'], function(e) {
    top = require('../moduleslibs/topCont/topCont.js')
    resolve.resolve()
});
require.ensure(['../modules/line/cont.js'], function(e) {
    line = require('../modules/line/cont.js')
    resolve1.resolve()
});
require.ensure(['../modules/behaviorAnalysis/trendLine/trendLine.js'], function(e) {
    trendLine = require('../modules/behaviorAnalysis/trendLine/trendLine.js')
    resolve2.resolve()
});
require.ensure(['../modules/VeDifferent/VeDifferent.js'], function(e) {
    VeDifferent = require('../modules/VeDifferent/VeDifferent.js')
    resolve4.resolve()
});

function behaviorAnalysis() {
    var that = this;
    var topCont = null;
    var lineCont = null;
    var trendLineCont = null;
    var VeDifferentCont1 = null;
    var VeDifferentCont2 = null;
    var osId = '1';
    var myDate = new Date(new Date().getTime() - 86400000);
    var startDate = Tool.backTime(myDate);
    var endDate = Tool.backTime(myDate);
    var typeCode;
    var eventId = '';
    var contrastDay = 7
    var matchTable = ['startTime', 'endTime', 'contrastDay', 'typeCode'];
    var sameId3 = ['behaviorAnalysis3', 'behaviorAnalysis4']
    var sameDom3 = ['VeDifferentCont1', 'VeDifferentCont2']
    var sameTitle = ['渠道差异比', '版本差异比']
    var circle = ['circle1-', 'circle3-']
    var disSource = [1, 3]
    this.complete = function() {
        osId = that.app.model.get('iosId') ? that.app.model.get('iosId') : '1';
        this.app.returnRequier([resolve, resolve1, resolve2, resolve4]).done(function() {
            topCont = that.app.loadModule(top, that.dom.find('.firstActCont'), {
                data: {
                    type: ['select', 'calendar', 'timeBox'],
                    position: ['left_cont1', 'left_cont2', 'right_cont1'],
                    timeBoxTitle: '选择对比',
                    timeBoxContent: ['过去7天', '过去30天', '过去60天'],
                    select_data: [{ title: '选择事件组', data: [], id: 'db' }],
                    matchTable: matchTable
                }
            })
            topCont.event._addEvent('topCont.data', function(val) {
                for (var n in val) {
                    switch (n) {
                        case 'startTime':
                            if (val[n]) {
                                startDate = val[n]
                            }
                            break;
                        case 'endTime':
                            if (val[n]) {
                                endDate = val[n]
                            }
                            break;
                        case 'contrastDay':
                            if (val[n]) {
                                contrastDay = val[n]
                            }
                            break;
                        case 'typeCode':
                            if (val[n]) {
                                typeCode = val[n]
                            }
                            break;
                    }
                }
                that.allFun();
            })
            that.valueListDb();
            lineCont = that.app.loadModule(line, that.dom.find('.behaviorAnalysis1'), {
                line: {
                    id: 'behaviorAnalysis1',
                },
                title: {
                    title: '事件访问人数',
                    type: ['title', 'tip'],
                    position: ['left1', 'left2'],
                    tips: '每步事件在“所选周期平均内访问人数”和“过去7天平均值”对比'
                }
            });
            trendLineCont = that.app.loadModule(trendLine, that.dom.find('.behaviorAnalysis2'), {
                title: {
                    title: '事件转化率',
                    type: ['title', 'tip'],
                    position: ['left1', 'left2'],
                    tips: '每步事件访问人数的转化率'
                }
            });
            $.each(sameDom3, function(idx, val) {
                sameDom3[idx] = that.app.loadModule(VeDifferent, that.dom.find('.' + sameId3[idx]), {
                    data: {
                        id: sameId3[idx]
                    },
                    title: {
                        title: sameTitle[idx],
                        type: ['title', 'tip'],
                        position: ['left1', 'left2'],
                        tips: '<p>默认为事件组在各个' + sameTitle[idx].substring(0, 2) + '中的“周期平均访问人数”&“过去平均值”，以及两者对比的差异率（-100%-+100%）;</p>' +
                            '<p>当选择单步事件时，统计各个' + sameTitle[idx].substring(0, 2) + '中的“ 周期平均访问人数”&“过去平均值”，以及两者对比的差异率（-100%-+100%）</p>'
                    }
                })
            });
            setTimeout(function() {
                if (parseInt(osId) == 2) {
                    topCont.setTimeMin('calendar', '2017-05-16');
                } else {
                    topCont.setTimeMin('calendar', 'all');
                }
            }, 1000);
            //that.app.header.event._addEvent('header.osId', function(val) {
            that.app.header.setData = function(val) {
                    osId = val.osId;
                    if (parseInt(osId) == 2) {
                        topCont.setTimeMin('calendar', '2017-05-16');
                    } else {
                        topCont.setTimeMin('calendar', 'all');
                    }
                    topCont.refreshSelectTimeDay1();
                    that.dom.find('.Timers').val(Tool.GetDateStr(-1) + '至' + Tool.GetDateStr(-1));
                    startDate = Tool.backTime(myDate);
                    endDate = Tool.backTime(myDate);
                    that.valueListDb();
                }
                //})
        })
    }
    this.valueListDb = function() {
        var json = {
            type: 'eventgroup',
            osId: osId
        }
        that.api.valueList(json).then(function(res) {
            if (res.meta.success == true) {
                if (res.data.length > 0) {
                    typeCode = res.data[0].typeCode
                    $.each(res.data, function(idx, val) {
                        val.id = val.typeCode;
                        val.name = val.typeName
                    })
                    setTimeout(function() {
                        topCont.initSelectData(res.data, 'db');
                    }, 500);
                    that.allFun();
                }
            } else {
                that.app.login(res.meta);
            }
        })
    }
    this.allFun = function() {
        that.getVisitUvDb();
        that.getStepConvertDb();
        $.each(sameDom3, function(idx, val) {
            that.getEvenUvDifferenceDb(disSource[idx], sameDom3[idx], sameId3[idx], circle[idx]);
        })
    }
    this.getVisitUvDb = function() {
        lineCont.hideDataNull();
        lineCont.hideRefresh();
        lineCont.showLoading();
        var dataPara = {
            startDate: startDate,
            endDate: endDate,
            typeCode: typeCode,
            contrastDay: contrastDay,
            osId: osId
        };
        that.api.getVisitUv(dataPara).then(function(val) {
            lineCont.hideLoading();
            var obj = {};
            var arrX = [];
            var arrX1 = [];
            var arrY = [];
            var arrColor = [];
            var tips1 = that.tips(contrastDay); //选择对比
            var tips2 = startDate + '至' + endDate; //时间
            var arr1 = [];
            var arr2 = [];
            if (val.meta.success == true) {
                lineCont.hideRefresh();
                if (val.data.chooselist.length > 0 || val.data.oldAvglist.length > 0) {
                    lineCont.hideDataNull();
                    lineCont.showData();
                    var listArr = [val.data.chooselist.length, val.data.oldAvglist.length]
                    var listArr1 = [val.data.chooselist, val.data.oldAvglist]
                    var tempArr = [];
                    var max = listArr[0];
                    var len = listArr.length;
                    var i = 0;
                    for (i = 1; i < len; i++) {
                        if (listArr[i] > max) {
                            max = listArr[i];
                            tempArr = listArr1[i]
                        } else {
                            tempArr = listArr1[0]
                        }
                    }
                    $.each(tempArr, function(idx, value) {
                        if (value.avgUv != undefined || value.avgUv != null) {
                            arrX1.push(value.event);
                            arrX.push(value.event.length > 6 ? value.event.substring(0, 6) + '...' : value.event);
                        } else {
                            arrX.push('')
                        }
                    });
                    if (val.data.chooselist.length > 0) {
                        $.each(val.data.chooselist, function(idx, value) {
                            arr1.push(value.avgUv);
                        });
                    } else {
                        $.each(tempArr, function(idx, value) {
                            arr1.push(0)
                        })
                    }
                    if (val.data.oldAvglist.length > 0) {
                        $.each(val.data.oldAvglist, function(idx, value) {
                            arr2.push(value.avgUv);
                        });
                    } else {
                        $.each(tempArr, function(idx, value) {
                            arr2.push(0)
                        })
                    }
                    arrY.push(arr1);
                    arrY.push(arr2);
                    obj['arrX'] = arrX;
                    obj['arrX1'] = arrX1;
                    obj['arrY'] = arrY;
                    obj['arrColor'] = ['#88c4ff', '#ffc601'];
                    obj['width'] = that.dom.find('.behaviorAnalysis1').width();
                    obj['id'] = 'behaviorAnalysis1';
                    obj['tips1'] = tips1;
                    obj['tips2'] = tips2;
                    lineCont.setData(obj)
                } else {
                    lineCont.hideData();
                    lineCont.showDataNull();
                }
            } else {
                lineCont.showRefresh();
            }
        })
    }
    this.tips = function(val) {
        var tips = ''
        switch (parseInt(val)) {
            case 7:
                tips = '过去7天';
                break;
            case 30:
                tips = '过去30天';
                break;
            case 60:
                tips = '过去60天';
                break;
        }
        return tips
    }
    this.getStepConvertDb = function() {
        that.dom.find('.behaviorAnalysis2 .trendLine .content .img').addClass('hide');
        trendLineCont.hideDataNull();
        trendLineCont.hideRefresh();
        trendLineCont.showLoading();
        var dataPara = {
            startDate: startDate,
            endDate: endDate,
            typeCode: typeCode,
            contrastDay: contrastDay,
            osId: osId
        };
        that.api.getStepConvert(dataPara).then(function(res) {
            if (res.meta.success == true) {
                var allConvert = Tool.moneyFormat(res.data.allConvert);
                var transEvent = [];
                var transLoseNum = [];
                var transInterNum = [];
                var convertRate = [];
                var eventid = [];
                for (var i = 0; i < res.data.list.length; i++) {
                    transEvent.push(res.data.list[i].event);
                    transLoseNum.push(res.data.list[i].loseUv < 0 ? '-' + Tool.numFormat(Math.abs(res.data.list[i].loseUv)) : Tool.numFormat(res.data.list[i].loseUv));
                    transInterNum.push(res.data.list[i].uv < 0 ? '-' + Tool.numFormat(Math.abs(res.data.list[i].uv)) : Tool.numFormat(res.data.list[i].uv));
                    convertRate.push(Tool.moneyFormat(res.data.list[i].convertRate * 100));
                    eventid.push(res.data.list[i].eventid);
                }
                if (res.data.list.length == 0 || res.data.list == undefined || res.data.list == null) {
                    that.dom.find('.behaviorAnalysis2 .trendLine .content .img').addClass('hide');
                    trendLineCont.hideLoading();
                    trendLineCont.hideRefresh();
                    trendLineCont.showDataNull();
                } else {
                    trendLineCont.hideLoading();
                    trendLineCont.hideDataNull();
                    trendLineCont.hideRefresh();
                    that.dom.find('.behaviorAnalysis2 .trendLine .content .img').removeClass('hide');
                    var data = {
                        allConvert: allConvert,
                        transEvent: transEvent,
                        transLoseNum: transLoseNum,
                        transInterNum: transInterNum,
                        convertRate: convertRate,
                        eventid: eventid
                    }
                    trendLineCont.setData(data);
                    trendLineCont.event._addEvent('trendLineCont.click', function(val) {
                        eventId = val;
                        $.each(sameDom3, function(idx, val) {
                            that.getEvenUvDifferenceDb(disSource[idx], sameDom3[idx], sameId3[idx], circle[idx]);
                        })
                    })
                }
            } else {
                that.dom.find('.behaviorAnalysis2 .trendLine .content .img').addClass('hide');
                trendLineCont.hideLoading();
                trendLineCont.showRefresh();
            }
        });
    }
    this.getEvenUvDifferenceDb = function(disSourceName, dom, id, circle) {
        dom.hideDataNull();
        dom.hideRefresh();
        dom.showLoading();
        var json = {
            startDate: startDate,
            endDate: endDate,
            typeCode: typeCode,
            eventId: eventId,
            contrastDay: contrastDay,
            osId: osId,
            disSource: disSourceName
        }
        that.api.getEvenUvDifference(json).then(function(res) {
            dom.hideLoading();
            res.data.list = [{
                avgUv: "0",
                difName: '6.3.2',
                difRate: "-100",
                uv: "1893"
            }]
            if (res.meta.success == true) {
                if (res.data) {
                    if (res.data.length > 0) {
                        dom.showData();
                        dom.hideDataNull();
                        dom.setData(that.dataPro(res, id, circle));
                    } else {
                        dom.showDataNull();
                        dom.hideData();
                    }
                } else {
                    dom.showDataNull();
                    dom.hideData();
                }
            } else {
                dom.showRefresh();
            }
        })
    };
    this.dataPro = function(res, dom, cirNum) {
        var data = [];
        var color = ['#85c2ff', '#528fcc', '#3962a0', '#717ccb', '#9980b9'];
        $.each(res.data, function(i, val) {
            var obj = {};
            obj.id = dom;
            obj.uv = val.uv;
            obj.difRate = val.difRate;
            obj.difName = val.difName;
            obj.avgUv = val.avgUv;
            obj.color = color[i % 5];
            obj.cirNum = cirNum;
            obj.startDate = startDate;
            obj.endDate = endDate;
            obj.contrastDay = contrastDay;
            data.push(obj);
        })
        return data;
    }
}

module.exports = behaviorAnalysis;