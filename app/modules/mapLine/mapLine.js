require("./mapLine.less")
function index() {
    var that = this;
    this.setData = function(value) {
        this.data = value;
        that.renderingLine();
    };
    this.renderingLine = function(){
        that.dom.empty();
        var html='';
        var leng=that.data.length>10?10:that.data.length;
        for(var i=1;i<=leng;i++){
            html += '<li><i>' + i + '</i><em>' + that.data[i-1].demension + '</em><div class="speed"><span class="sp1"></span><span class="sp2" style="width:' + that.data[i-1].percentage + '%"></div><span class="sp3">' + Tool.moneyFormat(that.data[i-1].percentage) + '%</span></li>';
        }
        that.dom.append(html);
    }

}
module.exports = index;