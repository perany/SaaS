var  resolve  =  $.Deferred()
var  resolve1  =  $.Deferred()
var  resolve2  =  $.Deferred()
var  resolve3  =  $.Deferred()
var  resolve4  =  $.Deferred()
var  top
var  line
require.ensure(['../moduleslibs/topCont/topCont.js'],  function(e)  {
        top  =  require('../moduleslibs/topCont/topCont.js')
        resolve.resolve()
});
require.ensure(['../modules/line/cont.js'],  function(e)  {
        line  =  require('../modules/line/cont.js')
        resolve1.resolve()
});

function  activeAnalysis()  {
        var  that  =  this;
        var  topCont  =  null;
        var  lineCont  =  null;
        var  lineCont1 = null;
        var  osId  =  '2';
        var  myDate  =  new  Date(new  Date().getTime()  -  86400000);
        var  startDate  =  Tool.backTime(myDate);
        var  endDate  =  Tool.backTime(myDate);
        var  campaignId = '14';
        // var  choosenType  =  '80';
        // var  choosenDay  =  7;
        // var  choosenEventid  =  null;
        var  matchTable  =  ['startTime',  'endTime',  'eventgroup'];
        this.complete  =  function()  {
            this.app.returnRequier([resolve,  resolve1]).done(function()  {
                lineCont  =  that.app.loadModule(line,  that.dom.find('.activeAnalysis1'),  {
                    line:  {
                        id:  'activeAnalysis1',
                    },
                    title:  {
                        title:  '活动新增用户成本',
                        type:  ['title',  ' ',  ' '],
                        position:  ['left1',  ' ',  ' ']
                    }
                })

                that.campaignListDb(lineCont);
             
                that.activeAddsDb();
                
                
                lineCont1 = that.app.loadModule(line, that.dom.find('.activeAnalysis2'),{
                    line: {
                        id: 'activeAnalysis2',
                    },
                    title: {
                        title: '活动活跃用户成本',
                        type: ['title', ' ', ' '],
                        position: ['left1',' ',' ']
                    }
                })
                that.campaignListDb(lineCont1);
                that.activeUserCostAnalysisDb();
            });
    }
    this.valueListDb = function() {
        var json = {
            type: 'eventgroup',
            osId: osId
        }
        that.api.valueList(json).then(function(res) {
            if (res.data.length > 0) {
                $.each(res.data, function(idx, val) {
                    val.id = val.typeCode;
                    val.name = val.typeName
                })
                topCont.initSelectData(res.data, 'db');
            }
        })
    }


    this.activeAddsDb = function () {
        that.dom.find('.activeAnalysis1 .actCont1 .body_cont').addClass('hide');
        lineCont.hideDataNull();
        lineCont.hideRefresh();
        lineCont.showLoading();
        var dataPara = {
            startTime: '2017-07-12',
            endTime: '2017-07-13',
            osId: 2,
            campaignId: 14
        };
        //console.log('uuuu',dataPara)
        that.api.cpgaAnalysis(dataPara).then(function (res) {
           // console.log('返回',res)
            var response = {
                "meta":{"success":true,"message":"ok"},
                "data":[
                {"cost":"0.33","time":"0"},
                {"cost":"0.54","time":"1"},
                {"cost":"0.89","time":"2"},
                {"cost":"1.51","time":"3"},
                {"cost":"1.61","time":"4"},
                {"cost":"0.81","time":"5"},
                {"cost":"0.46","time":"6"},
                {"cost":"0.42","time":"7"},
                {"cost":"0.39","time":"8"},
                {"cost":"0.27","time":"9"},
                {"cost":"0.23","time":"10"},
                {"cost":"0.27","time":"11"},
                {"cost":"0.24","time":"12"},
                {"cost":"0.24","time":"13"},
                {"cost":"0.26","time":"14"},
                {"cost":"0.22","time":"15"},
                {"cost":"0.25","time":"16"},
                {"cost":"0.29","time":"17"},
                {"cost":"0.26","time":"18"},
                {"cost":"0.23","time":"19"},
                {"cost":"0.17","time":"20"},
                {"cost":"0.16","time":"21"},
                {"cost":"0.18","time":"22"},
                {"cost":"0.26","time":"23"}
            ]}
            lineCont.hideLoading();
            // var doName = [];
            // var doNum = [];
            // var doAveNum = [];
            // var num = [];
            if (response.meta.success == true) {
                lineCont.hideRefresh();
            //     //只要res.data.chooselist和res.data.oldAvglist有一个不为空
                 var dataX = [];
                 var arr1 = [];
                 if (response.data.length > 0) {
                      lineCont.hideDataNull();
                     that.dom.find('.activeAnalysis1 .actCont1 .body_cont').removeClass('hide');
                     $(response.data).each(function(i,val){
                        dataX.push(val.time);
                        arr1.push(val.cost)
                     })
                       var data = {
                            type: '3',
                            id: 'activeAnalysis1',
                            width: that.dom.find('.activeAnalysis1').width()-20,
                            lineColor: ['#47b7af'],
                            fillColor: ['#a1dad6'],
                            x: dataX,
                            data: arr1
                        }
                        lineCont.setData(data);
                } else {
                    lineCont.showDataNull();
                    that.dom.find('.activeAnalysis1 .actCont1 .body_cont').addClass('hide');
                }
            }
            else {
                lineCont.showRefresh();
            }   
        });
    }


    this.activeUserCostAnalysisDb = function(){
        that.dom.find('.activeAnalysis2 .actCont1 .body_cont').addClass('hide');
        lineCont1.hideDataNull();
        lineCont1.hideRefresh();
        lineCont1.showLoading();
        var json = {
            startTime:'2017-06-26',
            endTime: '2017-07-20',
            osId: 1,
            campaignId: 29
        }
        that.api.activeUserCostAnalysis(json).then(function(res){
            var res = {
                "meta":{"success":true,"message":"ok"},
                "data":[
                         {"cost":"536.74","time":"8"},
                         {"cost":"536.74","time":"14"},
                         {"cost":"536.74","time":"17"},
                         {"cost":"536.74","time":"18"}
                        ]
                     }
            lineCont1.hideLoading();
            if(res.meta.success == true){
                if(res.data.length > 0){
                    lineCont1.hideDataNull();
                    that.dom.find('.activeAnalysis2 .actCont1 .body_cont').removeClass('hide');
                    var dataX = [];
                    var arr1 = [];
                    $(res.data).each(function(i,val){
                        dataX.push(val.time);
                        arr1.push(val.cost);
                    })
                    var data = {
                        type: '3',
                        id: 'activeAnalysis2',
                        width: that.dom.find('.activeAnalysis2').width()-20,
                        lineColor: ['#85c2ff'],
                        fillColor: ['#c2e0ff'],
                        data: arr1,
                        x: dataX
                    }
                    lineCont1.setData(data);
                }else{
                    lineCont1.showDataNull();
                    that.dom.find('.activeAnalysis2 .actCont1 .body_cont').addClass('hide');
                }
            }else{
                lineCont1.showRefresh();
            }

        })
    }
    this.campaignListDb = function(obj){
        obj.hideDataNull();
        obj.hideRefresh();
        obj.showLoading();
        var json = {
            startTime: '2017-06-26',
            endTime: '2017-07-20',
            osId: 1
        }
        var myId = obj.attrA('initDate').line.id;
        that.api.campaignList(json).then(function(res){
          obj.hideLoading();
          var res = {
                    "meta":{"success":true,"message":"ok"},
                    "data":[
                            {"startTime":"2017-07-03","campaignName":"111","campaignId":29,"endTime":"2017-07-03"},
                            {"startTime":"2017-07-05","campaignName":"111222333","campaignId":30,"endTime":"2017-07-05"},
                            {"startTime":"2017-07-11","campaignName":"223","campaignId":31,"endTime":"2017-07-11"}
                           ]
                   }
          if(res.meta.success == true){
              if(res.data.length >0){
                  obj.hideDataNull();
                  that.dom.find('.'+myId+' .actCont1 .more').removeClass('hide');
                  var cpgId = [];
                  var cpgName = [];
                  var start = [];
                  var end = [];
                 $(res.data).each(function(i,val){
                    cpgId.push(val.campaignId);
                    cpgName.push(val.campaignName);
                    start.push(val.startTime);
                    end.push(val.endTime);
                 })
                var data = {
                     campaignId: cpgId,
                     campaignName: cpgName,
                     startTime: start,
                     endTime: end
                }
                 obj.setData11(data);

              }else{
                obj.showDataNull();
                that.dom.find('.'+myId+' .actCont1 .more').addClass('hide');
              }
          }else{
            obj.showRefresh();
          }
        })
    }
  } 

module.exports = activeAnalysis;