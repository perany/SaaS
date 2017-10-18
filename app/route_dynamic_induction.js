var pageBase = require('./base/pagebase.js')

var appClass
var base
var pagesId
var route = {
    config: null,
    render: function(pages, app) {
        appClass = app
        var a
        var api
        var html
        pagesId = pages + '-content-fade'
        extendBase()
    }
}

function extendBase() {
    //function extendBase(className, api, html) {
    if (base) {
        base.dispose()
    }
    require("./less/" + pagesId.replace('-content-fade', '') + ".less")
    var className = require("./pages/" + pagesId.replace('-content-fade', '') + ".js");
    var api = require('./api/' + pagesId.replace('-content-fade', '') + '.api.js')
    var html = require('../pages/' + pagesId.replace('-content-fade', '') + '.html')
    api.app = appClass
    base = new pageBase()
    if (typeof className === 'function') {
        className.call(base)
        pageDeal(appClass, base, api, html)
    } else {
        className.done(function(value) {
            value.call(base)
            pageDeal(appClass, base, api, html)
        })
    }
}

function pageDeal(appClass, base, api, html) {
    appClass.loading.hide()
    appClass.resize=base.resize
    if (!document.getElementById("right-content").innerHTML) {
        document.getElementById("right-content").innerHTML = '<div id="' + pagesId + '">' + html + '</div>'
        base.init(appClass, api, $('#right-content').children('div'))
    } else {
        if ($('#right-content').children('div').length == 1 && pagesId != $('#right-content').children('div').attr('id')) {
            $('#right-content').append('<div style="display:none" id="' + pagesId + '">' + html + '</div>')
            $('#right-content').children('div').eq(0).stop().fadeOut(300, function() {
                $(this).remove()
            })
            $('#right-content').children('#' + pagesId).stop().fadeIn(300, function() {

            })
            base.init(appClass, api, $('#right-content').children('#' + pagesId))
        } else {
            document.getElementById("right-content").innerHTML = '<div style="display:none" id="' + pagesId + '">' + html + '</div>'
            $('#right-content').children('div').eq(0).stop().fadeIn()
            base.init(appClass, api, $('#right-content').children('div'))

        }
    }
}
module.exports = route;
