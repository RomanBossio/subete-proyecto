// 1) Protege la página y muestra usuario
document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('subete_token');
  if (!token) return window.location.href = '../login/index.html';

  const usuario = JSON.parse(localStorage.getItem('subete_usuario'));
  document.getElementById('usuarioInfo').innerHTML = `
    <div class="perfil-header" onclick="toggleMenu()">
      <img src="images/user.jpg" alt="Perfil">
      <span>${usuario.nombre}</span>
      <div class="menu-desplegable" id="menuDesplegable">
        <a href="#">Mis viajes</a>
        <a href="#">Mi perfil</a>
        <a href="#" onclick="cerrarSesion()">Cerrar sesión</a>
      </div>
    </div>
  `;
});

// Cerrar sesión
function cerrarSesion() {
  localStorage.removeItem('subete_token');
  localStorage.removeItem('subete_usuario');
  window.location.href = '../login/index.html';
}

// Toggle menú de usuario
function toggleMenu() {
  const menu = document.getElementById('menuDesplegable');
  if (menu) menu.classList.toggle('visible');
}

// 2) Búsqueda de viajes
document.getElementById('busquedaForm').addEventListener('submit', async e => {
  e.preventDefault();
  const origen = e.target.origen.value.toLowerCase();
  const destino = e.target.destino.value.toLowerCase();
  const fecha = e.target.fecha.value;

  try {
    const resp = await fetch('http://localhost:5190/viajes');
    const viajes = await resp.json();
    const resultados = viajes.filter(v =>
      v.origen.toLowerCase().includes(origen) &&
      v.destino.toLowerCase().includes(destino) &&
      v.fecha_Hora_Salida.startsWith(fecha) &&
      v.estado === "Disponible"
    );
    mostrarResultados(resultados);
  } catch {
    document.getElementById('resultados').innerHTML = "<p style='color:red;'>Error al buscar viajes.</p>";
  }
});

function mostrarResultados(viajes) {
  const cont = document.getElementById('resultados');
  cont.innerHTML = '';
  if (!viajes.length) {
    cont.innerHTML = "<p>No se encontraron viajes.</p>";
    return;
  }
  viajes.forEach(v => {
    const div = document.createElement('div');
    div.classList.add('card-viaje');
    const fechaHora = v.fecha_Hora_Salida.replace('T',' ').slice(0,16);
    div.innerHTML = `
      <h2>${v.origen} → ${v.destino}</h2>
      <p>Salida: ${fechaHora}</p>
      <p><strong>Precio:</strong> $${v.precio}</p>
      <p><strong>Lugares:</strong> ${v.lugares_Disponibles}</p>
      <p><strong>Encomiendas:</strong> ${v.permite_Encomiendas ? 'Sí':'No'}</p>
      <button class="btn-solicitar">Solicitar</button>
    `;
    cont.appendChild(div);
  });
}

// 3) Scroll suave al form
document.getElementById('heroSearchBtn').addEventListener('click', e => {
  e.preventDefault();
  document.getElementById('busquedaForm').scrollIntoView({ behavior:'smooth' });
});
