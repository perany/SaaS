//require("../less/roleManager.less")
var breadcrumb = require("../modules/breadcrumb/breadcrumb.js");
var department = require("../modules/department/department.js")
var searchment = require("../modules/search/search.js")
var modal = require("../modules/modaldemo/modaldemo.js")
var deleteCont = require("../modules/delete/delete.js")

function index() {
    var that = this
    var depart = null
    var search = null
    var deleteIds = '';
    var depeartStatus = true;
    var deletaMode = '';
    var currentPage = 1;
    var arr = [];
    var allPage = 1;
    var keyword = '';
    var action = {
        view: { dis: 'none', link: 'viewRoleManager' },
        edit: { dis: 'none', link: 'newEditRoleManager' },
        delete: { dis: 'none', link: 'del' }
    };
    var breadcrumbList = {
        list: [{
            text: '权限管理',
        }, {
            text: '角色管理',
        }]
    };
    this.newDates = function(nS) {
        var time = new Date(nS);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y + '-' + that.add0(m) + '-' + that.add0(d) + ' ' + that.add0(h) + ':' + that.add0(mm) + ':' + that.add0(s);
    };

    this.add0 = function(m) {
        return m < 10 ? '0' + m : m
    };
    this.getModelId = function() {
        if (that.app.model.get('moduleId')) {
            that.api.queryActionList({
                appId: that.app._adapss,
                'userId': that.app.local.get('userId'),
                "moduleId": that.app.model.get('moduleId')
            }).done(function(value) {
                if (value.meta.success) {
                    nowAction = value.data.list
                    that.nowShowHide(value.data.list)
                } else {
                    //alert('数据不完整')
                }

            })
        } else {
            setTimeout(that.getModelId, 500)
                // this.app.changePage('departmentManage')

        }
    }
    this.nowShowHide = function(value) {
        for (var i = 0; i < value.length; i++) {
            var code = value[i].code
            if (code.lastIndexOf('view') != -1) {
                action.view = { dis: 'inline-block', link: 'viewRoleManager' }
            }
            if (code.lastIndexOf('add') != -1) {
                that.dom.find('.newshop').removeClass('hide')
            }
            if (code.lastIndexOf('edit') != -1) {
                action.edit = { dis: 'inline-block', link: 'newEditRoleManager' }
            }
            if (code.lastIndexOf('delete') != -1) {
                action.delete = { dis: 'inline-block', link: 'del' }
                that.dom.find('.deleteBtn').removeClass('hide')
            }
        }
        that.listFun(depart.getNowPage(), true);
    }

    this.complete = function() {
        // that.app.header.initBreadcrumb(breadcrumbList);
        // that.app.header.removeFixed();
        depart = this.app.loadModule(department, this.dom.find('.now .departList'), {
            icon: [{
                    name: '角色名称',
                    type: 'choose',
                    format: function(value) {
                        return '<em>' + value + '</em>';

                    }
                },
                { name: '操作', type: 'action' },
                {
                    name: '创建时间',
                    type: 'txt',
                    format: function(value) {
                        return value
                    }
                }, {
                    name: '更新时间',
                    type: 'txt',
                    format: function(value) {
                        return value
                    }
                }
            ],
            jg: [, 300, 250, 250],
            chose: true
        })
        this.getModelId();
        search = this.app.loadModule(searchment, this.dom.find('.search'))
        this.dom.find('.searchCont').attr('placeholder', '请输入角色名称')
        this.app.header.event._addEvent('header.click', function(value) {
            that.listFun(1, true);
        })
        search.event._addEvent('search.click', function(value) {
            var a = that.app.header.dom.find('.titleName span').remove()
            keyword = that.dom.find('.searchCont').val();
            /*if(keyword == ''){
                that.dom.find('.departList').removeClass('hide');
                that.dom.find('.dataNone').addClass('hide');
            }else {
                that.dom.find('.dataNone').removeClass('hide');
                that.dom.find('.departList').addClass('hide');

            }*/
            that.listFun(1, true);
            if (that.dom.find('.deleteBtn').hasClass('addDelete')) {
                that.dom.find('.deleteBtn').removeClass('addDelete')
            }
        })

        depart.event._addEvent('department.listClick', function(value) {
            var Dname = value.name
            var Did = value.id
            if (arr.indexOf(Dname) != -1) {
                that.listFun(depart.getNowPage(), true).done(function() {

                });
            }

        })
        depart.event._addEvent('department.changePage', function(value) {
            that.listFun(depart.getNowPage(), false);
            if (that.dom.find('.deleteBtn').hasClass('addDelete')) {
                that.dom.find('.deleteBtn').removeClass('addDelete')
            }
            that.dom.find('.departList').removeClass('hide');
        })
        this.dom.find('.contTitle .btn').on('click', function() {
            if ($(this).hasClass('newshop')) {
                that.app.model.set('listId', '00')
                that.app.changePage('newEditRoleManager');

            }
        })
        $(document).on('click', '.check-box', function() {
            if (that.dom.find('.list-content .choose').length > 0) {
                that.dom.find('.deleteBtn').addClass('addDelete');
            } else {
                that.dom.find('.deleteBtn').removeClass('addDelete');
            }
        })
        this.dom.find('.deleteBtn').on('click', function() {

            if (!$(this).hasClass('addDelete')) {
                return
            }
            var ids = [];
            that.dom.find('.list-content .choose').each(function() {
                ids.push($(this).parent('li').attr('nowid'))
            })
            deleteIds = ids.join(',');
            that.showDel()
        })
        this.dom.find('.pager-prev,.pager-next').on('click', function() {
            that.dom.find('.list-header .check-box').removeClass('choose');
            // that.listFun(depart.getNowPage(), false);
        })

        depart.event._addEvent('department.delete', function(value) {
            deleteIds = value.trim();
            that.showDel();

        })
        this.dom.find('.modal-close,.cancleBtn').on('click', function() {
            that.dom.find('.deleteBtn').addClass('addDelete');
            that.close()
        })
    }
    this.showDel = function() {
        deletaMode = this.app.modal(deleteCont, {
            delfun: function() {
                that.deleteFun(deleteIds);
                that.dom.find('.deleteBtn').removeClass('addDelete');
            },
            content: '确定要删除所选的角色吗？',
            title: '删除'
        });
    }
    this.changeList = function(valueList) {
        var newList = [];
        $(valueList).each(function(i, val) {
            newList.push({ 'id': val.roleId, 'name': val.roleName, 'act': action, time1: that.newDates(val.createdTime), time2: that.newDates(val.lastChanged) });
        })
        return newList;
    };
    this.listFun = function(currentPage, status) {
        that.dom.find('.departList').addClass('hide');
        that.dom.find('.roleManager_load').removeClass('hide');
        that.dom.find('.roledataNone').addClass('hide');
        var newDef = $.Deferred()
        jsonPage = {
            pageSize: 10,
            currentPage: currentPage,
            type: 2,
            search: keyword
        }
        this.api.pageList(jsonPage).then(function(res) {
            that.app.loading.show();
            that.dom.find('.roleManager_load').addClass('hide');
            var datas = res.data;
            allPage = datas.totalPage;
            if (res.meta.success == true) {
                that.app.loading.hide();
                if (status == true) {
                    if (datas.list.length == 0) {
                        that.dom.find('.dataNone').removeClass('hide');
                        that.dom.find('.departList').addClass('hide');

                    } else {
                        that.dom.find('.departList').removeClass('hide');
                        that.dom.find('.dataNone').addClass('hide');
                        // depart.refreshData({
                        //     list: that.changeList(datas.list),
                        //     total: res.data.totalPage
                        // })
                        depart.setData(that.changeList(datas.list));
                        depart.getTotal(res.data.totalPage)
                    }
                } else {
                    depart.pushData({
                        list: that.changeList(datas.list),
                        total: res.data.totalPage
                    })

                }
                newDef.resolve()
            } else {
                that.dom.find('.pager-next').addClass('disable');
            }
        });
        return newDef
    }
    this.deleteFun = function(cont) {
        this.api.deleteRole(cont).then(function(res) {
            that.app.loading.show();
            if (res.meta.success == true) {
                that.app.loading.hide();
                that.listFun(depart.getNowPage(), true);
            } else if (res.meta.message == "4006") {
                that.app.loading.hide();
                that.app.alert.show({
                    title: '删除角色',
                    template: '<p style="text-align: left;width: 210px; margin: 0 auto;line-height: 24px;">该角色已绑定用户，不可被删除，<br/>需移除用户后，可删除该角色。</p>',
                    close: false,
                    msg: '<p style="text-align: left;width: 210px; margin: 0 auto;line-height: 24px;">该角色已绑定用户，不可被删除，<br/>需移除用户后，可删除该角色。</p>'
                })
                that.app.alert.dom.find('.btn-confirm').text('关闭');
            }
        })
    }

}





module.exports = index;