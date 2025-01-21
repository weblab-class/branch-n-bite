console.log("Hello!!")

import puppeteer from "puppeteer";

const url = "https://mit.cafebonappetit.com/cafe/the-howard-dining-hall-at-maseeh/"

const main = async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log("Hello 1")
    await page.goto(url);
    console.log("Hello 2")
    const foodTest = await page.evaluate(() => {
        const dinner = document.getElementById("dinner")
        return dinner.children[0]
            .children[1]
            .children[0]
            .children[0]
            .children[1]
            .id
    });
    console.log(foodTest);
    console.log("Done!")
}

main();