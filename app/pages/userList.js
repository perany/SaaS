require("../less/userList.less")
var department = require("../modules/department/department.js")
var searchment = require("../modules/search/search.js")
var modal = require("../modules/modaldemo/modaldemo.js")
var deleteCont = require("../modules/delete/delete.js")
var breadcrumb = require("../modules/breadcrumb/breadcrumb.js");
require("../less/userList.less")
var deleteCont = require("../modules/delete/delete.js")

function userList() {
    var that = this
    var depart = null
    var search = null;
    var deleteIds = '';
    var depeartStatus = true;
    var deletaMode = '';
    var currentPage = 1;
    var arr = [];
    var allPage = 1;
    var keyword = '';
    var action = {
        view: { dis: 'none', link: 'viewUserList' },
        edit: { dis: 'none', link: 'newEditUserList' },
        delete: { dis: 'none', link: 'del' }
    };
    var breadcrumbList = {
        list: [{
            text: '权限管理',
        }, {
            text: '用户管理',
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
        //console.log(that.app.model.get('moduleId'))
        if (that.app.model.get('moduleId')) {
            that.api.queryActionList({
                appId: that.app._adapss,
                'userId': that.app.local.get('userId'),
                "moduleId": that.app.model.get('moduleId')
            }).done(function(value) {
                //console.log(value)
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
                action.view = { dis: 'inline-block', link: 'viewUserList' }
            }
            if (code.lastIndexOf('add') != -1) {
                that.dom.find('.newshop').removeClass('hide')
            }
            if (code.lastIndexOf('edit') != -1) {
                action.edit = { dis: 'inline-block', link: 'newEditUserList' }
            }
            if (code.lastIndexOf('delete') != -1) {
                action.delete = { dis: 'inline-block', link: 'del' }
                that.dom.find('.deleteBtn').removeClass('hide')
            }
        }
        that.listFun(depart.getNowPage(), true);
    }
    this.complete = function() {
        // console.log(that.app,that.app.header,that.app.model.get('moduleId'), '8888888');
        // that.app.header.initBreadrumb(breadcrumbList);
        //
        depart = this.app.loadModule(department, this.dom.find('.now .departList'), {
            icon: [{
                    name: '邮箱',
                    type: 'txt',
                    format: function(value) {
                        return value;
                    }
                },
                {
                    name: '用户名',
                    type: 'txt',
                    format: function(value) {
                        return value;
                    }
                },
                {
                    name: '所属角色',
                    type: 'txt',
                    format: function(value) {
                        return value;
                    }
                },
                {
                    name: '状态',
                    type: 'txt',
                    format: function(value) {
                        return value;
                    }
                },
                { name: '操作', type: 'action' },
                {
                    name: '更新时间',
                    type: 'txt',
                    format: function(value) {
                        return value
                    }
                }
            ],
            jg: [150, 124, 170, 150, 100, 150, ],
            chose: true
        })

        this.getModelId();


        search = this.app.loadModule(searchment, this.dom.find('.search'))
        this.dom.find('.searchCont').attr('placeholder', '请输入账号或姓名')
        this.app.header.event._addEvent('header.click', function(value) {
            that.listFun(1, true);
        })
        search.event._addEvent('search.click', function(value) {
            var a = that.app.header.dom.find('.titleName span').remove()
            keyword = that.dom.find('.searchCont').val();
            that.listFun(1, true);
        })
        depart.event._addEvent('department.listClick', function(value) {
            var Dname = value.name
            var Did = value.id
                //console.log('val', Did)
                //console.log('Dname', Dname)
            if (arr.indexOf(Dname) != -1) {
                that.listFun(depart.getNowPage(), true).done(function() {});
            }
            //console.log('rs', res.data.list)
        })
        depart.event._addEvent('department.changePage', function(value) {
            //console.log('aaa', that.dom.find('.searchCont').val());
            that.listFun(depart.getNowPage(), false);
            that.dom.find('.departList').removeClass('hide');
            if (that.dom.find('.deleteBtn').hasClass('addDelete')) {
                that.dom.find('.deleteBtn').removeClass('addDelete')
            }
        })
        this.dom.find('.contTitle .btn').on('click', function() {
            if ($(this).hasClass('newshop')) {
                that.app.model.set('listId', '00')
                that.app.changePage('newEditUserList');
                //that.app.modal(modal)
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
            // console.log($(this).attr('class'))
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
            })
            //单个多个删除事件
        depart.event._addEvent('department.delete', function(value) {
            deleteIds = value.trim();
            that.showDel()
        })
        this.dom.find('.modal-close,.cancleBtn').on('click', function() {
            that.close()
        })
    }


    this.showDel = function() {
        deletaMode = this.app.modal(deleteCont, {
            delfun: function() {
                that.deleteFun(deleteIds);
            },
            content: '确定要删除所选的用户吗？'
        });
    }
    this.changeList = function(valueList) {
        //console.log('valueList', valueList);
        var newList = [];
        $(valueList).each(function(i, val) {
            newList.push({ 'id': val.id, 'loginName': val.loginName, 'name': val.name, 'roleNames': val.roleNames, 'status': val.status == 1 ? '开启' : '禁用', 'act': action, time: that.newDates(val.lastChanged) });
        })
        return newList;
    };
    this.listFun = function(currentPage, status) {
        that.dom.find('.departList').addClass('hide');
        that.dom.find('.userList_load').removeClass('hide');
        that.dom.find('.userdataNone').addClass('hide');
        var newDef = $.Deferred()
        jsonPage = {
            pageSize: 10,
            currentPage: currentPage,
            sort: 'lastChanged',
            order: 'DESC',
            type: 2,
            search: keyword,
            status: ''
        }
        this.api.listUser(jsonPage).then(function(res) {
            that.app.loading.show();
            that.dom.find('.userList_load').addClass('hide');
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
                that.dom.find('.deleteBtn').removeClass('addDelete')
            } else {
                that.dom.find('.pager-next').addClass('disable');
            }
        });
        return newDef
    }
    this.deleteFun = function(cont) {
        this.api.deleteList(cont).then(function(res) {
            that.app.loading.show();
            if (res.meta.success == true) {
                that.app.loading.hide();
                that.listFun(depart.getNowPage(), true);
            }
        })
    }

}

module.exports = userList;