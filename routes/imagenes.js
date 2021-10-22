const express = require('express');

const fs = require('fs');
const path = require('path');


let app = express();


app.get('/api/imagen/:img', (req, res) => {

    let img = req.params.img;

    let pathImagen = path.resolve(__dirname, `../uploads/${ img }`);

    if (fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
    } else {
        let noImagePath = path.resolve(__dirname, '../assets/no-image.jpg');
        res.sendFile(noImagePath);
    }



});


module.exports = app;
