document.getElementById('viajeForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Tomar los valores del formulario
    const origen = document.getElementById('origen').value;
    const destino = document.getElementById('destino').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const precio = parseFloat(document.getElementById('precio').value);
    const lugares = parseInt(document.getElementById('lugares').value);
    const detalles = document.getElementById('detalles').value;
    const permiteEncomiendas = document.getElementById('permiteEncomiendas').checked;

    // Combinar fecha y hora en un solo DateTime (formato requerido por backend)
    const fechaHoraSalida = `${fecha}T${hora}:00`;

    // 🔧 Temporalmente usamos un ID de conductor fijo para pruebas
    const idConductor = 1;

    // Armar objeto para enviar
    const viaje = {
        id_Conductor: idConductor,
        origen: origen,
        destino: destino,
        fecha_Hora_Salida: fechaHoraSalida,
        lugares_Disponibles: lugares,
        precio: precio,
        permite_Encomiendas: permiteEncomiendas,
        detalles: detalles,
        estado: "Disponible"
    };

    try {
        const response = await fetch('http://localhost:5190/viajes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(viaje)
        });

        const result = await response.json();

        if (response.ok) {
            document.getElementById('message').style.color = 'green';
            document.getElementById('message').innerText = result.message;
            document.getElementById('viajeForm').reset();
        } else {
            document.getElementById('message').style.color = 'red';
            document.getElementById('message').innerText = result.message || "Ocurrió un error.";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerText = 'Error de conexión.';
    }
});
