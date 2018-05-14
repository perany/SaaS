var resolve = $.Deferred()
var resolve1 = $.Deferred()
var resolve2 = $.Deferred()
var resolve3 = $.Deferred()
var top
var rect
var line
var bubble
require.ensure(['../moduleslibs/topCont/topCont.js'], function(e) {
    top = require('../moduleslibs/topCont/topCont.js')
    resolve.resolve()
});
require.ensure(['../modules/line/cont.js'], function(e) {
    line = require('../modules/line/cont.js')
    resolve1.resolve()
});
require.ensure(['../modules/activesChannel/bubble/bubble.js'], function(e) {
    bubble = require('../modules/activesChannel/bubble/bubble.js')
    resolve2.resolve()
});
require.ensure(['../modules/rect/cont_rect.js'], function(e) {
    rect = require('../modules/rect/cont_rect.js')
    resolve3.resolve()
});

function channelAnalysis() {
    var that = this;
    var topCont = null;
    var bubbleCont = null;
    var lineCont1 = null;
    var lineCont2 = null;
    var lineCont3 = null;
    var lineCont4 = null;
    var rectCont = null;
    var osId = '1';
    var timeType = 1;
    var myDate = new Date(new Date().getTime() - 86400000);
    var startDate = Tool.backTime(myDate);
    var endDate = Tool.backTime(myDate);
    var channelId = '';
    var channelName = '';
    var diff = 0;
    var matchTable = ['startTime', 'endTime'];
    var sameTitle = ['渠道新增用户成本', '渠道活跃用户成本', '渠道留存用户成本', '渠道付费用户成本']
    var sameId = ['channelAnalysis3', 'channelAnalysis4', 'channelAnalysis5', 'channelAnalysis6']
    var sameDom = ['lineCont1', 'lineCont2', 'lineCont3', 'lineCont4']
    var sameTitleTips = ['投放渠道获客新增用户的成本，可在自定义渠道管理中新增渠道成本', '投放渠道获客活跃用户的成本，可在自定义渠道管理中新增渠道成本', '投放渠道获客留存用户成本，可在自定义渠道管理中新增渠道成本；日留存＝渠道1日投放金额／（日留存用户在第一天的新增用户在第二天中登录过的用户）；周留存＝渠道7日投放金额相加／（周留存用户在第一周的新增用户在第二周中登录过的用户）；月留存＝渠道30天投放金额相加／（日留存用户在第一月的新增用户在第二月中登录过的用户）', '投放渠道获客付费用户成本，可在自定义渠道管理中新增渠道成本；日转化＝渠道1日投放金额／日付费用户在1天内付费一次成功的用户相加；周转化＝渠道7日投放金额相加/周付费用户在7天内付费一次成功的用户相加；月转化＝渠道30日投放金额相加/月付费用户在30天内付费一次成功的用户相加']
    var lineColor = ['#47b7af', '#85c2ff', '#47b7af', '#85c2ff'];
    var fillColor = ['#a1dad6', '#c2e0ff', '', ''];
    this.complete = function() {
        console.log('ijisidsjic', that.app.model.get('iosId'));
        osId = that.app.model.get('iosId') ? that.app.model.get('iosId') : '1';
        this.app.returnRequier([resolve, resolve1, resolve2, resolve3]).done(function() {
            topCont = that.app.loadModule(top, that.dom.find('.firstActCont'), {
                data: {
                    type: ['calendar'],
                    position: ['left_cont1'],
                    matchTable: matchTable
                }
            })
            topCont.event._addEvent('topCont.data', function(val) {
                startDate = val.startTime;
                endDate = val.endTime;
                that.analysisListDb()
            })
            that.dom.find('.right1').addClass('hide');
            rectCont = that.app.loadModule(rect, that.dom.find('.channelAnalysis1'), {
                data: {
                    id: 'channelAnalysis1'
                },
                title: {
                    title: '渠道用户比',
                    titleTips: '周期内单个渠道的单类用户占全部渠道的单类用户比',
                    type: ['title', 'titleContent'],
                    position: ['left1', 'left2'],
                    text: ['新增用户', '活跃用户', '注册用户', '付费用户'],
                    color: ['#85c2ff', '#528fcc', '#717ccb', '#9980b9']
                }
            });
            that.userRatioAnalysisDb();
            bubbleCont = that.app.loadModule(bubble, that.dom.find('.channelAnalysis2'), {
                data: {
                    id: 'channelAnalysis2'
                },
                title: {
                    title: '渠道价值分布',
                    type: ['title', 'titleContent'],
                    position: ['left1', 'left2'],
                    text: ['地推二维码', '广告二维码', 'H5朋友圈', 'AppStore', '微博', '搜索引擎'],
                    color: ['#85c2ff', '#528fcc', '#2e75e0', '#717ccb', '#9980b9', '#cdbedb']
                }
            })
            $.each(sameTitle, function(idx, value) {
                sameDom[idx] = that.app.loadModule(line, that.dom.find('.' + sameId[idx]), {
                    line: {
                        id: sameId[idx]
                    },
                    title: {
                        title: sameTitle[idx],
                        titleTips: sameTitleTips[idx],
                        type: (idx == 2 || idx == 3) ? ['title', 'radio', 'saveBtn'] : ['title', 'radio'],
                        position: (idx == 2 || idx == 3) ? ['left1', 'left2', 'right1'] : ['left1', 'left2'],
                        saveName: (idx == 3) ? ['日转化', '周转化', '月转化'] : ['日留存', '周留存', '月留存'],
                        saveBtnType: idx
                    }
                })
                if (idx == 3) {
                    that.analysisListDb()
                }
                sameDom[idx].event._addEvent('line.radio', function(val) {
                    // console.log('------', val);
                    channelName = val.name;
                    channelId = val.id;
                    timeType = 1;
                    var json;
                    if (val.type == "0" || val.type == "1") {
                        json = {
                            startTime: val.start,
                            endTime: val.end,
                            osId: osId,
                            channelId: val.id,
                            channelName: val.name
                        }
                    } else {
                        json = {
                            startTime: val.start,
                            endTime: val.end,
                            osId: osId,
                            channelId: val.id,
                            channelName: val.name,
                            timeType: timeType
                        }
                    }
                    diff = Tool.getDateDiff(val.start, val.end);
                    that.timeDiff(val.type);
                    that.match(parseInt(val.type), json)
                });
                sameDom[idx].event._addEvent('cont.saveBtn', function(val) {
                    timeType = val.id;
                    that.match(parseInt(val.type))
                })
            });
            setTimeout(function() {
                console.log('23232', that.app.model.get('iosId'));
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
                startDate = Tool.GetDateStr(-1);
                endDate = Tool.GetDateStr(-1);
                topCont.refreshSelectTimeDay1();
                that.dom.find('.Timers').val(Tool.GetDateStr(-1) + '至' + Tool.GetDateStr(-1));
                that.analysisListDb();
            };
            //});
        })
    }
    this.analysisListDb = function() {
        $.each(sameDom, function(i, val) {
            that.dom.find(sameId[i] + ' .actCont1 .body_cont').addClass('hide');
            val.hideDataNull();
            val.hideRefresh();
            val.showLoading();
        })
        var json = {
            startTime: startDate,
            endTime: endDate,
            osId: osId
        }
        that.api.channelList(json).then(function(res) {
            sameDom[0].hideLoading();
            sameDom[1].hideLoading();
            sameDom[2].hideLoading();
            sameDom[3].hideLoading();
            if (res.meta.success == true) {
                if (res.data.length > 0) {
                    that.dom.find('.radio-control').removeClass('hide');
                    sameDom[0].showData();
                    sameDom[1].showData();
                    sameDom[2].showData();
                    sameDom[3].showData();
                    sameDom[0].hideDataNull();
                    sameDom[1].hideDataNull();
                    sameDom[2].hideDataNull();
                    sameDom[3].hideDataNull();
                    channelId = res.data[0].id;
                    channelName = res.data[0].channelName;
                    startDate = res.data[0].startTime;
                    endDate = res.data[0].endTime;
                    diff = Tool.getDateDiff(res.data[0].startTime, res.data[0].endTime)
                    that.timeDiff(0);
                    $.each(res.data, function(idx, val) {
                        val.name = val.channelName;
                        val.start = val.startTime;
                        val.end = val.endTime;
                    })
                    sameDom[0].setRadioData(res.data, 0, true);
                    sameDom[1].setRadioData(res.data, 1, true);
                    sameDom[2].setRadioData(res.data, 2, true);
                    sameDom[3].setRadioData(res.data, 3, true);
                    for (var i = 2; i < 7; i++) {
                        that.dom.find('.channelAnalysis' + i).find('.left2').removeClass('hide');
                    }
                    for (var i = 0; i < 4; i++) {
                        that.match(i)
                    }
                    that.dom.find('.right1').removeClass('hide');
                } else {
                    that.dom.find('.radio-control').addClass('hide');
                    sameDom[0].hideData();
                    sameDom[1].hideData();
                    sameDom[2].hideData();
                    sameDom[3].hideData();
                    sameDom[0].showDataNull();
                    sameDom[1].showDataNull();
                    sameDom[2].showDataNull();
                    sameDom[3].showDataNull();
                    that.dom.find('.right1').addClass('hide');
                    for (var i = 2; i < 7; i++) {
                        that.dom.find('.channelAnalysis' + i).find('.left2').addClass('hide');
                    }
                }
            } else {

            }
        })
    }
    this.match = function(i, data) {
        //console.log('pppppp', data);
        sameDom[i].showLoading();
        var json;
        if (data) {
            json = data
        } else {
            if (i == 0 || i == 1) {
                json = {
                    startTime: startDate,
                    endTime: endDate,
                    osId: osId,
                    channelId: channelId,
                    channelName: channelName
                }
            } else {
                json = {
                    startTime: startDate,
                    endTime: endDate,
                    osId: osId,
                    channelId: channelId,
                    channelName: channelName,
                    timeType: timeType
                }
            }
        }
        switch (i) {
            case 0:
                that.api.cpgaAnalysis(json).then(function(res) {
                    that.dataPro(res, 0);
                });
                break;
            case 1:
                that.api.activeUserCostAnalysis(json).then(function(res) {
                    that.dataPro(res, 1);
                });
                break;
            case 2:
                that.api.retainedUserCostAnalysis(json).then(function(res) {
                    that.dataPro(res, 2);
                });
                break;
            case 3:
                that.api.paidUserCostAnalysis(json).then(function(res) {
                    that.dataPro(res, 3);
                });
                break
        }
    }
    this.timeDiff = function(type) {
        // console.log('diff', diff);
        if (type == 0) {
            sameDom[2].timeDiff(diff, type);
            sameDom[3].timeDiff1(diff, type);
        } else if (parseInt(type) == 2) {
            sameDom[2].timeDiff(diff, type);
        } else if (parseInt(type) == 3) {
            sameDom[3].timeDiff1(diff, type);
        }
    }
    this.dataPro = function(res, num) {
        sameDom[num].hideLoading();
        if (res.meta.success == true) {
            sameDom[num].hideRefresh();
            if (res.data.length > 0) {
                sameDom[num].showData();
                sameDom[num].hideDataNull();
                var arrX = [];
                var arrY = [];
                var tips = [];
                $.each(res.data, function(i, val) {
                    var X = val.hourFormat ? val.hourFormat : val.date
                    arrX.push(X);
                    if (val.cost != -1) {
                        arrY.push(val.cost);
                        tips.push(val.cost);
                    } else {
                        arrY.push(0);
                        tips.push('无');
                    }
                })
                var json = {
                    id: sameId[num],
                    title: sameTitle[num],
                    channelName: channelName,
                    width: that.dom.find('.' + sameId[num] + ' .body_cont').width() + 20,
                    lineColor: lineColor[num],
                    fillColor: fillColor[num],
                    arrX: arrX,
                    arrY: arrY,
                    tips: tips,
                }
                sameDom[num].setData(json);
                return;
            } else {
                sameDom[num].showDataNull();
                sameDom[num].hideData();
                //that.dom.find(sameId[num] + ' .actCont1 .body_cont').addClass('hide');
            }
        } else {
            sameDom[num].showRefresh();
        }
    }
    this.userRatioAnalysisDb = function() {
        rectCont.showLoading();
        rectCont.hideDataNull();
        rectCont.hideData();
        var json = {
            startTime: startDate,
            endTime: endDate,
            osId: osId
        }
        var obj = {};
        var arrX = [];
        var arrY = [];
        var color = [];
        that.api.userRatioAnalysis(json).then(function(res) {
            rectCont.hideLoading();
            if (res.meta.success == true) {
                if (res.data.length > 0) {
                    rectCont.showData();
                    rectCont.hideDataNull();
                    $.each(res.data, function(idx, val) {
                        arrX.push(val.name);
                        if (!val.newUserRatio) {
                            val.newUserRatio = 0
                        }
                        if (!val.activeUserRatio) {
                            val.activeUserRatio = 0
                        }
                        if (!val.registeredUserRatio) {
                            val.registeredUserRatio = 0
                        }
                        if (!val.paidUserRatio) {
                            val.paidUserRatio = 0
                        }
                        arrY.push([val.newUserRatio, val.activeUserRatio, val.registeredUserRatio, val.paidUserRatio,0])
                        color.push(["#85c2ff", "#528fcc", "#717ccb", "#9980b9"])
                    })
                    obj['arrX'] = arrX;
                    obj['arrY'] = arrY;
                    obj['color'] = color;
                    obj['range'] = [0.2, 0.15];
                    obj['width'] = that.dom.find('.channelAnalysis1').width() + 20;
                    obj['id'] = 'channelAnalysis1';
                    obj['startDa'] = startDate;
                    obj['endDa'] = endDate;
                    rectCont.setData(obj);
                } else {
                    rectCont.showDataNull();
                    rectCont.hideData();
                }
            } else {
                rectCont.showRefresh();
            }
        })
    }
}

module.exports = channelAnalysis;