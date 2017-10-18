/*
svg ===============================
    ================== svg ===================
        ================== width ==================
     width:number
     svg 宽度
        ================== height ==================
     height:number,
     svg 高度
        ================== el ==================
     el:string
     svg所属的id
        ================== font ==================
     font:string
     svg所属字体设置
        ================== fontColor ==================
     fontColor:string
     svg所属字体颜色设置
        ================== fontColor ==================
     lineColor:string
     svg设置背景图的线条颜色
     默认值 #ccc

 BaseOption ========================
    ===============背景控制==============

         ================= bgmode =================
    bgmode：string  simple只有x轴   line有线框图  none为没有背景
    默认为line
        ================= xyshow =================
    xyshow:object   
    列子为xyshow:{linenum：1, close：true}
    linenum  为y轴的数目。1为只有1条左边y轴，2为左右两条，0代表1条都没有
    close 为 ture为画满屏，flase为从设定的开始和结束的位置来画
    默认为{linenum：2，close：true}
        ================= ruleShow =================
    ruleShow：object
    列子为{x:true，y：true}
    x为x轴的数据是否显示，y为y轴的数据是否显示
    默认为{x:true，y：true}
         ================= xytext =================
    xytext：object
    列子为{x：'middle',y，'bottom'}
    x为x轴的数据显示的位置，y为y轴的y的数据显示位置，x有left，midddle两种，y有middle和bottom两种
        ================= top =================
    top:number
    为svg距离顶部的距离
    默认为20
        ================= bottom =================
    bottom:number
    为svg距离底部的距离
    默认为60
        ================= xTextRotate =================
    xTextRotate:number
    为x轴的文字旋转角度
    默认为30
        ================= xSetInterval =================
    xSetInterval:number
    为x轴的文字显示最多数目当x的数目大于这个1.2倍的时候就会出现以这个为准
    默认为16
        =================  range =================
    range:array
    为图表开始和结束分别距离左右两边跟整个图表所占区域宽度的百分比
    默认为[0.1,0.1]



    ===============数据控制==============
        ================= x =================
    x:array
    为横轴参数
    默认为[]
        ================= y =================
    y:array
    为纵轴参数
    默认为[]
        ================= data =================
    data:array
    为展示数据
    默认为null
        ================= color =================
    color:array
    为展示数据的配色
    默认为[] 
    
    ===============图表全局控制==============
        ================= ftype =================
    ftype:string
    图表整体的展示类型  multi为二维度 normal为一般
    默认为normal
        ================= ctype =================
    ctype:Array
    图表不同父类型下的子类型  数组1位代表一个维度的类型 normal，more，add，reverse这四种
    线图有的是normal，more
    矩形图有normal，more,add,reverse
    气泡图有normal,more
    默认为[normal]
        ================= avage =================
    avage:number
    图表是否要整体展示一个平均值
    默认为0
        ================= alinecolor =================
    alinecolor:string
    表示为平均线的颜色
    默认为#ccc
        ================= colorShow =================
    colorShow:[]
    表示为图表上面数值的显示
    默认为[#ccc]
        =================  backLineColor =================
    backLineColor:string
    表示为图表上面显示的竖线的颜色
    默认为#ccc
        =================  format =================
    format:function
    表示为图表数值的格式化
    默认为function（value）{return value}
        =================  formatKdX =================
    formatKdX:function
    表示为图表x轴数据的格式化
    默认为function（value）{return value}
        =================  formatKdY =================
    formatKdY:function
    表示为图表左边y轴的数据格式化
    默认为function（value）{return value}
        =================  formatKdYA =================
    formatKdYA:function
    表示为图表右边y轴的数据格式化
    默认为function（value）{return value}
        =================  weatherImages =================
    weatherImages:array
    为图表最顶部是否要显示
    默认为[]
        =================  chainrate =================
    chainrate:array
    为图表加环比
    默认为[]
        =================  rate =================
    rate:array
    为图表加同比
    默认为[]
         ================= mouseevent =================
    mouseover: function() {}鼠标移入
    mouseout: function() {}鼠标移出
    mouseoverA: function() {}平均线移入
    mouseoutA: function() {}平均线移出
    click: function() {}鼠标点击
    

    ===============矩形图控制==============
        ================= bgcolor =================
    bgcolor：string 16进制
    为百分比柱状图准备，单位柱状图方块的背景,也是地图上面没有值的时候初始颜色
    默认为 #ccc
    

    ===============线图控制==============
        ================= fill =================
    fill：array
    为线图是否要填充颜色,每一个数组位置代表一根线是否要填充颜色
    默认值为[true]
        ================= circleShow =================
    circleShow：array
    为线图是否要在每个节点显示小圆圈
    默认值为[true]
        ================= lineColor =================
    lineColor：array
    为线图显示的颜色，每一个线都可以有自己的颜色
    默认值为['#ccc']
        ================= fillColor =================
    fillColor：array
    为线图填充颜色，每一个线都可以有自己的填充颜色
    默认值为['#ccc']
        ================= iconImages =================
    iconImagesr：array
    为线图上面是否要显示一个小图标
    默认值为[]
        ================= circleMouseEvent =================
    circleMouseEvent：boolean
    为线图移动上去是否要显示小圆圈
    默认值为false
    
    ===============圆形图控制==============
        ================= max =================
    max:Number 
    为雷达图准备，表示为雷达图的最大值是多少
    默认为 0
        ================= angle =================
    angle:Number 
    为半环图准备，表示为半环图是否要旋转
    默认为 0
        ================= disWhite =================
    disWhite:boolean 
    设置饼图是显示为圆环图还是饼图
    默认为 true
        ================= textlist =================
    textlist:booleadn
    设置饼图的维度你现实
    

    ===============地图控制==============
        ================= geo =================
    geo：array
    为地图上面那几个城市需要显示,如果没有geo的参数就是按照data显示为省份，有geo就是显示为
    默认值：null

 */
