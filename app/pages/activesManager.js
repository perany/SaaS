require("../base/mod_pager.less")

require("../less/activesManager.less")
var department = require("../modules/department/department.js")
var searchment = require("../modules/search/search.js")
var modal = require("../modules/modaldemo/modaldemo.js")
var moduleBase = require('../base/modulesbase.js')
var baseFun = require("../base/pagebase.js");
var api = require('../api/activesManager.api.js');
var time = require('../modules/selectdate/selectdate.js') //12.20

var baseClass = new baseFun();
var app = require('../app.js');
var deleteIds;
var editNewId;
var nowPg = '1';
var goPg;
var myDate = new Date();
var startDa, endDa;
var daypickers = null;
var osIdChange = '';
var nowAction;
var ebditHtml = ''
var btnType = 'new';

function activesManager() {
    var action = {
        edit: { dis: 'none', link: 'noLink' },
        delete: { dis: 'none', link: 'del' }
    };
    var keyword;
    var allPage = 1;
    var currentPage = 1;
    var shopActives = null;
    var arr = [];
    var that = this
    this.complete = function() {
        this.getModelId();
        that.reloadFun();
        //console.log('kkkkk', department)
        shopActives = that.app.loadModule(department, that.dom.find('.now'), {
            icon: [{
                    name: '活动类型',
                    type: 'txt',
                    format: function(value) {
                        return value
                    }
                },
                {
                    name: '活动起止日期',
                    type: 'date',
                    format: function(value) {
                        return value
                    }
                },

                {
                    name: '活动起止时段',
                    type: 'txt',
                    format: function(value) {
                        return value
                    }
                },
                {
                    name: '活动主题',
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
            jg: [70, 150, 100, 120, 100, 80, 120, 120],
            chose: true
        });
        //写自己的代码
        $('#Timer').val(myDate.toLocaleDateString().replace(/-/g, '/').replace(/年/g, '/').replace(/月/g, '/').replace(/日/g, '') + '至' + myDate.toLocaleDateString().replace(/-/g, '/').replace(/年/g, '/').replace(/月/g, '/').replace(/日/g, ''));
        startDa = myDate.toLocaleDateString().replace(/\//g, '-').replace(/年/g, '/').replace(/月/g, '/').replace(/日/g, '')
        endDa = myDate.toLocaleDateString().replace(/\//g, '-').replace(/年/g, '/').replace(/月/g, '/').replace(/日/g, '')
        osIdChange = $('.osCont .selectId').attr('arrt_id');
        if (osIdChange == '2') {
            min = '2017-05-16'
        } else {
            min = ''
        }
        daypickers = that.app.loadModule(time, that.dom.find('#day-picker'), {
            mode: 'd',
            data: { startday: startDa, endday: endDa, min: min }
        })
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
                that.getIos();
                if (value.meta.success) {
                    nowAction = value.data.list
                    that.nowShowHide(value.data.list)
                        //that.inite();
                    that.firstEvent();
                    that.eventFun();

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
                //console.log(673, value)
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
            if (code.lastIndexOf('add') != -1) {
                that.dom.find('.newshop').removeClass('hide');
            }
            if (code.lastIndexOf('edit') != -1) {
                action.edit = { dis: 'inline-block', link: 'noLink' }
            }
            if (code.lastIndexOf('delete') != -1) {
                action.delete = { dis: 'inline-block', link: 'del' }
                that.dom.find('.deleteBtn').removeClass('hide')
            }
        }
        that.listActive(currentPage, true, '')
            //console.log(8888, currentPage)
    }
    this.inite = function() {
            $('.navOne li').removeClass('seleted');
            $('.selfManager').addClass('seleted openUl');
            $('.selfManager .navSecond').removeClass('hide');
            $('.selfManager').find('li').eq(1).addClass('seleted');
        }
        //事件处理
    this.firstEvent = function() {

        daypickers.event._addEvent('day.picker', function(value) {
            startDa = value.st;
            endDa = value.et;
            $('#Timer').val(startDa.replace(/-/g, '/') + '至' + endDa.replace(/-/g, '/'))
            if (startDa == endDa && (that.dom.find('#timeFlow').val() == '23:00-00:00')) {
                that.dom.find('#timeFlow').val('00:00-23:00')
            }
        })
        this.dom.find('#timeFlow').on('click', function() {
            var arrTime = $(this).val().split('-');
            $('.leftHour a').each(function(i, val) {
                //console.log(val.text)
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
        })
        $('.leftHour a').on('click', function() {
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
                    var arrDate = $('#Timer').val().split('至');

                    if (new1 == 23 && (arrDate[0] != arrDate[1])) {
                        $('.rightHour a').eq(0).removeClass('disabled').addClass('selected');
                    } else {
                        $('.rightHour a').eq($(this).index()).addClass('selected');
                    }
                }
            }
        })
        $('.rightHour a').on('click', function() {
            if (!$(this).hasClass('disabled')) {
                $('.rightHour a').removeClass('selected');
                $(this).addClass('selected');
            }
        })
        $('.timeBtn').on('click', function() {
            $('.timeHour').addClass('hide');
            $('#timeFlow').val($('.leftHour .selected').text() + '-' + $('.rightHour .selected').text());
            $('.popupCont').removeAttr('style') //12.20
            $('.Popups').removeAttr('style') //12.21
        })
        $('.cancleBtn').on('click', function() {
            $('.mask,.Popups ').addClass('hide');
        })
        this.dom.find('#Timer').on('click', function() {
            that.dom.find('#day-picker').show();
        })
        that.dom.find('.checkType').on('click', function() {
            $('.checkType').removeClass('selected');
            $(this).addClass('selected');
            that.checktypes();
        })
        $('.cancleBtn').on('click', function() {
            $('.Popups ,.mask').addClass('hide');
        })

        //搜索
        $('.searcher a').on('click', function() {
            $('.deleteBtn ').removeClass('dis');
            $('.allCheck ').removeClass('checked');
            $('.list-header .check-box').removeClass('choose');
            keyword = that.dom.find('.searchCont').val();
            that.listActive(currentPage, true, keyword)
        });
        $('.osCont a').on('click', function() {
            $('.osName').text($(this).text());
            $('.osCont a').removeClass('selectId');
            $(this).addClass('selectId');
            osIdChange = $('.osCont .selectId').attr('arrt_id');
            //console.log('osIdChange', osIdChange)
            that.app.model.set('osId', osIdChange);
            // if (daypickers != null && btnType == 'new') {
            if (osIdChange == '2') {
                min = '2017-05-16'
            } else {
                min = ''
            }
            daypickers.refreshMin({ min: min, type: btnType })
                // } else {
            $('.mask,.Popups ').addClass('hide');
            //}
            that.listActive(currentPage, true, '');
        })

        $('.activeName').blur(function() {
            var activeCont = $('.activeName').val().trim();
            if (activeCont && baseClass.isName(activeCont)) {
                $('.errorActives').addClass('hide');
            } else {
                if (activeCont == '') {
                    $('.errorActives').removeClass('hide').text(' 活动主题不能为空，请输入活动主题');
                } else {
                    //if (activeCont.length > 20 || activeCont.length < 6) {
                    $('.errorActives').removeClass('hide').text('请输入6-20位字母、数字或_，区分大小写');
                    //}
                }
            }
        })
        $('.activeCost').blur(function() {
            var activeCost = $('.activeCost').val().trim();
            if (activeCost && baseClass.isNumNew(activeCost)) {
                $('.errornums').addClass('hide');
            } else {
                if (activeCost == '') {
                    $('.errornums').removeClass('hide').text('投入金额不能为空，请输入投入金额');
                } else {
                    $('.errornums').removeClass('hide').text('格式错误，请输入数字');
                }
            }
        })
        shopActives.event._addEvent('department.changePage', function(value) {
            that.listActive(shopActives.getNowPage(), false, '')
        })
    }
    this.changeTime = function() {
        var arrDate = $('#Timer').val().split('至');
        if (arrDate[0] == arrDate[1]) {
            $('.leftHour a:last').addClass('disabled');
            $('.rightHour a:eq(0)').addClass('disabled');
        } else {
            $('.leftHour a:last').removeClass('disabled');
            $('.rightHour a:eq(0)').removeClass('disabled');
        }
    }
    this.eventFun = function() {
        $('.newshop').unbind('click').on('click', function() {
            btnType = 'new'
            $('.mask,.actPopup ').removeClass('hide');
            $('.popupTitle span').text('新建活动');
            $('.activeName').val('');
            $('.activeCost').val('');
            $('.saveManager').addClass('newSave').removeClass('editSave');
            $('.prChild').remove();
            $('.errorTip').addClass('hide');
            $('.prChild').remove();
            that.checktypes();
            //console.log('---')
            //daypickers.refresh({ st: Tool.GetDateStr(0), et: Tool.GetDateStr(0) })
            $('#Timer').val(Tool.GetDateStr(0) + '至' + Tool.GetDateStr(0));
        })
        that.dom.find('.edit').unbind('click').click(function() {
            btnType = 'edit'
            $('.saveManager').removeClass('newSave').addClass('editSave')
            that.dom.find('.mask,.cusPopup').removeClass('hide');
            that.dom.find('.popupTitle span').text('编辑活动');
            var editId = parseInt($(this).parent('li').attr('nowid'));
            editNewId = editId;
            that.editsFun(editNewId);
            if (daypickers != null) {
                if (osIdChange == '2') {
                    min = '2017-05-16'
                } else {
                    min = ''
                }
                daypickers.refreshMin({ min: min })
            }
        })

        $('.adds').unbind('click').click(function() {
            var htmls = '';
            htmls = '<p class="pr prChild"><label><i>*</i>&nbsp;&nbsp;&nbsp;参与店铺</label>' +
                '<span class="selectLeve2 shopSelect">' +
                '<i class="selectArrow"></i>' +
                '<span class="sleHid">' +
                '<select class="shopSelList">' +
                '</select>' +
                '</span>' +
                '</span>' +
                '<a class="deletShop"></a>' +
                '<span class="errorTip hide"></span>' +
                '</p>';
            $(this).parent('.pr').parent('.popupCont').append(htmls);
            that.dom.find('.deletShop').unbind('click').click(function() {
                $(this).parent('.prChild').remove();
            })
            that.newShopsFun();
        })



        that.dom.find('.delete').unbind('click').click(function() {
            deleteIds = parseInt($(this).parent('li').attr('nowid'));
            $('.popupTitle span').text('删除活动');
            $('.deletePopup,.mask').removeClass('hide');
        });
        that.dom.find('.deleteOk').unbind('click').click(function() {
            $('.deleteBtn').removeClass('dis'); //12.30 删除后按钮恢复
            var arrDele = deleteIds.toString().split(',');
            if (arrDele.length > 1) {
                $('.check-box').removeClass('choose');
            }
            that.deleteActiveFun(deleteIds)
        });
        that.dom.find('.list .check-box').click(function() {
            if ($('.list-content .choose').length >= 1) {
                $('.deleteBtn').addClass('dis');
                //多个删除
                that.dom.find('.dis').unbind('click').on('click', function() {
                    if ($(this).hasClass('dis')) {
                        $('.popupTitle span').text('删除活动');
                        $('.deletePopup,.mask').removeClass('hide');
                        var delIds = [];
                        $('.list-content  .choose').each(function() {
                            delIds.push($(this).parents('li').attr('nowid'));
                        });
                        deleteIds = delIds.join(',');
                    }
                });
            } else {
                $('.deleteBtn').removeClass('dis')
            }
        })
        $('.saveManager').unbind('click').click(function() {
            var times = $('#Timer').val().split('至');
            var hours = $('#timeFlow').val().split('-');
            var startDate = times[0].replace(/\//g, '-');
            var endDate = times[1].replace(/\//g, '-');
            var name = $('.activeName').val().trim();
            var startTime = hours[0];
            var endTime = hours[1];
            var arrs = [];
            var costs = $('.activeCost').val();
            $('.shopSelList').each(function(i, val) {
                arrs.push($(this).find('option:selected').attr('data_id'));
            });
            arrs = arrs.join(',');
            if ($('#Timer').val().trim()) {
                if ($('.activeName').val().trim() && baseClass.isName($('.activeName').val().trim())) {
                    if (costs && baseClass.isNum(costs) && ($('.errornums').hasClass('hide'))) {
                        if ($(this).hasClass('newSave')) {
                            that.newSavesFun(name, costs, startDate, endDate, startTime, endTime, arrs);
                        } else if ($(this).hasClass('editSave')) {
                            that.editSavesFun(name, costs, startDate, endDate, startTime, endTime, arrs, editNewId);
                        }
                    } else {
                        if ($('.activeCost').val().trim() == '') {
                            $('.errornums').removeClass('hide').text('投入金额不能为空，请输入投入金额');
                        } else {
                            $('.errornums').removeClass('hide').text('格式错误，请输入数字');
                        }
                        return false;
                    }
                } else {
                    if ($('.activeName').val().trim() == '') {
                        $('.errorActives').removeClass('hide').text('活动主题不能为空，请输入活动主题');
                    } else {
                        $('.errorActives').removeClass('hide').text('请输入6-20位字母、数字或_，区分大小写');
                    }
                    return false;
                }
            } else {
                $('.errorTime').removeClass('hide').text('请选择起止日期');
                return false;
            }
        });
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

    //店铺列表
    this.newShopsFun = function(ids, i) {
        api.store_list().then(function(res) {
            var html = '';
            $(res).each(function(i, val) {
                html += '<option data_id ="' + val.id + '" value ="' + val.name + '">' + val.name + '</option>';
            });
            $('.shopSelList').each(function() {
                if ($(this).html() == '') {
                    $(this).append(html);
                }
            })
            if (ids) {
                $(".shopSelList").eq(i).find("option[data_id='" + ids + "']").attr("selected", true);
            }
        })
    }

    /**
     * 新建活动
     */

    this.newSavesFun = function(name, cost, startTime, endTime, startHour, endHour, storeIds) {
        var dataPara = {
            type: parseInt($('.checkType.selected').attr('name')),
            osId: $('.osCont .selectId').attr('arrt_id'),
            name: name,
            cost: cost,
            startTime: startTime,
            endTime: endTime,
            startHour: startHour,
            endHour: endHour,
            storeIds: storeIds
        }
        api.create(dataPara).then(function(res) {
            if (res.meta.success == true) {
                $('.Popups,.mask').addClass('hide');
                that.listActive(currentPage, true, '')
            } else {
                //if (res.message.indexOf('NameExisits') != -1) {
                that.dom.find('.errorActives').removeClass('hide');
                that.dom.find('.errorActives').html('活动名不可重复，请重新输入')
                    //}
            }
        })
    }

    /**
     * 编辑活动
     */
    this.editsFun = function(id) {
        api.editActive(id).then(function(res) {
            if (res.meta.success == true) {
                var newHtml = '';
                $('.prChild').remove();
                $('.popupTitle span').text('编辑活动');
                $('.mask,.actPopup').removeClass('hide');
                $('.saveManager ').removeClass('newSave').addClass('editSave');
                $('.cusPopup ,.mask').removeClass('hide');
                $('#Timer').val(res.data.startTime.replace(/-/g, '/') + '至' + res.data.endTime.replace(/-/g, '/'));
                daypickers.refresh({ st: res.data.startTime, et: res.data.endTime })
                $('#timeFlow').val(res.data.startHour + '-' + res.data.endHour)
                $('.activeName').val(res.data.name);
                $('.activeCost').val(res.data.cost);
                $('.checkType').removeClass('selected').eq(parseInt(res.data.type - 1)).addClass('selected');
                that.checktypes();
                arrIds = res.data.storeIds.split(',');

                $(arrIds).each(function(i, val) {
                    if (i != 0) {
                        newHtml += '<p class="pr prChild"><label><i>*</i>&nbsp;&nbsp;&nbsp;参与店铺</label>' +
                            '<span class="selectLeve2 shopSelect">' +
                            '<i class="selectArrow"></i>' +
                            '<span class="sleHid">' +
                            '<select class="shopSelList">' +
                            '</select>' +
                            '</span>' +
                            '</span>' +
                            '<a class="deletShop"></a>' +
                            '<span class="errorTip hide"></span>' +
                            '</p>';
                    }
                })
                $('.popupCont').append(newHtml);
                $(arrIds).each(function(i, val) {
                    that.newShopsFun(val, i);
                })
                that.dom.find('.deletShop').unbind('click').click(function() {
                    $(this).parent('.prChild').remove();
                })
            }
        })
    }
    this.checktypes = function() {
            if ($('.checkType.selected').attr('name') == '1') {
                $('.shops').addClass('hide');
                $('.prChild').remove();
            } else {
                $('.shops').removeClass('hide');
                that.newShopsFun();
            }
        }
        //编辑保存
    this.editSavesFun = function(name, cost, startTime, endTime, startHour, endHour, storeIds, id) {
            var dataPara = {
                id: id,
                type: parseInt($('.checkType.selected').attr('name')),
                osId: $('.osCont .selectId').attr('arrt_id'),
                name: name,
                cost: cost,
                startTime: startTime,
                endTime: endTime,
                startHour: startHour,
                endHour: endHour,
                storeIds: storeIds
            }
            api.update(dataPara).then(function(res) {
                if (res.meta.success == true) {
                    $('.Popups ,.mask').addClass('hide');
                    that.listActive(currentPage, true, '');
                }
            })
        }
        //删除
    this.deleteActiveFun = function(cont) {
            api.deleteActive(cont).then(function(res) {
                if (res.meta.success == true) {
                    $('.Popups,.mask').addClass('hide');
                    that.listActive(currentPage, true, '');
                }
            })
        }
        /**
         *  客户列表
         */
    this.changeList = function(valueList) {
            var newList = [];
            var str = '';
            $(valueList).each(function(i, val) {
                if (val.type == '1') {
                    str = '线上活动'
                } else {
                    str = '线下活动'
                }
                newList.push({ 'id': val.id, 'type': str, 'timeStart': val.startTime + '至' + val.endTime, 'times': val.startHour + '至' + val.endHour, 'name': val.name, 'cost': Tool.moneyFormat(val.cost), 'act': action, 'time1': that.newDates(val.createdTime), 'time2': that.newDates(val.lastChanged) });
            })
            return newList;
        },
        this.listActive = function(currentPage, status, channelName) {
            var newDef = $.Deferred()
            var jsonPage = {
                    osId: $('.osCont .selectId').attr('arrt_id'),
                    name: channelName || '',
                    pageSize: 10,
                    currentPage: currentPage
                }
                //console.log('pppppppppp', jsonPage);
            that.api.list(jsonPage).then(function(res) {
                //console.log('[[[[[[[', res);
                that.dom.find('.loading_new').addClass('hide');
                var datas = res.data;
                allPage = datas.totalPage;
                datas.list.forEach(function(val) {
                    arr.push(val.teamName)
                })
                if (res.meta.success == true) {
                    that.dom.find('.failLoad').addClass('hide');
                    if (datas.list.length > 0) {
                        that.dom.find('.dataNone').addClass('hide');
                        that.dom.find('.now').removeClass('hide');
                        if (status == true) {
                            // shopActives.refreshData({
                            //     list: that.changeList(datas.list),
                            //     total: datas.totalPage
                            // })
                            shopActives.setData(that.changeList(datas.list));
                            shopActives.getTotal(datas.totalPage)
                        } else {
                            shopActives.pushData({
                                list: that.changeList(datas.list),
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

module.exports = activesManager;