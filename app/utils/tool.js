var tool = {
    apiDataFormat: function(value) {
        return value
    },
    //满3位加逗号
    numFormat: function(num) {
        var num = (num || 0).toString(),
            result = '';
        while (num.length > 3) {
            result = ',' + num.slice(-3) + result;
            num = num.slice(0, num.length - 3);
        }
        if (num) {
            result = num + result;
        }
        return result;
    },
    addObject: function(value, who) {
        for (var k in value) {
            if (value[k]) {
                who[k] = value[k]
            }
        }
    },
    backTime: function(data, fromat) {
        return data.getFullYear() + "-" + ('0' + (data.getMonth() * 1 + 1)).slice(-2) + '-' + ('0' + data.getDate()).slice(-2)
    },

    time: function(data, fromat) {
        //console.log('timeFormat', data)
        return data.getFullYear() + "/" + ('0' + (data.getMonth() * 1 + 1)).slice(-2) + '/' + ('0' + data.getDate()).slice(-2)
    },

    //经纬度转换xy
    JWChangeToXY: function(j, w) {
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
    },
    changeNumtoChina: function(value) {
        var numC = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三']
        return numC[value - 1]
    },
    clone: function(value) {
        var temp = {}
        for (var k in value) {
            if (value[k] != undefined || value[k] != null) {
                temp[k] = value[k]
            }
        }
        return temp
    },
    timeFormat: function() {},
    GetDateStr: function(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期  
        var y = dd.getFullYear();
        var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1); //获取当前月份的日期，不足10补0  
        var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0  
        return y + "-" + m + "-" + d;
    },
    //y轴单位转化
    getUnit: function(value) {
        //console.log('jjjjj', value * 1);
        //alert(typeof(value*1));
        if (value * 1 < 10000) {
            return value;
        } else if (value * 1 >= 10000 && value * 1 < 100000000) {
            return value * 1 / 10000;
        } else if (value * 1 >= 100000000) {
            return value * 1 / 100000000;
        }
    },
    getUnitY: function(value) {
        //console.log('jjjjj', value * 1);
        //alert(typeof(value*1));
        if (value * 1 < 10000) {
            return '';
        } else if (value * 1 >= 10000 && value * 1 < 100000000) {
            return '万';
        } else if (value * 1 >= 100000000) {
            return '亿';
        }
    },
    getUnitY1: function(value) {
        if (value * 1 < 10000) {
            return '万';
        } else if (value * 1 >= 10000 && value * 1 < 100000000) {
            return '亿';
        }
    },
    //金额保留两位小数并且满5进1
    moneyFormat: function(value) {
        //console.log('---', Math.round(value * 1 * 100) / 100);
        var num = value < 0 ? '-' + Tool.formats((Math.round(Math.abs(value) * 1 * 100) / 100).toFixed(2)) : Tool.formats((Math.round(value * 1 * 100) / 100).toFixed(2));;
        return num;
    },
    formats: function(val) {
        var end = val.slice(-3),
            start = val.slice(0, -3),
            len = Math.ceil(start.length / 3),
            arr = [];
        for (var i = 0; i < len; i++) {
            arr.push(start.slice(-3));
            start = start.slice(0, start.length - 3);
        }
        arr.reverse();
        return arr.join() + end;
    },
    // getBiggest: function(value) {
    //     var max = value[0];
    //     for (var i = 0; i < value.length; i++) {
    //         if (value[i] > max) {
    //             max = value[i];
    //         }
    //     }
    //     return max;
    // },
    isDecimal: function(value) {
        //console.log('ppppoopopo', value);
        var reg = /.*\..*/;
        var bool = reg.test(value);
        if (bool) {
            return Tool.moneyFormat(value)
        } else {
            return value;
        }
    },
    getDateDiff: function(date1, date2) {
        var sArr = date1.split("-");
        var eArr = date2.split("-");
        var sRDate = new Date(sArr[0], sArr[1], sArr[2]);
        var eRDate = new Date(eArr[0], eArr[1], eArr[2]);
        var result = (eRDate - sRDate) / (1000 * 60 * 60 * 24);
        //console.log('getDateDiff', result);
        return result;
    },
    timeY: function(value) {
        console.log('***', value)
            //value = value / 1000;
        var days = Math.floor(value / (24 * 3600));
        var leave1 = value % (24 * 3600)
        var hours = Math.floor(leave1 / (3600))
        var leave2 = leave1 % (3600)
        var minutes = Math.floor(leave2 / (60))
            // var days = Math.floor(value / (24 * 3600));
            // var leave1 = value % (24 * 3600)
            // var hours = Math.floor(leave1 / (3600))
            // var leave2 = leave1 % (3600 * 1000)
            // var minutes = Math.floor(leave2 / (60))
        var a;
        //console.log('878787', days, hours, minutes)
        if (days == 0) {
            if (hours == 0) {
                if (minutes != 0) {
                    a = '分钟'
                }
            } else {
                a = '小时'
            }
        } else {
            a = '天'
        }
        if (a) {
            return a;
        } else {
            return '分钟'
        }

    },
    minutes: function(value) {
        //console.log('9999999', value);
        //value = value / 1000;
        // var days = Math.floor(value / (24 * 3600));
        // var leave1 = value % (24 * 3600)
        // var hours = Math.floor(leave1 / (3600))
        // var leave2 = leave1 % (3600)
        // var minutes = Math.floor(leave2 / (60))
        var days = Math.floor(value / (24 * 3600));
        var leave1 = value % (24 * 3600)
        var hours = Math.floor(leave1 / (3600))
        var leave2 = leave1 % (3600)
        var minutes = Math.floor(leave2 / (60))
        var a;
        days = days == 0 ? '' : days + '天';
        hours = hours == 0 ? '' : hours + '小时';
        minutes = minutes == 0 ? '0分钟' : minutes + '分钟';
        a = days + hours + minutes;
        //console.log('3333', a);
        return a;
    },
    minutesM: function(value) {
        //console.log('9999999', value);
        var days = Math.floor(value / (24 * 3600));
        var leave1 = value % (24 * 3600)
        var hours = Math.floor(leave1 / (3600))
        var leave2 = leave1 % (3600)
        var minutes = Math.floor(leave2 / (60))
        var a;
        days = days == 0 ? '' : days + '天';
        hours = hours == 0 ? '' : hours + '小时';
        minutes = minutes == 0 ? '0分钟' : minutes + '分钟';
        a = days + hours + minutes;
        //console.log('3333', a);
        return a;
    },
    minutes1: function(value) {
        //value = value / 1000;
        var days = Math.floor(value / (24 * 3600));
        var leave1 = value % (24 * 3600)
        var hours = Math.floor(leave1 / (3600))
        var leave2 = leave1 % (3600)
        var minutes = Math.floor(leave2 / (60))
        return minutes
    },
    hours: function(value) {
        var minutes = Math.floor(value / (60))
        return (minutes / 60).toFixed(2);
    },
    days: function(value) {
        var minutes = Math.floor(value / (60))
        return (minutes / 1440).toFixed(2);
    }
}
window.Tool = window.Tool || tool
module.exports = window.tool;