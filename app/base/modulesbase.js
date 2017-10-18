function moduleBase() {
    var foriedA = ['app', 'dom', 'event', 'nowParam', 'init', 'templateArr']
    var event = require('../utils/event.js')
    var that = this
    this.app = null
    this.dom = null
    this.nowParam
    this.initDate = null
    this.event = new event()
    this.addMode = "html"
    this.templateArr = []
    this.init = function(app, dom, value) {
        //console.log('this.addMode', this.addMode);
        //console.log('111', that.html);
        that.app = app
        that.dom = dom
        that.nowParam = value
        that.initDate = value
        switch (this.addMode) {
            case 'html':
                that.dom.html(this.app.renderTemplate(that.html, this.initDate))
                break
            case 'append':
                that.dom.append(this.app.renderTemplate(that.html, this.initDate))
                break
            case "prepend":
                that.dom.append(this.app.renderTemplate(that.html, this.initDate))
                break
        }
        that.complete()
    }
    this.attrA = function(key, value) {
        if (value) {
            if (!foriedA.search(key)) {
                this[key] = value
            }
            /*switch (key) {
                case 'initDate':
                    that.dom.html(this.app.renderTemplate(that.html, this.initDate))
                    break
            }*/
        } else {
            return this[key]
        }
    }
    this.showLoading = function() {
        //console.log('999', that.dom);
        that.dom.find('.loading_cont').removeClass('hide');
    }
    this.hideLoading = function() {
        that.dom.find('.loading_cont').addClass('hide');
    }
    this.showDataNull = function() {
        that.dom.find('.dataNone').removeClass('hide');
    }
    this.hideDataNull = function() {
        that.dom.find('.dataNone').addClass('hide');
    }
    this.showData = function() {
        that.dom.find('.body_cont').show()
    }
    this.hideData = function() {
        that.dom.find('.body_cont').hide()
    }
    this.showRefresh = function() {
        that.dom.find('.failLoad').removeClass('hide');
    }
    this.hideRefresh = function() {
        that.dom.find('.failLoad').addClass('hide');
    }
    this.show = function() {
        that.dom.show()
    }
    this.hide = function() {
        that.dom.hide()
    }
    this.complete = function() {

    }
    this.dispose = function() {

    }
}

module.exports = moduleBase;