$(document).ready(function () {
    var year = (new Date()).getFullYear();
    var month = ('0' + ((new Date()).getMonth() * 1)).slice(-2);
    var viewH = $(window).height();
    var allTop = [];
    complete();
    function complete() {
        /*$('.year-tab').on('change', function() {
            year = $(this).find("option:selected").attr('value');
            getMonth();
            $('.scrollContent').html('')
            initData();
        });*/
        initData();
        getMonth();
        $('.right').css(
            'height', $('.left').height() * 3
        )
        $(window).scroll(function() {
            // 当滚动到最底部时， 加载新内容
            var viewH = $(window).height(); //可见高度
            var rightH = $('#versionNew').height() + $('#header').height() + $('#footer').height()+65; //右侧高度
            var contentH = $('.scrollContent').height(); //内容高度
            var scrollTop = $(window).scrollTop(); //滚动高度
            if (Math.abs(scrollTop - (rightH - viewH)) <= 10 && contentH - scrollTop > viewH) {
                $('.loadMore').removeClass('hide');
                $('.loadMore').on('click', function() {
                    var nowVer = $('#versionNew').height()
                    if (contentH - nowVer > 3 * viewH) {
                        $('#versionNew').height(nowVer + 3 * viewH)
                    } else {
                        $('#versionNew').height(contentH + 100)
                    }
                    $('.left').height($('#versionNew').height() + 20)
                    $('.right').height($('#versionNew').height());
                    $('.right .connn').height($('#versionNew').height() - 100);
                })
            } else {
                console.log('隐藏')
                $('.loadMore').addClass('hide');
            }
            if (scrollTop > viewH) {
                $('.backTop').attr('src', '../images/backTop1.png');
                $('.backTop').css({
                    'cursor': 'pointer'
                });
                $('.backTop').on('click', function() {
                    $(window).scrollTop(0);
                    selChangeFun();
                })
            } else {
                $('.backTop').attr('src', '../images/backTop2.png');
                $('.backTop').unbind('click');
            }
        });
    }
    function getMonth() {
        $.ajax( {
            url:'/public/js/api/versionNew1.json',
            data:{
            },
            type:'get',
            dataType:'json',
            success:function(data) {
                leftMenu(data);
            },
            error : function() {
            }
        });
    }
    function initData() {
         $.ajax( {
             url:'/public/js/api/versionNew.json',
             data:{
             },
             type:'get',
             dataType:'json',
             success:function(data) {
                 rightContent(data);
             },
             error : function() {
             }
         });
    }
    function leftMenu(res) {
        var html = '';
        $.each(res[year].id.reverse(), function(idx, val) {
            if (idx == res[year].id.length - 1) {
                html +=
                    '<li month_id=' + val.id + '>' +
                    '<span class="circle"></span>' +
                    '<span class="lineRow"></span>' +
                    '<span class="monthName">' + parseInt(val.id.toString()) + '月' + '</span>' +
                    '</li>';
            } else if (idx == 0) {
                html +=
                    '<li month_id=' + val.id + '>' +
                    '<span class="circle" style="background: url(/images/blueCir.png)"></span>' +
                    '<span class="lineRow"></span>' +
                    '<span class="monthName select">' + parseInt(val.id.toString()) + '月' + '</span>' +
                    '</li>';
                html += '<li><span class="lineCol"></span></li>'
            } else {
                html +=
                    '<li month_id=' + val.id + ' >' +
                    '<span class="circle"></span>' +
                    '<span class="lineRow"></span>' +
                    '<span class="monthName">' + parseInt(val.id.toString()) + '月' + '</span>' +
                    '</li>';
                html += '<li><span class="lineCol"></span></li>'
            }
        });
        $('.month').html(html);
        month = $('.left .month .select').parent().attr('month_id');
        $('.month li').on('click', function() {
            $('.month .monthName').removeClass('select');
            $('.month .circle').css({
                'background': 'url(/images/blueCir2.png)'
            });
            $(this).children('.circle').css({
                'background': 'url(/images/blueCir.png)'
            });;
            $(this).children('.monthName').addClass('select');
            month = $(this).attr('month_id');
            changeHeightFun();
        });
        changeHeightFun();
        $('.month li').on('mouseover', function() {
            $(this).children('.circle').css({
                'background': 'url(/images/blueCir.png)'
            });
            $(this).children('.monthName').addClass('select');
        }).on('mouseout', function() {
            if (month !== $(this).attr('month_id')) {
                $(this).children('.circle').css({
                    'background': 'url(/images/blueCir2.png)'
                });;
                $(this).children('.monthName').removeClass('select');
            }
        })
        changeHeightFun();
    }
    function rightContent(res) {
        var endData={}
        var total=0
        var defnum=0
        $.each(res, function(idx, value) {
                endData[idx]={}
                total++
            if (value[0].id.lastIndexOf($('.year-tab').val()) != -1) {
                var html='<ul class="cont1" attr_id="' + value[0].id + '">';
                var def = getTemplate(1,value,html)
                def.done(function(res){
                    res += '</ul>';
                    endData[idx].html=res
                    defnum++
                    if(defnum==total){
                        var endHtml=''
                        for(var i=0;i<12;i++){
                            var time=$('.year-tab').val()+'-'+(('0'+(12-i)).slice(-2))
                            if(endData[time]){
                                endHtml+=endData[time].html
                            }
                        }
                        viewAllNode(endHtml)
                    }
                })
            }
        });
    }
    function viewAllNode(html){
        $('.scrollContent').html(html);

        allTopFun();
        $('#versionNew').height(viewH * 3)
        $('.left').height($('#versionNew').height())
        $('.right').css({
            'height':$('#versionNew').height(),
            'width': $('#versionNew').width()-233
        })
        $('.right .connn').height($('#versionNew').height() - 80);
    }

    function getTemplate(i,list,html){
        var deferred=$.Deferred()
        if(list.length>1) {
            $.get('/template/'+ list[i].list, function (res) {
                html += '<li class="contentLi">' + '<span class="version">' +  list[i].date +' - '+  list[i].version + '升级日志</span>' + '<p>' + res + '</p></li>';
                if(i<list.length-1){
                    var a=i+1
                    var def=getTemplate(a,list,html)
                    def.done(function(html){
                        deferred.resolve(html)
                    })
                }else{
                    deferred.resolve(html)
                }
            })
        }else {
            html += ''
            deferred.resolve(html);
        }
        return deferred
    }
    function allTopFun() {
        var doms = $('.cont1');
        $.each(doms, function(i) {
            var he = {
                "id": $(doms[i]).attr('attr_id'),
                'topLen': i == 0 ? 0 : $(doms[i]).offset().top - $(doms[0]).offset().top + 80
            }
            allTop.push(he);
        })
    }
    function changeHeightFun() {
        var chooseDate = year + '-' + month;
        var topNum = null
        $('.connn').removeAttr('style')
        $.each(allTop, function(i, val) {
            if (chooseDate == val.id) {
                var nowH = val.topLen + 3 * viewH
                nowH = nowH > $('.connn').height() ? ($('.connn').height() + 20) : nowH
                $('#versionNew').height(nowH + 100)
                $('.left').height($('#versionNew').height() + 20)
                $('.right').height($('#versionNew').height())
                $('.right .connn').height($('#versionNew').height() - 100);
                console.log('qqqqqqqqq',$('.left').height(), $('.right').height(), $('.right .connn').height());
                topNum = val.topLen
            }
        })
        if (topNum != null) {
            $(window).scrollTop(topNum)
        }
    }
    function selChangeFun() {
        var doms = $('.cont1');
        year = $(doms[0]).attr('attr_id').slice(0, 4);
        $('#year').val(year);
        getMonth();
    }
})