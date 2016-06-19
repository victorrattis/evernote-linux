'use strict';

const assign = require('object-assign');
const EventEmitter = require('events').EventEmitter;
const AppDispatcher = require('../dispatcher/app-dispatcher');
const Action = require('../action/action');
const AppClient = require('../client/app-client');

const CHANGE_EVENT = 'change';

let notebooks = [];

let NotebookStore = assign({}, EventEmitter.prototype, {
  onUpdate: function (action) {
    switch (action.actionType) {
      case Action.APP_INIT:
        AppClient.getNotebooks((_notebooks) => {
          console.log('get notebook');
          notebooks = _notebooks;
        });
        break;
      case Action.SHOW_NOTEBOOK_CONTENT:
        AppClient.getNotebooks((_notebooks) => {
          console.log('get notebook');
          notebooks = _notebooks;
          NotebookStore.emitChange();
        });
        break;
      default:
    }
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getNotebooks: function () {
    return notebooks;
  },

  getNotebook: function (index) {
    return notebooks.find((item) => item.notebookId === index);
  },

  getNotebookDefault: function () {
    return '';
  }
});

AppDispatcher.register(NotebookStore.onUpdate);

module.exports = NotebookStore;
