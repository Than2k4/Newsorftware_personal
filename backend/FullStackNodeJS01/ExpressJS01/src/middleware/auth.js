require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const white_lists = ["/", "/register", "/login"];

  // Cho phép đi qua nếu route thuộc whitelist
  if (white_lists.find(item => '/v1/api' + item === req.originalUrl)) {
    return next();
  }

  // Kiểm tra token trong header
  const token = req?.headers?.authorization?.split(' ')?.[1];
  if (token) {
    try {
      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = {
        email: decoded.email,
        name: decoded.name,
        createdBy: "hoidanit"
      };

      console.log(">>> check token: ", decoded);
      return next();
    } catch (error) {
      return res.status(401).json({
        message: "Token bị hết hạn hoặc không hợp lệ"
      });
    }
  } else {
    return res.status(401).json({
      message: "Bạn chưa truyền Access Token ở header hoặc token bị sai/hết hạn"
    });
  }
};

module.exports = auth;
