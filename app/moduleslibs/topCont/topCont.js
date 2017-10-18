var resolve = $.Deferred()
var resolve1 = $.Deferred()
var resolve2 = $.Deferred()
var resolve3 = $.Deferred()
var resolve4 = $.Deferred()
var resolve5 = $.Deferred()
var html = require("./topCont.html");
require("./topCont.less");
var calendar;
var selectTime;
var selectTimeDay;
var select;
var underline;
var timeBox
require.ensure(['../selectTime/selectTime.js'], function(e) {
    selectTime = require('../selectTime/selectTime.js')
    resolve.resolve()
});
require.ensure(['../times/times.js'], function(e) {
    calendar = require('../times/times.js')
    resolve1.resolve()
});
require.ensure(['../select/select.js'], function(e) {
    select = require('../select/select.js')
    resolve2.resolve()
});
require.ensure(['../selectTimeDay/selectTimeDay.js'], function(e) {
    selectTimeDay = require('../selectTimeDay/selectTimeDay.js')
    resolve3.resolve()
});
// require.ensure(['../underline/underline.js'], function(e) {
//     underline = require('../underline/underline.js')
//     resolve3.resolve()
// });
require.ensure(['../../modules/top/timeBox/timeBox.js'], function(e) {
    timeBox = require('../../modules/top/timeBox/timeBox.js')
    resolve4.resolve()
});
require.ensure(['../../modules/versionAnalysis/versionSelect/versionSelect.js'], function(e) {
    versionSelect = require('../../modules/versionAnalysis/versionSelect/versionSelect.js')
    resolve5.resolve()
});

