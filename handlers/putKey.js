const user = require("../models/user.js");
function putKey(req,res,next){
    const ofId = req.body.ofId;
    user.findOne({mobile:ofId},(error,doc)=>{
        if (!error && doc){
            user.findOneAndUpdate({mobile:ofId},{$set:{publicKeyMod:req.body.mod,publicKeyExp:req.body.exp}},(error1,result)=>{
                if (!error1 && result){
                    res.status(200).json({"error":false,"message":"Done"}); 
                }
                else{
                    return res.status(250).json({"error":true,"message":"Error Updating Data"});        
                }
            })
        }
        else{
            return res.status(250).json({"error":true,"message":"Error Fetching Data"});
        }
    })
}
module.exports = putKey;