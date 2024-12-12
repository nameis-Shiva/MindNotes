import { transporter } from "./EmailConfig.js";
import { config } from "dotenv";
config();

export const sendVerificationCode = async (email, otp) => {
        try {
            const response = await transporter.sendMail({
                from: `"MindNotes" <${process.env.EMAIL_ADD}>`, // sender address
                to: email, // list of receivers
                subject: "Signing up to MINDNOTES ✔", // Subject line
                text: "Hey there, this is your One Time Password to verify your EmailID", // plain text body
                html: `
                  <html>
                    <head>
                      <style>
                        body {
                          font-family: Arial, sans-serif;
                          background-color: #f4f4f9;
                          margin: 0;
                          padding: 0;
                        }
                        .container {
                          width: 100%;
                          max-width: 600px;
                          margin: 30px auto;
                          background-color: #ffffff;
                          border-radius: 8px;
                          padding: 20px;
                          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                          text-align: center;
                          margin-bottom: 20px;
                        }
                        .header h1 {
                          color: #333;
                          font-size: 24px;
                        }
                        .otp-code {
                          background-color: #4caf50;
                          color: white;
                          font-size: 36px;
                          font-weight: bold;
                          padding: 10px 20px;
                          display: inline-block;
                          margin: 20px 0;
                          border-radius: 4px;
                        }
                        .message {
                          font-size: 16px;
                          color: #555;
                          line-height: 1.5;
                        }
                        .footer {
                          text-align: center;
                          font-size: 12px;
                          color: #888;
                          margin-top: 20px;
                        }
                      </style>
                    </head>
                    <body>
                      <div class="container">
                        <div class="header">
                          <h1>Welcome to MindNotes</h1>
                          <p>We're excited to have you on board! To get started, please verify your email address.</p>
                        </div>
                        <div class="message">
                          <p>Hey there,</p>
                          <p>This is your One-Time Password (OTP) to verify your email address:</p>
                          <div class="otp-code">
                            ${otp}
                          </div>
                          <p>Please enter the OTP to complete your registration. If you didn't request this, please ignore this email.</p>
                        </div>
                        <div class="footer">
                          <p>&copy; 2024 MindNotes. All rights reserved.</p>
                          <p>If you have any questions, feel free to reach out to our support team.</p>
                        </div>
                      </div>
                    </body>
                  </html>
                `, // HTML body with structure
              });
              console.log("Mail Sent👍"); // Log messageId or other details here
        } catch (error) {
            console.log("Error sending email:", error);
        }
}