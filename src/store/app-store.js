'use strict'

const assign = require('object-assign')
const EventEmitter = require('events').EventEmitter
const AppDispatcher = require('../app-dispatcher')

const CHANGE_EVENT = 'change'

let contentId = 'notebooks'

let notebooks = [
  { id: 0, title: '0.Inbox', number: 5 },
  { id: 1, title: '1.Actinable', number: 65 },
  { id: 2, title: '2.References', number: 32 },
  { id: 3, title: '3.Statistics', number: 90 },
  { id: 4, title: 'Trash', number: 49 }
]

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
  },

  getNotebooks: function () {
    return notebooks
  }
})

AppDispatcher.register(AppStore.onUpdate)

module.exports = AppStore
