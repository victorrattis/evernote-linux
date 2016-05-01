'use strict'
const AppDispatcher = require('../app-dispatcher')

let AppActions = {
  showNotes: function (filter) {
    AppDispatcher.dispatch({
      actionType: 'SHOW_NOTES_ACTION',
      filter: filter
    })
  },

  showNotebooks: function () {
    AppDispatcher.dispatch({
      actionType: 'SHOW_NOTEBOOKS_ACTION'
    })
  },

  showTags: function () {
    AppDispatcher.dispatch({
      actionType: 'SHOW_TAGS_ACTION'
    })
  }
}

module.exports = AppActions
