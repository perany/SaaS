require("../less/newEditRoleManager.less");

var department = require("../modules/superiorDepartment/superiorDepartment.js")
var region = require("../modules/region/region.js")
var users = require("../modules/users/users.js")
var okCont = require("../modules/confirm/confirm.js")
var app = require('../app.js');
var alertModal = require("../modules/alert/alert.js");

function index() {
    var that = this;
    var code;
    var depart = null;
    var regin = null;
    var user = null;
    var search = null;
    var sort = null;
    var order = null;
    var okModal = null;
    var appId = '';
    var uId = '';
    var userIds = [];
    var newEnable = true;
    var currentPage = 1;
    var searchTitle = '';
    var yaArr = [];
    var breadcrumbList = {
        list: [{
            text: '权限管理',
        }, {
            text: '角色管理',
            link: 'roleManager'
        }, {
            text: ''
        }]
    };
    var setting = {
        check: {
            enable: true
        },
        data: {
            simpleData: {
                enable: true
            }
        }
    };
    this.complete = function() {
        that.appListFun();

        this.dom.find('.statusLabel').on('click', function() {
            $('.statusLabel').removeClass('open')
            $(this).addClass('open');
        })
        that.dom.find('.UserCancle').on('click', function() {
            okModal = that.app.modal(okCont);
            okModal.dom.find('.oks').on('click', function() {
                that.app.changePage('roleManager');
                okModal.close();
            })
        });
        that.dom.find('.allChecks').click(function() {
            if ($(this).hasClass('checked')) {
                $(this).removeClass('checked');
                that.dom.find('.chk').removeClass('checkbox_true_full').addClass('checkbox_false_full');
            } else {
                $(this).addClass('checked');
                that.dom.find('.chk').addClass('checkbox_true_full').removeClass('checkbox_false_full');
            }

        });
        that.dom.find('.name').on('blur', function() {
            var names = $('.name').val(),
                id = '';
            if (names) {
                var  regex = /^[0-9A-Za-z\-.@\u4e00-\u9fa5]{2,40}$/;
                $('.errorName').addClass('hide')
                if ($('.title1111 span').text() == "新建角色") {
                    if (!regex.test(names)) {
                        $('.errorName').removeClass('hide').text('请输入2-40位文本，字母，数字或符号，区分大小写')
                    } else {
                        $('.errorName').addClass('hide');
                        that.checkNameFun(names);
                    }
                } else {
                    //id = $('.prePart span').attr('data_id') ? $('.prePart span').attr('data_id') : '';
                    id = that.app.model.get('listId');
                    that.checkNameFun(names, id);
                }
            } else {
                $('.errorName').removeClass('hide').text('角色名称不能为空')
            }

        })
        this.dom.find('.checkNamePro').on('click', function() {
            var htmlLi = '';
            user = that.app.modal(users);
            user.event._addEvent('user.search', function(val) {
                search = val.search;
                sort = 'lastChanged';
                order = 'DESC';
                currentPage = 1;
                that.queryUserListFun(true);
            })
            user.event._addEvent('user.changePage', function(val) {
                search = '';
                currentPage = val.page;
                type = val.type;
                that.queryUserListFun(false);
            })
            user.initHearder({ type: '用户' });
            that.queryUserListFun(true);
            user.setId(that.getUserChoose())
            user.dom.find('.pager-next,.pager-prev').on('click', function() {
                var str = that.getUserChoose();
                console.log('翻页', str);
                htmlLi = '';
                $('.userLists .list-content .check-box').each(function() {
                    if ($(this).hasClass('choose')) {
                        if (str.lastIndexOf(',' + $(this).parent('li').attr('nowid') + ',') == -1) {
                            //userArr.push({ id: $(this).parent('li').attr('nowid'), name: $(this).parent('li').parent().children().eq(2).text() })
                            htmlLi += '<li nowId="' + $(this).parent('li').attr('nowid') + '" type="' + $(this).parent('li').siblings('li').find('em').attr('type') + '">' + $(this).parent('li').parent().children().eq(2).text() + '</li>';
                        }
                    } else {
                        if (str.lastIndexOf(',' + $(this).parent('li').attr('nowid') + ',') != -1) {
                            $('.selectUserCont').find('li[nowid=' + $(this).parent('li').attr('nowid') + ']').remove()
                        }
                    }
                })
            })
            user.dom.find('.userBtn').on('click', function() {
                var str = that.getUserChoose()
                htmlLi = '';
                $('.userLists .list-content .check-box').each(function() {
                    if ($(this).hasClass('choose')) {
                        if (str.lastIndexOf(',' + $(this).parent('li').attr('nowid') + ',') == -1) {
                            htmlLi += '<li nowId="' + $(this).parent('li').attr('nowid') + '" type="' + $(this).parent('li').siblings('li').find('em').attr('type') + '">' + $(this).parent('li').parent().children().eq(2).text() + '</li>';
                        }
                    } else {
                        if (str.lastIndexOf(',' + $(this).parent('li').attr('nowid') + ',') != -1) {
                            $('.selectUserCont').find('li[nowid=' + $(this).parent('li').attr('nowid') + ']').remove()
                        }
                    }
                });
                $('.selectUserCont').append(htmlLi).removeClass('hide');
                $('.selectUsers .text').text('已选用户');
                user.close();
            })
        })
        this.dom.find('.UserSave').on('click', function() {
            marks = that.dom.find('.textAreas').val();
            uId = that.app.model.get('listId').trim();
            if (that.dom.find('.name').val() != '') {
                that.dom.find('.errorUser').addClass('hide');
                var userId = [];
                that.dom.find('.selectUserCont li').each(function() {
                    userId.push($(this).attr('nowid'));
                })
                userId = userId.join(',');
                that.savePower();
                if (that.dom.find('.errorInfo').not('.hide').length > 0) {
                    return false;
                } else {
                    if (yaArr.length > 0) {
                        if (newEnable == true) {
                            if ($(this).hasClass('newSave')) {
                                that.newFun(that.dom.find('.name').val().trim(), userId, that.savePower(), marks);
                            } else if ($(this).hasClass('editSave')) {
                                that.editSaveFun(uId, that.dom.find('.name').val().trim(), userId, that.savePower(), marks);
                            }
                        }
                    } else {
                        that.showDel();
                    }
                }
            } else {
                $('.errorName ').removeClass('hide');
                $('.errorName ').text('角色名称不能为空!');
            }
        });
        // this.dom.find('.action_ck').on('click', function() {
        //     console.log('点击111');
        //     if ($(this).hasClass('checkbox_false_full')) {
        //         $(this).removeClass('checkbox_false_full').addClass('checkbox_true_full')
        //     } else {
        //         $(this).removeClass('checkbox_true_full').addClass('checkbox_false_full')
        //     }
        // })
    }
    this.checkNameFun = function(teamName, teamId) {
        var jsonPage = {
            roleName: teamName,
            roleId: teamId
        };
        that.api.checkRoleName(jsonPage).then(function(res) {
            var datas = res.data;
            if (res.meta.success != true) {
                $('.errorName ').removeClass('hide').text('角色名称重复')
            }
        })
    }
    this.getUserChoose = function() {
        var str = ','
        $.each($('.selectUserCont li'), function() {
            str += $(this).attr('nowid') + ','
        })
        return str
    }
    this.newFun = function(roleName, userIds, moduleArr, remark) {
        var jsonPage = {
            roleName: roleName,
            userIds: userIds,
            moduleArrayStr: moduleArr,
            remark: remark,
            type: 2
        };
        that.api.addRole(jsonPage).then(function(res) {
            var datas = res.data;
            if (res.meta.success == true) {
                newEnable = false;
                that.app.changePage('roleManager');
            }
        })
    }
    this.editFun = function(teamId) {
        var jsonPage = {
            roleId: teamId
        };
        that.api.queryRoleInfo(jsonPage).then(function(res) {
            var userHtml = '';
            var datas = res.data;
            if (res.meta.success == true && datas != '') {
                if (datas.roleName == null) {
                    datas.roleName = '---'
                }
                that.dom.find('.name').val(datas.roleName);
                that.dom.find('.textAreas').val(datas.remark);
                $(datas.associatedUserList).each(function(i, val) {
                    userHtml += '<li nowid="' + val.userId + '">' + val.userName + '</li>';
                })
                that.dom.find('.selectUserCont').removeClass('hide').append(userHtml);
                that.addNodeEdit(appId, teamId);
            } else {
                return;
            }
        })
    };
    this.editSaveFun = function(roleId, roleName, userIds, moduleArrayStr, remark) {
        var jsonPage = {
            roleId: roleId,
            roleName: roleName,
            userIds: userIds,
            moduleArrayStr: moduleArrayStr,
            remark: remark,
        };
        that.api.editRole(jsonPage).then(function(res) {
            if (res.meta.message == 'ok') {
                newEnable = false;
                that.app.changePage('roleManager');
            }
        })
    }
    this.appListFun = function() {
        that.api.appList().then(function(res) {
            var html = '';
            var htmlCont = '';
            if (res.meta.success == true) {
                that.dom.find('.appList').empty();
                $(res.data.list).each(function(i, val) {
                    html += '<li app_id="' + val.appId + '">' + val.appName + '</li>';
                    htmlCont += '<ul class="powerList ztree" id="treeDemo' + val.appId + '">' +
                        '</ul>';
                    appId = val.appId;
                });
                that.dom.find(".appList").append(html);
                that.dom.find('.uls').append(htmlCont);
                that.dom.find('.appList li').eq(0).addClass('selected');
                if (that.app.model.get('listId')) {
                    if (that.app.model.get('listId') == '00') {
                        $('.selectUsers .text').text('请选择用户');
                        $('.UserSave ').removeClass('editSave').addClass('newSave');
                        $('.newPop .title1111 span').text('新建角色');
                        that.app.header.changeTitle("权限管理<em>&nbsp;>&nbsp;新建角色</em>")
                        $('.newPop .title2 span').text('权限');
                    } else {
                        $('.selectUsers .text').text('已选用户');
                        $('.newPop .title1111 span').text('编辑角色');
                        $('.UserSave ').removeClass('newSave').addClass('editSave');
                        that.editFun(that.app.model.get('listId').trim());
                        that.app.header.changeTitle("权限管理<em>&nbsp;>&nbsp;编辑角色</em>")
                    }
                } else {
                    that.app.changePage('roleManager');
                }
                that.appNode(appId, uId);
            }
        })
    };
    //树
    this.appNode = function(appId, uId) {
        var json = {
            appId: appId,
            roleId: uId,
            type: 2
        };
        that.api.queryModuleList(json).then(function(res) {
            if (res.meta.success == true) {
                var objNode = that.dom.find('#treeDemo' + that.dom.find('.appList .selected').attr('app_id') + ''),
                    nodeId = 'treeDemo' + that.dom.find('.appList .selected').attr('app_id');
                objNode.empty();
                if (res.data.list.length == 0 || undefined) {
                    html = '<li>暂无数据权限！</li>';
                    objNode.append(html).removeClass('hide');

                } else {
                    var zTreeOpen = $.fn.zTree.init(objNode, setting, res.data.list);
                    zTreeOpen.expandAll(true);
                    that.dom.find('.checkbox_true_full').parents('li').children('.chk').addClass('checkbox_true_full').removeClass('checkbox_false_full');
                    that.setCheck(nodeId);
                    that.dom.find("#py").bind("change", that.setCheck);
                    that.dom.find("#sy").bind("change", that.setCheck);
                    that.dom.find("#pn").bind("change", that.setCheck);
                    that.dom.find("#sn").bind("change", that.setCheck);
                }
                $(document).off('click', '.action_ck');
                $(document).on('click', '.action_ck', function() {
                    if ($(this).hasClass('checkbox_false_full')) {
                        $(this).removeClass('checkbox_false_full').addClass('checkbox_true_full');
                        $(this).parents('ol').siblings().eq(1).removeClass('checkbox_false_full').addClass('checkbox_true_full');
                    } else {
                        $(this).removeClass('checkbox_true_full').addClass('checkbox_false_full');
                    }
                });
            }
            return appId;
        })
    }
    this.setCheck = function(num) {
        var zTree = $.fn.zTree.getZTreeObj(num),
            py = that.dom.find("#py").attr("checked") ? "p" : "",
            sy = that.dom.find("#sy").attr("checked") ? "s" : "",
            pn = that.dom.find("#pn").attr("checked") ? "p" : "",
            sn = that.dom.find("#sn").attr("checked") ? "s" : "",
            type = { "Y": "p", "N": "s" };
        zTree.setting.check.chkboxType = type;
        that.showCode('setting.check.chkboxType = { "Y" : "' + type.Y + '", "N" : "' + type.N + '" };');
    };
    this.showCode = function(str) {
        if (!code) code = that.dom.find("#code");
        code.empty();
        code.append("<li>" + str + "</li>");
    };
    //编辑树
    this.addNodeEdit = function(appId, uId) {
        var json = {
            appId: appId,
            roleId: uId,
            type: 2
        };
        that.api.queryAssociatedModuleList(json).then(function(res) {
            if (res.meta.success == true) {
                var objNode = that.dom.find('#treeDemo' + that.dom.find('.appList .selected').attr('app_id') + ''),
                    nodeId = 'treeDemo' + that.dom.find('.appList .selected').attr('app_id');
                that.dom.find('.powerRole').text(res.data.roleName);
                objNode.empty();
                if (res.data.associatedModuleList.length == 0 || undefined) {
                    html = '<li>暂无数据权限！</li>';
                    objNode.append(html).removeClass('hide');
                } else {
                    var zTreeOpen = $.fn.zTree.init(objNode, setting, res.data.associatedModuleList);
                    zTreeOpen.expandAll(true);
                    that.dom.find('.checkbox_true_full').parents('li').children('.chk').addClass('checkbox_true_full').removeClass('checkbox_false_full');
                    that.setCheck(nodeId);
                    $("#py").bind("change", that.setCheck);
                    $("#sy").bind("change", that.setCheck);
                    $("#pn").bind("change", that.setCheck);
                    $("#sn").bind("change", that.setCheck);
                    that.setAll()
                }
            }
        })
    }
    this.setAll = function() {
        if (this.dom.find('.checkbox_true_full').length == this.dom.find('.chk').length) {
            this.dom.find('.allChecks').addClass('checked')
        } else {
            this.dom.find('.allChecks').removeClass('checked')
        }
    }
    this.savePower = function() {
        var lists = [];
        actionIds = [];
        moduleIds = [];
        that.dom.find('.uls .ztree').each(function(i, vals) {
            i = i + 1;
            if ($(this).find('.checkbox_true_full').length > 0) {
                $('.checkbox_true_full').each(function(j, val) {

                    if ($(this).parent('li').find('.checkbox_true_full').length == 1) {
                        if ($(this).parents('ol').length > 0) {
                            actionIds.push($(this).parent('li').attr('id'));
                        } else {
                            moduleIds.push($(this).parent('li').attr('data_id'));
                        }
                    }
                });
                lists.push({
                    'appId': $('.appList .selected').attr('app_id'),
                    moduleIds: moduleIds.join(','),
                    actionIds: actionIds.join(',')
                })
            }
        });
        yaArr = lists;
        lists = {
            list: lists
        };
        return JSON.stringify(lists);
    }
    this.queryUserListFun = function(status) {
        //console.log('hhhhhhhhhh', currentPage, sort, order, search);
        var jsonPage = {
            pageSize: 6,
            currentPage: currentPage,
            sort: sort,
            order: order,
            search: search,
            status: ''
        };
        that.api.queryUserList(jsonPage).then(function(res) {
            if (res.meta.success == true) {
                user.getData(res.data, status, '请输入用户名称')
            }
        })
    }
    this.showDel = function() {
        deletaMode = this.app.modal(alertModal, {
            content: '创建新角色时,角色权限不能为空！',
            title: '权限'
        });
    }

}
module.exports = index;