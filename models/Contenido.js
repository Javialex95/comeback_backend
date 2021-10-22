const mongoose = require('mongoose');

const ContenidosSchema = mongoose.Schema({
    copy: {
        type: String,
        trim: true,
    },
    nombre: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    year: {
        type: String,
        trim: true,
    },
    estado_mental: {
        type: String,
        trim: true,
    },
    descripcion: {
        type: String,
        trim: true,
    },

    imagenUrl: {
        type: String
    },
    typo: {
        type: String
    }
    
})

module.exports = mongoose.model('Contenido', ContenidosSchema);

