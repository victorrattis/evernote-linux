'use strict'

const socketIO = require('socket.io-client')
const AppAction = require('../action/app-action')

const port = 3000
const localhost = '127.0.0.1'

let socket = socketIO.connect(
  `http://${localhost}:${port}`,
  {reconnect: true}
)

let handleGetNotes = () => {}
let handleGetSelectedNote = () => {}
let handleGetNotebooks = () => {}
let handleNewNote = () => {}

// Events
socket.on('connect',            () => {
    console.log('connect')
    AppAction.appConnected() })
socket.on('disconnect',         () => console.log('disconnect!'))
socket.on('get-notes',          (notes) => handleGetNotes(notes))
socket.on('get-notebooks',      (notebooks) => handleGetNotebooks(notebooks))
socket.on('new-note',           (note) => handleNewNote(note))

module.exports = {
  getNotes: (callback) => {
    handleGetNotes = callback
    socket.emit('get-notes')
  },

  getNotebooks: (callback) => {
    handleGetNotebooks = callback
    socket.emit('get-notebooks')
  },

  updateNote: (note) => {
    if(socket.connected) {
      socket.emit(
        'update-note',
        JSON.stringify(note, (key, value) => key=='editorState' ?  undefined : value)
      )
    }
  },

  newNote: (newNote, callback) => {
    handleNewNote = callback
    if(socket.connected) {
      socket.emit('new-note', JSON.stringify(newNote))
    }
  },

  deleteNote: (noteId) => {
    if(socket.connected) {
      socket.emit('delete-note', noteId)
    }
  },

  isConnected: () => socket.connected
}
