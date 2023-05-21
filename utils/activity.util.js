const skipValue = (page) => {
  if (page) {
    let result = (page - 1) * 10;
    return result;
  }

  if (!page) {
    return 0;
  }
};

// ********** DEPRECRETE --- don't need to use GMT7 function
const generateDateGMT7 = () => {
  // Create a new Date object with the current date and time
  let currentDate = new Date();

  // Get the UTC timestamp of the current date and time
  let utcTimestamp = currentDate.getTime();

  // Calculate the UTC offset in milliseconds for GMT+7
  let utcOffsetMs = 7 * 60 * 60 * 1000;

  // Calculate the timestamp for GMT+7 by adding the UTC offset
  let gmt7Timestamp = utcTimestamp + utcOffsetMs;

  // Create a new Date object with the timestamp for GMT+7
  let gmt7Date = new Date(gmt7Timestamp);
  return gmt7Date;
};

const countActivityByType = (activity_data) => {
  const result = {};
  activity_data.forEach((item) => {
    result[item._id] = item.count;
  });
  return result;
};

module.exports = { skipValue, generateDateGMT7, countActivityByType };
