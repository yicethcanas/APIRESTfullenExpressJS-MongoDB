const mongoose = require('mongoose');
require('dotenv').config();

const Festivo = require('../model/festivos');

const festivos = [
    { id: 1, tipo: 'Fijo', modoCalculo: 'No se puede variar', dia: 1,  mes: 1,  nombre: 'Año Nuevo',                diasPascua: 0 },
    { id: 1, tipo: 'Fijo', modoCalculo: 'No se puede variar', dia: 1,  mes: 5,  nombre: 'Día del Trabajo',          diasPascua: 0 },
    { id: 1, tipo: 'Fijo', modoCalculo: 'No se puede variar', dia: 20, mes: 7,  nombre: 'Independencia Colombia',   diasPascua: 0 },
    { id: 1, tipo: 'Fijo', modoCalculo: 'No se puede variar', dia: 7,  mes: 8,  nombre: 'Batalla de Boyacá',        diasPascua: 0 },
    { id: 1, tipo: 'Fijo', modoCalculo: 'No se puede variar', dia: 8,  mes: 12, nombre: 'Inmaculada Concepción',    diasPascua: 0 },
    { id: 1, tipo: 'Fijo', modoCalculo: 'No se puede variar', dia: 25, mes: 12, nombre: 'Navidad',                  diasPascua: 0 },

    { id: 2, tipo: 'Ley Puente',    modoCalculo: 'Se traslada al siguiente lunes', dia: 6,  mes: 1,  nombre: 'Santos Reyes',               diasPascua: 0 },
    { id: 2, tipo: 'Ley Puente',    modoCalculo: 'Se traslada al siguiente lunes', dia: 19, mes: 3,  nombre: 'San José',                   diasPascua: 0 },
    { id: 2, tipo: 'Ley Puente',    modoCalculo: 'Se traslada al siguiente lunes', dia: 29, mes: 6,  nombre: 'San Pedro y San Pablo',      diasPascua: 0 },
    { id: 2, tipo: 'Ley Puente',    modoCalculo: 'Se traslada al siguiente lunes', dia: 15, mes: 8,  nombre: 'Asunción de la Virgen',      diasPascua: 0 },
    { id: 2, tipo: 'Ley Puente',    modoCalculo: 'Se traslada al siguiente lunes', dia: 12, mes: 10, nombre: 'Día de la Raza',             diasPascua: 0 },
    { id: 2, tipo: 'Ley Puente',    modoCalculo: 'Se traslada al siguiente lunes', dia: 1,  mes: 11, nombre: 'Todos los Santos',           diasPascua: 0 },
    { id: 2, tipo: 'Ley Puente',    modoCalculo: 'Se traslada al siguiente lunes', dia: 11, mes: 11, nombre: 'Independencia de Cartagena', diasPascua: 0 },

    { id: 3, tipo: 'Pascua',        modoCalculo: 'Domingo de Pascua + días',       dia: 0,  mes: 0,  nombre: 'Jueves Santo',               diasPascua: -3 },
    { id: 3, tipo: 'Pascua',        modoCalculo: 'Domingo de Pascua + días',       dia: 0,  mes: 0,  nombre: 'Viernes Santo',              diasPascua: -2 },
    { id: 3, tipo: 'Pascua',        modoCalculo: 'Domingo de Pascua + días',       dia: 0,  mes: 0,  nombre: 'Domingo de Pascua',          diasPascua: 0 },

    { id: 4, tipo: 'Pascua+Puente', modoCalculo: 'Pascua+días y luego lunes',      dia: 0,  mes: 0,  nombre: 'Ascensión del Señor',        diasPascua: 40 },
    { id: 4, tipo: 'Pascua+Puente', modoCalculo: 'Pascua+días y luego lunes',      dia: 0,  mes: 0,  nombre: 'Corpus Christi',             diasPascua: 61 },
    { id: 4, tipo: 'Pascua+Puente', modoCalculo: 'Pascua+días y luego lunes',      dia: 0,  mes: 0,  nombre: 'Sagrado Corazón de Jesús',   diasPascua: 68 }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conectado a MongoDB');

        await Festivo.deleteMany({});
        console.log('Colección festivos limpiada');

        await Festivo.insertMany(festivos);
        console.log(`Insertados ${festivos.length} festivos`);

        await mongoose.disconnect();
        console.log('Listo');
    } catch (err) {
        console.error('Error en seed:', err);
        process.exit(1);
    }
}

seed();
