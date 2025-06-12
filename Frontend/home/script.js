// 🧭 Evento de búsqueda
document.getElementById('busquedaForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const origen = document.getElementById('origen').value;
    const destino = document.getElementById('destino').value;
    const fecha = document.getElementById('fecha').value;

    try {
        const response = await fetch(`http://localhost:5190/viajes`);
        const viajes = await response.json();

        const resultados = viajes.filter(viaje =>
            viaje.origen.toLowerCase().includes(origen.toLowerCase()) &&
            viaje.destino.toLowerCase().includes(destino.toLowerCase()) &&
            viaje.fecha_Hora_Salida.startsWith(fecha) &&
            viaje.estado === "Disponible"
        );

        mostrarResultados(resultados);
    } catch (error) {
        console.error("Error al buscar viajes:", error);
        document.getElementById('resultados').innerHTML = "<p style='color:red;'>Error al buscar viajes.</p>";
    }
});

// 🎯 Mostrar resultados de búsqueda
function mostrarResultados(viajes) {
    const contenedor = document.getElementById('resultados');
    contenedor.innerHTML = "";

    if (viajes.length === 0) {
        contenedor.innerHTML = "<p>No se encontraron viajes.</p>";
        return;
    }

    viajes.forEach(viaje => {
        const viajeDiv = document.createElement('div');
        viajeDiv.classList.add('card-viaje');

        const fechaHora = viaje.fecha_Hora_Salida.replace("T", " ").slice(0, 16);

        viajeDiv.innerHTML = `
            <div class="ruta">${viaje.origen} → ${viaje.destino}</div>
            <div class="fecha-hora">🕒 ${fechaHora}</div>
            <div class="detalles">
                <p><strong>Precio:</strong> $${viaje.precio}</p>
                <p><strong>Lugares disponibles:</strong> ${viaje.lugares_Disponibles}</p>
                <p><strong>Permite encomiendas:</strong> ${viaje.permite_Encomiendas ? "Sí" : "No"}</p>
            </div>
            <button class="btn-solicitar">Solicitar</button>
        `;

        contenedor.appendChild(viajeDiv);
    });
}

// 👤 Usuario simulado (más adelante se reemplaza por sesión real)
const usuarioLogueado = {
    nombre: "Juan",
    apellido: "Pérez"
};

// 👋 Mostrar usuario en el header con menú desplegable
document.addEventListener("DOMContentLoaded", () => {
    const usuarioInfo = document.getElementById("usuarioInfo");

    if (usuarioLogueado && usuarioInfo) {
        usuarioInfo.innerHTML = `
            <div class="perfil-header" onclick="toggleMenu()">
                <img src="images/user.jpg" alt="Perfil">
                <span>${usuarioLogueado.nombre}</span>
                <div class="menu-desplegable" id="menuDesplegable">
                    <a href="#">Mis viajes</a>
                    <a href="#">Mi perfil</a>
                    <a href="#" onclick="cerrarSesion()">Cerrar sesión</a>
                </div>
            </div>
        `;
    }
});

// 📂 Mostrar/Ocultar menú
function toggleMenu() {
    const menu = document.getElementById("menuDesplegable");
    if (menu) menu.classList.toggle("visible");
}

// 🔐 Cerrar sesión (simulado)
function cerrarSesion() {
    alert("Sesión cerrada (simulado)");
    window.location.href = "../login/index.html";
}
// 📌 Al hacer click en el botón del hero, scrollea suave al form de búsqueda
const heroBtn = document.getElementById('heroSearchBtn');
const form = document.getElementById('busquedaForm');

if (heroBtn && form) {
  heroBtn.addEventListener('click', e => {
    e.preventDefault();
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}
