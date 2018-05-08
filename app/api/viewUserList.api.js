var api = {
    //查看
    queryUserInfo: function(value) {
        var deferred = $.Deferred();
        var path = api.app.localDomain + 'userList/viewEditUserList/queryUserInfo.json';
        if(value.id=="494"){
            path = api.app.localDomain + 'userList/viewEditUserList/queryUserInfo1.json';
        }
        $.ajax({
            url: path,
            type: "get",
            dataType: "json",
            data: value,
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
}
module.exports = api;