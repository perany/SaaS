require("./Radio.less");
var html = require("./Radio.html");

function radio() {
    this.html = html
    var that = this;
    this.complete = function() {
        // console.log('0909090090', that.nowParam);
        var more = that.nowParam.data.more;
        if (more) {
            that.dom.find('.radio-more').removeClass('hide');
        } else {
            that.dom.find('.radio-more').addClass('hide');
        }
        //console.log('00000000', that.nowParam.data)
        that.dom.find('.radio-control').attr('type', that.nowParam.data.type);
        that.dom.find('.radio-more-btn').click(function() {
            if ($(this).siblings('.radio-div').hasClass('hide')) {
                $(this).siblings('.radio-div').removeClass('hide')
            } else {
                $(this).siblings('.radio-div').addClass('hide')
            }
        })
        that.eventPlus();
        that.dom.find('.radio-sure').click(function() {
            var len = $(this).parents('.radio-div').find('dt .selected').length;
            var html = '';
            if (len > 0) {
                for (var i = 0; i < 5; i++) {
                    if (i == 0) {
                        html += '<span class="radios selected">' +
                            '<i></i>' + $(this).parents('.radio-div').find('dt .selected').eq(i).prop("outerHTML") +
                            '</span>'
                    } else {
                        if ($(this).parents('.radio-div').find('dt .selected').eq(i).prop("outerHTML")) {
                            html += '<span class="radios">' +
                                '<i></i>' + $(this).parents('.radio-div').find('dt .selected').eq(i).prop("outerHTML") +
                                '</span>'
                        }
                    }
                }
            }
            //console.log(html);
            that.dom.find('.radio-list ').empty().append(html);
            var firstDom = that.dom.find('.radios span').eq(0);
            that.dealData(firstDom);
            that.dom.find('.radio-div').addClass('hide');
            that.dom.find('.radios i').on('click', function() {
                that.dom.find('.radios').removeClass('selected');
                $(this).parents('.radios').addClass('selected');
                that.dealData($(this).siblings('.selected'));
            })
        })
        that.dom.find('.radios i').on('click', function() {
            that.dom.find('.radios').removeClass('selected');
            $(this).parents('.radios').addClass('selected');
            that.dealData($(this).siblings('.contName'));
        })
    };
    this.eventPlus = function() {
        that.dom.find('.radio-detail dt span').unbind('click').click(function() {
            var newId = $(this).attr('data_id');
            $(this).remove();
            for (var i = 0; i < that.dom.find('.radio-detail dd span').length; i++) {
                if (that.dom.find('.radio-detail dd span').eq(i).attr('data_id') == newId) {
                    that.dom.find('.radio-detail dd span').eq(i).removeClass('selected');
                }
            }
            that.eventPlus();

        })
        that.dom.find('.radio-detail dd span').unbind('click').click(function() {
            if (!$(this).hasClass('selected')) {
                if (that.dom.find('.radio-detail dt span').length < 5) {
                    $(this).addClass('selected');
                    that.dom.find('.radio-detail dt').append($(this).prop("outerHTML"));
                }
            }
            that.eventPlus();
        })
    };
    this.dealData = function(dom) {
        var json = {
            id: dom.attr('data_id'),
            start: dom.attr('start'),
            end: dom.attr('end'),
            start: dom.attr('start'),
            name: dom.text(),
            type: dom.parent().parent().parent().attr('type')
        }
        // console.log('lllll', json);
        that.event._dispatch('radio.data', json);
    }
    this.setData = function(val) {

    };


}
//原型链一定要有的
module.exports = radio;