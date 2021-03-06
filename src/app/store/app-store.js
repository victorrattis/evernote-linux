'use strict';

const assign = require('object-assign');
const EventEmitter = require('events').EventEmitter;
const AppDispatcher = require('../dispatcher/app-dispatcher');
const Action = require('../action/action');

const CHANGE_EVENT = 'change';

let contentId = 'notes';

let AppStore = assign({}, EventEmitter.prototype, {
  onUpdate: function (action) {
    switch (action.actionType) {
      case Action.LOAD_APP_DATA:
        AppStore.emitChange();
        break;
      case Action.APP_INIT:
        // AppClient.getAllData();
        // AppStore.emitChange();
        break;
      case Action.SHOW_NOTE_CONTENT:
        contentId = 'notes';
        AppStore.emitChange();
        break;
      case Action.SHOW_NOTEBOOK_CONTENT:
        contentId = 'notebooks';
        AppStore.emitChange();
        break;
      case Action.SHOW_TAG_CONTENT:
        contentId = 'tags';
        AppStore.emitChange();
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

  getContentId: function () {
    return contentId;
  }
});

AppDispatcher.register(AppStore.onUpdate);

module.exports = AppStore;
