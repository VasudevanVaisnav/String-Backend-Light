const user = require("../models/user");
function check(ip,op){
    newIp = ip;
    if (newIp.length==0){
        return op;
    }
    else{
        const contact = ip[ip.length-1];
        newIp.pop();
        var newOp = op;
        console.log(contact);
        console.log(newOp);
        user.findOne({"mobile":contact.pno},(error,result)=>{
            if (!error && result){
                newOp.push(contact);
            }
            return check(newIp,newOp);
        });
    }
}
function getContacts(req,res,next){
    console.log("contacts");
    // console.log(req.body)
    const ipList = req.body.contacts;
    var opList = []
    var outList = check(ipList,opList);
    // console.log(opList)
    return res.status(200).json({"error":false,"message":outList});
}
module.exports = getContacts;