// Base de datos oficial - Reglamento F1 2026
const LIMITE_PRESUPUESTARIO_2026 = 215000000;

const EQUIPOS_F1 = {
    "Red Bull Racing": { principal: "Christian Horner", aero: 88, chasis: 85, motor: 90, color: "#0c1f3c" },
    "Ferrari": { principal: "Frédéric Vasseur", aero: 86, chasis: 87, motor: 89, color: "#e10600" },
    "Mercedes": { principal: "Toto Wolff", aero: 85, chasis: 86, motor: 88, color: "#00a19c" },
    "McLaren": { principal: "Andrea Stella", aero: 89, chasis: 88, motor: 88, color: "#ff8700" },
    "Aston Martin": { principal: "Mike Krack", aero: 82, chasis: 83, motor: 85, color: "#006f62" }
};

const PILOTOS_F1 = [
    { nombre: "Max Verstappen", equipo: "Red Bull Racing", habilidad: 96, gestionNeumaticos: 92, reflejos: 95 },
    { nombre: "Sergio Pérez", equipo: "Red Bull Racing", habilidad: 82, gestionNeumaticos: 88, reflejos: 84 },
    { nombre: "Lando Norris", equipo: "McLaren", habilidad: 91, gestionNeumaticos: 89, reflejos: 92 },
    { nombre: "Oscar Piastri", equipo: "McLaren", habilidad: 88, gestionNeumaticos: 86, reflejos: 90 },
    { nombre: "Lewis Hamilton", equipo: "Ferrari", habilidad: 93, gestionNeumaticos: 94, reflejos: 89 },
    { nombre: "Charles Leclerc", equipo: "Ferrari", habilidad: 92, gestionNeumaticos: 88, reflejos: 94 },
    { nombre: "George Russell", equipo: "Mercedes", habilidad: 89, gestionNeumaticos: 87, reflejos: 91 },
    { nombre: "Kimi Antonelli", equipo: "Mercedes", habilidad: 81, gestionNeumaticos: 80, reflejos: 85 },
    { nombre: "Fernando Alonso", equipo: "Aston Martin", habilidad: 92, gestionNeumaticos: 95, reflejos: 90 },
    { nombre: "Lance Stroll", equipo: "Aston Martin", habilidad: 79, gestionNeumaticos: 81, reflejos: 82 }
];

const CIRCUITOS_2026 = [
    { nombre: "Albert Park (Australia)", longitud: 5278, curvas: 14, tipo: "Semi-urbano" },
    { nombre: "Sakhir (Bahréin)", longitud: 5412, curvas: 15, tipo: "Permanente" },
    { nombre: "Monaco (Mónaco)", longitud: 3337, curvas: 19, tipo: "Urbano" },
    { nombre: "Silverstone (Gran Bretaña)", longitud: 5891, curvas: 18, tipo: "Alta Velocidad" },
    { font: "Monza (Italia)", longitud: 5793, curvas: 11, tipo: "Templo de la Velocidad" },
    { nombre: "Spa-Francorchamps (Bélgica)", longitud: 7004, curvas: 19, tipo: "Estructural/Largo" }
];

// Estado global de la partida del jugador
let miPartida = {
    equipoSeleccionado: null,
    presupuestoDesarrollo: LIMITE_PRESUPUESTARIO_2026,
    mejoras: { aero: 0, chasis: 0, motor: 0 },
    pilotoAsignadoIngeniero: null // El piloto del que serás ingeniero directo
};

function seleccionarEquipo(nombreEquipo) {
    miPartida.equipoSeleccionado = nombreEquipo;
    console.log("Equipo seleccionado:", nombreEquipo);
}

function asignarPilotoIngeniero(nombrePiloto) {
    miPartida.pilotoAsignadoIngeniero = nombrePiloto;
    console.log("Eres el ingeniero de carrera de:", nombrePiloto);
}

function invertirEnDesarrollo(area, costo) {
    if (miPartida.presupuestoDesarrollo - costo >= 0) {
        miPartida.presupuestoDesarrollo -= costo;
        miPartida.mejoras[area] += 1;
        return true;
    }
    return false;
}
