var api = {
    //查看
    viewList: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: '/fas/group/queryGroupInfo',
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