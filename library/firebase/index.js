var firebase = global.firebaseClient

/*
Firebase.prototype.init = function(){

    firebase.initializeApp({
        
        databaseURL: "https://friendlychat-c3820.firebaseio.com/",
        apiKey: "AIzaSyBNkvqLE2LmxGUdQLxr_TlkBWfT9CC7jXo",
        authDomain: "friendlychat-c3820.firebaseapp.com",
        databaseURL: "https://friendlychat-c3820.firebaseio.com",
        messagingSenderId: "56315327945"
    });
    // storage = googleCloud.storage({ 
    //     projectId:"friendlychat-c3820",
    //     keyFileName:"../../friendlychat-2c0fb7d4e6d8.json",
    // });
}*/

function FirebaseChat(){

    // init();
    this.auth = firebase.auth();
    this.database = firebase.database();
    
    // this.storage = storage.bucket("friendlychat-c3820.appspot.com");
    
    this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
    
}
FirebaseChat.prototype.getCurrentUser = function(){
    return this.auth.currentUser;
}

FirebaseChat.prototype.createUser = function(email,password,callback){
    var val;
     firebase.auth()
            .createUserWithEmailAndPassword(email,password)
            .then(function(user){
                val = {email:email,uid:user.uid,code:200,message:'create user successful...'};
                return user.getToken();
            })
            .then(function(token){
                val.token = token;
                console.log(token);
                return callback(val);
            })
            .catch(function(err){
               
                return callback(err);
            })   
}

FirebaseChat.prototype.signIn = function(email,password,callback){
   var val;
   this.auth
        .signInWithEmailAndPassword(email,password)
        .then(function(user){
            
            val = {email:email,uid:user.uid,code:200,message:'login successful...'};
            return user.getToken();
        })
        .then(function(token){
            val.token = token;
            console.log(token);
            return callback(val); 
        })
        .catch(function(err){
            console.log(err);
            return callback(err);
        })
}

//buat client

FirebaseChat.prototype.onAuthStateChanged = function(user){
    
    if(user){
        
    }else{
        return {code:401,message:'Not authorized, please login first...'}
    }
}

FirebaseChat.prototype.signOut = function(){
    return this.auth.signOut();
}

FirebaseChat.prototype.getUser = function(){
    
    return this.auth.currentUser;
}

FirebaseChat.prototype.saveUser = function(uid,email){
    var val;
    if(!email || !uid){
        val = {code:401,message:'Authentication failed, no email/uid provided...'};
        return val;
    }else{
        var userRef = this.database.ref('users/'+uid);
        var date = new Date();
        userRef.set({
            email:email,
            uid:uid,
            date_add:date,
            date_upd:date,
            groups:{},
        })
        return true;
    }
    
}

FirebaseChat.prototype.updateUser = function(uid,data){
    //update user
}

FirebaseChat.prototype.getToken = function(){
   
    if(this.auth.currentUser)
        var token = this.auth.currentUser.getToken();
    else
        var token = null;
    return token;
}

FirebaseChat.prototype.authToken = function(token,callback){
    var result;
    if(!token)
        return callback(null);

    this.auth.signInWithCustomToken(token)
        .then(function(data){
            result = {  code:200,
                        message:'login successful...',
                        email:data.email,
                        uid:data.uid,
                    };
            this.user = data;
            return callback(result);
        })
        .catch(function(err){
            result = {  code:401,
                        message:err.message
                    };
            return callback(result);
        })
}

FirebaseChat.prototype.loadGroups = function(){
    var groupRef = this.database.ref('groups');
}

FirebaseChat.prototype.createGroups = function(uid,email){
    var groupRef = this.database.ref('groups');
}

FirebaseChat.prototype.saveMessage =  function(uid,data,callback){
    var date = new Date();
    var messageRef = this.database.ref('messages');
    data.group_id='';
    messageRef.push(
            {   uid:uid,
                text:data.text,
                group_id:data.group_id,
                date_add:date,
                date_upd:date,
                status:data.status,
            })
            .then(function(result){
                console.log(result);
                return callback(result);
            })
            .catch(function(err){
                console.log(err);
                return callback(err);
            }) 
    
}

FirebaseChat.prototype.loadMessage = function(){
    // messagesRef = this.database.ref('messages');
    // messagesRef.off();
    // // Loads the last 12 messages and listen for new ones.
    // var setMessage = function(data) {
    //     var val = data.val();
    //     this.displayMessage(data.key, val.name, val.text, val.photoUrl, val.imageUrl);
    // }.bind(this);

    // messagesRef.limitToLast(12).on('child_added', setMessage);
    // messagesRef.limitToLast(12).on('child_changed', setMessage);
}
module.exports = FirebaseChat;