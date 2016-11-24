var firebaseclient = require('firebase');
var firebaseadmin = require('firebase-admin');

const serviceAccount = {
            projectId: "friendlychat-c3820",
            clientEmail: "testchat@friendlychat-c3820.iam.gserviceaccount.com",
            privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC1dewrBmhICn0C\no4IAO8mkpVA0Sp0SAN5Vv4s+v/Borkjtj7U0qidc9tePxWWYYNUi984OgTTP03xl\nXI7YDUaYVxodqv9nkXTjXUYsXNmv3BNyBosd28uuJ/Pw7vJomUyD8z/YywcWkWIh\ncKXnPQOewhd9zGZBPAltbix5CwrVR0bNjRIJplzh9Ygi6+obMZhEVzE23CqhBNOJ\n8Ikmd3fixhu8jvWxFnKsGMKCCtYJL1NX1Be9/ANx1b1PlgZHKDKDcM1vJ0wUcc7g\nA14ncLCVY8bHUGVkrVfz0Dofz4r9FfGrc+e44pM+m6+Lj8WsCGm6/eFQ7SLlv6oo\n4Dl9/VLFAgMBAAECggEAIqE1h+R6JD10K/u+RIMkcTpnOwN+REBMLfsW/MuuepvA\nKS4Cu+E5D+G/s51NTS41nq3B8jywMnU+yS1HyW2HKm18+2p1wXMd5oIXcUHq/Ue3\nokwjYnhev4a6ZCGFu3Z+BrR2W84rNSBbpNwVnTKkrTiHOSe33/0wI2UiMZts3tSf\npbhv9XehuyofZAr+BJdoWfptvGC+QxsMEZppYL3CWLpFvybOtBNTrsxfYwYS2Dcv\nIkhLAIqK0DCgJbF/Lr7odmhWfjREQSSA8rZ+ZCgePyE8AimcCrk00bVyjfOlRkVe\nB1UjhdvtYf2LmKA+wxWfbHVm00p/55sS4Xu3Yg4poQKBgQDw19Nhn0uegFna+X2o\nU+Vg/H+UBMVw4GugD4sCBk5/Lwstho840khyy2OKPlXIXkapQjay0dAfBy3Iu01w\nWNlADhTQHE+8uJLCZH5H/6gbNTIscgpEY2CSx7V2jvZvZhXWgS4Gmj4/2WGqZQol\nW09p94XV3C4LI2huvQkOHMpwCQKBgQDA4WX6t9tSrhThNb6yciPP7VW5/7S1ifYq\nZbFs8Xfv87j/K7EkPSTACKlNpV+pTfCuT9bNeq7IAwPPsDr6BF8iKgTLrSI4Rv+S\nR+jeWEiV4eSeLE3CbwGUAjMyrmvH2tHsRyFTVYy9te+ArLJNFWBhYFfnQOSbjcxn\nj3wGmjaD3QKBgQCWgoo7K82aFCQTUG9Szns+jQ09d23cCKO5t3zrmv1bRg76OGkw\n3VkhRDHEpwf8283U4OhGABDMEzRtiX/vgdbizOn81HSQP9iXWy3/2Kk5t5jPZcU8\nz83+bIfeu6EOJQHot3oH7kSQqkz6q4IXrmSGmIUvDRZJJ6uP6NrL0vo/4QKBgFDw\nxYjXCtTBdMWldicQOvMQl778DWt5P7I/Bpu/ISOy1VlPjoC0n+1uNQ3+bgxwRqX/\nnxaPezU3/qtzOuycVQfTNjv6pbeUI7/RKWnVBnDPYM73rJIBX1orKi0EgPpXW2yZ\n1ORRrEQYSy9mSVSLuexjL8A9vTGB6dsznUpwAJyJAoGBAMDVp95Lv0xKAez9igYH\njRnaOepdLQcGgR3lRVNpJjNipxXIkmOSSYpJjUEmhRwQ6PMOSvPcWlQnIIIiwxtq\nlBtg+wEAjwPg93cxTzrac9zAHsFCmSLmv+OjIcMqP/3/8iXgvLeoXP0Rl6HAsUF3\nch9hEallHnI0Upi1H05p8uqK\n-----END PRIVATE KEY-----\n"
        }
    ;

