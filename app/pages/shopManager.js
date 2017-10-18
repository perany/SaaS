require("../less/shopManager.less")
var department = require("../modules/department/department.js")
var searchment = require("../modules/search/search.js")
var modal = require("../modules/modaldemo/modaldemo.js")
var moduleBase = require('../base/modulesbase.js');
var app = require('../app.js');
var baseFun = require("../base/pagebase.js");
var time = require('../modules/selectdate/selectdate.js') //12.20
var baseClass = new baseFun();
var timesBase = new moduleBase();
var totalPage = 0;
var deleteId;
var editNewId;

var nowAction, ebditHtml = '';
var myDate = new Date();
var startDa, endDa;
var daypicker = null;

function shopManager() {
    var currentPage = 1;
    var keyword = '';
    var shops = null;
    var newListQu = null;
    var searchList = null;
    var idArr = [];
    var index = 0;
    var allPage = 1;
    var action = {
        edit: { dis: 'none', link: 'noLink' },
        delete: { dis: 'none', link: 'del' }
    };
    var that = this;
    var osIdChange = '';
    var btnType = 'new';
    this.complete = function() {
        //写自己的代码
        this.getModelId();
        that.reloadFun();
        $('#Timers').val(myDate.toLocaleDateString() + '至' + myDate.toLocaleDateString());
        startDa = myDate.toLocaleDateString().replace(/\//g, '-').replace(/年/g, '-').replace(/月/g, '-').replace(/日/g, '')
        endDa = myDate.toLocaleDateString().replace(/\//g, '-').replace(/年/g, '-').replace(/月/g, '-').replace(/日/g, '')
        osIdChange = $('.osCont .selectId').attr('arrt_id');
        if (osIdChange == '2') {
            min = '2017-05-16'
        } else {
            min = ''
        }
        daypicker = that.app.loadModule(time, that.dom.find('#day-picker'), {
            mode: 'd',
            data: { startday: startDa, endday: endDa, min: min }
        })

        //页面列表
        shops = this.app.loadModule(department, this.dom.find('.now'), {
            icon: [{
                    name: '渠道起止日期',
                    type: 'date',
                    format: function(value) {
                        return value
                    }
                },
                {
                    name: '渠道名称',
                    type: 'txt',
                    format: function(value) {
                        return value
                    }
                },
                {
                    name: '投入金额',
                    type: 'txt',
                    format: function(value) {
                        return value
                    }
                },
                { name: '操作', type: 'action' },
                {
                    name: '创建时间',
                    type: 'date',
                    format: function(value) {
                        return value
                    }
                },
                {
                    name: '更新时间',
                    type: 'date',
                    format: function(value) {
                        return value
                    }
                }
            ],
            jg: [150, 100, 100, 80, 120, 100],
            chose: true
        })
        newListQu = this.app.loadModule(department, this.dom.find('.listQd'), {
                icon: [{
                        name: '渠道名称',
                        type: 'txt',
                        format: function(value) {
                            var names = value.length > 15 ? value.substring(0, 15) + '...' : value;
                            return '<span title="' + value + '">' + names + '</span>'
                        }
                    },
                    {
                        name: '渠道URL',
                        type: 'txt',
                        format: function(value) {
                            var names = value.length > 15 ? value.substring(0, 15) + '...' : value;
                            return '<span title="' + value + '">' + names + '</span>'
                        }
                    },
                    {
                        name: '渠道Code',
                        type: 'txt',
                        format: function(value) {
                            var names = value.length > 15 ? value.substring(0, 15) + '...' : value;
                            return '<span title="' + value + '">' + names + '</span>'
                        }
                    },
                    {
                        name: '创建时间',
                        type: 'txt',
                        format: function(value) {
                            return value
                        }
                    }
                ],
                jg: [150, 100, 100, 80],
                chose: false
            })
            // that.dom.find('.btnnn').on('click', function() {
            //     that.app.alert.show({
            //         title: '删除提醒',
            //         template: '<p style="text-align: center">您确定要删除该活动吗？</p>',
            //         close: false,
            //         cancel: true,
            //         sure: function() {
            //             that.app.alert.hide();
            //         }
            //     })
            // })
    }

    this.reloadFun = function() {
        that.dom.find('.reset').click(function() {
            Tool.reloadFormate();
        })
    }
    this.getModelId = function() {
        if (that.app.model.get('moduleId')) {
            that.api.queryActionList({
                appId: that.app._adapss,
                'userId': that.app.local.get('userId'),
                "moduleId": that.app.model.get('moduleId')
            }).done(function(value) {
                //console.log(value)
                if (value.meta.success) {
                    that.getIos()
                    nowAction = value.data.list
                    that.nowShowHide(value.data.list)
                        // that.inite();
                    that.eventFun();
                    that.firtEvent();
                } else {
                    alert('数据不完整')
                }

            })
        } else {
            setTimeout(that.getModelId, 500)
        }
    }
    this.getIos = function() {
        if (!that.app.model.get('iosId')) {
            that.api.operatingSysterm().done(function(value) {
                var htmls = '';
                //console.log(value)
                if (value.meta.success) {
                    $('.osCont').empty();
                    $('#appInstristing').empty();
                    $(value.data).each(function(i, val) {
                        htmls += '<a arrt_id="' + val.typeCode + '">' + val.typeName + '</a>';
                    })
                    $('.osCont').append(htmls);
                    $('.osCont a:eq(0)').addClass('selectId');
                    that.app.model.set('iosId', $('.osCont .selectId').attr('arrt_id'))
                    $('.osName').text('ios');
                } else {
                    setTimeout(that.getIos, 500)
                }

            })
        }
    }
    this.nowShowHide = function(value) {
        for (var i = 0; i < value.length; i++) {
            var code = value[i].code
            if (code.lastIndexOf('addchannel') != -1) {
                that.dom.find('.newshop').removeClass('hide');
            }
            if (code.lastIndexOf('viewchannel') != -1) {
                that.dom.find('.shopSearch').removeClass('hide');
            }
            if (code.lastIndexOf('add') != -1) {
                that.dom.find('.newshopCost').removeClass('hide');
            }
            if (code.lastIndexOf('edit') != -1) {
                action.edit = { dis: 'inline-block', link: 'noLink' }
            }
            if (code.lastIndexOf('delete') != -1) {
                action.delete = { dis: 'inline-block', link: 'del' }
                that.dom.find('.deleteBtn').removeClass('hide')
            }
        }
        that.listShop(currentPage, true, '');
    }
    this.inite = function() {
            // $('.navOne li').removeClass('seleted');
            $('.selfManager').addClass('seleted openUl');
            $('.selfManager').find('li').eq(0).addClass('seleted');
            // $('.selfManager .navSecond').removeClass('hide');
        }
        //事件处理
    this.firtEvent = function() {

        this.dom.find('.Timers').on('click', function() {
            that.dom.find('#day-picker').show();
        })
        $(document).click(function() {
            that.dom.find('.timeHour').addClass('hide');
        })
        this.dom.find('#timeFlow').on('click', function(evt) {
            var arrTime = $(this).val().split('-');
            $('.leftHour a').each(function(i, val) {
                if (val.text == arrTime[0]) {
                    $('.leftHour a').removeClass('selected');
                    $(this).addClass('selected');
                }
            })
            $('.rightHour a').each(function(i, val) {
                if (val.text == arrTime[1]) {
                    $('.rightHour a').removeClass('selected');
                    $(this).addClass('selected');
                }
            })
            that.changeTime()
            $(".timeHour").removeClass('hide');
            evt.stopPropagation ? evt.stopPropagation() : evt.cancelBubble = true;
        })
        this.dom.find('.leftHour a').on('click', function(evt) {
            if (!$(this).hasClass('disabled')) {
                var new1;
                $('.leftHour a').removeClass('selected');
                $(this).addClass('selected');
                new1 = parseInt($(this).text().substring(0, 2));
                $('.rightHour a').each(function() {
                    if (new1 >= parseInt($(this).text().substring(0, 2))) {
                        $(this).addClass('disabled');
                        $(this).removeClass('selected');
                    } else {
                        $(this).removeClass('disabled');
                    }
                })
                if ($('.rightHour .selected').length <= 0) {
                    var arrDate = $('#Timers').val().split('至');
                    if (new1 == 23 && (arrDate[0] != arrDate[1])) {
                        $('.rightHour a').eq(0).removeClass('disabled').addClass('selected');
                    } else {
                        $('.rightHour a').eq($(this).index()).addClass('selected');
                    }
                }
            }
            evt.stopPropagation ? evt.stopPropagation() : evt.cancelBubble = true;
        })
        this.dom.find('.rightHour a').on('click', function(evt) {
            if (!$(this).hasClass('disabled')) {
                $('.rightHour a').removeClass('selected');
                $(this).addClass('selected');
            }
            evt.stopPropagation ? evt.stopPropagation() : evt.cancelBubble = true;
        })
        this.dom.find('.timeBtn').on('click', function() {
            $('.timeHour').addClass('hide');
            $('#timeFlow').val($('.leftHour .selected').text() + '-' + $('.rightHour .selected').text());
        })
        this.dom.find('.cancleBtn').click(function() {
                $('.Popups ,.mask').addClass('hide');
                $('.saveNewManager').removeClass('editSave');
                $('.saveNewManager').addClass('newSave');
            })
            //搜索
        $('.searcher a').on('click', function() {
            $('.deleteBtn ').removeClass('dis');
            $('.allCheck ').removeClass('checked');
            keyword = $('.searchCont').val().trim();
            that.listShop('1', true, keyword)
        })
        $('.osCont a').on('click', function() {
            $('.osName').text($(this).text());
            $('.osCont a').removeClass('selectId');
            $(this).addClass('selectId');
            osIdChange = $('.osCont .selectId').attr('arrt_id');
            //if (daypicker != null && btnType == 'new') {
            if (osIdChange == '2') {
                min = '2017-05-16'
            } else {
                min = ''
            }
            daypicker.refreshMin({ min: min, type: btnType })
                //} else {
            $('.mask,.Popups ').addClass('hide');
            //}
            //console.log('osIdChange', osIdChange)
            that.app.model.set('osId', osIdChange);
            that.listShop(currentPage, true, '');
        });
        $('.channelURL').focus(function() {
            var val = $(this).val();
            if (val == 'http://' || val == '') {
                $(this).val('http://');
            }
        })
        $('.channelURL').blur(function() {
            var channelURL = $('.channelURL').val().trim();
            if (channelURL && baseClass.isURL(channelURL) && channelURL.length < 100) {
                $('.channelURLError').addClass('hide');
            } else {
                if (channelURL == '') {
                    $('.channelURLError').removeClass('hide').text('渠道URL不能为空，请输入渠道URL');
                } else {
                    $('.channelURLError').removeClass('hide').text('格式错误，请输入0-100位字母、数字或符号，区分大小写');
                }
            }
        });
        $('.channelName').blur(function() {
            var channelName = $('.channelName').val().trim();
            if (channelName && baseClass.isName(channelName)) {
                $('.channelNameError').addClass('hide');
            } else {
                if (channelName == '') {
                    $('.channelNameError').removeClass('hide').text('渠道名称不能为空，请输入渠道名称');
                } else {
                    $('.channelNameError').removeClass('hide').text('格式错误，请输入0-20位字母、数字或符号，区分大小写');
                }
            }
        });
        $('.channelCode').blur(function() {
            var channelCode = $('.channelCode').val().trim();
            if (channelCode && baseClass.isLetter(channelCode) && channelCode.length > 0 && channelCode.length <= 20) {
                $('.channelCodeError').addClass('hide');
            } else {
                if (channelCode == '') {
                    $('.channelCodeError').removeClass('hide').text('渠道Code不能为空，请输入渠道Code');
                } else {
                    $('.channelCodeError').removeClass('hide').text('格式错误，请输入0-20位字母，区分大小写');
                }
            }
        });
        $('.portMoney').blur(function() {
            var portMoney = $('.portMoney').val().trim();
            if (portMoney && baseClass.isNumNew(portMoney)) {
                $('.portMoneyError').addClass('hide');
            } else {
                $('.portMoneyError').removeClass('hide').text('格式错误，请重新输入');
            }
        });
    }
    this.changeTime = function() {
        var arrDate = $('#Timers').val().split('至');
        if (arrDate[0] == arrDate[1]) {
            $('.leftHour a:last').addClass('disabled');
            $('.rightHour a:eq(0)').addClass('disabled');
        } else {
            $('.leftHour a:last').removeClass('disabled');
            $('.rightHour a:eq(0)').removeClass('disabled');
        }
    }
    this.eventFun = function() {
        daypicker.event._addEvent('day.picker', function(value) {
                startDa = value.st;
                endDa = value.et;
                $('#Timers').val(value.st.replace(/-/g, '/') + '至' + value.et.replace(/-/g, '/'))
                if (startDa == endDa && (that.dom.find('#timeFlow').val() == '23:00-00:00')) {
                    that.dom.find('#timeFlow').val('00:00-23:00')
                }
            })
            //点击创建渠道
        this.dom.find('.newshop').unbind('click').on('click', function() {
            that.dom.find('.mask,.pups1').removeClass('hide');
            that.dom.find('.pups1Title span').text('创建渠道');
            $('.quart').val('');
            that.dom.find('.errorTip').addClass('hide');
        });
        //点击查看渠道
        this.dom.find('.shopSearch').unbind('click').on('click', function() {
            that.dom.find('.mask,.pups3').removeClass('hide');
            that.dom.find('.pups3Title span').text('查看渠道');
            $('.quart').val('');
            that.dom.find('.errorTip').addClass('hide');
            that.channelSearch(false, 8, 1, true);
        });
        //点击新建渠道成本
        this.dom.find('.newshopCost').unbind('click').on('click', function() {
            //console.log('000000')
            btnType = 'new'
            that.dom.find('.mask,.pups2').removeClass('hide');
            // that.dom.find('#timeFlow').html('00:00-23:00');
            // that.dom.find('#timeFlow').attr('value', '00:00-23:00');
            // that.dom.find('.leftHour a').removeClass('selected');
            // that.dom.find('.rightHour a').removeClass('selected');
            // that.dom.find('.leftHour a').eq(0).addClass('selected');
            // that.dom.find('.rightHour a').eq(0).addClass('selected');
            that.dom.find('.pups2Title span').text('新增渠道成本');
            that.dom.find('.saveNewManagerCost').removeClass('editSave').addClass('newSave');
            $('.quart').val('');
            //console.log('timer123321', myDate.getFullYear() + '/' + (myDate.getMonth() + 1) + '/' + myDate.getDay());
            //$('#Timers').val(that.setNum(myDate.getFullYear() + '/' + (myDate.getMonth() + 1) + '/' + myDate.getDay()) + '至' + that.setNum(myDate.getFullYear() + '/' + (myDate.getMonth() + 1) + '/' + myDate.getDay()));
            $('#Timers').val(Tool.GetDateStr(0) + '至' + Tool.GetDateStr(0));
            var startTime = myDate.toLocaleDateString().replace(/\//g, '-')
            var endTime = myDate.toLocaleDateString().replace(/\//g, '-');
            var min;
            //console.log('----', osIdChange)
            if (osIdChange == '2') {
                min = '2017-05-16'
            } else {
                min = ''
            }
            daypicker = that.app.loadModule(time, that.dom.find('#day-picker'), {
                mode: 'd',
                data: { startday: startTime, endday: endTime, min: min }
            })
            that.eventFun();
            that.dom.find('.errorTip').addClass('hide');
            that.channelSearch(true, 100, 1, true);
        });
        //点击“创建渠道”中的“确定”按钮
        this.dom.find('.saveNewManager').unbind('click').click(function() {
            var channelURL = $('.channelURL').val().trim();
            var channelName = $('.channelName').val().trim();
            var channelCode = $('.channelCode').val().trim();
            if (channelURL) {
                if (channelName) {
                    if (channelCode && baseClass.isLetter(channelCode)) {
                        if ($('.errorTip').not('.hide').length <= 0) {
                            that.newSaves(channelURL, channelName, channelCode);
                        }

                    } else {
                        $('.channelCodeError').removeClass('hide').text('格式错误，请输入0-20位字母，区分大小写');
                        return false;
                    }
                } else {
                    $('.channelNameError').removeClass('hide').text('渠道名称不能为空，请输入渠道名称');
                    return false;
                }
            } else {
                $('.channelURLError').removeClass('hide').text('URL不能为空，请输入URL');
                return false;
            }
        });
        //点击“新增渠道成本”中的“确定”按钮
        this.dom.find('.saveNewManagerCost').unbind('click').click(function() {
            var rowid = idArr[index];
            var channelId = that.dom.find('.channelSearch option:selected').attr('id_name');
            channelId = parseInt(channelId);
            var osIds = $('.osCont .selectId').attr('arrt_id');
            var portMoney = $('.portMoney').val().trim();
            var startHour = $('#timeFlow').val().substring(0, 5);
            var endHour = $('#timeFlow').val().substring(6);
            if ($('.Timers').val()) {
                $('.errorTime').addClass('hide');
                if (channelId) {
                    if (portMoney) {
                        if (baseClass.isNumNew(portMoney)) {
                            if ($(this).hasClass('newSave')) {
                                that.newCostSaves(channelId, osIds, portMoney, startDa, endDa, startHour, endHour);
                            } else if ($(this).hasClass('editSave')) {
                                that.editSaves(rowid, channelId, osIds, portMoney, startDa, endDa, startHour, endHour);
                            }
                        } else {
                            $('.portMoneyError').removeClass('hide').text('格式错误，请输入数字')
                            return false;
                        }
                    } else {
                        $('.portMoneyError').removeClass('hide').text('投入金额不能为空，请输入投入金额')
                        return false;
                    }
                } else {
                    $('.channelSearError').removeClass('hide').text('渠道名称不能为空，请选择渠道名称');
                    return false;
                }
            } else {
                $('.errorTime').removeClass('hide').text('请输入起止日期')
                return false;
            }

        });
        that.dom.find('.delete').unbind('click').click(function() {
            deleteId = parseInt($(this).parent('li').attr('nowid'));
            $('.popupTitle span').text('删除渠道');
            $('.deletePopup,.mask').removeClass('hide');
        });
        that.dom.find('.deleteOk').unbind('click').click(function() {
            $('.deleteBtn').removeClass('dis'); //12.30 删除后按钮恢复
            var arrDele = deleteId.toString().split(',');
            if (arrDele.length > 1) {
                $('.check-box').removeClass('choose');
            }
            that.deleteFun(deleteId)
        });
        shops.event._addEvent('department.changePage', function(value) {
            that.listShop(shops.getNowPage(), false, '')
        })
        newListQu.event._addEvent('department.changePage', function(value) {
                that.channelSearch(false, 8, newListQu.getNowPage(), false);
            })
            //点击列表中的“编辑”按钮
        that.dom.find('.edit').unbind('click').click(function() {
            btnType = 'edit'
            osIdChange = $('.osCont .selectId').attr('arrt_id');
            index = $(this).parent().parent().parent().index();
            var ids = parseInt($(this).parent('li').attr('nowid'));
            that.dom.find('.mask,.pups2').removeClass('hide');
            that.dom.find('.pups2Title span').text('编辑渠道成本');
            that.dom.find('.saveNewManagerCost').removeClass('newSave').addClass('editSave');
            $('.quart').val('');
            that.dom.find('.errorTip').addClass('hide');
            that.channelSearch(true, 100, 1, false, ids);
            if (daypicker != null) {
                if (osIdChange == '2') {
                    min = '2017-05-16'
                } else {
                    min = ''
                }
                daypicker.refreshMin({ min: min, type: btnType })
            }
        })
        that.dom.find('.list .check-box').click(function() {
            if ($('.list-content .choose').length >= 1) {
                $('.deleteBtn').addClass('dis');
                //多个删除
                that.dom.find('.dis').unbind('click').click(function() {
                    if ($(this).hasClass('dis')) {
                        $('.popupTitle span').text('删除渠道');
                        $('.deletePopup,.mask').removeClass('hide');
                        var delIds = [];
                        $('.list-content  .choose').each(function() {
                            delIds.push($(this).parents('li').attr('nowid'));
                        });
                        deleteId = delIds.join(',');
                    }
                });
            } else {
                $('.deleteBtn').removeClass('dis')
            }
        })

    }

    /**
     * 转化年月日时分秒
     */
    this.newDates = function(nS) {
        var time = new Date(nS);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y + '-' + that.add0(m) + '-' + that.add0(d) + ' ' + that.add0(h) + ':' + that.add0(mm) + ':' + that.add0(s);
    }
    this.add0 = function(m) {
        return m < 10 ? '0' + m : m
    }
    this.checks = function() {

    }
    this.setNum = function(datas) {
        var n = datas.split("/");
        for (i = 1; i < n.length; i++) {
            n[i] = ('0' + n[i]).slice(-2);
        }
        var newData = n.join('/');
        return newData;
    }

    //查询渠道（填充在“新建渠道成本”的“查询”下拉框中，以及“查看渠道”的弹出框中）
    this.channelSearch = function(changes, pageSize, currentPage, status, k) {
            var dataPara = {
                pageSize: pageSize,
                currentPage: currentPage
            };
            that.api.listFlowChannel(dataPara).done(function(res) {
                var datas = res.data;
                var allPageQudao = datas.totalPage;
                //true:编辑渠道列表按钮；false:查看按钮列表
                if (changes) {
                    var html1 = '<option>请选择渠道名称</option>';
                    for (var i = 0; i < res.data.list.length; i++) {
                        var name = res.data.list[i].name;
                        html1 += '<option id_name="' + res.data.list[i].id + '">' + name + '</option>';
                    }
                    that.dom.find('.channelSearch').html(html1);
                    if (k) {
                        that.editsFun(k);
                    }
                } else {
                    var idArr = [];
                    datas.list.forEach(function(val) {
                        idArr.push(val.id);
                    })
                    if (res.meta.success == true) {
                        if (status == true) {
                            // newListQu.refreshData({
                            //     list: that.changeList2(datas.list),
                            //     total: datas.totalPage
                            // })
                            newListQu.setData(that.changeList2(datas.list));
                            newListQu.getTotal(datas.totalPage)
                        } else {
                            newListQu.pushData({
                                list: that.changeList2(datas.list),
                                total: res.data.totalPage
                            })
                        }
                        // newDef.resolve();
                        that.eventFun();
                    }
                }

            })
        },
        this.editsFun = function(id) {
            this.api.editShop(id).then(function(res) {
                if (res.meta.success == true) {
                    startDa = res.data.startTime;
                    endDa = res.data.endTime;
                    var startH = res.data.startHour;
                    var endH = res.data.endHour;
                    daypicker.refresh({ st: startDa, et: endDa })
                    $('#Timers').val(startDa.replace(/-/g, '/').replace(/年/g, '/').replace(/月/g, '/').replace(/日/g, '') + '至' + endDa.replace(/-/g, '/').replace(/年/g, '/').replace(/月/g, '/').replace(/日/g, ''));
                    $('#timeFlow').val(startH + '-' + endH);
                    $('.quart').val(res.data.cost);
                    that.dom.find('.channelSearch option').each(function(i, val) {
                        if ($(this).attr('id_name') == res.data.channelId) {
                            $(this).attr('selected', 'selected');
                        }
                    })

                }
            })
        }

    /**
     * 新增渠道
     */
    this.newSaves = function(channelURL, channelName, channelCode) {
            var dataPara = {
                url: channelURL,
                name: channelName,
                code: channelCode
            }
            this.api.createFlowChannel(dataPara).then(function(res) {
                if (res.meta.success == true) {
                    // that.listShop(currentPage,true, '');
                    $('.Popups,.mask').addClass('hide');
                    that.dom.find('.pups1').addClass('hide');
                } else {
                    var errorMessage = res.meta.message;
                    errorMessage = errorMessage.substring(13, errorMessage.length - 1)
                    if (errorMessage == '渠道url已存在') {
                        $('.channelURLError').removeClass('hide').text('渠道URL已存在，请重新填写');
                    } else if (errorMessage == '渠道名称已存在') {
                        $('.channelNameError').removeClass('hide').text('渠道名称已存在，请重新填写');
                    } else {
                        $('.channelCodeError').removeClass('hide').text('渠道Code已存在，请重新填写');
                    }
                }
            })
        }
        //新增渠道成本
    this.newCostSaves = function(channelId, osIds, portMoney, startDa, endDa, startHour, endHour) {
            var dataPara = {
                channelId: channelId,
                // osId: $('.osCont .selectId').attr('arrt_id'),
                osId: osIds,
                cost: portMoney,
                startTime: startDa,
                endTime: endDa,
                startHour: startHour,
                endHour: endHour
            }
            this.api.create(dataPara).then(function(res) {
                if (res.meta.success == true) {
                    that.listShop(currentPage, true, '');
                    that.dom.find('.Popups,.mask').addClass('hide');
                } else {
                    that.dom.find('.portMoneyError').removeClass('hide').text('该渠道在该周期下已投放成本，请重新填写');
                    setTimeout(function() {
                        that.dom.find('.portMoneyError').addClass('hide')
                    }, 3000);
                }
            })
        }
        //编辑保存
    this.editSaves = function(rowid, channelId, osIds, portMoney, startDa, endDa, startHour, endHour) {
        var dataPara = {
            id: rowid,
            channelId: channelId,
            osId: osIds,
            cost: portMoney,
            startTime: startDa,
            endTime: endDa,
            startHour: startHour,
            endHour: endHour
        }
        this.api.saveShop(dataPara).then(function(res) {
            if (res.meta.success == true) {
                $('.Popups ,.mask').addClass('hide');
                that.listShop(currentPage, true, '');
            } else {
                that.dom.find('.channelSearError').removeClass('hide').text('该渠道在该周期下已投放成本，请重新填写');
            }
        })
    }

    //搜索
    that.search = function(cont) {
            var dataPara = {
                areaName: cont
            }
            this.api.searchShop(dataPara).then(function(res) {
                if (res.meta.success == true) {
                    this.activeList(cont);
                }
            })
        }
        //删除

    that.deleteFun = function(cont) {
        this.api.deleteShop(cont).then(function(res) {
            if (res.meta.success == true) {
                $('.Popups,.mask').addClass('hide');
                that.listShop(currentPage, true, '');
            }
        })
    }

    /**
     *  渠道列表
     */
    this.changeList1 = function(valueList) {
        var newList = [];
        $(valueList).each(function(i, val) {
            newList.push({ 'id': val.id, 'timeStart': val.startTime + '至' + val.endTime, 'name': val.channelName, 'cost': Tool.moneyFormat(val.cost), 'act': action, 'time1': val.createdTime, 'time2': val.lastChanged });
        })
        return newList;
        $('.active').text(currentPage);
    }
    this.changeList2 = function(valueList) {
        var newList = [];
        $(valueList).each(function(i, val) {
            newList.push({ 'name': val.name, 'url': val.url, 'code': val.code, 'time': val.createdTime });
        })
        return newList;
        $('.active').text(currentPage);
    }

    //查询渠道成本列表
    this.listShop = function(currentPage, status, channelName) {
        var newDef = $.Deferred();
        jsonPage = {
            osId: $('.osCont .selectId').attr('arrt_id'),
            channelName: channelName || '',
            pageSize: 10,
            currentPage: currentPage
        }
        this.api.listShop(jsonPage).then(function(res) {
            that.dom.find('.loading_new').addClass('hide');
            var datas = res.data;
            allPage = datas.totalPage;
            idArr = [];
            datas.list.forEach(function(val) {
                idArr.push(val.id);
            })
            if (res.meta.success == true) {
                that.dom.find('.failLoad').addClass('hide');
                if (datas.list.length > 0) {
                    that.dom.find('.dataNone').addClass('hide');
                    that.dom.find('.now').removeClass('hide');
                    if (status == true) {
                        // shops.refreshData({
                        //     list: that.changeList1(datas.list),
                        //     total: datas.totalPage
                        // })
                        shops.setData(that.changeList1(datas.list));
                        shops.getTotal(datas.totalPage)
                    } else {
                        shops.pushData({
                            list: that.changeList1(datas.list),
                            total: res.data.totalPage
                        })

                    }
                    newDef.resolve();
                    that.eventFun();
                } else {
                    that.dom.find('.now').addClass('hide');
                    that.dom.find('.dataNone').removeClass('hide');
                }
            } else {
                that.dom.find('.failLoad').removeClass('hide');
            }
        });
        return newDef
    }
}

module.exports = shopManager;