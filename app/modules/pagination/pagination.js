require("./pagination.less");
var html = require("./tpl.html");

function index() {
    // var pagination = {}
    this.total = 0
    this.pageId = 1
    this.both = true
    this.page = true
    this.dom = null
    this.html = html;
    var that = this
    this.complete = function() {
        // this.dom.append(html)
        this.dom.find('.btn').css('display', 'table-cell')
        this.total = this.nowParam.total
        initView()
        addButton()
    }
    this.resetAll = function(value) {
        //console.log(value)
        this.pageId = 1
        this.total = value
        initView()
    }
    this.getTotal = function(val) {
        this.total = val;
        initView()
    };

    function initView() {
        that.dom.find('.pager-btn-jump .pager-num1').val(that.pageId + '/' + that.total)
        openBtn()
    }

    function openBtn() {
        if (that.total == 1 || (that.total == 0)) {
            that.dom.find('.pager-btn-navigate a').removeClass('disable')
            that.dom.find('.pager-btn-navigate a').addClass('disable')
            return
        }
        that.dom.find('.pager-btn-navigate a').removeClass('disable')
        if (that.pageId == that.total) {
            that.dom.find('.pager-btn-navigate .pager-last').addClass('disable')
            that.dom.find('.pager-btn-navigate .pager-next').addClass('disable')
            return
        }
        if (that.pageId == 1) {
            that.dom.find('.pager-btn-navigate .pager-first').addClass('disable')
            that.dom.find('.pager-btn-navigate .pager-prev').addClass('disable')
            return
        }

    }

    function addButton() {
        that.dom.find('.pager-btn-navigate a').on('click', function() {
            var className = String($(this).attr('class'))
            if (className.lastIndexOf('disable') != -1) {
                return
            }
            switch ($(this).attr('class')) {
                case "pager-first":
                    that.pageId = 1
                    break
                case "pager-last":
                    that.pageId = that.total
                    break
                case "pager-prev":
                    that.pageId = ((that.pageId - 1) > 0) ? that.pageId - 1 : 1
                    break
                case "pager-next":
                    that.pageId = ((parseInt(that.pageId) + 1) < that.total) ? (parseInt(that.pageId) + 1) : that.total
                    break
            }
            initView()
            that.event._dispatch('pagination.changePage', that.pageId)
        })
        that.dom.find('.pager-btn-jump input').on('blur', function() {
            if ($(this).val()) {
                if (Number($.trim($(this).val())) <= that.total) {
                    if ($(this).val() < 1) {
                        that.pageId = $.trim(1)
                    } else {
                        that.pageId = $.trim($(this).val())
                    }
                    that.event._dispatch('pagination.changePage', that.pageId)
                    initView()
                    return
                } else {
                    that.pageId = $.trim(that.total)
                    that.event._dispatch('pagination.changePage', that.total)
                    initView()
                    return
                }
            }
            //$(this).blur()
            initView()
        })
        that.dom.find('.pager-btn-jump input').focus(function() {
            that.dom.find('.pager-btn-jump input').val(that.pageId)
            console.log('bbbbbbbbbbbb',that.dom.find('.pager-btn-jump input').val(that.pageId));
        })
        that.dom.find('.pager-btn-jump input').blur(function() {
            initView()
        })
    }
}
//原型链一定要有的
module.exports = index;