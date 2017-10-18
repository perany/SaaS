var api = {
    //查询渠道（填充在“新建渠道成本”的“查询”下拉框中）
    listFlowChannel: function (value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.domain + 'onlineChannel/listFlowChannel',
            type: "post",
            dataType: "json",
            data: api.app.format(value),
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    //渠道列表（查询渠道成本）
    listShop: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.domain + 'onlineChannel/list',
            type: "post",
            dataType: "json",
            data: api.app.format(value),
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    //活动校验
    checkShop: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.domain + 'store/checkStoreName',
            type: "get",
            dataType: "json",
            data: api.app.format(value),
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    //新增渠道
    createFlowChannel: function(value) {
        var deferred = $.Deferred();
        //deferred.resolve({aa:'aa'});
        $.ajax({
            url: api.app.domain + 'onlineChannel/createFlowChannel',
            type: "post",
            dataType: "json",
            data: api.app.format(value),
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    //新增渠道成本
    create: function(value) {
        var deferred = $.Deferred();
        //deferred.resolve({aa:'aa'});
        $.ajax({
            url: api.app.domain + 'onlineChannel/create',
            type: "post",
            dataType: "json",
            data: api.app.format(value),
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    //删除活动
    deleteShop: function(value) {
        var deferred = $.Deferred();
        $.ajax({
            url: api.app.domain + 'onlineChannel/' + value,
            type: "delete",
            dataType: "json",
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    //编辑活动
    editShop: function(value) {
        var deferred = $.Deferred();
        $.ajax({
            url: api.app.domain + 'onlineChannel/'+value,
            type: "get",
            dataType: "json",
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    //保存编辑活动
    saveShop: function(value) {
        var deferred = $.Deferred();
        $.ajax({
            url: api.app.domain + 'onlineChannel/update',
            type: "post",
            async: true,
            dataType: 'json',
            data: api.app.format(value),
            timeout: 60000,
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
    },
    operatingSysterm:function(){
        var deferred=$.Deferred()
        //deferred.resolve({aa:'aa'});
        $.ajax({
            //url:api.app.domain+'saas-dmp/login',
            url: '/saas-dmp/dictionary/valueList?type=os',
            type: "GET",
            dataType: "json",
            async: false,
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    }

}
module.exports = api;