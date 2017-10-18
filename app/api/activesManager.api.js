var api= {
    //活动列表
    list: function (value) {
        var deferred = $.Deferred();
        $.ajax({
            url: api.app.domain + 'onlineCampagin/list',
            type: "post",
            dataType: "json",
            data: api.app.format(value),
            success: function (response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    //新增活动
    create: function (value) {
        var deferred = $.Deferred();
        $.ajax({
            url: api.app.domain + 'onlineCampagin/create',
            type: "post",
            dataType: "json",
            data: api.app.format(value),
            success: function (response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    //删除活动
    deleteActive: function (value) {
        var deferred = $.Deferred();
        $.ajax({
            url: api.app.domain + 'onlineCampagin/' + value,
            type: "delete",
            dataType: "json",
            success: function (response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    //编辑活动
    editActive: function (value) {
        var deferred = $.Deferred();
        $.ajax({
            url: api.app.domain + 'onlineCampagin/'+value,
            type: "get",
            dataType: "json",
            data: api.app.format(value),
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
            url: api.app.domain + 'onlineCampagin/update',
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
    //全部店铺列表
    store_list: function () {
        var deferred = $.Deferred();
        $.ajax({
            url: api.app.domain + 'dictionary/store_list',
            type: "get",
            async: true,
            dataType: 'json',
            timeout: 60000,
            data: api.app.format(),
            success: function (response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    //编辑时店铺列表
    storeListByCampaign: function (value) {
        var deferred = $.Deferred();
        $.ajax({
            url: api.app.domain + 'dictionary/storeListByCampaign',
            type: "get",
            async: true,
            dataType: 'json',
            timeout: 60000,
            data: api.app.format(value),
            success: function (response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    queryActionList:function(value){
        var deferred=$.Deferred()
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