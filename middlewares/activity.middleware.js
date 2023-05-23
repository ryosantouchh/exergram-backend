const activityModel = require("../models/activity.model.js");

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

const countActivity = async (req, res, next) => {
  try {
    if (!req.headers.pageparams) {
      const foundCountActivity = await activityModel.aggregate([
        {
          $match: {
            $expr: {
              $eq: ["$userId", { $toObjectId: req.user._id }],
            },
          },
        },
        {
          $facet: {
            count_all_activity: [
              {
                $count: "count",
              },
            ],
            count_activity_by_type: [
              {
                $group: {
                  _id: "$type",
                  count: { $sum: 1 },
                },
              },
            ],
            all_activity_data: [
              { $sort: { activityDate: -1 } },
              { $skip: skip_value },
              { $limit: 10 },
            ],
          },
        },
      ]);
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { activityLengthCheck };
