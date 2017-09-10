'use strict'

const NotebookData = function (database) {
  this.query = function () {
    return new Promise((resolve, reject) => {
      let sqlCommand = `SELECT
        Notebook.notebookId, Notebook.name, COUNT(Note.notebookId) AS 'number'
        FROM Notebook
        LEFT JOIN Note
        ON Notebook.notebookId=Note.notebookId
        GROUP BY Note.notebookId;`;

      database.query(sqlCommand, (error, rows) => {
          if (error) reject(error);
          else resolve(rows);
      });
    });
  };
};

module.exports = NotebookData;
