const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser
} = require('../controllers/authController');

const isAuth = require('../middlewares/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', isAuth, logoutUser);

router.get('/profile', isAuth, (req, res) => {
  res.json({
    message: 'Protected route accessed',
    user: req.user,
    email: req.user.email

  });
});

module.exports = router;