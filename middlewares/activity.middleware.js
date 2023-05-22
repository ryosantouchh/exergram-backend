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

module.exports = { activityLengthCheck };
