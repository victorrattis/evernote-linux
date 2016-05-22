
/**
 *
 * @constructor
 */
const Note = function (database) {
  this.insert = function (newNote) {
    let note = createNote(newNote)

    let sqlCommand = `INSERT INTO
      Note(title, content, created, updated, notebookId)
      VALUES (
        \'${note.title}\',
        \'${note.content}\',
        \'${note.created}\',
        \'${note.updated}\',
        ${note.notebook}
      );`

    return new Promise((resolve, reject) => {
        database.query(sqlCommand, (error, result) => {
            if (error) reject(error)
            else resolve(result)
        })
    })
  }

  this.update = function (note) {
    let sqlCommand = `UPDATE Note SET
      title=\'${note.title}\',
      content=\'${note.content}\',
      created=\'${note.created}\',
      updated=\'${note.updated}\',
      notebookId=${note.notebookId}
      WHERE noteId=${note.noteId};`

    return new Promise((resolve, reject) => {
        database.query(sqlCommand, (error, rows, fields) => {
            if (error) reject(error)
            else resolve()
        })
    })
  }

  this.query = function (noteId) {
    let sqlCommand
    if(noteId) sqlCommand = `SELECT * FROM Note WHERE noteId=${noteId}`
    else sqlCommand = `SELECT * FROM Note`

    return new Promise((resolve, reject) => {
        database.query(sqlCommand, (error, rows) => {
            if (error) reject(error)
            else resolve(rows)
        })
    })
  }

  this.delete = function (noteId) {
    let sqlCommand = `DELETE FROM Note WHERE noteId=${noteId}`;

    return new Promise((resolve, reject) => {
        database.query(sqlCommand, (error, res) => {
            if (error) reject(error)
            else resolve()
        })
    })
  }
}


const createNote = (note) => {
  return {
    title: note.title || '',
    content: note.content || '',
    snippet: '',
    thumbnail: '',
    created: note.created || dateFormat(new Date(), 'yyyy-mm-dd'),
    updated: note.updated || dateFormat(new Date(), 'yyyy-mm-dd'),
    notebook: note.notebookId || 0
  }
}


module.exports = Note
