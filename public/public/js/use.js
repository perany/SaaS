var help_hasinit = "true";
var ios_hasinit = "false";
var and_hasinit = "false";
var allTop = []
$(function() {
    var viewH = $(window).height();
    complete();

    function complete() {
        init();
        change();
        $('.right').css({
            'width': $('#header').width() - 323
        })
        $('.titleName').eq(0).css(
            'color', '#ffd200'
        )

        $(window).scroll(function() {
            var viewH = $(window).height();
            var scrollTop = $(window).scrollTop();
            if (scrollTop > viewH) {
                $('.backTop').addClass('pointer');
                $('.backTop').attr('src', '../../images/backTop1.png');
                $('.backTop').on('click', function() {
                    $(window).scrollTop(0);
                    $('.left21').attr('src', '../../images/radio1.png');
                    $('.left a').removeClass('set3');
                    $('.left').find('.second1').eq(0).addClass('set3');
                    $('.le').addClass('hide');
                    $('.le').eq(0).removeClass('hide');
                })
            } else {
                $('.backTop ').attr('src', '../../images/backTop2.png');
                $('.backTop').unbind('click');
                $('.backTop').removeClass('pointer');
            }
        });


    }

    function init() {
        $.ajax({
            url: '/public/js/api/useCon.json',
            type: "GET",
            dataType: "json",
            success: function(value) {
                getList(value);
            },
            error: function() {}
        });
    }

    function Android_init() {
        $.ajax({
            url: '/public/js/api/Android.json',
            type: "GET",
            dataType: "json",
            success: function(value) {
                getList_Andriod(value);
            },
            error: function() {}
        });
    }

    function ios_init() {
        $.ajax({
            url: '/public/js/api/ios.json',
            type: "GET",
            dataType: "json",
            success: function(value) {

                getList_ios(value);
            },
            error: function() {}
        });
    }

    function change() {
        $('.titleName').eq(0).on('click', function() {
            $('.change').addClass('hide');
            $('.help').removeClass('hide');
            if (help_hasinit == "false") {
                help_hasinit = "true";
                init();
            }
            $('.titleName').css('color', '#fff');
            $(this).css('color', '#ffd200');
            $('.line').addClass('hide');
            $(this).siblings('div').removeClass('hide');
        })
        $('.titleName').eq(1).on('click', function() {
            $('.change').addClass('hide');
            $('.ios').removeClass('hide');
            $('.titleName').css('color', '#fff');
            $(this).css('color', '#ffd200');
            if (ios_hasinit == "false") {
                ios_hasinit = "true";
                ios_init();
            }
            $('.line').addClass('hide');
            $(this).siblings('div').removeClass('hide');
        })
        $('.titleName').eq(2).on('click', function() {
            $('.change').addClass('hide');
            $('.android').removeClass('hide');
            $('.titleName').css('color', '#fff');
            $(this).css('color', '#ffd200');
            if (and_hasinit == "false") {
                and_hasinit = "true";
                Android_init();
            }
            $('.line').addClass('hide');
            $(this).siblings('div').removeClass('hide');
        })
    }

    function getList(res) {
        var total = 0
        var defnum = 0
        $('.left a').hover(function() {
            $(this).addClass('set2');
        }, function() {
            $(this).removeClass('set2');
        })
        $('.increaseContent').html('')
        var htmlRes = {}
        $.each(res, function(key, val) {
            total++
            htmlRes[key] = { html: '' }
            var html = '<div class="cont1" attr_id="' + val[0].id + '">';
            var def = getTemplate(0, val, html)
            def.done(function(reHtml) {
                htmlRes[key].html = reHtml + '</div>'
                defnum++
                if (defnum == total) {
                    for (var i in htmlRes) {
                        $('.increaseContent').append(htmlRes[i].html)
                    }
                }
                //$('.increaseContent').append(res);
            })
        });


        $('.left23').on('click', function() {
            $('.le').addClass('hide');
            $(this).siblings('.le').removeClass('hide');
        });
    }
    $('.help .left a').unbind('click').on('click', function() {
        $('.left23').removeClass('set3');
        $('.second2 a').removeClass('set3');
        $(this).addClass('set3');
        var chooseNav = $(this).attr('data_id')
        getOffset('help');
        var topNum = null
        $.each(allTop, function(i, val) {
            if (chooseNav == val.id) {
                topNum = val.topLen
            }
        })
        if (topNum != null) {
            $(window).scrollTop(topNum)
        }

    })

    function getOffset(value) {
        allTop = [];
        var doms = $('.'+value+' .cont1');
        var doms1 = $('.'+value+' .titleTwo');
        var doms2 = $('.'+value+' .titleThree');
        var doms3 = $('.'+value+' .titleFour');
        var topNum = null
        $.each(doms1, function(i) {
            var he = {
                "id": $(doms1[i]).attr('id'),
                'topLen': $(doms1[i]).offset().top
            }
            allTop.push(he);
        })
        $.each(doms2, function(i) {
            ///console.log($(doms2[i]).offset().top)
            var he = {
                "id": $(doms2[i]).attr('id'),
                'topLen': $(doms2[i]).offset().top
            }
            allTop.push(he);
        })
        $.each(doms3, function(i) {
            var he = {
                "id": $(doms3[i]).attr('id'),
                'topLen': $(doms3[i]).offset().top
            }
            allTop.push(he);
        })
        $.each(doms, function(i) {
            var he = {
                "id": $(doms[i]).attr('attr_id'),
                'topLen': $(doms[i]).offset().top
            }
            allTop.push(he);
        })
        //console.log('ppppppppppp', allTop)

    }

    function getList_ios(res) {
        var total = 0
        var defnum = 0
        var htmlRes = {}
        $('.left23').hover(function() {
            $(this).addClass('set2');
        }, function() {
            $(this).removeClass('set2');
        })
        $('ul li').hover(function() {
            $(this).addClass('set2');
        }, function() {
            $(this).removeClass('set2');
        })
        $('.left23').on('click', function() {

            $('.left23').removeClass('set3');
            $('.second1').removeClass('set3');
            $(this).addClass('set3');
        });
        $('.contIos').html('');
        $.each(res, function(key, val) {
            total++;
            htmlRes[key] = { html: '' };
            var html = '<div class="cont1" attr_id="' + val[0].id + '">' + '</div>';
            //var htmla = require('../../template/' + val[0].list);
            var def = getTemplate(0, val, html)
            def.done(function(res) {
                htmlRes[key].html = res + '</div>';
                defnum++;
                if (defnum == total) {
                    for (var i in htmlRes) {
                        $('.contIos').append(htmlRes[i].html);
                    }
                }
            })
        });
        $('.left23i').on('click', function() {
            $('.lei').addClass('hide');
            $(this).siblings('.lei').removeClass('hide');
        });
    }
    $('.ios .left a').unbind('click').on('click', function() {
        $('.left23').removeClass('set3');
        $('.second1').removeClass('set3');
        $(this).parent('.second1').addClass('set3');
        var chooseNav = $(this).attr('data_id');
        var doms = $('.cont1');
        var topNum = null
        getOffset('ios');
        $.each(allTop, function(i, val) {
                if (chooseNav == val.id) {
                    topNum = val.topLen
                }
        })
       // console.log('909090', topNum);
        if (topNum != null) {
            $(window).scrollTop(topNum)
        }
    })

    function getList_Andriod(res) {
        var total = 0
        var defnum = 0
        var htmlRes = {}
        $('.left23').hover(function() {
            $(this).addClass('set2');
        }, function() {
            $(this).removeClass('set2');
        })
        $('ul li').hover(function() {
            $(this).addClass('set2');
        }, function() {
            $(this).removeClass('set2');
        })
        $('.left23').on('click', function() {
            $('.left23').removeClass('set3');
            $('.second1').removeClass('set3');
            $(this).addClass('set3');
        });
        $('.contAndroid').html('');
        $.each(res, function(key, val) {
            total++;
            htmlRes[key] = { html: '' };
            var html = '<div class="cont1" attr_id="' + val[0].id + '">';
            //var htmla = require('../../template/' + val[0].list);
            var def = getTemplate(0, val, html)
            def.done(function(res) {
                htmlRes[key].html = res + '</div>';
                defnum++;
                if (defnum == total) {
                    for (var i in htmlRes) {
                        $('.contAndroid').append(htmlRes[i].html);
                    }
                }

            })
        });
        $('.left23i').on('click', function() {
            $('.lei').addClass('hide');
            $(this).siblings('.lei').removeClass('hide');
        });
    }
    $('.android .left a').unbind('click').on('click', function() {
        $('.left23').removeClass('set3');
        $('.second1').removeClass('set3');
        $(this).parent('.second1').addClass('set3');
        var chooseNav = $(this).attr('data_id');
        var doms = $('.cont1');
        var topNum = null
        getOffset('android');
        $.each(doms, function(i) {
            var he = {
                "id": $(doms[i]).attr('attr_id'),
                'topLen': $(doms[i]).offset().top
            }
            allTop.push(he);
        })
        $.each(allTop, function(i, val) {
            if (chooseNav == val.id) {
                topNum = val.topLen
            }
        })
        if (topNum != null) {
            $(window).scrollTop(topNum)
        }
    })

    function getTemplate(i, list, html) {
        var deferred = $.Deferred()
        $.get('/template/' + list[i].list, function(res) {
            html += res;
            if (i < list.length - 1) {
                var def = getTemplate(i++, list, html)
                def.done(function(value) {
                    deferred.resolve(value)
                })
            } else {
                deferred.resolve(html)
            }
        })
        return deferred
    }
})
