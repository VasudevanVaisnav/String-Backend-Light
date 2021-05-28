const user = require("../models/user");
var i = 0;

function check(res,ip,op){
    if (ip.length==0){
        return res.status(200).json({"message":op});
    }
    else{
        let contact = ip[ip.length-1]
        ip.pop()
        user.findOne({"mobile":contact.pno},(error,result)=>{
            if (!error && result){
                op.push(contact);
                return check(res,ip,op);
            }
            else{
                return check(res,ip,op);
            }
        })
    }
}

function getContacts(req,res,next){
    console.log("contacts");
    console.log(req.body)
    const ipList = req.body.contacts;
    var opList = []
    return check(res,ipList,opList);
}
module.exports = getContacts;