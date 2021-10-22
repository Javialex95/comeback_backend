const express = require('express');
const conectarDB = require('./config/db')
const cors = require('cors');
const router = express.Router();
const path = require('path');


// Server
const app = express();

// Connect database
conectarDB();

// habilitar cors
app.use(cors());

// Habilitar express.json
app.use(express.json({extended: true}));

// App's port
const port = process.env.PORT || 6510;

// Principal page
app.get('/', (req, res) =>{
    res.send('Hola Mundo')
})

// Import routes
app.use('/api/contenidos', require('./routes/contenidos'));
app.use(require('./routes/upload'));
app.use(require('./routes/imagenes'));
app.use(require('./routes/upload_prueba'));


app.use('/', router)

// start the app
app.listen(port, () => {
    console.log(`El servidor está funcionando en el puerto ${port}`)
})
