const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

const {
  signUpController,
  loginController,
  logoutController,
} = require('../controllers/auth');
const { indexController } = require('../controllers/home');
const { restrictedController } = require('../controllers/restricted');

router.get('/', indexController);
router.get('/restricted', authMiddleware, restrictedController);
router.get('/sign-up', signUpController.getSignUpForm);
router.post('/sign-up', signUpController.signUp);
router.post('/log-in', loginController);
router.get('/log-out', logoutController);

module.exports = router;