function attributes() {
    var bg = {}
    bg = {
        //背景
        bgmode: 'line',
        xyshow: { 'linenum': 2, close: true },
        ruleShow: { x: true, 'y': true },
        xytext: { x: 'middle', y: 'bottom' },
        top: 20,
        bottom: 60,
        xTextRotate: 30,
        xSetInterval: 16,
        range: [0.1, 0.1],
        //数据控制
        x: [],
        y: [],
        data: null,
        color: ['#ccc'],
        //图表全局控制
        ftype: 'normal',
        ctype: ['normal'],
        avage: 0,
        alinecolor: '#ccc',
        colorShow: ['#ccc'],
        backLineColor: '#ccc',
        format: function(num) {
            return num;
        },
        formatKdX: function(value) {
            return value
        },
        formatKdY: function(value) {
            return value
        },
        formatKdYA: function(value) {
            return value
        },
        weatherImages: [],
        mouseover: function() {},
        mouseout: function() {},
        mouseoverA: function() {},
        mouseoutA: function() {},
        click: function() {},
        rate: [],
        chainrate: [],
        //矩形图
        bgcolor: '#ccc',
        //线图
        fill: [true],
        circleShow: [true],
        lineColor: ['#ccc'],
        fillColor: ['#ccc'],
        iconImages: [],
        circleMouseEvent: false,
        //圆形图
        max: 0,
        angle: 0,
        disWhite: true,
        textlist: false,
        //地图
        geo: null
    }
    return bg
}

