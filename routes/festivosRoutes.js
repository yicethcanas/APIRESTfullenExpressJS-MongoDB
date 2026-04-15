const express = require('express');
const router = express.Router();
const { verificarFecha, listarFestivos } = require('../service/festivosServices');

router.get('/verificar/:year/:month/:day', async (req, res) => {
    const { year, month, day } = req.params;

    try {
        const resultado = await verificarFecha(
            parseInt(year),
            parseInt(month),
            parseInt(day)
        );

        res.json(resultado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno' });
    }
});

router.get('/obtener/:year', async (req, res) => {
    const { year } = req.params;

    try {
        const data = await listarFestivos(parseInt(year));
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al consultar los festivos' });
    }
});

module.exports = router;
