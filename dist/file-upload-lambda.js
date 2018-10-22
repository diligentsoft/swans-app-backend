"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aws_sdk_1 = require("aws-sdk");
var fileType = require("file-type");
var s3 = new aws_sdk_1.S3({ apiVersion: '2006-03-01', region: "eu-west-1" });
var imageTypes = [
    'image/gif',
    'image/jpeg',
    'image/png'
];
module.exports.handleFileUpload = function (event, context, callback) {
    //get the image data from upload
    var body = JSON.parse(event.body);
    var fileBuffer = new Buffer(body['image'], 'base64');
    var fileTypeInfo = fileType(fileBuffer);
    //validate image is on right type
    if (fileBuffer.length < 500000 && imageTypes.includes(fileTypeInfo.mime)) {
        var bucket = 'swans.app-file-uploads';
        var params = {
            Body: fileBuffer,
            Key: body['filename'],
            Bucket: bucket,
            ContentEncoding: 'base64',
            ContentType: fileTypeInfo.mime
        };
        s3.putObject(params, function (err, data) {
            if (err)
                callback(new Error(err.statusCode + " - " + err.message));
            callback(null, {
                statusCode: '200',
                headers: { 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({ 'data': data })
            });
        });
    }
    else {
        callback(null, {
            statusCode: '402',
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ "message": "Not a valid file type or file too big." })
        });
    }
};
