document.getElementById('registerForm').addEventListener('submit', async e => {
    e.preventDefault();
    const nombre = e.target.nombre.value;
    const apellido = e.target.apellido.value;
    const email = e.target.email.value;
    const telefono = e.target.telefono.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    const esConductor = e.target.esConductor.checked;

    if (password !== confirmPassword) {
        return showMessage('Las contraseñas no coinciden.', 'red');
    }

    try {
        const response = await fetch('http://localhost:5190/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, apellido, email, telefono, password, esConductor })
        });
        if (response.ok) {
            // Reemplaza la entrada de historial para que "Atrás" no vuelva al registro
            window.location.replace('../login/index.html');
        } else {
            const err = await response.text();
            showMessage(err, 'red');
        }
    } catch {
        showMessage('Error de conexión.', 'red');
    }
});

function showMessage(text, color) {
    const msg = document.getElementById('message');
    msg.innerText = text;
    msg.style.color = color;
}

// Mostrar/ocultar contraseñas
document.getElementById('showPassword').addEventListener('change', e => {
    const type = e.target.checked ? 'text' : 'password';
    document.getElementById('password').type = type;
    document.getElementById('confirmPassword').type = type;
});
