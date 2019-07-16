const UserModel = require("./../database/models/user_model");

// index returns all the users in the database
// this data is used in the users index page
async function index (req, res) {
  let users = await UserModel.find();
  console.log(users);
  return res.json(users);
};

// dashboard returns data for the current user's dashboard page
// two variables are returned
//   > The courses the user has purchased
//   > The courses recommeneded to the user
async function dashboard () {};

// editAccountInfo returns data for the user's edit account information page
// the data is used to autocomplete the form with the user's current account information
// note the route to update the user's information in the database is in the auth routes (edit)
function editAccountInfo (req, res) {
  return res.json(req.user);
};


module.exports = {
  index,
  dashboard,
  editAccountInfo
};