function index() {
    var that = this;
    var type = '';
    var data = '';
    var time = '';
    var obj = {};
    var dd = new Date()
    var year = '';
    var season = ''
    var month = '';
    var startTime = '';
    var endTime = '';
    var locationId = '';
    var locationName = '';
    var activityName = '';
    var storeName = '';
    var groupId = '';
    var underlineType = 0;
    var sela = [];
    var timeType = -1;
    this.html = html;
    var calendarCont = null;
    var selectTimeCont = null;
    var selectTimeDayCont = null;
    var versionSelectCont = null;
    var crowdPortraitData = [];
    var monitorDetailData = [];
    var activeTouristData = [];
    var typeN;
    var topTypeId = '';
    var selectTimeType = '';
    var position
    var nameType
    var hide
        //新的
    var typeCode //behaviorAnalysis下拉框
    var contrastDay //behaviorAnalysis TimeBox
    var userType //portraitAnalysis 
    var dimensionType
    var dateLength
    var eventId
    var mutil = 0;
    var versionIds = '';
    this.complete = function() {
        this.app.returnRequier([resolve, resolve1, resolve2, resolve3, resolve4, resolve5]).done(function() {
            typeN = that.nowParam.data.type;
            position = that.nowParam.data.position;
            nameType = that.nowParam.data.nameType;
            hide = that.nowParam.data.hide;
            var left_i = 0;
            var right_i = 0;
            that.dom.find('.chooseBuiding').empty();
            $.each(position, function(idx, val) {
                if (val.indexOf('left') != -1) {
                    that.dom.find('.left_cont').append('<div class=' + val + '></div>')
                } else {
                    that.dom.find('.right_cont').append('<div class=' + val + '></div>')
                }
            });
            that.fun();
            if (hide) {
                that.dom.find('.left_cont7').addClass('hide');
            }
        });
    };
    this.fun = function() {
        that.dom.find('.export').addClass('hide');
        $.each(typeN, function(idx, val) {
            switch (val) {
                case 'timeBox':
                    var timeBoxCont = null;
                    var title = that.nowParam.data.timeBoxTitle;
                    var content = that.nowParam.data.timeBoxContent;
                    timeBoxCont = that.app.loadModule(timeBox, that.dom.find('.' + position[idx]), { title: title, content: content });
                    timeBoxCont.event._addEvent('timeBoxCont.click', function(val) {
                        if (val.contrastDay != '') {
                            contrastDay = val.contrastDay
                        }
                        if (val.startDay != '') {
                            startTime = val.startDay;
                            endTime = val.endDay;
                        }
                        that.setData();
                    })
                    break;
                case 'icon':
                    that.dom.find('.export').removeClass('hide');
                    break;
                case 'underline':
                    var underlineCont = null;
                    var underlineData = that.nowParam.data.underline;
                    var underlineType1 = that.nowParam.data.underline_type;
                    underlineCont = that.app.loadModule(underline, that.dom.find('.' + position[idx]), { data: underlineData, type: underlineType1 });
                    underlineCont.event._addEvent('underline.type', function(val) {
                        topTypeId = 'underline';
                        if (parseInt(val) == 4) {
                            that.dom.find('.chooseBuiding').removeClass('hide');
                        } else {
                            locationId = '';
                            that.dom.find('.chooseBuiding').addClass('hide');
                        }
                        //selectTimeCont.refreshData1({ startDay: Tool.GetDateStr(-1), endDay: Tool.GetDateStr(-1), type: 'd' });
                        calendarCont.refreshData1({ startDay: Tool.GetDateStr(-1), endDay: Tool.GetDateStr(-1), type: 'd' });
                        startTime = Tool.GetDateStr(-1);
                        endTime = Tool.GetDateStr(-1);
                        underlineType = val;
                        that.setData();
                    });
                    break;
                case 'calendar':
                    var modalType = that.nowParam.data.modalType;
                    var min = that.nowParam.data.min;
                    calendarCont = that.app.loadModule(calendar, that.dom.find('.' + position[idx]), { btn: that.nowParam.data.btn, type: "d", startDay: that.nowParam.data.startDay, min: min, alert: modalType });
                    calendarCont.event._addEvent('times.startend', function(res) {
                        topTypeId = 'calendar';
                        startTime = res.startDay;
                        endTime = res.endDay;
                        that.setData();
                    });
                    break;
                case 'select':
                    var icon = that.nowParam.data.icon;
                    var data = that.nowParam.data.select_data;
                    var selectPage = that.nowParam.data.selectPage;
                    var firstSelect = that.nowParam.data.firstSelect;
                    var selectCont = that.app.loadModule(select, that.dom.find('.' + position[idx]), { title: data[idx].title, data: data[idx].data, icon: icon, firstSelect: firstSelect });
                    selectCont.event._addEvent('select.id', function(data) {
                        topTypeId = 'select'
                        if (selectPage == 'portraitAnalysis') {
                            if (data.title == '选择类型') {
                                userType = data.id;
                            }
                        } else if (selectPage == 'peopleAnalysis') {
                            if (data.title == '用户类型') {
                                typeCode = data.id;
                            }
                        } else {
                            typeCode = data.id;
                        }
                        that.setData();
                    });
                    sela[data[idx].id] = selectCont
                    break;
                case 'select_mutil':
                    var data = that.nowParam.data.mutilselect_data;
                    //that.dom.find('.left_cont').append('<div class="left_cont2"></div>');
                    var selectCont = that.app.loadModule(select, that.dom.find('.' + position[idx]), { title: data[0 + mutil].title, data: data[0 + mutil].data, firstSelect: '全部' });
                    if (data[1 + mutil].id == 'db4') {
                        var selectCont1 = that.app.loadModule(select, that.dom.find('.left_cont' + (3 + mutil)), { title: data[1 + mutil].title, data: data[1 + mutil].data, firstSelect: '全部' });
                    } else {
                        var selectCont1 = that.app.loadModule(select, that.dom.find('.left_cont' + (3 + mutil)), { title: data[1 + mutil].title, data: data[1 + mutil].data });
                    }
                    that.dom.find('.left_cont' + (3 + mutil)).addClass('hide');
                    sela[data[0 + mutil].id] = selectCont
                    sela[data[1 + mutil].id] = selectCont1
                    selectCont.event._addEvent('select.id', function(data) {
                        topTypeId = 'select_mutil';
                        if (data.title == '选择维度') {
                            if (data.type == '1' || data.type == '2') {
                                topTypeId = 'select_mutil111'
                            } else {
                                topTypeId = 'select_mutilwrong'
                            }
                            dimensionType = data.type;
                            that.event._dispatch('portraitAnalysis.dimensionId', data);
                        } else {
                            eventId = data.id;
                            that.event._dispatch('portraitAnalysis.eventId', data.id);
                        }
                        that.setData();
                    })
                    selectCont1.event._addEvent('select.id', function(val) {
                        topTypeId = 'select_mutil';
                        if (data[idx].id == 'db4') {
                            eventId = val.id;
                        } else if (data[idx].id == 'db2') {
                            topTypeId = 'select_mutil111'
                        }
                        that.setData();
                    })
                    mutil = mutil + 2;
                    break;
                case 'selectTime':
                    var startDay = that.nowParam.data.startDay;
                    var endDay = that.nowParam.data.endDay;
                    var type = that.nowParam.data.selectTime;
                    var modalType = that.nowParam.data.modalType;
                    var min = that.nowParam.data.min;
                    var match = that.nowParam.data.match
                    selectTimeCont = that.app.loadModule(selectTime, that.dom.find('.' + position[idx]), { startDay: startDay, endDay: endDay, type: type, modalType: modalType, min: min, match: match });
                    selectTimeCont.event._addEvent('selecttime.getValue', function(res) {
                        topTypeId = 'selectTime';
                        startTime = res.startTime == undefined ? '' : res.startTime;
                        endTime = res.endTime == undefined ? '' : res.endTime;
                        that.setData();
                    });
                    break;
                case 'selectTimeDay':
                    var startDay = that.nowParam.data.startDay;
                    var endDay = that.nowParam.data.endDay;
                    selectTimeDayCont = that.app.loadModule(selectTimeDay, that.dom.find('.' + position[idx]), {});
                    selectTimeDayCont.event._addEvent('selectTimeDay.data', function(res) {
                        topTypeId = 'selectTimeDay';
                        startTime = res.st == undefined ? '' : res.st;
                        endTime = res.et == undefined ? '' : res.et;
                        dateLength = res.dateLength == undefined ? '' : res.dateLength
                        that.setData();
                    });
                    break;
                case 'text':
                    var text = that.nowParam.data.text;
                    that.dom.find('.' + position[idx]).html(text);
                    break;
                case 'versionSelect':
                    versionSelectCont = that.app.loadModule(versionSelect, that.dom.find('.' + position[idx]), {});
                    versionSelectCont.event._addEvent('version.dataid', function(val) {
                        topTypeId = 'versionSelect';
                        versionIds = val
                        that.setData();
                    })
                    break;

                case 'other':
                    //that.dom.find('.' + position[idx]).html('');
                    break;
            }
        });
    };
    this.versionSetData = function(value) {
            this.app.returnRequier([resolve, resolve1, resolve2, resolve3, resolve4, resolve5]).done(function() {
                versionSelectCont.setData(value);
            })
        }
        //传数据
    this.setData = function() {
        var obj = {
            year: year,
            season: season,
            month: month,
            startTime: startTime,
            endTime: endTime,
            locationId: locationId,
            locationName: locationName,
            timeType: timeType,
            underlineType: underlineType,
            time: time,
            activityName: activityName,
            storeName: storeName,
            topTypeId: topTypeId,
            groupId: groupId,
            selectTimeType: selectTimeType,
            userType: userType,
            dimensionType: dimensionType,
            eventId: eventId,
            dateLength: dateLength,
            typeCode: typeCode,
            contrastDay: contrastDay,
            versionIds: versionIds
        }
        var obj1 = {};
        $.each(that.nowParam.data.matchTable, function(idx, value) {
            var aaa = obj[value];
            obj1[value] = aaa
        });
        that.event._dispatch('topCont.data', obj1);
    };
    //从页面拿数据
    this.monitorFlowData = function(val) {
        //this.addMode = "append";
        var selectCont = null;
        selectCont = that.app.loadModule(select, that.dom.find('.chooseBuiding'), { title: '选择楼宇', data: val, firstSelect: '全部楼宇' });
        selectCont.event._addEvent('select.id', function(val) {
            topTypeId = 'select'
            locationId = val.id;
            locationName = val.name;
            that.setData();
        });
    }
    this.monitorDetailDataDeal = function(res, arr1) {
        monitorDetailData = arr1;
        that.initSelectData(res, 'db');
        that.selectFloor(res[0]);
    }
    this.dealmDData = function(id) {
        if (monitorDetailData[id]) {
            that.selectFloor(monitorDetailData[id])
        }
    }

    this.setText = function(text, dom) {
        that.dom.find('.' + dom).css('margin-left', '10px');
        that.dom.find('.' + dom).html(text);
    };
    this.setCalendar = function(time) {
        calendarCont.refreshData(time);
    };
    this.setCalendar1 = function(time) {
        calendarCont.refreshData1(time);
    };
    // this.crowdPortraitData = function(timeArr) {
    //     crowdPortraitData = timeArr;
    // };
    // this.crowdPortraitData1 = function(val) {
    //     if (crowdPortraitData[val]) {
    //         that.setText('活动周期:' + crowdPortraitData[val].times, 'left_cont2');
    //         that.setCalendar({ startDay: crowdPortraitData[val].start, endDay: crowdPortraitData[val].end });
    //         startTime = crowdPortraitData[val].start;
    //         endTime = crowdPortraitData[val].end;
    //     }
    // };
    // this.activeTouristData = function(timeArr) {
    //     activeTouristData = timeArr;
    // };
    this.initSelectData = function(val, id) {
        if (sela[id]) {
            sela[id].refreshData(val);
        }
    };
    this.setTimeMin = function(type, data) {
        this.app.returnRequier([resolve, resolve1, resolve3]).done(function() {
            switch (type) {
                case 'calendar':
                    calendarCont.refreshData({ min: data });
                    break;
                case 'selectTime':
                    selectTimeCont.refreshData({ min: data });
                    break;
                case 'selectTimeDay':
                    selectTimeDayCont.refreshData({ min: data });
                    break;
            }
        })
    };
    this.refreshSelectTimeDay = function() {
        selectTimeCont.refreshSelectTimeDay();
    }
    this.refreshSelectTimeDay1 = function() {
        calendarCont.refreshSelectTimeDay();
    }
    this.refreshSelectTimeDay2 = function() {
        selectTimeDayCont.refreshSelectTimeDay();
    }
}
module.exports = index;