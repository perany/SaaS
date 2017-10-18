//城市地图
var map;
var chinamap;
var resolve1 = $.Deferred();
var resolve2 = $.Deferred();
require.ensure(['../../utils/drawmap.js'], function(e) {
    map = require('../../utils/drawmap.js');
    resolve1.resolve();
});
require.ensure(['../../utils/chinamap.js'], function(e) {
    chinamap = require('../../utils/chinamap.js');
    resolve2.resolve();
});

function index() {
    var that = this;
    this.setData = function(value) {
        this.data = value;
        that.cityRegion();
    };
    //城市图
    this.cityRegion = function() {
        that.dom.empty();
        var svgEx1 = new this.app.svgLib({
            width: 424,
            height: 430,
            el: that.dom[0].id,
            fontColor: '#510000'
        });
        var tip1 = new this.app.svgTip('map');
        var newGeo = {}
        var leng = that.data.length > 10 ? 10 : that.data.length
        for (var i = 0; i < leng; i++) {
            //console.log(dataMap[i])
            if (chinamap.geoCoord[that.data[i]]) {
                newGeo[that.data[i]] = chinamap.geoCoord[that.data[i]]
            }
        }
        Tool.addObject({
            datacolor: "#87c6fd",
            overcolor: '#ffdd0b',
            bgcolor: '#cfd8dc',
            geo: newGeo,
            mouseover: function(value) {
                // console.log(value);
                // var html = '<p stype="position;absolute">' + value.data + '</p>';
                // tip1.html(html);
                // tip1.show(value.mousepos);
            },
            mouseout: function() {
                //tip1.hide();
            }
        }, svgEx1)
        svgEx1.chinaMapConfig = chinamap
        map.drawMap(svgEx1)
    };

}
module.exports = index;