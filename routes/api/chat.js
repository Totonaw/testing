var express = require('express');
var router = express.Router();
var crypto = require('crypto');
// var md5 = crypto.createHash('md5');
var Firebase = requirePath('library/firebase/index');
var FirebaseChat = new Firebase('client');

var server = requirePath('library/firebase/server');
var FirebaseServer = new server();
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
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // res.setHeader('Content-Type','application/x-www-form-urlencoded');
    var token = req.params.token || req.query.token || req.body.token;
   
    if(!token){
        //buoooodoooooo!!!!!
        var email = req.params.email || req.query.email || req.body.email;
        var passwd = req.params.password || req.query.password || req.body.password;
        
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
        FirebaseChat.signIn(email,passwd,function(result){
            // console.log(result)
            switch(result.code){
                case 200 :  
                      //  FirebaseServer.getToken(result.uid,function(token){
                                res.user = { code:result.code,
                                                message:result.message,
                                                email:email,
                                                uid:result.uid,
                                                data_email:result.email,
                                               token:result.token,    
                                            };
                                console.log(res.user);
                                //    res.token = FirebaseChat.getToken();
                                next();
                       //        });
                            break;
                //case email belum ada di daftarin auto pake password ngasal...? bodoooooo....
                case 'auth/user-not-found' :
                    FirebaseChat.createUser(email,passwd,function(result){
                        res.user = { code:result.code,
                                                message:result.message,
                                                email:email,
                                                uid:result.uid,
                                                data_email:result.email,
                                               token:result.token,    
                                            };
                        next();                    
                    });
                    break;
                default : next(result);break;    
            }
        })
    
    }else{
        //buoooodoooooo lagi....
        /*
        FirebaseChat.authToken(token,function(result){
            if(result.code!=200)
                next(result);
            else{
                res.user = { code:result.code,
                             message:result.message,
                             email:result.email,
                             uid:result.uid,
                        }
                next();
            }
        })
        */

        FirebaseServer.verifyToken(token,function(result){

            if(result.code==200){
                res.user = {
                        code:result.code,
                        message:result.message,
                        email:result.data.email,
                        uid:result.data.uid,
                        token:token,
                }
                next();
            }else{ 
                //check token expired, create new token
                if(result.message.indexOf('expired') !== -1){
                    // console.log('ha')
                    var token = FirebaseChat.getToken();
                    // if(!token || token==null){
                    //     var err = {code:401,message:'Please re-login...',data:{token:null}}
                    //     next(err)
                    // }else{
                
                    //     next();
                    // }
                    var err = {code:401,message:'refresh token...',data:{token:token}};
                    next(err);
                }else{
                    //other errors go here...
                    console.log('hhhh')
                    next(result);
                }
            }
        });
    }
})

function loginUser(req,res,next){
    console.log(req);
}

router.route('/login')
    .get(function(req,res,next){

    })
    .post(function(req,res,next){

    })
 ;   

router.route('/users')
    .get(function(req,res,next){
        var user = FirebaseChat.getUser();
        console.log(user);
        console.log('hei');
        return res.send(res.user);
    })
    .post(function(req,res,next){
        return res.send(res.user);
    })
    .delete(function(req,res,next){
        FirebaseChat.signOut()
        .then(function(result){
            return res.send('sukses sign out');
        })
        .catch(function(err){
            return res.send(err);
        })
    })
; 

router.route('/messages')
    .get(function(req,res,next){
        if(res.user){
            
            return res.send(res.user);
        }else{
           return res.send('no username/password found...');
        }
        
    })
    .post(function(req,res,next){
        var dataMessages = req.body.data;
        
        var uid = res.user.uid;
        FirebaseChat.saveMessage(uid,dataMessages,function(result){
            console.log(result);
        })
        res.send('create messages...');
    })
    .put(function(req,res,next){
        res.send('update messages...');
    })
    .delete(function(req,res,next){
        res.send('delete messages...');
    })


//error handling here 
router.use(function(err,req,res,next){
    // console.log(typeof err);
    var val = {code:err.code,messages:err.message,err_code:err.code,data:err.data};
    new Error();
    res.status = err.code;
    res.send(val);
})

module.exports = router;