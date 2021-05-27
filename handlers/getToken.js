const user = require('../models/user.js');

function getToken(req,res,next){
    var userid = req.body.userid;
    user.findOne({mobile:userid},(error,result)=>{
        if (error){
            return res.status(250).json({"error":true,"message":"unable to get"});
        }
        else{
            return res.status(200).json({"error":false,"message":result.address})
        }
    })
}

module.exports = getToken;