var api;
api = {
    //渠道分析接口：获取类型&事件字典接口
    valueList: function (value) {
        var deferred = $.Deferred()
        var path;
        switch (value.type){
            case "os":
                path=api.app.localDomain+'dictionary/valueList2-os.json';
                break;
            case "eventgroup":
            case "userevent":
                path=api.app.localDomain+'dictionary/valueList4-userevent.json';
                break;
            case "usertype":
                path=api.app.localDomain+'dictionary/valueList3-usertype.json';
                break;
            default:
                path=api.app.localDomain + 'dictionary/valueList4-userevent.json';
                break;
        }
        $.ajax({
            // url: api.app.domain + 'dictionary/valueList?type=usertype',
            url: path,
            type: "post",
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
            // url: api.app.domain + 'channelAnalysis/channelList',
            url:api.app.localDomain+'channelAnalysis/channelList.json',
            type: "post",
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
            url: api.app.localDomain + 'channelAnalysis/userRatioAnalysis.json',
            //url:'/app/api/jsons/channelUserRatio.json',
            type: "post",
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
        var path;
        switch (value.channelId){
            case "80":
                path=api.app.localDomain+'channelAnalysis/cpgaAnalysis1.json';
                break;
            case "82":
                path=api.app.localDomain+'channelAnalysis/cpgaAnalysis2.json';
                break;
        }
        $.ajax({
            // url: api.app.domain + 'channelAnalysis/cpgaAnalysis',
            url:path,
            type: "post",
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
        var path;
        switch (value.channelId){
            case "80":
                path=api.app.localDomain+'channelAnalysis/activeUserCostAnalysis1.json';
                break;
            case "82":
                path=api.app.localDomain+'channelAnalysis/activeUserCostAnalysis2.json';
                break;
        }
        $.ajax({
            // url: api.app.domain + 'channelAnalysis/activeUserCostAnalysis',
            url:path,
            type: "post",
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
        var path;
        switch (value.channelId){
            case "80":
                path=api.app.localDomain+'channelAnalysis/retainedUserCostAnalysis1.json';
                break;
            case "82":
                path=api.app.localDomain+'channelAnalysis/retainedUserCostAnalysis2.json';
                break;
        }
        $.ajax({
            // url: api.app.domain + 'channelAnalysis/retainedUserCostAnalysis',
            url:path,
            type: "post",
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
        var path;
        switch (value.channelId){
            case "80":
                path=api.app.localDomain+'channelAnalysis/paidUserCostAnalysis1.json';
                break;
            case "82":
                path=api.app.localDomain+'channelAnalysis/paidUserCostAnalysis2.json';
                break;
        }
        $.ajax({
            // url: api.app.domain +'channelAnalysis/paidUserCostAnalysis',
            url:path,
            type: "post",
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


