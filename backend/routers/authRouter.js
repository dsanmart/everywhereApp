const express = require('express');
const validateForm = require('../controllers/validateForm');
const router = express.Router();
const {handleLogin, attemptLogin, attemptSignUp} = require('../controllers/authController');
const { rateLimiter } = require('../controllers/rateLimiter');

router.route('/login').get(handleLogin) // GET request to /auth/login with cookies
.post(validateForm, rateLimiter(60, 10), attemptLogin);  // After form is validated, check ratelimit is not surpassed and then POST request to /auth/login manually

router.post('/signup', validateForm, rateLimiter(60, 2), attemptSignUp);

module.exports = router;