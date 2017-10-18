var resolve4 = $.Deferred()
require("./VeDifferent.less");
var html = require("./VeDifferent.html");
var cicle = require("../../../libs/drawsvg/drawradar.js")

function index() {
    var that = this;
    this.html = html;
    var color = null;
    color = ['#85c2ff', '#528fcc', '#3962a0', '#717ccb', '#9980b9']
    this.complete = function() {
       var ABSdifRate = [];
       var child = [];
      var len = that.nowParam.sumUv.length; 
       for(var i=0;i<=len-1;i++){
       	ABSdifRate[i] = Math.abs(that.nowParam.rate[i]);
       	//console.log('44444',ABSdifRate[i])
       //	child[i] = document.getElementsByClassName('Ve_circle'+i);
       var randmId='Ve_circle'+Math.floor(new Date().getTime()*Math.random())
       that.dom.find('.Ve_circle'+i).attr('id',randmId)
       	child[i]=this.dom.find('#'+randmId)
        //console.log(child[i].width(),randmId,child[i])
      // 	console.log("1221213333",child[i].width())
        that.dom.find('.Ve_text'+i).css('margin-left',child[i].width()-0.5*child[i].width()-165/2);
        that.dom.find('.Ve_text'+i).css('margin-top',-0.5*(Math.floor(i/4)+1)*child[i].width()-165/2);
       	 var svgEx1 = new that.app.svgLib({
                                width: child[i].width(),
                                height: child[i].width(),
                                el: randmId
                            })


                            // var tip1 = new this.app.svgTip(objs.selector.substring(1))
                       // var tip1 = new that.app.svgTip(randmId)

                        var color1 = [color[i % 5], '#E1E1E1'];
                        var a = ABSdifRate[i] > 100 ? 100 : ABSdifRate[i];
                        svgEx1.data = [a, 100 - a],
                        svgEx1.color = color1;
                        svgEx1.x=[];
                        svgEx1.disWhite = true;
                        svgEx1.circleTxt = false;
                        svgEx1.textlist = true;
                        Tool.addObject({
                            format: function(value) {
                                return value
                            },
                            mouseover: function(value) {
                                return ''
                            },
                            mouseout: function() {
                                return ''
                            },
                            formatKdX:function(){

                            }

                        }, svgEx1)
                        console.log('@@@@@@!!!',
                        	)
                        cicle.drawCicle(svgEx1);
             
       }



   	     
   }

       this.setData = function(data) {
}

     
    };

 

module.exports = index;