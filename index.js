const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

app.set('port', 3000);
app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
    res.sendFile('index.html');
});

server.listen(app.get('port'),()=>{
    console.log('El servidor está funcionando')
});

io.on('connection',(socket)=>{
    console.log(socket.id);

    socket.on('mensaje-enviado',(mensajeNuevo)=>{
        io.emit('recibir-mensaje',mensajeNuevo)
    });
});