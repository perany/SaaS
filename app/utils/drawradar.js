var DrawRadar = {
    drawRadar: function(nowOption) {
        //console.log(nowOption)
        //var nowOption = optionMatch(BaseOption, option)
        var r = nowOption.width > nowOption.height ? nowOption.height : nowOption.width
        var pathStr = ''
        var yuandian = nowOption.paper.set()
            //svgBG.drawR(svgLib, nowOption)
        for (var j = 0; j < nowOption.x.length; j++) {
            var angle = -90 + j * (360 / nowOption.x.length)
            var dataValue = nowOption.data[j] ? nowOption.data[j] : 0
            var dataR = Math.floor(r * 0.4 * dataValue / nowOption.max)
            nowOption.paper.rect(nowOption.width / 2, nowOption.height / 2, dataR, 1).attr({
                'fill': nowOption.color[0],
                'stroke-width': 0
            }).rotate(angle, nowOption.width / 2, nowOption.height / 2)
            var px = Math.floor(nowOption.width / 2 + dataR * Math.cos(Math.PI * angle / 180))
            var py = Math.floor(nowOption.height / 2 + dataR * Math.sin(Math.PI * angle / 180))
            var xiaodian = nowOption.paper.circle(px, py, 4).attr({
                'fill': "#fff",
                "stroke": nowOption.color[0]
            }).data({
                "data": dataValue,
                "index": j
            }).mouseover(function(e) {
                var oxX = getOffset(e).x
                var oxY = getOffset(e).y
                nowOption.mouseover({
                    'data': this.data('data'),
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
            if (pathStr) {
                pathStr = pathStr + "L" + px + "," + py
            } else {
                pathStr = "M" + px + "," + py
            }
            yuandian.push(xiaodian)
        }
        nowOption.paper.path(pathStr).attr({
            'fill': nowOption.color[0],
            'opacity': 0.5,
            "stroke-width": 0
        })
        yuandian.toFront()
        yuandian[0].toFront()
    },
    drawCicle: function(nowOption) {
        var lr = nowOption.width > nowOption.height ? (nowOption.height - 80) / 2 : (nowOption.width - 80) / 2
        var nr = lr * 0.85
        var yuanxin = { x: nowOption.width / 2, y: nowOption.height / 2 }
        var st = 0
            // nowOption.paper.circle(yuanxin.x,yuanxin.y,lr)
        var sum = eval(nowOption.data.join('+'));
        if (sum == 0) {

            return
        }
        var textS = nowOption.paper.set()
        for (var i = 0; i < nowOption.data.length; i++) {
            var pre = (360 * nowOption.data[i] / sum)
                //console.log(pre)
            if (nowOption.data[i] == sum) {
                nowOption.paper.circle(yuanxin.x, yuanxin.y, lr).attr({ fill: nowOption.color[i], 'stroke': '#fff' }).data({
                    data: Math.floor(100 * pre / 360),
                    index: i
                }).mouseover(function(e) {
                    var oxX = getOffset(e).x
                    var oxY = getOffset(e).y
                    nowOption.mouseover({
                        'data': this.data('data'),
                        'pos': this.getBBox(),
                        'index': this.data('index'),
                        'mousepos': {
                            x: oxX,
                            y: oxY
                        }
                    })
                }).mouseout(function(e) {
                    //lineArr[this.data('index')].hide()
                    nowOption.mouseout()
                })
            } else {
                var patch = 'M' + (yuanxin.x - lr) + ',' + yuanxin.y + 'A' + lr + ',' + lr + ' 0 ' + ((pre > 180) ? 1 : 0) + ",1 " + (yuanxin.x - lr * Math.cos(Math.PI * pre / 180)) + ',' + (yuanxin.y - lr * Math.sin(Math.PI * pre / 180))
                patch += "L" + yuanxin.x + ',' + yuanxin.y + ' z'
                    //console.log(st+pre/2)

                nowOption.paper.path(patch).attr({ fill: nowOption.color[i], 'stroke': '#fff' }).rotate(st, yuanxin.x, yuanxin.y).data({
                    data: Math.floor(100 * pre / 360),
                    index: i
                }).mouseover(function(e) {
                    var oxX = getOffset(e).x
                    var oxY = getOffset(e).y
                    nowOption.mouseover({
                        'data': this.data('data'),
                        'pos': this.getBBox(),
                        'index': this.data('index'),
                        'mousepos': {
                            x: oxX,
                            y: oxY
                        }
                    })
                }).mouseout(function(e) {
                    //lineArr[this.data('index')].hide()
                    nowOption.mouseout()
                })
            }
            var sddddt = { x: (yuanxin.x - lr * Math.cos(Math.PI * (st + pre / 2) / 180)), y: (yuanxin.y - lr * Math.sin(Math.PI * (st + pre / 2) / 180)) }
            var teshux = 'M' + sddddt.x + "," + sddddt.y
            var nowHUd = st + pre / 2
            var ysnshen = 120
            var txtx = {}
            if (nowHUd <= 90) {
                txtx = { x: sddddt.x - (ysnshen + 20) / 2, y: sddddt.y - 32, al: 'end' }
                teshux += "L" + (sddddt.x - 20) + ',' + (sddddt.y - 20) + "L" + (sddddt.x - ysnshen) + ',' + (sddddt.y - 20)
            }
            if (nowHUd <= 180 && nowHUd > 90) {
                txtx = { x: sddddt.x + (ysnshen + 20) / 2, y: sddddt.y - 32, al: 'start' }
                teshux += "L" + (sddddt.x + 20) + ',' + (sddddt.y - 20) + "L" + (sddddt.x + ysnshen) + ',' + (sddddt.y - 20)
            }
            if (nowHUd <= 270 && nowHUd > 180) {
                txtx = { x: sddddt.x + (ysnshen + 20) / 2, y: sddddt.y + 30, al: 'start' }
                teshux += "L" + (sddddt.x + 20) + ',' + (sddddt.y + 20) + "L" + (sddddt.x + ysnshen) + ',' + (sddddt.y + 20)
            }
            if (nowHUd > 270) {
                txtx = { x: sddddt.x - (ysnshen + 20) / 2, y: sddddt.y + 30, al: 'end' }
                teshux += "L" + (sddddt.x - 20) + ',' + (sddddt.y + 20) + "L" + (sddddt.x - ysnshen) + ',' + (sddddt.y + 20)
            }
            nowOption.paper.path(teshux).attr({ 'stroke-width': 1, 'stroke': nowOption.color[i] })
            nowOption.paper.text(txtx.x, txtx.y, nowOption.formatKdX(nowOption.x[i])).attr({
                font: nowOption.font,
                fill: nowOption.fontColor[i],
                'text-anchor': 'middle'
            });
            var text = nowOption.paper.text((yuanxin.x - nr * 0.8 * Math.cos(Math.PI * (st + pre / 2) / 180)), (yuanxin.y - nr *0.8 * Math.sin(Math.PI * (st + pre / 2) / 180)), nowOption.format(nowOption.data[i])).attr({
                font: nowOption.font,
                fill: nowOption.fontColor[i],
                'text-anchor': 'middle'
            });
            textS.push(text)
            st += pre
                //return
        }
        nowOption.paper.circle(yuanxin.x, yuanxin.y, nr).attr({ fill: '#fff', 'stroke-width': 0 })
        textS.toFront()
    },
    drawBubble: function(nowOption) {
        var jg
        switch (nowOption.xytext[1]) {
            case 'bottom':
                jg = Math.floor(nowOption.showArr.h / (nowOption.y.length - 1))
                break
            case 'middle':
                jg = Math.floor(nowOption.showArr.h / nowOption.y.length)
                break
        }

        switch (nowOption.ctype) {
            case 'normal':
                var newInfo = {}
                var datasum
                if (nowOption.yr) {
                    datasum = eval(nowOption.data[j].join('+'))
                }
                newInfo.jg = jg
                newInfo.datasum = datasum
                drawCircleOne(nowOption, newInfo, true)
                break
            case 'more':
                // var jgg = Math.floor(nowOption.showArr.w / nowOption.x.length)
                //var yid = Math.floor(Math.floor(jgg * 0.2) / nowOption.data.length - 1)
                // yid = yid < 1 ? 1 : yid
                for (var k = 0; k < nowOption.data.length; k++) {
                    //var temp = nowOption.clone()
                    var temp = {}
                    temp = Tool.clone(nowOption)
                    temp.data = nowOption.data[k]
                    temp.color = nowOption.color[k]
                        //console.log(up)
                    var newInfo = {}
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
                    drawCircleOne(temp, newInfo, xyq)
                }
                break

        }
        if (nowOption.avage) {
            //console.log('djdsk')
            if (nowOption.avage > nowOption.maxY) {
                nowy = Math.floor(nowOption.top - jg * 0.9)
            } else {
                nowy = Math.floor(nowOption.top - nowOption.showArr.h * (1 - nowOption.avage / nowOption.maxY))
            }
            nowOption.paper.rect(nowOption.showArr.st, nowy, nowOption.width, 1).attr({
                fill: nowOption.alinecolor,
                'stroke-width': 0
            })
            nowOption.paper.rect(nowOption.showArr.st, nowy, nowOption.width, 1).attr({
                fill: nowOption.aline,
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
    },
    drawBn: function(nowOption) {
        var wi_g = 7
        var lr = nowOption.width > nowOption.height ? (nowOption.height - 20) / 2 : (nowOption.width - 20) / 2
        var yuanxin = { x: nowOption.width / 2, y: nowOption.height / 2 }
        var datasum = eval(nowOption.data.join('+'))
        for (var i = 0; i < nowOption.data.length; i++) {

            var pre = Math.floor((nowOption.data[i] / datasum) * 360)
            var bs = pre > 180 ? 1 : 0;
            pre = (pre==360)?pre-1:pre;
            pre = (90 - pre)
            var patch = 'M' + yuanxin.x + ',' + (yuanxin.y - lr) + 'A' + lr + ',' + lr + ' 0 ' + bs + ',1 ' + (yuanxin.x + lr * Math.cos(Math.PI * pre / 180)) + ',' + (yuanxin.y - lr * Math.sin(Math.PI * pre / 180))
            var hundu = nowOption.paper.path(patch).attr({
                'stroke': nowOption.color[i],
                'stroke-width': wi_g
            }).scale(-1, 1, yuanxin.x, yuanxin.y).data({ index: i })
            switch (nowOption.angle) {
                case 0:
                    hundu.rotate(0)
                    nowOption.paper.rect(yuanxin.x + wi_g, yuanxin.y - lr - wi_g / 2, wi_g, wi_g).attr({ fill: nowOption.color[i], 'stroke-width': 0 })
                    break
                case 1:
                    hundu.rotate(180, yuanxin.x, yuanxin.y)
                    nowOption.paper.rect(yuanxin.x - wi_g * 2, yuanxin.y + lr - wi_g / 2, wi_g, wi_g).attr({ fill: nowOption.color[i], 'stroke-width': 0 })
                    break
            }
            hundu.mouseover(function(e) {
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
            }).mouseout(function(e) {
                nowOption.mouseout()
            })

            lr = lr - wi_g - 5
        }

    }
}

function drawCircleOne(nowOption, newInfo, mouse) {
    var max = nowOption.maxY
    var st
    switch (nowOption.xytext[0]) {
        case 'left':
            st = nowOption.showArr.st
            break
        case 'middle':
            st = nowOption.showArr.st + 0.5 * nowOption.showArr.w / (nowOption.x.length)
            break
    }
    var lin = nowOption.paper.set()
    var lineArr = []


    for (var i = 0; i < nowOption.data.length; i++) {
        var pre = nowOption.data[i] / max
        var h = nowOption.showArr.h + nowOption.top
        switch (nowOption.xytext[1]) {
            case 'bottom':
                h -= Math.floor(nowOption.showArr.h * pre)
                break
            case 'middle':
                h -= Math.floor((nowOption.showArr.h - newInfo.jg) * pre)
                break
        }
        nowOption.paper.circle(st + i * (nowOption.showArr.w / nowOption.x.length), h, Math.floor(0.5 * newInfo.jg * pre)).attr({
            fill: nowOption.color[i],
            'stroke-width': 0,
            'fill-opacity': 0.5
        })
        if (mouse) {
            var ttNew = nowOption.top
            if (nowOption.avage > nowOption.maxY) {
                ttNew = ttNew - newInfo.jg
            }
            var line = nowOption.paper.rect(st + i * (nowOption.showArr.w / nowOption.x.length), ttNew, 1, nowOption.showArr.h + nowOption.top - ttNew).attr({ 'stroke-width': 0, fill: nowOption.backLineColor }).hide()
            lineArr.push(line)
            lin.push(line)
            var rect = nowOption.paper.rect(st + i * (nowOption.showArr.w / nowOption.x.length) - 3, ttNew, 6, nowOption.showArr.h + nowOption.top - ttNew).attr({
                fill: '#fff',
                'stroke-width': 1,
                'fill-opacity': 0,
                'opacity': 0
            }).data({
                index: i
            }).mouseover(function(e) {
                lineArr[this.data('index')].show()
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
            }).mouseout(function(e) {
                lineArr[this.data('index')].hide()
                nowOption.mouseout()
            })
        }
    }

    lin.toBack()
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
module.exports = DrawRadar;
