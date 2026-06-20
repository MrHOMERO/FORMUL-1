// --- CONFIGURACIÓN GLOBAL ---
const NEUMATICOS = {
    "Blando": { velocidadMult: 1.15, desgaste: 15 },
    "Medio": { velocidadMult: 1.05, desgaste: 8 },
    "Duro": { velocidadMult: 0.95, desgaste: 4 }
};

let estrategiaElegida = "Medio";
let vueltasTotales = 53;
let vueltaActual = 1;
let estadoMotor = 100;
let estadoGomas = 100;
let carreraEnCurso = false;
let intervaloCarrera = null;

// --- FUNCIONES DE CONTROL ---
function seleccionarEstrategia(tipo) {
    estrategiaElegida = tipo;
    alert("Estrategia seleccionada: " + tipo);
}

function cambiarPantalla(ocultar, mostrar) {
    document.getElementById(ocultar).style.display = 'none';
    document.getElementById(mostrar).style.display = 'block';
}

function actualizarVisualesAuto() {
    // Cambio de color de las ruedas según el desgaste
    let colorGomas = estadoGomas > 60 ? "#00ff66" : (estadoGomas > 30 ? "#ffcc00" : "#ff0000");
    let ruedas = document.querySelectorAll('.rueda');
    ruedas.forEach(r => {
        r.style.backgroundColor = colorGomas;
        r.style.boxShadow = `0 0 10px ${colorGomas}`;
    });
}

function ejecutarPitStop() {
    if (!carreraEnCurso) return;
    alert("BOX BOX: Cambiando neumáticos...");
    estadoGomas = 100; // Restaurar gomas
    estadoMotor -= 2;  // Desgaste técnico leve
    actualizarVisualesAuto();
}

function comenzarSimulacion() {
    carreraEnCurso = true;
    cambiarPantalla('pantalla-taller', 'pantalla-simulacion');
    
    intervaloCarrera = setInterval(() => {
        if (vueltaActual <= vueltasTotales) {
            // Cálculo de desgaste basado en la estrategia elegida
            let factorDesgaste = NEUMATICOS[estrategiaElegida].desgaste * 0.15;
            estadoGomas -= factorDesgaste;
            estadoMotor -= 0.05;

            // Actualizar interfaz
            document.getElementById('sim-vueltas').innerText = `Vuelta: ${vueltaActual}/${vueltasTotales}`;
            document.getElementById('stat-motor').innerText = Math.floor(estadoMotor) + "%";
            document.getElementById('stat-gomas').innerText = Math.floor(estadoGomas) + "%";

            // Lógica de rendimiento
            let velBase = 280 * NEUMATICOS[estrategiaElegida].velocidadMult;
            let penalizacion = (100 - estadoGomas) * 0.6; 
            let velActual = Math.floor(velBase - penalizacion + (Math.random() * 10));
            
            document.getElementById('sim-velocidad').innerText = (estadoGomas > 0) ? velActual + " km/h" : "PINCHAZO";

            // Actualizar color de ruedas dinámicamente
            actualizarVisualesAuto();

            vueltaActual++;
        } else {
            finalizarCarrera();
        }
    }, 1000); // 1 segundo por vuelta
}

function finalizarCarrera() {
    clearInterval(intervaloCarrera);
    carreraEnCurso = false;
    alert("¡Bandera a cuadros! Carrera finalizada.");
}
