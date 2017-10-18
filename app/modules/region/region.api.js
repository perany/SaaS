var api = {
    app: null,
    //部门list
    areaList: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.domain + 'dictionary/areaListPage',
            type: "GET",
            dataType: "json",
            data: value,
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    provienceList: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.domain + 'dictionary/getStateListPage',
            type: "GET",
            dataType: "json",
            data: value,
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    cityList: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.domain + 'dictionary/getCityListPage',
            type: "GET",
            dataType: "json",
            data: value,
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    //区县
    districtList: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.domain + 'dictionary/getDistrictListPage',
            type: "GET",
            dataType: "json",
            data: value,
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    //商圈
    shopList: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.domain + 'dictionary/getMallListPage',
            type: "GET",
            dataType: "json",
            data: value,
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    //根据名称搜索
    searchNameList: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.domain + 'dictionary/getGeoNameListPage',
            type: "GET",
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