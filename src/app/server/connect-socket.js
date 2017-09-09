
const NoteData = require('./note-data');
const NotebookData = require('./notebook-data');

/**
 * Event that send all notes that are on database, using the same channel to send it.
 */
const EVENT_GET_NOTES = 'get-notes';
const EVENT_UPDATE_NOTE = 'update-note';
const EVENT_NEW_NOTE = 'new-note';
const EVENT_DELETE_NOTE = 'delete-note';
const EVENT_GET_NOTEBOOKS = 'get-notebooks';

const connectSocket = function (socket, database) {
  let noteDB = new NoteData(database);
  let notebookData = new NotebookData(database);

  // Setting the comunication channels of client socket connection.
  socket.on(EVENT_GET_NOTES,     onGetNotes.bind(null, socket, noteDB));
  socket.on(EVENT_UPDATE_NOTE,   onUpdateNote.bind(null, socket, noteDB));
  socket.on(EVENT_NEW_NOTE,      onNewNote.bind(null, socket, noteDB));
  socket.on(EVENT_DELETE_NOTE,   onDeleteNote.bind(null, socket, noteDB));
  socket.on(EVENT_GET_NOTEBOOKS, onGetNotebooks.bind(null, socket, notebookData));
};

const onGetNotes = function (socket, noteDB) {
  // Does a query on database to get all notes that exists.
  noteDB.query()
  .then((notes) => {
    console.log('get-notes');
    socket.emit('get-notes', notes);
  })
  .catch((error) => {
    console.log(error);
  });
};

const onNewNote = function (socket, noteDB, data) {
  let note = JSON.parse(data);
  noteDB.insert(note)

  // When the note was added with successful.
  .then(({insertId: noteId}) => {
    console.log('new-note: ' + noteId);
    return noteDB.query(noteId);
  })

  // After adding a note on database, a query is done to get the added note.
  .then((notes) => {
    if(notes.length >  0) {
      console.log('send: new-note');
      socket.emit('new-note', notes[0]);

      // Send new note to all connected client socket.
      socket.broadcast.emit('insert-note', notes);
    }
  })

  // When it occurred an error in any promise.
  .catch((error) => {
    console.log(error);
  });
};

const onDeleteNote = function (socket, noteDB, noteId) {
  noteDB.delete(noteId)
  .then(() => {
    console.log('delete-note');
  })
  .catch((error) => {
    console.log(error);
  });
};

const onUpdateNote = function (socket, noteDB, note) {
  noteDB.update(note)
  .then(() => {
    console.log(`update-note:${note.noteId}`);
  })
  .catch((error) => {
    console.log(error);
  });
};

const onGetNotebooks = function (socket, notebookData) {
  notebookData.query()
  .then((notebooks) => {
    console.log('get-notebooks');
    socket.emit('get-notebooks', notebooks);
  })
  .catch((error) => {
    console.log(error);
  });
};

module.exports = connectSocket;
