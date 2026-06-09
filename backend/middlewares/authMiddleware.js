const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // check token exists
  if (!authHeader) {
    return res.status(401).json({
      message: 'No token provided'
    });
  }

  // get token
  const token = authHeader.split(' ')[1];

  try {
    // verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // attach user data
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid token'
    });
  }
};

module.exports = isAuth;