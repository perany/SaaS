var resolve = $.Deferred()
var title

require("./versionSelect.less");
var html = require("./versionSelect.html");

function index() {
    var that = this;
    this.html = html;
    var versionListDiv = [];
    var num = 0;
    var chooseNum = [];
    this.complete = function() {
        that.dom.find('.versionNum input').val('已选择0个');
    };
    this.setData = function(val) {
        that.dom.find('.versionNum input').val('已选择0个');
        that.dom.find('.versionSum').empty();
        console.log('/////', val);
        var html = '';
        var i = 0;
        if (val.length > 0) {
            $.each(val, function(index, value) {
                i++
                if (index < 4) {
                    html += '<div class="versionList" id="' + value.id + '"><ul><li class="check fl"><div data_id="' + value.id + '" class="check-box choose"></div></li><li class="fl">' + value.name + '</li></ul></div>';
                } else {
                    html += '<div class="versionList" id="' + value.id + '"><ul><li class="check fl"><div data_id="' + value.id + '" class="check-box"></div></li><li class="fl">' + value.name + '</li></ul></div>';
                }
            })
            if (i < 4) {
                that.dom.find('.versionNum input').val('已选择' + i + '个');
            } else {
                that.dom.find('.versionNum input').val('已选择4个');
            }
            that.dom.find('.versionSum').html(html);
        }
        that.dom.find('.versionNum').on('click', function() {
            if (that.dom.find('.versionSum').children().length > 0) {
                that.dom.find('.versionSum').removeClass('hide');
                that.dom.find('.select-mask').removeClass('hide')
            } else {
                that.dom.find('.versionSum').addClass('hide')
            }
        });
        that.dom.find('.select-mask').on('click', function() {
            that.dom.find('.versionSum').addClass('hide');
            that.dom.find('.select-mask').addClass('hide');
            that.dom.find('.versionTips').addClass('hide')
            that.dom.find('.versionTips1').addClass('hide')
            var versionIds = '';
            var len = that.dom.find('.choose').length;
            that.dom.find('.versionNum input').val('已选择' + len + '个');
            $.each(that.dom.find('.choose'), function(idx) {
                if (idx < 4) {
                    if (idx == 0) {
                        versionIds += $(this).attr('data_id')
                    } else {
                        versionIds += ',' + $(this).attr('data_id')
                    }
                }
            })
            that.event._dispatch('version.dataid', versionIds.toString())
        });
        that.dom.find('.check-box').on('click', function() {
            that.dom.find('.versionTips').addClass('hide')
            that.dom.find('.versionTips1').addClass('hide')
            if ($(this).hasClass('choose')) {
                var len1 = that.dom.find('.choose').length;
                console.log('len1', len1)
                if (len1 > 1) {
                    $(this).removeClass('choose');
                } else {
                    that.dom.find('.versionTips1').removeClass('hide')
                }

            } else {
                var len = that.dom.find('.choose').length;
                //console.log('len', len)
                if (len < 4) {
                    $(this).addClass('choose');
                } else {
                    that.dom.find('.versionTips').removeClass('hide')
                }
            }
        });
    }
}
module.exports = index;