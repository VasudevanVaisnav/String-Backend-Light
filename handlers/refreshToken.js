const user = require('../models/user.js');

function refreshToken(req,res,next){

    
    var userid = req.body.userid;
    var address = req.body.address;
    user.findOneAndUpdate({mobile:userid},{$set:{address:address}},(error,result)=>{
        if (error){
            return res.status(250).json({"error":true,"message":"unable to refresh"});
        }
        else{
            user.findOne({userid:userid},(error1,result1)=>{
                return res.status(200).json({"error":false,"message":result1});
            })
        }
    })
}

module.exports = refreshToken