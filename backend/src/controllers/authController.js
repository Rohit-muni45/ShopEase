const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const User = require("../models/userModel");
const { createAccessToken, createRefreshToken } = require("../utils/token");
const sendWelcomeEmail = require("../utils/sendMail");

const upload = multer();

// Upload image
exports.uploadImage = [
  upload.single("uploadImage"),
  async (req, res) => {
    try {
      const userId = req.user.id;
      const file = req.file;

      if (!file) return res.status(400).json({ error: "No file provided" });

      const base64Image = `data:${file.mimetype};base64,${file.buffer.toString(
        "base64"
      )}`;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { image: base64Image },
        { new: true }
      );

      res.json({ updatedImage: updatedUser.image, message: "Image updated successfully" } );
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Upload failed" });
    }
  },
];

// Apply coupon
// exports.applyCoupon = async (req, res) => {
//   const { coupon } = req.body;
//   const userId = req.user.id;

//   const COUPONS = {
//     SHOPEASEFIRST: 200,
//     SHOPEASE250: 250,
//   };

//   try {
//     const user = await User.findById(userId);
//     const code = coupon.toUpperCase();

//     // Check if coupon exists
//     if (!COUPONS[code]) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid coupon code",
//       });
//     }

//     // Already used?
//     if (user.usedCoupons.includes(code)) {
//       return res.status(400).json({
//         success: false,
//         message: "Coupon already used",
//       });
//     }

//     // Add to user history
//     user.usedCoupons.push(code);
//     await user.save();

//     res.json({
//       success: true,
//       discount: COUPONS[code],
//       message: "Coupon applied successfully",
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

exports.applyCoupon = async (req, res) => {
  const { coupon, subtotal } = req.body;
  const userId = req.user.id;

  const COUPONS = {
    SHOPEASEFIRST: {
      discount: 200,
      minOrder: 1000,
    },
    SHOPEASE250: {
      discount: 250,
      minOrder: 2000,
    },
  };

  try {
    const user = await User.findById(userId);
    const code = coupon.toUpperCase();

    // Empty coupon
    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Coupon code is required",
      });
    }

    // Invalid coupon
    if (!COUPONS[code]) {
      return res.status(400).json({
        success: false,
        message: "Invalid coupon code",
      });
    }

    const couponData = COUPONS[code];

    // Check if user already used this coupon
    if (user.usedCoupons.includes(code)) {
      return res.status(400).json({
        success: false,
        message: "Coupon already used",
      });
    }

    // Check minimum order value
    if (subtotal < couponData.minOrder) {
      return res.status(400).json({
        success: false,
        message: `Minimum order value ₹${couponData.minOrder} required`,
      });
    }

    // Store in user history
    user.usedCoupons.push(code);
    await user.save();

    res.json({
      success: true,
      discount: couponData.discount,
      message: "Coupon applied successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password || !name)
      return res.status(400).json({ message: "Missing fields" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hash = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hash,
    });

    await user.save();

    // Send welcome email (non-blocking)
    sendWelcomeEmail(user.email, user.name).catch(err =>
      console.error("Email failed:", err.message)
    );

    res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, name: user.name, email: user.email },
    });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and Password required" });
    else if(!email.includes('@'))
      return res.status(400).json({ message: "Invalid email" });
    else if(!email.includes('.'))
      return res.status(400).json({ message: "Invalid email" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      accessToken,
      refreshToken,
      user: { id: user._id, name: user.name, email: user.email, image: user.image },
      message: "Login successful",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Refresh Token
exports.refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return res.status(400).json({ message: "No refresh token" });

    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(payload.id);
    if (!user || user.refreshToken !== refreshToken)
      return res.status(401).json({ message: "Invalid refresh token" });

    const newAccess = createAccessToken(user);
    const newRefresh = createRefreshToken(user);
    user.refreshToken = newRefresh;
    await user.save();

    res.json({ accessToken: newAccess, refreshToken: newRefresh });
  } catch (err) {
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

// Logout
exports.logout = async (req, res) => {
  try {
    const { userId } = req.body;
    await User.findByIdAndUpdate(userId, { $unset: { refreshToken: 1 } });
    res.json({ message: "Logged out" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
