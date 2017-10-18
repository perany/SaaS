//这边基本上引入需要使用的资源less，api，需要使用的模块等等。
require("../less/edslider.less")
require("../less/login.less")

require('../libs/jquery.edslider.js')
var JSEncrypt = require('../libs/jsencrypt.js');

function login() {
    var _self = this
    this.complete = function() {
            _self.app.local.del('accountId', 'all')
                // _self.app.local.del('userName', 'all')
            _self.app.local.del('session', 'all')
            _self.app.local.del('userId', 'all')
            console.log(_self.app.local.get('userName'), _self.app.local.get('isRemember'))
            if (_self.app.local.get('isRemember') == "true") {
                _self.app.local.del('isRemember', 'all')
                if (_self.app.local.get('userName')) {
                    _self.dom.find('.loginName').val(base64.decode(_self.app.local.get('userName')));
                }
                _self.dom.find(".rememberName span").addClass("addUser")
            }
            // if (_self.app.local.get('userName')) {
            //     $('.loginName').val(base64.decode(_self.app.local.get('userName')));
            // }
            //写自己的代码
            var encrypt = new JSEncrypt();
            var pr = encrypt.getPrivateKeyB64()
            var pu = encrypt.getPublicKeyB64()
            this.dom.find('.footer').addClass('bgfoot');
            //console.log('heiiii', $(window).height(), self.innerHeight)
            this.dom.find('.mySlideshow').edslider({
                width: '100%',
                height: self.innerHeight
            });
            this.dom.find('#right-content').addClass('.logMar');
            this.dom.find('.btnLogin').on('click', function() {
                var usename = _self.dom.find('input[name=usename]').val()
                    //console.log(__aw__)
                var pas = _self.dom.find('input[name=password]').val()
                var password = __aw__(pas)
                if (usename != '') {
                    if (_self.isUser(usename)) {
                        if (pas != '') {
                            if (_self.ispwd(pas)) {
                                _self.dom.find('.errorSpan').addClass('hide');
                                _self.dom.find('.footer').removeClass('bgfoot');
                                _self.dom.find('#right-content').removeClass('.logMar');
                                _self.app.local.clearAll()
                                _self.api.login({ publicKey: pu, username: usename, password: password }).done(function(response) {
                                    if (String(response.meta.success) == 'false') {
                                        alert('用户名和密码错误');
                                        return
                                    }
                                    var se = encrypt.decrypt(response.data.SESSION)
                                    var encrypt1 = new JSEncrypt();
                                    encrypt1.setPublicKey(response.data.publicKey);
                                    var miw = encrypt1.encrypt(se);
                                    if (_self.dom.find(".rememberName span").hasClass("addUser")) {
                                        _self.app.local.set('isRemember', "true", 'all');
                                    } else {
                                        _self.app.local.set('isRemember', "false", 'all');
                                    }
                                    _self.app.local.set('session', miw, 'all');
                                    _self.app.local.set('accountId', response.data.accountId, 'all');
                                    _self.app.local.set('parentUserId', response.data.parentUserId, 'all');
                                    _self.app.local.set('groupId', response.data.groupId, 'all');
                                    //console.log('姓名', base64.encoder(response.data.name), response.data.userName);
                                    _self.app.local.set('userName', base64.encoder(response.data.userName), 'all');
                                    _self.app.local.set('name', base64.encoder(response.data.name), 'all');
                                    _self.app.local.set('userId', response.data.userId, 'all');
                                    $.cookie('userId', response.data.userId);
                                    $.cookie('appId', response.data.accountId);
                                    _self.app.changePage('index');
                                    _self.app.header.initHeader();
                                    _self.app.model.set('iosId', '1');
                                    //_self.app.menu.restetMenu();
                                })

                            } else {
                                _self.dom.find('.errorSpan').removeClass('hide');
                                _self.dom.find('.errorSpan em').text('请输入2-30位字母，数字或符号“@”“.”“_”，区分大小写');
                            }
                        } else {
                            _self.dom.find('.errorSpan').removeClass('hide');
                            _self.dom.find('.errorSpan em').text('密码不能为空，请输入密码');
                        }
                    } else {
                        _self.dom.find('.errorSpan').removeClass('hide');
                        _self.dom.find('.errorSpan em').text('请输入2-40位文本，字母，数字或符号，区分大小写');
                    }
                } else {
                    _self.dom.find('.errorSpan').removeClass('hide');
                    _self.dom.find('.errorSpan em').text('用户名不能为空，请输入用户名');
                }


            })
            this.dom.find('.rememberName span').click(function() {
                if ($(this).hasClass('addUser')) {
                    //console.log('有');
                    $(this).removeClass('addUser');
                } else {
                    //console.log('无');
                    // if ($.cookie('pwd') != 'null') {
                    //     $('.loginPwd').val($.cookie('pwd'));
                    // }
                    $(this).addClass('addUser');
                }
            });
            this.dom.find('.loginName,.loginPwd').focus(function() {
                _self.dom.find('.errorSpan').addClass('hide');
            });

            this.dom.find('#loginName').blur(function() {
                var name = _self.dom.find('#loginName').val().trim();
                if (name != '') {
                    if (_self.isUser(name)) {
                        _self.dom.find('.errorSpan').addClass('hide');
                    } else {
                        _self.dom.find('.errorSpan').removeClass('hide');
                        _self.dom.find('.errorSpan em').text('请输入2-40位文本，字母，数字或符号，区分大小写');
                    }
                } else {
                    _self.dom.find('.errorSpan').removeClass('hide');
                    _self.dom.find('.errorSpan em').text('用户名不能为空，请输入用户名');
                }
            });
            this.dom.find('#loginPwd').blur(function() {
                var pwds = _self.dom.find("#loginPwd").val().trim();
                if (pwds != '') {
                    if (_self.ispwd(pwds)) {
                        _self.dom.find('.errorSpan').addClass('hide');
                    } else {
                        _self.dom.find('.errorSpan').removeClass('hide');
                        _self.dom.find('.errorSpan em').text('请输入2-30位字母，数字或符号“@”“.”“_”，区分大小写');
                    }
                } else {
                    _self.dom.find('.errorSpan').removeClass('hide');
                    _self.dom.find('.errorSpan em').text('密码不能为空，请输入密码');
                }
            });

        },
        /**
         * check正则
         * @param obj
         * @returns {boolean}
         */
        this.checkNum = function(obj) {
            var reg = /^[0-9]*$/;
            obj = obj.trim();
            if (reg.test(obj)) {
                return true;
            } else {
                return false;
            }
        },
        this.isUser = function(str) {
            var reg = /^[0-9A-Za-z\-.@\u4e00-\u9fa5]{2,40}$/;
            if (reg.test(str)) {
                return true;
            } else {
                return false;
            }
        },
        //6-20个匹配中文 数字 字母 下划线
        this.ispwd = function(str) {
            var reg = /^[a-zA-Z0-9_]+$/;
            if (reg.test(str) && str.length <= 30 && str.length >= 2) {
                return true;
            } else {
                return false;
            }
        },
        //6-20个匹配中文 数字 字母 下划线
        this.isName = function(str) {
            var reg = /^[\w\u4e00-\u9fa5]+$/gi;
            var len = str.replace(/[^x00-xFF]/g, '**').length;
            if (reg.test(str) && len <= 40 && len >= 6) {
                return true;
            } else {
                return false;
            }
        }


}

module.exports = login;