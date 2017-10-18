require("./maps.less");
var resolve1 = $.Deferred()
var resolve2 = $.Deferred()
var resolve3 = $.Deferred()
var resolve4 = $.Deferred()
var resolve5 = $.Deferred()
var html = require("./maps.html");
var title, province, line, city, map;
var titleCont = null,
    provinceC = null,
    lineC = null,
    cityC = null,
    mapC = null;

require.ensure(['../title/title.js'], function(e) {
    title = require('../title/title.js')
    resolve1.resolve()
});
require.ensure(['../../libs/drawsvg/drawProvince.js'], function(e) {
    province = require('../../libs/drawsvg/drawProvince.js');
    resolve2.resolve();
});
require.ensure(['../mapLine/mapLine.js'], function(e) {
    line = require('../mapLine/mapLine.js');
    resolve3.resolve();
});
require.ensure(['../../libs/drawsvg/drawCity.js'], function(e) {
    city = require('../../libs/drawsvg/drawCity.js');
    resolve4.resolve();
});
require.ensure(['../../libs/drawsvg/drawmap.js'], function(e) {
    map = require('../../libs/drawsvg/drawmap.js');
    resolve5.resolve();
});
var arrMap;

function index() {
    var that = this;
    this.html = html;
    this.complete = function() {
        var id = that.nowParam.data.id;
        this.app.returnRequier([resolve1, resolve2, resolve3, resolve4, resolve5]).done(function() {
            //标题
            that.dom.find('.maps').addClass(id);
            var dom = that.dom.find('.' + id);
            titleCont = that.app.loadModule(title, dom.find('.title_cont'), {
                data: that.nowParam.title
            });

            titleCont.event._addEvent('title.underline', function(val) {
                console.log('=====', val);
                that.event._dispatch('crowd.type', val)
            });
        })
    }
    this.setData = function(value, a) {
        arrMap = [];
        this.data = value;
        $.each(this.data, function(idx, val) {
            arrMap.push(val.demension);
        });
        this.app.returnRequier([resolve1, resolve2, resolve3, resolve4, resolve5]).done(function() {
            switch (a) {
                case "1":
                    // that.dom.find('.index91 #map').removeClass('hide');
                    // that.dom.find('.index91 .mapLine').removeClass('hide');
                    that.renderProvince();
                    break;
                case "2":
                    that.dom.find('.index91 #map').removeClass('hide');
                    that.dom.find('.index91 .mapLine').removeClass('hide');
                    that.renderCity();
                    break;
            }
            that.dom.find('.loading_cont').css('display', 'none');
        });
    };
    this.renderProvince = function() {
        provinceC = that.app.loadModule(province, that.dom.find('#map'));
        provinceC.setData(arrMap);
        lineC = that.app.loadModule(line, that.dom.find('.mapLine'));
        lineC.setData(that.data);
    }
    this.renderCity = function() {
        cityC = that.app.loadModule(city, that.dom.find('#map'));
        cityC.setData(arrMap);
        console.log("@@@@", line)
        lineC = that.app.loadModule(line, that.dom.find('.mapLine'));
        lineC.setData(that.data);
    }

}
module.exports = index;