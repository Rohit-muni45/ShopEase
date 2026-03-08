const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.CONTACT_EMAIL, // your email
    pass: process.env.CONTACT_PASS, // Gmail App Password
  },
});

const sendWelcomeEmail = async (userEmail, userName) => {
  const mailOptions = {
    from: `"ShopEase" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: "Welcome to ShopEase 🎉",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Hey ${userName || "there"} 👋</h2>
        <p>Welcome to <b>ShopEase</b>! We're excited to have you on board.</p>
        
        <p>You can now log in and start exploring all the features we’ve built for you.</p>
        
        <br/>
        <a href="https://shop-ease.com/login" 
           style="background:#4CAF50;color:white;padding:10px 18px;text-decoration:none;border-radius:5px;">
           Login to Your Account
        </a>

        <br/><br/>
        <p>If you have any questions, just reply to this email — we’re happy to help!</p>
        <p>Cheers, <br/>The ShopEase Team 🚀</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendWelcomeEmail;
