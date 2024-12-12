import { transporter } from "./EmailConfig.js";
import { config } from "dotenv";
config();

export const sendWelcomeEmail = async (email, name) => {
    try {
      // Send email with welcome message
      const response = await transporter.sendMail({
        from: `"MindNotes" <${process.env.EMAIL_ADD}>`, 
        to: email,
        subject: "Welcome to MindNotes!", 
        text: `Hi ${name},\n\nWelcome to MindNotes! We're excited to have you on board and can't wait for you to start using our app. If you have any questions, feel free to reach out.\n\nBest regards,\nThe MindNotes Team`, // Plain text version
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
                .cta-button {
                  background-color: #4caf50;
                  color: white;
                  padding: 12px 20px;
                  text-decoration: none;
                  border-radius: 4px;
                  font-size: 16px;
                  display: inline-block;
                  margin-top: 20px;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Welcome to MindNotes, ${name}!</h1>
                  <p>We're excited to have you on board!</p>
                </div>
                <div class="message">
                  <p>Hi ${name},</p>
                  <p>Thank you for signing up with MindNotes! We're thrilled to have you as part of our community.</p>
                  <p>Get started with your journey of organizing your thoughts, ideas, and memories with our easy-to-use platform.</p>
                  <p>If you need any help or have questions, feel free to reach out to our support team.</p>
                  <a href="https://www.mindnotes.com" class="cta-button">Start Exploring</a>
                </div>
                <div class="footer">
                  <p>&copy; 2024 MindNotes. All rights reserved.</p>
                  <p>If you have any questions, feel free to reach out to our support team at support@mindnotes.com.</p>
                </div>
              </div>
            </body>
          </html>
        `
      });
  
      console.log("Welcome mail sent",response);
    } catch (error) {
      console.log("Error sending welcome email:", error);
    }
  };
  