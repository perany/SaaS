var api={
    app:null,
    //活动list
    usersMent:function(value){
        var deferred=$.Deferred()
        $.ajax({
            url: '/fas/group/queryUserList',
            type: "post",
            dataType: "json",
            data: value,
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    }

}
module.exports = api;