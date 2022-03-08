const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const signup = async (req, res) => {
  const { userName, password, email } = req.body;
  try {
    const dbUser = await User.findOne({ userName: req.body.userName });
    if (dbUser) return res.status(409).json({ message: 'user already exists' });
    const user = await User.create({ email, userName, password });
    const token = jwt.sign({ email: user.email }, 'secret', {
      expiresIn: '1h',
    });
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ message: 'error while creating the user' });
  }
};

const login = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return res.status(422).send({ error: 'must provide email or password' });
  }
  const user = await User.findOne({ userName: req.body.userName });
  if (!user) {
    return res.status(422).send({ error: 'must provide email or password' });
  }
  try {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        throw err;
      }
      bcrypt.compare(user.password, hash, function (err, result) {
        if (result) {
          const token = jwt.sign({ email: user.email }, 'secret');
          res.send({ token });
        } else {
          res.status(422).send({ error: 'must provide email or password' });
        }
      });
    });
  } catch (err) {
    return res.status(422).send({ error: 'must provide email or password' });
    console.log('this is error', err);
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
