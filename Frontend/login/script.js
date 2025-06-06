// script.js

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Tomar los valores del formulario
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Preparar el objeto que vamos a enviar al backend
    const data = {
        email: email,
        password: password
    };

    try {
        // Hacer la llamada a la API de login
        const response = await fetch('http://localhost:5190/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Verificar si la respuesta fue exitosa (200 OK)
        if (response.ok) {
            const result = await response.json();
            document.getElementById('message').innerText = result.message;
            document.getElementById('message').style.color = 'green';

            // Podés hacer algo más acá: redirigir, guardar token, etc.
        } else {
            // Mostrar el error
            const error = await response.text();
            document.getElementById('message').innerText = error;
            document.getElementById('message').style.color = 'red';
        }
    } catch (error) {
        console.error('Error en la llamada a la API:', error);
        document.getElementById('message').innerText = 'Error de conexión.';
        document.getElementById('message').style.color = 'red';
    }
});
