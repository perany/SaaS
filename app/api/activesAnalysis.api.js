var api;
api = {
    // 活动新增用户成本
    campaignList:function (value) {
        var deferred = $.Deferred()
        //deferred.resolve({aa:'aa'});
        $.ajax({
            url:  api.app.localDomain +'activesAnalysis/channelList.json',
            type: "GET",
            dataType: "json",
            data:value,
            success: function (response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
        // 活动新增用户成本
    cpgaAnalysis:function (value) {
        var deferred = $.Deferred();
        var path;
        switch (value.campaignId){
            case "01":
            case "03":
                path=api.app.localDomain+'activesAnalysis/cpgaAnalysis1.json';
                break;
            case "02":
            case "04":
                path=api.app.localDomain+'activesAnalysis/cpgaAnalysis2.json';
                break;
        }
        $.ajax({
            // url: api.app.domain + 'activesAnalysis/cpgaAnalysis',
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
    // 活动活跃用户成本
    activeUserCostAnalysis:function (value) {
        var deferred = $.Deferred()
        var path;
        switch (value.campaignId){
            case "01":
            case "03":
                path=api.app.localDomain+'activesAnalysis/activeUserCostAnalysis1.json';
                break;
            case "02":
            case "04":
                path=api.app.localDomain+'activesAnalysis/activeUserCostAnalysis2.json';
                break;
        }
        $.ajax({
            // url: api.app.domain + 'activesAnalysis/activeUserCostAnalysis',
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
    //活动留存用户成本
    retainedUserCostAnalysis:function (value) {
        var deferred = $.Deferred()
        var path;
        switch (value.campaignId){
            case "01":
            case "03":
                path=api.app.localDomain+'activesAnalysis/retainedUserCostAnalysis1.json';
                break;
            case "02":
            case "04":
                path=api.app.localDomain+'activesAnalysis/retainedUserCostAnalysis2.json';
                break;
        }
        $.ajax({
            // url: api.app.domain + 'activesAnalysis/retainedUserCostAnalysis',
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
    //活动付费用户成本
    paidUserCostAnalysis:function (value) {
        var deferred = $.Deferred()
        var path;
        switch (value.campaignId){
            case "01":
            case "03":
                path=api.app.localDomain+'activesAnalysis/paidUserCostAnalysis1.json';
                break;
            case "02":
            case "04":
                path=api.app.localDomain+'activesAnalysis/paidUserCostAnalysis2.json';
                break;
        }
        $.ajax({
            // url: api.app.domain +'activesAnalysis/paidUserCostAnalysis',
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
    valueList:function(value){
        var deferred=$.Deferred()
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
            // url:api.app.localDomain+'saas-dmp/login',
            url: path,
            type: "GET",
            dataType: "json",
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    }
    }
    module.exports = api;


