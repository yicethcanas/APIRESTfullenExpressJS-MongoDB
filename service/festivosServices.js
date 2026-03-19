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

async function verificarFecha(year, month, day) {
    if (!esFechaValida(year, month, day)) {
        return { mensaje: 'Fecha no válida' };
    }

    const festivos = await Festivo.find();

    for (const festivo of festivos) {

        if (festivo.id === 1) {
            if (festivo.dia === day && festivo.mes === month) {
                return {
                    mensaje: 'Es festivo',
                    festivo: festivo.nombre
                };
            }
        }
        if (festivo.id === 2) {
            let fecha = new Date(year, festivo.mes - 1, festivo.dia);
            fecha = siguienteLunes(fecha);

            if (
                fecha.getDate() === day &&
                fecha.getMonth() + 1 === month
            ) {
                return {
                    mensaje: 'Es festivo',
                    festivo: festivo.nombre
                };
            }
        }
        if (festivo.id === 3) {
            let fecha = calcularPascua(year);
            fecha.setDate(fecha.getDate() + festivo.diasPascua);

            if (
                fecha.getDate() === day &&
                fecha.getMonth() + 1 === month
            ) {
                return {
                    mensaje: 'Es festivo',
                    festivo: festivo.nombre
                };
            }
        }
        if (festivo.id === 4) {
            let fecha = calcularPascua(year);
            fecha.setDate(fecha.getDate() + festivo.diasPascua);
            fecha = siguienteLunes(fecha);

            if (
                fecha.getDate() === day &&
                fecha.getMonth() + 1 === month
            ) {
                return {
                    mensaje: 'Es festivo',
                    festivo: festivo.nombre
                };
            }
        }
    }

    return { mensaje: 'No es festivo' };
}

async function listarFestivos() {
    return await Festivo.find().sort({ id: 1, mes: 1, dia: 1 });
}

module.exports = { verificarFecha, listarFestivos };