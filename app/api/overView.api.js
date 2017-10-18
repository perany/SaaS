var api = {
    //获取用户类型
    valueList: function(value) {
    //    console.log(value);
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.domain + 'dictionary/valueList',
            // url: '/app/api/jsons/userType.json',
            type: "get",
            dataType: "json",
            data: api.app.format(value),
            //data: value,
            success: function(response) {
                api.app.goBack(response, deferred)
               // console.log(response);
            }
        });

        return deferred;
    },
    //获取四种用户数量
    getUserTypeUv: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.domain + 'overviewFlow/getUserTypeUv',
            // url: '/app/api/jsons/overViewUser.json',
            type: "post",
            dataType: "json",
            data: api.app.format(value),
            //data: value,
            success: function(response) {
                api.app.goBack(response, deferred)
            }
        });

        return deferred;
    },

    getUserTypeStreamUv: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.domain + 'overviewFlow/getUserTypeStreamUv',
            // url: '/app/api/jsons/overViewUser.json',
            type: "post",
            dataType: "json",
            data: api.app.format(value),
            //data: value,
            success: function(response) {
                api.app.goBack(response, deferred)
            }
        });

        return deferred;
    },
    //获取累计用户数量
    getUvTotal: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.domain + 'overviewFlow/getUvTotal',
            // url: '/app/api/jsons/overViewUserAll.json',
            type: "post",
            dataType: "json",
            data: api.app.format(value),
            //data: value,
            success: function(response) {
                api.app.goBack(response, deferred);
            //    console.log('res', response);
            }
        });

        return deferred;
    },
    //用户趋势
    getUserTypeDateUv: function(value) {
        var deferred = $.Deferred()
        var type = value.typeCode
        $.ajax({
            url: api.app.domain + 'overviewFlow/getUserTypeDateUv',
            // url: '/app/api/jsons/overViewUserIndex.json',
            type: "post",
            dataType: "json",
            data: api.app.format(value),
            //data: value,
            success: function(response) {
                var arrName = [
                    { 'name': 'addUserList', 'cName': '新增用户', 'color': '#50bbb3' },
                    { 'name': 'activeUserList', 'cName': '活跃用户', 'color': '#77c9fd' },
                    { 'name': 'regUserList', 'cName': '注册用户', 'color': '#4f98e1' },
                    { 'name': 'payUserList', 'cName': '付费用户', 'color': '#9980b9' }
                ];
                if (response.meta) {
                    var min = 0
                    var max = 0
                    var data = {}
                    $.each(arrName, function() {
                        //console.log(response.data[this.name].length,this.name)
                        if (response.data[this.name]) {
                            if (response.data[this.name].length != 0) {
                                var name = this.name
                                    ///console.log(name)
                                var st = response.data[name][0].date.replace(/-/g, '/')
                                if (min == 0) {
                                    min = new Date(st).getTime()
                                }
                                min = min > new Date(st).getTime() ? new Date(st).getTime() : min
                                var rt = response.data[name][response.data[name].length - 1].date.replace(/-/g, '/')
                                if (max == 0) {
                                    max = new Date(rt).getTime()
                                }
                                max = max < new Date(rt).getTime() ? new Date(rt).getTime() : max
                                    //console.log(rt, name, max, response.data[name])
                                $.each(response.data[name], function() {
                                    //console.log(this, this.date)
                                    if (!data[this.date]) {
                                        data[this.date] = {}
                                    }
                                    data[this.date][name] = this
                                })
                            }
                        }
                    })
              //      console.log(max, min)

                    var chongpai = {}

                    var total = Math.floor((max - min) / 86400000)
                        //console.log(total)
                    for (var i = 0; i <= total; i++) {
                        var time = min + i * 86400000
                        var stt = Tool.time(new Date(time)).replace(/\//g, '-')
                            //console.log(data[stt], stt)
                        $.each(arrName, function() {
                            if (!chongpai[this.name]) {
                                chongpai[this.name] = []
                            }
                            if (data[stt]) {
                                chongpai[this.name].push(data[stt][this.name] ? data[stt][this.name] : { date: stt, uv: 0 })
                            } else {
                                chongpai[this.name].push({ date: stt, uv: 0 })
                            }
                        })

                    }
                    //console.log(chongpai, '=======")
                    switch (type) {
                        case 1:
                            chongpai = {addUserList:chongpai.addUserList}
                            break
                        case 2:
                             chongpai = {activeUserList:chongpai.activeUserList}
                            break
                        case 3:
                            chongpai = {regUserList:chongpai.regUserList}
                            break
                        case 4:
                            chongpai = {payUserList:chongpai.payUserList}
                            break
                    }
                    chongpai.campaignList=response.data.campaignList
                    chongpai.versionList=response.data.versionList
                    api.app.goBack({ meta: response.meta, data: min == 0 ? response.data : chongpai }, deferred);
                }
            }
        });
        return deferred;
    },

    getUserTypeDateStreamUv: function(value) {
        var deferred = $.Deferred()
        var type = value.typeCode
        $.ajax({
            url: api.app.domain + 'overviewFlow/getUserTypeDateStreamUv',
            // url: '/app/api/jsons/overViewUserIndex.json',
            type: "post",
            dataType: "json",
            data: api.app.format(value),
            //data: value,
            success: function(response) {
                var arrName = [
                    { 'name': 'addUserList', 'cName': '新增用户', 'color': '#50bbb3' },
                    { 'name': 'activeUserList', 'cName': '活跃用户', 'color': '#77c9fd' },
                    { 'name': 'regUserList', 'cName': '注册用户', 'color': '#4f98e1' },
                    { 'name': 'payUserList', 'cName': '付费用户', 'color': '#9980b9' }
                ];

                    var maxl = 0
                    var minl = 0
                    var newDate = {}
                    $.each(arrName, function() {
                        //var name=this.name
                        if (response.data[this.name]) {
                            if (response.data[this.name].length != 0) {
                                var name = this.name
                                ///console.log(name)
                                var st = response.data[name][0].hour * 1
                                if (minl == 0) {
                                    minl = st
                                }
                                minl = minl > st ? st : minl
                                var rt = response.data[name][response.data[name].length - 1].hour * 1
                                if (maxl == 0) {
                                    maxl = rt
                                }
                                maxl = maxl < st ? st : maxl
                                $.each(response.data[name], function() {
                                    //console.log(this, this.date)
                                    if (!newDate[this.hour]) {
                                        newDate[this.hour] = {}
                                    }
                                    newDate[this.hour][name] = this
                                })
                            }
                        }
                    })
                    var chongpai = {}
                    //  console.log(maxl, minl, 'dasdlsad')
                    for (var j = 0; j <= (maxl - minl); j++) {
                        $.each(arrName, function() {
                            if (!chongpai[this.name]) {
                                chongpai[this.name] = []
                            }
                            if (newDate[j]) {
                                chongpai[this.name].push(newDate[j][this.name] ? newDate[j][this.name] : { hour: j, uv: 0 })
                            } else {
                                chongpai[this.name].push({ hour: j, uv: 0 })
                            }
                        })
                    }
                    switch (type) {
                        case 1:
                            chongpai = {addUserList:chongpai.addUserList}
                            break
                        case 2:
                            chongpai = {activeUserList:chongpai.activeUserList}
                            break
                        case 3:
                            chongpai = {regUserList:chongpai.regUserList}
                            break
                        case 4:
                            chongpai = {payUserList:chongpai.payUserList}
                            break
                    }
                    chongpai.campaignList=response.data.campaignList
                    chongpai.versionList=response.data.versionList
                    api.app.goBack({ meta: response.meta, data: maxl == 0 ? response.data : chongpai }, deferred);

            }
        });
        return deferred;
    },


    //保存图片
    getPng: function(value) {
        var deferred = $.Deferred()
        $.ajax({
            url: api.app.domain + 'overViewInsight/getPng',
            type: "post",
            dataType: "json",
            data: api.app.format(value),
            //data:value,

            success: function(response) {
                api.app.goBack(response, deferred)
            }
        });
        return deferred
    }
}

module.exports = api;
