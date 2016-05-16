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

let current = notes
let indexSelected;
let selected;

const CHANGE_EVENT = 'change'
const SELECT_EVENT = 'select'

let NoteStore = assign({}, EventEmitter.prototype, {
  onUpdate: function (action) {
    switch (action.actionType) {
      case Action.LOAD_APP_DATA:
        // notes = action.data.notes
        // break;
      case Action.SHOW_NOTE_CONTENT:
        AppClient.getNotes('idNote, title, updated, snippet, thumbnail', (_notes) => {
          var a = []
          for(let n of _notes) a[n.idNote] = n
          notes = a
          current = notes
          NoteStore.emitChange()
        })
        break
      case Action.SELECT_NOTE:
        AppClient.getSelectedNote(action.noteId, '', (note) => {
          selected = note
          NoteStore.emitSelect()
        })
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

          // if (action.note.content !== undefined) {
          //   selected.content = action.note.content
          // }

          if (action.note.editorState !== undefined) {
            selected.editorState = action.note.editorState
            let curenntCS = selected.editorState.getCurrentContent()
            let raw = convertToRaw(curenntCS)
            selected.content = JSON.stringify(raw)
          }

          selected.updated = dateFormat(new Date(), 'yyyy-mm-dd')

          current[id] = selected
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
    return current
  },

  getCurrentNote: function () {
    return selected
  }
})

const NoteDispatcherToken = AppDispatcher.register(NoteStore.onUpdate)

module.exports = NoteStore
