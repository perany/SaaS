require("./header.less")
var html = require("./tpl.html");
var api = require("../../api/login.api.js");
var _Object
var headerOperating;

function header() {
    headerOperating = '123445'
        // var this=that
    _Object = this
    this.html = html
    this.complete = function() {
        _Object.initHeader();
        //写自己的代码
        //console.log(this.dom,this);
        this.dom.find('.header-mask').on('click', function() {
            console.log('oooo', _Object.dom.find('.useHelpCont'));
            _Object.dom.find('.useHelpCont').addClass('hide');
            _Object.dom.find('.header-mask').addClass('hide');
        })
        this.dom.find('.headerCont .fr .useIcon').on('click', function() {
            if (_Object.dom.find('.useHelpCont').hasClass('hide')) {
                _Object.dom.find('.header-mask').removeClass('hide');
                _Object.dom.find('.useHelpCont').removeClass('hide');
            } else {
                _Object.dom.find('.header-mask').addClass('hide');
                _Object.dom.find('.useHelpCont').addClass('hide');
            }
        });
        this.dom.find('.nameCont #out').on('click', function() {
            //_Object.app.local.clearAll()
            api.logout().then(function(res) {
                if (res.meta.success == true) {
                    _Object.app.local.del('accountId', 'all')
                        //_Object.app.local.del('userName', 'all')
                    _Object.app.local.del('session', 'all')
                    _Object.app.local.del('name', 'all')
                    _Object.app.local.del('userId', 'all')
                        // _Object.app.menu.restetMenu()
                    _Object.app.changePage('login')
                }
            });
        })
        if (_Object.app.local.get('name')) {
            $('.names').text(base64.decode(_Object.app.local.get('name')));
        }
        /*this.dom.find('.headerCont .fr .icon').on('click', function() {
              if ($('.nameCont1').hasClass('hide')) {
                  $('.nameCont1').removeClass('hide');
              } else {
                  $('.nameCont1').addClass('hide');
              }
          });

           $('.click_i').on('click', function() {
              $('.menu1 li').removeClass('select');
              _Object.app.changePage($(this).attr('link'));
              
              $('.ver').addClass('hide');
          });*/
    }
    this.initHeader = function() {
        if (_Object.app.local.get('name')) {
            this.dom.find('.names').text(base64.decode(_Object.app.local.get('name')));
        }
        _Object.eventFun();
        _Object.systerms();

    }
    this.eventFun = function() {
        this.dom.find('.loginName').unbind('click').click(function() {
            $('.layer-cover').removeClass('hide');
            clickTag($(this));
            $('.layer-cover').unbind('click').click(function() {
                if (!$('.loginName').find('p').hasClass("hide"))
                //alert(0)
                {
                    //alert(1);
                    $('.loginName').find('p').addClass("hide");
                    $(this).addClass('hide');
                };
            })
        })

        this.dom.find('.os').unbind('click').click(function() {
                $('.layer-cover').removeClass('hide');
                clickTag($(this));
                $('.layer-cover').unbind('click').click(function() {
                    if (!$('.os').find('p').hasClass("hide")) {
                        $('.os').find('p').addClass("hide");
                        $(this).addClass('hide');
                    };
                })
            })
            // this.dom.find('.useHelp').unbind('click').click(function() {
            //     $('.layer-cover').removeClass('hide');
            //     clickTag($(this));
            //     $('.layer-cover').unbind('click').click(function() {
            //         if (!$('.useHelp').find('p').hasClass("hide")) {
            //             $('.useHelp').find('p').addClass("hide");
            //             $(this).addClass('hide');
            //         };
            //     })
            //     $('.click_i').on('click', function() {
            //         $('.useHelp').find('p').addClass("hide");
            //     });
            // })
    }
    this.changeTitle = function(value, type) {
        if (type == "crumbs") {
            var el = this.dom.find('.titleName span')
            var html = makeHtml(el, value)
            this.dom.find('.titleName').html(html)
            this.dom.find('.titleName span').on('click', clickFun)
        } else {
            this.dom.find('.titleName').html(value)
        }

    }

    function clickFun() {
        var cid = $(this).attr('cid')
        if ($(this).index() != 0) {
            var elmd = _Object.dom.find('.titleName span')
            elmd.splice(($(this).index() * 1 + 1))
            var html = makeHtml(elmd, [])
            _Object.dom.find('.titleName').html(html)
            _Object.dom.find('.titleName span').on('click', clickFun)
            _Object.event._dispatch('header.click', cid)
        }
    }

    function clickTag(a) {
        if (a.find('p').hasClass('hide')) {
            a.find('p').removeClass('hide');
        } else {
            a.find('p').addClass('hide');
            $('.layer-cover').addClass('hide');
        }
    }

    function makeHtml(value, value1) {
        var zy = ['一', '二', '三', '四', '五', '六', '七', '八']
        var obj1 = []
        $.each(value, function() {
            var nowIcon = {}
            nowIcon.cid = $(this).attr('cid')
            nowIcon.html = $.trim($(this).html())
            obj1.push(nowIcon)
        })
        var obj = []
        obj = obj1.concat(value1)
        var html = ''
        var shuj = 0
        $.each(obj, function() {
            html += '<span cid="' + this.cid + '">' + this.html + '</span>>'
            if (String(this.cid) != 'null') {
                shuj++
            }
        })
        html += (zy[shuj] + "级部门")
        return html
    }
    this.reset = function() {
        // _Object.dom.find('.osCont a').removeClass('selectId');
        // $('.osCont a:eq(0)').addClass('selectId');
        // $('.osName').text('ios');
        // _Object.event._dispatch('header.osId', { osId: '1' })
        _Object.systerms();
    }
    this.systerms = function() {
        var dataPara = {
            type: 'os'
        };
        $.ajax({
            url: '/saas-dmp/dictionary/valueList',
            type: "GET",
            dataType: 'json',
            data: _Object.app.format(dataPara),
            success: function(res) {
                var htmls = '';
                if (res.meta.success == true && res.data != '') {
                    $('.osCont').empty();
                    $('#appInstristing').empty();
                    $(res.data).each(function(i, val) {
                        htmls += '<a arrt_id="' + val.typeCode + '">' + val.typeName + '</a>';
                    })
                    $('.osCont').append(htmls);
                    _Object.eventFun();
                    $('.osCont a:eq(0)').addClass('selectId');
                    _Object.app.model.set('iosId', $('.osCont .selectId').attr('arrt_id'))
                    $('.osName').text('ios');
                    _Object.dom.find('.osCont a').on('click', function() {
                        _Object.dom.find('.osCont a').removeClass('selectId');
                        $(this).addClass('selectId');
                        _Object.dom.find('.osName').html($(this).html());
                        console.log('ooooooooo', $(this).attr('arrt_id'))
                        _Object.app.model.set('iosId', $('.osCont .selectId').attr('arrt_id'))
                        _Object.event._dispatch('header.osId', { osId: $(this).attr('arrt_id') })
                        _Object.setData({ osId: $(this).attr('arrt_id') })
                    })
                }
            }
        });
    };
    this.setData = function(val) {
        console.log('llllll', val);
    }

}
//原型链一定要有的
module.exports = header;