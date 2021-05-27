const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const nodefcm = require("node-gcm");
const user = require("../models/user");

function signup(req,res,next){
    console.log("Signup");
    console.log(req.body)
    const name = req.body.name;
    const uname = req.body.uname;
    const pno = req.body.pno;
    const pass = req.body.pass;
    user.findOne({"mobile":pno},(ferr,fres)=>{
        if (ferr){
            return res.status(250).json({"error":true,"message":"signed up failed"});
        }
        else if(fres){
            return res.status(250).json({"error":true,"message":"user exists"});
        }
        else{
            bcrypt.hash(pass,10,(hashErr,Res)=>{
                if (hashErr){
                    return res.status(250).json({"error":true,"msg":"Hash Error"});
                }
                else{
                    const data = new user({
                        name:name,
                        email:uname,
                        mobile:pno,
                        address:null,
                        device: null,
                        publicKeyMod:null,
                        publicKeyExp:null,
                        password:Res
                    });
                    data.save().catch(err => {
                        return res.status(250).json({"error":true,"message":"signed up failed"});
                    }).then(result=>{
                        console.log("Success");
                        return res.status(200).json({"error":false,"message":"successfully signed up"});
                    });
                }
            });
        }
    }); 
}

module.exports = signup;