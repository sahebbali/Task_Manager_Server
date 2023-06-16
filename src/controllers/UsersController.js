const Jwt= require('jsonwebtoken');
const OTPModel = require('../models/OTPModel')
const UsersModel = require('../models/UserModel');
const SendEmailUtility = require('../utils/SendEmailUtility');

exports.registration= (req, res)=>{
    let reqBody = req.body
    UsersModel.create(reqBody, (err, data)=>{
        if(err){
            res.status(200).json({status:"Registration Fail!", Data: err});
            console.log(err);
        }
        else{
            res.status(200).json({status:"Registration Success!", Data: data});

        }
    })
};
exports.login =(req,res)=>{
    let reqBody = req.body;
    UsersModel.aggregate([
        {$match:reqBody},
        {$project:{_id:0, email:1, firstName:1, lastName:1, mobile:1,photo:1}}
    ], (err, data)=>{
        if(err){
            res.status(400).json({status: "Fail !", Data: err});
        } else{
            if(data.length > 0){
                let payload = {exp: Math.floor(Date.now() / 1000) + (24 *60 *60), data: data[0]['email']}
                let token =  Jwt.sign (payload, 'SecretKey1234');
                res.status(200).json({status: " Login Success", token:token,data:data[0]});
            }
            else{
                res.status(401).json({status:'Unauthorized'});
            }
        }
    })
};

exports.profileUpdate= (req, res)=>{
    let email = req.headers['email'];
    let reqBody = req.body;
    UsersModel.updateOne({email:email},reqBody, (err, data)=>{
        if(err){
            res.status(400).json({status:"fail", data: err});
        } else{
            res.status(200).json({status:"Success", data: data});
        }
    })
};

exports.profileDetails=(req,res)=>{
    let email= req.headers['email'];
    UsersModel.aggregate([
        {$match:{email:email}},
        {$project:{_id:1,email:1,firstName:1,lastName:1,mobile:1,photo:1,password:1}}
    ],(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else {
            res.status(200).json({status:"success",data:data})
        }
    })
}

exports.RecoverVerifyEmail = async (req, res)=>{
    let email =  req.params.email;
    let OTPCode = Math.floor(100000 + Math.random() * 900000);

    try {
        let UserCount = (await UsersModel.aggregate([{$match: {email: email}},{$count: "total"}]));
        if(UserCount.length > 0) {
            // OTP Insert
            let CreateOTP  = await OTPModel.create({email: email, otp: OTPCode})
            // Email Send
            let SendEmail =  await SendEmailUtility(email, "Your PIN Code is + " +OTPCode, "Task Manager PIN Varification");
            res.status(200).json({status:"Success", data: SendEmail});
        } else{
            res.status(400).json({status: "fail", data: "No User Found"});
        }
    } catch (error) {
        res.status(400).json({status: 'fail', data:error});
    }
};