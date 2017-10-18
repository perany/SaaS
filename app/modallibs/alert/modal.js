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
        //console.log('----', value);

        // console.log('ppp', value);
        if (value.sure && value.sure instanceof Function) {
            this.sure = value.sure;
            that.dom.find('.btn-cancel').removeClass('hide');
            that.dom.find('.modal-title').text(value.title);
            that.dom.find('.modal-body').html(value.template);
        } else {
            that.dom.find('.btn-cancel').addClass('hide');
            that.dom.find('.modal-title').text(value.title || '提示');
            that.dom.find('.modal-body').html('<p>' + value.msg + '</p>');
        }

        // var code;
        // var hint = '';
        // if (value.msg) {
        //     hint = value.msg;
        //     that.dom.find('.modal-title').text('提示');
        //     that.dom.find('.modal-body').html('<p>' + value.msg + '</p>');
        // } else {
        //     that.dom.find('.modal-title').text(value.title || '');
        //     that.dom.find('.modal-body').html(value.template || '');
        // }!value.close && that.dom.find('.modal-close').remove();
        // if (value.hide) {
        //     that.dom.find('.btn-cancel').hide()
        // }
        // if (value.sure && value.sure instanceof Function) {
        //     this.sure = value.sure;
        // } else {
        //     this.sure = function() {
        //         that.hide();
        //     }
        // }
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