const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const signUpController = {
  getSignUpForm: (req, res) => {
    res.render('sign-up-form');
  },
  signUp: async (req, res, next) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash the password
      await User.create({
        username: req.body.username,
        password: hashedPassword,
      });
      res.redirect('/');
    } catch (err) {
      return next(err);
    }
  },
};

const loginController = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/',
  failureMessage: true,
});

const logoutController = (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/');
  });
};

module.exports = {
  signUpController,
  loginController,
  logoutController,
};
