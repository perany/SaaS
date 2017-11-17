var api;
api = {
    //获取事件组类型
    valueList: function (value) {
        var deferred = $.Deferred();
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
            dataType: "json",
            data: value,
            success: function (response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },

    //访问人数
    getVisitUv: function (value) {
        // console.log('接到了访问人数的请求', value);
        var deferred = $.Deferred();
        var path;
        switch (value.contrastDay){
            case 7:
                path=api.app.localDomain+'uvAnalyze/getVisitUv80-7.json';
                break;
            case 30:
                path=api.app.localDomain+'uvAnalyze/getVisitUv80-30.json';
                break;
            case 60:
                path=api.app.localDomain+'uvAnalyze/getVisitUv80-60.json';
                break;
            default:
                path=api.app.localDomain + 'uvAnalyze/getVisitUv80-7.json';
                break;
        }
        $.ajax({
            // url: api.app.domain + 'uvAnalyze/getVisitUv',
            url: path,
            type: "get",
            dataType: "json",
            data: value,
            success: function (response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },

    //步骤转化率
    getStepConvert: function (value) {
        var deferred = $.Deferred();
        var path;
        switch (value.contrastDay){
            case 7:
                path=api.app.localDomain+'uvAnalyze/getStepConvert80-7.json';
                break;
            case 30:
                path=api.app.localDomain+'uvAnalyze/getStepConvert80-30.json';
                break;
            case 60:
                path=api.app.localDomain+'uvAnalyze/getStepConvert80-60.json';
                break;
            default:
                path=api.app.localDomain + 'uvAnalyze/getStepConvert80-7.json';
                break;
        }
        $.ajax({
            // url: api.app.domain + 'uvAnalyze/getStepConvert',
            url: path,
            type: "get",
            dataType: "json",
            data: value,
            success: function (response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },

    //差异率
    getEvenUvDifference: function (value) {
        // console.log('用于获得差异率的参数：', value);
        var deferred = $.Deferred();
        $.ajax({
            // url: api.app.domain + 'uvAnalyze/getEvenUvDifference',
            url: api.app.localDomain+'uvAnalyze/getEvenUvDifference1.json',
            type: "POST",
            dataType: "json",
            data: value,
            success: function (response) {
                deferred.resolve(response);
            }
        });
        return deferred
    }
}
module.exports = api;


