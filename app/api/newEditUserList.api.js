var api = {
    //校验用户名
    checkName: function(value) {
        var deferred = $.Deferred()
        //deferred.resolve({aa:'aa'});
        $.ajax({
            url:  api.app.localDomain + 'userList/newEditUserList/checkName.json',
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
    //检查邮箱
    checkLoginName: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url:  api.app.localDomain + 'userList/newEditUserList/checkLoginName.json',
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
    //添加角色
    queryUserRolePageList: function(value) {
        var deferred = $.Deferred()
        var path = api.app.localDomain + 'userList/newEditUserList/queryUserRolePageList.json';
        if(value.search=="01"){
            path = api.app.localDomain + 'userList/newEditUserList/queryUserRolePageList01.json';
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
    //添加用户组
    pageList: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: '/fas/group/pageList',
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
    //新建保存
    createUser: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url:api.app.localDomain + 'userList/newEditUserList/createUser.json',
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
    //编辑保存
    editUser: function(value, id){
        var deferred = $.Deferred()
        $.ajax({
            url:  api.app.localDomain + 'userList/newEditUserList/update.json',
            type: "get",
            dataType: "json",
            contentType:"application/json",
            headers: { "x-auth-token": api.app.local.get('session') },
            data: api.app.format({value:value,id:id}),
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    //编辑查询
    queryUserInfo: function(value) {
        var deferred = $.Deferred()
        var path = api.app.localDomain + 'userList/newEditUserList/queryUserInfo.json';
        if(value.id=="494"){
            path = api.app.localDomain + 'userList/newEditUserList/queryUserInfo1.json';
        }
        $.ajax({
            url: path,
            type: "GET",
            dataType: "json",
            headers: { "x-auth-token": api.app.local.get('session') },
            data: api.app.format(value),
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    }
}
module.exports = api;