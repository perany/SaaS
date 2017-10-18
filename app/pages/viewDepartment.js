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
            text: '用户组管理',
            link: 'departmentManage'
        }, {
            text: '查看用户组'
        }]
    };
    this.complete = function() {
        // that.app.header.initBreadcrumb(breadcrumbList);
        // that.app.header.removeFixed();
        //写自己的代码
        //this.app.model(pa)
        //$('.titleName').text('权限管理>部门管理>新建部门');
        if (that.app.model.get('listId')) {
            newId = that.app.model.get('listId').trim()
            that.viewFun(newId);
        } else {
            that.app.changePage('departmentManage');
        }
        $('.edits').click(function() {
            that.app.changePage('newDepartment');
        })

    };
    this.viewFun = function(teamId) {
        var jsonPage = {
            groupId: teamId
        };
        this.api.viewList(jsonPage).then(function(res) {
            var userHtml = '';
            var datas = res.data;
            if (res.meta.success == true && datas != '') {
                if (datas.groupName == null) {
                    datas.groupName = '---'
                }
                $('.departName').text(datas.groupName);
                $('.marks').text(datas.remark);
                $(datas.associatedUserList).each(function(i, val) {
                    userHtml += '<li nowid="' + val.userId + '">' + val.userName + '</li>';
                })
                $('.selectUserCont').removeClass('hide').append(userHtml);
            }
        });
    };

}

module.exports = departmentIndex;