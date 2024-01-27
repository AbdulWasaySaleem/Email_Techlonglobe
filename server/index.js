const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "replace@gmail.com", //repalce throuwgh whome
    pass: "Replace you pass",
  },
});

// Default recipient email address
const defaultRecipientEmail = "admin@gmail.com";

// Route to handle de form submissions
app.post("/send-email", (req, res) => {
  const { fromEmail, message } = req.body;

  const mailOptions = {
    from: fromEmail, // User's provided email address
    to: defaultRecipientEmail, // Default recipient email address || admin 
    subject: "Feedback message for websiteNAme",
    text: `Email: ${fromEmail}\n\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
      res.status(500).send("Something went wrong.");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully.");
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
