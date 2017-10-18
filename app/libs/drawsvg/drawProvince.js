//省份地图
var map;
var chinamap;
var resolve1 = $.Deferred();
var resolve2 = $.Deferred();
require.ensure(['./drawmap.js'], function(e) {
    map = require('./drawmap.js');
    resolve1.resolve();
});
require.ensure(['./chinamap.js'], function(e) {
    chinamap = require('./chinamap.js');
    resolve2.resolve();
});

function index() {
    var that = this;
    this.setData = function(value) {
        this.data = value;
        this.app.returnRequier([resolve1,resolve2]).done(function() {
            that.regionChartFun();
        });
    };
    this.regionChartFun = function() {
        that.dom.empty();
        var svgEx1 = new this.app.svgLib({
            width: 424,
            height: 430,
            el:that.dom[0].id,
            fontColor: '#510000'
        })
        var dataName = {};
        var leng=that.data.length>10?10:that.data.length;
        for (var i = 0; i < leng; i++) {
            for (var j in chinamap.names) {
                if (that.data[i].lastIndexOf(chinamap.names[j]) != -1) {
                    dataName[j] = 10
                }
            }
        }
        Tool.addObject({
            datacolor: "#87c6fd",
            overcolor: '#ffdd0b',
            bgcolor: '#cfd8dc',
            data: dataName,
            mouseover: function(value) {
                //console.log('disiodsua')
            },
            mouseout: function() {

            }
        }, svgEx1)
        svgEx1.chinaMapConfig = chinamap
        map.drawMap(svgEx1)

    };

}
module.exports = index;