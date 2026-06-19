let music = document.getElementById('musica-fondo');
let escuderiaSeleccionada = ""; 
let nombrePilotoActivo = "";
let intervaloSimulacion;

const DATOS_F1 = {
    "McLaren": { jefe: "Andrea Stella", pilotos: ["Lando Norris", "Oscar Piastri"], color: "#ff8700", bg: "rgba(255, 135, 0, 0.08)", presupuesto: "$135,000,000", basePR: 90 },
    "Ferrari": { jefe: "Frédéric Vasseur", pilotos: ["Charles Leclerc", "Lewis Hamilton"], color: "#e10600", bg: "rgba(225, 6, 0, 0.08)", presupuesto: "$135,000,000", basePR: 89 },
    "Red Bull": { jefe: "Christian Horner", pilotos: ["Max Verstappen", "Isack Hadjar"], color: "#0c1f3c", bg: "rgba(12, 31, 60, 0.2)", presupuesto: "$133,500,000", basePR: 88 },
    "Mercedes": { jefe: "Toto Wolff", pilotos: ["George Russell", "Kimi Antonelli"], color: "#00a19c", bg: "rgba(0, 161, 156, 0.08)", presupuesto: "$134,000,000", basePR: 87 },
    "Aston Martin": { jefe: "Mike Krack", pilotos: ["Fernando Alonso", "Lance Stroll"], color: "#006f62", bg: "rgba(0, 111, 98, 0.1)", presupuesto: "$131,000,000", basePR: 84 },
    "Alpine": { jefe: "Oliver Oakes", pilotos: ["Pierre Gasly", "Franco Colapinto"], color: "#ff85b3", bg: "rgba(255, 133, 179, 0.08)", presupuesto: "$126,000,000", basePR: 82 },
    "Haas": { jefe: "Ayao Komatsu", pilotos: ["Esteban Ocon", "Oliver Bearman"], color: "#ffffff", bg: "rgba(255, 255, 255, 0.05)", presupuesto: "$122,000,000", basePR: 81 },
    "Racing Bulls": { jefe: "Laurent Mekies", pilotos: ["Liam Lawson", "Arvid Lindblad"], color: "#1c34f4", bg: "rgba(28, 52, 244, 0.08)", presupuesto: "$124,500,000", basePR: 80 },
    "Williams": { jefe: "James Vowles", pilotos: ["Alexander Albon", "Carlos Sainz"], color: "#005aff", bg: "rgba(0, 90, 255, 0.08)", presupuesto: "$128,000,000", basePR: 82 },
    "Audi": { jefe: "Mattia Binotto", pilotos: ["Nico Hülkenberg", "Gabriel Bortoleto"], color: "#ff0044", bg: "rgba(255, 0, 68, 0.08)", presupuesto: "$135,000,000", basePR: 78 },
    "Cadillac": { jefe: "Mario Andretti", pilotos: ["Sergio Pérez", "Valtteri Bottas"], color: "#cbd5e1", bg: "rgba(203, 213, 225, 0.08)", presupuesto: "$130,000,000", basePR: 79 }
};

function comenzarJuego() {
    music.volume = 0.3; 
    music.play().catch(e => console.log("Audio en espera de interacción."));
    cambiarPantalla('pantalla-inicio', 'pantalla-escuderia');
}

function cambiarPantalla(ocultar, mostrar) {
    document.getElementById(ocultar).style.display = 'none';
    document.getElementById(mostrar).style.display = 'block';
}

function seleccionarEscuderia(equipo) {
    escuderiaSeleccionada = equipo; 
    const info = DATOS_F1[equipo];
    document.getElementById('titulo-equipo-activa').innerText = equipo.toUpperCase();
    document.getElementById('nombre-director').innerText = info.jefe;

    const contenedorPilotos = document.getElementById('lista-pilotos');
    contenedorPilotos.innerHTML = "";

    info.pilotos.forEach(piloto => {
        contenedorPilotos.innerHTML += `
            <div class="tarjeta-piloto" onclick="irAlTaller('${piloto}')">
                <div class="recuadro-foto"></div>
                <div>
                    <strong style="font-size: 15px; color: white; display: block;">${piloto}</strong>
                    <span style="font-size: 11px; color: #00ff66;">Configurar monoplaza de ingeniería</span>
                </div>
            </div>
        `;
    });

    cambiarPantalla('pantalla-escuderia', 'pantalla-personal');
}

function irAlTaller(nombrePiloto) {
    nombrePilotoActivo = nombrePiloto;
    const info = DATOS_F1[escuderiaSeleccionada];
    const logoContainer = document.getElementById('logo-equipo-taller');
    const cajaContenedora = document.getElementById('contenedor-marca-taller');
    const presupuestoContainer = document.getElementById('presupuesto-equipo-taller');

    logoContainer.innerText = escuderiaSeleccionada.toUpperCase();
    logoContainer.style.color = info.color;
    logoContainer.style.textShadow = `0 0 15px ${info.color}66`; 
    cajaContenedora.style.background = info.bg;
    cajaContenedora.style.borderColor = info.color + "44"; 

    document.getElementById('piloto-asignado-auto').innerText = "Piloto: " + nombrePiloto;
    presupuestoContainer.innerText = "PRESUPUESTO DISPONIBLE: " + info.presupuesto;

    cambiarPantalla('pantalla-personal', 'pantalla-taller');
}

function irACarrera() {
    cambiarPantalla('pantalla-taller', 'pantalla-simulacion');
    document.getElementById('auto-aleron-color').style.borderColor = DATOS_F1[escuderiaSeleccionada].color;

    let tiempoRestante = 180; 
    let gomas = 100;
    let combustible = 105.0;
    let basePR = DATOS_F1[escuderiaSeleccionada].basePR;
    let posicionActual = Math.max(1, Math.floor(22 - (basePR * 0.22) + Math.random() * 3));

    intervaloSimulacion = setInterval(() => {
        tiempoRestante--;
        gomas -= 0.18; 
        combustible -= 0.12;

        let min = Math.floor(tiempoRestante / 60);
        let seg = tiempoRestante % 60;
        document.getElementById('sim-tiempo').innerText = `${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;

        let velMax = Math.floor(335 + (basePR * 0.2) + (Math.random() * 12));
        document.getElementById('sim-velocidad').innerText = velMax + " km/h";
        document.getElementById('sim-neumaticos').innerText = Math.max(0, Math.floor(gomas)) + "%";
        document.getElementById('sim-combustible').innerText = Math.max(0, combustible).toFixed(1) + "L";

        if (tiempoRestante % 10 === 0) {
            let lapSegs = (20 + (100 - basePR) * 0.15 + Math.random()).toFixed(3);
            document.getElementById('sim-laptime').innerText = `1:${lapSegs}`;
            
            if(Math.random() > 0.65 && posicionActual > 1) posicionActual--;
            if(Math.random() > 0.80 && posicionActual < 20) posicionActual++;
            document.getElementById('sim-posicion').innerText = "P" + posicionActual;
        }

        if (tiempoRestante <= 0) {
            clearInterval(intervaloSimulacion);
            alert(`🏁 ¡Bandera a cuadros!\n\n${nombrePilotoActivo} ha finalizado el Gran Premio de Monza en la posición: P${posicionActual}`);
        }
    }, 1000);
        }
