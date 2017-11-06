var api;
api = {
    //使用分析接口：获取类型&事件字典接口
    valueList: function(value) {
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
            // url: api.app.domain + 'dictionary/valueList',
            url:path,
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
        var path;
        switch (value.typeCode){
            case "11":
                path=api.app.localDomain+'uvAnalyze/getFrequencyContrast1.json';
                break;
            case "12":
                path=api.app.localDomain+'uvAnalyze/getFrequencyContrast2.json';
                break;
        }
        $.ajax({
            // url: api.app.domain + 'uvAnalyze/getFrequencyContrast',
            url:path,
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
        var path;
        switch (value.typeCode){
            case "11":
                path=api.app.localDomain+'uvAnalyze/getUseDistribution11.json';
                break;
            case "12":
                path=api.app.localDomain+'uvAnalyze/getUseDistribution12.json';
                break;
        }
        $.ajax({
            // url: api.app.domain + 'uvAnalyze/getUseDistribution',
            url:path,
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
        var path;
        switch (value.disSource){
            case 1:
                path=api.app.localDomain+'/uvAnalyze/getUvDifference1.json';
                break;
            case 3:
                path=api.app.localDomain+'/uvAnalyze/getUvDifference3.json';
                break;
            default:
                path=api.app.localDomain + '/uvAnalyze/getUvDifference1.json';
                break;
        }
        $.ajax({
            // url: api.app.domain + 'uvAnalyze/getUseDifference',
            url: path,
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