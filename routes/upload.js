const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const Contenido = require('../models/Contenido');
const path = require('path');
const fs = require('fs');
const AWS = require('aws-sdk');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'doo99etys',
    api_key: '371278147974621',
    api_secret: 'w9NcC7tRiWcxV2-5TwoiypI1TBo'
})
const s3 = new AWS.S3({
    accessKeyId: "AKIAQ3EL6HBEEW3IZSW3 ",
    secretAccessKey: "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"

});

// default options
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));


app.put('/api/upload/:id', function (req, res) {

    let id = req.params.id;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ err: 'No hay ningun archivo selecionado' });
    }

    let archivo = req.files.archivo;

    let nombreArchivoCortado = archivo.name.split('.');
    let extension = nombreArchivoCortado[nombreArchivoCortado.length - 1]
    // Extensiones válidas
    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg', 'mp4', 'mov', '3gpp']

    if (extensionesValidas.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Tipo de archivo no válido'
            }
        })
    }

    let contentType;
    if (extension === 'jpg' || 'png' || 'jpeg') {
        contentType = "image";
    }

    if (extension === 'mp4' || 'mov' || '3gpp') {
        contentType = "video";
    }

    console.log(contentType)

    // Change name's file
    let nombreArchivo = `${id}${new Date().getMilliseconds()}.${extension}`

    let uploadPath = path.join(__dirname, `../uploads/${nombreArchivo}`);

    // Use the mv() method to place the file somewhere on your server
    archivo.mv(uploadPath, function (err) {
        if (err) {
            console.log('linea 91', err)
            return res.status(500).json({ err: err });
        }
        // Guardar en cloudinary
        cloudinary.v2.uploader.upload(`uploads/${nombreArchivo}`,
            { resource_type: contentType },
            function (error, result) {
                if (error) {
                    return res.json({ 'err': error })
                }

                const imageUrl = result.url
                // // // Actualizar, imagen a un contenido
                imagenContenido(id, res, imageUrl, extension);
            }
        )


        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

    });
});


const uploadFile = (nombreArchivo) => {
    fs.readFile(`./uploads/${nombreArchivo}`, (err, data) => {
        if (err) throw err;
        const params = {
            Bucket: 'elcomeback', // pass your bucket name
            Key: nombreArchivo, // file will be saved as testBucket/contacts.csv
            Body: JSON.stringify(data, null, 2)
        };
        s3.upload(params, function (s3Err, data) {
            if (s3Err) throw s3Err
            console.log(`File uploaded successfully at ${data.Location}`)
        });
    });
};



function imagenContenido(id, res, nombreArchivo, extension) {

    Contenido.findById(id, (err, contenido) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }


        if (!contenido) {
            return res.status(500).json({
                ok: false,
                msg: 'No hay contenido'
            })
        }

        let pathImagen = path.resolve(__dirname, `../uploads/${contenido.imagenUrl}`);

        // AQUí HAY ERROR
        // if (fs.existsSync(pathImagen)) {
        //     fs.unlinkSync(pathImagen)
        // }

        contenido.imagenUrl = nombreArchivo;


        if (extension === 'jpg' || 'png' || 'jpeg') {
            contenido.typo = "imagen";

        }
    
        if (extension === 'mp4' || 'mov' || '3gpp') {
            contenido.typo = "video";
        }
    

        contenido.save((err, contenidoUpdated) => {
            if (err) {
                console.log('linea 91', err)

                // return res.status(500).json({
                //     ok: false,
                //     err
                // })

            }

            res.json({
                ok: true,
                contenido: contenidoUpdated,
                imagenUrl: nombreArchivo
            })
        })



    })
}

module.exports = app;