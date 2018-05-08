var api = {
    //查询渠道（填充在“新建渠道成本”的“查询”下拉框中）
    listFlowChannel: function (value) {
        var deferred = $.Deferred()
        var path;
        switch (value.currentPage){
            case 1:
                path=api.app.localDomain+'shopManager/listFlowChannel1.json';
                break;
            case 2:
                path=api.app.localDomain+'shopManager/listFlowChannel2.json';
                break;
            default:
                path=api.app.localDomain+'shopManager/listFlowChannel1.json';
                break;
        }
        switch (value.pageSize){
            case 100:
                path=api.app.localDomain+'shopManager/listFlowChannel.json';
                break;
        }
        $.ajax({
            url: path,
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
        var path;
        switch (value.currentPage){
            case 1:
                path=api.app.localDomain+'shopManager/list1.json';
                break;
            case 2:
                path=api.app.localDomain+'shopManager/list2.json';
                break;
            default:
                path=api.app.localDomain+'shopManager/list1.json';
                break;
        }
        switch (value.channelName){
            case "-a":
                path=api.app.localDomain+'shopManager/lista.json';
                break;
        }
        $.ajax({
            url: path,
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
            url: api.app.localDomain + 'store/checkStoreName.json',
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
            url: api.app.localDomain + 'shopManager/createFlowChannel.json',
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
            url: api.app.localDomain + 'shopManager/create.json',
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
            url: api.app.localDomain + 'shopManager/delete.json',
            type: "get",
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
            url: api.app.localDomain + 'shopManager/update.json',
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
            url: api.app.localDomain + 'shopManager/updatestore.json',
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
            url: api.app.localDomain + 'shopManager/queryActionList.json',
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
        var deferred = $.Deferred();
        var path;
        switch (value.type){
            case "os":
                path=api.app.localDomain+'dictionary/valueList2-os.json';
                break;
            case "eventgroup":
                path=api.app.localDomain+'dictionary/valueList6-eventgroup.json';
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
    }

}
module.exports = api;