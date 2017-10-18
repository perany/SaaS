var svgBG = {}
svgBG.drawXk = function(svgLib, option) {
    var showArr = cloneArr(option.showArr)
    var len = option.ruleshow[0] ? option.x.length : 0
    var stp
    for (var i = 0; i < len; i++) {

        switch (option.xytext[0]) {
            case 'left':
                stp = showArr.st + i * showArr.w / (option.x.length - 1)
                break
            case 'middle':
                stp = showArr.st + showArr.w / (option.x.length) / 2 + i * showArr.w / (option.x.length)
                break
            case 'right':
                break
        }
        svgLib.option.paper.text(stp, svgLib.option.height - 20, option.formatKdX(option.x[i])).attr({
            font: svgLib.option.font,
            fill: svgLib.option.fontColor,
            'text-anchor': 'middle'
        });
    }
    if (option.xyshow[1]) {
        switch (option.xyshow[0]) {
            case 1:
                svgLib.option.paper.rect(showArr.st, 0, 1, showArr.h).attr({
                    'fill': svgLib.option.lineColor,
                    'stroke-width': 0
                })
                break
            case 2:
                svgLib.option.paper.rect(showArr.st, 0, 1, showArr.h).attr({
                    'fill': svgLib.option.lineColor,
                    'stroke-width': 0
                })
                svgLib.option.paper.rect(showArr.st + showArr.w, 0, 1, showArr.h).attr({
                    'fill': svgLib.option.lineColor,
                    'stroke-width': 0
                })
                break
        }
    } else {
        showArr.w = Math.floor(svgLib.option.width)
    }
    var ylength
    var jg
    var syt
    switch (option.xytext[1]) {
        case 'bottom':
            ylength = option.y.length
            jg = Math.floor((svgLib.option.height - 40) / (option.y.length - 1))
            syt = (svgLib.option.height - 40) - 6
            break
        case 'middle':
            ylength = option.y.length + 1
            jg = Math.floor((svgLib.option.height - 40) / (option.y.length))
            syt = (svgLib.option.height - 40) - Math.floor(0.5 * (svgLib.option.height - 40) / (option.y.length))
            break
        case 'right':
            break
    }

    for (var j = 0; j < ylength; j++) {
        var stYP = option.xyshow[1] ? showArr.st : 0
        switch (option.bgmode) {
            case 'normal':
                svgLib.option.paper.rect(stYP, j * jg, showArr.w, 1).attr({
                    'fill': svgLib.option.lineColor,
                    'stroke-width': 0
                })
                break
            case 'simple':
                if (j == ylength - 1) {
                    svgLib.option.paper.rect(stYP, showArr.h, showArr.w, 1).attr({
                        'fill': svgLib.option.lineColor,
                        'stroke-width': 0
                    })
                }
                break
        }
        var stTP = option.xyshow[1] ? showArr.st : 60
        if (option.y[j] != null && option.y[j] != undefined && option.ruleshow[1]) {
            if (j == ylength - 1 && option.xytext[1] == 'bottom') {
                syt = (svgLib.option.height - 40) + 6
            }
            var text = svgLib.option.paper.text(stTP - 10, syt - jg * j, option.formatKdY(option.y[j])).attr({
                font: svgLib.option.font,
                fill: svgLib.option.fontColor,
                'width': 80,
                'text-anchor': 'end'
            });
        }
    }
}
svgBG.drawR = function(svgLib, option) {
    var r = svgLib.option.width > svgLib.option.height ? svgLib.option.height : svgLib.option.width
    for (var i = 0; i < 7; i++) {
        var color = Math.floor(i % 2) == 0 ? "#eee" : "#fff"
        svgLib.option.paper.circle(svgLib.option.width / 2, svgLib.option.height / 2, Math.floor(r * 0.4 * (8 - i) / 8)).attr({
            fill: color,
            'stroke': "#ccc"
        })
    }
    for (var j = 0; j < option.x.length; j++) {
        var angle = -90 + j * (360 / option.x.length)
        svgLib.option.paper.rect(svgLib.option.width / 2, svgLib.option.height / 2, r * 0.4, 1).attr({
            'fill': "#ccc",
            'stroke-width': 0
        }).rotate(angle, svgLib.option.width / 2, svgLib.option.height / 2)
        svgLib.option.paper.text(svgLib.option.width / 2 + r * 0.45 * Math.cos(Math.PI * angle / 180), svgLib.option.height / 2 + r * 0.45 * Math.sin(Math.PI * angle / 180), option.formatKdX(option.x[j])).attr({
            font: svgLib.option.font,
            fill: svgLib.option.fontColor,
            'text-anchor': 'middle'
        });
    }
}

function cloneArr(valueArr) {
    var newArr = {}
    for (var i in valueArr) {
        newArr[i] = valueArr[i]
    }
    return newArr

}
module.exports = svgBG;
