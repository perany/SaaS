require("../less/viewDepartment.less")
var breadcrumb = require("../modules/breadcrumb/breadcrumb.js");

function departmentIndex() {
    var that = this
    var depart = null
    var search = null
    var newId = '';
    var breadcrumbList = {
        list: [{
            text: '权限管理',
        }, {
            text: '用户管理',
            link: 'userList'
        }, {
            text: '查看用户'
        }]
    };
    this.complete = function() {
        // that.app.header.initBreadcrumb(breadcrumbList);
        // that.app.header.removeFixed();
        //写自己的代码
        if (that.app.model.get('listId')) {
            newId = that.app.model.get('listId').trim()
            that.queryUserInfoFun(newId);
        } else {
            that.app.changePage('userList');
        }
        $('.editBtn').click(function() {
            that.app.changePage('newEditUserList');
        })

    };
    this.queryUserInfoFun = function(teamId) {
        var jsonPage = {
            id: teamId
        };
        this.api.queryUserInfo(jsonPage).then(function(res) {
            var userHtml = '';
            var datas = res.data;
            if (res.meta.success == true && datas != '') {
                if (datas.loginName == null) {
                    datas.loginName = '---'
                }
                that.dom.find('.count').text(datas.loginName);
                that.dom.find('.name').text(datas.name);
                that.dom.find('.phone').text(datas.mobile);
                var status = '';
                if (datas.status == 1) {
                    status = '开启'
                } else {
                    status = '关闭'
                }
                that.dom.find('.status').text(status);
                if (datas.roleList.length > 0) {
                    var html = '<ul>';
                    $.each(datas.roleList, function(idx, val) {
                        html += '<li role_id=' + val.roleId + '>' + val.roleName + '</li>'
                    })
                    html += '</ul>'
                    that.dom.find('.role p').html(html);
                }
                if (datas.groupList.length > 0) {
                    var html = '<ul>';
                    $.each(datas.groupList, function(idx, val) {
                        html += '<li role_id=' + val.groupId + '>' + val.groupName + '</li>'
                    })
                    html += '</ul>'
                    that.dom.find('.userGroup p').html(html);
                }
            }
        });
    };

}

module.exports = departmentIndex;