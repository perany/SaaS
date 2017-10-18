var api = {
    login: function(value) {
        var deferred = $.Deferred()
            //deferred.resolve({aa:'aa'});
        $.ajax({
            //url:api.app.domain+'saas-dmp/login',
            url: api.app.localDomain+'login.json',
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
            url: api.app.localDomain+'logout.json',
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
            url: api.app.localDomain+'dictionary/valueList2-os.json',
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