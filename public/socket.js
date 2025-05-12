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
    // console.log(mensaje[1])
    // console.log(sacarPorcentaje(mensaje[1].result));

    const div = document.createElement('div');
    div.id = mensaje[0].id;
    if (mensaje[0].username == mensajeNuevo.username) {
        div.classList.add('mensaje-enviado');
    } else {
        div.classList.add('mensaje');
    }

    if (mensaje[0].img.trim() != "") {
        div.innerHTML = recibirMensajeImg(mensaje[0]);
    } else {
        div.innerHTML = recibirMensaje(mensaje[0]);
    }
    chatBox.prepend(div);
});

socket.on('censurar-mensaje', (mensaje) => {
    try {
        const valor = sacarPorcentaje(mensaje[1].result);

        if(valor > 85) {
            censurarMensaje(mensaje[0].id);
        }
        
        console.log({
            mensaje: mensaje[0],
            resultado: mensaje[1].result,
            valor
        });
    } catch (error) {
        console.log(error);
        console.log(mensaje)
    }
});

function censurarMensaje(id) {
    let mensaje = document.getElementById(id);
    mensaje.children[1].innerHTML = "Mensaje censurado";
    mensaje.children[1].style.color = "red";
}

function sacarPorcentaje(moderacion) {
    const values = Object.values(moderacion).map(arr => arr[0]);
    const maximo = Math.max(...values);
    return maximo * 100;
}