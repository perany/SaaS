/*
 * jQuery edSlider plugin v.1.4
 * @author Eduardo Moreno
 * Code under MIT License
 */

(function($){

	$.fn.edslider = function(settings){

		var defaults = {
			width     : 960,
			height    : 600,
			position  : 1,
			interval  : 5000,
			duration  : 500,
			animation : true,
			paginator : true,
			navigator : true,
			progress  : false,
			loadImgSrc: '../images/load.gif',
			skin      : 'edslider'
		};

		var options = $.extend({}, defaults, settings);

		this.each(function(){

			//Building (wrapping, validating, setting up)
			var slider = $(this),
				sliderLi = slider.find('li'),
				sliderBgImg = sliderLi.css('background-image');

			sliderLi.length == 0 && console.error('error: empty slider!');

			var sliderImg = slider.find('img'),
				wrapper = slider
					.wrap('<div class="' + options.skin + '"/>')
					.parent()
					.css({
						'width'              : options.width,
						'background-image'   : 'url("' + options.loadImgSrc + '")',
						'background-repeat'  : 'no-repeat',
						'background-position': 'center'
					}),
				startPosition = options.position;

			if(options.position == 0 || options.position > sliderLi.length){
				console.error('error: start position value must be between 1 and ' + sliderLi.length + '!');
				startPosition = 1;
			}

			slider
				.on('mouseenter', function(){
					$(this).addClass('hover');
					hoverControl();
				})
				.on('mouseleave', function(){
					$(this).removeClass('hover');
					hoverControl();
				})
				.add(sliderLi)
				.css('height', options.height);

			sliderLi
				.css('width', options.width)
				.filter(':nth-child(' + startPosition + ')')
				.addClass('current');

			//Controls (navigation, pagination and progress bar)
			var position, controls, paginator, paginatorLi, progress, progressWidth, progressElapsed, interact = false;

			if((options.navigator || options.paginator) && sliderLi.length > 1){
				controls = wrapper
					.on('selectstart', false)
					.append('<div class="controls" />')
					.find('.controls');

				if(options.paginator){
					paginator = controls
						.prepend('<ul class="paginator"/>')
						.find('.paginator')
						.hide();

					sliderLi.each(function(){
						paginator.append('<li>&nbsp;</li>');
					});

					paginatorLi = paginator
						.find('li')
						.on('click', function(){
							if(interact){
								position = $(this).index();
								if((index - 1) != position){
									sliderLi
										.removeClass('current')
										.filter(':nth-child(' + ++position + ')')
										.addClass('current');
									play();
								}
							}
						})
				}
				if(options.navigator){
					controls
						.append('<div class="navigator prev"/><div class="navigator next"/>')
						.find('.navigator')
						.hide()
						.on('click', function(){
							var btn = $(this);
							btn.hasClass('next') && interact && next();
							btn.hasClass('prev') && interact && prev();
						});
				}
			}

			progress = wrapper
				.prepend('<div class="progress"/>')
				.find('.progress').width(0);

			!options.progress && progress.height(0);

			//Functions (init, play, next, prev, pause, resume)
			var timeLeft = options.interval, current, index, paused;

			function init(){				
				progressResize();
				sliderLi.length > 1 ? play() : sliderLi.fadeIn(options.duration);
			}

			function play(){
				progressReset();
				interact = false;
				current = sliderLi
					.filter('.current')
					.siblings()
					.fadeOut(options.animation && options.duration || 0)
					.end()
					.fadeIn(options.animation && options.duration || 0, function(){
						interval();
					});

				$('.navigator')
					.add('.paginator')
					.fadeIn(options.animation && options.duration || 0);

				index = sliderLi.index(current) + 1;
				
				if(options.paginator){
					paginatorLi
						.removeClass('current')
						.filter(':nth-child(' + index + ')')
						.addClass('current');
				}
			}

			function next(){
				sliderLi.removeClass('current');
				if(++index <= sliderLi.length){
					current
						.next()
						.addClass('current')
				} else {
					sliderLi
						.filter(':first-child')
						.addClass('current');
				}
				play();
			}

			function prev(){
				sliderLi.removeClass('current');
				if(--index >= 1){
					current
						.prev()
						.addClass('current')
				} else {
					sliderLi
						.filter(':last-child')
						.addClass('current');
				}
				play();
			}

			function pause(){
				paused = true;
				progressElapsed = progress
					.stop()
					.width();
				timeLeft = (progressWidth - progressElapsed) * (options.interval / progressWidth);
			}

			function interval(){
				paused = false;
				interact = true;
				progress
					.stop()
					.show()
					.animate({
						width: '+=' + (progressWidth - progressElapsed)
					}, timeLeft, 'linear', function(){
						progressReset();
						next();
					});
				hoverControl();
			}

			function progressReset(){
				progress.stop().width(0);				
				progressElapsed = 0;
				timeLeft = options.interval;
			}

			function progressResize(){
				$(window)
					.resize(function(){
						progressWidth = slider.width();
						pause(); interval();
					}).resize();
			}

			function hoverControl(){
				if(interact){
					if(slider.hasClass('hover')){
						pause();
					} else if(paused){
						interval();
					}
				}
			}

			//Preloading images and init
			var totalImgsUrl = [],
				preloadedImgs = 0;
			
			sliderLi.each(function(){
				sliderBgImg = $(this).css('background-image').replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '');
				sliderBgImg != 'none' && totalImgsUrl.push(sliderBgImg);
			});
			
			sliderImg.each(function(){
				totalImgsUrl.push(this.src);
			});

			if(totalImgsUrl){
				$.each(totalImgsUrl, function(value){
					$('<img/>')
						.hide()
						.attr('src', totalImgsUrl[value])
						.on('load', function(){
							if(++preloadedImgs == totalImgsUrl.length){
								slider.css('background-image', 'none');
								init();
							} else {
								slider.css({
									'background-image'   : 'url("' + options.loadImgSrc + '")',
									'background-repeat'  : 'no-repeat',
									'background-position': 'center'
								});
							}
						});
				});
			} else {
				init();
			}
		});
	}
})(jQuery);
/* http://prismjs.com/download.html?themes=prism-okaidia&languages=markup+css+clike+javascript&plugins=file-highlight+normalize-whitespace */
var _self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},Prism=function(){var e=/\blang(?:uage)?-(\w+)\b/i,t=0,n=_self.Prism={util:{encode:function(e){return e instanceof a?new a(e.type,n.util.encode(e.content),e.alias):"Array"===n.util.type(e)?e.map(n.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++t}),e.__id},clone:function(e){var t=n.util.type(e);switch(t){case"Object":var a={};for(var r in e)e.hasOwnProperty(r)&&(a[r]=n.util.clone(e[r]));return a;case"Array":return e.map&&e.map(function(e){return n.util.clone(e)})}return e}},languages:{extend:function(e,t){var a=n.util.clone(n.languages[e]);for(var r in t)a[r]=t[r];return a},insertBefore:function(e,t,a,r){r=r||n.languages;var l=r[e];if(2==arguments.length){a=arguments[1];for(var i in a)a.hasOwnProperty(i)&&(l[i]=a[i]);return l}var o={};for(var s in l)if(l.hasOwnProperty(s)){if(s==t)for(var i in a)a.hasOwnProperty(i)&&(o[i]=a[i]);o[s]=l[s]}return n.languages.DFS(n.languages,function(t,n){n===r[e]&&t!=e&&(this[t]=o)}),r[e]=o},DFS:function(e,t,a,r){r=r||{};for(var l in e)e.hasOwnProperty(l)&&(t.call(e,l,e[l],a||l),"Object"!==n.util.type(e[l])||r[n.util.objId(e[l])]?"Array"!==n.util.type(e[l])||r[n.util.objId(e[l])]||(r[n.util.objId(e[l])]=!0,n.languages.DFS(e[l],t,l,r)):(r[n.util.objId(e[l])]=!0,n.languages.DFS(e[l],t,null,r)))}},plugins:{},highlightAll:function(e,t){var a={callback:t,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};n.hooks.run("before-highlightall",a);for(var r,l=a.elements||document.querySelectorAll(a.selector),i=0;r=l[i++];)n.highlightElement(r,e===!0,a.callback)},highlightElement:function(t,a,r){for(var l,i,o=t;o&&!e.test(o.className);)o=o.parentNode;o&&(l=(o.className.match(e)||[,""])[1].toLowerCase(),i=n.languages[l]),t.className=t.className.replace(e,"").replace(/\s+/g," ")+" language-"+l,o=t.parentNode,/pre/i.test(o.nodeName)&&(o.className=o.className.replace(e,"").replace(/\s+/g," ")+" language-"+l);var s=t.textContent,u={element:t,language:l,grammar:i,code:s};if(n.hooks.run("before-sanity-check",u),!u.code||!u.grammar)return n.hooks.run("complete",u),void 0;if(n.hooks.run("before-highlight",u),a&&_self.Worker){var c=new Worker(n.filename);c.onmessage=function(e){u.highlightedCode=e.data,n.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,r&&r.call(u.element),n.hooks.run("after-highlight",u),n.hooks.run("complete",u)},c.postMessage(JSON.stringify({language:u.language,code:u.code,immediateClose:!0}))}else u.highlightedCode=n.highlight(u.code,u.grammar,u.language),n.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,r&&r.call(t),n.hooks.run("after-highlight",u),n.hooks.run("complete",u)},highlight:function(e,t,r){var l=n.tokenize(e,t);return a.stringify(n.util.encode(l),r)},tokenize:function(e,t){var a=n.Token,r=[e],l=t.rest;if(l){for(var i in l)t[i]=l[i];delete t.rest}e:for(var i in t)if(t.hasOwnProperty(i)&&t[i]){var o=t[i];o="Array"===n.util.type(o)?o:[o];for(var s=0;s<o.length;++s){var u=o[s],c=u.inside,g=!!u.lookbehind,h=!!u.greedy,f=0,d=u.alias;h&&!u.pattern.global&&(u.pattern=RegExp(u.pattern.source,u.pattern.flags+"g")),u=u.pattern||u;for(var p=0,m=0;p<r.length;m+=(r[p].matchedStr||r[p]).length,++p){var y=r[p];if(r.length>e.length)break e;if(!(y instanceof a)){u.lastIndex=0;var v=u.exec(y),b=1;if(!v&&h&&p!=r.length-1){if(u.lastIndex=m,v=u.exec(e),!v)break;for(var k=v.index+(g?v[1].length:0),w=v.index+v[0].length,_=p,P=m,S=r.length;S>_&&w>P;++_)P+=(r[_].matchedStr||r[_]).length,k>=P&&(++p,m=P);if(r[p]instanceof a||r[_-1].greedy)continue;b=_-p,y=e.slice(m,P),v.index-=m}if(v){g&&(f=v[1].length);var k=v.index+f,v=v[0].slice(f),w=k+v.length,A=y.slice(0,k),x=y.slice(w),O=[p,b];A&&O.push(A);var j=new a(i,c?n.tokenize(v,c):v,d,v,h);O.push(j),x&&O.push(x),Array.prototype.splice.apply(r,O)}}}}}return r},hooks:{all:{},add:function(e,t){var a=n.hooks.all;a[e]=a[e]||[],a[e].push(t)},run:function(e,t){var a=n.hooks.all[e];if(a&&a.length)for(var r,l=0;r=a[l++];)r(t)}}},a=n.Token=function(e,t,n,a,r){this.type=e,this.content=t,this.alias=n,this.matchedStr=a||null,this.greedy=!!r};if(a.stringify=function(e,t,r){if("string"==typeof e)return e;if("Array"===n.util.type(e))return e.map(function(n){return a.stringify(n,t,e)}).join("");var l={type:e.type,content:a.stringify(e.content,t,r),tag:"span",classes:["token",e.type],attributes:{},language:t,parent:r};if("comment"==l.type&&(l.attributes.spellcheck="true"),e.alias){var i="Array"===n.util.type(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(l.classes,i)}n.hooks.run("wrap",l);var o="";for(var s in l.attributes)o+=(o?" ":"")+s+'="'+(l.attributes[s]||"")+'"';return"<"+l.tag+' class="'+l.classes.join(" ")+'" '+o+">"+l.content+"</"+l.tag+">"},!_self.document)return _self.addEventListener?(_self.addEventListener("message",function(e){var t=JSON.parse(e.data),a=t.language,r=t.code,l=t.immediateClose;_self.postMessage(n.highlight(r,n.languages[a],a)),l&&_self.close()},!1),_self.Prism):_self.Prism;var r=document.currentScript||[].slice.call(document.getElementsByTagName("script")).pop();return r&&(n.filename=r.src,document.addEventListener&&!r.hasAttribute("data-manual")&&("loading"!==document.readyStat?'':document.addEventListener("DOMContentLoaded",n.highlightAll))),_self.Prism}();"undefined"!=typeof module&&module.exports&&(module.exports=Prism),"undefined"!=typeof global&&(global.Prism=Prism);
Prism.languages.markup={comment:/<!--[\w\W]*?-->/,prolog:/<\?[\w\W]+?\?>/,doctype:/<!DOCTYPE[\w\W]+?>/,cdata:/<!\[CDATA\[[\w\W]*?]]>/i,tag:{pattern:/<\/?(?!\d)[^\s>\/=.$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,inside:{tag:{pattern:/^<\/?[^\s>\/]+/i,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,inside:{punctuation:/[=>"']/}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:/&#?[\da-z]{1,8};/i},Prism.hooks.add("wrap",function(a){"entity"===a.type&&(a.attributes.title=a.content.replace(/&amp;/,"&"))}),Prism.languages.xml=Prism.languages.markup,Prism.languages.html=Prism.languages.markup,Prism.languages.mathml=Prism.languages.markup,Prism.languages.svg=Prism.languages.markup;
Prism.languages.css={comment:/\/\*[\w\W]*?\*\//,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*\{))/i,inside:{rule:/@[\w-]+/}},url:/url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,selector:/[^\{\}\s][^\{\};]*?(?=\s*\{)/,string:/("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,property:/(\b|\B)[\w-]+(?=\s*:)/i,important:/\B!important\b/i,"function":/[-a-z0-9]+(?=\()/i,punctuation:/[(){};:]/},Prism.languages.css.atrule.inside.rest=Prism.util.clone(Prism.languages.css),Prism.languages.markup&&(Prism.languages.insertBefore("markup","tag",{style:{pattern:/(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i,lookbehind:!0,inside:Prism.languages.css,alias:"language-css"}}),Prism.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|').*?\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:Prism.languages.markup.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:Prism.languages.css}},alias:"language-css"}},Prism.languages.markup.tag));
Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\w\W]*?\*\//,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0}],string:{pattern:/(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,"boolean":/\b(true|false)\b/,"function":/[a-z0-9_]+(?=\()/i,number:/\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,operator:/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,punctuation:/[{}[\];(),.:]/};
Prism.languages.javascript=Prism.languages.extend("clike",{keyword:/\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,number:/\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,"function":/[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i}),Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,lookbehind:!0,greedy:!0}}),Prism.languages.insertBefore("javascript","string",{"template-string":{pattern:/`(?:\\\\|\\?[^\\])*?`/,greedy:!0,inside:{interpolation:{pattern:/\$\{[^}]+\}/,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}}}),Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,lookbehind:!0,inside:Prism.languages.javascript,alias:"language-javascript"}}),Prism.languages.js=Prism.languages.javascript;
!function(){"undefined"!=typeof self&&self.Prism&&self.document&&document.querySelector&&(self.Prism.fileHighlight=function(){var e={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"};Array.prototype.forEach&&Array.prototype.slice.call(document.querySelectorAll("pre[data-src]")).forEach(function(t){for(var a,s=t.getAttribute("data-src"),n=t,r=/\blang(?:uage)?-(?!\*)(\w+)\b/i;n&&!r.test(n.className);)n=n.parentNode;if(n&&(a=(t.className.match(r)||[,""])[1]),!a){var o=(s.match(/\.(\w+)$/)||[,""])[1];a=e[o]||o}var l=document.createElement("code");l.className="language-"+a,t.textContent="",l.textContent="Loading…",t.appendChild(l);var i=new XMLHttpRequest;i.open("GET",s,!0),i.onreadystatechange=function(){4==i.readyState&&(i.status<400&&i.responseText?(l.textContent=i.responseText,Prism.highlightElement(l)):l.textContent=i.status>=400?"✖ Error "+i.status+" while fetching file: "+i.statusText:"✖ Error: File does not exist or is empty")},i.send(null)})},document.addEventListener("DOMContentLoaded",self.Prism.fileHighlight))}();
!function(){function e(e){this.defaults=r({},e)}function n(e){return e.replace(/-(\w)/g,function(e,n){return n.toUpperCase()})}function t(e){for(var n=0,t=0;t<e.length;++t)e.charCodeAt(t)=="	".charCodeAt(0)&&(n+=3);return e.length+n}if("undefined"!=typeof self&&self.Prism&&self.document){var r=Object.assign||function(e,n){for(var t in n)n.hasOwnProperty(t)&&(e[t]=n[t]);return e};e.prototype={setDefaults:function(e){this.defaults=r(this.defaults,e)},normalize:function(e,t){t=r(this.defaults,t);for(var i in t){var o=n(i);"normalize"!==i&&"setDefaults"!==o&&t[i]&&this[o]&&(e=this[o].call(this,e,t[i]))}return e},leftTrim:function(e){return e.replace(/^\s+/,"")},rightTrim:function(e){return e.replace(/\s+$/,"")},tabsToSpaces:function(e,n){return n=0|n||4,e.replace(/\t/g,new Array(++n).join(" "))},spacesToTabs:function(e,n){return n=0|n||4,e.replace(new RegExp(" {"+n+"}","g"),"	")},removeTrailing:function(e){return e.replace(/\s*?$/gm,"")},removeInitialLineFeed:function(e){return e.replace(/^(?:\r?\n|\r)/,"")},removeIndent:function(e){var n=e.match(/^[^\S\n\r]*(?=\S)/gm);return n&&n[0].length?(n.sort(function(e,n){return e.length-n.length}),n[0].length?e.replace(new RegExp("^"+n[0],"gm"),""):e):e},indent:function(e,n){return e.replace(/^[^\S\n\r]*(?=\S)/gm,new Array(++n).join("	")+"$&")},breakLines:function(e,n){n=n===!0?80:0|n||80;for(var r=e.split("\n"),i=0;i<r.length;++i)if(!(t(r[i])<=n)){for(var o=r[i].split(/(\s+)/g),a=0,s=0;s<o.length;++s){var l=t(o[s]);a+=l,a>n&&(o[s]="\n"+o[s],a=l)}r[i]=o.join("")}return r.join("\n")}},Prism.plugins.NormalizeWhitespace=new e({"remove-trailing":!0,"remove-indent":!0,"left-trim":!0,"right-trim":!0}),Prism.hooks.add("before-highlight",function(e){var n=e.element.parentNode,t=/\bno-whitespace-normalization\b/;if(!(!e.code||!n||"pre"!==n.nodeName.toLowerCase()||e.settings&&e.settings["whitespace-normalization"]===!1||t.test(n.className)||t.test(e.element.className))){for(var r=n.childNodes,i="",o="",a=!1,s=Prism.plugins.NormalizeWhitespace,l=0;l<r.length;++l){var c=r[l];c==e.element?a=!0:"#text"===c.nodeName&&(a?o+=c.nodeValue:i+=c.nodeValue,n.removeChild(c),--l)}if(e.element.children.length&&Prism.plugins.KeepMarkup){var u=i+e.element.innerHTML+o;e.element.innerHTML=s.normalize(u,e.settings),e.code=e.element.textContent}else e.code=i+e.code+o,e.code=s.normalize(e.code,e.settings)}})}}();
