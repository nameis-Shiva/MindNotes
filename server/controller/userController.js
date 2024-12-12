import userModel from "../models/userModel.js";
import { compareHashPassword, createHashPassword } from "../utils/bcrypt.js";
import crypto from "crypto";
import { createToken } from "../utils/jwt.js";
import { sendVerificationCode } from "../middlewares/EmailVerification.js";
import { sendWelcomeEmail } from "../middlewares/welcomeEmail.js";
import Note from "../models/notesModel.js";

export const signup = async (req,res) => {
    try {
        const data = req.body;
        const { firstName, email, password } = data;
        if(firstName && email && password ){
            const user = await userModel.findOne({email});
            if(user){
                return res.status(400).send({error:"Email already Exists, Please do login"})
            }else{
                
                let hasedPassword = await createHashPassword(password);

                // Generate a secure OTP
                const otp = crypto.randomBytes(3).toString("hex").toUpperCase();
                const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5-minute validity

                let userData = new userModel({...data, password:hasedPassword, otp, otpExpiresAt});
                let response = await userData.save();
                sendVerificationCode(userData.email,otp);

                let token = createToken({id:response._id});
                return res.status(201).send({ token });
            }
        }else {
            return res.status(400).send({error:"Provide all the required fields"});
        }
    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error", msg: error.message });
    }
}

export const verifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await userModel.findOne({ email });
        
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

     
        if (user.otp === otp) {
            const currentTime = new Date();  
            
            if (currentTime > user.otpExpiresAt) {
                await userModel.deleteOne({ email });
                return res.status(400).send({ error: "OTP has Expired" });
            } else {
               
                user.isEmailVerified = true;  
                user.otp = undefined;  
                await user.save();  

                await sendWelcomeEmail(user.email, user.firstName);
                let token = createToken({id:user._id})
                return res.status(200).send({ message: "Email Verified Successfully",token });
            }
        } else {
            return res.status(400).send({ error: "Incorrect OTP, Please try again later" });
        }
    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error", msg: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(email && password){

            const user = await userModel.findOne({email});
            if(!user){
                return res.status(400).send({error:"User does not exists, you are requested to do login"})
            }

            const isMatched = await compareHashPassword(password,user.password)
            if(!isMatched){
                return res.status(400).send({error:"Incorrect Password Try again."});
            }

            let token = createToken({id:user._id})
            return res.status(200).send({message:"Login Successful",token});
            
        } else {
            return res.status(400).send({message:"Provide all Details"});
        }
    } catch (error) {
        return res.status(400).send({error:"Internal Server Error",msg:error.message})
    }
}

export const getUser = async (req, res) => {
    try {
        // Extract `id` from the request, assuming it's stored in `req.params` or `req.user`
        const { id } = req;

        if (!id) {
            return res.status(400).send({ error: "User ID is required" });
        }

        const userData = await userModel.findById(id, { _id: 0, __v: 0, password: 0 });
        const notesCount = await Note.countDocuments({author:id})

        if (!userData) {
            return res.status(404).send({ error: "User not found" });
        }

        console.log(notesCount)
        return res.status(200).send({ userData, notesCount });
        // return res.status(200).send(userData);
    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error", msg: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req
        const data = req.body
        delete data.password
        delete data.email
        let response = await userModel.findByIdAndUpdate(id, { $set: { ...data } })
        if (response) {
            return res.status(200).send({ message: "User Data Updated" })
        } else {
            return res.status(400).send({ error: "User not found" })
        }
    } catch (error) {
        return res.status(500).send({ error: "internal server error", msg: error.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req
        const response = await userModel.findByIdAndDelete(id)
        if (response) {
            return res.status(200).send({ message: "User Data Deleted" })
        } else {
            return res.status(400).send({ error: "User Not Found" })
        }
    } catch (error) {
        return res.status(500).send({ error: "Internal server error", msg: error.message })
    }
}
