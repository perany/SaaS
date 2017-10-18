/*
history决定使用hash方式还是history方式，未开发
route.config根据router的配置来决定路径上面的参数和key值
*/
Array.prototype.search = function(value) {
    if (this.length != 0) {
        var st = ',' + this.toString() + ','
        if (st.lastIndexOf(',' + value + ',') != -1) {
            return true
        } else {
            return false
        }
    }
    return false
}
Array.prototype.clone = function(value) {
    var newA = []
    for (var i = 0; i < this.length; i++) {
        newA.push(this[i])
    }
    return newA
}
require("./base/base.less")
require("./base/sassFrame.less")
require("./base/time.less")
var history = 'hash'
var baseR = '../'
var app = require("./app.js")
    //var route = require("./route_dynamic.js")
    //var route = require("./route_static.js")

var route = null
    //require.ensure(['./route_dynamic_induction.js'], function(e) {
    //route = require("./route_static.js")
route = require('./route_dynamic_induction.js')
    // console.log(route, 'dsdsdsd')
route.config = {
    'template': 'template/id',
    //'index': 'index/id/aid/wid',
    'monitorDetail': 'monitorDetail/id/type',
    'activeTourist': 'activeTourist/id/type',
    'crowdPortrait': 'crowdPortrait/id/type',
    //'monitorFlow': 'monitorFlow/id',
}

var url

//app._adap='1'
app.changePage = function(value, value1) {
    //app.header.reset();
    $('#modal').remove()
    app.parpam = {}
    if (value1) {
        var urlP = route.config[value]
        var str = ''
        for (var i in value1) {
            var key = i
            var exg = new RegExp(key, ['g'])
            if (urlP) {
                if (urlP.match(exg)) {
                    urlP = urlP.replace(exg, value1[i])
                    app.parpam[key] = value1[i]
                    str = urlP
                }
            } else {
                str = value
            }
        }
        window.location.hash = '#!/' + str
    } else {
        var ttt = window.location.hash.split('/')
            //console.log(ttt,value)
        if (ttt.length > 2) {
            var canshu
            if (route.config[value]) {
                canshu = route.config[value].split('/')
                for (var j = 2; j < ttt.length; j++) {
                    var key = canshu[j - 1]
                    app.parpam[key] = ttt[j]
                }
            }
        }
        if (ttt[1] == value) {
            app.loading.show()
            route.render(value, app)
            if (value == 'login') {
                app.header.hide()
                app.menu.hide()
                $('#bottom').hide()
            } else {
                app.header.show()
                app.menu.show()
                $('#bottom').show()

            }
            app.menu.pageMenu()
            if (value != 'index') {
                app.alert.hide()
            }
        } else {
            window.location.hash = '#!/' + value
        }
    }

}
app.returnRequier = function(value) {
    var num = 0
    var deferred = $.Deferred()
    var total = value.length
    for (var i = 0; i < value.length; i++) {
        value[i].done(function() {
            num++
            if (num == total) {
                //console.log('dsdjjk')
                deferred.resolve();
            }
        })
    }
    return deferred
}
app.login = function(msg) {
    //console.log('///', msg);
    if (msg.status) {
        if (msg.status == "302") {
            app.changePage('login')
        }
    }
};
app.hideMenu = function() {
    app.menu.hide()
};
// app.getOs = function() {
//     console.log('dhsichdsicids', app.header.event)
// };
//app.page = page

$(window).on('hashchange', function() {
    url = window.location.hash.split('/')[1]
    app.changePage(url)
})

if (!window.location.hash) {
    app.changePage(app.main)
} else {
    if (window.location.hash.split('/')[1]) {
        app.changePage(window.location.hash.split('/')[1])
    }
}