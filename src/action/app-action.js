'use strict';

const AppDispatcher = require('../dispatcher/app-dispatcher');
const Action = require('./action');

let AppActions = {
  initApp: () => AppDispatcher.dispatch({
    actionType: Action.APP_INIT
  }),

  loadData: (data) => AppDispatcher.dispatch({
    actionType: Action.LOAD_APP_DATA,
    data: data
  }),

  showNotes: function (filter) {
    AppDispatcher.dispatch({
      actionType: Action.SHOW_NOTE_CONTENT,
      filter: filter
    });
  },

  showNotebooks: function () {
    AppDispatcher.dispatch({
      actionType: Action.SHOW_NOTEBOOK_CONTENT
    });
  },

  showTags: function () {
    AppDispatcher.dispatch({
      actionType: Action.SHOW_TAG_CONTENT
    });
  },

  selecteNote: function (noteId) {
    AppDispatcher.dispatch({
      actionType: Action.SELECT_NOTE,
      noteId: noteId
    });
  },

  addNewTag: function (tag, noteId) {
    AppDispatcher.dispatch({
      actionType: Action.ADD_TAG_NOTE,
      tagInfo: tag,
      noteId: noteId
    });
  },

  alterNote: function (info) {
    AppDispatcher.dispatch({
      actionType: Action.ALTER_NOTE,
      note: info
    });
  },

  newNote: function () {
    AppDispatcher.dispatch({
      actionType: Action.NEW_NOTE
    });
  },

  deleteNote: function (noteId) {
    AppDispatcher.dispatch({
      actionType: Action.DELETE_NOTE,
      noteId: noteId
    });
  },

  appConnected: () => AppDispatcher.dispatch({
    actionType: Action.APP_CONNECTED
  }),

  insertNote: (notes) => AppDispatcher.dispatch({
    actionType: Action.INSERT_NOTE,
    notes: notes
  })
};

module.exports = AppActions;
