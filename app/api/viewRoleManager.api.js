var api = {
    queryRoleInfo: function(value) {
        var deferred = $.Deferred();
        var path = api.app.localDomain + 'roleManager/viewEditRoleManager/queryRoleInfo.json';
        switch (value.roleId){
            case "493":
                path=api.app.localDomain+'roleManager/viewEditRoleManager/queryRoleInfo1.json';
                break;
        }
        $.ajax({
            url:path,
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
    appList: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.localDomain + 'roleManager/viewEditRoleManager/appList.json',
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
    queryModuleList: function(value) {
        var deferred = $.Deferred()
        var path;
        if(value.roleId=="493"){
            path = api.app.localDomain + 'roleManager/viewEditRoleManager/queryModuleList2.json';
        }else{
            path = api.app.localDomain + 'roleManager/viewEditRoleManager/queryModuleList1.json';
        }
        if(!value.appId){
            path = api.app.localDomain + 'roleManager/viewEditRoleManager/queryModuleList.json';
        }
        $.ajax({
            url:path,
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
    
}
module.exports = api;