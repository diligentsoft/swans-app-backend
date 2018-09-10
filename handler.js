'use strict';

var aws = require('aws-sdk');
var ses = new aws.SES({region: "eu-west-1"});

module.exports.createFlytippingReport = (event, context, callback) => {
    console.log("Start Create Flytipping Report");
    var report = JSON.parse(event.body)
    var params = {
        Destination: {
            ToAddresses: [
                "Flytipping Team <christophercundill@gmail.com>"
            ]
        },
        Message: {

            Subject: {
                Data: "New Flytipping Report",
                Charset: 'UTF-8'
            },

            Body: {
                Text: {
                    Data: "Dear Team,\n\nNew flytipping report received at " + report.dateTime +
                    "from " + report.user.firstname + " " + report.user.lastname + " (" + report.user.email + ").\n\n" +
                    "The following description was provided: " + report.description + ".\n\n" +
                    "The location was recorded as coordinates " + report.latitude + ", " + report.longitude + "\n\n" +
                    "See https://maps.googleapis.com/maps/api/staticmap?zoom=15&size=600x400&maptype=roadmap&markers=color:red%7C" +
                    report.latitude + "," + report.longitude +
                    "&key=AIzaSyB993oF7I38X3PgnAFnZbHxgyQbQY_6_4Q \n\n" +
                    "Image filename: https://s3.eu-west-2.amazonaws.com/swans.app-file-uploads/" + report.imageFilename + "\n\n" +
                    "Best,\n\n\nSwans.app",
                    Charset: 'UTF-8'
                },
                Html: {
                    Data: "<p>Dear Team</p><p>New flytipping report received at " + report.dateTime +
                    " from " + report.user.firstname + " " + report.user.lastname + " (" + report.user.email + ").</p>" +
                    "<p>The following description was provided: " + report.description + ".</p>" +
                    "<p>The location was recorded as coordinates " + report.latitude + ", " + report.longitude + "</p>" +
                    "<p><img src=\"https://maps.googleapis.com/maps/api/staticmap?zoom=15&size=600x300&maptype=roadmap&markers=color:red%7C" +
                    report.latitude + "," + report.longitude +
                    "&key=AIzaSyB993oF7I38X3PgnAFnZbHxgyQbQY_6_4Q\"></p>" +
                    "<p>Image:</p>" +
                    "<img src=\"https://s3.eu-west-2.amazonaws.com/swans.app-file-uploads/" + report.imageFilename + "\"></p>" +
                    "<p>Best</p>" +
                    "<p>Swans.app</p>",
                    Charset: 'UTF-8'
                }
            }
        },
        Source: "Swans.app <noreply@swans.app>",
        ReplyToAddresses: [
            "Swans.app <noreply@swans.app>"
        ]
    };
    // Send the email
    ses.sendEmail(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
            context.fail('Internal Error: The email could not be sent.');
        } else {
            console.log(data);           // successful response
            context.succeed('The message was successfully sent.');
        }
    });
    const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(report)
  };
    console.log("Finish Flytipping Report");

    callback(null, response);
};
