'use strict'

const assign = require('object-assign')
const EventEmitter = require('events').EventEmitter
const dateFormat = require('dateformat')
const AppDispatcher = require('../dispatcher/app-dispatcher')
const Action = require('../action/action')
const TagStore = require('../store/tag-store')
const AppClient = require('../client/app-client')

const convertToRaw = require('draft-js').convertToRaw

let notes = []

let indexSelected;
let selected;
let c = 100;
let idSelected = 1;

let changes = {}

const CHANGE_EVENT = 'change'
const SELECT_EVENT = 'select'

let NoteStore = assign({}, EventEmitter.prototype, {
  onUpdate: function (action) {
    switch (action.actionType) {
      case Action.NEW_NOTE:
        let newNote = {
          noteId: c,
          created: dateFormat(new Date(), 'yyyy-mm-dd'),
          updated: dateFormat(new Date(), 'yyyy-mm-dd'),
          notebookId: 1
        }

        let lastIndex = notes.push(newNote)
        selected = newNote
        idSelected = c
        AppClient.newNote(newNote, (note) => {
          console.log('new note: ' + note.noteId + ' = ' + c)

          notes[lastIndex - 1] = note
          idSelected = note.noteId
          selected = note
          NoteStore.emitChange()
          NoteStore.emitSelect()
        })
        c++
        NoteStore.emitChange()
        NoteStore.emitSelect()
        break
      case Action.DELETE_NOTE:
        console.log('delete note: ' + action.noteId)

        // Find the note index that will be deleted.
        let index = notes.findIndex((item) => item && item.noteId === action.noteId)
        notes.splice(index, 1)

        // Set the selected note index.
        let selectedIndex = notes[index] ? index : notes[index - 1] ? index - 1 : -1

        idSelected = selectedIndex >= 0 ? notes[selectedIndex].noteId : -1
        selected = selectedIndex >= 0 ? notes[selectedIndex] : {}

        AppClient.deleteNote(action.noteId)

        NoteStore.emitChange()
        NoteStore.emitSelect()
        break
      case Action.APP_INIT:
        // Get all notes saves on server.
        AppClient.getNotes('', (_notes) => {
          notes = _notes
          selected = notes[0]
          idSelected = selected.noteId

          // TODO: remove it later.
          NoteStore.emitChange()
          NoteStore.emitSelect()
        })
        break;
      case Action.SHOW_NOTE_CONTENT:
        NoteStore.emitChange()
        break
      case Action.SELECT_NOTE:
        let noteSelected = notes.find((item) => item && item.noteId === action.noteId)

        if(noteSelected) {
          idSelected = noteSelected.noteId
          selected = noteSelected
          NoteStore.emitSelect()
          NoteStore.emitChange()
        }
        break
      case Action.ADD_TAG_NOTE:
        // let newTagId = TagStore.getNewTag()
        // notes[action.noteId].tags.push(newTagId)
        // NoteStore.emitSelect()
        break
      case Action.ALTER_NOTE:
        let id = action.note.id
        if(id !== undefined) {
          if (action.note.title !== undefined) {
            selected.title = action.note.title
          }

          if (action.note.editorState !== undefined) {
            selected.editorState = action.note.editorState
            let curenntCS = selected.editorState.getCurrentContent()
            let raw = convertToRaw(curenntCS)
            selected.content = JSON.stringify(raw)
          }

          selected.updated = dateFormat(new Date(), 'yyyy-mm-dd')

          AppClient.updateNote(selected)
          NoteStore.emitChange()
        }
        break
      default:
    }
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT)
  },

  emitSelect: function () {
    this.emit(SELECT_EVENT)
  },

  addListener: function (eventID, callback) {
    this.on(eventID, callback)
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },

  getNotes: function () {
    return notes
  },

  getCurrentNote: function () {
    return selected
  },

  getgetIdSelected: function () {
    return idSelected
  }
})

const NoteDispatcherToken = AppDispatcher.register(NoteStore.onUpdate)

module.exports = NoteStore
