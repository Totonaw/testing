var express = require('express');
var router = express.Router();

var Firebase = requirePath('library/firebase/index');
var FirebaseChat = new Firebase('client');

router.route('/')
    .get(function(req,res,next){
        res.send('login....')
    })
    .post(function(req,res,next){
        var email = req.body.email;
        var passwd = req.body.password;
        var err;
        if(!email || !passwd){
            err = {code:401,message:'No email/password provided...'};
            next(err);
        }else{
            FirebaseChat.signIn(email,passwd,function(result){
            
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
                                    //    res.token = FirebaseChat.getToken();
                                    res.send(res.user);
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
                            res.send(res.user);
                            // next();                    
                        });
                        break;
                    default : err = {code:401,message:result.messages,data:result.code};
                            next(err);break;    
                }
            })
        }
    })

//error handling here 
router.use(function(err,req,res,next){
    // console.log(err);
    var val = {code:err.code,messages:err.message,err_code:err.code,data:err.data};
   
    res.send(val);
})

module.exports = router;