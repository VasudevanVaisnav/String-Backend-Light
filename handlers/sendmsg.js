const gcm = require("node-gcm")
const user = require("../models/user.js");
const sender = new gcm.Sender('AAAA8h6rKOE:APA91bGG-YNCVGlNNWaKknR9vS7i4rKkadbcNDQHMc0OLgRMuimVcsfK28QwcjetYwUI5K8c1Jt2m1Y8GvtMb1EbmKgC3LE0npfMo758HvokPTzzC12uomn5OsayyjjllPzXx7EPG5hS');
function sendmsg(req,res,err){
   
    var registrationTokens = [];
    const message = new gcm.Message({ 
        priority:'high',
        contentAvailable:true,
        delayWhileIdle:true,
        timeToLive:86400,
    });
    console.log("sendmsg");
    console.log(req.body);
    const msg = req.body.message;
    const key = req.body.key;
    const rec = req.body.to;
    const sen = req.body.from;
    message.addData('from',sen);
    message.addData('key',key);
    message.addData('message',msg);
    user.findOne({"mobile":rec},(ferr,fres)=>{
        if (!ferr && fres){
            return res.status(250).json({"error":true,"message":"not sent"})
        }
        else{
            registrationTokens = [];
            registrationTokens.push(fres.address)
            sender.send(message, { registrationTokens: registrationTokens }, 10, function (err, response) {
                if(err){
                    return res.status(250).json({"error":true,"message":"not sent"})
                }
                else{
                    console.log("Success");
                    return res.status(200).json({"error":false,"message":"sent"})
                }
            });
        }
    })
}
module.exports=sendmsg;