require("./folderschoose.less");
var deferred = $.Deferred()
var deferred1 = $.Deferred()
var deferred2 = $.Deferred()
var department
var search
var breadcrumb
require.ensure(['../../moduleslibs/department/department.js'], function() {
    deferred.resolve()
    console.log('dsdjkd')
    department = require('../../moduleslibs/department/department.js')
})
require.ensure(['../../moduleslibs/search/search.js'], function() {
    deferred1.resolve()
    console.log('dsdjkd')
    search = require('../../moduleslibs/search/search.js')
})
require.ensure(['../../moduleslibs/breadcrumb/breadcrumb.js'], function() {
    deferred2.resolve()
    console.log('dsdjkd')
    breadcrumb = require('../../moduleslibs/breadcrumb/breadcrumb.js')
})

function modal() {
    var html = require("./tpl.html")
    var that = this;
    this.html = html;
    this.body = '';
    this.dom = '';
    this.complete = function() {
        this.dom.find('.modal').css('margin-top', '-225px')
        that.body = that.dom.find('.modal-body');
        that.dom.find('.btn-cancel, .modal-close').on('click', function() {
            that.event._dispatch('folderschoose.cancel')
           // that.hide();
        });
        that.dom.find('.btn-confirm').on('click', function() {
            that.event._dispatch('folderschoose.sure')
           // that.hide();
        })

        this.app.returnRequier([deferred, deferred1, deferred2]).done(function() {
            var now = that.app.loadModule(department, that.body.find('.l-c'), {
                icon: {
                    "wenjian": { name: '文件夹名称', type: 'choose' }
                },
                chose: 'one'
            })
            now.refreshData({
                list: that.initDate.list,
                total: 1
            })
            now.event._addEvent('department.listClick', function(value) {
                console.log(value)
            })
            now.event._addEvent('department.checkClick', function(value) {
                console.log(value)
            })
            that.app.loadModule(search, that.body.find('.s-c'), {
                title: '输入文件夹名称'
            })
            var tempbreadcrumb = that.app.loadModule(breadcrumb, that.body.find('.b-c'), {
                iconPos: { x: 83, y: 182 },
                list: [{ text: '自定义管理' }, { text: '销售管理' }]
            })
            tempbreadcrumb.event._addEvent('breadcrumb.click', function(value) {
                console.log(value)
            })

        })
    }
    this.show = function(value) {

    }
    this.hide = function() {
        that.dom.hide();
    }
}
//原型链一定要有的
module.exports = modal;
