'use strict'

const socketIO = require('socket.io-client')
const AppActino = require('../action/app-action')

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


// Event handles
const onConnect         = () => console.log('Connected!')
const onDisconnect      = () => console.log('disconnect!')
const onGetAllData      = (data) => AppAction.loadData(JSON.parse(data))
const onGetNotes        = (data) => handleGetNotes(JSON.parse(data))
const onGetSelectedNote = (data) => handleGetSelectedNote(JSON.parse(data)[0])
const onGetNotebook     = (data) => handleGetNotebooks(JSON.parse(data))
const onNewNote         = (data) => handleNewNote(JSON.parse(data))


// Events
socket.on('connect',            onConnect)
socket.on('disconnect',         onDisconnect)
socket.on('get-all-data',       onGetAllData)
socket.on('get-notes',          onGetNotes)
socket.on('get-selected-note',  onGetSelectedNote)
socket.on('get-notebooks',      onGetNotebook)
socket.on('new-note',           onNewNote)

module.exports = {
  getAllData: () => socket.emit('get-all-data'),

  getNotes: (fields, callback) => {
    handleGetNotes = callback
    socket.emit('get-notes', fields)
  },

  getNotebooks: (callback) => {
    handleGetNotebooks = callback
    socket.emit('get-notebooks')
  },

  getSelectedNote: (nodeId, fildes, callback) => {
    handleGetSelectedNote = callback
    socket.emit('get-selected-note', nodeId, fildes)
  },

  updateNote: (note) => {
    socket.emit(
      'update-note',
      JSON.stringify(note, (key, value) => key=='editorState' ?  undefined : value)
    )
  },

  newNote: (newNote, callback) => {
    handleNewNote = callback
    socket.emit('new-note', JSON.stringify(newNote))
  },

  deleteNote: (noteId) => {
    socket.emit('delete-note', noteId)
  }
}
