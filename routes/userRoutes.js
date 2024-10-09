const express = require('express');
const router = express.Router();
const { registerUser, login, getAllUsers } = require('../controllers/userController');

router.post('/register', registerUser);  // Solo admins
router.post('/login', login);            // Para todos los usuarios
router.get('/users', getAllUsers);       // Superadmin puede ver todos los usuarios

module.exports = router;
