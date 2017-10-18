require("../less/eventsManager.less")
var department = require("../modules/department/department.js")
var searchment = require("../modules/search/search.js")
var modal = require("../modules/modaldemo/modaldemo.js")
var errorTip = require("../modules/errorTips/errorTips.js")
var moduleBase = require('../base/modulesbase.js');
var app = require('../app.js');
var baseFun = require("../base/pagebase.js");
var time = require('../modules/selectdate/selectdate.js') //12.20
var baseClass = new baseFun();

var totalPage = 0;
var deleteId;
var editNewId;

var nowAction, ebditHtml = '';
var errors = '';
var myDate = new Date();
var startDa, endDa;
var daypicker = null;
var osIdChange = $('.osCont .selectId').attr('arrt_id');
var messages = '';
var eventListAddCodes = '';
var eventListAddNames = '';
var tabEdit = false;

function eventsManager() {
    var that = this;
    var evnets = null;
    var currentPage = 1;
    var action = {
        delete: { dis: 'none', link: 'del' }
    };
    var keyword;
    this.complete = function() {
        //写自己的代码
        this.getModelId();

        that.reloadFun();
        events = this.app.loadModule(department, this.dom.find('.now'), {
            icon: [{
                    name: '事件组名称',
                    type: 'txt',
                    format: function(value) {
                        if (tabEdit) {
                            return '<span class="nameTeam">' + value + '</span><a class="tabEdit edit" style="display:inline-block" title="编辑"></a>'
                        } else {
                            return value
                        }
                    }
                },
                {
                    name: '事件名称',
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
            jg: [150, 150, 80, 120, 100],
            chose: true
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
                if (value.meta.success) {
                    // that.getIos()
                    nowAction = value.data.list
                    that.nowShowHide(value.data.list)
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
    this.nowShowHide = function(value) {
        for (var i = 0; i < value.length; i++) {
            var code = value[i].code
            if (code.lastIndexOf('add') != -1) {
                that.dom.find('.newshop').removeClass('hide');
            }
            if (code.lastIndexOf('edit') != -1) {
                tabEdit = true;
            }
            if (code.lastIndexOf('delete') != -1) {
                action.delete = { dis: 'inline-block', link: 'del' }
                that.dom.find('.deleteBtn').removeClass('hide')
            }
        }
        that.listEvent(currentPage, true, '');

    }
    this.firstEvent = function() {
        //删除 透明层
        this.dom.find('.cancleBtn').on('click', function() {
                $('.mask,.Popups ').addClass('hide');
                $('.saveManager').removeClass('editSave');
                $('.saveManager').addClass('newSave');
            })
            //搜索
        this.dom.find('.searcher a').on('click', function() {
                $('.deleteBtn ').removeClass('dis');
                $('.check-box ').removeClass('choose');
                keyword = $('.searchCont').val().trim();
                that.listEvent(currentPage, true, keyword);
            })
            //操作系统
        $('.osCont a').on('click', function() {
                $('.osName').text($(this).text());
                $('.osCont a').removeClass('selectId');
                $(this).addClass('selectId');
                osIdChange = $('.osCont .selectId').attr('arrt_id');
                that.app.model.set('osId', osIdChange);
                that.listEvent(currentPage, true, '');

            })
            //事件组名称的input输入格式判断
        this.dom.find('.quart').blur(function() {
            var eventCont = $(this).parent().find('.quart').val().trim();
            if (eventCont) {
                if (baseClass.isEvent(eventCont)) {
                    $(this).parent().find('.errorEventsName').addClass('hide');
                } else {
                    $(this).parent().find('.errorEventsName').removeClass('hide').text('请输入0-20位字母、数字或_，区分大小写');
                }
            } else {

                $(this).parent().find('.errorEventsName').removeClass('hide').text('事件组名称不能为空，请输入事件组名称');
            }

        })
        that.checkFormat();

    }
    this.checkFormat = function() {
        //事件code的input输入格式判断
        this.dom.find('.eventID').blur(function() {
                var _selfEven = $(this);

                var eventCont = $(this).parent().find('.eventID').val().trim();
                if (eventCont) {
                    if (baseClass.isEvent(eventCont)) {
                        $(this).parent().find('.errorLeft').addClass('hide');
                        //调接口
                        that.api.getEventNameByCode({
                            osid: $('.osCont .selectId').attr('arrt_id'),
                            code: eventCont
                        }).done(function(value) {
                            if (value.meta.success) {
                                if (value.data == '') {
                                    _selfEven.parent().find('.eventName').removeAttr('disabled');
                                } else {
                                    _selfEven.parent().find('.eventName').val(value.data).attr('disabled', 'true');
                                }
                            }
                        })

                    } else {
                        $(this).parent().find('.errorLeft').removeClass('hide').text('请输入0-20位字母、数字或_，区分大小写');
                    }
                } else {
                    $(this).parent().find('.errorLeft').removeClass('hide').text('事件code不能为空，请输入事件code');
                }
            })
            //事件名称的input输入格式判断
        this.dom.find('.eventName').blur(function() {
            var eventCont = $(this).parent().find('.eventName').val().trim();
            if (eventCont) {
                if (baseClass.isEvent(eventCont)) {
                    $(this).parent().find('.errorRight').addClass('hide');

                } else {
                    $(this).parent().find('.errorRight').removeClass('hide').text('请输入0-20位字母、数字或_，区分大小写');
                }
            } else {
                $(this).parent().find('.errorRight').removeClass('hide').text('事件名称不能为空，请输入事件名称');
            }
        })
    }

    this.eventFun = function() {
            //新建事件组
            this.dom.find('.newshop').unbind('click').on('click', function() {
                $('.mask, .cusPopup').removeClass('hide');
                $('.popupTitle span').text('新建事件组');
                $('.popupHeight').find('.idName, .addIcon, .deletIcon').removeClass('hide'); //恢复编辑时隐藏的增删图标
                $('.quart').val('');
                // var len = $('.idName').length;
                // console.log(len,"len len");
                // for (var i=1; i<len; i++) {
                //     alert($('.idName').eq(i).html());
                //     $('.idName').eq(i).remove();
                // }
                that.dom.find('.idName').remove();
                var html = '';
                html = '<p class="idName"><label><span>*</span>事件code</label>' +
                    '<input type="text" class="eventID" placeholder="请输入事件code">' +
                    '<span class="errorTip errorEvent errorLeft hide"></span>' +
                    '<label><span>*</span>事件名称</label>' +
                    '<input type="text" class="eventName" placeholder="请输入事件名称">' +
                    '<span class="errorTip errorEvent errorRight hide"></span>' +
                    '<i class="deletIcon"></i>' +
                    '</p>';
                //alert(i);
                $('.pos').after(html);
                $('.eventID').val('');
                $('.eventName').val('');
                $('.saveManager').addClass('newSave').removeClass('editSave');
                $('.errorTip').addClass('hide');
                that.checkFormat();

                that.saveButton();
            })

            that.dom.find('.edit').unbind('click').click(function() {
                var editId = parseInt($(this).parents('ul').find('li:eq(0)').attr('nowid'));
                var editName = $(this).parents('ul').find('li').eq(1).find('.nameTeam').text();
                var htmls = '<input class="inputname" value="' + editName + '"dataId="' + editId + '"/><a class="eventGropBtn"></a>';
                $(this).parents('li').html(htmls);
                that.dom.find('.eventGropBtn').unbind('click').click(function() {
                    var editId = parseInt($(this).siblings('input').attr('dataid'));
                    var editName = $(this).siblings('input').val().trim();
                    editNewId = editId;

                    if (editName && baseClass.isEvent(editName)) {
                        that.updateEventFun(osIdChange, editNewId, editName, $(this));
                    } else {
                        $(this).siblings('input').css('border-color', 'red');
                        that.errorsFun();
                    }


                })
            })


            //添加事件code、名称
            this.dom.find('.addIcon').unbind('click').on('click', function() {
                var html = '';
                html = '<p class="idName"><label><span>*</span>事件code</label>' +
                    '<input type="text" class="eventID" placeholder="输入事件code">' +
                    '<span class="errorTip errorEvent errorLeft hide"></span>' +
                    '<label><span>*</span>事件名称</label>' +
                    '<input type="text" class="eventName" placeholder="输入事件名称">' +
                    '<span class="errorTip errorEvent errorRight hide"></span>' +
                    '<i class="deletIcon"></i>' +
                    '</p>';
                //$(this).parent().parent().height($(this).parent().parent().height() + 46);
                //$(this).parent().parent().find('.addIcon').addClass('hide');
                $(this).parent().parent().find('.idName').last().after(html);
                //$(this).parent().parent().find('.addIcon').last().removeClass('hide');
                that.dom.find('.deletIcon').unbind('click').click(function() {
                    var len = $(this).parent().parent().find('.idName').length; //任意删除一组事件code和事件名称
                    //alert(len);
                    if (len > 1) {
                        $(this).parent('.idName').remove();
                    }
                })
                that.checkFormat(); //格式验证
                that.saveButton();
            })

            that.dom.find('.delete').unbind('click').click(function() {
                deleteId = parseInt($(this).parent('li').attr('nowid'));
                $('.popupTitle span').text('删除事件组');
                $('.deletePopup,.mask').removeClass('hide');
            })

            that.dom.find('.deleteOk').unbind('click').click(function() {
                    $('.deleteBtn').removeClass('dis'); //12.30 删除后按钮恢复
                    var arrDele = deleteId.toString().split(',');
                    if (arrDele.length > 1) {
                        $('.check-box').removeClass('choose');
                    }
                    that.deleteEventFun(deleteId)
                })
                //换页
            events.event._addEvent('department.changePage', function(value) {
                    that.listEvent(events.getNowPage(), false, $('.searchCont').val().trim());
                })
                //全选仅限当前页
            that.dom.find('.pager-next,.pager-prev,.pager-first,.pager-last').click(function() {
                $('.list-header .check-box').removeClass('choose');
                $('.deleteBtn').removeClass('dis');
            })

            that.dom.find('.pager-num1').blur(function() {
                // console.log($('.pager-num').text().substring(0,$('.pager-num').val().length),$('.pager-num').val(),666)
                $('.list-header .check-box').removeClass('choose');
                $('.deleteBtn').removeClass('dis');
            })

            that.dom.find('.list .check-box').click(function() {
                if ($('.list-content .choose').length >= 1) {
                    $('.deleteBtn').addClass('dis');
                    //多个删除
                    that.dom.find('.dis').unbind('click').on('click', function() {
                        if ($(this).hasClass('dis')) {
                            $('.popupTitle span').text('删除事件组');
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
            this.errorsFun = function(a) {
                    errors = that.app.modal(errorTip);
                    if (a) {
                        errors.dom.find('.errorCont').find('p').text('事件组名称重复,请重新输入！');
                    } else {
                        if ($('.inputname').val()) {
                            errors.dom.find('.errorCont').find('p').text('请输入0-20位字母、数字或_，区分大小写！');
                        } else {
                            errors.dom.find('.errorCont').find('p').text('事件组不能为空，请输入事件组名称!');
                        }

                    }
                    errors.dom.find('.modal-close,.errorBtn').on('click', function() {
                        errors.close()
                    })
                    return false;
                }
                //弹框确定按钮
            this.saveButton = function() {
                this.dom.find('.saveManager').unbind('click').click(function() {
                    //alert(0);
                    var name = $('.quart').val().trim();
                    //新增事件组  获取新增的code和name!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    var eventListAddCodeEach = [];
                    var eventListAddNameEach = [];

                    //有问题，dom节点!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    $('.idName .eventID').each(function() {
                        eventListAddCodeEach.push($(this).val().trim());
                    })
                    eventListAddCodes = eventListAddCodeEach.join(','); //获取事件code
                    $('.idName .eventName').each(function() {
                        eventListAddNameEach.push($(this).val().trim());
                    })
                    eventListAddNames = eventListAddNameEach.join(','); //获取事件名称
                    //that.createEventFun(osIdChange, name, eventListAddCodes, eventListAddNames);
                    //遍历事件code和事件名称，判断是否格式错误
                    if ($(this).hasClass('newSave')) {
                        //alert(0);
                        if (name) {
                            if (baseClass.isEvent(name)) {
                                //alert(1);
                                $(eventListAddCodeEach).each(function(i, val) {
                                    //alert(val);
                                    if (val) {
                                        if (baseClass.isEvent(val)) {
                                            //alert(0);
                                            //alert(val);
                                            if (eventListAddNameEach[i]) {
                                                if (baseClass.isEvent(eventListAddNameEach[i])) {
                                                    //that.createEventFun(osIdChange, name, eventListAddCodes, eventListAddNames);                                                                        
                                                } else {
                                                    //alert(1);
                                                    //alert("事件名称错啦！！！！！！");
                                                    $('.popupHeight .idName').eq(i).find('.errorRight').removeClass('hide').text('请输入0-20位字母、数字或_，区分大小写');
                                                    return false;
                                                }
                                            } else {
                                                $('.popupHeight .idName').eq(i).find('.errorRight').removeClass('hide').text('事件名称不能为空，请输入事件名称');
                                                return false;
                                            }

                                        } else {
                                            //alert(2);
                                            //alert("事件code错啦！！！！！！");
                                            $('.popupHeight .idName').eq(i).find('.errorLeft').removeClass('hide').text('请输入0-20位字母、数字或_，区分大小写');
                                            return false;
                                        }
                                    } else {
                                        $('.popupHeight .idName').eq(i).find('.errorLeft').removeClass('hide').text('事件code不能为空，请输入事件code');
                                        return false;
                                    }

                                })
                                var len_1 = that.dom.find('.Popups .errorTip').length
                                var len_2 = that.dom.find('.Popups .popupHeight .hide').length
                                    //len_1 = setTimeout($(this).parent().parent().find('.errorTip').is('.hide').length, 2500);
                                    //var len_2 = $('.errorTip').length;
                                    //alert(len_1);
                                    //alert(len_2);

                                if (len_1 == len_2) {
                                    that.createEventFun(osIdChange, name, eventListAddCodes, eventListAddNames);
                                } else {
                                    return false;
                                }

                            } else {
                                //alert("事件组组组名称错啦！！！！！！");
                                $('.errorEventsName').removeClass('hide').text('请输入0-20位字母、数字或_，区分大小写');
                                return false;
                            }
                        } else {
                            $('.errorEventsName').removeClass('hide').text('事件组名称不能为空，请输入事件组名称');
                            return false;
                        }

                    }

                })
            }
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
        /**
         * 新建事件组
         */
    this.createEventFun = function(osId, name, eventCodes, eventNames) {
            var dataPara = {
                osId: osIdChange,
                name: name,
                eventCodes: eventCodes,
                eventNames: eventNames
            }
            this.api.create(dataPara).then(function(res) {
                if (res.meta.success == true) {
                    $('.Popups,.mask').addClass('hide');
                    that.listEvent(currentPage, true, '');
                } else {
                    switch (res.meta.message) {
                        case "事件组名称已存在！":
                            //alert(0);
                            $('.errorEventsName').removeClass('hide').text('事件组不可重复，请重新输入');
                            //return false;
                            break
                        case "事件code重复！":
                            $('.popupHeight .idName').find('.errorLeft').addClass('hide');
                            $('.popupHeight .idName:last').find('.errorLeft').removeClass('hide').text('code不可相同');

                            //return false;
                            break
                        case "事件名称重复！":
                            $('.popupHeight .idName').find('.errorRight').addClass('hide');
                            $('.popupHeight .idName:last').find('.errorRight').removeClass('hide').text('事件名称不可相同');
                            //return false;
                            break
                    }

                }
            })
        }
        /*编辑事件组（只能修改事件组名称，事件名称是不能修改的！！！！！！！！！！input框只读）
        this.editsFun = function(name, eventId, eventName) {
            $('.popupHeight').find('.addIcon, .deletIcon').addClass('hide');
            $('.quart').val(name);
            $(eventId).each(function(i,val) {
                var html = '';
                html = '<p class="idName"><label><span>*</span>事件code</label>' +
                            '<input type="text" class="eventID" value="' + val + '" readonly="readonly">' +
                            '<label><span>*</span>事件名称</label>' + 
                            '<input type="text" class="eventName" value="' + eventName[i] + '" readonly="readonly">' +
                            '</p>'; 
                i == 0 ? $('.pos').after(html) : $('.idName').last().after(html);
            })

=======
                            $('.popupHeight .idName:last').find('.errorRight').removeClass('hide').text('事件名称不可重复，请重新输入');
                            //return false;
                            break
                    }

                }
            })
        }
        /*编辑事件组（只能修改事件组名称，事件名称是不能修改的！！！！！！！！！！input框只读）
        this.editsFun = function(name, eventId, eventName) {
            $('.popupHeight').find('.addIcon, .deletIcon').addClass('hide');
            $('.quart').val(name);
            $(eventId).each(function(i,val) {
                var html = '';
                html = '<p class="idName"><label><span>*</span>事件code</label>' +
                            '<input type="text" class="eventID" value="' + val + '" readonly="readonly">' +
                            '<label><span>*</span>事件名称</label>' + 
                            '<input type="text" class="eventName" value="' + eventName[i] + '" readonly="readonly">' +
                            '</p>'; 
                i == 0 ? $('.pos').after(html) : $('.idName').last().after(html);
            })

>>>>>>> 6.30
        }*/

    //编辑保存事件组
    this.updateEventFun = function(osId, id, name, objs) {
            var dataPara = {
                osId: osIdChange,
                id: id,
                name: name
            }
            this.api.update(dataPara).then(function(res) {
                if (res.meta.success == true) {
                    objs.siblings('input').css('border-color', '#666');
                    $('.Popups ,.mask').addClass('hide');
                    that.listEvent(currentPage, true, '');
                } else if (res.meta.message.indexOf('事件组名称已存在') != -1) {
                    objs.siblings('input').css('border-color', 'red');
                    that.errorsFun(true);
                }
                // alert(res.meta.message.indexOf('事件组名称已存在'))
            })
        }
        //删除
    this.deleteEventFun = function(cont) {
        this.api.deleteEvent(cont).then(function(res) {
            if (res.meta.success == true) {
                $('.Popups,.mask').addClass('hide');
                that.listEvent(currentPage, true, '');
            }
        })
    }

    //列表
    this.changeList = function(valueList) {
            var newList = [];
            var str = '';
            var eventListCodeEach = [];
            var eventListNameEach = [];
            var eventListCodes = '';
            var eventListNames = '';
            $(valueList).each(function(i, val) {
                eventListCodeEach = [];
                eventListNameEach = [];
                $(val.eventList).each(function(i, val) {
                        eventListCodeEach.push(val.code);
                        eventListNameEach.push(val.name);
                    })
                    //console.log(eventListNames,"eventListNames");
                eventListCodes = eventListCodeEach.join(',');
                eventListNames = eventListNameEach.join(',');
                //console.log(eventListNames,"eventListNames@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                var checkLen = eventListNames.length > 12 ? (eventListNames.substr(0, 11) + '...') : eventListNames;
                newList.push({
                    'id': val.id,
                    'name': val.name,
                    'eventList': '<span eventID="' + eventListCodes + '" title="' + eventListNames + '">' + checkLen + '</span>',
                    'act': action,
                    'time1': that.newDates(val.createdTime),
                    'time2': that.newDates(val.modifiedTime)
                });
            })
            return newList;
        },
        this.listEvent = function(currentPage, status, channelName) {
            osIdChange = $('.osCont .selectId').attr('arrt_id');
            var newDef = $.Deferred()
            var jsonPage = {
                osId: osIdChange,
                name: channelName || '',
                pageSize: 10,
                currentPage: currentPage
            }
            that.api.list(jsonPage).then(function(res) {
                that.dom.find('.loading_new').addClass('hide');
                var datas = res.data;
                allPage = datas.totalPage;
                if (res.meta.success == true) {
                    // that.dom.find('.failLoad').addClass('hide');
                    // if (status == true) {
                    //     events.refreshData({
                    //         list: that.changeList(datas.list),
                    //         total: datas.totalPage
                    //     })
                    // } else {
                    //     events.pushData({
                    //         list: that.changeList(datas.list),
                    //         total: res.data.totalPage
                    //     })
                    // }

                    // newDef.resolve();
                    // that.eventFun();
                    if (datas.list.length > 0) {
                        that.dom.find('.dataNone').addClass('hide');
                        that.dom.find('.now').removeClass('hide');
                        if (status == true) {
                            // events.refreshData({
                            //     list: that.changeList(datas.list),
                            //     total: datas.totalPage
                            // })
                            events.setData(that.changeList(datas.list));
                            events.getTotal(datas.totalPage)
                        } else {
                            events.pushData({
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

module.exports = eventsManager;