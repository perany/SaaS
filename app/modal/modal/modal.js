require("./modal.less");
var html = require("./tpl.html")

function modal() {
    var that = this;
    this.html = html;
    this.body = '';
    this.dom = '';
    this.sure = function() {
        that.returnBack()
        that.hide();
    }
    this.complete = function() {
        that.body = that.dom.find('.modal-body');
        that.dom.find('.btn-cancel, .modal-close').on('click', function() {
            that.hide();
        });
        that.dom.find('.btn-confirm').on('click', function() {
            that.sure();
        })
    }
    this.show = function(value) {
        //console.log('OOOOO', value);
        var code;
        var hint = '';
        if (value.msg) {
            //switch (value.msg) {

            // case -1:
            //     hint = '系统错误！';
            //     break;
            // case -100100:
            //     if (value.msg) {
            //         hint = value.msg
            //     } else {
            //         hint = '输入格式错误，请重新输入！'
            //     }
            //     break;
            // case -100101:
            //     if (value.msg) {
            //         hint = value.msg
            //     } else {
            //         hint = '输入逻辑错误，请重新输入！'
            //     }
            //     break;
            // case -100102:
            //     hint = '广告主已关闭,请先开启广告主开关！'
            //     break;
            // case -100103:
            //     hint = '合约已关闭,请先开启合约开关！'
            //     break;
            // case -100104:
            //     hint = '关联方案已关闭,请先开启方案开关！'
            //     break;
            // case -100105:
            //     hint = '该素材已有平台送审通过，不可以修改！'
            //     break;
            // case -100200:
            //     hint = '服务端错误！'
            //     break;
            // case -100201:
            //     if (value.msg) {
            //         hint = value.msg
            //     } else {
            //         hint = '系统错误！'
            //     }
            //     break;
            // case -100300:
            //     if (value.msg) {
            //         hint = value.msg
            //     } else {
            //         hint = '数据库读写错误！'
            //     }
            //     break;
            // case -100301:
            //     hint = '数据库没有记录！'
            //     break;
            // case -100302:
            //     hint = '已有相同的广告主名称存在！'
            //     break;
            // case -100303:
            //     hint = '同一广告主中已存在相同的合约名称！'
            //     break;
            // case -100304:
            //     hint = '同一合约中已存在相同的方案名称！'
            //     break;
            // case -100305:
            //     hint = '同一广告主下素材名称不可重复！'
            //     break;
            // case -100306:
            //     hint = '该方案关联素材数目已达上限(40)！'
            //     break;
            // case -100307:
            //     hint = '素材已有送审记录，不可重复送审！'
            //     break;
            // case -100308:
            //     hint = '该方案与素材已提交送审，不可解除关联！'
            //     break;
            // case -100309:
            //     hint = '该方案与素材已提交送审，不可修改！'
            //     break;
            // case -100310:
            //     hint = '修改的字段与已有记录重复！'
            //     break;
            // case -100400:
            //     hint = '用户认证失败！'
            //     break;
            // case -100500:
            //     hint = '后台服务繁忙,请稍后再试！'
            //     break;
            //}
            hint = value.msg;
            that.dom.find('.modal-title').text('提示');
            that.dom.find('.modal-body').html('<p>' + hint + '</p>');
        } else {
            that.dom.find('.modal-title').text(value.title || '');
            that.dom.find('.modal-body').html(value.template || '');
        }!value.close && that.dom.find('.modal-close').remove();
        if (value.hide) {
            that.dom.find('.btn-cancel').hide()
        }
        if (value.sure && value.sure instanceof Function) {
            this.sure = value.sure;
        } else {
            this.sure = function() {
                that.hide();
            }
        }
        that.dom.show();
    }
    this.openUP = function() {
        this.dom.css('z-index', 9000)
    }
    this.returnBack = function() {
        this.dom.css('z-index', 1000)
    }
    this.hide = function() {
        that.dom.hide();
    }
}
//原型链一定要有的
module.exports = modal;