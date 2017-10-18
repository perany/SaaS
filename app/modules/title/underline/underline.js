var html = require("./underline.html");
require("./underline.less");

function underline() {
    var that = this;
    this.html = html;
    this.complete = function() {
        var underlineData = that.nowParam.data;
        var underlineType = that.nowParam.type;
        var html = '';
        var contWidth;
        $.each(underlineData, function(idx, value) {
            if (idx == 0) {
                html += '<li><a type=' + underlineType[idx] + ' class="hasUnderline">' + value + '</a></li>'
            } else {
                html += '<li><a type=' + underlineType[idx] + '>' + value + '</a></li>'
            }
        })
        that.dom.find('.underline').html(html);
        contWidth = that.dom.find('.underline').width();
        that.dom.find('.underline li:eq(0)').css('marginLeft',0.5*(contWidth-64*2)+'px');
        that.dom.find('.underline li').on('click', function() {
            that.underline($(this));
            var type = $(this).children().eq(0).attr('type');
            //console.log('type', type);
            that.event._dispatch('underline.type', type);
        })
    };
    this.underline = function(dom) {
        if (!dom.find('a').hasClass('hasUnderline')) {
            dom.find('a').addClass('hasUnderline');
            dom.siblings().find('a').removeClass('hasUnderline')
        }
    };
}

module.exports = underline;