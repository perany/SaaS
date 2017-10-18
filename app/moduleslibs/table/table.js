var resolve = $.Deferred()
var resolve1 = $.Deferred()
var list;
var pagination;
var html = require("./table.html");
require.ensure(['../list/list.js'], function(e) {
    list = require('../list/list.js')
    resolve.resolve()
});
require.ensure(['../pagination/pagination.js'], function(e) {
    pagination = require('../pagination/pagination.js')
    resolve1.resolve()
});

function index() {
    var that = this;
    this.html = html;
    var tableList = null;
    var pagina = null;
    this.icon = '';
    this.chose = '';
    this.complete = function() {
        //this.dom.html(html);
        this.icon = this.nowParam.icon;
        this.chose = this.nowParam.chose;
        this.type = this.nowParam.type;
        //console.log('table', this.icon, this.chose);
        this.app.returnRequier([resolve, resolve1]).done(function() {
            //console.log('kkkkk', list);
            tableList = that.app.loadModule(list, that.dom.find('.list'), {
                icon: that.icon,
                chose: that.chose,
                type: that.type
            });
            pagina = that.app.loadModule(pagination, that.dom.find('.pagination'), {
                total: 1
            });
            pagina.event._addEvent('pagination.changePage', function(value) {
                that.event._dispatch('table.pagenumber', parseInt(value))
            });
            tableList.event._addEvent('list.edit', function(value) {
                that.event._dispatch('table.edit', value);
            });
            tableList.event._addEvent('list.delete', function(value) {
                that.event._dispatch('table.delete', value);
            })
            tableList.event._addEvent('list.down', function(value) {
                that.event._dispatch('table.down', value);
            })
        });
    };
    this.setData = function(value) {
        tableList.setData(value);
    };
    this.resetAll = function() {
        pagina.resetAll();
    };
    this.getTotal = function(value) {
        pagina.getTotal(value)
    };
    this.getChoose = function() {
        return tableList.getChoose();
    };
    // this.editClick = function(){

    // }
}
module.exports = index;