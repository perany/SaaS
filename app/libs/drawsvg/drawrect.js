var drawRec = {
    drawRecX: function(nowOption) {
        var jg
        switch (nowOption.xytext.y) {
            case 'bottom':
                jg = Math.floor(nowOption.showArr.h / (nowOption.y.length - 1))
                break
            case 'middle':
                jg = Math.floor(nowOption.showArr.h / nowOption.y.length)
                break
        }

        var xjg = Math.floor(nowOption.showArr.w / nowOption.x.length)
        var rw = Math.floor(xjg * 0.2) > 1 ? Math.floor(xjg * 0.2) : 1

        switch (nowOption.xytext.x) {
            case 'left':
                st = nowOption.showArr.st
                break
            case 'middle':
                st = nowOption.showArr.st + xjg / 2
                break
        }
        var maxR = 0
        if (nowOption.maxX != 0 && nowOption.maxX) {
            maxR = nowOption.maxX - nowOption.minX
        }
        if (nowOption.maxY != 0 && nowOption.maxY) {
            maxR = nowOption.maxY - nowOption.minY
        }
        if (nowOption.yr) {
            for (var j = 0; j < nowOption.y.length + 1; j++) {
                if (nowOption.data[j]) {
                    // datasum += nowOption.data[j] * 1
                }
            }
        }
        var lineS = nowOption.paper.set()
        var linA = []
            //console.log(maxR, '=======')
            //var jg = Math.floor(nowOption.showArr.h / (nowOption.y.length-1))
            //画x轴一个单元格的矩形
        for (var i = 0; i < nowOption.data.length; i++) {
            //console.log(i)
            drawRectOne(nowOption, { jg: jg, maxR: maxR, i: i, xjg: xjg, rw: rw, st: st })
            if (nowOption.maxX) {
                var rec1 = nowOption.paper.rect(nowOption.showArr.st, nowOption.showArr.h + nowOption.showArr.top, nowOption.showArr.w, jg).attr({
                    fill: '#fff',
                    'stroke-width': 1,
                    'fill-opacity': 0,
                    'opacity': 0
                }).data({ index: i, data: nowOption.data[i] }).mouseover(function(e) {
                    var oxX = getOffset(e).x
                    var oxY = getOffset(e).y
                    nowOption.mouseover({
                        'pos': this.getBBox(),
                        'index': this.data('index'),
                        'mousepos': {
                            x: oxX,
                            y: oxY
                        }
                    })
                }).mouseout(function() {
                    nowOption.mouseout()
                }).click(function() {
                    var dat = { index: this.data('index'), data: this.data('data') }
                    nowOption.click(dat)
                })
            }
            if (nowOption.maxY) {
                var lindehjy = nowOption.top
                var hlin = nowOption.showArr.h
                if (nowOption.avage > nowOption.maxY) {
                    lindehjy = nowOption.top - (jg ? jg : 0)
                    hlin = nowOption.showArr.h + (jg ? jg : 0)
                }
                if (nowOption.ctype == "reverse") {
                    hlin = nowOption.showArr.h / 2
                    lindehjy = nowOption.data[i] > 0 ? nowOption.top : (nowOption.top + nowOption.showArr.h / 2)
                }
                var line = nowOption.paper.rect(st + xjg * i, lindehjy, 1, hlin).attr({ fill: nowOption.backLineColor, 'stroke-width': 0 }).hide()
                var rec1 = nowOption.paper.rect(st + xjg * i - Math.floor(nowOption.showArr.w / nowOption.data.length) / 2, lindehjy, Math.floor(nowOption.showArr.w / nowOption.data.length), hlin).attr({
                    fill: '#fff',
                    'stroke-width': 1,
                    'fill-opacity': 0,
                    'opacity': 0
                }).data({ index: i, data: nowOption.data[i] })
                lineS.push(line)
                linA.push(line)
                rec1.mouseover(function(e) {
                    var oxX = getOffset(e).x
                    var oxY = getOffset(e).y
                    linA[this.data('index')].show()
                    nowOption.mouseover({
                        'pos': this.getBBox(),
                        'index': this.data('index'),
                        'mousepos': {
                            x: oxX,
                            y: oxY
                        }
                    })
                }).mouseout(function() {
                    linA[this.data('index')].hide()
                    nowOption.mouseout()
                }).click(function() {
                    var dat = { index: this.data('index'), data: this.data('data') }
                    nowOption.click(dat)
                })
                lineS.toBack()
            }
        }

        //平均值
        if (nowOption.avage) {
            if (nowOption.avage > nowOption.maxY) {
                nowy = Math.floor(nowOption.top - jg * 0.9)
            } else {
                nowy = Math.floor(nowOption.top + nowOption.showArr.h * (1 - nowOption.avage / nowOption.maxY))
            }
            nowOption.paper.rect(nowOption.showArr.st, nowy, nowOption.width, 1).attr({
                fill: nowOption.alinecolor,
                'stroke-width': 0
            })
            nowOption.paper.rect(nowOption.showArr.st, nowy, nowOption.width, 1).attr({
                fill: '#000',
                opacity: 0,
                'fill-opacity': 0,
                'stroke-width': 0
            }).data({
                data: nowOption.avage
            }).mouseover(function(e) {
                var oxX = getOffset(e).x
                var oxY = getOffset(e).y
                nowOption.mouseoverA({
                    'pos': this.getBBox(),
                    'index': this.data('data'),
                    'mousepos': {
                        x: oxX,
                        y: oxY
                    }
                })
            }).mouseout(function(e) {
                nowOption.mouseout()
            })
        }

        return

    },
    drawPercentageY: function(nowOption) {
        // nowOption.y = [0, 25, 50, 75, 100]
        var xjg = Math.floor(nowOption.width * (1 - nowOption.range[0] - nowOption.range[1])) / (nowOption.x.length)
        var dut = Math.floor(xjg * 0.2)
        var recH = Math.floor(dut * 0.1)
        var fajg = recH * 2
        var geshu = Math.round(nowOption.showArr.h / fajg)
        var piany = 0
        if (nowOption.avage > nowOption.maxY) {
            geshu = Math.round((nowOption.showArr.h + nowOption.showArr.h / (nowOption.y.length - 1)) / fajg)
            piany = nowOption.showArr.h / (nowOption.y.length - 1)
        }
        for (var i = 0; i < nowOption.x.length; i++) {
            var txtpy
            for (var k = 0; k < geshu + 1; k++) {
                var px = Math.floor(nowOption.width * nowOption.range[0]) + (xjg - dut) / 2 + xjg * i
                var py = nowOption.showArr.h - (recH * 2) * k - recH + nowOption.top

                var height = py < (nowOption.showArr.h + nowOption.top) ? recH : recH - (py - nowOption.showArr.h - nowOption.top)
                height = py < nowOption.top - piany ? recH - (nowOption.top - piany - py) : recH
                height = height < 0 ? 0 : height
                py = py < nowOption.top - piany ? nowOption.top - piany : py
                var total = nowOption.showArr.h * nowOption.data[i] / nowOption.maxY
                    // console.log(total, '======', nowOption.data[i], nowOption.maxY)
                var height1 = 0


                nowOption.paper.rect(px, py, dut, height, recH).attr({
                    'fill': nowOption.bgcolor,
                    'stroke-width': 0
                })
                if (k < Math.floor(total / fajg)) {
                    height1 = recH
                }

                if (k == Math.floor(total / fajg)) {
                    height1 = Math.floor(total % fajg)
                    height1 = height1 > recH ? Math.floor(height1 * height1 / fajg) : height1
                    py = py + (recH - height1)
                    txtpy = py
                }
                if (height1 > 0) {
                    nowOption.paper.rect(px, py, dut, height1, recH).attr({
                        'fill': nowOption.color[i],
                        'stroke-width': 0
                    })
                }
                //return
            }
            nowOption.paper.text(px + dut / 2, txtpy - 12, nowOption.format(nowOption.data[i], i)).attr({
                font: nowOption.font,
                fill: nowOption.color[i]
            });
            nowOption.paper.rect(px, 0, dut, (nowOption.top + nowOption.showArr.h)).attr({
                fill: '#fff',
                'stroke-width': 1,
                'fill-opacity': 0,
                'opacity': 0
            }).data({ index: i }).mouseover(function(e) {
                var oxX = getOffset(e).x
                var oxY = getOffset(e).y
                nowOption.mouseover({
                    'pos': this.getBBox(),
                    'index': this.data('index'),
                    'mousepos': {
                        x: oxX,
                        y: oxY
                    }
                })
            }).mouseout(function() {
                nowOption.mouseout()
            })
        }
        if (nowOption.avage) {
            if (nowOption.avage > nowOption.maxY) {
                nowy = Math.floor(nowOption.top - piany * 0.9)
            } else {
                nowy = Math.floor(nowOption.top - nowOption.showArr.h * (1 - nowOption.avage / nowOption.maxY))
            }
            nowOption.paper.rect(nowOption.showArr.st, nowy, nowOption.width, 1).attr({
                fill: nowOption.alinecolor,
                'stroke-width': 0
            })
            nowOption.paper.rect(nowOption.showArr.st, nowy, nowOption.width, 1).attr({
                fill: '#000',
                opacity: 0,
                'fill-opacity': 0,
                'stroke-width': 0
            }).data({
                data: nowOption.avage
            }).mouseover(function(e) {
                var oxX = getOffset(e).x
                var oxY = getOffset(e).y
                nowOption.mouseoverA({
                    'pos': this.getBBox(),
                    'index': this.data('data'),
                    'mousepos': {
                        x: oxX,
                        y: oxY
                    }
                })
            }).mouseout(function(e) {
                nowOption.mouseout()
            })
        }
    }
}

