const registerUser = async (req, res) => {
  res.json({
    message: 'Register controller'
  });
};

const loginUser = async (req, res) => {
  res.json({
    message: 'Login controller'
  });
};

module.exports = {
  registerUser,
  loginUser
};