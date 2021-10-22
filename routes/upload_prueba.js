const express = require('express');
const app = express();

const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: "AKIAQ3EL6HBEEW3IZSW3 ",
  secretAccessKey: "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"

});

const fileName = 'halloween.jpg';

const uploadFile = () => {
  fs.readFile(fileName, (err, data) => {
    if (err) throw err;
    const params = {
      Bucket: 'elcomeback', // pass your bucket name
      Key: fileName, // file will be saved as testBucket/contacts.csv
      Body: JSON.stringify(data, null, 2)
    };
    s3.upload(params, function (s3Err, data) {
      if (s3Err) throw s3Err
      console.log(`File uploaded successfully at ${data.Location}`)
    });
  });
};


app.get('/get-signed-url', async (req, res) => {

  uploadFile();
  res.json({'Hola': 'Hola'})

})

module.exports = app;
