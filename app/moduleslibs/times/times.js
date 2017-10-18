function index() {
    var that = this;
    var daypicker = null
    require("./times.less");
    var html = require("./times.html");
    var time = require('../selectdate/selectdate.js');
    this.html = html;
    this.complete = function() {
        //console.log('dsakdlaskdl', this.dom)
        //this.dom.append(html);
        this.nowParam.type = this.nowParam.type ? this.nowParam.type : "d"
            //this.startDay = this.nowParam.startDay ? this.nowParam.startDay : Tool.GetDateStr(-1)
            //console.log('类型', this.nowParam)
        var hasBtn = this.nowParam.btn;
        if (hasBtn) {
            that.dom.find('.chooseData').removeClass('chooseData1');
            that.dom.find('.hbBtn').removeClass('hide');
            that.dom.find('.iconTime').css('right', '65px');
        }
        that.Timer();
    }
    this.Timer = function() {
        that.dom.find('.day-picker-content').hide()
        that.dom.find('#day-picker').hide();
        var nowEl

        if (this.nowParam.type == 'd') {
            //console.log('类型是d');
            nowEl = '#day-picker'
            if (this.nowParam.startDay) {
                that.dom.find('.Timers').val(this.nowParam.startDay + '至' + Tool.GetDateStr(-1));
            } else {
                that.dom.find('.Timers').val(Tool.GetDateStr(-1) + '至' + Tool.GetDateStr(-1));
            }
        } else {
            //console.log('类型是s');
            that.dom.find('.Timers').val(Tool.GetDateStr(-1));
            nowEl = '#day-picker1'
        }
        var begin = '';
        var end = '';
        // console.log(this.nowParam.type)
        daypicker = this.app.loadModule(time, this.dom.find(nowEl), {
            mode: this.nowParam.type,
            data: { startday: this.nowParam.startDay ? this.nowParam.startDay : Tool.GetDateStr(-1), endday: Tool.GetDateStr(-1), max: Tool.GetDateStr(-1), min: that.nowParam.min, alert: that.nowParam.alert }
        })

        this.dom.find('.Timers').on('click', function() {
            //console.log(that.nowParam.type )
            if (that.nowParam.type == 'd') {
                that.dom.find('#day-picker').show()
            } else {
                that.dom.find('#day-picker1').show()
            }
        })
        daypicker.event._addEvent('day.close', function() {

        })
        daypicker.event._addEvent('day.picker', function(value) {
            //console.log('time', value);
            startDa = value.st;
            endDa = value.et;
            // begin = startDa.replace(/-/g, '/');
            // end = endDa.replace(/-/g, '/');
            if (that.nowParam.type == 'd') {
                that.dom.find('.Timers').val(startDa + '至' + endDa);
            } else {
                that.dom.find('.Timers').val(startDa);
            }
            var date = {
                startDay: startDa,
                endDay: endDa
            };
            //console.log('date', date);
            that.event._dispatch('times.startend', date);
        });
    };
    this.refreshData = function(value) {
        daypicker.refreshData(value);
    };
    //限制最大最小开始和结束
    // this.refreshData = function(value) {
    //     daypicker.setMaxmin({ max: value.endDay, min: value.startDay })
    //         //}
    //     if (this.nowParam.type == 'd') {
    //         daypicker.refresh({ st: value.startDay, et: value.endDay })
    //         that.dom.find('.Timers').val(value.startDay + '至' + value.endDay);
    //     } else {
    //         daypicker.showMouth(value.startDay, 'left')
    //         that.dom.find('.Timers').val(value.startDay);
    //     }
    //     //that.Timer();
    // };
    //限制开始和结束
    // this.refreshData1 = function(value) {
    //     if (this.nowParam.type == 'd') {
    //         daypicker.refresh({ st: value.startDay, et: value.endDay })
    //         that.dom.find('.Timers').val(value.startDay + '至' + value.endDay);
    //     } else {
    //         daypicker.showMouth(value.startDay, 'left')
    //         that.dom.find('.Timers').val(value.startDay);
    //     }
    //     //that.Timer();
    // };
    this.rest = function() {
        that.dom.find('#day-picker').empty();
        daypicker = null
        that.Timer();
    }
    this.showMouth = function(value) {
        daypicker.showMouth(value.startDay, 'left')
    }
    this.refreshSelectTimeDay = function() {
        daypicker.refreshData({ startDay: Tool.GetDateStr(-1), endDay: Tool.GetDateStr(-1) })
    }
};
module.exports = index;