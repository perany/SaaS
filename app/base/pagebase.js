function pagesBase() {
    var that = this
    this.app = null
    this.dom = $('#content #right-content')
    this.init = function(app, api, dom) {
        that.app = app
        that.api = api || null
        that.dom = dom || $('#content #right-content')
        that.complete()
    }
    this.complete = function() {

        },

        //获取昨天今天明天数据
        this.GetDateStr = function(AddDayCount) {
            var dd = new Date();
            dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
            var y = dd.getFullYear();
            var m = dd.getMonth() + 1; //获取当前月份的日期
            var d = dd.getDate();
            return y + "/" + m + "/" + d;
        },
        //6-20个匹配中文 数字和小数点
        this.isNumNew = function(str) {
            var reg = /^\d+(\.\d+)?$/;
            var reg1 = /.*\..*/; //是否有小数点
            if (reg.test(str)) {
                var s, t;
                if (reg1.test(str)) {
                    var aa = str.split('.');
                    s = aa[0];
                    t = aa[1];
                    if (t.length <= 2) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    s = str;
                }
                if (s.length <= 8) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },

        //匹配字母
        this.isLetter = function(str) {
            var reg = /^[A-Za-z]+$/;
            if (reg.test(str)) {
                return true;
            } else {
                return false;
            }
        },

        //6-20个匹配中文 数字和小数点
        this.isNum = function(str) {
            var reg = /^\d+(\.\d+)?$/;
            if (reg.test(str)) {
                return true;
            } else {
                return false;
            }
        },

        //匹配URL
        this.isURL = function(str) {
            var reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;
            if (reg.test(str) && str.length < 100) {
                return true;
            } else {
                return false;
            }
        }

    //0-20个匹配中文 数字 字母 下划线
    this.isEvent = function(str) {
            var reg = /^[\w\u4e00-\u9fa5]+$/gi;
            var len = str.replace(/[^x00-xFF]/g, '**').length;
            if (reg.test(str) && len <= 20 && len >= 0) {
                return true;
            } else {
                return false;
            }
        },
        //0-20个匹配中文 数字 字母 下划线
        this.isName = function(str) {
            var reg = /^[0-9a-zA-Z\.@#\$%\^&\*\(\)\[\]\\?\\\/\|\-~`\+\=\,\r\n\:\'\"]*$/g;
            var len = str.replace(/[^x00-xFF]/g, '**').length;
            if (reg.test(str) && len <= 20 && len > 0) {
                return true;
            } else {
                return false;
            }
        },
        this.checkNum = function(obj) {
            var reg = /^[0-9]*$/;
            obj = obj.trim();
            if (reg.test(obj)) {
                return true;
            } else {
                return false;
            }
        },
        /**
         * 转化年月日时分秒
         */
        this.newDates = function(nS) {
            var time = new Date(nS);
            var y = time.getFullYear();
            var m = time.getMonth() + 1;
            var d = time.getDate();
            var h = time.getHours();
            var mm = time.getMinutes();
            var s = time.getSeconds();
            return y + '-' + base.add0(m) + '-' + base.add0(d) + ' ' + base.add0(h) + ':' + base.add0(mm) + ':' + base.add0(s);
        },
        this.dispose = function() {

        }

}

module.exports = pagesBase;