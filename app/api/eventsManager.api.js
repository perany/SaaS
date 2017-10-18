var api= {
    //事件组列表
    list: function (value) {
        var deferred = $.Deferred();
        $.ajax({
            url: api.app.domain + 'eventGroup/list',
            //url: '/app/api/jsons/eventList.json',
            type: "post",
            dataType: "json",
            data: api.app.format(value),
            success: function (response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    //新增事件组
    create: function (value) {
        var deferred = $.Deferred();
        $.ajax({
            url: api.app.domain + 'eventGroup/create',
            type: "post",
            dataType: "json",
            data: api.app.format(value),
            success: function (response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    getEventNameByCode: function (value) {
        var deferred = $.Deferred();
        $.ajax({
            url: api.app.domain + 'eventGroup/getEventNameByCode',
            type: "post",
            dataType: "json",
            data: api.app.format(value),
            success: function (response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    //删除事件组
    deleteEvent: function (value) {
        var deferred = $.Deferred();
        $.ajax({
            url: api.app.domain + 'eventGroup/' + value,
            type: "delete",
            dataType: "json",
            success: function (response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    //保存编辑活动
    update: function (value) {
        var deferred = $.Deferred();
        $.ajax({
            url: api.app.domain + 'eventGroup/update',
            type: "post",
            async: true,
            data:api.app.format(value),
            dataType: 'json',
            timeout: 60000,
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
    },
    queryActionList: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: '/fas/module/queryActionList',
            type: "get",
            dataType: "json",
            data: api.app.format(value),
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    }

}
    module.exports = api;