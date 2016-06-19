'use strict';

const assign = require('object-assign');
const EventEmitter = require('events').EventEmitter;
const dateFormat = require('dateformat');
const AppDispatcher = require('../dispatcher/app-dispatcher');
const Action = require('../action/action');
// const TagStore = require('../store/tag-store');
const AppClient = require('../client/app-client');
const AutoSave = require('../utils/auto-save');

const convertToRaw = require('draft-js').convertToRaw;

let notes = [];

// Represents unsaved data. The data that the User has changed and that weren't saved on the server.
let unsaved = [];

// let indexSelected;
let selected;
let idSelected = 1;

const CHANGE_EVENT = 'change';
const SELECT_EVENT = 'select';

let NoteStore = assign({}, EventEmitter.prototype, {
  onUpdate: function (action) {
    switch (action.actionType) {
      case Action.APP_CONNECTED:
        autoSave.save();
        break;
      case Action.APP_INIT:
        // Get all notes saves on server.
        AppClient.getNotes((_notes) => {
          notes = _notes;
          unsaved.forEach((item) => { notes.push(item.refNote); });
          selected = notes[0];
          idSelected = selected.noteId;

          // TODO: remove it later.
          NoteStore.emitChange();
          NoteStore.emitSelect();
        });
        break;
      case Action.SHOW_NOTE_CONTENT:
        NoteStore.emitChange();
        break;
      case Action.SELECT_NOTE:
        console.log('selected: ' + action.noteId);
        let noteSelected = notes.find((item) => item && item.noteId === action.noteId);

        if(noteSelected) {
          idSelected = noteSelected.noteId;
          selected = noteSelected;
          NoteStore.emitSelect();
          NoteStore.emitChange();
        }
        break;
      case Action.ADD_TAG_NOTE:
        // let newTagId = TagStore.getNewTag()
        // notes[action.noteId].tags.push(newTagId)
        // NoteStore.emitSelect()
        break;
      case Action.NEW_NOTE:
        let newNote = createNewNote(1);
        console.log('new note: ' + newNote.noteId);

        notes.push(newNote);
        selected = newNote;
        idSelected = newNote.noteId;

        unsaved.push({noteId: idSelected, refNote: newNote, status: 'new'});
        autoSave.save();

        NoteStore.emitChange();
        NoteStore.emitSelect();
        break;
      case Action.ALTER_NOTE:
        let id = action.note.id;
        console.log('selected: ' + id);

        if(id) {
          if (action.note.title) {
            selected.title = action.note.title;
          }

          // Convert note editor state to a JSON content.
          if (action.note.editorState) {
            selected.editorState = action.note.editorState;
            let curenntCS = selected.editorState.getCurrentContent();
            let raw = convertToRaw(curenntCS);
            selected.content = JSON.stringify(raw);
          }

          selected.updated = dateFormat(new Date(), 'yyyy-mm-dd');
          NoteStore.emitChange();

          // When there is not a register with this note identity.
          if(!unsaved.find((item) => item.noteId === id)) {
            unsaved.push({noteId: id, refNote: selected, status: 'alter'});
          }
          autoSave.save();
        }
        break;
      case Action.DELETE_NOTE:
        console.log('delete note: ' + action.noteId);

        // Find the note index that will be deleted.
        let index = notes.findIndex((item) => item && item.noteId === action.noteId);
        notes.splice(index, 1);

        // Set the selected note index.
        let selectedIndex = notes[index] ? index : notes[index - 1] ? index - 1 : -1;

        idSelected = selectedIndex >= 0 ? notes[selectedIndex].noteId : -1;
        selected = selectedIndex >= 0 ? notes[selectedIndex] : {};

        let register = unsaved.find((item) => item.noteId === action.noteId);

        if(!register) {
          unsaved.push({noteId: action.noteId, status: 'delete'});
        } else if(register.status !== 'delete') {
          // Remove the registers of alter or new of the unsaved list.
          let index = unsaved.findIndex((item) => item && item === register);
          unsaved.splice(index, 1);

          // Because there is this note in the server and it need be removed.
          if(register.status === 'alter') {
            unsaved.push({noteId: action.noteId, status: 'delete'});
          }
        }
        autoSave.save();

        NoteStore.emitChange();
        NoteStore.emitSelect();
        break;
      case Action.INSERT_NOTE:
        console.log('action: insert note');
        if(action.notes) {
          action.notes.forEach((item) => {
            console.log(item);
            notes.push(item);
          });
          NoteStore.emitChange();
        }
        break;
      default:
    }
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  emitSelect: function () {
    this.emit(SELECT_EVENT);
  },

  addListener: function (eventID, callback) {
    this.on(eventID, callback);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getNotes: function () {
    return notes;
  },

  getCurrentNote: function () {
    return selected;
  },

  getgetIdSelected: function () {
    return idSelected;
  }
});

// Temporary counter that is used to control the notes created by the user and that were not saved.
let temCounter = 0;

const createNewNote = (notebookId) => {
  temCounter++;
  return {
    noteId: `n${temCounter}`,
    created: dateFormat(new Date(), 'yyyy-mm-dd'),
    updated: dateFormat(new Date(), 'yyyy-mm-dd'),
    notebookId: notebookId
  };
};

let autoSave = new AutoSave(() => {
  // It is need have connection with the server to save these data.
  if(AppClient.isConnected()) {
    // get the first item of list to be saved.
    let item = unsaved.shift();
    if(item) {
      if(item.status === 'new') {
        AppClient.newNote(item.refNote, (note) => {
          // Update the temporary identity to the official, which was generated on the server.
          item.refNote.noteId = note.noteId;

          // Update the UI components to remove the old component and add one new.
          NoteStore.emitChange();
          NoteStore.emitSelect();
        });
      } else if(item.status === 'alter') {
        AppClient.updateNote(item.refNote);
      } else if(item.status === 'delete') {
        AppClient.deleteNote(item.noteId);
      }

      if(unsaved.length > 0) {
        autoSave.next();
      } else {
        console.log('all data saved');
      }
    } else {
      console.log('all data saved');
    }
  }
}, 2000);

AppDispatcher.register(NoteStore.onUpdate);

module.exports = NoteStore;
