var api = {

    versionList: function(value) {
        var deferred = $.Deferred();
        $.ajax({
            url: api.app.domain + 'versionAnalysis/versionList',
            type: "post",
            dataType: "json",
            data: api.app.format(value),
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    addUserAnalysis: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.domain + 'versionAnalysis/addUserAnalysis',
            type: "POST",
            dataType: "json",
            data: value,
            success: function(response) {
                deferred.resolve(response);
            },
            error: function(response) {
                alert('error');
                deferred.resolve(response);

            }
        });
        return deferred
    },
    activeUserAnalysis: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.domain + 'versionAnalysis/activeUserAnalysis',
            type: "post",
            dataType: "json",
            data: api.app.format(value),
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    registerUserAnalysis: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.domain + 'versionAnalysis/registerUserAnalysis',
            type: "post",
            dataType: "json",
            data: api.app.format(value),
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    padUserAnalysis: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.domain + 'versionAnalysis/padUserAnalysis',
            type: "post",
            dataType: "json",
            data: api.app.format(value),
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    remainUserAnalysis: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.domain + 'versionAnalysis/remainUserAnalysis',
            type: "post",
            dataType: "json",
            data: api.app.format(value),
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
}
module.exports = api;