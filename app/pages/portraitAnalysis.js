var resolve = $.Deferred()
var resolve1 = $.Deferred()
var resolve22 = $.Deferred()
var resolve3 = $.Deferred()
var resolve4 = $.Deferred()
var resolve5 = $.Deferred()
var resolve6 = $.Deferred()
var resolve7 = $.Deferred()
var top;
var education;
var circle;
var portraitCircle1;
var portraitRect;
var portraitSex1;
var portraitSex2;
var maps;
var bubbleimage;
require.ensure(['../moduleslibs/topCont/topCont.js'], function(e) {
    top = require('../moduleslibs/topCont/topCont.js')
    resolve.resolve()
});
require.ensure(['../modules/portraitAnalysis/education/education.js'], function(e) {
    education = require('../modules/portraitAnalysis/education/education.js')
    resolve1.resolve()
});
require.ensure(['../modules/portraitAnalysis/circle/circle.js'], function(e) {
    circle = require('../modules/portraitAnalysis/circle/circle.js')
    resolve22.resolve()
});
require.ensure(['../modules/portraitAnalysis/portraitCircle/portraitCircle.js'], function(e) {
    portraitCircle1 = require('../modules/portraitAnalysis/portraitCircle/portraitCircle.js')
    resolve3.resolve()
});
require.ensure(['../modules/portraitAnalysis/portraitRect/portraitRect.js'], function(e) {
    portraitRect = require('../modules/portraitAnalysis/portraitRect/portraitRect.js')
    resolve4.resolve()
});
require.ensure(['../modules/portraitAnalysis/portraitSex/portaitSex.js'], function(e) {
    portraitSex1 = require('../modules/portraitAnalysis/portraitSex/portaitSex.js')
    resolve5.resolve()
});
require.ensure(['../modules/portraitAnalysis/bubbleimage/bubbleimage.js'], function(e) {
    bubbleimage = require('../modules/portraitAnalysis/bubbleimage/bubbleimage.js')
    resolve6.resolve()
});
require.ensure(['../modules/maps/maps.js'], function(e) {
    maps = require('../modules/maps/maps.js')
    resolve7.resolve()
})

