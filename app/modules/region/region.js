require("./region.less")
var html = require("./tpl.html")
var api = require("./region.api.js");
var departments = require("../../modules/department/department.js")
var searchment = require("../../modules/search/search.js")

function department() {
    this.html = html
    var that = this;
    var depart
    var search
    var level = 1;
    var nowChooseId = ''
    var idArr = ''
    var arr = []
    var searchArr = []
    var i;
    var shopId = ''
    var keyword = ''
    this.complete = function() {
        api.app = this.app;
        search = this.app.loadModule(searchment, this.dom.find('.search'))
        depart = this.app.loadModule(departments, this.dom.find('.listAreas'), {
            icon: [{
                name: '区域名称',
                type: 'choose',
                format: function(value, value1) {
                    if (level == 2 || level == 1 || level == 3 || level == 4) {
                        return '<img src="/images/icolist.png" style="vertical-align: middle"><em type="' + level + '">' + value + '</em>';
                    } else {
                        return '<img scr="" style="vertical-align: middle"><em type="' + level + '">' + value + '</em>';
                    }
                }
            }],
            jg: [, 300, 250, 250],
            chose: true
        })
        $('.searchCont').attr('placeholder', '请输入区域名称')
        that.areaFun(depart.getNowPage(), true);
        depart.event._addEvent('department.listClick', function(value) {

            switch (level) {
                case 1:
                    that.provienceFun(depart.getNowPage(), true, value.id).done(function() {
                        that.changeTitle(value)
                    });
                    break;
                case 2:
                    that.cityFun(depart.getNowPage(), true, value.id).done(function() {
                        that.changeTitle(value)
                    });
                    break;
                case 3:
                    that.districtFun(depart.getNowPage(), true, value.id).done(function() {
                        that.changeTitle(value)
                    });
                    break;
                case 4:
                    that.shopFun(depart.getNowPage(), true, value.id).done(function() {
                        shopId = value.id;
                        that.changeTitle(value)
                    });
                    break;
            }
        })
        this.dom.find('.modal-close,.cancleBtn').on('click', function() {
            that.close()
        })
        $(".searcher a").on('click', function() {
            keyword = $('.searchCont').val();
            that.searchFun(true, 1);
            that.dom.find('.labels span').not('.titleAll').remove()
        })
        depart.event._addEvent('department.changePage', function(value) {
            switch (level - 1) {
                case 0:
                    that.areaFun(depart.getNowPage(), false);
                    break;
                case 1:
                    that.provienceFun(depart.getNowPage(), false, nowChooseId);
                    break;
                case 2:
                    that.cityFun(depart.getNowPage(), false, nowChooseId);
                    break;
                case 3:
                    that.districtFun(depart.getNowPage(), false, nowChooseId);
                    break;
                case 4:
                    that.shopFun(depart.getNowPage(), false, shopId);
                    break;
                case 9:
                    that.searchFun(false, depart.getNowPage())
            }
        })
    }
    this.setId = function(value) {
        idArr = value
    }
    this.changeTitle = function(value) {
        this.dom.find('.labels .titleLast').remove();
        var newA = []
        this.dom.find('.labels').append('<span class="titleName" level="' + (level - 1) + '" cid="' + value.id + '">' + value.name + '></span>')
        var html = '<span class="titleLast">全部区域</span>'
        this.dom.find('.labels').append(html);
        var html = this.dom.find('.labels').html()
        this.dom.find('.labels').html('')
        this.dom.find('.labels').html(html)
        this.dom.find('.labels span').on('click', function() {
            if ($(this).attr('cid')) {
                level = $(this).attr('level') * 1
                switch (level) {
                    case 1:
                        that.provienceFun(1, true, $(this).attr('cid') * 1).done(function() {});
                        break;
                    case 2:
                        that.cityFun(1, true, $(this).attr('cid') * 1).done(function() {

                        });
                        break;
                    case 3:
                        that.districtFun(1, true, $(this).attr('cid') * 1).done(function() {});
                        break;
                    case 4:
                        that.shopFun(1, true, $(this).attr('cid') * 1).done(function() {});
                        break;
                }
                var weizhi = $(this).index()
                $.each(that.dom.find('.labels span').not('.titleLast'), function() {
                    if ($(this).index() * 1 > weizhi) {
                        $(this).remove()
                    }
                })
            }
        })
        this.dom.find('.labels .titleAll').on('click', function() {
            that.dom.find('.labels span').not('.titleAll').remove()
            that.areaFun1(1, true);
            level = 1
        })
    }
    this.getAreaChoose = function() {
        var str = ','
        $.each($('.selectAreaCont li'), function() {
            str += $(this).attr('nowid') + ','
        })
        return str
    }
    this.changeList = function(valueList) {
        var newList = [];
        $(valueList).each(function(i, val) {
            newList.push({ 'id': val.id, 'name': val.name });
        })
        return newList;
    };
    this.areaFun = function(currentPage, status) {
        var jsonPage = {
            pageSize: 7,
            currentPage: currentPage
        };
        api.areaList(jsonPage).then(function(res) {
            var datas = res.data;
            if (res.meta.success == true && datas.list.length != 0) {
                if (status == true) {
                    depart.refreshData({
                        list: that.changeList(datas.list),
                        total: res.data.totalPage
                    })
                } else {
                    depart.pushData({
                        list: that.changeList(datas.list),
                        total: res.data.totalPage
                    })
                }
                that.showChoose()
            } else {
                return;
            }
        });
    }
    this.areaFun1 = function(currentPage, status) {
        var jsonPage = {
            pageSize: 7,
            currentPage: currentPage
        };
        api.areaList(jsonPage).then(function(res) {
            var datas = res.data;
            if (res.meta.success == true && datas.list.length != 0) {
                if (status == true) {
                    depart.refreshData({
                        list: that.changeList(datas.list),
                        total: res.data.totalPage
                    })
                } else {
                    depart.pushData({
                        list: that.changeList(datas.list),
                        total: res.data.totalPage
                    })
                }
                $.each(datas.list, function(val, i) {
                    var tempDom = depart.dom.find('.list-content').children('div').eq(val).find('li').eq('1')
                    tempDom.find('em').attr('type', 1)
                })
                $.each(that.dom.find('.check-box'), function() {
                    var nowId = $(this).parent().attr('nowid')
                    if (that.getAreaChoose().lastIndexOf(',' + nowId + ',') != -1) {
                        $(this).addClass('choose')
                    }
                })
            } else {
                return;
            }
        });
    }
    this.provienceFun = function(currentPage, status, id) {
        var deferred = $.Deferred()
        var jsonPage = {
            id: id,
            pageSize: 7,
            currentPage: currentPage
        };
        api.provienceList(jsonPage).then(function(res) {
            var datas = res.data;
            datas.list.forEach(function(val) {
                level = val.resource_type;
            })
            if (res.meta.success == true && datas.list != '') {
                nowChooseId = id
                if (status == true) {
                    depart.refreshData({
                        list: that.changeList(datas.list),
                        total: res.data.totalPage
                    })
                } else {
                    depart.pushData({
                        list: that.changeList(datas.list),
                        total: res.data.totalPage
                    })
                }
                that.showChoose()
                deferred.resolve()
            } else {
                return;
            }
        })
        return deferred
    }
    this.cityFun = function(currentPage, status, id) {
        var deferred = $.Deferred()
        var jsonPage = {
            id: id,
            pageSize: 7,
            currentPage: currentPage
        };
        api.cityList(jsonPage).then(function(res) {
            var datas = res.data;
            datas.list.forEach(function(val) {
                level = val.resource_type;
            })
            if (res.meta.success == true && datas.list != '') {
                if (status == true) {
                    nowChooseId = id
                    depart.refreshData({
                        list: that.changeList(datas.list),
                        total: res.data.totalPage
                    })
                } else {
                    depart.pushData({
                        list: that.changeList(datas.list),
                        total: res.data.totalPage
                    })
                }
                that.showChoose()
                deferred.resolve()
            } else {
                return;
            }
        })
        return deferred
    }
    this.districtFun = function(currentPage, status, id) {
        var deferred = $.Deferred()
        var jsonPage = {
            id: id,
            pageSize: 7,
            currentPage: currentPage
        };
        api.districtList(jsonPage).then(function(res) {
            var datas = res.data;
            datas.list.forEach(function(val) {
                level = val.resource_type;
            })
            if (res.meta.success == true && datas.list != '') {
                nowChooseId = id;
                if (status == true) {
                    depart.refreshData({
                        list: that.changeList(datas.list),
                        total: res.data.totalPage
                    })
                } else {
                    depart.pushData({
                        list: that.changeList(datas.list),
                        total: res.data.totalPage
                    })
                }
                that.showChoose()
                deferred.resolve()

            } else {
                return;
            }
        })
        return deferred
    }
    this.shopFun = function(currentPage, status, id) {
        var deferred = $.Deferred()
        var jsonPage = {
            id: id,
            pageSize: 7,
            currentPage: currentPage
        };
        api.shopList(jsonPage).then(function(res) {
            var datas = res.data;
            datas.list.forEach(function(val) {
                level = val.resource_type;
            })
            if (res.meta.success == true && datas.list != '') {
                if (status == true) {
                    depart.refreshData({
                        list: that.changeList(datas.list),
                        total: res.data.totalPage
                    })
                } else {
                    depart.pushData({
                        list: that.changeList(datas.list),
                        total: res.data.totalPage
                    })
                }
                that.showChoose()
                deferred.resolve()

            } else {
                return;
            }
        })
        return deferred
    }
    this.showChoose = function() {
        var i = 0;
        var j = 0;
        $.each(this.dom.find('.check-box'), function() {
            var nowId = $(this).parent().attr('nowid')
            if (idArr.lastIndexOf(',' + nowId + ',') != -1) {
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
    this.searchFun = function(status, currentPage) {
        var jsonPage = {
            geoName: keyword,
            pageSize: 7,
            currentPage: currentPage
        };
        api.searchNameList(jsonPage).then(function(res) {
            level = 10;
            var datas = res.data;
            if (datas != null) {
                if (res.meta.success == true && datas.list != '') {
                    if (status == true) {
                        depart.refreshData({
                            list: that.changeList(datas.list),
                            total: res.data.totalPage
                        })
                    } else {
                        depart.pushData({
                            list: that.changeList(datas.list),
                            total: res.data.totalPage
                        })
                    }
                    $.each(datas.list, function(val, i) {
                        var tempDom = depart.dom.find('.list-content').children('div').eq(val).find('li').eq('1')
                        tempDom.find('em').attr('type', i.resource_type)
                        if (i.resource_type == 5) {
                            tempDom.find('img').css('opacity', 0)
                        } else if (i.resource_type == 2 || i.resource_type == 1 || i.resource_type == 4 || i.resource_type == 3) {
                            tempDom.find('img').attr('src', "/images/icolist.png")
                        } else {

                        }
                    })
                    $.each(that.dom.find('.check-box'), function() {
                        var nowId = $(this).parent().attr('nowid')
                        if (that.getAreaChoose().lastIndexOf(',' + nowId + ',') != -1) {
                            $(this).addClass('choose')
                        }
                    })
                    var i = 0;
                    var j = 0
                    $.each(that.dom.find('.list-content .check-box'), function() {
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
                } else {
                    return;
                }
            } else {
                //that.dom.find('.labels span').not('.titleAll').remove()
                that.areaFun1(1, true);
                level = 1
                    //that.dom.find('.listAreas').remove()
            }
        })
    }



}
//原型链一定要有的
module.exports = department;