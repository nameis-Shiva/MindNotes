import nodemailer from "nodemailer";
import { config } from "dotenv";
config();

export const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "d.shivs543@gmail.com",
    pass: "xtwh krpr dnji wscc",
  },
});

