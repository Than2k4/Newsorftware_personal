import bcrypt from 'bcryptjs'; // import thư viện bcryptjs
import db from '../models/index.js'; // import database
import { where } from 'sequelize';

const salt = bcrypt.genSaltSync(10); // thuật toán hash password

let createNewUser = async (data) => { // hàm tạo user với tham số data
    return new Promise(async (resolve, reject) => { // dùng Promise đảm bảo luôn trả kết quả
        try {
            let hashPasswordFromBCrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBCrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId
            });
            resolve('OK create a new user successful!');
        } catch (e) {
            reject(e);
        }
    });
};
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => { 
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}
let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true, // lấy dữ liệu gốc (object JS thuần tuý)
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}
// lấy findOne CRUD
let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },  // query theo điều kiện id
                raw: true,              // lấy dữ liệu gốc
            });

            if (user) {
                resolve(user);  // trả về user nếu tìm thấy
            } else {
                resolve([]);    // nếu không tìm thấy thì trả về mảng rỗng
            }
        } catch (e) {
            reject(e);
        }
    })
}
// hàm put CRUD
let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }  // query điều kiện cho tham số
            });

            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save(); // lưu lại thay đổi

                // lấy danh sách tất cả user sau khi update
                let allUsers = await db.User.findAll({
                    raw: true
                });
                resolve(allUsers);
            } else {
                resolve(); // nếu không tìm thấy user thì trả về undefined
            }
        } catch (e) {
            reject(e);
        }
    })
}
// hàm xóa user
let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            });

            if (user) {
                await user.destroy(); // xóa user
                resolve(); // trả về kết quả thành công
            } else {
                resolve(); // nếu không tìm thấy user cũng resolve rỗng
            }
        } catch (e) {
            reject(e);
        }
    })
}

// export các hàm ra ngoài
export default {
    createNewUser,
    getAllUser,
    getUserInfoById,
    updateUser,
    deleteUserById
};
