require("./superiorDepartment.less")
var html = require("./tpl.html")
var api = require("./superiorDepartment.api.js");
var departments = require("../../modules/department/department.js")
var searchment = require("../../modules/search/search.js")

function department() {
    this.html = html
    var that = this;
    var depart
    var search
    var one = true
    var chooseId = ''
    var pId = ''
    var arr = []
    var keyword = ''
    this.complete = function() {
        api.app = this.app;
        this.listFunNew();
        search = this.app.loadModule(searchment, this.dom.find('.search'))
        depart = this.app.loadModule(departments, this.dom.find('.listDepart'), {
            icon: [{
                name: '部门名称',
                type: 'choose',
                format: function(value, value1) {
                    if (arr.indexOf(value1) != -1) {
                        return '<i class="radios ' + (value1 == chooseId ? 'selected' : '') + '"></i><img src="/images/icolist.png" style="vertical-align: middle"><em>' + value + '</em>';
                    } else {
                        return '<i class="radios ' + (value1 == chooseId ? 'selected' : '') + '"></i><img src="" style="vertical-align: middle"><em>' + value + '</em>';
                    }
                }
            }],
            jg: [, 300],
            chose: false
        })
        $('.searchCont').attr('placeholder', '请输入上级部门名称')
        that.listFunNew(depart.getNowPage(), true);
        this.dom.find('.department .pagination').css({ 'margin-left': 0, 'border': 0, 'background': 'transparent' })
        this.dom.find('.modal-close,.cancleBtn').on('click', function() {
            that.close()
        })

        depart.event._addEvent('department.listClick', function(value) {
            that.listFunNew(depart.getNowPage(), true, value.id).done(function() {
                that.changeTitle(value)
            });
        })
        search.event._addEvent('search.click', function(value) {
            keyword = $('.searchCont').val()
            that.listFunNew(1, true);
            that.dom.find('.labels span').remove()
            var html = '<span class="titleAll">全部部门<span class="jiantou">></span></span><span class="titleName">一级部门</span>'
            that.dom.find('.labels').append(html)
        })
        depart.event._addEvent('department.changePage', function(value) {
            that.listFunNew(depart.getNowPage(), false, pId);
        })
    }

    //已选择的id
    this.setId = function(value) {
        chooseId = value
    }

    //面包屑
    this.changeTitle = function(value) {
        var newA = []
        this.dom.find('.labels span').eq(this.dom.find('.labels span').length - 1).remove()
        this.dom.find('.labels').append('<span class="titleName" cid="' + value.id + '">' + value.name + '></span>')
        this.dom.find('.labels').append('<span class="titleName">' + Tool.changeNumtoChina(that.dom.find('.labels span').not('.titleAll, .jiantou').length + 1) + '级部门</span>')
        var hhee = this.dom.find('.labels').html()
        this.dom.find('.labels').html('')
        this.dom.find('.labels').html(hhee)
        this.dom.find('.labels span').on('click', function() {
            if ($(this).attr('cid')) {
                that.listFunNew(1, true, $(this).attr('cid'))
                var weizhi = $(this).index()
                $.each(that.dom.find('.labels span'), function() {
                    if ($(this).index() * 1 > weizhi) {
                        $(this).remove()
                    }
                })
                var thL = '<span class="titleName">' + Tool.changeNumtoChina(that.dom.find('.labels span').not('.titleAll, .jiantou').length + 1) + '级部门</span>'
                that.dom.find('.labels').append(thL)
            }
        })
        that.dom.find('.titleAll').on('click', function() {
            that.listFunNew(1, true);
            that.dom.find('.labels span').remove()
            var html = '<span class="titleAll">全部部门<span class="jiantou">></span></span><span class="titleName">一级部门</span>'
            that.dom.find('.labels').append(html)
        })
    }
    this.changeList = function(valueList) {
        var newList = [];
        $(valueList).each(function(i, val) {
            newList.push({ 'id': val.teamId, 'name': val.teamName });
        })
        return newList;
    }
    this.listFunNew = function(currentPage, status, parentId) {
        var deferred = $.Deferred()
        if (parentId) {
            currentPage = 1;
        }
        jsonPage = {
            pageSize: 7,
            currentPage: currentPage,
            parentId: parentId || '',
            teamName: keyword
        }
        api.departMent(jsonPage).then(function(res) {
            var datas = res.data;
            datas.list.forEach(function(res) {
                if (res.isLastStage == 0) {
                    arr.push(res.teamId)
                }
            })
            if (res.meta.success == true && datas.list != '') {
                pId = jsonPage.parentId
                if (status == true) {
                    // depart.refreshData({
                    //     list: that.changeList(datas.list),
                    //     total: res.data.totalPage
                    // })
                    depart.setData(that.changeList(datas.list));
                    depart.getTotal(res.data.totalPage)
                } else {
                    depart.pushData({
                        list: that.changeList(datas.list),
                        total: res.data.totalPage
                    })
                }
                that.dom.find('.radios').on('click', function() {
                    that.dom.find('.radios').removeClass('selected');
                    $(this).addClass('selected');
                })
                deferred.resolve()
            } else {
                return;
            }
        });
        return deferred
    }
}
//原型链一定要有的
module.exports = department;