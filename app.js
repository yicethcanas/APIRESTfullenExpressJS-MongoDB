const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const festivosRoutes = require('./routes/festivosRoutes');

const app = express();

app.use(express.json());

app.use('/api/festivos', festivosRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Atlas conectado'))
  .catch(err => console.error(err));

app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});

// VICTOR BRACAMONTE
// YICETH CAÑAS