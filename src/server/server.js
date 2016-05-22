
const server = require('http').createServer()
const io = require('socket.io')(server)
const port = 3000

const connectSocket = require('./connect-socket')
const connectDB = require('./connect-database')

let database = new connectDB('root', '112358')
database.connect()

// When a client connects to the server.
io.on('connection', function(socket) {
  console.log('connected')

  socket.on('disconnect', () => {
    console.log('disconnected')
  })

  connectSocket(socket, database)
})

server.listen(port, () => {
    console.log(`Listening at: http://localhost:${port}`)
});
