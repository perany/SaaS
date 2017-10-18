require("../less/tagManager.less")
var breadcrumb = require("../modules/breadcrumb/breadcrumb.js");
var department;
var listModal;
var resolve = $.Deferred()
var resolve1 = $.Deferred()
require.ensure(['../modules/department/department.js'], function(e) {
    department = require('../modules/department/department.js')
    resolve.resolve()
});
require.ensure(['../modules/listModal/input.js'], function(e) {
    listModal = require('../modules/listModal/input.js')
    resolve1.resolve()
});
var deleteCont = require("../modules/delete/delete.js")

function tagManagerIndex() {
    var that = this;
    var departmentCont = null;
    var osId = 1;
    var flag = true;
    var action = {
        edit: { dis: 'inline-block', link: 'noLink' },
        delete: { dis: 'inline-block', link: 'del' }
    };
    var keyName = '';
    var status = 0;
    var currentPage = 1;
    var sort = 'modifiedTime';
    var order = 'DESC';
    var editMore = [];
    var deleteMore = [];
    var listModalCont = null;
    var typeAlert = 'departmentCont'
    var branchJson = {
        brandName: ''
    }
    var modelJson = {
        brandId: '0',
        modelName: ''
    }
    this.complete = function() {
        osId = that.app.model.get('iosId') ? that.app.model.get('iosId') : '1';
        console.log('---', osId);
        this.app.returnRequier([resolve]).done(function() {
            departmentCont = that.app.loadModule(department, that.dom.find('.now'), {
                icon: [{
                        name: '原始标签名称',
                        type: 'txt',
                        icon: 'order',
                        iconText: 'tagName',
                        format: function(value) {
                            return value
                        }
                    },
                    {
                        name: '标签状态',
                        type: 'txt',
                        icon: 'select',
                        format: function(value) {
                            return value
                        }
                    },
                    {
                        name: '关联品牌名称',
                        type: 'txtaction',
                        format: function(value) {
                            return value
                        }
                    },
                    {
                        name: '关联设备型号',
                        type: 'txtaction',
                        format: function(value) {
                            return value
                        }
                    },
                    { name: '操作', type: 'action1' },
                    {
                        name: '更新时间',
                        type: 'date',
                        icon: 'order',
                        iconText: 'modifiedTime',
                        format: function(value) {
                            return value
                        }
                    }
                ],
                jg: [210, 120, 215, 223, 112],
                chose: true,
                chooseName: '序号',
                iconArr: [0, 5],
            })
            departmentCont.event._addEvent('department.initBranch', function(val) {
                typeAlert = 'departmentCont'
                branchJson = {
                    brandName: ''
                }
                that.brandlistDb();
            });
            //根据brandid获取modal列表
            departmentCont.event._addEvent('department.brandid', function(val) {
                typeAlert = 'departmentCont'
                if (val.id && val.id != '0') {
                    modelJson = {
                        brandId: val.id,
                        modelName: ''
                    }
                    that.modellistDb(val.dom, 'nosearch');
                } else {
                    val.dom.addClass('hide');
                    val.dom.empty();
                }
            });
            //根据brandVal获取branch列表
            departmentCont.event._addEvent('department.brandVal', function(val) {
                typeAlert = 'departmentCont'
                branchJson = {
                    brandName: val.name
                }
                that.brandlistDb(val.dom, 'search');
            });
            //根据brandVal获取modal列表
            departmentCont.event._addEvent('department.modelVal', function(val) {
                typeAlert = 'departmentCont'
                modelJson = {
                    brandId: val.brandid,
                    modelName: val.name
                }
                that.modellistDb(val.dom, 'search');
            })
            departmentCont.event._addEvent('department.finish', function(val) {
                var param = val.tagid + ':' + (val.branchid == undefined ? 0 : val.branchid) + ':' + (val.modelid == undefined ? 0 : val.modelid)
                var json = {
                    param: param
                };
                that.updateDb(json);
            });
            departmentCont.event._addEvent('department.paixu', function(val) {
                console.log('00000', val)
                sort = val.sort;
                order = val.order;
                currentPage = 1
                if (sort == 'modifiedTime') {
                    if (order == 'ASC') {
                        order = "DESC";
                    } else {
                        order = "ASC";
                    }
                }
                departmentCont.resetAll();
                that.listDb();
            })
            departmentCont.event._addEvent('department.status', function(val) {
                status = parseInt(val);
                currentPage = 1;
                departmentCont.resetAll();
                that.listDb();
            })
            departmentCont.event._addEvent('department.changePage', function(val) {
                if (parseInt(val) < 1) {
                    currentPage = 1
                } else {
                    currentPage = parseInt(val);
                }
                that.dom.find('.tagBtn').addClass('disBtn');
                that.dom.find('.list-header .check-box').removeClass('choose');
                that.listDb();
            })
            departmentCont.event._addEvent('department.delete', function(val) {
                var json = {
                    ids: val.split(',')[0].replace(/(^\s*)/g, "")
                }
                that.showDel(json)
            })
            departmentCont.event._addEvent('department.getChoose', function(val) {
                editMore = val.edit;
                deleteMore = val.detele;
            })
            $(document).on('click', '.check-box', function() {
                if (that.dom.find('.list-content .choose').length > 0) {
                    that.dom.find('.tagEdit').removeClass('disBtn');
                    that.dom.find('.tagDelete').removeClass('disBtn');
                } else {
                    that.dom.find('.tagEdit').addClass('disBtn');
                    that.dom.find('.tagDelete').addClass('disBtn');
                }
            })
            that.dom.find('.tagEdit').on('click', function() {
                typeAlert = 'listModalCont'
                if (!$(this).hasClass('disBtn')) {
                    listModalCont = that.app.modal(listModal, {
                        data: that.changeList1(editMore),
                        obj: {
                            icon: [{
                                    name: '原始标签名称',
                                    type: 'txt',
                                    format: function(value) {
                                        return value
                                    }
                                },
                                {
                                    name: '标签状态',
                                    type: 'txt',
                                    format: function(value) {
                                        return value
                                    }
                                },
                                {
                                    name: '关联品牌名称',
                                    type: 'txtaction1',
                                    format: function(value) {
                                        return value
                                    }
                                },
                                {
                                    name: '关联设备型号',
                                    type: 'txtaction1',
                                    format: function(value) {
                                        return value
                                    }
                                },
                            ],
                            jg: [130, 70, 190, 190],
                            chose: false,
                            chooseName: '序号',
                            noPage: true
                        }
                    });

                    listModalCont.event._addEvent('listModal.initBranch', function(val) {
                        typeAlert = 'listModalCont'
                        branchJson = {
                            brandName: ''
                        }
                        that.brandlistDb();
                    });
                    //根据brandid获取modal列表
                    listModalCont.event._addEvent('listModal.brandid', function(val) {
                        //console.log('22sssssss3333', val);
                        typeAlert = 'listModalCont'
                        if (val.id && val.id != '0') {
                            modelJson = {
                                brandId: val.id,
                                modelName: ''
                            }
                            that.modellistDb(val.dom, 'nosearch');
                        } else {
                            val.dom.addClass('hide');
                            val.dom.empty();
                        }
                    });
                    //根据brandVal获取branch列表
                    listModalCont.event._addEvent('listModal.brandVal', function(val) {
                        //console.log('22sssssss3333', val);
                        typeAlert = 'listModalCont'
                        branchJson = {
                            brandName: val.name
                        }
                        that.brandlistDb(val.dom, 'search');
                        // brandName = val.name;
                        // that.brandlistDb(val.dom, 'search');
                    });
                    //根据brandVal获取modal列表
                    listModalCont.event._addEvent('listModal.modelVal', function(val) {
                        //console.log('22sssssss3333', val);
                        typeAlert = 'listModalCont'
                        modelJson = {
                            brandId: val.brandid,
                            modelName: val.name
                        }
                        that.modellistDb(val.dom, 'search');
                        // modelName = val.name;
                        // brandId = val.brandid;
                        // that.modellistDb(val.dom, 'search');
                    });
                    //提交
                    listModalCont.event._addEvent('listModal.commit', function(val) {
                        //console.log('22sssssss3333', val);
                        that.dom.find('.list-header .check-box').removeClass('choose');
                        var json = {
                            param: val
                        };
                        that.updateDb(json);
                        that.dom.find('.tagBtn').addClass('disBtn');
                    })
                }
            })
            that.dom.find('.tagDelete').on('click', function() {
                that.dom.find('.list-header .check-box').removeClass('choose');
                if (!$(this).hasClass('disBtn')) {
                    if (deleteMore != '') {
                        var json = {
                            ids: deleteMore
                        }
                        that.showDel(json)
                    }
                    // that.updateDb(json);
                    // that.dom.find('.tagBtn').addClass('disBtn');
                }
            })
            that.dom.find('.searcher a').on('click', function() {
                keyName = that.dom.find('.searchCont').val();
                departmentCont.resetAll();
                currentPage = 1;
                that.listDb();
            })
            that.app.header.setData = function(val) {
                osId = val.osId;
                that.listDb();
            }
        })
        that.listDb();
    }
    this.listDb = function() {
        that.dom.find('.now').addClass('hide');
        that.dom.find('.loading_new').removeClass('hide');
        that.dom.find('.dataNone').addClass('hide');
        that.dom.find('.failLoad').addClass('hide');
        var json = {
            osId: osId,
            pageSize: 10,
            keyName: keyName,
            status: status,
            currentPage: currentPage,
            sort: sort,
            order: order
        }
        that.api.list(json).done(function(res) {
            if (res.meta.success == true) {
                if (res.data.pageCount == 1) {
                    $(".pager-btn-navigate").addClass("hide");
                } else {
                    $(".pager-btn-navigate").removeClass("hide");
                }
                that.app.loading.hide();
                that.dom.find('.loading_new').addClass('hide');
                if (res.data.itemList.length > 0) {
                    //that.brandlistDb();
                    that.dom.find('.dataNone').addClass('hide');
                    that.dom.find('.now').removeClass('hide');
                    departmentCont.setData(that.changeList(res.data.itemList));
                    departmentCont.getTotal(res.data.pageCount);
                    //更新时间 标签默认向上高亮
                    if (flag) {
                        //console.log('9999999999999999', flag)
                        departmentCont.dom.find('.list-header ul').find('li').eq(6).find('i').attr('nowid', '1');
                        departmentCont.dom.find(".list-header ul").find("li").eq(6).find("i").css("background-image", "url(/images/order/up.png)");
                        //console.log('123456654321', departmentCont.dom.find('.list-header ul').find('li').eq(6).find('i').attr('nowid'))
                        flag = false;
                    }
                } else {
                    that.dom.find('.dataNone').removeClass('hide');
                    that.dom.find('.now').addClass('hide');
                }
            } else {
                that.dom.find('.now').addClass('hide');
                that.dom.find('.failLoad').removeClass('hide');
            }
        })
    }
    this.changeList = function(valueList) {
        var newList = [];
        $(valueList).each(function(i, val) {
            newList.push({ 'id': val.id + ',' + val.brandId + ',' + val.modelId, 'tagName': val.tagName, 'status': val.status == -1 ? '未匹配' : '已匹配', 'brandName': val.brandName, 'modelName': val.modelName, 'act': action, time: val.modifiedTime });
        })
        return newList;
    };
    this.changeList1 = function(valueList) {
        var newList = [];
        $(valueList).each(function(i, val) {
            newList.push({ 'id': val.id + ',' + val.brandId + ',' + val.modelId, 'tagName': val.tagName, 'status': val.status == -1 ? '未匹配' : '已匹配', 'brandName': val.brandName, 'modelName': val.modelName, });
        })
        return newList;
    };
    this.brandlistDb = function(dom, type) {
        //console.log('00000000', brandName, dom, branchJson);
        that.api.brandlist(branchJson).then(function(res) {
            if (res.meta.success == true) {
                if (res.data.length > 0) {
                    if (typeAlert == 'departmentCont') {
                        if (type == 'search') {
                            departmentCont.initSelect(res.data, dom, 'branch', 'search');
                            dom.parent().find('.nodata1').addClass('hide');
                        } else {
                            departmentCont.initSelect(res.data, '', 'branch', 'nosearch');
                        }
                        // var allobj = {}
                        // $.each(res.data, function(idx, val) {
                        //     allobj[val.brandName] = val;
                        // })
                        // departmentCont.match(allobj);
                    } else {
                        if (type == 'search') {
                            listModalCont.initSelect(res.data, dom, 'branch', 'search');
                            dom.parent().find('.nodata1').addClass('hide');
                        } else {
                            listModalCont.initSelect(res.data, '', 'branch', 'nosearch');
                        }
                    }
                } else {
                    dom.find('.newselect').empty();
                    dom.addClass('hide');
                    dom.parent().find('.nodataAll').addClass('hide');
                    dom.parent().find('.nodata1').removeClass('hide');
                }
            }
        })
    }
    this.modellistDb = function(dom, type) {
        //console.log('00000', dom, type, modelJson);
        // var json = {
        //     modelName: modelName,
        //     brandId: brandId
        // }
        that.api.modellist(modelJson).then(function(res) {
            if (res.meta.success == true) {
                if (res.data.length > 0) {
                    if (typeAlert == 'departmentCont') {
                        if (type == 'search') {
                            departmentCont.initSelect(res.data, dom, 'model', 'search');
                            dom.parent().find('.nodata1').addClass('hide');
                        } else {
                            departmentCont.initSelect(res.data, '', 'model', 'nosearch');
                        }
                        // var allobj = {}
                        // $.each(res.data, function(idx, val) {
                        //     allobj[val.modelName] = val;
                        // })
                        // departmentCont.match1(allobj);
                    } else {
                        if (type == 'search') {
                            listModalCont.initSelect(res.data, dom, 'model', 'search');
                            dom.parent().find('.nodata1').addClass('hide');
                        } else {
                            listModalCont.initSelect(res.data, '', 'model', 'nosearch');
                        }
                    }
                } else {
                    // if (typeAlert == 'departmentCont') {
                    //     that.dom.find('.' + dom.replace(/(^\s*)/g, "")).find('.newselect').empty();
                    //     that.dom.find('.' + dom.replace(/(^\s*)/g, "")).addClass('hide');
                    //     that.dom.find('.' + dom.replace(/(^\s*)/g, "")).parent().find('.nodataAll').addClass('hide');
                    //     that.dom.find('.' + dom.replace(/(^\s*)/g, "")).parent().find('.nodata1').removeClass('hide');
                    // } else {
                    dom.find('.newselect').empty();
                    dom.addClass('hide');
                    dom.parent().find('.nodataAll').addClass('hide');
                    dom.parent().find('.nodata1').removeClass('hide');
                    //}
                    //that.dom.find('.' + dom.replace(/(^\s*)/g, "")).parent().find('.nodata1').removeClass('hide');
                }
            }
        })
    }
    this.updateDb = function(json) {
        that.api.update(json).then(function(res) {
            if (res.meta.success == true) {
                that.listDb();
            }
        })
    }
    this.deleteDb = function(json) {
        that.api.delete(json).then(function(res) {
            if (res.meta.success == true) {
                that.listDb();
            }
        })
    }
    this.showDel = function(json) {
        deletaMode = this.app.modal(deleteCont, {
            delfun: function() {
                that.deleteDb(json);
                that.dom.find('.tagBtn').addClass('disBtn');
            },
            content: '<p>确定要删除所选标签的关联品牌名称和关联设备型号吗？</p><p>删除后，所选标签的历史数据将不可访问。</p>',
            title: '删除标签',
            css: true
        });
    }
}
module.exports = tagManagerIndex;