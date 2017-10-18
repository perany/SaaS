var resolve = $.Deferred()
var resolve1 = $.Deferred()
var resolve2 = $.Deferred()
var resolve3 = $.Deferred()
var top
var line
var rect
var VeDifferent
require.ensure(['../moduleslibs/topCont/topCont.js'], function(e) {
    top = require('../moduleslibs/topCont/topCont.js')
    resolve.resolve()
});
require.ensure(['../modules/line/cont.js'], function(e) {
    line = require('../modules/line/cont.js')
    resolve1.resolve()
});
require.ensure(['../modules/VeDifferent/VeDifferent.js'], function(e) {
    VeDifferent = require('../modules/VeDifferent/VeDifferent.js')
    resolve2.resolve()
});
require.ensure(['../modules/rect/cont_rect.js'], function(e) {
    rect = require('../modules/rect/cont_rect.js')
    resolve3.resolve()
});



function usageAnalysis() {
    var that = this;
    var topCont = null;
    var lineCont = null;
    var trendLineCont = null;
    var rectCont = null;
    var VeDifferentCont1 = null;
    var VeDifferentCont2 = null;
    var osId = '1';
    var myDate = new Date(new Date().getTime() - 86400000);
    var startDate = Tool.backTime(myDate);
    var endDate = Tool.backTime(myDate);
    var typeCode;
    var typeValue = 'startnum';
    var contrastDay = 7
    var matchTable = ['startTime', 'endTime', 'contrastDay', 'typeCode'];
    var sameId3 = ['usageAnalysis3', 'usageAnalysis4']
    var sameDom3 = ['VeDifferentCont1', 'VeDifferentCont2']
    var sameTitle = ['渠道差异比', '版本差异比']
    var circle = ['circle2-', 'circle4-']
    var disSource = [1, 3]
    this.complete = function() {
        osId = that.app.model.get('iosId') ? that.app.model.get('iosId') : '1';
        this.app.returnRequier([resolve, resolve1, resolve2, resolve3]).done(function() {
            topCont = that.app.loadModule(top, that.dom.find('.firstActCont'), {
                data: {
                    type: ['select', 'calendar', 'timeBox'],
                    position: ['left_cont1', 'left_cont2', 'right_cont1'],
                    timeBoxTitle: '选择对比',
                    timeBoxContent: ['过去7天', '过去30天', '过去60天'],
                    select_data: [{ title: '选择类型', data: [], id: 'db' }],
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
                if (parseInt(typeCode) == 11) {
                    typeValue = 'startnum';
                } else {
                    typeValue = 'usetime'
                }
                that.allFun();
            })
            that.valueListDb();
            lineCont = that.app.loadModule(line, that.dom.find('.usageAnalysis1'), {
                line: {
                    id: 'usageAnalysis1',
                },
                title: {
                    title: '启用次数',
                    type: ['title', 'tip'],
                    position: ['left1', 'left2'],
                    tips: '“周期平均内的启用次数”和“过去7天/30天/60天平均启用次数”比较'
                }
            });
            rectCont = that.app.loadModule(rect, that.dom.find('.usageAnalysis2'), {
                data: {
                    id: 'usageAnalysis2',
                },
                title: {
                    title: '影响差异度分布',
                    type: ['title', 'tip'],
                    position: ['left1', 'left2'],
                    tips: '“启用次数或使用时长”数值在“渠道&版本”中，与“启用次数或使用时长”过往平均数值的差异度高中低'
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
                        tips: '“启用次数或使用时长”在各个' + sameTitle[idx].substring(0, 2) + '中的“周期平均数值”和“过去平均值”，以及两者对比的差异率（-100%-+100%）；'
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
                    that.allFun();
                }
                //})
        })
    }
    this.valueListDb = function() {
        var json = {
            type: 'userevent',
        }
        that.api.valueList(json).then(function(res) {
            if (res.meta.success == true) {
                if (res.data.length > 0) {
                    typeValue = res.data[0].typeValue
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
        that.getFrequencyContrastDb();
        that.getUseDistributionDb();
        $.each(sameDom3, function(idx, val) {
            that.getUseDifferenceDb(disSource[idx], sameDom3[idx], sameId3[idx], circle[idx]);
        })
    }
    this.getUseDifferenceDb = function(disSourceName, dom, id, circle) {
        dom.hideDataNull();
        dom.hideRefresh();
        dom.showLoading();
        var json = {
            startDate: startDate,
            endDate: endDate,
            typeCode: typeCode,
            typeValue: typeValue,
            contrastDay: contrastDay,
            osId: osId,
            disSource: disSourceName
        }
        that.api.getUseDifference(json).then(function(res) {
            dom.hideLoading();
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
    }
    this.dataPro = function(res, dom, cirNum) {
        var data = [];
        var color = ['#85c2ff', '#528fcc', '#3962a0', '#717ccb', '#9980b9'];
        $.each(res.data, function(i, val) {
            var obj = {};
            obj.id = dom;
            obj.uv = val.uv;
            obj.difRate = val.difRate ? val.difRate : '0.00%';
            obj.difName = val.difName ? val.difName : '';
            obj.avgUv = val.avgUv ? val.avgUv : 0;
            obj.color = color[i % 5];
            obj.cirNum = cirNum;
            obj.startDate = startDate;
            obj.endDate = endDate;
            obj.contrastDay = contrastDay;
            obj.typeCode = typeCode;
            data.push(obj);
        })
        return data;
    }
    this.getFrequencyContrastDb = function() {
        lineCont.hideDataNull();
        lineCont.hideRefresh();
        lineCont.showLoading();
        var json = {
            startDate: startDate,
            endDate: endDate,
            typeCode: typeCode,
            typeValue: typeValue,
            contrastDay: contrastDay,
            osId: osId
        }
        that.api.getFrequencyContrast(json).then(function(val) {
            lineCont.hideLoading();
            var obj = {};
            var arrX = [];
            var arrX1 = [];
            var arrY = [];
            var arrColor = [];
            var tips = that.tips(typeCode) //下拉框
            var tips1 = that.tips(contrastDay); //选择对比
            var tips2 = ''; //时间
            var arr1 = [];
            var arr2 = [];
            if (val.meta.success == true) {
                lineCont.hideRefresh();
                tips2 = val.data.contrastStartDate + '至' + val.data.contrastEndDate;
                if (val.data.chooselist.length > 0 || val.data.oldAvglist.length > 0) {
                    lineCont.hideDataNull();
                    var listArr1 = [val.data.chooselist, val.data.oldAvglist];
                    var listArr = [val.data.chooselist.length, val.data.oldAvglist.length];
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
                        if (startDate == endDate) {
                            if (value.hour != undefined || value.hour != null) {
                                arrX.push(('0' + value.hour).slice(-2) + ':00')
                                arrX1.push(('0' + value.hour).slice(-2) + ':00' + '-' + ('0' + (value.hour + 1)).slice(-2) + ':00');
                            } else {
                                arrX.push('00:00')
                                arrX1.push(Tool.GetDateStr(0));
                            }
                        } else {
                            arrX.push(value.date);
                            arrX1.push(value.date);
                        }
                    });
                    if (val.data.chooselist.length > 0) {
                        $.each(val.data.chooselist, function(idx, value) {
                            if (value.frequency) {
                                arr1.push(value.frequency)
                            } else {
                                arr1.push(0);
                            }
                        });
                    } else {
                        $.each(tempArr, function(idx, value) {
                            arr1.push(0);
                        })
                    }
                    if (val.data.oldAvglist.length > 0) {
                        $.each(val.data.oldAvglist, function(idx, value) {
                            if (startDate == endDate) {
                                if (value.frequency) {
                                    arr2.push(value.frequency)
                                } else {
                                    arr2.push(0)
                                }
                            } else {
                                if (value.frequency) {
                                    for (var i = 0; i < tempArr.length; i++) {
                                        arr2.push(value.frequency)
                                    }
                                } else {
                                    for (var i = 0; i < tempArr.length; i++) {
                                        arr2.push(0)
                                    }
                                }
                            }
                        });
                    } else {
                        for (var i = 0; i < tempArr.length; i++) {
                            arr2.push(0)
                        }
                    }
                    arrY.push(arr1);
                    arrY.push(arr2);
                    obj['arrX'] = arrX;
                    obj['arrX1'] = arrX1;
                    obj['arrY'] = arrY;
                    obj['arrColor'] = ['#44B6AE', '#ffc600'];
                    obj['width'] = that.dom.find('.usageAnalysis1').width() - 20;
                    obj['id'] = 'usageAnalysis1';
                    obj['tips'] = tips;
                    obj['tips1'] = tips1;
                    obj['tips2'] = tips2;
                    obj['unitY'] = typeCode;
                    // console.log('777777777', obj);
                    lineCont.setData(obj)
                } else {
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
            case 11:
                tips = '启用次数';
                that.dom.find('.usageAnalysis1 .left1').html('启用次数');
                break;
            case 12:
                tips = '使用时长';
                that.dom.find('.usageAnalysis1 .left1').html('使用时长');
                break;
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
    this.getUseDistributionDb = function() {
        rectCont.hideDataNull();
        rectCont.hideRefresh();
        rectCont.showLoading();
        var json = {
                startDate: startDate,
                endDate: endDate,
                typeCode: typeCode,
                typeValue: typeValue,
                contrastDay: contrastDay,
                osId: osId
            }
            //console.log('oioooooooiii', json);
        that.api.getUseDistribution(json).then(function(res) {
            rectCont.hideLoading();
            if (res.meta.success == true) {
                if (res.data) {
                    if (res.data.length > 0) {
                        rectCont.showData();
                        rectCont.hideDataNull();
                        that.dealData1(res.data);
                    } else {
                        rectCont.showDataNull();
                        rectCont.hideData();
                    }
                } else {
                    rectCont.showDataNull();
                    rectCont.hideData();
                }
            } else {
                rectCont.showRefresh();
            }
        })
    }
    this.dealData1 = function(res) {
        var obj = {};
        var arrX = [];
        var arrX1 = [];
        var arrY = [];
        var color = [];
        var tips = [];
        var tips1 = [];
        $.each(res, function(idx, value) {
            if (startDate == endDate) {
                if (value.hour != undefined || value.hour != null) {
                    arrX.push(('0' + value.hour).slice(-2) + ':00')
                    arrX1.push(('0' + value.hour).slice(-2) + ':00' + '-' + ('0' + (value.hour * 1 + 1)).slice(-2) + ':00');
                } else {
                    arrX.push('00:00')
                    arrX1.push(Tool.GetDateStr(0));
                }
            } else {
                arrX.push(value.date);
                arrX1.push(value.date);
            }
            if ((value.versionsExp) * 1 > 0 && (value.versionsExp) * 1 < 25) {
                tips.push('低')
            } else if ((value.versionsExp) * 1 >= 25 && (value.versionsExp) * 1 < 50) {
                tips.push('中')
            } else if ((value.versionsExp) * 1 >= 50 && (value.versionsExp) * 1 < 75) {
                tips.push('高')
            } else if ((value.versionsExp) * 1 >= 75 && (value.versionsExp) * 1 < 100) {
                tips.push('超高')
            } else {
                tips.push('无')
            }
            if ((value.channelExp) * 1 > 0 && (value.channelExp) * 1 < 25) {
                tips1.push('低')
            } else if ((value.channelExp) * 1 >= 25 && (value.channelExp) * 1 < 50) {
                tips1.push('中')
            } else if ((value.channelExp) * 1 >= 50 && (value.channelExp) * 1 < 75) {
                tips1.push('高')
            } else if ((value.channelExp) * 1 >= 75 && (value.channelExp) * 1 < 100) {
                tips1.push('超高')
            } else {
                tips1.push('无')
            }
            if (value.channelExp == '') {
                value.channelExp = 0
            }
            if (value.versionsExp == '') {
                value.versionsExp = 0
            }
            arrY.push([value.channelExp, value.versionsExp])
            color.push(["#528FCC", "#85C2FF"])
        });
        obj['arrX'] = arrX;
        obj['arrX1'] = arrX1;
        obj['arrY'] = arrY;
        obj['color'] = color;
        obj['tips'] = tips;
        obj['tips1'] = tips1;
        obj['width'] = that.dom.find('.usageAnalysis2').width() + 20;
        obj['id'] = 'usageAnalysis2';
        rectCont.setData(obj);
        html = '<div style="width:36px;height:243px;position:absolute;top:50px;left:20px;">' +
            '<span style="display:block;height:25%;padding-top:30px;">超高</span>' +
            '<span style="display:block;height:25%;">高</span>' +
            '<span style="display:block;height:25%;">中</span>' +
            '<span style="display:block;height:25%;">低</span>' +
            '</div>';
        that.dom.find('#usageAnalysis2').append(html);
    }
}

module.exports = usageAnalysis;