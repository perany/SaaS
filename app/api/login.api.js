var api = {
    login: function(value) {
        var deferred = $.Deferred()
            //deferred.resolve({aa:'aa'});
        $.ajax({
            //url:api.app.domain+'saas-dmp/login',
            url: '/saas-dmp/login',
            type: "POST",
            dataType: "json",
            data: value,
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    logout: function() {
        var deferred = $.Deferred()
            //deferred.resolve({aa:'aa'});
        $.ajax({
            //url:api.app.domain+'saas-dmp/login',
            url: '/saas-dmp/logout',
            type: "GET",
            dataType: "json",
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    operatingSysterm: function() {
        var deferred = $.Deferred()

        //deferred.resolve({aa:'aa'});
        $.ajax({
            //url:api.app.domain+'saas-dmp/login',
            url: '/saas-dmp/dictionary/valueList?type=os',
            type: "GET",
            dataType: "json",
            async: false,
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    }

}
module.exports = api;