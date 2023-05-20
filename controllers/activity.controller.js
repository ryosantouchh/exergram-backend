const activityModel = require("../models/activity.model.js");
const activityUtil = require("../utils/activity.util.js");
const cloudinary = require("../utils/cloudinary.js");

const getAllActivity = async (req, res, next) => {
  try {
    // req.user for contain userId value at authen level

    const skip_value = activityUtil.skipValue(1); // mock value sent to function

    const activity_data = await activityModel.aggregate([
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
    const userId = req.user._id;

    const { title, type, activityDate, duration, note, image, distance } =
      req.body;
    const createdAt = activityUtil.generateDateGMT7();

    const newActivity = {
      userId,
      title,
      type,
      activityDate,
      duration,
      distance,
      note,
      createdAt,
    };
    if (image) {
      const img_url = await cloudinary.uploader
        .upload(image, {
          folder: "exergram",
        })
        .then((res) => {
          console.log(res);
          newActivity.image = { public_id: res.public_id, url: res.secure_url };
        })
        .catch((err) => console.log(err));
      // adding image url to activity object
      // "https://res.cloudinary.com/{cloud_name}/{image_type}/v{version}/{public_id}.{format}" to render in frontend
    }

    const response = await activityModel.create(newActivity);
    console.log(response);
    res.status(201).send("Activity Created Successfully");
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
