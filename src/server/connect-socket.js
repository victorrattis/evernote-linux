
const NoteDB = require('./note')
const NotebookData = require('./notebook-data')

/**
 *
 * @param {Socket} socket
 * @param {} databse
 */
const connectSocket = function (socket, database) {
  let noteDB = new NoteDB(database)
  let notebookData = new NotebookData(database)

  socket.on('get-notes',     onGetNotes.bind(null, socket, noteDB))
  socket.on('update-note',   onUpdateNote.bind(null, socket, noteDB))
  socket.on('new-note',      onNewNote.bind(null, socket, noteDB))
  socket.on('delete-note',   onDeleteNote.bind(null, socket, noteDB))
  socket.on('get-notebooks', onGetNotebooks.bind(null, socket, notebookData))
}

/**
 *
 */
const onGetNotes = function (socket, noteDB) {
  noteDB.query()
  .then((notes) => {
    console.log('get-notes')
    socket.emit('get-notes', JSON.stringify(notes))
  })
  .catch((error) => {
    console.log(error)
  })
}

const onNewNote = function (socket, noteDB, data) {
  let note = JSON.parse(data)
  noteDB.insert(note)

  // When the note was added with successful.
  .then(({insertId: noteId}) => {
    console.log('new-note: ' + noteId)
    return noteDB.query(noteId)
  })

  // After adding a note on database, a query is done to get the added note.
  .then((notes) => {
    if(notes.length >  0) {
      console.log('send: new-note');
      socket.emit('new-note', JSON.stringify(notes[0]))
    }
  })

  // When it occurred an error in any promise.
  .catch((error) => {
    console.log(error)
  })
}

const onDeleteNote = function (socket, noteDB, noteId) {
  noteDB.delete(noteId)
  .then(() => {
    console.log('delete-note')
  })
  .catch((error) => {
    console.log(error)
  })
}

const onUpdateNote = function (socket, noteDB, data) {
  let note = JSON.parse(data)
  noteDB.update(note)
  .then(() => {
    console.log(`update-note:${note.noteId}`)
  })
  .catch((error) => {
    console.log(error)
  })
}

const onGetNotebooks = function (socket, notebookData) {
  notebookData.query()
  .then((notebooks) => {
    console.log('get-notebooks')
    socket.emit('get-notebooks', JSON.stringify(notebooks))
  })
}

module.exports = connectSocket
