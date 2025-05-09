const socket = io();
const mensajeNuevo = {
    username: username,
    texto: '',
    fecha: '',
    img: ''
};
socket.on("connect", () => {
    mensajeNuevo.username = `Anónimo ${socket.id}`
});

socket.on('nuevo-usuario', (users) => {
    document.getElementById('users-text').innerHTML = `${users} Usuarios conectados`;
});

socket.on('recibir-mensaje', (mensaje) => {
    if (mensaje.username == mensajeNuevo.username) return;
    const div = document.createElement('div');
    div.classList.add('mensaje');
    if (mensaje.img != '') {
        div.innerHTML = recibirMensajeImg(mensaje);

    } else {
        div.innerHTML = recibirMensaje(mensaje);
    }
    chatBox.prepend(div);
});