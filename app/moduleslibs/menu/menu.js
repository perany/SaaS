require("./menu.less")
var html = require("./tpl.html")
var quanx = false



function menu() {
    this.html = html
    var that = this;
    var jr = false
    this.complete = function() {

    }
    this.getQuan = function(a) {
        var userId = that.app.local.get('userId')
        $.ajax({
            url: '/fas/module/queryUserModuleList',
            type: "GET",
            dataType: 'json',
            data: that.app.format({ appId: that.app._adapss, 'userId': userId }),
            success: function(response) {
                if (response.meta.success && (response.data.list != '')) {
                    that.controlMenu(response.data.list, a);
                    quanx = true
                } else {
                    that.app.changePage('login')
                }
            }
        });
    }
    this.controlMenu = function(value, a) {
        var leafArr = {};
        var father = {}
        $.each(value, function(idx, val) {
            if (val.isLeaf == 0) {
                father[val.code] = val
            } else {
                if (val.code != 'online.saas.dmp.authority-manager.usergroup') {
                    if (!leafArr[val.parentId]) {
                        leafArr[val.parentId] = []
                    }
                    leafArr[val.parentId].push(val);
                }
            }
        });
        var html = '';
        var arr = [
            { code: "online.saas.dmp.summary", name: "整体概览", link: "index", className: 'summary', icon: "indexI", hasChild: false },
            { code: "online.saas.dmp.user-analysis", name: "用户分析", link: "peopleAnalysis", className: 'user-analysis', icon: "peopleAnalysisI", hasChild: false },
            { code: "online.saas.dmp.behavior-analysis", name: "行为分析", link: "behaviorAnalysis", className: 'behavior-analysis', icon: "peopleAnalysisI", hasChild: true },
            { code: "online.saas.dmp.channel-analysis", name: "渠道分析", link: "channelAnalysis", className: 'channel-analysis', icon: "channelAnalysisI", hasChild: false },
            { code: "online.saas.dmp.activity-analysis", name: "活动分析", link: "activesAnalysis", className: 'activity-analysis', icon: "activesAnalysisI", hasChild: false },
            { code: "online.saas.dmp.function-analysis", name: "功能分析", link: "versionAnalysis", className: 'function-analysis', icon: "versionAnalysisI", hasChild: true },
            { code: "online.saas.dmp.portrait-analysis", name: "画像分析", link: "portraitAnalysis", className: 'portrait-analysis', icon: "portraitAnalysisI", hasChild: false },
            { code: "online.saas.dmp.active-manager", name: "自定义管理", link: "shopManager", className: 'active-manager', icon: "shopManagerI", hasChild: true },
            { code: "online.saas.dmp.authority-manager", name: "权限管理", link: "userList", className: 'authority-manager', icon: "userListI", hasChild: true },
        ];
        var arr1 = {
            'online.saas.dmp.behavior-analysis.funnel': { name: '漏斗分析', link: "behaviorAnalysis", className: 'funnel' },
            'online.saas.dmp.behavior-analysis.use': { name: '使用分析', link: "usageAnalysis", className: 'use' },
            'online.saas.dmp.version-analysis': { name: '版本分析', link: "versionAnalysis", className: 'version' },
            'online.saas.dmp.active-manager.channel': { name: '渠道管理', link: "shopManager", className: 'channel' },
            'online.saas.dmp.active-manager.campaign': { name: '活动管理', link: "activesManager", className: 'campaign' },
            'online.saas.dmp.active-manager.event-group': { name: '事件组管理', link: "eventsManager", className: 'event-group' },
            'online.saas.dmp.tag-manager': { name: '标签管理', link: "tagManager", className: 'tag-manager' },
            'online.saas.dmp.authority-manager.user': { name: '用户管理', link: "userList", className: 'user' },
            'online.saas.dmp.authority-manager.role': { name: '角色管理', link: "roleManager", className: 'role' },
        }
        $.each(arr, function() {
            if (father[this.code]) {
                if (this.hasChild) {
                    html += '<li class="' + this.className + ' ' + 'haschild' + '"><a code="' + this.code + '"  moduleId="' + father[this.code].moduleId + '" link="' + this.link + '"><i class=' + this.icon + '></i><span>' + this.name + '</span></a></li>'
                } else {
                    html += '<li class="' + this.className + '"><a code="' + this.code + '"  moduleId="' + father[this.code].moduleId + '" link="' + this.link + '"><i class=' + this.icon + '></i><span>' + this.name + '</span></a></li>'
                }

            }
        });
        that.dom.find('.navOne').html(html);
        for (var i in leafArr) {
            var dom = this.dom.find('a[moduleid="' + i + '"]').parent();
            var dom1 = this.dom.find('a[moduleid="' + i + '"]');
            var html = "<em></em><ul class='navSecond hide'>";
            $.each(leafArr[i], function(idx) {
                if (arr1[this.code]) {
                    if (idx == 0) {
                        dom1.attr('link', arr1[this.code].link);
                        dom1.attr('moduleid', this.moduleId)
                    }
                    html += '<li class="' + arr1[this.code].className + ' ' + 'child' + '"><a code="' + this.code + '"  moduleId="' + this.moduleId + '" link="' + arr1[this.code].link + '"><span>' + arr1[this.code].name + '</span></a></li>'
                }
            })
            html += "</ul>"
            dom.append(html);
        };
        if (a) {
            that.app.changePage($('.navOne>li').find('a').eq(0).attr('link'));
            that.dom.find('.navOne li').eq(0).addClass('seleted');
        } else {
            var name = window.location.hash.replace('#!/', '');
            that.changeTitle(name)
            var dom = this.dom.find('a[link="' + name + '"]').parent();
            var dom1 = this.dom.find('a[link="' + name + '"]').parents('.haschild');
            if (dom1.length > 0) {
                dom1.addClass('seleted');
                dom1.addClass('openUl');
                dom1.find('.navSecond').removeClass('hide');
            }
            dom.addClass('seleted');
            that.app.model.set('moduleId', this.dom.find('a[link="' + name + '"]').attr('moduleid'))
        }
        that.dom.find('a').on('click', function() {
            that.app.model.set('moduleId', $(this).attr('moduleId'));
            that.app.changePage($(this).attr('link'));
            that.changeTitle($(this).attr('link'))
        })
        that.dom.find('.navOne a').on('click', function() {
            that.dom.find('.navOne li').removeClass('seleted')
            var dom1 = $(this).parents('.haschild');
            var dom2 = $(this).parents('.child');
            $(this).parent().addClass('seleted');
            if (dom1.length > 0 && dom2.length == 0) {
                if (dom1.hasClass('openUl')) {
                    dom1.removeClass('openUl');
                    dom1.find('.navSecond').addClass('hide');
                    dom1.find('.navSecond li').removeClass('seleted')
                } else {
                    dom1.addClass('openUl');
                    dom1.find('.navSecond').removeClass('hide');
                    dom1.find('.navSecond li').eq(0).addClass('seleted')
                }
            }
        });
    }
    this.pageMenu = function() {
        var name = window.location.hash.replace('#!/', '')
        var className = ''
        if (name != 'login') {
            if (!quanx) {
                this.getQuan()
            } else {
                //this.dealMenuShow()
            }
        } else {
            quanx = false
        }

    }
    this.changeTitle = function(val) {
        switch (val) {
            case 'index':
                that.app.header.changeTitle("整体概览")
                break;
            case 'peopleAnalysis':
                that.app.header.changeTitle("用户分析")
                break;
            case 'behaviorAnalysis':
                that.app.header.changeTitle("行为分析<em>&nbsp;>&nbsp;漏斗分析</em>")
                break;
            case 'usageAnalysis':
                that.app.header.changeTitle("行为分析<em>&nbsp;>&nbsp;使用分析</em>")
                break;
            case 'channelAnalysis':
                that.app.header.changeTitle("渠道分析")
                break;
            case 'activesAnalysis':
                that.app.header.changeTitle("活动分析")
                break;
            case 'versionAnalysis':
                that.app.header.changeTitle("功能分析<em>&nbsp;>&nbsp;版本分析</em>")
                break;
            case 'portraitAnalysis':
                that.app.header.changeTitle("画像分析")
                break;
            case 'activesManager':
                that.app.header.changeTitle("自定义管理<em>&nbsp;>&nbsp;活动管理</em>")
                break;
            case 'shopManager':
                that.app.header.changeTitle("自定义管理<em>&nbsp;>&nbsp;渠道管理</em>")
                break;
            case 'eventsManager':
                that.app.header.changeTitle("自定义管理<em>&nbsp;>&nbsp;事件组管理</em>")
                break;
            case 'tagManager':
                that.app.header.changeTitle("自定义管理<em>&nbsp;>&nbsp;标签管理</em>")
                break;
            case 'userList':
                that.app.header.changeTitle("权限管理<em>&nbsp;>&nbsp;用户管理</em>")
                break;
            case 'roleManager':
                that.app.header.changeTitle("权限管理<em>&nbsp;>&nbsp;角色管理</em>")
                break;
        }
    }

}
module.exports = menu;