require("./users.less")
var html = require("./tpl.html")
var api = require("./users.api.js");
var departments = require("../../modules/department/department.js")
var searchment = require("../../modules/search/search.js")

function department() {
    this.html = html
    var that = this;
    var depart = null;
    var idArr = ''
    var keyword = ''
    this.complete = function() {
        api.app = this.app;
        search = this.app.loadModule(searchment, this.dom.find('.search'))
            // that.initHearder(count);
    }
    this.initHearder = function(value) {
        if (value.type == '用户') {
            that.dom.find('.tipsArea').html('注:请至少选择一个用户')
            depart = this.app.loadModule(departments, this.dom.find('.userLists'), {
                icon: [{
                    name: '账号',
                    type: 'txt',
                    format: function(value) {
                        return '<em>' + value + '</em>';
                    }
                }, {
                    name: '姓名',
                    type: 'txt',
                    format: function(value) {
                        return value
                    }
                }],
                jg: [, 150, 250],
                chose: true
            })
        } else {
            that.dom.find('.tipsArea').html('注:请至少选择一个角色')
            depart = this.app.loadModule(departments, this.dom.find('.userLists'), {
                icon: [{
                    name: value.name,
                    type: 'txt',
                    format: function(value) {
                        return '<em>' + value + '</em>';
                    }
                }],
                jg: [, 250],
                chose: true
            })
        }
        //that.userFun(depart.getNowPage(), true);
        $('.searchCont').attr('placeholder', '请输入' + value.type + '名称')
        this.dom.find('.modal-close,.cancleBtn').on('click', function() {
            that.close()
        })
        depart.event._addEvent('department.changePage', function(value) {
            //that.userFun(depart.getNowPage(), false);
            that.event._dispatch('user.changePage', { page: depart.getNowPage(), type: false });
        })
        this.dom.find('.searcher a').on('click', function() {
            keyword = $('.searchCont').val().trim()
                //console.log('key', keyword);
            that.event._dispatch('user.search', { page: 1, type: true, search: keyword });
        })
    }
    this.setId = function(value) {
        idArr = value
    }
    this.getData = function(value, status, type) {
        if (value.list.length > 0) {
            that.dom.find('.dataNone').addClass('hide');
            that.dom.find('.userLists').removeClass('hide');
            //$('#pager1').removeClass('hide');
        } else {
            that.dom.find('.dataNone').removeClass('hide');
            that.dom.find('.userLists').addClass('hide');
            //$('#pager1').addClass('hide');
        }
        if (status == true) {
            // depart.refreshData({
            //     list: that.changeList(value.list, type),
            //     total: value.totalPage
            // })
            depart.setData(that.changeList(value.list, type));
            depart.getTotal(value.totalPage)
        } else {
            depart.pushData({
                list: that.changeList(value.list, type),
                total: value.totalPage
            })
        }
        that.showChoose()
    };
    this.showChoose = function() {
        var i = 0;
        var j = 0;
        $.each(this.dom.find('.check-box'), function() {
            var nowId = $(this).parent().attr('nowid')
            if (idArr.lastIndexOf(',' + nowId + ',') != -1 && idArr != '') {
                $(this).addClass('choose')
            }
        })
        $.each(this.dom.find('.list-content .check-box'), function() {
            if ($(this).hasClass('choose')) {
                i++
            }
            j++;
            if (i == j) {
                depart.dom.find('.department .list .list1 .list-header .check-box').addClass('choose')
            } else {
                depart.dom.find('.department .list .list1 .list-header .check-box').removeClass('choose')
            }
        })
    }
    this.changeList = function(valueList, type) {
        var newList = [];
        if (type == '请输入用户名称') {
            $(valueList).each(function(i, val) {
                newList.push({ 'id': val.userId, 'loginName': val.loginName, 'name': val.userName });
            })
        } else {
            $(valueList).each(function(i, val) {
                newList.push({ 'id': val.userId, 'loginName': val.loginName });
            })
        }

        return newList;
    };
}
//原型链一定要有的
module.exports = department;