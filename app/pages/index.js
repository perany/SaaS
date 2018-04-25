//require("../less/index.less");
var resolve = $.Deferred()
var resolve1 = $.Deferred()
var resolve2 = $.Deferred()
var resolve3 = $.Deferred()
var top, banner, circle, line;
require.ensure(['../moduleslibs/topCont/topCont.js'], function (e) {
    top = require('../moduleslibs/topCont/topCont.js')
    resolve.resolve()
});
require.ensure(['../modules/overView/banner/banner.js'], function (e) {
    banner = require('../modules/overView/banner/banner.js')
    resolve1.resolve()
});
require.ensure(['../modules/overView/cirlce/cirlce.js'], function (e) {
    circle = require('../modules/overView/cirlce/cirlce.js')
    resolve2.resolve()
});
require.ensure(['../modules/line/cont.js'], function (e) {
    line = require('../modules/line/cont.js')
    resolve3.resolve()
});

function index() {
    var that = this;
    var topCont = null;
    var bannerCont = null;
    var cirlceCont = null;
    var lineCont = null;
    var userTypeName;
    var userTypeCode;
    var matchTable = ['startTime', 'endTime'];
    var startDate = Tool.GetDateStr(0);
    var endDate = Tool.GetDateStr(0);
    var typeCode = -1;
    var osId = 1;
    var uv = [];
    var historyAvgUv = [];
    var count = 0;
    this.complete = function () {
        //console.log('ijisidsjic', that.app.model.get('iosId'));
        osId = that.app.model.get('iosId') ? that.app.model.get('iosId') : '1';
        that.app.header.setData = function (val) {
            console.log('123451226', that.app.model.get('iosId'));
            osId = val.osId;
            typeCode = -1
            that.getUvTotalDb();
            that.valueListDb();
            that.getUserTypeDateStreamUvDb();
        }
        this.app.returnRequier([resolve, resolve1, resolve2, resolve3]).done(function () {
            topCont = that.app.loadModule(top, that.dom.find('.firstActCont'), {
                data: {
                    type: ['timeBox'],
                    position: ['left_cont1'],
                    timeBoxTitle: '选择时间',
                    timeBoxContent: ['今天', '近7天', '近30天'],
                    matchTable: matchTable
                }
            })
            topCont.event._addEvent('topCont.data', function (val) {
                typeCode = -1
                startDate = val.startTime;
                endDate = val.endTime;
                that.getUvTotalDb();
                that.valueListDb();
                that.getUserTypeDateStreamUvDb();
            })
            bannerCont = that.app.loadModule(banner, that.dom.find('.index1'), {
                data: {
                    title: ['用户累计', '累计注册用户', '累计付费用户'],
                    img: ['userAll1.png', 'userAll2.png', 'userAll3.png'],
                    data: ["0", "0", "0"],
                    background: ['#3962a0', '#528fcc', '#9980b9'],
                    className: ['totalUv', 'totalRegUv', 'totalPayUv']
                }
            })
            that.getUvTotalDb();
            cirlceCont = that.app.loadModule(circle, that.dom.find('.index2'), {
                data: {
                    img: ['user1.png', 'user2.png', 'user3.png', 'user4.png'],
                    data: ['0人', '0人', '0人', '0人'],
                    color: ['#85c2ff', '#528fcc', '#3962a0', '#717ccb'],
                    historydata: ['0人', '', '0人', '0人'],
                    tips: ['所选周期范围内，<p>安装应用后首次启用应用的用户</p>',
                        '所选周期范围内（去重），<p>至少启动过一次的用户</p>',
                        '所选周期范围内，<p>有注册成功行为的用户</p>',
                        '所选周期范围内，<p>有付费成功行为的用户</p>'
                    ]
                }
            })
            that.valueListDb();
            lineCont = that.app.loadModule(line, that.dom.find('.index3'), {
                line: {
                    id: 'index3',
                },
                title: {
                    title: '用户趋势',
                    titleTips: '所选周期范围内的用户趋势',
                    type: ['title', 'radio', 'indexIcon'],
                    position: ['left1', 'left2', 'right1'],
                    tips: '所选周期范围内的用户趋势',
                    iconTips: ['标记与上一时期上下超出50%', '<p>活动标记：标记时间以自定义中活动周期的起始日开始</p><p>版本标记：标记时间以自定义中创建渠道起始日开始</p>'],
                }
            })
            lineCont.event._addEvent('line.radio', function (val) {
                typeCode = val.id;
                that.getUserTypeDateStreamUvDb();
            });
            that.getUserTypeDateStreamUvDb();
            setTimeout("(function check(){\n" +
                "        console.log(\"1\",$(\".fl .radios:first-child i\"));\n" +
                "        if($(\".fl .radios:first-child i\").length==1){\n" +
                "            $(\".fl .radios:first-child i\").click();\n" +
                "        }\n" +
                "    })()",1000);

        });
    }

    this.getUvTotalDb = function () {
        bannerCont.showLoading();
        var json = {
            startDate: startDate,
            endDate: endDate,
            osId: osId
        }
        that.api.getUvTotal(json).then(function (res) {
            bannerCont.hideLoading();
            if (res.meta.success == true) {
                bannerCont.hideRefresh();
                if (res.data) {
                    bannerCont.setData(res.data)
                }
            } else {
                bannerCont.showRefresh();
                that.app.login(res.meta);
            }

        })
    }
    this.valueListDb = function () {
        count = 0;
        uv = [];
        historyAvgUv = [];
        cirlceCont.showLoading();
        var dataPara = {
            type: "usertype"
        };
        that.api.valueList(dataPara).then(function (res) {
            cirlceCont.hideLoading();
            if (res.meta.success == true) {
                cirlceCont.hideRefresh();
                userTypeName = [];
                userTypeCode = [];
                var radioData = [{name: '全部', id: '-1'}];
                for (var i = 0; i < res.data.length; i++) {
                    userTypeName.push(res.data[i].typeName);
                    radioData.push({name: res.data[i].typeName, id: res.data[i].typeCode})
                    that.getUserTypeStreamUvDb(res.data[i].typeCode, i);
                }
                cirlceCont.setTitle(userTypeName);
                lineCont.setRadioData(radioData, [0, 1, 2, 3, 4], false);
            } else {
                cirlceCont.showRefresh();
                that.app.login(res.meta);
            }
        })
    }
    this.getUserTypeStreamUvDb = function (code, idx) {
        cirlceCont.showLoading();
        var api;
        var json = {
            startDate: startDate,
            endDate: endDate,
            typeCode: code,
            osId: osId
        }
        if (startDate == endDate) {
            api = that.api.getUserTypeStreamUv
        } else {
            api = that.api.getUserTypeUv
        }
        api(json).then(function (res) {
            cirlceCont.hideLoading();
            if (res.meta.success == true) {
                cirlceCont.hideRefresh();
                count++
                uv.push({
                    code: code,
                    uv: res.data.uv ? res.data.uv + '' : '0'
                });
                historyAvgUv.push({
                    code: code,
                    avg: res.data.historyAvgUv ? res.data.historyAvgUv : '0'
                });
                if (count == 4) {
                    cirlceCont.setData({uv: uv, historyAvgUv: historyAvgUv});
                }
            } else {
                cirlceCont.showRefresh();
                that.app.login(res.meta);
            }
        })
    }
    this.getUserTypeDateStreamUvDb = function () {
        // console.log(lineCont.dom.find(".fl .radios:first-child i"));
        // if(lineCont.dom.find(".fl .radios:first-child i").length==1){
        //     // lineCont.dom.find(".fl .radios:first-child i").click();
        //     // return false;
        // }else{
        //     console.log("111");
        // }
        lineCont.showLoading();
        lineCont.hideDataNull();
        lineCont.hideData();
        var api;
        var json = {
            startDate: startDate,
            endDate: endDate,
            typeCode: typeCode,
            osId: osId
        }
        if (startDate == endDate) {
            api = that.api.getUserTypeDateStreamUv
        } else {
            api = that.api.getUserTypeDateUv
        }
        api(json).then(function (res) {
            lineCont.hideLoading();
            if (res.meta.success == true) {
                if (res.data.activeUserList.length > 0 || res.data.addUserList.length > 0 || res.data.payUserList.length > 0 || res.data.regUserList.length > 0) {
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
        });
    };
    this.dealData = function (val, startDate, endDate) {
        console.log(val, startDate, endDate);
        var obj = {};
        var arrX = [];
        var arrX1 = [];
        var arrX2 = [];
        var arrY = [];
        var arrColor = [];
        var arrColor1 = ['#50bbb3', '#77c9fd', '#4f98e1', '#9980b9'];
        var i = 0;
        var topImg = [
            [],
            []
        ];
        // var arr1 = [];
        // var arr2 = [];
        // var arr3 = [];
        // var arr4 = [];
        var ratioArr = [];
        var tempArr = [];
        var tipsArr = [{name: '新增用户', color: '#50bbb3'},
            {name: '活跃用户', color: '#77c9fd'},
            {name: '注册用户', color: '#4f98e1'},
            {name: '付费用户', color: '#9980b9'}
        ]
        var tipsArr1 = [];
        var listArr1 = [val.data.addUserList, val.data.activeUserList, val.data.regUserList, val.data.payUserList]
        if (parseInt(typeCode) == -1) {
            var listArr = [val.data.addUserList.length, val.data.activeUserList.length, val.data.regUserList.length, val.data.payUserList.length]
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
            $.each(tempArr, function (idx, value) {
                if (startDate == endDate) {
                    if (value.hourFormat != undefined || value.hourFormat != null) {
                        arrX.push(value.hourFormat)
                        arrX1.push(Tool.GetDateStr(0));
                    } else {
                        arrX.push('00:00')
                        arrX1.push(Tool.GetDateStr(0));
                    }
                } else {
                    arrX.push(value.date.replace(/-/g, '/').substring(5));
                    arrX1.push(value.date.replace(/-/g, '/').substring(5));
                    arrX2.push(value.date);
                }
            });
        }
        $.each(listArr1, function (iii, vvv) {
            var arr = [];
            if (vvv.length > 0) {
                $.each(vvv, function (idx, value) {
                    arr.push(value.uv)
                    if (parseInt(typeCode) != -1) {
                        if (startDate == endDate) {
                            if (value.hourFormat != undefined || value.hourFormat != null) {
                                arrX.push(value.hourFormat)
                                arrX1.push(Tool.GetDateStr(0));
                            } else {
                                arrX.push('00:00')
                                arrX1.push(Tool.GetDateStr(0));
                            }
                        } else {
                            arrX.push(value.date.replace(/-/g, '/').substring(5));
                            arrX1.push(value.date.replace(/-/g, '/').substring(5));
                            arrX2.push(value.date);
                        }
                        if (value.chainRatio * 1 > 50 || value.chainRatio * 1 < -50) {
                            topImg[0].push('/images/topcircle.png');
                            topImg[1].push('');
                            ratioArr.push(value.chainRatio)
                        } else {
                            topImg[0].push('');
                            topImg[1].push('');
                            ratioArr.push('')
                        }
                    }
                })
                arrColor.push('' + arrColor1[iii]);
                arrY.push(arr);
                tipsArr1.push(tipsArr[iii]);
            } else {
                if (parseInt(typeCode) == -1) {
                    $.each(tempArr, function (idx, value) {
                        arr.push(0)
                    })
                    arrColor.push('' + arrColor1[iii]);
                    arrY.push(arr);
                }
            }
        });
        var dateForImg = [];
        if (val.data.campaignList) {
            var actDateArr = [];
            $.each(val.data.campaignList, function () {
                var stDate = new Date(this.startDate.replace(/-/g, '/') + ' ' + this.startTime + ':00').getTime()
                var etDate = new Date(this.endDate.replace(/-/g, '/') + ' ' + this.endTime + ':00').getTime()
                this.sms = stDate
                this.ems = etDate
                actDateArr.push(this)
            })
        }
        if (val.data.versionList.length > 0) {
            var verDateArr = [];
            var arr = [];
            $.each(val.data.versionList, function () {
                var stDate = new Date(this.startDate.replace(/-/g, '/') + ' 00:00:00').getTime()
                this.sms = stDate;
                arr.push(stDate);
                verDateArr.push(this)
            })
        }
        $.each(arrX, function (i, val) {
            if (startDate == endDate) {
                dateForImg[i] = new Date(startDate + ' ' + arrX[i] + ':00').getTime();
            } else {
                dateForImg[i] = new Date(arrX2[i] + ' 00:00:00').getTime();
            }
        })
        var actList = [];
        var verList = [];
        var activeImg = [];
        $.each(dateForImg, function (i) {
            var index = i;
            if (actDateArr) {
                var arr = [];
                $.each(actDateArr, function (i, val) {
                    if (this.sms - dateForImg[index] < 86398 * 1000 && this.sms - dateForImg[index] >= 0) {
                        arr.push(this);
                        activeImg[index] = '/images/u4433.png'
                    }
                })
                actList.push(arr);
            }
            if (verDateArr) {
                $.each(verDateArr, function (i) {
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
        obj['arrColor'] = arrColor;
        obj['tipsArr'] = tipsArr;
        obj['tipsArr1'] = tipsArr1;
        obj['topImg'] = topImg;
        obj['ratioArr'] = ratioArr;
        obj['activeImg'] = activeImg;
        obj['actList'] = actList;
        obj['verList'] = verList;
        obj['typeCode'] = parseInt(typeCode);
        obj['width'] = that.dom.find('.index3').width();
        obj['id'] = 'index3';
        console.log(obj,lineCont)   //perany-todo///全部选项首次加载报错
        // t=setTimeout("lineCont.setData(obj)",3000);
        // clearTimeout(t);
        lineCont.setData(obj);
    }
}

//原型链一定要有的
module.exports = index;