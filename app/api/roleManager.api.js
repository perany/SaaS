var api = {
    //表格
    pageList: function(value) {
        var deferred = $.Deferred()
        var path = api.app.localDomain + 'roleManager/list.json';
        switch (value.search){
            case "01":
                path=api.app.localDomain+'roleManager/list01.json';
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
    //操作接口
    queryActionList: function(value) {
        var deferred = $.Deferred()
            //deferred.resolve({aa:'aa'});
        $.ajax({
            url:api.app.localDomain + 'roleManager/queryActionList.json',
            type: "GET",
            dataType: "json",
            headers: { "x-auth-token": api.app.local.get('session') },
            data: api.app.format(value),
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    //删除角色
    deleteRole: function(id){
        var deferred = $.Deferred();
        var path = api.app.localDomain + 'roleManager/delete.json';
        switch (id){
            case "493":
                path=api.app.localDomain+'roleManager/deleteerror.json';
                break;
        }
        $.ajax({
            url:path,
            type: "get",
            dataType: "json",
            data: api.app.format({value:value}),
            contentType:"application/json",
            headers: { "x-auth-token": api.app.local.get('session') },
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    }
}
module.exports = api;