var app = new (require('express'))();
var wt = require('webtask-tools');
var Firebase = require('firebase');

app.get('/test', function(req, res) {
  var url = require('url');
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  
  //dddd
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

// Here we are exporting our express app using the wt helper library
module.exports = wt.fromExpress(app).auth0({
  // We are excluding the 'subscribe' route, 
  // so that anyone can subscribe to the newsletter
  exclude : [ '/test' ],
  // Here we are implementing a custom login error function which will send
  // the user an appropriate message if the request is not authorized
  loginError: function (error, ctx, req, res, baseUrl) {
        res.writeHead(401, { 'Content-Type': 'application/json'})
        res.end(JSON.stringify(RESPONSE.UNAUTHORIZED))
    }
});