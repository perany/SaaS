var api;
api = {
    //使用分析接口：获取类型&事件字典接口
    valueList: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.domain + 'dictionary/valueList',
            //url: '/app/api/jsons/typelist.json',
            type: "GET",
            dataType: 'json',
            data: api.app.format(value),
            success: function(response) {
                api.app.goBack(response, deferred)
            }
        });
        return deferred
    },
    // 使用分析接口：获取启用次数对比接口
    getFrequencyContrast: function(value) {
        var deferred = $.Deferred()
            //deferred.resolve({aa:'aa'});
        $.ajax({
            url: api.app.domain + 'uvAnalyze/getFrequencyContrast',
            //url: '/app/api/jsons/userContrast.json',
            type: "POST",
            dataType: 'json',
            data: api.app.format(value),
            success: function(response) {
                api.app.goBack(response, deferred)
            }
        });
        return deferred
    },
    // 使用分析接口：获取影响度分布接口
    getUseDistribution: function(value) {
        var deferred = $.Deferred()
            //deferred.resolve({aa:'aa'});
        $.ajax({
            url: api.app.domain + 'uvAnalyze/getUseDistribution',
            //url: '/app/api/jsons/influenceDis.json',
            type: "POST",
            dataType: 'json',
            data: api.app.format(value),
            success: function(response) {
                api.app.goBack(response, deferred)
            }
        });
        return deferred
    },
    // 使用分析接口：获取分布差值&差异率接口
    getUseDifference: function(value) {
        var deferred = $.Deferred()
            //deferred.resolve({aa:'aa'});
        $.ajax({
            url: api.app.domain + 'uvAnalyze/getUseDifference',
            //url: '/app/api/jsons/differenceDis.json',
            type: "POST",
            dataType: 'json',
            data: api.app.format(value),
            success: function(response) {
                api.app.goBack(response, deferred)
            }
        });
        return deferred
    }

}
module.exports = api;