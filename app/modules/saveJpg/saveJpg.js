require("./saveJpg.less")
var html = require("./tpl.html")
var api =require("./saveJpg.api.js");

function department(){
	this.html=html
	var that=this;
    var depart
	this.complete=function(){
        api.app=this.app;
        $('.saves').click(function(){
            // 判断一行有几张图表
            if ($(this).parents('.detailTitle').siblings().hasClass('svgShow')) {
                var str = $(this).parents('.detailTitle').siblings('.svgShow').html();
                if(str.indexOf('svg')!=-1){
                    str =$("<p>").append($(this).parents('.detailTitle').siblings('.svgShow').find('svg').clone()).html();
                    $(this).siblings('.inputSvg').val(str);
                    $(this).parent('form').attr('action',api.app.domain+'download/getjpg');
                    $(this).parent('form').submit();
                }else{
                    alert('无图片')
                }
            }else{
                var str = $(this).parents('.detailTitle').siblings('.borLine').find('.svgShow').html();
                if(str.indexOf('svg')!=-1){
                    str =$("<p>").append($(this).parents('.detailTitle').siblings('.borLine').find('.svgShow').find('svg').clone()).html();
                    $(this).siblings('.inputSvg').val(str);
                    $(this).parent('form').attr('action',api.app.domain+'download/getjpg');
                    $(this).parent('form').submit();
                }else{
                    alert('无图片')
                } 
            }
        })
	}

}
//原型链一定要有的
module.exports = department;
