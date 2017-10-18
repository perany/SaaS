var api;
api = {
    // 活动新增用户成本
    campaignList:function (value) {
        var deferred = $.Deferred()
        //deferred.resolve({aa:'aa'});
        $.ajax({
            url:  api.app.domain +'campaignAnalysis/campaignList',
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
            var deferred = $.Deferred()
            //deferred.resolve({aa:'aa'});
            $.ajax({
                url:  api.app.domain +'campaignAnalysis/cpgaAnalysis',
                type: "GET",
                dataType: "json",
                data:value,
                success: function (response) {
                    deferred.resolve(response);
                }
            });
            return deferred
        },
    // 活动活跃用户成本
    activeUserCostAnalysis:function (value) {
        var deferred = $.Deferred()
        //deferred.resolve({aa:'aa'});
        $.ajax({
            url:  api.app.domain +'campaignAnalysis/activeUserCostAnalysis',
            type: "GET",
            dataType: "json",
            data:value,
            success: function (response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    //活动留存用户成本
    retainedUserCostAnalysis:function (value) {
        var deferred = $.Deferred()
        //deferred.resolve({aa:'aa'});
        $.ajax({
            url:  api.app.domain +'campaignAnalysis/retainedUserCostAnalysis',
            type: "GET",
            dataType: "json",
            data:value,
            success: function (response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    //活动付费用户成本
    paidUserCostAnalysis:function (value) {
        var deferred = $.Deferred()
        //deferred.resolve({aa:'aa'});
        $.ajax({
            url:  api.app.domain +'campaignAnalysis/paidUserCostAnalysis',
            type: "GET",
            dataType: "json",
            data:value,
            success: function (response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    valueList:function(){
        var deferred=$.Deferred()
        //deferred.resolve({aa:'aa'});
        $.ajax({
            //url:api.app.domain+'saas-dmp/login',
            url: '/saas-dmp/dictionary/valueList?type=os',
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


