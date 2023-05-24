const activityModel = require("../models/activity.model.js");
const userModel = require("../models/user.model.js");
const activityTypeModel = require("../models/activityType.model.js");

const getSummary = async (req, res, next) => {
  const userId = req.user._id;

  const currentDate = new Date();
  const date = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  try {
    const responseActivity = await activityModel.aggregate([
      {
        $match: {
          $expr: {
            $eq: ["$userId", { $toObjectId: req.user._id }],
          },
        },
      },
      {
        $facet: {
          seven_day_activity_data: [
            {
              $match: {
                activityDate: {
                  $gte: new Date(`${year}-${month}-${date - 6}`),
                },
              },
            },
            {
              $sort: { activityDate: -1 },
            },
          ],
        },
      },
    ]);

    const responseUser = await userModel.findById(userId);

    const calculateBMI = (weight, height) => {
      return +(weight / Math.pow(height / 100, 2)).toFixed(2);
    };

    const sumCaloriesBurn = (activityDataArr) => {
      let result = 0;

      activityDataArr.forEach((item) => {
        if (item.calories_burn) {
          result += +item.calories_burn;
        }
      });

      return result;
    };

    const calories_burn = sumCaloriesBurn(
      responseActivity[0].seven_day_activity_data
    );

    const summaryData = {
      BMR: responseUser.BMR,
      BMI: calculateBMI(responseUser.weight, responseUser.height),
      calories_burn: calories_burn,
      sevenDayData: responseActivity[0].seven_day_activity_data,
    };

    console.log(responseActivity[0].seven_day_activity_data);

    res.status(200).send(summaryData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSummary,
};
