require("./selectSeason.less");
var html = require("./selectSeason.html");

function selectMouth() {
    this.html = html
    var that = this;
    var nowYear = ''
    var nowMouth = ''
    this.complete = function() {
        this.dom.html(html)
        that.dom.find('.yearValue').html(Number(new Date().getFullYear()));
        nowYear = that.dom.find('.yearValue').html();
        this.changeYear();
        that.changeSeason();
        this.nowParam.opener.on('click', function() {
            that.dom.find('.quarter1').removeClass('hide');
        });
        this.dom.find('.updown').on('click', function() {
            if ($(this).hasClass('up')) {
                if (nowYear > 1970) {
                    nowYear--
                }
            } else {
                if (nowYear < Number(new Date().getFullYear())) {
                    nowYear++
                }
            }
            that.changeYear();
            that.dom.find('.yearValue').html(nowYear);
            //that.event._dispatch('season.getYear', nowYear);
        })
        this.dom.find('.quarter1 dd').on('click', function() {
            that.dom.find('.quarter1 dd').removeClass('current');
            $(this).addClass('current');
            var seasonValue = $(this).html();
            that.dom.find('.quarter1').addClass('hide');
            var num = '';
            switch (seasonValue) {
                case '第一季度':
                    num = '1';
                    break;
                case '第二季度':
                    num = '2';
                    break;
                case '第三季度':
                    num = '3';
                    break;
                case '第四季度':
                    num = '4';
                    break;
            }
            nowYear = that.dom.find('.yearValue').html();
            that.event._dispatch('season.change', { ym: (nowYear + '-' + num), sea: seasonValue });
        });
        this.dom.find('#season-picker-mask').on('click', function() {
            that.dom.hide()
        })
    };
    this.changeSeason = function() {
        nowMouth = Number(new Date().getMonth());
        var season = '';
        switch (nowMouth + 1) {
            case 1:
            case 2:
            case 3:
                season = 1;
                break;
            case 4:
            case 5:
            case 6:
                season = 2;
                break;
            case 7:
            case 8:
            case 9:
                season = 3;
                break;
            case 10:
            case 11:
            case 12:
                season = 4;
                break;
        }
        var aa = that.dom.find('.quarter1 dd').eq('' + (season - 1));
        aa.addClass('current');
    }
    this.changeYear = function() {
        if (nowYear == Number(new Date().getFullYear())) {
            that.dom.find('.up').removeClass('hide');
            that.dom.find('.down').addClass('hide');
            return
        }
        if (nowYear == 1970) {
            that.dom.find('.up').addClass('hide');
            that.dom.find('.down').removeClass('hide');
            return
        }
        that.dom.find('.up').removeClass('hide');
        that.dom.find('.down').removeClass('hide');
    }
    this.resetYear = function() {
        that.dom.find('.yearValue').html(Number(new Date().getFullYear()));
        that.dom.find('.quarter1 dd').removeClass('current');
        that.changeSeason();
    }
}
//原型链一定要有的
module.exports = selectMouth;