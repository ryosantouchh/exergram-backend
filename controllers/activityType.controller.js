const activityTypeModel = require("../models/activityType.model.js");

const getAllType = async (req, res, next) => {
  try {
    const response = await activityTypeModel.find({});
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

const getOneType = async (req, res, next) => {
  const { activity_type } = req.params;
  const response = await activityTypeModel.findOne({ type: activity_type });
  res.status(200).send(response);
};

// const createActivityType = aysnc (req, res, next) => {}

module.exports = { getAllType, getOneType };
