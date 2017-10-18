function modalBase() {
    var event = require('../utils/event.js')
    var foriedA = ['app', 'dom', 'nowParam', 'init', 'event']
    var that = this
    this.app = null
    this.dom
    this.initDate
    this.event = new event()
    this.addMode = 'html'
    this.init = function(app, value, api) {
        //console.log('000', app, value);
        that.app = app
        that.app.modalId++
            that.nowParam = value || null
        that.api = api || null
        $('body').append('<div id="modal' + that.app.modalId + '" style="top:0;left:0;position: fixed;width: 100%;height: 100%;background: rgba(0,0,0,0.5);z-index: 1000;"></div>')
        that.dom = $('#modal' + that.app.modalId)
            //console.log(that.html,this.initDate)
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
        } else {
            return this[key]
        }
    }
    this.show = function() {
        that.dom.show()
    }
    this.hide = function() {
        that.dom.hide()
    }
    this.close = function() {
        that.dom.remove()
    }
    this.complete = function() {

    }
    this.dispose = function() {

    }

}

module.exports = modalBase;