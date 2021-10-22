const Contenido = require('../models/Contenido');

exports.getContenidos = async (req, res) => {
    try {

        const Contenidos = await Contenido.find({})
        res.json({ Contenidos })

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.getContenido = async (req, res) => {

    try {
        // Guardar el nuevo brand
        const Contenido = await Contenido.findById({ _id: req.params.id });

        if (!Contenido) {
            return res.status(404).json({ msg: 'El brand no existe' })
        } else {
            res.json({ msg: 'Cargado', Contenido })
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.postContenido = async (req, res) => {

    try {

        // crear un nuevo contenido
        const contenido = new Contenido(req.body);

        // guardar el contenido
        contenido.save();
        res.json(contenido);

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}