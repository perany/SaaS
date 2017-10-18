//require("./daterangepicker-bs3.less");
require("./selectTimeDay.less");
var mouth_pickup = require("../selectmouth/selectmouth.js");
var baseFun = require("../../base/pagebase.js");
var selele = require("../selectdate/selectdate.js")

var baseClass = new baseFun();
var html = require("./tpl.html");
var myDate = new Date();

function selectTime() {
    this.html = html
    var that = this;
    var mouth = null
    var daypicker = null
    this.complete = function() {
        //$('#Timers').daterangepicker({ startDate: baseClass.GetDateStr(-1), opens: 'right', singleDatePicker: true });
        console.log('----------------')
            //日历控件
        this.dom.find('.Timers').on('click', function() {
            that.dom.find('#days-picker-content').show()
        })
        daypicker = this.app.loadModule(selele, this.dom.find('#days-picker-content'), {
            mode: 's',
            data: { endday: baseClass.GetDateStr(-1).replace(/\//g, '-'), startday: baseClass.GetDateStr(-1).replace(/\//g, '-'), min: that.nowParam.min, max: that.nowParam.max }
            // data: { endday: myDate.getFullYear() + '-' + ('0' + (myDate.getMonth() * 1 + 1)).slice(-2) + '-'  + myDate.getDate(), startday: myDate.getFullYear() + '-' + ('0' + (myDate.getMonth() * 1 + 1)).slice(-2) + '-' + myDate.getDate(), min: that.nowParam.min }
        })
        daypicker.event._addEvent('day.picker', function(value) {
                that.dom.find('.Timers').val(value.st.replace(/-/g, '/'))
                    //that.dayChoose(value)
                that.event._dispatch('Time.change')
            })
            //月份控件
        that.dom.find('#month_picker').html(myDate.getFullYear() + '-' + ('0' + (myDate.getMonth() * 1 + 1)).slice(-2))
        mouth = this.app.loadModule(mouth_pickup, this.dom.find('#month-picker-content'), {
            year: myDate.getFullYear(),
            mouth: myDate.getMonth() * 1 + 1,
            opener: this.dom.find('#month_picker'),
            maxMouth: that.nowParam.maxMouth,
            minMouth: that.nowParam.minMouth
        })
        mouth.event._addEvent('mouth.change', function(value) {
            that.dom.find('#month_picker').html(value)
            that.mouthChoose(value)
            that.event._dispatch('Time.change')
        })
        // var datas = baseClass.GetDateStr(-1).replace(/\//g, '-');
        var datas = baseClass.GetDateStr(-1);
        // that.setNum(datas);
        // that.dom.find('.Timers').val(datas.replace(/-/g, '/'));
        that.dom.find('.Timers').val(that.setNum(datas));
        $('.selectCont').on('change', '#timeLevel', function() {
            if ($(this).find('option:selected').val() == "按日") {
                $('.seles').addClass('hide');
                $('.days').removeClass('hide');
                $('.opensright').removeClass('hide');
                daypicker.refresh({ st: Tool.GetDateStr(-1) })
                that.dom.find('.Timers').val(Tool.GetDateStr(-1).replace(/-/g, '/'));
            } else if ($(this).find('option:selected').val() == "按月") {
                $('.seles').addClass('hide');
                $('.ta_date').removeClass('hide');
                mouth.resetMouth();
                that.dom.find('#month_picker').html(myDate.getFullYear() + '-' + ('0' + (myDate.getMonth() * 1 + 1)).slice(-2))
                    //that.dom.find('#month_picker').html(myDate.getFullYear() + '-' + ('0'+(myDate.getMonth() * 1 + 1)).slice(-2))
                    //mouth.reph(that.dom.find('#month_picker').html())
            } else if ($(this).find('option:selected').val() == "近7天") {
                $('.seles').addClass('hide');
                $('.dayMonth').removeClass('hide');
                $('.opensright').addClass('hide');
                daypicker.refresh({ startDay: Tool.GetDateStr(-7), endDay: Tool.GetDateStr(-1) });
                that.dom.find('.Timers').val(Tool.GetDateStr(-7).replace(/-/g,'/') + '至' + Tool.GetDateStr(-1).replace(/-/g,'/'));
            } else if ($(this).find('option:selected').val() == "近30天") {
                $('.seles').addClass('hide');
                $('.dayMonth').removeClass('hide');
                $('.opensright').addClass('hide');
                daypicker.refresh({ startDay: Tool.GetDateStr(-30), endDay: Tool.GetDateStr(-1) });
                that.dom.find('.Timers').val(Tool.GetDateStr(-30).replace(/-/g,'/') + '至' + Tool.GetDateStr(-1).replace(/-/g,'/'));
            } else if ($(this).find('option:selected').val() == "近60天") {
                $('.seles').addClass('hide');
                $('.dayMonth').removeClass('hide');
                $('.opensright').addClass('hide');
                daypicker.refresh({ startDay: Tool.GetDateStr(-60), endDay: Tool.GetDateStr(-1) });
                that.dom.find('.Timers').val(Tool.GetDateStr(-60).replace(/-/g,'/') + '至' + Tool.GetDateStr(-1).replace(/-/g,'/'));
            }
            that.event._dispatch('Time.change')
        });
        $('.selectCont').on('click', '.quarter', function(event) {
            event.stopPropagation();
            $('.quarter dl').removeClass('hidden');
            //$(this).find('dl').css('display','block');
        })
        $('.selectCont').on('click', '.quarter dd', function(event) {
            event.stopPropagation();
            $('.quarter dl').addClass('hidden');
            $('.quarterInput').text($(this).text());
        })
        $('.quarterYear .left').click(function() {
            var left = parseInt($('.quarterYear span').text());
            left--;
            if (left < myDate.getFullYear()) {
                $('.quarterYear .down').removeClass('hide');
            }
            $('.quarterYear span').text(left);
        });
        $('.quarterYear .right').click(function() {
            // e.stopPropagation();
            var right = parseInt($('.quarterYear span').text());
            right++;
            if (right >= myDate.getFullYear()) {
                $('.quarterYear .right').addClass('hide');
            }
            $('.quarterYear span').text(right);
        });
        $(document).click(function() {
            $('.quarter dl').addClass('hidden');
        });
    }
    this.mouthChoose = function(value) {

    }
    this.refresh = function(value) {
        daypicker.refresh({ st: value.startDay, et: value.endDay })
        if (value.endDay) {
            that.dom.find('.Timers').val(that.setNum(value.startDay.replace(/-/g, '/')) + '至' + that.setNum(value.endDay.replace(/-/g, '/')));
        } else {
            that.dom.find('.Timers').val(that.setNum(value.startDay.replace(/-/g, '/')))
        }
    }
    this.setMaxmin = function(value) {
        daypicker.setMaxmin({ min: value.min, max: value.max })
    }
    this.resetMouth = function() {
        mouth.resetMouth();
        that.dom.find('#month_picker').html(myDate.getFullYear() + '-' + ('0' + (myDate.getMonth() * 1 + 1)).slice(-2))
    }
    this.setNum = function (datas) {
        var n = datas.split("/");
        for(i = 1; i < n.length; i++) {
            n[i]=('0' + n[i]).slice(-2);
        }
        var newData = n.join('/');
        return newData;
    }

}
//原型链一定要有的
module.exports = selectTime;