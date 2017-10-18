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
        /*switch (nowOption.ctype) {
             case 'normal':
                 var newInfo = drawInfo(nowOption)
                 var datasum = 0
                     //console.log(nowOption.data, '===========')
                 if (nowOption.yr) {
                     for (var j = 0; j < nowOption.y.length + 1; j++) {
                         if (nowOption.data[j]) {
                             datasum += nowOption.data[j] * 1
                         }
                     }
                 }
                 newInfo.jg = jg
                 newInfo.datasum = datasum
                 drawRectOne(nowOption, newInfo, true, 'normal', nowOption.color, true, [], jg)
                 break
             case 'add':
                 // //console.log('now')
                 var up = []
                 var zongzhi = []
                 for (var j = 0; j < nowOption.data[0].length; j++) {
                     var sunm = 0
                     for (var k = 0; k < nowOption.data.length; k++) {
                         sunm += nowOption.data[k][j]

                     }
                     zongzhi.push(sunm)
                 }
                 ////console.log(zongzhi)
                 for (var i = 0; i < nowOption.data.length; i++) {
                     var temp = {}
                     temp = Tool.clone(nowOption)
                     var aData = nowOption.data[i]
                         ////console.log(temp.top)
                     temp.data = aData.clone()
                         ////console.log(temp,up)
                     var newInfo = drawInfo(temp, up)
                         ////console.log(newInfo)
                     if (nowOption.maxX) {
                         up = newInfo.width
                     } else {
                         up = newInfo.y
                     }
                     newInfo.jg = jg
                     var xyq = (i == nowOption.data.length - 1)
                     drawRectOne(temp, newInfo, false, 'add', nowOption.color[i], xyq, zongzhi, jg)
                 }
                 break
             case 'more':
                 var jgg = Math.floor(nowOption.showArr.w / nowOption.x.length)
                 var yid = Math.floor(Math.floor(jgg * 0.2) / nowOption.data.length - 1)
                 yid = yid < 1 ? 1 : yid

                 for (var k = 0; k < nowOption.data.length; k++) {
                     //var temp = nowOption.clone()
                     var temp = {}
                     temp = Tool.clone(nowOption)
                     temp.data = nowOption.data[k]
                         ////console.log(up)
                     var newInfo = drawInfo(temp, null, [(yid + 1) * k, yid])
                     var datasum = 0
                     if (nowOption.yr) {
                         for (var j = 0; j < temp.y.length + 1; j++) {
                             if (temp.data[j]) {
                                 datasum += nowOption.data[j] * 1
                             }
                         }
                     }
                     newInfo.jg = jg
                     newInfo.datasum = datasum
                     var xyq = (k == nowOption.data.length - 1)
                     drawRectOne(temp, newInfo, false, 'more', nowOption.color[k], xyq, [], jg)
                 }
                 break
             case 'reverse':
                 for (var w = 0; w < nowOption.data.length; w++) {
                     var temp = {}
                     temp = Tool.clone(nowOption)
                     var aData = nowOption.data[w]
                         //console.log(aData)
                     temp.data = aData.clone()
                     var newInfo = drawInfo(temp, up)
                     if (nowOption.maxX) {
                         up = newInfo.width
                     } else {
                         up = newInfo.y
                     }
                     newInfo.jg = jg
                     var xyq = (w == nowOption.data.length - 1)
                         //console.log(temp.data)
                     drawRectOne(temp, newInfo, false, 'reverse', nowOption.color[w], true, zongzhi, jg)
                 }
                 break
         }
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
         }*/

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

