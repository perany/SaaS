var resolve = $.Deferred()
var resolve1 = $.Deferred()
var line
var title
require.ensure(['../../libs/drawsvg/drawline.js'], function(e) {
    line = require('../../libs/drawsvg/drawline.js');
    resolve.resolve();
});
require.ensure(['../title/title.js'], function(e) {
    title = require('../title/title.js')
    resolve1.resolve()
});
var dataX=["2017.8.1","2017.8.1","2017.8.1","2017.8.1","2017.8.1","2017.8.1"];
require("./curve.less");
var html = require("./curve.html");



function index() {
    var that = this;
    this.data = '';
    this.html = html;
    var type = '';
    var width = '';
    var id = '';
    var titleCont = null;
    var lineCont = null;
    this.setData = function (val) {
        
            console.log(4444,val)
            

    }
    this.complete = function() {
        var id = that.nowParam.data.id;
         this.app.returnRequier([ resolve1]).done(function() {
            //标题
            that.dom.find('.actCont1').addClass(id);
            var dom = that.dom.find('.' + id);
            dom.find('.body_cont').attr('id', id);
            titleCont = that.app.loadModule(title, dom.find('.title_cont'), {
                data: that.nowParam.title
            });
            console.log(6789, id);
            //内容
        })
        that.draw();
       
    }

     this.draw = function(val){
 this.app.returnRequier([resolve]).done(function() {
            console.log(9999,val)
        var svgLine = new that.app.svgLib({
        width: 1000,
        height: 350,
        el: "curveLine",
        
    });
        var arr2=[[200,400,300,350,150,100],[364,291,402,390,123,235],[100,200,130,30,180,250]]

    svgLine.drawXk({
        ftype: 'normal',
        ctype: 'more',
        xytext: {x:'middle', y:'bottom'},
        fillColor: ['','',''],
        lineColor: ['#85c2ff','#fe3f3f','#b7a1e0'],
        xyshow: {linenum:2, close:true},
        ruleshow: {x:true, y:true},
        range: [0.07, 0.07],
        x: dataX,
        data: arr2,
        circleShow: [false,false,false],
        modulus: [false, false,false],
        modulusRate: [],
        chaincolor:[],
        formatKdY: function(value) {
            return value + '元';
        },
        mouseover: function(value) {
                var html = '';
                html += '<span style="color:#fff">' + dataX[value.index] + '</span>'
                html += '<span style="color:#fff">人均消费： </span>'
                
            },
            mouseout: function() {
                
            }

    });

        if (!line) {
            resolve.done(function() {
                line.drawLine(svgLine.data)
            })
        } else {
            line.drawLine(svgLine.data)
        }

    })


     }
}
module.exports = index;