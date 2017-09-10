'use strict'

const mysql = require('mysql');

/**
 *
 * @constructor
 * @param {string} user - The user login.
 * @param {string} password - The password of the database.
 */
const DatabaseConnect = function (user, password) {
  let connection;

  this.connect = function () {
    connection = mysql.createConnection({
      host     : 'localhost',
      database : 'RegNotes',
      user     : user,
      password : password
    });
  };

  this.query = function (sqlCommand, callback) {
    connection.query(sqlCommand, callback);
  };
};

module.exports = DatabaseConnect;
