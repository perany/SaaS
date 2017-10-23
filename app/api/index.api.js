var api = {
    //获取用户类型
    valueList: function(value) {
        var deferred = $.Deferred()
        var path;
        switch (value.type){
            case "os":
                path=api.app.localDomain+'dictionary/valueList2-os.json';
                break;
            case "usertype":
                path=api.app.localDomain+'dictionary/valueList3-usertype.json';
                break;
            default:
                path=api.app.domain + 'dictionary/valueList';
                break;
        }
        // console.log("valueList",value);
        $.ajax({
            // url: api.app.domain + 'dictionary/valueList',
            url:path,
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
    //一天(用户Stream:一天)
    getUserTypeStreamUv: function(value) {
        var deferred = $.Deferred()
        var path;
        switch (value.typeCode){
            case "1":
                path=api.app.localDomain+'overviewFlow/getUserTypeStreamUv.json';
                break;
            case "2":
                path=api.app.localDomain+'overviewFlow/getUserTypeStreamUv2.json';
                break;
            case "3":
                path=api.app.localDomain+'overviewFlow/getUserTypeStreamUv3.json';
                break;
            case "4":
                path=api.app.localDomain+'overviewFlow/getUserTypeStreamUv4.json';
                break;
            default:
                path=api.app.localDomain+'overviewFlow/getUserTypeStreamUv.json';
                break;
        }
        $.ajax({
            url: path,
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
        var path;
        switch (value.typeCode){
            case "1":
                path=api.app.localDomain+'overviewFlow/getUserTypeUv1.json';
                break;
            case "2":
                path=api.app.localDomain+'overviewFlow/getUserTypeUv2.json';
                break;
            case "3":
                path=api.app.localDomain+'overviewFlow/getUserTypeUv3.json';
                break;
            case "4":
                path=api.app.localDomain+'overviewFlow/getUserTypeUv4.json';
                break;
            default:
                path=api.app.localDomain+'overviewFlow/getUserTypeUv1.json';
                break;
        }
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
        var path;
        switch (value.typeCode){
            case "-1":
                path=api.app.localDomain+'overviewFlow/getUserTypeDateStreamUv-1.json';
                break;
            case "1":
                path=api.app.localDomain+'overviewFlow/getUserTypeDateStreamUv1.json';
                break;
            case "2":
                path=api.app.localDomain+'overviewFlow/getUserTypeDateStreamUv2.json';
                break;
            case "3":
                path=api.app.localDomain+'overviewFlow/getUserTypeDateStreamUv3.json';
                break;
            case "4":
                path=api.app.localDomain+'overviewFlow/getUserTypeDateStreamUv4.json';
                break;
            default:
                path=api.app.localDomain+'overviewFlow/getUserTypeDateStreamUv-1.json';
                break;
        }
        $.ajax({
            url: path,
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
        var path;
        switch (value.typeCode){
            case "-1":
                path=api.app.localDomain+'overviewFlow/getUserTypeDateUv-1.json';
                break;
            case "1":
                path=api.app.localDomain+'overviewFlow/getUserTypeDateUv1.json';
                break;
            case "2":
                path=api.app.localDomain+'overviewFlow/getUserTypeDateUv2.json';
                break;
            case "3":
                path=api.app.localDomain+'overviewFlow/getUserTypeDateUv3.json';
                break;
            case "4":
                path=api.app.localDomain+'overviewFlow/getUserTypeDateUv4.json';
                break;
            default:
                path=api.app.localDomain+'overviewFlow/getUserTypeDateUv-1.json';
                break;
        }
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
            // url: api.app.domain + 'overviewFlow/getUvTotal',
            url:api.app.localDomain+'overviewFlow/getUvTotal.json',
            type: "post",
            dataType: "json",
            data: api.app.format(value),
            success: function(response) {
                deferred.resolve(response);
            }
        });

        return deferred;
    },
}
module.exports = api;