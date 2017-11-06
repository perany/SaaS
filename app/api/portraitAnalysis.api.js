var api;
api = {

    // 维度
    dimensionAnalysis: function() {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.domain + 'portraitAnalysis/dimensionAnalysis',
            type: "GET",
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
            url: api.app.domain + 'onlineChannel/costList',
            type: "GET",
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
            url: api.app.domain + 'onlineChannel/list',
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
            url: api.app.domain + 'portraitAnalysis/event',
            type: "GET",
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
            url: api.app.domain + 'eventGroup/events',
            type: "GET",
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
            url: api.app.domain + 'portraitAnalysis/deviceTypeAnalysis',
            type: "GET",
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
            url: api.app.domain + 'portraitAnalysis/operatingSystemAnalysis',
            type: "GET",
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
            url: api.app.domain + 'portraitAnalysis/screenResolutionAnalysis',
            type: "GET",
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
            url: api.app.domain + 'portraitAnalysis/networkModeAnalysis',
            type: "GET",
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
            url: api.app.domain + 'portraitAnalysis/carrieroperatorAnalysis',
            type: "GET",
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
            url: api.app.domain + 'portraitAnalysis/ageAnalysis',
            type: "GET",
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
            url: api.app.domain + 'portraitAnalysis/genderAnalysis',
            type: "GET",
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
            url: api.app.domain + 'portraitAnalysis/marriageAnalysis',
            type: "GET",
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
            url: api.app.domain + 'portraitAnalysis/educationAnalysis',
            type: "GET",
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
            url: api.app.domain + 'portraitAnalysis/sourceCityAnalysis',
            type: "GET",
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
            url: api.app.domain + 'portraitAnalysis/sourceProvinceAnalysis',
            type: "GET",
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
            url: api.app.domain + 'portraitAnalysis/occupationAnalysis',
            type: "GET",
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
            url: api.app.domain + 'portraitAnalysis/consumptionIncomeRatioAnalysis',
            type: "GET",
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
            url: api.app.domain + 'portraitAnalysis/interestPreferenceAnalysis',
            type: "GET",
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
            url: api.app.domain + 'portraitAnalysis/appPreferenceAnalysis',
            type: "GET",
            dataType: "json",
            data: value,
            success: function(response) {
                deferred.resolve(response);
            }
        });
        return deferred
    },
    // //获取事件组类型
    // valueList: function(value) {
    //     var deferred = $.Deferred();
    //     $.ajax({
    //         url: api.app.domain + 'dictionary/valueList',
    //         type: "GET",
    //         dataType: "json",
    //         data: value,
    //         success: function(response) {
    //             deferred.resolve(response);
    //         }
    //     });
    //     return deferred
    // },
    //用户类型
    valueList: function(value, adds) {
        var deferred = $.Deferred();
        var path;
        switch (value){
            case "os":
                path=api.app.localDomain+'dictionary/valueList2-os.json';
                break;
            case "eventgroup":
            case "userevent":
                path=api.app.localDomain+'dictionary/valueList4-userevent.json';
                break;
            case "usertype":
                path=api.app.localDomain+'dictionary/valueList3-usertype.json';
                break;
            default:
                path=api.app.domain + 'dictionary/valueList4-userevent.json';
                break;
        }
        if (adds) {
            path += '?type=' + value + '&osId=' + adds;
        } else {
            path += '?type=' + value;
        }
        $.ajax({
            url: path,
            type: "get",
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