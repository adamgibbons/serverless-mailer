'use strict';

var AWS = require('aws-sdk');
var config = require('./config.json');

AWS.config.update({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
  region: config.aws.region
});

var ses = new AWS.SES();

module.exports.send = (event, context, callback) => {
  var emailParams = {
    Destination: {
      BccAddresses: event.body.bccEmailAddresses,
      CcAddresses: event.body.ccEmailAddresses,
      ToAddresses: event.body.toEmailAddresses
    },
    Message: {
      Body: {
        Text: {
          Data: event.body.bodyData,
          Charset: event.body.bodyCharset
        }
      },
      Subject: {
        Data: event.body.subjectdata,
        Charset: event.body.subjectCharset
      }
    },
    Source: event.body.sourceEmail,
    ReplyToAddresses: event.body.replyToAddresses
  };

  var response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Mail sent successfully.',
      input: event,
    }),
  };

  ses.sendEmail(emailParams, function (err, data) {
    if (err) {
      console.log(err, err.stack);
      callback(err);
    }

    console.log('SES successful');
    console.log(data);

    callback(null, response);
  });
};
