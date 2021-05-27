const user = require("../models/user.js");
function getKey(req,res,next){
    const ofId = req.body.toId;
    console.log("getKey");console.log(req.body);
    user.findOne({mobile:ofId},(error,doc)=>{
        if (!error && doc){
            console.log("Success");
            return res.status(200).json({"error":false,"publicKey":{"mod":doc.publicKeyMod,"exp":doc.publicKeyExp}});
        }
        else{
            if(!doc){
                return res.status(250).json({"error":true,"message":"User not found"});
            }
            else{
                return res.status(250).json({"error":true,"message":"Error Fetching Data"});
            }
        }
    })
}
module.exports = getKey;