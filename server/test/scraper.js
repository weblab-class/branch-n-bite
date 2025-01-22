
import assert from 'assert';
import puppeteer from "puppeteer";
import foundationFoods from './foundationDownload.json' with { type: 'json' };
import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config'
import express from 'express'

const url = "https://mit.cafebonappetit.com/cafe//"

const foodAssignment = {
    "Fruits and Fruit Juices": "fruits",
    "Vegetables and Vegetable Products": "vegetables",
    "Cereal Grains and Pasta": "grains",
    "Finfish and Shellfish Products": "protein",
    "Lamb, Veal, and Game Products": "protein",
    "Pork Products": "protein",
    "Beef Products": "protein",
    "Poultry Products": "protein",
    "Sausages and Luncheon Meats": "protein",
    "Dairy and Egg Products": "dairy",
};

/**
 * Scrapes the Bon Appetit website for MIT and determines
 * the list of foods served on a given date,
 * in a given dorm, for a given meal.
 * @param {String} date a date of the form YYYY-MM-DD
 * @param {String} dorm a dorm, one of "maseeh", "mccormick", "next", "simmons", "new-vassar"
 * @param {String} meal a mealtime, one of "breakfast", "brunch", "lunch", "dinner", "late-night"
 * @returns a list of Food objects of the form {
 *      foodName: String - name of food
 *      restrictions: Array of strings - dietary restrictions (Vegetarian, Vegan, Halal)
 *      allergies: Array of string - allergies
 * }
 */
async function getMenu(date, dorm, meal) {
    // parameter validity checking
    const allDorms = ["maseeh", "mccormick", "next", "simmons", "new-vassar", "baker"]
    assert(allDorms.includes(dorm));
    const dateString = String(date);
    const dormString = (dorm === "maseeh" ? "the-howard-dining-hall-at-maseeh" : dorm);
    const allMeals = ["breakfast", "brunch", "lunch", "dinner", "late-night"];
    assert(allMeals.includes(meal))
    const url = `https://mit.cafebonappetit.com/cafe/${dormString}/${dateString}`
    console.log(`Scraping food from ${url}`)

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const foodTest = page.evaluate((meal) => {
        const allRestrictions = ["Vegetarian", "Vegan", "Halal"];
        const allAllergies = ["Peanut", "Tree Nut", "Fish", "Wheat/Gluten", "Milk", "Egg", "Soy", "Sesame"]
        const dinnerBox = document.getElementById(meal)
        const dinnerHeaders = dinnerBox.children[0]
            .children[1]
            .children[0]
            .children[0]
            .children[1]
            .getElementsByClassName("site-panel__daypart-item-header")
        console.log(dinnerHeaders);
        const menu = Object.keys(dinnerHeaders).map((idx) => {
            const foodHeader = dinnerHeaders[idx];
            const foodPropertyImages = foodHeader.getElementsByTagName("img")
            const foodProperties = Object.keys(foodPropertyImages).map(x => foodPropertyImages[x].alt.split(':')[0]);
            const foodRestrictions = foodProperties.filter(s => allRestrictions.includes(s));
            const foodAllergies = foodProperties.filter(s => allAllergies.includes(s));
            return {
                foodName: foodHeader.textContent.trim(),
                restrictions: foodRestrictions,
                allergies: foodAllergies
            }
        })
        return menu;
    }, meal);
    return (await foodTest);
}

function getFoodGroupsFromFoundation(foodName) {
    const tokenizedFood = foodName.split(' ');
    const foodGroupSet = new Set([]);
    for(foodString of tokenizedFood) {
    }
    return [...foodGroupSet];
}

async function getFoodGroupsFromGemini(foodsArray) {

    console.log(process.env);
    console.log(`It is ${process.env.GEMINI_API_KEY}`);
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `You will be given a food item, and the task is to classify it into zero or more of the following five food groups: "fruits", "vegetables", "protein", "grains", "dairy". 
These food items will each appear in a separate line. Please print only the groups as a JSON-style array, and wrap all the arrays in a JSON-style array. Also, do not add the backticks (so no \`\`\`json at the start or \`\`\` at the end).
Note that some items may have no food groups associated with them.
Make sure that the list you output has the same length as the original!

Here are some examples.

Input: 
Pork Bacon
Worcestershire Sauce
Salt

Output: 
[
    ["protein"],
    [],
    [],
]

Input: 
Yogurt and Blueberries
Asparagus Fried Rice

Output:
[
    ["fruits", "dairy"],
    ["vegetables", "grains"],
]

Input: 
Sweet Chili Chicken Pizza
Coca-Cola
Carnitas Burrito

Output: 
[
    ["protein", "grains", "dairy"],
    [],
    ["protein", "grains"],
]

Input:
${foodsArray.join('\n')}

Output: 
`

    const result = await model.generateContent(prompt);
    console.log(prompt);
    console.log(result.response.text());

    return JSON.parse(result.response.text());

}

/**
 * Computes which food groups a certain food is part.
 * @param {Array<String>} foodArray strings representing titles of food items
 * @returns an Array of Arrays of distinct strings containing all food groups
 * each food is a part of, which may be empty
 * These are only "fruits", "vegetables", "grains", "protein", or "dairy". 
 */
async function getFoodGroups(foodsArray) {
    return await getFoodGroupsFromGemini(foodsArray);
    // return getFoodGroupsFromFoundation(foodName);
}

// console.log(getFoodGroups(["Fish and Clam Gumbo", "Black Bean Burger", "White Chocolate and Macadamia Cookie", "Worcestershire Sauce"]));
// console.log(await getMenu("2024-02-18", "next", "dinner"));

export { getMenu, getFoodGroups }
