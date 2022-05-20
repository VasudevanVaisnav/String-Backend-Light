const user = require("../models/user.js");
var serviceAccount = require("../yuktahanotifs-firebase-adminsdk-n8oul-4d9ddf7ab3.json");
var admin = require("firebase-admin");
admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
function sendmsg(req,res,err){
    console.log("sendmsg");
    console.log(req.body);
    const msg = req.body.message;
    const key = req.body.key;
    const rec = req.body.to;
    const sen = req.body.from;
    var options = {
        priority:"high",
        timeToLive:60*60*24
    };
    var payLoad = {
        data:{
            fromNum:sen,
            fromName:sen,
            key:key,
            message:msg
        }
    }
    user.findOne({"mobile":rec},(ferr,fres)=>{
        if (!ferr && fres){
            console.log(fres.address);
            admin.messaging().sendToDevice(fres.address,payLoad,options)
            .then(function(response){
                console.log(response);
                return res.status(200).json({"error":false,"message":"Sent"});
            })
            .catch(function(error1){
                console.log(error1);
                return res.status(250).json({"error":true,"message":"Fail"});
            });
        }
        else{
            return res.status(250).json({"error":true,"message":"not sent"})
        }
    })
}
module.exports=sendmsg;
