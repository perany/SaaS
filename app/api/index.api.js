var api = {
    //获取用户类型
    valueList: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.domain + 'dictionary/valueList',
            type: "GET",
            dataType: "json",
            //headers: { "x-auth-token": api.app.local.get('session') },
            data: api.app.format(value),
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    //一天(用户Stream:一天)
    getUserTypeStreamUv: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.domain + 'overviewFlow/getUserTypeStreamUv',
            type: "post",
            dataType: "json",
            //headers: { "x-auth-token": api.app.local.get('session') },
            data: api.app.format(value),
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    //多天(用户)
    getUserTypeUv: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.domain + 'overviewFlow/getUserTypeUv',
            type: "post",
            dataType: "json",
            //headers: { "x-auth-token": api.app.local.get('session') },
            data: api.app.format(value),
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    //单天(日期)
    getUserTypeDateStreamUv: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.domain + 'overviewFlow/getUserTypeDateStreamUv',
            type: "post",
            dataType: "json",
            //headers: { "x-auth-token": api.app.local.get('session') },
            data: api.app.format(value),
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    //多天(日期)
    getUserTypeDateUv: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.domain + 'overviewFlow/getUserTypeDateUv',
            type: "post",
            dataType: "json",
            //headers: { "x-auth-token": api.app.local.get('session') },
            data: api.app.format(value),
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    getUvTotal: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.domain + 'overviewFlow/getUvTotal',
            type: "post",
            dataType: "json",
            data: api.app.format(value),
            success: function(response) {
                deferred.resolve(response);
            }
        });

        return deferred;
    },
    getUserTypeDateStreamUv: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.domain + 'overviewFlow/getUserTypeDateStreamUv',
            type: "post",
            dataType: "json",
            //headers: { "x-auth-token": api.app.local.get('session') },
            data: api.app.format(value),
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
}
module.exports = api;