function drawRectOne(nowOption, par) {
    //i, true, jg
    //{ jg: jg, maxR: maxR, i: i, xjg: xjg, rw: rw, st: st }

    var tempH = 0
    var totalH = nowOption.xytext.y == 'middle' ? (nowOption.showArr.h - par.jg / 2) : nowOption.showArr.h
    switch (nowOption.ctype) {
        case 'normal':
            if (nowOption.maxY) {
                tempH = totalH * nowOption.data[par.i] / par.maxR
                nowOption.paper.rect(par.st + par.i * par.xjg - par.rw / 2, nowOption.showArr.h + nowOption.top - tempH, par.rw, tempH).attr({
                    'fill': nowOption.color[par.i],
                    'stroke-width': 0
                })
                console.log('///////////////////','wwwwwwwwwwwwwwww')
                nowOption.paper.text(par.st + par.i * par.xjg , nowOption.showArr.h + nowOption.top - tempH-12, nowOption.format(nowOption.data[par.i], par.i)).attr({
                    'fill': nowOption.color[par.i],
                    font: nowOption.font,
                    'text-anchor': "middle"
                })
            } else {
                totalH = nowOption.xytext.x == 'middle' ? (nowOption.showArr.w - par.xjg / 2) : nowOption.showArr.w
                tempH = totalH * nowOption.data[par.i] / par.maxR
                var rw = Math.floor(par.jg * 0.4) < 1 ? 1 : Math.floor(par.jg * 0.4)
                nowOption.paper.rect(Math.floor(nowOption.showArr.st), nowOption.showArr.h + nowOption.top - rw / 2 - par.jg / 2 - par.jg * par.i, tempH, rw).attr({
                    'fill': nowOption.color[par.i],
                    'stroke-width': 0
                })
                var textx = Math.floor(nowOption.showArr.st) + tempH + 10
                var alignText = "start"
                if (nowOption.yr) {
                    textx = Math.floor(nowOption.showArr.st) + nowOption.showArr.w
                    alignText = "end"
                }
                //console.log('aaaaa',nowOption.data[par.i])
                nowOption.paper.text(textx, nowOption.showArr.h + nowOption.top - rw / 2 - 12 - par.jg * par.i, nowOption.format(nowOption.data[par.i], par.i)).attr({
                    'fill': nowOption.color[par.i],
                    font: nowOption.font,
                    'text-anchor': alignText
                })
            }

            break
        case 'add':
            var stB = nowOption.showArr.h + nowOption.top
            var ytB = nowOption.showArr.st
            for (var j = 0; j < nowOption.data[par.i].length; j++) {
                tempH = totalH * nowOption.data[par.i][j] / par.maxR
                if (nowOption.maxY) {
                    nowOption.paper.rect(par.st + par.i * par.xjg - par.rw / 2, stB - tempH, par.rw, tempH).attr({
                        'fill': nowOption.color[par.i][j],
                        'stroke-width': 0
                    })
                    stB = stB - tempH
                } else {
                    var rw = Math.floor(par.jg * 0.2) < 1 ? 1 : Math.floor(par.jg * 0.2)
                    nowOption.paper.rect(ytB, nowOption.showArr.h + nowOption.top - rw / 2 - par.jg / 2 - par.jg * par.i, tempH, rw).attr({
                        'fill': nowOption.color[par.i][j],
                        'stroke-width': 0
                    })
                    ytB = ytB + tempH
                }
            }
            break
        case 'more':
            var totalK = nowOption.data[par.i].length * par.rw + (nowOption.data[par.i].length - 1) * 2
            for (var i = 0; i < nowOption.data[par.i].length; i++) {
                tempH = totalH * nowOption.data[par.i][i] / par.maxR
                if (nowOption.maxY) {
                    var zhixingk = i * par.rw + (i > 0 ? i * 2 : 0)
                        //tempH = totalH * nowOption.data[par.i][i] / par.maxR
                        //console.log(',,,,,,', par);
                    nowOption.paper.rect(par.st + par.i * par.xjg - totalK / 2 + zhixingk, nowOption.showArr.h + nowOption.top - tempH, par.rw, tempH).attr({
                        'fill': nowOption.color[par.i][i],
                        'stroke-width': 0
                    })
                } else {
                    var rw = Math.floor(par.jg * 0.2) < 1 ? 1 : Math.floor(par.jg * 0.2)
                    var totalK = nowOption.data[par.i].length * rw + (nowOption.data[par.i].length - 1) * 2
                    var zhixingk = i * rw + (i > 0 ? i * 2 : 0)
                    var py = nowOption.showArr.h + nowOption.top - par.jg / 2 - par.jg * par.i - totalK / 2 + zhixingk

                    nowOption.paper.rect(nowOption.showArr.st, py, tempH, rw).attr({
                        'fill': nowOption.color[par.i][j],
                        'stroke-width': 0
                    })
                }
            }
            break
        case 'reverse':
            var stB = nowOption.showArr.h / 2 + nowOption.showArr.top
            for (var w = 0; w < nowOption.data[par.i].length; w++) {
                tempH = totalH * nowOption.data[par.i][w] / par.maxR
                nowOption.paper.rect(par.st + par.i * par.xjg - par.rw / 2, stB, par.rw, tempH).attr({
                    'fill': nowOption.color[par.i][w],
                    'stroke-width': 0
                })
            }
            break
    }
}

function getOffset(e) {
    var offsetCoord = { x: e.offsetX, y: e.offsetY }
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        //return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        offsetCoord.x = e.layerX
        offsetCoord.y = e.layerY
            //return ;
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1) {
        //return "Chrome";
    }
    if (userAgent.indexOf("Safari") > -1) {
        //return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        //return "IE";
    }; //判断是否IE浏览器
    return offsetCoord;
}
module.exports = drawRec;