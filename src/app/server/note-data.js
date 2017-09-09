
const dateFormat = require('dateformat');

/**
 *
 * @constructor
 */
const NoteData = function (database) {
  this.insert = function (newNote) {
    return new Promise((resolve, reject) => {
      if(!newNote) reject('undefined new note.');

      let note = createNote(newNote);

      let sqlCommand = `INSERT INTO
        Note(title, content, created, updated, notebookId)
        VALUES (
          \'${note.title}\',
          \'${note.content}\',
          \'${note.created}\',
          \'${note.updated}\',
          ${note.notebook}
        );`;

      database.query(sqlCommand, (error, result) => {
          if (error) reject(error);
          else resolve(result);
      });
    });
  };

  this.update = function (note) {
    return new Promise((resolve, reject) => {
      if(!note) reject('undefined note.');

      let sqlCommand = `UPDATE Note SET
        title=\'${note.title}\',
        content=\'${note.content}\',
        created=\'${note.created}\',
        updated=\'${note.updated}\',
        notebookId=${note.notebookId}
        WHERE noteId=${note.noteId};`;

      database.query(sqlCommand, (error, rows, fields) => {
          if (error) reject(error);
          else resolve();
      });
    });
  };

  this.query = function (noteId) {
    return new Promise((resolve , reject) => {
      let sqlCommand =
        noteId ?
          `SELECT * FROM Note WHERE noteId=${noteId}` :
          `SELECT * FROM Note`;

      database.query(sqlCommand, (error, rows) => {
          if (error) reject(error);
          else resolve(rows);
      });
    });
  };

  this.delete = function (noteId) {
    return new Promise((resolve, reject) => {
      let sqlCommand = `DELETE FROM Note WHERE noteId=${noteId}`;

      database.query(sqlCommand, (error, res) => {
          if (error) reject(error);
          else resolve();
      });
    });
  };
};

const createNote = (note) => {
  return {
    title: note.title || '',
    content: note.content || '',
    snippet: '',
    thumbnail: '',
    created: note.created || dateFormat(new Date(), 'yyyy-mm-dd'),
    updated: note.updated || dateFormat(new Date(), 'yyyy-mm-dd'),
    notebook: note.notebookId || 0
  };
};

module.exports = NoteData;
