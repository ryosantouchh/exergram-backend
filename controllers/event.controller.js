const eventModel = require("../models/event.model.js");

const getAllEvent = async (req, res, next) => {
  try {
    const foundEvent = await eventModel.aggregate([
      { $sort: { date: 1 } },
      { $limit: 3 },
    ]);
    res.status(200).send(foundEvent);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllEvent };
