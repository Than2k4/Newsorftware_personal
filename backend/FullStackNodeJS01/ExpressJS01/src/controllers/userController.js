const { createUserService, loginService, getUserService } = require("../services/userService");

// API tạo user
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const data = await createUserService(name, email, password);

    if (!data) {
      return res.status(400).json({
        EC: 1,
        EM: "User đã tồn tại hoặc lỗi khi tạo user",
      });
    }

    return res.status(201).json({
      EC: 0,
      EM: "Tạo user thành công",
      DT: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ EC: -1, EM: "Server error" });
  }
};

// API login
const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await loginService(email, password);

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ EC: -1, EM: "Server error" });
  }
};

// API lấy danh sách user
const getUser = async (req, res) => {
  try {
    const data = await getUserService();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ EC: -1, EM: "Server error" });
  }
};

// API lấy account từ req.user (JWT middleware gắn vào)
const getAccount = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ EC: -1, EM: "Server error" });
  }
};

module.exports = {
  createUser,
  handleLogin,
  getUser,
  getAccount,
};
