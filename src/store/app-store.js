'use strict'

const assign = require('object-assign')
const EventEmitter = require('events').EventEmitter
const AppDispatcher = require('../app-dispatcher')

const CHANGE_EVENT = 'change'

let contentId = 'notebooks'

let AppStore = assign({}, EventEmitter.prototype, {
  onUpdate: function (action) {
    switch (action.actionType) {
      case 'SHOW_NOTES_ACTION':
        contentId = 'notes'
        AppStore.emitChange()
        break
      case 'SHOW_NOTEBOOKS_ACTION':
        contentId = 'notebooks'
        AppStore.emitChange()
        break
      case 'SHOW_TAGS_ACTION':
        contentId = 'tags'
        AppStore.emitChange()
        break
      default:
    }
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT)
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },

  getContentId: function () {
    return contentId
  }
})

const AppDispatcherToken = AppDispatcher.register(AppStore.onUpdate)

module.exports = AppStore