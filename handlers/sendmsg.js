const fcm = require("fcm-node")
const user = require("../models/user.js");
const sender = new fcm('AAAABvcFeQk:APA91bG09Dp52XI0HV9ZZKplgdzyeiqhrURqoXVXMFp-DbfcmqJAQ_-C_iO10MCBIFuT0nYwypYYC8KfEmcid5RF1oS1S7jdT710Erp9hU9NZL0wcda-TjwKBMSxMHvO5yU1WkTgn-_g');
function sendmsg(req,res,err){

    var messagef = { 
        data: {  
        }
    };
    console.log("sendmsg");
    console.log(req.body);
    const msg = req.body.message;
    const key = req.body.key;
    const rec = req.body.to;
    const sen = req.body.from;
    messagef.data.fromNum = sen;
    messagef.data.fromName = sen;
    messagef.data.key = key;
    messagef.data.message = msg;
    user.findOne({"mobile":rec},(ferr,fres)=>{
        if (!ferr && fres){
            messagef.to = fres.address;
            console.log(messagef);
            sender.send(messagef, function (err, response) {
                if(err){
                    console.log("failure");
                    console.log(err);
                    return res.status(250).json({"error":true,"message":"not sent"})
                }
                else{
                    console.log("Success");
                    return res.status(200).json({"error":false,"message":"sent"})
                }
            });
        }
        else{
            return res.status(250).json({"error":true,"message":"not sent"})
        }
    })
}
module.exports=sendmsg;
