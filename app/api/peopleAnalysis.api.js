var api;
api = {
    //用户分析接口：获取类型&事件字典接口
    valueList: function(value) {
        var deferred = $.Deferred()
        var path;
        switch (value.type){
            case "os":
                path=api.app.localDomain+'dictionary/valueList2-os.json';
                break;
            case "usertype":
                path=api.app.localDomain+'dictionary/valueList3-usertype.json';
                break;
            default:
                path=api.app.domain + 'dictionary/valueList';
                break;
        }
        $.ajax({
            url: path,
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
            url: api.app.localDomain + 'uvAnalyze/getUvContrast.json',
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
            url: api.app.localDomain + 'uvAnalyze/getUvDistribution.json',
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
        var path;
        switch (value.disSource){
            case "1":
                path=api.app.localDomain+'uvAnalyze/getUvDifference1.json';
                break;
            case "3":
                path=api.app.localDomain+'uvAnalyze/getUvDifference3.json';
                break;
            default:
                path=api.app.localDomain + 'uvAnalyze/getUvDifference1.json';
                break;
        }
        $.ajax({
            url: path,
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