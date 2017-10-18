require("./list.less");

/**/
function index() {
    var that = this
    var html = require("./tpl.html");
    var head = require("./listthead.html");
    var body = require("./listbody.html");
    this.chooseArr = []
    this.choose = true
    this.data = []
    this.jg = []
    this.icon = []
    this.onoffId = []
    this.type = ''
    this.onoffState = false;
    this.html = html
    this.complete = function() {
        // this.dom.append(html)
        this.choose = this.nowParam.chose
        this.jg = this.nowParam.jg;
        this.icon = this.nowParam.icon
        this.type = this.nowParam.type;
        this.append = this.nowParam.isAppend;
        //console.log(head)
        that.dom.find('.list-header ul').html(this.app.renderTemplate(head, { icon: this.icon, choose: this.choose }))
        initView(this.choose)
    }
    this.getChoose = function() {
        var tt = [];
        var sendArr = [];
        $.each(this.dom.find('.list-content .check-box'), function() {
            if ($(this).hasClass('choose')) {
                tt.push($(this).parent().parent().parent().attr('nowid'));
            }
        })
        $.each(this.data, function(index, val1) {
            if (tt.indexOf(val1.creative_id) != -1) {
                sendArr.push(val1)
            }
        });
        return sendArr
    };
    this.setData = function(value) {
        console.log('setData', value);
        this.data = value
        if (this.append) {
            console.log('111');
            appendList()
        } else {
            refreshList()
        }
    };
    this.controlAll = function(type, arr) {
        console.log('arr', arr, type);
        this.onoffId = [];
        //this.dom.find('.list-content .choose_onoff label').removeClass('check')
        if (type == 'open') {
            $.each(this.dom.find('.list-content .choose_onoff label'), function() {
                //that.onoffId.push($(this).parent().parent().attr('nowId'))
                if (arr.indexOf($(this).parent().parent().parent().attr('nowId')) != -1) {
                    $(this).addClass('check')
                }
            })
        }
        if (type == 'close') {
            $.each(this.dom.find('.list-content .choose_onoff label'), function() {
                //that.onoffId.push($(this).parent().parent().attr('nowId'))
                if (arr.indexOf($(this).parent().parent().parent().attr('nowId')) != -1) {
                    $(this).removeClass('check')
                }
            })
        }
    }

    this.renderThree = function(value, id) {
        for (var i = 0; i < id.length; i++) {
            var dom = this.dom.find('ul[nowId="' + id[i] + '"]').children('.tableList');
            for (var k in value) {
                switch (k) {
                    case '.bLink':
                        if (value[k] == '') {
                            dom.find('.url1').removeClass('hide')
                            dom.find('.a1').addClass('hide')
                        }
                        break;
                    case '.cLink':
                        if (value[k] == '') {
                            console.log(';;;;')
                            dom.find('.url').removeClass('hide')
                            dom.find('.a2').addClass('hide')
                        }
                        break;
                }
            }
        }
    };

    function loadList() {
        return that.app.renderTemplate(body, {
            list: that.data,
            icon: that.icon,
            type: that.type,
            choose: that.choose
        })
    }
    /*function loadList() {
        var con = '';
        var id = ''
        for (var i = 0; i < that.data.length; i++) {
            if (that.type != undefined) {
                con += '<div><ul style="height:90px">'
            } else {
                con += "<div><ul nowId='" + that.data[i].id + "'>"
            }
            //最前面的checkbox
            if (that.choose == 'all') {
                if (that.type != undefined) {
                    con += "<li style='width:30px;line-height:90pxtext-overflow: ellipsis;overflow: hidden;' nowId='" + that.data[i].id + "'><p><span class='check-box'></span></p></li>"
                } else {
                    con += "<li style='width:30px;text-overflow: ellipsis;overflow: hidden;' nowId='" + that.data[i].id + "'><p><span class='check-box'></span></p></li>"
                }

            }
            console.log(that.data[i])
            //that.data[i] 每个字段前面的名称如 'id';
            //that.icon 放数据的数组，里面是obj
            for (var j in that.icon) {
                var width = ''
                    //if (that.icon[j].w) {
                if (that.icon[j].style) {
                    width = that.icon[j].style
                } else {
                    width = 'style="width:' + that.icon[j].w + 'px;"';
                    //text-overflow: ellipsis;overflow: hidden;display: block;white-space: nowrap;
                    width1 = 'style="text-overflow: ellipsis;overflow: hidden;display: block;white-space: nowrap;width:' + (that.icon[j].w - 20) + 'px;"'
                }
                //}
                // console.log('^^^', that.data[i], i)
                // console.log('***111', that.data[i][j], j)
                switch (that.icon[j].type) {
                    case 'text':
                        if (that.data[i][j] != '' || that.data[i][j] == 0) {
                            con += "<li title = '" + that.data[i][j] + "'  " + width + "><span " + width1 + ">" + that.data[i][j] + "</span></li>"
                        } else {
                            con += "<li  " + width + ">" + '  ' + "</li>"
                        }
                        break
                    case 'first':
                        if (that.data[i][j]) {
                            con += "<li title = '" + that.data[i][j] + "'  " + width + "><span style='width:" + (that.icon[j].w - 30) + "px;margin-left:10px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;'>" + that.data[i][j] + "</span></li>"
                        }
                        break
                    case 'inputLabel':
                        con += "<li  " + width + "><input class='inputcommon' style='margin-left:10px' type='text'  value='" + that.data[i][j] + "' disabled /></li>"
                        break
                    case 'onoff':
                        var styr = that.data[i][j] == 1 ? 'check' : ''
                        if (that.type != undefined) {
                            con += "<li class='click-enable choose_onoff' " + width + " nowId='" + that.data[i].id + "'><span style='position: absolute;top: 35px;'><label class='tgl-btn " + styr + "' for='cb1-1-0'></label></span></li>"
                        } else {
                            con += "<li class='click-enable choose_onoff' " + width + " nowId='" + that.data[i].id + "'><span style='position: absolute;top: 25px;'><label class='tgl-btn " + styr + "' for='cb1-1-0'></label></span></li>"
                        }
                        break
                    case 'choose':
                        var width2 = 'style="text-overflow: ellipsis;overflow: hidden;white-space:nowrap;margin-left:5px;width:' + that.icon[j].w + 'px;"';
                        if (that.choose == 'one') {
                            con += "<li class='click-enable choose_id' " + width2 + " title = '" + that.data[i][j] + "' nowId='" + that.data[i].id + "'>" + that.data[i][j] + "</li>"
                        } else {
                            con += "<li class='click-enable choose_id' " + width2 + " title = '" + that.data[i][j] + "' nowId='" + that.data[i].id + "'>" + that.data[i][j] + "</li>"
                        }
                        break
                    case 'img':
                        con += "<li " + width + "><img src='" + that.data[i][j] + "' style='width: 40px;height: 40px;margin-top: 15px;'></li>"
                        break
                    case 'del':
                        con += "<li id='" + that.data[i][j] + "'><a style='color:red'>删除</a></li>"
                        break
                    case 'action':
                        var width3 = 'style="width:' + that.icon[j].w + 'px;margin-top:5px;"';
                        if (that.data[i][j] != undefined) {
                            var tempH = "<li class='tableList' " + width3 + ">"
                            for (var w = 0; w < that.data[i][j].length; w++) {
                                //console.log('PPPPPP', w)
                                if (w == 0) {
                                    var a = 'style="position: absolute;background: url(/images/iconDmp.png) no-repeat;width: 20px;height: 20px;background-position: -68px -20px;margin-left:11px"'
                                    if (that.data[i][j][w].landing_page_url != '') {
                                        tempH += "<p style='width:300px;line-height: 18px;' title = '" + that.data[i][j][w].landing_page_url + "'><span style='overflow:hidden'>落地页:</span>  <span class='ldyText' style='width:130px'><a class='aLink' style='color:green;text-overflow: ellipsis;overflow: hidden;display: block;white-space:nowrap;' target='_blank' href = '" + that.data[i][j][w].landing_page_url + "'>" + that.data[i][j][w].landing_page_url + "</a></span><i " + a + " class='dymEdit'></i></p>"
                                    } else {
                                        tempH += "<p style='width:300px;line-height: 18px;'><a style='color:green' class='dymEdit'>点击添加落地页地址</a></p>"
                                    }
                                } else if (w == 1) {
                                    var a = 'style="position: absolute;background: url(/images/iconDmp.png) no-repeat;width: 20px;height: 20px;background-position: -68px -20px"'
                                    var b = 'style="position: absolute;background: url(/images/iconDmp.png) no-repeat;width: 20px;height: 20px;background-position: -93px -20px;margin-left:20px"'
                                    if (that.data[i][j][w].c_monitor_url_list == '') {
                                        tempH += "<p style='width:300px;line-height: 18px;' class='clickEdit'><span class='url1'><a class='addCurl' style='color:green'>添加点击监测地址</a></span><span class='a1 hide'><span style='overflow:hidden'>点击地址:</span> <span class='cText' style='width: 130px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;'><a class='bLink' style='color:green' target='_blank'></a></span><i " + a + " class='cEdit'></i><i " + b + " class='cDel'></i></span></p>"
                                    } else {
                                        tempH += "<p style='width:300px;line-height: 18px;' class='clickEdit' title = '" + that.data[i][j][w].c_monitor_url_list + "'><span class='url1 hide'><a class='addCurl' style='color:green'>添加点击监测地址</a></span><span class='a1'><span style='overflow:hidden'>点击地址:</span> <span class='cText' style='width: 130px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;'><a class='bLink' style='color:green' target='_blank' href = '" + that.data[i][j][w].c_monitor_url_list + "'>" + that.data[i][j][w].c_monitor_url_list + "</a></span><i " + a + " class='cEdit'></i><i " + b + " class='cDel'></i></span></p>"
                                    }
                                } else if (w == 2) {
                                    var a = 'style="position: absolute;background: url(/images/iconDmp.png) no-repeat;width: 20px;height: 20px;background-position: -68px -20px"'
                                    var b = 'style="position: absolute;background: url(/images/iconDmp.png) no-repeat;width: 20px;height: 20px;background-position: -93px -20px;margin-left:20px"'
                                    if (that.data[i][j][w].i_monitor_url_list == '') {
                                        tempH += "<p style='width:300px;line-height: 18px;' class='clickEdit'><span class='url'><a class='addIurl' style='color:green'>添加曝光监测地址</a></span><span class='a2 hide'><span style='overflow:hidden'>曝光地址:</span> <span class='pText' style='width: 130px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;'><a class='cLink' style='color:green' target='_blank'></a></span><i " + a + " class='pEdit'></i><i " + b + " class='pDel'></i></span></p>"
                                    } else {
                                        tempH += "<p style='width:300px;line-height: 18px;' title = '" + that.data[i][j][w].i_monitor_url_list + "'><span class='url hide'><a class='addIurl' style='color:green'>添加曝光监测地址</a></span><span class='a2'><span style='overflow:hidden'>曝光地址:</span> <span class='pText' style='width: 130px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;'><a class='cLink' style='color:green' target='_blank' href = '" + that.data[i][j][w].i_monitor_url_list + "'>" + that.data[i][j][w].i_monitor_url_list + "</a></span><i " + a + " class='pEdit'></i><i " + b + " class='pDel'></i></span></p>"
                                    }
                                }

                            }
                            tempH += '</li>'
                            con += tempH
                        }
                        break
                }
            }
            con += '</ul></div>'
        }
        return con;
    }*/

    function refreshList() {
        that.dom.find('.list-content').html(loadList())
        addButton()
    }

    function appendList() {
        that.dom.find('.list-content').append(loadList())
        addButton()
    }

    function addButton() {
        that.dom.find('.list-content .radio-box').on('click', function() {
            that.dom.find('.list-content .radio-box').removeClass('choose')
            $(this).addClass('choose')
        })
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
            that.event._dispatch('list.check.click')
        })
        that.dom.find('.list-content .choose_onoff').on('click', function() {
            var url1 = $(this).parent().children('li:eq(6)').children('p:eq(1)').children('span:eq(1)').find('.a1');
            var c_url = $(this).parent().children('li:eq(6)').children('p:eq(1)').children('span:eq(1)').find('.bLink').html();
            var url2 = $(this).parent().children('li:eq(6)').children('p:eq(2)').children('span:eq(1)').find('.a2');
            var i_url = $(this).parent().children('li:eq(6)').children('p:eq(2)').children('span:eq(1)').find('.cLink').html();
            if ($(this).find('label').hasClass('check')) {
                that.event._dispatch('list.onoff.click', { id: $(this).parent().attr('nowId'), type: 'close', url1: c_url, url2: i_url })
            } else {
                that.event._dispatch('list.onoff.click', { id: $(this).parent().attr('nowId'), type: 'open', url1: c_url, url2: i_url })
            }
        })
        that.dom.find('.list-content .choose_id').on('click', function() {
            that.event._dispatch('list.choose', { id: $(this).parent('ul').attr('nowId') })
        })
        that.dom.find('.list-content .click-enable em').on('click', function() {
            that.event._dispatch('list.choose', { id: $(this).parent('li').attr('nowId'), name: $(this).html() })
        })
        that.dom.find('.list-content .tableList .edit1').on('click', function() {
            that.event._dispatch('list.edit', { id: $(this).attr('nowId'), text: $(this).siblings('.clickEdit').html() })
        })
        that.dom.find('.list-content .tableList .edit2').on('click', function() {
            that.event._dispatch('list.edit', { id: $(this).attr('nowId'), text: $(this).siblings('.clickEdit').html() })
        })
        that.dom.find('.list-content .tableList .view').on('click', function() {
            that.app.model.set('listId', $(this).parent().attr('nowId'))
        })
        that.dom.find('.list-content .tableList .delete').on('click', function() {
            that.event._dispatch('list.delete', $(this).attr('nowId'));
        })
        that.dom.find('.list-content .tableList .delete1').on('click', function() {
            that.event._dispatch('list.delete', $(this).attr('nowId'));
        })
    }

    function initView(value) {
        var iconH = ''
            /* for (var i in value) {
                 //for (var i = 0; i < value.length; i++) {
                 if (value[i].w) {
                     if (value[i].first) {
                         iconH += '<li style="width:' + (value[i].w) + 'px"><span style="margin-left:10px">' + value[i].name + '</li>'
                     } else {
                         iconH += '<li style="width:' + value[i].w + 'px">' + value[i].name + '</li>'
                     }
                 } else {
                     iconH += '<li>' + value[i].name + '</li>'
                 }
             }
             that.dom.find('.list-header ul').html(iconH)*/
        if (value == 'all') {
            // that.dom.find('.list-header ul').prepend('<li style="width:30px;"><p><span class="check-box"></span></p></li>')
            that.dom.find('.list-header .check-box').on('click', function() {
                that.dom.find('.list-content .check-box').removeClass('choose')
                if ($(this).hasClass('choose')) {
                    $(this).removeClass('choose')
                } else {
                    $(this).addClass('choose')
                    that.dom.find('.list-content .check-box').addClass('choose')
                }

            })
        }
    };
}
//原型链一定要有的
module.exports = index;
