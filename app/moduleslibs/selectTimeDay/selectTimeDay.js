//require("./daterangepicker-bs3.less");
require("./selectTimeDay.less");
var mouth_pickup = require("../selectmouth/selectmouth.js");
var baseFun = require("../../base/pagebase.js");
var selele = require("../selectdate/selectdate.js")
var select = require("../select/select.js");
var baseClass = new baseFun();
var html = require("./tpl.html");
var myDate = new Date();

function selectTime() {
    this.html = html
    var that = this;
    var mouth = null
    var daypicker = null;
    var selectCont = null;
    var startDay = Tool.GetDateStr(-1);
    var endDay = Tool.GetDateStr(-1);
    var dateLength = 1;
    this.complete = function() {
        selectCont = that.app.loadModule(select, that.dom.find('.timeSel'), { title: '选择时间', data: [{ name: '按日', id: '1' }, { name: '按月', id: 'MONTH' }, { name: '近7天', id: '7' }, { name: '近30天', id: '30' }, { name: '近60天', id: '60' }] });
        //日历控件
        this.dom.find('.Timers').on('click', function() {
            that.dom.find('#days-picker-content').show()
        })
        daypicker = this.app.loadModule(selele, this.dom.find('#days-picker-content'), {
            mode: 's',
            data: { endday: Tool.GetDateStr(-1).replace(/\//g, '-'), startday: Tool.GetDateStr(-1).replace(/\//g, '-'), max: Tool.GetDateStr(-1).replace(/\//g, '-'), min: that.nowParam.min }
        })
        daypicker.event._addEvent('day.picker', function(value) {
            that.dom.find('.Timers').val(value.st.replace(/-/g, '/'))
            that.setData({ st: value.st, et: value.st, dateLength: dateLength })
        });
        var datas = Tool.GetDateStr(-1);
        that.dom.find('.Timers').val(that.setNum(datas));
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
            var arr = value.split('-');
            that.setData(that.month(arr[0], arr[1]));
        });
        selectCont.event._addEvent('select.id', function(val) {
            that.fun(val, true);
        })
        this.fun = function(val, type) {
            switch (val.id) {
                case '1':
                    $('.seles').addClass('hide');
                    $('.days').removeClass('hide');
                    $('.opensright').removeClass('hide');
                    daypicker.refresh({ st: Tool.GetDateStr(-1) })
                    that.dom.find('.Timers').val(Tool.GetDateStr(-1).replace(/-/g, '/'));
                    dateLength = val.id;
                    if (type) {
                        that.setData({ st: Tool.GetDateStr(-1), et: Tool.GetDateStr(-1), dateLength: dateLength })
                    }
                    break;
                case 'MONTH':
                    $('.seles').addClass('hide');
                    $('.ta_date').removeClass('hide');
                    mouth.resetMouth();
                    that.dom.find('#month_picker').html(myDate.getFullYear() + '-' + ('0' + (myDate.getMonth() * 1 + 1)).slice(-2));
                    if (type) {
                        that.setData(that.month(myDate.getFullYear(), ('0' + (myDate.getMonth() * 1 + 1)).slice(-2)))
                    }
                    break;
                case '7':
                    $('.seles').addClass('hide');
                    $('.dayMonth').removeClass('hide');
                    $('.opensright').addClass('hide');
                    daypicker.refresh({ startDay: Tool.GetDateStr(-7), endDay: Tool.GetDateStr(-1) });
                    that.dom.find('.Timers').val(Tool.GetDateStr(-7).replace(/-/g, '/') + '至' + Tool.GetDateStr(-1).replace(/-/g, '/'));
                    dateLength = val.id
                    if (type) {
                        that.setData({ st: Tool.GetDateStr(-7), et: Tool.GetDateStr(-1), dateLength: dateLength })
                    }
                    break;
                case '30':
                    $('.seles').addClass('hide');
                    $('.dayMonth').removeClass('hide');
                    $('.opensright').addClass('hide');
                    daypicker.refresh({ startDay: Tool.GetDateStr(-30), endDay: Tool.GetDateStr(-1) });
                    that.dom.find('.Timers').val(Tool.GetDateStr(-30).replace(/-/g, '/') + '至' + Tool.GetDateStr(-1).replace(/-/g, '/'));
                    dateLength = val.id
                    if (type) {
                        that.setData({ st: Tool.GetDateStr(-30), et: Tool.GetDateStr(-1), dateLength: dateLength })
                    }
                    break;
                case '60':
                    $('.seles').addClass('hide');
                    $('.dayMonth').removeClass('hide');
                    $('.opensright').addClass('hide');
                    daypicker.refresh({ startDay: Tool.GetDateStr(-60), endDay: Tool.GetDateStr(-1) });
                    that.dom.find('.Timers').val(Tool.GetDateStr(-60).replace(/-/g, '/') + '至' + Tool.GetDateStr(-1).replace(/-/g, '/'));
                    dateLength = val.id
                    if (type) {
                        that.setData({ st: Tool.GetDateStr(-60), et: Tool.GetDateStr(-1), dateLength: dateLength })
                    }
                    break;
            }
        }
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
    this.setNum = function(datas) {
        var n = datas.split("/");
        for (i = 1; i < n.length; i++) {
            n[i] = ('0' + n[i]).slice(-2);
        }
        var newData = n.join('/');
        return newData;
    }
    this.setData = function(val) {
        //console.log('777777777', val);
        that.event._dispatch('selectTimeDay.data', { st: val.st, et: val.et, dateLength: val.dateLength })
    }
    this.month = function(year, month) {
        var st = '';
        var et = '';
        st = year + '-' + month + '-' + '01';
        switch (month) {
            case '01':
                et = year + '-' + month + '-' + '31';
                break;
            case '02':
                if (parseInt(year) / 4 == 0) {
                    et = year + '-' + month + '-' + '29';
                } else {
                    et = year + '-' + month + '-' + '28';
                }
                break;
            case '03':
                et = year + '-' + month + '-' + '31';
                break;
            case '04':
                et = year + '-' + month + '-' + '30';
                break;
            case '05':
                et = year + '-' + month + '-' + '31';
                break;
            case '06':
                et = year + '-' + month + '-' + '30';
                break;
            case '07':
                et = year + '-' + month + '-' + '31';
                break;
            case '08':
                et = year + '-' + month + '-' + '31';
                break;
            case '09':
                et = year + '-' + month + '-' + '30';
                break;
            case '10':
                et = year + '-' + month + '-' + '31';
                break;
            case '11':
                et = year + '-' + month + '-' + '30';
                break;
            case '12':
                et = year + '-' + month + '-' + '31';
                break;
        }
        dateLength = 'MONTH'
        return ({ st: st, et: et, dateLength: dateLength })
    };
    this.refreshData = function(value) {
        daypicker.refreshData(value);
    }
    this.refreshSelectTimeDay = function() {
        selectCont.refreshSelect();
        that.fun({ id: '1' });
    }
}
//原型链一定要有的
module.exports = selectTime;