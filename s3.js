require('dotenv').config();
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');

const bucketName = "elcomeback";
const region = "us-east-1";
const accessKeyId = "AKIAQ3EL6HBEAHDWCCWM";
const secretAccessKey = "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";

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
  })
  
  // uploads a file to s3
  function uploadFile(file) {

    console.log(file)
    const fileStream = fs.createReadStream(file)
  
    const uploadParams = {
      Bucket: bucketName,
      Body: fileStream,
      Key: file.filename
    }
  
    return s3.upload(uploadParams).promise()
  }
  exports.uploadFile = uploadFile
  
  
  // downloads a file from s3
  function getFileStream(fileKey) {
    const downloadParams = {
      Key: fileKey,
      Bucket: bucketName
    }
  
    return s3.getObject(downloadParams).createReadStream()
  }
  exports.getFileStream = getFileStream