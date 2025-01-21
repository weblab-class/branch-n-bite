/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

/* getFoodList
 * parameters:
 *  date - Date object with the date we want to support
 *  dorm - which dorm it is, lowercase
 *    choices: "maseeh"
 *  meal - which meal it is
 *    choices: "lunch", "dinner"
 *  group - one of the five food groups
 *    choices: "fruits", "vegetables", "grains", "protein", "dairy"
 *  includes - list of restrictions to include. gets intersection of all
 *  excludes - 
 * returns:
 *  a list of Foods served on that date, the dorm, and meal
 *  if group is specified, only contains items in that food group
 */
router.get("/getFoodList", (req, res) => {
  console.log("Got food from ${req.query.parent}")
  res.status(200);
  res.send({
    status: 200,
    message: "Hi bestie"
  })
});

/*
 * generateMeal
 * parameters:
 *  
 */
router.get("/generateMeal", (req, res) => {

});

/*
 * updatedBio
 */
router.post("/updatedBio", (req, res) => {

});

/*
 * bio
 */
router.post("/bio", (req, res) => {
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
