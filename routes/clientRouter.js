const express = require('express');
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const nodegcm = require("node-gcm");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const router = express.Router();
const OAuth2 = google.auth.OAuth2;


const login = require("../handlers/login");//Done
const signup = require("../handlers/signup");//Done
const getKey = require("../handlers/getKey.js");//Done
const putKey = require("../handlers/putKey");//Done
const sendmsg = require("../handlers/sendmsg");//Done
const refreshToken = require("../handlers/refreshToken");//Done
const getToken = require("../handlers/getToken");//Done

router.post('/login',login);//verified
router.post('/signup',signup);//verified
router.post('/getkey',getKey);//verified
router.post('/putkey',putKey);//verified
router.post('/sendmsg',sendmsg);
router.post('/refreshtoken',refreshToken);//verified
router.post('/gettoken',getToken);//verified

module.exports=router