//require("./daterangepicker-bs3.less");
require("./selectTime.less");
var mouth_pickup = require("../selectmouth/selectmouth.js");
var selele = require("../selectdate/selectdate.js")
var season_pickup = require("../selectSeason/selectSeason.js");
var select = require("../select/select.js");
var html = require("./tpl.html");
var myDate = new Date();

function selectTime() {
    this.html = html
    var that = this;
    var mouth = null
    var daypicker = null
    var season = null;
    var selectCont = null;
    var yearselectCont = null;
    this.complete = function() {
        selectCont = that.app.loadModule(select, that.dom.find('.timeSelect'), { title: '选择时间', data: [{ name: '按天', id: 'day' }, { name: '按月', id: 'month' }, { name: '按季度', id: 'season' }, { name: '按年', id: 'year' }, ] });
        yearselectCont = that.app.loadModule(select, that.dom.find('.yearSelect'), { title: '', data: [{ name: '2017', id: '2017' }] });
        //日历控件
        this.dom.find('.Timers').on('click', function() {
            that.dom.find('#days-picker-content').show()
        })
        daypicker = this.app.loadModule(selele, this.dom.find('#days-picker-content'), {
            mode: 's',
            data: { endday: Tool.GetDateStr(-1).replace(/\//g, '-'), startday: Tool.GetDateStr(-1).replace(/\//g, '-'), max: Tool.GetDateStr(-1).replace(/\//g, '-'), min: that.nowParam.min }
        })
        daypicker.event._addEvent('day.picker', function(value) {
            that.dom.find('.Timers').val(value.st.replace(/-/g, '/'));
            //console.log('0000000999999', value);
            that.setData({ st: value.st, et: value.st });
        });
        var datas = Tool.GetDateStr(-1);
        that.dom.find('.Timers').val(that.setNum(datas));
        //月份控件
        that.dom.find('#month_picker').html(myDate.getFullYear() + '-' + ('0' + (myDate.getMonth() * 1 + 1)).slice(-2))
        mouth = this.app.loadModule(mouth_pickup, this.dom.find('#month-picker-content'), {
            year: myDate.getFullYear(),
            mouth: myDate.getMonth() * 1 + 1,
            maxMouth: myDate.getFullYear() + '-' + ('0' + (myDate.getMonth() * 1 + 1)).slice(-2),
            opener: this.dom.find('#month_picker')
        })
        mouth.event._addEvent('mouth.change', function(value) {
            that.dom.find('#month_picker').html(value)
            var arr = value.split('-');
            that.setData(that.month(arr[0], arr[1]));
        });
        //季度控件
        season = this.app.loadModule(season_pickup, this.dom.find('#season-picker-content'), {
            opener: this.dom.find('#season_picker')
        });
        that.dom.find('.quarterInput').html(that.seasonChoose());
        that.dom.find('#season_picker').on('click', function() {
            that.dom.find('#season-picker-content').css('display', 'block');
        });
        season.event._addEvent('season.change', function(value) {
            that.dom.find('#season-picker-content').css('display', 'none');
            that.dom.find('.quarterInput').html(value.sea);
            //console.log('22222', value);
            var arr = value.ym.split('-');
            // that.season(value.ym, value.sea);
            that.setData(that.season(arr[0], value.sea));
        });
        //按年
        that.dom.find('.yearSelect .selectArrow2').css('background-position', '-328px -52px')
        that.dom.find('.yearSelect .selectArrow2').css('width', '16px')
        that.dom.find('.yearSelect .selectArrow2').css('height', '16px')
        yearselectCont.event._addEvent('select.id', function(val) {
            console.log('55555', val);

        })
        selectCont.event._addEvent('select.id', function(val) {
            //console.log('------', val);
            that.fun(val, true);
        });
        $('.selectCont').on('click', '.quarter', function(event) {
            event.stopPropagation();
            $('.quarter dl').removeClass('hidden');
            //$(this).find('dl').css('display','block');
        })
        $('.selectCont').on('click', '.quarter dd', function(event) {
            if (!$(this).hasClass('dis')) {
                event.stopPropagation();
                $('.quarter dl').addClass('hidden');
                $('.quarterInput').text($(this).text());
            }
        });
        $(document).click(function() {
            $('.quarter dl').addClass('hidden');
        });
    }
    this.fun = function(val, type) {
        if (val.id == 'day') {
            $('.seles').addClass('hide');
            $('.years').addClass('hide');
            $('.days').removeClass('hide');
            daypicker.refresh({ st: Tool.GetDateStr(-1) })
            that.dom.find('.Timers').val(Tool.GetDateStr(-1));
            if (type) {
                that.setData({ st: Tool.GetDateStr(-1), et: Tool.GetDateStr(-1) })
            }
        } else if (val.id == 'month') {
            $('.seles').addClass('hide');
            $('.years').addClass('hide');
            $('.ta_date').removeClass('hide');
            mouth.resetMouth();
            that.dom.find('.date_title').html(myDate.getFullYear() + '-' + ('0' + (myDate.getMonth() * 1 + 1)).slice(-2))
            if (type) {
                that.setData(that.month(myDate.getFullYear(), ('0' + (myDate.getMonth() * 1 + 1)).slice(-2)))
            }
        } else if (val.id == 'season') {
            var month = parseInt(myDate.getMonth() + 1);
            var yeah = myDate.getFullYear();
            $('.seles').addClass('hide');
            $('.years').addClass('hide');
            $('.quarter').removeClass('hide');
            $('.quarterYear span').text(myDate.getFullYear());
            $('.quarterYear .right').addClass('hide');
            that.changeQuarter(month);
            season.resetYear();
            that.dom.find('.quarterInput').html(that.seasonChoose());
            if (type) {
                that.setData(that.season(myDate.getFullYear(), that.seasonChoose()))
            }
        } else if (val.id == 'year') {
            $('.seles').addClass('hide');
            $('.years').removeClass('hide');
            $("#timeYear option").each(function() {
                if ($(this).val() == myDate.getFullYear()) {
                    $(this).attr("selected", true);
                }
            })
            if (type) {
                that.setData({ st: '2017-01-01', et: '2017-12-31' })
            }
        }
    }
    this.changeQuarter = function(value) {
        if (value > 0 && value <= 3) {
            $('.quarter dd').addClass('dis');
            $('.quarter').find('dd').eq(0).removeClass('dis');
        } else if (value > 3 && value <= 6) {
            $('.quarter dd').addClass('dis');
            $('.quarter').find('dd').eq(0).removeClass('dis');
            $('.quarter').find('dd').eq(1).removeClass('dis');
        } else if (value > 6 && value <= 9) {
            $('.quarter dd').removeClass('dis');
            $('.quarter').find('dd').eq(3).addClass('dis');
        } else if (value > 9 && value <= 12) {
            $('.quarter dd').removeClass('dis');
        }
    }
    this.seasonChoose = function() {
        var season = '';
        var monthNow = myDate.getMonth() * 1 + 1;
        switch (monthNow) {
            case 1:
            case 2:
            case 3:
                season = '第一季度'
                break;
            case 4:
            case 5:
            case 6:
                season = '第二季度'
                break;
            case 7:
            case 8:
            case 9:
                season = '第三季度'
                break;
            case 10:
            case 11:
            case 12:
                season = '第四季度'
                break;
            default:
                break;
        }
        return season;
    }
    this.setMaxmin = function(value) {
        daypicker.setMaxmin({ min: value.min, max: value.max });
    }
    this.refresh = function() {
        daypicker.refresh({ st: Tool.GetDateStr(-1) });
        that.dom.find('.Timers').val(Tool.GetDateStr(-1).replace(/-/g, '/'));
    }
    this.refresh1 = function(value) {
        daypicker.refresh({ st: value.st, et: value.et });
        that.dom.find('.Timers').val(value.st + '至' + value.et);
    }
    this.resetMouth = function() {
        //console.log('进入到resetMouth')
        mouth.resetMouth();
        that.dom.find('.date_title').html(myDate.getFullYear() + '-' + ('0' + (myDate.getMonth() * 1 + 1)).slice(-2))
    }
    this.resetSeason = function() {
        //console.log('进入到resetSeason')
        season.resetYear();
        that.dom.find('.quarterInput').html(that.seasonChoose());
    }
    this.setNum = function(datas) {
        var n = datas.split("/");
        for (i = 1; i < n.length; i++) {
            n[i] = ('0' + n[i]).slice(-2);
        }
        var newData = n.join('/');
        return newData;
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
        return ({ st: st, et: et })
    };
    this.season = function(year, season) {
        var st = '';
        var et = '';
        switch (season) {
            case '第一季度':
                st = year + '-' + '01' + '-' + '01';
                et = year + '-' + '03' + '-' + '31';
                break;
            case '第二季度':
                st = year + '-' + '04' + '-' + '01';
                et = year + '-' + '06' + '-' + '30';
                break;
            case '第三季度':
                st = year + '-' + '07' + '-' + '01';
                et = year + '-' + '09' + '-' + '30';
                break;
            case '第四季度':
                st = year + '-' + '10' + '-' + '01';
                et = year + '-' + '12' + '-' + '31';
                break;
        }
        //console.log('jjjjjjjj', st, et);
        return ({ st: st, et: et })
    }
    this.setData = function(value) {
        var obj = {
            startTime: value.st,
            endTime: value.et,
        }
        that.event._dispatch('selecttime.getValue', obj);
    }
    this.refreshSelectTimeDay = function() {
        selectCont.refreshSelect();
        that.fun({ id: 'day' });
    }
    this.refreshData = function(value) {
        console.log(value, '9999999999999999')
        daypicker.refreshData(value);
    }
}
//原型链一定要有的
module.exports = selectTime;