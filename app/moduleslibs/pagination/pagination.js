require("./pagination.less");

function index() {
    // var pagination = {}
    var html = require("./tpl.html");
    this.total = 0
    this.pageId = 1
    this.both = true
    this.page = true
    this.dom = null
    this.html=html
    var that = this
    this.complete = function() {
        //this.dom.append(html)
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

    function initView() {
        that.dom.find('.pager-btn-jump .pager-num1').val(that.pageId + '/' + that.total)
        openBtn()
    }

    function openBtn() {
        if (that.total == 1) {
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
    /* function initView() {
         pagination.dom.find('.num_content').html('')
         var contentH = ''
         var newA = getArr()
         pagination.dom.find('.num_content').css('width',newA.length*30)
         for (var i = 0; i < newA.length; i++) {
             var className = ''
             if (newA[i] == pagination.pageId) {
                 className = 'choose'
             }
             contentH += '<p class="' + className + '">' + newA[i] + '</p>'
         }
         pagination.dom.find('.num_content').html(contentH)
         pagination.dom.find('.num_content p').on('click', function() {
             pagination.pageId=$.trim($(this).html())*1
             initView()
             wEvent._dispatch('pagination.changePage',pagination.pageId)
         })
     }
     function getArr() {
         var returnA = []
         if (pagination.total < 5) {
             for (var i = 0; i < pagination.total; i++) {
                 returnA.push((i + 1))
             }
         } else {
             var pianyi = 0
             for (var j = 0; j < 5; j++) {
                 var num = pagination.pageId + j - 2
                 if (j == 0) {
                     if (num < 0) {
                         pianyi = Math.abs(pagination.pageId + j - 2) + 1
                     }
                     if(num>pagination.total-5){
                         pianyi=-(num+5-pagination.total-1)
                     }
                 }
                 num += pianyi
                 returnA.push(num)
             }
         }
         return returnA
     }*/
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
                    that.pageId = ((that.pageId + 1) < that.total) ? that.pageId + 1 : that.total
                    break
            }
            initView()
            that.event._dispatch('pagination.changePage', that.pageId)
        })
        that.dom.find('.pager-btn-jump input').keyup(function(e) {
            if (String(e.which) == '13') {
                if ($(this).val()) {
                    if (Number($.trim($(this).val())) < that.total) {
                        that.pageId = $.trim($(this).val())
                        that.event._dispatch('pagination.changePage', that.pageId)
                        initView()
                        return
                    }
                }
                $(this).blur()
                initView()
            }
        })
        that.dom.find('.pager-btn-jump input').focus(function() {
            that.dom.find('.pager-btn-jump input').val(that.pageId)
        })
        that.dom.find('.pager-btn-jump input').blur(function() {
            initView()
        })
    }
}
//原型链一定要有的
module.exports = index;
