//var html = require("./rectangle.html");
var resolve = $.Deferred();
var resolve1 = $.Deferred();
var rect;
var title;
require.ensure(['../../libs/drawsvg/drawrect.js'], function(e) {
    rect = require('../../libs/drawsvg/drawrect.js');
    resolve.resolve();
});
require.ensure(['../title/title.js'], function(e) {
    title = require('../title/title.js')
    resolve1.resolve()
});
var arr=[4213,3452,1234,2323];
var arr2=['#b7b0de', '#9980b9', '#717ccd', '#44a4f9']
//rectangle
require("./column.less");
var html = require("./column.html");

function index() {
    var that = this;
    this.html = html;
    var titleCont = null;
    var rectangleCont = null;
    // this.setData = function (val) {
        
    //         console.log(0000,val)
            

    // }
     this.complete = function() {
        var id = that.nowParam.data.id;
       

         this.app.returnRequier([resolve1]).done(function() {
            //标题
            that.dom.find('.actCont1').addClass(id);
            var dom = that.dom.find('.' + id);
            dom.find('.body_cont').attr('id', id);
            titleCont = that.app.loadModule(title, dom.find('.title_cont'), {
                data: that.nowParam.title
            });
            
            //内容
            that.draw();
        })

       
    }
    this.draw = function(val) {
        console.log('矩形数据',val);
        this.app.returnRequier([resolve]).done(function() {
            var svgRect = new that.app.svgLib({
        width: 1000,
        height: 350,
        el: "versionAnalysis1",
    })
        svgRect.drawXk({
        ftype:'normal',
        ctype:'more',
        x: ["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00","24:00",],
        data: [arr,arr,arr,arr],
        xytext: {x:'middle', y:'bottom'},
        top: 20,
        unit: '',
        color: [arr2,arr2,arr2,arr2],
        ruleshow: {x:true, y:true},
        xyshow: {linenum:2, close:true},
        range: [0.1, 0.1],
        format: function(num) {
            return num + '万元';
        },
         mouseover: function() {
            //alert(111)
                
            },
            mouseout: function() {
                
            }
    });
        
    if (!rect) {
        resolve.done(function() {
            rect.drawRecX(svgRect.data)
        })
        } else {
            rect.drawRecX(svgRect.data)
        }
        })
    }

}


//原型链一定要有的
module.exports = index;