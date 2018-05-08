var api = {
    //表格
    listUser: function(value) {
        var deferred = $.Deferred()
        var path = api.app.localDomain + 'userList/list.json';
        switch (value.search){
            case "01":
                path=api.app.localDomain+'userList/list01.json';
                break;
        }
        $.ajax({
            url: path,
            type: "POST",
            dataType: "json",
            headers: { "x-auth-token": api.app.local.get('session') },
            data: api.app.format(value),
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    //删除活动
    deleteList: function(value) {
        var deferred = $.Deferred();
        $.ajax({
            url: api.app.localDomain + 'userList/delete.json',
            type: "get",
            data: api.app.format({value:value}),
            dataType: "json",
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    //权限检查
    queryActionList: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url:  api.app.localDomain + 'userList/queryActionList.json',
            type: "get",
            dataType: "json",
            data: api.app.format(value),
            success: function(response) {
                api.app.goBack(response, deferred)
                    //deferred.resolve(response);
            }
        });
        return deferred;
    }
}
module.exports = api;