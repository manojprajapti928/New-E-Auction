const express = require('express');
const { register, login, getAllUsers, deleteUser } = require('../controllers/userController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const { upload } = require('../utils/multer');
// const multer = require('multer');
// const upload = multer();

const router = express.Router();

// all api done work properly

router.post('/register', upload, register);
router.post('/login',login);
router.get('/users', isAuthenticated, isAdmin, getAllUsers);
router.delete('/users/:id', isAuthenticated, isAdmin, deleteUser);

module.exports = router;
