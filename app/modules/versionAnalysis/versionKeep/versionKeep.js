var resolve = $.Deferred()
var resolve1 = $.Deferred()
var lineTwo
var title

require.ensure(['../../../modules/drawLine/lineTwo.js'], function(e) {
    lineTwo = require('../../../modules/drawLine/lineTwo.js')
    resolve.resolve()
});
require.ensure(['../../../modules/title/title.js'], function(e) {
    title = require('../../../modules/title/title.js')
    resolve1.resolve()
});
require("./versionKeep.less");
var html = require("./versionKeep.html");

function index() {
    var that = this;
    this.html = html;
    var titleCont = null;
    var lineTwoCont = null;
    this.complete = function() {
       var id = that.nowParam.line.id;
        this.app.returnRequier([resolve, resolve1]).done(function() {
            that.dom.find('.actCont1').addClass(id);
            var dom = that.dom.find('.' + id);
            dom.find('.body_cont').attr('id', id);
            titleCont = that.app.loadModule(title, dom.find('.title_cont'), {
                data: that.nowParam.title
            });
            titleCont.event._addEvent('title.radio', function(val) {
                that.event._dispatch('line.radio', val);
            });
            titleCont.event._addEvent('title.saveBtn', function(val) {
                that.event._dispatch('cont.saveBtn', val);
            });
        })

    };
    this.setData = function(val){
           //console.log('1111555',val)
           lineTwoCont = that.app.loadModule(lineTwo, that.dom.find('.body_cont'), {
             data: val
     });
    }
    this.setRadioData = function(val, type, more) {
        this.app.returnRequier([resolve1]).done(function() {
            titleCont.setRadioData(val, type, more);
        })
    };
    this.timeDiff = function(val, type) {
        titleCont.timeDiff(val, type);
    };
    this.timeDiff1 = function(val, type) {
        titleCont.timeDiff1(val, type);
    };
}
module.exports = index;