import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine.js";  // <--- sửa ở đây
import initWebRoutes from "./route/web.js";       // nếu dùng ESM, thêm .js
import connectDB from "./config/configDB.js";     // nếu dùng ESM, thêm .js
import dotenv from "dotenv";

dotenv.config();

let app = express();

// Config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Config view engine
viewEngine(app);

// Init routes
initWebRoutes(app);

// Connect database
connectDB();

let port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log("🚀 Backend Nodejs is running on the port: " + port);
});
