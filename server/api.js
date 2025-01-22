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
const Menu = require("./models/menu");
const Foodgroup = require("./models/foodgroup");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

// setting up mongoose
const mongoose = require("mongoose"); // library to connect to MongoDB

const getFoodGroups = require("./test/scraper.js");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

// import scrape
const scraper = require("./test/scraper.js");
const menu = require("./models/menu");

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

let prevData = {};
let prevMenuWithGroups = [];

/**
 * Determines the list of foods served on a given date,
 * in a given dorm, for a given meal
 * @param {String} date a string of the form YYYY-MM-DD
 * @param {String} dorm a dorm, e.g. "maseeh", "new-vassar"
 * @param {String} meal a meal, e.g. "brunch", "late-night"
 * @param {Array<String>} includes dietary restrictions, "vegetarian", "vegan", "halal"
 * @param {Array<String>} excludes allergies, "tree nut", "peanut", "shrimp"
 * @returns a list of Food objects of the form {
 *      foodName: String - name of food
 *      foodGroups: Array<String> - food groups this food is in
 * }
 */
async function getMenuWithRestrictions(date, dorm, meal, includes = [], excludes = []) {
  const menuData = {
    date: date,
    dorm: dorm,
    meal: meal,
  };

  // cache, so that clicking within plate is fast
  if (JSON.stringify(menuData) === JSON.stringify(prevData)) {
    return prevMenuWithGroups;
  }

  console.log(prevData);
  console.log(menuData);
  console.log(prevData === menuData);
  prevData = menuData;
  const foundMenu = await Menu.findOne(menuData, "menu");
  const menu =
    foundMenu !== null
      ? foundMenu["menu"]
      : await scraper.getMenu(req.query.date, req.query.dorm, req.query.meal);
  if (foundMenu === null) {
    Object.defineProperty(menuData, "menu", { value: menu });
    const newMenu = new Menu(menuData);
    await newMenu.save().then();
  }

  // TODO filter before this map
  const dietFilteredMenu = menu.map((x) => x.foodName);
  const menuWithGroups = [];
  const noFoodGroup = [];

  for (const foodItem of dietFilteredMenu) {
    const foodGroups = await Foodgroup.findOne(
      {
        foodName: foodItem,
      },
      "foodName foodGroups"
    );
    // console.log(`The foodgroups is ${foodGroups}`);
    if (foodGroups === null) {
      noFoodGroup.push(foodItem);
    } else {
      menuWithGroups.push(foodGroups);
    }
  }
  if (noFoodGroup.length !== 0) {
    const newFoodGroups = await scraper.getFoodGroups(noFoodGroup);
    // console.log(noFoodGroup.length)
    // console.log(newFoodGroups.length)
    for (let i = 0; i < noFoodGroup.length; i++) {
      foodgroupInstance = {
        foodName: noFoodGroup[i],
        foodGroups: newFoodGroups[i],
      };
      menuWithGroups.push(foodgroupInstance);
      const newFoodGroup = new Foodgroup(foodgroupInstance);
      await newFoodGroup.save();
    }
  }

  // uncomment below line to scrape food from the database
  // const menu = await scraper.getMenu(req.query.date, req.query.dorm, req.query.meal)

  // console.log(dietFilteredMenu);
  // console.log(menuWithGroups);
  prevMenuWithGroups = menuWithGroups;
  return prevMenuWithGroups;
}

/* getFoodList
 * parameters of request body:
 *  date - Date object with the date we want to support
 *  dorm - which dorm it is, lowercase
 *    choices: "maseeh"
 *  meal - which meal it is
 *    choices: "lunch", "dinner"
 *  group - one of the five food groups
 *    choices: "fruits", "vegetables", "grains", "protein", "dairy"
 *  includes - list of restrictions to include. gets intersection of all,
 *             but if it's the empty list gets everything.
 *  excludes - list of allergies to exclude.
 * returns:
 *  a list of Foods served on that date, the dorm, and meal
 *  if group is specified, only contains items in that food group
 */
router.get("/getFoodList", async (req, res) => {
  console.log(`Got food from ${req.query.dorm}`);
  const menuWithGroups = await getMenuWithRestrictions(
    req.query.date,
    req.query.dorm,
    req.query.meal,
    req.query.includes,
    req.query.excludes
  );
  console.log(menuWithGroups);
  const group = req.query.group;
  res.status(200);
  res.send(menuWithGroups.filter((x) => x.foodGroups.includes(group)).map((x) => x.foodName));
});

/*
 * generateMeal
 * parameters:
 */
router.get("/generateMeal", async (req, res) => {
  console.log(`Got food from ${req.query.dorm}`);
  const menuWithGroups = await getMenuWithRestrictions(
    req.query.date,
    req.query.dorm,
    req.query.meal,
    req.query.includes,
    req.query.excludes
  );
  const allFoodGroups = ["fruits", "vegetables", "grains", "protein", "dairy"];
  const retDict = {};
  for (const foodGroupName of allFoodGroups) {
    const foodsInGroup = menuWithGroups
      .filter((x) => x.foodGroups.includes(foodGroupName))
      .map((x) => x.foodName);
    const randInd = Math.floor(Math.random() * foodsInGroup.length);
    retDict[foodGroupName] = foodsInGroup[randInd];
  }
  console.log(JSON.stringify(retDict, null, 2));
  res.send(JSON.stringify(retDict, null, 2));
});

/*
// Setting up MongoDB


mongoose
  .connect(mongoConnectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: databaseName,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));
*/

/*
 * updatedBio
 */
router.post("/updatedBio", async (req, res) => {
  console.log(req.body);
  res.send([req.body.content]);
  await User.findOneAndUpdate({ googleid: req.body.userid }, { bio: req.body.content });
});

/*
 * bio
 */
router.get("/bio", async (req, res) => {
  console.log(`Loaded new bio for ${req.query.userid}`);
  res.status(200);
  const userBio = await User.findOne({ googleid: req.query.userid }, "bio");
  console.log(userBio);
  res.send([userBio]);
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
