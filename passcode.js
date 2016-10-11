var app = new (require('express'))();
var wt = require('webtask-tools');
var Firebase = require('firebase');

// This will look for a given user's UID and attempt to set a passcode,
// and send an SMS.

// app.post('/user/:uid/verify'), function(req, res) {
//   res.send('Got the verify link.');
// });

// This will attempt to lookup a given user, and will check if the passcode
// provided matches the users account. If there is a match, then the users
// user.phoneVerified is set to true.

// app.put('/user/:uid/activate'), function(req, res) {
//   res.send('Got the activation link.');
// });

app.get('/test', function(req, res) {
  var url = require('url');
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  var ref = new Firebase('https://samplehub-25c4d.firebaseio.com/users/' + query.id);

  ref.on("value", function(snapshot) {
      //res.json({ d: snapshot.val()});

      // var nameSnapshot = snapshot.child("displayName");
      // var name = nameSnapshot.val();

      ref.update({test: 888892929298})
      // var data = snapshot.val();
      // data.passcode = '11111';

      // var t = snapshot;
      // console.log(t.$ref());

      //ref.set(data);
  //     ref.set(
  //       {
  //   "displayName": "Stephan Smith",
  //   "phone": "6179547947",
  //   "role": "administrator",
  //   "uid": "gkWh5GrKt3gbw6o3gI4wWPuoS2Q2"
  // });

    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
  });
});

module.exports = wt.fromExpress(app);

// Here we are exporting our express app using the wt helper library
// module.exports = wt.fromExpress(app).auth0({
//   // We are excluding the 'subscribe' route,
//   // so that anyone can subscribe to the newsletter
//   exclude : [ '/test', '/user/*/verify', 'user/*/activate' ],
//   // Here we are implementing a custom login error function which will send
//   // the user an appropriate message if the request is not authorized
//   loginError: function (error, ctx, req, res, baseUrl) {
//         res.writeHead(401, { 'Content-Type': 'application/json'})
//         res.end(JSON.stringify(RESPONSE.UNAUTHORIZED))
//     }
// });

// var request = require('request');
//
// // Handles the messaging to connect with Twilio.
//
// return function (context, callback) {
//     var required_params = ['TWILIO_TOKEN', 'TWILIO_SID', 'TWILIO_PHONE', 'to', 'message'];
//     for (var p in required_params)
//         if (!context.data[required_params[p]])
//             return callback(new Error('The `' + required_params[p] + '` parameter must be provided.'));
//
//     request({
//         url: 'https://api.twilio.com/2010-04-01/Accounts/' + context.data.TWILIO_SID + '/Messages',
//         method: 'POST',
//         auth: {
//             user: context.data.TWILIO_SID,
//             pass: context.data.TWILIO_TOKEN
//         },
//         form: {
//             From: context.data.TWILIO_PHONE,
//             To: context.data.to,
//             Body: context.data.message
//         }
//     }, function (error, res, body) {
//         callback(error, body);
//     });
// }
//
