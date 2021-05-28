const user = require("../models/user");
function check(ip,op){
    newIp = ip;
    if (newIp.length==0){
        return [];
    }
    else{
        const contact = ip[ip.length-1];
        newIp.pop();
        var newOp = op;
        // console.log(contact);
        // console.log(newOp);
        if (contact.pno=="9942289061"){
            console.log("Check");
        }
        user.findOne({"mobile":contact.pno},(error,result)=>{
            if (!error && result){
                newOp.push(contact);
                console.log("Succ");
                xyz =  check(newIp,newOp);
                xyz.push(contact);
                return xyz;
            }
            else{
                return check(newIp,newOp);
            }
        });
    }
}
function getContacts(req,res,next){
    console.log("contacts");
    // console.log(req.body)
    const ipList = req.body.contacts;
    var opList = []
    var outList = check(ipList,opList);
    console.log("opList")
    console.log(opList)
    return res.status(200).json({"error":false,"message":outList});
}
module.exports = getContacts;