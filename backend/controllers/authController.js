const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  res.json({
    message: 'Register API working',
    user: {
      name,
      email
    }
  });
};

const loginUser = async (req, res) => {
  const { email } = req.body;

  res.json({
    message: 'Login API working',
    email
  });
};

module.exports = {
  registerUser,
  loginUser
};