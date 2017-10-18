var api = {
    //查看
    queryUserInfo: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: '/fas/user/queryUserInfo',
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