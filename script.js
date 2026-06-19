// Base de datos oficial - Reglamento F1 2026
const LIMITE_PRESUPUESTARIO_2026 = 215000000; // $215M USD (Chasis y Operaciones)

const EQUIPOS_F1 = {
    "Red Bull Racing": { principal: "Christian Horner", aero: 88, chasis: 85, motor: 90, presupuestoId: LIMITE_PRESUPUESTARIO_2026 },
    "Ferrari": { principal: "Frédéric Vasseur", aero: 86, chasis: 87, motor: 89, presupuestoId: LIMITE_PRESUPUESTARIO_2026 },
    "Mercedes": { principal: "Toto Wolff", aero: 85, chasis: 86, motor: 88, presupuestoId: LIMITE_PRESUPUESTARIO_2026 },
    "McLaren": { principal: "Andrea Stella", aero: 89, chasis: 88, motor: 88, presupuestoId: LIMITE_PRESUPUESTARIO_2026 },
    "Aston Martin": { principal: "Mike Krack", aero: 82, chasis: 83, motor: 85, presupuestoId: LIMITE_PRESUPUESTARIO_2026 }
};

const PILOTOS_F1 = [
    { nombre: "Max Verstappen", equipo: "Red Bull Racing", habilidad: 96, gestionNeumaticos: 92, reflejos: 95, sueldoExcluido: 55000000 },
    { nombre: "Lando Norris", equipo: "McLaren", habilidad: 91, gestionNeumaticos: 89, reflejos: 92, sueldoExcluido: 25000000 },
    { nombre: "Lewis Hamilton", equipo: "Ferrari", habilidad: 93, gestionNeumaticos: 94, reflejos: 89, sueldoExcluido: 50000000 },
    { nombre: "Charles Leclerc", equipo: "Ferrari", habilidad: 92, gestionNeumaticos: 88, reflejos: 94, sueldoExcluido: 35000000 },
    { nombre: "Fernando Alonso", equipo: "Aston Martin", habilidad: 92, gestionNeumaticos: 95, reflejos: 90, sueldoExcluido: 20000000 }
];

// Estado de la partida del jugador
let miEquipo = {
    nombre: "McLaren", // Equipo elegido para la prueba
    presupuestoDesarrollo: LIMITE_PRESUPUESTARIO_2026,
    mejoras: { aero: 0, chasis: 0, motor: 0 }
};

/**
 * Invierte en el desarrollo del coche respetando el Límite Presupuestario de la FIA
 * @param {string} area - 'aero', 'chasis' o 'motor'
 * @param {number} costo - Cantidad de dinero a gastar
 */
function invertirEnDesarrollo(area, costo) {
    if (miEquipo.presupuestoDesarrollo - costo >= 0) {
        miEquipo.presupuestoDesarrollo -= costo;
        miEquipo.mejoras[area] += 1; // Sube un nivel de evolución
        console.log(`¡Mejora de ${area} completada! Presupuesto restante Reglamento 2026: $${miEquipo.presupuestoDesarrollo.toLocaleString()}`);
    } else {
        console.error("ALERTA FIA: Operación rechazada. Exceder el límite presupuestario conlleva sanciones graves en el campeonato.");
    }
}

// PRUEBA DE SIMULACIÓN EN CONSOLA:
console.log(`Iniciando temporada con ${miEquipo.nombre}. Presupuesto F1 2026: $${miEquipo.presupuestoDesarrollo.toLocaleString()}`);
invertirEnDesarrollo('aero', 15000000); // Invertimos $15M en el túnel de viento
invertirEnDesarrollo('motor', 30000000); // Invertimos $30M en la unidad de potencia eléctrica
