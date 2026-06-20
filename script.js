const EQUIPOS_2026 = {
    "Mercedes": { pilotos: ["Andrea Kimi Antonelli (12)", "George Russell (63)"], banderas: ["🇮🇹", "🇬🇧"] },
    "Ferrari": { pilotos: ["Lewis Hamilton (44)", "Charles Leclerc (16)"], banderas: ["🇬🇧", "🇲🇨"] },
    "McLaren": { pilotos: ["Lando Norris (1)", "Oscar Piastri (81)"], banderas: ["🇬🇧", "🇦🇺"] },
    "Red Bull Racing": { pilotos: ["Max Verstappen (3)", "Isack Hadjar (6)"], banderas: ["🇳🇱", "🇫🇷"] },
    "Aston Martin": { pilotos: ["Fernando Alonso (14)", "Lance Stroll (18)"], banderas: ["🇪🇸", "🇨🇦"] },
    "Alpine": { pilotos: ["Pierre Gasly (10)", "Franco Colapinto (43)"], banderas: ["🇫🇷", "🇦🇷"] },
    "Williams": { pilotos: ["Carlos Sainz (55)", "Alex Albon (23)"], banderas: ["🇪🇸", "🇹🇭"] },
    "Racing Bulls": { pilotos: ["Liam Lawson (30)", "Arvid Lindblad (41)"], banderas: ["🇳🇿", "🇬🇧"] },
    "Haas": { pilotos: ["Oliver Bearman (87)", "Esteban Ocon (31)"], banderas: ["🇬🇧", "🇫🇷"] },
    "Audi": { pilotos: ["Nico Hülkenberg (27)", "Gabriel Bortoleto (5)"], banderas: ["🇩🇪", "🇧🇷"] },
    "Cadillac": { pilotos: ["Sergio Pérez (11)", "Valtteri Bottas (77)"], banderas: ["🇲🇽", "🇫🇮"] }
};

function iniciarConNombre() {
    let nombre = document.getElementById('input-nombre').value || "Director";
    document.getElementById('display-director').innerText = "Director: " + nombre;
    document.getElementById('sonido-motor').play().catch(e => console.log("Audio esperando..."));
    cambiarPantalla('pantalla-1', 'pantalla-2');
}

function seleccionarEquipo(nombre) {
    document.getElementById('equipo-titulo').innerText = nombre;
    const lista = document.getElementById('lista-pilotos');
    lista.innerHTML = '';
    const datos = EQUIPOS_2026[nombre];
    datos.pilotos.forEach((piloto, index) => {
        let btn = document.createElement('button');
        btn.className = 'btn-piloto';
        btn.innerHTML = `<div class="silueta-piloto">👤</div><div style="display:flex; flex-direction:column;"><span>${datos.banderas[index]} ${piloto}</span></div>`;
        btn.onclick = () => { alert("Director, has elegido a " + piloto); };
        lista.appendChild(btn);
    });
    cambiarPantalla('pantalla-2', 'pantalla-pilotos');
}

function cambiarPantalla(ocultar, mostrar) {
    document.getElementById(ocultar).classList.remove('activa');
    document.getElementById(mostrar).classList.add('activa');
}
