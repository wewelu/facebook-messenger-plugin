var express = require('express');

var app = express();

var http = require('http').Server(app);

app.use(express.static(__dirname));

app.set('view engine', 'jade');

function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }

app.get('/', function(req, res){
  //res.sendFile((__dirname)+"/index1.html");
  res.render("index",{guid:guid()});
});

app.get('/webhook', function (req, res) {
    console.log("into web hook");

    if (req.query['hub.verify_token'] === '⁠⁠⁠Processmesaage') {
      res.send(req.query['hub.challenge']);
   } else {
      res.send('Error, wrong validation token');    
   }
})

http.listen(5000, function () {
	console.log('Express server listening on port 5000');
});