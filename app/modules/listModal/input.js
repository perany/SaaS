require("./input.less");
var html = require("./input.html")
var department;
var resolve = $.Deferred()
require.ensure(['../department/department.js'], function(e) {
    department = require('../department/department.js')
    resolve.resolve()
});

function input() {
    var that = this;
    this.html = html;
    var departmentCont = null;
    this.complete = function() {
        //console.log('///////', that.nowParam)
        this.app.returnRequier([resolve]).done(function() {
            departmentCont = that.app.loadModule(department, that.dom.find('.body'), that.nowParam.obj);
            departmentCont.setData(that.nowParam.data);
            departmentCont.event._addEvent('department.search', function(val) {
                //console.log('9998888', val, val.dom.indexOf('brandName') != -1);
                that.event._dispatch('listModal.search', val);
            })
            departmentCont.event._addEvent('department.brandId', function(val) {
                //console.log('223333', val);
                that.event._dispatch('listModal.brandId', val);
            });
            that.dom.find('.tagListBranch .selectArrowModal').on('click', function() {
                that.dom.find('.tagListBranch .newsel').addClass('hide');
                if ($(this).hasClass('show')) {
                    $(this).parent().parent().find('.newsel').removeClass('hide')
                    $(this).removeClass('show')
                } else {
                    $(this).parent().parent().find('.newsel').addClass('hide')
                    $(this).addClass('show')
                }
                that.event._dispatch('listModal.initBranch', '');
            });
            that.dom.find('.tagListModel .selectArrowModal').on('click', function() {
                that.dom.find('.tagListModel .newsel').addClass('hide');
                var id = $(this).parent().parent().parent().find('.tagListBranch').attr('brandid');
                var dom = $(this).parent().parent().find('.newsel');
                console.log('0000000', id, dom);
                if (id != '0') {
                    that.event._dispatch('listModal.brandid', { id: id, dom: dom })
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
                    that.event._dispatch('listModal.brandVal', { name: name, dom: dom })
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
                    that.event._dispatch('listModal.modelVal', { name: name, dom: dom, brandid: brandid })
                }
            });
        })
        this.dom.find('.cancelBtn').on('click', function() {
            that.close();
        });
        this.dom.find('.cancel').on('click', function() {
            that.close();
        });
        this.dom.find('.ok').on('click', function() {
            var dom = that.dom.find('.list-content div')
            var str = '';
            var num = 0;
            $.each(dom, function(index) {
                var param = '';
                var tagid = $(this).find('.tagListBranch').attr('nowid')
                var branchid = parseInt($(this).find('.tagListBranch').attr('brandid'))
                var modelid = parseInt($(this).find('.tagListModel').attr('modelid'))
                if (branchid == 0) {
                    $(this).find('.tagListBranch .nodataAll').addClass('hide');
                    $(this).find('.tagListBranch .nodata').removeClass('hide');
                    num++
                } else {
                    $(this).find('.tagListBranch .nodata').addClass('hide');
                }
                if (modelid == 0) {
                    $(this).find('.tagListModel .nodataAll').addClass('hide');
                    $(this).find('.tagListModel .nodata').removeClass('hide');
                    num++
                } else {
                    $(this).find('.tagListModel .nodata').addClass('hide');
                }
                if (branchid != 0 && modelid != 0 && tagid != '') {
                    param = tagid + ':' + branchid + ':' + modelid;
                }
                if (index == 0) {
                    str += param
                } else {
                    str += ',' + param
                }
            })
            if (num == 0) {
                that.event._dispatch('listModal.commit', str)
                that.close();
            }
        });

    };
    this.initSelect = function(value, dom, type, isShow) {
        //console.log('//////', dom, type, isShow)
        that.dom.find('.newsel').empty();
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
    }
    this.isTag = function(str) {
        var reg = /^[0-9A-Za-z\-.@\u4e00-\u9fa5]{0,20}$/;
        if (reg.test(str)) {
            return true;
        } else {
            return false;
        }
    }
    this.match = function(value) {
        //departmentCont.match(value)
    }

}

//原型链一定要有的
module.exports = input;