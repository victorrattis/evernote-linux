
const NotebookData = function (database) {

  this.query = function () {
    let sqlCommand = `SELECT Notebook.notebookId, Notebook.name, COUNT(Note.notebookId) AS 'number'
      FROM Notebook
      LEFT JOIN Note
      ON Notebook.notebookId=Note.notebookId
      GROUP BY Note.notebookId;`

    return new Promise((resolve, reject) => {
      database.query(sqlCommand, (error, rows) => {
          if (error) reject(error)
          else resolve(rows)
      })
    })
  }
}

module.exports = NotebookData
