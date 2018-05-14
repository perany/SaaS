var resolve1 = $.Deferred()
require("./detailCont.less");
var html = require("./detailCont.html");

function index() {
    var that = this;
    this.html = html;
    var data
    this.complete = function() {
        // console.log('yytyyytt', that.nowParam)
        that.dom.find('.transform').attr('type', that.nowParam.type);
        that.dom.find('.smallBox').on('click', function() {
            var len = that.dom.find('.disbaled');
            var par = $(this).parent().attr('type');
            // console.log('len1', par);
            if (!$(this).hasClass('disbaled') && len.length < 2) {
                var data_id = $(this).attr('data_id');
                that.dom.find('.smallBox').removeClass('selected');
                $(this).addClass('selected');
                //console.log('data_id', data_id);
                that.event._dispatch('saveBtn.data', { id: data_id, type: par });
            }
        })
    };
    //留存
    this.timeDiff = function(val, type) {
        that.dom.find('.smallBox').addClass('disbaled');
        that.dom.find('.smallBox').removeClass('selected');
        //console.log('888888', val, type);
        if (val >= 2) {
            that.dom.find('.smallBox').eq(0).removeClass('disbaled')
            that.dom.find('.smallBox').eq(0).addClass('selected')
        }
        if (val >= 14) {
            that.dom.find('.smallBox').eq(0).removeClass('disbaled')
            that.dom.find('.smallBox').eq(1).removeClass('disbaled')
            that.dom.find('.smallBox').eq(0).addClass('selected')
        }
        if (val >= 60) {
            that.dom.find('.smallBox').removeClass('disbaled')
            that.dom.find('.smallBox').eq(0).addClass('selected')
        }
    };
    //转化
    this.timeDiff1 = function(val, type) {
        that.dom.find('.smallBox').addClass('disbaled');
        that.dom.find('.smallBox').removeClass('selected');
        //console.log('888888', val, type);
        if (val >= 0) {
            that.dom.find('.smallBox').eq(0).removeClass('disbaled')
            that.dom.find('.smallBox').eq(0).addClass('selected')
        }
        if (val >= 7) {
            that.dom.find('.smallBox').eq(0).removeClass('disbaled')
            that.dom.find('.smallBox').eq(1).removeClass('disbaled')
            that.dom.find('.smallBox').eq(0).addClass('selected')
        }
        if (val >= 30) {
            that.dom.find('.smallBox').removeClass('disbaled')
            that.dom.find('.smallBox').eq(0).addClass('selected')
        }
    }
}
module.exports = index;