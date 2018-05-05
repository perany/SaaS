var api = {

    versionList: function(value) {
        var deferred = $.Deferred();
        $.ajax({
            url: api.app.localDomain + 'versionAnalysis/versionList.json',
            type: "get",
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
        var path;
        switch (value.versionIds){
            case "01,02,03,04":
                path=api.app.localDomain+'versionAnalysis/addUserAnalysis1.json';
                break;
            default:
                path=api.app.localDomain+'versionAnalysis/addUserAnalysis2.json';
                break;
        }
        $.ajax({
            // url: api.app.domain + 'activesAnalysis/cpgaAnalysis',
            url:path,
            type: "post",
            dataType: 'json',
            data: api.app.format(value),
            success: function (response) {
                api.app.goBack(response, deferred)
            }
        });
        return deferred
    },
    activeUserAnalysis: function(value) {
        var deferred = $.Deferred()
        var path;
        switch (value.versionIds){
            case "01,02,03,04":
                path=api.app.localDomain+'versionAnalysis/activeUserAnalysis1.json';
                break;
            default:
                path=api.app.localDomain+'versionAnalysis/activeUserAnalysis2.json';
                break;
        }
        $.ajax({
            url:path,
            type: "post",
            dataType: "json",
            data: api.app.format(value),
            success: function (response) {
                api.app.goBack(response, deferred)
            }
        });
        return deferred
    },
    registerUserAnalysis: function(value) {
        var deferred = $.Deferred()
        var path;
        switch (value.versionIds){
            case "01,02,03,04":
                path=api.app.localDomain+'versionAnalysis/registerUserAnalysis1.json';
                break;
            default:
                path=api.app.localDomain+'versionAnalysis/registerUserAnalysis2.json';
                break;
        }
        $.ajax({
            // url: api.app.domain +'activesAnalysis/paidUserCostAnalysis',
            url:path,
            type: "post",
            dataType: "json",
            data: api.app.format(value),
            success: function (response) {
                api.app.goBack(response, deferred)
            }
        });
        return deferred
    },
    padUserAnalysis: function(value) {
        var deferred = $.Deferred()
        var path;
        switch (value.versionIds){
            case "01,02,03,04":
                path=api.app.localDomain+'versionAnalysis/paidUserCostAnalysis1.json';
                break;
            default:
                path=api.app.localDomain+'versionAnalysis/paidUserCostAnalysis2.json';
                break;
        }
        $.ajax({
            // url: api.app.domain +'activesAnalysis/paidUserCostAnalysis',
            url:path,
            type: "post",
            dataType: "json",
            data: api.app.format(value),
            success: function (response) {
                api.app.goBack(response, deferred)
            }
        });
        return deferred
    },
    remainUserAnalysis: function(value) {
        var deferred = $.Deferred()
        var path;
        switch (value.versionIds){
            case "01,02,03,04":
                path=api.app.localDomain+'versionAnalysis/retainedUserCostAnalysis1.json';
                break;
            default:
                path=api.app.localDomain+'versionAnalysis/retainedUserCostAnalysis2.json';
                break;
        }
        $.ajax({
            // url: api.app.domain + 'activesAnalysis/retainedUserCostAnalysis',
            url:path,
            type: "post",
            dataType: "json",
            data: api.app.format(value),
            success: function (response) {
                api.app.goBack(response, deferred)
            }
        });
        return deferred
    },
}
module.exports = api;