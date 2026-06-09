const express = require('express');
const router = express.Router();
const { registerUser,loginUser } = require('../controllers/authController');
const isAuth = require('../middlewares/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', isAuth, (req, res) => {
  res.json({
    message: 'Protected route accessed',
    user: req.user
  });
});

module.exports = router;