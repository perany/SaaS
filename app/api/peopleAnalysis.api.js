var api;
api = {
    //用户分析接口：获取类型&事件字典接口
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
    // 用户分析接口：获取用户对比接口
    getUvContrast: function(value) {
        var deferred = $.Deferred()
            //deferred.resolve({aa:'aa'});
        $.ajax({
            url: api.app.domain + 'uvAnalyze/getUvContrast',
            // url: '/app/api/jsons/userContrast.json',
            type: "POST",
            dataType: 'json',
            data: api.app.format(value),
            success: function(response) {
                api.app.goBack(response, deferred)
            }
        });
        return deferred
    },
    getUvDistribution: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.domain + 'uvAnalyze/getUvDistribution',
            type: "POST",
            dataType: 'json',
            data: api.app.format(value),
            success: function(response) {
                api.app.goBack(response, deferred)
            }
        });
        return deferred
    },
    // 用户分析接口：获取分布差值&差异率接口
    getUvDifference: function(value) {
        var deferred = $.Deferred()
            //deferred.resolve({aa:'aa'});
        $.ajax({
            url: api.app.domain + 'uvAnalyze/getUvDifference',
            //url: '/app/api/jsons/differenceDis.json',
            type: "POST",
            dataType: 'json',
            data: api.app.format(value),
            success: function(response) {
                api.app.goBack(response, deferred)
            }
        });
        return deferred
    },
}
module.exports = api;