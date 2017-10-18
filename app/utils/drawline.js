var drawLine = {
    drawLine: function(nowOption) {
        if (nowOption.ctype == 'more') {
            for (var i = 0; i < nowOption.data.length; i++) {
                // var temp = nowOption.clone()
                var temp = Tool.clone(nowOption)
                temp.lineColor = nowOption.lineColor[i]
                temp.data = nowOption.data[i]
                temp.fillColor = nowOption.fillColor[i]
                temp.modulus = nowOption.modulus[i]
                    //temp.fill = nowOption.fill[i]
                temp.modulusRate = nowOption.modulusRate[i] ? nowOption.modulusRate[i] : 0.45
                if (nowOption.iconImages[i]) {
                    temp.iconImages = nowOption.iconImages[i]
                }
                var xyq = (i == nowOption.data.length - 1)
                drawSingleLine(temp, xyq)
            }
        } else {
            console.log(nowOption.maxY, '==============')
            drawSingleLine(nowOption, true)
        }

    }

}

function drawSingleLine(nowOption, mouseEvent) {
    var stp
    var px1
    var pathStr = 'M' + stp + ' ' + (nowOption.showArr.h + nowOption.top)
    var pathStr1 = ''
    var lineSet = nowOption.paper.set()
    var lineArr = []
    var lineArrS = nowOption.paper.set()
    var cricleArr = nowOption.paper.set()
    for (var i = 0; i < nowOption.data.length; i++) {
        switch (nowOption.xytext[0]) {
            case 'left':
                stp = nowOption.showArr.st + i * nowOption.showArr.w / (nowOption.x.length - 1)
                px1 = nowOption.showArr.st + (i - 1) * nowOption.showArr.w / (nowOption.x.length - 1)
                break
            case 'middle':
                stp = nowOption.showArr.st + nowOption.showArr.w / (nowOption.x.length) / 2 + i * nowOption.showArr.w / (nowOption.x.length)
                px1 = nowOption.showArr.st + nowOption.showArr.w / (nowOption.x.length) / 2 + (i - 1) * nowOption.showArr.w / (nowOption.x.length)
                break
            case 'right':
                break
        }
        var py
        var py1
        switch (nowOption.xytext[1]) {
            case "bottom":
                py = (nowOption.showArr.h + nowOption.top) - nowOption.showArr.h * ((nowOption.data[i] - nowOption.minY) / (nowOption.maxY - nowOption.minY))
                py1 = (nowOption.showArr.h + nowOption.top) - nowOption.showArr.h * ((nowOption.data[i - 1] - nowOption.minY) / (nowOption.maxY - nowOption.minY))
                py2 = (nowOption.showArr.h + nowOption.top) - nowOption.showArr.h * ((nowOption.data[i + 1] - nowOption.minY) / (nowOption.maxY - nowOption.minY))
                break
            case 'middle':
                py = (nowOption.showArr.h + nowOption.top) - nowOption.showArr.h * ((nowOption.y.length - 1) / nowOption.y.length) * ((nowOption.data[i - 1] - nowOption.minY) / (nowOption.maxY - nowOption.minY)) - 0.5 * nowOption.showArr.h / nowOption.y.length
                py1 = (nowOption.showArr.h + nowOption.top) - nowOption.showArr.h * ((nowOption.y.length - 1) / nowOption.y.length) * ((nowOption.data[i - 1] - nowOption.minY) / (nowOption.maxY - nowOption.minY)) - 0.5 * nowOption.showArr.h / nowOption.y.length
                py2 = (nowOption.showArr.h + nowOption.top) - nowOption.showArr.h * ((nowOption.y.length - 1) / nowOption.y.length) * ((nowOption.data[i - 1] - nowOption.minY) / (nowOption.maxY - nowOption.minY)) - 0.5 * nowOption.showArr.h / nowOption.y.length
                break
        }
        if (nowOption.maxY == 0) {
            py1 = py = (nowOption.showArr.h + nowOption.top)
        }
        //console.log(py,i,(nowOption.showArr.h + nowOption.top),nowOption.maxY,'===',nowOption.data[i])
        var x1
        var y1
        var stryuan = ''
        var cnashu = nowOption.data.length > 120 ? Math.floor(5 * 120 / nowOption.data.length) : 5
            //if(nowOption.length>100)
        if (nowOption.showArr.w / nowOption.data.length > 8) {
            if (py < py1 && py < py2) {
                stryuan = 'L' + (stp - cnashu) + ',' + (py + cnashu * (py1 - py) / (stp - px1)) + 'Q' + stp + ',' + (py) + ',' + (stp + cnashu) + ',' + (py + cnashu * (py2 - py) / (stp - px1))
            }
            if (py > py1 && py > py2) {
                stryuan = 'L' + (stp - cnashu) + ',' + (py + cnashu * (py1 - py) / (stp - px1)) + 'Q' + stp + ',' + (py) + ',' + (stp + cnashu) + ',' + (py + cnashu * (py2 - py) / (stp - px1))
            }
            if (py >= py1 && py <= py2) {
                //stryuan = 'L' + (stp - cnashu - cnashu * (stp - cnashu - px1) / (py-2 - py1)) + ',' + (py - cnashu) + 'Q' + (stp - cnashu) + ',' + (py-2) + ',' + stp + ',' + (py)
                //stryuan += 'Q' + (stp + cnashu) + ',' + py + ',' + (stp + cnashu + cnashu * (stp - cnashu - px1) / (py2 - py)) + ',' + (py + cnashu)
                stryuan = 'L' + stp + ',' + py
            }
            if (py <= py1 && py >= py2) {
                //stryuan = 'L' + (stp - cnashu - cnashu * (stp - cnashu - px1) / (py1 - py)) + ',' + (py + cnashu) + 'Q' + (stp - cnashu) + ',' + (py) + ',' + stp + ',' + (py)
                //stryuan += 'Q' + (stp + cnashu) + ',' + py + ',' + (stp + cnashu + cnashu * (stp - cnashu - px1) / (py - py2)) + ',' + (py - cnashu)
                stryuan = 'L' + stp + ',' + py
            }
        } else {
            stryuan = 'L' + stp + ',' + py
        }
        /* if(py==py1){
             stryuan='L'+stp+','+py 
         }*/
        //console.log(stryuan)
        /*if (py > py1) {
            x1 = px1 + Math.floor(8 * (py - py1) / nowOption.maxY)
            y1 = py1 - Math.floor(8 * (py - py1) / nowOption.maxY)
        } else if (py < py1) {
            x1 = stp + Math.floor(8 * (py - py1) / nowOption.maxY)
            y1 = py + Math.floor(8 * (py - py1) / nowOption.maxY)
        } else if (py == py1) {
            x1 = stp
            y1 = py
        }*/

        if (nowOption.maxY == 0) {
            x1 = y1 = (nowOption.showArr.h + nowOption.top)
        }
        //console.log(nowOption.data[i])
        switch (i) {
            case 0:
                pathStr = 'M' + stp + ' ' + (nowOption.showArr.h + nowOption.top) + 'L' + stp + " " + py
                pathStr1 = 'M' + stp + " " + py
                break
            case nowOption.data.length - 1:
                pathStr = pathStr + 'L' + stp + ' ' + py + 'L' + stp + ' ' + (nowOption.showArr.h + nowOption.top)
                pathStr1 = pathStr1 + 'L' + stp + ' ' + py
                break
            default:
                pathStr = pathStr + stryuan
                pathStr1 = pathStr1 + stryuan
                break
        }
        //console.log(pathStr)
        if (nowOption.circleShow) {
            if (nowOption.x.length > 20) {
                var jg = 0
                switch (nowOption.xytext[0]) {
                    case 'left':
                        jg = nowOption.showArr.w / (nowOption.x.length - 1)
                        break
                    case 'middle':
                        jg = nowOption.showArr.w / (nowOption.x.length)
                        break
                    case 'right':
                        break
                }
                var showNum = Math.floor((nowOption.showArr.w / nowOption.xSetInterval) / jg) + 2
                if (Math.floor(i % showNum) == 0) {
                    var circley = py
                    if (py < py1 && py < py2) {
                        circley = (py + 0.4 * cnashu * (py1 - py) / (stp - px1))
                            //circlex=
                    }
                    if (py > py1 && py > py2) {
                        circley = (py + 0.4 * cnashu * (py1 - py) / (stp - px1))
                    }
                    var circle = nowOption.paper.circle(stp, circley, 4).data({
                        'data': nowOption.data[i],
                        'index': i
                    }).attr({
                        'fill': '#fff',
                        'fill-opacity': 1,
                        'stroke-width': 1,
                        'stroke': nowOption.lineColor
                    })
                    if (nowOption.circleMouseEvent) {
                        circle.hide()
                    }
                    cricleArr.push(circle)
                }
            } else {
                var circley = py
                if (py < py1 && py < py2) {
                    circley = (py + 0.4 * cnashu * (py1 - py) / (stp - px1))
                        //circlex=
                }
                if (py > py1 && py > py2) {
                    circley = (py + 0.4 * cnashu * (py1 - py) / (stp - px1))
                }
                var circle = nowOption.paper.circle(stp, circley, 4).data({
                    'data': nowOption.data[i],
                    'index': i
                }).attr({
                    'fill': '#fff',
                    'fill-opacity': 1,
                    'stroke-width': 1,
                    'stroke': nowOption.lineColor
                })
                if (nowOption.circleMouseEvent) {
                    circle.hide()
                }
                cricleArr.push(circle)
            }

        }
        if (nowOption.modulus) {
            var judui = nowOption.paper.text(stp, py * nowOption.modulusRate, nowOption.format(nowOption.data[i], i)).attr({
                font: nowOption.font,
                //fill: nowOption.lineColor,
                fill: nowOption.chaincolor[i] ? nowOption.chaincolor[i] : nowOption.lineColor,
                'text-anchor': 'middle'
            })
            if (nowOption.x.length > 16) {
                var showNum1 = Math.floor((nowOption.x.length / nowOption.xSetInterval)) + 1
                if (Math.floor(i % showNum1) != 0) {
                    judui.hide()
                }
            }
        }
        if (nowOption.iconImages[i]) {
            if (nowOption.iconImages[i].length != 0) {
                for (var w = 0; w < nowOption.iconImages[i].length; w++) {
                    if (nowOption.iconImages[i][w]) {
                        nowOption.paper.image(nowOption.iconImages[i][w], stp - 5, py - 5, 10, 10)
                    }
                }
            }
        }
        if (mouseEvent) {
            var showLine = nowOption.paper.rect(stp, nowOption.top, 1, (nowOption.showArr.h)).attr({
                fill: nowOption.backLineColor,
                'stroke-width': 0
            }).hide()
            var linea = nowOption.paper.rect(stp - 5, nowOption.top, 10, (nowOption.showArr.h)).attr({
                'fill': '#ccc',
                'stroke-width': 1,
                'fill-opacity': 0,
                'opacity': 0
            }).data({
                data: nowOption.data[i],
                index: i
            }).mouseover(function(e) {
                if (nowOption.circleMouseEvent) {
                    cricleArr[this.data('index')].show()
                }
                lineArr[this.data('index')].show()
                var oxX = getOffset(e).x
                var oxY = getOffset(e).y
                    //console.log(document.getElementById(nowOption.el).parentNode.offsetLeft, document.getElementById(nowOption.el).offsetTop)
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
                if (nowOption.circleMouseEvent) {
                    cricleArr[this.data('index')].show()
                }
                lineArr[this.data('index')].hide()
                nowOption.mouseout()
            }).click(function(e) {
                var dat = { index: this.data('index'), data: nowOption.data[this.data('index')] }
                nowOption.click(dat)
            })
            lineArrS.push(showLine)
            lineArr.push(showLine)
            lineSet.push(linea)
        }
    }
    if (nowOption.fill) {
        nowOption.paper.path(pathStr).attr({
            'fill': nowOption.fillColor,
            'fill-opacity': 0.5,
            'stroke-width': 0
        })
    }
    nowOption.paper.path(pathStr1).attr({
        'stroke': nowOption.lineColor,
        'stroke-width': 2
    })
    if (nowOption.circleShow) {
        cricleArr.toFront()
    }
    nowOption.paper.rect(nowOption.showArr.st, nowOption.top, nowOption.showArr.w, nowOption.showArr.h).attr({
            'fill': '#fff',
            'stroke-width': 0
        }).animate({
            width: 0,
            x: nowOption.showArr.st + nowOption.showArr.w
        }, 1000)
        //if(mouseEvent)
    lineArrS.toFront()
    lineSet.toFront()
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
module.exports = drawLine;
