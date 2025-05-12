const moderation = {
    checkMessage: async (mensaje, url) => {

        console.log("Moderando mensaje...");

        const body = {
            user: mensaje.username,
            message: mensaje.texto,
            ip: mensaje.ip,
        }

        console.log("Body:", JSON.stringify(body));

        let respuesta;

        const response = await fetch(url + '/text/moderate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        console.log('Conexion a la api de moderación: ', response.status);
        response.text().then(res => {
            console.log('respuesta en texto: ', res);
        }).catch(err => {
            console.log("Error en la moderación de texto: ", err);
            return {
                message: "Error en la moderación de texto",
                body
            }
        });

        await response.json().then(res => {
            respuesta = res;
            console.log('Respuesta de la api: ', res);
        }).catch(err => {
            console.log("Error en la moderación de texto: ", err);
            return {
                message: "Error en la moderación de texto",
                body
            }
        });

        return respuesta;
    },

    checkImg: async (mensaje, url) => {
        console.log("Moderando imagen...");

        let img = mensaje.img.split(',')[1];

        const body = {
            user: mensaje.username,
            img: img,
            ip: mensaje.ip,
        }

        console.log(body);

        const response = await fetch(url + '/image/moderate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const data = await response.json().catch(err => {
            console.log("Error en la moderación de imagen: ", err);
            return {
                error: true,
                message: "Error en la moderación de imagen",
                err
            }
        })

        return data;
    }
}

module.exports = moderation;