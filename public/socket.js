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
    console.log(mensaje[1]);
    if (mensaje[0].username == mensajeNuevo.username) return;
    const div = document.createElement('div');
    div.classList.add('mensaje');

    if (mensaje[0].img.trim() != "") {
        div.innerHTML = recibirMensajeImg(mensaje[0]);
    } else {
        div.innerHTML = recibirMensaje(mensaje[0]);
    }
    chatBox.prepend(div);
});