/*function drawRectOne(nowOption, newInfo, an, texShow, color, mouseEvent, zongzhi, jg) {
    ////console.log('aaa')
    var lineS = nowOption.paper.set()
    var linA = []
        ////console.log(nowOption.data,'dsjdkjaskdjaksd')

    for (var i = 0; i < nowOption.data.length; i++) {
        var rec = nowOption.paper.rect(newInfo.x[i], newInfo.y[i], newInfo.width[i], newInfo.height[i]).attr({
            'fill': color[i],
            'stroke-width': 0
        })

        ////console.log(jg,'weuieuiue')
        if (mouseEvent && nowOption.maxX) {
            var rec1 = nowOption.paper.rect(nowOption.showArr.st, newInfo.y[i], nowOption.showArr.w, newInfo.height[i]).attr({
                fill: '#fff',
                'stroke-width': 1,
                'fill-opacity': 0,
                'opacity': 0
            }).data({ index: i, data: nowOption.data[i] })
            rec1.mouseover(function(e) {
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


        if (mouseEvent && nowOption.maxY) {
            var xPoss
            if (nowOption.ctype == "more") {
                xPoss = nowOption.showArr.st + Math.floor(nowOption.showArr.w / nowOption.data.length) / 2 + Math.floor(nowOption.showArr.w / nowOption.data.length) * i - 0.5
            } else {
                xPoss = newInfo.x[i] + newInfo.width[i] / 2
            }
            //console.log(nowOption.top - (jg ? jg : 0), jg, 'dsaddsdadsad', nowOption.top)
            var lindehjy = nowOption.top
            var hlin = nowOption.showArr.h
            if (nowOption.avage > nowOption.maxY) {
                lindehjy = nowOption.top - (jg ? jg : 0)
                hlin = nowOption.showArr.h + (jg ? jg : 0)
            }
            //console.log(nowOption.data[i])
            if (nowOption.ctype == "reverse") {
                hlin = nowOption.showArr.h / 2
                lindehjy = nowOption.data[i] > 0 ? nowOption.top : (nowOption.top + nowOption.showArr.h / 2)
            }

            var line = nowOption.paper.rect(xPoss, lindehjy, 1, hlin).attr({ fill: nowOption.backLineColor, 'stroke-width': 0 }).hide()
                //var rec1 = nowOption.paper.rect(xPoss - 15, lindehjy, 30, hlin).attr({
                //console.log(newInfo.width[i])
            var rec1 = nowOption.paper.rect(xPoss - Math.floor(nowOption.showArr.w / nowOption.data.length) / 2, lindehjy, Math.floor(nowOption.showArr.w / nowOption.data.length), hlin).attr({
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
        }
        if (an) {
            var anobj = nowOption.maxX ? { 'width': newInfo.width[i] } : { 'height': newInfo.height[i], y: newInfo.y[i] }
            var anobj1 = nowOption.maxX ? { 'width': 0 } : { 'height': 0, y: (nowOption.showArr.h + nowOption.top) }
            rec.attr(anobj1).animate(anobj, 1000)
        }

        if (nowOption.yr && nowOption.maxX && nowOption.ctype != 'add') {
            nowOption.paper.text(nowOption.showArr.st + nowOption.showArr.w - 5, nowOption.showArr.h + nowOption.top - Math.floor(i * newInfo.jg + 0.5 * newInfo.jg), Math.floor(100 * nowOption.data[i] / newInfo.datasum) + '%').attr({
                font: nowOption.font,
                fill: nowOption.fontColor,
                'text-anchor': 'end'
            })
        }
        switch (texShow) {
            case "normal":
                var textXY = nowOption.maxX ? { x: newInfo.x[i] + newInfo.width[i] + 10, y: newInfo.y[i] + newInfo.height[i] / 2, algin: 'start' } : { x: newInfo.x[i] + newInfo.width[i] / 2, y: newInfo.y[i] - 15, algin: 'middle' }
                var txt = nowOption.paper.text(textXY.x, textXY.y, nowOption.format(nowOption.data[i], i)).attr({
                    font: nowOption.font,
                    fill: nowOption.colorShow[i],
                    'text-anchor': textXY.algin
                });
                break
            case "add":
                if (mouseEvent) {
                    var textXY = nowOption.maxX ? { x: newInfo.x[i] + newInfo.width[i] + 10, y: newInfo.y[i] + newInfo.height[i] / 2, algin: 'start' } : { x: newInfo.x[i] + newInfo.width[i] / 2, y: newInfo.y[i] - 10, algin: 'middle' }
                    var txt = nowOption.paper.text(textXY.x, textXY.y, nowOption.format(zongzhi[i], i)).attr({
                        font: nowOption.font,
                        fill: nowOption.colorShow[i],
                        'text-anchor': textXY.algin
                    });
                }
                break
            case "reverse":
                //var textXY = nowOption.maxX ? { x: newInfo.x[i] + newInfo.width[i] + 10, y: newInfo.y[i] + newInfo.height[i] / 2, algin: 'start' } : { x: newInfo.x[i] + newInfo.width[i] / 2, y: newInfo.y[i] - 15, algin: 'middle' }
                var textXY
                if (nowOption.maxX) {
                    textXY = { x: newInfo.x[i] + newInfo.width[i] + 10, y: newInfo.y[i] + newInfo.height[i] / 2, algin: 'start' }
                } else {
                    textXY = nowOption.data[i] > 0 ? { x: newInfo.x[i] + newInfo.width[i] / 2, y: newInfo.y[i] - 15, algin: 'middle' } : { x: newInfo.x[i] + newInfo.width[i] / 2, y: newInfo.y[i] + newInfo.height[i] + 15, algin: 'middle' }
                }
                var txt = nowOption.paper.text(textXY.x, textXY.y, nowOption.format(nowOption.data[i], i)).attr({
                    font: nowOption.font,
                    fill: nowOption.colorShow[i],
                    'text-anchor': textXY.algin
                });
                break
        }
        if (an) {
            var txtobj = nowOption.maxX ? { x: nowOption.showArr.st } : { y: nowOption.showArr.h + nowOption.top }
            var txtobj1 = nowOption.maxX ? { x: textXY.x } : { y: textXY.y }
            txt.attr(txtobj).animate(txtobj1, 1000)
        }
    }
    lineS.toBack()
}

function drawInfo(nowOption, up, left) {
    var xAA = []
    var yAA = []
    var w = []
    var h = []
    var jg
        ////console.log(nowOption.maxX,'maxX',nowOption.y.length)
    if (nowOption.maxX != 0 && nowOption.maxX) {
        jg = Math.floor(nowOption.showArr.h / nowOption.y.length)
        for (var i = 0; i < nowOption.data.length; i++) {
            ////console.log(up[i])
            xAA.push(nowOption.showArr.st + ((up && up[i]) ? up[i] : 0))
            switch (nowOption.xytext.y) {
                case "top":
                    yAA.push((nowOption.showArr.h + nowOption.top) - i * jg - jg)
                    break
                case "middle":
                    yAA.push((nowOption.showArr.h + nowOption.top) - i * jg - jg * 0.7)
                    break
                case "bottom":
                    yAA.push((nowOption.showArr.h + nowOption.top) - i * jg * 0.4)
                    break
            }
            //yAA.push((nowOption.showArr.h + nowOption.top) - i * jg - jg * 0.7)
            w.push(Math.floor(nowOption.showArr.w * nowOption.data[i] / nowOption.maxX))
            h.push(Math.floor(jg * 0.4))
        }
        return { x: xAA, y: yAA, width: w, height: h }
    }
    //console.log(nowOption.maxY)
    if (nowOption.maxY != 0 && nowOption.maxY) {
        jg = Math.floor(nowOption.showArr.w / nowOption.x.length)
            ////console.log(jg, '====', nowOption.data)
        for (var j = 0; j < nowOption.data.length; j++) {
            switch (nowOption.xytext.x) {
                case 'left':
                    xAA.push(nowOption.showArr.st + j * jg)
                    break
                case 'middle':
                    xAA.push(nowOption.showArr.st + j * jg + jg * 0.4 + (left ? (left[0] ? left[0] : 0) : 0))

                    break
                case 'right':
                    xAA.push(nowOption.showArr.st + j * jg - jg * 0.2)
                    break
            }
            //console.log(nowOption.minY)
            if (nowOption.minY >= 0) {
                var tempy = ((up && up[j]) ? up[j] : (nowOption.showArr.h + nowOption.top)) - Math.floor(nowOption.showArr.h * nowOption.data[j] / nowOption.maxY)
                    // //console.log(tempy, 'aaa',Math.floor(nowOption.showArr.h * nowOption.data[j] / nowOption.maxY))
                yAA.push(tempy)
                h.push(Math.floor(nowOption.showArr.h * nowOption.data[j] / nowOption.maxY))
            } else {
                var ju = nowOption.data[j] > 0 ? Math.floor(nowOption.showArr.h / 2 * nowOption.data[j] / nowOption.maxY) : Math.floor(nowOption.showArr.h / 2 * nowOption.data[j] / nowOption.minY)
                var tempy
                if (up && up[j]) {
                    tempy = up[j] - ju
                } else {
                    tempy = nowOption.data[j] > 0 ? ((nowOption.showArr.h / 2 + nowOption.top) - ju) : (nowOption.showArr.h / 2 + nowOption.top)
                }
                //var tempy = ((up && up[j]) ? up[j] : (nowOption.showArr.h/2 + nowOption.top)) -ju
                yAA.push(tempy)
                h.push(Math.floor(nowOption.showArr.h / 2 * Math.abs(nowOption.data[j]) / nowOption.maxY))
            }
            w.push(left ? (left[1] ? left[1] : 0) : Math.floor(jg * 0.2))

        }
        ////console.log(yAA,'aaaaaaaaaaaaaaa')
        return { x: xAA, y: yAA, width: w, height: h }
    }
}*/

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