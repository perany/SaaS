require("../less/versionAnalysis.less")
var top
var rect
var line
var resolve = $.Deferred()
var resolve1 = $.Deferred()
var resolve2 = $.Deferred()
require.ensure(['../moduleslibs/topCont/topCont.js'], function(e) {
    top = require('../moduleslibs/topCont/topCont.js')
    resolve.resolve()
});
require.ensure(['../modules/rect/cont_rect.js'], function(e) {
    rect = require('../modules/rect/cont_rect.js')
    resolve1.resolve()
});
require.ensure(['../modules/line/cont.js'], function(e) {
    line = require('../modules/line/cont.js')
    resolve2.resolve()
});

function versionAnalysisIndex() {
    var that = this;
    var matchTable = ['startTime', 'endTime', 'versionIds', 'topTypeId'];
    var topCont = null;
    var rectCont = null;
    var lineCont1 = null;
    var lineCont2 = null;
    var lineCont3 = null;
    var lineCont4 = null;
    var osId = '1';
    var myDate = new Date(new Date().getTime() - 86400000);
    var startDate = Tool.GetDateStr(-30);
    var endDate = Tool.GetDateStr(-1);
    var versionIds = '';
    var allColor = ['#99ccff', '#6699cc', '#6666cc', '#9999cc']
    var sameTitle = ['版本活跃用户', '版本注册用户', '版本付费用户', '版本留存用户']
    var sameId = ['versionAnalysis2', 'versionAnalysis3', 'versionAnalysis4', 'versionAnalysis5']
    var sameDom = ['lineCont1', 'lineCont2', 'lineCont3', 'lineCont4']
    var sameTitleTips = ['所选周期范围内（去重），至少启动过一次的用户', '所选周期范围内，有注册成功行为的用户', '所选周期范围内，有付费成功行为的用户', '日留存用户=第一天新增用户在第二天登录过的用户，以日存储次日留存用户； 周留存用户=第一周新增用户在第二周登录过的用户；月留存用户=第一月新增用户在第二月登录过的用户']
    var lineColor = ['#99ccff', '#6699cc', '#6666cc', '#9999cc'];
    var fillColor = ['#99ccff', '#6699cc', '#6666cc', '#9999cc'];
    var timeType = 1;
    this.complete = function() {
        osId = that.app.model.get('iosId') ? that.app.model.get('iosId') : '1';
        this.app.returnRequier([resolve, resolve1, resolve2]).done(function() {
            topCont = that.app.loadModule(top, that.dom.find('.firstActCont1'), {
                data: {
                    type: ['calendar', 'versionSelect'],
                    position: ['left_cont1', 'left_cont2'],
                    matchTable: matchTable,
                    startDay: Tool.GetDateStr(-30)
                }
            });
            topCont.event._addEvent('topCont.data', function(val) {
                console.log('数据', val);
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
                        case 'versionIds':
                            if (val[n] != '') {
                                versionIds = val[n]
                            }
                            break;
                    }
                }
                if (val.topTypeId == 'calendar') {
                    that.versionListDb();
                    that.timeDiff();
                    timeType = 1;
                } else {
                    that.addUserAnalysisDb();
                    for (var i = 0; i < 4; i++) {
                        that.match(i)
                    }
                }
            })
            rectCont = that.app.loadModule(rect, that.dom.find('.versionAnalysis1'), {
                data: {
                    id: 'versionAnalysis1',
                },
                title: {
                    title: '版本新增用户',
                    type: ['title', 'tip', 'smallRect'],
                    position: ['left1', 'left2', 'left3'],
                    smallRect: [{ color: '#99ccff', version: '', name: '用户总数', num: 0 }, { color: '#6699cc', version: '', name: '用户总数', num: 0 }, { color: '#6666cc', version: '', name: '用户总数', num: 0 }, { color: '#9999cc', version: '', name: '用户总数', num: 0 }],
                    tips: '所选周期范围内，安装应用后首次启用应用的用户'
                }
            });
            $.each(sameTitle, function(idx, value) {
                sameDom[idx] = that.app.loadModule(line, that.dom.find('.' + sameId[idx]), {
                    line: {
                        id: sameId[idx]
                    },
                    title: {
                        title: sameTitle[idx],
                        titleTips: sameTitleTips[idx],
                        type: (idx == 3) ? ['title', 'smallRect', 'saveBtn'] : ['title', 'smallRect'],
                        position: (idx == 3) ? ['left1', 'left2', 'right1'] : ['left1', 'left2'],
                        saveName: ['日留存', '周留存', '月留存'],
                        saveBtnType: idx,
                        smallRect: [{ color: '#99ccff', version: '', name: '用户总数', num: 0 }, { color: '#6699cc', version: '', name: '用户总数', num: 0 }, { color: '#6666cc', version: '', name: '用户总数', num: 0 }, { color: '#9999cc', version: '', name: '用户总数', num: 0 }],
                    }
                })

                sameDom[idx].event._addEvent('cont.saveBtn', function(val) {
                    timeType = val.id;
                    that.match(parseInt(val.type))
                })
                if (idx == 3) {
                    that.timeDiff()
                }
            });
            setTimeout(function() {
                if (parseInt(osId) == 2) {
                    topCont.setTimeMin('calendar', '2017-05-16');
                } else {
                    topCont.setTimeMin('calendar', 'all');
                }
            }, 1000);
            that.app.header.setData = function(val) {
                osId = val.osId;
                if (parseInt(osId) == 2) {
                    topCont.setTimeMin('calendar', '2017-05-16');
                } else {
                    topCont.setTimeMin('calendar', 'all');
                }
                topCont.refreshSelectTimeDay1();
                that.dom.find('.Timers').val(Tool.GetDateStr(-30) + '至' + Tool.GetDateStr(-1));
                startDate = Tool.GetDateStr(-30);
                endDate = Tool.GetDateStr(-1);
                that.versionListDb();
            }
            that.versionListDb();
            //that.dom.find('.Timers').val(Tool.GetDateStr(-30) + '至' + Tool.GetDateStr(-1));
        });
    }


    that.versionListDb = function() {
        versionIds = '';
        var json = {
            osId: osId,
            startTime: startDate,
            endTime: endDate
        }
        that.api.versionList(json).done(function(res) {
            if (res.meta.success == true) {
                if (res.data.length > 0) {
                    that.dom.find('.versionTips2').addClass('hide')
                    that.dom.find('.body_cont').removeClass('hide');
                    that.dom.find('.dataNone').addClass('hide');
                    $.each(res.data, function(idx, val) {
                        if (idx < 4) {
                            if (idx == 0) {
                                versionIds += val.id
                            } else {
                                versionIds += ',' + val.id
                            }
                        }
                    })
                    that.dom.find('.rectList').removeClass('hide');
                    topCont.versionSetData(res.data);
                    that.addUserAnalysisDb();
                    for (var i = 0; i < 4; i++) {
                        that.match(i)
                    }
                } else {
                    that.dom.find('.versionTips2').removeClass('hide')
                    that.dom.find('.versionNum input').val('已选择0个');
                    that.dom.find('.versionSum').empty();
                    that.dom.find('.rectList').addClass('hide');
                    that.dom.find('.body_cont').addClass('hide');
                    that.dom.find('.loading_cont').addClass('hide');
                    that.dom.find('.dataNone').removeClass('hide');
                }
            }
        })
    }
    that.addUserAnalysisDb = function() {
        rectCont.hideDataNull();
        rectCont.hideRefresh();
        rectCont.showLoading();
        var json = {
            osId: osId,
            startTime: startDate,
            endTime: endDate,
            versionIds: versionIds
        }
        that.api.addUserAnalysis(json).done(function(res) {
            rectCont.hideLoading();
            var x = [];

            if (res.meta.success == true) {
                if (res.data) {
                    if (res.data.versionDetailList.length > 0) {
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
        var arrY = [];
        var color = [];
        var tipsName = '版本新增用户'
        var tips = [];
        var tempY = [];
        var totalUsers = [];
        var smallRectArr = [];
        $.each(res.versionTotalUsersList, function(idx, val) {
            tips.push(val.versionName);
            totalUsers.push(val.totalUsers);
        })
        $.each(tips, function(idx, val) {
            var obj = {
                color: allColor[idx],
                version: val,
                name: '用户总数',
                num: totalUsers[idx]
            }
            smallRectArr.push(obj)
        });
        console.log('smallRectArr', smallRectArr)
        rectCont.setSmallRect(smallRectArr)
        $.each(res.versionDetailList[0], function(idx, val) {
            if (startDate == endDate) {
                arrX.push(val.hourFormat)
            } else {
                arrX.push(val.dateFormat)
            }
        });
        $.each(res.versionDetailList, function(idx, val) {
            var arr = [];
            $.each(res.versionDetailList[idx], function(index, value) {
                arr.push(value.uv)
            })
            tempY.push(arr)
        });
        var len = tempY.length
        for (var i = 0; i < tempY[0].length; i++) {
            switch (len) {
                case 1:
                    arrY = tempY;
                    color.push(['#99ccff'])
                    break;
                case 2:
                    arrY.push([tempY[0][i], tempY[1][i]])
                    color.push(['#99ccff', '#6699cc'])
                    break;
                case 3:
                    arrY.push([tempY[0][i], tempY[1][i], tempY[2][i]])
                    color.push(['#99ccff', '#6699cc', '#6666cc'])
                    break;
                case 4:
                    arrY.push([tempY[0][i], tempY[1][i], tempY[2][i], tempY[3][i]])
                    color.push(['#99ccff', '#6699cc', '#6666cc', '#9999cc'])
                    break;
            }
        }
        obj['arrX'] = arrX;
        obj['arrY'] = arrY;
        obj['color'] = color;
        obj['range'] = [0.15, 0.1];
        obj['tips'] = tips;
        obj['tipsName'] = tipsName;
        obj['width'] = that.dom.find('.versionAnalysis1').width() + 20;
        obj['id'] = 'versionAnalysis1';
        if (startDate == endDate) {
            obj['times'] = startDate
        }
        rectCont.setData(obj);
    }
    this.match = function(i, data) {
        sameDom[i].hideDataNull();
        sameDom[i].hideRefresh();
        sameDom[i].showLoading();
        var json;
        if (data) {
            json = data
        } else {
            if (i == 0 || i == 1 || i == 2) {
                json = {
                    startTime: startDate,
                    endTime: endDate,
                    osId: osId,
                    versionIds: versionIds,
                }
            } else {
                json = {
                    startTime: startDate,
                    endTime: endDate,
                    osId: osId,
                    versionIds: versionIds,
                    timeType: timeType
                }
            }
        }
        switch (i) {
            case 0:
                that.api.activeUserAnalysis(json).then(function(res) {
                    that.dataPro(res, 0);
                });
                break;
            case 1:
                that.api.registerUserAnalysis(json).then(function(res) {
                    that.dataPro(res, 1);
                });
                break;
            case 2:
                that.api.padUserAnalysis(json).then(function(res) {
                    that.dataPro(res, 2);
                });
                break;
            case 3:
                that.api.remainUserAnalysis(json).then(function(res) {
                    that.dataPro(res, 3);
                });
                break
        }
    }
    this.dataPro = function(res, num) {

        sameDom[num].hideLoading();
        if (res.meta.success == true) {
            sameDom[num].hideRefresh();
            if (res.data.versionDetailList) {
                if (res.data.versionDetailList.length > 0) {
                    sameDom[num].hideDataNull();
                    sameDom[num].showData();
                    var arrX = [];
                    var arrY = [];
                    var tips = [];
                    var color = [];
                    var fillColor = [];
                    var smallRectArr = [];
                    var totalUsers = [];
                    $.each(res.data.versionDetailList[0], function(idx, val) {
                        //arrX.push(val.date ? val.date : val.hourFormat);
                        if (startDate == endDate) {
                            arrX.push(val.hourFormat)
                        } else {
                            arrX.push(val.date)
                        }
                    });
                    $.each(res.data.versionDetailList, function(idx, val) {
                        var arr = [];
                        $.each(res.data.versionDetailList[idx], function(index, value) {
                            if (value.uv < 0) {
                                arr.push(0)
                            } else {
                                arr.push(value.uv)
                            }
                        })
                        arrY.push(arr)
                    });
                    $.each(res.data.versionTotalUsersList, function(idx, val) {
                        tips.push(val.versionName);
                        if (num == 1 || num == 2) {
                            totalUsers.push(val.totalUsers);
                        } else {
                            totalUsers.push('');
                        }
                        if (num == 2 || num == 3) {
                            color.push(allColor[idx]);
                            fillColor.push('')
                        } else {
                            color.push(allColor[idx]);
                            fillColor.push(allColor[idx])
                        }
                    })
                    $.each(tips, function(idx, val) {
                        var obj = {
                            color: allColor[idx],
                            version: val,
                            name: '用户总数',
                            num: totalUsers[idx]
                        }
                        smallRectArr.push(obj)
                    });
                    if (num == 1 || num == 2) {
                        sameDom[num].setSmallRect(smallRectArr)
                    } else {
                        sameDom[num].setSmallRect(smallRectArr, 'no')
                    }

                    var json = {
                        id: sameId[num],
                        title: sameTitle[num],
                        width: that.dom.find('.' + sameId[num] + ' .body_cont').width(),
                        arrColor: color,
                        fillColor: fillColor,
                        arrX: arrX,
                        arrY: arrY,
                        tips: tips,
                    };
                    if (startDate == endDate) {
                        if (sameId[num] == 'versionAnalysis2' || sameId[num] == 'versionAnalysis3' || sameId[num] == 'versionAnalysis4') {
                            json['times'] = startDate
                        }
                    }
                    //console.log(';;;;;', json)
                    sameDom[num].setData(json);
                } else {
                    sameDom[num].showDataNull();
                    sameDom[num].hideData();
                }
            } else {
                sameDom[num].showDataNull();
                sameDom[num].hideData();
            }
        } else {
            sameDom[num].showRefresh();
        }

    }
    this.timeDiff = function() {
        var diff = Tool.getDateDiff(startDate, endDate);
        sameDom[3].timeDiff(diff);
    }
}
module.exports = versionAnalysisIndex;