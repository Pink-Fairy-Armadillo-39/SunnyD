const User = require('../userModel');

const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    //deconstruct username, password
    const { name, username, password } = req.body;
    //find if there is already a user
    const user = await User.findOne({ username });
    //if there is not a user, create one
    if (!user) {
      const newUser = await User.create({ name, username, password, days: [{ date: new Date().toDateString(), points: 0 }] });
      res.locals.created = true;
      return next();
      //if there is already that username in database
    } else {
      res.locals.created = false;
      return next();
    }
  } catch (err) {
    return next({
      log: 'Error in userController.createUser: ' + err,
      status: 418,
      message: { err: 'An error occurred in userController.createUser' },
    });
  }
}

userController.logIn = async (req, res, next) => {
  try {
    const date = new Date().toDateString();
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    // Check password
    const match = await user.comparePassword(password);
    // If password and hash match
    if (match) {
      const { id, name, days } = user;
      const index = days.length - 1;
      const currentDate = days[index].date;
      // If last date in days array is today, send back points
      if (currentDate === date) {
        res.locals.userInfo = { id, name, points: days[index].points }
        return next();
        // Otherwise, create new date in days array and set points to 0
      } else {
        const update = await User.findOneAndUpdate(
          { username },
          { $push: { days: { date, points: 0 } } }
        );
        res.locals.userInfo = { id, name, points: 0 }
        return next();
      }
      // If password and hash don't match
    } else {
      return next();
    }
  } catch (err) {
    return next({
      log: 'Error in userController.logIn: ' + err,
      status: 418,
      message: { err: 'An error occurred in userController.logIn' },
    });
  }
}

userController.updateUser = async (req, res, next) => {
  try {
    const { username, points } = req.body;
    const user = await User.findOne({ username });
    const index = user.days.length - 1;
    const update = await User.updateOne(
      { username },
      { $set: { [`days.${ index }.points`]: points } },
      { new: true }
    );
    return next();
  } catch (err) {
    return next({
      log: 'Error in userController.updateUser: ' + err,
      status: 418,
      message: { err: 'An error occurred in userController.updateUser' },
    });
  }
};

module.exports = userController;
