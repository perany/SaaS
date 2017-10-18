var api = {
    //表格
    listUser: function(value) {
        var deferred = $.Deferred()
            //deferred.resolve({aa:'aa'});
        $.ajax({
            url:  '/fas/user/listUser',
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
    //删除用户
    // deleteUser: function(id) {
    //     var deferred = $.Deferred()
    //         //deferred.resolve({aa:'aa'});
    //     console.log('lllll', id)
    //     $.ajax({
    //         url: api.app.domain + 'fas/user/batch/' + id,
    //         type: "delete",
    //         dataType: "json",
    //         contentType: "application/json",
    //         headers: { "x-auth-token": api.app.local.get('session') },
    //         success: function(response) {
    //             deferred.resolve(response);
    //         }
    //     });
    //     return deferred
    // },
    //活动list
    // departMentList: function(value) {
    //     api.app.format()
    //     var deferred = $.Deferred()
    //     $.ajax({
    //         url: '/fas/group/pageList',
    //         type: "post",
    //         dataType: "json",
    //         data: value,
    //         success: function(response) {
    //             api.app.goBack(response, deferred)
    //         }
    //     });
    //     return deferred
    // },
    //删除活动
    deleteList: function(value) {
        var deferred = $.Deferred();
        $.ajax({
            url: '/fas/user/' + value,
            type: "delete",
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
            url: '/fas/module/queryActionList',
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