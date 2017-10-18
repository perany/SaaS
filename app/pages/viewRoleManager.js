require("../less/viewRoleManager.less")
require("../less/newEditRoleManager.less")
var breadcrumb = require("../modules/breadcrumb/breadcrumb.js");

function Index() {
    var that = this
    var depart = null
    var search = null
    var newId = '';
    var appId = '';
    var roleId = '';
    var roleName = '';
    var setting = {
        data: {
            simpleData: {
                enable: true
            }
        }
    };
    var uId = '';
    var breadcrumbList = {
        list: [{
            text: '权限管理',
        }, {
            text: '角色管理',
            link: 'roleManager'
        }, {
            text: '查看角色'
        }]
    };
    this.complete = function() {

        // that.app.header.initBreadcrumb(breadcrumbList);
        // that.app.header.removeFixed();
        //写自己的代码
        if (that.app.model.get('listId')) {
            roleId = that.app.model.get('listId').trim()
        } else {
            that.app.changePage('roleManager');
        }
        that.queryRoleInfoFun();
        that.appListFun();
        that.queryModuleListFun();
        //that.eventFun();
        //that.isroleId();
        $('.viewBtnEdit').click(function() {
            that.app.changePage('newEditRoleManager');
        })
    };

    this.queryRoleInfoFun = function() {

        var json = {
            roleId: roleId,
        }
        that.api.queryRoleInfo(json).then(function(res) {
            if (res.meta.success == true) {
                var html = "";
                $(".count").text(res.data.roleName);
                $(".name").text(res.data.remark);
                $(res.data.associatedUserList).each(function(i, val) {
                    that.dom.find('.count').val(res.data.roleName);
                    html += '<span userId=' + val.userId + '>' + val.userName + '</span>'
                })
                $(".users").append(html);
            }
        })
    };
    this.appListFun = function() {
        that.api.appList().then(function(res) {
            var html = '';

            if (res.meta.success == true) {
                //that.dom.find('.appList').empty();
                if (res.data.list.length > 0) {
                    $(res.data.list).each(function(i, val) {
                        html += '<li app_id="' + val.appId + '">' + val.appName + '</li>';

                        // that.queryModuleListFun(val.appId)
                    });
                    //console.log(appId);
                    that.dom.find(".appList").append(html);
                    that.dom.find('.appList li').eq(0).addClass('selected');
                    appId = $('.appList li').eq(0).attr('app_id');
                    that.queryModuleListFun(appId, roleId);
                }

            }
        })
    };

    this.queryModuleListFun = function(id) {
        //console.log('iddd', id, roleId)
        var jsonPage = {
            appId: id,
            roleId: roleId
        };
        that.api.queryModuleList(jsonPage).then(function(res) {
            var html = '';
            /* if (res.meta.success == true){
                 
                 $(res.data.list).each(function(i, val) {
                     html += '<li app_id="' + val.appId + '">' + val.appName + '</li>';
                     //appId = val.appId;
                 });
                 that.dom.find(".appList1").append(html);
             }*/
            if (res.meta.success == true) {
                $('#treeDemo').empty();
                if (res.data.list == '') {
                    html = '<li>暂无权限！</li>';
                    $('#treeDemo').append(html);
                } else {
                    var zTrees = $.fn.zTree.init($("#treeDemo"), setting, res.data.list);
                    zTrees.expandAll(true);
                }

            } else {
                $('#treeDemo').empty();
                html = '<li>暂无权限！</li>';
                $('#treeDemo').append(html);
            }
            that.dom.find('.action_ck').addClass('hide');
        })
    };
}

module.exports = Index;