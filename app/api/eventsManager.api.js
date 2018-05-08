var api= {
    //事件组列表
    list: function (value) {
        var deferred = $.Deferred();
        var path = api.app.localDomain + 'eventsManager/list.json';
        switch (value.name){
            case "01":
                path=api.app.localDomain+'eventsManager/list01.json';
                break;
        }
        $.ajax({
            url: path,
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
            url: api.app.localDomain + 'eventsManager/create.json',
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
            url: api.app.localDomain + 'eventsManager/getEventNameByCode.json',
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
            url: api.app.localDomain + 'eventsManager/delete.json',
            type: "get",
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
            url: api.app.localDomain + 'eventsManager/update.json',
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
        var path;
        switch (value.type){
            case "os":
                path=api.app.localDomain+'dictionary/valueList2-os.json';
                break;
            case "eventsManager":
                path=api.app.localDomain+'dictionary/valueList6-eventsManager.json';
                break;
            case "userevent":
                path=api.app.localDomain+'dictionary/valueList4-userevent.json';
                break;
            case "usertype":
                path=api.app.localDomain+'dictionary/valueList3-usertype.json';
                break;
            case "dimensionality":
                path=api.app.localDomain+'dictionary/valueList5-dimensionality.json';
                break;
            default:
                path=api.app.localDomain + 'dictionary/valueList2-os.json';
                break;
        }
        if (value.osID) {
            path += '?type=' + value.type + '&osId=' + value.osID;
        } else {
            path += '?type=' + value.type;
        }
        $.ajax({
            url: path,
            type: "POST",
            async: true,
            dataType: 'json',
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
            url: api.app.localDomain + 'eventsManager/queryActionList.json',
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