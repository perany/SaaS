var api;
api = {

    // 维度
    dimensionAnalysis: function() {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.localDomain + 'portraitAnalysis/dimensionAnalysis',
            type: "POST",
            dataType: "json",
            success: function(response) {
                deferred.resolve(response);
            }
        });

        return deferred
    },
    costList: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.localDomain + 'onlineChannel/costList',
            type: "POST",
            dataType: "json",
            data: value,
            success: function(response) {
                deferred.resolve(response);
            }
        });

        return deferred
    },
    //渠道列表（查询渠道成本）
    list: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.localDomain + 'onlineChannel/list',
            type: "post",
            dataType: "json",
            data: api.app.format(value),
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    //事件组
    event: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.localDomain + 'portraitAnalysis/event',
            type: "POST",
            dataType: "json",
            data: value,
            success: function(response) {
                deferred.resolve(response);
            }
        });

        return deferred
    },
    //事件
    events: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.localDomain + 'eventGroup/events',
            type: "POST",
            dataType: "json",
            data: value,
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    // 设备型号
    deviceTypeAnalysis: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.localDomain + 'portraitAnalysis/deviceTypeAnalysis.json',
            type: "POST",
            dataType: "json",
            data: value,
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    // 操作系统
    operatingSystemAnalysis: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.localDomain + 'portraitAnalysis/operatingSystemAnalysis.json',
            type: "POST",
            dataType: "json",
            data: value,
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    // 屏幕分辨率
    screenResolutionAnalysis: function(value) {
        var deferred = $.Deferred()
            //deferred.resolve({aa:'aa'});
        $.ajax({
            url: api.app.localDomain + 'portraitAnalysis/screenResolutionAnalysis.json',
            type: "POST",
            dataType: "json",
            data: value,
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    // 网络方式
    networkModeAnalysis: function(value) {
        var deferred = $.Deferred()
            //deferred.resolve({aa:'aa'});
        $.ajax({
            url: api.app.localDomain + 'portraitAnalysis/networkModeAnalysis.json',
            type: "POST",
            dataType: "json",
            data: value,
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    // 运营商
    carrieroperatorAnalysis: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.localDomain + 'portraitAnalysis/carrieroperatorAnalysis.json',
            type: "POST",
            dataType: "json",
            data: value,
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    // 人群年龄
    ageAnalysis: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.localDomain + 'portraitAnalysis/ageAnalysis.json',
            type: "POST",
            dataType: "json",
            data: value,
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    // 性别
    genderAnalysis: function(value) {
        var deferred = $.Deferred()
            //deferred.resolve({aa:'aa'});
        $.ajax({
            url: api.app.localDomain + 'portraitAnalysis/genderAnalysis.json',
            type: "POST",
            dataType: "json",
            data: value,
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    // 人群婚姻状况洞察接口
    marriageAnalysis: function(value) {
        var deferred = $.Deferred()
            //deferred.resolve({aa:'aa'});
        $.ajax({
            url: api.app.localDomain + 'portraitAnalysis/marriageAnalysis.json',
            type: "POST",
            dataType: "json",
            data: value,
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    // 教育
    educationAnalysis: function(value) {
        var deferred = $.Deferred()
            //deferred.resolve({aa:'aa'});
        $.ajax({
            url: api.app.localDomain + 'portraitAnalysis/educationAnalysis.json',
            type: "POST",
            dataType: "json",
            data: value,
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    // 城市
    sourceCityAnalysis: function(value) {
        var deferred = $.Deferred()
            //deferred.resolve({aa:'aa'});
        $.ajax({
            url: api.app.localDomain + 'portraitAnalysis/sourceCityAnalysis.json',
            type: "POST",
            dataType: "json",
            data: value,
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    // 省份
    sourceProvinceAnalysis: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.localDomain + 'portraitAnalysis/sourceProvinceAnalysis.json',
            type: "POST",
            dataType: "json",
            data: value,
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    // 职业
    occupationAnalysis: function(value) {
        var deferred = $.Deferred()
            //deferred.resolve({aa:'aa'});
        $.ajax({
            url: api.app.localDomain + 'portraitAnalysis/occupationAnalysis.json',
            type: "POST",
            dataType: "json",
            data: value,
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    // 月收入
    consumptionIncomeRatioAnalysis: function(value) {
        var deferred = $.Deferred()
            //deferred.resolve({aa:'aa'});
        $.ajax({
            url: api.app.localDomain + 'portraitAnalysis/consumptionIncomeRatioAnalysis.json',
            type: "POST",
            dataType: "json",
            data: value,
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    // 兴趣偏好
    interestPreferenceAnalysis: function(value) {
        var deferred = $.Deferred()
            //deferred.resolve({aa:'aa'});
        $.ajax({
            url: api.app.localDomain + 'portraitAnalysis/interestPreferenceAnalysis.json',
            type: "POST",
            dataType: "json",
            data: value,
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    // app偏好
    appPreferenceAnalysis: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.localDomain + 'portraitAnalysis/appPreferenceAnalysis.json',
            type: "POST",
            dataType: "json",
            data: value,
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    //用户类型
    valueList: function(value) {
        var deferred = $.Deferred();
        var path;
        switch (value.type){
            case "os":
                path=api.app.localDomain+'dictionary/valueList2-os.json';
                break;
            case "eventgroup":
                path=api.app.localDomain+'dictionary/valueList6-eventgroup.json';
                break;
            case "userevent":
                path=api.app.localDomain+'dictionary/valueList4-userevent.json';
                break;
            case "usertype":
                path=api.app.localDomain+'dictionary/valueList3-usertype.json';
                break;
            case "dimensionality":
                path=api.app.localDomain+'dictionary/valueList5-dimensionality.json';
                break;
            default:
                path=api.app.localDomain + 'dictionary/valueList2-os.json';
                break;
        }
        if (value.osID) {
            path += '?type=' + value.type + '&osId=' + value.osID;
        } else {
            path += '?type=' + value.type;
        }
        $.ajax({
            url: path,
            type: "POST",
            async: true,
            dataType: 'json',
            timeout: 60000,
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
}
module.exports = api;