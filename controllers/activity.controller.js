const activityModel = require("../models/activity.model.js");
const activityTypeModel = require("../models/activityType.model.js");
const userModel = require("../models/user.model.js");
const activityUtil = require("../utils/activity.util.js");
const cloudinary = require("../utils/cloudinary.js");

const createActivity = async (req, res, next) => {
  try {
    const userId = req.user._id;
    // console.log(userId);
    const { title, type, activityDate, duration, note, image, distance } =
      req.body;
    // const createdAt = activityUtil.generateDateGMT7();
    const createdAt = new Date();

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
          // console.log(res);
          newActivity.image = { public_id: res.public_id, url: res.secure_url };
        })
        .catch((err) => console.log(err));
      // adding image url to activity object
      // "https://res.cloudinary.com/{cloud_name}/{image_type}/v{version}/{public_id}.{format}" to render in frontend
    }

    const foundUser = await userModel.findById({ _id: userId });
    const foundType = await activityTypeModel.findOne({ type });
    const METs = foundType.METs;
    const weight = foundUser.weight;

    const calories_burn = activityUtil.caloriesBurnUsingMETs(
      weight,
      METs,
      duration
    );

    newActivity.calories_burn = Math.floor(calories_burn);

    const response = await activityModel.create(newActivity);
    // console.log(response);
    res.status(201).send("Activity Created Successfully");
  } catch (error) {
    next(error);
  }
};

const getAllActivity = async (req, res, next) => {
  try {
    // algorithms for send data to match pagination at web application
    const { pageparams } = req.headers;
    const skip_value = activityUtil.skipValue(pageparams);

    // query data
    const foundedData = await activityModel.aggregate([
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

    // res.send(activity_data);

    if (req.headers.pageparams) {
    } else {
    }

    const response_data = {
      count: {
        all_activity: 0,
        by_type: 0,
      },
      activity_data: [],
    };

    if (foundedData[0].count_all_activity.length !== 0) {
      response_data.count.all_activity =
        foundedData[0].count_all_activity[0].count;

      response_data.count.by_type = activityUtil.countActivityByType(
        foundedData[0].count_activity_by_type
      );

      response_data.activity_data = foundedData[0].all_activity_data;

      // console.log(response_data);

      res.status(200).send(response_data);
    } else {
      res.status(200).send(response_data);
    }
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
    const { title, type, activityDate, duration, note, image, distance } =
      req.body;

    const updateActivity = {
      // userId,
      title,
      type,
      activityDate,
      duration,
      distance,
      note,
      // createdAt,
    };

    // console.log(image);

    if (image === "do not have image") {
      await activityModel.findByIdAndUpdate(activityId, {
        $unset: { image: 1 },
      });
    }

    if (image) {
      const img_url = await cloudinary.uploader
        .upload(image, {
          folder: "exergram",
        })
        .then((res) => {
          // console.log(res);
          updateActivity.image = {
            public_id: res.public_id,
            url: res.secure_url,
          };
        })
        .catch((err) => console.log(err));
    }
    // const lastUpdatedAt = activityUtil.generateDateGMT7();
    const lastUpdatedAt = new Date();
    updateActivity.lastUpdatedAt = lastUpdatedAt;
    // console.log(updateActivity);
    const oldData = await activityModel.findByIdAndUpdate(
      activityId,
      updateActivity
      // { new: true } return old result for destroy image
    );

    if (!oldData) {
      res
        .status(404)
        .send({ message: "activity is not found", statusCode: 404 });
    }
    // console.log(oldData);

    if (oldData.image.public_id) {
      const img_url = await cloudinary.uploader
        .destroy(oldData.image.public_id, {
          folder: "exergram",
        })
        .then((response) => {
          // console.log(response);
        })
        .catch((err) => console.log(err));
    }

    res.status(201).send(oldData);
  } catch (error) {
    next(error);
  }
};

const deleteActivityById = async (req, res, next) => {
  try {
    const { activityId } = req.params;
    console.log(activityId);
    const response = await activityModel.findByIdAndDelete(activityId);
    console.log(response);

    if (response.image.public_id) {
      const img_url = await cloudinary.uploader
        .destroy(response.image.public_id, {
          folder: "exergram",
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));
    }

    // adding image url to activity object
    // "https://res.cloudinary.com/{cloud_name}/{image_type}/v{version}/{public_id}.{format}" to render in frontend
    res.status(200).send({ statusCode: 200, message: "delete successfully" });
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