function svg(option) {

    var svgLib = {};
    var tool = require('./tool.js')

    svgLib = tool.optionMatch({
        width: 300,
        height: 300,
        el: 'svg',
        paper: null,
        'font': '100 12px "Microsoft Yahei","黑体","宋体","Helvetica", "Arial Unicode MS", Arial, sans-serif',
        'fontColor': '#4c4c4c',
        'lineColor': "#ccc"
    }, option)
    svgLib.paper = Raphael(document.getElementById(svgLib.el), svgLib.width, svgLib.height)

    svgLib.drawXk = function(data) {
        var option = tool.optionMatch(attributes(), data) // optionMatch(Baseoption, data)
        option.el = svgLib.el
        option.showArr = tool.initScreenData(svgLib, option)

        tool.avage(option)
        svgLib.data = tool.svgData(option, svgLib)
        nowDrawBg(option, svgLib.paper)
        if (option.twoW) {
            if (option.twoW.yA) {

                svgLib.yA = Tool.clone(svgLib.data)
                svgLib.yA.data = svgLib.data.data.yr
                    // //console.log(svgLib.data.ctype)
                svgLib.yA.ctype = svgLib.data.ctype.yr
                svgLib.yA.maxY = option.twoW.yA[option.twoW.yA.length - 1]
            }
            if (option.twoW.yB) {
                //svgLib.yB = svgLib.data.clone()
                svgLib.yB = Tool.clone(svgLib.data)
                svgLib.yB.data = svgLib.data.data.yl
                svgLib.yB.ctype = svgLib.data.ctype.yl
                svgLib.yB.maxY = option.twoW.yB[option.twoW.yB.length - 1]
            }
        }
        var xjg = 0
        var stp = 0
        var txtcenter = 'start'
        switch (option.xytext.x) {
            case 'left':
                xjg = option.showArr.w / (option.x.length - 1)
                stp = option.showArr.st
                txtcenter = 'start'
                break
            case 'middle':
                xjg = option.showArr.w / (option.x.length)
                stp = option.showArr.st + xjg / 2
                txtcenter = 'middle'
                break
            case 'right':
                break
        }
        if (option.ruleShow.x) {
            for (var i = 0; i < option.x.length; i++) {
                if (option.weatherImages[i]) {
                    svgLib.paper.image(option.weatherImages[i], stp + xjg * i - 15, 0, 30, 30)
                }
                if (!option.ruleShow.x) {
                    break
                }
                if (option.x.length > option.xSetInterval * 1.2) {
                    var nowshowpos = Math.ceil(option.x.length / option.xSetInterval)
                    if (i % nowshowpos == 0) {
                        svgLib.paper.text(stp + i * xjg, svgLib.height - 30, option.formatKdX(option.x[i])).attr({
                            font: svgLib.font,
                            fill: svgLib.fontColor,
                            'text-anchor': txtcenter
                        }).rotate(-option.xTextRotate);
                    }
                } else {
                    svgLib.paper.text(stp + i * xjg, svgLib.height - 30, option.formatKdX(option.x[i])).attr({
                        font: svgLib.font,
                        fill: svgLib.fontColor,
                        'text-anchor': txtcenter
                    }).rotate(-option.xTextRotate);
                }
            }
        }
        //y轴写值
        var yjg = 0
        var syt = 0
        var ylefttxt = option.xyshow.close ? 'start' : 'end'
        var yrighttxt = option.xyshow.close ? 'end' : 'start'
        switch (option.xytext.y) {
            case 'bottom':
                // ylength = option.y.length
                yjg = (option.showArr.h) / (option.y.length - 1)
                syt = (option.showArr.h) - 6 + option.top
                break
            case 'middle':
                // ylength = option.y.length + 1
                yjg = (option.showArr.h) / (option.y.length)
                syt = (option.showArr.h) - Math.floor(0.5 * (option.showArr.h) / (option.y.length)) + option.top
                break
            case 'top':
                break
        }
        if (option.ruleShow.y) {
            for (var j = 0; j < option.y.length; j++) {
                //if (option.twoW.yA) {}
                var posy = syt - j * yjg
                if (j == option.y.length - 1 && option.xytext.y == 'bottom') {
                    posy = option.top + 6
                }
                svgLib.paper.text((option.xyshow.close ? 0 : option.showArr.st - 10), posy, option.formatKdY(option.y[j])).attr({
                    font: svgLib.font,
                    fill: svgLib.fontColor,
                    'text-anchor': ylefttxt
                })
                if (option.twoW) {
                    //console.log((option.xyshow.close ? svgLib.width : option.showArr.et))
                    svgLib.paper.text((option.xyshow.close ? svgLib.width : option.showArr.et), posy, option.formatKdYA(option.twoW.yB[j])).attr({
                        font: svgLib.font,
                        fill: svgLib.fontColor,
                        'text-anchor': yrighttxt
                    })
                }
            }
        }
        if (option.rate.length != 0 || option.chainrate.length != 0) {
            var rateTemp = option.rate.concat(option.chainrate)
            rateTemp = tool.numberXY(rateTemp)
            var rcoordinate = Tool.clone(svgLib.data)
            console.log(rateTemp)
            rcoordinate.maxY = rateTemp[rateTemp.length - 1]
            rcoordinate.minY = rateTemp[0]
            if (rateTemp.length > option.rate.length && rateTemp.length > option.chainrate.length) {
                rcoordinate.ctype = 'more'
                rcoordinate.data = [option.chainrate, option.rate]
                rcoordinate.fill = [false, false]
            } else {
                rcoordinate.ctype = 'normal'
                rcoordinate.data = option.chainrate || option.rate
                rcoordinate.fill = [false]
            }
            svgLib.rateC = rcoordinate
        }

        if (option.avage > option.maxY) {
            svgLib.data.showArr.h = svgLib.data.showArr.h - yjg
            svgLib.data.top = option.top + yjg
            svgLib.data.y.pop()
        }
        //console.log(svgLib.data.top)
        /*if (option.twoW) {
            if (option.twoW.yA) {

                svgLib.yA = Tool.clone(svgLib.data)
                svgLib.yA.data = svgLib.data.data.yr
                    // //console.log(svgLib.data.ctype)
                svgLib.yA.ctype = svgLib.data.ctype.yr
                svgLib.yA.maxY = option.twoW.yA[option.twoW.yA.length - 1]
            }
            if (option.twoW.yB) {
                //svgLib.yB = svgLib.data.clone()
                svgLib.yB = Tool.clone(svgLib.data)
                svgLib.yB.data = svgLib.data.data.yl
                svgLib.yB.ctype = svgLib.data.ctype.yl
                svgLib.yB.maxY = option.twoW.yB[option.twoW.yB.length - 1]
            }
        }*/

    }
    svgLib.drawR = function(data) {
        var option = tool.optionMatch(attributes(), data)
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
        var lin = tool.numberXY(option.data)
        option.max = lin[lin.length - 1]
            ////console.log(option)
        svgLib.data = tool.svgData(option, svgLib)
    }
    svgLib.clear = function() {
        svgLib.paper.clear()
    }

    function nowDrawBg(option) {
        var showArr = tool.cloneArr(option.showArr)
        var st = option.xyshow.close ? 0 : showArr.st
        var width = option.xyshow.close ? svgLib.width : showArr.w
        var length = option.xytext.y == 'bottom' ? option.y.length : option.y.length + 1
        var jg = showArr.h / (length - 1)
        switch (option.bgmode) {
            case 'line':
                for (var i = 0; i < length; i++) {
                    svgLib.paper.rect(st, option.top + jg * i, width, 1).attr({
                        'fill': svgLib.lineColor,
                        'stroke-width': 0
                    })
                }
                for (var j = 0; j < option.xyshow.linenum; j++) {
                    svgLib.paper.rect(st + j * (width - 1), option.top, 1, showArr.h).attr({
                        'fill': svgLib.lineColor,
                        'stroke-width': 0
                    })
                }
                break
            case 'simple':
                svgLib.paper.rect(st, (showArr.h + option.top), width, 1).attr({
                    'fill': svgLib.lineColor,
                    'stroke-width': 0
                })
                break

        }
        return yInter = jg
    }


    return svgLib
}

module.exports = svg;