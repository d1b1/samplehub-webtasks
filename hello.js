
var request = require('request');

// Handles the messaging to connect with Twilio.
// Need Docs.  

return function (context, callback) {
    var required_params = ['TWILIO_TOKEN', 'TWILIO_SID', 'TWILIO_PHONE', 'to', 'message'];
    for (var p in required_params)
        if (!context.data[required_params[p]])
            return callback(new Error('The `' + required_params[p] + '` parameter must be provided.'));

    request({
        url: 'https://api.twilio.com/2010-04-01/Accounts/' + context.data.TWILIO_SID + '/Messages',
        method: 'POST',
        auth: {
            user: context.data.TWILIO_SID,
            pass: context.data.TWILIO_TOKEN
        },
        form: {
            From: context.data.TWILIO_PHONE,
            To: context.data.to,
            Body: context.data.message
        }
    }, function (error, res, body) {
        callback(error, body);
    });
}
