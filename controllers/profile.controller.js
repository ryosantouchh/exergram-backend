const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const cloudinary = require("../utils/cloudinary.js");
const activityUtil = require("../utils/activity.util.js");

const getUserData = async (req, res, next) => {
  try {
    // if (req.params.userId.length !== 24)
    //   res.status(400).send({ message: "incorrect user_id", statusCode: 400 });

    // const { userId } = req.params; // mock
    const userId = req.user._id;
    const result = await userModel.findById(userId);

    if (!result)
      res.status(404).send({ message: "user is not found", statusCode: 404 });

    const userData = {
      username: result.username,
      email: result.email,
      firstname: result.firstname,
      lastname: result.lastname,
      contact_number: result.contact_number,
      address: result.address,
      city: result.city,
      province_state: result.province_state,
      height: result.height,
      weight: result.weight,
      image: result.image,
    };

    res.status(200).send(userData);
  } catch (error) {
    next(error);
  }
};

const updateUserData = async (req, res, next) => {
  try {
    // if (req.params.userId.length !== 24)
    //   res.status(400).send({ message: "incorrect user_id", statusCode: 400 });

    const userId = req.user._id;

    if (req.body.username)
      res
        .status(400)
        .send({ message: "username cannot change", statusCode: 400 });

    if (req.body.passwordForConfirmEdit) {
      const checkpassword = bcrypt.compareSync(
        req.body.passwordForConfirmEdit,
        req.user.password
      );

      !checkpassword
        ? res.status(400).send("incorrect username or password")
        : null;
    }

    if (req.body.image === "do not have image") {
      const oldData = await userModel.findByIdAndUpdate(userId, {
        $unset: { image: 1 },
      });

      delete req.body.image;

      const img_url = await cloudinary.uploader
        .destroy(oldData.image.public_id, {
          folder: "exergram",
        })
        .then((response) => {
          // console.log(response);
        })
        .catch((err) => console.log(err));
    }

    if (req.body.image && req.body.image !== "do not have image") {
      const img_url = await cloudinary.uploader
        .upload(req.body.image, {
          folder: "exergram",
        })
        .then((res) => {
          // console.log(res);
          req.body.image = {
            public_id: res.public_id,
            url: res.secure_url,
          };
        })
        .catch((err) => console.log(err));
    }

    // oldUserData for birthday and gender to calculateBMR
    const oldUserData = await userModel.findById(userId);
    const BMR = activityUtil.calculateBMR(
      req.body.weight,
      req.body.height,
      oldUserData.birthday,
      oldUserData.gender
    );
    console.log(BMR);

    // const { userId } = req.params; // mock
    const lastUpdatedAt = new Date();
    const updateData = { ...req.body, BMR, lastUpdatedAt };
    const result = await userModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserData, updateUserData };
