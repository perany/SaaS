var api = {
    list: function(value) {
        var deferred = $.Deferred()
            //deferred.resolve({aa:'aa'});
        $.ajax({
            url:api.app.localDomain + 'roleManager/newEditRoleManager/list.json',
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
    queryModuleList: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url:api.app.localDomain + 'roleManager/newEditRoleManager/queryModuleList.json',
            type: "GET",
            dataType: "json",
            headers: { "x-auth-token": api.app.local.get('session') },
            data: api.app.format(value),
            success: function(response) {
                $.each(response.data.list,function(){
                    
                })
                deferred.resolve(response);
            }
        });
        return deferred
    },
    appList: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.localDomain + 'roleManager/newEditRoleManager/appList.json',
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
    //检查名称
    checkRoleName: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url:api.app.localDomain + 'roleManager/newEditRoleManager/checkRoleName.json',
            type: "GET",
            dataType: "json",
            headers: { "x-auth-token": api.app.local.get('session') },
            data: api.app.format({value:value}),
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    //添加用户
    queryUserList: function(value) {
        var deferred = $.Deferred()
        var path = api.app.localDomain + 'roleManager/newEditRoleManager/queryUserList.json';
        if(value.search=="01"){
            path = api.app.localDomain + 'roleManager/newEditRoleManager/queryUserList01.json';
        }
        $.ajax({
            url:path,
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
    //新建角色
    addRole: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url:api.app.localDomain + 'roleManager/newEditRoleManager/addRole.json',
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
    queryRoleInfo: function(value) {
        var deferred = $.Deferred();
        var path;
        if(value.roleId=="493"){
            path = api.app.localDomain + 'roleManager/newEditRoleManager/queryRoleInfo1.json';
        }else{
            path = api.app.localDomain + 'roleManager/newEditRoleManager/queryRoleInfo.json';
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
    queryAssociatedModuleList: function(value) {
        var deferred = $.Deferred()
        var path;
        if(value.roleId=="493"){
            path = api.app.localDomain + 'roleManager/newEditRoleManager/queryAssociatedModuleList1.json';
        }else{
            path = api.app.localDomain + 'roleManager/newEditRoleManager/queryAssociatedModuleList.json';
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
    //编辑角色
    editRole: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url:api.app.localDomain + 'roleManager/newEditRoleManager/editRole.json',
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
}
module.exports = api;