function initServer(){
    firebaseadmin.initializeApp({
        //deprecated
        // serviceAccount: {
        //     projectId: "friendlychat-c3820",
        //     clientEmail: "testchat@friendlychat-c3820.iam.gserviceaccount.com",
        //     privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC1dewrBmhICn0C\no4IAO8mkpVA0Sp0SAN5Vv4s+v/Borkjtj7U0qidc9tePxWWYYNUi984OgTTP03xl\nXI7YDUaYVxodqv9nkXTjXUYsXNmv3BNyBosd28uuJ/Pw7vJomUyD8z/YywcWkWIh\ncKXnPQOewhd9zGZBPAltbix5CwrVR0bNjRIJplzh9Ygi6+obMZhEVzE23CqhBNOJ\n8Ikmd3fixhu8jvWxFnKsGMKCCtYJL1NX1Be9/ANx1b1PlgZHKDKDcM1vJ0wUcc7g\nA14ncLCVY8bHUGVkrVfz0Dofz4r9FfGrc+e44pM+m6+Lj8WsCGm6/eFQ7SLlv6oo\n4Dl9/VLFAgMBAAECggEAIqE1h+R6JD10K/u+RIMkcTpnOwN+REBMLfsW/MuuepvA\nKS4Cu+E5D+G/s51NTS41nq3B8jywMnU+yS1HyW2HKm18+2p1wXMd5oIXcUHq/Ue3\nokwjYnhev4a6ZCGFu3Z+BrR2W84rNSBbpNwVnTKkrTiHOSe33/0wI2UiMZts3tSf\npbhv9XehuyofZAr+BJdoWfptvGC+QxsMEZppYL3CWLpFvybOtBNTrsxfYwYS2Dcv\nIkhLAIqK0DCgJbF/Lr7odmhWfjREQSSA8rZ+ZCgePyE8AimcCrk00bVyjfOlRkVe\nB1UjhdvtYf2LmKA+wxWfbHVm00p/55sS4Xu3Yg4poQKBgQDw19Nhn0uegFna+X2o\nU+Vg/H+UBMVw4GugD4sCBk5/Lwstho840khyy2OKPlXIXkapQjay0dAfBy3Iu01w\nWNlADhTQHE+8uJLCZH5H/6gbNTIscgpEY2CSx7V2jvZvZhXWgS4Gmj4/2WGqZQol\nW09p94XV3C4LI2huvQkOHMpwCQKBgQDA4WX6t9tSrhThNb6yciPP7VW5/7S1ifYq\nZbFs8Xfv87j/K7EkPSTACKlNpV+pTfCuT9bNeq7IAwPPsDr6BF8iKgTLrSI4Rv+S\nR+jeWEiV4eSeLE3CbwGUAjMyrmvH2tHsRyFTVYy9te+ArLJNFWBhYFfnQOSbjcxn\nj3wGmjaD3QKBgQCWgoo7K82aFCQTUG9Szns+jQ09d23cCKO5t3zrmv1bRg76OGkw\n3VkhRDHEpwf8283U4OhGABDMEzRtiX/vgdbizOn81HSQP9iXWy3/2Kk5t5jPZcU8\nz83+bIfeu6EOJQHot3oH7kSQqkz6q4IXrmSGmIUvDRZJJ6uP6NrL0vo/4QKBgFDw\nxYjXCtTBdMWldicQOvMQl778DWt5P7I/Bpu/ISOy1VlPjoC0n+1uNQ3+bgxwRqX/\nnxaPezU3/qtzOuycVQfTNjv6pbeUI7/RKWnVBnDPYM73rJIBX1orKi0EgPpXW2yZ\n1ORRrEQYSy9mSVSLuexjL8A9vTGB6dsznUpwAJyJAoGBAMDVp95Lv0xKAez9igYH\njRnaOepdLQcGgR3lRVNpJjNipxXIkmOSSYpJjUEmhRwQ6PMOSvPcWlQnIIIiwxtq\nlBtg+wEAjwPg93cxTzrac9zAHsFCmSLmv+OjIcMqP/3/8iXgvLeoXP0Rl6HAsUF3\nch9hEallHnI0Upi1H05p8uqK\n-----END PRIVATE KEY-----\n"
        // },
        credential: firebaseadmin.credential.cert(serviceAccount),
        databaseURL: "https://friendlychat-c3820.firebaseio.com/",
        apiKey: "AIzaSyBNkvqLE2LmxGUdQLxr_TlkBWfT9CC7jXo",
        authDomain: "friendlychat-c3820.firebaseapp.com",
        databaseURL: "https://friendlychat-c3820.firebaseio.com",
        messagingSenderId: "56315327945"
    });

    return firebaseadmin.database();
    // storage = googleCloud.storage({ 
    //     projectId:"friendlychat-c3820",
    //     keyFileName:"../../friendlychat-2c0fb7d4e6d8.json",
    // });
}

function initClient(){
    firebaseclient.initializeApp({
        
        databaseURL: "https://friendlychat-c3820.firebaseio.com/",
        apiKey: "AIzaSyBNkvqLE2LmxGUdQLxr_TlkBWfT9CC7jXo",
        authDomain: "friendlychat-c3820.firebaseapp.com",
        databaseURL: "https://friendlychat-c3820.firebaseio.com",
        messagingSenderId: "56315327945"
    });

    return firebaseclient;
    // storage = googleCloud.storage({ 
    //     projectId:"friendlychat-c3820",
    //     keyFileName:"../../friendlychat-2c0fb7d4e6d8.json",
    // });
}

