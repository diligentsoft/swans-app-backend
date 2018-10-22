import { S3 } from 'aws-sdk'
import * as fileType from 'file-type'

const s3 = new S3({apiVersion: '2006-03-01', region: "eu-west-1"})

const imageTypes = [
    'image/gif',
    'image/jpeg',
    'image/png'
]

module.exports.handleFileUpload = (event, context, callback) => {

    //get the image data from upload
    const body = JSON.parse(event.body)

    const fileBuffer = new Buffer(body['image'], 'base64')
    const fileTypeInfo = fileType(fileBuffer)

    //validate image is on right type
    if (fileBuffer.length < 500000 && imageTypes.includes(fileTypeInfo.mime)) {

        const bucket = 'swans.app-file-uploads'
        const params = {
            Body: fileBuffer,
            Key: body['filename'],
            Bucket: bucket,
            ContentEncoding: 'base64',
            ContentType: fileTypeInfo.mime
        };

        s3.putObject(params, (err, data) => {
            if (err) callback(new Error(`${err.statusCode} - ${err.message}`))

        callback(null, {
            statusCode: '200',
            headers: {'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify({'data': data})
        })
    })


    } else {
        callback(null, {
            statusCode: '402',
            headers: {'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify({"message": "Not a valid file type or file too big."})
        })
    }

}