var api = {
    //校验用户名
    checkName: function(value) {
        var deferred = $.Deferred()
        //deferred.resolve({aa:'aa'});
        $.ajax({
            url:  '/fas/user/checkName',
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
            url: '/fas/user/checkLoginName',
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
            //deferred.resolve({aa:'aa'});
        $.ajax({
            url: '/fas/user/queryUserRolePageList',
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
            //deferred.resolve({aa:'aa'});
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
            //deferred.resolve({aa:'aa'});
        $.ajax({
            url:'/fas/user/createUser',
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
            //deferred.resolve({aa:'aa'});
        console.log('lllll',id)
        $.ajax({
            url:  '/fas/user/'+id,
            type: "put",
            dataType: "json",
            contentType:"application/json",
            headers: { "x-auth-token": api.app.local.get('session') },
            data: JSON.stringify(api.app.format(value)),
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    //编辑查询
    queryUserInfo: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: '/fas/user/queryUserInfo',
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