const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const festivosRoutes = require('./routes/festivosRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/festivos', festivosRoutes);

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Atlas conectado'))
  .catch(err => console.error(err));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

// VICTOR BRACAMONTE
// YICETH CAÑAS
