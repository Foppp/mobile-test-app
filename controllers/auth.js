const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const signup = async (req, res, next) => {
    const dbUser = await User.findOne({ userName: req.body.userName });
  if (dbUser) return res.status(409).json({ message: 'user already exists' });
  if (req.body.email && req.body.password) {
    bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
      if (err) {
        return res.status(500).json({ message: 'couldnt hash the password' });
      } else if (passwordHash) {
        return User.create({
          email: req.body.email,
          userName: req.body.userName,
          password: passwordHash,
        })
          .then(() => {
            res.status(200).json({ message: 'user created' });
          })
          .catch((err) => {
            console.log(err);
            res.status(502).json({ message: 'error while creating the user' });
          });
      }
    });
  }
  if (!req.body.password)
    return res.status(400).json({ message: 'password not provided' });
  if (!req.body.email)
    return res.status(400).json({ message: 'email not provided' });
};

// const signup = (req, res, next) => {
//   User.findOne({ userName: req.body.userName })
//     .then(dbUser => {
//       if (dbUser) {
//           return res.status(409).json({message: "email already exists"});
//       } else if (req.body.email && req.body.password) {
//           // password hash
//           bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
//               if (err) {
//                   return res.status(500).json({message: "couldnt hash the password"});
//               } else if (passwordHash) {
//                   return User.create(({
//                       email: req.body.email,
//                       userName: req.body.userName,
//                       password: passwordHash,
//                   }))
//                   .then(() => {
//                       res.status(200).json({message: "user created"});
//                   })
//                   .catch(err => {
//                       console.log(err);
//                       res.status(502).json({message: "error while creating the user"});
//                   });
//               };
//           });
//       } else if (!req.body.password) {
//           return res.status(400).json({message: "password not provided"});
//       } else if (!req.body.email) {
//           return res.status(400).json({message: "email not provided"});
//       };
//   })
//   .catch(err => {
//       console.log('error', err);
//   });
// };

const login = (req, res, next) => {
  // checks if email exists
  User.findOne({ userName: req.body.userName })
    .then((dbUser) => {
      if (!dbUser) {
        return res.status(404).json({ message: 'user not found' });
      } else {
        // password hash
        bcrypt.compare(
          req.body.password,
          dbUser.password,
          (err, compareRes) => {
            if (err) {
              // error while comparing
              res
                .status(502)
                .json({ message: 'error while checking user password' });
            } else if (compareRes) {
              // password match
              const token = jwt.sign({ email: req.body.email }, 'secret', {
                expiresIn: '1h',
              });
              res.status(200).json({ message: 'user logged in', token: token });
            } else {
              // password doesnt match
              res.status(401).json({ message: 'invalid credentials' });
            }
          }
        );
      }
    })
    .catch((err) => {
      console.log('error', err);
    });
};

const isAuth = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'not authenticated' });
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'secret');
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message || 'could not decode the token' });
  }
  if (!decodedToken) {
    res.status(401).json({ message: 'unauthorized' });
  } else {
    res.status(200).json({ message: 'here is your resource' });
  }
};

module.exports = { signup, login, isAuth };
