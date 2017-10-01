var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var request = require('request');

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.set('view engine', 'jade');

function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +s4() + '-' + s4() + s4() + s4();
}


app.get('/', function(req, res){
  res.render("index",{guid:guid()});
});

app.get('/webhook', function (req, res) {
    console.log("into web hook");
    if (req.query['hub.verify_token'] === '⁠⁠⁠Processmesaage') {
      res.send(req.query['hub.challenge']);
   } else {
      res.send('Error, wrong validation token');    
   }
});

app.post('/webhook', function (req, res) {
    console.log("into post web hook");
    console.log(req.body);
    console.log(req.body.entry[0].messaging);
    res.sendStatus(200)
});

app.post('/sendmessage',function (req, res){
     
    console.log("intosendmessaage");
    var headers = {
      'Content-Type': 'application/json'
    }
    
    var options = {
      url: "https://graph.facebook.com/v2.6/me/messages?access_token=EAABeoceIUAoBANv3sruKlNkeHNoJaG9EO5eVZCg1dd8vxqEOvA6wRi2h5vCyFMTl4hRi2BWzF1fnGIBT35gQ3F7LIxgyiV9iZCuFAFs8Llkseix6tEmEzoPLZAKfZB20UJFp7TTNKQFnZCoatXydoKivXdTZAvHu1LKUMk9GkWnDe1q9a1DtD1",
      method: 'POST',
      headers: headers,      
      form: {
        "recipient": {
          "user_ref":  req.body.user_ref
        }, 
        
        "message": {
          "text":req.body.message
        }
      }
    }
    
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
        res.sendStatus(200);
      }
      else{
        res.sendStatus(response.statusCode);
    }
  });
});



http.listen(5000, function () {
	console.log('Express server listening on port 5000');
});