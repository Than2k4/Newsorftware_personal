// src/services/userService.js
require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

// Service: Đăng ký user
const createUserService = async (name, email, password) => {
  try {
    // check user tồn tại
    const user = await User.findOne({ email });
    if (user) {
      console.log(`>>> user exist, chọn 1 email khác: ${email}`);
      return null;
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, saltRounds);

    // lưu user vào database
    let result = await User.create({
      name: name,
      email: email,
      password: hashPassword,
      role: "User",
    });

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Service: Đăng nhập
const loginService = async (email1, password) => {
  try {
    // fetch user theo email
    const user = await User.findOne({ email: email1 });
    if (!user) {
      return {
        EC: 1,
        EM: "Email/Password không hợp lệ",
      };
    }

    // so sánh password
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return {
        EC: 2,
        EM: "Email/Password không hợp lệ",
      };
    }

    // tạo access token
    const payload = {
      email: user.email,
      name: user.name,
    };

    const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    return {
      EC: 0,
      access_token,
      user: {
        email: user.email,
        name: user.name,
      },
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Service: Lấy danh sách user
const getUserService = async () => {
  try {
    let result = await User.find({}).select("-password"); // bỏ password
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  createUserService,
  loginService,
  getUserService,
};
