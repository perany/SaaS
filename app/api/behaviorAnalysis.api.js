var api;
api = {
    //获取事件组类型
    valueList: function (value) {
        var deferred = $.Deferred();
        $.ajax({
            url: api.app.domain + 'dictionary/valueList',
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
        $.ajax({
            url: api.app.domain + 'uvAnalyze/getVisitUv',
            // url: '/app/api/jsons/behaAnaInterNum.json',
            type: "POST",
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
        $.ajax({
            url: api.app.domain + 'uvAnalyze/getStepConvert',
            // url: '/app/api/jsons/behaWayTrans.json',
            type: "POST",
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
            url: api.app.domain + 'uvAnalyze/getEvenUvDifference',
            // url: '/app/api/jsons/behaWayDifference.json',
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


