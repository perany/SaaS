/*
BaseOption ========================
xyshow 横轴竖轴的画图是否显示 [*,false]为线条撑满，[0,true]横线不撑满, 数字表示两边有几个线
ruleShow 横轴竖轴的单位显示
xytext 横竖轴的文字位置
x 为横轴参数
y 为纵轴参数
data 为展示的数据
color 为展示数据的颜色，可以设置数组，
yr 控制右边百分比是否要显示
bgcolor 为百分比柱状图准备，单位柱状图方块的背景,也是地图上面没有值的时候初始颜色
top 为svg距离顶部的距离
maxX为以X轴做为数据展示
maxY为以Y轴做为数据展示
max为雷达图用的
formatKdYA为多维度图的另外一边的单位装换
fill为线图是否要填充颜色
ftype父类型 multi为多维度 normal为一般
ctype子类型 add为叠加性，normal为一般，more为多线图，所有的独立图表都应该处理 ctype类型。
lineColor为线性图的颜色
fillColor为线形图的填充颜色
avage为平均值
alinecolor为平均值的线的颜色
angle为整图旋转
weatherImages为天气图标
iconImages为线图上面要小的icon
backLineColor图片后面要显示竖线的颜色
colorShow  为图表上面的文字颜色
xSetInterval x轴动态分配的数目
circleMouseEvent 控制线图上面的原点是否鼠标移上去要显示
xTextRotate 控制下轴的文字旋转多少度
click为点击事件
minx和miny为当前坐标系的最小值
*/
function svg(option) {
    var svgLib = {};
    svgLib = optionMatch({
        width: 300,
        height: 300,
        el: 'svg',
        paper: null,
        'font': '100 12px "Microsoft Yahei","黑体","宋体","Helvetica", "Arial Unicode MS", Arial, sans-serif',
        'fontColor': '#4c4c4c',
        'lineColor': "#e7ebed"
    }, option)
    var Baseoption = {
        format: function(num) {
            return num;
        },
        formatKdX: function(value) {
            return value
        },
        formatKdY: function(value) { //%
            return value
        },
        formatKdYA: function(value) {
            return value
        },
        bgmode: 'normal',
        range: [0.1, 0.1],
        x: [],
        y: [],
        ftype: 'normal',
        ctype: 'normal',
        top: 0,
        avage: null,
        alinecolor: '#000',
        angle: 0,
        fill: true,
        backLineColor: '#ccc',
        xyshow: [2, true],
        lineColor: ['#44a4fa', '#44a4fa', '#44a4fa'],
        fillColor: ['#ff0', '#f0f', "#000"],
        ruleshow: [true, true],
        xytext: ['left', 'middle'],
        datacolor: '#eee',
        overcolor: '#cfd8dc',
        unit: '',
        colorShow: '#ccc',
        geo: null,
        data: null,
        color: ["#44a4fa"],
        bgcolor: "#ccc",
        maxX: 0,
        minX: 0,
        maxY: 0,
        minY: 0,
        max: 0,
        yr: false,
        modulus: [],
        modulusRate: [],
        weatherImages: [],
        iconImages: [],
        xSetInterval: 16,
        circleMouseEvent: false,
        circleShow: false,
        xTextRotate: 45,
        chaincolor:['#f00'],
        mouseover: function() {},
        mouseout: function() {},
        mouseoverA: function() {},
        mouseoutA: function() {},
        click: function() {}
    }
    svgLib.paper = Raphael(document.getElementById(svgLib.el), svgLib.width, svgLib.height)
    svgLib.drawXk = function(data) {
        var option = optionMatch(Baseoption, data)
        option.el = svgLib.el
        option.showArr = initScreenData(svgLib, option)
        var showArr = cloneArr(option.showArr)
            // dataDeal(option.type, option.data)
        if (option.x.length == 0) {
            option.x = dataDeal(option.ftype, option.data, option.ctype)
            if (option.avage > option.x[option.x.length - 1]) {
                var toubu = String(option.avage).substr(0, 1) * 1 + 1
                var pusnum = toubu * Math.pow(10, String(option.avage).length - 1)

                option.x.push(pusnum)
                option.maxX = option.x[option.x.length - 2]
            } else {
                option.maxX = option.x[option.x.length - 1]
            }
            option.minX = option.x[0]
        }
        if (option.y.length == 0) {
            if (option.ftype != 'multi') {
                option.y = dataDeal(option.ftype, option.data, option.ctype)

                // option.maxY = option.y[option.y.length - 1]
            } else {
                var soc = dataDeal(option.ftype, option.data, option.ctype)
                var yA = soc.yA
                var yB = soc.yB
                option.y = yA
            }
            if (option.avage > option.y[option.y.length - 1]) {
                var toubu = String(option.avage).substr(0, 1) * 1 + 1
                var pusnum = toubu * Math.pow(10, String(option.avage).length - 1)
                option.y.push(pusnum)
                option.maxY = option.y[option.y.length - 2]
            } else {
                option.maxY = option.y[option.y.length - 1]
            }
            option.minY = option.y[0]
        } else {
            if (option.ftype == 'multi') {
                var soc = dataDeal(option.ftype, option.data, option.ctype)
                var yA = soc.yA
                var yB = soc.yB
                //option.y = yA
            }
            option.maxY = option.y[option.y.length - 1]
            option.minY = option.y[0]
        }
        /*if(nowOption.avage>result[result.length-1]){
            var toubu=nowOption.avage.substr(0,1)*1+1
            var pusnum=toubu*Math.pow(10,String(nowOption.avage).length)
            result.push(pusnum)
        }*/
        svgLib.data = svgData(option)

        var len = option.ruleshow[0] ? option.x.length : 0
        var stp
        var jg

        ////console.log(option.ruleshow[0], option.x.length, 'dsjdksjd')
        for (var i = 0; i < len; i++) {
            switch (option.xytext[0]) {
                case 'left':
                    jg = showArr.w / (option.x.length - 1)
                    stp = showArr.st + i * showArr.w / (option.x.length - 1)
                    break
                case 'middle':
                    jg = showArr.w / (option.x.length)
                    stp = showArr.st + showArr.w / (option.x.length) / 2 + i * showArr.w / (option.x.length)
                    break
                case 'right':
                    break
            }
            ////console.log(option.x.length)
            ////console.log(option.weatherImages[i],'dsadjask')
            if (option.weatherImages[i]) {
                svgLib.paper.image(option.weatherImages[i], stp - 15, 0, 30, 30)
            }
            if (option.x.length > 20) {
                var showNum = Math.floor((showArr.w / option.xSetInterval) / jg) + 2
                    ////console.log(showArr.h)
                    ///svgLib.paper.rect(stp, option.top, 1,showArr.h).attr({'stroke-width':0,'fill':svgLib.lineColor})
                    ////console.log(Math.floor(i % showNum),showNum)
                if (Math.floor(i % showNum) == 0) {
                    svgLib.paper.text(stp + 10, svgLib.height - 30, option.formatKdX(option.x[i])).attr({
                        font: svgLib.font,
                        fill: svgLib.fontColor,
                        'text-anchor': 'end'
                    }).rotate(-option.xTextRotate);
                }
                //if (showArr.w/16)
            } else {
                svgLib.paper.text(stp + 10, svgLib.height - 30, option.formatKdX(option.x[i])).attr({
                    font: svgLib.font,
                    fill: svgLib.fontColor,
                    'text-anchor': 'end'
                }).rotate(-option.xTextRotate);
            }
        }
        if (option.xyshow[1]) {
            switch (option.xyshow[0]) {
                case 1:
                    svgLib.paper.rect(showArr.st, option.top, 1, showArr.h).attr({
                        'fill': svgLib.lineColor,
                        'stroke-width': 0
                    })
                    break
                case 2:
                    svgLib.paper.rect(showArr.st, option.top, 1, showArr.h).attr({
                        'fill': svgLib.lineColor,
                        'stroke-width': 0
                    })
                    svgLib.paper.rect(showArr.st + showArr.w, option.top, 1, showArr.h).attr({
                        'fill': svgLib.lineColor,
                        'stroke-width': 0
                    })
                    break
                case 3:
                    showArr.w = Math.floor(svgLib.width)
                    svgLib.paper.rect(0, option.top, 1, showArr.h).attr({
                        'fill': svgLib.lineColor,
                        'stroke-width': 0
                    })
                    svgLib.paper.rect(showArr.w - 1, option.top, 1, showArr.h).attr({
                        'fill': svgLib.lineColor,
                        'stroke-width': 0
                    })
                    break
            }
        } else {
            showArr.w = Math.floor(svgLib.width)
            switch (option.xyshow[0]) {
                case 1:
                    break
                case 3:
                    svgLib.paper.rect(0, option.top, 1, showArr.h).attr({
                        'fill': svgLib.lineColor,
                        'stroke-width': 0
                    })
                    svgLib.paper.rect(showArr.w - 1, option.top, 1, showArr.h).attr({
                        'fill': svgLib.lineColor,
                        'stroke-width': 0
                    })
                    break
            }
        }
        var ylength
        var jg
        var syt
        switch (option.xytext[1]) {
            case 'bottom':
                ylength = option.y.length
                jg = (showArr.h) / (option.y.length - 1)
                syt = (showArr.h) - 6 + option.top
                break
            case 'middle':
                ylength = option.y.length + 1
                jg = (showArr.h) / (option.y.length)
                syt = (showArr.h) - Math.floor(0.5 * (showArr.h) / (option.y.length)) + option.top
                break
            case 'top':
                break
        }
        // //console.log('==============')
        for (var j = 0; j < ylength; j++) {
            // //console.log(svgLib.height - 40 - j * jg)
            //var stYP = option.xyshow[1] ? showArr.st : 0
            var stYP = (option.xyshow[1] && option.xyshow[0] != 3 ? showArr.st : 0)
            switch (option.bgmode) {
                case 'normal':
                    svgLib.paper.rect(stYP, (showArr.h + option.top) - j * jg, showArr.w, 1).attr({
                        'fill': svgLib.lineColor,
                        'stroke-width': 0
                    })
                    break
                case 'simple':
                    if (j == ylength - 1) {
                        svgLib.paper.rect(stYP, (showArr.h + option.top), showArr.w, 1).attr({
                            'fill': svgLib.lineColor,
                            'stroke-width': 0
                        })
                    }
                    break
            }
            var stTP = showArr.st
            if (option.y[j] != null && option.y[j] != undefined && option.ruleshow[1]) {
                if (j == ylength - 1 && option.xytext[1] == 'bottom') {
                    syt = showArr.h + 6 + option.top
                }
                if (yA && yB) {
                    var nowXY = (stTP - 10)
                    var nowpos = 'start'
                    if (option.maxX) {
                        //nowXY = 0
                        nowpos = 'end'
                    }
                    if (option.xyshow[0] == 3) {
                        nowXY = 0
                    }
                    svgLib.paper.text(option.xyshow[1] ? nowXY : 0, syt - jg * j, option.formatKdY(yB[j])).attr({
                        font: svgLib.font,
                        fill: svgLib.fontColor,
                        'width': 80,
                        'text-anchor': option.xyshow[1] ? 'start' : 'end'
                    });
                    var rightTextX
                    if (option.xyshow[0] == 3) {
                        rightTextX = showArr.w - 0
                    } else {
                        rightTextX = stTP + showArr.w + 10
                    }
                    // //console.log(yA[j],'yA[j]yA[j]yA[j]yA[j]yA[j]yA[j]')
                    svgLib.paper.text(option.xyshow[1] ? rightTextX : svgLib.width, syt - jg * j, option.formatKdYA(yA[j])).attr({
                        font: svgLib.font,
                        fill: svgLib.fontColor,
                        'text-anchor': option.xyshow[1] ? 'end' : 'start'
                    });
                } else {
                    var nowXY = (stTP - 10)
                    var nowpos = 'start'
                    if (option.maxX) {
                        //nowXY = 0
                        nowpos = 'end'
                    }
                    if (option.xyshow[0] == 3) {
                        nowXY = 0
                    }
                    svgLib.paper.text(option.xyshow[1] ? nowXY : 0, syt - jg * j, option.formatKdY(option.y[j])).attr({
                        font: svgLib.font,
                        fill: svgLib.fontColor,
                        'width': 80,
                        'text-anchor': option.xyshow[1] ? nowpos : 'end'
                    });
                    var rightTextX
                    if (option.xyshow[0] == 3) {
                        rightTextX = showArr.w - 30
                    } else {
                        rightTextX = stTP + showArr.w + 10
                    }
                    // //console.log(yA[j],'yA[j]yA[j]yA[j]yA[j]yA[j]yA[j]')
                    svgLib.paper.text(option.xyshow[1] ? rightTextX : svgLib.width, syt - jg * j, option.formatKdYA(j)).attr({
                        font: svgLib.font,
                        fill: svgLib.fontColor,
                        'text-anchor': option.xyshow[1] ? 'end' : 'start'
                    });
                }
            }
        }
        //console.log(option.avage, 'avage', option.top, svgLib.data.top, option)
        if (option.avage > option.maxY) {
            svgLib.data.showArr.h = svgLib.data.showArr.h - jg
            svgLib.data.top = option.top + jg
            svgLib.data.y.pop()
        }
        //console.log(svgLib.data.top)
        if (yA) {

            svgLib.yA = Tool.clone(svgLib.data)
            svgLib.yA.data = svgLib.data.data.yr
                // //console.log(svgLib.data.ctype)
            svgLib.yA.ctype = svgLib.data.ctype.yr
            svgLib.yA.maxY = yA[yA.length - 1]
        }
        if (yB) {
            //svgLib.yB = svgLib.data.clone()
            svgLib.yB = Tool.clone(svgLib.data)
            svgLib.yB.data = svgLib.data.data.yl
            svgLib.yB.ctype = svgLib.data.ctype.yl
            svgLib.yB.maxY = yB[yB.length - 1]
        }

    }
    svgLib.drawR = function(data) {
        var option = optionMatch(Baseoption, data)
            //option.showArr = initScreenData(svgLib, option)
        var r = svgLib.width > svgLib.height ? svgLib.height : svgLib.width
        for (var i = 0; i < 7; i++) {
            var color = Math.floor(i % 2) == 0 ? "#eee" : "#fff"
            svgLib.paper.circle(svgLib.width / 2, svgLib.height / 2, Math.floor(r * 0.4 * (8 - i) / 8)).attr({
                fill: color,
                'stroke': "#ccc"
            })
        }
        for (var j = 0; j < option.x.length; j++) {
            var angle = -90 + j * (360 / option.x.length)
            svgLib.paper.rect(svgLib.width / 2, svgLib.height / 2, r * 0.4, 1).attr({
                'fill': "#ccc",
                'stroke-width': 0
            }).rotate(angle, svgLib.width / 2, svgLib.height / 2)
            svgLib.paper.text(svgLib.width / 2 + r * 0.45 * Math.cos(Math.PI * angle / 180), svgLib.height / 2 + r * 0.45 * Math.sin(Math.PI * angle / 180), option.formatKdX(option.x[j])).attr({
                font: svgLib.font,
                fill: svgLib.fontColor,
                'text-anchor': 'middle'
            });
        }
        var lin = numberXY(option.data)
        option.max = lin[lin.length - 1]
            ////console.log(option)
        svgLib.data = svgData(option)
    }
    svgLib.clear = function() {
        svgLib.paper.clear()
    }

    //--------------------------private------------------------
    //对于不同的类型，data的处理 add为叠加性，normal为一般，more为多线图，multi为多维度
    function dataDeal(ftype, data, ctype) {
        var scale = []
        var another = {}
            ////console.log(ftype)
        switch (ftype) {
            case "normal":
                scale = cdataDeal(ctype, data)

                break
            case "multi":
                // console.log(ctype.yl)
                var yA = cdataDeal(ctype.yr, data.yr)
                var yB = cdataDeal(ctype.yl, data.yl)
                if ((yA[0] == 0 && yB[0] == 0) || yA[0] < 0 && yB[0] < 0) {
                    if (yA.length < yB.length) {
                        yA = markArray(yA, yB)
                    }
                    if (yA.length > yB.length) {
                        yB = markArray(yB, yA)
                    }
                    // console.log(yA,yB)
                } else {
                    var tempyA = markArray(yA, yB)
                    var tempyB = markArray(yB, yA)
                    yA = tempyA
                    yB = tempyB
                }
                another = { yA: yA, yB: yB }
                return another
                break
        }
        return scale
    }

    function cdataDeal(ctype, data) {
        var scale = []
        var another = {}
        switch (ctype) {
            case "normal":
                scale = numberXY(data)
                    ////console.log('dsjdak')
                break
            case "add":
                var temp = []
                for (var j = 0; j < data[0].length; j++) {
                    var num = 0
                    for (var i = 0; i < data.length; i++) {
                        num += data[i][j]
                    }
                    temp.push(num)
                }
                ////console.log(temp)
                scale = numberXY(temp)
                break
            case "more":
                var temp = []
                for (var j = 0; j < data.length; j++) {
                    temp = temp.concat(data[j])
                }
                scale = numberXY(temp)
                break
            case 'reverse':
                var temp = []
                for (var j = 0; j < data.length; j++) {
                    temp = temp.concat(data[j])
                }
                //console.log(temp)
                scale = numberXY(temp)
                break
        }
        return scale
    }
    //数组补足
    function markArray(a, b) {
        //console.log(a,b)
        if (a[0] * b[0] >= 0) {
            var total = b.length - a.length
            for (var i = 0; i < total; i++) {
                var neD = a[a.length - 1] + a[1]
                a.push(neD)
            }
        } else {
            //var st = a[0] > b[0] ? b[0] : a[0]
            //var et = a[0] > b[0] ? a[a.length - 1] : b[b.length - 1]
            var num = a[0] < 0 ? a[0] : -a[a.length - 1]
            a = [num, num / 2, 0, -num / 2, -num]
                //console.log(a)
        }
        return a
    }
    //整理数据
    function svgData(nowOption) {
        var data = {}
        data = optionMatch(data, svgLib)
        data = optionMatch(data, nowOption)
        return data
    }

    //初始化整个场景
    function initScreenData(svgLib, nowOption) {
        var showArr = {
            st: Math.floor(svgLib.width * nowOption.range[0]),
            w: Math.floor(svgLib.width * (1 - nowOption.range[0] - nowOption.range[1])),
            h: svgLib.height - 60 - nowOption.top
        }
        return showArr
    }
    //object浅层clone
    function optionMatch(option, matchOption) {
        for (var k in matchOption) {
            if (matchOption[k] != undefined) {
                option[k] = matchOption[k]
            }
        }
        return option
    }
    //Array浅层clone
    function cloneArr(valueArr) {
        var newArr = {}
        for (var i in valueArr) {
            newArr[i] = valueArr[i]
        }
        return newArr

    }
    //获取xy的最大值，进行排序
    function numberXY(value) {
        var newV = value.toString().split(',')
        var newdata = newV.sort(function NumDescSort(a, b) { 
            return Math.floor(b) - Math.floor(a);
        })
        var result = []
            // console.log(newdata)
        if (newdata[0] * newdata[newdata.length - 1] >= 0) {
            newdata[0] = Math.floor(newdata[0])
            newdata[newdata.length - 1] = Math.floor(newdata[newdata.length - 1])
            var toplevel
            var jg = 0
            var maxL
            var maxNUm
            if (newdata[0] < 10 && newdata[newdata.length - 1] > -10) {
                var jsd = newdata[0] > 0 ? (Math.floor(newdata[0] / 5) + 1) : Math.floor(newdata[newdata.length - 1] / 5)
                for (var i = 0; i < 5; i++) {
                    result.push(i * jsd)
                }
                result = newdata[0] > 0 ? result : result.sort(function NumDescSort(a, b) { 
                    return Math.floor(a) - Math.floor(b);
                })
                console.log(result)
                return result
            }
            toplevel = newdata[0] > 0 ? Math.pow(10, (String(newdata[0])).length) : Math.pow(10, ((String(newdata[newdata.length - 1])).length - 1))
            maxNUm = newdata[0] > 0 ? newdata[0] : Math.abs(newdata[newdata.length - 1])
            maxL = (String(maxNUm).substr(0, 1) * 1 + 1) * Math.pow(10, (String(maxNUm)).length - 1)
                //console.log(toplevel,maxL)
            if (maxNUm >= Math.floor(toplevel * 0.5)) {
                jg = Math.floor(toplevel * 0.2)
            }

            if (maxNUm < Math.floor(toplevel * 0.5) && maxNUm >= Math.floor(toplevel * 0.3)) {
                jg = Math.floor(toplevel * 0.1)
            }
            if (maxNUm < Math.floor(toplevel * 0.3) && maxNUm >= Math.floor(toplevel * 0.1)) {
                jg = Math.floor(toplevel * 0.05)
            }
            var buq = 2
            if ((maxL - maxNUm) > 2 * jg) {
                buq = 0
            }
            if ((maxL - maxNUm) <= 2 * jg && (maxL - maxNUm) > jg) {
                buq = 1
            }
            var tempAtr = []
            if (jg != 0) {
                for (var i = 0; i < Math.floor(maxL / jg) + buq; i++) {
                    var tjg = newdata[0] > 0 ? jg : -jg
                    tempAtr.push(i * tjg)
                }
            } else {
                result = [0]
            }
            result = newdata[0] > 0 ? tempAtr : tempAtr.sort(function NumDescSort(a, b) { 
                return Math.floor(a) - Math.floor(b);
            })
        } else {
            //toplevel = Math.abs(newdata[0]) > Math.abs(newdata[newdata.length-1]) ? Math.pow(10, (String(newdata[0])).length) : Math.pow(10, ((String(newdata[newdata.length - 1])).length - 1))
            maxNUm = Math.abs(newdata[0]) > Math.abs(newdata[newdata.length - 1]) ? newdata[0] : Math.abs(newdata[newdata.length - 1])
            maxL = (String(maxNUm).substr(0, 1) * 1 + 1) * Math.pow(10, (String(maxNUm)).length - 1)
            result = [-maxL, -maxL / 2, 0, maxL / 2, maxL]
        }
        return result
    }
    return svgLib
}
module.exports = svg;
