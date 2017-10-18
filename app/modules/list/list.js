require("./list.less");
var html = require("./tpl.html");
var resolve = $.Deferred()
var select;
require.ensure(['../newSelect/newSelect.js'], function(e) {
    select = require('../newSelect/newSelect.js')
    resolve.resolve()
});

function index() {
    var that = this
    this.chooseArr = []
    this.choose = true
    this.html = html
    this.data = []
    this.jg = []
    this.icon = []
    this.chooseName = '';
    var selectCont = null;
    // var matchTable = {};
    // var matchTable1 = {};
    this.complete = function() {
        //this.dom.append(html)
        this.jg = this.nowParam.jg
        this.icon = this.nowParam.icon
        this.choose = this.nowParam.chose
        this.chooseName = this.nowParam.chooseName
        this.iconArr = this.nowParam.iconArr;
        initView(this.icon)
    }
    this.getChoose = function() {
        var tt = []
        var newArr = [];
        $.each(this.dom.find('.list-content .check-box'), function() {
            if ($(this).hasClass('choose')) {
                tt.push($(this).parent().attr('nowId'));
                var sta = $(this).parent().parent().children().eq(2).text()
                var sta1 = $(this).parent().parent().children().eq(1).text()
                var aaa = 0;
                if (sta == '未匹配') {
                    aaa = -1
                } else {
                    aaa = 1
                }
                //console.log('sta', sta, sta1)
                var obj = {
                        brandId: $(this).parent().attr('brandid'),
                        brandName: $(this).parent().parent().find('.tagListBranch .tagName').html(),
                        modelId: $(this).parent().attr('modelid'),
                        id: $(this).parent().attr('nowId'),
                        modelName: $(this).parent().parent().find('.tagListModel .tagName').html(),
                        status: aaa,
                        tagName: sta1,

                    }
                    //console.log('stawewcf', obj)
                newArr.push(obj)
            }
        })
        var obj = {
            edit: newArr,
            detele: tt.toString(),
        }
        return obj
    }
    this.setData = function(value) {
        this.data = value
        refreshList()
    }

    function refreshList() {
        var con = '';
        var tempId = '';
        for (var i = 0; i < that.data.length; i++) {
            con += '<div><ul>'
            if (that.choose) {
                if (that.chooseName) {
                    var arr = that.data[i]['id'].split(',');
                    //console.log(',..,.,,,', arr);
                    tempId = arr[0]
                    con += "<li style='width:90px;' nowId='" + arr[0] + "' brandId='" + arr[1] + "' modelId='" + arr[2] + "'><div class='check-box'><span class='listNum'>" + (i + 1) + "</span></div></li>"
                } else {
                    con += "<li style='width:90px;' nowId='" + that.data[i]['id'] + "'><div class='check-box'></div></li>"
                }
            }
            var num = 0
            for (var j in that.data[i]) {
                var width = ''
                if (j != 'id') {
                    if (that.jg[num]) {
                        width = 'style="width:' + that.jg[num] + 'px;"'
                        width1 = 'style="width:' + (that.jg[num] - 10) + 'px;"'
                    }
                    //console.log('0000000', that.icon[num], that.icon, num);
                    switch (that.icon[num].type) {
                        case 'choose':
                            con += "<li class='click-enable' " + width + " nowId='" + that.data[i]['id'] + "'>" + that.icon[num].format(that.data[i][j], that.data[i]['id']) + "</li>"
                            break
                        case 'action':
                            var tempH = '<li class="tableList" ' + width + 'nowId=" ' + that.data[i]['id'] + '">'
                            for (var w in that.data[i][j]) {
                                tempH += '<a class="' + w + '" style="display:' + that.data[i][j][w].dis + '" title="' + (w == 'edit' ? '编辑' : (w == 'view' ? '查看' : '删除')) + '" link="' + that.data[i][j][w].link + '"></a>'
                            }
                            tempH += '</li>'
                            con += tempH
                            break
                        case 'action1':
                            var tempH = '<li class="tableList" ' + width + 'nowId=" ' + that.data[i]['id'] + '">'
                            for (var w in that.data[i][j]) {
                                tempH += '<a class="' + w + '" style="display:' + that.data[i][j][w].dis + '" title="' + (w == 'edit' ? '编辑tag' : (w == 'view' ? '查看tag' : '删除tag')) + '" link="' + that.data[i][j][w].link + '"></a>'
                            }
                            tempH += '<a class="finish hide" style="display:inline-block" title="完成" link="noLink"></a>'
                            tempH += '<a class="cancel hide" style="display:inline-block" title="取消" link="noLink"></a>'
                            tempH += '</li>'
                            con += tempH
                            break
                        case 'txt':
                            if (that.data[i][j] == '未匹配') {
                                con += '<li ' + width + '>' +
                                    '<span style="color:#528fcc">' + that.icon[num].format(that.data[i][j]) +
                                    '</span></li>'
                            } else {
                                //con += "<li " + width + ">" + that.icon[num].format(that.data[i][j]) + "</li>"
                                if (that.jg[num]) {
                                    con += '<li ' + width + '>' +
                                        '<span ' + width1 + ' class="over_css" >' + that.icon[num].format(that.data[i][j]) +
                                        '</span></li>'
                                } else {
                                    con += '<li>' +
                                        '<span ' + width1 + ' class="over_css" >' + that.icon[num].format(that.data[i][j]) +
                                        '</span></li>'
                                }
                            }
                            break
                        case 'date':
                            con += '<li  ' + width + '>' +
                                '<span ' + width1 + ' class="over_css1" >' + that.icon[num].format(that.data[i][j]) +
                                '</span></li>'
                            break
                        case 'txtaction':
                            var arr = that.data[i]['id'].split(',');
                            var textId = arr[0] + j
                            var className = '';
                            var placeName = '';
                            var errorMsg = '';
                            var tempH = '';
                            if (j == 'brandName') {
                                className = 'tagListBranch'
                                placeName = '请选择或输入品牌名称'
                                errorMsg = '品牌名称不能为空,请选择或输入品牌名称'
                                tempH = '<li class="' + className + '" ' + width + ' type="' + textId + '" nowId=' + arr[0] + ' brandId=' + arr[1] + '>'
                            } else {
                                className = 'tagListModel'
                                placeName = '请选择或输入设备型号'
                                errorMsg = '设备型号不能为空,请选择或输入设备型号'
                                tempH = '<li class="' + className + '" ' + width + ' type="' + textId + '" nowId=' + arr[0] + ' modelId=' + arr[2] + '>'
                            }
                            tempH += '<span class="tagName" style="margin-right:15px;">' + that.data[i][j] + '</span>'
                            tempH += '<span class="tagInput hide"><input type="text" placeholder="' + placeName + '"><i class="selectArrow show"></i></span>'
                            tempH += '<span class="newsel hide ' + textId + '"></span>'
                            tempH += '<span class="nodataAll nodata hide">' + errorMsg + '</span>'
                            tempH += '<span class="nodataAll nodata1 hide">无匹配记录，请重新选择</span>'
                            tempH += '<span class="nodataAll nodata2 hide">请输入0-20位中文，字母或数字</span>'
                            tempH += '</li>'
                            con += tempH
                            break;
                        case 'txtaction1':
                            var arr = that.data[i]['id'].split(',');
                            var textId = arr[0] + j
                            var className = '';
                            var placeName = '';
                            var errorMsg = '';
                            var tempH = '';
                            if (j == 'brandName') {
                                className = 'tagListBranch'
                                placeName = '请选择或输入品牌名称'
                                errorMsg = '品牌名称不能为空,请选择或输入品牌名称'
                                tempH = '<li class="' + className + '" ' + width + ' type="' + textId + '" nowId=' + arr[0] + ' brandId=' + arr[1] + '>'
                            } else {
                                className = 'tagListModel'
                                placeName = '请选择或输入设备型号'
                                errorMsg = '设备型号不能为空,请选择或输入设备型号'
                                tempH = '<li class="' + className + '" ' + width + ' type="' + textId + '" nowId=' + arr[0] + ' modelId=' + arr[2] + '>'
                            }

                            //tempH += '<span class="tagName" style="margin-right:15px;">' + that.data[i][j] + '</span>'
                            if (that.data[i][j] == '') {
                                tempH += '<span class="tagInput"><input type="text" placeholder="' + placeName + '"><i class="selectArrowModal show"></i></span>'
                            } else {
                                tempH += '<span class="tagInput"><input type="text" placeholder="' + placeName + '" value="' + that.data[i][j] + '"><i class="selectArrowModal show"></i></span>'
                            }
                            tempH += '<span class="newsel hide ' + textId + '"></span>'
                            tempH += '<span class="nodataAll nodata hide">' + errorMsg + '</span>'
                            tempH += '<span class="nodataAll nodata1 hide">无匹配记录，请重新选择</span>'
                            tempH += '<span class="nodataAll nodata2 hide">请输入0-20位中文，字母或数字</span>'
                            tempH += '</li>'
                            con += tempH
                            break;
                    }
                    num++
                }
            }
            con += '</ul></div>'
        }
        that.dom.find('.list-content').html(con)
        addButton()
    }

    function addButton() {
        that.dom.find('.list-content .check-box').on('click', function() {
            if ($(this).hasClass('choose')) {
                $(this).removeClass('choose')
            } else {
                $(this).addClass('choose')
            }
            var now = false
            $.each(that.dom.find('.list-content .check-box'), function() {
                if (!$(this).hasClass('choose')) {
                    now = true
                }
            })
            if (now) {
                that.dom.find('.list-header .check-box').removeClass('choose')
            } else {
                that.dom.find('.list-header .check-box').addClass('choose')
            }
            //console.log('数据', that.getChoose());
            that.event._dispatch('list.getChoose', that.getChoose())
        })
        that.dom.find('.list-content .click-enable em').on('click', function() {
            that.event._dispatch('list.choose', { id: $(this).parent('li').attr('nowId'), name: $(this).html() })
        })
        that.dom.find('.list-content .tableList .edit').on('click', function() {
            that.app.model.set('listId', $(this).parent().attr('nowId'))
            if ($(this).attr('link') != 'noLink') {
                that.app.changePage($(this).attr('link'))
            }
            if ($(this).attr('title') == '编辑tag') {
                $(this).addClass('hide');
                $(this).parent().find('.delete').addClass('hide');
                $(this).parent().find('.finish').removeClass('hide');
                $(this).parent().find('.cancel').removeClass('hide');
                $(this).parent().parent().parent().find('.tagName').addClass('hide');
                var valbranch = $(this).parent().parent().parent().find('.tagListBranch .tagName').html();
                var valmodel = $(this).parent().parent().parent().find('.tagListModel .tagName').html();
                $(this).parent().parent().parent().find('.tagListBranch .tagInput input').val(valbranch);
                $(this).parent().parent().parent().find('.tagListModel .tagInput input').val(valmodel);
                $(this).parent().parent().parent().find('.tagInput').removeClass('hide');
                //that.event._dispatch('list.initBranch', '');
            }
        });
        that.dom.find('.list-content .tableList .view').on('click', function() {
            that.app.model.set('listId', $(this).parent().attr('nowId'))
            that.app.changePage($(this).attr('link'))
        })
        that.dom.find('.list-content .tableList .delete').on('click', function() {
            that.event._dispatch('list.delete', $(this).parent().attr('nowId'))
        })
        that.dom.find('.tagListBranch .selectArrow').on('click', function() {
            that.dom.find('.tagListBranch .newsel').addClass('hide');
            if ($(this).hasClass('show')) {
                $(this).parent().parent().find('.newsel').removeClass('hide');
                $(this).removeClass('show')
            } else {
                $(this).parent().parent().find('.newsel').addClass('hide');
                $(this).addClass('show')
            }
            that.event._dispatch('list.initBranch', '');
        });
        that.dom.find('.tagListModel .selectArrow').on('click', function() {
            var id = $(this).parent().parent().parent().find('.tagListBranch').attr('brandid');
            var dom = $(this).parent().parent().find('.newsel');
            console.log('0000000', id, dom);
            if (id != '0') {
                that.event._dispatch('list.brandid', { id: id, dom: dom })
                if ($(this).hasClass('show')) {
                    $(this).parent().parent().find('.newsel').removeClass('hide')
                    $(this).removeClass('show')
                } else {
                    $(this).parent().parent().find('.newsel').addClass('hide')
                    $(this).addClass('show')
                }
            }
        })
        that.dom.find('.tagListBranch input').on('input porpertychange', function() {
            $(this).parent().parent().parent().find('.tagListModel input').val('')
            $(this).parent().parent().parent().find('.tagListModel input').attr('value', '')
            $(this).parent().parent().parent().find('.tagListModel').attr('modelid', 0)
            $(this).parent().parent().parent().find('.tagListBranch input').attr('value', '')
            $(this).parent().parent().parent().find('.tagListBranch').attr('brandid', 0)
            if (!that.isTag($(this).val())) {
                $(this).parent().parent().find('.nodataAll').addClass('hide');
                $(this).parent().parent().find('.nodata2').removeClass('hide');
                $(this).parent().parent().find('.newsel').addClass('hide');
                $(this).parent().parent().find('.newsel').empty();
            } else {
                $(this).parent().parent().find('.nodata2').addClass('hide');
                var name = $(this).val()
                var dom = $(this).parent().parent().find('.newsel');
                that.event._dispatch('list.brandVal', { name: name, dom: dom })
            }
        });
        that.dom.find('.tagListModel input').on('input porpertychange', function() {
            $(this).parent().parent().parent().find('.tagListModel input').attr('value', '')
            $(this).parent().parent().parent().find('.tagListModel').attr('modelid', 0)
            if (!that.isTag($(this).val())) {
                $(this).parent().parent().find('.nodataAll').addClass('hide');
                $(this).parent().parent().find('.nodata2').removeClass('hide');
                $(this).parent().parent().find('.newsel').addClass('hide');
                $(this).parent().parent().find('.newsel').empty();
            } else {
                $(this).parent().parent().find('.nodata2').addClass('hide');
                var name = $(this).val()
                var dom = $(this).parent().parent().find('.newsel');
                var brandid = $(this).parent().parent().parent().find('.tagListBranch').attr('brandid');
                that.event._dispatch('list.modelVal', { name: name, dom: dom, brandid: brandid })
            }
        });
        that.dom.find('.finish').on('click', function() {
            var valbranch = $(this).parent().parent().parent().find('.tagListBranch .tagInput input').val();
            var valmodel = $(this).parent().parent().parent().find('.tagListModel .tagInput input').val();
            var branchid = $(this).parent().parent().parent().find('.tagListBranch').attr('brandid')
            var modelid = $(this).parent().parent().parent().find('.tagListModel').attr('modelid')
                //console.log('///', branchid, modelid)
            if (branchid == '0' || modelid == '0') {
                if (branchid == '0') {
                    $(this).parent().parent().find('.tagListBranch .nodataAll').addClass('hide');
                    $(this).parent().parent().find('.tagListBranch .nodata').removeClass('hide');
                } else {
                    $(this).parent().parent().find('.tagListBranch .nodata').addClass('hide');
                }
                if (modelid == '0') {
                    $(this).parent().parent().find('.tagListModel .nodataAll').addClass('hide');
                    $(this).parent().parent().find('.tagListModel .nodata').removeClass('hide');
                } else {
                    $(this).parent().parent().find('.tagListModel .nodata').addClass('hide');
                }
            } else {
                that.dom.find('.nodata').addClass('hide');
                $(this).addClass('hide');
                $(this).parent().find('.delete').removeClass('hide');
                $(this).parent().find('.edit').removeClass('hide');
                $(this).parent().find('.cancel').addClass('hide');
                $(this).parent().parent().parent().find('.tagName').removeClass('hide');
                $(this).parent().parent().parent().find('.tagInput').addClass('hide');
                var tag = $(this).parent().parent().children().eq(0).attr('nowid');
                that.event._dispatch('list.finish', { tagid: tag, branchid: branchid, modelid: modelid })
            }
        })
        that.dom.find('.cancel').on('click', function() {
            $(this).addClass('hide');
            that.dom.find('.nodataAll').addClass('hide');
            $(this).parent().find('.delete').removeClass('hide');
            $(this).parent().find('.edit').removeClass('hide');
            $(this).parent().find('.finish').addClass('hide');
            $(this).parent().parent().find('.newsel').addClass('hide');
            $(this).parent().parent().parent().find('.tagName').removeClass('hide');
            $(this).parent().parent().parent().find('.tagInput').addClass('hide');
            var branchid = $(this).parent().parent().children().eq(0).attr('brandid')
            var modelid = $(this).parent().parent().children().eq(0).attr('modelid')
            $(this).parent().parent().find('.tagListBranch').attr('brandid', branchid)
            $(this).parent().parent().find('.tagListModel').attr('modelid', modelid)
        });
    }

    function initView(value) {
        var iconH = ''
        for (var i = 0; i < value.length; i++) {
            var wd1 = (that.jg[i] - 10) + 'px'
            if (that.jg[i]) {
                if (value[i].icon) {
                    console.log('-------', value[i].name)
                    switch (value[i].icon) {
                        case 'order':
                            iconH += '<li style="width:' + that.jg[i] + 'px">' + value[i].name + '<i nowid="0" class="order-icon" name="' + value[i].iconText + '"></i></li>'
                            break;
                        case 'select':
                            iconH += '<li style="width:' + that.jg[i] + 'px">' + value[i].name + '<i class="selectArrow show"></i><div class="headerselect hide"><span data_id="0">全部</span><span data_id="1">已匹配</span><span data_id="-1">未匹配</span></div>'
                            iconH += '</li>'
                            break;
                    }
                } else {
                    iconH += '<li style="width:' + that.jg[i] + 'px"><span style="width:' + wd1 + '">' + value[i].name + '</span></li>'
                }
            } else {
                if (value[i].icon) {
                    switch (value[i].icon) {
                        case 'order':
                            iconH += '<li>' + value[i].name + '<i nowid="0" class="order-icon" name="' + value[i].iconText + '"></i></li>'
                            break;
                        case 'select':
                            iconH += '<li style="width:' + that.jg[i] + 'px">' + value[i].name + '<i class="selectArrow show"></i><div class="headerselect hide"><span data_id="0">全部</span><span data_id="1">已匹配</span><span data_id="-1">未匹配</span></div>'
                            iconH += '</li>'
                            break;
                    }
                } else {
                    iconH += '<li>' + value[i].name + '</li>'
                }

            }
        }
        that.dom.find('.list-header ul').html(iconH)
        var sort = '';
        var order = '';
        if (that.iconArr) {
            $.each(that.iconArr, function(idx, val) {
                that.dom.find('.list-header ul li').eq(val).on('mouseover', function() {
                    that.resetIcon($(this).find('i'), 'mouseover')
                });
                that.dom.find('.list-header ul li').eq(val).on('mouseout', function() {
                    that.resetIcon($(this).find('i'), 'mouseout')
                });
            });
            that.dom.find('.list-header li').on('click', function() {
                if ($(this).find('i').length > 0 && $(this).find('i').hasClass('order-icon')) {
                    that.dom.find('.list-header .order-icon').not($(this).find('i')).css("background-image", "url(/images/order/no.png)");
                    that.dom.find('.list-header .order-icon').not($(this).find('i')).attr('nowid', '0')
                    sort = $(this).find('.order-icon').attr('name');
                    if ($(this).find('.order-icon').attr('nowid') == '0') {
                        $(this).find('.order-icon').attr('nowid', '1');
                        $(this).find('.order-icon').css("background-image", "url(/images/order/up.png)");
                        order = 'ASC'
                    } else if ($(this).find('.order-icon').attr('nowid') == '1') {
                        $(this).find('.order-icon').attr('nowid', '2')
                        $(this).find('.order-icon').css("background-image", "url(/images/order/down.png)");
                        order = 'DESC'
                    } else {
                        $(this).find('.order-icon').attr('nowid', '1')
                        $(this).find('.order-icon').css("background-image", "url(/images/order/up.png)");
                        order = 'ASC'
                    }
                    that.event._dispatch('list.paixu', { sort: sort, order: order })
                }
            });
        }
        if (that.choose) {
            if (that.chooseName) {
                that.dom.find('.list-header ul').prepend('<li style="width:90px;"><p><span class="check-box"></span>' + that.chooseName + '</p></li>')
            } else {
                that.dom.find('.list-header ul').prepend('<li style="width:90px;"><p><span class="check-box"></span>全选</p></li>')
            }
        }
        that.dom.find('.list-header .check-box').on('click', function() {
            that.dom.find('.list-content .check-box').removeClass('choose')
            if ($(this).hasClass('choose')) {
                $(this).removeClass('choose')
            } else {
                $(this).addClass('choose')
                that.dom.find('.list-content .check-box').addClass('choose')
            }
            that.event._dispatch('list.getChoose', that.getChoose())
        })
        that.dom.find('.list-header .selectArrow').on('click', function() {
            if ($(this).hasClass('show')) {
                $(this).parent().find('.headerselect').removeClass('hide');
                $(this).removeClass('show')
            } else {
                $(this).parent().find('.headerselect').addClass('hide');
                $(this).addClass('show')
            }
        });
        that.dom.find('.headerselect span').on('click', function() {
            $(this).parent().addClass('hide');
            that.event._dispatch('list.status', $(this).attr('data_id'))
        })
    }
    this.initSelect = function(value, dom, type, isShow) {
        var htmls = '<span class="newselect">'
        if (type == 'branch') {
            $(value).each(function(idx, val) {
                htmls += '<li data_name ="' + val.brandName + '" data_id ="' + val.id + '">' + val.brandName + '</li>';
            });
            html += '</span>'
            that.dom.find('.tagListBranch .newsel').html(htmls);
            if (isShow == 'search') {
                dom.removeClass('hide');
            }
            that.dom.find('.tagListBranch .newselect li').on('click', function() {
                $(this).parent().parent().addClass('hide');
                $(this).parent().parent().parent().find('.selectArrow').addClass('show')
                $(this).parent().parent().parent().attr('brandid', $(this).attr('data_id'))
                $(this).parent().parent().parent().find('.tagInput input').val($(this).attr('data_name'))
                $(this).parent().parent().parent().find('.tagInput input').attr('value', $(this).attr('data_name'))
                $(this).parent().parent().parent().find('.nodataAll').addClass('hide');
                $(this).parent().parent().parent().parent().find('.tagListModel input').val('')
                $(this).parent().parent().parent().parent().find('.tagListModel input').attr('value', '');
                $(this).parent().parent().parent().parent().find('.tagListModel').attr('modelid', 0);
            });
        } else {
            $(value).each(function(idx, val) {
                htmls += '<li data_name ="' + val.modelName + '" data_id ="' + val.id + '">' + val.modelName + '</li>';
            });
            html += '</span>'
            that.dom.find('.tagListModel .newsel').html(htmls);
            if (isShow == 'search') {
                dom.removeClass('hide');
            }
            that.dom.find('.tagListModel .newselect li').on('click', function() {
                $(this).parent().parent().addClass('hide');
                $(this).parent().parent().parent().find('.selectArrow').addClass('show')
                $(this).parent().parent().parent().attr('modelid', $(this).attr('data_id'))
                $(this).parent().parent().parent().find('.tagInput input').val($(this).attr('data_name'))
                $(this).parent().parent().parent().find('.tagInput input').attr('value', $(this).attr('data_name'))
                $(this).parent().parent().parent().find('.nodataAll').addClass('hide');
            });
        }
    };
    // this.match = function(value) {
    //     matchTable = value;
    // }
    // this.match1 = function(value) {
    //     matchTable1 = value;
    // }
    this.resetIcon = function(dom, type) {
        if (type == 'mouseover') {
            switch (dom.attr('nowid')) {
                case '0':
                    dom.css("background-image", "url(/images/order/noHover.png)");
                    break;
                case '1':
                    dom.css("background-image", "url(/images/order/upHover.png)");
                    break;
                case '2':
                    dom.css("background-image", "url(/images/order/downHover.png)");
                    break;
            }
        } else {
            switch (dom.attr('nowid')) {
                case '0':
                    dom.css("background-image", "url(/images/order/no.png)");
                    break;
                case '1':
                    dom.css("background-image", "url(/images/order/up.png)");
                    break;
                case '2':
                    dom.css("background-image", "url(/images/order/down.png)");
                    break;
            }
        }
    };
    this.isTag = function(str) {
        var reg = /^[0-9A-Za-z\-.@\u4e00-\u9fa5]{0,20}$/;
        if (reg.test(str)) {
            return true;
        } else {
            return false;
        }
    }
}
//原型链一定要有的
module.exports = index;