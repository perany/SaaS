(function ($) {
	$.fn.pager = function (option) {
		//检查插件正确性
		if ($.fn.pager.author != "baldyellow") {
			throw "This pager plugin may not work.";
		}
		//合并配置
		var finalOption = $.extend(true, {}, $.fn.pager.defaultOption, option);
		//矫正配置
		finalOption = $.fn.pager.correctOption(finalOption);
		//检查并加载样式表
		finalOption.checkStyleSheet && $.fn.pager.checkStyleSheet(finalOption);
		//遍历每个容器
		$(this).each(function (idx, elm) {
			//对当前分页的引用
			var $this;
			//初始化分页元素
			function pagerInit() {
				$this = $("<div></div>", {"class": "pager-div"}).on("click.pager", ".pager-btn", function () {
					if ($(this).hasClass("disabled") || !finalOption.currReload && $(this).hasClass("active")) {
						return;
					}
					pageGo($(this).html());
				}).on("click.pager", ".pager-first", function () {
					var $firstBtn = $this.find(".pager-btn").first();
					if ($firstBtn && !$firstBtn.hasClass("disabled") && !$firstBtn.hasClass("active")) {
						pageGo($firstBtn.html());
					}
				}).on("click.pager", ".pager-last", function () {
					var $lastBtn = $this.find(".pager-btn").last();
					if ($lastBtn && !$lastBtn.hasClass("disabled") && !$lastBtn.hasClass("active")) {
						pageGo($lastBtn.html());
					}
				}).on("click.pager", ".pager-prev", function () {
					var currPage = parseInt($this.find(".pager-btn").filter(".active").html());
					if (currPage > 1) {
						pageGo(currPage - 1);
					}
				}).on("click.pager", ".pager-next", function () {
					var currPage = parseInt($this.find(".pager-btn").filter(".active").html());
					if (currPage < $this.children(".pager-total-page").children(".pager-num").html()) {
						pageGo(currPage + 1);
					}
				}).on("click.pager", ".pager-jump", function () {
					var regExp = /^[1-9]\d*$/,
						pageNum = $this.find(".pager-btn-jump").find(".pager-num").val(),
						totalPage = $this.find(".pager-total-page").find(".pager-num").html();
					if (regExp.test(pageNum) && parseInt(pageNum) <= totalPage) {
						pageGo(pageNum);
					} else {
						pageGo(1);
					}
				}).on("blur.pager", ".pager-num", function () {
					//-----------------------*********  此方法是新增的，失焦时提交    ********------------------------
					var regExp = /^[1-9]\d*$/,
						pageNum = $this.find(".pager-btn-jump").find(".pager-num").val(),
						totalPage = $this.find(".pager-total-page").find(".pager-num").html();
					if (regExp.test(pageNum) && parseInt(pageNum) <= totalPage) {
						pageGo(pageNum);
					} else {
						//pageGo(1);      //这里随意，我个人比较喜欢不做处理，当然具体还是看业务要求
					}
				}).on("keydown.pager", ".pager-num", function (event) {
                    event=document.all?window.event:event;
                    if((event.keyCode||event.which)==13){
                        var regExp = /^[1-9]\d*$/,
                            pageNum = $this.find(".pager-btn-jump").find(".pager-num").val(),
                            totalPage = $this.find(".pager-total-page").find(".pager-num").html();
                        if (regExp.test(pageNum) && parseInt(pageNum) <= totalPage) {
                            pageGo(pageNum);
                            $('.pager-num').blur();
                        } else {
                            //pageGo(1);
                        }
                    }
                });;
				$("<a></a>", {"class": "pager-first","title":"首页"}).html(finalOption.text.first).
					add($("<a></a>", {"class": "pager-prev"}).html(finalOption.text.prev)).
					add($("<a></a>", {"class": "pager-next"}).html(finalOption.text.next)).
					add($("<a></a>", {"class": "pager-last","title":"末页"}).html(finalOption.text.last)).
					appendTo($("<div></div>", {"class": "pager-btn-navigate"}).appendTo($this));
				$("<span></span>").html("共").
					add($("<span></span>").addClass("pager-num").html(0)).
					add($("<span></span>").html("页")).
					appendTo($("<div></div>", {"class": "pager-total-page"}).appendTo($this));
				$("<span></span>").html("共").
					add($("<span></span>").addClass("pager-num").html(0)).
					add($("<span></span>").html("条")).
					appendTo($("<div></div>", {"class": "pager-total-data"}).appendTo($this));
				$("<span></span>").html("").
					add("<input>", {"class": "pager-num", "type": "text"}).
					add($("<span></span>",{"class": "total-pagers"}).html("")).
					//add($("<a></a>", {"class": "pager-jump"}).html(finalOption.text.jump)).
					appendTo($("<div></div>", {"class": "pager-btn-jump"}).appendTo($this));
				$(elm).append($this);
				pageGo(finalOption.initPageNum);
			}
			//重置分页元素
			function pagerReset() {
				$this.find(".pager-btn, .pager-ellipsis").remove().end().
					find(".pager-num").html("");
			}
			//更新分页元素
			function pagerUpdate(currPage, totalPage, totalNum) {
				var $tempContainer = $("<div></div>");
				if (finalOption.style != "stepping") {
					$tempContainer = pagerUpdate.ellipsis(currPage, totalPage, $tempContainer);
				} else if (finalOption.style == "stepping") {
					$tempContainer = pagerUpdate.stepping(currPage, totalPage, $tempContainer);
				}
				$tempContainer.children().insertAfter($this.find(".pager-prev"));
				$this.find(".pager-first, .pager-prev, .pager-next, .pager-last").removeClass("disable").
					filter(".pager-first, .pager-prev").addClass(currPage == 1 ? "disable" : "").end().
					filter(".pager-next, .pager-last").addClass(currPage == totalPage ? "disable" : "");
				$this.children(".pager-total-page").children(".pager-num").html(totalPage).end().
					siblings(".pager-total-data").children(".pager-num").html(totalNum || 0);
			}
			pagerUpdate.ellipsis = function (currPage, totalPage, $tempContainer) {
				var extension = finalOption.extension;
				$("<a></a>", {"class": "pager-btn" + (currPage == 1 ? " active" : "")}).html(1).appendTo($tempContainer);
				currPage - extension > 1 + 1 && $("<span></span>", {"class": "pager-ellipsis"}).html("...").appendTo($tempContainer);
				var i,
					pageStart = Math.max(1 + 1, currPage - extension),
					pageEnd = Math.min(currPage + extension, totalPage - 1);
				for (i = pageStart; i <= pageEnd; ++i) {
					$("<a></a>", {"class": "pager-btn" + (i == currPage ? " active" : "")}).html(i).appendTo($tempContainer);
				}
				currPage + extension < totalPage - 1 && $("<span></span>", {"class": "pager-ellipsis"}).html("...").appendTo($tempContainer);
				totalPage > 1 && $("<a></a>", {"class": "pager-btn" + (currPage == totalPage ? " active" : "")}).html(totalPage).appendTo($tempContainer);
				return $tempContainer;
			};
			pagerUpdate.stepping = function (currPage, totalPage, $tempContainer) {
				var stride = finalOption.stride;
				var i,
					pageStart = Math.floor(currPage / stride) + 1,
					pageEnd = Math.min(pageStart + stride, totalPage);
				for (i = pageStart; i <= pageEnd; ++i) {
					$("<a></a>", {"class": "pager-btn" + (i == currPage ? " active" : "")}).html(i).appendTo($tempContainer);
				}
				return $tempContainer;
			};
			//隐藏分页元素
			function pagerHide() {
				$this.addClass("hide");
			}
			//显示分页元素
			function pagerShow() {
				$this.removeClass("hide");
			}
			//绑定分页事件
			function funcBind() {
				$this.find("a").removeClass(".disabled");
			}
			//解绑分页事件
			function funcUnbind() {
				$this.find("a").addClass(".disabled");
			}
			//根据页数跳转
			function pageGo(pageNum) {
				pageNum = parseInt(pageNum);
				$(window).scrollTop(0);
				if (!finalOption.getFullData) {
					funcUnbind();
					var reqData = {};
					reqData[finalOption.ajax.dataKey.page_num] = pageNum;
					reqData[finalOption.ajax.dataKey.page_size] = finalOption.pageSize;
					$.extend(reqData, finalOption.ajax.dataAdd);
					pageGo.getData(pageNum, reqData);
				} else {
					if (!$this.allData) {
						pageGo.getData(pageNum, finalOption.ajax.dataAdd);
					} else {
						$this.allData.currPage = pageNum;
						pagerReset();
						pagerUpdate($this.allData.currPage, $this.allData.totalPage, $this.allData.totalNum);
						if ($this.hasClass(".hide").length) {
							pagerShow();
						}
						finalOption.fullDataPageGo($this.allData.currPage, $this.allData.totalPage, $this.allData.totalNum);
					}
				};
			}
			pageGo.getData = function (pageNum, reqData) {
				var reqData = finalOption.ajax.sendPreprocess(reqData || finalOption.ajax.dataAdd);
				$.ajax({
					"type": finalOption.ajax.type,
					"url": finalOption.ajax.url,
					"data": reqData,
					"dataType": finalOption.ajax.dataType,
					"jsonp": finalOption.ajax.jsonp,
					"timeout": finalOption.ajax.timeout,
					"success": function (data) {
						var dataList = finalOption.ajax.callbackPreprocess(data),
							totalNum = finalOption.getFullData ? data.length : finalOption.ajax.getTotalNum(data);
						data = {
							"dataList": dataList,
							"currPage": pageNum,
							"totalPage": Math.ceil(totalNum / finalOption.pageSize),
							"totalNum": totalNum
						};
						$this.allData = {
							"currPage": data.currPage,
							"totalPage": data.totalPage,
							"totalNum": data.totalNum
						};
						if (!data.currPage || !data.totalPage) {
							pagerHide();
						}
						if (data.currPage < 0) {
							return pageGo(1);
						} else if (data.totalPage > 0 && data.currPage > data.totalPage) {
							return pageGo(data.totalPage);
						}
						pagerReset();
						pagerUpdate(data.currPage, data.totalPage, data.totalNum);
						funcBind();
						if ($this.hasClass("hide") && data.currPage && data.totalPage) {
							pagerShow();
						}
						finalOption.ajax.successCallback(data.dataList, data.currPage, finalOption.pageSize, data.totalPage, data.totalNum);
					},
					"error": function (xhr) {
						funcBind();
						if (!$this.find(".pager-btn").length) {
							pagerHide();
						}
						//finalOption.ajax.errorCallback(xhr);
					}
				});
			};
			//初始化分页元素
            $('#pager').empty();
			pagerInit();
		});
	};
	//插件标识
	$.fn.pager.author = "baldyellow";
	//默认配置
	$.fn.pager.defaultOption = {
		"style": [
			"default",
			"ellipsis",
			"stepping"
		][0],
		"checkStyleSheet": true,
		"styleSheetHref": "",
		"ajax": {
			"type": "GET",
			"url": "",
			"dataKey": {
				"page_num": "page_num",
				"page_size": "page_size"
			},
			"dataAdd": {},
			"dataType": "json",
			"jsonp": "callback",
			"timeout": 10000,
			"sendPreprocess": function (data) {
				return data;
			},
			"callbackPreprocess": function (data) {
				return data;
			},
			"getTotalNum": function (data) {
				return 0;
			},
			"successCallback": function (data) {
			},
			"errorCallback": function (xhr) {
			}
		},
		"text": {
			"first": "<i></i>",
			"prev": "上一页",
			"next": "下一页",
			"last": "<i></i>",
			"jump": ""
		},
		"pageSize": 10,
		"initPageNum": 1,
		"currReload": false,
		"extension": 2,
		"stride": 10,
		"getFullData": false,
		"fullDataPageGo": function (currPage, totalPage, totalNum) {
		}
	};
	//检查并加载样式表
	$.fn.pager.checkStyleSheet = function (finalOption) {
		var cssImported = false;
		var i = ~0,
			styleSheets = document.styleSheets,
			styleSheetsLength = styleSheets.length;
		for (;++i < styleSheetsLength;) {
			var j = ~0,
				cssRules = styleSheets[i].cssRules || styleSheets[i].rules || [],
				cssRulesLength = cssRules.length;
			for (;++j < cssRulesLength;) {
				if (cssRules[j].selectorText == ".pager-div") {
					cssImported = true;
					break;
				}
			}
			if (cssImported) {
				break;
			}
		}
		if (!cssImported) {
			$("<link>", {"rel": "stylesheet", "href": finalOption.styleSheetHref}).appendTo("head");
		}
	};
	//检查并矫正配置
	$.fn.pager.correctOption = function (finalOption) {
		finalOption.extension = Math.abs(parseInt(finalOption.extension));
		finalOption.stride = Math.abs(parseInt(finalOption.stride)) || 10;
		return finalOption;
	};
} (jQuery));