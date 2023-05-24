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

const caloriesBurnUsingMETs = (weight, METs, minutes) => {
  return ((METs * weight * 3.5) / 200) * minutes;
};

const calculateAgeFromBirthdate = (birthdate) => {
  const birth_date = new Date(birthdate);
  const birthdateMillisec = birth_date.getTime();
  const currentTime = Date.now();
  const ageMillisec = currentTime - birthdateMillisec;
  const age = Math.floor(ageMillisec / 31557600000);
  // 31557600000 is millisecond in one year
  return age;
};

const calculateBMR = (weight, height, birthdate, gender) => {
  const age = calculateAgeFromBirthdate(birthdate);

  let bmr = null;

  // req.body.gender
  if (gender === "male") {
    bmr = 66 + 13.7 * weight + 5 * height - 6.8 * age;
  }

  if (gender === "female") {
    bmr = 655 + 9.6 * weight + 1.8 * height - 4.7 * age;
  }

  if (gender === "prefer not to say") {
    bmr = 66 + 13.7 * weight + 5 * height - 6.8 * age;
  }

  return Math.floor(bmr);
};

module.exports = {
  skipValue,
  generateDateGMT7,
  countActivityByType,
  caloriesBurnUsingMETs,
  calculateBMR,
  calculateAgeFromBirthdate,
};
