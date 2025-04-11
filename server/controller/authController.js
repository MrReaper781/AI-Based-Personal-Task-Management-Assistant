const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const transporter = require("../dbconfig/Transporter");

const register = async (req, res) => {
  const { email, fullname, password } = req.body;

  if (!fullname || !email || !password) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      fullname,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    const mailOptions = {
      from: "TaskifyX",
      to: `${email}`,
      subject: "Welcome User",
      text: `Welcome, ${fullname}!
We're delighted to have you with us. You’ve successfully registered using the email address: ${email}.
Thank you for joining — we’re excited to have you on board!`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    return res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  try {
    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({ success: false, message: "Invalid user" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res
      .status(200)
      .json({ success: true, message: "User login successful" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
    });

    return res
      .status(201)
      .json({ success: true, message: "Logout Successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "server error" });
  }
};

const authCheck = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return res.status(200).json({ success: true, user: decoded });
  } catch (err) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

module.exports = { register, login, logout, authCheck };
