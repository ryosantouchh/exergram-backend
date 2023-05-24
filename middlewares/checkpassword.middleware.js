const bcrypt = require("bcrypt");

const checkpassword = async (req, res, next) => {
  try {
    const { password } = req.user;
    if (req.body.passwordForConfirmEdit) {
      const checkpassword = bcrypt.compareSync(
        passwordForConfirmEdit,
        req.user.password
      );
    }
  } catch (error) {
    console.log(error);
  }
};
