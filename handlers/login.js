const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const nodefcm = require("node-gcm");
const user = require("../models/user");

function login(req,res,next){
    console.log("Login");
    console.log(req.body.uname);
    const uname = req.body.uname;
    const pass = req.body.pass;
    if (!isNaN(uname)){
        user.findOne({"mobile":uname},(ferr,fres)=>{
            if (ferr){
                console.log(ferr);
                return res.status(250).json({"error":true,"message":"login failed"});
            }
            else if(!fres){
                return res.status(250).json({"error":true,"message":"user doesnt exists"});
            }
            else{
                bcrypt.compare(pass,fres.password,(herr,verdict)=>{
                    if (herr){
                        console.log(herr);
                        return res.status(250).json({"error":true,"message":"login failed"});
                    }
                    else if(verdict){
                        user.updateOne({"mobile":uname},{$set:{publicKeyMod:req.body.mod,publicKeyExp:req.body.exp,address:req.body.notifToken,device:req.body.device}},(modErr,modRes)=>{
                            if (!modErr && modRes){
                                console.log("Success");
                                return res.status(200).json({"error":false,"message":fres});
                            }
                            else{
                                console.log(modErr);
                                return res.status(250).json({"error":true,"message":"login failed"});
                            }
                        });
                    }
                    else{
                        return res.status(250).json({"error":true,"message":"invalid credentials"});
                    }
                });
            }
        }); 
    }
    else{
        user.findOne({"email":uname},(ferr,fres)=>{
            if (ferr){
                console.log(ferr)
                return res.status(250).json({"error":true,"message":"login up failed"});
            }
            else if(!fres){
                return res.status(250).json({"error":true,"message":"user doesnt exists"});
            }
            else{
                bcrypt.compare(pass,fres.password,(herr,verdict)=>{
                    if (herr){
                        console.log(herr);
                        return res.status(250).json({"error":true,"message":"login failed"});
                    }
                    else if(verdict){
                        user.updateOne({"email":uname},{$set:{publicKeyMod:req.body.mod,publicKeyExp:req.body.exp,address:req.body.notifToken,device:req.body.device}},(modErr,modRes)=>{
                            if (!modErr && modRes){
                                return res.status(200).json({"error":false,"message":fres});
                            }
                            else{
                                console.log(modErr);
                                return res.status(250).json({"error":true,"message":"login failed"});
                            }
                        });
                    }
                    else{
                        return res.status(250).json({"error":true,"message":"invalid credentials"});
                    }
                });
            }
        }); 
    }
}

module.exports = login;