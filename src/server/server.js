
const server = require('http').createServer()
const io = require('socket.io')(server)
const port = 3000

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1123',
  database : 'RegNotes'
});

connection.connect();

const getSQLInsertNote = (note) => {
  return `INSERT INTO
    Notes(title, content, snippet, thumbnail, created, updated, idNotebook)
    VALUES (
      \'${note.title}\',
      \'${note.content}\',
      \'${note.snippet}\',
      \'${note.thumbnail}\',
      \'${note.created}\',
      \'${note.updated}\',
      ${note.notebook}
    );`
}

const updateNote = (note) => {
  let sqlCommand = `UPDATE Notes SET
    title=\'${note.title}\',
    content=\'${note.content}\',
    snippet=\'${note.snippet}\',
    thumbnail=\'${note.thumbnail}\',
    created=\'${note.created}\',
    updated=\'${note.updated}\',
    idNotebook=${note.idNotebook}
    WHERE idNote=${note.idNote};`

  connection.query(sqlCommand, function(err, rows, fields) {
     if(err) console.log(err)
  })
}

// let note = {
//   title: 'Titulo de test',
//   content: '',
//   snippet: 'Fazer assinatura do Mundo Estranho para 2015 usando os super bônus do cartão Santander.&nbsp; - Anuncio para&nbsp;Revista Mundo Estranho –Editora Abril assinatura anual. Ligar para central de atendimento do San...',
//   thumbnail: '',
//   created: '2016-05-15',
//   updated: '2016-05-15',
//   idNotebook: '1',
//   idNote: 2
// }
//
// updateNote(note, 2)

// let a = {"entityMap":{},"blocks":[{"key":"dcoro","text":"Hello World","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}
// let n = `\'${JSON.stringify(a)}\'`
//
// connection.query(`UPDATE Notes SET content=${n} WHERE idNote=1;`, function(err, rows, fields) {
//    if(err) console.log('Error while performing Query.')
// })


// connection.end();
// socket.broadcast.emit('get-notes', m)

io.on('connection', function(socket) {
  console.log('connect')

  socket.on('disconnect', () => {
    console.log('disconnect')
  })

  socket.on('get-all-data', () => {
    console.log('get-all-data')
    socket.emit('get-all-data', JSON.stringify(app))
  })

  socket.on('get-notes', (fildes) => {
    console.log('get-notes')
    var queryField = fildes ? fildes : '*'
    let sqlCommand = `SELECT ${queryField} FROM Notes`

    connection.query(sqlCommand, (err, rows, fields) => {
      if(err) console.log('Error while performing Query.')
      else {
        socket.emit('get-notes', JSON.stringify(rows))
      }
    })
  })

  socket.on('get-selected-note', (noteId, fields) => {
    console.log('get-selected-note: ' + noteId)
    var queryField = fields ? fields : '*'
    let sqlCommand = `SELECT ${queryField} FROM Notes WHERE idNote=${noteId}`

    connection.query(sqlCommand, (err, rows, fields) => {
      if(err) console.log('Error while performing Query.')
      else {
        socket.emit('get-selected-note', JSON.stringify(rows))
      }
    })
  })

  socket.on('update-note', (note) => {
    console.log('update-note')
    updateNote(JSON.parse(note))
  })

})

server.listen(port, () => {
    console.log(`Listening at: http://localhost:${port}`)
});


let notebooks = [
  { id: 0, title: '0.Inbox', number: 5 },
  { id: 1, title: '1.Actinable', number: 65 },
  { id: 2, title: '2.References', number: 32 }
]

let tags = [
  { id: 0, name: '.Next Action' },
  { id: 1, name: '@computador' },
  { id: 2, name: 'Todo' }
]

let app = {
  notebooks: notebooks,
  tags: tags
}
