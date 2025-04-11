const nodemailer = require("nodemailer");

// Create a transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // or use another email service provider
  auth: {
    user: "vaibhavahk123@gmail.com", // Your email address
    pass: "dskm yjfx trtp juqf", // Your email password or app-specific password
  },
});

module.exports = transporter;
