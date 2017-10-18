require("./select.less");
var html = require("./select.html");


function index() {
    var that = this;
    this.data = '';
    this.html = html;
    this.complete = function() {
        //this.dom.append(html);
        this.data = this.nowParam.data;
        this.title = this.nowParam.title == undefined ? '' : this.nowParam.title;
        this.firstSelect = this.nowParam.firstSelect;
        this.disable = this.nowParam.disable;
        this.icon = this.nowParam.icon;
        //console.log('^^^', this.nowParam.firstSelect);
        this.initview();
        this.btn();
        var title = that.dom.find('.title').html();
        // console.log("aaaaaa"+title);
        // that.dom.find(".usageAnalysis1 .left_title .left1").html(title);
    };
    this.initview = function() {
        this.dom.find('.title').html(this.title);
        if (this.icon == '日历') {
            that.dom.find('.select_icon').addClass('select_can')
        } else {
            that.dom.find('.select_icon').addClass('selectArrow2')
        }
        that.appendSelect();
    }
    this.btn = function() {
        that.dom.find('.selectCont1').on('change', function() {
            var id = that.dom.find('.selectCont1').find("option:selected").attr('data_id');
            var name = that.dom.find('.selectCont1').find("option:selected").attr('data_name');
            var type = that.dom.find('.selectCont1').find("option:selected").attr('type');
            var title = that.dom.find('.title').html();
            //console.log('000');
            that.event._dispatch('select.id', { name: name, id: id, title: title, type: type });
        });
    }
    this.dealData = function() {

    }
    this.refreshData = function(data) {
        //console.log('ooooooooo', data);
        if (data.length > 0) {
            var htmls = '';
            if (this.firstSelect != undefined) {
                htmls += '<option data_id ="-1" type="-1">' + this.firstSelect + '</option>';
            }
            $(data).each(function(idx, val) {
                var num = idx + 1
                var st = '';
                var et = '';
                if(val.startDate){
                    st = val.startDate
                }
                if(val.startTime){
                    st = val.startTime
                }
                if(val.endDate){
                    et = val.endDate
                }
                if(val.endTime){
                    et = val.endTime
                }
                htmls += '<option data_name ="' + val.name + '" data_id ="' + val.id + '" type ="' + num + '" start ="' + st + '" end ="' + et + '"   >' + val.name + '</option>';
            });
            that.dom.find(".selectCont1").html(htmls)
        }
    }
    this.appendSelect = function() {
        if (this.data.length > 0) {
            var htmls = '';
            that.dom.find(".selectCont1").empty();
            if (this.firstSelect != undefined) {
                htmls += '<option data_id ="" type="0">' + this.firstSelect + '</option>';
            }
            $(this.data).each(function(idx, val) {
                var num = idx + 1
                if (this.disable) {
                    if (val.id * 1 < 56 || val.id * 1 > 115) {
                        htmls += '<option style="#000000" data_name ="' + val.name + '" data_id ="' + val.id + '" >' + val.name + '</option>';
                    } else {
                        htmls += '<option style="color:#ccc" data_name ="' + val.name + '" data_id ="' + val.id + '" disabled>' + val.name + '</option>';
                    }
                } else {
                    if (val.select) {
                        htmls += '<option selected="selected" data_name ="' + val.name + '" data_id ="' + val.id + '" type ="' + num + '"  >' + val.name + '</option>';

                    } else {
                        htmls += '<option data_name ="' + val.name + '" data_id ="' + val.id + '" type ="' + num + '" start ="' + val.startDate + '" end ="' + val.endDate + '"  >' + val.name + '</option>';
                    }
                }
            });
            that.dom.find(".selectCont1").html(htmls);

        } else {
            that.dom.find(".selectCont1").empty();
            that.dom.find(".selectCont1").html('<option></option>');
        }
    };
    this.refreshSelect = function() {
        that.dom.find('.selectCont1 option').attr('selected', false);
        that.dom.find('.selectCont1 option').eq(0).attr('selected', true);
    }
}

module.exports = index;