//svg 画图插件
var Raphael = require('./libs/drawsvg/raphael.min.js')
window.Raphael = window.Raphael || Raphael

//md5 插件
var __aw__ = require('./utils/md5.js')
window.__aw__ = window.__aw__ || __aw__

//base64插件
var base64 = require('./utils/base64.js')
window.base64 = window.base64 || base64

//通用工具插件
var tool = require('./utils/tool.js')
window.Tool = window.Tool || tool
    //数据存储
var local = require("./model/local.js")
var model = require("./model/model.js")

//模块基类和弹层基类
var Base = require('./base/modulesbase.js')
var modalBase = require('./base/modalbase.js')

//模板方法
var JTemp = require('./libs/template.js')

//svg画图方法
var svgLib = require('./libs/drawsvg/lib.js')
var svgTip = require('./libs/tip.js')

//特殊继承模式
var extend = function(value, value1) {
    var tt = new value()
    for (var i in tt) {
        if (!value1[i] || i == 'complete') {
            value1[i] = tt[i]
        }
    }
}
window.extend = window.extend || extend

//头部，尾部，菜单，加载模块
var header = require('./moduleslibs/header/header.js')

var menu = require('./moduleslibs/menu/menu.js')
var footer = require('./moduleslibs/footer/footer.js')

var alert = require('./modallibs/alert/modal.js')
var loading = require('./modallibs/loading/loading.js')

var headerClass = new Base()
header.call(headerClass)

var footerClass = new Base()
footer.call(footerClass)

var menuClass = new Base()
menu.call(menuClass)

//app的一些初始配置
var app = {

    domain: '/saas-dmp/',
    localDomain:"/app/api/SaaSData/",
    _adapss: '4',
    _seen: 'dsdj',
    main: 'login', //无hash的时候跳转到的首页
    svgLib: svgLib,
    svgTip: svgTip,
    local: local,
    model: model,
    modalId: 0,
    //渲染模板的方法
    // renderTemplate: function(html, data) {
    //     var backH = ''
    //     if (data) {
    //         var temp = new JTemp()
    //         temp.Temp(html)
    //         backH = temp.build(data)
    //     } else {
    //         backH = html
    //     }
    //     return backH
    // },
    renderTemplate: function(html, data) {
        var backH = ''
        if (data) {
            var temp = new JTemp()
            temp.Temp(html)
            backH = temp.build(data)
            var newH = dotoAll(backH)
            backH = newH ? newH : backH
        } else {
            backH = html
        }
        return backH
    },
    modal: function(value, value1, api) {
        var modalClass = new modalBase()
        value.call(modalClass)
        modalClass.init(app, value1)
        return modalClass
    },
    //加载弹窗的方法
    loadModal: function(value, value1, api) {
        var modalClass = new modalBase()
        value.call(modalClass)
        modalClass.init(app, value1, api)
        return modalClass
    },
    header: headerClass,
    footer: footerClass,
    menu: menuClass,
    //加载模块的方法
    loadModule: function(value, el, data) {
        var newModule = new Base()
        value.call(newModule)
        newModule.init(app, el, data)
        return newModule
    },
    format: function(value) { //后端传输模式要求头部插入相应的参数
        // var expireTime = new Date().getTime() + 1000 * 36000;
        // var da = new Date();
        // da.setTime(expireTime);
        // document.cookie = 'session=' + app.local.get('session') + ';expires=' + da.toGMTString() + ';path=/';
        // document.cookie = 'userName=' + app.local.get('userName') + ';expires=' + da.toGMTString() + ';path=/';
        // document.cookie = 'accountId=' + app.local.get('accountId') + ';expires=' + da.toGMTString() + ';path=/';
        // return JSON.stringify(value)
        return value
    },
    goBack: function(value, def) {
        if (value.meta) {
            if (value.meta.status == '302') {
                app.changePage('login')
            } else if (value.meta.status == "403") {
                def.resolve(value)
            } else {
                def.resolve(value)
            }
        }
    },
    resize: function() {

    }
}


function dotoAll(value) {
    if (value) {
        var nodeArray = value.match(/<template w-data(?:=[^{,},<,>])\S{1,} w-template(?:=[^{,},<,>])\S{1,}><\/template>/g)
        if (!nodeArray) {
            return value
        }
        if (nodeArray.length != 0) {
            for (var i = 0; i < nodeArray.length; i++) {
                //console.log(nodeArray[i],i,'============')
                var data = nodeArray[i].match(/w-data(?:=[^{,},<,>])\S{1,}/g)[0].replace('w-data="', '').replace(/"$/g, '')
                var link = nodeArray[i].match(/w-template(?:=[^{,},<,>])\S{1,}/g)[0].replace('w-template="', '').replace('"></template>', '')
                var html = require('./templates/' + link)
                value = value.replace(nodeArray[i], app.renderTemplate(html, JSON.parse(data)))
            }
            return value
        }
    }
    return null
}
$(window).resize(function() {
    //app.resize()
});
//app.token = __aw__(app._adap + '_' + app._seen)
$('#header').html(headerClass.html)
$('#footer').html(footerClass.html)
$('#menu').html(menuClass.html)
headerClass.init(app, $('#header'))
footerClass.init(app, $('#footer'))
menuClass.init(app, $('#content #menu'))
    //menuClass.init(app, $('#menu'))

//初始化
app.loading = app.loadModal(loading)
app.loading.hide()

app.alert = app.loadModal(alert)
app.alert.hide()

module.exports = app;