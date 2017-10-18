require("./department.less");
var html = require("./tpl.html");
var pagination = require('../pagination/pagination.js')
var list = require('../list/list.js')

function department() {
    //this.dom
    var part = null
    var listC = null
    var that = this
    this.html = html;
    this.complete = function() {
        if (!this.nowParam.noPage) {
            part = that.app.loadModule(pagination, that.dom.find('.department .pagination'), {
                total: 1
            })
            part.event._addEvent('pagination.changePage', function(value) {
                that.event._dispatch('department.changePage', value)
            })
        }
        listC = this.app.loadModule(list, this.dom.find('.department .list'), {
            icon: this.nowParam.icon,
            jg: this.nowParam.jg,
            chose: this.nowParam.chose,
            chooseName: this.nowParam.chooseName,
            iconArr: this.nowParam.iconArr
        })
        listC.event._addEvent('list.initBranch', function(value) {
            that.event._dispatch('department.initBranch', value)
        })
        listC.event._addEvent('list.brandid', function(value) {
            that.event._dispatch('department.brandid', value)
        })
        listC.event._addEvent('list.brandVal', function(value) {
            that.event._dispatch('department.brandVal', value)
        })
        listC.event._addEvent('list.modelVal', function(value) {
            that.event._dispatch('department.modelVal', value)
        })




        listC.event._addEvent('list.choose', function(value) {
            that.event._dispatch('department.listClick', value)
        })
        listC.event._addEvent('list.search', function(value) {
            that.event._dispatch('department.search', value)
        })
        listC.event._addEvent('list.brandId', function(value) {
            that.event._dispatch('department.brandId', value)
        })
        listC.event._addEvent('list.finish', function(value) {
            that.event._dispatch('department.finish', value)
        })
        listC.event._addEvent('list.paixu', function(value) {
            that.event._dispatch('department.paixu', value)
        })
        listC.event._addEvent('list.status', function(value) {
            that.event._dispatch('department.status', value)
        })
        listC.event._addEvent('list.getChoose', function(value) {
            that.event._dispatch('department.getChoose', value)
        })
        listC.event._addEvent('list.delete', function(value) {
            that.event._dispatch('department.delete', value)
        })

    }
    this.setData = function(value) {
        listC.setData(value);
    };
    this.resetAll = function() {
        part.resetAll();
    };
    this.getTotal = function(value) {
        part.getTotal(value)
    };
    this.getNowPage = function() {
        return part.pageId
    }
    this.getChoose = function() {
        return listC.getChoose()
    }
    this.pushData = function(value) {
        listC.setData(value.list)
    }
    this.initSelect = function(value, dom, type, isShow) {
        listC.initSelect(value, dom, type, isShow)
    };
    // this.match = function(value) {
    //     listC.match(value)
    // }
    // this.match1 = function(value) {
    //     listC.match1(value)
    // }

}
//原型链一定要有的
module.exports = department;