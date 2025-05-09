const inputUsername = document.getElementById('username-input');
const inputChat = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const cambiarUsernameBoton = document.getElementById('boton-actualizar-username');
const inputFile = document.getElementById('upload-img');

document.getElementById('send-button').addEventListener('click', (e) => {
    e.preventDefault();
    if (inputChat.value == '') return;
    let fecha = new Date().toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
    mensajeNuevo.fecha = fecha;

    const div = document.createElement('div');
    div.classList.add('mensaje-enviado');

    mensajeNuevo.texto = inputChat.value;
    div.innerHTML = recibirMensaje(mensajeNuevo);
    inputChat.value = '';

    socket.emit('mensaje-enviado', mensajeNuevo);
    inputChat.focus();

    chatBox.prepend(div);
});

document.getElementById('send-button-img').addEventListener('click', (e) => {
    e.preventDefault();
    let fecha = new Date().toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
    mensajeNuevo.fecha = fecha;

    const div = document.createElement('div');
    div.classList.add('mensaje-enviado');

    mensajeNuevo.texto = inputChat.value;
    div.innerHTML = recibirMensajeImg(mensajeNuevo);

    socket.emit('mensaje-enviado', mensajeNuevo);
    inputChat.focus();

    document.getElementById('cont-img').style.display = "none";
    document.getElementById('blur').style.display = "none"
    document.getElementById('upload-img-form').src = "";
    mensajeNuevo.img = '';
    inputFile.value = '';

    chatBox.prepend(div);
});

document.getElementById('send-image').addEventListener('click', (e) => {
    e.preventDefault();
    inputFile.click();
});

cambiarUsernameBoton.addEventListener('click', (e) => {
    e.preventDefault();
    if (inputUsername.value == '') return;
    if (inputUsername.value.length > 10) return alert('El nombre debe tener menos de 10 caracteres')
    mensajeNuevo.username = inputUsername.value;
    document.getElementById('username').innerText = inputUsername.value;
});

document.querySelector('.close').addEventListener('click', (e) => {
    document.getElementById('cont-img').style.display = "none";
    document.getElementById('blur').style.display = "none"
    document.getElementById('upload-img-form').src = "";
    mensajeNuevo.img = '';
    inputFile.value = '';
});

inputFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
        document.getElementById('upload-img-form').src = reader.result;
        mensajeNuevo.img = reader.result;
    };

    reader.readAsDataURL(file);

    document.getElementById('cont-img').style.display = 'block';
    document.getElementById('blur').style.display = "block";
});

function recibirMensaje(mensaje) {

    let divCont = `
            <div class="mensaje-username">
                ${mensaje.username}
            </div>
            <div class="mensaje-text">
                ${mensaje.texto}
            </div>
            <div class="hora">
                ${mensaje.fecha}
            </div>
    `
    return divCont;
}

function recibirMensajeImg(mensaje) {

    let divCont = `
            <div class="mensaje-username">
                ${mensaje.username}
            </div>
            <img src="${mensaje.img}">
            <div class="hora">
                ${mensaje.fecha}
            </div>
    `
    return divCont;
}
