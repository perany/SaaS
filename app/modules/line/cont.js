var resolve = $.Deferred()
var resolve1 = $.Deferred()
var lineTwo
var title
    //var moduleBase = require('../../../app/base/modulesbase.js');
    //var save = require("../saveJpg/saveJpg.js");
    //var actives = require("../selectActive/selectActive.js");
    //var app = require('../../../app/app.js');


require.ensure(['../drawLine/lineTwo.js'], function(e) {
    lineTwo = require('../drawLine/lineTwo.js')
    resolve.resolve()
});
require.ensure(['../title/title.js'], function(e) {
    title = require('../title/title.js')
    resolve1.resolve()
});
require("./cont.less");
var html = require("./cont.html");

// var saveBase = new moduleBase();
// save.call(saveBase);
// var activesBase = new moduleBase();
// actives.call(activesBase);


function index() {
    var that = this;
    this.data = '';
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
    }
    this.setData = function(val) {
        lineTwoCont = that.app.loadModule(lineTwo, that.dom.find('.body_cont'), {
            data: val
        });
    };
    this.setRadioData = function(val, type, more) {
        this.app.returnRequier([resolve1]).done(function() {
            titleCont.setRadioData(val, type, more);
        })
    };
    this.setSmallRect = function(data, data1) {
        this.app.returnRequier([resolve1]).done(function() {
            titleCont.setSmallRect(data, data1)
        })
    }
    this.timeDiff = function(val, type) {
        this.app.returnRequier([resolve, resolve1]).done(function() {
            titleCont.timeDiff(val, type);
        })
    };
    this.timeDiff1 = function(val, type) {
        this.app.returnRequier([resolve, resolve1]).done(function() {
            titleCont.timeDiff1(val, type);
        })
    };
    // this.setTitle = function(val) {
    //     titleCont.setTitle(val)
    // }
    // this.setTitleTwo = function(val) {
    //     titleCont.setTitleTwo(val)
    // }
}
module.exports = index;