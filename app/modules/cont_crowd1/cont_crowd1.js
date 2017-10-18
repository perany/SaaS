require("./cont_crowd1.less");
var resolve1 = $.Deferred()
var title

require.ensure(['../title/title.js'], function(e) {
    title = require('../title/title.js')
    resolve1.resolve()
});
var html=require("./cont_crowd1.html");
var circleJs = require("../../libs/circles.min.js");
var resolve = $.Deferred();
function index(){
    var that = this;
    this.html=html;
    this.complete = function() {
        var title_name = that.nowParam.title;
        var id = that.nowParam.id;
        this.app.returnRequier([resolve1]).done(function() {
            //标题
            that.dom.find('.circleType').addClass(id);
            var dom = that.dom.find('.' + id);
            dom.find('.body_cont').attr('id', id);
            titleCont = that.app.loadModule(title, dom.find('.title_cont'), {
                data: {
                    type: ['title', 'save'],
                    position: ['left1', 'right2'],
                    title: title_name
                }
            });
        })
    }
    this.setData=function(value,obj){
        that.drawCircle(value,obj);
    }
    this.drawCircle = function(arr,obj) {
        var circles = [];
        var colors = ['#85c2ff', '#528fcc', '#3962a0', '#717ccb'];
        var html='';
        that.dom.find('#'+that.nowParam.id).empty();
        for(var i=0;i<arr.percentage.length;i++)
        {
            //console.log('hhh', arr);
            //console.log('hhh', i);
            html='<div class="peopleType'+(i+1)+'" id="'+obj+(i+1)+'"></div>';
            that.dom.find('.body_cont').append(html);
            var id = obj + (i + 1)
            console.log('asdfasfs阿斯顿发顺丰',arr.percentage[i]);
            circles.push(circleJs.create({
                id: id,
                value: arr.percentage[i],
                name: arr.demension[i],
                radius: 70,
                width: 8,
                colors: ['#cfd8dc', colors[i]]
            }));
        }
        that.dom.find('.loading_cont').css('display', 'none');
    };
}
module.exports = index;