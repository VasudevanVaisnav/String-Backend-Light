const gcm = require("node-gcm")
const user = require("../models/user.js");
const sender = new gcm.Sender('AAAABvcFeQk:APA91bFlHQPzHlRERqujhtnLSjSdajMpNlBLoq9ykowRqdBHZf3AoTUDDO_4VIzM6-N30aqqXVNUOfSWjDKPBkklmZPCjDHvga6DXsFfezu4Ndj3fOB9lu83VeWEbH1xRnLunP0gUQ14');
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
    message.addData('fromNum',sen);
    message.addData('fromName',sen);
    message.addData('key',key);
    message.addData('message',msg);
    user.findOne({"mobile":rec},(ferr,fres)=>{
        if (!ferr && fres){
            
            registrationTokens = [];
            registrationTokens.push(fres.address)
            console.log(registrationTokens);
            sender.send(message, { registrationTokens: registrationTokens }, 10, function (err, response) {
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
