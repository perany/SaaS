var api={
    //大区列表
    areaList:function(value){
        //console.log(api.app,'aaaa')
        var deferred=$.Deferred()
        deferred.resolve({aa:'aa'});
        $.ajax({
            //url: app.domain + '/app/Mall_HomeApi/GetUDoctorList',
            url:'../../jsons/areaList.json',
            type: "get",
            dataType: "json",
            data: app.tool.apiDataFormat(value),
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    //查找省份
    provinceList:function(value){
        //console.log(api.app,'aaaa')
        var deferred=$.Deferred()
        deferred.resolve({aa:'aa'});
        $.ajax({
            //url: app.domain + '/app/Mall_HomeApi/GetUDoctorList',
            url:'../../jsons/areaList.json',
            type: "get",
            dataType: "json",
            data: app.tool.apiDataFormat(value),
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    //查找城市
    cityList:function(value){
        //console.log(api.app,'aaaa')
        var deferred=$.Deferred()
        deferred.resolve({aa:'aa'});
        $.ajax({
            //url: app.domain + '/app/Mall_HomeApi/GetUDoctorList',
            url:'../../jsons/areaList.json',
            type: "get",
            dataType: "json",
            data: app.tool.apiDataFormat(value),
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    //查找区县
    cityList:function(value){
        //console.log(api.app,'aaaa')
        var deferred=$.Deferred()
        deferred.resolve({aa:'aa'});
        $.ajax({
            //url: app.domain + '/app/Mall_HomeApi/GetUDoctorList',
            url:'../../jsons/areaList.json',
            type: "get",
            dataType: "json",
            data: app.tool.apiDataFormat(value),
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    //商圈
    shopList:function(value){
    //console.log(api.app,'aaaa')
    var deferred=$.Deferred()
    deferred.resolve({aa:'aa'});
    $.ajax({
        //url: app.domain + '/app/Mall_HomeApi/GetUDoctorList',
        url:'../../jsons/areaList.json',
        type: "get",
        dataType: "json",
        data: app.tool.apiDataFormat(value),
        success: function(response) {
            deferred.resolve(response);
        }
    });
    return deferred
}
}
module.exports = api; 