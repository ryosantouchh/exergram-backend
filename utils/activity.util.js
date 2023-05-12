const activityLengthCheck = (req, res, next) => {
  try {
    if (req.params.activityId.length !== 24)
      res
        .status(400)
        .send({ message: "incorrect activity_id", statusCode: 400 });

    next();
  } catch (error) {
    next(error);
  }
};

const skipValue = (page) => {
  let result = (page - 1) * 10;
  return result;
};

module.exports = { activityLengthCheck, skipValue };
