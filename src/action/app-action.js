'use strict'

const AppDispatcher = require('../app-dispatcher')
const Action = require('./action')

let AppActions = {
  showNotes: function (filter) {
    AppDispatcher.dispatch({
      actionType: Action.SHOW_NOTE_CONTENT,
      filter: filter
    })
  },

  showNotebooks: function () {
    AppDispatcher.dispatch({
      actionType: Action.SHOW_NOTEBOOK_CONTENT
    })
  },

  showTags: function () {
    AppDispatcher.dispatch({
      actionType: Action.SHOW_TAG_CONTENT
    })
  }
}

module.exports = AppActions
