require("./portaitSex.less");
var html = require("./portaitSex.html");
var title
var resolve2 = $.Deferred();
require.ensure(['../../title/title.js'], function(e) {
    title = require('../../title/title.js')
    resolve2.resolve()
});

function index() {
    var that = this;
    this.html = html;

    this.complete = function() {
        var id = that.nowParam.data.id;
        this.app.returnRequier([resolve2]).done(function() {
            that.dom.find('.portaitSex').addClass(id);
            var dom = that.dom.find('.' + id);
            dom.find('.body_cont').attr('id', id);
            titleCont = that.app.loadModule(title, dom.find('.title_cont'), {
                data: that.nowParam.title
            });
        })
    };
    this.setData = function(val) {
        that.dom.find('#' + val.id).empty();
        var html_ = '';
        for (var i = 0; i <val.name.length; i++) {
            var icons = val.icon == undefined ? '' : val.icon[i];
            html_ += '<dl>' +
                '<dt class="clearfix">' +
                '<span class="fl"><i class="' + icons + '"></i></span>' +
                '<span style="margin-top: 7px;">' + val.name[i] + '</span>'+
                '<span class="fr">' + Tool.moneyFormat(val.percentage[i]) + '%</span>' +
                '</dt>' +
                '<dd class="speed">' +
                '<span class="sp1"></span><span class="sp2" style="width:' + val.percentage[i] + '%;background-color:' + val.color[i] + '"></span>' +
                '</dd>' +
                '</dl>';
        }
        // console.log("00000000000000000000000000",val,that.dom.find("#" + val.id),html_,);
        that.dom.find(".body_cont").append(html_);
    }
}
module.exports = index;