import db from '../models/index.js';        // import database
import CRUDService from '../services/CRUDService.js'; // import service

// Hàm getHomePage
const getHomePage = async (req, res) => {
    try {
        const data = await db.User.findAll();
        console.log('....................');
        console.log(data);
        console.log('....................');

        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.error(e);
    }
};

// Hàm getAbout
const getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
};

// Hàm get CRUD
const getCRUD = (req, res) => {
    return res.render('crud.ejs');
};

// Hàm findAll CRUD
const getFindAllCrud = async (req, res) => {
    const data = await CRUDService.getAllUser();
    return res.render('users/findAllUser.ejs', { datalist: data });
};

// Hàm post CRUD
const postCRUD = async (req, res) => {
    const message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('Post CRUD thành công!');
};

// Hàm lấy dữ liệu để edit
const getEditCRUD = async (req, res) => {
    const userId = req.query.id;
    if (userId) {
        const userData = await CRUDService.getUserInfoById(userId);
        return res.render('users/editUser.ejs', { data: userData });
    } else {
        return res.send('Không lấy được id');
    }
};

// Hàm update CRUD
const putCRUD = async (req, res) => {
    const data = req.body;
    const allUsers = await CRUDService.updateUser(data);
    return res.render('users/findAllUser.ejs', { datalist: allUsers });
};

// Hàm delete CRUD
const deleteCRUD = async (req, res) => {
    const id = req.query.id;
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send('Deleted thành công!');
    } else {
        return res.send('Không tìm thấy user');
    }
};

// Export chuẩn ESM
export default {
    getHomePage,
    getAboutPage,
    getCRUD,
    postCRUD,
    getFindAllCrud,
    getEditCRUD,
    putCRUD,
    deleteCRUD
};
