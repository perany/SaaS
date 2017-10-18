var api={
    app:null,
    //活动list
    departMent:function(value){
        var deferred=$.Deferred()
        $.ajax({
            url: api.app.domain+'team/queryTeamReport',
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