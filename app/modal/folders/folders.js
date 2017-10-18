require("./folders.less");

function modal() {
    var html = require("./tpl.html")
    var html1 = require("./nowvalue.html")
        //var floderschoose=reuqire("../folderschoose/folderschoose.js")
    var that = this;
    var dataSure = {}
    this.html = html;
    this.body = '';
    this.dom = '';

    this.complete = function() {
        that.body = that.dom.find('.modal-body');
        that.body.find('.folder-choose').on('click', function() {
            that.event._dispatch("folders.choose")
                // that.app.loadModal()
        })
        that.dom.find('.btn-cancel, .modal-close').on('click', function() {
            that.hide();
        });
        that.dom.find('.btn-confirm').on('click', function() {
            var endDate = Tool.verify(that.dom.find('.modal-body'))
            var newDate = {}
            for (var i in endDate) {
                if (typeof endDate[i] == 'object' && !endDate[i].length) {
                    for (var j in endDate[i]) {
                        newDate[j] = endDate[i][j]
                    }
                } else {
                    newDate[i] = endDate[i]
                }
            }
            if (endDate) {
                that.event._dispatch("folders.confirm", newDate)
            }
        })
        that.dom.find('.now-select').change(function() {
            $(this).parent().find('input[type=text]').val($(this).find("option:selected").text())
            $(this).parent().find('input[type=hidden]').val($(this).val())
            if($(this).val()){
                that.event._dispatch('folders.change')
            }
        })
        
    }
    this.getData = function() {
        var data = {}
        $.each(that.dom.find('.modal-body input[type=hidden]'), function() {
            data[$(this).attr('name')] = $(this).val()
        })
        return data
    }
    this.addValue = function(value) {
        var choosevalue=','
        this.dom.find('.modal-body .newV').remove()
        this.dom.find('.input-group[name=dis]').find('input').val('')
        this.dom.find('.modal-body').append('<div class="newV"></div>')
        this.dom.find('.modal-body .newV').html(this.app.renderTemplate(html1, { list: value }))
        this.dom.find('.modal-body .newV input').on('click', function() {
            if($(this).is(":checked")){
                choosevalue+=$(this).attr('dataName')+','
            }else{
                choosevalue=choosevalue.replace(','+$(this).attr('dataName')+',',',')
            }
            var nowC=choosevalue.substr(1,choosevalue.length-2)
            that.dom.find('.input-group[name=dis]').find('input').val(nowC)
        })
    }
    this.show = function(value) {

    }
    this.data = function() {
        // return { cubeId: cubeName: }
    }
    this.hide = function() {
        that.dom.hide();
    }
}
//原型链一定要有的
module.exports = modal;
