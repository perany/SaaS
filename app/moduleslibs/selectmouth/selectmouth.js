require("./monthPicker.less");
var html = require("./tpl.html");

function selectMouth() {
    this.html = html
    var that = this;
    var nowYear = ''
    var nowMouth = ''
    var nowMax = ''
    this.complete = function() {
        // this.nowParam
        nowYear = this.nowParam.year || Number(new Date().getFullYear())
        nowMouth = this.nowParam.mouth || (Number(new Date().getMouth()) + 1)
        nowMax = this.nowParam.maxMouth;
        nowMin = this.nowParam.minMouth;
        this.dom.html(html)
        this.changeYear()
        this.nowParam.opener.on('click', function() {
            that.dom.show()
            that.changeYear()
        })
        if (nowMax) {
            var tt = nowMax.split('-')
            $.each(that.dom.find('#gri_monthPicker_wrapper #gri_monthPicker_table td'), function() {
                if ($(this).attr('id').replace('gri_month', '') * 1 > tt[1] * 1 && tt[0] == nowYear) {
                    $(this).addClass('close')
                }
            })
        }
        if (nowMin) {
            var tt = nowMin.split('-')
            $.each(that.dom.find('#gri_monthPicker_wrapper #gri_monthPicker_table td'), function() {
                if ($(this).attr('id').replace('gri_month', '') * 1 < tt[1] * 1 && tt[0] == nowYear || tt[0] > nowYear) {
                    $(this).addClass('close')
                }
            })
        }
        this.dom.find('#gri_monthPicker_wrapper #gri_monthPicker_panel').children('i').on('click', function() {
            if ($(this).attr('class') == 'i_pre') {
                if (nowYear > 1970) {
                    nowYear--
                }
            } else {
                if (nowYear < Number(new Date().getFullYear())) {
                    nowYear++
                }
            }
            if (nowMax) {
                that.dom.find('#gri_monthPicker_wrapper #gri_monthPicker_table td').removeClass('close')
                var tt = nowMax.split('-')
                $.each(that.dom.find('#gri_monthPicker_wrapper #gri_monthPicker_table td'), function() {
                    if ($(this).attr('id').replace('gri_month', '') * 1 > tt[1] * 1 && tt[0] == nowYear) {
                        $(this).addClass('close')
                    }
                })
            }
            if (nowMin) {
                that.dom.find('#gri_monthPicker_wrapper #gri_monthPicker_table td').removeClass('close')
                var tt = nowMin.split('-')
                $.each(that.dom.find('#gri_monthPicker_wrapper #gri_monthPicker_table td'), function() {
                    if ($(this).attr('id').replace('gri_month', '') * 1 < tt[1] * 1 && tt[0] == nowYear || tt[0] > nowYear) {
                        $(this).addClass('close')
                    }
                })
            }
            that.changeYear()
                //that.dom.find('#gri_monthPicker_wrapper #gri_monthPicker_panel #gri_year')
        })
        this.dom.find('#gri_monthPicker_wrapper #gri_monthPicker_table td').on('click', function() {
            $.each(that.dom.find('#gri_monthPicker_wrapper #gri_monthPicker_table td'), function() {
                that.dom.find('#gri_monthPicker_wrapper #gri_monthPicker_table td').removeClass('current1')
            });

            if ($(this).hasClass('close')) {
                return
            }
            nowMouth = ('0' + String($(this).attr('id')).replace('gri_month', '')).slice(-2)
            that.setMouth()
            that.dom.hide()
            that.event._dispatch('mouth.change', (nowYear + '-' + nowMouth))
        })
        this.dom.find('#mouth-picker-mask').on('click', function() {
            that.dom.hide()
        })
    }
    this.setMouth = function() {
        var numaa = this.nowParam.opener.html().split('-')
        this.dom.find('#gri_monthPicker_wrapper #gri_monthPicker_table td').removeClass('current');
        if (nowYear == numaa[0]) {
            this.dom.find('#gri_monthPicker_wrapper #gri_monthPicker_table #gri_month' + numaa[1] * 1).addClass('current')
        }

    }
    this.reph = function(value) {
        nowYear = value.split('-')[0]
        nowMouth = value.split('-')[1]
        this.setMouth()
        this.changeYear()
    }
    this.changeYear = function(val) {
        that.dom.find('#gri_monthPicker_wrapper #gri_monthPicker_panel #gri_year').html(nowYear + '年')
        that.setMouth()
        if (nowYear == Number(new Date().getFullYear())) {
            that.dom.find('#gri_monthPicker_wrapper #gri_monthPicker_panel .i_pre').show()
            that.dom.find('#gri_monthPicker_wrapper #gri_monthPicker_panel .i_next').hide()
            return
        }
        if (nowYear == 1970) {
            that.dom.find('#gri_monthPicker_wrapper #gri_monthPicker_panel .i_pre').hide()
            that.dom.find('#gri_monthPicker_wrapper #gri_monthPicker_panel .i_next').show()
            return
        }
        that.dom.find('#gri_monthPicker_wrapper #gri_monthPicker_panel .i_pre').show()
        that.dom.find('#gri_monthPicker_wrapper #gri_monthPicker_panel .i_next').show()

    }
    this.resetMouth = function() {
        //console.log('000')
        nowYear = Number(new Date().getFullYear())
        var date = new Date()
        var date1 = parseInt(date.getMonth()) + 1
        nowMouth = date1
        this.setMouth1()
    }
    this.setMouth1 = function() {
        //console.log('mm11m', nowMouth, this.dom.find('#gri_monthPicker_wrapper #gri_monthPicker_table #gri_month' + nowMouth))
        this.dom.find('#gri_monthPicker_wrapper #gri_monthPicker_table td').removeClass('current')
        this.dom.find('#gri_monthPicker_wrapper #gri_monthPicker_table #gri_month' + nowMouth).addClass('current')
    }
}
//原型链一定要有的
module.exports = selectMouth;