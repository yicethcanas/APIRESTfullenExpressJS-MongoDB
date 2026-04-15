const Festivo = require('../model/festivos');

function esFechaValida(year, month, day) {
    const fecha = new Date(year, month - 1, day);
    return (
        fecha.getFullYear() === year &&
        fecha.getMonth() === month - 1 &&
        fecha.getDate() === day
    );
}

function calcularPascua(year) {
    const a = year % 19;
    const b = year % 4;
    const c = year % 7;
    const d = (19 * a + 24) % 30;
    const dias = d + ((2 * b + 4 * c + 6 * d + 5) % 7);

    const fecha = new Date(year, 2, 15);
    fecha.setDate(fecha.getDate() + dias + 7);

    return fecha;
}

function siguienteLunes(fecha) {
    const nueva = new Date(fecha);
    const diaSemana = nueva.getDay();

    if (diaSemana === 1) return nueva;

    const diasParaLunes = diaSemana === 0 ? 1 : 8 - diaSemana;
    nueva.setDate(nueva.getDate() + diasParaLunes);

    return nueva;
}

function calcularFechaFestivo(festivo, year) {
    if (festivo.id === 1) {
        return new Date(year, festivo.mes - 1, festivo.dia);
    }
    if (festivo.id === 2) {
        const base = new Date(year, festivo.mes - 1, festivo.dia);
        return siguienteLunes(base);
    }
    if (festivo.id === 3) {
        const fecha = calcularPascua(year);
        fecha.setDate(fecha.getDate() + festivo.diasPascua);
        return fecha;
    }
    if (festivo.id === 4) {
        const fecha = calcularPascua(year);
        fecha.setDate(fecha.getDate() + festivo.diasPascua);
        return siguienteLunes(fecha);
    }
    return null;
}

function formatearFecha(fecha) {
    const y = fecha.getFullYear();
    const m = String(fecha.getMonth() + 1).padStart(2, '0');
    const d = String(fecha.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

async function verificarFecha(year, month, day) {
    if (!esFechaValida(year, month, day)) {
        return { mensaje: 'Fecha no válida' };
    }

    const festivos = await Festivo.find();

    for (const festivo of festivos) {
        const fecha = calcularFechaFestivo(festivo, year);
        if (!fecha) continue;

        if (fecha.getDate() === day && fecha.getMonth() + 1 === month) {
            return {
                mensaje: 'Es festivo',
                festivo: festivo.nombre
            };
        }
    }

    return { mensaje: 'No es festivo' };
}

async function listarFestivos(year) {
    const festivos = await Festivo.find();

    const resultado = festivos
        .map(f => {
            const fecha = calcularFechaFestivo(f, year);
            if (!fecha) return null;
            return {
                festivo: f.nombre,
                fecha: formatearFecha(fecha)
            };
        })
        .filter(Boolean)
        .sort((a, b) => a.fecha.localeCompare(b.fecha));

    return resultado;
}

module.exports = { verificarFecha, listarFestivos };
