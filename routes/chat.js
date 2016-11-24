var express = require('express');
var router = express.Router();
var http = require('http');
var querystring = require('querystring');
var session = require('express-session');

router.route('/')
    .get(function(req,res,next){
        res.render('chat/index',{layout:false});
    })
    .post(function(req,res,next){
        var email = req.body.email;
        var password = req.body.password;
        if(!email || !password)
            return res.send('please fill all forms...');
        else{
           var options = {
            "method": "POST",
            "hostname": "localhost",
            "port": "3001",
            "path": "/api/chat/messages",
            "headers": {
              "content-type": "application/x-www-form-urlencoded",
              "cache-control": "no-cache",
              "postman-token": "c0d77552-f809-6c41-dd23-443b82b684cf"
            }
        };

var req = http.request(options, function (result) {
  var chunks = [];

  result.on("data", function (chunk) {
    chunks.push(chunk);
  });

  result.on("end", function () {
    var body = Buffer.concat(chunks);
   console.log('egggg');
   res.send(body.toString());
  });
});

req.write(querystring.stringify({ email: 'test1@test.com', password: 'testsdad' }));
req.end();
// res.send('g');
        }
    })

 module.exports = router;   