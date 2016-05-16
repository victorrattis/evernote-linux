'use strict'

const socketIO = require('socket.io-client')
const AppActino = require('../action/app-action')

const port = 3000
const localhost = '127.0.0.1'

let handleGetNotes = () => {}
let handleGetSelectedNote = () => {}

let socket = socketIO.connect(
  `http://${localhost}:${port}`,
  {reconnect: true}
)

socket.on('connect',    () => { console.log('Connected!') })
socket.on('disconnect', () => { console.log('disconnect') })

// Events
socket.on('get-all-data', (data) => AppAction.loadData(JSON.parse(data)))

socket.on('get-notes', (data) => {
  let notes = JSON.parse(data)
  handleGetNotes(notes)
})
socket.on('get-selected-note', (data) => {
//   replacer(key,value) {
//     if (key=="privateProperty1") return undefined;
//     else if (key=="privateProperty2") return undefined;
//     else return value;
// }

  let notes = JSON.parse(data)
  handleGetSelectedNote(notes[0])
})

module.exports = {
  getAllData: () => socket.emit('get-all-data'),
  getNotes: (fields, callback) => {
    handleGetNotes = callback
    socket.emit('get-notes', fields)
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
  }
}
