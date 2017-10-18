require("./selectdate.less");
var html = require("./tpl.html");
var datepick = require('./datepicker.js')

var mouthName = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']




function selectMouth() {
    this.html = html
    var that = this;
    var nowYear = ''
    var nowMouth = ''

    this.complete = function() {
        // this.dom.append(this.html)
        //console.log('kkk222222222', that.nowParam)
        this.dom.html(this.html)
        var nowYangshi
        this.mode = this.nowParam.mode
        this.chooseStart = this.nowParam.data.startday
        this.chooseEnd = this.nowParam.data.endday
        this.maxDay = this.nowParam.data.max ? this.nowParam.data.max : ''
        this.minDay = this.nowParam.data.min ? this.nowParam.data.min : ''
        this.dataNow = new datepick({ model: '2', data: this.nowParam.data.startday })
        if (this.nowParam.mode == 's') {
            nowYangshi = this.dataNow.getDatePicker()
            this.dom.css('width', 220)
            this.dom.find('.daterangepicker .left').show()
            this.showMouth(this.nowParam.data.endday, 'left')
        } else {
            this.dom.css('width', 500)
            this.dom.find('.ranges').show()
            this.dom.find('.daterangepicker .calendar').show()
            this.showMouth(this.nowParam.data.endday, 'right')
            this.showMouth(this.nowParam.data.startday, 'left')
        }
        this.dom.find('.calendar .prev').on('click', function() {
            var nowshowM = $(this).parent().find('.month').attr('nowMoth').split('-')
            var nowMouth = nowshowM[1] - 1 == 0 ? 12 : nowshowM[1] - 1
            var nowYear = nowshowM[1] - 1 == 0 ? nowshowM[0] - 1 : nowshowM[0]
            that.showMouth(nowYear + '-' + nowMouth, $(this).attr('blone'))
        })
        this.dom.find('.calendar .next').on('click', function() {
            var nowshowM = $(this).parent().find('.month').attr('nowMoth').split('-')
            var nowMouth = nowshowM[1] * 1 + 1 == 13 ? 1 : nowshowM[1] * 1 + 1
            var nowYear = nowshowM[1] * 1 + 1 == 13 ? nowshowM[0] * 1 + 1 : nowshowM[0]
            that.showMouth(nowYear + '-' + nowMouth, $(this).attr('blone'))
        })
        this.dom.find('.ranges .btn-success').on('click', function() {
            that.dom.hide()
            that.event._dispatch('day.picker', { st: dealZero(that.chooseStart), et: dealZero(that.chooseEnd) })
                //that.event._dispatch('day.close')
        })
        this.dom.find('#day-picker-mask').on('click', function() {
            //console.log('////', that.dom);
            that.dom.hide()
                // that.dom.find('#days-picker-content').hide()
            that.event._dispatch('day.close')
        })
    }
    this.refresh = function(value) {
        this.chooseStart = value.st ? value.st : this.chooseStart
        this.chooseEnd = value.et ? value.et : this.chooseEnd
        this.showMouth(this.chooseStart, 'left')
        this.showMouth(this.chooseEnd, 'right')
    }
    this.refreshData = function(value) {
        //console.log('------', value);
        if (value.min == 'all') {
            this.minDay = ''
        } else {
            this.minDay = value.min ? value.min : this.minDay
        }
        this.maxDay = value.max ? value.max : this.maxDay
        if (this.mode == 'd') {
            that.refresh({ st: value.startDay, et: value.endDay })
            that.dom.find('.Timers').val(value.startDay + '至' + value.endDay);
        } else {
            this.showMouth(value.startDay ? value.startDay : this.chooseStart, 'left')
            that.dom.find('.Timers').val(value.startDay);
        }
        //console.log('111///////', this.minDay);
    };
    // this.setMin = function(value) {
    //     //console.log('0000', value);
    //     if (value.min == '') {
    //         this.minDay = ''
    //     } else {
    //         this.minDay = value.min
    //     }
    // }
    // this.setMaxmin = function(value) {
    //     this.maxDay = value.max ? value.max : this.maxDay
    //     this.minDay = value.min ? value.min : this.minDay
    // }
    // this.refreshMin = function(value) {
    //     this.minDay = value.min;
    //     if (value.type == 'edit') {
    //         that.refresh({ st: '', et: '' })
    //     } else {
    //         that.refresh({ st: Tool.GetDateStr(0), et: Tool.GetDateStr(0) })
    //     }
    // }
    this.attr = function(key, value) {
        if (!this[key]) {
            this[key] = value
        } else {
            if (value) {
                this[key] = value
            } else {
                return this[key]
            }
        }
    }
    this.initData = function(data, el) {
        var html = ''
        var nowMouth1 = this.dom.find('.' + el + ' .month').attr('nowMoth').split('-')
        for (var i = 0; i < data.length; i++) {
            var nowClass = "off"
            var day = ''
            if (data[i].row != undefined || data[i].row != null) {
                nowClass = ''
                day = nowMouth1[0] + '/' + nowMouth1[1] + '/' + data[i].day
            } else {
                if (i < 20) {
                    var nowMouth = nowMouth1[1] * 1 - 1 == 0 ? 12 : nowMouth1[1] * 1 - 1
                    var nowYear = nowMouth1[1] * 1 - 1 == 0 ? nowMouth1[0] * 1 - 1 : nowMouth1[0]
                } else {
                    var nowMouth = nowMouth1[1] * 1 + 1 == 13 ? 1 : nowMouth1[1] * 1 + 1
                    var nowYear = nowMouth1[1] * 1 + 1 == 13 ? nowMouth1[0] * 1 + 1 : nowMouth1[0]
                }
                day = nowYear + '/' + nowMouth + '/' + data[i].day
            }
            var act = ''
            if (this.maxDay) {
                if (new Date(day).getTime() - new Date(this.maxDay.replace(/-/g, '/')).getTime() > 0) {
                    nowClass += ' close'
                }
            }
            //console.log('///////', this.minDay);
            if (this.minDay) {
                if (new Date(day).getTime() - new Date(this.minDay.replace(/-/g, '/')).getTime() < 0) {
                    nowClass += ' close'
                }
            }
            if (data[i].nowDay == true) {
                act = 'active'
            }
            switch (Math.floor(i % 7)) {
                case 0:
                    html += '<tr>'
                    html += '<td blone="' + el + '" class="available ' + nowClass + ' ' + act + '">' + data[i].day + '</td>'
                    break
                case 6:
                    html += '<td blone="' + el + '" class="available ' + nowClass + ' ' + act + '">' + data[i].day + '</td>'
                    html += '</tr>'
                    break
                default:
                    html += '<td blone="' + el + '" class="available ' + nowClass + ' ' + act + '">' + data[i].day + '</td>'
                    break
            }
        }
        this.dom.find('.daterangepicker .' + el).find('tbody').html(html)
        this.dom.find('.daterangepicker .' + el + ' td').on('click', function() {
            if ($(this).hasClass('close')) {
                //console.log('idddd', that.app.model.get('osId'))
                if (that.app.model.get('osId') != '2') {
                    that.alert('时间不在可选时间段内');
                }
                return
            }
            var day = that.dom.find('.' + $(this).attr('blone') + ' .month').attr('nowmoth').split('-')
            var socre = ''
            if ($(this).hasClass('off')) {
                if ($(this).html() * 1 > 15) {
                    var nowMouth = day[1] * 1 - 1 == 0 ? 12 : day[1] * 1 - 1
                    var nowYear = day[1] * 1 - 1 == 0 ? day[0] * 1 - 1 : day[0]
                }
                if ($(this).html() * 1 < 15) {
                    var nowMouth = day[1] * 1 + 1 == 13 ? 1 : day[1] * 1 + 1
                    var nowYear = day[1] * 1 + 1 == 13 ? day[0] * 1 + 1 : day[0]
                }
                socre = nowYear + '-' + nowMouth + '-' + $(this).html()
            } else {
                socre = day[0] + '-' + day[1] + '-' + $(this).html()
            }
            var pd = socre
            if ($(this).attr('blone') == 'left') {
                if (that.mode != 's') {
                    var chz = new Date(pd.replace(/-/g, '/')).getTime() - new Date(that.chooseEnd.replace(/-/g, '/')).getTime()
                    if (chz > 0) {
                        that.alert('开始时间不能晚于结束时间')
                        return
                    }
                }
                that.chooseStart = socre
            }

            if ($(this).attr('blone') == 'right') {
                var aa = that.chooseStart
                var chz = new Date(pd.replace(/-/g, '/')).getTime() - new Date(aa.replace(/-/g, '/')).getTime()
                if (chz < 0) {
                    that.alert('结束时间不能早于开始时间')
                    return
                }
                that.chooseEnd = socre
            }
            that.showMouth(socre, $(this).attr('blone'))
            if (that.mode == 's') {
                that.event._dispatch('day.picker', { st: dealZero(that.chooseStart), et: dealZero(that.chooseEnd) })
                that.event._dispatch('day.close')
                that.dom.hide()
            } else {

            }
        })
    }
    this.showMouth = function(value, r) {
        //console.log('0000000000', value);
        var allD = value.split('-')
        switch (r) {
            case 'right':
                this.dom.find('.right .month').attr('nowMoth', allD[0] + '-' + allD[1])
                break
            case 'left':
                this.dom.find('.left .month').attr('nowMoth', allD[0] + '-' + allD[1])
                break
        }
        this.dom.find('.' + r + ' .month').html(mouthName[allD[1] - 1] + " " + allD[0])
        var which = ''
        if (r == 'left') {
            which = this.chooseStart
        } else {
            which = this.chooseEnd
        }
        if (which.lastIndexOf(value + '-') != -1) {
            this.dataNow.init(which)
        } else {
            this.dataNow.init(value)
        }
        that.initData(this.dataNow.getDatePicker().data, r)
    }
    this.alert = function(msg) {
        that.app.alert.show({
            close: false,
            cancel: false,
            msg: msg
        })
        that.app.alert.openUP()
    }
}

function dealZero(value) {
    var newDa = value.split('-')
    newDa = newDa[0] + '-' + ('0' + newDa[1]).slice(-2) + '-' + ('0' + newDa[2]).slice(-2)
    return newDa
}
//原型链一定要有的
module.exports = selectMouth;