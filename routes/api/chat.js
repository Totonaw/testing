var express = require('express');
var router = express.Router();
var crypto = require('crypto');
// var md5 = crypto.createHash('md5');
var Firebase = requirePath('library/firebase/index');
var FirebaseChat = new Firebase();
// var orm = requirePath('models/');

var  algorithm = 'aes-256-ctr';
var  password = 'test123token';

function generateToken(user,password){
    var text = user+password;
    var cipher = crypto.createCipher(algorithm,password)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
}
 
function decryptToken(token){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(token,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

router.use(function(req,res,next){
    var token = req.params.token || req.query.token || req.body.token;
    if(!token){
        var email = req.params.email || req.query.email;
        var passwd = req.params.password || req.query.password || '';
        // orm.user.findAll({
        //         where : {
        //             $and:[{
        //                 username:email
        //             },
        //             {
        //                 password:require('crypto').createHash('md5').update(passwd).digest('hex')       
        //             }]
        //         },
        //         raw:true,
        //         plain:true,
        //     })
        //     .then(function(result){
        //         res.user = result;
        //         next();
        //     })
        //     .catch(function(err){
        //         console.log(err);
        //         next();
        //     });
        res.user = {username:email,password:passwd};
        console.log('hahaha');
        next();
    }else{
        next();
    }
})

router.route('/messages')
    .get(function(req,res,next){
        if(res.user){
            // res.user.token = token;
            // return res.json(res.user);
            var user = FirebaseChat.getUser();
            if(!user){
                FirebaseChat.signIn(res.user.username,res.user.password,function(result){
                    var data = {email:res.user.username,data:result};
                    return res.send(data);
                })
            }else{

            }
            
        }else{
            return res.send('no username/password found...');
        }
        
    })
    .post(function(req,res,next){
        res.send('create messages...');
    })
    .put(function(req,res,next){
        res.send('update messages...');
    })
    .delete(function(req,res,next){
        res.send('delete messages...');
    })

module.exports = router;