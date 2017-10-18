var DrawMap = {
        drawMap: function(option) {
            option.paper.setSize(option.chinaMapConfig.width, option.chinaMapConfig.height)
            document.getElementById(option.el).style.width = option.chinaMapConfig.width
            document.getElementById(option.el).style.height = option.chinaMapConfig.height
            document.getElementById(option.el).style.MozTransform  = 'scale('+option.width / option.chinaMapConfig.width+')';
            if(option.width /option.height> option.chinaMapConfig.width/ option.chinaMapConfig.height){
                document.getElementById(option.el).style.zoom = option.height / option.chinaMapConfig.height
            }else{
                //console.log('www')
                document.getElementById(option.el).style.zoom = option.width / option.chinaMapConfig.width
            }
                //var nowOption = optionMatch(BaseOption, option)

            var nowOption = option
            var mapPager = {}
            for (var i in option.chinaMapConfig.shapes) {
                if (!nowOption.geo) {
                    color = nowOption.data[i] ? nowOption.datacolor : nowOption.bgcolor
                } else {
                    color = nowOption.bgcolor
                }
                var provice = option.paper.path(option.chinaMapConfig.shapes[i]).attr({
                    'fill': color,
                    'stroke': '#fff',
                    "stroke-width": 1
                })
                mapPager[option.chinaMapConfig.names[i]] = provice

            }
            var text = option.paper.text(50, 50, 'dsjhajshd').attr({
                font: option.font,
                fill: option.fontColor
            }).hide()

            //map 响应区
            for (var j in option.chinaMapConfig.shapes) {
                var area = option.paper.path(option.chinaMapConfig.shapes[j]).attr({
                    'fill-opacity': 0,
                    "stroke-width": 0,
                    'opacity': 0,
                    'fill': '#000'
                }).data({
                    'data': option.chinaMapConfig.names[j],
                    'mark': j
                })
                area.mouseover(function() {
                    var pos = this.getBBox()
                    var name = this.data('data')
                    text.attr({
                        x: pos.cx,
                        y: pos.cy,
                        text: name
                    }).show()
                    mapPager[name].attr('fill', nowOption.overcolor)
                    if (!nowOption.geo) {
                        nowOption.mouseover()
                    }
                })
                area.mouseout(function() {
                    var name = this.data('data')
                    var color
                    if (!nowOption.geo) {
                        color = nowOption.data[this.data('mark')] ? nowOption.datacolor : nowOption.bgcolor
                    } else {
                        color = nowOption.bgcolor
                    }
                    text.hide()
                    mapPager[name].attr('fill', color)
                    if (!nowOption.geo) {
                        nowOption.mouseout()
                    }

                })
            }
            if (nowOption.geo) {
                for (var k in nowOption.geo) {
                    var pos = JWChangeToXY(nowOption.geo[k][0], nowOption.geo[k][1])
                    var cicle = option.paper.circle(pos.x, pos.y, 4).data({
                        'data': k
                    }).attr({
                        'fill': '#44a4fa',
                        'fill-opacity': 0.5,
                        'stroke-width': 0
                    }).mouseover(function(e) {
                        var oxX = getOffset(e).x + 200
                        var oxY = getOffset(e).y + 100
                        nowOption.mouseover({
                            'data': this.data('data'),
                            'pos': this.getBBox(),
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
    }
    //经纬度转换xy
function JWChangeToXY(j, w) {
    var y = 465 * (53 - w) / (53 - 18) + 25 * Math.sin(Math.PI * Math.abs(w - 31.22) / 180)
    if (w > 31) {
        var x = 565 * (j - 73.5) / (135 - 73.5) - 75 * Math.log(Math.PI * w / 180)
    } else {
        var x = 565 * (j - 73.5) / (135 - 73.5) + 14 * Math.log(w)
    }
    return {
        x: x,
        y: y
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
module.exports = DrawMap;