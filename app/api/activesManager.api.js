var api= {
    //活动列表
    list: function (value) {
        var deferred = $.Deferred();
        var path;
        switch (value.currentPage){
            case 1:
                path=api.app.localDomain+'activesManager/list1.json';
                break;
            case 2:
                path=api.app.localDomain+'activesManager/list2.json';
                break;
            default:
                path=api.app.localDomain+'activesManager/list1.json';
                break;
        }
        switch (value.name){
            case "-a":
                path=api.app.localDomain+'activesManager/lista.json';
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
    //新增活动
    create: function (value) {
        var deferred = $.Deferred();
        $.ajax({
            url: api.app.localDomain + 'activesManager/create.json',
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
            // url: api.app.localDomain + 'activesManager/' + value,
            url: api.app.localDomain + 'activesManager/delete.json',
            // type: "delete",
            type: "post",
            data: api.app.format(value),
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
            // url: api.app.localDomain + 'activesManager/'+value,
            url: api.app.localDomain + 'activesManager/update.json',
            type: "post",
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
            url: api.app.localDomain + 'activesManager/updatestore.json',
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
            url: api.app.localDomain + 'dictionary/store_list.json',
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
    queryActionList:function(value){
        var deferred=$.Deferred()
        $.ajax({
            url: api.app.localDomain+'activesManager/queryActionList.json',
            type: "get",
            dataType: "json",
            data: api.app.format(value),
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    valueList:function(value) {
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
    },

}
    module.exports = api;