function Firebase(){
    // this.client = initClient;
    // this.server = initServer;
    this.client = firebaseclient.initializeApp({
        
        databaseURL: "https://friendlychat-c3820.firebaseio.com/",
        apiKey: "AIzaSyBNkvqLE2LmxGUdQLxr_TlkBWfT9CC7jXo",
        authDomain: "friendlychat-c3820.firebaseapp.com",
        databaseURL: "https://friendlychat-c3820.firebaseio.com",
        messagingSenderId: "56315327945"
    });
    this.server = firebaseadmin.initializeApp({
        //deprecated
        // serviceAccount: {
        //     projectId: "friendlychat-c3820",
        //     clientEmail: "testchat@friendlychat-c3820.iam.gserviceaccount.com",
        //     privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC1dewrBmhICn0C\no4IAO8mkpVA0Sp0SAN5Vv4s+v/Borkjtj7U0qidc9tePxWWYYNUi984OgTTP03xl\nXI7YDUaYVxodqv9nkXTjXUYsXNmv3BNyBosd28uuJ/Pw7vJomUyD8z/YywcWkWIh\ncKXnPQOewhd9zGZBPAltbix5CwrVR0bNjRIJplzh9Ygi6+obMZhEVzE23CqhBNOJ\n8Ikmd3fixhu8jvWxFnKsGMKCCtYJL1NX1Be9/ANx1b1PlgZHKDKDcM1vJ0wUcc7g\nA14ncLCVY8bHUGVkrVfz0Dofz4r9FfGrc+e44pM+m6+Lj8WsCGm6/eFQ7SLlv6oo\n4Dl9/VLFAgMBAAECggEAIqE1h+R6JD10K/u+RIMkcTpnOwN+REBMLfsW/MuuepvA\nKS4Cu+E5D+G/s51NTS41nq3B8jywMnU+yS1HyW2HKm18+2p1wXMd5oIXcUHq/Ue3\nokwjYnhev4a6ZCGFu3Z+BrR2W84rNSBbpNwVnTKkrTiHOSe33/0wI2UiMZts3tSf\npbhv9XehuyofZAr+BJdoWfptvGC+QxsMEZppYL3CWLpFvybOtBNTrsxfYwYS2Dcv\nIkhLAIqK0DCgJbF/Lr7odmhWfjREQSSA8rZ+ZCgePyE8AimcCrk00bVyjfOlRkVe\nB1UjhdvtYf2LmKA+wxWfbHVm00p/55sS4Xu3Yg4poQKBgQDw19Nhn0uegFna+X2o\nU+Vg/H+UBMVw4GugD4sCBk5/Lwstho840khyy2OKPlXIXkapQjay0dAfBy3Iu01w\nWNlADhTQHE+8uJLCZH5H/6gbNTIscgpEY2CSx7V2jvZvZhXWgS4Gmj4/2WGqZQol\nW09p94XV3C4LI2huvQkOHMpwCQKBgQDA4WX6t9tSrhThNb6yciPP7VW5/7S1ifYq\nZbFs8Xfv87j/K7EkPSTACKlNpV+pTfCuT9bNeq7IAwPPsDr6BF8iKgTLrSI4Rv+S\nR+jeWEiV4eSeLE3CbwGUAjMyrmvH2tHsRyFTVYy9te+ArLJNFWBhYFfnQOSbjcxn\nj3wGmjaD3QKBgQCWgoo7K82aFCQTUG9Szns+jQ09d23cCKO5t3zrmv1bRg76OGkw\n3VkhRDHEpwf8283U4OhGABDMEzRtiX/vgdbizOn81HSQP9iXWy3/2Kk5t5jPZcU8\nz83+bIfeu6EOJQHot3oH7kSQqkz6q4IXrmSGmIUvDRZJJ6uP6NrL0vo/4QKBgFDw\nxYjXCtTBdMWldicQOvMQl778DWt5P7I/Bpu/ISOy1VlPjoC0n+1uNQ3+bgxwRqX/\nnxaPezU3/qtzOuycVQfTNjv6pbeUI7/RKWnVBnDPYM73rJIBX1orKi0EgPpXW2yZ\n1ORRrEQYSy9mSVSLuexjL8A9vTGB6dsznUpwAJyJAoGBAMDVp95Lv0xKAez9igYH\njRnaOepdLQcGgR3lRVNpJjNipxXIkmOSSYpJjUEmhRwQ6PMOSvPcWlQnIIIiwxtq\nlBtg+wEAjwPg93cxTzrac9zAHsFCmSLmv+OjIcMqP/3/8iXgvLeoXP0Rl6HAsUF3\nch9hEallHnI0Upi1H05p8uqK\n-----END PRIVATE KEY-----\n"
        // },
        credential: firebaseadmin.credential.cert(serviceAccount),
        databaseURL: "https://friendlychat-c3820.firebaseio.com/",
        apiKey: "AIzaSyBNkvqLE2LmxGUdQLxr_TlkBWfT9CC7jXo",
        authDomain: "friendlychat-c3820.firebaseapp.com",
        databaseURL: "https://friendlychat-c3820.firebaseio.com",
        messagingSenderId: "56315327945"
    });
}

Firebase.prototype.test = function(){
    console.log('test');
}

module.exports = Firebase;