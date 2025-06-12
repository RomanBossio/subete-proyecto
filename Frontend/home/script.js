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

function mostrarResultados(viajes) {
    const contenedor = document.getElementById('resultados');
    contenedor.innerHTML = "";

    if (viajes.length === 0) {
        contenedor.innerHTML = "<p>No se encontraron viajes.</p>";
        return;
    }

    viajes.forEach(viaje => {
        const viajeDiv = document.createElement('div');
        viajeDiv.classList.add('viaje');

        viajeDiv.innerHTML = `
            <h3>${viaje.origen} → ${viaje.destino}</h3>
            <p><strong>Fecha y hora:</strong> ${viaje.fecha_Hora_Salida.replace("T", " ")}</p>
            <p><strong>Precio:</strong> $${viaje.precio}</p>
            <p><strong>Lugares disponibles:</strong> ${viaje.lugares_Disponibles}</p>
        `;

        contenedor.appendChild(viajeDiv);
    });
}
