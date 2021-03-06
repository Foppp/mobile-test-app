const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const { signup, login, isAuth } = require('../controllers/auth.js');
const { getProducts } = require('../controllers/products.js');

const router = express.Router();

router.post('/login', login);

router.post('/signup', signup);

router.get('/private', isAuth);

router.get('/products', getProducts);

router.get('/public', (req, res, next) => {
    res.status(200).json({ message: "here is your public resource" });
});

module.exports = router;
