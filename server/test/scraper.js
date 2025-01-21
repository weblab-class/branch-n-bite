console.log("Hello!!")

import assert from 'assert';
import puppeteer from "puppeteer";

const url = "https://mit.cafebonappetit.com/cafe//"

/**
 * Scrapes the Bon Appetit website for MIT and determines
 * the list of foods served on a given date,
 * in a given dorm, for a given meal.
 * @param {Date} date a Date object 
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
    console.log("Hello 1")
    console.log(url)

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    console.log("Hello 2")
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

// getMenu("2023-10-16", "baker", "breakfast");

export { getMenu }