document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Tomar los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const esConductor = document.getElementById('esConductor').checked;

    // Verificar que las contraseñas coincidan
    if (password !== confirmPassword) {
        document.getElementById('message').innerText = 'Las contraseñas no coinciden.';
        document.getElementById('message').style.color = 'red';
        return;
    }

    // Preparar el objeto que vamos a enviar al backend
    const data = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        telefono: telefono,
        password: password,
        esConductor: esConductor
    };

    try {
        // Hacer la llamada a la API de registro
        const response = await fetch('http://localhost:5190/auth/register', {
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
        } else if (response.status === 409) {
            // Email ya registrado (409 Conflict)
            const error = await response.text();
            document.getElementById('message').innerText = error;
            document.getElementById('message').style.color = 'red';
        } else {
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

// Mostrar/ocultar contraseñas
document.getElementById('showPassword').addEventListener('change', (e) => {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    const type = e.target.checked ? 'text' : 'password';
    passwordInput.type = type;
    confirmPasswordInput.type = type;
});