function portraitAnalysis() {
    var that = this;
    var topCont = null;
    var bubbleCont1 = null;
    var bubbleCont2 = null;
    var portraitCircleCont1 = null;
    var portraitCircleCont2 = null;
    var portraitCircleCont3 = null;
    var portraitCircleCont4 = null;
    var portraitCircleCont5 = null;
    var portraitRectCont = null;
    var portraitSexCont1 = null;
    var portraitSexCont2 = null;
    var educationCont = null;
    var occupationCont = null;
    var consumptionCont = null;
    var bubbleimage1 = null;
    var bubbleimage2 = null;
    var mapsCont = null;
    var matchTable = ['startTime', 'endTime', 'userType', 'dimensionType', 'eventId', 'topTypeId'];
    var osId = '1';
    var json = {};
    var sameTitle = ['设备品牌', '操作系统', '屏幕分辨率', '网络方式', '运营商']
    var sameId = ['crowdPortrait1-left', 'crowdPortrait1-right', 'crowdPortrait2-left', 'crowdPortrait2-right', 'crowdPortrait3-left']
    var sameDom = ['portraitCircleCont1', 'portraitCircleCont2', 'portraitCircleCont3', 'portraitCircleCont4', 'portraitCircleCont5']
    // var sameType = ['halfarc0', 'halfarc1', 'radar', 'ring', 'pie'];
    var sameType = ['ring', 'ring', 'ring', 'pie', 'halfarc0'];
    var sameTitle1 = ['性别', '婚姻']
    var sameId1 = ['crowdPortrait4-left', 'crowdPortrait4-right']
    var sameDom1 = ['portraitSexCont1', 'portraitSexCont2']
    var sameTitle2 = ['职业', '月收入']
    var sameId2 = ['crowdPortrait7-left', 'crowdPortrait7-right']
    var sameDom2 = ['occupationCont', 'consumptionCont']
    var sameTitle3 = ['兴趣偏好', 'APP偏好']
    var sameId3 = ['crowdPortrait8-left', 'crowdPortrait8-right']
    var sameDom3 = ['bubbleimage1', 'bubbleimage2'];
    var lenDb = false;
    this.complete = function() {
        osId = that.app.model.get('iosId') ? that.app.model.get('iosId') : '1';
        json['startTime'] = Tool.GetDateStr(-1);
        json['endTime'] = Tool.GetDateStr(-1);
        json['userType'] = -1;
        json['dimensionType'] = -1;
        json['dimensionId'] = -1;
        json['event'] = -1;
        json['osId'] = osId;
        this.app.returnRequier([resolve, resolve1, resolve22, resolve3, resolve4, resolve5, resolve6, resolve7]).done(function() {
            topCont = that.app.loadModule(top, that.dom.find('.firstActCont'), {
                data: {
                    type: ['select', 'select_mutil', 'other', 'select_mutil', 'other', 'selectTime', 'calendar'],
                    position: ['left_cont1', 'left_cont2', 'left_cont3', 'left_cont4', 'left_cont5', 'left_cont6', 'left_cont7'],
                    matchTable: matchTable,
                    select_data: [{ title: '选择类型', data: [], id: 'db' }],
                    mutilselect_data: [{ title: '选择维度', data: [], id: 'db1' }, { title: '', data: [], id: 'db2' }, { title: '选择事件组', data: [], id: 'db3' }, { title: '', data: [], id: 'db4' }],
                    selectPage: 'portraitAnalysis',
                    hide: true,
                    firstSelect: '全部',
                }
            })
            topCont.event._addEvent('topCont.data', function(val) {
                that.dom.find('.underline a').removeClass('hasUnderline');
                that.dom.find('.underline').find('a').eq(0).addClass('hasUnderline');
                console.log('000000', val);
                if (val.topTypeId == 'select_mutil111') {
                    console.log('******111', json);
                    setTimeout(function() {
                        json['dimensionId'] = that.dom.find('.left_cont3 .selectCont1').find("option:selected").attr('data_id');
                        json['startTime'] = that.dom.find('.left_cont3 .selectCont1').find("option:selected").attr('start');
                        json['endTime'] = that.dom.find('.left_cont3 .selectCont1').find("option:selected").attr('end');
                        console.log('******', json)
                        topCont.setCalendar({ startDay: json['startTime'], endDay: json['endTime'], max: json['endTime'], min: json['startTime'] });
                        that.dom.find('.left_cont7 .Timers').val(json['startTime'] + '至' + json['endTime']);
                    }, 1000)
                }
                if (val.topTypeId == 'select_mutilwrong') {
                    json['dimensionId'] = -1;
                    json['startTime'] = Tool.GetDateStr(-1);
                    json['endTime'] = Tool.GetDateStr(-1);
                    that.dom.find('.left_cont6').removeClass('hide');
                    that.dom.find('.left_cont7').addClass('hide');
                    topCont.refreshSelectTimeDay();
                }
                for (var n in val) {
                    switch (n) {
                        case 'startTime':
                            if (val[n] && val.topTypeId != 'select_mutil111' && val.topTypeId != 'select_mutilwrong') {
                                json['startTime'] = val[n];
                            }
                            break;
                        case 'endTime':
                            if (val[n] && val.topTypeId != 'select_mutil111' && val.topTypeId != 'select_mutilwrong') {
                                json['endTime'] = val[n];
                            }
                            break;
                        case 'userType':
                            if (val[n]) {
                                json['userType'] = val[n]
                            } else {
                                json['userType'] = -1
                            }
                            break;
                        case 'dimensionType':
                            if (val[n]) {
                                json['dimensionType'] = val[n]
                            } else {
                                json['dimensionType'] = -1;
                            }
                            break;
                        case 'eventId':
                            var dimensionName = that.dom.find('.left_cont5 .selectCont1').find("option:selected").html();
                            var dimensionName1 = that.dom.find('.left_cont4 .selectCont1').find("option:selected").html();
                            console.log('dimensionName1', dimensionName1);
                            if (dimensionName1 == '全部') {
                                that.dom.find('.left_cont5').addClass('hide');
                            }
                            if (val[n] != '-1' && val[n] != undefined) {
                                json['event'] = val[n]
                            } else if (val[n] == '-1' && dimensionName == '全部') {
                                json['event'] = that.dom.find('.left_cont4 .selectCont1').find("option:selected").attr('data_id');
                                if (dimensionName1 == '全部') {
                                    that.dom.find('.left_cont5').addClass('hide');
                                    json['event'] = -1
                                }
                            } else if (val[n] == undefined) {
                                json['event'] = -1
                            }
                            break;
                    };
                };
                //console.log('数据', json)
                setTimeout(function() {
                    that.allFun();
                }, 1000);
            })
            topCont.event._addEvent('portraitAnalysis.eventId', function(val) {
                //console.log('------', val);
                if (parseInt(val) != -1) {
                    that.eventDb(val);
                } else {
                    json['event'] = -1
                }
            })
            topCont.event._addEvent('portraitAnalysis.dimensionId', function(val) {
                console.log('99999999999999', val);
                if (val) {
                    that.costListDb(val);
                } else {
                    json['dimensionId'] = -1;
                }
            });
            setTimeout(function() {
                if (parseInt(osId) == 2) {
                    topCont.setTimeMin('selectTime', '2017-05-16');
                } else {
                    topCont.setTimeMin('selectTime', 'all');
                }
            }, 1000);
            //that.app.header.event._addEvent('header.osId', function(val) {
            that.app.header.setData = function(val) {
                osId = val.osId;
                if (parseInt(osId) == 2) {
                    topCont.setTimeMin('selectTime', '2017-05-16');
                } else {
                    topCont.setTimeMin('selectTime', 'all');
                }
                topCont.refreshSelectTimeDay();
                json['osId'] = osId;
                json['startTime'] = Tool.GetDateStr(-1);
                json['endTime'] = Tool.GetDateStr(-1);
                json['userType'] = -1;
                json['dimensionType'] = -1;
                json['dimensionId'] = -1;
                json['event'] = -1;
                that.valueListUser();
                that.valueListDimensionality();
                that.valueListEventgroup();

                that.allFun();
                //
                that.dom.find('.underline a').removeClass('hasUnderline');
                that.dom.find('.underline').find('a').eq(0).addClass('hasUnderline');
                that.dom.find('.left_cont3').addClass('hide');
                that.dom.find('.left_cont5').addClass('hide');
            };
            //});
            that.valueListUser();
            that.valueListDimensionality();
            that.valueListEventgroup();
            $.each(sameTitle, function(idx, value) {
                sameDom[idx] = that.app.loadModule(portraitCircle1, that.dom.find('.' + sameId[idx]), {
                    data: {
                        id: sameId[idx]
                    },
                    title: {
                        title: value,
                        type: ['title'],
                        position: ['left1'],
                    }
                })
            });
            portraitRectCont = that.app.loadModule(portraitRect, that.dom.find('.crowdPortrait3-right'), {
                data: {
                    id: 'crowdPortrait3-right'
                },
                title: {
                    title: '年龄',
                    type: ['title'],
                    position: ['left1'],
                }
            });
            $.each(sameTitle1, function(idx, value) {
                sameDom1[idx] = that.app.loadModule(portraitSex1, that.dom.find('.' + sameId1[idx]), {
                    data: {
                        id: sameId1[idx]
                    },
                    title: {
                        title: value,
                        type: ['title'],
                        position: ['left1'],
                    }
                })
            });
            educationCont = that.app.loadModule(education, that.dom.find('.crowdPortrait5-middle'), {
                data: {
                    id: 'crowdPortrait5-middle',
                },
                title: {
                    title: '教育',
                    type: ['title'],
                    position: ['left1'],
                }
            });
            $.each(sameTitle2, function(idx, value) {
                sameDom2[idx] = that.app.loadModule(circle, that.dom.find('.' + sameId2[idx]), {
                    data: {
                        id: sameId2[idx]
                    },
                    title: {
                        title: value,
                        type: ['title'],
                        position: ['left1'],
                    }
                })
            });
            $.each(sameTitle3, function(idx, value) {
                sameDom3[idx] = that.app.loadModule(bubbleimage, that.dom.find('.' + sameId3[idx]), {
                    data: {
                        id: sameId3[idx]
                    },
                    title: {
                        title: value,
                        type: ['title'],
                        position: ['left1'],
                    }
                })
            });
            mapsCont = that.app.loadModule(maps, that.dom.find('.crowdPortrait6-middle'), {
                data: {
                    id: 'crowdPortrait6-middle'
                },
                title: {
                    title: '地域',
                    type: ['title', 'underline'],
                    position: ['left1', 'left2'],
                    underlineData: ['省份', '城市'],
                    underlineType1: ['1', '2']
                }
            });
            mapsCont.event._addEvent('crowd.type', function(val) {
                switch (parseInt(val)) {
                    case 1:
                        that.sourceProvinceAnalysisDb();
                        break;
                    case 2:
                        that.sourceCityAnalysisDb();
                        break;
                }
            })
            that.allFun();
        })
    }
    this.valueListUser = function() {
        var json = {
            type: 'usertype',
            osId: osId,
        }
        that.api.valueList(json).then(function(res) {
            if (res.meta.success == true) {
                if (res.data) {
                    if (res.data.length > 0) {
                        $.each(res.data, function(idx, val) {
                            val.id = val.typeCode;
                            val.name = val.typeName
                        })
                        setTimeout(function() {
                            topCont.initSelectData(res.data, 'db');
                        }, 500);
                    }
                }
            } else {
                //console.log('yyyyyy', res.meta)
                that.app.login(res.meta)
            }
        })
    }
    this.valueListDimensionality = function() {
        var json = {
            type: 'dimensionality',
            osId: osId,
        }
        that.api.valueList(json).then(function(res) {
            if (res.data.length > 0) {
                $.each(res.data, function(idx, val) {
                    val.id = val.typeCode;
                    val.name = val.typeName
                })
                setTimeout(function() {
                    topCont.initSelectData(res.data, 'db1');
                }, 500);
            }
        })
    }
    this.valueListEventgroup = function() {
        var json = {
            type: 'eventgroup',
            osId: osId,
        }
        that.api.valueList(json).then(function(res) {
            if (res.data.length > 0) {
                $.each(res.data, function(idx, val) {
                    val.id = val.typeCode;
                    val.name = val.typeName
                })
                setTimeout(function() {
                    topCont.initSelectData(res.data, 'db3');
                }, 500);
            }
        })
    }
    this.costListDb = function(data) {
        var json1 = {}
        var api
        if (data.type == "-1") {
            json1 = {
                type: 'all',
                osId: osId
            }
            api = that.api.valueList
        } else if (data.type == "1") {
            json1 = {
                osId: osId
            }
            api = that.api.costList
        } else if (data.type == "2") {
            json1 = {
                type: 'campaign',
                osId: osId
            }
            api = that.api.valueList
        }
        api(json1).then(function(res) {
            if (res.meta.success == true) {
                if (res.data.length > 0) {
                    that.dom.find('.left_cont3').removeClass('hide');
                    $.each(res.data, function(idx, val) {
                        val.id = val.typeCode ? val.typeCode : val.channelId;
                        val.name = val.typeName ? val.typeName : val.channelName;
                    })
                    json['dimensionId'] = res.data[0].typeCode ? res.data[0].typeCode : res.data[0].channelId;
                    json['startTime'] = res.data[0].startDate ? res.data[0].startDate : res.data[0].startTime;
                    json['endTime'] = res.data[0].endDate ? res.data[0].endDate : res.data[0].endTime;
                    that.dom.find('.left_cont6').addClass('hide');
                    that.dom.find('.left_cont7').removeClass('hide');
                    topCont.initSelectData(res.data, 'db2');
                    console.log('123', json);
                    //topCont.setCalendar({ startDay: res.data[0].startDate ? res.data[0].startDate : res.data[0].startTime, endDay: res.data[0].endDate ? res.data[0].endDate : res.data[0].endTime, max: res.data[0].endDate ? res.data[0].endDate : res.data[0].endTime, min: res.data[0].startDate ? res.data[0].startDate : res.data[0].startTime });
                    //that.dom.find('.left_cont7 .Timers').val(res.data[0].startDate ? res.data[0].startDate : res.data[0].startTime + '至' + res.data[0].endDate ? res.data[0].endDate : res.data[0].endTime);
                } else {
                    //lenDb = false;
                    that.dom.find('.left_cont3').addClass('hide');
                }
            }
        })
    }
    this.eventDb = function(id) {
        var json = {
            egid: id,
            osid: osId
        }
        that.api.events(json).then(function(res) {
            if (res.data.length > 0) {
                that.dom.find('.left_cont5').removeClass('hide');
                topCont.initSelectData(res.data, 'db4');
            } else {
                that.dom.find('.left_cont5').addClass('hide');
            }
        })
    };
    this.allFun = function() {
        that.sameFun();
        that.ageAnalysisDb();
        that.sameFun1();
        that.educationAnalysisDb();
        that.sourceProvinceAnalysisDb();
        that.sameFun2();
        that.sameFun3();
    };
    this.sameFun = function() {
        $.each(sameDom, function(i, val) {
            sameDom[i].hideDataNull();
            sameDom[i].hideRefresh();
            sameDom[i].showLoading();
            switch (i) {
                case 0:
                    that.api.deviceTypeAnalysis(json).then(function(res) {
                        that.dataPro(res, 0, sameDom[i], ['#85c2ff', '#4da8f9', '#33b8f5', '#4855b1', '#717ccb', '#6085e4', '#3d98f5', '#33b8f5', '#58cad8', '#58d8c7']);
                    });
                    break;
                case 1:
                    that.api.operatingSystemAnalysis(json).then(function(res) {
                        that.dataPro(res, 1, sameDom[i], ['#85c2ff', '#4da8f9', '#33b8f5', '#4855b1', '#717ccb', '#6085e4', '#3d98f5', '#33b8f5', '#58cad8', '#58d8c7']);
                    });
                    break;
                case 2:
                    that.api.screenResolutionAnalysis(json).then(function(res) {
                        that.dataPro(res, 2, sameDom[i], ['#85c2ff', '#4da8f9', '#33b8f5', '#4855b1', '#717ccb', '#6085e4', '#3d98f5', '#33b8f5', '#58cad8', '#58d8c7']);
                    });
                    break;
                case 3:
                    that.api.networkModeAnalysis(json).then(function(res) {
                        that.dataPro(res, 3, sameDom[i], ['#85c2ff', '#4da8f9', '#528fcc', '#4855b1', '#717ccb']);
                    });
                    break;
                case 4:
                    that.api.carrieroperatorAnalysis(json).then(function(res) {
                        that.dataPro(res, 4, sameDom[i], ['#85c2ff', '#4da8f9', '#528fcc', '#4855b1']);
                    });
                    break;
            }
        })
    };
    that.dataPro = function(res, idx, dom, color) {
        dom.hideLoading();
        if (res.meta.success == true) {
            dom.hideRefresh();
            if (res.data.length > 0) {
                dom.showData();
                dom.hideDataNull();
                var text = [];
                var percentage = [];
                var obj = {};
                $.each(res.data, function(idx, val) {
                    text.push(val.demension)
                    percentage.push(val.percentage)
                });
                obj['text'] = text;
                obj['percentage'] = percentage;
                obj['type'] = sameType[idx];
                obj['id'] = sameId[idx];
                obj['color'] = color;
                dom.setData(obj);
            } else {
                dom.hideData();
                dom.showDataNull();
            }
        } else {
            dom.showRefresh();
            that.app.login(res.meta)
        }
    };
    this.ageAnalysisDb = function() {
        portraitRectCont.hideDataNull();
        portraitRectCont.hideRefresh();
        portraitRectCont.showLoading();
        that.api.ageAnalysis(json).then(function(res) {
            portraitRectCont.hideLoading();
            if (res.meta.success == true) {
                portraitRectCont.hideRefresh();
                if (res.data.length > 0) {
                    portraitRectCont.showData();
                    portraitRectCont.hideDataNull();
                    var text = [];
                    var percentage = [];
                    var obj = {};
                    $.each(res.data, function(idx, val) {
                        text.push(val.demension)
                        percentage.push(val.percentage)
                    });
                    obj['text'] = text;
                    obj['percentage'] = percentage;
                    obj['id'] = 'crowdPortrait3-right';
                    obj['width'] = that.dom.find('.crowdPortrait3-right').width() - 20;
                    obj['color'] = ['#b7b0de', '#9980b9', '#717ccd', '#44a4f9', '#85c2ff', '#6cd3f0'];
                    portraitRectCont.setData(obj);
                } else {
                    portraitRectCont.hideData();
                    portraitRectCont.showDataNull();
                }
            } else {
                portraitRectCont.showRefresh();
                that.app.login(res.meta)
            }
        })
    };
    this.sameFun1 = function() {
        $.each(sameDom1, function(i, val) {
            sameDom1[i].hideDataNull();
            sameDom1[i].hideRefresh();
            sameDom1[i].showLoading();
            switch (i) {
                case 0:
                    that.api.genderAnalysis(json).then(function(res) {
                        that.dataPro1(res, 0, sameDom1[i]);
                    });
                    break;
                case 1:
                    that.api.marriageAnalysis(json).then(function(res) {
                        that.dataPro1(res, 1, sameDom1[i]);
                    });
                    break;
            }
        })
    };
    this.dataPro1 = function(res, i, dom) {
        dom.hideLoading();
        //console.log('111',res);
        if (res.meta.success == true) {
            dom.hideRefresh();
            if (res.data.length > 0) {
                dom.showData();
                dom.hideDataNull();
                var name = [];
                var percentage = [];
                var color = [];
                var icon = [];
                var obj = {};
                $.each(res.data, function(idx, val) {
                    switch (val.demension) {
                        case '男':
                            name.push(val.demension);
                            percentage.push(val.percentage.toString());
                            color.push('#3962a0');
                            icon.push('man');
                            break;
                        case '女':
                            name.push(val.demension);
                            percentage.push(val.percentage.toString());
                            color.push('#528fcc');
                            icon.push('woman');
                            break;
                        case '已婚':
                            name.push(val.demension);
                            percentage.push(val.percentage.toString());
                            color.push('#9980b9');
                            icon.push('marryY');
                            break;
                        case '未婚':
                            name.push(val.demension);
                            percentage.push(val.percentage.toString());
                            color.push('#4855b1');
                            icon.push('marryN');
                            break;
                    }
                });
                obj['name'] = name;
                obj['percentage'] = percentage;
                obj['color'] = color;
                obj['id'] = sameId1[i];
                obj['icon'] = icon;
                dom.setData(obj);
            } else {
                dom.hideData();
                dom.showDataNull();
            }
        } else {
            dom.showRefresh();
            that.app.login(res.meta)
        }
    }
    this.educationAnalysisDb = function() {
        educationCont.hideDataNull();
        educationCont.hideRefresh();
        educationCont.showLoading();
        that.api.educationAnalysis(json).then(function(res) {
            educationCont.hideLoading();
            if (res.meta.success == true) {
                educationCont.hideRefresh();
                if (res.data.length > 0) {
                    educationCont.showData();
                    educationCont.hideDataNull();
                    var name = [];
                    var percentage = [];
                    var obj = {};
                    $.each(res.data, function(idx, val) {
                        name.push(val.demension);
                        percentage.push(val.percentage)
                    });
                    obj['name'] = name;
                    obj['percentage'] = percentage;
                    obj['id'] = 'crowdPortrait5-middle';
                    educationCont.setData(obj);
                } else {
                    educationCont.hideData();
                    educationCont.showDataNull();
                }
            } else {
                educationCont.showRefresh();
                that.app.login(res.meta)
            }
        })
    };
    // this.sourceProvinceAnalysisDb = function() {
    //     that.api.sourceProvinceAnalysis(json).then(function(res) {

    //     })
    // };
    this.sameFun2 = function() {
        $.each(sameDom2, function(i, val) {
            sameDom2[i].hideDataNull();
            sameDom2[i].hideRefresh();
            sameDom2[i].showLoading();
            switch (i) {
                case 0:
                    that.api.occupationAnalysis(json).then(function(res) {
                        that.dataPro2(res, 0, sameDom2[i], ['学生', '在职', '退休', '自由职业'], ['#85c2ff', '#44a4f9', '#528fcc', '#3962a0']);
                    });
                    break;
                case 1:
                    that.api.consumptionIncomeRatioAnalysis(json).then(function(res) {
                        that.dataPro2(res, 1, sameDom2[i], ['高', '中', '低'], ['#cdbedb', '#9980b9', '#717ccb']);
                    });
                    break;
            }
        })
    };
    this.dataPro2 = function(res, i, dom, name, color) {
        dom.hideLoading();
        if (res.meta.success == true) {
            dom.hideRefresh();
            if (res.data.length > 0) {
                dom.showData();
                dom.hideDataNull();
                var percentages = i == 0 ? [0, 0, 0, 0] : [0, 0, 0];
                var obj = {}
                $(res.data).each(function(idx, val) {
                    switch (val.demension) {
                        case '学生':
                            percentages[0] = val.percentage ? val.percentage : 0;
                            break;
                        case '在职':
                            percentages[1] = val.percentage ? val.percentage : 0;
                            break;
                        case '退休':
                            percentages[2] = val.percentage ? val.percentage : 0;
                            break;
                        case '自由职业':
                            percentages[3] = val.percentage ? val.percentage : 0;
                            break;
                        case '高':
                            percentages[0] = val.percentage ? val.percentage : 0;
                            break;
                        case '中':
                            percentages[1] = val.percentage ? val.percentage : 0;
                            break;
                        case '低':
                            percentages[2] = val.percentage ? val.percentage : 0;
                            break;
                    }
                })
                obj['width'] = 190;
                obj['percentages'] = percentages;
                obj['id'] = sameId2[i];
                obj['angle'] = i;
                obj['name'] = name;
                obj['color'] = color;
                dom.setData(obj);
            } else {
                dom.hideData();
                dom.showDataNull();
            }
        } else {
            dom.showRefresh();
            that.app.login(res.meta)
        }
    };
    this.sameFun3 = function() {
        $.each(sameDom3, function(i, val) {
            sameDom3[i].hideDataNull();
            sameDom3[i].hideRefresh();
            sameDom3[i].showLoading();
            switch (i) {
                case 0:
                    that.api.interestPreferenceAnalysis(json).then(function(res) {
                        that.dataPro3(res, 0, sameDom3[i]);
                    });
                    break;
                case 1:
                    that.api.appPreferenceAnalysis(json).then(function(res) {
                        that.dataPro3(res, 1, sameDom3[i]);
                    });
                    break;
            }
        })
    };
    this.dataPro3 = function(res, i, dom) {
        dom.hideLoading();
        if (res.meta.success == true) {
            dom.hideRefresh();
            if (res.data.length > 0) {
                dom.showData();
                dom.hideDataNull();
                var name = [];
                var obj = {}
                $(res.data).each(function(idx, val) {
                    name.push(val.demension)
                })
                obj['id'] = sameId3[i];
                obj['name'] = name;
                dom.setData(obj);
            } else {
                dom.hideData();
                dom.showDataNull();
            }
        } else {
            dom.showRefresh();
            that.app.login(res.meta)
        }
    };
    this.sourceProvinceAnalysisDb = function() {
        mapsCont.showLoading();
        that.api.sourceProvinceAnalysis(json).then(function(res) {
            if (res.meta.success == true) {
                mapsCont.hideLoading();
                if (res.data.length > 0) {
                    mapsCont.showData();
                    mapsCont.hideDataNull();
                    mapsCont.setData(res.data, '1');
                } else {
                    mapsCont.hideData();
                    mapsCont.showDataNull();
                }
            } else {
                mapsCont.showRefresh();
                that.app.login(res.meta);
            }
        })
    };
    //sourceCityAnalysisDb
    this.sourceCityAnalysisDb = function() {
        mapsCont.showLoading();
        that.api.sourceCityAnalysis(json).then(function(res) {
            if (res.meta.success == true) {
                mapsCont.hideLoading();
                if (res.data.length > 0) {
                    mapsCont.setData(res.data, '2');
                    mapsCont.dom.find('.dataNone').addClass('hide');
                    mapsCont.dom.find('.body_cont').css('display', 'block');
                } else {
                    mapsCont.dom.find('.dataNone').removeClass('hide');
                    mapsCont.dom.find('.body_cont').css('display', 'none');
                }
            } else {
                that.app.login(res.meta);
            }
        })
    };
}
module.exports = portraitAnalysis;