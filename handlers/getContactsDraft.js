const user = require("../models/user");
var i = 0;

function getContacts(req,res,next){
    console.log("contacts");
    console.log(req.body)
    // match contacts
    user.find({mobile:req.body.contacts},(err,data)=>{
      if(!err){
        console.log(data);
        return res.status(200).json({"msg":data})
      }else{
        console.log(err);
        return res.status(500).json({"msg":"data base error"})
      }
    })
}
module.exports = getContacts;