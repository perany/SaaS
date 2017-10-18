require("../less/newEditUserList.less")
var department = require("../modules/superiorDepartment/superiorDepartment.js")
var region = require("../modules/region/region.js")
var users = require("../modules/users/users.js")
var okCont = require("../modules/confirm/confirm.js")

function newUserListIndex() {
    var that = this
    var depart = null
    var regin = null
    var user = null
    var searchRole = ''
    var searchGroup = ''
    var okModal = null
    var currentPageRole = 1;
    var currentPageGroup = 1;
    var type = '';
    var errorTip = {
        '1001': '用户名为空',
        '1002': '登陆名为空',
        '1003': '登陆名已存在',
        '1004': '登陆名非邮箱',
        '1006': '角色ID为空',
        '1007': '用户ID为空',
        '1008': '用户ID有误',
        '1009': '用户状态错误',
        '1010': '此用户无权限登录此系统',
        '1011': '手机号格式有误',
        '1012': '用户状态为空',
        '1013': '当前用户不存在'
    }
    var errorTip1 = {
        '1003': '邮件名已存在',
        '1004': '请输入2-40位字母，数字或符号“@”“.”“_”，区分大小写',
    }

    this.complete = function() {
            //写自己的代码
            if (that.app.model.get('listId')) {
                if (that.app.model.get('listId') == '00') {
                    $('.selectRoles .text').text('请至少添加一个角色');
                    $('.selectUsers .text').text('请至少添加一个用户组');
                    $('.UserSave ').removeClass('editSave').addClass('newSave');
                    $('.newPop .title111 span').text('新建用户');
                    that.app.header.changeTitle("权限管理<em>&nbsp;>&nbsp;新建用户</em>")
                } else {
                    $('.selectRoles .text').text('已选角色');
                    $('.selectUsers .text').text('已选用户');
                    $('.newPop .title111 span').text('编辑用户');
                    $('.UserSave ').removeClass('newSave').addClass('editSave');
                    that.app.header.changeTitle("权限管理<em>&nbsp;>&nbsp;编辑用户</em>")
                    that.editFun(that.app.model.get('listId').trim());
                }
            } else {
                that.app.changePage('userList');
            }
            this.dom.find('.statusLabel').on('click', function() {
                $('.statusLabel').removeClass('open')
                $(this).addClass('open');
            })
            that.dom.find('.UserCancle').on('click', function() {
                    okModal = that.app.modal(okCont);
                    okModal.dom.find('.oks').on('click', function() {
                        that.app.changePage('userList');
                        okModal.close();
                    })
                })
                //用户
            that.dom.find('.userName').on('blur', function() {
                var names = that.dom.find('.userName').val(),
                    id = '';
                if (names) {
                    var  regex = /^[0-9A-Za-z\-.@\u4e00-\u9fa5]{2,40}$/;
                    if ($('.title111 span').text() == "新建用户") {
                        if (!regex.test(names)) {
                            $('.errorUserName').removeClass('hide').text('请输入2-40位文本，字母，数字或符号，区分大小写')
                        } else {
                            $('.errorUserName').addClass('hide');
                            that.checkNameFun(names);
                        }
                    } else {
                        id = parseInt(that.app.model.get('listId'));
                        that.checkNameFun(names, id);
                    }
                } else {
                    $('.errorUserName').removeClass('hide').text('用户名不能为空，请输入用户名')
                }

            })

            //邮箱
            that.dom.find('.post').on('blur', function() {
                    var names = that.dom.find('.post').val()
                    if (names) {
                        if ($('.title111 span').text() == "新建用户") {
                            that.checkPostFun(names);
                        } else {
                            id =parseInt(that.app.model.get('listId'));
                            that.checkPostFun(names, id);
                        }
                    } else {
                        $('.errorPostName').addClass('hide');
                    }
                })
                //状态

            //手机号
            this.dom.find('.phoneNum').on('blur', function() {
                var phoneNum = that.dom.find('.phoneNum').val();
                if (phoneNum) {
                    var myreg = /^\d{11}$/;
                    if (!myreg.test(phoneNum)) {
                        $('.errorPhoneNum').removeClass('hide').text('请输入正确的手机号')
                    } else {
                        $('.errorPhoneNum').addClass('hide');
                    }
                }
            })

            //添加角色
            this.dom.find('.checkRolePro').on('click', function() {
                searchRole = '';
                currentPageRole = 1;
                var htmlLi = '';
                user = that.app.modal(users);
                user.event._addEvent('user.search', function(val) {
                    searchRole = val.search;
                    currentPageRole = 1;
                    type = val.type;
                    that.queryRoleList(true);
                })
                user.event._addEvent('user.changePage', function(val) {
                    searchRole = '';
                    currentPageRole = val.page;
                    type = val.type;
                    that.queryRoleList(false);
                })
                user.initHearder({ type: '角色', name: '角色名称' });
                //var type = that.dom.find('searchCont').attr('placeholder');
                that.queryRoleList(true);
                user.setId(that.getRoleChoose())
                user.dom.find('.pager-next,.pager-prev').on('click', function() {
                    var str = that.getRoleChoose()
                    htmlLi = '';
                    $('.userLists .list-content .check-box').each(function() {
                        if ($(this).hasClass('choose')) {
                            if (str.lastIndexOf(',' + $(this).parent('li').attr('nowid') + ',') == -1) {
                                htmlLi += '<li nowId="' + $(this).parent('li').attr('nowid') + '" type="' + $(this).parent('li').siblings('li').find('em').attr('type') + '">' + $(this).parent('li').parent().children().eq(1).text() + '</li>';
                            }
                        } else {
                            if (str.lastIndexOf(',' + $(this).parent('li').attr('nowid') + ',') != -1) {
                                $('.selectRoleCont').find('li[nowid=' + $(this).parent('li').attr('nowid') + ']').remove()
                            }
                        }
                        //htmlLi += '<li nowId="' + $(this).parent('li').attr('nowid') + '">' + $(this).parent('li').siblings('li').find('em').text() + '</li>';
                    })
                })
                user.dom.find('.userBtn').on('click', function() {
                    // $('.selectUserCont').empty();
                    var str = that.getRoleChoose()
                    htmlLi = '';
                    $('.userLists .list-content .check-box').each(function() {
                        if ($(this).hasClass('choose')) {
                            if (str.lastIndexOf(',' + $(this).parent('li').attr('nowid') + ',') == -1) {
                                htmlLi += '<li nowId="' + $(this).parent('li').attr('nowid') + '" type="' + $(this).parent('li').siblings('li').find('em').attr('type') + '">' + $(this).parent('li').parent().children().eq(1).text() + '</li>';
                            }
                        } else {
                            if (str.lastIndexOf(',' + $(this).parent('li').attr('nowid') + ',') != -1) {
                                $('.selectRoleCont').find('li[nowid=' + $(this).parent('li').attr('nowid') + ']').remove()
                            }
                        }
                        //htmlLi += '<li nowId="' + $(this).parent('li').attr('nowid') + '">' + $(this).parent('li').siblings('li').find('em').text() + '</li>';
                    })
                    $('.selectRoleCont').append(htmlLi).removeClass('hide');
                    $('.selectRoles .text').text('已选角色');
                    //}
                    user.close();
                })
            })

            //新增、编辑用户保存
            this.dom.find('.UserSave').on('click', function() {
                if (that.dom.find('.userName').val() != '') {
                    var userName = that.dom.find('.userName').val().trim();
                    var loginName = that.dom.find('.post').val().trim() ? that.dom.find('.post').val().trim() : '';
                    var mobile = that.dom.find('.phoneNum').val().trim();
                    if (that.dom.find('.selectRoleCont li').length > 0) {
                        $('.errorRoleCont').addClass('hide')
                        var roleIds = [];
                        $('.selectRoleCont li').each(function() {
                            roleIds.push($(this).attr('nowid'));
                        })
                        roleIds = roleIds.join(',');
                        if (that.dom.find('.errorInfo').not('.hide').length > 0) {
                            return false;
                        } else {
                            $('.errorInfo').addClass('hide');
                            if ($(this).hasClass('newSave')) {
                                that.newFun(userName, loginName, mobile, roleIds)
                            } else {
                                var teamId = that.app.model.get('listId');
                                that.editSaveFun(userName, loginName, mobile, roleIds, teamId)
                            }
                            that.app.changePage('userList')
                        }
                    } else {
                        $('.errorRoleCont').removeClass('hide').text('请至少添加一个角色!')
                    }
                } else {
                    $('.errorUserName ').removeClass('hide');
                    $('.errorUserName ').text('用户名不能为空，请输入用户名');
                }
            })
        }
        //检查用户名
    this.checkNameFun = function(names, id) {
        var jsonPage = {
            id: id,
            name: encodeURI(names)
        };
        that.api.checkName(jsonPage).then(function(res) {
            var datas = res.data;
            if (res.meta.success == false) {
                that.dom.find('.errorUserName ').removeClass('hide').text('请输入2-40位文本，字母，数字或符号，区分大小写');
            } else {
                that.dom.find('.errorUserName ').addClass('hide');
            }
        })
    };
    //检查邮箱
    this.checkPostFun = function(names, id) {
        var jsonPage = {
            id: id||'',
            loginName: names
        }
        that.api.checkLoginName(jsonPage).then(function(res) {
            if (res.meta.success == false) {
                that.dom.find('.errorPostName').removeClass('hide').text(errorTip1[res.meta.message]);
            } else {
                that.dom.find('.errorPostName').addClass('hide')
            }
        })
    }

    //获取角色
    this.queryRoleList = function(status) {
            var json = {
                search: searchRole,
                pageSize: 6,
                currentPage: currentPageRole,
                type: 2
            }
            that.api.queryUserRolePageList(json).then(function(res) {
                var newData = {};
                newData.list = [];
                if (res.meta.success == true) {
                    newData.totalPage = res.data.totalPage;
                    $.each(res.data.list, function() {
                        var nn = {
                            'userId': this.roleId,
                            'loginName': this.roleName,
                            'name': ''
                        }
                        newData.list.push(nn);
                    })
                    user.getData(newData, status)
                }
            })
        }
        //获取用户组
    this.queryUserList = function(status) {
        var json = {
            search: searchGroup,
            pageSize: 6,
            currentPage: currentPageGroup,
            type: 2
        }
        that.api.pageList(json).then(function(res) {
            var newData = {};
            newData.list = [];
            if (res.meta.success == true) {
                newData.totalPage = res.data.totalPage;
                $.each(res.data.list, function() {
                    var nn = {
                        'userId': this.groupId,
                        'loginName': this.groupName,
                        'name': ''
                    }
                    newData.list.push(nn);
                })
                user.getData(newData, status)
            }
        })
    }
    this.getRoleChoose = function() {
        var str = ','
        $.each(that.dom.find('.selectRoleCont li'), function() {
            str += $(this).attr('nowid') + ','
        })
        return str
    }
    this.getGroupChoose = function(type) {
        var str = ','
        $.each(that.dom.find('.selectGroupCont li'), function() {
            str += $(this).attr('nowid') + ','
        })
        return str
    }
    this.newFun = function(name, loginName, mobile, roleIds) {
        var status = 1;
        status = that.dom.find('.status .open').attr('data_id');
        var jsonPage = {
            name: name,
            loginName: loginName,
            mobile: mobile,
            roleIds: roleIds,
            status: status
        };
        this.api.createUser(jsonPage).then(function(res) {
            var datas = res.data;
            if (res.meta.success == true) {
                that.app.changePage('userList');
            }
        })
    }
    this.editFun = function(teamId) {
        var jsonPage = {
            id: teamId
        };
        that.api.queryUserInfo(jsonPage).then(function(res) {
            var userHtml = '';
            var datas = res.data;
            if (res.meta.success == true && datas != '') {
                /*if(datas.groupName == null){
                    datas.groupName = '---'
                }*/
                that.dom.find('.userName').val(datas.name);
                that.dom.find('.post').val(datas.loginName);
                that.dom.find('.phoneNum').val(datas.mobile);
                if (datas.roleList.length > 0) {
                    that.dom.find('.selectRoleCont').removeClass('hide');
                    that.roleShwo(datas.roleList);
                } else {
                    that.dom.find('.selectRoleCont').addClass('hide');
                }
                if (datas.groupList.length > 0) {
                    that.dom.find('.selectGroupCont').removeClass('hide');
                    that.groupShwo(datas.groupList);
                } else {
                    that.dom.find('.selectGroupCont').addClass('hide');
                }
                var sta = datas.status;
                var stas = that.dom.find('.statusLabel');
                $.each(stas, function(i) {
                    $(this).removeClass('open');
                    $(this).attr('data_id') == sta ? $(this).addClass('open') : $(this).removeClass('open');
                })
                $(datas.associatedUserList).each(function(i, val) {
                    userHtml += '<li nowid="' + val.userId + '">' + val.userName + '</li>';
                })
                $('.selectUserCont').removeClass('hide').append(userHtml);
            } else {
                return;
            }
        });
    }
    this.editSaveFun = function(name, loginName, mobile, roleIds, teamId) {
        var jsonPage = {
            name: name,
            loginName: loginName,
            mobile: mobile,
            roleIds: roleIds,
            status: this.dom.find('.divList .Info').children('.open').attr('data_id') * 1
        };
        this.api.editUser(jsonPage, teamId).then(function(res) {
            var datas = res.data;
            if (res.meta.success == true) {
                that.app.changePage('userList');
            }
        })
    };

    //循环角色
    this.roleShwo = function(val) {
        var html = '';
        $.each(val, function(idx, value) {
            html += '<li nowid="' + value.roleId + '">' + value.roleName + '</li>'
        });
        that.dom.find('.selectRoleCont').html(html);
    };
    //循环用户组
    this.groupShwo = function(val) {
        var html = '';
        $.each(val, function(idx, value) {
            html += '<li nowid="' + value.groupId + '">' + value.groupName + '</li>'
        });
        that.dom.find('.selectGroupCont').html(html);
    };
}

module.exports = newUserListIndex;