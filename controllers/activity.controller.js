const activityModel = require("../models/activity.model.js");
const activityUtil = require("../utils/activity.util.js");

const getAllActivity = async (req, res, next) => {
  try {
    // req.user for contain userId value at authen level

    const skip_value = activityUtil.skipValue(1); // mock value sent to function

    const activity_data = await activityModel.aggregate([
      {
        $match: {
          $expr: {
            $eq: ["$userId", { $toObjectId: "64590f3b50d6e40d65c10657" }],
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
            { $sort: { createdAt: -1 } },
            { $skip: skip_value },
            { $limit: 10 },
          ],
        },
      },
    ]);

    res.status(200).send(activity_data);
  } catch (error) {
    next(error);
  }
};

const createActivity = async (req, res, next) => {
  try {
    const userId = "64590f3b50d6e40d65c10657"; // mock userId ... need token
    const createdAt = activityUtil.generateDateGMT7();
    const newActivity = { ...req.body, userId, createdAt };
    const res1 = await activityModel.create(newActivity);
    // res.status(201).send("create activity completed");
    res.status(201).send(res1);
  } catch (error) {
    next(error);
  }
};

const getActivityById = async (req, res, next) => {
  try {
    const { activityId } = req.params;
    const result = await activityModel.findOne({ _id: activityId });

    if (!result)
      res
        .status(404)
        .send({ message: "activity is not found", statusCode: 404 });

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

const updateActivityById = async (req, res, next) => {
  try {
    const { activityId } = req.params;
    const lastUpdatedAt = activityUtil.generateDateGMT7();
    const updateActivity = { ...req.body, lastUpdatedAt };
    const result = await activityModel.findByIdAndUpdate(
      activityId,
      updateActivity,
      { new: true }
    );

    if (!result)
      res
        .status(404)
        .send({ message: "activity is not found", statusCode: 404 });

    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

const deleteActivityById = async (req, res, next) => {
  try {
    const { activityId } = req.params;
    await activityModel.findByIdAndDelete(activityId);
    res.status(200).send("delete completed");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllActivity,
  getActivityById,
  createActivity,
  updateActivityById,
  deleteActivityById,
};
