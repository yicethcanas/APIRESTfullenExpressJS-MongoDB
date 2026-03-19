const mongoose = require('mongoose');

const FestivoSchema = new mongoose.Schema({
    id: Number,
    tipo: String,
    modoCalculo: String,
    dia: Number,
    mes: Number,
    nombre: String,
    diasPascua: Number
});

module.exports = mongoose.model('Festivo', FestivoSchema, 'festivos');