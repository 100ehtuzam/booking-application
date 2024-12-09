const { UserModel } = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const signup = async (req,res) => {
    try {
        const {name,email,password} = req.body;
        const user = await UserModel.findOne({email})
        console.log('User Details',user);
        if(user){
            return res.status(409).json({message : "User is already registered!! you can login!!!"})
        }
        const userModel = new UserModel({name,email,password});
        userModel.password = await bcrypt.hash(password,10);
        console.log(bcrypt.hash(password,10));
        await userModel.save();
        return res.status(201).
                json({
                    message:"Sign up successfully",
                    success: true
                });
    } catch (error) {
        console.log(error);
        res.status(500).
        json({
            message:"Internal server error",
            success: false
        });
    }
}

const login = async (req,res) => {
    console.log("====>logged in user details",req.user);
    try {
        const {email,password} = req.body;
        const user = await UserModel.findOne({email})
        console.log('User Details',user);
        if(!user){
            return res.status(403).json({
                message : "Authentication failed, Email or pasword is wrong!!!",
                success: false
            })
        }
        const isPasswordEqual = await bcrypt.compare(password, user.password);

        console.log(isPasswordEqual)

        if(!isPasswordEqual){
            return res.status(403).json({
                message : "Authentication failed, Email or pasword is wrong!!!",
                success: false
            })
        }
        const jwtToken = jwt.sign(
            {
                email: user.email, _id: user._id
            },
            process.env.JWT_SECRET,
            {expiresIn: "1m"}
        );
        console.log(jwtToken);
        const expiresIn = 60*1000;
        return res.status(200).
                json({
                    message: "Login successfully",
                    success: true,
                    jwtToken,
                    expiresIn,
                    email,
                    name: user.name
                });
    } catch (error) {
        console.log('Logging in..',error);
        res.status(500).
        json({
            message:"Internal server error",
            success: false
        });
    }
}

module.exports = {signup, login }
