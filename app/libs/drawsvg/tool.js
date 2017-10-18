function calculate() {
    var tempTool = {}
        //平均值处理
    tempTool.avage = function(option) {
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
            } else {
                var soc = dataDeal(option.ftype, option.data, option.ctype)
                var yA = soc.yA
                var yB = soc.yB
                option.y = yA
                option.twoW = { yA: yA, yB: yB }
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
        }
    }

    //多维度处理
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
    tempTool.svgData = function(nowOption, svgLib) {
        var data = {}
        data = tempTool.optionMatch(data, svgLib)
        data = tempTool.optionMatch(data, nowOption)
        return data
    }

    //初始化整个场景
    tempTool.initScreenData = function(svgLib, nowOption) {
        var showArr = {
            st: Math.floor(svgLib.width * nowOption.range[0]),
            et: Math.floor(svgLib.width * (1 - nowOption.range[1])),
            w: Math.floor(svgLib.width * (1 - nowOption.range[0] - nowOption.range[1])),
            h: svgLib.height - nowOption.bottom - nowOption.top
        }
        return showArr
    }

    //object浅层clone
    tempTool.optionMatch = function(option, matchOption) {
        for (var k in matchOption) {
            if (matchOption[k] != undefined) {
                option[k] = matchOption[k]
            }
        }
        return option
    }

    //Array浅层clone
    tempTool.cloneArr = function(valueArr) {
        var newArr = {}
        for (var i in valueArr) {
            newArr[i] = valueArr[i]
        }
        return newArr

    }
    tempTool.numberXY = function(value) {
            return numberXY(value)
        }
        //获取xy的最大值，进行排序
    function numberXY(value) {
        var newV = value.toString().split(',')
        var newdata = newV.sort(function NumDescSort(a, b) {
            return b - a;
        })

        var result = []
        var type = newdata[0] * newdata[newdata.length - 1] < 0 ? '-' : '+'
        if (newdata[0] == 0 || newdata[newdata.length - 1] == 0) {
            type = "0"
        }
        switch (type) {
            case "0":
                if (newdata[0] == 0 && newdata[newdata.length - 1] == 0) {
                    for (var i = 0; i < 5; i++) {
                        result.push(i)
                    }
                } else {
                    result = doMax(newdata[0] == 0 ? newdata[newdata.length - 1] : newdata[0])
                }
                //if(newdata[0])
                break
            case "-":
                var toplevel = Math.abs(newdata[0]) > Math.abs(newdata[newdata.length - 1]) ? Math.pow(10, (String(Math.floor(newdata[0]))).length) : Math.pow(10, ((String(Math.floor(newdata[newdata.length - 1]))).length - 1))
                var maxNUm = Math.abs(newdata[0]) > Math.abs(newdata[newdata.length - 1]) ? Math.floor(newdata[0]) : Math.abs(newdata[newdata.length - 1])
                var maxL = (String(maxNUm).substr(0, 1) * 1 + 1) * Math.pow(10, (String(parseInt(maxNUm))).length - 1)
                result = [-maxL, -maxL / 2, 0, maxL / 2, maxL]
                break
            case "+":
                result = doMax(newdata[0])
                break
        }
        //console.log(result, '===========')
        return result
    }

    function doMax(value) {
        var fuhao = Math.floor(Math.abs(value) / value)
        var juedui = Math.abs(Math.floor(value))
        var toplevel = Math.pow(10, (String(juedui)).length)
        var maxL = (String(juedui).substr(0, 1) * 1 + 1) * Math.pow(10, (String(juedui)).length - 1)
        var jg
            //console.log(toplevel, value, 'value', maxL)
        if (juedui >= Math.floor(toplevel * 0.5)) {
            jg = Math.floor(toplevel * 0.2)
        }

        if (juedui < Math.floor(toplevel * 0.5) && juedui >= Math.floor(toplevel * 0.3)) {
            jg = Math.floor(toplevel * 0.1)
        }
        if (juedui < Math.floor(toplevel * 0.3) && juedui >= Math.floor(toplevel * 0.1)) {
            jg = Math.floor(toplevel * 0.05)
        }
        if (juedui <= Math.floor(toplevel * 0.1)) {
            jg = Math.floor(toplevel * 0.02)
        }
        var buq = 2
        if ((maxL - juedui) > 2 * jg) {
            buq = 0
        }
        if ((maxL - juedui) <= 2 * jg && (maxL - juedui) > jg) {
            buq = 1
        }
        var tempAtr = []
            //console.log(jg, 'jg', toplevel)
        if (jg != 0) {
            for (var i = 0; i < Math.floor(maxL / jg) + buq; i++) {
                //var tjg = newdata[0] > 0 ? jg : -jg
                //maxL*fuhao
                tempAtr.push(i * jg * fuhao)
            }
        } else {
            for (var i = 0; i < 5; i++) {

                tempAtr.push(i * Math.floor((maxL / 5 + 0.1) * 10) / 10)
            }
        }
        if (fuhao == -1) {
            var newdata = tempAtr.sort(function NumDescSort(a, b) {
                return Math.floor(a) - Math.floor(b);
            })
            tempAtr = newdata
        }
        // console.log(tempAtr,'tempAtr')
        return tempAtr
    }
    return tempTool
}
module.exports = new calculate();