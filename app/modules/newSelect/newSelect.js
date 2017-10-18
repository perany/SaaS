require("./newSelect.less");
var html = require("./newSelect.html");


function index() {
    var that = this;
    var data = [];
    this.html = html;
    this.complete = function() {
        data = that.nowParam.data;
        that.appendSelect();
    };
    // this.btn = function() {
    //     that.dom.find('.selectCont1').on('change', function() {
    //         var id = that.dom.find('.selectCont1').find("option:selected").attr('data_id');
    //         var name = that.dom.find('.selectCont1').find("option:selected").attr('data_name');
    //         var type = that.dom.find('.selectCont1').find("option:selected").attr('type');
    //         var title = that.dom.find('.title').html();
    //         //console.log('000');
    //         that.event._dispatch('select.id', { name: name, id: id, title: title, type: type });
    //     });
    // }
    this.appendSelect = function() {
        if (data.length > 0) {
            var htmls = '';
            that.dom.find(".newselect").empty();
            //console.log('00000', data);
            $(data).each(function(idx, val) {
                htmls += '<li data_name ="' + val.brandName + '" data_id ="' + val.id + '" >' + val.brandName + '</option>'
            });
            htmls += '';
            that.dom.find(".newselect").html(htmls);
        } else {
            that.dom.find(".newselect").empty();
            that.dom.find(".newselect").html('<option></option>');
        }
        that.dom.find('.newselect li').on('click', function() {
            //$(this).parent().parent().addClass('hide');
            console.log('mmmmm', $(this).html());
            //$(this).parent().parent().parent().find('input').val($(this).html())
            that.event._dispatch('newSelect.data', { name: $(this).html(), id: $(this).attr('data_id'), dom: $(this) })
        });
    };
}

module.exports = index;