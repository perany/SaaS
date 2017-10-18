require("./breadcrumb.less");
var html = require("./tpl.html");

function breadcrumb() {
    var self = this;
    var list = [];
    // list = {
    //     iconPos: [x, y], // icon位置
    //     list: [
    //         {
    //           text: '',  // 文字导航
    //           link: ''  // 跳转链接
    //           param: {}  // 跳转参数
    //         },
    //         {
    //           text: ''
    //         }
    //     ]
    // }
    this.html = html;
    this.complete = function() {
        //self.dom.html(html);
        self.fill(self.nowParam);
        list = self.nowParam.list;
        self.dom.find('.breadcrumb a').on('click', function() {
            if ($(this).attr('link') != undefined) {
                self.app.changePage($(this).attr('link'))
            }
        })
    }

    this.fill = function(linkList) {
        var temp = '';
        if (linkList.iconPos != undefined) {
            temp = '<i class="icon" style="background-position: ' + linkList.iconPos[0] + 'px ' + linkList.iconPos[1] + 'px"></i>';
        }
        var list = linkList.list;
        for (var i = 0, length = list.length; i < length; i++) {
            if (list[i].link != undefined) {
                temp += '<li class="' + (i === length - 1 ? 'active' : '') + '"><a style="cursor:pointer;color:#3f82d5" link="' + list[i].link + '">' + list[i].text + '</a></li>';
            } else {
                temp += '<li class="' + (i === length - 1 ? 'active' : '') + '"><a style="cursor:default">' + list[i].text + '</a></li>';
            }
        }
        self.dom.find('.breadcrumb').html(temp);
    }

}
module.exports = breadcrumb;