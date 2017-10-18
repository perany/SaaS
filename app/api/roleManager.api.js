var api = {
    //表格
    pageList: function(value) {
        var deferred = $.Deferred()
            //deferred.resolve({aa:'aa'});
        $.ajax({
            url: '/fas/role/pageList',
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
            url:'/fas/module/queryActionList',
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
        var deferred = $.Deferred()
            //deferred.resolve({aa:'aa'});
        console.log('lllll',id)
        $.ajax({
            url:'/fas/role/batch/'+id,
            type: "delete",
            dataType: "json",
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