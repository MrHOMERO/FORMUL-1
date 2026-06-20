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
    alert("Estrategia configurada: " + tipo);
}

function cambiarPantalla(ocultar, mostrar) {
    document.getElementById(ocultar).style.display = 'none';
    document.getElementById(mostrar).style.display = 'block';
}

function ejecutarPitStop() {
    if (!carreraEnCurso) return;
    alert("BOX BOX: Entrando a pits para cambio de gomas.");
    estadoGomas = 100; // Restaurar gomas
    estadoMotor -= 2;  // Pequeño desgaste por revisión
}

function comenzarSimulacion() {
    carreraEnCurso = true;
    cambiarPantalla('pantalla-taller', 'pantalla-simulacion');
    
    intervaloCarrera = setInterval(() => {
        if (vueltaActual <= vueltasTotales) {
            // Cálculo de desgaste
            let factorDesgaste = NEUMATICOS[estrategiaElegida].desgaste * 0.1;
            estadoGomas -= factorDesgaste;
            estadoMotor -= 0.05;

            // Actualizar Interfaz
            document.getElementById('sim-vueltas').innerText = `Vuelta: ${vueltaActual}/${vueltasTotales}`;
            document.getElementById('stat-motor').innerText = Math.floor(estadoMotor) + "%";
            document.getElementById('stat-gomas').innerText = Math.floor(estadoGomas) + "%";

            // Lógica de rendimiento
            let velBase = 280 * NEUMATICOS[estrategiaElegida].velocidadMult;
            let penalizacion = (100 - estadoGomas) * 0.5; // Pierdes velocidad si las gomas están mal
            let velActual = Math.floor(velBase - penalizacion + (Math.random() * 10));
            
            document.getElementById('sim-velocidad').innerText = (estadoGomas > 0) ? velActual + " km/h" : "PINCHAZO";

            // Alerta visual
            document.getElementById('stat-gomas').style.color = (estadoGomas < 20) ? "red" : "#00ff66";

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
