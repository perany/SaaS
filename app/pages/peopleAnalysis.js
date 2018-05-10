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
require.ensure(['../modules/rect/cont_rect.js'], function(e) {
    rect = require('../modules/rect/cont_rect.js')
    resolve2.resolve()
});
require.ensure(['../modules/VeDifferent/VeDifferent.js'], function(e) {
    VeDifferent = require('../modules/VeDifferent/VeDifferent.js')
    resolve3.resolve()
});

function peopleAnalysis() {
    var that = this;
    var topCont = null;
    var lineCont = null;
    var rectCont = null;
    var VeDifferentCont1 = null;
    var VeDifferentCont2 = null;
    var osId = '1';
    var startDate = Tool.GetDateStr(-1);
    var endDate = Tool.GetDateStr(-1);
    var dateLength = 1;
    var typeCode = 1;
    var peopleNum = 0;
    var peopleTitle = ['新增用户', '活跃用户', '注册用户', '付费用户'];
    var contrastDay = 7;
    var matchTable = ['startTime', 'endTime', 'dateLength', 'typeCode', 'contrastDay'];
    var sameId3 = ['peopleAnalysis3', 'peopleAnalysis4']
    var sameDom3 = ['VeDifferentCont1', 'VeDifferentCont2']
    var sameTitle = ['渠道差异比', '版本差异比']
    var circle = ['circle5-', 'circle7-']
    var disSource = [1, 3]
    this.complete = function() {
        //console.log('123456', that.app.model.get('iosId'));
        osId = that.app.model.get('iosId') ? that.app.model.get('iosId') : '1';
        this.app.returnRequier([resolve, resolve1, resolve2, resolve3]).done(function() {
            topCont = that.app.loadModule(top, that.dom.find('.firstActCont'), {
                data: {
                    type: ['select', 'selectTimeDay', 'timeBox'],
                    position: ['left_cont1', 'left_cont2', 'right_cont1'],
                    timeBoxTitle: '选择对比',
                    timeBoxContent: ['过去7天', '过去30天', '过去60天'],
                    select_data: [{ title: '用户类型', data: [], id: 'db' }],
                    matchTable: matchTable,
                    selectPage: 'peopleAnalysis'
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
                        case 'dateLength':
                            if (val[n]) {
                                dateLength = val[n]
                            }
                            break;
                        case 'typeCode':
                            if (val[n]) {
                                typeCode = val[n]
                            }
                            break;
                        case 'contrastDay':
                            if (val[n]) {
                                contrastDay = val[n]
                            }
                            break;
                    }
                }
                that.allFun();
            });
            lineCont = that.app.loadModule(line, that.dom.find('.peopleAnalysis1'), {
                line: {
                    id: 'peopleAnalysis1',
                },
                title: {
                    title: '用户对比',
                    titleTips: '不同用户类型在“所选周期起始日”和“过去7天/30天/60天平均值”对比',
                    type: ['title', 'text', 'indexIcon'],
                    position: ['left1', 'left3', 'right1'],
                    tips: '所选周期范围内的用户趋势',
                    text: '',
                    iconTips: ['标记与上一时期上下超出50%', '<p>活动标记：标记时间以自定义中活动周期的起始日开始</p><p>版本标记：标记时间以自定义中创建渠道起始日开始</p>']
                }
            })
            that.valueListDb();
            rectCont = that.app.loadModule(rect, that.dom.find('.peopleAnalysis2'), {
                data: {
                    id: 'peopleAnalysis2',
                },
                title: {
                    title: '影响差异度分布',
                    titleTips: '所选用户类型数量在“渠道&版本”中，与该类型用户过往平均数量的差异度高中低',
                    type: ['title'],
                    position: ['left1'],
                }
            })
            $.each(sameDom3, function(idx, val) {
                sameDom3[idx] = that.app.loadModule(VeDifferent, that.dom.find('.' + sameId3[idx]), {
                    data: {
                        id: sameId3[idx]
                    },
                    title: {
                        title: sameTitle[idx],
                        type: ['title', 'tip'],
                        position: ['left1', 'left2'],
                        tips: '“启用次数或使用时长”在各个' + sameTitle[idx].substring(0, 2) + '中的“周期平均数值”和“过去平均值”，以及两者对比的差异率（-100%-+100%）'
                    }
                })
            });
            setTimeout(function() {
                //console.log('23232', that.app.model.get('iosId'));
                if (parseInt(osId) == 2) {
                    topCont.setTimeMin('selectTimeDay', '2017-05-16');
                } else {
                    topCont.setTimeMin('selectTimeDay', 'all');
                }
            }, 1000);
            that.app.header.setData = function(val) {
                    // console.log('123456', that.app.model.get('iosId'));
                    osId = val.osId;
                    if (parseInt(osId) == 2) {
                        topCont.setTimeMin('selectTimeDay', '2017-05-16');
                    } else {
                        topCont.setTimeMin('selectTimeDay', 'all');
                    }
                    topCont.refreshSelectTimeDay2();
                    that.dom.find('.Timers').val(Tool.GetDateStr(-1));
                    startDate = Tool.GetDateStr(-1);
                    endDate = Tool.GetDateStr(-1);
                    dateLength = '1';
                    that.valueListDb();
                }
                // that.app.header.event._addEvent('header.osId', function(val) {
                //     console.log('123456', that.app.model.get('iosId'));
                //     osId = val.osId;
                //     if (parseInt(osId) == 2) {
                //         topCont.setTimeMin('selectTimeDay', '2017-05-16');
                //     } else {
                //         topCont.setTimeMin('selectTimeDay', 'all');
                //     }
                //     topCont.refreshSelectTimeDay2();
                //     that.dom.find('.Timers').val(Tool.GetDateStr(-1));
                //     startDate = Tool.GetDateStr(-1);
                //     endDate = Tool.GetDateStr(-1);
                //     dateLength = '1';
                //     that.valueListDb();
                // })
        })
    }
    this.valueListDb = function() {
        var json = {
            type: 'usertype',
        }
        that.api.valueList(json).then(function(res) {
            if (res.meta.success == true) {
                if (res.data) {
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
                }
            } else {
                that.app.login(res.meta)
            }
        })
    }
    this.allFun = function() {
        that.getUvDistributionDb();
        that.getUvContrastDb();
        $.each(sameDom3, function(idx, val) {
            that.getUvDifferenceDb(disSource[idx], sameDom3[idx], sameId3[idx], circle[idx]);
        })
    }
    this.getUvDifferenceDb = function(disSourceName, dom, id, circle) {
        dom.hideDataNull();
        dom.hideRefresh();
        dom.showLoading();
        var json = {
            startDate: startDate,
            endDate: endDate,
            dateLength: dateLength,
            typeCode: typeCode,
            contrastDay: contrastDay,
            osId: osId,
            disSource: disSourceName
        }
        that.api.getUvDifference(json).then(function(res) {
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
    this.getUvContrastDb = function() {
        lineCont.showLoading();
        lineCont.hideDataNull();
        lineCont.hideData();
        var json = {
            startDate: startDate,
            endDate: endDate,
            dateLength: dateLength,
            typeCode: typeCode,
            contrastDay: contrastDay,
            osId: osId
        }
        that.api.getUvContrast(json).then(function(res) {
            lineCont.hideLoading();
            if (res.meta.success == true) {
                var num_a = res.data.sumUv ? Tool.numFormat(res.data.sumUv) + '人' : '0人'
                that.dom.find('.num_a').html(that.tips(typeCode) + '总数：' + num_a);
                if (res.data.oldAvglist.length > 0 || res.data.chooselist.length > 0) {
                    lineCont.showData();
                    lineCont.hideDataNull();
                    that.dealData(res, startDate, endDate)
                } else {
                    lineCont.showDataNull();
                    lineCont.hideData();
                }
            } else {
                lineCont.showRefresh();
                that.app.login(res.meta);
            }
        })
    }
    this.dealData = function(val) {
        var obj = {};
        var arrX = [];
        var arrX1 = [];
        var arrY = [];
        var arrColor = [];
        var i = 0;
        var ratioArr = [];
        var arr1 = [];
        var arr2 = [];
        var tips = that.tips(typeCode) //下拉框
        var tips1 = that.tips(contrastDay); //选择对比
        var tips2 = val.data.contrastStartDate + '至' + val.data.contrastEndDate
        var topImg = [
            [],
            []
        ];
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
        var activeImg = [];
        // $.each(that.dom.find('.box_time a'), function() {
        //     if ($(this).hasClass('selected')) {
        //         tips1 = $(this).html();
        //     }
        // });
        //console.log('tempArr', tempArr)
        $.each(tempArr, function(idx, value) {
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
        });
        if (val.data.chooselist.length > 0) {
            $.each(val.data.chooselist, function(idx, value) {
                if (value.chainRatio * 1 > 50 || value.chainRatio * 1 < -50) {
                    topImg[0].push('/images/topcircle.png');
                    topImg[1].push('');
                    ratioArr.push(value.chainRatio)
                } else {
                    topImg[0].push('');
                    topImg[1].push('');
                    ratioArr.push('')
                }
                if (value.uv) {
                    arr1.push(value.uv)
                } else {
                    arr1.push(0)
                }
            });
        } else {
            $.each(tempArr, function(idx, value) {
                arr1.push(0)
            })
        }
        if (val.data.oldAvglist.length > 0) {
            if (startDate == endDate) {
                $.each(val.data.oldAvglist, function(idx, value) {
                    if (value.uv) {
                        arr2.push(value.uv)
                    } else {
                        arr2.push(0)
                    }
                });
            } else {
                $.each(tempArr, function(idx, value) {
                    arr2.push(val.data.oldAvglist[0].uv);
                })
            }
        } else {
            $.each(tempArr, function(idx, value) {
                arr2.push(0)
            })
        }
        arrY.push(arr1);
        arrY.push(arr2);
        var dateForImg = [];
        if (val.data.campaignList) {
            var actDateArr = [];
            $.each(val.data.campaignList, function() {
                var stDate = new Date(this.startDate.replace(/-/g, '/') + ' ' + this.startTime + ':00').getTime()
                var etDate = new Date(this.endDate.replace(/-/g, '/') + ' ' + this.endTime + ':00').getTime()
                this.sms = stDate
                this.ems = etDate
                actDateArr.push(this)
            })
        }
        if (val.data.versionList) {
            var verDateArr = [];
            var arr = [];
            $.each(val.data.versionList, function() {
                var stDate = new Date(this.startDate.replace(/-/g, '/') + ' 00:00:00').getTime()
                this.sms = stDate;
                arr.push(stDate);
                verDateArr.push(this)
            })
        }
        $.each(arrX, function(i, val) {
            if (startDate == endDate) {
                dateForImg[i] = new Date(startDate + ' ' + arrX[i] + ':00').getTime();
            } else {
                //console.log('无数据', val.replace(/\//g, '-') + ' 00:00:00')
                dateForImg[i] = new Date(val.replace(/\//g, '-') + ' 00:00:00').getTime();
            }
        })
        var actList = [];
        var verList = [];
        $.each(dateForImg, function(i) {
            var index = i;
            if (actDateArr) {
                var arr = [];
                $.each(actDateArr, function(i, val) {
                    if (this.sms - dateForImg[index] < 86398 * 1000 && this.sms - dateForImg[index] >= 0) {
                        arr.push(this);
                        activeImg[index] = '/images/u4433.png'
                    }
                })
                actList.push(arr);
            }
            if (verDateArr) {
                $.each(verDateArr, function(i) {
                    if (this.sms == dateForImg[index]) {
                        verList[index] = this
                        activeImg[index] = '/images/u4433.png'
                    }
                })
            }
        })
        obj['arrX'] = arrX;
        obj['arrX1'] = arrX1;
        obj['arrY'] = arrY;
        obj['arrColor'] = ['#44B6AE', '#ffc600'];
        obj['width'] = that.dom.find('.peopleAnalysis1').width();
        obj['id'] = 'peopleAnalysis1';
        obj['tips'] = tips;
        obj['tips1'] = tips1;
        obj['tips2'] = tips2;
        obj['topImg'] = topImg;
        obj['ratioArr'] = ratioArr;
        obj['activeImg'] = activeImg;
        obj['actList'] = actList;
        obj['verList'] = verList;
        //console.log('obj', obj);
        lineCont.setData(obj)
    }
    that.getUvDistributionDb = function() {
        rectCont.showLoading();
        rectCont.hideDataNull();
        rectCont.hideData();
        var json = {
            startDate: startDate,
            endDate: endDate,
            dateLength: dateLength,
            typeCode: typeCode,
            contrastDay: contrastDay,
            osId: osId
        }
        that.api.getUvDistribution(json).then(function(res) {
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
    this.tips = function(val) {
        var tips = ''
        switch (parseInt(val)) {
            case 1:
                tips = '新增用户';
                break;
            case 2:
                tips = '活跃用户';
                break;
            case 3:
                tips = '注册用户';
                break;
            case 4:
                tips = '付费用户';
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
    };
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
        obj['width'] = that.dom.find('.peopleAnalysis2').width();
        obj['id'] = 'peopleAnalysis2';
        // console.log('lllllll', obj);
        rectCont.setData(obj);
        html = '<div style="width:36px;height:243px;position:absolute;top:50px;left:20px;">' +
            '<span style="display:block;height:25%;padding-top:30px;">超高</span>' +
            '<span style="display:block;height:25%;">高</span>' +
            '<span style="display:block;height:25%;">中</span>' +
            '<span style="display:block;height:25%;">低</span>' +
            '</div>';
        that.dom.find('#peopleAnalysis2').append(html);
    }
}
module.exports = peopleAnalysis;