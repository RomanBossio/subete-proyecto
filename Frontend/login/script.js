document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
        const response = await fetch('http://localhost:5190/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        if (response.ok) {
            const { token, usuario } = await response.json();
            localStorage.setItem('subete_token', token);
            localStorage.setItem('subete_usuario', JSON.stringify(usuario));
            window.location.href = '../home/index.html';
        } else {
            const error = await response.text();
            showMessage(error, 'red');
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
