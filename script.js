let estrategiaElegida = "Medio";
let estadoMotor = 100;
let estadoGomas = 100;

function cambiarPantalla(ocultar, mostrar) {
    document.getElementById(ocultar).classList.remove('activa');
    document.getElementById(mostrar).classList.add('activa');
}

function reproducirMotorYCambiar() {
    document.getElementById('sonido-motor').play().catch(e => console.log("Audio bloqueado"));
    cambiarPantalla('pantalla-1', 'pantalla-2');
}

function seleccionarEquipo(nombre) {
    document.getElementById('nombre-equipo-display').innerText = nombre;
    alert("Equipo: " + nombre);
}

function seleccionarEstrategia(tipo) {
    estrategiaElegida = tipo;
    alert("Estrategia: " + tipo);
}

function ejecutarPitStop() {
    estadoGomas = 100;
    document.querySelectorAll('.rueda').forEach(r => r.style.background = "#00ff66");
    alert("Pit Stop completado.");
}

function comenzarSimulacion() {
    cambiarPantalla('pantalla-taller', 'pantalla-simulacion');
}

function seleccionarPresupuesto(monto) {
    alert("Presupuesto: " + monto + "M");
}
