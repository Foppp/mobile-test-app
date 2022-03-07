const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const signup = async (req, res) => {
  const { userName, password, email } = req.body;
  try {
    const dbUser = await User.findOne({ userName: req.body.userName });
    if (dbUser) return res.status(409).json({ message: 'user already exists' });
    const user = await User.create({ email, userName, password });
    const token = jwt.sign({ email }, 'secret', { expiresIn: '1h' });
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ message: 'error while creating the user' });
  }
};

const login = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName });
    const result = await bcrypt.compare(password, user.password);
    const token = jwt.sign({ email: user.email }, 'secret', { expiresIn: '1h' });
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: "Error in credentails" });
  }
};


const isAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ error: 'you must be logged in' });
  }
  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, 'secret', async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: 'you must be logged in 2' });
    }
    return res.status(200).send({ message: 'auth seccessful!' });
  });
};

module.exports = { signup, login, isAuth };
