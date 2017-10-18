var api;
api = {
    //渠道分析接口：获取类型&事件字典接口
    valueList: function (value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.domain + 'dictionary/valueList?type=usertype',
            //url: '/app/api/jsons/typelist.json',
            type: "GET",
            dataType: 'json',
            data: api.app.format(value),
            success: function (response) {
                api.app.goBack(response, deferred)
            }
        });
        return deferred
    },
    //渠道分析：获取渠道列表接口文档
    channelList: function (value) {
        var deferred = $.Deferred();
        $.ajax({
            url: api.app.domain + 'channelAnalysis/channelList',
            //url:'/app/api/jsons/channelUserRatio.json',
            type: "get",
            dataType: "json",
            data: api.app.format(value),
            success: function (response) {
                api.app.goBack(response, deferred)
            }
        });
        return deferred
    },
    //渠道分析：获取渠道用户比接口文档
    userRatioAnalysis: function (value) {
        var deferred = $.Deferred();
        $.ajax({
            url: api.app.domain + 'channelAnalysis/userRatioAnalysis',
            //url:'/app/api/jsons/channelUserRatio.json',
            type: "get",
            dataType: "json",
            data: api.app.format(value),
            success: function (response) {
                api.app.goBack(response, deferred)
            }
        });
        return deferred
    },
    //获取活动新增用户成本接口文档
    cpgaAnalysis: function (value) {
        var deferred = $.Deferred();
        $.ajax({
            url: api.app.domain + 'channelAnalysis/cpgaAnalysis',
            //url:'/app/api/jsons/channelNewUserCost.json',
            type: "get",
            dataType: 'json',
            data: api.app.format(value),
            success: function (response) {
                api.app.goBack(response, deferred)
            }
        });
        return deferred
    },
    //获取渠道活跃用户成本接口文档
    activeUserCostAnalysis:function (value) {
        var deferred = $.Deferred()
        //deferred.resolve({aa:'aa'});
        $.ajax({
            url: api.app.domain + 'channelAnalysis/activeUserCostAnalysis',
            //url:'/app/api/jsons/channelActiveUserCost.json',
            type: "get",
            dataType: "json",
            data: api.app.format(value),
            success: function (response) {
                api.app.goBack(response, deferred)
            }
        });
        return deferred
    },
    //获取渠道留存用户成本接口文档
    retainedUserCostAnalysis:function (value) {
        var deferred = $.Deferred()
        //deferred.resolve({aa:'aa'});
        $.ajax({
            url: api.app.domain + 'channelAnalysis/retainedUserCostAnalysis',
            //url:'/app/api/jsons/channelRetainedUserCost.paidUserCost.json',
            type: "get",
            dataType: "json",
            data: api.app.format(value),
            success: function (response) {
                api.app.goBack(response, deferred)
            }
        });
        return deferred
    },
    // 获取渠道付费用户成本
    paidUserCostAnalysis:function (value) {
        var deferred = $.Deferred()
        //deferred.resolve({aa:'aa'});
        $.ajax({
            url: api.app.domain +'channelAnalysis/paidUserCostAnalysis',
            //url:'/app/api/jsons/channelRetainedUserCost.paidUserCost.json',
            type: "get",
            dataType: "json",
            data: api.app.format(value),
            success: function (response) {
                api.app.goBack(response, deferred)
            }
        });
        return deferred
    }  
}
module.exports = api;


