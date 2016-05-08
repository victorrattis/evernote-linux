'use strict'

const assign = require('object-assign')
const EventEmitter = require('events').EventEmitter
const AppDispatcher = require('../app-dispatcher')
const Action = require('../action/action')

const CHANGE_EVENT = 'change'

let tags = [
  {
    id: 0,
    name: '.Next Action'
  },
  {
    id: 1,
    name: '@computador'
  },
  {
    id: 2,
    name: 'Todo'
  },
]

let newTagId;

let TagStore = assign({}, EventEmitter.prototype, {
  onUpdate: function (action) {
    switch (action.actionType) {
      case Action.ADD_TAG_NOTE:
        console.log('add tag note: ' + tags.length)
        newTagId = tags.length
        tags.push({
          id: tags.length,
          name: action.tagInfo.name
        })
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

  getTags: function () {
    return tags
  },

  getTag: function (index) {
    return tags[index]
  },

  getNewTag: function () {
    return newTagId
  }
})

const TagDispatcherToken = AppDispatcher.register(TagStore.onUpdate)

module.exports = TagStore
