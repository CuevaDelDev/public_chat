const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

const moderation = require('./moderation.js');
let users = 0;

app.set('port', 3000);
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

server.listen(app.get('port'), () => {
    console.log('El servidor está funcionando');
});

io.on('connection', (socket) => {

    users++;
    io.emit('nuevo-usuario', users);
    let ip = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address;

    console.log(socket.id+"__"+ip);

    socket.on('mensaje-enviado', async (mensajeNuevo) => {
        mensajeNuevo.ip = ip;
        if (mensajeNuevo.img != '') {
            moderation.checkImg(mensajeNuevo).then(data => {
                io.emit('recibir-mensaje', [mensajeNuevo, data]);
            });
        } else {
            moderation.checkMessage(mensajeNuevo).then(data => {
                io.emit('recibir-mensaje', [mensajeNuevo, data]);                
            });
        }
    });

    socket.on('disconnect', () => {
        users--;
        io.emit('nuevo-usuario', users);
    });
});
